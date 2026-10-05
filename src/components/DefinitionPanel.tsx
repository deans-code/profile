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
  /** The term whose panel is open, if any. */
  current: { kind: TermKind; name: string } | null
}

/** Id of the (single) open panel, referenced by the word it describes. */
export const DEFINITION_PANEL_ID = 'definition-panel'

const DefinitionsContext = createContext<DefinitionsApi | null>(null)

export function useDefinitions(): DefinitionsApi {
  const api = useContext(DefinitionsContext)
  if (!api) throw new Error('useDefinitions must be used inside DefinitionProvider')
  return api
}

const MARGIN = 8

interface ProviderProps {
  children: ReactNode
  /** When this value changes (for example the current section), any open panel is closed. */
  resetKey?: unknown
}

export function DefinitionProvider({ children, resetKey }: ProviderProps) {
  const [current, setCurrent] = useState<OpenTerm | null>(null)
  const currentRef = useRef<OpenTerm | null>(null)
  currentRef.current = current

  const open = useCallback((kind: TermKind, name: string, anchor: HTMLElement) => {
    setCurrent((prev) =>
      prev && prev.kind === kind && prev.name === name && prev.anchor === anchor ? prev : { kind, name, anchor },
    )
  }, [])

  const close = useCallback((returnFocus = false) => {
    const prev = currentRef.current
    setCurrent(null)
    if (returnFocus && prev?.anchor.isConnected) prev.anchor.focus()
  }, [])

  // A different section means the word the panel describes is no longer shown.
  useEffect(() => {
    setCurrent(null)
  }, [resetKey])

  const term = current ? { kind: current.kind, name: current.name } : null
  const termKind = term?.kind
  const termName = term?.name
  const api = useMemo<DefinitionsApi>(
    () => ({ open, close, current: termKind && termName ? { kind: termKind, name: termName } : null }),
    [open, close, termKind, termName],
  )

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
  // Closes instead when the word has left the page or is completely off screen.
  const reposition = useCallback(() => {
    const panel = ref.current
    if (!panel) return
    if (!term.anchor.isConnected) {
      onClose(false)
      return
    }
    const a = term.anchor.getBoundingClientRect()
    const vw = document.documentElement.clientWidth
    const vh = window.innerHeight
    if (vw > 0 && vh > 0 && (a.bottom < 0 || a.top > vh || a.right < 0 || a.left > vw)) {
      onClose(false)
      return
    }
    const { offsetWidth: w, offsetHeight: h } = panel
    let top = a.bottom + MARGIN
    if (top + h > vh - MARGIN) top = a.top - h - MARGIN
    top = Math.max(MARGIN, Math.min(top, vh - h - MARGIN))
    const left = Math.max(MARGIN, Math.min(a.left, vw - w - MARGIN))
    setPos({ top, left })
  }, [term, onClose])

  useLayoutEffect(reposition, [reposition])

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
    // Resizes (such as a mobile address bar showing or hiding) and scrolls keep the panel attached to its word.
    const observer = new MutationObserver(() => {
      if (!term.anchor.isConnected) onClose(false)
    })
    observer.observe(document.body, { childList: true, subtree: true })
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('scroll', reposition, { passive: true })
    window.addEventListener('resize', reposition)
    window.visualViewport?.addEventListener('resize', reposition)
    return () => {
      observer.disconnect()
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('scroll', reposition)
      window.removeEventListener('resize', reposition)
      window.visualViewport?.removeEventListener('resize', reposition)
    }
  }, [onClose, reposition, term.anchor])

  return (
    <div
      ref={ref}
      id={DEFINITION_PANEL_ID}
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
