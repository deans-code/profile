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
    'Doing good work': {
      'A sense of accomplishment': 'Making a lasting contribution through your work.',
      Capability: 'Being competent and effective.',
      Logic: 'Being consistent and rational.',
      Responsibility: 'Being dependable and reliable.',
    },
    'Working in a team': {
      Helpfulness: 'Working for the welfare of others.',
      Cheerfulness: 'Being lighthearted and joyful.',
    },
    'Working with others': {
      Forgiveness: '',
      Politeness: 'Being courteous and well mannered.',
      'Broad-mindedness': 'Being open-minded and accepting of different views.',
    },
    'Working alone and remotely': {
      Independence: 'Being self-reliant and self-sufficient.',
    },
    'Learning and growth': {
      Wisdom: 'A mature, thoughtful understanding of life.',
      Imagination: 'Being daring and creative.',
      Intellect: 'Being intelligent and reflective.',
    },
    'Business and organisation': {
      'Social recognition': 'Respect and admiration from other people.',
      Ambition: 'Working hard and aspiring to achieve more.',
      Obedience: 'Being dutiful and respectful of authority and rules.',
    },
    'Personal character': {
      Honesty: '',
      Courage: 'Standing up for your beliefs and facing difficulty.',
      'Self-control': 'Restraining and disciplining your impulses.',
      'Self-respect': 'Having a sense of your own worth and standing by it.',
      Cleanliness: 'Being neat and tidy.',
    },
    'Society and the world': {
      Equality: 'Equal opportunity and fair treatment for everyone.',
      Freedom: 'Independence and the ability to choose for yourself.',
      'National security': 'Protection of your country from attack.',
      'A world of beauty': 'Valuing the beauty of nature and the arts.',
      'A world at peace': 'Living in a world without war and conflict.',
    },
    'Wellbeing and a good life': {
      Love: '',
      'True friendship': 'Close, supportive companionship with people you trust.',
      'Mature love': 'Deep emotional and spiritual intimacy with another person.',
      Happiness: 'Living a contented, joyful life.',
      'Inner harmony': 'Being at peace with yourself, free of inner conflict.',
      Pleasure: 'A life of enjoyment and leisure.',
      'Family security': 'Taking care of the people closest to you.',
      'A comfortable life': 'A prosperous, financially secure life.',
      'An exciting life': 'A stimulating, active life full of new experiences.',
      Salvation: 'Spiritual redemption and eternal life.',
    },
  },
}
