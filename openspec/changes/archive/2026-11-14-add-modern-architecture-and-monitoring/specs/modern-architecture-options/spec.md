## ADDED Requirements

### Requirement: Modern architectural approaches are offered
The system SHALL offer on the Engineering tab Clean Architecture, Onion Architecture, Vertical Slice Architecture, Hexagonal architecture (ports and adapters) and the clean-code practices named by the chosen sources, each with a description and every listed source that names it.

#### Scenario: Named approaches present
- **WHEN** the Engineering catalog is loaded
- **THEN** Clean Architecture, Onion Architecture, Vertical Slice Architecture and Hexagonal architecture are options, each with a description and at least one source

#### Scenario: Clean Code practices
- **WHEN** the Engineering catalog is loaded
- **THEN** it offers the clean-code practices a listed source names, such as meaningful names, small functions and error handling, each as a separate option

### Requirement: Decoupled and microservice patterns are offered
The system SHALL offer on the Engineering tab the decoupling and microservice patterns that a listed source names, including API gateway, Backend for frontend, Strangler fig, Saga, Outbox, Anti-corruption layer, Sidecar, Database per service and Bulkhead, without duplicating options already offered.

#### Scenario: Patterns attributed
- **WHEN** a pattern is offered
- **THEN** its description panel lists the sources that name it

### Requirement: Every new option has a robust source
The system SHALL list a source for each new architecture option only after reading it, and SHALL prefer the originator's published work or a maintained reference with a stated date or edition.

#### Scenario: Unread source
- **WHEN** a candidate source cannot be read
- **THEN** it is not listed and the README records why
