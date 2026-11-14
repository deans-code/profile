import type { SourceContribution } from '../types'

/**
 * The Twelve-Factor App, Adam Wiggins (https://12factor.net/), last updated 2017.
 * Read: the twelve factors. No licence is stated on the page, so only the names of the practices are used, with descriptions written for this app. A standing methodology still in wide use.
 */
export const twelveFactorApp: SourceContribution = {
  source: 'twelve-factor-app',
  checked: '2026-11-14',
  categories: {
    'Delivery and process': {
      'Version control': '',
    },
    'Cloud-native and platform practices': {
      'One codebase, many deploys': 'Tracking one codebase in version control and deploying it to many environments.',
      'Declared dependencies': 'Declaring and isolating every dependency explicitly.',
      'Configuration in the environment': 'Keeping configuration out of the code and in the environment.',
      'Attached backing services': 'Treating databases and queues as replaceable resources reached through configuration.',
      'Separate build, release and run stages': 'Keeping building, releasing and running strictly apart.',
      'Stateless processes': 'Running the app as processes that keep no state between requests.',
      'Port binding': 'Making the app self-contained and exposing it through a port.',
      'Scaling out through processes': 'Scaling by running more processes rather than larger ones.',
      Disposability: 'Starting fast and shutting down gracefully, so instances can come and go.',
      'Dev and prod parity': 'Keeping development, staging and production as similar as possible.',
      'Logs as event streams': 'Writing logs as a stream of events for the platform to collect.',
      'Admin tasks as one-off processes': 'Running management tasks as one-off processes in the same environment.',
    },
  },
}
