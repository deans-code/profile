import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import App from './../App'
import type { Source } from '../data/sources'

const fake = (id: string): Source => ({
  id,
  title: `Source ${id}`,
  publisher: `Publisher ${id}`,
  url: `https://example.org/${id}`,
  year: 2026,
})

const mocked = vi.hoisted(() => ({ sources: [] as string[] }))

vi.mock('../data/attribution', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../data/attribution')>()
  return {
    ...actual,
    getSources: (kind: string, name: string) =>
      kind === 'values' && name === 'Integrity' ? mocked.sources.map((id) => ({ id, title: `Source ${id}`, publisher: `Publisher ${id}`, url: `https://example.org/${id}`, year: 2026 })) : [],
  }
})

const word = (name: string) => screen.getByRole('button', { name })
const panel = () => screen.getByRole('dialog')

describe('definition panel sources', () => {
  it('shows one source as a new-tab link', async () => {
    mocked.sources = ['one']
    const user = userEvent.setup()
    render(<App />)
    await user.pointer({ keys: '[MouseRight]', target: word('Integrity') })
    expect(within(panel()).getByText('Sourced from')).toBeInTheDocument()
    const link = within(panel()).getByRole('link', { name: fake('one').title })
    expect(link).toHaveAttribute('href', fake('one').url)
    expect(link).toHaveAttribute('target', '_blank')
    expect(word('Integrity')).toHaveAttribute('aria-pressed', 'false')
  })

  it('lists every source, reachable by keyboard, and still closes on Escape', async () => {
    mocked.sources = ['one', 'two', 'three']
    const user = userEvent.setup()
    render(<App />)
    word('Integrity').focus()
    fireEvent.keyDown(word('Integrity'), { key: '?' })
    const links = within(panel()).getAllByRole('link')
    expect(links.map((l) => l.getAttribute('href'))).toEqual(mocked.sources.map((id) => fake(id).url))
    await user.tab()
    expect(links[0]).toHaveFocus()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('shows no sources section for options without attribution', async () => {
    mocked.sources = []
    const user = userEvent.setup()
    render(<App />)
    await user.pointer({ keys: '[MouseRight]', target: word('Integrity') })
    expect(within(panel()).queryByText('Sourced from')).toBeNull()
  })
})
