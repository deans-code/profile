import type { SourceContribution } from '../types'

/**
 * Wikipedia, "List of single sign-on implementations" (https://en.wikipedia.org/wiki/List_of_single_sign-on_implementations, CC BY-SA 4.0, edited 2 June 2026).
 * Read: its list of single sign-on products. Technologies are offered when the page lists them as maintained (latest release 2024 or later where the page gives dates) and they are widely used; discontinued items are left out. Part of some pages came through the fetch tool's summary rather than verbatim. Descriptions are written for this app.
 */
export const singleSignOnWikipedia: SourceContribution = {
  source: 'single-sign-on-wikipedia',
  checked: '2026-11-14',
  categories: {
    'Identity and access': {
      Okta: '',
      Keycloak: '',
      'Microsoft Entra ID': 'Microsoft’s cloud identity and single sign-on service.',
      'Active Directory Federation Services': 'Microsoft’s service for federated single sign-on on Windows.',
      Shibboleth: 'Open-source federated single sign-on, common in education.',
      'Apereo CAS': 'An open-source central authentication service for single sign-on.',
      'WSO2 Identity Server': 'An open-source identity and access management server.',
      OneLogin: 'A cloud identity and single sign-on service.',
      FreeIPA: 'An open-source identity management system for Linux environments.',
    },
  },
}
