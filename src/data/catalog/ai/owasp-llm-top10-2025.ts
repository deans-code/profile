import type { SourceContribution } from '../types'

/**
 * OWASP Top 10 for Large Language Model Applications, 2025 edition (https://genai.owasp.org/llm-top-10/), OWASP Gen AI Security Project, CC BY-SA 4.0.
 * Read: the ten risks (prompt injection, sensitive information disclosure, supply chain, data and model poisoning, improper output handling, excessive agency, system prompt leakage, vector and embedding weaknesses, misinformation, unbounded consumption). Each is offered as the skill of guarding against it. Descriptions are written for this app.
 */
export const owaspLlmTop10: SourceContribution = {
  source: 'owasp-llm-top10-2025',
  checked: '2026-11-14',
  categories: {
    'Retrieval and data for AI': {
      'Guarding against RAG poisoning': 'Protecting retrieval sources from misleading or planted content.',
    },
    'AI security': {
      'Preventing prompt injection': 'Defending against inputs that try to override the model’s instructions.',
      'Preventing sensitive information disclosure': 'Stopping a model from leaking private or confidential data.',
      'LLM supply chain security': 'Vetting the models, data and components an AI application depends on.',
      'Defending against data and model poisoning': 'Protecting training and fine-tuning data and models from tampering.',
      'Improper output handling': 'Validating and sanitising model output before other systems use it.',
      'Limiting excessive agency': 'Giving AI agents only the permissions and autonomy they actually need.',
      'Preventing system prompt leakage': 'Keeping hidden instructions and secrets out of what a model reveals.',
      'Securing vectors and embeddings': 'Protecting vector stores and embeddings against abuse and leakage.',
      'Countering misinformation from AI': 'Reducing the risk of confident but false model output being relied on.',
      'Preventing unbounded consumption': 'Limiting runaway use of compute, tokens and cost.',
      'AI red teaming': 'Probing an AI system for weaknesses by acting as an adversary.',
    },
  },
}
