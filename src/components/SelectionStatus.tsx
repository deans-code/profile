import { MAX_SELECTION } from '../state/profile'

interface Props {
  count: number
}

/** "n of 10 selected", plus an explanation when the page is at or over its limit. */
export default function SelectionStatus({ count }: Props) {
  const over = count - MAX_SELECTION
  return (
    <p className="count" aria-live="polite">
      {count} of {MAX_SELECTION} selected
      {over > 0 && (
        <span className="limit-note">
          {' '}
          Over the limit: deselect {over} {over === 1 ? 'word' : 'words'} to continue.
        </span>
      )}
      {over === 0 && <span className="limit-note"> Limit reached: deselect a word to choose another.</span>}
    </p>
  )
}
