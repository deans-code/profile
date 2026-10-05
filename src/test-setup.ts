import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach, vi } from 'vitest'

/** Tests run with reduced motion by default; individual tests opt in to animation. */
export const motion = { reduced: true }

beforeEach(() => {
  motion.reduced = true
  window.scrollTo = vi.fn() as unknown as typeof window.scrollTo
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
