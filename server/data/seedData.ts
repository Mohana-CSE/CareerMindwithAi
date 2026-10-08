import { ICareerRole, IProject, ILearningResource, ICodingProblem } from '../models/types';
import { CareerRoles, Projects, LearningResources, CodingProblems } from '../models';

export const SEED_CAREER_ROLES: Omit<ICareerRole, '_id'>[] = [
  {
    title: 'Frontend Developer',
    category: 'Web Development',
    summary: 'Builds modern, accessible, high-performance web user interfaces using HTML, CSS, JavaScript, and modern frameworks like React.',
    growthRate: '+16% (Faster than average)',
    avgSalary: '$105,000 / yr',
    difficulty: 'Entry',
    requiredSkills: ['JavaScript', 'React', 'HTML', 'CSS', 'TypeScript', 'Responsive Design', 'Git'],
    optionalSkills: ['Next.js', 'Tailwind CSS', 'Redux', 'Web Performance', 'Jest', 'GraphQL'],
    learningRoadmap: [
      { stage: '1. Foundations', description: 'Core DOM manipulation, modern ES6+ JS, and CSS layout engines (Flexbox/Grid)', skills: ['HTML', 'CSS', 'JavaScript'] },
      { stage: '2. Component Architecture', description: 'State management, hooks, component lifecycles, and TypeScript', skills: ['React', 'TypeScript', 'Responsive Design'] },
      { stage: '3. Production & Tooling', description: 'Performance optimization, client routing, API caching, and testing', skills: ['Next.js', 'Tailwind CSS', 'Git'] },
    ],
    suggestedProjectIds: [],
  },
  {
    title: 'Backend Developer',
    category: 'Engineering',
    summary: 'Architects and scales server-side logic, REST & GraphQL APIs, microservices, and database systems ensuring security and performance.',
    growthRate: '+18% (High demand)',
    avgSalary: '$118,000 / yr',
    difficulty: 'Intermediate',
    requiredSkills: ['Node.js', 'Express', 'SQL', 'MongoDB', 'REST APIs', 'Git', 'Authentication'],
    optionalSkills: ['Docker', 'Redis', 'PostgreSQL', 'Microservices', 'GraphQL', 'AWS'],
    learningRoadmap: [
      { stage: '1. Runtime & Protocols', description: 'Event loops, HTTP/HTTPS specs, Node.js streams, and REST API design', skills: ['Node.js', 'Express', 'REST APIs'] },
      { stage: '2. Data Persistence', description: 'Relational vs document databases, query optimization, indexing, and ORMs', skills: ['SQL', 'MongoDB', 'PostgreSQL'] },
      { stage: '3. Scale & Security', description: 'JWT/OAuth, caching with Redis, containerization, and rate limiting', skills: ['Docker', 'Authentication', 'Redis'] },
    ],
    suggestedProjectIds: [],
  },
  {
    title: 'Full Stack Developer',
    category: 'Web Development',
    summary: 'Engineers entire end-to-end web applications bridging elegant client interfaces with robust backends and resilient databases.',
    growthRate: '+22% (Very high demand)',
    avgSalary: '$124,000 / yr',
    difficulty: 'Intermediate',
    requiredSkills: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'SQL', 'REST APIs', 'Git'],
    optionalSkills: ['TypeScript', 'Docker', 'PostgreSQL', 'Next.js', 'Tailwind CSS', 'Cloud Deployment'],
    learningRoadmap: [
      { stage: '1. Client Mastery', description: 'Build responsive SPAs with stateful React components and modern CSS', skills: ['JavaScript', 'React', 'Git'] },
      { stage: '2. Server & Data Architecture', description: 'Build REST APIs, CRUD database models, and secure authentication', skills: ['Node.js', 'Express', 'MongoDB', 'SQL'] },
      { stage: '3. Full-Stack Integration', description: 'Connect frontend with backend, handle real-time states, Docker, and CI/CD', skills: ['TypeScript', 'Docker', 'REST APIs'] },
    ],
    suggestedProjectIds: [],
  },
  {
    title: 'MERN Developer',
    category: 'Web Development',
    summary: 'Specializes in the MongoDB, Express.js, React, and Node.js ecosystem for rapid, modular JavaScript web application development.',
    growthRate: '+19%',
    avgSalary: '$112,000 / yr',
    difficulty: 'Intermediate',
    requiredSkills: ['MongoDB', 'Express', 'React', 'Node.js', 'JavaScript', 'JWT', 'REST APIs'],
    optionalSkills: ['Redux Toolkit', 'Mongoose', 'Tailwind CSS', 'TypeScript', 'Docker'],
    learningRoadmap: [
      { stage: '1. React Client Layer', description: 'Component architecture, context API, custom hooks, and Tailwind CSS', skills: ['React', 'JavaScript'] },
      { stage: '2. Express & Node Server', description: 'RESTful endpoints, middleware chains, validation, and error handlers', skills: ['Node.js', 'Express', 'REST APIs'] },
      { stage: '3. MongoDB & Mongoose', description: 'Document schemas, aggregation pipelines, and JWT security', skills: ['MongoDB', 'JWT', 'Mongoose'] },
    ],
    suggestedProjectIds: [],
  },
  {
    title: 'Java Developer',
    category: 'Enterprise Engineering',
    summary: 'Designs enterprise-grade, high-concurrency systems, microservices, and backend infrastructures using Java and Spring Boot.',
    growthRate: '+14%',
    avgSalary: '$116,000 / yr',
    difficulty: 'Intermediate',
    requiredSkills: ['Java', 'Spring Boot', 'SQL', 'OOP', 'REST APIs', 'Git', 'Maven/Gradle'],
    optionalSkills: ['Hibernate/JPA', 'Microservices', 'Docker', 'Kafka', 'PostgreSQL', 'JUnit'],
    learningRoadmap: [
      { stage: '1. Core Java & OOP', description: 'Generics, Collections framework, multithreading, and design patterns', skills: ['Java', 'OOP', 'Git'] },
      { stage: '2. Spring Boot & JPA', description: 'Dependency injection, Spring Data JPA, Hibernate, and REST controllers', skills: ['Spring Boot', 'SQL', 'REST APIs'] },
      { stage: '3. Enterprise Architecture', description: 'Kafka message brokers, Microservices orchestration, and Docker', skills: ['Microservices', 'Docker', 'Kafka'] },
    ],
    suggestedProjectIds: [],
  },
  {
    title: 'Python Developer',
    category: 'Software Engineering',
    summary: 'Builds automation pipelines, web services (FastAPI/Django), and data-driven systems leveraging Python ecosystem.',
    growthRate: '+20%',
    avgSalary: '$115,000 / yr',
    difficulty: 'Entry',
    requiredSkills: ['Python', 'FastAPI/Flask/Django', 'SQL', 'REST APIs', 'Git', 'Data Structures'],
    optionalSkills: ['Pandas', 'Docker', 'PostgreSQL', 'Celery', 'Redis', 'Unit Testing'],
    learningRoadmap: [
      { stage: '1. Python Fundamentals', description: 'Data structures, list comprehensions, generators, and async programming', skills: ['Python', 'Git', 'Data Structures'] },
      { stage: '2. Web Frameworks', description: 'FastAPI / Django REST Framework, ORM mapping, and API authentication', skills: ['FastAPI/Flask/Django', 'SQL', 'REST APIs'] },
      { stage: '3. Asynchronous Tasks & Caching', description: 'Background queues with Celery/Redis and Dockerized deployments', skills: ['Docker', 'PostgreSQL', 'Pandas'] },
    ],
    suggestedProjectIds: [],
  },
  {
    title: 'AI Engineer',
    category: 'Artificial Intelligence',
    summary: 'Integrates Large Language Models, embeddings, RAG pipelines, agents, and neural networks into scalable consumer and enterprise products.',
    growthRate: '+38% (Explosive growth)',
    avgSalary: '$148,000 / yr',
    difficulty: 'Advanced',
    requiredSkills: ['Python', 'LLMs', 'Prompt Engineering', 'LangChain/LlamaIndex', 'Vector Databases', 'REST APIs', 'Embeddings'],
    optionalSkills: ['PyTorch', 'Fine-Tuning', 'Hugging Face', 'FastAPI', 'Docker', 'TypeScript'],
    learningRoadmap: [
      { stage: '1. Python & Model Basics', description: 'Deep grounding in Python, tokenization, API clients, and prompt patterns', skills: ['Python', 'LLMs', 'Prompt Engineering'] },
      { stage: '2. Retrieval Augmented Generation', description: 'Vector stores (Pinecone/Chroma), chunking strategies, and re-ranking', skills: ['Vector Databases', 'Embeddings', 'LangChain/LlamaIndex'] },
      { stage: '3. Production AI Systems', description: 'Agentic workflows, tool use, eval frameworks, and low-latency serving', skills: ['FastAPI', 'Fine-Tuning', 'Docker'] },
    ],
    suggestedProjectIds: [],
  },
  {
    title: 'ML Engineer',
    category: 'Machine Learning',
    summary: 'Designs, trains, tests, and deploys predictive machine learning and deep learning models to production inference infrastructure.',
    growthRate: '+32%',
    avgSalary: '$142,000 / yr',
    difficulty: 'Advanced',
    requiredSkills: ['Python', 'Machine Learning', 'Scikit-Learn', 'PyTorch/TensorFlow', 'Pandas', 'NumPy', 'Math/Statistics'],
    optionalSkills: ['MLOps', 'Docker', 'Feature Stores', 'SQL', 'Kubeflow', 'Model Monitoring'],
    learningRoadmap: [
      { stage: '1. Math & Classical ML', description: 'Linear algebra, calculus, regression, decision trees, and feature engineering', skills: ['Python', 'Machine Learning', 'Scikit-Learn', 'Pandas'] },
      { stage: '2. Deep Learning Frameworks', description: 'Neural networks, CNNs, Transformers, and optimization with PyTorch', skills: ['PyTorch/TensorFlow', 'NumPy'] },
      { stage: '3. MLOps & Production', description: 'Containerized inference pipelines, drift monitoring, and automated retraining', skills: ['MLOps', 'Docker', 'SQL'] },
    ],
    suggestedProjectIds: [],
  },
  {
    title: 'Data Analyst',
    category: 'Data & Analytics',
    summary: 'Transforms raw business data into actionable dashboards, KPIs, statistical insights, and executive reports.',
    growthRate: '+17%',
    avgSalary: '$88,000 / yr',
    difficulty: 'Entry',
    requiredSkills: ['SQL', 'Excel', 'Data Visualization', 'Tableau/PowerBI', 'Python/R', 'Business Intelligence'],
    optionalSkills: ['Pandas', 'Statistics', 'Data Warehousing', 'PostgreSQL', 'A/B Testing'],
    learningRoadmap: [
      { stage: '1. SQL & Data Querying', description: 'Complex joins, window functions, CTEs, and aggregation pipelines', skills: ['SQL', 'Excel'] },
      { stage: '2. Visual Dashboards', description: 'Interactive storytelling, dashboard design in Tableau/Power BI', skills: ['Data Visualization', 'Tableau/PowerBI', 'Business Intelligence'] },
      { stage: '3. Statistical Modeling', description: 'Exploratory data analysis, hypothesis testing, and automated scripts', skills: ['Python/R', 'Pandas', 'Statistics'] },
    ],
    suggestedProjectIds: [],
  },
  {
    title: 'Data Scientist',
    category: 'Data Science',
    summary: 'Uncovers predictive trends, constructs statistical experiments, and drives strategic product insights using advanced math and modeling.',
    growthRate: '+26%',
    avgSalary: '$132,000 / yr',
    difficulty: 'Advanced',
    requiredSkills: ['Python', 'Statistics', 'Machine Learning', 'SQL', 'Pandas', 'Data Visualization', 'A/B Testing'],
    optionalSkills: ['R', 'BigQuery/Spark', 'Deep Learning', 'Feature Engineering', 'Scikit-Learn'],
    learningRoadmap: [
      { stage: '1. Exploratory Data Science', description: 'Statistical testing, distributions, Pandas wrangling, and Seaborn visual analysis', skills: ['Python', 'SQL', 'Pandas', 'Statistics'] },
      { stage: '2. Predictive Modeling', description: 'Supervised/unsupervised algorithms, cross-validation, and metrics (ROC-AUC)', skills: ['Machine Learning', 'Data Visualization', 'A/B Testing'] },
      { stage: '3. Distributed Data & Scale', description: 'Big data processing with Spark, causal inference, and real-time inference', skills: ['BigQuery/Spark', 'Deep Learning'] },
    ],
    suggestedProjectIds: [],
  },
  {
    title: 'DevOps Engineer',
    category: 'Infrastructure',
    summary: 'Automates cloud infrastructure, deployment pipelines, CI/CD workflows, and guarantees system reliability and uptime.',
    growthRate: '+24%',
    avgSalary: '$130,000 / yr',
    difficulty: 'Intermediate',
    requiredSkills: ['Linux', 'Docker', 'Kubernetes', 'CI/CD', 'Git', 'Cloud (AWS/GCP)', 'Bash Scripting'],
    optionalSkills: ['Terraform', 'Ansible', 'Prometheus/Grafana', 'Security', 'Python', 'Networking'],
    learningRoadmap: [
      { stage: '1. Linux & Containerization', description: 'Shell scripting, network configuration, Dockerfiles, and multi-stage builds', skills: ['Linux', 'Docker', 'Bash Scripting', 'Git'] },
      { stage: '2. CI/CD & Automation', description: 'GitHub Actions / GitLab CI, automated test runners, and artifact registries', skills: ['CI/CD', 'Cloud (AWS/GCP)'] },
      { stage: '3. Orchestration & Monitoring', description: 'Kubernetes pods/services, Terraform Infrastructure as Code, and Grafana', skills: ['Kubernetes', 'Terraform', 'Prometheus/Grafana'] },
    ],
    suggestedProjectIds: [],
  },
  {
    title: 'Cloud Engineer',
    category: 'Cloud Architecture',
    summary: 'Designs, secures, and maintains cloud compute, storage, networking, and serverless environments in AWS, GCP, or Azure.',
    growthRate: '+21%',
    avgSalary: '$128,000 / yr',
    difficulty: 'Intermediate',
    requiredSkills: ['Cloud (AWS/GCP)', 'Networking', 'Linux', 'Terraform', 'Security/IAM', 'Python/Bash'],
    optionalSkills: ['Serverless', 'Docker', 'Kubernetes', 'Cost Optimization', 'CloudWatch'],
    learningRoadmap: [
      { stage: '1. Cloud Fundamentals', description: 'VPC design, subnetting, route tables, IAM roles, and storage buckets', skills: ['Cloud (AWS/GCP)', 'Networking', 'Linux'] },
      { stage: '2. Infrastructure as Code', description: 'Declarative resource provisioning with Terraform and CloudFormation', skills: ['Terraform', 'Security/IAM'] },
      { stage: '3. Resilient Architecture', description: 'Multi-region failover, auto-scaling groups, serverless compute, and cost audits', skills: ['Serverless', 'Docker', 'Cost Optimization'] },
    ],
    suggestedProjectIds: [],
  },
  {
    title: 'Cybersecurity Analyst',
    category: 'Security',
    summary: 'Monitors, investigates, and protects networks, applications, and confidential data from vulnerabilities and security threats.',
    growthRate: '+31%',
    avgSalary: '$114,000 / yr',
    difficulty: 'Intermediate',
    requiredSkills: ['Network Security', 'Linux', 'Vulnerability Assessment', 'SIEM', 'Cryptography', 'Incident Response'],
    optionalSkills: ['Python', 'Wireshark', 'OWASP Top 10', 'Penetration Testing', 'Firewalls', 'SOC Operations'],
    learningRoadmap: [
      { stage: '1. Networking & Protocols', description: 'TCP/IP packet analysis, DNS, SSL/TLS handshakes, and Linux forensics', skills: ['Network Security', 'Linux', 'Cryptography'] },
      { stage: '2. Threat Detection & SIEM', description: 'Log aggregation with Splunk/ELK, vulnerability scanners, and incident triage', skills: ['Vulnerability Assessment', 'SIEM', 'Incident Response'] },
      { stage: '3. Application Security', description: 'OWASP Top 10 remediation, penetration testing methodologies, and compliance', skills: ['Python', 'OWASP Top 10', 'Penetration Testing'] },
    ],
    suggestedProjectIds: [],
  },
  {
    title: 'Mobile Developer',
    category: 'Mobile Development',
    summary: 'Engineers intuitive native and cross-platform mobile apps for iOS and Android using React Native, Flutter, Swift, or Kotlin.',
    growthRate: '+18%',
    avgSalary: '$110,000 / yr',
    difficulty: 'Intermediate',
    requiredSkills: ['React Native/Flutter', 'JavaScript/Dart', 'Mobile UI/UX', 'REST APIs', 'Git', 'App Store Deployment'],
    optionalSkills: ['TypeScript', 'State Management', 'Offline Storage', 'Push Notifications', 'Swift', 'Kotlin'],
    learningRoadmap: [
      { stage: '1. Mobile Foundations', description: 'Screen navigation, layout flexbox, touch gestures, and mobile UI guidelines', skills: ['React Native/Flutter', 'JavaScript/Dart', 'Mobile UI/UX'] },
      { stage: '2. Device APIs & State', description: 'Camera, geolocation, SQLite offline caching, and async API synchronizations', skills: ['REST APIs', 'State Management', 'Offline Storage'] },
      { stage: '3. Production Releases', description: 'Push notification payloads, deep linking, app store signing, and profiling', skills: ['App Store Deployment', 'Git', 'Push Notifications'] },
    ],
    suggestedProjectIds: [],
  },
];

