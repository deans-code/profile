interface Props {
  count: number
  /** The page's selection limit; omit for pages with no limit. */
  limit?: number
  /** The fewest words needed; omit when there is no minimum. */
  min?: number
}

/** "n selected", or "n of 20 selected" with an explanation when the page has a limit that is reached or exceeded. */
export default function SelectionStatus({ count, limit, min }: Props) {
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
      {min !== undefined && count < min && (
        <span className="limit-note">
          {' '}
          Choose at least {min - count} more {min - count === 1 ? 'word' : 'words'} to continue.
        </span>
      )}
      {over === 0 && <span className="limit-note"> Limit reached: deselect a word to choose another.</span>}
    </p>
  )
}
