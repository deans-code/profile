import { chatGptUrl, type AssistantHelp } from '../data/assistant'

export default function AssistantLink({ noun, prompt }: AssistantHelp) {
  return (
    <aside className="assistant help-block" aria-label={`Discover more ${noun} with ChatGPT`}>
      <p>
        Not sure which {noun} fit you? ChatGPT can ask you questions, one at a time, to help you uncover your {noun}.{' '}
        <a href={chatGptUrl(prompt)} target="_blank" rel="noopener noreferrer">
          Open ChatGPT with a ready-made prompt (opens in a new tab)
        </a>
        .
      </p>
      <p className="assistant-note">
        The prompt asks ChatGPT to interview you and then reflect back what it hears. It does not include anything you
        have selected here. Add the ones that fit you with the box below.
      </p>
    </aside>
  )
}
