import { useId, useState, type FormEvent } from 'react'

interface Props {
  label: string
  placeholder: string
  onAdd: (text: string) => void
  /** When true the Add button is disabled and typed text is kept. */
  full?: boolean
}

/** A highlighted panel for adding a word that is not in the lists, shown at the top of a selection page. */
export default function AddEntry({ label, placeholder, onAdd, full = false }: Props) {
  const [text, setText] = useState('')
  const id = useId()
  const helpId = `${id}-help`

  function submit(e: FormEvent) {
    e.preventDefault()
    if (!text.trim() || full) return
    onAdd(text)
    setText('')
  }

  return (
    <form className="add-entry" onSubmit={submit}>
      <label htmlFor={id} className="add-title">
        {label}
      </label>
      <p id={helpId} className="add-help">
        Not in the lists? Type it and press Add or Enter. It will appear under Custom, selected.
      </p>
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
