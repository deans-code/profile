import { useReducer, useRef } from 'react'
import { SECTIONS, SECTION_LABELS } from './data/skills'
import type { Profile } from './export'
import {
  MODES,
  STEPS,
  initialState,
  loadLanding,
  pageComplete,
  reducer,
  stepBlockedReason,
  type Step,
} from './state/profile'
import { profileToState } from './load'
import AccessibilityOptions from './components/AccessibilityOptions'
import { DefinitionProvider } from './components/DefinitionPanel'
import LoadProfile from './components/LoadProfile'
import ProfileCard from './components/ProfileCard'
import SkillStep from './components/SkillStep'
import ValuesStep from './components/ValuesStep'
import { SOURCES_NOTE, sourcesFor } from './data/sources'
import { useStepNavigation } from './useStepNavigation'

const STEP_LABELS: Record<Step, string> = {
  values: 'Values',
  technical: SECTION_LABELS.technical,
  engineering: SECTION_LABELS.engineering,
  interpersonal: SECTION_LABELS.interpersonal,
  ai: SECTION_LABELS.ai,
  card: 'Profile',
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const index = STEPS.indexOf(state.step)
  const prev = STEPS[index - 1]
  const next = STEPS[index + 1]
  const nextBlocked = next ? stepBlockedReason(state, next) : null
  const contentRef = useRef<HTMLElement>(null)
  const { navigate, motion, setMotionFor } = useStepNavigation(state, dispatch, contentRef)

  const isDone = (step: Step) => (step === 'card' ? state.step === 'card' : pageComplete(state, step))
  const completeCount = STEPS.filter(isDone).length

  const hasProgress =
    state.selectedValues.length > 0 ||
    SECTIONS.some((s) => MODES.some((m) => state.selectedSkills[s][m].length > 0))

  function loadProfile(profile: Profile): string | null {
    const next = profileToState(profile)
    const landing = loadLanding(next)
    setMotionFor(landing.step)
    dispatch({ type: 'loadProfile', profile: next })
    return landing.notice
  }

  return (
    <div className="app-root" data-section={state.step}>
      <DefinitionProvider resetKey={state.step}>
        <div className="app">
          <header>
            <div className="intro-block">
              <div className="header-row">
                <h1>Profile Builder</h1>
                <div className="header-tools">
                  <AccessibilityOptions />
                  <LoadProfile hasProgress={hasProgress} onLoad={loadProfile} />
                </div>
              </div>
              <p className="intro">
                Build a personal profile of what you value, what you can do, what you want to learn and where you want to
                grow.
              </p>
              <p className="privacy-line">
                Runs entirely in your browser. Nothing you choose is collected or sent anywhere, and no cookies are used.
              </p>
              <details className="route-help">
                <summary>How this works</summary>
                <ol className="how-it-works" aria-label="How it works">
                  <li>
                    <strong>Choose 5 to 10 values</strong> that matter most to you.
                  </li>
                  <li>
                    <strong>Pick skills on four pages</strong>: technical development, engineering, interpersonal and AI
                    engineering, for both previous and desired experience.
                  </li>
                  <li>
                    <strong>Download your profile</strong> at the end.
                  </li>
                </ol>
              </details>
              <details className="route-help privacy-help">
                <summary>Privacy</summary>
                <ul>
                  <li>Your choices are kept only in memory on your device. They are gone when you close or reload the page.</li>
                  <li>No cookies are set, and there is no tracking or analytics.</li>
                  <li>The only thing saved on your device is your theme and text size choice. It never includes your profile.</li>
                  <li>Downloading your profile and loading a saved one both happen on your device. Nothing is uploaded.</li>
                  <li>
                    The site is delivered by a hosting provider, which may keep ordinary server logs of page requests. This
                    app cannot see or control those logs, and they do not contain your choices.
                  </li>
                  <li>
                    Links to other sites leave this app. The optional ChatGPT link sends only a fixed prompt and never
                    anything you have selected.
                  </li>
                </ul>
              </details>
            </div>
            <div className="nav-block">
              <p className="step-status" aria-live="polite">
                Step {index + 1} of {STEPS.length}: <strong>{STEP_LABELS[state.step]}</strong>
                {next && <span className="step-next"> · Next: {STEP_LABELS[next]}</span>}
              </p>
              <progress className="step-progress" aria-label="Steps complete" max={STEPS.length} value={completeCount} />
              <nav aria-label="Steps">
                <ol className="stepper">
                  {STEPS.map((step, i) => {
                    const blocked = stepBlockedReason(state, step) !== null
                    const showDone = isDone(step) && step !== state.step
                    return (
                      <li key={step}>
                        <button
                          type="button"
                          data-section={step}
                          data-complete={showDone ? 'true' : undefined}
                          disabled={blocked}
                          aria-current={step === state.step ? 'step' : undefined}
                          onClick={() => navigate(step)}
                        >
                          <span className="step-badge" aria-hidden="true">
                            {showDone ? '✓' : i + 1}
                          </span>
                          <span className="step-name">{STEP_LABELS[step]}</span>
                          {showDone && <span className="visually-hidden"> (complete)</span>}
                        </button>
                      </li>
                    )
                  })}
                </ol>
              </nav>
            </div>
          </header>

          <main ref={contentRef}>
            <div key={state.step} className={`step-view enter-${motion}`}>
              {state.step === 'values' && <ValuesStep state={state} dispatch={dispatch} />}
              {state.step !== 'values' && state.step !== 'card' && (
                <SkillStep key={state.step} section={state.step} state={state} dispatch={dispatch} />
              )}
              {state.step === 'card' && <ProfileCard state={state} onEdit={() => navigate('values')} />}
            </div>
          </main>

          {state.step !== 'card' && (
            <footer className="nav">
              <button type="button" className="secondary" disabled={!prev} onClick={() => prev && navigate(prev)}>
                {prev ? `Back to ${STEP_LABELS[prev]}` : 'Back'}
              </button>
              <div className="nav-next">
                {nextBlocked && (
                  <p className="blocked" role="status">
                    <strong>Before you continue:</strong> {nextBlocked}
                  </p>
                )}
                <button type="button" disabled={!next || nextBlocked !== null} onClick={() => next && navigate(next)}>
                  {next === 'card' ? 'Finish and view profile' : next ? `Continue to ${STEP_LABELS[next]}` : 'Continue'}
                </button>
              </div>
            </footer>
          )}

          {state.step !== 'card' && sourcesFor(state.step).length > 0 && (
            <section className="sources" aria-labelledby="sources-heading">
              <h2 id="sources-heading">Sources</h2>
              <p>{SOURCES_NOTE}</p>
              <ul>
                {sourcesFor(state.step).map((source) => (
                  <li key={source.id}>
                    <a href={source.url} target="_blank" rel="noopener noreferrer">
                      {source.title}
                    </a>{' '}
                    <span className="source-publisher">
                      ({source.publisher}, {source.year})
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </DefinitionProvider>
    </div>
  )
}
