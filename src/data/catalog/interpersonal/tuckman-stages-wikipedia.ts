import type { SourceContribution } from '../types'

/**
 * Wikipedia, "Tuckman's stages of group development" (https://en.wikipedia.org/wiki/Tuckman%27s_stages_of_group_development, CC BY-SA 4.0, edited 11 September 2026).
 * Read: the five stages: forming, storming, norming, performing and adjourning. Each is offered as the skill of guiding a team through it. Part of some Wikipedia pages came through the fetch tool's summary rather than verbatim. Descriptions are written for this app; no article text is copied.
 */
export const tuckmanStagesWikipedia: SourceContribution = {
  source: 'tuckman-stages-wikipedia',
  checked: '2026-11-14',
  categories: {
    'Teamwork and collaboration': {
      'Guiding a new team (forming)': 'Helping a new team get oriented, get to know each other and agree on its purpose.',
      'Working through team conflict (storming)': 'Helping a team through the disagreements and friction of finding how to work together.',
      'Setting team norms (norming)': 'Agreeing how the team will work together and keeping to it.',
      'Sustaining a high-performing team (performing)': 'Keeping a team that works well focused and effective.',
      'Closing a team well (adjourning)': 'Wrapping up the work and the relationships when a team or project ends.',
    },
  },
}
