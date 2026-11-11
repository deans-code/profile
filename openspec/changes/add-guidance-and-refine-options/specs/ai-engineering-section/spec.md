# ai-engineering-section Specification

## ADDED Requirements

### Requirement: Curated AI engineering list
The AI engineering page SHALL drop obscure, redundant or short-lived entries and add current practices, and every offered word SHALL have a description.

#### Scenario: Weak entries removed
- **WHEN** the user browses AI engineering
- **THEN** "Olmoe", "SmolLM", "Phi", "Jan", "GPT4All", "AnythingLLM", "Qwen Code", "Amp", "Crush", "SWE-agent", "Cohere", "Amazon (Nova)" and "AI-assisted documentation" are not offered

#### Scenario: Strong entries added
- **WHEN** the user browses AI engineering
- **THEN** "Parallel agent sessions", "Building MCP servers", "Prompt injection defence", "Token and cost management", "Long-running autonomous agents" and "Agent evaluation" are offered