export const SEED_PROJECTS: Omit<IProject, '_id'>[] = [
  // BEGINNER PROJECTS
  {
    title: 'Interactive Quiz & Flashcard App',
    difficulty: 'Beginner',
    estimatedTime: '6 - 10 hours',
    skillsGained: ['JavaScript', 'DOM Manipulation', 'Local Storage', 'CSS Flexbox'],
    techStack: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Local Storage'],
    whyRecommended: 'Solidifies core JavaScript logic, state tracking, and browser storage without the cognitive overload of heavy build tools.',
    features: [
      'Timed multiple choice question cards with score tracking',
      'Local storage persistence for high scores and custom user decks',
      'Instant visual feedback and question review summary',
      'Smooth CSS flip animations and progress bar'
    ],
    resumeValue: 'Proves firm grasp of fundamental client-side JavaScript, state persistence, and responsive UI crafting.',
    prerequisites: ['HTML basics', 'CSS syntax'],
    goal: 'Build an interactive web quiz application that tests JavaScript and web development concepts with offline persistence.',
    architecture: {
      frontend: 'Vanilla JavaScript module structure with semantic HTML5 elements',
      backend: 'Client-side only with JSON data sets',
      database: 'Browser localStorage API for persistent user progress',
      deployment: 'GitHub Pages or Vercel static hosting'
    },
    milestones: [
      { title: 'Step 1: UI Structure', tasks: ['Create responsive quiz container', 'Style card flip animation and timer bar'] },
      { title: 'Step 2: Engine Logic', tasks: ['Write question loop, score calculator, and timer interval'] },
      { title: 'Step 3: Persistence', tasks: ['Save deck completion in localStorage', 'Add deck creation form'] }
    ],
    interviewQuestions: [
      { question: 'Why use localStorage over cookies for client-side flashcard storage?', sampleAnswer: 'localStorage provides up to 5MB of synchronous key-value storage that is never transmitted with HTTP request headers, making it ideal for client-only state.' },
      { question: 'How do you prevent memory leaks when running interval timers in JS?', sampleAnswer: 'Store the interval ID returned by setInterval and explicitly invoke clearInterval when the quiz ends or resets.' }
    ],
    resumeBulletPoints: [
      'Engineered a responsive flashcard quiz platform using modular ES6+ JavaScript, handling dynamic DOM rendering and score calculations.',
      'Implemented offline data persistence utilizing HTML5 localStorage, enabling users to retain study progress across browser sessions.'
    ],
    relevanceScore: 92,
    skillImpactScore: 85,
    resumeImpactScore: 78,
  },
  {
    title: 'React Task & Sprint Board',
    difficulty: 'Beginner',
    estimatedTime: '8 - 14 hours',
    skillsGained: ['React', 'JavaScript', 'State Management', 'Tailwind CSS'],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    whyRecommended: 'Essential for mastering React component hierarchy, controlled inputs, custom hooks, and practical state management.',
    features: [
      'Drag-and-drop or categorized status columns (To Do, In Progress, Done)',
      'Tag filtering, priority flags, and due-date counters',
      'Search input with debounced query filtering',
      'Persistent storage synchronization with optimistic UI updates'
    ],
    resumeValue: 'Demonstrates professional React component composition, clean TypeScript typing, and modern Tailwind styling.',
    prerequisites: ['Basic JavaScript ES6'],
    goal: 'Build a Kanban-style sprint task board with modular React components and responsive styling.',
    architecture: {
      frontend: 'Vite + React 18 with TypeScript and Tailwind CSS',
      backend: 'Local client state with custom useLocalStorage hook',
      deployment: 'Vercel or Netlify'
    },
    milestones: [
      { title: 'Step 1: Component Layout', tasks: ['Create Column, TaskCard, and FilterBar components', 'Apply responsive Tailwind utility styling'] },
      { title: 'Step 2: State Flow', tasks: ['Implement useReducer or custom hook for task dispatch actions', 'Add task editing and deletion'] },
      { title: 'Step 3: Polish', tasks: ['Add status transition buttons or drag events', 'Implement search filter'] }
    ],
    interviewQuestions: [
      { question: 'What is the benefit of useReducer over useState for a task board?', sampleAnswer: 'useReducer centralizes complex state transitions into predictable dispatch actions, making actions like ADD_TASK, MOVE_COLUMN, and DELETE_TASK atomic and easily testable.' }
    ],
    resumeBulletPoints: [
      'Developed a responsive Kanban task management application in React and TypeScript, leveraging custom hooks for state persistence.',
      'Designed a modular component hierarchy styled with Tailwind CSS, supporting dynamic task filtering, tagging, and status updates.'
    ],
    relevanceScore: 94,
    skillImpactScore: 89,
    resumeImpactScore: 82,
  },
  {
    title: 'Student & Course Database System',
    difficulty: 'Beginner',
    estimatedTime: '8 - 12 hours',
    skillsGained: ['SQL', 'Relational Modeling', 'PostgreSQL', 'Data Integrity'],
    techStack: ['PostgreSQL / SQLite', 'SQL DDL & DML', 'Node.js test runner'],
    whyRecommended: 'Directly addresses SQL skill gaps by teaching foreign keys, relational joins, normalization, and aggregation queries.',
    features: [
      'Normalized schema (Students, Courses, Enrollments, Grades, Instructors)',
      'Complex multi-table queries with INNER, LEFT, and FULL joins',
      'Aggregate analytical queries computing GPAs and course completion rates',
      'Stored constraints ensuring seat capacity and enrollment integrity'
    ],
    resumeValue: 'Proves foundational relational database design, data integrity enforcement, and SQL query optimization.',
    prerequisites: ['Basic computer science literacy'],
    goal: 'Design, populate, and query a relational student management database enforcing relational integrity.',
    architecture: {
      database: 'PostgreSQL or SQLite with strict schema constraints and indexes',
      deployment: 'Dockerized Postgres container or Cloud SQL'
    },
    milestones: [
      { title: 'Step 1: ERD Design', tasks: ['Draw Entity Relationship Diagram', 'Define 3rd Normal Form tables'] },
      { title: 'Step 2: Schema Script', tasks: ['Write CREATE TABLE scripts with foreign keys and check constraints', 'Insert realistic seed datasets'] },
      { title: 'Step 3: Query Suite', tasks: ['Write reporting queries calculating department statistics', 'Optimize slow queries with indexes'] }
    ],
    interviewQuestions: [
      { question: 'Explain the difference between a WHERE clause and a HAVING clause in SQL.', sampleAnswer: 'WHERE filters rows before any groupings or aggregate functions are calculated; HAVING filters aggregate summary records after the GROUP BY clause executes.' }
    ],
    resumeBulletPoints: [
      'Architected a 3NF relational database schema for academic record management in PostgreSQL, enforcing foreign key integrity and constraints.',
      'Authored complex analytical SQL queries utilizing window functions, multi-table joins, and aggregations to generate automated student GPA reports.'
    ],
    relevanceScore: 91,
    skillImpactScore: 86,
    resumeImpactScore: 80,
  },
  {
    title: 'Python Expense & Budget Tracker',
    difficulty: 'Beginner',
    estimatedTime: '6 - 10 hours',
    skillsGained: ['Python', 'File I/O', 'CLI Design', 'Data Parsing'],
    techStack: ['Python 3.11', 'CSV/JSON', 'Argparse / Click'],
    whyRecommended: 'Master Python syntax, object-oriented principles, file handling, and structured data manipulation from scratch.',
    features: [
      'Command-line interface with category breakdown and monthly budget limits',
      'Export and import capabilities for CSV and JSON banking records',
      'Statistical calculations of discretionary spending vs recurring utilities',
      'ASCII chart visualization of spending categories'
    ],
    resumeValue: 'Demonstrates clean Pythonic code, robust error handling, and file manipulation capabilities.',
    prerequisites: ['Basic programming logic'],
    goal: 'Create an automated personal budget manager in Python with persistent data storage and statistical reporting.',
    architecture: {
      backend: 'Python CLI with modular service and storage layers',
      database: 'JSON / CSV storage with schema validation'
    },
    milestones: [
      { title: 'Step 1: Data Model', tasks: ['Define Expense class with date, category, and amount', 'Build file storage helper'] },
      { title: 'Step 2: CLI Commands', tasks: ['Implement add, list, delete, and summary flags using argparse'] },
      { title: 'Step 3: Analytics', tasks: ['Compute monthly totals and percentage breakdowns', 'Add unit tests'] }
    ],
    interviewQuestions: [
      { question: 'How do list comprehensions differ from standard for-loops in Python?', sampleAnswer: 'List comprehensions provide a concise, readable syntax for generating new lists and are implemented in C at the bytecode level, offering slight performance advantages.' }
    ],
    resumeBulletPoints: [
      'Built a modular Python command-line financial manager featuring automated categorization, CSV export, and monthly budget notifications.',
      'Applied OOP principles and comprehensive error handling to parse and validate transaction payloads with zero runtime failures.'
    ],
    relevanceScore: 90,
    skillImpactScore: 84,
    resumeImpactScore: 76,
  },

  // INTERMEDIATE PROJECTS
  {
    title: 'RESTful API & Service Architecture',
    difficulty: 'Intermediate',
    estimatedTime: '15 - 25 hours',
    skillsGained: ['Node.js', 'Express', 'MongoDB', 'JWT Authentication', 'REST APIs'],
    techStack: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT', 'Bcrypt', 'Joi/Zod'],
    whyRecommended: 'Closes the critical backend skill gap by teaching production REST endpoints, JWT security, middleware chains, and database schema modeling.',
    features: [
      'Secure user registration and authentication with bcrypt password hashing and signed JWT tokens',
      'Role-based access control (Admin, User, Auditor) for protected API routes',
      'Comprehensive CRUD operations with pagination, sorting, and regex search filters',
      'Centralized error-handling middleware with uniform HTTP status codes and structured payloads',
      'Request rate limiting and helmet security headers'
    ],
    resumeValue: 'Essential resume anchor for full-stack and backend roles, showing real server-side engineering and security compliance.',
    prerequisites: ['Basic JavaScript / Node runtime awareness'],
    goal: 'Architect a secure, production-grade RESTful API service with token authentication, database validation, and robust error handling.',
    architecture: {
      backend: 'Express.js MVC pattern (Routes -> Middleware -> Controllers -> Services -> Models)',
      database: 'MongoDB with Mongoose ODM schemas, indexes, and virtuals',
      auth: 'Stateless JWT with Bearer authorization header and Bcrypt salt rounds',
      deployment: 'Docker container on Cloud Run or Render'
    },
    milestones: [
      { title: 'Step 1: Auth Engine', tasks: ['Set up Express server with CORS & Helmet', 'Build /api/auth register & login with JWT signing', 'Create protect middleware'] },
      { title: 'Step 2: Resource CRUD', tasks: ['Define Mongoose schemas with validation', 'Implement paginated GET, POST, PUT, DELETE endpoints'] },
      { title: 'Step 3: Security & Testing', tasks: ['Add express-rate-limit', 'Write automated integration test cases with Supertest/Jest'] }
    ],
    interviewQuestions: [
      { question: 'How do you secure JWT storage and transmission in a web application?', sampleAnswer: 'Transmit JWT tokens exclusively over HTTPS in Bearer headers or HttpOnly, SameSite, Secure cookies to prevent XSS exfiltration, and maintain short token lifespans paired with refresh tokens.' },
      { question: 'What is the purpose of middleware in Express?', sampleAnswer: 'Middleware functions have access to req, res, and the next() callback. They allow intercepting requests to perform logging, authentication, request validation, or error transformation.' }
    ],
    resumeBulletPoints: [
      'Designed and deployed a scalable RESTful API in Node.js and Express, supporting JWT-based role authentication and token verification.',
      'Integrated MongoDB with Mongoose to implement indexed data schemas, multi-field pagination, and input validation schemas, reducing invalid payloads by 100%.'
    ],
    relevanceScore: 96,
    skillImpactScore: 94,
    resumeImpactScore: 92,
  },
  {
    title: 'Full-Stack Job Application Tracker',
    difficulty: 'Intermediate',
    estimatedTime: '20 - 30 hours',
    skillsGained: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'Tailwind CSS'],
    techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Recharts'],
    whyRecommended: 'Combines frontend React state with backend Express API and MongoDB database, proving complete end-to-end full-stack capabilities.',
    features: [
      'Interactive job pipeline kanban board (Wishlist, Applied, Interview, Offer, Rejected)',
      'Metrics dashboard calculating application conversion rates, weekly velocity, and interview success rates using Recharts',
      'Document attachment upload support for customized resumes and cover letters',
      'Email follow-up reminder alerts and interview schedule tracking'
    ],
    resumeValue: 'Demonstrates end-to-end application ownership: UI design, responsive dashboards, REST contracts, and database schema relationships.',
    prerequisites: ['React basics', 'JavaScript ES6'],
    goal: 'Build an end-to-end job search management system that tracks applications, visualizes interview metrics, and manages follow-up timelines.',
    architecture: {
      frontend: 'React with Vite, TypeScript, Tailwind CSS, and Recharts',
      backend: 'Express.js API server with REST endpoints',
      database: 'MongoDB with user-referenced application records',
      auth: 'JWT authentication with authorization guards',
      deployment: 'Vercel frontend + Node backend'
    },
    milestones: [
      { title: 'Step 1: Backend Setup', tasks: ['Create Application schema with status enum and salary ranges', 'Build CRUD API routes with user isolation'] },
      { title: 'Step 2: Frontend Client', tasks: ['Build pipeline board and status switcher', 'Connect Axios/fetch with auth headers'] },
      { title: 'Step 3: Analytics Dashboard', tasks: ['Integrate Recharts bar and pie charts for monthly application rates', 'Add search and salary filters'] }
    ],
    interviewQuestions: [
      { question: 'How do you structure database queries so users only access their own applications?', sampleAnswer: 'Extract the authenticated user ID from the verified JWT payload in the auth middleware, and inject { userId: req.user.id } into all MongoDB query criteria.' }
    ],
    resumeBulletPoints: [
      'Architected a full-stack job application tracker utilizing React, TypeScript, Node.js, and MongoDB, delivering a 5-stage visual recruitment pipeline.',
      'Implemented real-time analytics dashboards using Recharts to visualize application conversion funnels and interview schedules across 100+ applications.'
    ],
    relevanceScore: 95,
    skillImpactScore: 92,
    resumeImpactScore: 90,
  },
  {
    title: 'Real-Time Team Collaboration & Chat',
    difficulty: 'Intermediate',
    estimatedTime: '20 - 28 hours',
    skillsGained: ['WebSockets', 'Socket.io', 'Node.js', 'React', 'Real-Time State'],
    techStack: ['React', 'Socket.io', 'Node.js', 'Express', 'Redis / Memory', 'Tailwind CSS'],
    whyRecommended: 'Teaches bidirectional event-driven networking, rooms, typing indicators, and presence tracking beyond static HTTP requests.',
    features: [
      'Instant bidirectional messaging with channel rooms and direct private chats',
      'Real-time user presence (Online / Away / Typing indicators)',
      'Message history persistence with unread message badges',
      'Sound and desktop notification alerts'
    ],
    resumeValue: 'Stands out in technical screens by proving familiarity with event-driven architecture and real-time state synchronization.',
    prerequisites: ['Node.js basics', 'React state'],
    goal: 'Build a low-latency real-time workspace chat platform with channels, rooms, and online presence indicators.',
    architecture: {
      frontend: 'React with Socket.io client and optimistic message rendering',
      backend: 'Node.js HTTP server wrapped with Socket.io server instance',
      database: 'MongoDB for permanent message history with Redis pub/sub support',
      deployment: 'Cloud Run or Render with WebSocket support enabled'
    },
    milestones: [
      { title: 'Step 1: Socket Handshake', tasks: ['Establish authenticated WebSocket connections', 'Emit user join/leave events'] },
      { title: 'Step 2: Room Channels', tasks: ['Implement socket.join(roomId)', 'Broadcast messages only to active room participants'] },
      { title: 'Step 3: Persistence & Indicators', tasks: ['Persist chats to database', 'Add debounced typing indicator events'] }
    ],
    interviewQuestions: [
      { question: 'What is the architectural difference between HTTP polling and WebSockets?', sampleAnswer: 'HTTP polling initiates repeated TCP handshakes with high overhead per request; WebSockets establish a single persistent, full-duplex TCP connection with minimal frame header overhead.' }
    ],
    resumeBulletPoints: [
      'Developed a real-time messaging platform using React, Node.js, and Socket.io, facilitating instant channel communications with sub-50ms latency.',
      'Engineered live presence tracking and typing status mechanisms, managing persistent room subscriptions across concurrent client sessions.'
    ],
    relevanceScore: 93,
    skillImpactScore: 91,
    resumeImpactScore: 88,
  },
  {
    title: 'E-Commerce Micro-Backend & Stripe Checkout',
    difficulty: 'Intermediate',
    estimatedTime: '18 - 26 hours',
    skillsGained: ['Backend Architecture', 'Payment Gateways', 'Webhooks', 'Transaction Integrity'],
    techStack: ['Node.js', 'Express', 'Stripe API', 'MongoDB / PostgreSQL', 'Docker'],
    whyRecommended: 'Teaches idempotency, webhook signature verification, order fulfillment flows, and commercial software requirements.',
    features: [
      'Product inventory tracking with atomic stock decrements',
      'Stripe Checkout Session generation with cart metadata',
      'Secure webhook handler with cryptographic signature verification',
      'Automated email order confirmation generator'
    ],
    resumeValue: 'Demonstrates financial transaction handling, external API webhooks, and asynchronous order processing.',
    prerequisites: ['Express.js CRUD experience'],
    goal: 'Implement a secure commercial checkout backend featuring third-party payment integration and webhook reconciliation.',
    architecture: {
      backend: 'Express.js with raw body buffer parsing for Stripe webhook verification',
      database: 'MongoDB with session transactions for inventory integrity',
      deployment: 'Docker container'
    },
    milestones: [
      { title: 'Step 1: Catalog & Cart', tasks: ['Create product schema with inventory limits', 'Build cart calculation endpoint'] },
      { title: 'Step 2: Stripe Integration', tasks: ['Create checkout session', 'Handle success and cancel redirect states'] },
      { title: 'Step 3: Webhook Fulfillment', tasks: ['Verify stripe-signature header', 'Update inventory and create order record atomically'] }
    ],
    interviewQuestions: [
      { question: 'Why must Stripe webhooks verify request signatures?', sampleAnswer: 'To confirm that the incoming payload genuinely originated from Stripe and was not tampered with or spoofed by a malicious client trying to trigger false order fulfillments.' }
    ],
    resumeBulletPoints: [
      'Built a resilient e-commerce checkout backend leveraging Express and Stripe APIs, ensuring idempotent order processing via webhook verification.',
      'Implemented atomic database transactions to guarantee inventory accuracy during concurrent checkout spikes.'
    ],
    relevanceScore: 94,
    skillImpactScore: 90,
    resumeImpactScore: 89,
  },

  // ADVANCED PROJECTS
  {
    title: 'AI Career Intelligence & Resume Analyzer Platform',
    difficulty: 'Advanced',
    estimatedTime: '30 - 45 hours',
    skillsGained: ['AI LLM Integration', 'Prompt Engineering', 'Full-Stack Architecture', 'Vector Search', 'Resume Parsing'],
    techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'Gemini AI API', 'MongoDB', 'Tailwind CSS', 'Recharts'],
    whyRecommended: 'Signature advanced project showing full-stack SaaS mastery, LLM structured schema integration, multi-stage data pipelines, and responsive design.',
    features: [
      'Multi-format resume parser extracting raw text from PDF and DOCX files',
      'Structured Gemini 3.8 Flash AI pipeline outputting skill evidence, gap rankings, and personalized project roadmaps',
      'Interactive radar and bar visualizations comparing user readiness against 14 industry benchmarks',
      'Dynamic project detail views with system architecture breakdowns, milestone task lists, and interview prep',
      'Persistent progress tracking recalculating career match scores in real time'
    ],
    resumeValue: 'Top-tier portfolio centerpiece demonstrating production AI engineering, system architecture, and UX craftsmanship.',
    prerequisites: ['Full Stack development experience', 'REST APIs', 'React'],
    goal: 'Build an end-to-end AI career intelligence SaaS platform providing automated resume parsing, skill-gap analysis, and actionable project roadmaps.',
    architecture: {
      frontend: 'React 19 with TypeScript, Vite, Tailwind CSS, Lucide icons, and Recharts',
      backend: 'Express.js with Multer file streaming and pdf-parse / mammoth text extraction',
      ai: 'Google GenAI SDK (Gemini 3.8 Flash) with structured JSON schemas and robust NLP fallback',
      database: 'MongoDB with Mongoose models for users, resumes, analyses, projects, and progress',
      deployment: 'Google Cloud Run container'
    },
    milestones: [
      { title: 'Step 1: Ingestion & Text Extraction', tasks: ['Configure Multer disk/memory storage', 'Parse raw text from PDF & Word documents', 'Validate content density'] },
      { title: 'Step 2: AI Pipeline & Prompts', tasks: ['Construct strict JSON schema prompts for Gemini 3.8 Flash', 'Implement skill evidence extraction and gap prioritization'] },
      { title: 'Step 3: SaaS Dashboard & UX', tasks: ['Build theme-aware developer background', 'Design career readiness breakdown cards and interactive comparison engine'] }
    ],
    interviewQuestions: [
      { question: 'How do you guarantee that LLM output adheres to your application schema?', sampleAnswer: 'By configuring responseMimeType: "application/json" with a strict responseSchema definition, paired with server-side validation and fallback parsers to handle unexpected tokens.' },
      { question: 'How did you handle large resume uploads without blocking the Node event loop?', sampleAnswer: 'Utilized Multer with memory limits and executed CPU-bound text parsing asynchronously before feeding sanitized text into the AI pipeline.' }
    ],
    resumeBulletPoints: [
      'Architected and deployed CareerMind AI, a full-stack career intelligence platform analyzing technical resumes to compute job readiness across 14 industry roles.',
      'Integrated Google Gemini 3.8 Flash with structured JSON schemas to automatically identify skill gaps, generate technical project milestones, and track user learning progress.'
    ],
    relevanceScore: 98,
    skillImpactScore: 97,
    resumeImpactScore: 96,
  },
  {
    title: 'RAG Knowledge Assistant & Semantic Search Engine',
    difficulty: 'Advanced',
    estimatedTime: '25 - 40 hours',
    skillsGained: ['RAG', 'Vector Databases', 'Embeddings', 'Python / FastAPI', 'LLMs'],
    techStack: ['Python', 'FastAPI', 'LangChain', 'ChromaDB / Pinecone', 'Gemini Embeddings', 'React'],
    whyRecommended: 'Shows advanced AI engineering skills: document chunking, semantic vector indexing, cosine similarity retrieval, and hallucination reduction.',
    features: [
      'Document ingestion pipeline parsing PDFs, markdown, and codebases into semantic chunks',
      'Dense vector indexing using text-embedding models stored in a vector database',
      'Retrieval augmented generation with source attribution and citation links',
      'Hybrid search combining keyword BM25 ranking with vector cosine similarity'
    ],
    resumeValue: 'Demonstrates enterprise-grade AI architecture sought by modern AI engineering and research teams.',
    prerequisites: ['Python basics', 'Vector concepts'],
    goal: 'Construct a production RAG system that answers questions over technical document sets with zero hallucinations.',
    architecture: {
      frontend: 'React chat interface with citation popovers and streaming markdown',
      backend: 'FastAPI with async worker pipelines and LangChain retrieval chains',
      database: 'Vector DB (ChromaDB / Pinecone) + PostgreSQL for metadata storage',
      ai: 'Embedding models + Gemini 3.8 Flash for synthesis'
    },
    milestones: [
      { title: 'Step 1: Chunking Pipeline', tasks: ['Implement RecursiveCharacterTextSplitter with overlap', 'Generate dense embeddings'] },
      { title: 'Step 2: Vector Index', tasks: ['Upsert vectors into database with document metadata', 'Execute k-NN cosine distance queries'] },
      { title: 'Step 3: Synthesis & Streaming', tasks: ['Inject retrieved context into LLM prompt', 'Stream tokens back via Server-Sent Events (SSE)'] }
    ],
    interviewQuestions: [
      { question: 'How do you select chunk size and overlap for a RAG pipeline?', sampleAnswer: 'Chunk size balances context completeness against noise: 500-1000 tokens typically captures complete thoughts, while a 10-20% overlap ensures boundary concepts are not severed during semantic retrieval.' }
    ],
    resumeBulletPoints: [
      'Developed a high-accuracy RAG pipeline in Python and FastAPI, indexing over 5,000 pages of technical documentation using dense vector embeddings.',
      'Reduced hallucination rates by 85% by implementing semantic re-ranking and exact citation linking before token generation.'
    ],
    relevanceScore: 96,
    skillImpactScore: 95,
    resumeImpactScore: 93,
  },
  {
    title: 'Distributed Microservices & Event Stream Engine',
    difficulty: 'Advanced',
    estimatedTime: '30 - 45 hours',
    skillsGained: ['Microservices', 'Kafka / RabbitMQ', 'Docker', 'Kubernetes', 'Redis Caching'],
    techStack: ['Node.js', 'Go or Python', 'Apache Kafka', 'Docker Compose', 'PostgreSQL', 'Redis'],
    whyRecommended: 'Essential for high-scale backend roles, proving proficiency in distributed consensus, eventual consistency, and fault tolerance.',
    features: [
      'Decoupled Order, Payment, and Notification microservices communicating over Kafka topics',
      'Saga pattern implementation with compensating transactions for failed order rollbacks',
      'Distributed rate limiting and caching layer with Redis clusters',
      'Prometheus and Grafana telemetry dashboards monitoring latency and queue lag'
    ],
    resumeValue: 'High-signal project proving senior systems design knowledge, asynchronous messaging, and horizontal scalability.',
    prerequisites: ['Solid backend fundamentals', 'Docker basics'],
    goal: 'Build a distributed event-driven microservices architecture utilizing Kafka queues and saga transactions.',
    architecture: {
      services: '3 decoupled microservices running in Docker containers',
      broker: 'Apache Kafka with partitioned topics and consumer groups',
      database: 'PostgreSQL database-per-service pattern',
      caching: 'Redis cluster'
    },
    milestones: [
      { title: 'Step 1: Service Dockerization', tasks: ['Define docker-compose with Kafka and Zookeeper', 'Build Order Service with REST gateway'] },
      { title: 'Step 2: Event Publishing', tasks: ['Publish OrderCreated events to Kafka', 'Consume in Payment Service and emit PaymentProcessed'] },
      { title: 'Step 3: Saga Rollbacks', tasks: ['Simulate payment failures and trigger compensating stock restoration'] }
    ],
    interviewQuestions: [
      { question: 'How do you handle duplicate messages in Kafka consumer groups?', sampleAnswer: 'Ensure consumers are idempotent by tracking processed message IDs or event correlation keys in a distributed cache or relational uniqueness constraint.' }
    ],
    resumeBulletPoints: [
      'Architected an event-driven microservices ecosystem using Kafka and Docker, handling distributed order and inventory workflows with zero data loss.',
      'Implemented the Saga choreography pattern for distributed transactions, ensuring automatic compensating rollbacks upon payment failures.'
    ],
    relevanceScore: 94,
    skillImpactScore: 96,
    resumeImpactScore: 95,
  }
];

