import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { CATALOGS, SECTIONS, catalogSkillNames } from './data/skills'
import { COMMON_VALUES } from './data/values'
import { getDefinition } from './data/definitions'

// The AI engineering catalog has a "Continue" word, so look only in the footer.
const next = () => within(document.querySelector('footer')!).getByRole('button', { name: /Continue|Finish/ })

describe('page guidance', () => {
  it('shows the introduction above the steps on every page', async () => {
    const user = userEvent.setup()
    render(<App />)
    const intro = screen.getByText(/Build a personal profile of what you value/)
    const nav = screen.getByRole('navigation', { name: 'Steps' })
    expect(intro.compareDocumentPosition(nav) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()

    await user.click(screen.getByRole('button', { name: 'Respect' }))
    await user.click(next())
    expect(screen.getByText(/Build a personal profile of what you value/)).toBeInTheDocument()
  })

  it('shows the position, the next step and completed steps', async () => {
    const user = userEvent.setup()
    render(<App />)
    expect(screen.getByText(/Step 1 of 6/)).toHaveTextContent('Next: Technical development')

    await user.click(screen.getByRole('button', { name: 'Respect' }))
    await user.click(next())
    expect(screen.getByText(/Step 2 of 6/)).toHaveTextContent('Technical development')
    const nav = within(screen.getByRole('navigation', { name: 'Steps' }))
    expect(nav.getByRole('button', { name: /^Values/ })).toHaveAttribute('data-complete', 'true')
    expect(nav.getByRole('button', { name: 'Engineering' })).not.toHaveAttribute('data-complete')
  })

  it('introduces previous and desired experience above the options on skill pages only', async () => {
    const user = userEvent.setup()
    render(<App />)
    expect(screen.queryByText(/built from two kinds of experience/)).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Respect' }))
    await user.click(next())
    const intro = screen.getByText(/built from two kinds of experience/)
    const options = screen.getByRole('radiogroup', { name: 'Experience option' })
    expect(intro.compareDocumentPosition(options) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })
})

describe('curated options', () => {
  const values = COMMON_VALUES.map((v) => v.name)

  it('drops weak values and adds strong ones, each with a description', () => {
    for (const w of ['Comfort', 'Spontaneity', 'Hospitality', 'Cooperation', 'Knowledge', 'Balance', 'Success', 'Recognition', 'Drive', 'Choice', 'Fairness in pay']) {
      expect(values).not.toContain(w)
    }
    for (const w of ['Psychological safety', 'Intellectual honesty', 'Rigour', 'Sustainable pace', 'Learning in public']) {
      expect(values).toContain(w)
      expect(getDefinition('values', w)).toBeTruthy()
    }
  })

  it.each([
    ['technical', ['Expo', 'Cloud GPU instances', 'Parquet and data formats'], ['Deno and Bun', 'Playwright', 'Vite', 'Docker Compose', 'Supabase', 'Cloudflare']],
    ['engineering', ['Exploratory testing'], ['Architecture decision records', 'Platform engineering', 'Supply chain security', 'Dependency management', 'Legacy system modernisation', 'Database migrations', 'Cost optimisation (FinOps)']],
    ['interpersonal', ['Cultural awareness', 'Commercial awareness', 'Self-motivation'], ['Psychological safety', 'Pair and mob programming', 'Onboarding new team members', 'Knowledge sharing', 'Asynchronous communication']],
    ['ai', ['Olmoe', 'SmolLM', 'Phi', 'Jan', 'GPT4All', 'AnythingLLM', 'Qwen Code', 'Amp', 'Crush', 'SWE-agent', 'Cohere', 'Amazon (Nova)', 'AI-assisted documentation'], ['Parallel agent sessions', 'Building MCP servers', 'Prompt injection defence', 'Token and cost management', 'Long-running autonomous agents', 'Agent evaluation']],
  ] as const)('%s drops weak skills and adds strong ones', (section, removed, added) => {
    const names = catalogSkillNames(section)
    for (const w of removed) expect(names).not.toContain(w)
    for (const w of added) {
      expect(names).toContain(w)
      expect(getDefinition(section, w)).toBeTruthy()
    }
  })

  it('has no empty categories left in any section', () => {
    for (const s of SECTIONS) for (const c of CATALOGS[s]) expect(c.skills.length).toBeGreaterThan(0)
  })
})

describe('clearer navigation and messages', () => {
  it('names destinations on Back and Continue and shows the blocked reason as a callout', async () => {
    const user = userEvent.setup()
    render(<App />)
    const footer = within(document.querySelector<HTMLElement>('footer.nav')!)
    expect(footer.getByRole('button', { name: 'Continue to Technical development' })).toBeDisabled()
    expect(footer.getByRole('status')).toHaveTextContent('Before you continue: Choose at least one value')
    await user.click(screen.getByRole('button', { name: 'Respect' }))
    await user.click(next())
    expect(footer.getByRole('button', { name: 'Back to Values' })).toBeEnabled()
    expect(footer.getByRole('button', { name: 'Continue to Engineering' })).toBeEnabled()
  })

  it('shows badges, a check mark with text, a progress value and a page lead', async () => {
    const user = userEvent.setup()
    render(<App />)
    expect(screen.getByRole('progressbar', { name: 'Steps complete' })).toHaveAttribute('value', '0')
    expect(screen.getByText(/Pick up to five values/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Respect' }))
    await user.click(next())
    const nav = within(screen.getByRole('navigation', { name: 'Steps' }))
    const values = nav.getByRole('button', { name: /^Values/ })
    expect(values).toHaveTextContent('✓')
    expect(values).toHaveTextContent('(complete)')
    expect(screen.getByRole('progressbar', { name: 'Steps complete' })).toHaveAttribute('value', '1')
    expect(screen.getByText(/Pick the skills that apply/)).toBeInTheDocument()
  })
})
