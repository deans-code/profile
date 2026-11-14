import type { SourceContribution } from '../types'

/**
 * Thoughtworks Technology Radar, Volume 35, November 2026 (https://www.thoughtworks.com/radar).
 * No reuse terms are stated, so it is linked and credited only. Engineering techniques and standards in the Adopt,
 * Trial and Assess rings that can be described accurately from their names: mutation testing, path-to-production
 * mapping, post-quantum cryptography and threat modeling (Adopt), Open Data Contract Standard (Adopt), and TLA+ and
 * Quint (Assess). Caution-ring items are practices to avoid and are not credited. Tools and platforms
 * (for example Temporal, mise, VictoriaMetrics) belong on the Technical development tab.
 */
export const thoughtworksRadar35Engineering: SourceContribution = {
  source: 'thoughtworks-radar-35',
  checked: '2026-11-14',
  categories: {
    'Architecture and design': {
      'Open Data Contract Standard': 'An open standard for describing a dataset’s structure, meaning and quality expectations as an agreement between data producers and consumers.',
    },
    'Delivery and process': {
      'Path-to-production mapping': 'Mapping every step a change takes from a developer’s machine to production, to find delays and risks.',
    },
    Testing: {
      'Mutation testing': 'Making small deliberate changes to code to check that the tests fail, which shows how good the tests really are.',
    },
    'Software quality and maintenance': {
      'Formal specification with TLA+ and Quint': 'Describing a system’s behaviour precisely, in languages such as TLA+ and Quint, so its design can be checked for flaws.',
    },
    Security: {
      'Threat modeling': 'Identifying what could go wrong in a system, who might attack it and what to do about it, early in design.',
      'Post-quantum cryptography': 'Cryptography designed to stay secure against attacks by future quantum computers.',
    },
  },
}
