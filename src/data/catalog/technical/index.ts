import { mergeContributions } from '../types'
import { cncf2026 } from './cncf-2026'
import { jetbrains2026 } from './jetbrains-2026'
import { stackOverflow2026 } from './stack-overflow-2026'

/** Sources are merged in the order they are read; add each new source's file here. */
export const TECHNICAL = mergeContributions([stackOverflow2026, jetbrains2026, cncf2026])
