import { readFileSync } from 'node:fs'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { SOURCES } from './data/sources'

const next = () => within(document.querySelector<HTMLElement>('footer.nav')!).getByRole('button', { name: /^(Continue|Finish)/ })

describe('sources', () => {
  const urls = [
    'https://survey.stackoverflow.co/2026/technology/data',
    'https://devecosystem.jetbrains.com/tools-and-trends',
    'https://www.cncf.io/wp-content/uploads/2026/03/State-of-Cloud-Native-Development-Q1-2026.pdf',
  ]

  it('lists the three sources with new-tab links and publishers on the values and a skill page', async () => {
    const user = userEvent.setup()
    render(<App />)
    for (let page = 0; page < 2; page++) {
      const section = screen.getByRole('region', { name: 'Sources' })
      const links = within(section).getAllByRole('link')
      expect(links.map((l) => l.getAttribute('href'))).toEqual(urls)
      for (const l of links) {
        expect(l).toHaveAttribute('target', '_blank')
        expect(l.getAttribute('rel')).toContain('noopener')
      }
      for (const s of SOURCES) expect(section).toHaveTextContent(s.publisher)
      expect(section).toHaveTextContent(/guided which technologies/)
      if (page === 0) {
        await user.click(screen.getByRole('button', { name: 'Respect' }))
        await user.click(next())
      }
    }
  })

  it('appears below the step controls', () => {
    render(<App />)
    const controls = document.querySelector('footer.nav')!
    const section = screen.getByRole('region', { name: 'Sources' })
    expect(controls.compareDocumentPosition(section) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('is listed in the README', () => {
    const readme = readFileSync('README.md', 'utf-8')
    for (const url of urls) expect(readme).toContain(url)
    expect(readme).toMatch(/Selection rule/)
  })
})
