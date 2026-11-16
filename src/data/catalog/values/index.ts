import { mergeContributions } from '../types'
import { agileManifestoValues } from './agile-manifesto-2001'
import { extremeProgrammingValues } from './extreme-programming-wikipedia'
import { leanSoftwareValues } from './lean-software-development-wikipedia'
import { outlineOfSelfValues } from './outline-of-self-wikipedia'
import { rokeachValueSurvey } from './rokeach-value-survey'
import { schwartzBasicValues } from './schwartz-basic-values'
import { scrumGuideValues } from './scrum-guide-2020'
import { selfDeterminationValues } from './self-determination-theory-wikipedia'
import { strengthscopeStrengths } from './strengthscope-strengths'
import { valueEthicsValues } from './value-ethics-wikipedia'
import { workEthicValues } from './work-ethic-wikipedia'

/** Sources are merged in the order they are read; add each new source's file here. */
export const VALUES = mergeContributions([strengthscopeStrengths, schwartzBasicValues, rokeachValueSurvey, scrumGuideValues, agileManifestoValues, extremeProgrammingValues, leanSoftwareValues, workEthicValues, valueEthicsValues, outlineOfSelfValues, selfDeterminationValues])
