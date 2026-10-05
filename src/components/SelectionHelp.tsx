interface Props {
  /** The page's selection limit; omit for pages with no limit. */
  limit?: number
  /** What is being chosen on this page. */
  unit: 'values' | 'skills'
}

export default function SelectionHelp({ limit, unit }: Props) {
  return (
    <aside className="help" aria-label="How to use this step">
      <p>
        <strong>Click</strong> a word to select or deselect it. <strong>Right-click</strong> a word to read its
        description.
      </p>
      <p>{limit === undefined ? `Select as many ${unit} as apply.` : `Select up to ${limit} ${unit}.`}</p>
      <p className="help-alt">
        <strong>Mouse:</strong> <strong>right-click</strong> a word. <strong>Keyboard:</strong> focus a word and press{' '}
        <kbd>?</kbd> or <kbd>Shift</kbd>+<kbd>F10</kbd>. <strong>Touch:</strong> press and hold.
      </p>
    </aside>
  )
}
