import type { SourceContribution } from '../types'

/**
 * Wikipedia, "Comparison of relational database management systems" (https://en.wikipedia.org/wiki/Comparison_of_relational_database_management_systems, CC BY-SA 4.0, edit date not shown on the text read).
 * Read: its general information table, with products having a latest release of 2024 or later. Technologies are offered when the page lists them as maintained (latest release 2024 or later where the page gives dates) and they are widely used; discontinued items are left out. Part of some pages came through the fetch tool's summary rather than verbatim. Descriptions are written for this app.
 */
export const rdbmsComparisonWikipedia: SourceContribution = {
  source: 'rdbms-comparison-wikipedia',
  checked: '2026-11-14',
  categories: {
    Databases: {
      PostgreSQL: '',
      SQLite: '',
      MySQL: '',
      MariaDB: '',
      'Microsoft SQL Server': '',
      Oracle: '',
      CockroachDB: 'A distributed SQL database built for resilience and scale.',
      YugabyteDB: 'A distributed, PostgreSQL-compatible SQL database.',
      TiDB: 'A distributed SQL database compatible with MySQL.',
      Firebird: 'An open-source relational database.',
      H2: 'A small Java SQL database often used in tests and embedded.',
      'IBM Db2': 'IBM’s relational database for enterprise workloads.',
    },
  },
}
