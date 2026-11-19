import type { Dispatch } from 'react'
import { groupedCategories } from '../data/skills'
import { limitFor, MIN_VALUES, type Action, type ProfileState } from '../state/profile'
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
      lead="Pick 5 to 10 values that matter most to you."
      categories={groupedCategories('values').map((c) => ({ category: c.category, words: c.others, groups: c.groups }))}
      selected={state.selectedValues}
      custom={state.customValues}
      limit={limitFor('values')}
      min={MIN_VALUES}
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
