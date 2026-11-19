import { useCallback, useEffect, useRef, useState, type Dispatch, type RefObject } from 'react'
import { STEPS, stepBlockedReason, type Action, type ProfileState, type Step } from './state/profile'

/** Matches the enter animation duration in styles.css. */
export const TRANSITION_MS = 350

export type Motion = 'none' | 'forward' | 'backward'

export function prefersReducedMotion(): boolean {
  return typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Section changes: scrolls to the top, records the direction of travel for the enter
 * animation, moves focus to the new heading, and ignores further requests while a change settles.
 */
export function useStepNavigation(
  state: ProfileState,
  dispatch: Dispatch<Action>,
  contentRef: RefObject<HTMLElement | null>,
) {
  const [motion, setMotion] = useState<Motion>('none')
  const locked = useRef(false)
  const unlock = useRef<number | undefined>(undefined)
  const previous = useRef<Step>(state.step)

  useEffect(() => () => window.clearTimeout(unlock.current), [])

  const navigate = useCallback(
    (step: Step) => {
      if (locked.current || step === state.step || stepBlockedReason(state, step) !== null) return
      setMotion(STEPS.indexOf(step) > STEPS.indexOf(state.step) ? 'forward' : 'backward')
      dispatch({ type: 'goTo', step })
      if (!prefersReducedMotion()) {
        locked.current = true
        unlock.current = window.setTimeout(() => {
          locked.current = false
        }, TRANSITION_MS)
      }
    },
    [state, dispatch],
  )

  // After a section change: back to the top, then focus the new heading.
  useEffect(() => {
    if (previous.current === state.step) return
    previous.current = state.step
    // Wide screens keep the side bar in view, so the top of the page is the top of the main panel;
    // when the panels stack, scroll past the side bar to the main panel instead.
    const stacked = typeof window.matchMedia === 'function' && !window.matchMedia('(min-width: 60rem)').matches
    const mainTop = contentRef.current?.getBoundingClientRect().top ?? 0
    window.scrollTo({
      top: stacked ? Math.max(0, window.scrollY + mainTop) : 0,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    })
    const heading = contentRef.current?.querySelector('h2')
    if (heading instanceof HTMLElement) {
      heading.tabIndex = -1
      heading.focus({ preventScroll: true })
    }
  }, [state.step, contentRef])

  /** Records the direction of travel for a change of step made outside `navigate` (such as loading a profile). */
  const setMotionFor = useCallback(
    (step: Step) => setMotion(STEPS.indexOf(step) >= STEPS.indexOf(state.step) ? 'forward' : 'backward'),
    [state.step],
  )

  return { navigate, motion, setMotionFor }
}
