## 1. Citation integrity tests

- [x] 1.1 Add a test in `src/data/attribution.test.ts` that every per-source data file under `src/data/catalog/*/` contributes at least one option. Verify: passes now; fails if an empty source file is added.
- [x] 1.2 Add a UI test that each tab's rendered Sources section lists exactly the sources cited by that tab's attribution, in tab order (Values, Technical, Engineering, Interpersonal, AI engineering). Verify: passes now; fails if a source is listed on a tab that nothing there cites. If it fails, remove the offending source from that tab in `TAB_SOURCES` and note it in the README.

## 2. Modern architecture and clean approaches (Engineering)

- [x] 2.1 Fetch and read the architecture sources (Clean Architecture, Onion Architecture, Hexagonal architecture, Vertical Slice Architecture, Clean Code, Screaming architecture, Wikipedia equivalents). Register the readable ones with year or edition and add per-source files. Verify: each address opens; rejects and reasons noted.
- [x] 2.2 Add Clean Architecture, Onion Architecture, Vertical Slice Architecture, the Dependency Rule, use cases and interactors, package by feature, Screaming architecture and the Clean Code practices the sources name, each with a description and every source that names it; give Hexagonal architecture its original source. Verify: integrity tests pass; each option cites at least one source read in task 2.1.
- [x] 2.3 Fetch and read the decoupling and microservice pattern sources (microservices.io, Fowler's microservices and bliki, Azure cloud design patterns, Wikipedia event-driven, SOA, strangler fig and saga articles). Register and add per-source files. Verify: addresses open; rejects noted.
- [x] 2.4 Add the patterns they name (API gateway, BFF, Strangler fig, Saga, Outbox, Anti-corruption layer, Sidecar, Database per service, Bulkhead, Retry and timeout, Idempotent consumer, orchestration versus choreography, cell-based architecture and others read), merging with existing options and avoiding names starting with "Back". Add a "Clean and decoupled architecture" group if Architecture and design would exceed about 45 options. Verify: integrity, depth and group-size tests pass; all 349+ tests pass.

## 3. Monitoring and logging (Technical)

- [x] 3.1 Fetch and read the monitoring sources (OpenTelemetry, CNCF landscape, Wikipedia observability, APM, log management and network-monitoring comparison). Register the readable ones and add per-source files. Verify: addresses open; rejects noted.
- [x] 3.2 Add the metrics, tracing, logging and APM tools they name as widely used, with descriptions and sources, so Monitoring and logging has at least 14 options including at least one each for metrics, tracing and logging. Verify: integrity and group tests pass; the group has 14 or more options.

## 4. Documentation and final checks

- [x] 4.1 Update `README.md`: new sources per tab with dates and licences, rejected sources, the new options and group, and the rule that a source is shown only if an option cites it. Verify: `src/sources.test.tsx` passes.
- [x] 4.2 Run `npm test` and `npm run build`. Verify: both pass.
- [ ] 4.3 In the browser, open Engineering and Technical: new options, sources in right-click panels, the Monitoring and logging group, and layout at largest text size. Verify: no overlap, broken links or missing sources.
