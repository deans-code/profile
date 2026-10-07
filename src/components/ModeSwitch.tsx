import { useRef, type KeyboardEvent } from 'react'
import { MODES, MODE_LABELS, type Mode } from '../state/profile'

interface Props {
  mode: Mode
  /** How many words are selected on this page in each option. */
  counts: Record<Mode, number>
  onChange: (mode: Mode) => void
}

/** Chooses whether the page is recording previous experience or desired experience. */
export default function ModeSwitch({ mode, counts, onChange }: Props) {
  const refs = useRef<Record<Mode, HTMLButtonElement | null>>({ experience: null, desired: null })

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    const step = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
    if (!step) return
    e.preventDefault()
    const next = MODES[(MODES.indexOf(mode) + step + MODES.length) % MODES.length]
    onChange(next)
    refs.current[next]?.focus()
  }

  return (
    <div className="mode-switch" role="radiogroup" aria-label="Experience option">
      {MODES.map((m) => (
        <button
          key={m}
          ref={(el) => {
            refs.current[m] = el
          }}
          type="button"
          role="radio"
          aria-checked={m === mode}
          tabIndex={m === mode ? 0 : -1}
          onClick={() => onChange(m)}
          onKeyDown={onKeyDown}
        >
          {MODE_LABELS[m]} ({counts[m]})
        </button>
      ))}
    </div>
  )
}
