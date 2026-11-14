import type { SourceContribution } from '../types'

/**
 * OpenRouter LLM Rankings, usage data through 13 November 2026 (https://openrouter.ai/rankings), licensed CC BY 4.0.
 * Credited from the lists that rendered: top models by weekly, daily and monthly tokens, new and trending, benchmarks
 * (Artificial Analysis Intelligence Index), fastest models, market share by author (families at 2% or more), top apps,
 * and spend by task (Agent 30.3%, Code 25.8%). The lists for General, Agent, Code and Data tasks, cost per session,
 * open versus closed, and tool calls did not render. Families are named rather than dated model versions,
 * because versions change within weeks.
 */
export const openrouterRankings2026: SourceContribution = {
  source: 'openrouter-rankings-2026',
  checked: '2026-11-14',
  categories: {
    'Approaches and ways of working': {
      'Agentic workflows': 'Designing work so AI agents take multiple steps, use tools and make decisions toward a goal.',
      'AI-assisted coding': 'Using AI to write, explain, test and refactor code as part of everyday development.',
    },
    'AI coding tools and agents': {
      'Claude Code': 'Anthropic’s coding agent that works on your codebase from the terminal and in editors.',
      'OpenAI Codex': 'OpenAI’s coding agent that works on your codebase from the terminal, editors and the cloud.',
      'Kilo Code': 'An open-source AI coding agent for editors such as Visual Studio Code.',
      'Hermes Agent': 'An AI agent from Nous Research.',
    },
    'Model providers and open-weight models': {
      Anthropic: '',
      OpenAI: '',
      'Google AI': '',
      DeepSeek: '',
      'Alibaba Qwen': '',
      'Mistral AI': '',
      'Z.ai': 'The AI lab behind the GLM family of language models.',
      'Moonshot AI': 'The AI lab behind the Kimi family of language models.',
      Tencent: 'Tencent’s AI lab, which builds the Hy family of language models.',
      StepFun: 'A Chinese AI lab that builds the Step family of language models.',
      Xiaomi: 'Xiaomi’s AI lab, which builds the MiMo family of language models.',
      MiniMax: 'A Chinese AI company that builds the MiniMax family of language models.',
      NVIDIA: 'The GPU maker, which also publishes open Nemotron language models.',
      'OpenAI gpt-oss': 'OpenAI’s open-weight reasoning models, available in 20B and 120B sizes and fast on specialised inference hardware.',
      'Meta Llama': 'Meta’s Llama family of open-weight language models.',
      'NVIDIA Nemotron': 'NVIDIA’s family of open language models, tuned for efficient inference.',
    },
    'Inference platforms, gateways and local runtimes': {
      OpenRouter: 'A gateway with one API and one bill for models from many providers, with usage rankings.',
      Cerebras: 'An inference provider using wafer-scale chips to serve models at very high speed.',
      Groq: 'An inference provider using custom chips to serve models at very high speed.',
      'Fireworks AI': 'A platform for fast, low-cost inference with open models.',
      Baseten: 'A platform for deploying and serving models in production.',
      CoreWeave: 'A cloud provider specialising in GPU computing for AI workloads.',
    },
    'Evaluating and choosing models': {
      'Comparing models with benchmarks and rankings': 'Using published benchmarks, usage rankings, speed and price to choose a model for a task.',
    },
  },
}
