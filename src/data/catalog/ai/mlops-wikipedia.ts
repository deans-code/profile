import type { SourceContribution } from '../types'

/**
 * Wikipedia, "MLOps" (https://en.wikipedia.org/wiki/MLOps, CC BY-SA 4.0, edited 4 November 2026).
 * Read: its practices, lifecycle systems and LLMOps practices. Part of the page came through the fetch tool's summary rather than verbatim. Descriptions are written for this app; no article text is copied.
 */
export const mlopsWikipedia: SourceContribution = {
  source: 'mlops-wikipedia',
  checked: '2026-11-14',
  categories: {
    'Approaches and ways of working': {
      'Continuous evaluation of AI behaviour': 'Re-checking AI behaviour whenever the model, prompt or data changes.',
    },
    'Prompting and context engineering': {
      'Prompt versioning': '',
    },
    'Building and operating AI applications': {
      MLOps: 'Automating and monitoring the build, deployment and running of machine learning systems.',
      LLMOps: 'Running language-model applications reliably, including prompts, retrieval and cost.',
      'Versioning data, models and code': 'Tracking which data, model and code produced each result.',
      'Model monitoring': 'Watching deployed models for drift, errors and degraded results.',
      'Machine learning pipelines': 'Orchestrating the steps from data to trained and deployed model.',
      'Feature engineering': 'Turning raw data into inputs a model can learn from.',
      'Data labelling': 'Annotating data so that models can be trained and evaluated.',
      'Tracing LLM requests': 'Following each request through model calls, retrieval and tools, with cost and latency.',
      'Reproducible machine learning': 'Being able to repeat a training or evaluation run and get the same result.',
    },
    'Evaluating and choosing models': {
      'Evaluating with test sets': '',
      'LLM-as-judge evaluation': 'Using a model to grade another model’s outputs.',
      'Human evaluation of AI outputs': 'Having people review and rate model outputs.',
    },
  },
}
