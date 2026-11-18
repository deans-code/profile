import { useEffect, useId, useRef, useState, type RefObject } from 'react'
import type { TermKind } from '../data/definitions'
import { ASSISTANT_HELP } from '../data/assistant'
import AddEntry, { AddEntryHelp } from './AddEntry'
import AssistantLink from './AssistantLink'
import ModeSwitch from './ModeSwitch'
import SelectionHelp from './SelectionHelp'
import SelectionStatus from './SelectionStatus'
import TermButton from './TermButton'
import { prefersReducedMotion } from '../useStepNavigation'
import type { Mode } from '../state/profile'

const COLUMN_REM = 24
const COLUMN_GAP_REM = 1

/** How many columns of cards fit in the element's width; one when the width cannot be measured. */
function useColumnCount(ref: RefObject<HTMLElement | null>): number {
  const [count, setCount] = useState(1)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const measure = () => {
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
      const fit = Math.floor((el.clientWidth + COLUMN_GAP_REM * rem) / ((COLUMN_REM + COLUMN_GAP_REM) * rem))
      setCount(Math.max(1, fit))
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])
  return count
}

/** Splits items into `parts` runs of consecutive items, so reading order stays the category order. */
function chunk<T>(items: T[], parts: number): T[][] {
  const size = Math.max(1, Math.ceil(items.length / parts))
  const out: T[][] = []
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size))
  return out
}

/** A broader term and the options shown under it. */
export interface WordGroup {
  term: string
  options: string[]
}

export interface WordCategory {
  category: string
  /** Options not under any broader term. */
  words: string[]
  /** Broader terms heading groups of options in this category. Omit when there are none. */
  groups?: WordGroup[]
}

