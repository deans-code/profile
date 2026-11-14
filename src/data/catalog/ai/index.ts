import { mergeContributions } from '../types'
import { dora2025Ai } from './dora-2025'
import { jetbrainsAi2026 } from './jetbrains-ai-2026'
import { octoverse2026Ai } from './octoverse-2026'
import { openrouterRankings2026 } from './openrouter-rankings-2026'
import { stackOverflow2026Ai } from './stack-overflow-2026'
import { stanfordAiIndex2026 } from './stanford-ai-index-2026'
import { thoughtworksRadar35 } from './thoughtworks-radar-35'

/** Sources are merged in the order they are read; add each new source's file here. */
export const AI = mergeContributions([
  stackOverflow2026Ai,
  jetbrainsAi2026,
  openrouterRankings2026,
  thoughtworksRadar35,
  stanfordAiIndex2026,
  octoverse2026Ai,
  dora2025Ai,
])
