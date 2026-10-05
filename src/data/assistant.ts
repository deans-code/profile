import type { TermKind } from './definitions'

export interface AssistantHelp {
  /** What the user can discover, for example "values". */
  noun: string
  /** Text sent to ChatGPT. It explains what the user is capturing and asks for suggestions. */
  prompt: string
}

const VALUES_PROMPT =
  "I'm building a personal profile and want help discovering my core values. " +
  'Values are the principles and qualities that matter most to me in life and at work, ' +
  'such as integrity, curiosity or collaboration. ' +
  'Please suggest 15 values that might resonate with me, covering a range of different themes. ' +
  'Give each one as a single word or short phrase, followed by a one-sentence description, ' +
  'so that I can pick the ones that fit and copy them into my profile. ' +
  'If you would suggest better values after knowing more about me, ask me a few short questions first, one at a time.'

const INTERPERSONAL_PROMPT =
  "I'm building a professional profile and want help identifying my interpersonal skills. " +
  'Interpersonal skills are the ways I communicate, collaborate and build relationships with other people, ' +
  'such as active listening, conflict resolution, mentoring or influencing. ' +
  'Please suggest 15 interpersonal skills that might describe me, covering a range of different areas. ' +
  'Give each one as a short name, followed by a one-sentence description, ' +
  'so that I can pick the ones that fit and copy them into my profile. ' +
  'If you would suggest better skills after knowing more about how I work with others, ' +
  'ask me a few short questions first, one at a time.'

/** Pages that offer a link to ChatGPT. The prompts are generic and never include the user's selections. */
export const ASSISTANT_HELP: Partial<Record<TermKind, AssistantHelp>> = {
  values: { noun: 'values', prompt: VALUES_PROMPT },
  interpersonal: { noun: 'interpersonal skills', prompt: INTERPERSONAL_PROMPT },
}

/** A ChatGPT link that opens with the prompt already filled in. */
export function chatGptUrl(prompt: string): string {
  return `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`
}
