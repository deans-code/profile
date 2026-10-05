import { useState, type Dispatch } from 'react'
import { CATALOGS, SECTION_LABELS, type Section } from '../data/skills'
import { isFull, type Action, type ProfileState } from '../state/profile'
import AddEntry from './AddEntry'
import SelectionStatus from './SelectionStatus'
import SelectionHelp from './SelectionHelp'
import TermButton from './TermButton'

interface Props {
  section: Section
  state: ProfileState
  dispatch: Dispatch<Action>
}

export default function SkillStep({ section, state, dispatch }: Props) {
  const [filter, setFilter] = useState('')
  const selected = new Set(state.selectedSkills[section])
  const full = isFull(state, section)
  const custom = state.customSkills[section]
  const query = filter.trim().toLowerCase()
  const matches = (name: string) => name.toLowerCase().includes(query)

  const categories = [...CATALOGS[section], ...(custom.length > 0 ? [{ category: 'Custom', skills: custom }] : [])]
    .map((c) => ({ ...c, skills: c.skills.filter(matches) }))
    .filter((c) => c.skills.length > 0)

  const label = SECTION_LABELS[section]

  return (
    <section aria-labelledby="skills-heading">
      <h2 id="skills-heading">{label} skills</h2>
      <p className="hint">Select the skills you have, or add your own.</p>
      <SelectionHelp />

      <input
        type="search"
        className="filter"
        placeholder={`Filter ${label.toLowerCase()} skills`}
        aria-label="Filter skills"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      {categories.length === 0 && <p className="hint">No skills match your filter.</p>}

      <div className="categories">
        {categories.map((c) => (
          <div key={c.category} className="category">
            <h3>{c.category}</h3>
            <ul className="chips">
              {c.skills.map((name) => {
                const isCustom = c.category === 'Custom'
                return (
                  <li key={name} className={isCustom ? 'custom-item' : undefined}>
                    <TermButton
                      kind={section}
                      name={name}
                      className={`chip${isCustom ? ' custom' : ''}`}
                      selected={selected.has(name)}
                      unavailable={full && !selected.has(name)}
                      onToggle={() => dispatch({ type: 'toggleSkill', section, name })}
                    />
                    {isCustom && (
                      <button
                        type="button"
                        className="remove"
                        aria-label={`Remove ${name}`}
                        onClick={() => dispatch({ type: 'removeCustomSkill', section, name })}
                      >
                        ×
                      </button>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>

      <AddEntry
        label={`Add your own ${label.toLowerCase()} skill`}
        placeholder="Add your own skill"
        full={full}
        onAdd={(text) => dispatch({ type: 'addCustomSkill', section, text })}
      />
      <SelectionStatus count={selected.size} />
    </section>
  )
}
