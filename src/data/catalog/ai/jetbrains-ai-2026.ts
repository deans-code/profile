import type { SourceContribution } from '../types'

/**
 * The State of Developer Ecosystem 2026, Artificial intelligence (https://devecosystem.jetbrains.com/artificial-intelligence).
 * Its charts of AI tools did not render, so only what the page text states is credited: more than half of employed
 * developers use AI agents in over 60% of their work tasks, AI integration into products reached 36%, and agent
 * guideline files (AGENTS.md, CLAUDE.md, .cursorrules) are the most common practice.
 */
export const jetbrainsAi2026: SourceContribution = {
  source: 'jetbrains-ai-2026',
  checked: '2026-11-14',
  categories: {
    'Approaches and ways of working': {
      'Agentic development': 'Using AI agents that plan and carry out multi-step coding tasks, with a developer directing and reviewing the work.',
      'Building AI-powered features': 'Adding AI capabilities, such as chat, search or summarisation, to the products and services you build.',
    },
    'Agents and extensibility': {
      'Agent guideline files': 'Files such as AGENTS.md or CLAUDE.md that give a coding agent standing instructions about your project’s conventions, commands and constraints.',
    },
  },
}
