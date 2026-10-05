import { chatGptUrl, type AssistantHelp } from '../data/assistant'

export default function AssistantLink({ noun, prompt }: AssistantHelp) {
  return (
    <aside className="assistant" aria-label={`Discover more ${noun} with ChatGPT`}>
      <p>
        Not sure which {noun} fit you? You can work with ChatGPT to discover more {noun}.{' '}
        <a href={chatGptUrl(prompt)} target="_blank" rel="noopener noreferrer">
          Open ChatGPT with a ready-made prompt (opens in a new tab)
        </a>
        .
      </p>
      <p className="assistant-note">
        The prompt explains what you are trying to capture and asks for suggestions. It does not include anything you
        have selected here. Add the ones you like with the box below.
      </p>
    </aside>
  )
}
