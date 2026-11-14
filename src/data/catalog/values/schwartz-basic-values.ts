import type { SourceContribution } from '../types'

/**
 * Schwartz's theory of basic human values, read through the Wikipedia article "Theory of basic human values"
 * (https://en.wikipedia.org/wiki/Theory_of_basic_human_values, CC BY-SA 4.0, edited 16 September 2026), which cites
 * Schwartz (1992), Schwartz et al. (2012, Journal of Personality and Social Psychology 103(4)) and Schwartz (2012, Online
 * Readings in Psychology and Culture 2(1)). The paper itself could not be read (its PDF refused automated access),
 * so the article's ten values are used, in its four higher-order groups: openness to change (self-direction,
 * stimulation), self-enhancement (hedonism, achievement, power), conservation (security, conformity, tradition) and
 * self-transcendence (benevolence, universalism). The refined nineteen values are not listed on the article and are not used.
 * Descriptions are written for this app.
 */
export const schwartzBasicValues: SourceContribution = {
  source: 'schwartz-basic-values',
  checked: '2026-11-14',
  categories: {
    'Doing good work': {
      Achievement: 'Pursuing personal success by showing competence by the standards of those around you.',
    },
    'Working with others': {
      Benevolence: 'Looking after and improving the welfare of the people you are in regular contact with.',
    },
    'Working alone and remotely': {
      'Self-direction': 'Thinking and acting independently: choosing your own path, creating and exploring.',
    },
    'Adopting new ways of working': {
      'Openness to change': 'Being ready to try new ideas, approaches and ways of doing things.',
    },
    'Business and organisation': {
      Power: 'Valuing status, influence and control over people and resources.',
      Conformity: 'Restraining actions and impulses that might upset others or break social expectations.',
    },
    'Society and the world': {
      Universalism: 'Understanding, appreciating and protecting the welfare of all people and of nature.',
      Tradition: 'Respecting and keeping the customs and ideas your culture or religion provides.',
      Security: 'Valuing safety, harmony and stability in society, in relationships and in yourself.',
    },
    'Wellbeing and a good life': {
      Hedonism: 'Seeking pleasure and enjoyment for yourself.',
      Stimulation: 'Seeking excitement, novelty and challenge in life.',
    },
  },
}
