import type { SourceContribution } from '../types'

/**
 * Stack Overflow Developer Survey 2026, Technology section (https://survey.stackoverflow.co/2026/technology/data).
 * LLM model vendors used by at least 5% of respondents (Anthropic 74.6%, OpenAI 74.3%, Google AI 54.5%,
 * Microsoft 26.4%, DeepSeek 18.9%, Alibaba Qwen 10.1%, Mistral AI 9.8%, xAI 7.6%, Meta AI 6.3%), and the problems
 * with AI-generated code that cost respondents the most time (plausible but wrong code 69.3%, hard-to-review
 * generated code 54.2%, missing context 49.3%, hallucinated packages or configuration 45.1%).
 * Code editors with AI built in (Cursor, Zed) are on the Technical development tab from the same survey.
 */
export const stackOverflow2026Ai: SourceContribution = {
  source: 'stack-overflow-2026',
  checked: '2026-11-14',
  categories: {
    'Model providers': {
      Anthropic: 'The AI company behind the Claude family of models.',
      OpenAI: 'The AI company behind the GPT family of models and ChatGPT.',
      'Google AI': 'Google’s AI models and platform, including the Gemini family.',
      'Microsoft AI': 'Microsoft’s AI models and services, including Azure AI and Copilot.',
      DeepSeek: 'A Chinese AI lab known for low-cost, high-performing open-weight models.',
      'Alibaba Qwen': 'Alibaba’s Qwen family of language models, many released with open weights.',
      'Mistral AI': 'A European AI company that builds open-weight and commercial language models.',
      xAI: 'The AI company behind the Grok models.',
      'Meta AI': 'Meta’s AI research and the Llama family of open-weight models.',
    },
    'Working with AI output': {
      'Reviewing AI-generated code': 'Carefully checking code written by AI for correctness, security and maintainability before accepting it.',
      'Giving AI the right context': 'Supplying an AI tool with the relevant files, requirements and constraints so its answers fit your project.',
      'Spotting hallucinated packages and configuration': 'Checking that libraries, APIs and settings suggested by AI actually exist and are current.',
    },
  },
}
