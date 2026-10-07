import { useId, useState } from 'react'
import type { TermKind } from '../data/definitions'
import { ASSISTANT_HELP } from '../data/assistant'
import AddEntry from './AddEntry'
import AssistantLink from './AssistantLink'
import ModeSwitch from './ModeSwitch'
import SelectionHelp from './SelectionHelp'
import SelectionStatus from './SelectionStatus'
import TermButton from './TermButton'
import type { Mode } from '../state/profile'

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
  /** The experience option being edited, the selection counts for each option, and how to change it. */
  mode: Mode
  counts: Record<Mode, number>
  onModeChange: (mode: Mode) => void
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
  mode,
  counts,
  onModeChange,
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
  const filterId = useId()
  const hintId = `${filterId}-hint`
  const chosen = new Set(selected)
  const full = limit !== undefined && selected.length >= limit
  const query = filter.trim().toLowerCase()

  const visible = [...categories, ...(custom.length > 0 ? [{ category: 'Custom', words: custom }] : [])]
    .map((c) => ({ ...c, words: c.words.filter((w) => w.toLowerCase().includes(query)) }))
    .filter((c) => c.words.length > 0)

  const total = categories.reduce((n, c) => n + c.words.length, 0) + custom.length
  const shown = visible.reduce((n, c) => n + c.words.length, 0)

  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId}>{heading}</h2>
      <p className="hint">{hint}</p>
      {ASSISTANT_HELP[kind] && <AssistantLink {...ASSISTANT_HELP[kind]} />}
      <ModeSwitch mode={mode} counts={counts} onChange={onModeChange} />
      <SelectionHelp limit={limit} unit={kind === 'values' ? 'values' : 'skills'} mode={mode} />

      <div className="filter-block">
        <label htmlFor={filterId} className="filter-label">
          {filterLabel}
        </label>
        <p id={hintId} className="filter-hint">
          Type part of a word to show only the {noun} that match. Your selections are kept.
        </p>
        <input
          id={filterId}
          type="search"
          className="filter"
          placeholder="Type to filter…"
          aria-describedby={hintId}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        {query && (
          <p className="filter-count" aria-live="polite">
            Showing {shown} of {total} {noun}.
          </p>
        )}
      </div>

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
