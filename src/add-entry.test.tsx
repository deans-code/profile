import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

const next = () => within(document.querySelector<HTMLElement>('footer.nav')!).getByRole('button', { name: /^(Continue|Finish)/ })
const before = (a: Element, b: Element) => !!(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING)

describe('add your own at the top', () => {
  it('sits before the filter and the first category on the values page', () => {
    render(<App />)
    const input = screen.getByLabelText('Add your own value')
    expect(before(input, screen.getByLabelText('Filter values'))).toBe(true)
    expect(before(input, document.querySelector('.category')!)).toBe(true)
  })

  it('sits after the experience options and before the filter and cards on a skill page', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Respect' }))
    await user.click(next())
    const input = screen.getByLabelText('Add your own technical development skill')
    expect(before(screen.getByRole('radiogroup', { name: 'Experience option' }), input)).toBe(true)
    expect(before(input, screen.getByLabelText('Filter skills'))).toBe(true)
    expect(before(input, document.querySelector('.category')!)).toBe(true)
  })

  it('shows an instruction linked to the input, and adds a word with Enter', async () => {
    const user = userEvent.setup()
    render(<App />)
    const input = screen.getByLabelText('Add your own value')
    expect(input).toHaveAccessibleDescription(/Type it and press Add or Enter.*Custom/)
    await user.type(input, 'Grit{Enter}')
    expect(screen.getByRole('button', { name: 'Grit' })).toHaveAttribute('aria-pressed', 'true')
    expect(input).toHaveValue('')
  })

  it('shows the limit reason beside the disabled Add at 5 values, and not for skills', async () => {
    const user = userEvent.setup()
    render(<App />)
    expect(screen.queryByText(/Limit reached: deselect a word to add another/)).not.toBeInTheDocument()
    for (const v of ['Respect', 'Integrity', 'Honesty', 'Courage', 'Humility']) {
      await user.click(screen.getByRole('button', { name: v }))
    }
    const form = document.querySelector<HTMLElement>('form.add-entry')!
    expect(within(form).getByRole('button', { name: 'Add' })).toBeDisabled()
    expect(within(form).getByText(/Limit reached: deselect a word to add another/)).toBeInTheDocument()
    await user.click(next())
    expect(screen.queryByText(/Limit reached: deselect a word to add another/)).not.toBeInTheDocument()
  })
})
