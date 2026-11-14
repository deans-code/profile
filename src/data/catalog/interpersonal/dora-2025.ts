import type { SourceContribution } from '../types'

/**
 * DORA capabilities catalog, State of AI-assisted Software Development 2025 (https://dora.dev/capabilities/), CC BY 4.0.
 * Its people and culture capabilities: generative organizational culture, learning culture, transformational leadership,
 * well-being, team experimentation, empowering teams to choose tools, customer feedback and user-centric focus.
 * (Job satisfaction is an outcome rather than a skill, so it is not offered.) The technical capabilities are credited
 * on the Engineering tab. Only the dora.dev pages were read, not the full report.
 */
export const dora2025Interpersonal: SourceContribution = {
  source: 'dora-2025',
  checked: '2026-11-14',
  categories: {
    'Culture and inclusion': {
      'Building a high-trust, generative culture': 'Creating a workplace where information flows freely, people share risks and failures openly, and trust is high.',
      'Fostering a learning culture': 'Encouraging people to learn from mistakes and each other, and making time and safety for growth.',
      'Supporting well-being': 'Looking after your own and your colleagues’ health, workload and sustainable pace.',
    },
    Leadership: {
      'Transformational leadership': 'Leading by setting a clear vision, inspiring and supporting people, and challenging them to grow.',
    },
    'Team practices': {
      'Team experimentation': 'Giving teams the room to try new ideas quickly, without waiting for approval, and learn from the results.',
      'Empowering teams to choose tools': 'Letting the people who do the work pick the tools and methods that suit it best.',
    },
    'Customer focus': {
      'Gathering customer feedback': 'Regularly asking users and customers what they need and how well your work serves them, and acting on the answers.',
      'User-centric focus': 'Keeping the needs and experience of users at the centre of decisions about what to build.',
    },
  },
}
