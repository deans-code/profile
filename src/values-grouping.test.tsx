import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { VALUE_CATEGORIES } from './data/values'
import { MAX_SELECTION as LIMIT } from './state/profile'

const word = (name: string) => screen.getByRole('button', { name })
const main = () => within(screen.getByRole('main'))

describe('grouped values', () => {
  it('shows every category as a headed card containing its values', () => {
    render(<App />)
    expect(VALUE_CATEGORIES.length).toBeGreaterThanOrEqual(8)
    for (const c of VALUE_CATEGORIES) {
      const heading = main().getByRole('heading', { name: c.category })
      const card = heading.closest('.category') as HTMLElement
      for (const v of c.values) expect(within(card).getByRole('button', { name: v })).toBeInTheDocument()
    }
  })

  it('shows no flat list: there is no Values list outside the categories', () => {
    render(<App />)
    expect(screen.queryByRole('list', { name: 'Values' })).not.toBeInTheDocument()
  })

  it('filters case-insensitively, hides empty categories and keeps selections', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(word('Integrity'))
    await user.type(screen.getByLabelText('Filter values'), 'RES')
    const shown = main()
      .getAllByRole('button')
      .filter((b) => b.hasAttribute('aria-pressed'))
      .map((b) => b.textContent!.replace('✓', '').trim())
    expect(shown.length).toBeGreaterThan(0)
    expect(shown.every((n) => n.toLowerCase().includes('res'))).toBe(true)
    expect(main().queryByRole('heading', { name: 'Freedom and autonomy' })).not.toBeInTheDocument()
    expect(word('Respect')).toBeInTheDocument()

    await user.clear(screen.getByLabelText('Filter values'))
    expect(word('Integrity')).toHaveAttribute('aria-pressed', 'true')
  })

  it('says when nothing matches the filter', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByLabelText('Filter values'), 'zzzz')
    expect(screen.getByText(/No values match your filter/)).toBeInTheDocument()
  })

  it('puts custom values in a Custom group, selected, and removes them again', async () => {
    const user = userEvent.setup()
    render(<App />)
    expect(main().queryByRole('heading', { name: 'Custom' })).not.toBeInTheDocument()
    await user.type(screen.getByLabelText('Add your own value'), 'Craft of docs')
    await user.click(screen.getByRole('button', { name: 'Add' }))
    const card = main().getByRole('heading', { name: 'Custom' }).closest('.category') as HTMLElement
    expect(within(card).getByRole('button', { name: 'Craft of docs' })).toHaveAttribute('aria-pressed', 'true')

    await user.click(screen.getByRole('button', { name: 'Remove Craft of docs' }))
    expect(main().queryByRole('heading', { name: 'Custom' })).not.toBeInTheDocument()
  })

  it('keeps the values limit', async () => {
    const user = userEvent.setup()
    render(<App />)
    const names = VALUE_CATEGORIES.flatMap((c) => c.values)
    for (const n of names.slice(0, LIMIT)) await user.click(word(n))
    expect(screen.getByText(new RegExp(`^${LIMIT} of ${LIMIT} selected`))).toBeInTheDocument()
    await user.click(word(names[LIMIT]))
    expect(word(names[LIMIT])).toHaveAttribute('aria-pressed', 'false')
    expect(word(names[LIMIT])).toHaveAttribute('aria-disabled', 'true')
  })

  it('opens a description on right-click without changing the selection, including for new values', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.pointer({ keys: '[MouseRight]', target: word('Integrity') })
    expect(screen.getByRole('dialog')).toHaveAccessibleName(/Integrity/)
    await user.keyboard('{Escape}')
    await user.pointer({ keys: '[MouseRight]', target: word('Mindfulness') })
    expect(screen.getByRole('dialog')).toHaveTextContent(/present moment/i)
    expect(word('Mindfulness')).toHaveAttribute('aria-pressed', 'false')
  })
})
