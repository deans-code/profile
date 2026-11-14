## Why

The Engineering tab names only a few architecture styles (Layered, Hexagonal, Microservices, Event-driven, Modular monolith, CQRS) and has none of the clean, decoupled and vertical-slice approaches that teams now choose between: Clean Architecture, Onion Architecture, Vertical Slice Architecture, Clean Code and the related decoupling and microservice patterns. The Technical tab's Monitoring and logging group has only six entries, the smallest group on any tab. Each addition needs a robust source that is listed on the tab only because an option cites it.

## What Changes

- Add modern architectural approaches to Engineering, each with a description and at least one source that names it: Clean Architecture, Onion Architecture, Vertical Slice Architecture, Ports and adapters (already offered as Hexagonal architecture, which gains the original source), Feature-sliced and package-by-feature organisation, Screaming architecture, the Dependency Rule, Use cases and interactors, Clean Code and its practices (meaningful names, small functions, comments, error handling, boundaries), and related clean-code and decoupling practices.
- Add decoupled and microservice patterns to Engineering, each sourced: API gateway, Backend for frontend, Strangler fig pattern, Saga pattern, Outbox pattern, Anti-corruption layer, Sidecar, Database per service, Service orchestration and choreography, Cell-based architecture, Event-carried state transfer, Consumer-driven contracts, Bulkheads, Retry and timeout policies, Idempotent consumers and similar patterns the chosen sources name.
- Add robust sources for them (candidates in design.md), read before they are listed, each with its edit date or edition and, for Wikipedia, its CC BY-SA 4.0 licence.
- Add entries to the Technical tab's Monitoring and logging group so it has at least 14 options, each with a source: metrics, tracing and logging tools and standards such as Prometheus, Grafana, OpenTelemetry, Jaeger, Loki, Fluentd, Fluent Bit, Logstash, Kibana, New Relic, Dynatrace, Grafana Tempo, Zipkin, Nagios, Zabbix and others that a chosen source names as in use.
- Make the rule explicit and test it: a source appears in a tab's Sources section only if at least one option on that tab cites it; a source that cites nothing on a tab is removed from that tab. The existing integrity test already enforces this per tab; this change adds a test that the Sources shown in the app match the sources cited by attribution on that tab, and a check over the whole registry so no source file is left supporting nothing.
- README documents the new sources, the new options and the rule.

## Capabilities

### New Capabilities
- `modern-architecture-options`: the architecture, clean-code, decoupling and microservice-pattern options offered on Engineering and the sources required for them.
- `monitoring-and-logging-depth`: the minimum size and sourcing of the Monitoring and logging group.
- `source-citation-integrity`: a source is shown on a tab only if an option on that tab cites it.

### Modified Capabilities
<!-- None in openspec/specs. Extends source-breadth, catalog-depth and option-attribution from broaden-sources-and-deepen-lists and verified-sources-for-every-tab. -->

## Impact

- `src/data/sources.ts` (new registry entries, Engineering and Technical lists), new per-source files under `src/data/catalog/engineering/` and `src/data/catalog/technical/`, the tabs' `index.ts`, tests (`src/data/attribution.test.ts`, a new check that rendered Sources match citations), `README.md`.
- No new dependencies, no run-time network access, saved-profile format unchanged. Renamed or moved options load from older profiles as custom entries.
- Licence: sources are linked and credited, never reproduced. Blog posts and books are cited by name and link only; Wikipedia text is not copied.

## Assumptions

- Clean Architecture, Onion Architecture, Hexagonal architecture and Vertical Slice Architecture belong to Engineering as practices. The tools that implement them (frameworks, libraries) stay out unless a source names them as in use.
- Original sources (Robert C. Martin's blog and books, Jeffrey Palermo's Onion Architecture articles, Alistair Cockburn's hexagonal architecture article, Jimmy Bogard's vertical slice posts, microservices.io, Martin Fowler's site) qualify as robust when they are by the originator, dated, and still the standard reference; their licences are unclear, so they are linked and credited only with names of practices and descriptions written for this app.
- "Monitoring and logging" means the Technical group of that name; observability practices on Engineering (SLOs, tracing, log aggregation) stay where they are.
- Where a candidate source cannot be read it is not listed, and the README records why.
