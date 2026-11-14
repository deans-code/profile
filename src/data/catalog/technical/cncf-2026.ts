import type { SourceContribution } from '../types'

/**
 * State of Cloud Native Development, Q1 2026 (SlashData, sponsored by the Continuous Delivery Foundation,
 * in partnership with the CNCF). Read from the published PDF; licensed CC BY-ND 4.0, so it is linked and
 * credited only. Table of backend developers' use of infrastructure technologies (Q1 2026): API gateways 47%,
 * microservices 39%, Kubernetes 27%, frontend gateways 21%, observability tools 21%, event-driven architecture 21%,
 * streaming and messaging services 20%, remote procedure calls 17%, multicluster management 13%,
 * feature flagging 13%, service meshes 11%, immutable infrastructure 11%, chaos engineering 11%.
 *
 * The report names technologies and practices rather than products. Technologies are credited here; the practices
 * (microservices, event-driven architecture, multicluster management, feature flagging, immutable infrastructure,
 * chaos engineering, platform engineering, hybrid cloud) belong on the Engineering tab and are credited there.
 */
export const cncf2026: SourceContribution = {
  source: 'cncf-2026',
  checked: '2026-11-14',
  categories: {
    'Containers and infrastructure': {
      Kubernetes: '',
      'Service meshes': 'A layer that manages secure, observable communication between services, for example Istio or Linkerd.',
      'API gateways': 'A single entry point that routes, secures and monitors requests to back-end services.',
      'Serverless and cloud functions': 'Running code on demand in managed cloud services, without managing servers, and paying only for use.',
    },
    'Messaging and integration': {
      'Streaming and messaging services': 'Systems such as Kafka or RabbitMQ that move messages and event streams between services.',
      'Remote procedure calls': 'Calling functions on another service over the network as if they were local, for example with gRPC.',
    },
    'Monitoring and logging': {
      'Observability tools': 'Tools that collect logs, metrics and traces so you can see what a running system is doing.',
    },
  },
}
