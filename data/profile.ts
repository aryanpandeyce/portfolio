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
  details: string[];
}

export interface ProfileCertification {
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}

export interface SkillCategory {
  name: string;
  skills: { name: string; level: number; icon: string }[];
}

export const profileData = {
  personal: {
    name: "Alex Rivera",
    role: "Full-Stack Engineer & Cloud Architect",
    tagline: "Crafting resilient distributed backends & delightfully tactile web experiences.",
    location: "San Francisco, CA / Remote",
    email: "alex.rivera.dev@example.com",
    githubUrl: "https://github.com/alexrivera-dev",
    leetcodeUrl: "https://leetcode.com/u/alexrivera_dev",
    linkedinUrl: "https://linkedin.com/in/alexrivera-dev",
    resumeUrl: "/resume.pdf",
    shortBio:
      "Full-stack engineer with over 5 years of experience building scalable microservices, low-latency APIs, and polished reactive user interfaces. Passionate about systems architecture, open-source tooling, and marrying retro computing craftsmanship with modern web standards.",
    avatarUrl: "/images/avatar.png",
  },
  stats: {
    yearsOfExperience: 5,
    projectsCompleted: 28,
    leetcodeSolved: 480,
    githubContributions: 1420,
  },
  experiences: [
    {
      company: "Apex Systems Labs",
      role: "Senior Full-Stack Engineer",
      period: "2023 — Present",
      location: "San Francisco, CA",
      achievements: [
        "Architected real-time streaming pipeline processing 12M daily events using Next.js, Node.js, and Apache Kafka, reducing processing latency by 42%.",
        "Engineered distributed cache cluster with Redis & PostgreSQL query optimizations, slashing p99 database response times from 340ms to 45ms.",
        "Led migration of monorepo frontend to Next.js App Router and Tailwind CSS, improving Core Web Vitals LCP by 65% and boosting SEO rankings across target terms.",
        "Mentored team of 6 engineers on TypeScript best practices, automated Playwright CI testing, and microservice decoupling.",
      ],
      technologies: ["Next.js", "TypeScript", "Node.js", "Kafka", "PostgreSQL", "Redis", "Docker", "AWS"],
    },
    {
      company: "CloudScale Software",
      role: "Software Engineer — Backend & Cloud",
      period: "2021 — 2023",
      location: "Austin, TX",
      achievements: [
        "Built serverless GraphQL & REST APIs on AWS Lambda and ECS serving 180,000 active monthly users with 99.98% uptime SLA.",
        "Designed asynchronous task worker queue using Go and RabbitMQ to handle multi-gigabyte file transformations and background PDF exports.",
        "Automated deployment workflows with Terraform and GitHub Actions, cutting multi-stage deployment release cycles from 45 minutes to 7 minutes.",
        "Authored internal developer tooling CLI in TypeScript used daily by 40+ engineers across the company.",
      ],
      technologies: ["Go", "TypeScript", "AWS Lambda", "GraphQL", "RabbitMQ", "Terraform", "PostgreSQL"],
    },
    {
      company: "Hyperion Digital",
      role: "Full-Stack Developer Intern",
      period: "2020 — 2021",
      location: "Boston, MA",
      achievements: [
        "Constructed responsive client dashboards using React, TypeScript, and Tailwind CSS, increasing user session duration by 28%.",
        "Implemented secure OAuth2 authentication flow and session management with JWT and HTTP-only cookies.",
        "Developed comprehensive unit and integration test suite using Jest and React Testing Library, lifting test coverage from 45% to 88%.",
      ],
      technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Jest"],
    },
  ],
  education: [
    {
      institution: "Northeastern University",
      degree: "B.S. in Computer Science & Software Engineering",
      period: "2017 — 2021",
      details: [
        "Graduated Magna Cum Laude (GPA: 3.86/4.0)",
        "Focus Areas: Distributed Systems, Database Internals, Algorithms, Human-Computer Interaction",
        "President, ACM Student Chapter & Hackathon Lead Organizer",
      ],
    },
  ],
  certifications: [
    {
      name: "AWS Certified Solutions Architect — Associate",
      issuer: "Amazon Web Services",
      date: "2023",
      credentialUrl: "https://aws.amazon.com/verification",
    },
    {
      name: "Certified Kubernetes Administrator (CKA)",
      issuer: "Cloud Native Computing Foundation (CNCF)",
      date: "2024",
      credentialUrl: "https://www.cncf.io/certification/cka/",
    },
    {
      name: "Meta Front-End Developer Professional Certificate",
      issuer: "Meta",
      date: "2022",
      credentialUrl: "https://coursera.org/verify/professional-cert/meta-frontend",
    },
  ],
  skillCategories: [
    {
      name: "Languages",
      skills: [
        { name: "TypeScript", level: 95, icon: "typescript" },
        { name: "JavaScript (ES6+)", level: 98, icon: "javascript" },
        { name: "Go (Golang)", level: 85, icon: "golang" },
        { name: "Python", level: 88, icon: "python" },
        { name: "SQL", level: 90, icon: "database" },
        { name: "HTML5/CSS3", level: 95, icon: "layout" },
      ],
    },
    {
      name: "Frontend & UI",
      skills: [
        { name: "React 19 / 18", level: 95, icon: "atom" },
        { name: "Next.js (App Router)", level: 94, icon: "cpu" },
        { name: "Tailwind CSS", level: 96, icon: "palette" },
        { name: "Framer Motion", level: 88, icon: "sparkles" },
        { name: "Three.js / R3F", level: 75, icon: "box" },
        { name: "shadcn/ui & Radix", level: 92, icon: "component" },
      ],
    },
    {
      name: "Backend & Systems",
      skills: [
        { name: "Node.js & Express", level: 92, icon: "server" },
        { name: "PostgreSQL & Prisma", level: 90, icon: "database" },
        { name: "Redis & Caching", level: 88, icon: "zap" },
        { name: "REST & GraphQL", level: 92, icon: "network" },
        { name: "Kafka & RabbitMQ", level: 80, icon: "git-commit" },
        { name: "Docker & Microservices", level: 86, icon: "container" },
      ],
    },
    {
      name: "Cloud & DevOps",
      skills: [
        { name: "AWS (S3, ECS, Lambda)", level: 86, icon: "cloud" },
        { name: "GitHub Actions CI/CD", level: 92, icon: "git-merge" },
        { name: "Terraform (IaC)", level: 78, icon: "layers" },
        { name: "Linux & Bash", level: 88, icon: "terminal" },
        { name: "Vercel & Netlify", level: 94, icon: "globe" },
        { name: "Playwright & Vitest", level: 88, icon: "check-circle" },
      ],
    },
  ],
};
