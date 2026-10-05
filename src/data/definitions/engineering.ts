export const ENGINEERING_DEFINITIONS: Record<string, string> = {
  // Architecture and design
  'System design': 'Planning how the components of a system fit together to meet requirements for function, scale and reliability.',
  'Domain-driven design': 'Structuring software around the business domain, using a shared language between developers and experts.',
  'Microservices architecture': 'Building an application as a set of small, independently deployable services.',
  'Event-driven architecture': 'Designing systems whose components communicate by producing and reacting to events.',
  'Design patterns': 'Reusable, proven solutions to common problems in software design.',
  'Clean code': 'Writing code that is easy to read, understand and change.',
  'API design': 'Designing interfaces that are consistent, well documented and easy for other developers to use.',
  'Data architecture': 'Deciding how data is stored, moved and governed across an organisation’s systems.',

  // Quality and testing
  'Unit testing': 'Testing small pieces of code, such as functions or classes, in isolation.',
  'Integration testing': 'Testing that separate components or services work correctly together.',
  'End-to-end testing': 'Testing a complete user journey through the whole system as a real user would.',
  'Test-driven development': 'Writing a failing test first, then the code to pass it, then improving the design.',
  'Code review': 'Examining teammates’ changes to catch problems, share knowledge and maintain standards.',
  'Static analysis': 'Using tools that inspect code without running it to find bugs, vulnerabilities and style issues.',
  'Performance testing': 'Measuring how a system behaves under load to find slow spots and limits.',
  'Exploratory testing': 'Investigating software freely, without a script, to uncover problems that planned tests miss.',

  // Reliability and operations
  Observability: 'Instrumenting systems with logs, metrics and traces so you can understand what they are doing.',
  'Monitoring and alerting': 'Watching the health of systems and notifying the right people when something goes wrong.',
  'Incident response': 'Detecting, handling and learning from production problems quickly and calmly.',
  Debugging: 'Systematically finding and fixing the cause of defects in software.',
  'Capacity planning': 'Predicting the resources a system will need so it keeps performing as demand grows.',
  'Disaster recovery': 'Planning and testing how to restore systems and data after a serious failure.',
  'Site reliability engineering': 'Applying software engineering to operations, with targets for reliability and automation of toil.',

  // Security
  'Threat modelling': 'Identifying how a system could be attacked and deciding how to defend against it.',
  'Secure coding': 'Writing code that avoids common vulnerabilities such as injection and broken access control.',
  'Authentication and authorisation': 'Verifying who a user is and controlling what they are allowed to do.',
  'Vulnerability management': 'Finding, prioritising and fixing security weaknesses in software and infrastructure.',
  'Compliance and governance': 'Ensuring systems follow laws, standards and internal policies, and can show that they do.',

  // Performance and scale
  'Algorithms and data structures': 'Choosing efficient ways to organise data and solve problems in code.',
  'Performance optimisation': 'Measuring and improving how fast and efficiently software runs.',
  Scalability: 'Designing systems that keep working well as users, data and traffic grow.',
  Concurrency: 'Writing software that does several things at once safely, using threads, async or parallel processing.',

  // Delivery and process
  'Agile delivery': 'Delivering software in small, frequent increments and adapting to feedback.',
  Scrum: 'An agile framework that organises work into fixed-length sprints with defined roles and ceremonies.',
  Kanban: 'A flow-based method that visualises work and limits work in progress.',
  Estimation: 'Forecasting how much effort or time work will take, and being honest about uncertainty.',
  'Requirements analysis': 'Working out what users and the business actually need before building it.',
  'Technical documentation': 'Writing clear guides, references and decision records that help others use and maintain a system.',
  'Release management': 'Planning, coordinating and controlling how changes reach production.',
  Refactoring: 'Improving the internal structure of code without changing what it does.',
  'Technical debt management': 'Recognising shortcuts taken in code and planning to pay them down before they slow the team.',
}
