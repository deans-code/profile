import { mergeContributions } from '../types'
import { dora2025Interpersonal } from './dora-2025'
import { naceCareerReadiness } from './nace-career-readiness'
import { scrumGuide2020 } from './scrum-guide-2020'
import { sfia9 } from './sfia-9'

/** Sources are merged in the order they are read; add each new source's file here. */
export const INTERPERSONAL = mergeContributions([dora2025Interpersonal, naceCareerReadiness, sfia9, scrumGuide2020])
