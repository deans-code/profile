import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { ASSISTANT_HELP, chatGptUrl } from './data/assistant'

const word = (name: string) => screen.getByRole('button', { name })
// The AI engineering catalog has a "Continue" word, so look only in the footer.
const next = () =>
  within(document.querySelector<HTMLElement>('footer.nav')!).getByRole('button', { name: /^(continue|finish)$/i })
const link = () => screen.queryByRole('link', { name: /open chatgpt/i })

async function goTo(user: ReturnType<typeof userEvent.setup>, step: 'technical' | 'engineering' | 'interpersonal') {
  await user.click(word('Integrity'))
  const picks = ['Python', 'Scrum', 'Teamwork']
  const order = ['technical', 'engineering', 'interpersonal']
  await user.click(next())
  for (let i = 0; i < order.indexOf(step); i++) {
    await user.click(word(picks[i]))
    await user.click(next())
  }
}

describe('ChatGPT link', () => {
  it('appears on the values page, above the instructions, and explains what it is for', () => {
    render(<App />)
    const l = link()!
    expect(l).toBeInTheDocument()
    const box = screen.getByRole('complementary', { name: 'Discover more values with ChatGPT' })
    expect(box).toHaveTextContent(/work with ChatGPT to discover more values/i)
    const help = screen.getByRole('complementary', { name: 'How to use this step' })
    expect(box.compareDocumentPosition(help) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('opens ChatGPT safely in a new tab with the values prompt', () => {
    render(<App />)
    const l = link()!
    expect(l).toHaveAttribute('target', '_blank')
    expect(l).toHaveAttribute('rel', expect.stringContaining('noopener'))
    expect(l).toHaveAttribute('rel', expect.stringContaining('noreferrer'))
    expect(l.getAttribute('href')).toMatch(/^https:\/\/chatgpt\.com\/\?q=/)
    expect(l).toHaveAccessibleName(/opens in a new tab/i)

    const prompt = new URL(l.getAttribute('href')!).searchParams.get('q')!
    expect(prompt).toBe(ASSISTANT_HELP.values!.prompt)
    expect(prompt).toMatch(/personal profile/i)
    expect(prompt).toMatch(/discovering my core values/i)
    expect(prompt).toMatch(/principles and qualities that matter most/i)
    expect(prompt).toMatch(/Please suggest/i)
  })

  it('appears on the interpersonal page with its own prompt', async () => {
    const user = userEvent.setup()
    render(<App />)
    await goTo(user, 'interpersonal')
    expect(screen.getByRole('heading', { name: /interpersonal skills/i })).toBeInTheDocument()
    const box = screen.getByRole('complementary', { name: 'Discover more interpersonal skills with ChatGPT' })
    expect(box).toHaveTextContent(/work with ChatGPT to discover more interpersonal skills/i)
    const prompt = new URL(link()!.getAttribute('href')!).searchParams.get('q')!
    expect(prompt).toBe(ASSISTANT_HELP.interpersonal!.prompt)
    expect(prompt).toMatch(/professional profile/i)
    expect(prompt).toMatch(/interpersonal skills/i)
    expect(prompt).toMatch(/Please suggest/i)
  })

  it('does not appear on the technical development or engineering pages', async () => {
    const user = userEvent.setup()
    render(<App />)
    await goTo(user, 'technical')
    expect(screen.getByRole('heading', { name: /technical development skills/i })).toBeInTheDocument()
    expect(link()).not.toBeInTheDocument()
    await user.click(word('Python'))
    await user.click(next())
    expect(screen.getByRole('heading', { name: /engineering skills/i })).toBeInTheDocument()
    expect(link()).not.toBeInTheDocument()
  })

  it('does not include anything the user has selected or typed', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(word('Integrity'))
    await user.type(screen.getByLabelText('Add your own value'), 'MyPrivateValue')
    await user.click(screen.getByRole('button', { name: 'Add' }))
    const href = link()!.getAttribute('href')!
    expect(decodeURIComponent(href)).not.toContain('MyPrivateValue')
    expect(href).toBe(chatGptUrl(ASSISTANT_HELP.values!.prompt))
  })

  it('does not appear on the AI engineering or profile pages', async () => {
    const user = userEvent.setup()
    render(<App />)
    await goTo(user, 'interpersonal')
    await user.click(word('Teamwork'))
    await user.click(next())
    expect(link()).not.toBeInTheDocument()
    await user.click(word('Ollama'))
    await user.click(next())
    expect(link()).not.toBeInTheDocument()
  })
})