interface Props {
  kind: TermKind
  headingId: string
  heading: string
  hint: string
  /** One line saying what to do on this page. */
  lead: string
  categories: WordCategory[]
  selected: string[]
  custom: string[]
  /** The experience option being edited, the selection counts for each option, and how to change it. Omit on pages with a single list (values). */
  mode?: Mode
  counts?: Record<Mode, number>
  onModeChange?: (mode: Mode) => void
  /** Maximum selectable words on this page; omit for no limit. */
  limit?: number
  /** Minimum words needed to continue; omit for no minimum. */
  min?: number
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
  lead,
  categories,
  selected,
  custom,
  mode,
  counts,
  onModeChange,
  limit,
  min,
  noun,
  filterLabel,
  addLabel,
  addPlaceholder,
  onToggle,
  onAddCustom,
  onRemoveCustom,
}: Props) {
  const [filter, setFilter] = useState('')
  // Categories the user has opened; every card starts collapsed. A filter with text shows matching cards open without changing this.
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [bulkStatus, setBulkStatus] = useState('')
  const filterId = useId()
  const hintId = `${filterId}-hint`
  const addHelpId = `${filterId}-add-help`
  const chosen = new Set(selected)
  // Cards are dealt into fixed columns by position, so opening one card only moves the cards below it in its column.
  const categoriesEl = useRef<HTMLDivElement | null>(null)
  const columnCount = useColumnCount(categoriesEl)
  const hasGroups = categories.some((c) => (c.groups?.length ?? 0) > 0)

  // Adding a new custom entry reveals the Custom card: clear a filter that would hide it, then scroll to it.
  const pendingAdd = useRef(false)
  const lastCustomCount = useRef(custom.length)
  const customCard = useRef<HTMLDivElement | null>(null)
  const [revealTick, setRevealTick] = useState(0)

  useEffect(() => {
    const grew = custom.length > lastCustomCount.current
    lastCustomCount.current = custom.length
    const wanted = pendingAdd.current
    pendingAdd.current = false
    if (!grew || !wanted) return
    setFilter('')
    setExpanded((prev) => (prev.has('Custom') ? prev : new Set(prev).add('Custom')))
    setRevealTick((t) => t + 1)
  })

  useEffect(() => {
    if (revealTick === 0) return
    customCard.current?.scrollIntoView({ block: 'nearest', behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }, [revealTick])

  function addCustom(text: string) {
    pendingAdd.current = true
    onAddCustom(text)
  }
  function toggleCard(category: string) {
    setBulkStatus('')
    setExpanded((prev) => {
      const next = new Set(prev)
      if (!next.delete(category)) next.add(category)
      return next
    })
  }
  function showAll() {
    setExpanded(new Set([...categories.map((c) => c.category), ...(custom.length > 0 ? ['Custom'] : [])]))
    setBulkStatus('All sections shown')
  }
  function collapseAll() {
    setExpanded(new Set())
    setBulkStatus('All sections collapsed')
  }
  const full = limit !== undefined && selected.length >= limit
  const query = filter.trim().toLowerCase()

  const matches = (w: string) => w.toLowerCase().includes(query)
  const visible = [...categories, ...(custom.length > 0 ? [{ category: 'Custom', words: custom }] : [])]
    .map((c) => ({
      category: c.category,
      words: c.words.filter(matches),
      // A group shows when its term or any option matches; the term stays for context.
      groups: ((c as WordCategory).groups ?? [])
        .map((g) => ({ term: g.term, termMatches: matches(g.term), options: g.options.filter(matches), all: g.options.length }))
        .filter((g) => g.termMatches || g.options.length > 0),
    }))
    .filter((c) => c.words.length > 0 || c.groups.length > 0)

  const total =
    categories.reduce((n, c) => n + c.words.length + (c.groups ?? []).reduce((m, g) => m + 1 + g.options.length, 0), 0) + custom.length
  const shown = visible.reduce(
    (n, c) => n + c.words.length + c.groups.reduce((m, g) => m + (g.termMatches ? 1 : 0) + g.options.length, 0),
    0,
  )

  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId}>{heading}</h2>
      <p className="lead">{lead}</p>
      <p className="hint">{hint}</p>
      {ASSISTANT_HELP[kind] && <AssistantLink {...ASSISTANT_HELP[kind]} />}
      {mode && (
        <p className="experience-intro">
          Your profile is built from two kinds of experience: what you have <strong>already done</strong> (previous
          experience) and what you <strong>want to do</strong> (desired experience). Fill in both, switching with the
          options below.
        </p>
      )}
      <SelectionHelp limit={limit} min={min} unit={kind === 'values' ? 'values' : 'skills'} mode={mode} />
      <AddEntryHelp id={addHelpId} />

      <div className="pinned-bar">
        {mode && counts && onModeChange && <ModeSwitch mode={mode} counts={counts} onChange={onModeChange} />}
        <AddEntry label={addLabel} placeholder={addPlaceholder} helpId={addHelpId} full={full} onAdd={addCustom} />
      </div>

      {hasGroups && (
        <p className="broad-note">
          Each option marked "Broad" is a broader term. It heads the boxed group of options below it. Choosing it deselects those options, and choosing one of them deselects it.
        </p>
      )}

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

      <div className="bulk-bar">
        <button type="button" className="bulk-button" onClick={showAll}>
          Show all
        </button>
        <button type="button" className="bulk-button" onClick={collapseAll}>
          Collapse all
        </button>
        <span className="bulk-status" aria-live="polite">
          {bulkStatus}
        </span>
      </div>

      {visible.length === 0 && <p className="hint">No {noun} match your filter.</p>}

      <div className="categories" ref={categoriesEl}>
        {chunk(visible.map((c) => {
          const isCustom = c.category === 'Custom'
          const chip = (name: string, isBroad: boolean) => (
            <TermButton
              kind={kind}
              name={name}
              className={`chip${isCustom ? ' custom' : ''}${isBroad ? ' broad' : ''}`}
              selected={chosen.has(name)}
              unavailable={full && !chosen.has(name)}
              onToggle={() => onToggle(name)}
            >
              {isBroad ? (
                <>
                  {name} <span className="broad-label" aria-hidden="true">Broad</span>
                </>
              ) : undefined}
            </TermButton>
          )
          const isOpen = expanded.has(c.category) || query !== ''
          const regionId = `${filterId}-${c.category.replace(/\W+/g, '-')}`
          const names = [...c.words, ...c.groups.flatMap((g) => [g.term, ...g.options])]
          const pickedHere = names.filter((n) => chosen.has(n)).length
          return (
            <div key={c.category} className={isCustom ? 'category custom-card' : 'category'} ref={isCustom ? customCard : undefined}>
              <h3>
                <button
                  type="button"
                  className="category-toggle"
                  aria-label={`${c.category} category${!isOpen && pickedHere > 0 ? `, ${pickedHere} selected` : ''}`}
                  aria-expanded={isOpen}
                  aria-controls={regionId}
                  onClick={() => toggleCard(c.category)}
                >
                  <span className="category-chevron" aria-hidden="true">{isOpen ? '▾' : '▸'}</span>
                  <span className="category-name">{c.category}</span>
                  {!isOpen && pickedHere > 0 && <span className="category-count">{pickedHere} selected</span>}
                </button>
              </h3>
              <div id={regionId} hidden={!isOpen}>
              {c.groups.map((g) => (
                <div key={g.term} className="broad-group" role="group" aria-label={`${g.term} and the options it groups`}>
                  <div className="group-head">
                    {chip(g.term, true)}
                    <span className="group-caption">Groups these {g.all} options:</span>
                  </div>
                  <ul className="chips">
                    {g.options.map((name) => (
                      <li key={name}>{chip(name, false)}</li>
                    ))}
                  </ul>
                </div>
              ))}
              {c.words.length > 0 && (
                <>
                  {c.groups.length > 0 && <p className="group-caption others-caption">Other options</p>}
                  <ul className="chips">
                    {c.words.map((name) => (
                      <li key={name} className={isCustom ? 'custom-item' : undefined}>
                        {chip(name, false)}
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
                </>
              )}
              </div>
            </div>
          )
        }), columnCount).map((column, i) => (
          <div key={i} className="category-column">
            {column}
          </div>
        ))}
      </div>

      <SelectionStatus count={selected.length} limit={limit} min={min} />
    </section>
  )
}
