import type { SourceContribution } from '../types'

/**
 * The 2026 AI Index Report, Stanford HAI (https://hai.stanford.edu/ai-index/2026-ai-index-report).
 * Only the highlights page was read, not the full report or its chapters, and the page gives no reuse terms,
 * so it is linked and credited only. It names few technologies; it is credited for what its takeaways state:
 * model benchmarks and rankings (SWE-bench Verified, OSWorld, Arena scores), agents operating computers
 * (OSWorld success rising from about 12% to about 66%), and responsible AI lagging behind capability.
 */
export const stanfordAiIndex2026: SourceContribution = {
  source: 'stanford-ai-index-2026',
  checked: '2026-11-14',
  categories: {
    'AI coding tools and agents': {
      'Computer-use agents': 'AI agents that operate a computer by looking at the screen and using the mouse and keyboard, as tested by benchmarks such as OSWorld.',
    },
    'Evaluating and choosing models': {
      'Comparing models with benchmarks and rankings': '',
    },
    'AI governance and alignment': {
      'Responsible AI practices': 'Assessing and reducing the risks of AI systems, such as bias, misuse, privacy harms and unreliable output, and documenting what was done.',
    },
  },
}
