import { useRef, useState, type ChangeEvent } from 'react'
import { MAX_FILE_BYTES, parseProfile } from '../load'
import type { Profile } from '../export'

interface Props {
  /** True when the user already has selections that loading would replace. */
  hasProgress: boolean
  /** Applies a parsed profile; returns a note to show when it opens on a page that needs attention. */
  onLoad: (profile: Profile) => string | null
}

type Status = { kind: 'ok' | 'error' | 'info'; text: string }

function readText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error)
    reader.readAsText(file)
  })
}

export default function LoadProfile({ hasProgress, onLoad }: Props) {
  const input = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState<Status | null>(null)
  const [pending, setPending] = useState<{ profile: Profile; name: string } | null>(null)

  function apply(profile: Profile, name: string) {
    const note = onLoad(profile)
    setPending(null)
    setStatus({ kind: 'ok', text: `Loaded ${name}.${note ? ` ${note}` : ''}` })
  }

  async function onChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    // Clear the input so choosing the same file again still triggers a change.
    e.target.value = ''
    if (!file) return
    setPending(null)

    if (file.size > MAX_FILE_BYTES) {
      setStatus({ kind: 'error', text: `${file.name} is larger than 1 MB, so it is not a profile from this app.` })
      return
    }
    let text: string
    try {
      text = await readText(file)
    } catch {
      setStatus({ kind: 'error', text: `${file.name} could not be read.` })
      return
    }
    const result = parseProfile(text)
    if (!result.ok) {
      setStatus({ kind: 'error', text: `${file.name} was not loaded. ${result.error} Your profile is unchanged.` })
      return
    }
    if (hasProgress) {
      setStatus(null)
      setPending({ profile: result.profile, name: file.name })
    } else {
      apply(result.profile, file.name)
    }
  }

  return (
    <div className="load">
      <button type="button" className="secondary" onClick={() => input.current?.click()}>
        Load saved profile
      </button>
      <input
        ref={input}
        type="file"
        accept=".json,application/json"
        className="visually-hidden"
        tabIndex={-1}
        aria-label="Choose a saved profile file"
        onChange={onChange}
      />

      {pending && (
        <div className="confirm" role="group" aria-label="Confirm loading a profile">
          <p>Replace your current profile with {pending.name}?</p>
          <button type="button" autoFocus onClick={() => apply(pending.profile, pending.name)}>
            Replace
          </button>
          <button
            type="button"
            className="secondary"
            onClick={() => {
              setPending(null)
              setStatus({ kind: 'info', text: 'Load cancelled. Your profile is unchanged.' })
            }}
          >
            Cancel
          </button>
        </div>
      )}

      <p className={`load-status ${status?.kind ?? ''}`} aria-live="polite">
        {status?.text}
      </p>
    </div>
  )
}
