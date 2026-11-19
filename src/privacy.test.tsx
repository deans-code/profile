import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { pickValues } from './test-values'
import App from './App'

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return sourceFiles(path)
    return /\.(ts|tsx)$/.test(name) && !/\.test\.tsx?$/.test(name) && name !== 'test-setup.ts' && name !== 'test-values.ts'
      ? [path]
      : []
  })
}

describe('privacy statement stays true', () => {
  const files = sourceFiles(resolve(__dirname))
  const forbidden: [string, RegExp][] = [
    ['fetch', /\bfetch\s*\(/],
    ['XMLHttpRequest', /XMLHttpRequest/],
    ['sendBeacon', /sendBeacon/],
    ['WebSocket', /WebSocket/],
    ['EventSource', /EventSource/],
    ['cookie', /document\.cookie/],
  ]

  it('finds application source to check', () => {
    expect(files.length).toBeGreaterThan(10)
  })

  it.each(forbidden)('app code does not use %s', (_name, pattern) => {
    for (const file of files) expect(readFileSync(file, 'utf8'), file).not.toMatch(pattern)
  })

  it('index.html loads no third-party scripts, styles or fonts', () => {
    const html = readFileSync(resolve(__dirname, '../index.html'), 'utf8')
    expect(html).not.toMatch(/<(script|link)[^>]+(src|href)=["']https?:/i)
  })
})

describe('privacy notice', () => {
  const route = () => document.querySelector<HTMLDetailsElement>('details.privacy-help')!

  it('shows the purpose line and a privacy line on every page', async () => {
    const user = userEvent.setup()
    render(<App />)
    const check = () => {
      expect(screen.getByText(/what you want to learn and where you want to grow/)).toBeInTheDocument()
      expect(screen.getByText(/Runs entirely in your browser\. Nothing you choose is collected or sent anywhere, and no cookies are used/)).toBeInTheDocument()
    }
    check()
    await pickValues(user)
    await user.click(
      within(document.querySelector<HTMLElement>('footer.nav')!).getByRole('button', { name: /^Continue/ }),
    )
    check()
  })

  it('keeps the full statement collapsed until opened, and names the exceptions', async () => {
    const user = userEvent.setup()
    render(<App />)
    expect(route().open).toBe(false)
    await user.click(within(route()).getByText('Privacy'))
    expect(route().open).toBe(true)
    expect(route()).toHaveTextContent(/hosting provider.*server logs/i)
    expect(route()).toHaveTextContent(/ChatGPT link sends only a fixed prompt/i)
    expect(route()).toHaveTextContent(/theme and text size/i)
  })
})
