import type { SourceContribution } from '../types'

/**
 * Wikipedia, "Vector database" (https://en.wikipedia.org/wiki/Vector_database, CC BY-SA 4.0, edited 7 November 2026).
 * Read: index techniques, retrieval modes and uses. Part of the page came through the fetch tool's summary rather than verbatim. Descriptions are written for this app; no article text is copied.
 */
export const vectorDatabaseWikipedia: SourceContribution = {
  source: 'vector-database-wikipedia',
  checked: '2026-11-14',
  categories: {
    'Retrieval and data for AI': {
      'Retrieval-augmented generation': '',
      Embeddings: '',
      'Vector databases': '',
      'Approximate nearest neighbour search': '',
      'Hybrid search': '',
      'Metadata filtering': 'Narrowing a vector search using attributes such as date, author or type.',
    },
  },
}
