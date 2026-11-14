# monitoring-and-logging-depth Specification

## Purpose

Keeps the Technical page Monitoring and logging group deep enough, with every entry sourced.

## Requirements

### Requirement: Monitoring and logging has at least fourteen options
The system SHALL offer at least 14 options in the Technical tab's Monitoring and logging group, each with a description and at least one listed source that names it.

#### Scenario: Group size
- **WHEN** the Technical catalog is loaded
- **THEN** the Monitoring and logging group has 14 or more options

#### Scenario: Sourced entries
- **WHEN** a monitoring or logging option is offered
- **THEN** it cites a source listed on the Technical tab and passes the technology inclusion rule (5% usage, or named by two sources, or named by a maintained reference as widely used)

### Requirement: Coverage of metrics, tracing and logging
The system SHALL offer tools or standards for metrics, tracing, logging and alerting in that group where a listed source names them.

#### Scenario: All three signals
- **WHEN** the group is shown
- **THEN** it includes at least one option each for metrics, tracing and logging
