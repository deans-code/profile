import type { Dispatch } from 'react'
import { COMMON_VALUES } from '../data/values'
import { isFull, type Action, type ProfileState } from '../state/profile'
import AddEntry from './AddEntry'
import SelectionStatus from './SelectionStatus'
import SelectionHelp from './SelectionHelp'
import TermButton from './TermButton'

interface Props {
  state: ProfileState
  dispatch: Dispatch<Action>
}

export default function ValuesStep({ state, dispatch }: Props) {
  const selected = new Set(state.selectedValues)
  const full = isFull(state, 'values')

  return (
    <section aria-labelledby="values-heading">
      <h2 id="values-heading">What do you value?</h2>
      <p className="hint">Select the values that describe you, or add your own.</p>
      <SelectionHelp />

      <ul className="cloud" aria-label="Values">
        {COMMON_VALUES.map((v) => (
          <li key={v.name}>
            <TermButton
              kind="values"
              name={v.name}
              selected={selected.has(v.name)}
              unavailable={full && !selected.has(v.name)}
              onToggle={() => dispatch({ type: 'toggleValue', name: v.name })}
            />
          </li>
        ))}
        {state.customValues.map((name) => (
          <li key={name} className="custom-item">
            <TermButton
              kind="values"
              name={name}
              className="chip custom"
              selected={selected.has(name)}
              unavailable={full && !selected.has(name)}
              onToggle={() => dispatch({ type: 'toggleValue', name })}
            />
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
        full={full}
        onAdd={(text) => dispatch({ type: 'addCustomValue', text })}
      />
      <SelectionStatus count={state.selectedValues.length} />
    </section>
  )
}
