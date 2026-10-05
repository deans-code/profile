import { useState, type Dispatch } from 'react'
import { CATALOGS, SECTION_LABELS, type Section } from '../data/skills'
import type { Action, ProfileState } from '../state/profile'
import AddEntry from './AddEntry'

interface Props {
  section: Section
  state: ProfileState
  dispatch: Dispatch<Action>
}

export default function SkillStep({ section, state, dispatch }: Props) {
  const [filter, setFilter] = useState('')
  const selected = new Set(state.selectedSkills[section])
  const custom = state.customSkills[section]
  const query = filter.trim().toLowerCase()
  const matches = (name: string) => name.toLowerCase().includes(query)

  const categories = [
    ...CATALOGS[section],
    ...(custom.length > 0 ? [{ category: 'Custom', skills: custom }] : []),
  ]
    .map((c) => ({ ...c, skills: c.skills.filter(matches) }))
    .filter((c) => c.skills.length > 0)

  const label = SECTION_LABELS[section]

  return (
    <section aria-labelledby="skills-heading">
      <h2 id="skills-heading">{label} skills</h2>
      <p className="hint">Select the skills you have, or add your own.</p>

      <input
        type="search"
        className="filter"
        placeholder={`Filter ${label.toLowerCase()} skills`}
        aria-label="Filter skills"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      {categories.length === 0 && <p className="hint">No skills match your filter.</p>}

      {categories.map((c) => (
        <div key={c.category} className="category">
          <h3>{c.category}</h3>
          <ul className="chips">
            {c.skills.map((name) => {
              const isCustom = c.category === 'Custom'
              return (
                <li key={name} className={isCustom ? 'custom-item' : undefined}>
                  <button
                    type="button"
                    className={`chip${isCustom ? ' custom' : ''}`}
                    aria-pressed={selected.has(name)}
                    onClick={() => dispatch({ type: 'toggleSkill', section, name })}
                  >
                    {name}
                  </button>
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

      <AddEntry
        label={`Add your own ${label.toLowerCase()} skill`}
        placeholder="Add your own skill"
        onAdd={(text) => dispatch({ type: 'addCustomSkill', section, text })}
      />
      <p className="count" aria-live="polite">
        {selected.size} selected
      </p>
    </section>
  )
}
