import type { SourceContribution } from '../types'

/**
 * Wikipedia, "Comparison of version-control software" (https://en.wikipedia.org/wiki/Comparison_of_version-control_software, CC BY-SA 4.0, edit date not shown on the text read).
 * Read: the active products in its general information table. Discontinued and unmaintained products are left out. Technologies are offered when the page lists them as maintained (latest release 2024 or later where the page gives dates) and they are widely used; discontinued items are left out. Part of some pages came through the fetch tool's summary rather than verbatim. Descriptions are written for this app.
 */
export const versionControlWikipedia: SourceContribution = {
  source: 'version-control-wikipedia',
  checked: '2026-11-14',
  categories: {
    'Version control': {
      Git: 'The distributed version control system most developers use.',
      Mercurial: 'A distributed version control system.',
      'Apache Subversion': 'A centralised version control system.',
      Fossil: 'A distributed version control system with built-in tickets and wiki.',
      'Perforce Helix Core': 'Version control built for very large codebases and binary assets.',
      Darcs: 'A distributed version control system based on patches.',
      'Unity Version Control': 'Version control designed for game projects and large assets.',
      'Azure DevOps': '',
    },
  },
}
