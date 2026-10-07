import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

const chip = (name: string) => screen.getByRole('button', { name })
// The AI engineering catalog has a "Continue" word, so look only in the footer.
const next = () =>
  within(document.querySelector<HTMLElement>('footer.nav')!).getByRole('button', { name: /^(continue|finish)$/i })

describe('values step', () => {
  it('shows at least 100 unselected values', () => {
    render(<App />)
    const chips = within(screen.getByRole('main'))
      .getAllByRole('button')
      .filter((b) => b.hasAttribute('aria-pressed'))
    expect(chips.length).toBeGreaterThanOrEqual(100)
    expect(chips.every((c) => c.getAttribute('aria-pressed') === 'false')).toBe(true)
  })

  it('toggles a value with click and keyboard, updating the count', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(chip('Integrity'))
    expect(chip('Integrity')).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('1 of 20 selected')).toBeInTheDocument()
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

  it('gates the profile until all pages have selections, names the missing ones, and keeps selections on back', async () => {
    const user = await toTechnical()
    await user.click(chip('Python'))
    await user.click(next())
    await user.click(next())
    expect(screen.getByRole('heading', { name: /interpersonal skills/i })).toBeInTheDocument()
    await user.click(next())
    expect(screen.getByRole('heading', { name: /ai engineering skills/i })).toBeInTheDocument()
    expect(next()).toBeDisabled()
    expect(screen.getByRole('status')).toHaveTextContent(/engineering, interpersonal, ai engineering/)

    for (let i = 0; i < 3; i++) await user.click(screen.getByRole('button', { name: 'Back' }))
    expect(chip('Python')).toHaveAttribute('aria-pressed', 'true')
  })
})

describe('experience options', () => {
  const radio = (name: RegExp) => screen.getByRole('radio', { name })

  it('shows both options on every selection page, defaulting to previous experience', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(chip('Integrity'))
    for (let page = 0; page < 5; page++) {
      expect(screen.getByRole('radiogroup', { name: 'Experience option' })).toBeInTheDocument()
      expect(radio(/^Previous experience/)).toBeChecked()
      expect(radio(/^Desired experience/)).not.toBeChecked()
      if (page < 4) await user.click(next())
    }
  })

  it('keeps previous and desired selections apart, with a count on each option', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(chip('Integrity'))
    await user.click(next())
    await user.click(chip('Python'))
    await user.click(chip('Go'))
    expect(radio(/^Previous experience/)).toHaveTextContent('Previous experience (2)')
    expect(radio(/^Desired experience/)).toHaveTextContent('Desired experience (0)')

    await user.click(radio(/^Desired experience/))
    expect(radio(/^Desired experience/)).toBeChecked()
    expect(chip('Python')).toHaveAttribute('aria-pressed', 'false')
    await user.click(chip('Python'))
    await user.click(chip('Rust'))
    expect(radio(/^Previous experience/)).toHaveTextContent('Previous experience (2)')
    expect(radio(/^Desired experience/)).toHaveTextContent('Desired experience (2)')

    await user.click(radio(/^Previous experience/))
    expect(chip('Python')).toHaveAttribute('aria-pressed', 'true')
    expect(chip('Rust')).toHaveAttribute('aria-pressed', 'false')
  })

  it('switches with the arrow keys', async () => {
    const user = userEvent.setup()
    render(<App />)
    radio(/^Previous experience/).focus()
    await user.keyboard('{ArrowRight}')
    expect(radio(/^Desired experience/)).toBeChecked()
    expect(radio(/^Desired experience/)).toHaveFocus()
    await user.keyboard('{ArrowLeft}')
    expect(radio(/^Previous experience/)).toBeChecked()
  })

  it('carries the chosen option to the next page', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(radio(/^Desired experience/))
    await user.click(chip('Integrity'))
    await user.click(next())
    expect(radio(/^Desired experience/)).toBeChecked()
    expect(screen.getByRole('complementary', { name: 'How to use this step' })).toHaveTextContent(
      /choosing Desired experience/,
    )
  })

  it('applies the limit of 20 values to each option separately', async () => {
    const user = userEvent.setup()
    render(<App />)
    const pick = async () => {
      const buttons = within(screen.getByRole('main'))
        .getAllByRole('button')
        .filter((b) => b.hasAttribute('aria-pressed'))
      for (const b of buttons.slice(0, 20)) await user.click(b)
    }
    await pick()
    expect(screen.getByText(/20 of 20 selected/)).toBeInTheDocument()
    await user.click(radio(/^Desired experience/))
    expect(screen.getByText('0 of 20 selected')).toBeInTheDocument()
    await pick()
    expect(screen.getByText(/20 of 20 selected/)).toBeInTheDocument()
  })

  it('adds a custom entry to the active option only', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(chip('Integrity'))
    await user.click(next())
    await user.click(radio(/^Desired experience/))
    await user.type(screen.getByLabelText(/add your own technical development skill/i), 'Zig')
    await user.click(screen.getByRole('button', { name: 'Add' }))
    expect(chip('Zig')).toHaveAttribute('aria-pressed', 'true')
    await user.click(radio(/^Previous experience/))
    expect(chip('Zig')).toHaveAttribute('aria-pressed', 'false')
    expect(radio(/^Desired experience/)).toHaveTextContent('Desired experience (1)')
  })
})

