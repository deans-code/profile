import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BROAD_TERMS } from './data/broad-terms'
import { SECTIONS } from './data/skills'
import { parseProfile, profileToState } from './load'
import { initialState } from './state/profile'
import { pickValues } from './test-values'
import App from './App'

const next = () => within(document.querySelector<HTMLElement>('footer.nav')!).getByRole('button', { name: /^(Continue|Finish)/ })
const word = (name: string) => screen.getByRole('button', { name })
const card = () => document.querySelector<HTMLElement>('.broad-card')

/** Opens the skills page at the given index (0 = technical), choosing one skill on each page passed. */
async function openPage(user: ReturnType<typeof userEvent.setup>, index: number) {
  await pickValues(user)
  await user.click(next())
  for (let i = 0; i < index; i++) {
    await user.click(document.querySelector<HTMLElement>('.category:not(.broad-card) .chip')!)
    await user.click(next())
  }
}

describe('Broader terms card', () => {
  it.each(SECTIONS.map((s, i) => [s, i] as const))('is the first card on the %s page, with its terms and the individual options still listed', async (section, index) => {
    const user = userEvent.setup()
    render(<App />)
    await openPage(user, index)
    const first = document.querySelector('.categories .category')!
    expect(first).toBe(card())
    expect(within(first as HTMLElement).getByRole('heading', { name: 'Broader terms' })).toBeInTheDocument()
    const terms = BROAD_TERMS[section]
    expect(within(card()!).getAllByRole('button').length).toBe(terms.length)
    const sample = terms[0]
    expect(within(card()!).getByRole('button', { name: sample.name })).toHaveClass('broad')
    // The first covered option is still listed in its own category, outside the card.
    const covered = screen.getAllByRole('button', { name: sample.covers[0] })
    expect(covered.some((b) => !card()!.contains(b))).toBe(true)
  })

  it('selects a broader term without selecting the options it covers, and keeps both when both are chosen', async () => {
    const user = userEvent.setup()
    render(<App />)
    await openPage(user, 0)
    await user.click(within(card()!).getByRole('button', { name: 'CI/CD' }))
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

  it('is filtered by name and hides when nothing in it matches', async () => {
    const user = userEvent.setup()
    render(<App />)
    await openPage(user, 0)
    const filter = screen.getByLabelText('Filter skills')
    await user.type(filter, 'ci/cd')
    expect(within(card()!).getByRole('button', { name: 'CI/CD' })).toBeInTheDocument()
    await user.clear(filter)
    await user.type(filter, 'jenkins')
    expect(card()).toBeNull()
  })

  it('has a caption so the card does not rely on colour alone', async () => {
    const user = userEvent.setup()
    render(<App />)
    await openPage(user, 0)
    expect(card()).toHaveTextContent(/covers several options/i)
    await user.click(word('CI/CD'))
    expect(word('CI/CD')).toHaveAttribute('aria-pressed', 'true')
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
