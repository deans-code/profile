import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { pickValues } from './test-values'
import App from './App'

const next = () => within(document.querySelector<HTMLElement>('.nav-next')!).getByRole('button')
const nav = () => within(screen.getByRole('navigation', { name: 'Steps' }))

describe('optional skill pages', () => {
  it('lets the user go through all four skill pages and reach the profile with nothing chosen', async () => {
    const user = userEvent.setup()
    render(<App />)
    await pickValues(user)
    for (let i = 0; i < 4; i++) {
      await user.click(next())
      expect(screen.queryByRole('status')).not.toBeInTheDocument()
    }
    await user.click(next())
    const card = screen.getByRole('article', { name: 'Profile card' })
    expect(within(card).getAllByText('Nothing chosen')).toHaveLength(4)
  })

  it('still needs the values', async () => {
    const user = userEvent.setup()
    render(<App />)
    expect(next()).toBeDisabled()
    expect(nav().getByRole('button', { name: /Technical/ })).toBeDisabled()
    await pickValues(user)
    expect(next()).toBeEnabled()
  })

  it('shows passed-over skill steps as complete and counts them in the progress bar', async () => {
    const user = userEvent.setup()
    render(<App />)
    await pickValues(user)
    const progress = screen.getByRole('progressbar', { name: 'Steps complete' })
    const before = Number(progress.getAttribute('value'))
    await user.click(next())
    expect(nav().getByRole('button', { name: /Technical/ })).not.toHaveTextContent('(complete)')
    await user.click(next())
    expect(nav().getByRole('button', { name: /Technical/ })).toHaveTextContent('(complete)')
    expect(Number(progress.getAttribute('value'))).toBeGreaterThan(before)
  })
})