export const SEED_LEARNING_RESOURCES: Omit<ILearningResource, '_id'>[] = [
  // Learn Now
  {
    skill: 'Node.js',
    title: 'Node.js Official Documentation & Getting Started Guide',
    provider: 'Node.js Foundation',
    url: 'https://nodejs.org/en/learn',
    type: 'documentation',
    level: 'Beginner',
    tier: 'Learn Now',
    estimatedTime: '4 - 6 hours',
    reason: 'Master the event loop, module systems (ESM/CJS), and file system APIs directly from the official source.'
  },
  {
    skill: 'Express',
    title: 'Express.js Routing, Middleware, and API Design',
    provider: 'Express.js',
    url: 'https://expressjs.com/en/guide/routing.html',
    type: 'documentation',
    level: 'Beginner',
    tier: 'Learn Now',
    estimatedTime: '3 - 5 hours',
    reason: 'Essential guide to building RESTful routers, chained middleware, and error handlers in Node.'
  },
  {
    skill: 'JavaScript',
    title: 'MDN Web Docs: Modern JavaScript Handbook',
    provider: 'Mozilla Developer Network',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    type: 'documentation',
    level: 'Beginner',
    tier: 'Learn Now',
    estimatedTime: '6 - 10 hours',
    reason: 'The gold standard documentation for ES6+ features, closures, promises, and async/await syntax.'
  },
  {
    skill: 'React',
    title: 'React Official Tutorial: Quick Start & Describing the UI',
    provider: 'React.dev',
    url: 'https://react.dev/learn',
    type: 'interactive',
    level: 'Intermediate',
    tier: 'Learn Now',
    estimatedTime: '8 - 12 hours',
    reason: 'Official interactive guides teaching pure components, state mutation rules, and modern hooks.'
  },
  {
    skill: 'SQL',
    title: 'PostgreSQL Tutorial & Interactive SQL Practice',
    provider: 'PostgreSQL Tutorial',
    url: 'https://www.postgresqltutorial.com/',
    type: 'tutorial',
    level: 'Beginner',
    tier: 'Learn Now',
    estimatedTime: '6 - 8 hours',
    reason: 'Step-by-step SQL queries covering joins, aggregations, indexing, and relational table design.'
  },

  // Learn Next
  {
    skill: 'MongoDB',
    title: 'MongoDB University: Document Modeling & Aggregations',
    provider: 'MongoDB',
    url: 'https://www.mongodb.com/docs/manual/',
    type: 'documentation',
    level: 'Intermediate',
    tier: 'Learn Next',
    estimatedTime: '5 - 8 hours',
    reason: 'Learn schema validation, compound indexes, and aggregation pipelines for scalable document storage.'
  },
  {
    skill: 'TypeScript',
    title: 'TypeScript for JavaScript Programmers',
    provider: 'TypeScriptLang.org',
    url: 'https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html',
    type: 'documentation',
    level: 'Intermediate',
    tier: 'Learn Next',
    estimatedTime: '4 - 6 hours',
    reason: 'Add type safety, interface contracts, and generic types to prevent production runtime errors.'
  },
  {
    skill: 'Docker',
    title: 'Docker Getting Started Guide & Container Basics',
    provider: 'Docker',
    url: 'https://docs.docker.com/get-started/',
    type: 'documentation',
    level: 'Intermediate',
    tier: 'Learn Next',
    estimatedTime: '4 - 6 hours',
    reason: 'Containerize web services, build multi-stage images, and manage multi-container networks.'
  },
  {
    skill: 'Python',
    title: 'The Python Tutorial (Official 3.12+ Documentation)',
    provider: 'Python.org',
    url: 'https://docs.python.org/3/tutorial/',
    type: 'documentation',
    level: 'Intermediate',
    tier: 'Learn Next',
    estimatedTime: '8 - 12 hours',
    reason: 'Comprehensive walkthrough of standard data structures, decorators, modules, and error handling.'
  },

  // Optional
  {
    skill: 'Git',
    title: 'Pro Git Book (Complete Online Edition)',
    provider: 'Git-SCM',
    url: 'https://git-scm.com/book/en/v2',
    type: 'documentation',
    level: 'Beginner',
    tier: 'Optional',
    estimatedTime: '3 - 5 hours',
    reason: 'Master branching models, interactive rebases, merge conflict resolution, and Git internals.'
  },
  {
    skill: 'Tailwind CSS',
    title: 'Tailwind CSS Official Core Concepts',
    provider: 'Tailwind Labs',
    url: 'https://tailwindcss.com/docs/utility-first',
    type: 'documentation',
    level: 'Beginner',
    tier: 'Optional',
    estimatedTime: '3 - 4 hours',
    reason: 'Learn responsive modifiers, dark mode variants, and utility-first layout patterns.'
  },
  {
    skill: 'AI / LLMs',
    title: 'Google Generative AI Developer Docs',
    provider: 'Google AI',
    url: 'https://ai.google.dev/gemini-api/docs',
    type: 'documentation',
    level: 'Advanced',
    tier: 'Optional',
    estimatedTime: '5 - 8 hours',
    reason: 'Explore structured outputs, multimodal prompts, function calling, and system instructions with Gemini.'
  }
];

