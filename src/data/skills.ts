export type Section = 'technical' | 'engineering' | 'interpersonal'

export const SECTIONS: Section[] = ['technical', 'engineering', 'interpersonal']

export const SECTION_LABELS: Record<Section, string> = {
  technical: 'Technical development',
  engineering: 'Engineering',
  interpersonal: 'Interpersonal',
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
      skills: ['SQL', 'PostgreSQL', 'MySQL', 'SQL Server', 'MongoDB', 'Redis', 'Data modelling', 'Elasticsearch'],
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
      category: 'AI and machine learning',
      skills: ['Machine learning', 'LLM application development', 'Prompt engineering', 'Data analysis'],
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
}

export function catalogSkillNames(section: Section): string[] {
  return CATALOGS[section].flatMap((c) => c.skills)
}
