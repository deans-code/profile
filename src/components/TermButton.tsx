import { useEffect, useRef, type KeyboardEvent, type MouseEvent, type PointerEvent, type ReactNode } from 'react'
import { getDefinition, type TermKind } from '../data/definitions'
import { useDefinitions } from './DefinitionPanel'

export const LONG_PRESS_MS = 500

interface Props {
  kind: TermKind
  name: string
  selected: boolean
  onToggle: () => void
  className?: string
  children?: ReactNode
}

/**
 * A selectable word. Click toggles selection; right-click, the context-menu key,
 * Shift+F10, "?" and a touch long-press open its definition instead.
 * Custom words have no definition and are left to the browser's own behaviour.
 */
export default function TermButton({ kind, name, selected, onToggle, className = 'chip', children }: Props) {
  const { open } = useDefinitions()
  const hasDefinition = getDefinition(kind, name) !== undefined
  const timer = useRef<number | undefined>(undefined)
  const longPressed = useRef(false)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const cancelPress = () => window.clearTimeout(timer.current)

  function onContextMenu(e: MouseEvent<HTMLButtonElement>) {
    if (!hasDefinition) return
    e.preventDefault()
    open(kind, name, e.currentTarget)
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (!hasDefinition) return
    if (e.key === '?' || e.key === 'ContextMenu' || (e.shiftKey && e.key === 'F10')) {
      e.preventDefault()
      open(kind, name, e.currentTarget)
    }
  }

  function onPointerDown(e: PointerEvent<HTMLButtonElement>) {
    if (!hasDefinition || e.pointerType !== 'touch') return
    const anchor = e.currentTarget
    longPressed.current = false
    cancelPress()
    timer.current = window.setTimeout(() => {
      longPressed.current = true
      open(kind, name, anchor)
    }, LONG_PRESS_MS)
  }

  function onClick() {
    if (longPressed.current) {
      longPressed.current = false
      return
    }
    onToggle()
  }

  return (
    <button
      type="button"
      className={className}
      aria-pressed={selected}
      onClick={onClick}
      onContextMenu={onContextMenu}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerUp={cancelPress}
      onPointerCancel={cancelPress}
      onPointerLeave={cancelPress}
    >
      {children ?? name}
    </button>
  )
}