export const SEED_CODING_PROBLEMS: Omit<ICodingProblem, '_id'>[] = [
  {
    title: 'Two Sum',
    platform: 'LeetCode',
    difficulty: 'Easy',
    skill: 'JavaScript',
    category: 'Arrays & Hash Maps',
    url: 'https://leetcode.com/problems/two-sum/',
    whyRecommended: 'Essential interview foundation. Teaches trading O(n) space for O(n) time using hash table lookups instead of O(n^2) nested loops.',
    estimatedMinutes: 20
  },
  {
    title: 'LRU Cache Design',
    platform: 'LeetCode',
    difficulty: 'Medium',
    skill: 'Node.js',
    category: 'System & Concurrency',
    url: 'https://leetcode.com/problems/lru-cache/',
    whyRecommended: 'Top tier backend and full-stack screen question. Pairs doubly linked lists with hash maps for constant O(1) eviction logic.',
    estimatedMinutes: 45
  },
  {
    title: 'Number of Islands',
    platform: 'LeetCode',
    difficulty: 'Medium',
    skill: 'Python',
    category: 'Trees & Graphs',
    url: 'https://leetcode.com/problems/number-of-islands/',
    whyRecommended: 'Crucial graph exploration question. Demonstrates BFS / DFS traversal and visited state mutation over 2D matrix grids.',
    estimatedMinutes: 35
  },
  {
    title: 'Course Schedule (Cycle & Topo Sort)',
    platform: 'LeetCode',
    difficulty: 'Medium',
    skill: 'Java',
    category: 'Trees & Graphs',
    url: 'https://leetcode.com/problems/course-schedule/',
    whyRecommended: 'Directly mirrors real-world build pipeline dependencies, package resolutions (npm/Maven), and DAG cycle detection.',
    estimatedMinutes: 40
  },
  {
    title: 'Implement Debounce',
    platform: 'BigFrontend',
    difficulty: 'Medium',
    skill: 'JavaScript',
    category: 'Modern JS Mechanics',
    url: 'https://bigfrontend.dev/problem/implement-basic-debounce',
    whyRecommended: 'High-frequency frontend interview question testing closure retention, timer clearing, and `this` context binding in async DOM events.',
    estimatedMinutes: 25
  },
  {
    title: 'Implement Promise.all()',
    platform: 'BigFrontend',
    difficulty: 'Medium',
    skill: 'React',
    category: 'Modern JS Mechanics',
    url: 'https://bigfrontend.dev/problem/implement-Promise-all',
    whyRecommended: 'Tests concurrent async orchestration, race-condition handling, and error rejection semantics without native helpers.',
    estimatedMinutes: 30
  },
  {
    title: 'Department Top Three Salaries',
    platform: 'LeetCode',
    difficulty: 'Hard',
    skill: 'SQL',
    category: 'SQL & Databases',
    url: 'https://leetcode.com/problems/department-top-three-salaries/',
    whyRecommended: 'Master DENSE_RANK() window functions and partitioning in SQL, essential for senior database reporting queries.',
    estimatedMinutes: 30
  },
  {
    title: 'Second Highest Salary',
    platform: 'LeetCode',
    difficulty: 'Medium',
    skill: 'SQL',
    category: 'SQL & Databases',
    url: 'https://leetcode.com/problems/second-highest-salary/',
    whyRecommended: 'Classic SQL benchmark testing subquery filtering, LIMIT/OFFSET, and NULL handling edge cases.',
    estimatedMinutes: 15
  },
  {
    title: 'Valid Parentheses',
    platform: 'LeetCode',
    difficulty: 'Easy',
    skill: 'TypeScript',
    category: 'Stacks & Parsers',
    url: 'https://leetcode.com/problems/valid-parentheses/',
    whyRecommended: 'Fundamental LIFO stack data structure question frequently applied to code AST parsing and JSX bracket validation.',
    estimatedMinutes: 20
  },
  {
    title: 'Design Twitter Feed',
    platform: 'LeetCode',
    difficulty: 'Medium',
    skill: 'Full Stack Integration',
    category: 'System & Concurrency',
    url: 'https://leetcode.com/problems/design-twitter/',
    whyRecommended: 'Builds real-world social feed aggregation, follower relationships, and priority queue (Max Heap) chronological merges.',
    estimatedMinutes: 45
  },
  {
    title: 'Search in Rotated Sorted Array',
    platform: 'LeetCode',
    difficulty: 'Medium',
    skill: 'Python',
    category: 'Binary Search',
    url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
    whyRecommended: 'Elevates basic binary search to O(log n) partitioned space analysis, a staple in senior engineering technical rounds.',
    estimatedMinutes: 35
  },
  {
    title: 'Kth Largest Element in an Array',
    platform: 'LeetCode',
    difficulty: 'Medium',
    skill: 'Machine Learning',
    category: 'Heaps & Quickselect',
    url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',
    whyRecommended: 'Essential for ML feature sorting, nearest neighbor ranking, and streaming top-k metric calculations using Min-Heaps.',
    estimatedMinutes: 30
  },
  {
    title: 'Longest Substring Without Repeating Characters',
    platform: 'LeetCode',
    difficulty: 'Medium',
    skill: 'JavaScript',
    category: 'Sliding Window',
    url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
    whyRecommended: 'Signature sliding window pattern with hash set window boundaries, optimizing O(n^2) brute force down to O(n) linear scan.',
    estimatedMinutes: 30
  },
  {
    title: 'Flatten Deeply Nested Array',
    platform: 'LeetCode',
    difficulty: 'Medium',
    skill: 'React',
    category: 'Modern JS Mechanics',
    url: 'https://leetcode.com/problems/flatten-deeply-nested-array/',
    whyRecommended: 'Tests recursive vs iterative stack-based tree traversal with depth boundary constraints in pure JavaScript.',
    estimatedMinutes: 25
  }
];

export function seedDatabase(): void {
  // Only seed if empty
  if (CareerRoles.find().length === 0) {
    console.log('Seeding Career Roles...');
    for (const role of SEED_CAREER_ROLES) {
      CareerRoles.create(role);
    }
  }

  if (Projects.find().length === 0) {
    console.log('Seeding Projects...');
    for (const project of SEED_PROJECTS) {
      Projects.create(project);
    }
  }

  if (LearningResources.find().length === 0) {
    console.log('Seeding Learning Resources...');
    for (const res of SEED_LEARNING_RESOURCES) {
      LearningResources.create(res);
    }
  }

  if (CodingProblems.find().length === 0) {
    console.log('Seeding Coding Problems...');
    for (const prob of SEED_CODING_PROBLEMS) {
      CodingProblems.create(prob);
    }
  }
}
