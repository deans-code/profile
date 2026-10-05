import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

const chip = (name: string) => screen.getByRole('button', { name })
const next = () => screen.getByRole('button', { name: /continue|finish/i })

describe('values step', () => {
  it('shows an unselected cloud of at least 40 values', () => {
    render(<App />)
    const cloud = screen.getByRole('list', { name: 'Values' })
    const chips = within(cloud).getAllByRole('button')
    expect(chips.length).toBeGreaterThanOrEqual(40)
    expect(chips.every((c) => c.getAttribute('aria-pressed') === 'false')).toBe(true)
  })

  it('toggles a value with click and keyboard, updating the count', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(chip('Integrity'))
    expect(chip('Integrity')).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('1 selected')).toBeInTheDocument()
    await user.click(chip('Integrity'))
    expect(chip('Integrity')).toHaveAttribute('aria-pressed', 'false')

    chip('Honesty').focus()
    await user.keyboard('{Enter}')
    expect(chip('Honesty')).toHaveAttribute('aria-pressed', 'true')
    await user.keyboard(' ')
    expect(chip('Honesty')).toHaveAttribute('aria-pressed', 'false')
  })

  it('adds a custom value as selected, rejects empty, selects existing on duplicate, and removes', async () => {
    const user = userEvent.setup()
    render(<App />)
    const input = screen.getByLabelText('Add your own value')
    const add = screen.getByRole('button', { name: 'Add' })
    expect(add).toBeDisabled()

    await user.type(input, 'Grit')
    await user.click(add)
    expect(chip('Grit')).toHaveAttribute('aria-pressed', 'true')

    await user.type(input, ' integrity ')
    await user.click(add)
    expect(chip('Integrity')).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getAllByRole('button', { name: /^integrity$/i })).toHaveLength(1)

    await user.click(screen.getByRole('button', { name: 'Remove Grit' }))
    expect(screen.queryByRole('button', { name: 'Grit' })).not.toBeInTheDocument()
  })

  it('blocks continue until a value is selected, with an explanation', async () => {
    const user = userEvent.setup()
    render(<App />)
    expect(next()).toBeDisabled()
    expect(screen.getByRole('status')).toHaveTextContent(/at least one value/i)
    await user.click(chip('Integrity'))
    expect(next()).toBeEnabled()
  })
})

describe('skill steps', () => {
  async function toTechnical() {
    const user = userEvent.setup()
    render(<App />)
    await user.click(chip('Integrity'))
    await user.click(next())
    return user
  }

  it('shows categorized skills and filters while retaining selections', async () => {
    const user = await toTechnical()
    expect(screen.getByRole('heading', { name: 'Languages' })).toBeInTheDocument()
    await user.click(chip('Python'))
    await user.type(screen.getByLabelText('Filter skills'), 'script')
    expect(screen.queryByRole('button', { name: 'Python' })).not.toBeInTheDocument()
    expect(chip('JavaScript')).toBeInTheDocument()
    await user.clear(screen.getByLabelText('Filter skills'))
    expect(chip('Python')).toHaveAttribute('aria-pressed', 'true')
  })

  it('adds a custom skill under Custom, selecting an existing match on duplicates', async () => {
    const user = await toTechnical()
    const input = screen.getByLabelText(/add your own technical development skill/i)
    await user.type(input, 'Zig')
    await user.click(screen.getByRole('button', { name: 'Add' }))
    expect(screen.getByRole('heading', { name: 'Custom' })).toBeInTheDocument()
    expect(chip('Zig')).toHaveAttribute('aria-pressed', 'true')

    await user.type(input, ' go ')
    await user.click(screen.getByRole('button', { name: 'Add' }))
    expect(chip('Go')).toHaveAttribute('aria-pressed', 'true')
  })

  it('gates scoring until all sections have selections, names the missing ones, and keeps selections on back', async () => {
    const user = await toTechnical()
    await user.click(chip('Python'))
    await user.click(next())
    await user.click(next())
    expect(screen.getByRole('heading', { name: /interpersonal skills/i })).toBeInTheDocument()
    expect(next()).toBeDisabled()
    expect(screen.getByRole('status')).toHaveTextContent(/engineering, interpersonal/)

    await user.click(screen.getByRole('button', { name: 'Back' }))
    await user.click(screen.getByRole('button', { name: 'Back' }))
    expect(chip('Python')).toHaveAttribute('aria-pressed', 'true')
  })
})

