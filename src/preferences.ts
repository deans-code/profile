export const THEMES = ['system', 'light', 'dark'] as const
export const TEXT_SIZES = ['default', 'large', 'larger', 'largest'] as const

export type Theme = (typeof THEMES)[number]
export type TextSize = (typeof TEXT_SIZES)[number]

export interface Preferences {
  theme: Theme
  textSize: TextSize
}

export const STORAGE_KEY = 'profile-builder-preferences'
export const DEFAULT_PREFERENCES: Preferences = { theme: 'system', textSize: 'default' }

/** Reads saved preferences; any missing, invalid or unreadable value falls back to its default. */
export function loadPreferences(): Preferences {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') as Partial<Preferences> | null
    return {
      theme: THEMES.includes(raw?.theme as Theme) ? (raw!.theme as Theme) : DEFAULT_PREFERENCES.theme,
      textSize: TEXT_SIZES.includes(raw?.textSize as TextSize) ? (raw!.textSize as TextSize) : DEFAULT_PREFERENCES.textSize,
    }
  } catch {
    return { ...DEFAULT_PREFERENCES }
  }
}

/** Saves preferences; silently does nothing when storage is unavailable. */
export function savePreferences(prefs: Preferences): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
  } catch {
    // The choice still applies for this visit.
  }
}

/** Reflects preferences on <html>; the stylesheet keys off these attributes. */
export function applyPreferences(prefs: Preferences, root: HTMLElement = document.documentElement): void {
  if (prefs.theme === 'system') root.removeAttribute('data-theme')
  else root.setAttribute('data-theme', prefs.theme)
  if (prefs.textSize === 'default') root.removeAttribute('data-text-size')
  else root.setAttribute('data-text-size', prefs.textSize)
}
