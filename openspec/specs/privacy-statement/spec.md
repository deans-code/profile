# privacy-statement Specification

## Purpose
TBD - created by archiving change privacy-intro-and-prompt-rework. Update Purpose after archive.

## Requirements

### Requirement: Privacy line in the introduction
The introduction SHALL state, visibly on every page, that the tool runs entirely in the user's browser, that the app collects no data and uses no cookies.

#### Scenario: Line visible
- **WHEN** the user opens any page
- **THEN** the introduction shows a short statement that nothing is collected, everything runs in the browser and no cookies are used

### Requirement: Full privacy statement
A "Privacy" control in the header SHALL reveal a fuller statement, collapsed by default, operable by keyboard and touch, with collapsed content not focusable. The statement SHALL say: choices are kept only in memory on the device and are lost when the page is closed or reloaded; no cookies are set; the only thing stored on the device is the chosen theme and text size; downloads and loading a saved profile happen locally; the hosting provider may keep ordinary server logs that the app does not control; and links to outside sites, including the optional ChatGPT link, leave the app, with the ChatGPT link sending only a fixed generic prompt and never the user's selections.

#### Scenario: Expand statement
- **WHEN** the user activates "Privacy"
- **THEN** the full statement is shown including the hosting-logs and outside-links notes

### Requirement: Statement stays true
The app SHALL NOT send profile content to any server, set cookies, or load third-party scripts, fonts or trackers. An automated test SHALL fail if application code calls network APIs or sets cookies, so the statement cannot silently become untrue.

#### Scenario: Guard test
- **WHEN** application source contains a network call, cookie write or third-party script
- **THEN** the privacy test fails
