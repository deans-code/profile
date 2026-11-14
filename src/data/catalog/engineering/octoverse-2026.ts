import type { SourceContribution } from '../types'

/**
 * Octoverse 2026, GitHub (https://github.blog/news-insights/octoverse/octoverse-commits-pushes-reach-new-highs-in-2026-as-developers-build-with-agents/),
 * published 28 October 2026, covering October 2025 to September 2026. The page states no reuse terms, so it is linked
 * and credited only. Practices it reports at scale: 1.3 billion merged pull requests, more than 30 million merged
 * Dependabot pull requests, 5.8 billion push protection scans, 45.4 billion GitHub Actions jobs and 2.5 billion public
 * contributions. Its stacked pull requests preview is not credited because the Thoughtworks Radar puts that practice
 * in its Caution ring. Languages, tools and projects it names are credited on the Technical development and AI
 * engineering tabs.
 */
export const octoverse2026: SourceContribution = {
  source: 'octoverse-2026',
  checked: '2026-11-14',
  categories: {
    'Delivery and process': {
      'Continuous integration': '',
      'Code review': 'Having teammates examine each change before it is merged, to catch defects, share knowledge and keep quality consistent.',
      'Automated dependency updates': 'Using tools such as Dependabot to open pull requests that keep libraries and packages up to date.',
      'Open source contribution': 'Taking part in public projects by reporting issues, proposing changes and following a project’s contribution process.',
    },
    Security: {
      'Secret scanning and push protection': 'Detecting passwords, keys and tokens in code and blocking them before they are pushed to a repository.',
    },
  },
}
