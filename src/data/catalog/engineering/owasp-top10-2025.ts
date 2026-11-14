import type { SourceContribution } from '../types'

/**
 * OWASP Top 10:2025 (https://top10.owasp.org/2025), licensed CC BY 3.0. The ten categories are A01 Broken Access Control,
 * A02 Security Misconfiguration, A03 Software Supply Chain Failures, A04 Cryptographic Failures, A05 Injection,
 * A06 Insecure Design, A07 Authentication Failures, A08 Software or Data Integrity Failures, A09 Security Logging and
 * Alerting Failures, A10 Mishandling of Exceptional Conditions. Each is credited as the skill of preventing that failure.
 * The pages read name no other OWASP projects, so none are added.
 */
export const owaspTop10_2025: SourceContribution = {
  source: 'owasp-top10-2025',
  checked: '2026-11-14',
  categories: {
    Security: {
      'OWASP Top 10': 'Knowing the ten most critical web application security risks, as ranked by the OWASP community, and how to guard against them.',
      'Access control': 'Making sure users can only act on the data and functions they are permitted to, and testing that the rules hold.',
      'Secure configuration': 'Setting up systems, frameworks and cloud services securely, with no unsafe defaults or unused features left on.',
      'Software supply chain security': 'Protecting the dependencies, build tools and delivery pipeline that software relies on from tampering and compromise.',
      Cryptography: 'Using encryption, hashing and key management correctly to protect data in transit and at rest.',
      'Injection prevention': 'Stopping untrusted input from being run as code or commands, for example SQL injection and cross-site scripting.',
      'Secure design': 'Considering threats and building in security controls at the design stage, not only at implementation.',
      'Authentication and session security': 'Verifying who users are and protecting sign-in, passwords and sessions from attack.',
      'Software and data integrity': 'Making sure code, updates and data have not been altered without authorisation.',
      'Security logging and alerting': 'Recording security-relevant events and raising alerts so attacks can be detected and investigated.',
      'Handling exceptional conditions safely': 'Dealing with errors and unexpected states in ways that do not expose data or leave the system insecure.',
    },
  },
}
