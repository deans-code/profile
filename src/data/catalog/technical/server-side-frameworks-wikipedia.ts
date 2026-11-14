import type { SourceContribution } from '../types'

/**
 * Wikipedia, "Comparison of server-side web frameworks" (https://en.wikipedia.org/wiki/Comparison_of_server-side_web_frameworks, CC BY-SA 4.0, edited 12 November 2026).
 * Read: the frameworks read verbatim through the first part of its PHP table (the rest came through a summary and is not used). Technologies are offered when the page lists them as maintained (latest release 2024 or later where the page gives dates) and they are widely used; discontinued items are left out. Part of some pages came through the fetch tool's summary rather than verbatim. Descriptions are written for this app.
 */
export const serverSideFrameworksWikipedia: SourceContribution = {
  source: 'server-side-frameworks-wikipedia',
  checked: '2026-11-14',
  categories: {
    'Web frameworks and technologies': {
      'Next.js': '',
      SvelteKit: '',
      Express: '',
      NestJS: '',
      Phoenix: 'A web framework for Elixir.',
      Fastify: 'A fast, low-overhead Node.js web framework.',
      Nuxt: 'A framework for building full-stack apps with Vue.',
      Remix: 'A full-stack web framework built on web standards.',
      Meteor: 'A full-stack JavaScript platform for web and mobile apps.',
      'Sails.js': 'A Node.js MVC framework for data-driven APIs.',
      'Apache Struts': 'A Java framework for web applications.',
      'Spring Framework': 'The Java application framework behind Spring Boot.',
      'Play Framework': 'A web framework for Java and Scala.',
      Vaadin: 'A Java framework for building web user interfaces.',
      Grails: 'A Groovy web framework built on Spring Boot.',
      CakePHP: 'A PHP framework with conventions for rapid development.',
      CodeIgniter: 'A small, fast PHP framework.',
      'Apache Wicket': 'A component-based Java web framework.',
    },
  },
}
