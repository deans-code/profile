import type { SourceContribution } from '../types'

/**
 * Wikipedia, "Code refactoring" (https://en.wikipedia.org/wiki/Code_refactoring, CC BY-SA 4.0, edited 9 November 2026).
 * Read: its timing, workflow, static analysis and transformations. Part of some Wikipedia pages came through the fetch tool's summary rather than verbatim. Descriptions are written for this app; no article text is copied.
 */
export const codeRefactoringWikipedia: SourceContribution = {
  source: 'code-refactoring-wikipedia',
  checked: '2026-11-14',
  categories: {
    'Delivery and process': {
      'Code review': '',
    },
    Testing: {
      'Mutation testing': '',
    },
    'Software quality and maintenance': {
      'Code maintainability': '',
      Refactoring: '',
      'Code smells': '',
      'Static analysis': 'Examining code without running it to find defects and complexity.',
      'Cyclomatic complexity': 'Measuring how many paths run through code as a guide to how hard it is to test.',
      'Legacy code modernisation': '',
    },
  },
}
