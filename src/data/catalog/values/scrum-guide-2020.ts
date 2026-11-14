import type { SourceContribution } from '../types'

/**
 * The 2020 Scrum Guide, Ken Schwaber and Jeff Sutherland (https://scrumguides.org/scrum-guide.html), licensed CC BY-SA 4.0.
 * It names five Scrum values: Commitment, Focus, Openness, Respect and Courage. They are offered here as values for
 * people who work in teams. A standing framework, so its 2020 edition remains current. Descriptions are written for this
 * app. Courage is already offered from the Rokeach list and only gains this source.
 */
export const scrumGuideValues: SourceContribution = {
  source: 'scrum-guide-2020',
  checked: '2026-11-14',
  categories: {
    'Doing good work': {
      Focus: 'Concentrating on the work that matters most and the team’s shared goals.',
    },
    'Working in a team': {
      Commitment: 'Being dedicated to achieving the goals of the team and keeping your promises to it.',
      Openness: 'Being open about your work, challenges and ideas, and open to others’ views.',
    },
    'Working with others': {
      Respect: 'Treating colleagues as capable, independent people and valuing what they bring.',
    },
    'Adopting new ways of working': {
      Transparency: 'Making your work and its progress visible so everyone shares the same facts.',
      Inspection: 'Checking work and progress often enough to catch problems early.',
      Adaptation: 'Changing course promptly when inspection shows something is off.',
    },
    'Personal character': {
      Courage: '',
    },
  },
}
