import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { STORAGE_KEY, applyPreferences, loadPreferences, savePreferences } from './preferences'

afterEach(() => {
  localStorage.clear()
  vi.restoreAllMocks()
  document.documentElement.removeAttribute('data-theme')
  document.documentElement.removeAttribute('data-text-size')
})

const DEFAULTS = { theme: 'system', textSize: 'default' }

describe('preferences', () => {
  it('defaults to system theme and default size', () => {
    expect(loadPreferences()).toEqual(DEFAULTS)
  })

  it('round-trips saved values', () => {
    savePreferences({ theme: 'dark', textSize: 'large' })
    expect(loadPreferences()).toEqual({ theme: 'dark', textSize: 'large' })
  })

  it('ignores invalid saved values', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ theme: 'purple', textSize: 'huge' }))
    expect(loadPreferences()).toEqual(DEFAULTS)
    localStorage.setItem(STORAGE_KEY, '{not json')
    expect(loadPreferences()).toEqual(DEFAULTS)
  })

  it('survives unavailable storage', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    expect(loadPreferences()).toEqual(DEFAULTS)
    expect(() => savePreferences({ theme: 'dark', textSize: 'large' })).not.toThrow()
  })

  it('applies and clears attributes on the root element', () => {
    applyPreferences({ theme: 'light', textSize: 'largest' })
    expect(document.documentElement).toHaveAttribute('data-theme', 'light')
    expect(document.documentElement).toHaveAttribute('data-text-size', 'largest')
    applyPreferences({ theme: 'system', textSize: 'default' })
    expect(document.documentElement).not.toHaveAttribute('data-theme')
    expect(document.documentElement).not.toHaveAttribute('data-text-size')
  })

  it('the pre-paint script in index.html applies saved values', () => {
    const html = readFileSync(resolve(__dirname, '../index.html'), 'utf-8')
    const script = html.match(/<script>([\s\S]*?)<\/script>/)![1]
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ theme: 'dark', textSize: 'larger' }))
    new Function(script)()
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    expect(document.documentElement).toHaveAttribute('data-text-size', 'larger')
  })
})