describe('scoring and card', () => {
  async function toScoring() {
    const user = userEvent.setup()
    render(<App />)
    await user.click(chip('Integrity'))
    await user.click(next())
    await user.click(chip('Python'))
    await user.click(next())
    await user.click(chip('Scrum'))
    await user.click(next())
    await user.click(chip('Teamwork'))
    await user.click(next())
    return user
  }

  it('lists only selected skills with sliders defaulting to 5', async () => {
    await toScoring()
    const sliders = screen.getAllByRole('slider')
    expect(sliders).toHaveLength(3)
    for (const s of sliders) {
      expect(s).toHaveValue('5')
      expect(s).toHaveAttribute('min', '1')
      expect(s).toHaveAttribute('max', '10')
    }
    expect(screen.getByLabelText('Python')).toBeInTheDocument()
    expect(screen.queryByLabelText('Go')).not.toBeInTheDocument()
  })

  it('adjusts scores and retains them on navigation, resetting after deselect', async () => {
    // Arrow-key stepping on a range input is native browser behaviour (jsdom does not implement it);
    // it is covered by the manual check in task 7.1. Clamping to 1-10 is covered by the reducer tests.
    const user = await toScoring()
    const slider = screen.getByLabelText('Python')
    fireScore(slider, '7')
    expect(slider).toHaveValue('7')
    expect(screen.getByLabelText('Python score')).toHaveTextContent('7')
    fireScore(slider, '10')
    expect(slider).toHaveValue('10')

    await user.click(screen.getByRole('button', { name: 'Back' }))
    await user.click(screen.getByRole('button', { name: 'Back' }))
    await user.click(screen.getByRole('button', { name: 'Back' }))
    await user.click(chip('Go'))
    await user.click(screen.getByRole('button', { name: 'Continue' }))
    await user.click(next())
    await user.click(next())
    expect(screen.getByLabelText('Python')).toHaveValue('10')
    expect(screen.getByLabelText('Go')).toHaveValue('5')

    await user.click(screen.getByRole('button', { name: 'Back' }))
    await user.click(screen.getByRole('button', { name: 'Back' }))
    await user.click(screen.getByRole('button', { name: 'Back' }))
    await user.click(chip('Python'))
    await user.click(chip('Python'))
    await user.click(next())
    await user.click(next())
    await user.click(next())
    expect(screen.getByLabelText('Python')).toHaveValue('5')
  })

  it('shows the profile card ordered by score, with Edit retaining state', async () => {
    const user = await toScoring()
    fireScore(screen.getByLabelText('Teamwork'), '9')
    await user.click(next())
    const card = screen.getByRole('article', { name: 'Profile card' })
    expect(within(card).getByText('Integrity')).toBeInTheDocument()
    expect(within(card).getByText('9/10')).toBeInTheDocument()
    expect(within(card).getAllByText('5/10')).toHaveLength(2)

    await user.click(screen.getByRole('button', { name: 'Edit' }))
    expect(chip('Integrity')).toHaveAttribute('aria-pressed', 'true')
  })

  it('end to end: values, three skill sections, scoring, card, then both downloads', async () => {
    const user = await toScoring()
    await user.click(next())

    const created: Blob[] = []
    URL.createObjectURL = vi.fn((b: Blob | MediaSource) => {
      created.push(b as Blob)
      return 'blob:mock'
    })
    URL.revokeObjectURL = vi.fn()
    const names: string[] = []
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
      names.push(this.download)
    })

    await user.click(screen.getByRole('button', { name: 'Download JSON' }))
    await user.click(screen.getByRole('button', { name: 'Download Markdown' }))

    expect(names).toEqual(['profile.json', 'profile.md'])
    expect(JSON.parse(await created[0].text()).values).toEqual(['Integrity'])
    expect(await created[1].text()).toContain('- Python — 5/10')
    click.mockRestore()
  })
})

function fireScore(el: HTMLElement, value: string) {
  // user-event has no range drag; set the value through the native setter React tracks.
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!
  setter.call(el, value)
  el.dispatchEvent(new Event('input', { bubbles: true }))
}

describe('instructions', () => {
  it('shows how to select and open definitions at the top of every selection step', async () => {
    const user = userEvent.setup()
    render(<App />)
    const check = () => {
      const help = screen.getByRole('complementary', { name: 'How to use this step' })
      expect(help).toHaveTextContent(/click a word to select/i)
      expect(help).toHaveTextContent(/right-click a word to see what it means/i)
      expect(help).toHaveTextContent(/keyboard/i)
      expect(help).toHaveTextContent(/touch screen/i)
    }
    check()
    await user.click(chip('Integrity'))
    for (const word of ['Python', 'Scrum', 'Teamwork']) {
      await user.click(next())
      check()
      await user.click(chip(word))
    }
  })
})

describe('uniform words and section colours', () => {
  it('renders every value with the same class, with no size variants', () => {
    render(<App />)
    const cloud = screen.getByRole('list', { name: 'Values' })
    const classes = new Set(within(cloud).getAllByRole('button').map((b) => b.className))
    expect([...classes]).toEqual(['chip'])
  })

  it('renders skills with the same class as values', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(chip('Integrity'))
    await user.click(next())
    const skills = screen.getAllByRole('button').filter((b) => b.hasAttribute('aria-pressed'))
    expect(new Set(skills.map((b) => b.className))).toEqual(new Set(['chip']))
  })

  it('switches the section colour with each step and gives each step its own colour hook', async () => {
    const user = userEvent.setup()
    const { container } = render(<App />)
    const root = () => container.querySelector('.app-root')!
    expect(root()).toHaveAttribute('data-section', 'values')
    const steps = within(screen.getByRole('navigation', { name: 'Steps' })).getAllByRole('button')
    expect(steps.map((b) => b.getAttribute('data-section'))).toEqual([
      'values',
      'technical',
      'engineering',
      'interpersonal',
      'scoring',
      'card',
    ])
    await user.click(chip('Integrity'))
    await user.click(next())
    expect(root()).toHaveAttribute('data-section', 'technical')
  })
})

describe('end to end with definitions', () => {
  it('opening definitions along the way does not change the exported profile', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.pointer({ keys: '[MouseRight]', target: chip('Integrity') })
    await user.click(screen.getByRole('button', { name: 'Close' }))
    await user.click(chip('Integrity'))
    await user.click(next())
    await user.pointer({ keys: '[MouseRight]', target: chip('Python') })
    await user.click(screen.getByRole('button', { name: 'Close' }))
    await user.click(chip('Python'))
    await user.click(next())
    await user.click(chip('Scrum'))
    await user.click(next())
    await user.click(chip('Teamwork'))
    await user.click(next())
    await user.click(next())

    const card = screen.getByRole('article', { name: 'Profile card' })
    expect(within(card).getByText('Integrity')).toBeInTheDocument()
    expect(within(card).getByText('Python')).toBeInTheDocument()
    expect(within(card).getAllByText('5/10')).toHaveLength(3)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
