import { AI } from './catalog/ai'
import { ENGINEERING } from './catalog/engineering'
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
  engineering: ENGINEERING.categories,
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
