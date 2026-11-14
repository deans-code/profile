import type { SourceContribution } from '../types'

/**
 * DORA capabilities catalog, State of AI-assisted Software Development 2025 (https://dora.dev/capabilities/), CC BY 4.0.
 * Capabilities the catalog tags as AI: AI-accessible internal data, clear and communicated AI stance, healthy data
 * ecosystems, and platform engineering. The report's key finding is that AI amplifies existing organisational strengths
 * and weaknesses, with the greatest returns from the underlying sociotechnical system.
 * Only the dora.dev pages were read, not the full report.
 */
export const dora2025Ai: SourceContribution = {
  source: 'dora-2025',
  checked: '2026-11-14',
  categories: {
    'AI governance and alignment': {
      'Clear and communicated AI stance': 'Setting out, and sharing with everyone, how an organisation expects AI tools to be used and what is off limits.',
      'AI-accessible internal data': 'Making internal documents, code and data available to AI tools safely, so their answers fit your organisation.',
      'Healthy data ecosystems': 'Keeping data well organised, trustworthy and governed so it can support AI as well as people.',
    },
  },
}
