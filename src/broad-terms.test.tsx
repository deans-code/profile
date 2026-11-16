import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BROAD_TERMS } from './data/broad-terms'
import { SECTIONS, broadTermCategory } from './data/skills'
import { parseProfile, profileToState } from './load'
import { initialState } from './state/profile'
import { pickValues } from './test-values'
import App from './App'

const next = () => within(document.querySelector<HTMLElement>('footer.nav')!).getByRole('button', { name: /^(Continue|Finish)/ })
const word = (name: string) => screen.getByRole('button', { name })
const categoryOf = (el: HTMLElement) => el.closest<HTMLElement>('.category')!

/** Opens the skills page at the given index (0 = technical), choosing one skill on each page passed. */
async function openPage(user: ReturnType<typeof userEvent.setup>, index: number) {
  await pickValues(user)
  await user.click(next())
  for (let i = 0; i < index; i++) {
    await user.click(document.querySelector<HTMLElement>('.category .chip:not(.broad)')!)
    await user.click(next())
  }
}

describe('Broader terms in their categories', () => {
  it.each(SECTIONS.map((s, i) => [s, i] as const))('on the %s page each term is first in its own category, with its options still listed', async (section, index) => {
    const user = userEvent.setup()
    render(<App />)
    await openPage(user, index)
    expect(screen.queryByRole('heading', { name: 'Broader terms' })).toBeNull()
    for (const term of BROAD_TERMS[section]) {
      const button = word(term.name)
      expect(button).toHaveClass('broad')
      const card = categoryOf(button)
      expect(within(card).getByRole('heading').textContent).toBe(broadTermCategory(section, term))
      const own = BROAD_TERMS[section].filter((t) => broadTermCategory(section, t) === broadTermCategory(section, term)).length
      const leading = within(card).getAllByRole('button').slice(0, own)
      expect(leading).toContain(button)
      expect(leading.every((b) => b.classList.contains('broad'))).toBe(true)
    }
    const sample = BROAD_TERMS[section][0]
    expect(within(categoryOf(word(sample.name))).getByRole('button', { name: sample.covers[0] })).toBeInTheDocument()
  })

  it('shows the dashed-border note on skills pages only', async () => {
    const user = userEvent.setup()
    render(<App />)
    await pickValues(user)
    expect(screen.queryByText(/dashed border are broader terms/i)).toBeNull()
    await user.click(next())
    expect(screen.getByText(/dashed border are broader terms/i)).toBeInTheDocument()
  })

  it('selects a broader term without selecting the options it covers, and keeps both when both are chosen', async () => {
    const user = userEvent.setup()
    render(<App />)
    await openPage(user, 0)
    await user.click(word('CI/CD'))
    expect(word('CI/CD')).toHaveAttribute('aria-pressed', 'true')
    expect(word('Jenkins')).toHaveAttribute('aria-pressed', 'false')
    await user.click(word('Jenkins'))
    await user.click(word('CI/CD'))
    expect(word('CI/CD')).toHaveAttribute('aria-pressed', 'false')
    expect(word('Jenkins')).toHaveAttribute('aria-pressed', 'true')
  })

  it('is independent for previous and desired experience', async () => {
    const user = userEvent.setup()
    render(<App />)
    await openPage(user, 0)
    await user.click(word('CI/CD'))
    await user.click(screen.getByRole('radio', { name: /desired/i }))
    expect(word('CI/CD')).toHaveAttribute('aria-pressed', 'false')
    await user.click(screen.getByRole('radio', { name: /previous/i }))
    expect(word('CI/CD')).toHaveAttribute('aria-pressed', 'true')
  })

  it('opens a definition that names the options it covers', async () => {
    const user = userEvent.setup()
    render(<App />)
    await openPage(user, 0)
    await user.pointer({ keys: '[MouseRight]', target: word('CI/CD') })
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAccessibleName(/CI\/CD/)
    expect(dialog).toHaveTextContent('Jenkins')
    expect(word('CI/CD')).toHaveAttribute('aria-pressed', 'false')
  })

  it('is filtered by name within its category and the card hides when nothing matches', async () => {
    const user = userEvent.setup()
    render(<App />)
    await openPage(user, 0)
    const filter = screen.getByLabelText('Filter skills')
    await user.type(filter, 'ci/cd')
    expect(word('CI/CD')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Docker' })).toBeNull()
    await user.clear(filter)
    await user.type(filter, 'jenkins')
    expect(screen.queryByRole('button', { name: 'CI/CD' })).toBeNull()
    expect(word('Jenkins')).toBeInTheDocument()
  })

  it('labels an unselected broader term and gives it no check mark; the label is not part of its name', async () => {
    const user = userEvent.setup()
    render(<App />)
    await openPage(user, 0)
    const chip = word('CI/CD')
    expect(chip.querySelector('.broad-label')).toHaveTextContent('Broad')
    expect(chip).toHaveAttribute('aria-pressed', 'false')
    await user.click(chip)
    expect(chip).toHaveAttribute('aria-pressed', 'true')
    expect(word('Jenkins')).not.toHaveClass('broad')
  })
})

describe('Broader terms in saved profiles', () => {
  const file = (technical: string[]) =>
    JSON.stringify({
      values: ['Fairness', 'Honesty', 'Integrity', 'Curiosity', 'Accountability'],
      skills: {
        technical: { experience: technical, desired: [] },
        engineering: { experience: [], desired: [] },
        interpersonal: { experience: [], desired: [] },
        ai: { experience: [], desired: [] },
      },
    })

  it('loads a broader term by name, ignoring case, as the built-in option', () => {
    const parsed = parseProfile(file(['ci/cd', 'Zig']))
    if (!parsed.ok) throw new Error(parsed.error)
    const s = { ...initialState, ...profileToState(parsed.profile) }
    expect(s.selectedSkills.technical.experience).toEqual(['CI/CD', 'Zig'])
    expect(s.customSkills.technical).toEqual(['Zig'])
  })
})
