import type { SourceContribution } from '../types'

/**
 * Model Context Protocol specification, schema 2026-07-28 (https://modelcontextprotocol.io/specification/latest).
 * Read: its roles, server features (resources, prompts, tools), elicitation, utilities, extensions and security principles. No licence or date is shown on the page; only the names of its concepts are used, with descriptions written for this app.
 */
export const mcpSpecification: SourceContribution = {
  source: 'mcp-specification',
  checked: '2026-11-14',
  categories: {
    'Agents and extensibility': {
      'Model Context Protocol servers': '',
      'MCP tools': 'Exposing functions that a model can call through the Model Context Protocol.',
      'MCP resources': 'Supplying files, data and context to a model through the Model Context Protocol.',
      'MCP prompts': 'Offering reusable prompt templates and workflows through the Model Context Protocol.',
      'MCP elicitation': 'Letting a server ask the user for more information during a task.',
      'Tool safety and user consent': 'Treating tool descriptions as untrusted and getting user approval before actions.',
    },
  },
}
