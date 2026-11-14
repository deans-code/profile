import type { SourceContribution } from '../types'

/**
 * Wikipedia, "List of software development philosophies" (https://en.wikipedia.org/wiki/List_of_software_development_philosophies, CC BY-SA 4.0, edited 10 September 2026).
 * Read: its large-scale styles, rules and principles and comprehensive methodologies. Only practices and principles that apply to everyday engineering work are used. Part of some Wikipedia pages came through the fetch tool's summary rather than verbatim. Descriptions are written for this app; no article text is copied.
 */
export const softwareDevelopmentPhilosophiesWikipedia: SourceContribution = {
  source: 'software-development-philosophies-wikipedia',
  checked: '2026-11-14',
  categories: {
    'Architecture and design': {
      'Domain-driven design': 'Shaping software around a model of the business domain, agreed with the people who know it.',
    },
    'Design principles and patterns': {
      'Separation of concerns': 'Keeping different responsibilities in different parts of the system.',
      'Loose coupling': 'Minimising how much one part depends on the internals of another.',
      DRY: 'Don’t repeat yourself: keep each piece of knowledge in one place.',
      KISS: 'Keep it simple: prefer the simplest design that works.',
      YAGNI: 'You aren’t going to need it: don’t build for needs you only imagine.',
      'Law of Demeter': 'A unit should talk only to its close neighbours.',
      'Fail fast': 'Detecting and reporting problems as early as possible.',
      'Principle of least astonishment': 'Making things behave the way users and developers expect.',
      'Convention over configuration': 'Providing sensible defaults so that only the unusual needs configuring.',
      'Unix philosophy': 'Small programs that do one thing well and work together.',
      'Conway’s law': 'Recognising that systems mirror the communication structure of the organisation that builds them.',
    },
    'Delivery and process': {
      'Continuous integration': '',
      'Continuous delivery': '',
      'Code review': '',
      'Configuration management': '',
      'Test-driven development': 'Writing a failing test first, then the code to pass it.',
      'Behaviour-driven development': 'Describing behaviour in shared, executable examples that the whole team understands.',
      'Specification by example': 'Using concrete examples as the specification and the test.',
      'Pair programming': 'Two people working on the same code at once, sharing ideas and checking each other.',
      'Mob programming': 'The whole team working on the same thing at the same time.',
      Kanban: 'Visualising work and limiting how much is in progress at once.',
      'Release early, release often': 'Shipping small changes frequently to get feedback sooner.',
      'Infrastructure as code': 'Defining and changing infrastructure through versioned code.',
      'Build automation': 'Building the software from source with one repeatable command.',
      'Release automation': 'Automating the steps of releasing so releases are routine.',
      'Iterative and incremental development': 'Building a product in repeated cycles, adding to it each time.',
      'Collective code ownership': 'Letting anyone on the team change any part of the code.',
      'Readme-driven development': 'Writing the documentation before the code to clarify what is being built.',
    },
    'Software quality and maintenance': {
      Refactoring: 'Restructuring code without changing what it does, to make it easier to work with.',
      'Software quality assurance': 'Planning and checking activities that make sure quality is built in.',
    },
    Security: {
      'Secure design': '',
    },
  },
}
