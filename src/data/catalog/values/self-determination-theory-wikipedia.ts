import type { SourceContribution } from '../types'

/**
 * Wikipedia, "Self-determination theory" (https://en.wikipedia.org/wiki/Self-determination_theory, CC BY-SA 4.0, edited 7 November 2026), which summarises Deci and Ryan's theory.
 * Read: the basic needs (autonomy, competence, relatedness), intrinsic and extrinsic goals and motivation. Much of the middle of the page came through the fetch tool's summary. Descriptions are written for this app.
 */
export const selfDeterminationValues: SourceContribution = {
  source: 'self-determination-theory-wikipedia',
  checked: '2026-11-14',
  categories: {
    'Doing good work': {
      Perseverance: '',
    },
    'Working in a team': {
      Cooperation: '',
    },
    'Working with others': {
      Generativity: 'Helping the next generation or less experienced people grow.',
    },
    'Working alone and remotely': {
      Autonomy: '',
      'Intrinsic motivation': 'Doing work because it interests or matters to you, not for outside reward.',
    },
    'Learning and growth': {
      Curiosity: '',
      'Personal development': 'Growing as a person and building your own skills for their own sake.',
      Mastery: 'Getting deeply good at something through sustained practice.',
      'Self-actualisation': 'Becoming the fullest version of what you are able to be.',
    },
    'Society and the world': {
      'Environmental concern': 'Caring for nature and acting to protect it.',
    },
    'What I expect from others': {
      'Freedom to decide': 'Expecting room to make choices about your own work.',
    },
    'Wellbeing and a good life': {
      'Self-fulfilment': '',
      'Meaning and purpose': 'Feeling that your life and work matter and point somewhere.',
      'Life satisfaction': 'Being content with life as a whole.',
    },
  },
}
