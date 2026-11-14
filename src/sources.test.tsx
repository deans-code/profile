import { readFileSync } from 'node:fs'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { SOURCE_REGISTRY, sourcesFor } from './data/sources'

const next = () => within(document.querySelector<HTMLElement>('footer.nav')!).getByRole('button', { name: /^(Continue|Finish)/ })

async function toTechnical() {
  const user = userEvent.setup()
  render(<App />)
  await user.click(screen.getByRole('button', { name: 'Respect' }))
  await user.click(next())
  return user
}

describe('sources', () => {
  const urls = sourcesFor('technical').map((s) => s.url)

  it('lists the technical sources with new-tab links, publishers and years', async () => {
    await toTechnical()
    const section = screen.getByRole('region', { name: 'Sources' })
    const links = within(section).getAllByRole('link')
    expect(urls.length).toBeGreaterThanOrEqual(3)
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

  it('shows only the sources for its own tab', async () => {
    const user = userEvent.setup()
    render(<App />)
    const valuesLinks = within(screen.getByRole('region', { name: 'Sources' }))
      .getAllByRole('link')
      .map((l) => l.getAttribute('href'))
    expect(valuesLinks).toEqual(sourcesFor('values').map((s) => s.url))
    await user.click(screen.getByRole('button', { name: 'Respect' }))
    await user.click(next())
    const technicalLinks = within(screen.getByRole('region', { name: 'Sources' }))
      .getAllByRole('link')
      .map((l) => l.getAttribute('href'))
    expect(technicalLinks).toEqual(sourcesFor('technical').map((s) => s.url))
    expect(technicalLinks).not.toEqual(valuesLinks)
  })

  it('is listed in the README', () => {
    const readme = readFileSync('README.md', 'utf-8')
    for (const source of Object.values(SOURCE_REGISTRY)) expect(readme).toContain(source.url)
    expect(readme).toMatch(/Selection rule/)
  })
})
