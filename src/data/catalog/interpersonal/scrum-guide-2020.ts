import type { SourceContribution } from '../types'

/**
 * The 2020 Scrum Guide, Ken Schwaber and Jeff Sutherland (https://scrumguides.org/scrum-guide.html), licensed CC BY-SA 4.0.
 * A standing framework rather than a periodic survey, so its 2020 edition remains current. It states that Scrum Teams are
 * self-managing, that the Scrum Master facilitates stakeholder collaboration and coaches teams in self-management and
 * cross-functionality, and that Scrum rests on transparency, inspection and adaptation. Its five values (commitment,
 * focus, openness, respect and courage) are covered on the Values tab, so they are not repeated here.
 * Only the guide's text was read for what it states; nothing is reproduced.
 */
export const scrumGuide2020: SourceContribution = {
  source: 'scrum-guide-2020',
  checked: '2026-11-14',
  categories: {
    'Teamwork and collaboration': {
      'Self-managing teams': 'Working as a team that decides for itself who does what, when and how, rather than being directed.',
      'Working transparently': 'Making your work, progress and problems visible to teammates and stakeholders so they can be inspected and discussed.',
      'Inspecting and adapting': 'Regularly reviewing what you have done and changing your plans and ways of working based on what you learn.',
    },
    'Leadership, coaching and facilitation': {
      Facilitation: 'Running meetings and workshops so everyone takes part, discussion stays focused and decisions are reached.',
      Coaching: 'Helping individuals and teams build their own skills and judgement through questions, feedback and support.',
    },
    'Customers and stakeholders': {
      'Stakeholder collaboration': 'Working closely with the people who are affected by or depend on your work, and keeping them involved.',
    },
  },
}