describe('profile card and downloads', () => {
  async function toCard() {
    const user = userEvent.setup()
    render(<App />)
    await user.click(chip('Integrity'))
    await user.click(next())
    await user.click(chip('Python'))
    await user.click(radio(/^Desired experience/))
    await user.click(chip('Rust'))
    await user.click(radio(/^Previous experience/))
    await user.click(next())
    await user.click(chip('Scrum'))
    await user.click(next())
    await user.click(chip('Teamwork'))
    await user.click(next())
    await user.click(chip('Ollama'))
    await user.click(radio(/^Desired experience/))
    await user.click(chip('OpenRouter'))
    await user.click(next())
    return user
  }
  const radio = (name: RegExp) => screen.getByRole('radio', { name })

  it('has no scoring step and no sliders anywhere', async () => {
    render(<App />)
    const steps = within(screen.getByRole('navigation', { name: 'Steps' })).getAllByRole('button')
    expect(steps.map((b) => b.textContent)).toEqual([
      'Values',
      'Technical development',
      'Engineering',
      'Interpersonal',
      'AI engineering',
      'Profile',
    ])
    expect(screen.queryByRole('slider')).not.toBeInTheDocument()
  })

  it('shows previous and desired words as separate groups, without scores, with Edit retaining state', async () => {
    const user = await toCard()
    const card = screen.getByRole('article', { name: 'Profile card' })
    expect(within(card).getAllByText('Previous experience').length).toBeGreaterThan(0)
    expect(within(card).getAllByText('Desired experience').length).toBeGreaterThan(0)
    expect(within(card).getByText('Python')).toBeInTheDocument()
    expect(within(card).getByText('Rust')).toBeInTheDocument()
    expect(within(card).getByText('Ollama')).toBeInTheDocument()
    expect(within(card).getByText('OpenRouter')).toBeInTheDocument()
    expect(card).not.toHaveTextContent(/\/10/)
    expect(card.querySelector('.bar, .score')).toBeNull()

    await user.click(screen.getByRole('button', { name: 'Edit' }))
    await user.click(radio(/^Previous experience/))
    expect(chip('Integrity')).toHaveAttribute('aria-pressed', 'true')
  })

  it('omits an empty group', async () => {
    await toCard()
    const card = screen.getByRole('article', { name: 'Profile card' })
    const engineering = within(card).getByRole('heading', { name: 'Engineering' }).parentElement!
    expect(within(engineering).getByText('Previous experience')).toBeInTheDocument()
    expect(within(engineering).queryByText('Desired experience')).not.toBeInTheDocument()
  })

  it('downloads JSON and Markdown with both options and no scores', async () => {
    const user = await toCard()
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
    const json = JSON.parse(await created[0].text())
    expect(json.values).toEqual({ experience: ['Integrity'], desired: [] })
    expect(json.skills.technical).toEqual({ experience: ['Python'], desired: ['Rust'] })
    expect(json.skills.ai).toEqual({ experience: ['Ollama'], desired: ['OpenRouter'] })
    const md = await created[1].text()
    expect(md).toContain('## AI engineering')
    expect(md).toContain('- Python')
    expect(md).not.toMatch(/\/10|score/i)
    click.mockRestore()
  })
})

