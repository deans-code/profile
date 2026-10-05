import type { Dispatch } from 'react'
import { COMMON_VALUES } from '../data/values'
import type { Action, ProfileState } from '../state/profile'
import AddEntry from './AddEntry'

interface Props {
  state: ProfileState
  dispatch: Dispatch<Action>
}

export default function ValuesStep({ state, dispatch }: Props) {
  const selected = new Set(state.selectedValues)

  return (
    <section aria-labelledby="values-heading">
      <h2 id="values-heading">What do you value?</h2>
      <p className="hint">Select the values that describe you, or add your own.</p>

      <ul className="cloud" aria-label="Values">
        {COMMON_VALUES.map((v) => (
          <li key={v.name}>
            <button
              type="button"
              className={`chip weight-${v.weight}`}
              aria-pressed={selected.has(v.name)}
              onClick={() => dispatch({ type: 'toggleValue', name: v.name })}
            >
              {v.name}
            </button>
          </li>
        ))}
        {state.customValues.map((name) => (
          <li key={name} className="custom-item">
            <button
              type="button"
              className="chip weight-2 custom"
              aria-pressed={selected.has(name)}
              onClick={() => dispatch({ type: 'toggleValue', name })}
            >
              {name}
            </button>
            <button
              type="button"
              className="remove"
              aria-label={`Remove ${name}`}
              onClick={() => dispatch({ type: 'removeCustomValue', name })}
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      <AddEntry
        label="Add your own value"
        placeholder="Add your own value"
        onAdd={(text) => dispatch({ type: 'addCustomValue', text })}
      />
      <p className="count" aria-live="polite">
        {state.selectedValues.length} selected
      </p>
    </section>
  )
}
