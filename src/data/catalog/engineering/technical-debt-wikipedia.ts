import type { SourceContribution } from '../types'

/**
 * Wikipedia, "Technical debt" (https://en.wikipedia.org/wiki/Technical_debt, CC BY-SA 4.0, edited 16 October 2026).
 * Read: its causes, consequences and management. Part of some Wikipedia pages came through the fetch tool's summary rather than verbatim. Descriptions are written for this app; no article text is copied.
 */
export const technicalDebtWikipedia: SourceContribution = {
  source: 'technical-debt-wikipedia',
  checked: '2026-11-14',
  categories: {
    'Software quality and maintenance': {
      'Code maintainability': '',
      Maintainability: '',
      'Technical debt management': 'Finding, recording and paying down shortcuts that make later change harder.',
      'Code smells': 'Recognising signs in code that point to deeper design problems.',
      'Legacy code modernisation': 'Improving and safely changing older code that was not built to be changed.',
    },
  },
}
