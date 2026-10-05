# Spec Delta

## Purpose

Keeps profiles focused by capping how many words a user can select on each selection page, and tells them clearly when the cap is reached.

## ADDED Requirements

### Requirement: Ten selections per page
The system SHALL allow at most 10 selected words on each selection page: 10 values, and 10 skills in each of the technical development, engineering and interpersonal sections. Custom entries SHALL count toward the limit.

#### Scenario: Limit reached
- **WHEN** the user has selected 10 values and activates an unselected value
- **THEN** the value is not selected and the selection stays at 10

#### Scenario: Limits are per page
- **WHEN** the user has selected 10 values
- **THEN** they can still select up to 10 skills in each skill section

#### Scenario: Custom entries count
- **WHEN** 9 words are selected and the user adds a custom word, then tries to add another
- **THEN** the first is added as the tenth selection and the second is rejected

### Requirement: Deselecting frees a slot
The system SHALL allow a selected word to be deselected at any time, after which another word can be selected.

#### Scenario: Swap a word
- **WHEN** the limit is reached, the user deselects one word and selects another
- **THEN** the new word is selected and the count remains 10

### Requirement: Count and limit feedback
Each selection page SHALL show how many words are selected out of 10, and when the limit is reached SHALL state that it has been reached and how to free a slot. Words that cannot be selected SHALL be visibly and programmatically marked as unavailable while remaining focusable.

#### Scenario: Count shown
- **WHEN** the user has selected 7 words on a page
- **THEN** the page shows "7 of 10 selected"

#### Scenario: Limit message
- **WHEN** the user reaches 10 selections
- **THEN** a message says the limit is reached and that deselecting a word allows another choice, and it is announced to assistive technology

#### Scenario: Unavailable words
- **WHEN** the limit is reached
- **THEN** unselected words appear dimmed and are exposed as disabled-like (aria-disabled), while selected words remain active

### Requirement: Adding custom words at the limit
The system SHALL disable the add-your-own control with an explanation while the page is at its limit, and SHALL NOT discard the text the user has typed.

#### Scenario: Add disabled
- **WHEN** the page is at its limit and the user has typed a custom word
- **THEN** the Add control is disabled, the limit message is shown, and the typed text remains

### Requirement: Definitions remain available at the limit
Words that cannot be selected because of the limit SHALL still open their definitions.

#### Scenario: Definition at limit
- **WHEN** the limit is reached and the user right-clicks an unselected word
- **THEN** its definition opens and the selection is unchanged

### Requirement: Limit applies to existing selections
A selection page holding more than 10 words (for example a loaded profile) SHALL allow deselecting but not selecting, and the user SHALL NOT be able to continue from that page until it holds 10 or fewer, with a message stating how many to remove.

#### Scenario: Over the limit
- **WHEN** a page holds 12 selected words
- **THEN** the count shows "12 of 10 selected", continue is disabled, and the message says to deselect 2 words
