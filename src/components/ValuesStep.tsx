import type { Dispatch } from 'react'
import { VALUE_CATEGORIES } from '../data/values'
import { limitFor, type Action, type ProfileState } from '../state/profile'
import WordPicker from './WordPicker'

interface Props {
  state: ProfileState
  dispatch: Dispatch<Action>
}

export default function ValuesStep({ state, dispatch }: Props) {
  return (
    <WordPicker
      kind="values"
      headingId="values-heading"
      heading="What do you value?"
      hint="Select the values that describe you, or add your own."
      categories={VALUE_CATEGORIES.map((c) => ({ category: c.category, words: c.values }))}
      selected={state.selectedValues}
      custom={state.customValues}
      limit={limitFor('values')}
      noun="values"
      filterLabel="Filter values"
      addLabel="Add your own value"
      addPlaceholder="Add your own value"
      onToggle={(name) => dispatch({ type: 'toggleValue', name })}
      onAddCustom={(text) => dispatch({ type: 'addCustomValue', text })}
      onRemoveCustom={(name) => dispatch({ type: 'removeCustomValue', name })}
    />
  )
}
