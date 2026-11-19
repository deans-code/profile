import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { TermKind } from './data/definitions'
import { SECTIONS, groupedCategories } from './data/skills'
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
  const chipName = (c: Element) => c.firstChild?.textContent?.trim()

  /** Checks the page on screen: each term heads a group in its category with the options it owns, and every option is shown once. */
  function expectGroups(kind: TermKind) {
    expect(screen.queryByRole('heading', { name: 'Broader terms' })).toBeNull()
    expect(document.querySelector('.broad-card')).toBeNull()
    const names = [...document.querySelectorAll('.chip')].map(chipName)
    expect(new Set(names).size).toBe(names.length)
    for (const category of groupedCategories(kind)) {
      const card = [...document.querySelectorAll<HTMLElement>('.category')].find((c) => c.querySelector('.category-name')!.textContent === category.category)!
      for (const g of category.groups) {
        const group = card.querySelector<HTMLElement>(`[role="group"][aria-label="${g.term} and the options it groups"]`)
        expect(group, `${g.term} in ${category.category}`).not.toBeNull()
        const head = group!.querySelector('.group-head .chip')!
        expect(chipName(head), g.term).toBe(g.term)
        expect(head.classList.contains('broad'), g.term).toBe(true)
        expect(head.querySelector('.broad-label'), g.term).toHaveTextContent('Broad')
        expect(group!.querySelector('.group-caption'), g.term).toHaveTextContent('Groups these')
        expect([...group!.querySelectorAll('ul .chip')].map(chipName), g.term).toEqual(g.options)
      }
      const others = [...card.querySelectorAll('.category > div > ul .chip')].map(chipName)
      expect(others, category.category).toEqual(category.others)
    }
  }

  it('on the values page each term heads a group of its own values, shown once', async () => {
    render(<App />)
    expectGroups('values')
    const group = categoryOf(word('Honesty and ethics'))
    expect(group.querySelector('h3')).toHaveTextContent('Personal character')
    expect(within(group.querySelector<HTMLElement>('[role="group"]')!).getByRole('button', { name: 'Honesty' })).toBeInTheDocument()
  })

  it.each(SECTIONS.map((s, i) => [s, i] as const))('on the %s page each term heads a group of its own options, shown once', async (section, index) => {
    const user = userEvent.setup()
    render(<App />)
    await openPage(user, index)
    expectGroups(section)
  }, 20000)

  it('groups Jenkins and GitHub Actions under CI/CD, and shows an overlapping option once under the shorter term', async () => {
    const user = userEvent.setup()
    render(<App />)
    await openPage(user, 0)
    const ci = word('CI/CD').closest<HTMLElement>('[role="group"]')!
    expect(within(ci).getByRole('button', { name: 'Jenkins' })).toBeInTheDocument()
    expect(within(ci).getByRole('button', { name: 'GitHub Actions' })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Rider' })).toHaveLength(1)
    expect(word('Rider').closest('[role="group"]')).toHaveAccessibleName(/^Platform and enterprise IDEs/)
  })

  it('shows "Other options" under the groups only in cards that have both', async () => {
    const user = userEvent.setup()
    render(<App />)
    await openPage(user, 0)
    const card = categoryOf(word('CI/CD'))
    expect(card.querySelector('.others-caption')).toHaveTextContent('Other options')
  })

  it('explains that a broader term heads the group below it, on the values and skills pages', async () => {
    const user = userEvent.setup()
    render(<App />)
    expect(screen.getByText(/deselects those options, and choosing one of them deselects it/i)).toBeInTheDocument()
    await pickValues(user)
    await user.click(next())
    expect(screen.getByText(/deselects those options, and choosing one of them deselects it/i)).toBeInTheDocument()
  })

  it('selects a broader term in place of the options it covers, and the reverse', async () => {
    const user = userEvent.setup()
    render(<App />)
    await openPage(user, 0)
    await user.click(word('CI/CD'))
    expect(word('CI/CD')).toHaveAttribute('aria-pressed', 'true')
    expect(word('Jenkins')).toHaveAttribute('aria-pressed', 'false')
    await user.click(word('Jenkins'))
    await user.click(word('GitHub Actions'))
    expect(word('CI/CD')).toHaveAttribute('aria-pressed', 'false')
    expect(word('Jenkins')).toHaveAttribute('aria-pressed', 'true')
    await user.click(word('CI/CD'))
    expect(word('CI/CD')).toHaveAttribute('aria-pressed', 'true')
    expect(word('Jenkins')).toHaveAttribute('aria-pressed', 'false')
    expect(word('GitHub Actions')).toHaveAttribute('aria-pressed', 'false')
    await user.click(word('CI/CD'))
    expect(word('Jenkins')).toHaveAttribute('aria-pressed', 'false')
  })

  it('leaves the other experience option alone', async () => {
    const user = userEvent.setup()
    render(<App />)
    await openPage(user, 0)
    await user.click(screen.getByRole('radio', { name: /desired/i }))
    await user.click(word('Jenkins'))
    await user.click(screen.getByRole('radio', { name: /previous/i }))
    await user.click(word('CI/CD'))
    await user.click(screen.getByRole('radio', { name: /desired/i }))
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

  it('keeps a group when its option matches, with the term shown for context, and counts only matching words', async () => {
    const user = userEvent.setup()
    render(<App />)
    await openPage(user, 0)
    const filter = screen.getByLabelText('Filter skills')
    await user.type(filter, 'jenkins')
    const group = word('CI/CD').closest<HTMLElement>('[role="group"]')!
    expect(within(group).getAllByRole('button').map((b) => b.textContent!.replace('✓', '').replace('Broad', '').trim())).toEqual(['CI/CD', 'Jenkins'])
    expect(screen.getByText(/^Showing 1 of /)).toBeInTheDocument()
    await user.clear(filter)
    await user.type(filter, 'ci/cd')
    expect(within(word('CI/CD').closest<HTMLElement>('[role="group"]')!).getAllByRole('button').length).toBeGreaterThanOrEqual(1)
    expect(screen.queryByRole('button', { name: 'Docker' })).toBeNull()
    await user.clear(filter)
    await user.type(filter, 'zzzz')
    expect(screen.queryAllByRole('group').filter((g) => g.tagName !== 'DETAILS')).toEqual([])
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

  it('replace the values they cover, and the reverse', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(word('Honesty and ethics'))
    expect(word('Honesty and ethics')).toHaveAttribute('aria-pressed', 'true')
    expect(word('Honesty')).toHaveAttribute('aria-pressed', 'false')
    await user.click(word('Honesty'))
    expect(word('Honesty and ethics')).toHaveAttribute('aria-pressed', 'false')
    expect(word('Honesty')).toHaveAttribute('aria-pressed', 'true')
    await user.click(word('Honesty and ethics'))
    expect(word('Honesty and ethics')).toHaveAttribute('aria-pressed', 'true')
    expect(word('Honesty')).toHaveAttribute('aria-pressed', 'false')
  })

  it('count toward the limit of 10 values and block further choices', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(word('Honesty and ethics'))
    for (const name of ['Fairness', 'Curiosity', 'Creativity', 'Accountability', 'Courage', 'Respect', 'Trust', 'Empathy', 'Loyalty']) await user.click(word(name))
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
