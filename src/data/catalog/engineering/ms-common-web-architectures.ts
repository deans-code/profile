import type { SourceContribution } from '../types'

/**
 * Microsoft Learn, "Common web application architectures" in Architect Modern Web Applications with ASP.NET Core and Azure (https://learn.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/common-web-application-architectures), dated 2021, updated 2026.
 * Read in full: the clean architecture section (application core, infrastructure and UI layers, composition root). No licence is shown, so only names of ideas are used, with descriptions written for this app.
 */
export const msCommonWebArchitectures: SourceContribution = {
  source: 'ms-common-web-architectures',
  checked: '2026-11-14',
  categories: {
    'Clean and decoupled architecture': {
      'Hexagonal architecture': '',
      'Clean Architecture': '',
      'Onion Architecture': '',
      'Independent domain model': '',
      'Externalised infrastructure': '',
      'Composition root': 'Wiring implementations to interfaces in one place at the edge of the application.',
    },
  },
}
