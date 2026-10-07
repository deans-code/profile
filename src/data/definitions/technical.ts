export const TECHNICAL_DEFINITIONS: Record<string, string> = {
  // Languages
  JavaScript: 'The programming language of the web, used for interactive pages in browsers and, via Node.js, on servers.',
  TypeScript: 'JavaScript with static types, which catches many mistakes before the code runs.',
  Python: 'A readable, general-purpose language widely used for scripting, web back ends, data analysis and machine learning.',
  Java: 'A mature, strongly typed language for large server-side, enterprise and Android applications.',
  'C#': 'A modern, strongly typed language from Microsoft, used with .NET for web, desktop, cloud and game development.',
  Go: 'A simple, fast, compiled language from Google, popular for cloud services and command-line tools.',
  Rust: 'A systems language that delivers high performance and memory safety without a garbage collector.',
  'C++': 'A powerful, low-level language used where performance and hardware control matter, such as games and embedded systems.',
  Kotlin: 'A concise, modern language that runs on the JVM and is the preferred language for Android development.',
  Swift: 'Apple’s language for building apps for iPhone, iPad, Mac and other Apple platforms.',
  PHP: 'A server-side scripting language that powers a large share of websites, including WordPress.',
  Ruby: 'An expressive, developer-friendly language best known for the Ruby on Rails web framework.',

  // Web and frontend
  HTML: 'The markup language that defines the structure and content of web pages.',
  CSS: 'The language that controls the look and layout of web pages.',
  React: 'A JavaScript library for building user interfaces from reusable components.',
  Angular: 'A full-featured TypeScript framework from Google for building large web applications.',
  Vue: 'A progressive JavaScript framework for building user interfaces, known for being approachable.',
  'Web accessibility': 'Building sites and apps that people with disabilities can use, following standards such as WCAG.',
  'Responsive design': 'Designing pages that adapt their layout to any screen size or device.',
  'Web performance': 'Making web pages load and respond quickly, through techniques such as caching, compression and lean code.',

  // Backend and APIs
  'Node.js': 'A JavaScript runtime for running code outside the browser, commonly used for web servers and tooling.',
  '.NET': 'Microsoft’s cross-platform development platform for building web, cloud, desktop and mobile applications.',
  'Spring Boot': 'A Java framework that makes it quick to build production-ready web services and applications.',
  Django: 'A batteries-included Python web framework that encourages rapid, clean development.',
  'REST APIs': 'Designing and building web services that expose resources over HTTP using standard methods and status codes.',
  GraphQL: 'A query language for APIs that lets clients request exactly the data they need.',
  gRPC: 'A high-performance framework for service-to-service calls using Protocol Buffers over HTTP/2.',
  WebSockets: 'A protocol for two-way, real-time communication between a browser and a server.',

  // Data
  SQL: 'The standard language for querying and managing data in relational databases.',
  PostgreSQL: 'A powerful, open source relational database known for reliability and rich features.',
  MySQL: 'A widely used open source relational database, common in web applications.',
  'SQL Server': 'Microsoft’s relational database management system.',
  MongoDB: 'A popular document database that stores flexible, JSON-like records.',
  Redis: 'An in-memory data store used for caching, queues and fast lookups.',
  'Data modelling': 'Designing how data is structured and related, so it is accurate, efficient and easy to use.',
  Elasticsearch: 'A search and analytics engine for fast full-text search across large amounts of data.',

  // Mobile
  Android: 'Building apps for Android devices, typically with Kotlin or Java.',
  iOS: 'Building apps for iPhone and iPad, typically with Swift.',
  'React Native': 'A framework for building native mobile apps for iOS and Android using React and JavaScript.',
  Flutter: 'Google’s toolkit for building apps for mobile, web and desktop from one Dart codebase.',

  // Cloud and DevOps
  AWS: 'Amazon Web Services, the largest cloud platform, offering computing, storage, databases and much more.',
  Azure: 'Microsoft’s cloud platform for hosting applications, data and infrastructure.',
  'Google Cloud': 'Google’s cloud platform for computing, storage, data analytics and machine learning.',
  Docker: 'A tool for packaging an application and its dependencies into portable containers.',
  Kubernetes: 'A system for automating the deployment, scaling and management of containerised applications.',
  Terraform: 'A tool for defining and managing cloud infrastructure as code.',
  'CI/CD pipelines': 'Automated pipelines that build, test and deliver code changes continuously and reliably.',
  Linux: 'The open source operating system that runs most servers and cloud workloads.',
  Git: 'The standard distributed version control system for tracking changes to code and collaborating on it.',
  'Shell scripting': 'Automating tasks by writing scripts for command-line shells such as Bash or PowerShell.',

  // Data tooling and pipelines
  'Vector databases': 'Databases that store numeric embeddings and find the closest matches quickly, used for similarity search.',
  'Data analysis': 'Exploring and interpreting data to find patterns and answer questions, using tools such as Python or SQL.',
  'NumPy and pandas': 'The core Python libraries for fast numeric arrays and for working with tables of data.',
  'Jupyter notebooks': 'Interactive documents that mix code, results and notes, widely used for exploring data and experiments.',
  'Data pipelines': 'Automated flows that collect, clean, transform and move data between systems.',
  'Apache Airflow': 'A platform for scheduling and monitoring data workflows defined as code.',
  'Apache Kafka': 'A distributed event-streaming platform for moving large volumes of data between systems in real time.',
  'Message queues': 'Services that pass messages between applications asynchronously, such as RabbitMQ or SQS.',
  'Apache Spark': 'An engine for processing very large datasets in parallel across many machines.',
  'Parquet and data formats': 'Working with efficient storage formats such as Parquet, Avro and JSON Lines for analytics and pipelines.',

  // Compute and GPUs
  'GPU computing': 'Using graphics processors for highly parallel work such as numerical computing and model training or inference.',
  CUDA: 'NVIDIA’s platform and programming model for running general-purpose code on its GPUs.',
  'Cloud GPU instances': 'Renting GPU-equipped virtual machines from a cloud provider for compute-heavy workloads.',
  Helm: 'A package manager for Kubernetes that installs and configures applications from reusable charts.',
  Serverless: 'Running code on managed platforms that scale automatically and charge only for usage, such as AWS Lambda.',
  'Infrastructure as code': 'Defining servers, networks and services in version-controlled files so environments are repeatable.',

  // Observability tooling
  'Observability platforms': 'Tools that collect metrics, logs and traces so teams can see how systems behave in production.',
  'Prometheus and Grafana': 'A popular open source pair for collecting metrics and building dashboards and alerts.',
  OpenTelemetry: 'An open standard and set of libraries for producing metrics, logs and traces from applications.',
  'Log aggregation': 'Collecting logs from many services into one searchable place, for example with Loki or the ELK stack.',
  'Distributed tracing': 'Following a single request across many services to find where time is spent or errors occur.',
}
