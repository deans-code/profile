import type { SourceContribution } from '../types'

/**
 * Thoughtworks Technology Radar, Volume 35, November 2026 (https://www.thoughtworks.com/radar).
 * The page gives no reuse terms, so it is linked and credited only. Credited here: AI-related blips in the Adopt,
 * Trial and Assess rings that can be described accurately from their names and ring. Blips in the Caution ring are
 * not credited (they are practices to avoid). General engineering blips (for example threat modeling and mutation
 * testing) are for the Engineering tab, and blips whose purpose could not be confirmed from the page are left out.
 */
export const thoughtworksRadar35: SourceContribution = {
  source: 'thoughtworks-radar-35',
  checked: '2026-11-14',
  categories: {
    'Approaches and ways of working': {
      'Open-weight models': 'Using language models whose trained weights are published, so you can run, adapt and inspect them yourself.',
      'Small language models': 'Using compact language models that are cheaper and faster than large ones and often good enough for focused tasks.',
      'Local coding models': 'Running coding models on your own hardware, for privacy, cost control or offline work.',
      'Risk-tiered human oversight': 'Matching the level of human review of AI actions to how risky they are.',
      'Unattended overnight agentic builds': 'Letting coding agents work through well-specified tasks without supervision, then reviewing the results.',
    },
    'Agents and extensibility': {
      'Agent Client Protocol': 'An open protocol that lets code editors talk to AI coding agents in a standard way.',
      'Agent sandboxing': 'Running coding agents in isolated environments so mistakes or malicious instructions cannot damage your system.',
      'Progressive context disclosure': 'Giving an agent only the context it needs at first and revealing more on demand, to keep its working memory focused.',
      'Subagents for better context management': 'Delegating parts of a task to separate agents so each works with a small, focused context.',
      'Programmatic tool calling': 'Letting an agent call tools by writing code, which can chain many calls efficiently instead of one call at a time.',
      'Coding harness for general-purpose agents': 'The scaffolding of tools, prompts and loops that lets a model act as a capable agent.',
      'Agent plugin marketplace': 'A catalogue where teams share and install plugins, skills and tools for coding agents.',
    },
    'AI coding tools and agents': {
      'OpenAI Codex': '',
      OpenCode: 'An open-source coding agent that runs in the terminal and works with many model providers.',
      OpenSpec: 'A spec-driven development tool that has people and AI agents agree on a specification before code is written.',
      Beads: 'A task and memory tracker that gives coding agents a persistent, structured to-do list across sessions.',
      'Deep Agents': 'A LangChain framework for building agents that plan, use sub-agents and keep working on long tasks.',
      Kagent: 'A framework for building and running AI agents on Kubernetes.',
    },
    'Inference platforms, gateways and local runtimes': {
      LiteLLM: 'An open-source gateway and library that gives one interface to many model providers.',
      LibreChat: 'An open-source chat interface that connects to many AI models and providers.',
      KServe: 'A Kubernetes-based platform for serving machine learning models in production.',
      'llm-d': 'A Kubernetes-native project for running large language model inference at scale.',
      KAITO: 'A Kubernetes operator that simplifies running AI models on a cluster.',
      agentgateway: 'A gateway for managing and securing traffic between AI agents, tools and models.',
    },
    'Evaluating and choosing models': {
      Promptfoo: 'An open-source tool for testing and evaluating prompts, models and AI applications.',
    },
    'AI security': {
      'Stateful guardrails': 'Safety checks that consider the history of an agent’s session, not just a single request or response.',
      'Toxic flow analysis for AI': 'Analysing how untrusted input, private data and powerful actions combine across an agent’s tools, to find dangerous paths.',
      'MITRE ATLAS': 'A knowledge base of tactics and techniques used to attack AI systems, used for threat modelling.',
      Presidio: 'An open-source toolkit for detecting and removing personal data from text.',
    },
  },
}
