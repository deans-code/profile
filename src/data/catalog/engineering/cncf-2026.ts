import type { SourceContribution } from '../types'

/**
 * State of Cloud Native Development, Q1 2026 (SlashData, sponsored by the Continuous Delivery Foundation, in partnership
 * with the CNCF), licensed CC BY-ND 4.0, so linked and credited only. Practices named in the report, with the
 * share of backend developers using them: microservices 39%, event-driven architecture 21%, multicluster management 13%,
 * feature flagging 13%, immutable infrastructure 11%, chaos engineering 11%; hybrid cloud deployment by 34% of all
 * developers; and 88% of backend developers using some form of DevOps standardisation, which supports platform
 * engineering. The technologies it names are credited on the Technical development tab.
 */
export const cncf2026Engineering: SourceContribution = {
  source: 'cncf-2026',
  checked: '2026-11-14',
  categories: {
    'Architecture and design': {
      'Microservices architecture': 'Building an application as a set of small, independently deployable services.',
      'Event-driven architecture': 'Designing systems whose components communicate by producing and reacting to events.',
    },
    'Delivery and process': {
      'Feature flagging': 'Turning features on or off at run time, so code can be deployed before it is released and rolled out gradually.',
    },
    'Cloud-native and platform practices': {
      'Platform engineering': '',
      'Multicluster management': 'Running and governing applications across several Kubernetes clusters, for scale, resilience or data location.',
      'Immutable infrastructure': 'Replacing servers and environments with new, identical ones instead of changing them in place.',
      'Hybrid cloud deployment': 'Running applications across a mix of public cloud and private or on-premises infrastructure.',
    },
    'Reliability and operations': {
      'Chaos engineering': 'Deliberately injecting failures into a system to find weaknesses before real incidents do.',
    },
  },
}
