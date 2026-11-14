import type { SourceContribution } from '../types'

/**
 * Wikipedia, "Retrieval-augmented generation" (https://en.wikipedia.org/wiki/Retrieval-augmented_generation, CC BY-SA 4.0, edited 14 November 2026).
 * Read: its techniques (chunking, hybrid search, re-ranking, approximate nearest neighbour search) and its risks. Part of the page came through the fetch tool's summary rather than verbatim. Descriptions are written for this app; no article text is copied.
 */
export const ragWikipedia: SourceContribution = {
  source: 'rag-wikipedia',
  checked: '2026-11-14',
  categories: {
    'Retrieval and data for AI': {
      'Retrieval-augmented generation': 'Looking up relevant documents and giving them to the model so answers are grounded in them.',
      Embeddings: 'Turning text and other content into vectors so similar things can be found.',
      'Vector databases': 'Storing and searching embeddings by similarity.',
      'Approximate nearest neighbour search': 'Finding the closest vectors quickly without comparing every one.',
      'Chunking strategies': 'Splitting documents into pieces that retrieve well, by size, meaning or structure.',
      'Hybrid search': 'Combining keyword search with vector search and reranking the results.',
      'Re-ranking': 'Reordering retrieved results so the best come first.',
      'Guarding against RAG poisoning': '',
    },
  },
}
