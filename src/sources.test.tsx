import { readFileSync } from 'node:fs'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { sourcesFor } from './data/sources'

const next = () => within(document.querySelector<HTMLElement>('footer.nav')!).getByRole('button', { name: /^(Continue|Finish)/ })

async function toTechnical() {
  const user = userEvent.setup()
  render(<App />)
  await user.click(screen.getByRole('button', { name: 'Respect' }))
  await user.click(next())
  return user
}

describe('sources', () => {
  const urls = [
    'https://survey.stackoverflow.co/2026/technology/data',
    'https://devecosystem.jetbrains.com/tools-and-trends',
    'https://www.cncf.io/wp-content/uploads/2026/03/State-of-Cloud-Native-Development-Q1-2026.pdf',
  ]

  it('lists the technical sources with new-tab links, publishers and years', async () => {
    await toTechnical()
    const section = screen.getByRole('region', { name: 'Sources' })
    const links = within(section).getAllByRole('link')
    expect(links.map((l) => l.getAttribute('href'))).toEqual(urls)
    for (const l of links) {
      expect(l).toHaveAttribute('target', '_blank')
      expect(l.getAttribute('rel')).toContain('noopener')
    }
    for (const s of sourcesFor('technical')) expect(section).toHaveTextContent(`${s.publisher}, ${s.year}`)
    expect(section).toHaveTextContent(/guided which options/)
  })

  it('appears below the step controls', async () => {
    await toTechnical()
    const controls = document.querySelector('footer.nav')!
    const section = screen.getByRole('region', { name: 'Sources' })
    expect(controls.compareDocumentPosition(section) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('shows only the sources for its own tab', () => {
    render(<App />)
    // Values has no sources listed yet, so the section is absent rather than showing another tab's.
    expect(screen.queryByRole('region', { name: 'Sources' })).toBeNull()
  })

  it('is listed in the README', () => {
    const readme = readFileSync('README.md', 'utf-8')
    for (const url of urls) expect(readme).toContain(url)
    expect(readme).toMatch(/Selection rule/)
  })
})
