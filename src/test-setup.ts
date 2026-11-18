import '@testing-library/jest-dom/vitest'
import { act } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'

/**
 * Category cards start collapsed. Most tests need the options on screen, so by default every "Show all"
 * button is pressed as soon as it appears. A test of the collapsed start sets `startCollapsed.on = true`.
 */
export const startCollapsed = { on: false }

function showAllCards(root: ParentNode = document) {
  if (startCollapsed.on) return
  const buttons = [...root.querySelectorAll<HTMLButtonElement>('button.bulk-button')].filter((b) => b.textContent === 'Show all')
  if (buttons.length === 0) return
  act(() => buttons.forEach((b) => b.click()))
}

vi.mock('@testing-library/react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@testing-library/react')>()
  return {
    ...actual,
    render: ((...args: Parameters<typeof actual.render>) => {
      const result = actual.render(...args)
      showAllCards(result.baseElement)
      return result
    }) as typeof actual.render,
  }
})

// Pages reached later (Continue, Edit, stepper) mount new pickers; open them as well.
let queued = false
new MutationObserver(() => {
  if (queued) return
  queued = true
  queueMicrotask(() => {
    queued = false
    showAllCards()
  })
}).observe(document.body, { childList: true, subtree: true })

/** Tests run with reduced motion by default; individual tests opt in to animation. */
export const motion = { reduced: true }

beforeEach(() => {
  startCollapsed.on = false
  motion.reduced = true
  window.scrollTo = vi.fn() as unknown as typeof window.scrollTo
  // jsdom has no layout and does not implement scrollIntoView.
  Element.prototype.scrollIntoView = vi.fn()
  window.matchMedia = vi.fn((query: string) => ({
    matches: query.includes('prefers-reduced-motion') ? motion.reduced : false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as unknown as typeof window.matchMedia
})

afterEach(() => {
  vi.restoreAllMocks()
})
