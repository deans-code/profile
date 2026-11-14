import type { SourceContribution } from '../types'

/**
 * Wikipedia, "Soft skills" (https://en.wikipedia.org/wiki/Soft_skills, CC BY-SA 4.0, edited 23 September 2026).
 * Read: its lead list of sixteen skills and the concept, metacognition and employment sections. Part of some Wikipedia pages came through the fetch tool's summary rather than verbatim. Descriptions are written for this app; no article text is copied.
 */
export const softSkillsWikipedia: SourceContribution = {
  source: 'soft-skills-wikipedia',
  checked: '2026-11-14',
  categories: {
    Communication: {
      Communication: '',
      'Public speaking': 'Speaking to a group clearly and with confidence.',
      'Professional writing': 'Writing emails, reports and documents that are clear and suit the reader.',
    },
    'Teamwork and collaboration': {
      'Teamwork and collaboration': '',
    },
    'Leadership, coaching and facilitation': {
      Leadership: '',
      'Strategic vision': 'Seeing where things are heading and setting a direction for others.',
    },
    'Emotional and cultural intelligence': {
      'Emotional intelligence': 'Perceiving, understanding and managing emotions, your own and other people’s.',
      Empathy: 'Understanding how others feel and see things.',
      'Intercultural fluency': 'Working comfortably across cultural differences in language, habits and expectations.',
    },
    'Culture, inclusion and safety': {
      'Open-mindedness': 'Giving unfamiliar ideas and people a fair hearing.',
    },
    'Thinking and problem solving': {
      'Critical thinking': '',
      'Problem-solving': '',
      Creativity: '',
    },
    'Personal effectiveness': {
      Adaptability: '',
      'Time management': '',
      'Work ethic': 'Taking pride in working hard, reliably and well.',
      'Career management': 'Steering your own career and development over time.',
      'Professional attitude': 'Bringing a responsible, positive and respectful attitude to work.',
      Metacognition: 'Being aware of how you think and learn, and using that to improve.',
      'Lifelong learning': 'Continuing to learn throughout your career and life.',
    },
  },
}
