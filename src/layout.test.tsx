import { render, screen, within } from '@testing-library/react'
import App from './App'

describe('side bar and main panel', () => {
  it('shows a side bar and a main landmark side by side', () => {
    render(<App />)
    const sidebar = screen.getByRole('complementary', { name: 'Profile Builder' })
    const main = screen.getByRole('main')
    expect(sidebar).toBeInTheDocument()
    expect(sidebar.contains(main)).toBe(false)
    expect(main.contains(sidebar)).toBe(false)
    // Side bar comes first in the DOM, so it is first in tab order.
    expect(sidebar.compareDocumentPosition(main) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('keeps the supporting material in the side bar and out of the main panel', () => {
    render(<App />)
    const sidebar = within(screen.getByRole('complementary', { name: 'Profile Builder' }))
    const main = within(screen.getByRole('main'))
    expect(sidebar.getByRole('heading', { level: 1, name: 'Profile Builder' })).toBeInTheDocument()
    expect(sidebar.getByText(/what you value, what you can do/)).toBeInTheDocument()
    expect(sidebar.getByText(/Runs entirely in your browser/)).toBeInTheDocument()
    expect(sidebar.getByText('How this works')).toBeInTheDocument()
    expect(sidebar.getByText('Privacy')).toBeInTheDocument()
    expect(sidebar.getByRole('navigation', { name: 'Steps' })).toBeInTheDocument()
    expect(sidebar.getByRole('progressbar', { name: 'Steps complete' })).toBeInTheDocument()
    expect(sidebar.getByRole('button', { name: /Accessibility/ })).toBeInTheDocument()
    expect(sidebar.getByRole('button', { name: /Load/ })).toBeInTheDocument()

    expect(main.queryByRole('navigation', { name: 'Steps' })).toBeNull()
    expect(main.queryByText('How this works')).toBeNull()
    expect(main.queryByText('Privacy')).toBeNull()
    expect(main.queryByRole('button', { name: /Accessibility/ })).toBeNull()
    expect(main.queryByRole('button', { name: /Load/ })).toBeNull()
  })

  it('puts the page heading in the main panel, and Back/Continue and Sources in the main column', async () => {
    const { container } = render(<App />)
    expect(within(screen.getByRole('main')).getByRole('heading', { level: 2 })).toBeInTheDocument()
    const column = container.querySelector('.app-main') as HTMLElement
    expect(column).not.toBeNull()
    expect(within(column).getByRole('main')).toBeInTheDocument()
    expect(within(column).getByRole('button', { name: /Continue to/ })).toBeInTheDocument()
    expect(within(column).getByRole('button', { name: 'Back' })).toBeInTheDocument()
    expect(column.querySelector('.sources')).not.toBeNull()
    expect(screen.getByRole('complementary', { name: 'Profile Builder' }).contains(column)).toBe(false)
  })
})
