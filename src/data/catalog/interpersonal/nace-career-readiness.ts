import type { SourceContribution } from '../types'

/**
 * NACE Career Readiness Competencies (https://www.naceweb.org/career-readiness/competencies/career-readiness-defined/),
 * National Association of Colleges and Employers. The page states the materials are for non-commercial use only and
 * asks reprints to carry "Reprinted courtesy of the National Association of Colleges and Employers". Only the
 * competency names are used and the descriptions here are written for this app, so nothing is reprinted.
 * The page shows no explicit edition date; it links December 2025 materials. Eight competencies: Career and
 * Self-Development, Communication, Critical Thinking, Equity and Inclusion (marked "under review" on the page),
 * Leadership, Professionalism, Teamwork and Technology. Technology is not an interpersonal skill, so it is not offered.
 */
export const naceCareerReadiness: SourceContribution = {
  source: 'nace-career-readiness',
  checked: '2026-11-14',
  categories: {
    Communication: {
      Communication: 'Exchanging information, ideas and perspectives clearly and effectively with people inside and outside your organisation.',
    },
    'Teamwork and collaboration': {
      'Teamwork and collaboration': 'Building working relationships and contributing to shared goals while valuing different viewpoints and shared responsibility.',
    },
    Leadership: {
      Leadership: 'Recognising and using your own and your team’s strengths to achieve goals.',
    },
    'Thinking and problem solving': {
      'Critical thinking': 'Analysing information logically and in context to understand needs and decide how to respond.',
    },
    'Personal effectiveness': {
      'Career and self-development': 'Taking charge of your own growth by learning continually, knowing your strengths and weaknesses and building your network.',
      Professionalism: 'Showing reliable work habits and acting responsibly toward colleagues and the wider community.',
    },
    'Culture and inclusion': {
      'Equity and inclusion': 'Working respectfully and fairly with people of different cultures and backgrounds, and helping everyone take part.',
    },
  },
}
