import type { SourceContribution } from '../types'

/**
 * Thoughtworks Technology Radar, Volume 35, November 2026 (https://www.thoughtworks.com/radar).
 * No reuse terms stated, so linked and credited only. Platforms, tools and frameworks in the Adopt, Trial and Assess
 * rings that are not AI-specific and can be described accurately: VictoriaMetrics (Adopt), VictoriaLogs, Temporal,
 * Restate, Talos Linux, vCluster, mise, ast-grep, Chaos Mesh, Act and OpenFGA (Trial), and SolidJS (Assess).
 * AI-related blips are credited on the AI engineering tab and engineering techniques on the Engineering tab.
 * Blips whose purpose could not be confirmed from the page are left out.
 */
export const thoughtworksRadar35Technical: SourceContribution = {
  source: 'thoughtworks-radar-35',
  checked: '2026-11-14',
  categories: {
    'Monitoring and logging': {
      VictoriaMetrics: 'An open-source time-series database and monitoring system.',
      VictoriaLogs: 'An open-source database for storing and searching logs, from the VictoriaMetrics team.',
    },
    'Containers and infrastructure': {
      'Talos Linux': 'A minimal, immutable Linux operating system built specifically to run Kubernetes.',
      vCluster: 'A tool that creates virtual Kubernetes clusters inside a host cluster.',
      'Chaos Mesh': 'A chaos engineering platform that injects faults into Kubernetes workloads to test resilience.',
    },
    'Messaging and integration': {
      Temporal: 'A platform for writing workflows as code that keep running reliably through failures and restarts.',
      Restate: 'A platform for building resilient services and workflows with durable execution.',
    },
    'Build and delivery tools': {
      mise: 'A tool that manages versions of languages and developer tools, environment variables and project tasks.',
      Act: 'A tool that runs GitHub Actions workflows on your own machine for faster testing.',
      'ast-grep': 'A tool for searching, linting and rewriting code based on its syntax tree rather than plain text.',
    },
    'Identity and access': {
      OpenFGA: 'An open-source system for fine-grained authorization, modelling who can do what with which resource.',
    },
    'Web frameworks and technologies': {
      SolidJS: 'A JavaScript UI framework that updates only what changed, using fine-grained reactivity.',
    },
  },
}
