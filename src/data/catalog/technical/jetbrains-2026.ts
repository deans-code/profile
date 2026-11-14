import type { SourceContribution } from '../types'

/**
 * The State of Developer Ecosystem 2026, Tools and trends (https://devecosystem.jetbrains.com/tools-and-trends).
 * Most charts on the page do not render as text, so only technologies the page text names as in current use,
 * growing, or offered as a JetBrains IDE are credited. Languages the page says peaked around 2019–2020
 * (JavaScript, HTML/CSS, SQL, Java) are not credited from this source because that is not evidence of current use.
 * Options already added by an earlier source keep their description and gain this source.
 */
export const jetbrains2026: SourceContribution = {
  source: 'jetbrains-2026',
  checked: '2026-11-14',
  categories: {
    Languages: {
      TypeScript: '',
      Python: '',
      Rust: '',
    },
    Databases: {
      PostgreSQL: '',
      MySQL: '',
      Supabase: '',
    },
    'Cloud platforms and hosting': {
      'Amazon Web Services': '',
      'Microsoft Azure': '',
      'Google Cloud': '',
      Firebase: '',
      'Hetzner Cloud': '',
      OVHcloud: 'A European cloud provider offering servers, storage and managed services.',
      'Alibaba Cloud': 'Alibaba’s cloud platform, widely used in China and Asia.',
      'Tencent Cloud': 'Tencent’s cloud platform, widely used in China and Asia.',
    },
    'Editors and IDEs': {
      'IntelliJ IDEA': '',
      PyCharm: '',
      WebStorm: '',
      RustRover: 'JetBrains’ IDE for Rust.',
      GoLand: 'JetBrains’ IDE for Go.',
      CLion: 'JetBrains’ IDE for C and C++.',
    },
  },
}
