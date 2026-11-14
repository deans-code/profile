import type { SourceContribution } from '../types'

/**
 * State of CSS 2025 (https://2025.stateofcss.com/), Devographics.
 * Read: the Other Tools results (CSS frameworks, CSS-in-JS, pre- and post-processors, utilities), whose lists were shown with respondent counts. Tools used by about 5% or more of the respondents to a question are offered. No licence is shown on the pages read. Descriptions are written for this app. State of JS 2025 could not be read (its results did not load) and PYPL's ranking is drawn by script, so neither is used.
 */
export const stateOfCss2025: SourceContribution = {
  source: 'state-of-css-2025',
  checked: '2026-11-14',
  categories: {
    'Styling and front-end tooling': {
      'Tailwind CSS': 'A utility-first CSS framework.',
      Bootstrap: 'A widely used CSS and component framework.',
      'shadcn/ui': 'A collection of copy-in components built on Tailwind CSS.',
      'Ant Design': 'An enterprise UI component library.',
      'Materialize CSS': 'A CSS framework based on Material Design.',
      'Sass and SCSS': 'A CSS preprocessor with variables, nesting and mixins.',
      PostCSS: 'A tool that transforms CSS with plugins.',
      Less: 'A CSS preprocessor with variables and mixins.',
      'Lightning CSS': 'A very fast CSS parser, transformer and minifier.',
      'CSS Modules': 'CSS files scoped locally to the component that imports them.',
      'Styled Components': 'A library for writing CSS inside JavaScript components.',
      Emotion: 'A CSS-in-JS library for styling components.',
      Prettier: 'An opinionated code formatter.',
      Biome: 'A fast formatter and linter for web code.',
      Autoprefixer: 'Adds vendor prefixes to CSS automatically.',
      Stylelint: 'A linter for CSS.',
      cssnano: 'A CSS minifier built on PostCSS.',
      PurgeCSS: 'Removes unused CSS from stylesheets.',
    },
  },
}
