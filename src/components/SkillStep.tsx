import type { Dispatch } from 'react'
import { CATALOGS, SECTION_LABELS, type Section } from '../data/skills'
import { limitFor, type Action, type ProfileState } from '../state/profile'
import WordPicker from './WordPicker'

interface Props {
  section: Section
  state: ProfileState
  dispatch: Dispatch<Action>
}

export default function SkillStep({ section, state, dispatch }: Props) {
  const label = SECTION_LABELS[section]
  return (
    <WordPicker
      kind={section}
      headingId="skills-heading"
      heading={`${label} skills`}
      hint="Select the skills you have, or add your own."
      categories={CATALOGS[section].map((c) => ({ category: c.category, words: c.skills }))}
      selected={state.selectedSkills[section]}
      custom={state.customSkills[section]}
      limit={limitFor(section)}
      noun={`${label.toLowerCase()} skills`}
      filterLabel="Filter skills"
      addLabel={`Add your own ${label.toLowerCase()} skill`}
      addPlaceholder="Add your own skill"
      onToggle={(name) => dispatch({ type: 'toggleSkill', section, name })}
      onAddCustom={(text) => dispatch({ type: 'addCustomSkill', section, text })}
      onRemoveCustom={(name) => dispatch({ type: 'removeCustomSkill', section, name })}
    />
  )
}
