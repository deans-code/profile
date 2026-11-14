import type { SourceContribution } from '../types'

/**
 * Wikipedia, "Reinforcement learning from human feedback" (https://en.wikipedia.org/wiki/Reinforcement_learning_from_human_feedback, CC BY-SA 4.0, edited 26 October 2026).
 * Read: its pipeline, feedback forms and alternatives such as direct preference optimisation. Part of the page came through the fetch tool's summary rather than verbatim. Descriptions are written for this app; no article text is copied.
 */
export const rlhfWikipedia: SourceContribution = {
  source: 'rlhf-wikipedia',
  checked: '2026-11-14',
  categories: {
    'Approaches and ways of working': {
      'Human-in-the-loop review': '',
    },
    'Training and fine-tuning': {
      'Supervised fine-tuning': '',
      'Reinforcement learning from human feedback': '',
      'Direct preference optimisation': 'Tuning a model on preference pairs without a separate reward model.',
      'Reward modelling': '',
      'Constitutional AI': 'Guiding a model with written principles and AI feedback.',
    },
    'Building and operating AI applications': {
      'Data labelling': '',
    },
    'Evaluating and choosing models': {
      'Human evaluation of AI outputs': '',
    },
  },
}
