import type { SourceContribution } from '../types'

/**
 * Wikipedia, "Software testing" (https://en.wikipedia.org/wiki/Software_testing, CC BY-SA 4.0, edited 31 October 2026).
 * Read: its levels, types and techniques. Part of some Wikipedia pages came through the fetch tool's summary rather than verbatim. Descriptions are written for this app; no article text is copied.
 */
export const softwareTestingWikipedia: SourceContribution = {
  source: 'software-testing-wikipedia',
  checked: '2026-11-14',
  categories: {
    'Delivery and process': {
      'Test-driven development': '',
    },
    Testing: {
      'Test automation': '',
      'Mutation testing': '',
      'Contract testing': '',
      'Usability testing': '',
      'Unit testing': 'Testing small pieces of code in isolation.',
      'Integration testing': 'Testing that separate parts work together.',
      'End-to-end testing': 'Testing a whole flow through the real system, as a user would.',
      'Test pyramid': 'Balancing many fast unit tests with fewer slower integration and end-to-end tests.',
      'Regression testing': 'Re-running tests to be sure that changes did not break existing behaviour.',
      'Exploratory testing': 'Learning and testing the system at the same time, guided by curiosity.',
      'Acceptance testing': 'Checking that the software meets the needs it was built for.',
      'Smoke testing': 'A quick check that the most important functions work at all.',
      'Performance testing': 'Measuring how fast and how stable the system is under load.',
      'Load and stress testing': 'Pushing a system toward and past its limits to see how it behaves.',
      'Security testing': 'Testing that the system resists attack and protects data.',
      'Accessibility testing': 'Checking that people with different abilities can use the software.',
      'Property-based testing': 'Checking that general properties hold across many generated inputs.',
      'Fuzz testing': 'Feeding unexpected random inputs to find crashes and weaknesses.',
      'Boundary value analysis': 'Testing at the edges of valid input ranges, where bugs concentrate.',
      'Equivalence partitioning': 'Grouping inputs that should behave alike and testing one from each.',
      'Code coverage': 'Measuring how much of the code the tests exercise.',
      'A/B testing': 'Comparing two versions with real users to see which works better.',
      'Visual testing': 'Comparing how the interface looks against an approved version.',
      'Snapshot testing': 'Comparing output against previously recorded, approved output.',
    },
    'Software quality and maintenance': {
      'Verification and validation': '',
    },
  },
}
