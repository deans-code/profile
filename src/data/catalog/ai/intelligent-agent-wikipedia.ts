import type { SourceContribution } from '../types'

/**
 * Wikipedia, "Intelligent agent" (https://en.wikipedia.org/wiki/Intelligent_agent, CC BY-SA 4.0, edited 7 November 2026).
 * Read: agent classes, the belief-desire-intention architecture and agentic AI. Part of the page came through the fetch tool's summary rather than verbatim. Descriptions are written for this app; no article text is copied.
 */
export const intelligentAgentWikipedia: SourceContribution = {
  source: 'intelligent-agent-wikipedia',
  checked: '2026-11-14',
  categories: {
    'Approaches and ways of working': {
      'Agentic development': '',
      'Agentic workflows': '',
      'Human-in-the-loop review': 'Keeping a person in the loop to check and approve what AI does.',
    },
    'Agents and extensibility': {
      'Subagents for better context management': '',
      'Agent planning': 'Having an agent break a goal into steps and decide what to do next.',
      'Agent memory': 'Giving an agent a way to remember earlier steps and learn from them.',
      'Goal-based and utility-based agents': 'Designing agents that choose actions by their goals or expected value.',
      'Multi-agent systems': 'Coordinating several agents that work together or alongside each other.',
      'Orchestrating agents': 'Controlling the order, roles and hand-offs between several agents.',
    },
  },
}
