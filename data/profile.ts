export interface ProfileExperience {
  company: string;
  role: string;
  period: string;
  location: string;
  achievements: string[];
  technologies: string[];
}

export interface ProfileEducation {
  institution: string;
  degree: string;
  period: string;
  grade: string;
  details: string[];
}

export interface ProfileAchievement {
  title: string;
  issuer: string;
  year: string;
  description: string;
  badgeIcon: "award" | "trophy" | "flame" | "star";
}

export interface SkillItem {
  name: string;
  tier: "Daily Driver" | "Production" | "Built Projects";
  proof: string;
  proofUrl?: string;
  icon: string;
}

export interface SkillCategoryGroup {
  id: string;
  name: string;
  description: string;
  skills: SkillItem[];
}

export interface ProfileCertification {
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}

export interface ProfileData {
  personal: {
    name: string;
    role: string;
    headline: string;
    secondaryLine: string;
    location: string;
    email: string;
    phone?: string;
    githubUrl: string;
    githubUsername: string;
    leetcodeUsername: string;
    leetcodeUrl: string;
    linkedinUrl: string;
    resumeUrl: string;
    shortBio: string;
    aboutNarrative: string;
    openToWork: boolean;
  };
  stats: {
    yearsOfExperience: string;
    leadsManaged: string;
    crmSalesTracked: string;
    projectsCompleted: string;
    leetcodeStreak: string;
  };
  experiences: ProfileExperience[];
  education: ProfileEducation[];
  achievements: ProfileAchievement[];
  certifications: ProfileCertification[];
  skillTree: SkillCategoryGroup[];
}

