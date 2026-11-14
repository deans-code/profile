import { mergeContributions } from '../types'
import { rokeachValueSurvey } from './rokeach-value-survey'
import { schwartzBasicValues } from './schwartz-basic-values'
import { scrumGuideValues } from './scrum-guide-2020'
import { viaCharacterStrengths } from './via-character-strengths'

/** Sources are merged in the order they are read; add each new source's file here. */
export const VALUES = mergeContributions([viaCharacterStrengths, schwartzBasicValues, rokeachValueSurvey, scrumGuideValues])
