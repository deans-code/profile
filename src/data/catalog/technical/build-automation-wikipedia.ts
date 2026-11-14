import type { SourceContribution } from '../types'

/**
 * Wikipedia, "List of build automation software" (https://en.wikipedia.org/wiki/List_of_build_automation_software, CC BY-SA 4.0, edited 3 March 2026).
 * Read: its build sequencing, meta-build and continuous integration lists. Technologies are offered when the page lists them as maintained (latest release 2024 or later where the page gives dates) and they are widely used; discontinued items are left out. Part of some pages came through the fetch tool's summary rather than verbatim. Descriptions are written for this app.
 */
export const buildAutomationWikipedia: SourceContribution = {
  source: 'build-automation-wikipedia',
  checked: '2026-11-14',
  categories: {
    'Containers, infrastructure and delivery': {
      'GitHub Actions': '',
      Jenkins: '',
      TeamCity: '',
      'GitLab CI/CD': '',
      GoCD: '',
      'Travis CI': '',
      Spinnaker: 'A multi-cloud continuous delivery platform.',
      'Bitbucket Pipelines': 'CI/CD built into Bitbucket.',
      Buildbot: '',
    },
    'Package managers': {
      Cargo: '',
    },
    'Build tools': {
      Make: '',
      CMake: '',
      Ninja: '',
      Maven: '',
      Gradle: '',
      MSBuild: '',
      Bazel: 'Google’s build system for large, multi-language codebases.',
      Buck: 'Meta’s fast build system.',
      Meson: 'A fast, user-friendly build system, widely used for C and C++.',
      Rake: 'Ruby’s build and task tool.',
      sbt: 'The standard build tool for Scala.',
      'Apache Ant': 'An older XML-based Java build tool.',
      SCons: 'A Python-based build tool.',
      Grunt: 'A JavaScript task runner.',
      Gulp: 'A JavaScript streaming build tool.',
      Leiningen: 'A build and project tool for Clojure.',
      Mix: 'The build tool for Elixir.',
    },
  },
}