export const profileData: ProfileData = {
  personal: {
    name: "Aryan Pandey",
    role: "Backend & Cloud-Native Engineer",
    headline: "Backend & Cloud-Native Engineer | Go, Java, Distributed Systems",
    secondaryLine: "Full-stack roots in React and Node. Building scalable, observable microservices.",
    location: "Ahmedabad, India",
    email: "aryanpandey.ce@gmail.com",
    githubUrl: "https://github.com/aryanpandeyce",
    githubUsername: "aryanpandeyce",
    leetcodeUsername: "aryan_inzy",
    leetcodeUrl: "https://leetcode.com/u/aryan_inzy/",
    linkedinUrl: "https://linkedin.com/in/aryanpandeyce",
    resumeUrl: "/resume.pdf",
    shortBio:
      "Backend and cloud-native engineer with deep full-stack roots. Experienced in architecting distributed systems with Go, Java Spring Boot, and Kubernetes, and building production SaaS backends with Node.js and PostgreSQL. Driven by engineering rigor, TDD, architectural decision records (ADRs), and deep observability.",
    aboutNarrative:
      "I am Aryan Pandey, a Backend & Cloud-Native Engineer based in Ahmedabad, India. My journey started with full-stack engineering across React and Node, building high-throughput business applications and SaaS real estate CRM platforms. I moved deeper into distributed backend systems, event-driven architectures with Kafka and RabbitMQ, and cloud-native microservices with Go, Java 21, and Kubernetes. At Shyam Group, I architected a 10-module CRM handling 4,000+ leads and built a locally-hosted LLM assistant with RAG over live CRM data. I ship software with automated CI/CD gates, unit tests, SonarQube quality gates, and end-to-end observability.",
    openToWork: true,
  },
  stats: {
    yearsOfExperience: "3+",
    leadsManaged: "4,000+",
    crmSalesTracked: "INR 6.3 Cr+",
    projectsCompleted: "10+",
    leetcodeStreak: "365-Day",
  },
  experiences: [
    {
      company: "Shyam Group (IntelliWorkz)",
      role: "Full Stack Developer, Real Estate CRM",
      period: "Aug 2025 — Oct 2026",
      location: "Ahmedabad, India",
      achievements: [
        "Built a 10+ module SaaS-style CRM (Leads, Customers, Projects, Quotations, Follow-ups, Site Visits, Tasks, Reports, Chat) with ReactJS, NodeJS, ExpressJS, and PostgreSQL, managing 4,000+ leads across 10 projects and 63 units for 19 users, tracking INR 6.3 Cr+ in sales value.",
        "Designed a 9-stage lead pipeline (New -> Sale Closed) with indexed search and server-side pagination (403 pages), unifying 3 lead sources (Meta 62%, Website 26%, Own CRM 13%).",
        "Integrated 6 channels (Meta Lead Ads, 99acres, Housing.com, MagicBricks, WhatsApp, Gmail/SMTP) via REST APIs and webhooks, removing manual entry.",
        "Implemented round-robin auto-assignment (500-950 leads per agent), bulk import/export, and JWT RBAC across 3 roles with seat limits (19/20) and single-device sessions.",
        "Delivered KPI dashboard (7D/30D/90D trends) and 7 analytics reports with CSV/PDF export; Kanban follow-ups tracking 80+ overdue items.",
        "Built an AI assistant on a locally hosted LLM (Qwen via Ollama) with a vector database and RAG over live CRM data so 19 users can query pipeline and project status in natural language, with all data kept on company infrastructure.",
      ],
      technologies: [
        "ReactJS",
        "Node.js",
        "ExpressJS",
        "PostgreSQL",
        "Ollama",
        "Qwen LLM",
        "RAG",
        "Vector DB",
        "JWT",
        "REST APIs",
        "Webhooks",
      ],
    },
    {
      company: "Technomine",
      role: "Junior Software Developer",
      period: "Sept 2023 — Jul 2025",
      location: "Ahmedabad, India",
      achievements: [
        "Delivered 4 business apps (HRMS V1/V2, Travel Booking System, Call Log Report Tool) using ReactJS, NodeJS, ExpressJS, and ASP.NET across 3 databases (SQL Server, MongoDB, MySQL).",
        "Built a Node/Express layer over legacy ASP web services (XML->JSON) powering 3 React modules (Leave, Attendance, Profile); rebuilt the front end in ASP.NET on IIS.",
        "Replaced an email-based booking process with a unified tool covering search, booking, and cancellation; integrated 2 telephony APIs (3CX, Portsip) with JWT for printable call reports.",
      ],
      technologies: [
        "ReactJS",
        "Node.js",
        "ExpressJS",
        "ASP.NET",
        "SQL Server",
        "MongoDB",
        "MySQL",
        "IIS",
        "REST",
        "XML/JSON",
      ],
    },
    {
      company: "Techno Hacks Edutech",
      role: "Frontend Developer Intern",
      period: "Jul 2023 — Aug 2023",
      location: "Nashik, India (Remote)",
      achievements: [
        "Built 3 responsive front-end projects: high-converting landing pages, a real-time currency converter, and a ReactJS country-info app consuming public REST APIs.",
        "Engineered reusable UI components, client-side input validation, and asynchronous data fetching with robust error boundaries.",
      ],
      technologies: ["ReactJS", "JavaScript (ES6+)", "HTML5", "CSS3", "REST APIs"],
    },
  ],
  education: [
    {
      institution: "Gujarat Technological University",
      degree: "Bachelor of Engineering in Computer Science",
      period: "Aug 2020 — May 2024",
      grade: "CGPA 9.03 / 10.0",
      details: [
        "First Class with Distinction (CGPA: 9.03/10.0)",
        "Focus Areas: Data Structures & Algorithms, Distributed Computing, Database Management Systems, Object-Oriented Design",
        "Recipient of Dewang Mehta IT Award 2023 for Academic & Technical Excellence",
        "Google Developer Student Club Lead",
      ],
    },
    {
      institution: "Indian Institute of Technology Madras (IIT Madras)",
      degree: "BSc in Data Science & Programming (Online)",
      period: "Jan 2021 — Dec 2021",
      grade: "GPA 6.80 / 10.0",
      details: [
        "Coursework in Computational Thinking, Python Programming, and Statistical Data Analysis",
      ],
    },
  ],
  achievements: [
    {
      title: "Dewang Mehta IT Award 2023",
      issuer: "NASSCOM & Gujarat Technological University",
      year: "2023",
      description: "Recognized for top academic achievement and engineering innovation in Computer Science.",
      badgeIcon: "trophy" as const,
    },
    {
      title: "HackerRank 5-Star JavaScript",
      issuer: "HackerRank",
      year: "2023",
      description: "Attained highest 5-Star proficiency rating in core JavaScript and algorithmic problem solving.",
      badgeIcon: "star" as const,
    },
    {
      title: "365-Day LeetCode Streak",
      issuer: "LeetCode",
      year: "2024",
      description: "Consistent 365 consecutive days of solving algorithmic challenges across trees, graphs, and DP.",
      badgeIcon: "flame" as const,
    },
    {
      title: "Google Developer Student Club Lead",
      issuer: "Google Developers",
      year: "2022 — 2023",
      description: "Led developer community workshops, open-source hackathons, and technical study jams on campus.",
      badgeIcon: "award" as const,
    },
  ],
  certifications: [
    {
      name: "HackerRank 5-Star JavaScript Proficiency",
      issuer: "HackerRank",
      date: "2023",
      credentialUrl: "https://www.hackerrank.com/certificates",
    },
    {
      name: "Dewang Mehta IT Innovation & Academic Excellence",
      issuer: "NASSCOM & GTU",
      date: "2023",
    },
    {
      name: "Google Developer Student Clubs Lead Credential",
      issuer: "Google Developers",
      date: "2023",
    },
    {
      name: "365-Day Algorithmic Problem Solving Merit",
      issuer: "LeetCode",
      date: "2024",
    },
  ],
  // Evidence-Based Skill Loadout (No fake percentage bars; verified against actual projects & roles)
  skillTree: [
    {
      id: "languages",
      name: "Programming Languages",
      description: "Core languages used daily for high-throughput services and full-stack systems.",
      skills: [
        {
          name: "Go (Golang)",
          tier: "Daily Driver",
          proof: "FleetPulse microservices, gRPC handlers, token-bucket limiter, consistent hashing",
          proofUrl: "https://github.com/aryanpandeyce/FleetPulse",
          icon: "golang",
        },
        {
          name: "Java 21",
          tier: "Daily Driver",
          proof: "ApexPay 6-service payment platform, choreographed Saga, Spring Boot 3",
          proofUrl: "https://github.com/aryanpandeyce/payment-platform-java",
          icon: "java",
        },
        {
          name: "TypeScript",
          tier: "Daily Driver",
          proof: "LendStrangler microservices, modern frontends, type-safe API layers",
          proofUrl: "https://github.com/aryanpandeyce/LendStrangler",
          icon: "typescript",
        },
        {
          name: "JavaScript (ES6+)",
          tier: "Production",
          proof: "IntelliWorkz CRM SaaS backend, HackerRank 5-Star, Technomine HRMS",
          proofUrl: "https://github.com/aryanpandeyce",
          icon: "javascript",
        },
        {
          name: "SQL",
          tier: "Production",
          proof: "Indexed 9-stage lead pipeline, complex aggregations across PostgreSQL & MySQL",
          proofUrl: "https://github.com/aryanpandeyce",
          icon: "database",
        },
        {
          name: "Python",
          tier: "Built Projects",
          proof: "Data processing, IIT Madras coursework, scripting automation",
          proofUrl: "https://github.com/aryanpandeyce",
          icon: "python",
        },
      ],
    },
    {
      id: "backend",
      name: "Backend & Microservices",
      description: "Distributed architectures, event-driven streaming, and transactional patterns.",
      skills: [
        {
          name: "Spring Boot 3",
          tier: "Daily Driver",
          proof: "ApexPay multi-module Maven architecture, Spring Security, Actuator",
          proofUrl: "https://github.com/aryanpandeyce/payment-platform-java",
          icon: "spring",
        },
        {
          name: "Spring Security",
          tier: "Production",
          proof: "ApexPay: BCrypt(12), 15-min JWT with rotation, RBAC, lockout, rate limiting",
          proofUrl: "https://github.com/aryanpandeyce/payment-platform-java",
          icon: "shield",
        },
        {
          name: "Node.js & Express",
          tier: "Production",
          proof: "IntelliWorkz CRM 10 modules, Technomine ASP-middleware layer, LendStrangler",
          proofUrl: "https://github.com/aryanpandeyce/LendStrangler",
          icon: "nodejs",
        },
        {
          name: "gRPC & Protocol Buffers",
          tier: "Daily Driver",
          proof: "FleetPulse inter-service communication, device claim, telemetry ingestion",
          proofUrl: "https://github.com/aryanpandeyce/FleetPulse",
          icon: "network",
        },
        {
          name: "Apache Kafka",
          tier: "Production",
          proof: "ApexPay choreographed Saga across 4 Kafka topics, Transactional Outbox, DLQs",
          proofUrl: "https://github.com/aryanpandeyce/payment-platform-java",
          icon: "kafka",
        },
        {
          name: "RabbitMQ",
          tier: "Production",
          proof: "LendStrangler 5-event Saga with compensation, idempotent consumers",
          proofUrl: "https://github.com/aryanpandeyce/LendStrangler",
          icon: "rabbitmq",
        },
        {
          name: "NATS Messaging",
          tier: "Built Projects",
          proof: "FleetPulse real-time telemetry distribution and worker fan-out",
          proofUrl: "https://github.com/aryanpandeyce/FleetPulse",
          icon: "zap",
        },
        {
          name: "Saga & Transactional Outbox",
          tier: "Production",
          proof: "ApexPay (Kafka) and LendStrangler (RabbitMQ) distributed transactions",
          proofUrl: "https://github.com/aryanpandeyce/payment-platform-java",
          icon: "layers",
        },
        {
          name: "Event-Driven Architecture",
          tier: "Production",
          proof: "Decoupled domain services, asynchronous event logs, idempotent processing",
          proofUrl: "https://github.com/aryanpandeyce/FleetPulse",
          icon: "git-commit",
        },
        {
          name: "REST APIs & Webhooks",
          tier: "Production",
          proof: "6-channel CRM integration (Meta Ads, 99acres, WhatsApp, SMTP, MagicBricks)",
          proofUrl: "https://github.com/aryanpandeyce",
          icon: "globe",
        },
      ],
    },
    {
      id: "cloud",
      name: "Cloud, DevOps & Observability",
      description: "Containerization, orchestration, automated pipelines, and telemetry.",
      skills: [
        {
          name: "Kubernetes & Helm",
          tier: "Daily Driver",
          proof: "FleetPulse HPA, rolling updates; ApexPay OpenShift restricted-v2 Helm charts",
          proofUrl: "https://github.com/aryanpandeyce/FleetPulse",
          icon: "kubernetes",
        },
        {
          name: "Docker & Containerization",
          tier: "Production",
          proof: "Multi-stage Docker builds across Go, Java 21, and Node.js microservices",
          proofUrl: "https://github.com/aryanpandeyce/LendStrangler",
          icon: "docker",
        },
        {
          name: "Terraform (IaC)",
          tier: "Built Projects",
          proof: "FleetPulse cloud provisioning, AWS S3/SQS configuration via LocalStack",
          proofUrl: "https://github.com/aryanpandeyce/FleetPulse",
          icon: "layers",
        },
        {
          name: "AWS (S3, SQS, ECS)",
          tier: "Production",
          proof: "FleetPulse S3/SQS queues, cloud object storage, deployment pipelines",
          proofUrl: "https://github.com/aryanpandeyce/FleetPulse",
          icon: "cloud",
        },
        {
          name: "Prometheus & Grafana",
          tier: "Production",
          proof: "3 ApexPay dashboards, FleetPulse latency/throughput service monitors",
          proofUrl: "https://github.com/aryanpandeyce/payment-platform-java",
          icon: "activity",
        },
        {
          name: "ELK Stack (Elasticsearch, Logstash, Kibana)",
          tier: "Production",
          proof: "Structured JSON log indexing and centralized tracing in ApexPay",
          proofUrl: "https://github.com/aryanpandeyce/payment-platform-java",
          icon: "search",
        },
        {
          name: "GitHub Actions CI/CD",
          tier: "Production",
          proof: "FleetPulse 80%+ coverage gate, static analysis, automated container build",
          proofUrl: "https://github.com/aryanpandeyce/FleetPulse",
          icon: "git-merge",
        },
        {
          name: "GitLab CI/CD & SonarQube",
          tier: "Production",
          proof: "ApexPay 6-stage pipeline with SonarQube quality gate and Trivy scanner",
          proofUrl: "https://github.com/aryanpandeyce/payment-platform-java",
          icon: "check-circle",
        },
      ],
    },
    {
      id: "databases",
      name: "Databases & Storage",
      description: "Relational, document, and in-memory databases with indexing optimization.",
      skills: [
        {
          name: "PostgreSQL",
          tier: "Production",
          proof: "IntelliWorkz CRM 4,000+ leads, ApexPay ledger, FleetPulse relational store",
          proofUrl: "https://github.com/aryanpandeyce",
          icon: "database",
        },
        {
          name: "Redis",
          tier: "Production",
          proof: "Distributed rate limiter tokens, session store, hot cache layers",
          proofUrl: "https://github.com/aryanpandeyce/FleetPulse",
          icon: "zap",
        },
        {
          name: "MongoDB",
          tier: "Production",
          proof: "Technomine business apps, ApexPay audit logging and event store",
          proofUrl: "https://github.com/aryanpandeyce/payment-platform-java",
          icon: "database",
        },
        {
          name: "MySQL & SQL Server",
          tier: "Production",
          proof: "Technomine HRMS V1/V2, call log reports, relational query tuning",
          proofUrl: "https://github.com/aryanpandeyce",
          icon: "database",
        },
      ],
    },
    {
      id: "frontend",
      name: "Frontend & UI Systems",
      description: "Responsive user interfaces, state management, and modern component design.",
      skills: [
        {
          name: "ReactJS",
          tier: "Production",
          proof: "IntelliWorkz 10-module CRM, Technomine HRMS modules, LendStrangler UI",
          proofUrl: "https://github.com/aryanpandeyce",
          icon: "atom",
        },
        {
          name: "Redux & State Architecture",
          tier: "Production",
          proof: "ApexPay payment UI state, complex multi-step transaction workflows",
          proofUrl: "https://github.com/aryanpandeyce/payment-platform-java",
          icon: "cpu",
        },
        {
          name: "Tailwind CSS",
          tier: "Production",
          proof: "Production dashboards, design systems, responsive layouts",
          proofUrl: "https://github.com/aryanpandeyce",
          icon: "palette",
        },
        {
          name: "HTML5 & Modern CSS",
          tier: "Production",
          proof: "Accessible semantic HTML, print-friendly styling, custom retro themes",
          proofUrl: "https://github.com/aryanpandeyce",
          icon: "layout",
        },
      ],
    },
    {
      id: "ai-data",
      name: "AI & Data Engineering",
      description: "Local LLM integration, RAG pipelines, and operational ML.",
      skills: [
        {
          name: "Retrieval-Augmented Generation (RAG)",
          tier: "Production",
          proof: "IntelliWorkz live CRM query assistant over project & pipeline state",
          proofUrl: "https://github.com/aryanpandeyce",
          icon: "book-open",
        },
        {
          name: "Local LLMs (Ollama / Qwen)",
          tier: "Production",
          proof: "Self-hosted privacy-preserving LLM assistant on internal infrastructure",
          proofUrl: "https://github.com/aryanpandeyce",
          icon: "cpu",
        },
        {
          name: "Vector Databases",
          tier: "Production",
          proof: "Embedding CRM pipeline records for semantic similarity search",
          proofUrl: "https://github.com/aryanpandeyce",
          icon: "database",
        },
        {
          name: "Anomaly Detection (EWMA / Z-Score)",
          tier: "Built Projects",
          proof: "FleetPulse real-time telemetry anomaly flagging algorithm",
          proofUrl: "https://github.com/aryanpandeyce/FleetPulse",
          icon: "activity",
        },
      ],
    },
    {
      id: "core-cs",
      name: "Core Computer Science",
      description: "Fundamental theory, algorithms, patterns, and engineering discipline.",
      skills: [
        {
          name: "Data Structures & Algorithms",
          tier: "Daily Driver",
          proof: "Consistent hashing, min-heap scheduler, token bucket, LRU in FleetPulse",
          proofUrl: "https://github.com/aryanpandeyce/FleetPulse",
          icon: "code",
        },
        {
          name: "Distributed Systems Architecture",
          tier: "Daily Driver",
          proof: "Leader election, dead-letter queues, idempotent consumers, Saga",
          proofUrl: "https://github.com/aryanpandeyce/payment-platform-java",
          icon: "network",
        },
        {
          name: "Design Patterns (Strangler, Outbox)",
          tier: "Production",
          proof: "LendStrangler Strangler Fig migration with 0.00% response diff",
          proofUrl: "https://github.com/aryanpandeyce/LendStrangler",
          icon: "layers",
        },
        {
          name: "Test-Driven Development (TDD)",
          tier: "Production",
          proof: "JUnit 5, Mockito, Testcontainers, k6 load testing, 80%+ CI coverage gates",
          proofUrl: "https://github.com/aryanpandeyce/FleetPulse",
          icon: "check-circle",
        },
      ],
    },
  ],
};
