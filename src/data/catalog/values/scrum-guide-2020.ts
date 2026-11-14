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
    'Working together': {
      Commitment: 'Being dedicated to achieving the goals of the team and keeping your promises to it.',
      Focus: 'Concentrating on the work that matters most and the team’s shared goals.',
      Openness: 'Being open about your work, challenges and ideas, and open to others’ views.',
      Respect: 'Treating colleagues as capable, independent people and valuing what they bring.',
      Courage: '',
    },
  },
}
