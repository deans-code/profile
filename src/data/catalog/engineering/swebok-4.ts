import type { SourceContribution } from '../types'

/**
 * SWEBOK Guide, version 4.0 (2024), IEEE Computer Society (https://www.computer.org/education/bodies-of-knowledge/software-engineering).
 * Read: its table of 18 knowledge areas. The guide is copyright protected and may not be copied or adapted, so only the names of knowledge areas are used, with descriptions written for this app. A standing body of knowledge, so its 2024 edition is current.
 */
export const swebok4: SourceContribution = {
  source: 'swebok-4',
  checked: '2026-11-14',
  categories: {
    'Delivery and process': {
      'Configuration management': 'Controlling versions and changes to code, configuration and environments.',
    },
    'Software knowledge areas': {
      'Requirements engineering': 'Discovering, analysing and managing what the software must do.',
      'Software construction': 'Creating working software through coding, verification and unit testing.',
      'Software maintenance': 'Keeping software working and evolving after it is released.',
      'Software engineering operations': 'Running and supporting software in production.',
      'Software engineering management': 'Planning, measuring and controlling software projects.',
      'Software process improvement': 'Improving how software is developed.',
      'Software models and methods': 'Using models and methods to describe and build software.',
      'Software engineering economics': 'Making sound economic decisions about software work.',
      'Professional practice': 'Working to the ethical and professional standards of software engineering.',
    },
  },
}
