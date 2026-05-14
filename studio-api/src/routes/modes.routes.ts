import { Router } from 'express';

const router = Router();

const modes = [
  // ── Screening & HR ────────────────────────────────────────
  { id: 'recruiter-screen', name: 'Recruiter Screen', icon: '📞', description: 'Initial recruiter phone screen — motivation, logistics, and culture fit.' },
  { id: 'hiring-manager-screen', name: 'Hiring Manager Screen', icon: '🤝', description: 'Hiring manager intro — team fit, scope of role, and expectations.' },
  { id: 'culture-fit', name: 'Culture Fit', icon: '🌱', description: 'Values alignment, team dynamics, and company mission questions.' },
  { id: 'compensation-negotiation', name: 'Salary Negotiation', icon: '💰', description: 'Practice negotiating offer, counter-offer, and competing bids.' },

  // ── Behavioral & Soft Skills ──────────────────────────────
  { id: 'behavioral', name: 'Behavioral (STAR)', icon: '🗣️', description: 'Behavioral interview using the STAR framework.' },
  { id: 'leadership-principles', name: 'Leadership Principles', icon: '🎯', description: 'Amazon-style LP questions — ownership, bias for action, dive deep.' },
  { id: 'management-behavioral', name: 'Management Behavioral', icon: '👥', description: 'People management scenarios — conflict, feedback, performance.' },
  { id: 'situational-judgment', name: 'Situational Judgment', icon: '⚖️', description: 'Hypothetical workplace dilemmas and judgment-under-pressure questions.' },
  { id: 'communication-skills', name: 'Communication Skills', icon: '📢', description: 'Clarity, stakeholder communication, and presenting ideas concisely.' },
  { id: 'growth-mindset', name: 'Growth & Learning', icon: '📚', description: 'How you learn, handle feedback, and grow from failures.' },

  // ── Coding & Algorithms ───────────────────────────────────
  { id: 'coding', name: 'Coding (LeetCode)', icon: '💻', description: 'Data structures and algorithm problems in the style of LeetCode.' },
  { id: 'live-coding', name: 'Live Coding', icon: '⌨️', description: 'Code in real-time while thinking aloud — replicates CoderPad/HackerRank.' },
  { id: 'pair-programming', name: 'Pair Programming', icon: '👨‍💻', description: 'Collaborate on a feature or bug with an interviewer as co-pilot.' },
  { id: 'data-structures', name: 'Data Structures', icon: '🌳', description: 'Deep focus on arrays, trees, graphs, heaps, tries, and more.' },
  { id: 'dynamic-programming', name: 'Dynamic Programming', icon: '🔢', description: 'DP patterns — memoization, tabulation, and optimal substructure.' },
  { id: 'concurrency', name: 'Concurrency', icon: '🔀', description: 'Threads, async/await, race conditions, locks, and concurrent patterns.' },
  { id: 'oop-design', name: 'OOP & Design Patterns', icon: '🧩', description: 'Object-oriented design, SOLID principles, and GoF patterns.' },
  { id: 'functional-programming', name: 'Functional Programming', icon: 'λ', description: 'Pure functions, immutability, monads, and FP patterns.' },
  { id: 'api-design', name: 'API Design', icon: '🔌', description: 'REST, GraphQL, gRPC API design, contracts, and versioning.' },
  { id: 'sql-databases', name: 'SQL & Databases', icon: '🗄️', description: 'SQL queries, query optimisation, indexes, and relational modelling.' },

  // ── System Design ─────────────────────────────────────────
  { id: 'system-design', name: 'System Design', icon: '🏗️', description: 'Large-scale distributed system design and architecture trade-offs.' },
  { id: 'hld', name: 'High-Level Design (HLD)', icon: '🗺️', description: 'Macro architecture — components, services, and data flow.' },
  { id: 'lld', name: 'Low-Level Design (LLD)', icon: '🔩', description: 'Class diagrams, module interfaces, and detailed component design.' },
  { id: 'distributed-systems', name: 'Distributed Systems', icon: '🌐', description: 'CAP theorem, consensus, replication, partitioning, and fault tolerance.' },
  { id: 'database-design', name: 'Database Design', icon: '📦', description: 'Schema design, normalisation, NoSQL vs SQL, and data modelling.' },
  { id: 'microservices', name: 'Microservices Design', icon: '🧱', description: 'Service decomposition, communication patterns, and service mesh.' },
  { id: 'event-driven', name: 'Event-Driven Architecture', icon: '⚡', description: 'Event sourcing, CQRS, Kafka, and async messaging patterns.' },
  { id: 'caching-strategy', name: 'Caching & Performance', icon: '⚡', description: 'Cache layers, invalidation strategies, CDN, and read/write optimisation.' },
  { id: 'api-gateway', name: 'API Gateway & BFF', icon: '🛡️', description: 'Gateway patterns, BFF, rate limiting, and authentication layers.' },
  { id: 'infra-design', name: 'Infrastructure Design', icon: '☁️', description: 'Cloud architecture, networking, availability zones, and DR planning.' },

  // ── Frontend Specific ─────────────────────────────────────
  { id: 'frontend-architecture', name: 'Frontend Architecture', icon: '🎨', description: 'SPA architecture, micro-frontends, state management, and bundling.' },
  { id: 'angular', name: 'Angular Deep Dive', icon: '🔴', description: 'Angular signals, DI, RxJS, change detection, and performance.' },
  { id: 'react', name: 'React Deep Dive', icon: '⚛️', description: 'React hooks, reconciliation, concurrent features, and performance.' },
  { id: 'css-styling', name: 'CSS & Styling', icon: '🎨', description: 'CSS layout, specificity, animations, design tokens, and accessibility.' },
  { id: 'web-performance', name: 'Web Performance', icon: '🚀', description: 'Core Web Vitals, Lighthouse, rendering pipeline, and optimisation.' },
  { id: 'browser-internals', name: 'Browser Internals', icon: '🌐', description: 'Event loop, rendering, V8, network stack, and browser APIs.' },
  { id: 'accessibility', name: 'Accessibility (a11y)', icon: '♿', description: 'WCAG compliance, ARIA, keyboard nav, and inclusive design.' },
  { id: 'component-design', name: 'Component Design', icon: '🧩', description: 'Design systems, component APIs, composition patterns, and reusability.' },

  // ── Backend & Infrastructure Specific ─────────────────────
  { id: 'devops-scenario', name: 'DevOps Scenario', icon: '♾️', description: 'CI/CD pipelines, deployment strategies, and infrastructure automation.' },
  { id: 'cloud-architecture', name: 'Cloud Architecture', icon: '☁️', description: 'AWS/GCP/Azure services, IaC (Terraform/CDK), and cost trade-offs.' },
  { id: 'kubernetes-ops', name: 'Kubernetes Deep Dive', icon: '🎡', description: 'K8s internals, scheduling, operators, and cluster management.' },
  { id: 'sre-scenario', name: 'SRE Scenario', icon: '🔭', description: 'On-call incident response, post-mortems, SLO budgets, and toil.' },
  { id: 'security-review', name: 'Security Review', icon: '🔒', description: 'Threat modelling, OWASP Top 10, AuthN/AuthZ, and secure coding.' },
  { id: 'networking', name: 'Networking', icon: '📡', description: 'DNS, TCP/IP, HTTP/2/3, TLS, load balancers, and network debugging.' },

  // ── Data & ML ─────────────────────────────────────────────
  { id: 'data-engineering', name: 'Data Engineering', icon: '🔧', description: 'ETL pipelines, Spark, dbt, schema design, and data quality.' },
  { id: 'ml-fundamentals', name: 'ML Fundamentals', icon: '🧪', description: 'Model selection, bias-variance, evaluation metrics, and overfitting.' },
  { id: 'mlops-scenario', name: 'MLOps Scenario', icon: '🚀', description: 'Model deployment, monitoring, feature stores, and retraining pipelines.' },
  { id: 'sql-analytics', name: 'SQL & Analytics', icon: '📊', description: 'Complex SQL, window functions, query plans, and analytical patterns.' },
  { id: 'statistics', name: 'Statistics & Probability', icon: '📈', description: 'Hypothesis testing, distributions, A/B testing, and Bayesian thinking.' },

  // ── AI Engineering ────────────────────────────────────────
  { id: 'ai-assisted-engineering', name: 'AI-Assisted Engineering', icon: '🤖', description: 'AI-assisted dev workflow, prompt design, and LLM integration patterns.' },
  { id: 'llm-design', name: 'LLM System Design', icon: '🔮', description: 'RAG pipelines, embedding strategies, chunking, and LLM orchestration.' },
  { id: 'prompt-engineering', name: 'Prompt Engineering', icon: '✨', description: 'Chain-of-thought, few-shot, tool use, and prompt optimisation.' },
  { id: 'agentic-design', name: 'Agentic System Design', icon: '🧠', description: 'Multi-agent architecture, tool calling, memory, and orchestration.' },

  // ── Code Quality & Review ─────────────────────────────────
  { id: 'code-review', name: 'Code Review', icon: '🔍', description: 'Review code for correctness, performance, security, and readability.' },
  { id: 'debugging', name: 'Debugging', icon: '🐛', description: 'Diagnose bugs, read stack traces, and perform root cause analysis.' },
  { id: 'refactoring', name: 'Refactoring', icon: '♻️', description: 'Improve code quality, extract patterns, and reduce technical debt.' },
  { id: 'testing-strategy', name: 'Testing Strategy', icon: '✅', description: 'Unit, integration, E2E, TDD, and test pyramid design.' },

  // ── Project & Process ─────────────────────────────────────
  { id: 'project-deep-dive', name: 'Project Deep Dive', icon: '🔎', description: 'Walk through a past project — decisions, trade-offs, and impact.' },
  { id: 'take-home-review', name: 'Take-Home Review', icon: '🏠', description: 'Present and defend a take-home assignment to a panel.' },
  { id: 'architecture-walkthrough', name: 'Architecture Walkthrough', icon: '📐', description: 'Explain and justify a past system you designed or significantly changed.' },
  { id: 'estimation', name: 'Estimation & Planning', icon: '📅', description: 'Effort estimation, breaking down work, and delivery planning.' },
  { id: 'incident-postmortem', name: 'Incident Post-Mortem', icon: '📋', description: 'Walk through an outage — timeline, mitigation, and systemic fixes.' },
  { id: 'technical-presentation', name: 'Technical Presentation', icon: '📊', description: 'Present a technical topic clearly to a mixed engineering audience.' },

  // ── Executive & Leadership ────────────────────────────────
  { id: 'engineering-vision', name: 'Engineering Vision', icon: '🌟', description: 'Define and communicate multi-year technical direction and roadmap.' },
  { id: 'cross-functional', name: 'Cross-Functional Influence', icon: '🤝', description: 'Align engineering with product, design, data, and business stakeholders.' },
  { id: 'executive-communication', name: 'Executive Communication', icon: '🏢', description: 'Present technical strategy to C-suite, board, or investors.' },
  { id: 'hiring-bar-raising', name: 'Hiring & Bar Raising', icon: '⬆️', description: 'Interviewing philosophy, building a hiring bar, and scaling teams.' },

  // ── Wrap-up ───────────────────────────────────────────────
  { id: 'candidate-questions', name: 'Candidate Questions', icon: '❓', description: 'Practice asking sharp, insightful questions that impress interviewers.' },
];

router.get('/modes', (_req, res) => {
  res.json(modes);
});

export default router;
