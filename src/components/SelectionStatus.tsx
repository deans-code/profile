interface Props {
  count: number
  /** The page's selection limit; omit for pages with no limit. */
  limit?: number
}

/** "n selected", or "n of 10 selected" with an explanation when the page has a limit that is reached or exceeded. */
export default function SelectionStatus({ count, limit }: Props) {
  if (limit === undefined) {
    return (
      <p className="count" aria-live="polite">
        {count} selected
      </p>
    )
  }
  const over = count - limit
  return (
    <p className="count" aria-live="polite">
      {count} of {limit} selected
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
