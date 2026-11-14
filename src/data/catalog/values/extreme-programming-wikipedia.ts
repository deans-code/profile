import type { SourceContribution } from '../types'

/**
 * Wikipedia, "Extreme programming" (https://en.wikipedia.org/wiki/Extreme_programming, CC BY-SA 4.0, edited 14 October 2026).
 * Read: its five values (communication, simplicity, feedback, courage, respect), its principles and its practices. Part of the page came through the fetch tool's summary rather than verbatim. Descriptions are written for this app.
 */
export const extremeProgrammingValues: SourceContribution = {
  source: 'extreme-programming-wikipedia',
  checked: '2026-11-14',
  categories: {
    'Building and delivering with computers': {
      Simplicity: '',
      Feedback: 'Getting quick, frequent signals from tests, users and colleagues, and acting on them.',
      'Sustainable pace': '',
      'Shared ownership': 'Treating the code and the product as the whole team’s, so anyone can improve any part.',
      'Shared understanding': 'Keeping everyone’s picture of the system and its purpose aligned through simple designs and common language.',
    },
    'Working in a team': {
      Communication: 'Sharing what you know and need clearly and often, so the team works from the same understanding.',
    },
    'Working with others': {
      Respect: '',
    },
    'Adopting new ways of working': {
      'Embracing change': 'Treating change as normal and welcoming it rather than resisting it.',
    },
    'Personal character': {
      Courage: '',
    },
    'What I expect from others': {
      'Honest feedback': 'Expecting others to tell you plainly how you are doing, good and bad.',
      'Dignity and respect': 'Expecting to be treated with respect whatever your role or background.',
    },
  },
}
