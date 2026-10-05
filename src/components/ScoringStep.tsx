import type { Dispatch } from 'react'
import { SECTIONS, SECTION_LABELS } from '../data/skills'
import { MAX_SCORE, MIN_SCORE, getScore, type Action, type ProfileState } from '../state/profile'

interface Props {
  state: ProfileState
  dispatch: Dispatch<Action>
}

export default function ScoringStep({ state, dispatch }: Props) {
  return (
    <section aria-labelledby="scoring-heading">
      <h2 id="scoring-heading">Score your skills</h2>
      <p className="hint">
        Rate each skill from {MIN_SCORE} (beginner) to {MAX_SCORE} (expert).
      </p>

      {SECTIONS.map((section) => (
        <div key={section} className="score-group">
          <h3>{SECTION_LABELS[section]}</h3>
          <ul className="scores">
            {state.selectedSkills[section].map((name) => {
              const score = getScore(state, section, name)
              const id = `score-${section}-${name.replace(/\W+/g, '-')}`
              return (
                <li key={name}>
                  <label htmlFor={id}>{name}</label>
                  <input
                    id={id}
                    type="range"
                    min={MIN_SCORE}
                    max={MAX_SCORE}
                    step={1}
                    value={score}
                    onChange={(e) => dispatch({ type: 'setScore', section, name, score: Number(e.target.value) })}
                  />
                  <output htmlFor={id} aria-label={`${name} score`}>
                    {score}
                  </output>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </section>
  )
}
