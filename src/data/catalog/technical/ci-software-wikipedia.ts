import type { SourceContribution } from '../types'

/**
 * Wikipedia, "Comparison of continuous integration software" (https://en.wikipedia.org/wiki/Comparison_of_continuous_integration_software, CC BY-SA 4.0, edited 20 July 2026).
 * Read: the continuous integration products it compares. Technologies are offered when the page lists them as maintained (latest release 2024 or later where the page gives dates) and they are widely used; discontinued items are left out. Part of some pages came through the fetch tool's summary rather than verbatim. Descriptions are written for this app.
 */
export const ciSoftwareWikipedia: SourceContribution = {
  source: 'ci-software-wikipedia',
  checked: '2026-11-14',
  categories: {
    'Containers, infrastructure and delivery': {
      'GitHub Actions': '',
      Jenkins: 'A long-established open-source automation server for CI/CD.',
      TeamCity: 'JetBrains’ CI/CD server.',
      CircleCI: 'A hosted CI/CD service.',
      'GitLab CI/CD': 'The CI/CD built into GitLab.',
      Buildkite: 'A CI platform that runs builds on your own agents.',
      Bamboo: 'Atlassian’s CI/CD server.',
      GoCD: 'An open-source CD server that models pipelines.',
      Harness: 'A software delivery platform for CI/CD.',
      Semaphore: 'A hosted CI/CD service.',
      'Travis CI': 'A hosted CI service.',
      AppVeyor: 'A hosted CI service, strong on Windows builds.',
      Buildbot: 'A Python framework for automating builds and tests.',
    },
    'Version control': {
      'Azure DevOps': 'Microsoft’s hosted suite for repositories, boards and pipelines.',
    },
  },
}
