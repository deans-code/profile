import type { SourceContribution } from '../types'

/**
 * Wikipedia, "Public speaking" (https://en.wikipedia.org/wiki/Public_speaking, CC BY-SA 4.0, edited 10 November 2026).
 * Read: speaking purposes, storytelling, adapting to an audience and leading meetings. Part of some Wikipedia pages came through the fetch tool's summary rather than verbatim. Descriptions are written for this app; no article text is copied.
 */
export const publicSpeakingWikipedia: SourceContribution = {
  source: 'public-speaking-wikipedia',
  checked: '2026-11-14',
  categories: {
    Communication: {
      Communication: '',
      'Public speaking': '',
      Storytelling: 'Using stories and examples to make a point easy to follow and remember.',
      'Tailoring a message to its audience': 'Adapting content, detail and tone to the people you are speaking to.',
    },
    'Leadership, coaching and facilitation': {
      'Running effective meetings': 'Planning an agenda, keeping time and getting everyone to take part.',
    },
  },
}
