import type { SourceContribution } from '../types'

/**
 * Wikipedia, "Robert C. Martin" (https://en.wikipedia.org/wiki/Robert_C._Martin, CC BY-SA 4.0, edited 13 August 2026).
 * Read: the Clean Code paradigm (SOLID, TDD, KISS, structured and object-oriented programming) and the rule that functions should do one thing (the address /wiki/Clean_Code redirects to it). Descriptions are written for this app; no article text is copied.
 */
export const robertCMartinWikipedia: SourceContribution = {
  source: 'robert-c-martin-wikipedia',
  checked: '2026-11-14',
  categories: {
    'Clean and decoupled architecture': {
      'Clean Architecture': '',
    },
    'Software quality and maintenance': {
      'Clean Code': 'Writing code that is readable, simple and easy to change, following practices such as SOLID, TDD and KISS.',
      'Small functions that do one thing': 'Keeping functions short and each doing a single thing well.',
    },
  },
}
