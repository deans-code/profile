import type { SourceContribution } from '../types'

/**
 * Wikipedia, "List of unit testing frameworks" (https://en.wikipedia.org/wiki/List_of_unit_testing_frameworks, CC BY-SA 4.0, edit date not shown on the text read).
 * Read: the listed frameworks for the most widely used languages (the page was read verbatim only up to C++, with the rest summarised and the last part unread). Technologies are offered when the page lists them as maintained (latest release 2024 or later where the page gives dates) and they are widely used; discontinued items are left out. Part of some pages came through the fetch tool's summary rather than verbatim. Descriptions are written for this app.
 */
export const unitTestingFrameworksWikipedia: SourceContribution = {
  source: 'unit-testing-frameworks-wikipedia',
  checked: '2026-11-14',
  categories: {
    'Testing and code quality': {
      Jest: '',
      Vitest: '',
      Mocha: '',
      Selenium: '',
      pytest: '',
      JUnit: '',
      'xUnit.net': '',
      NUnit: '',
      Testcontainers: '',
      TestNG: 'A Java testing framework with flexible test configuration.',
      Mockito: 'A mocking library for Java tests.',
      AssertJ: 'A fluent assertion library for Java.',
      Hamcrest: 'A library of matchers for writing readable assertions.',
      Jasmine: 'A behaviour-driven testing framework for JavaScript.',
      AVA: 'A concurrent test runner for Node.js.',
      QUnit: 'A JavaScript unit testing framework.',
      Chai: 'An assertion library for JavaScript tests.',
      'Sinon.js': 'Test spies, stubs and mocks for JavaScript.',
      'fast-check': 'Property-based testing for JavaScript and TypeScript.',
      PHPUnit: 'The standard unit testing framework for PHP.',
      Pest: 'An elegant testing framework for PHP.',
      Codeception: 'A PHP framework for unit, functional and acceptance tests.',
      RSpec: 'A behaviour-driven testing framework for Ruby.',
      Minitest: 'Ruby’s lightweight built-in testing framework.',
      Catch2: 'A modern test framework for C++.',
      GoogleTest: 'Google’s C++ testing and mocking framework.',
      'Boost.Test': 'The unit testing framework in the Boost C++ libraries.',
      MSTest: 'Microsoft’s test framework for .NET.',
      Moq: 'A mocking library for .NET.',
      XCTest: 'Apple’s testing framework for Swift and Objective-C.',
      testthat: 'A unit testing package for R.',
      ScalaTest: 'A flexible testing tool for Scala and Java.',
      Spock: 'A testing and specification framework for Java and Groovy.',
      Pester: 'The testing framework for PowerShell.',
      QuickCheck: 'Property-based testing that originated in Haskell.',
    },
  },
}
