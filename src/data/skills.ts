export type Section = 'technical' | 'engineering' | 'interpersonal' | 'ai'

export const SECTIONS: Section[] = ['technical', 'engineering', 'interpersonal', 'ai']

export const SECTION_LABELS: Record<Section, string> = {
  technical: 'Technical development',
  engineering: 'Engineering',
  interpersonal: 'Interpersonal',
  ai: 'AI engineering',
}

export interface SkillCategory {
  category: string
  skills: string[]
}

export const CATALOGS: Record<Section, SkillCategory[]> = {
  technical: [
    {
      category: 'Languages',
      skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'Go', 'Rust', 'C++', 'Kotlin', 'Swift', 'PHP', 'Ruby'],
    },
    {
      category: 'Web and frontend',
      skills: ['HTML', 'CSS', 'React', 'Angular', 'Vue', 'Web accessibility', 'Responsive design', 'Web performance'],
    },
    {
      category: 'Backend and APIs',
      skills: ['Node.js', '.NET', 'Spring Boot', 'Django', 'REST APIs', 'GraphQL', 'gRPC', 'WebSockets'],
    },
    {
      category: 'Data',
      skills: [
        'SQL',
        'PostgreSQL',
        'MySQL',
        'SQL Server',
        'MongoDB',
        'Redis',
        'Data modelling',
        'Elasticsearch',
        'Vector databases',
        'Data analysis',
      ],
    },
    {
      category: 'Data tooling and pipelines',
      skills: [
        'NumPy and pandas',
        'Jupyter notebooks',
        'Data pipelines',
        'Apache Airflow',
        'Apache Kafka',
        'Message queues',
        'Apache Spark',
        'Parquet and data formats',
      ],
    },
    {
      category: 'Mobile',
      skills: ['Android', 'iOS', 'React Native', 'Flutter'],
    },
    {
      category: 'Cloud and DevOps',
      skills: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD pipelines', 'Linux', 'Git', 'Shell scripting'],
    },
    {
      category: 'Compute and GPUs',
      skills: ['GPU computing', 'CUDA', 'Cloud GPU instances', 'Helm', 'Serverless', 'Infrastructure as code'],
    },
    {
      category: 'Observability tooling',
      skills: ['Observability platforms', 'Prometheus and Grafana', 'OpenTelemetry', 'Log aggregation', 'Distributed tracing'],
    },
  ],
  engineering: [
    {
      category: 'Architecture and design',
      skills: [
        'System design',
        'Domain-driven design',
        'Microservices architecture',
        'Event-driven architecture',
        'Design patterns',
        'Clean code',
        'API design',
        'Data architecture',
      ],
    },
    {
      category: 'Quality and testing',
      skills: [
        'Unit testing',
        'Integration testing',
        'End-to-end testing',
        'Test-driven development',
        'Code review',
        'Static analysis',
        'Performance testing',
        'Exploratory testing',
      ],
    },
    {
      category: 'Reliability and operations',
      skills: [
        'Observability',
        'Monitoring and alerting',
        'Incident response',
        'Debugging',
        'Capacity planning',
        'Disaster recovery',
        'Site reliability engineering',
      ],
    },
    {
      category: 'Security',
      skills: [
        'Threat modelling',
        'Secure coding',
        'Authentication and authorisation',
        'Vulnerability management',
        'Compliance and governance',
      ],
    },
    {
      category: 'Performance and scale',
      skills: ['Algorithms and data structures', 'Performance optimisation', 'Scalability', 'Concurrency'],
    },
    {
      category: 'Delivery and process',
      skills: [
        'Agile delivery',
        'Scrum',
        'Kanban',
        'Estimation',
        'Requirements analysis',
        'Technical documentation',
        'Release management',
        'Refactoring',
        'Technical debt management',
      ],
    },
  ],
  interpersonal: [
    {
      category: 'Communication',
      skills: [
        'Written communication',
        'Verbal communication',
        'Active listening',
        'Presentation skills',
        'Storytelling',
        'Giving feedback',
        'Receiving feedback',
        'Explaining technical concepts',
      ],
    },
    {
      category: 'Collaboration',
      skills: [
        'Teamwork',
        'Cross-functional collaboration',
        'Conflict resolution',
        'Negotiation',
        'Stakeholder management',
        'Remote collaboration',
        'Building trust'
,
        'Empathy',
      ],
    },
    {
      category: 'Leadership',
      skills: [
        'Mentoring',
        'Coaching',
        'Delegation',
        'Decision making',
        'Team leadership',
        'Influencing',
        'Facilitation',
        'Hiring and interviewing',
      ],
    },
    {
      category: 'Thinking and problem solving',
      skills: ['Problem solving', 'Critical thinking', 'Creativity', 'Analytical thinking', 'Product thinking'],
    },
    {
      category: 'Personal effectiveness',
      skills: [
        'Time management',
        'Prioritisation',
        'Adaptability',
        'Resilience',
        'Continuous learning',
        'Self-motivation',
        'Emotional intelligence',
        'Accountability',
      ],
    },
    {
      category: 'Business awareness',
      skills: ['Customer focus', 'Business acumen', 'Cultural awareness', 'Commercial awareness'],
    },
  ],
  ai: [
    {
      category: 'Approaches',
      skills: [
        'Vibe coding',
        'Spec-driven development',
        'Agentic coding',
        'AI pair programming',
        'AI-assisted test-driven development',
        'Context engineering',
        'Prompt engineering',
        'Plan-then-execute workflows',
        'Multi-agent workflows',
        'Reviewing AI-generated code',
        'AI-assisted refactoring',
        'AI-assisted debugging',
      ],
    },
    {
      category: 'Frameworks and methodologies',
      skills: [
        'Superpowers',
        'OpenSpec',
        'GitHub Spec Kit',
        'BMAD Method',
        'Agent OS',
        'Memory Bank pattern',
        'Task Master',
        'Custom team workflows',
      ],
    },
    {
      category: 'Terminal (TUI and CLI) tools',
      skills: ['Claude Code', 'Codex CLI', 'Gemini CLI', 'GitHub Copilot CLI', 'Amp', 'Qwen Code'],
    },
    {
      category: 'Desktop apps and AI-first editors',
      skills: [
        'Cursor',
        'Windsurf',
        'Zed',
        'Kiro',
        'Google Antigravity',
        'Warp',
        'Claude desktop app',
        'ChatGPT desktop app',
      ],
    },
    {
      category: 'IDE and code editor plugins',
      skills: [
        'GitHub Copilot',
        'Cline',
        'Roo Code',
        'Kilo Code',
        'Continue',
        'JetBrains AI Assistant',
        'JetBrains Junie',
        'Amazon Q Developer',
        'Gemini Code Assist',
        'Tabnine',
      ],
    },
    {
      category: 'Open-source coding tools',
      skills: ['OpenCode', 'Aider', 'Goose', 'Crush', 'OpenHands', 'Open Interpreter'],
    },
    {
      category: 'Closed-model providers',
      skills: ['Anthropic', 'OpenAI', 'Google Gemini', 'xAI', 'Mistral AI', 'Cohere'],
    },
    {
      category: 'Inference providers and gateways',
      skills: [
        'OpenRouter',
        'Fireworks AI',
        'Together AI',
        'Groq',
        'Cerebras',
        'Hugging Face Inference',
        'Replicate',
        'Baseten',
        'DeepInfra',
        'LiteLLM',
        'Amazon Bedrock',
        'Azure AI Foundry',
        'Google Vertex AI',
      ],
    },
    {
      category: 'Open-weight models',
      skills: [
        'Llama',
        'Qwen',
        'DeepSeek',
        'Gemma',
        'gpt-oss',
        'Mistral and Mixtral',
        'GLM',
        'Kimi',
        'Phi',
        'Choosing an open-weight model',
      ],
    },
    {
      category: 'Local runtimes and tools',
      skills: ['Ollama', 'llama.cpp', 'LM Studio', 'vLLM', 'LocalAI', 'Jan', 'MLX', 'llamafile', 'Open WebUI'],
    },
    {
      category: 'Local hardware and optimisation',
      skills: [
        'Running open-weight models on local hardware',
        'Apple Silicon unified memory',
        'NVIDIA consumer GPUs',
        'CPU-only inference',
        'Quantisation',
        'GGUF model format',
        'VRAM and memory sizing',
        'Context length tuning',
        'Multi-GPU and offloading',
      ],
    },
    {
      category: 'Agent extensibility',
      skills: [
        'Model Context Protocol (MCP)',
        'Agent skills',
        'Sub-agents',
        'Hooks and automation',
        'Instruction files (AGENTS.md and CLAUDE.md)',
        'Custom slash commands',
        'Plugins and marketplaces',
        'Tool and function calling',
        'Agent SDKs',
      ],
    },
    {
      category: 'Building AI applications',
      skills: [
        'LLM application development',
        'Retrieval-augmented generation (RAG)',
        'Embeddings',
        'Evals',
        'Fine-tuning',
        'Guardrails',
        'Structured outputs',
        'Agent frameworks',
        'Machine learning',
        'LLM observability',
        'Prompt caching',
        'AI safety and red teaming',
      ],
    },
  ],
}

export function catalogSkillNames(section: Section): string[] {
  return CATALOGS[section].flatMap((c) => c.skills)
}
