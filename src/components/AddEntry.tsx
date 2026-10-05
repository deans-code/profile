import { useState, type FormEvent } from 'react'

interface Props {
  label: string
  placeholder: string
  onAdd: (text: string) => void
  /** When true the Add button is disabled and typed text is kept. */
  full?: boolean
}

export default function AddEntry({ label, placeholder, onAdd, full = false }: Props) {
  const [text, setText] = useState('')

  function submit(e: FormEvent) {
    e.preventDefault()
    if (!text.trim() || full) return
    onAdd(text)
    setText('')
  }

  return (
    <form className="add-entry" onSubmit={submit}>
      <label>
        <span className="visually-hidden">{label}</span>
        <input
          type="text"
          value={text}
          placeholder={placeholder}
          aria-label={label}
          onChange={(e) => setText(e.target.value)}
        />
      </label>
      <button type="submit" disabled={!text.trim() || full}>
        Add
      </button>
    </form>
  )
}
