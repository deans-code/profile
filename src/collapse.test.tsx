import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { startCollapsed } from './test-setup'
import App from './App'

const toggleFor = (category: string) => screen.getByRole('button', { name: new RegExp(`^${category} category`) })
const word = (name: string) => screen.getByRole('button', { name })
const queryWord = (name: string) => screen.queryByRole('button', { name })
const bulk = (name: 'Show all' | 'Collapse all') => screen.getByRole('button', { name })

describe('Collapsible category cards', () => {
  beforeEach(() => {
    startCollapsed.on = true
  })

  it('opens every card collapsed, showing only the headers', () => {
    render(<App />)
    const toggles = document.querySelectorAll('.category-toggle')
    expect(toggles.length).toBeGreaterThan(3)
    for (const t of toggles) expect(t).toHaveAttribute('aria-expanded', 'false')
    expect(queryWord('Honesty and ethics')).toBeNull()
    for (const chip of document.querySelectorAll('.category .chip')) expect(chip).not.toBeVisible()
  })

  it('expands and collapses a card without changing the selection', async () => {
    const user = userEvent.setup()
    render(<App />)
    const toggle = toggleFor('Personal character')
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await user.click(word('Honesty and ethics'))
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(queryWord('Honesty and ethics')).toBeNull()
    expect(toggleFor('Personal character')).toHaveAccessibleName('Personal character category, 1 selected')
    await user.click(toggle)
    expect(word('Honesty and ethics')).toHaveAttribute('aria-pressed', 'true')
  })

  it('toggles from the keyboard', async () => {
    const user = userEvent.setup()
    render(<App />)
    toggleFor('Personal character').focus()
    await user.keyboard('{Enter}')
    expect(toggleFor('Personal character')).toHaveAttribute('aria-expanded', 'true')
    await user.keyboard(' ')
    expect(toggleFor('Personal character')).toHaveAttribute('aria-expanded', 'false')
  })

  it('shows all cards, then collapses all, keeping selections and announcing each', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(bulk('Show all'))
    for (const t of document.querySelectorAll('.category-toggle')) expect(t).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('All sections shown')).toBeInTheDocument()
    await user.click(word('Honesty and ethics'))
    await user.click(bulk('Collapse all'))
    for (const t of document.querySelectorAll('.category-toggle')) expect(t).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByText('All sections collapsed')).toBeInTheDocument()
    expect(toggleFor('Personal character')).toHaveAccessibleName(/1 selected/)
    await user.click(bulk('Show all'))
    expect(word('Honesty and ethics')).toHaveAttribute('aria-pressed', 'true')
  })

  it('opens a collapsed card while the filter matches it, and restores it afterwards', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByRole('searchbox'), 'honesty')
    expect(toggleFor('Personal character')).toHaveAttribute('aria-expanded', 'true')
    expect(within(screen.getByRole('main')).getByRole('button', { name: 'Honesty' })).toBeVisible()
    await user.clear(screen.getByRole('searchbox'))
    expect(toggleFor('Personal character')).toHaveAttribute('aria-expanded', 'false')
  })

  it('opens the Custom card when a custom entry is added', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByLabelText(/add your own/i), 'Zest for life')
    await user.click(screen.getByRole('button', { name: 'Add' }))
    expect(toggleFor('Custom')).toHaveAttribute('aria-expanded', 'true')
    expect(word('Zest for life')).toBeVisible()
    await user.click(toggleFor('Custom'))
    await user.type(screen.getByLabelText(/add your own/i), 'Warmth of spirit')
    await user.click(screen.getByRole('button', { name: 'Add' }))
    expect(toggleFor('Custom')).toHaveAttribute('aria-expanded', 'true')
    expect(word('Warmth of spirit')).toBeVisible()
  })
})
