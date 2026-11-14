import type { SourceContribution } from '../types'

/**
 * DORA capabilities catalog, from the State of AI-assisted Software Development 2025 research (https://dora.dev/capabilities/).
 * dora.dev content is licensed by Google LLC under CC BY 4.0. Only the catalog and key finding on dora.dev were read,
 * not the full report PDF. The catalog's technical and process capabilities are credited here. Its cultural and
 * people capabilities (generative organizational culture, learning culture, transformational leadership, job
 * satisfaction, well-being, team experimentation, empowering teams to choose tools, customer feedback, user-centric
 * focus) are for the Interpersonal tab, and its AI capabilities (AI-accessible internal data, clear and communicated AI
 * stance, healthy data ecosystems) are for the AI engineering tab.
 */
export const dora2025: SourceContribution = {
  source: 'dora-2025',
  checked: '2026-11-14',
  categories: {
    'Delivery and process': {
      'Continuous integration': 'Merging every developer’s changes into a shared branch frequently, with each merge built and tested automatically.',
      'Continuous delivery': 'Keeping software always in a releasable state so changes can be deployed quickly, safely and on demand.',
      'Deployment automation': 'Releasing software through automated, repeatable steps instead of manual procedures.',
      'Trunk-based development': 'Working in short-lived branches or directly on the main branch, so changes are integrated at least daily.',
      'Version control': 'Keeping code, configuration and other changes in a shared history that can be reviewed, compared and restored.',
      'Working in small batches': 'Delivering work in small, frequent increments so feedback comes sooner and risk stays low.',
      'Work in process limits': 'Capping how much work is in progress at once so work flows to completion instead of piling up.',
      'Streamlining change approval': 'Replacing slow, external approval gates with lightweight peer review and automated checks.',
      'Visibility of work in the value stream': 'Making the flow of work from idea to customer visible, so delays and bottlenecks can be found.',
      'Visual management': 'Using boards and dashboards to show the status of work and flow to everyone on the team.',
      'Platform engineering': 'Building internal platforms and self-service tools that make it easy for teams to build, deploy and run software.',
    },
    'Quality and testing': {
      'Test automation': 'Running tests automatically and reliably so developers get fast feedback on every change.',
      'Test data management': 'Providing realistic, safe and easily refreshed data for automated testing.',
      'Code maintainability': 'Writing code that is easy to understand, change and reuse over its lifetime.',
      'Documentation quality': 'Keeping documentation accurate, findable and useful to the people who rely on it.',
    },
    'Architecture and design': {
      'Loosely coupled teams': 'Structuring architecture and teams so each can change, test and release its work without needing others to coordinate.',
      'Flexible infrastructure': 'Using on-demand, scalable infrastructure such as the cloud, so capacity follows need.',
      'Database change management': 'Treating database changes like code, with automation, review and versioning, so they ship with the application.',
    },
    'Reliability and operations': {
      'Monitoring and observability': 'Collecting logs, metrics and traces so you can understand and troubleshoot how a system behaves in production.',
      'Monitoring systems to inform business decisions': 'Using data from running systems to guide product and business choices, not only operations.',
      'Proactive failure notification': 'Setting up alerts that warn of problems early, before users are affected.',
    },
    Security: {
      'Pervasive security': 'Building security into every stage of development and operations rather than adding it at the end.',
    },
  },
}
