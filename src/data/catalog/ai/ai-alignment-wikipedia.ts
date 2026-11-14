import type { SourceContribution } from '../types'

/**
 * Wikipedia, "AI alignment" (https://en.wikipedia.org/wiki/AI_alignment, CC BY-SA 4.0, edit date not shown on the text read; read through about 40,000 characters verbatim, the middle summarised and the last third not read).
 * Read: its research areas and techniques. Part of the page came through the fetch tool's summary rather than verbatim. Descriptions are written for this app; no article text is copied.
 */
export const aiAlignmentWikipedia: SourceContribution = {
  source: 'ai-alignment-wikipedia',
  checked: '2026-11-14',
  categories: {
    'Training and fine-tuning': {
      'Reinforcement learning from human feedback': 'Tuning a model using human rankings of its outputs.',
      'Reward modelling': 'Training a model to score outputs the way people would.',
    },
    'AI security': {
      'AI red teaming': '',
    },
    'AI governance and alignment': {
      'Scalable oversight': 'Finding ways to supervise AI systems that are hard for people to check directly.',
      Interpretability: 'Understanding how and why a model produces its outputs.',
      'Specification gaming awareness': 'Noticing when a model meets a goal in unintended ways.',
      'Honest and calibrated AI': 'Aiming for AI that tells the truth and expresses appropriate uncertainty.',
      'Publishing model specifications': 'Stating openly how a model is meant to behave.',
      'Safety evaluations and incident reporting': 'Testing for dangerous behaviour and reporting problems that occur.',
    },
  },
}
