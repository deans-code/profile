import type { SourceContribution } from '../types'

/**
 * Wikipedia, "Lean software development" (https://en.wikipedia.org/wiki/Lean_software_development, CC BY-SA 4.0, edited 22 December 2025).
 * Read: the seven principles (eliminate waste, amplify learning, decide as late as possible, deliver as fast as possible, empower the team, build integrity in, optimise the whole). Descriptions are written for this app.
 */
export const leanSoftwareValues: SourceContribution = {
  source: 'lean-software-development-wikipedia',
  checked: '2026-11-14',
  categories: {
    'Building and delivering with computers': {
      Feedback: '',
      'Early and frequent delivery': '',
      'Eliminating waste': 'Cutting out anything that adds no value for the people the work is for.',
      'Built-in quality': 'Building quality in from the start through design, refactoring and automated tests rather than inspecting it in later.',
      'Optimising the whole': 'Improving the whole system and flow of work instead of tuning one part at the cost of the rest.',
    },
    'Working in a team': {
      Empowerment: '',
      'Collective responsibility': 'Sharing responsibility for the outcome, so success and problems belong to the whole team.',
    },
    'Adopting new ways of working': {
      'Continuous improvement': '',
      'Deferring decisions': 'Keeping options open and deciding as late as sensible, when more facts are known.',
    },
    'Learning and growth': {
      'Amplifying learning': 'Treating work as continuous learning, using short cycles and feedback to find out what works.',
    },
    'Business and organisation': {
      'Delivering value': 'Focusing the organisation on what actually benefits its customers.',
    },
  },
}
