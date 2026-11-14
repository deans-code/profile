import type { SourceContribution } from '../types'

/**
 * Octoverse 2026, GitHub (published 28 October 2026). No reuse terms stated, so linked and credited only.
 * AI items it reports: the fastest-growing and most-engaged projects among developers (claude-code, codex, opencode,
 * copilot-cli, gemini-cli, litellm, kilocode, hermes-agent, llama.cpp, vLLM, SGLang, PyTorch, awesome-mcp-servers),
 * GitHub Copilot use (55% of monthly active users use agentic features), use of more than one model (61% of users who
 * choose their own model) and automatic model selection (63% of paying users), and repositories with an agent
 * configuration file logging eight times as many commits as those without.
 */
export const octoverse2026Ai: SourceContribution = {
  source: 'octoverse-2026',
  checked: '2026-11-14',
  categories: {
    'Agents and extensibility': {
      'Agent guideline files': '',
      'Model Context Protocol servers': 'Services that expose tools and data to AI agents through the Model Context Protocol.',
    },
    'AI coding tools and agents': {
      'Claude Code': '',
      'OpenAI Codex': '',
      'Kilo Code': '',
      'Hermes Agent': '',
      OpenCode: '',
      'GitHub Copilot': 'GitHub’s AI coding assistant, with code completion, chat and agent features in editors and on GitHub.',
      'GitHub Copilot CLI': 'GitHub’s coding agent for the terminal.',
      'Gemini CLI': 'Google’s open-source coding agent for the terminal, powered by Gemini models.',
    },
    'Inference platforms, gateways and local runtimes': {
      LiteLLM: '',
      vLLM: 'A fast, memory-efficient open-source engine for serving large language models.',
      SGLang: 'An open-source framework for serving large language models and structured generation.',
      'llama.cpp': 'An open-source C and C++ engine for running language models efficiently on ordinary hardware.',
    },
    'Building and operating AI applications': {
      PyTorch: 'A widely used open-source framework for building and training machine learning models.',
    },
    'Evaluating and choosing models': {
      'Model routing and selection': 'Choosing, or automatically routing to, the right model for each task by quality, speed and cost.',
    },
  },
}
