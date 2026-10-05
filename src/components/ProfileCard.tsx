import { SECTIONS, SECTION_LABELS } from '../data/skills'
import { buildProfile, downloadFile, toJson, toMarkdown } from '../export'
import type { ProfileState } from '../state/profile'

interface Props {
  state: ProfileState
  onEdit: () => void
}

export default function ProfileCard({ state, onEdit }: Props) {
  const profile = buildProfile(state)

  return (
    <section aria-labelledby="card-heading">
      <h2 id="card-heading">Your profile</h2>

      <article className="card" aria-label="Profile card">
        <h3>Values</h3>
        <ul className="card-values">
          {profile.values.map((v) => (
            <li key={v} className="chip static">
              {v}
            </li>
          ))}
        </ul>

        {SECTIONS.map((section) => (
          <div key={section}>
            <h3>{SECTION_LABELS[section]}</h3>
            <ul className="card-skills">
              {profile.skills[section].map((s) => (
                <li key={s.name}>
                  <span>{s.name}</span>
                  <span className="bar" aria-hidden="true">
                    <span style={{ width: `${s.score * 10}%` }} />
                  </span>
                  <span className="score">{s.score}/10</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
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
