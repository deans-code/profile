import type { Section } from './skills'

/**
 * A broader term groups several existing options, so a user can say "CI/CD" without naming every tool.
 * These are this app's own groupings, not drawn from a published list, so they carry no source citation.
 * Selecting one never selects the options it covers; those stay in their own categories.
 */
export interface BroadTerm {
  name: string
  /** One sentence for the app's definition panel. The panel also lists what the term covers. */
  description: string
  /** Existing options in the same section that the term stands for (at least three). */
  covers: string[]
}

export const BROAD_TERMS: Record<Section, BroadTerm[]> = {
  technical: [
    {
      name: 'CI/CD',
      description: 'Automating how code is built, tested and delivered, whichever tool runs the pipeline.',
      covers: ['GitHub Actions', 'Jenkins', 'TeamCity', 'CircleCI', 'GitLab CI/CD', 'Buildkite', 'Bamboo', 'GoCD', 'Harness', 'Semaphore', 'Travis CI', 'AppVeyor', 'Spinnaker', 'Bitbucket Pipelines'],
    },
    {
      name: 'Containerisation and orchestration',
      description: 'Packaging software into containers and running them at scale.',
      covers: ['Docker', 'Podman', 'Kubernetes', 'Helm', 'vCluster'],
    },
    {
      name: 'Infrastructure automation tools',
      description: 'Describing and configuring servers and cloud resources in code rather than by hand.',
      covers: ['Terraform', 'Ansible', 'HCL'],
    },
    {
      name: 'Monitoring and tracing platforms',
      description: 'Collecting metrics, logs and traces to see how running systems behave.',
      covers: ['Prometheus', 'Grafana', 'OpenTelemetry', 'Jaeger', 'Datadog', 'Splunk', 'Dynatrace', 'New Relic', 'Honeycomb', 'Fluentd', 'Fluent Bit', 'Grafana Loki'],
    },
    {
      name: 'Relational databases',
      description: 'Databases that store data in tables and are queried with SQL.',
      covers: ['PostgreSQL', 'MySQL', 'MariaDB', 'Microsoft SQL Server', 'Oracle', 'SQLite', 'CockroachDB', 'IBM Db2'],
    },
    {
      name: 'NoSQL databases',
      description: 'Databases that store data as documents, key-value pairs, wide columns or graphs rather than tables.',
      covers: ['MongoDB', 'Redis', 'Valkey', 'DynamoDB', 'Apache Cassandra', 'Couchbase', 'Neo4j'],
    },
    {
      name: 'Search engines',
      description: 'Systems that index data so it can be searched quickly and ranked.',
      covers: ['Elasticsearch', 'OpenSearch', 'Apache Solr', 'Algolia'],
    },
    {
      name: 'Public cloud platforms',
      description: 'Renting computing, storage and managed services from a cloud provider.',
      covers: ['Amazon Web Services', 'Microsoft Azure', 'Google Cloud', 'DigitalOcean', 'Alibaba Cloud', 'Tencent Cloud'],
    },
    {
      name: 'Front-end frameworks',
      description: 'Libraries and frameworks for building interactive user interfaces in the browser.',
      covers: ['React', 'Vue.js', 'Angular', 'Svelte', 'SolidJS', 'Preact', 'Qwik', 'Ember.js'],
    },
    {
      name: 'Server-side web frameworks',
      description: 'Frameworks for building web back ends and APIs.',
      covers: ['Express', 'NestJS', 'FastAPI', 'Flask', 'Django', 'Spring Boot', 'ASP.NET Core', 'Laravel', 'Ruby on Rails'],
    },
    {
      name: 'Unit testing frameworks',
      description: 'Frameworks for writing and running automated tests of small pieces of code.',
      covers: ['Jest', 'Vitest', 'Mocha', 'pytest', 'JUnit', 'xUnit.net', 'NUnit', 'PHPUnit', 'RSpec'],
    },
    {
      name: 'Browser and end-to-end testing',
      description: 'Tools that drive a real browser to test a whole application.',
      covers: ['Playwright', 'Cypress', 'Selenium', 'BrowserStack'],
    },
    {
      name: 'Package management',
      description: 'Installing and versioning the libraries a project depends on.',
      covers: ['npm', 'pnpm', 'Yarn', 'pip', 'uv', 'Poetry', 'Cargo', 'NuGet', 'Composer'],
    },
    {
      name: 'Build systems',
      description: 'Tools that compile, link and package source code into something runnable.',
      covers: ['Make', 'CMake', 'Ninja', 'Maven', 'Gradle', 'MSBuild', 'Bazel'],
    },
    {
      name: 'Message brokers and streaming',
      description: 'Middleware that passes messages and events between systems.',
      covers: ['Apache Kafka', 'Apache ActiveMQ', 'Apache Pulsar', 'NATS', 'Redpanda', 'IBM MQ', 'Azure Service Bus', 'Google Cloud Pub/Sub'],
    },
    {
      name: 'Identity providers and SSO',
      description: 'Services that sign users in and manage who may access what, including single sign-on.',
      covers: ['Auth0', 'Okta', 'Keycloak', 'Microsoft Entra ID', 'OneLogin'],
    },
    {
      name: 'Distributed version control',
      description: 'Tracking changes to code with a full copy of its history on every machine.',
      covers: ['Git', 'Mercurial', 'Fossil', 'Darcs'],
    },
    {
      name: 'Scripting languages',
      description: 'Languages used to automate tasks and glue systems together.',
      covers: ['Python', 'Ruby', 'Perl', 'Lua', 'PHP', 'Bash and shell scripting', 'PowerShell'],
    },
    {
      name: 'Systems programming languages',
      description: 'Languages that give close control over memory and performance.',
      covers: ['C', 'C++', 'Rust', 'Go', 'Assembly'],
    },
    {
      name: 'CSS frameworks and preprocessors',
      description: 'Tools that make writing and organising style sheets faster.',
      covers: ['Tailwind CSS', 'Bootstrap', 'Sass and SCSS', 'Less', 'PostCSS'],
    },
  ],
  engineering: [
    {
      name: 'Delivery automation',
      description: 'Automating the path from a code change to running software.',
      covers: ['Continuous integration', 'Continuous delivery', 'Deployment automation', 'Build automation', 'Release automation', 'Infrastructure as code'],
    },
    {
      name: 'Agile engineering practices',
      description: 'Day-to-day team practices for building software in small, tested steps.',
      covers: ['Test-driven development', 'Behaviour-driven development', 'Pair programming', 'Mob programming', 'Kanban', 'Trunk-based development'],
    },
    {
      name: 'Software testing',
      description: 'Checking that software works at every level, from units to whole journeys.',
      covers: ['Unit testing', 'Integration testing', 'End-to-end testing', 'Acceptance testing', 'Regression testing', 'Smoke testing', 'Exploratory testing', 'Test automation'],
    },
    {
      name: 'Non-functional testing',
      description: 'Checking qualities such as speed, safety and ease of use rather than features.',
      covers: ['Performance testing', 'Load and stress testing', 'Security testing', 'Accessibility testing', 'Usability testing', 'Fuzz testing'],
    },
    {
      name: 'Domain modelling',
      description: 'Shaping software around the language and boundaries of the business domain.',
      covers: ['Domain-driven design', 'Bounded contexts', 'Ubiquitous language', 'Context mapping', 'Aggregates and domain events', 'Event storming'],
    },
    {
      name: 'Architectural styles',
      description: 'The main ways of dividing a system into deployable parts.',
      covers: ['Microservices architecture', 'Event-driven architecture', 'Serverless architecture', 'Service-oriented architecture', 'Modular monolith', 'Cell-based architecture'],
    },
    {
      name: 'Resilience patterns',
      description: 'Patterns that keep a system working when parts of it fail or are overloaded.',
      covers: ['Circuit breaker pattern', 'Bulkhead pattern', 'Retry pattern', 'Rate limiting', 'Design for failure', 'Cascading failure prevention', 'Handling overload'],
    },
    {
      name: 'Messaging and integration patterns',
      description: 'Patterns for passing work and data reliably between services.',
      covers: ['Saga pattern', 'Transactional outbox', 'Publisher-subscriber', 'Competing consumers', 'Claim check pattern', 'Idempotent consumer', 'Asynchronous request-reply'],
    },
    {
      name: 'Site reliability engineering',
      description: 'Running services reliably using targets, automation and learning from incidents.',
      covers: ['Service level objectives', 'Error budgets', 'Eliminating toil', 'Incident management', 'Blameless postmortems', 'On-call practices', 'Capacity planning'],
    },
    {
      name: 'Observability practices',
      description: 'Knowing what a running system is doing from its metrics, logs and traces.',
      covers: ['Monitoring and observability', 'Distributed tracing', 'Log aggregation', 'Alerting on service levels', 'Proactive failure notification'],
    },
    {
      name: 'Application security practices',
      description: 'Designing and building software so it resists attack.',
      covers: ['OWASP Top 10', 'Threat modeling', 'Injection prevention', 'Access control', 'Cryptography', 'Secure design', 'Secure configuration'],
    },
    {
      name: 'SOLID principles',
      description: 'Five object-oriented design principles for code that is easy to change.',
      covers: ['Single responsibility principle', 'Open-closed principle', 'Liskov substitution principle', 'Interface segregation principle', 'Dependency inversion principle'],
    },
    {
      name: 'Object-oriented design patterns',
      description: 'Named, reusable solutions to common code design problems.',
      covers: ['Factory patterns', 'Builder pattern', 'Adapter pattern', 'Decorator pattern', 'Facade pattern', 'Observer pattern', 'Strategy pattern', 'Command pattern'],
    },
    {
      name: 'Twelve-factor practices',
      description: 'Practices for building apps that run well as cloud services.',
      covers: ['One codebase, many deploys', 'Declared dependencies', 'Configuration in the environment', 'Attached backing services', 'Stateless processes', 'Port binding', 'Disposability', 'Dev and prod parity', 'Logs as event streams'],
    },
    {
      name: 'Code quality and refactoring',
      description: 'Keeping code readable and cheap to change over time.',
      covers: ['Refactoring', 'Code smells', 'Technical debt management', 'Static analysis', 'Clean Code', 'Legacy code modernisation'],
    },
    {
      name: 'Decoupled application architectures',
      description: 'Architectures that keep business rules independent of frameworks and infrastructure.',
      covers: ['Hexagonal architecture', 'Clean Architecture', 'Onion Architecture', 'Vertical Slice Architecture'],
    },
  ],
  interpersonal: [
    {
      name: 'Coaching and mentoring skills',
      description: 'Helping other people grow through guidance, questions and example.',
      covers: ['Coaching', 'Mentoring', 'Reverse mentoring', 'Peer mentoring', 'Instructing'],
    },
    {
      name: 'Team leadership',
      description: 'Setting direction and bringing a team with you.',
      covers: ['Leadership', 'Transformational leadership', 'Inclusive leadership', 'Delegation', 'Strategic vision', 'Building trust'],
    },
    {
      name: 'Facilitating groups',
      description: 'Helping a group reach a useful result in meetings and workshops.',
      covers: ['Facilitation', 'Running effective meetings', 'Setting ground rules'],
    },
    {
      name: 'Working as a team',
      description: 'Organising and coordinating work with colleagues.',
      covers: ['Self-managing teams', 'Working transparently', 'Inspecting and adapting', 'Coordination', 'Collaborative problem solving', 'Planning and task coordination'],
    },
    {
      name: 'Inclusive team culture',
      description: 'Creating a team where people feel safe to contribute and be themselves.',
      covers: ['Psychological safety', 'Speaking up', 'Learning from mistakes', 'Equity and inclusion', 'Open-mindedness'],
    },
    {
      name: 'Customer and stakeholder focus',
      description: 'Understanding and serving the people your work is for.',
      covers: ['Gathering customer feedback', 'User-centric focus', 'Stakeholder collaboration', 'Service orientation'],
    },
    {
      name: 'Spoken and written communication',
      description: 'Getting ideas across clearly in speech and writing.',
      covers: ['Oral expression', 'Written expression', 'Public speaking', 'Professional writing', 'Storytelling', 'Tailoring a message to its audience'],
    },
    {
      name: 'Listening and questioning',
      description: 'Taking in what others say and drawing out more.',
      covers: ['Active listening', 'Paraphrasing and summarising', 'Asking open questions', 'Understanding what you hear and read'],
    },
    {
      name: 'Analytical thinking',
      description: 'Breaking problems down and reasoning about them carefully.',
      covers: ['Critical thinking', 'Systems analysis', 'Systems evaluation', 'Deductive reasoning', 'Inductive reasoning'],
    },
    {
      name: 'Creative thinking',
      description: 'Producing new and useful ideas.',
      covers: ['Creativity', 'Originality', 'Fluency of ideas', 'Problem sensitivity'],
    },
    {
      name: 'Personal organisation',
      description: 'Managing your own time, priorities and plans.',
      covers: ['Time management', 'Prioritisation', 'Reviewing your plans regularly', 'Self-management'],
    },
    {
      name: 'Continuous learning',
      description: 'Keeping your skills and knowledge growing.',
      covers: ['Lifelong learning', 'Learning and development', 'Improvement mindset', 'Metacognition', 'Career and self-development'],
    },
    {
      name: 'Negotiation and conflict handling',
      description: 'Reaching agreement and resolving disagreements well.',
      covers: ['Negotiation', 'Conflict resolution', 'Mediation', 'De-escalating disagreements', 'Win-win negotiation', 'Compromising'],
    },
    {
      name: 'Emotional awareness and regulation',
      description: 'Noticing and managing feelings, your own and other people’s.',
      covers: ['Emotional intelligence', 'Empathy', 'Self-awareness', 'Self-regulation', 'Perceiving emotions', 'Understanding emotions', 'Managing emotions'],
    },
    {
      name: 'Belbin team roles',
      description: 'Playing the nine roles that Belbin found teams need.',
      covers: [
        'Generating ideas (Plant)',
        'Networking outside the team (Resource Investigator)',
        'Chairing and delegating (Co-ordinator)',
        'Driving the team on (Shaper)',
        'Analysing options impartially (Monitor Evaluator)',
        'Smoothing conflict (Teamworker)',
        'Turning ideas into action (Implementer)',
        'Finishing carefully (Completer Finisher)',
        'Deep specialist expertise (Specialist)',
      ],
    },
  ],
  ai: [
    {
      name: 'AI coding assistants',
      description: 'AI tools that write, change and review code alongside you.',
      covers: ['Claude Code', 'OpenAI Codex', 'GitHub Copilot', 'GitHub Copilot CLI', 'Gemini CLI', 'OpenCode', 'Kilo Code'],
    },
    {
      name: 'AI model providers',
      description: 'Companies that build and offer large language models.',
      covers: ['Anthropic', 'OpenAI', 'Google AI', 'Microsoft AI', 'DeepSeek', 'Mistral AI', 'xAI', 'Meta AI'],
    },
    {
      name: 'Open-weight model families',
      description: 'Language models whose trained weights can be downloaded and run yourself.',
      covers: ['OpenAI gpt-oss', 'Meta Llama', 'NVIDIA Nemotron', 'Alibaba Qwen', 'DeepSeek'],
    },
    {
      name: 'Model Context Protocol (MCP)',
      description: 'The open protocol that lets AI applications connect to tools and data.',
      covers: ['Model Context Protocol servers', 'MCP tools', 'MCP resources', 'MCP prompts', 'MCP elicitation'],
    },
    {
      name: 'Agent design and orchestration',
      description: 'Designing AI agents and making several of them work together.',
      covers: ['Agent planning', 'Agent memory', 'Multi-agent systems', 'Orchestrating agents', 'Subagents for better context management', 'Goal-based and utility-based agents'],
    },
    {
      name: 'Model serving and inference',
      description: 'Running models and exposing them to applications, locally or hosted.',
      covers: ['vLLM', 'SGLang', 'llama.cpp', 'KServe', 'LiteLLM', 'OpenRouter', 'Groq', 'Cerebras', 'Fireworks AI'],
    },
    {
      name: 'Evaluating AI systems',
      description: 'Measuring whether a model or AI feature does what you need.',
      covers: ['Evaluating with test sets', 'LLM-as-judge evaluation', 'Human evaluation of AI outputs', 'Promptfoo', 'Comparing models with benchmarks and rankings', 'Continuous evaluation of AI behaviour'],
    },
    {
      name: 'Prompt engineering techniques',
      description: 'Ways of wording requests so a model gives better results.',
      covers: ['Prompt design', 'Few-shot prompting', 'Chain-of-thought prompting', 'Self-consistency', 'Tree-of-thought prompting', 'Role assignment'],
    },
    {
      name: 'Search and retrieval for AI',
      description: 'Finding relevant information to give a model, using embeddings and indexes.',
      covers: ['Embeddings', 'Vector databases', 'Chunking strategies', 'Hybrid search', 'Re-ranking', 'Metadata filtering', 'Approximate nearest neighbour search'],
    },
    {
      name: 'Model fine-tuning methods',
      description: 'Ways of adapting a trained model to a task or style.',
      covers: ['Fine-tuning', 'LoRA', 'Parameter-efficient fine-tuning', 'Supervised fine-tuning', 'Direct preference optimisation', 'Reinforcement learning from human feedback'],
    },
    {
      name: 'LLM application security',
      description: 'Defending applications built on language models against misuse and leaks.',
      covers: ['Preventing prompt injection', 'Preventing sensitive information disclosure', 'LLM supply chain security', 'Limiting excessive agency', 'Improper output handling', 'Preventing system prompt leakage', 'AI red teaming'],
    },
    {
      name: 'AI risk and governance',
      description: 'Managing the risks of AI and being accountable for how it is used.',
      covers: ['Govern, map, measure and manage AI risk', 'Trustworthy AI', 'Responsible AI practices', 'Safety evaluations and incident reporting', 'Publishing model specifications'],
    },
    {
      name: 'Operating ML and LLM systems',
      description: 'Deploying, monitoring and maintaining machine learning in production.',
      covers: ['MLOps', 'LLMOps', 'Model monitoring', 'Machine learning pipelines', 'Versioning data, models and code', 'Tracing LLM requests', 'Reproducible machine learning'],
    },
    {
      name: 'AI-assisted development practices',
      description: 'Ways of working that put AI into everyday software delivery safely.',
      covers: ['AI-assisted coding', 'Agentic development', 'Vibe coding', 'Reviewing AI-generated code', 'Giving AI the right context', 'Human-in-the-loop review'],
    },
  ],
}

export function broadTermNames(section: Section): string[] {
  return BROAD_TERMS[section].map((t) => t.name)
}

/** The definition shown for a broader term: its description and the options it covers, in two sentences. */
export function broadTermDefinition(term: BroadTerm): string {
  return `${term.description} A broader term that does not select the options it covers, which are listed under their own headings: ${term.covers.join(', ')}.`
}
