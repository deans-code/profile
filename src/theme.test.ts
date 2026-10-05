import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const css = readFileSync(resolve(__dirname, 'styles.css'), 'utf-8')

const SECTIONS = ['values', 'technical', 'engineering', 'interpersonal', 'scoring', 'card']

type Tokens = Record<string, string>

function declarations(block: string): Tokens {
  const out: Tokens = {}
  for (const m of block.matchAll(/(--[\w-]+):\s*([^;]+);/g)) out[m[1]] = m[2].trim()
  return out
}

/** Splits the stylesheet at the dark-mode media query: [light part, dark part]. */
const [lightCss, darkCss] = css.split('@media (prefers-color-scheme: dark)')

function base(part: string): Tokens {
  const m = part.match(/:root\s*\{([^}]*)\}/)
  return declarations(m![1])
}

function section(part: string, name: string): Tokens {
  const m = part.match(new RegExp(`\\[data-section='${name}'\\]\\s*\\{([^}]*)\\}`))
  if (!m) throw new Error(`no ${name} palette`)
  return declarations(m[1])
}

function luminance(hex: string): number {
  const n = parseInt(hex.slice(1), 16)
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

const themes = [
  { name: 'light', base: () => base(lightCss), sec: (n: string) => section(lightCss, n) },
  { name: 'dark', base: () => ({ ...base(lightCss), ...base(darkCss) }), sec: (n: string) => section(darkCss, n) },
]

describe.each(themes)('$name theme palette', (theme) => {
  const b = theme.base()

  it('gives every section a different accent colour', () => {
    const accents = SECTIONS.map((s) => theme.sec(s)['--accent'])
    expect(new Set(accents).size).toBe(SECTIONS.length)
  })

  it.each(SECTIONS)('%s: button text meets 4.5:1 on the accent', (name) => {
    const t = theme.sec(name)
    expect(contrast(t['--accent-text'], t['--accent'])).toBeGreaterThanOrEqual(4.5)
  })

  it.each(SECTIONS)('%s: accent text and boundaries are visible on the page and card backgrounds', (name) => {
    const t = theme.sec(name)
    expect(contrast(t['--accent'], b['--bg'])).toBeGreaterThanOrEqual(4.5)
    expect(contrast(t['--accent'], b['--surface'])).toBeGreaterThanOrEqual(4.5)
    expect(contrast(t['--accent'], t['--tint'])).toBeGreaterThanOrEqual(3)
  })

  it.each(SECTIONS)('%s: body text meets 4.5:1 on the tint used by selected words', (name) => {
    const t = theme.sec(name)
    expect(contrast(b['--text'], t['--tint'])).toBeGreaterThanOrEqual(4.5)
    expect(contrast(b['--muted'], t['--tint'])).toBeGreaterThanOrEqual(4.5)
  })

  it('has readable muted text and visible borders', () => {
    expect(contrast(b['--muted'], b['--bg'])).toBeGreaterThanOrEqual(4.5)
    expect(contrast(b['--muted'], b['--surface'])).toBeGreaterThanOrEqual(4.5)
  })
})

describe('stylesheet', () => {
  it('has no per-word font size variation', () => {
    expect(css).not.toMatch(/\.weight-\d/)
    const chipRules = [...css.matchAll(/\.chip[^{]*\{([^}]*)\}/g)].map((m) => m[1])
    const sizes = chipRules.flatMap((r) => [...r.matchAll(/font-size:\s*([^;]+);/g)].map((m) => m[1].trim()))
    expect(new Set(sizes).size).toBeLessThanOrEqual(1)
  })
})
