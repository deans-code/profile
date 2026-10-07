import { SECTIONS, SECTION_LABELS } from '../data/skills'
import { buildProfile, downloadFile, toJson, toMarkdown, type Experience } from '../export'
import { MODES, MODE_LABELS, type ProfileState } from '../state/profile'

interface Props {
  state: ProfileState
  onEdit: () => void
}

function Group({ title, lists, chips }: { title: string; lists: Experience; chips: 'value' | 'skill' }) {
  return (
    <div className="card-group">
      <h3>{title}</h3>
      {MODES.map(
        (mode) =>
          lists[mode].length > 0 && (
            <div key={mode}>
              <h4 className="card-mode">{MODE_LABELS[mode]}</h4>
              <ul className={chips === 'value' ? 'card-values' : 'card-words'}>
                {lists[mode].map((name) => (
                  <li key={name} className="chip static">
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          ),
      )}
    </div>
  )
}

export default function ProfileCard({ state, onEdit }: Props) {
  const profile = buildProfile(state)

  return (
    <section aria-labelledby="card-heading">
      <h2 id="card-heading">Your profile</h2>

      <article className="card" aria-label="Profile card">
        <Group title="Values" lists={profile.values} chips="value" />

        <div className="card-skill-groups">
          {SECTIONS.map((section) => (
            <Group key={section} title={SECTION_LABELS[section]} lists={profile.skills[section]} chips="skill" />
          ))}
        </div>
      </article>

      <div className="actions">
        <button type="button" onClick={() => downloadFile('profile.json', toJson(profile), 'application/json')}>
          Download JSON
        </button>
        <button type="button" onClick={() => downloadFile('profile.md', toMarkdown(profile), 'text/markdown')}>
          Download Markdown
        </button>
        <button type="button" className="secondary" onClick={onEdit}>
          Edit
        </button>
      </div>
    </section>
  )
}
