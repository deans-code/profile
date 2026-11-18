import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

const toggleFor = (category: string) => screen.getByRole('button', { name: new RegExp(`^${category} category`) })
const word = (name: string) => screen.getByRole('button', { name })

describe('Collapsible category cards', () => {
  it('collapses and expands a card without changing the selection', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(word('Honesty and ethics'))
    const toggle = toggleFor('Personal character')
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('button', { name: 'Honesty and ethics' })).toBeNull()
    expect(toggleFor('Personal character')).toHaveAccessibleName('Personal character category, 1 selected')
    await user.click(toggle)
    expect(word('Honesty and ethics')).toHaveAttribute('aria-pressed', 'true')
  })

  it('toggles from the keyboard', async () => {
    const user = userEvent.setup()
    render(<App />)
    toggleFor('Personal character').focus()
    await user.keyboard('{Enter}')
    expect(toggleFor('Personal character')).toHaveAttribute('aria-expanded', 'false')
    await user.keyboard(' ')
    expect(toggleFor('Personal character')).toHaveAttribute('aria-expanded', 'true')
  })

  it('opens a collapsed card while the filter matches it, and restores it afterwards', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(toggleFor('Personal character'))
    await user.type(screen.getByRole('searchbox'), 'honesty')
    expect(toggleFor('Personal character')).toHaveAttribute('aria-expanded', 'true')
    expect(within(screen.getByRole('main')).getByRole('button', { name: 'Honesty' })).toBeVisible()
    await user.clear(screen.getByRole('searchbox'))
    expect(toggleFor('Personal character')).toHaveAttribute('aria-expanded', 'false')
  })

  it('expands a collapsed Custom card when a custom entry is added', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByLabelText(/add your own/i), 'Zest for life')
    await user.click(screen.getByRole('button', { name: 'Add' }))
    await user.click(toggleFor('Custom'))
    expect(toggleFor('Custom')).toHaveAttribute('aria-expanded', 'false')
    await user.type(screen.getByLabelText(/add your own/i), 'Warmth of spirit')
    await user.click(screen.getByRole('button', { name: 'Add' }))
    expect(toggleFor('Custom')).toHaveAttribute('aria-expanded', 'true')
    expect(word('Warmth of spirit')).toBeVisible()
  })
})
