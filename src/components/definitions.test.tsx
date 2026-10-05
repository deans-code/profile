import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './../App'
import { CLICK_SUPPRESS_MS, LONG_PRESS_MS } from './TermButton'

const word = (name: string) => screen.getByRole('button', { name })
const panel = () => screen.queryByRole('dialog')

describe('definition panel', () => {
  it('opens on right-click without changing selection, showing the definition', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.pointer({ keys: '[MouseRight]', target: word('Integrity') })
    expect(panel()).toHaveAccessibleName('Description of Integrity')
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
    expect(panel()).toHaveAccessibleName('Description of Honesty')
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
    expect(panel()).toHaveAccessibleName('Description of Trust')
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
      expect(panel()).toHaveAccessibleName('Description of Quality')
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
        ({
          top: 10,
          bottom: 40,
          left: 950,
          right: 1050,
          width: 100,
          height: 30,
          x: 950,
          y: 10,
          toJSON: () => ({}),
        }) as DOMRect
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

describe('long-press does not swallow later selections', () => {
  async function longPress(el: HTMLElement) {
    fireEvent.pointerDown(el, { pointerType: 'touch' })
    await act(async () => {
      vi.advanceTimersByTime(LONG_PRESS_MS + 10)
    })
  }

  it('a press that ends with no click leaves the next tap working', async () => {
    vi.useFakeTimers()
    try {
      render(<App />)
      const el = word('Quality')
      await longPress(el)
      expect(panel()).toHaveAccessibleName('Description of Quality')
      fireEvent.pointerUp(el, { pointerType: 'touch' }) // released with no click
      await act(async () => {
        vi.advanceTimersByTime(CLICK_SUPPRESS_MS + 10)
      })
      fireEvent.click(word('Trust'))
      expect(word('Trust')).toHaveAttribute('aria-pressed', 'true')
      fireEvent.click(el)
      expect(el).toHaveAttribute('aria-pressed', 'true')
    } finally {
      vi.useRealTimers()
    }
  })

  it('a mouse click straight after a long-press toggles', async () => {
    vi.useFakeTimers()
    try {
      render(<App />)
      const el = word('Quality')
      await longPress(el)
      fireEvent.pointerUp(el, { pointerType: 'touch' })
      fireEvent.pointerDown(el, { pointerType: 'mouse' })
      fireEvent.click(el)
      expect(el).toHaveAttribute('aria-pressed', 'true')
    } finally {
      vi.useRealTimers()
    }
  })

  it('still suppresses the click that belongs to the long-press', async () => {
    vi.useFakeTimers()
    try {
      render(<App />)
      const el = word('Quality')
      await longPress(el)
      fireEvent.pointerUp(el, { pointerType: 'touch' })
      fireEvent.click(el)
      expect(el).toHaveAttribute('aria-pressed', 'false')
      expect(panel()).toBeInTheDocument()
    } finally {
      vi.useRealTimers()
    }
  })
})

describe('panel stays attached and closes when its word goes', () => {
  const rect = (top: number, left: number) =>
    ({
      top,
      bottom: top + 30,
      left,
      right: left + 100,
      width: 100,
      height: 30,
      x: left,
      y: top,
      toJSON: () => ({}),
    }) as DOMRect

  function withViewport<T>(run: () => Promise<T>) {
    Object.defineProperty(document.documentElement, 'clientWidth', { configurable: true, value: 1000 })
    return run().finally(() => {
      delete (document.documentElement as unknown as Record<string, unknown>).clientWidth
    })
  }

  it('stays open and repositions when the viewport resizes (for example an address bar hiding)', () =>
    withViewport(async () => {
      const user = userEvent.setup()
      render(<App />)
      const el = word('Respect')
      el.getBoundingClientRect = () => rect(100, 200)
      await user.pointer({ keys: '[MouseRight]', target: el })
      const before = parseFloat((panel() as HTMLElement).style.left)
      expect(before).toBe(200)

      el.getBoundingClientRect = () => rect(100, 300)
      act(() => {
        window.dispatchEvent(new Event('resize'))
      })
      expect(panel()).toBeInTheDocument()
      expect(parseFloat((panel() as HTMLElement).style.left)).toBe(300)
    }))

  it('closes when the word is scrolled completely off screen', () =>
    withViewport(async () => {
      const user = userEvent.setup()
      render(<App />)
      const el = word('Respect')
      el.getBoundingClientRect = () => rect(100, 200)
      await user.pointer({ keys: '[MouseRight]', target: el })
      el.getBoundingClientRect = () => rect(-500, 200)
      act(() => {
        window.dispatchEvent(new Event('scroll'))
      })
      expect(panel()).toBeNull()
    }))

  it('closes when the section changes by keyboard', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(word('Integrity'))
    word('Honesty').focus()
    await user.keyboard('?')
    expect(panel()).toBeInTheDocument()
    screen.getByRole('button', { name: 'Continue' }).focus()
    await user.keyboard('{Enter}')
    expect(screen.getByRole('heading', { name: /technical development skills/i })).toBeInTheDocument()
    expect(panel()).toBeNull()
  })

  it('closes when a filter removes the word from view', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(word('Integrity'))
    await user.click(screen.getByRole('button', { name: 'Continue' }))
    word('Python').focus()
    await user.keyboard('?')
    expect(panel()).toBeInTheDocument()
    ;(screen.getByLabelText('Filter skills') as HTMLInputElement).focus()
    await user.keyboard('script')
    expect(screen.queryByRole('button', { name: 'Python' })).not.toBeInTheDocument()
    expect(panel()).toBeNull()
  })
})

describe('word and panel association', () => {
  it('flags words that have definitions and links the open panel to its word', async () => {
    const user = userEvent.setup()
    render(<App />)
    expect(word('Integrity')).toHaveAttribute('aria-haspopup', 'dialog')
    expect(word('Integrity')).not.toHaveAttribute('aria-describedby')
    await user.pointer({ keys: '[MouseRight]', target: word('Integrity') })
    const dialog = screen.getByRole('dialog')
    expect(word('Integrity')).toHaveAttribute('aria-describedby', dialog.id)
    expect(word('Honesty')).not.toHaveAttribute('aria-describedby')
    await user.keyboard('{Escape}')
    expect(word('Integrity')).not.toHaveAttribute('aria-describedby')
  })

  it('does not advertise a definition on custom words', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByLabelText('Add your own value'), 'Grit')
    await user.click(screen.getByRole('button', { name: 'Add' }))
    expect(word('Grit')).not.toHaveAttribute('aria-haspopup')
  })
})

