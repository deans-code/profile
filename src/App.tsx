import { useReducer } from 'react'
import { SECTION_LABELS } from './data/skills'
import { STEPS, initialState, reducer, stepBlockedReason, type Step } from './state/profile'
import ProfileCard from './components/ProfileCard'
import ScoringStep from './components/ScoringStep'
import SkillStep from './components/SkillStep'
import ValuesStep from './components/ValuesStep'

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

  return (
    <div className="app">
      <header>
        <h1>Profile Builder</h1>
        <nav aria-label="Steps">
          <ol className="stepper">
            {STEPS.map((step) => {
              const blocked = stepBlockedReason(state, step) !== null
              return (
                <li key={step}>
                  <button
                    type="button"
                    disabled={blocked}
                    aria-current={step === state.step ? 'step' : undefined}
                    onClick={() => dispatch({ type: 'goTo', step })}
                  >
                    {STEP_LABELS[step]}
                  </button>
                </li>
              )
            })}
          </ol>
        </nav>
      </header>

      <main>
        {state.step === 'values' && <ValuesStep state={state} dispatch={dispatch} />}
        {(state.step === 'technical' || state.step === 'engineering' || state.step === 'interpersonal') && (
          <SkillStep key={state.step} section={state.step} state={state} dispatch={dispatch} />
        )}
        {state.step === 'scoring' && <ScoringStep state={state} dispatch={dispatch} />}
        {state.step === 'card' && <ProfileCard state={state} onEdit={() => dispatch({ type: 'goTo', step: 'values' })} />}
      </main>

      {state.step !== 'card' && (
        <footer className="nav">
          <button type="button" className="secondary" disabled={!prev} onClick={() => prev && dispatch({ type: 'goTo', step: prev })}>
            Back
          </button>
          <div className="nav-next">
            {nextBlocked && (
              <p className="blocked" role="status">
                {nextBlocked}
              </p>
            )}
            <button type="button" disabled={!next || nextBlocked !== null} onClick={() => next && dispatch({ type: 'goTo', step: next })}>
              {next === 'card' ? 'Finish' : 'Continue'}
            </button>
          </div>
        </footer>
      )}
    </div>
  )
}
