import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import AccessibilityOptions from './components/AccessibilityOptions'
import { STORAGE_KEY } from './preferences'

afterEach(() => {
  cleanup()
  localStorage.clear()
  vi.restoreAllMocks()
  document.documentElement.removeAttribute('data-theme')
  document.documentElement.removeAttribute('data-text-size')
})

async function openPanel() {
  const user = userEvent.setup()
  await user.click(screen.getByRole('button', { name: 'Accessibility' }))
  return user
}

describe('AccessibilityOptions', () => {
  it('starts on the defaults', async () => {
    render(<AccessibilityOptions />)
    await openPanel()
    expect(screen.getByRole('radio', { name: 'Match system' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Default' })).toBeChecked()
  })

  it('applies and saves a theme and a text size', async () => {
    render(<AccessibilityOptions />)
    const user = await openPanel()
    await user.click(screen.getByRole('radio', { name: 'Dark' }))
    await user.click(screen.getByRole('radio', { name: 'Larger' }))
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    expect(document.documentElement).toHaveAttribute('data-text-size', 'larger')
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toEqual({ theme: 'dark', textSize: 'larger' })
    await user.click(screen.getByRole('radio', { name: 'Match system' }))
    await user.click(screen.getByRole('radio', { name: 'Default' }))
    expect(document.documentElement).not.toHaveAttribute('data-theme')
    expect(document.documentElement).not.toHaveAttribute('data-text-size')
  })

  it('shows saved choices as selected', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ theme: 'light', textSize: 'large' }))
    render(<AccessibilityOptions />)
    await openPanel()
    expect(screen.getByRole('radio', { name: 'Light' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Large' })).toBeChecked()
  })

  it('works by keyboard', async () => {
    render(<AccessibilityOptions />)
    const user = userEvent.setup()
    await user.tab()
    await user.keyboard('{Enter}')
    expect(screen.getByRole('button', { name: 'Accessibility' })).toHaveAttribute('aria-expanded', 'true')
    await user.tab()
    await user.keyboard('{ArrowDown}')
    expect(screen.getByRole('radio', { name: 'Light' })).toBeChecked()
  })

  it('still changes the display when storage is unavailable', async () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    render(<AccessibilityOptions />)
    const user = await openPanel()
    await user.click(screen.getByRole('radio', { name: 'Dark' }))
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
  })
})

describe('App header', () => {
  it('shows the Accessibility control', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: 'Accessibility', expanded: false })).toBeInTheDocument()
  })
})
