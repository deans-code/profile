import { useEffect, useRef, type KeyboardEvent, type MouseEvent, type PointerEvent, type ReactNode } from 'react'
import { getDefinition, type TermKind } from '../data/definitions'
import { DEFINITION_PANEL_ID, useDefinitions } from './DefinitionPanel'

export const LONG_PRESS_MS = 500

/** How long after a long-press ends its trailing click is still suppressed. */
export const CLICK_SUPPRESS_MS = 400

interface Props {
  kind: TermKind
  name: string
  selected: boolean
  onToggle: () => void
  /** Selection is not currently possible (limit reached); the word stays focusable and shows its definition. */
  unavailable?: boolean
  className?: string
  children?: ReactNode
}

/**
 * A selectable word. Click toggles selection; right-click, the context-menu key,
 * Shift+F10, "?" and a touch long-press open its definition instead.
 * Custom words have no definition and are left to the browser's own behaviour.
 */
export default function TermButton({
  kind,
  name,
  selected,
  onToggle,
  unavailable = false,
  className = 'chip',
  children,
}: Props) {
  const { open, current } = useDefinitions()
  const isOpen = current?.kind === kind && current.name === name
  const hasDefinition = getDefinition(kind, name) !== undefined
  const timer = useRef<number | undefined>(undefined)
  const longPressed = useRef(false)
  const clearFlag = useRef<number | undefined>(undefined)

  useEffect(
    () => () => {
      window.clearTimeout(timer.current)
      window.clearTimeout(clearFlag.current)
    },
    [],
  )

  // End of a press: stop any pending long-press, and let the long-press's own trailing click
  // (if one comes) be ignored without leaving the flag set for a later, unrelated click.
  const endPress = () => {
    window.clearTimeout(timer.current)
    if (longPressed.current) {
      window.clearTimeout(clearFlag.current)
      clearFlag.current = window.setTimeout(() => {
        longPressed.current = false
      }, CLICK_SUPPRESS_MS)
    }
  }

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
    // Any new press starts clean, whatever its type.
    longPressed.current = false
    window.clearTimeout(clearFlag.current)
    window.clearTimeout(timer.current)
    if (!hasDefinition || e.pointerType !== 'touch') return
    const anchor = e.currentTarget
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
    if (unavailable) return
    onToggle()
  }

  return (
    <button
      type="button"
      className={className}
      aria-pressed={selected}
      aria-disabled={unavailable || undefined}
      aria-haspopup={hasDefinition ? 'dialog' : undefined}
      aria-describedby={isOpen ? DEFINITION_PANEL_ID : undefined}
      onClick={onClick}
      onContextMenu={onContextMenu}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerUp={endPress}
      onPointerCancel={endPress}
      onPointerLeave={endPress}
    >
      {children ?? name}
    </button>
  )
}
