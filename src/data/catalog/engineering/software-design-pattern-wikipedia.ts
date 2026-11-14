import type { SourceContribution } from '../types'

/**
 * Wikipedia, "Software design pattern" (https://en.wikipedia.org/wiki/Software_design_pattern, CC BY-SA 4.0, edited 12 September 2026).
 * Read: the creational, structural, behavioural, concurrency and architectural pattern lists. Only the widely used patterns are offered. Part of some Wikipedia pages came through the fetch tool's summary rather than verbatim. Descriptions are written for this app; no article text is copied.
 */
export const softwareDesignPatternWikipedia: SourceContribution = {
  source: 'software-design-pattern-wikipedia',
  checked: '2026-11-14',
  categories: {
    'Architecture and design': {
      CQRS: 'Separating the model for changing data from the model for reading it.',
      'Circuit breaker pattern': 'Stopping calls to a failing service so the failure does not spread.',
    },
    'Design principles and patterns': {
      'Composition over inheritance': 'Building behaviour by combining objects rather than inheriting.',
      'Dependency injection': 'Passing a component its dependencies instead of having it create them.',
      'Factory patterns': 'Creating objects through factories so callers do not depend on concrete types.',
      'Builder pattern': 'Constructing complex objects step by step.',
      'Adapter pattern': 'Making one interface fit another that expects something different.',
      'Decorator pattern': 'Adding behaviour to an object by wrapping it.',
      'Facade pattern': 'Offering a simple interface to a complex subsystem.',
      'Observer pattern': 'Letting objects subscribe to and be notified of changes elsewhere.',
      'Strategy pattern': 'Swapping interchangeable algorithms behind one interface.',
      'Command pattern': 'Representing an action as an object that can be stored, queued or undone.',
      'Model-view-controller': 'Separating data, presentation and input handling in user interfaces.',
    },
  },
}
