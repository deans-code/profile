import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { getDefinition, type TermKind } from '../data/definitions'

interface OpenTerm {
  kind: TermKind
  name: string
  anchor: HTMLElement
}

interface DefinitionsApi {
  open: (kind: TermKind, name: string, anchor: HTMLElement) => void
  close: (returnFocus?: boolean) => void
}

const DefinitionsContext = createContext<DefinitionsApi | null>(null)

export function useDefinitions(): DefinitionsApi {
  const api = useContext(DefinitionsContext)
  if (!api) throw new Error('useDefinitions must be used inside DefinitionProvider')
  return api
}

const MARGIN = 8

export function DefinitionProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<OpenTerm | null>(null)
  const currentRef = useRef<OpenTerm | null>(null)
  currentRef.current = current

  const open = useCallback((kind: TermKind, name: string, anchor: HTMLElement) => {
    setCurrent((prev) => (prev && prev.kind === kind && prev.name === name && prev.anchor === anchor ? prev : { kind, name, anchor }))
  }, [])

  const close = useCallback((returnFocus = false) => {
    const prev = currentRef.current
    setCurrent(null)
    if (returnFocus && prev?.anchor.isConnected) prev.anchor.focus()
  }, [])

  const api = useMemo(() => ({ open, close }), [open, close])

  return (
    <DefinitionsContext.Provider value={api}>
      {children}
      {current && <Panel key={`${current.kind}:${current.name}`} term={current} onClose={close} />}
    </DefinitionsContext.Provider>
  )
}

function Panel({ term, onClose }: { term: OpenTerm; onClose: (returnFocus?: boolean) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null)
  const definition = getDefinition(term.kind, term.name)

  // Place below the word, flip above when there is no room, and clamp to the viewport.
  useLayoutEffect(() => {
    const panel = ref.current
    if (!panel) return
    const a = term.anchor.getBoundingClientRect()
    const { offsetWidth: w, offsetHeight: h } = panel
    const vw = document.documentElement.clientWidth
    const vh = window.innerHeight
    let top = a.bottom + MARGIN
    if (top + h > vh - MARGIN) top = a.top - h - MARGIN
    top = Math.max(MARGIN, Math.min(top, vh - h - MARGIN))
    const left = Math.max(MARGIN, Math.min(a.left, vw - w - MARGIN))
    setPos({ top, left })
  }, [term])

  useEffect(() => {
    ref.current?.focus({ preventScroll: true })
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose(true)
      }
    }
    function onPointerDown(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose(false)
    }
    const dismiss = () => onClose(false)
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('scroll', dismiss, { passive: true })
    window.addEventListener('resize', dismiss)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('scroll', dismiss)
      window.removeEventListener('resize', dismiss)
    }
  }, [onClose])

  return (
    <div
      ref={ref}
      className="definition"
      role="dialog"
      aria-label={`Definition of ${term.name}`}
      tabIndex={-1}
      style={{ top: pos?.top ?? 0, left: pos?.left ?? 0, visibility: pos ? 'visible' : 'hidden' }}
    >
      <p className="definition-term">{term.name}</p>
      <p className="definition-text">{definition}</p>
      <button type="button" className="secondary definition-close" onClick={() => onClose(true)}>
        Close
      </button>
    </div>
  )
}
