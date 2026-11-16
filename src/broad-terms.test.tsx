import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BROAD_TERMS } from './data/broad-terms'
import type { TermKind } from './data/definitions'
import { SECTIONS, broadTermCategory } from './data/skills'
import { buildProfile, toJson } from './export'
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
  /** Checks the page on screen: each term is a labelled, broad chip among the leading chips of its category, with its covered options in the same card. */
  function expectPlacement(kind: TermKind) {
    expect(screen.queryByRole('heading', { name: 'Broader terms' })).toBeNull()
    const cards = [...document.querySelectorAll<HTMLElement>('.category')].map((card) => ({
      heading: card.querySelector('h3')!.textContent!,
      chips: [...card.querySelectorAll<HTMLElement>('.chip')],
    }))
    for (const term of BROAD_TERMS[kind]) {
      const heading = broadTermCategory(kind, term)
      const card = cards.find((c) => c.heading === heading)!
      const own = BROAD_TERMS[kind].filter((t) => broadTermCategory(kind, t) === heading).length
      const leading = card.chips.slice(0, own)
      const chip = leading.find((c) => c.firstChild?.textContent?.trim() === term.name)
      expect(chip, `${term.name} in ${heading}`).toBeDefined()
      expect(chip!.classList.contains('broad'), term.name).toBe(true)
      expect(chip!.querySelector('.broad-label'), term.name).toHaveTextContent('Broad')
      expect(leading.every((c) => c.classList.contains('broad')), heading).toBe(true)
      const names = card.chips.map((c) => c.firstChild?.textContent?.trim())
      expect(names, term.name).toContain(term.covers.find((c) => cards.find((x) => x.heading === heading)!.chips.some((k) => k.firstChild?.textContent?.trim() === c)))
    }
  }

  it('on the values page each term is first in its own category, with its values still listed', async () => {
    render(<App />)
    expectPlacement('values')
    expect(categoryOf(word('Honesty and ethics')).querySelector('h3')).toHaveTextContent('Personal character')
    expect(within(categoryOf(word('Honesty and ethics'))).getByRole('button', { name: 'Honesty' })).toBeInTheDocument()
  })

  it.each(SECTIONS.map((s, i) => [s, i] as const))('on the %s page each term is first in its own category, with its options still listed', async (section, index) => {
    const user = userEvent.setup()
    render(<App />)
    await openPage(user, index)
    expectPlacement(section)
  }, 20000)

  it('shows the dashed-border note on the values and skills pages', async () => {
    const user = userEvent.setup()
    render(<App />)
    await pickValues(user)
    expect(screen.getByText(/dashed border are broader terms/i)).toBeInTheDocument()
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

describe('Broader values', () => {
  const FIVE = ['Fairness', 'Honesty', 'Integrity', 'Curiosity', 'Accountability']

  it('are independent of the values they cover and both are kept', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(word('Honesty and ethics'))
    expect(word('Honesty and ethics')).toHaveAttribute('aria-pressed', 'true')
    expect(word('Honesty')).toHaveAttribute('aria-pressed', 'false')
    await user.click(word('Honesty'))
    await user.click(word('Honesty and ethics'))
    expect(word('Honesty and ethics')).toHaveAttribute('aria-pressed', 'false')
    expect(word('Honesty')).toHaveAttribute('aria-pressed', 'true')
  })

  it('count toward the limit of 10 values and block further choices', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(word('Honesty and ethics'))
    for (const name of ['Fairness', 'Integrity', 'Curiosity', 'Accountability', 'Courage', 'Respect', 'Trust', 'Empathy', 'Humility']) await user.click(word(name))
    expect(screen.getByText(/^10 of 10 selected/)).toBeInTheDocument()
    expect(word('Focus')).toHaveAttribute('aria-disabled', 'true')
    await user.click(word('Honesty and ethics'))
    expect(screen.getByText(/^9 of 10 selected/)).toBeInTheDocument()
  })

  it('open a definition that names the values they cover', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.pointer({ keys: '[MouseRight]', target: word('Learning and self-development') })
    expect(screen.getByRole('dialog')).toHaveTextContent('Curiosity')
  })

  it('appear in the exported profile and load back as built-in values', () => {
    const state = { ...initialState, selectedValues: ['Honesty and ethics', ...FIVE.slice(0, 4)] }
    const exported = JSON.parse(toJson(buildProfile(state)))
    expect(exported.values).toContain('Honesty and ethics')
    const parsed = parseProfile(JSON.stringify({ ...exported, values: ['honesty and ethics', 'Fairness', 'Zest for life'] }))
    if (!parsed.ok) throw new Error(parsed.error)
    const loaded = profileToState(parsed.profile)
    expect(loaded.selectedValues).toEqual(['Honesty and ethics', 'Fairness', 'Zest for life'])
    expect(loaded.customValues).toEqual(['Zest for life'])
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
