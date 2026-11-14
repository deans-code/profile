import type { SourceContribution } from '../types'

/**
 * Wikipedia, "ISO/IEC 9126" (https://en.wikipedia.org/wiki/ISO/IEC_9126, CC BY-SA 4.0, edited 24 June 2026).
 * Read: the quality characteristics of ISO/IEC 9126 and the changes made by its replacement ISO/IEC 25010 (the address /wiki/ISO/IEC_25010 redirects to it). Part of some Wikipedia pages came through the fetch tool's summary rather than verbatim. Descriptions are written for this app; no article text is copied.
 */
export const iso9126Wikipedia: SourceContribution = {
  source: 'iso-9126-wikipedia',
  checked: '2026-11-14',
  categories: {
    'Cloud-native and platform practices': {
      'Performance efficiency': 'Using resources efficiently and scaling to meet demand.',
    },
    Testing: {
      'Usability testing': 'Watching real people use the software to find what confuses them.',
    },
    'Software quality and maintenance': {
      'Code maintainability': '',
      'Functional suitability': 'The degree to which the software does what it should, completely and correctly.',
      Compatibility: '',
      Usability: 'How easy and satisfying the software is to learn and use.',
      Reliability: '',
      Maintainability: '',
      Portability: 'How easily the software moves to another environment.',
      Testability: '',
      Modularity: '',
      'Software quality assurance': '',
      'Verification and validation': 'Checking that you built the thing right and the right thing.',
    },
  },
}
