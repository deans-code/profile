import { useState, type FormEvent } from 'react'

interface Props {
  label: string
  placeholder: string
  onAdd: (text: string) => void
}

export default function AddEntry({ label, placeholder, onAdd }: Props) {
  const [text, setText] = useState('')

  function submit(e: FormEvent) {
    e.preventDefault()
    if (!text.trim()) return
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
      <button type="submit" disabled={!text.trim()}>
        Add
      </button>
    </form>
  )
}
