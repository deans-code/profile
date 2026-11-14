import type { SourceContribution } from '../types'

/**
 * O*NET OnLine, "Browse by Transferable Skills" and "Abilities" (https://www.onetonline.org/find/descriptor/browse/Skills/ and https://www.onetonline.org/find/descriptor/browse/Abilities/), US Department of Labor, Employment and Training Administration, CC BY 4.0, site updated 6 October 2026.
 * Read: the social, complex problem solving, systems and resource management skills and the idea generation, reasoning, verbal and attentiveness abilities. The Work Styles page returned 404 and is not used. Descriptions are written for this app.
 */
export const onet2026Interpersonal: SourceContribution = {
  source: 'onet-2026',
  checked: '2026-11-14',
  categories: {
    Communication: {
      'Influencing others': '',
      'Oral expression': 'Getting your ideas across clearly in speech.',
      'Written expression': 'Getting your ideas across clearly in writing.',
      'Understanding what you hear and read': 'Taking in spoken and written information accurately.',
    },
    'Teamwork and collaboration': {
      Coordination: 'Adjusting what you do in step with what other people are doing.',
    },
    'Leadership, coaching and facilitation': {
      Instructing: 'Teaching others how to do something.',
    },
    'Conflict and negotiation': {
      Negotiation: 'Working with others to reach agreement when interests differ.',
      Persuasion: 'Convincing others to change their minds or behaviour with reasons they accept.',
    },
    'Emotional and cultural intelligence': {
      'Social perceptiveness': 'Noticing how others react and understanding why.',
    },
    'Customers and stakeholders': {
      'Service orientation': 'Actively looking for ways to help people.',
    },
    'Thinking and problem solving': {
      'Complex problem solving': 'Identifying complex problems, reviewing related information and developing and testing solutions.',
      'Systems analysis': 'Working out how a system should work and how changes will affect outcomes.',
      'Systems evaluation': 'Choosing measures of how a system performs and the actions that would improve it.',
      'Deductive reasoning': 'Applying general rules to specific problems to reach sensible answers.',
      'Inductive reasoning': 'Combining pieces of information to form general rules or conclusions.',
      Originality: 'Coming up with unusual or clever ideas and solutions.',
      'Fluency of ideas': 'Producing many ideas about a topic.',
      'Problem sensitivity': 'Noticing that something is wrong or likely to go wrong.',
    },
    'Personal effectiveness': {
      'Time management': 'Using your time well, planning it and keeping to your priorities.',
      'Selective attention': 'Concentrating on the task in hand without being distracted.',
    },
  },
}
