import { useId, useState } from 'react'
import {
  TEXT_SIZES,
  THEMES,
  applyPreferences,
  loadPreferences,
  savePreferences,
  type Preferences,
} from '../preferences'

const THEME_LABELS: Record<(typeof THEMES)[number], string> = {
  system: 'Match system',
  light: 'Light',
  dark: 'Dark',
}

const SIZE_LABELS: Record<(typeof TEXT_SIZES)[number], string> = {
  default: 'Default',
  large: 'Large',
  larger: 'Larger',
  largest: 'Largest',
}

export default function AccessibilityOptions() {
  const [open, setOpen] = useState(false)
  const [prefs, setPrefs] = useState<Preferences>(loadPreferences)
  const panelId = useId()

  function update(next: Preferences) {
    setPrefs(next)
    applyPreferences(next)
    savePreferences(next)
  }

  return (
    <div className="a11y">
      <button type="button" className="secondary" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen(!open)}>
        Accessibility
      </button>
      {open && (
        <div id={panelId} className="a11y-panel" role="group" aria-label="Accessibility options">
          <fieldset>
            <legend>Theme</legend>
            {THEMES.map((theme) => (
              <label key={theme}>
                <input
                  type="radio"
                  name="theme"
                  checked={prefs.theme === theme}
                  onChange={() => update({ ...prefs, theme })}
                />
                {THEME_LABELS[theme]}
              </label>
            ))}
          </fieldset>
          <fieldset>
            <legend>Text size</legend>
            {TEXT_SIZES.map((textSize) => (
              <label key={textSize}>
                <input
                  type="radio"
                  name="text-size"
                  checked={prefs.textSize === textSize}
                  onChange={() => update({ ...prefs, textSize })}
                />
                {SIZE_LABELS[textSize]}
              </label>
            ))}
          </fieldset>
        </div>
      )}
    </div>
  )
}
