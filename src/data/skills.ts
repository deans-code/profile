import { AI } from './catalog/ai'
import { TECHNICAL } from './catalog/technical'

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
  technical: TECHNICAL.categories,
  engineering: [
    {
      category: 'Architecture and design',
      skills: [
        'System design',
        'Distributed systems',
        'Domain-driven design',
        'Microservices architecture',
        'Event-driven architecture',
        'CQRS and event sourcing',
        'Design patterns',
        'Clean code',
        'API design',
        'Data architecture',
        'Resilience patterns',
        'Database migrations',
      ],
    },
    {
      category: 'Quality and testing',
      skills: [
        'Unit testing',
        'Integration testing',
        'Contract testing',
        'End-to-end testing',
        'Test-driven development',
        'Property-based testing',
        'Code review',
        'Static analysis',
        'Performance testing',
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
        'Chaos engineering',
        'Zero-downtime deployments',
        'Site reliability engineering',
        'Platform engineering',
      ],
    },
    {
      category: 'Security',
      skills: [
        'Threat modelling',
        'Secure coding',
        'OWASP Top 10',
        'Authentication and authorisation',
        'Vulnerability management',
        'Secrets management',
        'Encryption and key management',
        'Compliance and governance',
        'Supply chain security',
      ],
    },
    {
      category: 'Performance and scale',
      skills: ['Algorithms and data structures', 'Performance optimisation', 'Scalability', 'Concurrency', 'Caching strategies', 'Query tuning', 'Cost optimisation (FinOps)'],
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
        'Feature flags',
        'Trunk-based development',
        'Refactoring',
        'Technical debt management',
        'Architecture decision records',
        'Dependency management',
        'Legacy system modernisation',
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
        'Difficult conversations',
        'Asynchronous communication',
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
        'Building trust',
        'Empathy',
        'Psychological safety',
        'Pair and mob programming',
        'Knowledge sharing',
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
        'Change management',
        'Managing up',
        'Performance management',
        'Onboarding new team members',
      ],
    },
    {
      category: 'Thinking and problem solving',
      skills: ['Problem solving', 'Critical thinking', 'Creativity', 'Analytical thinking', 'Product thinking', 'Systems thinking', 'Root cause analysis', 'First-principles thinking'],
    },
    {
      category: 'Personal effectiveness',
      skills: [
        'Time management',
        'Prioritisation',
        'Adaptability',
        'Resilience',
        'Continuous learning',
        'Emotional intelligence',
        'Accountability',
      ],
    },
    {
      category: 'Business awareness',
      skills: ['Customer focus', 'Business acumen', ],
    },
  ],
  ai: AI.categories,
}

export function catalogSkillNames(section: Section): string[] {
  return CATALOGS[section].flatMap((c) => c.skills)
}