describe('instructions', () => {
  const help = () => screen.getByRole('complementary', { name: 'How to use this step' })

  it('leads with the desktop controls, then the option line, the page line, then one secondary line', async () => {
    render(<App />)
    const lines = within(help()).getAllByText(/./, { selector: 'p' })
    expect(lines).toHaveLength(4)
    expect(lines[0]).toHaveTextContent(
      'Click a word to select or deselect it. Right-click a word to read its description.',
    )
    expect(lines[1]).toHaveTextContent(
      'You are choosing Previous experience. The other option has its own selections: switch with the buttons above.',
    )
    expect(lines[2]).toHaveTextContent('Select up to 20 values for each option.')
    expect(lines[3]).toHaveClass('help-alt')
    expect(lines[3]).toHaveTextContent(
      'Mouse: right-click a word. Keyboard: focus a word and press ? or Shift+F10. Touch: press and hold.',
    )
    expect(help()).not.toHaveTextContent(/definition/i)
  })

  it('states the values limit on the values page only; skill pages say as many as apply', async () => {
    const user = userEvent.setup()
    render(<App />)
    expect(help()).toHaveTextContent(/up to 20 values/i)
    await user.click(chip('Integrity'))
    for (const [section, word] of [
      ['technical', 'Python'],
      ['engineering', 'Scrum'],
      ['interpersonal', 'Teamwork'],
      ['ai', 'Ollama'],
    ]) {
      await user.click(next())
      expect(
        screen.getByRole('heading', {
          name: new RegExp(section === 'technical' ? 'technical development' : section === 'ai' ? 'ai engineering' : section, 'i'),
        }),
      ).toBeInTheDocument()
      expect(help()).toHaveTextContent(/select as many skills as apply/i)
      expect(help()).not.toHaveTextContent(/limit|up to \d+|of \d+/i)
      expect(help()).toHaveTextContent(/right-click/i)
      expect(help()).toHaveTextContent(/choosing Previous experience/)
      if (section !== 'ai') await user.click(chip(word))
    }
  })

  it('names the open panel as a description', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.pointer({ keys: '[MouseRight]', target: chip('Respect') })
    expect(screen.getByRole('dialog')).toHaveAccessibleName('Description of Respect')
  })
})

describe('uniform words and section colours', () => {
  it('renders every value with the same class, with no size variants', () => {
    render(<App />)
    const chips = within(screen.getByRole('main'))
      .getAllByRole('button')
      .filter((b) => b.hasAttribute('aria-pressed'))
    expect([...new Set(chips.map((b) => b.className))]).toEqual(['chip'])
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
      'ai',
      'card',
    ])
    await user.click(chip('Integrity'))
    await user.click(next())
    expect(root()).toHaveAttribute('data-section', 'technical')
  })
})

describe('end to end with definitions', () => {
  it('opening descriptions along the way does not change the exported profile', async () => {
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
    await user.pointer({ keys: '[MouseRight]', target: chip('Ollama') })
    expect(screen.getByRole('dialog')).toHaveAccessibleName('Description of Ollama')
    await user.click(screen.getByRole('button', { name: 'Close' }))
    await user.click(chip('Ollama'))
    await user.click(next())

    const card = screen.getByRole('article', { name: 'Profile card' })
    expect(within(card).getByText('Integrity')).toBeInTheDocument()
    expect(within(card).getByText('Python')).toBeInTheDocument()
    expect(within(card).getByText('Ollama')).toBeInTheDocument()
    expect(within(card).getAllByText('Previous experience')).toHaveLength(5)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})

describe('end to end with many skills', () => {
  it('shows and exports 30+ skills across pages', async () => {
    const user = userEvent.setup()
    const blobs: Blob[] = []
    URL.createObjectURL = vi.fn((b: Blob | MediaSource) => {
      blobs.push(b as Blob)
      return 'blob:mock'
    })
    URL.revokeObjectURL = vi.fn()
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {})
    render(<App />)

    await user.click(chip('Integrity'))
    await user.click(next())

    const pickSome = async (count: number) => {
      const buttons = within(screen.getByRole('main'))
        .getAllByRole('button')
        .filter((b) => b.hasAttribute('aria-pressed'))
        .slice(0, count)
      for (const b of buttons) await user.click(b)
      return buttons.map((b) => b.textContent!.replace('✓', '').trim())
    }
    const technical = await pickSome(14)
    await user.click(next())
    const engineering = await pickSome(12)
    await user.click(next())
    const interpersonal = await pickSome(6)
    expect(screen.getByText('6 selected')).toBeInTheDocument()
    await user.click(next())
    const ai = await pickSome(10)
    await user.click(next())

    const card = screen.getByRole('article', { name: 'Profile card' })
    for (const name of [...technical, ...engineering, ...interpersonal, ...ai]) {
      expect(within(card).getByText(name)).toBeInTheDocument()
    }

    await user.click(screen.getByRole('button', { name: 'Download JSON' }))
    await user.click(screen.getByRole('button', { name: 'Download Markdown' }))
    const json = JSON.parse(await blobs[0].text())
    expect(json.skills.technical.experience).toHaveLength(14)
    expect(json.skills.engineering.experience).toHaveLength(12)
    expect(json.skills.interpersonal.experience).toHaveLength(6)
    expect(json.skills.ai.experience).toHaveLength(10)
    const markdown = await blobs[1].text()
    expect(markdown.match(/^- /gm)).toHaveLength(1 + 14 + 12 + 6 + 10)
  })
})
