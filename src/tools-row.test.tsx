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

describe('tools row', () => {
  it('holds Add, the filter and both bulk buttons on the values page', () => {
    render(<App />)
    const row = document.querySelector<HTMLElement>('.tools-row')!
    expect(within(row).getByLabelText('Add your own value')).toBeInTheDocument()
    expect(within(row).getByLabelText('Filter values')).toBeInTheDocument()
    expect(within(row).getByRole('button', { name: 'Show all' })).toBeInTheDocument()
    expect(within(row).getByRole('button', { name: 'Collapse all' })).toBeInTheDocument()
    expect(screen.queryByText('Filter values', { selector: '.filter-label' })).toBeNull()
  })

  it('also holds the experience options on skill pages, ahead of Add', async () => {
    await toSkills()
    const row = document.querySelector<HTMLElement>('.tools-row')!
    const options = within(row).getByRole('radiogroup', { name: 'Experience option' })
    const add = within(row).getByLabelText('Add your own technical development skill')
    expect(options.compareDocumentPosition(add) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(within(row).getByLabelText('Filter skills')).toBeInTheDocument()
    expect(within(row).getByRole('button', { name: 'Show all' })).toBeInTheDocument()
  })
})

describe('explanatory text in Help', () => {
  it('moves the add instruction, filter hint and experience intro into Help, and drops the duplicate line', async () => {
    const user = await toSkills()
    const help = document.querySelector<HTMLDetailsElement>('details.page-help')!
    expect(help.open).toBe(false)
    expect(help).toHaveTextContent(/Want to add a skill not here\?/)
    expect(help).toHaveTextContent(/Type part of a word in the filter box/)
    expect(help).toHaveTextContent(/two kinds of experience/)
    expect(document.body).not.toHaveTextContent(/Select the skills that apply, or add your own/)
    expect(screen.getByLabelText('Add your own technical development skill')).toHaveAccessibleDescription(
      /Type it and press Add or Enter/,
    )
    await user.click(within(help).getByText('Help'))
    expect(help.open).toBe(true)
  })

  it('shows no experience intro on the values page', () => {
    render(<App />)
    expect(document.body).not.toHaveTextContent(/two kinds of experience/)
    expect(document.body).not.toHaveTextContent(/Select the values that describe you/)
  })
})