describe('controls match the instructions', () => {
  const help = () => screen.getByRole('complementary', { name: 'How to use this step' })

  it('every control the instructions describe opens a definition without changing selection', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    try {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)
      expect(help()).toHaveTextContent(/right-click/i)
      expect(help()).toHaveTextContent(/\?/)
      expect(help()).toHaveTextContent(/shift.*f10/i)
      expect(help()).toHaveTextContent(/press and hold/i)
      expect(help()).toHaveTextContent(/description/i)

      const el = word('Humility')
      const check = async (act: () => Promise<void> | void) => {
        await act()
        expect(panel()).toHaveAccessibleName('Description of Humility')
        expect(el).toHaveAttribute('aria-pressed', 'false')
        await user.keyboard('{Escape}')
        expect(panel()).toBeNull()
      }

      await check(() => user.pointer({ keys: '[MouseRight]', target: el }))
      await check(() => {
        el.focus()
        return user.keyboard('?')
      })
      await check(() => {
        el.focus()
        return user.keyboard('{Shift>}{F10}{/Shift}')
      })
      await check(() => {
        el.focus()
        return user.keyboard('{ContextMenu}')
      })
      await check(async () => {
        fireEvent.pointerDown(el, { pointerType: 'touch' })
        await act(async () => {
          vi.advanceTimersByTime(LONG_PRESS_MS + 10)
        })
        fireEvent.pointerUp(el, { pointerType: 'touch' })
      })
    } finally {
      vi.useRealTimers()
    }
  })
})
