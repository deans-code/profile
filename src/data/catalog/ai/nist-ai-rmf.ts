import type { SourceContribution } from '../types'

/**
 * NIST Artificial Intelligence Risk Management Framework 1.0, January 2023 (https://www.nist.gov/itl/ai-risk-management-framework).
 * Read: the framework overview page. It names the four core functions (govern, map, measure, manage) only in an image caption and lists no subcategories, so only those four names are used. The framework is under revision and the Playbook was not read. Descriptions are written for this app.
 */
export const nistAiRmf: SourceContribution = {
  source: 'nist-ai-rmf',
  checked: '2026-11-14',
  categories: {
    'AI governance and alignment': {
      'Responsible AI practices': '',
      'Govern, map, measure and manage AI risk': 'Managing AI risk through governance, context mapping, measurement and mitigation.',
      'Trustworthy AI': 'Building and using AI that is reliable, safe, fair and accountable.',
    },
  },
}
