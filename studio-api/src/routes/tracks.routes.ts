import { Router } from 'express';

const router = Router();

const tracks = [
  // ── Frontend ──────────────────────────────────────────────
  { id: 'junior-frontend', name: 'Junior Frontend', icon: '🌱', description: 'Entry-level frontend developer interview preparation.' },
  { id: 'senior-frontend', name: 'Senior Frontend', icon: '🏗️', description: 'Senior frontend engineer with architecture and leadership focus.' },
  { id: 'angular-developer', name: 'Angular Dev', icon: '🔴', description: 'Angular-specific deep dive covering signals, RxJS, and DI.' },
  { id: 'react-developer', name: 'React Developer', icon: '⚛️', description: 'React-specific practice including hooks, state, and rendering.' },
  { id: 'vuejs-developer', name: 'Vue.js Developer', icon: '💚', description: 'Vue 3 Composition API, Pinia, Nuxt, and ecosystem.' },
  { id: 'nextjs-developer', name: 'Next.js Developer', icon: '▲', description: 'Next.js App Router, SSR, ISR, and full-stack React patterns.' },
  { id: 'svelte-developer', name: 'Svelte Developer', icon: '🔥', description: 'Svelte/SvelteKit, reactivity model, and compiler-based approach.' },
  { id: 'ios-developer', name: 'iOS Developer', icon: '🍎', description: 'Swift, SwiftUI, UIKit, Xcode, and Apple ecosystem.' },
  { id: 'android-developer', name: 'Android Developer', icon: '🤖', description: 'Kotlin, Jetpack Compose, Android SDK, and Google Play.' },
  { id: 'react-native-developer', name: 'React Native', icon: '📱', description: 'Cross-platform mobile development with React Native and Expo.' },
  { id: 'flutter-developer', name: 'Flutter Developer', icon: '🐦', description: 'Dart, Flutter widgets, state management, and cross-platform UI.' },

  // ── Backend ───────────────────────────────────────────────
  { id: 'backend-developer', name: 'Backend Developer', icon: '⚙️', description: 'REST APIs, databases, caching, and server-side architecture.' },
  { id: 'nodejs-developer', name: 'Node.js Developer', icon: '🟢', description: 'Node.js, Express, async patterns, and JavaScript runtime internals.' },
  { id: 'python-developer', name: 'Python Developer', icon: '🐍', description: 'Python, Django, FastAPI, async, and data handling.' },
  { id: 'java-developer', name: 'Java Developer', icon: '☕', description: 'Java, Spring Boot, JVM internals, and enterprise patterns.' },
  { id: 'golang-developer', name: 'Go Developer', icon: '🐹', description: 'Go concurrency, goroutines, channels, and cloud-native services.' },
  { id: 'rust-developer', name: 'Rust Developer', icon: '🦀', description: 'Rust ownership, lifetimes, unsafe, and systems programming.' },
  { id: 'csharp-dotnet-developer', name: 'C# / .NET Dev', icon: '🔷', description: '.NET, ASP.NET Core, C# internals, and Microsoft ecosystem.' },
  { id: 'ruby-rails-developer', name: 'Ruby on Rails', icon: '💎', description: 'Ruby, Rails conventions, ActiveRecord, and web architecture.' },
  { id: 'php-developer', name: 'PHP Developer', icon: '🐘', description: 'PHP, Laravel, Symfony, Composer, and server-side scripting.' },
  { id: 'elixir-developer', name: 'Elixir / Phoenix', icon: '💜', description: 'Elixir, Phoenix, OTP, actor model, and fault-tolerant systems.' },
  { id: 'scala-developer', name: 'Scala Developer', icon: '⚡', description: 'Scala, Akka, functional programming, and big-data pipelines.' },
  { id: 'kotlin-backend', name: 'Kotlin Backend', icon: '🎯', description: 'Kotlin, Ktor, coroutines, and JVM-based backend development.' },

  // ── Fullstack & Generalist ────────────────────────────────
  { id: 'fullstack-developer', name: 'Fullstack Dev', icon: '🔄', description: 'End-to-end development covering frontend, backend, and databases.' },
  { id: 'staff-engineer', name: 'Staff Engineer', icon: '🌟', description: 'Staff-level scope, technical strategy, and cross-team impact.' },
  { id: 'principal-engineer', name: 'Principal Engineer', icon: '🏆', description: 'Org-wide architecture, technical vision, and senior IC leadership.' },

  // ── Infrastructure & Cloud ────────────────────────────────
  { id: 'devops-engineer', name: 'DevOps Engineer', icon: '♾️', description: 'CI/CD, infrastructure as code, monitoring, and release engineering.' },
  { id: 'sre-engineer', name: 'SRE', icon: '🔭', description: 'Site reliability, SLOs/SLAs, incident response, and toil reduction.' },
  { id: 'cloud-engineer', name: 'Cloud Engineer', icon: '☁️', description: 'AWS/GCP/Azure architecture, managed services, and cost optimisation.' },
  { id: 'platform-engineer', name: 'Platform Engineer', icon: '🧱', description: 'Internal developer platforms, golden paths, and self-service infra.' },
  { id: 'infrastructure-engineer', name: 'Infrastructure Eng', icon: '🏭', description: 'Networking, storage, compute, and large-scale system operations.' },
  { id: 'kubernetes-engineer', name: 'Kubernetes Eng', icon: '🎡', description: 'Kubernetes internals, operators, Helm, and container orchestration.' },

  // ── Data ─────────────────────────────────────────────────
  { id: 'data-engineer', name: 'Data Engineer', icon: '🔧', description: 'ETL/ELT pipelines, Spark, dbt, data lakes, and warehousing.' },
  { id: 'data-scientist', name: 'Data Scientist', icon: '📊', description: 'ML modelling, statistics, experimentation, and Python data stack.' },
  { id: 'ml-engineer', name: 'ML Engineer', icon: '🧪', description: 'Model training, MLOps, feature stores, and production inference.' },
  { id: 'data-analyst', name: 'Data Analyst', icon: '📈', description: 'SQL, BI tools, dashboards, A/B testing, and business metrics.' },
  { id: 'analytics-engineer', name: 'Analytics Engineer', icon: '🔬', description: 'dbt, Snowflake, data modelling, and the analytics engineering stack.' },
  { id: 'bi-developer', name: 'BI Developer', icon: '📉', description: 'Power BI, Tableau, Looker, data visualisation, and report design.' },

  // ── AI / ML Specialised ───────────────────────────────────
  { id: 'ai-frontend-engineer', name: 'AI Frontend Eng', icon: '🤖', description: 'Frontend engineering with AI integration and LLM-powered features.' },
  { id: 'ai-agentic-engineer', name: 'AI Agentic Eng', icon: '🧠', description: 'Building AI agents, tool use, and agentic workflows.' },
  { id: 'llm-engineer', name: 'LLM Engineer', icon: '🔮', description: 'Prompt engineering, fine-tuning, RAG, and LLM application design.' },
  { id: 'mlops-engineer', name: 'MLOps Engineer', icon: '🚀', description: 'ML pipelines, model serving, monitoring, and experiment tracking.' },
  { id: 'computer-vision-engineer', name: 'Computer Vision', icon: '👁️', description: 'Image processing, CNNs, object detection, and CV pipelines.' },
  { id: 'nlp-engineer', name: 'NLP Engineer', icon: '📝', description: 'Text processing, transformers, embeddings, and NLP pipelines.' },

  // ── Security ─────────────────────────────────────────────
  { id: 'security-engineer', name: 'Security Engineer', icon: '🛡️', description: 'AppSec, threat modelling, secure SDLC, and vulnerability management.' },
  { id: 'cloud-security-engineer', name: 'Cloud Security', icon: '🔐', description: 'IAM, zero-trust, cloud posture management, and compliance.' },
  { id: 'devsecops-engineer', name: 'DevSecOps', icon: '🔒', description: 'Security automation, SAST/DAST, policy-as-code, and shift-left.' },
  { id: 'penetration-tester', name: 'Penetration Tester', icon: '🕵️', description: 'Ethical hacking, OWASP, exploit development, and red teaming.' },

  // ── Quality & Testing ─────────────────────────────────────
  { id: 'qa-engineer', name: 'QA Engineer', icon: '✅', description: 'Testing strategy, test automation, and quality processes.' },
  { id: 'sdet', name: 'SDET', icon: '🧬', description: 'Software Development Engineer in Test — code-heavy test engineering.' },
  { id: 'performance-engineer', name: 'Performance Eng', icon: '⏱️', description: 'Load testing, profiling, JMeter/k6, and system optimisation.' },

  // ── Architecture & Design ─────────────────────────────────
  { id: 'solutions-architect', name: 'Solutions Architect', icon: '🗺️', description: 'System design, architecture trade-offs, and cloud solution design.' },
  { id: 'enterprise-architect', name: 'Enterprise Architect', icon: '🏛️', description: 'IT strategy, enterprise patterns, and large-org technology governance.' },
  { id: 'technical-architect', name: 'Technical Architect', icon: '📐', description: 'Hands-on architecture, coding standards, and cross-team technical guidance.' },

  // ── Embedded & Systems ────────────────────────────────────
  { id: 'embedded-systems-engineer', name: 'Embedded Systems', icon: '🔌', description: 'C/C++, RTOS, microcontrollers, hardware interfaces, and low-level programming.' },
  { id: 'systems-programmer', name: 'Systems Programmer', icon: '💻', description: 'OS internals, compilers, memory management, and low-level C/C++/Rust.' },
  { id: 'firmware-engineer', name: 'Firmware Engineer', icon: '⚡', description: 'Firmware development, bootloaders, drivers, and hardware-software interface.' },
  { id: 'iot-engineer', name: 'IoT Engineer', icon: '📡', description: 'IoT protocols (MQTT, CoAP), edge computing, and connected device systems.' },

  // ── Blockchain & Web3 ─────────────────────────────────────
  { id: 'blockchain-developer', name: 'Blockchain Dev', icon: '⛓️', description: 'Smart contracts, Solidity, Web3.js, and decentralised application design.' },
  { id: 'smart-contract-engineer', name: 'Smart Contract Eng', icon: '📜', description: 'Solidity/Vyper, EVM, security audits, and DeFi protocol design.' },

  // ── Product & Design Engineering ─────────────────────────
  { id: 'product-engineer', name: 'Product Engineer', icon: '🎨', description: 'Engineering with product thinking — shipping features end-to-end with ownership.' },
  { id: 'design-engineer', name: 'Design Engineer', icon: '✏️', description: 'Bridging design and engineering — component systems, Figma-to-code, and DX.' },

  // ── Leadership ────────────────────────────────────────────
  { id: 'engineering-manager', name: 'Engineering Manager', icon: '📋', description: 'Engineering management covering team leadership and delivery.' },
  { id: 'vp-engineering', name: 'VP of Engineering', icon: '🏢', description: 'Engineering leadership at scale — org design, strategy, and executive presence.' },
  { id: 'cto', name: 'CTO', icon: '👑', description: 'Chief Technology Officer — technology vision, investor comms, and tech culture.' },
  { id: 'devrel-engineer', name: 'DevRel Engineer', icon: '🌐', description: 'Developer relations, advocacy, and community engineering.' },
  { id: 'technical-program-manager', name: 'Technical PM', icon: '🗂️', description: 'Cross-functional delivery, program management, and technical coordination.' },
];

router.get('/tracks', (_req, res) => {
  res.json(tracks);
});

export default router;
