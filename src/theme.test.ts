import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const css = readFileSync(resolve(__dirname, 'styles.css'), 'utf-8')

const SECTIONS = ['values', 'technical', 'engineering', 'interpersonal', 'ai', 'card']

type Tokens = Record<string, string>

function declarations(block: string): Tokens {
  const out: Tokens = {}
  for (const m of block.matchAll(/(--[\w-]+):\s*([^;]+);/g)) out[m[1]] = m[2].trim()
  return out
}

/** Splits the stylesheet into the light palette, the system-dark media query and the explicit dark theme. */
const [lightCss, afterMedia] = css.split('@media (prefers-color-scheme: dark)')
const [darkCss, explicitRaw] = afterMedia.split('/* Explicit dark theme')
const explicitDarkCss = explicitRaw.split('\n* {')[0]

const SYSTEM_DARK_ROOT = ":root:not([data-theme='light'])"
const EXPLICIT_DARK_ROOT = ":root[data-theme='dark']"

function base(part: string, root = ':root'): Tokens {
  const start = part.indexOf(`${root} {`)
  if (start < 0) throw new Error(`no ${root} block`)
  const open = part.indexOf('{', start)
  return declarations(part.slice(open + 1, part.indexOf('}', open)))
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
  { name: 'dark', base: () => ({ ...base(lightCss), ...base(darkCss, SYSTEM_DARK_ROOT) }), sec: (n: string) => section(darkCss, n) },
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

describe('explicit theme selectors', () => {
  it('explicit dark mirrors the system dark palette', () => {
    expect(base(explicitDarkCss, EXPLICIT_DARK_ROOT)).toEqual(base(darkCss, SYSTEM_DARK_ROOT))
    for (const name of SECTIONS) expect(section(explicitDarkCss, name)).toEqual(section(darkCss, name))
  })

  it('defines the three larger text sizes', () => {
    expect(css).toMatch(/\[data-text-size='large'\]\s*\{\s*font-size:\s*112\.5%/)
    expect(css).toMatch(/\[data-text-size='larger'\]\s*\{\s*font-size:\s*125%/)
    expect(css).toMatch(/\[data-text-size='largest'\]\s*\{\s*font-size:\s*150%/)
  })

  it('sizes controls in rem so they scale with text', () => {
    expect(css).not.toMatch(/min-(height|width):\s*44px/)
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
