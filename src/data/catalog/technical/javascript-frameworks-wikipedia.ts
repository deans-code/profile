import type { SourceContribution } from '../types'

/**
 * Wikipedia, "Comparison of JavaScript-based web frameworks" (https://en.wikipedia.org/wiki/Comparison_of_JavaScript-based_web_frameworks, CC BY-SA 4.0, edited 11 November 2026).
 * Read: its general information table, with frameworks released in 2024 or later. Technologies are offered when the page lists them as maintained (latest release 2024 or later where the page gives dates) and they are widely used; discontinued items are left out. Part of some pages came through the fetch tool's summary rather than verbatim. Descriptions are written for this app.
 */
export const javascriptFrameworksWikipedia: SourceContribution = {
  source: 'javascript-frameworks-wikipedia',
  checked: '2026-11-14',
  categories: {
    'Web frameworks and technologies': {
      React: '',
      'Next.js': '',
      'Vue.js': '',
      Angular: '',
      Svelte: '',
      Astro: '',
      htmx: '',
      Express: '',
      SolidJS: '',
      Remix: '',
      'Ember.js': 'A convention-driven JavaScript framework for ambitious web apps.',
      Preact: 'A small, fast alternative to React.',
      Qwik: 'A framework designed to load web apps instantly.',
      'React Router': 'Routing and, increasingly, full-stack features for React.',
      Fresh: 'A web framework for Deno.',
    },
  },
}
