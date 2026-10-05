import { useState } from 'react'
import type { TermKind } from '../data/definitions'
import AddEntry from './AddEntry'
import SelectionHelp from './SelectionHelp'
import SelectionStatus from './SelectionStatus'
import TermButton from './TermButton'

export interface WordCategory {
  category: string
  words: string[]
}

interface Props {
  kind: TermKind
  headingId: string
  heading: string
  hint: string
  categories: WordCategory[]
  selected: string[]
  custom: string[]
  /** Maximum selectable words on this page; omit for no limit. */
  limit?: number
  /** What the filter and the Add control are called, for example "technical development skills". */
  noun: string
  filterLabel: string
  addLabel: string
  addPlaceholder: string
  onToggle: (name: string) => void
  onAddCustom: (text: string) => void
  onRemoveCustom: (name: string) => void
}

/**
 * Category cards of selectable words with a filter, a Custom group, an Add control and a status line.
 * Shared by the values page and the skill pages.
 */
export default function WordPicker({
  kind,
  headingId,
  heading,
  hint,
  categories,
  selected,
  custom,
  limit,
  noun,
  filterLabel,
  addLabel,
  addPlaceholder,
  onToggle,
  onAddCustom,
  onRemoveCustom,
}: Props) {
  const [filter, setFilter] = useState('')
  const chosen = new Set(selected)
  const full = limit !== undefined && selected.length >= limit
  const query = filter.trim().toLowerCase()

  const visible = [...categories, ...(custom.length > 0 ? [{ category: 'Custom', words: custom }] : [])]
    .map((c) => ({ ...c, words: c.words.filter((w) => w.toLowerCase().includes(query)) }))
    .filter((c) => c.words.length > 0)

  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId}>{heading}</h2>
      <p className="hint">{hint}</p>
      <SelectionHelp limit={limit} unit={kind === 'values' ? 'values' : 'skills'} />

      <input
        type="search"
        className="filter"
        placeholder={`Filter ${noun}`}
        aria-label={filterLabel}
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      {visible.length === 0 && <p className="hint">No {noun} match your filter.</p>}

      <div className="categories">
        {visible.map((c) => {
          const isCustom = c.category === 'Custom'
          return (
            <div key={c.category} className="category">
              <h3>{c.category}</h3>
              <ul className="chips">
                {c.words.map((name) => (
                  <li key={name} className={isCustom ? 'custom-item' : undefined}>
                    <TermButton
                      kind={kind}
                      name={name}
                      className={`chip${isCustom ? ' custom' : ''}`}
                      selected={chosen.has(name)}
                      unavailable={full && !chosen.has(name)}
                      onToggle={() => onToggle(name)}
                    />
                    {isCustom && (
                      <button
                        type="button"
                        className="remove"
                        aria-label={`Remove ${name}`}
                        onClick={() => onRemoveCustom(name)}
                      >
                        ×
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      <AddEntry label={addLabel} placeholder={addPlaceholder} full={full} onAdd={onAddCustom} />
      <SelectionStatus count={selected.length} limit={limit} />
    </section>
  )
}
