import type { SourceContribution } from '../types'

/**
 * Octoverse 2026, GitHub (published 28 October 2026). No reuse terms stated, so linked and credited only.
 * Credited here: the top languages by monthly contributors (TypeScript, Python, JavaScript, C#, Java, Shell, PHP, Go,
 * HCL, C++), Rust as the fastest-growing by percentage, GitHub Actions and Dependabot (reported at scale), and the
 * Godot game engine, named in the report. AI tools and projects are credited on the AI engineering tab.
 */
export const octoverse2026Technical: SourceContribution = {
  source: 'octoverse-2026',
  checked: '2026-11-14',
  categories: {
    'Containers, infrastructure and delivery': {
      'GitHub Actions': 'GitHub’s built-in service for automating builds, tests and deployments from a repository.',
      Dependabot: 'A GitHub service that opens pull requests to keep a project’s dependencies up to date and secure.',
    },
    Languages: {
      JavaScript: '',
      TypeScript: '',
      Python: '',
      Java: '',
      'C#': '',
      Go: '',
      Rust: '',
      'C++': '',
      PHP: '',
      'Bash and shell scripting': '',
      HCL: 'HashiCorp Configuration Language, used to describe infrastructure in tools such as Terraform.',
    },
    'Game development and graphics': {
      Godot: 'A free, open-source game engine for 2D and 3D games.',
    },
  },
}
