import type { SourceContribution } from '../types'

/**
 * Wikipedia, "Work ethic" (https://en.wikipedia.org/wiki/Work_ethic, CC BY-SA 4.0, edited 6 August 2026).
 * Read: the factors of a good work ethic, the seven-factor measure and its related attitudes. Part of the page came through the fetch tool's summary. Descriptions are written for this app.
 */
export const workEthicValues: SourceContribution = {
  source: 'work-ethic-wikipedia',
  checked: '2026-11-14',
  categories: {
    'Doing good work': {
      Diligence: 'Working steadily and carefully, giving a task the effort it deserves.',
      Conscientiousness: 'Being thorough and careful, and doing what you said you would do.',
      'Hard work': 'Putting in sustained effort to do the job well.',
      'Productive use of time': 'Spending working time on what matters and not wasting it.',
      'Delayed gratification': 'Putting in effort now for a larger reward later.',
      'Goal orientation': 'Acting with clear goals in mind and prioritising to reach them.',
      Accountability: 'Owning your results and answering for them, good or bad.',
    },
    'Building and delivering with computers': {
      Automation: 'Automating repeated work so people can spend their time on things that need judgement.',
    },
    'Working alone and remotely': {
      'Self-reliance': 'Being able to rely on yourself and get on without constant support.',
      'Self-management': 'Planning, pacing and checking your own work without supervision.',
      'Taking initiative': 'Acting without waiting to be told when something needs doing.',
      'Time management': 'Planning your time so the most important work gets done.',
      Dependability: 'Being someone others can count on when no one is watching.',
    },
    'Business and organisation': {
      Meritocracy: 'Rewarding people for what they contribute rather than who they are.',
      'Fair pay': 'Believing equal work deserves equal pay.',
      'Work-life balance': 'Keeping room in life for things beyond work.',
      'Organisational commitment': 'Feeling bound to and invested in the organisation you work for.',
    },
    'Personal character': {
      'Ethical behaviour': 'Doing the right thing at work even when it costs you.',
    },
    'What I expect from others': {
      'Reliability from others': 'Expecting others to be available and to do what they have said they will do.',
    },
    'Wellbeing and a good life': {
      Positivity: 'Choosing to look for what is good and working constructively.',
      Leisure: 'Valuing rest and time away from work.',
    },
  },
}
