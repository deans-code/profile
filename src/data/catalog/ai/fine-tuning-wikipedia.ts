import type { SourceContribution } from '../types'

/**
 * Wikipedia, "Fine-tuning (deep learning)" (https://en.wikipedia.org/wiki/Fine-tuning_(deep_learning), CC BY-SA 4.0, edited 9 November 2026).
 * Read: its techniques: full and partial fine-tuning, adapters, LoRA and combining with human feedback. Part of the page came through the fetch tool's summary rather than verbatim. Descriptions are written for this app; no article text is copied.
 */
export const fineTuningWikipedia: SourceContribution = {
  source: 'fine-tuning-wikipedia',
  checked: '2026-11-14',
  categories: {
    'Approaches and ways of working': {
      'Small language models': '',
    },
    'Training and fine-tuning': {
      'Fine-tuning': 'Further training a pretrained model on your own data for a specific task.',
      'Parameter-efficient fine-tuning': 'Adapting a model by training only a small number of added or changed parameters.',
      LoRA: 'Fine-tuning by training small low-rank updates instead of the full weights.',
      'Supervised fine-tuning': 'Training on examples of good inputs and outputs.',
      'Reinforcement learning from human feedback': '',
    },
  },
}
