import { useReducer, useRef } from 'react'
import { SECTIONS, SECTION_LABELS } from './data/skills'
import type { Profile } from './export'
import { STEPS, initialState, loadLanding, reducer, stepBlockedReason, type Step } from './state/profile'
import { profileToState } from './load'
import { DefinitionProvider } from './components/DefinitionPanel'
import LoadProfile from './components/LoadProfile'
import ProfileCard from './components/ProfileCard'
import ScoringStep from './components/ScoringStep'
import SkillStep from './components/SkillStep'
import ValuesStep from './components/ValuesStep'
import { useStepNavigation } from './useStepNavigation'

const STEP_LABELS: Record<Step, string> = {
  values: 'Values',
  technical: SECTION_LABELS.technical,
  engineering: SECTION_LABELS.engineering,
  interpersonal: SECTION_LABELS.interpersonal,
  scoring: 'Scoring',
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

  const hasProgress = state.selectedValues.length > 0 || SECTIONS.some((s) => state.selectedSkills[s].length > 0)

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
            <div className="header-row">
              <h1>Profile Builder</h1>
              <LoadProfile hasProgress={hasProgress} onLoad={loadProfile} />
            </div>
            <nav aria-label="Steps">
              <ol className="stepper">
                {STEPS.map((step) => {
                  const blocked = stepBlockedReason(state, step) !== null
                  return (
                    <li key={step}>
                      <button
                        type="button"
                        data-section={step}
                        disabled={blocked}
                        aria-current={step === state.step ? 'step' : undefined}
                        onClick={() => navigate(step)}
                      >
                        {STEP_LABELS[step]}
                      </button>
                    </li>
                  )
                })}
              </ol>
            </nav>
          </header>

          <main ref={contentRef}>
            <div key={state.step} className={`step-view enter-${motion}`}>
              {state.step === 'values' && <ValuesStep state={state} dispatch={dispatch} />}
              {(state.step === 'technical' || state.step === 'engineering' || state.step === 'interpersonal') && (
                <SkillStep key={state.step} section={state.step} state={state} dispatch={dispatch} />
              )}
              {state.step === 'scoring' && <ScoringStep state={state} dispatch={dispatch} />}
              {state.step === 'card' && <ProfileCard state={state} onEdit={() => navigate('values')} />}
            </div>
          </main>

          {state.step !== 'card' && (
            <footer className="nav">
              <button type="button" className="secondary" disabled={!prev} onClick={() => prev && navigate(prev)}>
                Back
              </button>
              <div className="nav-next">
                {nextBlocked && (
                  <p className="blocked" role="status">
                    {nextBlocked}
                  </p>
                )}
                <button type="button" disabled={!next || nextBlocked !== null} onClick={() => next && navigate(next)}>
                  {next === 'card' ? 'Finish' : 'Continue'}
                </button>
              </div>
            </footer>
          )}
        </div>
      </DefinitionProvider>
    </div>
  )
}
