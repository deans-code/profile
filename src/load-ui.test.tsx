import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { MAX_FILE_BYTES } from './load'

const word = (name: string) => screen.getByRole('button', { name })
// The AI engineering catalog has a "Continue" word, so look only in the footer.
const next = () =>
  within(document.querySelector<HTMLElement>('footer.nav')!).getByRole('button', { name: /^(continue|finish)$/i })
const radio = (name: RegExp) => screen.getByRole('radio', { name })
const picker = () => screen.getByLabelText('Choose a saved profile file') as HTMLInputElement
const card = () => screen.getByRole('article', { name: 'Profile card' })

const lists = (experience: string[], desired: string[] = []) => ({ experience, desired })

const profileJson = (overrides: Record<string, unknown> = {}) =>
  JSON.stringify({
    exportedAt: '2026-01-02T03:04:05.000Z',
    values: lists(['Integrity', 'Grit']),
    skills: {
      technical: lists(['Python', 'Zig']),
      engineering: lists(['Scrum']),
      interpersonal: lists(['Teamwork']),
      ai: lists(['Ollama'], ['OpenRouter']),
    },
    ...overrides,
  })

/** A file downloaded before experience options: scored skills, no AI page. */
const legacyJson = () =>
  JSON.stringify({
    exportedAt: '2026-01-02T03:04:05.000Z',
    values: ['Integrity'],
    skills: {
      technical: [{ name: 'Python', score: 9 }],
      engineering: [{ name: 'Scrum', score: 6 }],
      interpersonal: [{ name: 'Teamwork', score: 7 }],
    },
  })

const upload = (user: ReturnType<typeof userEvent.setup>, text: string, name = 'profile.json') =>
  user.upload(picker(), new File([text], name, { type: 'application/json' }))

