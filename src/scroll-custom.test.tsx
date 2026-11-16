import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FIVE_VALUES, pickValues } from './test-values'
import App from './App'
import { motion } from './test-setup'

const scroll = () => Element.prototype.scrollIntoView as unknown as ReturnType<typeof import('vitest').vi.fn>
const next = () => within(document.querySelector<HTMLElement>('footer.nav')!).getByRole('button', { name: /^(Continue|Finish)/ })

async function add(user: ReturnType<typeof userEvent.setup>, label: string, text: string) {
  await user.type(screen.getByLabelText(label), `${text}{Enter}`)
}

describe('adding a custom entry reveals the Custom card', () => {
  it('scrolls to the Custom card when a custom value is added', async () => {
    const user = userEvent.setup()
    render(<App />)
    await add(user, 'Add your own value', 'Craftsmanship of docs')
    const card = screen.getByRole('heading', { name: 'Custom' }).parentElement
    expect(scroll()).toHaveBeenCalledTimes(1)
    expect(scroll().mock.contexts[0]).toBe(card)
    expect(scroll()).toHaveBeenLastCalledWith({ block: 'nearest', behavior: 'auto' })
    expect(screen.getByRole('button', { name: 'Craftsmanship of docs' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('scrolls smoothly when motion is allowed', async () => {
    motion.reduced = false
    const user = userEvent.setup()
    render(<App />)
    await add(user, 'Add your own value', 'Grit')
    expect(scroll()).toHaveBeenLastCalledWith({ block: 'nearest', behavior: 'smooth' })
  })

  it('clears a filter that would hide the new value, keeping selections', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Fairness' }))
    await user.type(screen.getByLabelText('Filter values'), 'res')
    await add(user, 'Add your own value', 'Grit')
    expect(screen.getByLabelText('Filter values')).toHaveValue('')
    expect(screen.getByRole('button', { name: 'Grit' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Fairness' })).toHaveAttribute('aria-pressed', 'true')
    expect(scroll()).toHaveBeenCalledTimes(1)
  })

  it('does not scroll for empty text, text matching an existing value, or a second identical add', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByLabelText('Add your own value'), '   {Enter}')
    await add(user, 'Add your own value', 'fairness')
    expect(screen.getByRole('button', { name: 'Fairness' })).toHaveAttribute('aria-pressed', 'true')
    expect(scroll()).not.toHaveBeenCalled()
    await add(user, 'Add your own value', 'Grit')
    await add(user, 'Add your own value', 'grit')
    expect(scroll()).toHaveBeenCalledTimes(1)
  })

  it.each([
    ['Add your own technical development skill', 0],
    ['Add your own engineering skill', 1],
    ['Add your own interpersonal skill', 2],
    ['Add your own ai engineering skill', 3],
  ])('scrolls when a custom skill is added: %s', async (label, pages) => {
    const user = userEvent.setup()
    render(<App />)
    await pickValues(user, FIVE_VALUES)
    await user.click(next())
    for (let i = 0; i < pages; i++) {
      await user.click(document.querySelector<HTMLElement>('.chips button')!)
      await user.click(next())
    }
    scroll().mockClear()
    await add(user, label, 'Zig-like')
    expect(scroll()).toHaveBeenCalledTimes(1)
  })

  it('does not scroll when switching experience option or tabs with custom skills present', async () => {
    const user = userEvent.setup()
    render(<App />)
    await pickValues(user)
    await user.click(next())
    await add(user, 'Add your own technical development skill', 'Zig-like')
    scroll().mockClear()
    await user.click(screen.getByRole('radio', { name: /desired/i }))
    await user.click(screen.getByRole('radio', { name: /previous/i }))
    await user.click(document.querySelector<HTMLElement>('.chips button')!)
    await user.click(next())
    expect(scroll()).not.toHaveBeenCalled()
  })
})
