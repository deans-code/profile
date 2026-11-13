export interface Source {
  title: string
  publisher: string
  url: string
}

/** Published reports that guided which technologies the Technical development page offers. */
export const SOURCES: Source[] = [
  {
    title: 'Stack Overflow Developer Survey 2026: Technology',
    publisher: 'Stack Overflow',
    url: 'https://survey.stackoverflow.co/2026/technology/data',
  },
  {
    title: 'The State of Developer Ecosystem 2026: Tools and trends',
    publisher: 'JetBrains',
    url: 'https://devecosystem.jetbrains.com/tools-and-trends',
  },
  {
    title: 'State of Cloud Native Development, Q1 2026',
    publisher: 'SlashData, with the Cloud Native Computing Foundation',
    url: 'https://www.cncf.io/wp-content/uploads/2026/03/State-of-Cloud-Native-Development-Q1-2026.pdf',
  },
]

export const SOURCES_NOTE =
  'These reports guided which technologies are offered. Their data is not reproduced here.'
