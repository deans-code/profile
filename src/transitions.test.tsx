import { act, fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { motion } from './test-setup'
import { TRANSITION_MS } from './useStepNavigation'

const chip = (name: string) => screen.getByRole('button', { name })
const next = () => screen.getByRole('button', { name: /continue|finish/i })
const stepView = (container: HTMLElement) => container.querySelector('.step-view')!
const heading = (name: RegExp) => screen.getByRole('heading', { name })

describe('section transitions', () => {
  it('scrolls to the top when continuing, instantly under reduced motion', async () => {
    const user = userEvent.setup()
    render(<App />)
    expect(window.scrollTo).not.toHaveBeenCalled()
    await user.click(chip('Integrity'))
    await user.click(next())
    expect(window.scrollTo).toHaveBeenCalledTimes(1)
    expect(window.scrollTo).toHaveBeenLastCalledWith({ top: 0, behavior: 'auto' })
  })

  it('scrolls smoothly when motion is allowed', async () => {
    motion.reduced = false
    const user = userEvent.setup()
    render(<App />)
    await user.click(chip('Integrity'))
    await user.click(next())
    expect(window.scrollTo).toHaveBeenLastCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('animates in forward when continuing and backward when going back', async () => {
    motion.reduced = false
    const user = userEvent.setup()
    const { container } = render(<App />)
    expect(stepView(container)).toHaveClass('enter-none')

    await user.click(chip('Integrity'))
    await user.click(next())
    expect(stepView(container)).toHaveClass('enter-forward')

    await new Promise((r) => setTimeout(r, TRANSITION_MS + 50))
    await user.click(screen.getByRole('button', { name: 'Back' }))
    expect(stepView(container)).toHaveClass('enter-backward')
    expect(heading(/what do you value/i)).toBeInTheDocument()
  })

  it('moves focus to the new section heading', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(chip('Integrity'))
    await user.click(next())
    expect(heading(/technical development skills/i)).toHaveFocus()
    await user.click(screen.getByRole('button', { name: 'Back' }))
    expect(heading(/what do you value/i)).toHaveFocus()
  })

  it('keeps selections and gating intact across transitions', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(chip('Integrity'))
    await user.click(next())
    await user.click(chip('Python'))
    await user.click(next())
    await user.click(next())
    // Interpersonal has nothing selected, so scoring stays blocked.
    expect(next()).toBeDisabled()
    await user.click(screen.getByRole('button', { name: 'Back' }))
    await user.click(screen.getByRole('button', { name: 'Back' }))
    expect(chip('Python')).toHaveAttribute('aria-pressed', 'true')
  })

  it('does not scroll or animate for a blocked or same-step request', async () => {
    const user = userEvent.setup()
    render(<App />)
    const nav = within(screen.getByRole('navigation', { name: 'Steps' }))
    await user.click(nav.getByRole('button', { name: 'Values' }))
    expect(window.scrollTo).not.toHaveBeenCalled()
    expect(nav.getByRole('button', { name: 'Profile' })).toBeDisabled()
  })

  it('applies the same transition to the stepper and to Edit', async () => {
    motion.reduced = false
    const user = userEvent.setup()
    const { container } = render(<App />)
    const nav = within(screen.getByRole('navigation', { name: 'Steps' }))
    const settle = () => new Promise((r) => setTimeout(r, TRANSITION_MS + 50))

    await user.click(chip('Integrity'))
    await user.click(nav.getByRole('button', { name: 'Technical development' }))
    expect(stepView(container)).toHaveClass('enter-forward')
    expect(heading(/technical development skills/i)).toHaveFocus()
    await settle()

    await user.click(nav.getByRole('button', { name: 'Values' }))
    expect(stepView(container)).toHaveClass('enter-backward')
    await settle()

    // Complete the flow to reach the card, then use Edit.
    await user.click(next())
    await settle()
    await user.click(chip('Python'))
    await user.click(next())
    await settle()
    await user.click(chip('Scrum'))
    await user.click(next())
    await settle()
    await user.click(chip('Teamwork'))
    await user.click(next())
    await settle()
    await user.click(next())
    await settle()
    expect(heading(/your profile/i)).toHaveFocus()
    window.scrollTo = vi.fn() as unknown as typeof window.scrollTo
    await user.click(screen.getByRole('button', { name: 'Edit' }))
    expect(stepView(container)).toHaveClass('enter-backward')
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })
})

describe('rapid activation', () => {
  it('ignores a second Continue while the change settles, then allows the next', () => {
    motion.reduced = false
    vi.useFakeTimers()
    try {
      render(<App />)
      fireEvent.click(chip('Integrity'))
      const button = next()
      fireEvent.click(button)
      fireEvent.click(next())
      expect(heading(/technical development skills/i)).toBeInTheDocument()

      // Selecting still works during the animation.
      fireEvent.click(chip('Python'))
      expect(chip('Python')).toHaveAttribute('aria-pressed', 'true')

      act(() => {
        vi.advanceTimersByTime(TRANSITION_MS + 10)
      })
      fireEvent.click(next())
      expect(heading(/engineering skills/i)).toBeInTheDocument()
    } finally {
      vi.useRealTimers()
    }
  })
})
