# chatgpt-discovery Specification

## Purpose
TBD - created by archiving change privacy-intro-and-prompt-rework. Update Purpose after archive.

## Requirements

### Requirement: Question-led prompt
The prompt opened by the ChatGPT link SHALL ask ChatGPT to help the user discover their own values or skills by interviewing them: ask one short question at a time, wait for each answer, and after several answers reflect back themes and candidate words for the user to confirm. It SHALL NOT ask ChatGPT to produce a fixed list of suggestions up front, and SHALL NOT state a number of items to suggest.

#### Scenario: Values prompt
- **WHEN** the user opens the link on the values page
- **THEN** the prompt asks ChatGPT to ask questions one at a time to uncover the user's values, and contains no request for a list of 15

#### Scenario: Interpersonal prompt
- **WHEN** the user opens the link on the interpersonal skills page
- **THEN** the prompt likewise asks one question at a time about how they work with others

### Requirement: Prompt is generic
The prompt SHALL NOT include anything the user has selected or typed.

#### Scenario: No selections sent
- **WHEN** the user has selected values and then opens the link
- **THEN** the opened URL's prompt is the same fixed text

### Requirement: Link text matches
The text around the link SHALL describe ChatGPT as asking the user questions to help them uncover values or skills, not as suggesting a list, and SHALL tell users they can add what they discover with the add box.

#### Scenario: Explanation
- **WHEN** the user expands Help on the values page
- **THEN** the ChatGPT box says ChatGPT will ask questions to help uncover values