describe('Load saved profile', () => {
  it('is available on every page', async () => {
    const user = userEvent.setup()
    render(<App />)
    expect(screen.getByRole('button', { name: 'Load saved profile' })).toBeInTheDocument()
    await user.click(word('Integrity'))
    await user.click(next())
    expect(screen.getByRole('button', { name: 'Load saved profile' })).toBeInTheDocument()
  })

  it('restores a valid file and shows the profile card with both options', async () => {
    const user = userEvent.setup()
    render(<App />)
    await upload(user, profileJson())
    expect(await screen.findByRole('heading', { name: 'Your profile' })).toBeInTheDocument()
    for (const name of ['Integrity', 'Grit', 'Python', 'Zig', 'Ollama', 'OpenRouter']) {
      expect(within(card()).getByText(name)).toBeInTheDocument()
    }
    expect(within(card()).getAllByText('Desired experience')).toHaveLength(1)
    expect(card()).not.toHaveTextContent(/\/10/)
    expect(screen.getByText(/Loaded profile\.json/)).toBeInTheDocument()
  })

  it('loads an older file with scores as previous experience, ignoring the scores', async () => {
    const user = userEvent.setup()
    render(<App />)
    await upload(user, legacyJson())
    // The AI engineering page is empty, so the app asks for a selection there.
    expect((await screen.findAllByText(/Select at least one skill in: ai engineering/)).length).toBeGreaterThan(0)
    expect(screen.getByRole('heading', { name: /ai engineering skills/i })).toBeInTheDocument()
    await user.click(word('Ollama'))
    await user.click(next())
    expect(within(card()).getByText('Python')).toBeInTheDocument()
    expect(card()).not.toHaveTextContent(/\/10|9/)
    expect(within(card()).queryByText('Desired experience')).not.toBeInTheDocument()
  })

  it('lets the user edit the loaded profile through every step', async () => {
    const user = userEvent.setup()
    render(<App />)
    await upload(user, profileJson())
    await screen.findByRole('heading', { name: 'Your profile' })
    await user.click(screen.getByRole('button', { name: 'Edit' }))

    // Values: loaded values selected, custom restored.
    expect(word('Integrity')).toHaveAttribute('aria-pressed', 'true')
    expect(word('Grit')).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText(/^2 of 20 selected/)).toBeInTheDocument()
    await user.click(word('Trust'))
    await user.click(next())

    // Technical: loaded skills selected (built-in and custom).
    expect(word('Python')).toHaveAttribute('aria-pressed', 'true')
    expect(word('Zig')).toHaveAttribute('aria-pressed', 'true')
    await user.click(word('Go'))
    await user.click(next())
    expect(word('Scrum')).toHaveAttribute('aria-pressed', 'true')
    await user.click(next())
    expect(word('Teamwork')).toHaveAttribute('aria-pressed', 'true')
    await user.click(next())

    // AI engineering: both options restored.
    expect(word('Ollama')).toHaveAttribute('aria-pressed', 'true')
    expect(radio(/^Desired experience/)).toHaveTextContent('Desired experience (1)')
    await user.click(radio(/^Desired experience/))
    expect(word('OpenRouter')).toHaveAttribute('aria-pressed', 'true')
    await user.click(next())
    expect(within(card()).getByText('Trust')).toBeInTheDocument()
    expect(within(card()).getByText('Go')).toBeInTheDocument()
  })

  it('matches built-in entries ignoring case and restores others as custom', async () => {
    const user = userEvent.setup()
    render(<App />)
    await upload(user, profileJson({ values: lists(['integrity']) }))
    await screen.findByRole('heading', { name: 'Your profile' })
    expect(within(card()).getByText('Integrity')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Edit' }))
    expect(screen.getAllByRole('button', { name: /^integrity$/i })).toHaveLength(1)
  })

  describe('rejections leave the current profile unchanged', () => {
    it.each([
      ['not JSON', 'hello', /not valid JSON/],
      ['wrong structure', JSON.stringify({ values: ['a'] }), /not a profile downloaded from this app/],
      [
        'a name that is not text',
        profileJson({ values: lists([5 as never]) }),
        /values lists contains a name that is not text/,
      ],
    ])('%s', async (_name, text, message) => {
      const user = userEvent.setup()
      render(<App />)
      await upload(user, text as string)
      expect(await screen.findByText(message as RegExp)).toBeInTheDocument()
      expect(screen.getByText(/Your profile is unchanged/)).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: /what do you value/i })).toBeInTheDocument()
      expect(screen.queryByRole('heading', { name: 'Your profile' })).not.toBeInTheDocument()
    })

    it('an oversized file', async () => {
      const user = userEvent.setup()
      render(<App />)
      await upload(user, 'x'.repeat(MAX_FILE_BYTES + 1))
      expect(await screen.findByText(/larger than 1 MB/)).toBeInTheDocument()
    })

    it('keeps existing selections after a rejected file', async () => {
      const user = userEvent.setup()
      render(<App />)
      await user.click(word('Integrity'))
      await upload(user, 'nope')
      await screen.findByText(/not valid JSON/)
      expect(word('Integrity')).toHaveAttribute('aria-pressed', 'true')
      expect(screen.queryByRole('group', { name: /confirm/i })).not.toBeInTheDocument()
    })
  })

  describe('replacing existing progress', () => {
    it('asks to confirm, and Replace loads the file', async () => {
      const user = userEvent.setup()
      render(<App />)
      await user.click(word('Trust'))
      await upload(user, profileJson())
      const confirm = await screen.findByRole('group', { name: 'Confirm loading a profile' })
      expect(confirm).toHaveTextContent('Replace your current profile with profile.json?')
      expect(screen.getByRole('button', { name: 'Replace' })).toHaveFocus()
      expect(screen.queryByRole('heading', { name: 'Your profile' })).not.toBeInTheDocument()

      await user.click(screen.getByRole('button', { name: 'Replace' }))
      expect(await screen.findByRole('heading', { name: 'Your profile' })).toBeInTheDocument()
      expect(within(card()).queryByText('Trust')).not.toBeInTheDocument()
      expect(within(card()).getByText('Integrity')).toBeInTheDocument()
    })

    it('counts a desired-only selection as progress to replace', async () => {
      const user = userEvent.setup()
      render(<App />)
      await user.click(radio(/^Desired experience/))
      await user.click(word('Trust'))
      await upload(user, profileJson())
      expect(await screen.findByRole('group', { name: 'Confirm loading a profile' })).toBeInTheDocument()
    })

    it('Cancel leaves the profile and page unchanged', async () => {
      const user = userEvent.setup()
      render(<App />)
      await user.click(word('Trust'))
      await upload(user, profileJson())
      await user.click(await screen.findByRole('button', { name: 'Cancel' }))
      expect(screen.getByText(/Load cancelled/)).toBeInTheDocument()
      expect(word('Trust')).toHaveAttribute('aria-pressed', 'true')
      expect(screen.getByRole('heading', { name: /what do you value/i })).toBeInTheDocument()
    })

    it('loads without a prompt when there are no selections', async () => {
      const user = userEvent.setup()
      render(<App />)
      await upload(user, profileJson())
      await screen.findByRole('heading', { name: 'Your profile' })
      expect(screen.queryByRole('group', { name: /confirm/i })).not.toBeInTheDocument()
    })
  })

  it('processes the same file twice', async () => {
    const user = userEvent.setup()
    render(<App />)
    const file = new File([profileJson()], 'profile.json', { type: 'application/json' })
    await user.upload(picker(), file)
    await screen.findByRole('heading', { name: 'Your profile' })
    await user.click(screen.getByRole('button', { name: 'Edit' }))
    await user.click(word('Trust'))
    await user.upload(picker(), file)
    await user.click(await screen.findByRole('button', { name: 'Replace' }))
    await screen.findByRole('heading', { name: 'Your profile' })
    expect(within(card()).queryByText('Trust')).not.toBeInTheDocument()
  })

  describe('over-limit and incomplete files', () => {
    it('loads all 22 values, opens the values page and says how many to deselect', async () => {
      const user = userEvent.setup()
      render(<App />)
      const values = Array.from({ length: 22 }, (_, i) => `Custom value ${i}`)
      await upload(user, profileJson({ values: lists(values) }))
      expect(
        await screen.findByText(/Loaded profile\.json\. Deselect 2 words under Previous experience on the values page/),
      ).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: /what do you value/i })).toBeInTheDocument()
      expect(screen.getByText(/^22 of 20 selected/)).toHaveTextContent(/deselect 2 words/i)
      expect(next()).toBeDisabled()

      await user.click(word('Custom value 0'))
      await user.click(word('Custom value 1'))
      expect(screen.getByText(/^20 of 20 selected/)).toBeInTheDocument()
      expect(next()).toBeEnabled()
    })

    it('opens the first page that needs attention for an incomplete file', async () => {
      const user = userEvent.setup()
      render(<App />)
      await upload(
        user,
        profileJson({
          skills: {
            technical: lists(['Python']),
            engineering: lists([]),
            interpersonal: lists([]),
            ai: lists(['Ollama']),
          },
        }),
      )
      expect(await screen.findByText(/Select at least one skill in: engineering, interpersonal/)).toBeInTheDocument()
      await waitFor(() => expect(screen.getByRole('heading', { name: /engineering skills/i })).toBeInTheDocument())
    })
  })
})

