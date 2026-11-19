import type { TermKind } from './definitions'

export interface AssistantHelp {
  /** What the user can discover, for example "values". */
  noun: string
  /** Text sent to ChatGPT. It asks ChatGPT to interview the user, one question at a time. */
  prompt: string
}

const VALUES_PROMPT =
  "I'm building a personal profile and want help discovering my core values. " +
  'Values are the principles and qualities that matter most to me in life and at work. ' +
  'Please act as a thoughtful coach and interview me. Ask me one short question at a time and wait for my answer before the next. ' +
  'Draw on moments that shaped me: times I felt proud or fulfilled, times I felt frustrated or let down, ' +
  'people I admire and why, and trade-offs I have had to make. ' +
  'After about six to eight answers, reflect back the themes you noticed and name the values they point to, ' +
  'each as a single word or short phrase with a one-sentence description, and ask me which ones ring true before finalizing anything. ' +
  'Do not guess or invent answers for me, and do not give a list of values until you have heard from me.'

const INTERPERSONAL_PROMPT =
  "I'm building a professional profile and want help identifying my interpersonal skills. " +
  'Interpersonal skills are the ways I communicate, collaborate and build relationships with other people. ' +
  'Please act as a thoughtful coach and interview me. Ask me one short question at a time and wait for my answer before the next. ' +
  'Ask about how I work with others: how I handle disagreement, how I help colleagues, how I give and receive feedback, ' +
  'and what people tend to thank me for. ' +
  'After about six to eight answers, reflect back the patterns you noticed and name the interpersonal skills they show, ' +
  'each as a short name with a one-sentence description, and ask me which ones fit before finalizing anything. ' +
  'Do not guess or invent answers for me, and do not give a list of skills until you have heard from me.'

/** Pages that offer a link to ChatGPT. The prompts are generic and never include the user's selections. */
export const ASSISTANT_HELP: Partial<Record<TermKind, AssistantHelp>> = {
  values: { noun: 'values', prompt: VALUES_PROMPT },
  interpersonal: { noun: 'interpersonal skills', prompt: INTERPERSONAL_PROMPT },
}

/** A ChatGPT link that opens with the prompt already filled in. */
export function chatGptUrl(prompt: string): string {
  return `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`
}
