import type { SourceContribution } from '../types'

/**
 * Strengthscope strengths, Strengthscope Limited, London (https://www.strengthscope.com/glossary).
 * The 24 strengths the glossary lists in four clusters (Emotional, Relational, Thinking, Execution). The site's terms
 * forbid copying or creating derivatives of its content without written permission, so only the strengths' names are
 * used, with descriptions written for this app; none of the site's wording is reproduced. The page shows no edition
 * date (footer 2006-2026). The four clusters are regrouped into this app's categories. Strengths are offered as the
 * values they express.
 */
export const strengthscopeStrengths: SourceContribution = {
  source: 'strengthscope-strengths',
  checked: '2026-11-16',
  categories: {
    'Doing good work': {
      Creativity: 'Coming up with new, useful ideas and original ways of doing things.',
      'Detail orientation': 'Paying close attention to the small things so the work is accurate and complete.',
      'Strategic mindedness': 'Looking ahead and shaping plans around long-term goals and the bigger picture.',
      Decisiveness: 'Making clear choices in good time, even when the information is incomplete.',
      Efficiency: 'Getting things done with little wasted time, effort or resource.',
      Initiative: 'Starting things and taking action without waiting to be asked.',
      'Results-focus': 'Keeping attention on the outcome and driving work through to delivery.',
    },
    'Working in a team': {
      Collaboration: 'Working alongside others and sharing the effort and credit to reach a common goal.',
      'Developing others': 'Helping other people grow by coaching, teaching and giving them chances to stretch.',
      Leading: 'Guiding and motivating a group towards a shared direction.',
    },
    'Working with others': {
      Compassion: 'Caring about other people\'s difficulties and wanting to ease them.',
      Empathy: 'Understanding how others feel and see things, and letting that shape what you do.',
      Persuasiveness: 'Putting your case in a way that brings others round to your view.',
      'Relationship building': 'Making and keeping good working relationships over time.',
    },
    'Learning and growth': {
      'Common sense': 'Applying practical, down-to-earth judgement to everyday problems.',
      'Critical thinking': 'Questioning assumptions and weighing evidence before reaching a conclusion.',
      Flexibility: 'Adjusting how you work to suit new people, tools and situations.',
      'Self-improvement': 'Reflecting on your own performance and working steadily to get better.',
    },
    'Personal character': {
      Courage: 'Standing up for your beliefs and facing difficulty.',
      'Emotional control': 'Keeping your feelings steady under pressure so they do not drive your actions.',
      Enthusiasm: 'Bringing energy and visible interest to what you do.',
      Optimism: 'Expecting good outcomes and looking for what can go well.',
      Resilience: 'Recovering well from setbacks and the strain of change.',
      'Self-confidence': 'Trusting your own abilities and judgement.',
    },
  },
}
