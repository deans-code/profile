import type { SourceContribution } from '../types'

/**
 * VIA Character Strengths, VIA Institute on Character (https://www.viacharacter.org/character-strengths).
 * The 24 strengths in six virtue categories (Wisdom, Courage, Humanity, Justice, Temperance, Transcendence).
 * The site allows personal, non-commercial use and reserves its rights, so only the strengths' names are used, with
 * descriptions written for this app; none of the site's wording is reproduced. The page shows no edition date
 * (footer 2026). Strengths are offered as the values they express.
 */
export const viaCharacterStrengths: SourceContribution = {
  source: 'via-character-strengths',
  checked: '2026-11-14',
  categories: {
    Wisdom: {
      Creativity: 'Coming up with new, useful ideas and original ways of doing things.',
      Curiosity: 'Seeking out new experiences and wanting to understand how and why things work.',
      'Good judgment': 'Weighing all sides of a question fairly and thinking things through before deciding.',
      'Love of learning': 'Enjoying acquiring new knowledge and skills and going deeper into what you already know.',
      Perspective: 'Seeing the bigger picture and offering wise, balanced advice that draws on experience.',
    },
    Courage: {
      Bravery: 'Acting on your convictions and facing challenges and fears rather than avoiding them.',
      Honesty: 'Being truthful with others and yourself, and taking responsibility for what you do.',
      Perseverance: 'Keeping going toward your goals despite obstacles and setbacks.',
      Zest: 'Approaching life with energy, enthusiasm and a sense of vitality.',
    },
    Humanity: {
      Kindness: 'Being helpful, caring and generous with others without expecting anything back.',
      Love: 'Valuing close, warm relationships in which care is given and received.',
      'Social intelligence': 'Understanding your own feelings and those of the people around you, and acting on that understanding.',
    },
    Justice: {
      Fairness: 'Treating everyone equally and giving each person a fair chance under the same rules.',
      Leadership: 'Guiding a group toward meaningful goals while keeping relationships good.',
      Teamwork: 'Contributing to a group and feeling responsible for helping it succeed.',
    },
    Temperance: {
      Forgiveness: 'Letting go of resentment toward people who have wronged you and giving them a fresh start.',
      Humility: 'Recognising your strengths without seeking the spotlight or credit.',
      Prudence: 'Acting carefully, avoiding needless risks and planning with the future in mind.',
      'Self-regulation': 'Managing your feelings and actions with discipline and self-control.',
    },
    Transcendence: {
      'Appreciation of beauty and excellence': 'Noticing and valuing beauty, skill and excellence in the world and in other people.',
      Gratitude: 'Being thankful for good things and expressing that thanks.',
      Hope: 'Being optimistic about the future and working to bring about the outcomes you want.',
      Humor: 'Approaching life playfully and finding lightness, including in hard moments.',
      Spirituality: 'Having a sense of purpose, meaning or connection to something larger than yourself.',
    },
  },
}