describe('end to end: build, download, load, edit, download', () => {
  it('round-trips a profile built in the UI', async () => {
    const user = userEvent.setup()
    const blobs: Blob[] = []
    URL.createObjectURL = vi.fn((b: Blob | MediaSource) => {
      blobs.push(b as Blob)
      return 'blob:mock'
    })
    URL.revokeObjectURL = vi.fn()
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {})

    const first = render(<App />)
    await user.click(word('Integrity'))
    await user.type(screen.getByLabelText('Add your own value'), 'Grit')
    await user.click(screen.getByRole('button', { name: 'Add' }))
    await user.click(next())
    await user.click(word('Python'))
    await user.click(radio(/^Desired experience/))
    await user.click(word('Rust'))
    await user.click(radio(/^Previous experience/))
    await user.click(next())
    await user.click(word('Scrum'))
    await user.click(next())
    await user.click(word('Teamwork'))
    await user.click(next())
    await user.click(word('Ollama'))
    await user.click(radio(/^Desired experience/))
    await user.click(word('OpenRouter'))
    await user.click(next())
    await user.click(screen.getByRole('button', { name: 'Download JSON' }))
    const original = await blobs[0].text()
    first.unmount()

    // A fresh session: load the downloaded file, then download again.
    render(<App />)
    await upload(user, original, 'my-profile.json')
    await screen.findByRole('heading', { name: 'Your profile' })
    await user.click(screen.getByRole('button', { name: 'Download JSON' }))
    const reloaded = await blobs[1].text()
    const strip = (t: string) => ({ ...JSON.parse(t), exportedAt: undefined })
    expect(strip(reloaded)).toEqual(strip(original))

    await user.click(screen.getByRole('button', { name: 'Edit' }))
    await user.click(radio(/^Previous experience/))
    await user.click(word('Trust'))
    for (let i = 0; i < 5; i++) await user.click(next())
    await user.click(screen.getByRole('button', { name: 'Download JSON' }))
    const edited = JSON.parse(await blobs[2].text())
    expect(edited.values).toEqual(lists(['Grit', 'Integrity', 'Trust']))
    expect(edited.skills.technical).toEqual(lists(['Python'], ['Rust']))
    expect(edited.skills.ai).toEqual(lists(['Ollama'], ['OpenRouter']))
  })
})
