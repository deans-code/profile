import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './../App'
import { LONG_PRESS_MS } from './TermButton'

const word = (name: string) => screen.getByRole('button', { name })
const panel = () => screen.queryByRole('dialog')

describe('definition panel', () => {
  it('opens on right-click without changing selection, showing the definition', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.pointer({ keys: '[MouseRight]', target: word('Integrity') })
    expect(panel()).toHaveAccessibleName('Definition of Integrity')
    expect(panel()).toHaveTextContent(/principles/i)
    expect(word('Integrity')).toHaveAttribute('aria-pressed', 'false')
  })

  it('prevents the browser context menu for built-in words', () => {
    render(<App />)
    const notPrevented = fireEvent.contextMenu(word('Integrity'))
    expect(notPrevented).toBe(false)
  })

  it('leaves custom words to the browser menu and opens no panel', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByLabelText('Add your own value'), 'Grit')
    await user.click(screen.getByRole('button', { name: 'Add' }))
    const notPrevented = fireEvent.contextMenu(word('Grit'))
    expect(notPrevented).toBe(true)
    expect(panel()).toBeNull()
  })

  it.each([
    ['?', '?'],
    ['ContextMenu', '{ContextMenu}'],
    ['Shift+F10', '{Shift>}{F10}{/Shift}'],
  ])('opens from the keyboard with %s', async (_label, keys) => {
    const user = userEvent.setup()
    render(<App />)
    word('Honesty').focus()
    await user.keyboard(keys)
    expect(panel()).toHaveAccessibleName('Definition of Honesty')
    expect(word('Honesty')).toHaveAttribute('aria-pressed', 'false')
  })

  it('closes with Escape and returns focus to the word', async () => {
    const user = userEvent.setup()
    render(<App />)
    word('Honesty').focus()
    await user.keyboard('?')
    expect(panel()).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(panel()).toBeNull()
    expect(word('Honesty')).toHaveFocus()
  })

  it('closes with the Close button and with an outside press', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.pointer({ keys: '[MouseRight]', target: word('Respect') })
    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(panel()).toBeNull()
    expect(word('Respect')).toHaveFocus()

    await user.pointer({ keys: '[MouseRight]', target: word('Respect') })
    await user.click(screen.getByRole('heading', { name: /what do you value/i }))
    expect(panel()).toBeNull()
  })

  it('shows only one panel at a time', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.pointer({ keys: '[MouseRight]', target: word('Respect') })
    await user.pointer({ keys: '[MouseRight]', target: word('Trust') })
    expect(screen.getAllByRole('dialog')).toHaveLength(1)
    expect(panel()).toHaveAccessibleName('Definition of Trust')
  })

  it('opens on touch long-press without toggling selection', () => {
    vi.useFakeTimers()
    try {
      render(<App />)
      const el = word('Quality')
      fireEvent.pointerDown(el, { pointerType: 'touch' })
      act(() => {
        vi.advanceTimersByTime(LONG_PRESS_MS + 10)
      })
      fireEvent.pointerUp(el, { pointerType: 'touch' })
      fireEvent.click(el)
      expect(panel()).toHaveAccessibleName('Definition of Quality')
      expect(el).toHaveAttribute('aria-pressed', 'false')

      // A normal tap afterwards still toggles.
      fireEvent.pointerDown(el, { pointerType: 'touch' })
      fireEvent.pointerUp(el, { pointerType: 'touch' })
      fireEvent.click(el)
      expect(el).toHaveAttribute('aria-pressed', 'true')
    } finally {
      vi.useRealTimers()
    }
  })

  it('does not open on a short touch', () => {
    vi.useFakeTimers()
    try {
      render(<App />)
      const el = word('Quality')
      fireEvent.pointerDown(el, { pointerType: 'touch' })
      act(() => {
        vi.advanceTimersByTime(LONG_PRESS_MS - 100)
      })
      fireEvent.pointerUp(el, { pointerType: 'touch' })
      act(() => {
        vi.advanceTimersByTime(500)
      })
      expect(panel()).toBeNull()
    } finally {
      vi.useRealTimers()
    }
  })

  it('keeps the panel within the viewport', async () => {
    // jsdom has no layout, so give it a 1000px-wide viewport and a 300px-wide panel.
    const vw = Object.getOwnPropertyDescriptor(Element.prototype, 'clientWidth')
    const ow = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth')
    Object.defineProperty(document.documentElement, 'clientWidth', { configurable: true, value: 1000 })
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 300 })
    try {
      const user = userEvent.setup()
      render(<App />)
      const el = word('Respect')
      el.getBoundingClientRect = () =>
        ({ top: 10, bottom: 40, left: 950, right: 1050, width: 100, height: 30, x: 950, y: 10, toJSON: () => ({}) }) as DOMRect
      await user.pointer({ keys: '[MouseRight]', target: el })
      const left = parseFloat((panel() as HTMLElement).style.left)
      expect(left).toBe(1000 - 300 - 8)
    } finally {
      delete (document.documentElement as unknown as Record<string, unknown>).clientWidth
      if (vw) Object.defineProperty(Element.prototype, 'clientWidth', vw)
      if (ow) Object.defineProperty(HTMLElement.prototype, 'offsetWidth', ow)
    }
  })

  it('works for skills in every section', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(word('Integrity'))
    await user.click(screen.getByRole('button', { name: 'Continue' }))
    await user.pointer({ keys: '[MouseRight]', target: word('Python') })
    expect(panel()).toHaveTextContent(/readable, general-purpose/i)
  })
})
