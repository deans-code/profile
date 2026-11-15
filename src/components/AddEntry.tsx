import { useId, useState, type FormEvent } from 'react'

interface Props {
  label: string
  placeholder: string
  onAdd: (text: string) => void
  /** Id of the paragraph (see AddEntryHelp) that explains what Add does. */
  helpId: string
  /** When true the Add button is disabled and typed text is kept. */
  full?: boolean
}

/** Explains what Add does. Shown in the normal page flow, above the pinned bar, so the bar stays short. */
export function AddEntryHelp({ id }: { id: string }) {
  return (
    <p id={id} className="add-help">
      Not in the lists? Type it and press Add or Enter. It will appear under Custom, selected.
    </p>
  )
}

/** A compact form for adding a word that is not in the lists, pinned at the top of a selection page. */
export default function AddEntry({ label, placeholder, onAdd, helpId, full = false }: Props) {
  const [text, setText] = useState('')
  const id = useId()

  function submit(e: FormEvent) {
    e.preventDefault()
    if (!text.trim() || full) return
    onAdd(text)
    setText('')
  }

  return (
    <form className="add-entry" onSubmit={submit}>
      <label htmlFor={id} className="visually-hidden">
        {label}
      </label>
      <div className="add-row">
        <input
          id={id}
          type="text"
          value={text}
          placeholder={placeholder}
          aria-describedby={helpId}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" disabled={!text.trim() || full}>
          Add
        </button>
      </div>
      {full && (
        <p className="add-limit" role="status">
          Limit reached: deselect a word to add another.
        </p>
      )}
    </form>
  )
}
