import { MODE_LABELS, type Mode } from '../state/profile'

interface Props {
  /** The page's selection limit; omit for pages with no limit. */
  limit?: number
  /** The fewest words needed on this page; omit when there is no minimum. */
  min?: number
  /** What is being chosen on this page. */
  unit: 'values' | 'skills'
  /** The experience option being edited; omit on pages with a single list. */
  mode?: Mode
}

export default function SelectionHelp({ limit, min, unit, mode }: Props) {
  return (
    <aside className="help" aria-label="How to use this step">
      <p>
        <strong>Click</strong> a word to select or deselect it. <strong>Right-click</strong> a word to read its
        description.
      </p>
      {mode && (
        <p>
          You are choosing <strong>{MODE_LABELS[mode]}</strong>. The other option has its own selections: switch with
          the buttons above.
        </p>
      )}
      <p>{limit === undefined ? `Select as many ${unit} as apply.` : min === undefined
            ? `Select up to ${limit} ${unit}.`
            : `Select ${min} to ${limit} ${unit}.`}</p>
      <p className="help-alt">
        <strong>Mouse:</strong> <strong>right-click</strong> a word. <strong>Keyboard:</strong> focus a word and press{' '}
        <kbd>?</kbd> or <kbd>Shift</kbd>+<kbd>F10</kbd>. <strong>Touch:</strong> press and hold.
      </p>
    </aside>
  )
}
