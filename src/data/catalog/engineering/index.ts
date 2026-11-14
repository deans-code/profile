import { mergeContributions } from '../types'
import { cncf2026Engineering } from './cncf-2026'
import { dora2025 } from './dora-2025'
import { octoverse2026 } from './octoverse-2026'
import { owaspTop10_2025 } from './owasp-top10-2025'
import { thoughtworksRadar35Engineering } from './thoughtworks-radar-35'

/** Sources are merged in the order they are read; add each new source's file here. */
export const ENGINEERING = mergeContributions([
  dora2025,
  owaspTop10_2025,
  thoughtworksRadar35Engineering,
  cncf2026Engineering,
  octoverse2026,
])
