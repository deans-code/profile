import type { SourceContribution } from '../types'

/**
 * Rokeach Value Survey, read through the Wikipedia article "Rokeach Value Survey"
 * (https://en.wikipedia.org/wiki/Rokeach_Value_Survey, CC BY-SA 4.0, edited 13 August 2025), which cites Milton Rokeach,
 * The Nature of Human Values (1973). A long-standing framework, so its age is not a bar. All 36 values are used:
 * 18 terminal values (the goals people live for) and 18 instrumental values (the ways of behaving that reach them).
 * Values already offered by an earlier source (honesty, courage, love, forgiveness) only gain this source.
 * Descriptions are written for this app.
 */
export const rokeachValueSurvey: SourceContribution = {
  source: 'rokeach-value-survey',
  checked: '2026-11-14',
  categories: {
    'Terminal values: goals in life': {
      'True friendship': 'Close, supportive companionship with people you trust.',
      'Mature love': 'Deep emotional and spiritual intimacy with another person.',
      'Self-respect': 'Having a sense of your own worth and standing by it.',
      Happiness: 'Living a contented, joyful life.',
      'Inner harmony': 'Being at peace with yourself, free of inner conflict.',
      Equality: 'Equal opportunity and fair treatment for everyone.',
      Freedom: 'Independence and the ability to choose for yourself.',
      Pleasure: 'A life of enjoyment and leisure.',
      'Social recognition': 'Respect and admiration from other people.',
      Wisdom: 'A mature, thoughtful understanding of life.',
      Salvation: 'Spiritual redemption and eternal life.',
      'Family security': 'Taking care of the people closest to you.',
      'National security': 'Protection of your country from attack.',
      'A sense of accomplishment': 'Making a lasting contribution through your work.',
      'A world of beauty': 'Valuing the beauty of nature and the arts.',
      'A world at peace': 'Living in a world without war and conflict.',
      'A comfortable life': 'A prosperous, financially secure life.',
      'An exciting life': 'A stimulating, active life full of new experiences.',
    },
    'Instrumental values: ways of behaving': {
      Cheerfulness: 'Being lighthearted and joyful.',
      Ambition: 'Working hard and aspiring to achieve more.',
      Cleanliness: 'Being neat and tidy.',
      'Self-control': 'Restraining and disciplining your impulses.',
      Capability: 'Being competent and effective.',
      Courage: 'Standing up for your beliefs and facing difficulty.',
      Politeness: 'Being courteous and well mannered.',
      Imagination: 'Being daring and creative.',
      Independence: 'Being self-reliant and self-sufficient.',
      Intellect: 'Being intelligent and reflective.',
      'Broad-mindedness': 'Being open-minded and accepting of different views.',
      Logic: 'Being consistent and rational.',
      Obedience: 'Being dutiful and respectful of authority and rules.',
      Helpfulness: 'Working for the welfare of others.',
      Responsibility: 'Being dependable and reliable.',
      Honesty: '',
      Love: '',
      Forgiveness: '',
    },
  },
}
