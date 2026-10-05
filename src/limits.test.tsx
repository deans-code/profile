import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { COMMON_VALUES } from './data/values'

const word = (name: string) => screen.getByRole('button', { name })
const next = () => screen.getByRole('button', { name: /continue|finish/i })
const values = COMMON_VALUES.map((v) => v.name)

async function selectValues(user: ReturnType<typeof userEvent.setup>, n: number) {
  for (const name of values.slice(0, n)) await user.click(word(name))
}

describe('selection limit UI', () => {
  it('shows "n of 10 selected"', async () => {
    const user = userEvent.setup()
    render(<App />)
    expect(screen.getByText('0 of 10 selected')).toBeInTheDocument()
    await selectValues(user, 7)
    expect(screen.getByText(/^7 of 10 selected/)).toBeInTheDocument()
  })

  it('announces the limit and marks unselected words unavailable but focusable', async () => {
    const user = userEvent.setup()
    render(<App />)
    await selectValues(user, 10)
    const status = screen.getByText(/^10 of 10 selected/)
    expect(status).toHaveAttribute('aria-live', 'polite')
    expect(status).toHaveTextContent(/limit reached.*deselect a word to choose another/i)

    const extra = word(values[10])
    expect(extra).toHaveAttribute('aria-disabled', 'true')
    expect(extra).not.toBeDisabled()
    extra.focus()
    expect(extra).toHaveFocus()
    expect(word(values[0])).not.toHaveAttribute('aria-disabled')

    await user.click(extra)
    expect(extra).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByText(/^10 of 10 selected/)).toBeInTheDocument()
  })

  it('frees a slot when a word is deselected', async () => {
    const user = userEvent.setup()
    render(<App />)
    await selectValues(user, 10)
    await user.click(word(values[0]))
    expect(word(values[10])).not.toHaveAttribute('aria-disabled')
    await user.click(word(values[10]))
    expect(word(values[10])).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText(/^10 of 10 selected/)).toBeInTheDocument()
  })

  it('disables Add at the limit but keeps the typed text', async () => {
    const user = userEvent.setup()
    render(<App />)
    await selectValues(user, 9)
    const input = screen.getByLabelText('Add your own value')
    await user.type(input, 'Grit')
    await user.click(screen.getByRole('button', { name: 'Add' }))
    expect(word('Grit')).toHaveAttribute('aria-pressed', 'true')

    await user.type(input, 'Mettle')
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
    expect(input).toHaveValue('Mettle')
    await user.type(input, '{Enter}')
    expect(screen.queryByRole('button', { name: 'Mettle' })).not.toBeInTheDocument()
    expect(input).toHaveValue('Mettle')
  })

  it('still opens definitions for unavailable words and leaves the selection unchanged', async () => {
    const user = userEvent.setup()
    render(<App />)
    await selectValues(user, 10)
    await user.pointer({ keys: '[MouseRight]', target: word(values[10]) })
    expect(screen.getByRole('dialog')).toHaveAccessibleName(`Description of ${values[10]}`)
    expect(word(values[10])).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByText(/^10 of 10 selected/)).toBeInTheDocument()
  })

  it('does not limit skills: 12 selected shows a plain count, nothing dimmed, Add enabled', async () => {
    const user = userEvent.setup()
    render(<App />)
    await selectValues(user, 10)
    await user.click(next())
    const skills = within(screen.getByRole('main'))
      .getAllByRole('button')
      .filter((b) => b.hasAttribute('aria-pressed'))
    expect(screen.getByText('0 selected')).toBeInTheDocument()
    for (const b of skills.slice(0, 12)) await user.click(b)
    const status = screen.getByText('12 selected')
    expect(status).not.toHaveTextContent(/limit|of 10/i)
    expect(skills.slice(0, 12).every((b) => b.getAttribute('aria-pressed') === 'true')).toBe(true)
    expect(skills.some((b) => b.hasAttribute('aria-disabled'))).toBe(false)

    await user.type(screen.getByLabelText(/add your own technical development skill/i), 'Zig')
    expect(screen.getByRole('button', { name: 'Add' })).toBeEnabled()
    await user.click(screen.getByRole('button', { name: 'Add' }))
    expect(screen.getByRole('button', { name: 'Zig' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('13 selected')).toBeInTheDocument()
  })

  it('keeps the values limit while skills are unlimited', async () => {
    const user = userEvent.setup()
    render(<App />)
    await selectValues(user, 10)
    expect(screen.getByText(/^10 of 10 selected/)).toBeInTheDocument()
    await user.click(next())
    expect(screen.queryByText(/of 10 selected/)).not.toBeInTheDocument()
  })
})
