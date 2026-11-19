import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { pickValues } from './test-values'
import App from './App'

async function toSkills() {
  const user = userEvent.setup()
  render(<App />)
  await pickValues(user)
  await user.click(screen.getByRole('button', { name: /^Continue/ }))
  return user
}

describe('help blocks', () => {
  it('shows two inner blocks on the values page, inside the Help area', async () => {
    render(<App />)
    const values = document.querySelector<HTMLElement>('details.page-help')!
    expect(values.querySelectorAll('.help-block')).toHaveLength(2)
    expect(values.querySelector('summary')).toHaveTextContent('Help')
    expect(values.querySelector('.experience-intro')).toBeNull()
  })

  it('has the experience explanation block on skill pages, in the stated order, and no ChatGPT block where the page has none', async () => {
    await toSkills()
    const help = document.querySelector<HTMLElement>('details.page-help')!
    const blocks = [...help.querySelectorAll('.help-block')]
    expect(blocks).toHaveLength(2)
    expect(blocks[0]).toHaveClass('help')
    expect(blocks[1]).toHaveClass('experience-intro')
  })

  it('keeps inner blocks hidden while Help is collapsed and shows them when it opens', async () => {
    const user = userEvent.setup()
    render(<App />)
    const help = document.querySelector<HTMLDetailsElement>('details.page-help')!
    const first = help.querySelector<HTMLElement>('.help-block')!
    expect(first).not.toBeVisible()
    await user.click(within(help).getByText('Help'))
    expect(first).toBeVisible()
  })

  it('has none of the removed help sentences anywhere', () => {
    render(<App />)
    for (const text of [
      /Select 5 to 10 values/,
      /Want to add a value not here/,
      /Type part of a word/,
      /as many skills as apply/,
    ]) {
      expect(document.body).not.toHaveTextContent(text)
    }
  })

  it('makes the side bar areas blocks that contain their toggles, collapsed by default', async () => {
    const user = userEvent.setup()
    render(<App />)
    const side = screen.getByRole('complementary', { name: 'Profile Builder' })
    const areas = side.querySelectorAll<HTMLDetailsElement>('details.route-help')
    expect(areas).toHaveLength(2)
    for (const area of areas) {
      expect(area.open).toBe(false)
      expect(area.querySelector(':scope > summary')).not.toBeNull()
    }
    await user.click(within(areas[1]).getByText('Privacy'))
    expect(areas[1].open).toBe(true)
    expect(areas[0].open).toBe(false)
  })
})
