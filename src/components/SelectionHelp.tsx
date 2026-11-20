import { MODE_LABELS, type Mode } from '../state/profile'

interface Props {
  /** The experience option being edited; omit on pages with a single list. */
  mode?: Mode
}

export default function SelectionHelp({ mode }: Props) {
  return (
    <aside className="help help-block" aria-label="How to use this step">
      <p>
        <strong>Right-click</strong> a word to read its description.
      </p>
      {mode && (
        <p>
          You are choosing <strong>{MODE_LABELS[mode]}</strong>. The other option has its own selections: switch with
          the buttons above.
        </p>
      )}
      <p className="help-alt">
        <strong>Keyboard:</strong> focus a word and press <kbd>?</kbd> or <kbd>Shift</kbd>+<kbd>F10</kbd>.{' '}
        <strong>Touch:</strong> press and hold.
      </p>
    </aside>
  )
}
