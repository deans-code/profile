export default function SelectionHelp() {
  return (
    <aside className="help" aria-label="How to use this step">
      <p>
        <strong>Click</strong> a word to select or deselect it. <strong>Right-click</strong> a word to see what it
        means.
      </p>
      <p className="help-alt">
        On the keyboard, focus a word and press <kbd>?</kbd> (or <kbd>Shift</kbd>+<kbd>F10</kbd>) for its
        definition. On a touch screen, press and hold the word.
      </p>
    </aside>
  )
}
