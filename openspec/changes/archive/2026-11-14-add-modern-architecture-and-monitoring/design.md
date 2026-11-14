## Context

Engineering options are built from one data file per source under `src/data/catalog/engineering/`, merged by `mergeContributions` (first source sets the group and description). Observed today: the Architecture and design group already holds Layered architecture, Hexagonal architecture, Microservices architecture, Event-driven architecture, Modular monolith, CQRS, Circuit breaker pattern and Domain-driven design (26 options), but no Clean Architecture, Onion Architecture, Vertical Slice Architecture or Clean Code practices. The Technical tab's Monitoring and logging group has six options (Observability tools, Sentry, Datadog, Splunk, VictoriaMetrics, VictoriaLogs). `src/data/attribution.test.ts` already fails when a source listed on a tab supports no option on that tab, and when a registry source is on no tab. The previous change generated per-source files with a throwaway script; this change writes its additions as ordinary source files.

## Goals / Non-Goals

**Goals:** add the named architectural approaches and related patterns, each sourced; grow Monitoring and logging to at least 14 sourced options; make "source shown only if cited" explicit and checked against what the app renders.
**Non-Goals:** adding frameworks or libraries that implement the styles; changing the profile format; reworking other groups.

## Decisions

1. **Candidate sources** (each fetched and read before it is listed; failures recorded in the README):
   - Architecture: Robert C. Martin, "The Clean Architecture" (blog.cleancoder.com, 2012) and the book Clean Architecture (2017); Jeffrey Palermo, "The Onion Architecture" (2008); Alistair Cockburn, "Hexagonal architecture" (alistair.cockburn.us, 2005, updated 2024); Jimmy Bogard, "Vertical Slice Architecture" (jimmybogard.com, 2018); Wikipedia "Hexagonal architecture (software)", "Clean architecture" if present, "Package by feature"; Robert C. Martin, Clean Code (2008) via its Wikipedia and publisher pages; "Screaming architecture" (Martin blog).
   - Decoupling and microservice patterns: microservices.io pattern language (Chris Richardson), Martin Fowler's Microservices article and bliki entries (Strangler Fig, Bounded Context, Circuit Breaker, Backend for Frontend via Sam Newman), Microsoft Azure Architecture Center cloud design patterns (API gateway, Strangler Fig, Saga, Outbox, Anti-corruption layer, Sidecar, Bulkhead, Retry, Ambassador, Claim check and others), Wikipedia "Event-driven architecture", "Service-oriented architecture", "Strangler fig pattern", "Saga pattern", "Cell-based architecture".
   - Monitoring and logging: OpenTelemetry documentation (CNCF), CNCF Observability and Analysis landscape, Wikipedia "Observability (software)", "Application performance management", "Log management", "Comparison of network monitoring systems", Prometheus and Grafana project pages for what they do, Google SRE book monitoring chapters (already registered, names only), the Stack Overflow and JetBrains surveys already listed for tools they rank.
   Rejected up front: undated blogs by non-originators, vendor marketing pages, anything that refuses automated access.
2. **Source files per source, written by hand.** Each new source gets `src/data/catalog/<tab>/<id>.ts` with a header recording what was read, the date, the licence and anything unread; descriptions are written for this app. Existing options that a new source also names gain that source with an empty description (as `mergeContributions` supports).
3. **Placement.** Clean and decoupled approaches go in Engineering's Architecture and design group, with Clean Code practices in Software quality and maintenance. If either group would pass about 45 options, add a new group "Clean and decoupled architecture" (at least six options) holding the clean-architecture family and the microservice patterns, leaving Architecture and design for general styles. The six-option group minimum still applies.
4. **Naming.** Option names are the commonly used names (Clean Architecture, Onion Architecture, Vertical Slice Architecture, Hexagonal architecture is existing, Saga pattern, Outbox pattern, Strangler fig pattern, API gateway pattern, Backend for frontend, Anti-corruption layer, Sidecar pattern, Bulkhead pattern). Names must not start with "Back" (existing UI tests match `/^Back/` on the Back button), so "Backend for frontend" is offered as "BFF (backend for frontend)". Names must be unique across tabs; the integrity test finds clashes.
5. **Monitoring and logging inclusion rule.** A tool is added when a listed Technical source names it as in use (survey rank at 5%, or named by a maintained reference such as the CNCF landscape or OpenTelemetry vendor list as a widely used project). Target at least 14 options covering metrics (Prometheus, Grafana), tracing (OpenTelemetry, Jaeger, Zipkin, Grafana Tempo), logging (Loki, Fluentd, Fluent Bit, Logstash, Kibana/Elastic) and APM or monitoring suites (New Relic, Dynatrace, Nagios, Zabbix) provided each is read and named by a source; any not named by a source is omitted.
6. **Source citation integrity.** Add a test that renders each tab (Values and the four skill tabs) and compares the sources in its Sources section with the set cited by that tab's attribution, both ways; keep the existing per-tab "supports nothing" test; add a test that every per-source data file contributes at least one option (parse each file's `categories`). If any source is found to be shown without a citing option, drop it from that tab in `TAB_SOURCES`.
7. **README.** Add the new sources to the Engineering and Technical sections, the Clean architecture group note (if added), and a sentence stating the "cited to be shown" rule.

## Risks / Trade-offs

- Originator blogs may carry no licence or date → link and credit only, names and own descriptions; record the date seen.
- Pattern lists overlap heavily (Azure patterns, microservices.io, Fowler) → merge by choosing one canonical name and let every source that names it gain the attribution.
- Name clashes with existing options or UI tests → check names against `/^Back/`, `/engineering/i`-style heading queries and the cross-tab uniqueness test before committing.
- Monitoring entries without usage data → rely on a maintained reference naming the tool as widely used and say so in the README; omit anything only named in a vendor page.

## Migration Plan

1. Land the new tests (they pass today for per-tab support). 2. Add architecture sources and options. 3. Add monitoring sources and options. 4. README. Roll back by reverting commits; no stored data changes.

## Open Questions

- Whether a separate "Clean and decoupled architecture" group is needed is decided when the options are counted.
