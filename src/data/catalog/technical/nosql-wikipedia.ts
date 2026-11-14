import type { SourceContribution } from '../types'

/**
 * Wikipedia, "NoSQL" (https://en.wikipedia.org/wiki/NoSQL, CC BY-SA 4.0, edited 8 November 2026).
 * Read: its list of NoSQL databases by data model. Technologies are offered when the page lists them as maintained (latest release 2024 or later where the page gives dates) and they are widely used; discontinued items are left out. Part of some pages came through the fetch tool's summary rather than verbatim. Descriptions are written for this app.
 */
export const nosqlWikipedia: SourceContribution = {
  source: 'nosql-wikipedia',
  checked: '2026-11-14',
  categories: {
    Databases: {
      MongoDB: '',
      Redis: '',
      DynamoDB: '',
      Elasticsearch: '',
      'Apache Cassandra': 'A distributed wide-column database for large, always-on workloads.',
      ScyllaDB: 'A high-performance database compatible with Cassandra.',
      Couchbase: 'A distributed document and key-value database with caching.',
      'Apache CouchDB': 'A document database that stores JSON and syncs between devices.',
      Neo4j: 'A graph database for connected data.',
      ArangoDB: 'A multi-model database for documents, graphs and key-value data.',
      'Amazon Neptune': 'A managed graph database service from AWS.',
      Memcached: 'A simple in-memory cache for speeding up applications.',
      Hazelcast: 'An in-memory data grid and streaming platform.',
      'Apache Ignite': 'A distributed in-memory computing platform and database.',
      'Apache HBase': 'A wide-column database on Hadoop for very large tables.',
      'Google Cloud Firestore': 'Google’s managed document database for apps.',
      'Google Cloud Bigtable': 'Google’s managed wide-column database for very large workloads.',
      RavenDB: 'A document database with built-in transactions and indexing.',
      Aerospike: 'A fast key-value and document database for real-time workloads.',
      FoundationDB: 'A distributed key-value store with strong transactions.',
    },
  },
}
