import type { SourceContribution } from '../types'

/**
 * Manifesto for Agile Software Development and Principles behind the Agile Manifesto, Beck, Beedle, van Bennekum, Cockburn, Cunningham, Fowler, Grenning, Highsmith, Hunt, Jeffries, Kern, Marick, Martin, Mellor, Schwaber, Sutherland and Thomas (https://agilemanifesto.org/ and https://agilemanifesto.org/principles.html, 2001).
 * Read in full: the four values and the twelve principles. The authors allow free copying only of the whole manifesto, so only the ideas are named here, with descriptions written for this app. A standing statement of values for software delivery, still in wide use, so its age is not a bar.
 */
export const agileManifestoValues: SourceContribution = {
  source: 'agile-manifesto-2001',
  checked: '2026-11-14',
  categories: {
    'Doing good work': {
      Excellence: 'Aiming for work that is genuinely good rather than merely acceptable.',
    },
    'Building and delivering with computers': {
      Simplicity: 'Choosing the simplest thing that works and avoiding work that is not needed.',
      'Working software': 'Judging progress by software that actually works rather than by documents about it.',
      'Sustainable pace': 'Working at a speed that can be kept up indefinitely without burning out.',
      'Technical excellence': 'Paying continuous attention to good design and sound engineering.',
      'Early and frequent delivery': 'Releasing valuable work in small steps, soon and often.',
      'Maintainable work': 'Leaving code and systems in a state others can understand and change.',
    },
    'Working in a team': {
      Teamwork: '',
      Trust: 'Relying on teammates to do what they say and giving them room to do it.',
      'Self-organisation': 'Letting the team decide how to organise itself and do its work.',
      Empowerment: 'Giving motivated people the support and trust to make their own decisions.',
    },
    'Working with others': {
      'Customer collaboration': 'Working with customers as partners rather than negotiating at arm’s length.',
      'Customer satisfaction': 'Aiming for the people you serve to be genuinely well served by early, valuable results.',
      'Direct conversation': 'Talking face to face or live, which conveys information faster and more truthfully than documents.',
    },
    'Adopting new ways of working': {
      'Responding to change': 'Valuing the ability to adjust a plan when what is learned or needed changes.',
      'Regular reflection': 'Stopping at regular intervals to ask how to work better, and acting on the answer.',
      'Continuous improvement': 'Making small, steady improvements to how you work, over and over.',
    },
    'What I expect from others': {
      'Trust from others': 'Expecting colleagues and leaders to trust you to do your job once you have what you need.',
      'Support to do my job': 'Expecting the tools, environment and help you need to do the work.',
    },
  },
}
