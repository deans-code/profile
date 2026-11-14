import type { SourceContribution } from '../types'

/**
 * Wikipedia, "Prompt engineering" (https://en.wikipedia.org/wiki/Prompt_engineering, CC BY-SA 4.0, edit date not shown on the text read; the page was read through 39,943 of 146,112 characters verbatim, the rest summarised).
 * Read: prompting techniques, context engineering and limitations. Part of the page came through the fetch tool's summary rather than verbatim. Descriptions are written for this app; no article text is copied.
 */
export const promptEngineeringWikipedia: SourceContribution = {
  source: 'prompt-engineering-wikipedia',
  checked: '2026-11-14',
  categories: {
    'Approaches and ways of working': {
      'Vibe coding': 'Describing what you want in plain language and letting an AI generate or change the code.',
    },
    'Prompting and context engineering': {
      'Prompt design': 'Writing clear queries with the context, output style and persona the model needs.',
      'Few-shot prompting': 'Giving the model a few worked examples to steer its answer.',
      'Chain-of-thought prompting': 'Asking the model to reason through intermediate steps before answering.',
      'Self-consistency': 'Sampling several lines of reasoning and taking the most common answer.',
      'Tree-of-thought prompting': 'Letting the model explore and compare branching lines of reasoning.',
      'Role assignment': 'Giving the model a role or persona to shape how it answers.',
      'Context engineering': 'Deciding what instructions, knowledge and tool definitions go into the model’s context.',
      'Token budgeting': 'Fitting the most useful context into the model’s limited window.',
      'Prompt optimisation': 'Improving prompts systematically against an evaluation set rather than by hand.',
      'Prompt sensitivity testing': 'Checking how much small wording or format changes affect results.',
      'Prompt versioning': 'Keeping prompts under version control so changes can be tested and rolled back.',
    },
    'Evaluating and choosing models': {
      'Evaluating with test sets': 'Measuring a model or prompt against a fixed set of examples.',
      'Benchmark contamination awareness': 'Recognising when a benchmark’s test data has leaked into training.',
      'Evaluating prompt sensitivity': 'Measuring how results change with small changes to the prompt.',
    },
  },
}
