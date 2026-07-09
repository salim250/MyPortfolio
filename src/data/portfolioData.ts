export interface Project {
  id: string;
  title: string;
  company: string;
  role: string;
  period: string;
  description: string;
  tasks: string[];
  technologies: string[];
  category: 'dotnet' | 'java' | 'frontend' | 'mobile' | 'devops';
  url?: string;
  metrics?: string;
}

export interface Skill {
  name: string;
  level: number; // percentage
  category: 'core' | 'framework' | 'db' | 'devops' | 'tools';
}

export interface Language {
  name: string;
  level: string;
  percent: number;
}

export const PROFILE_INFO = {
  fullName: "Salim Brahim",
  preferredName: "Brahim Salim",
  title: "FullStack .NET & Java/Angular Engineer",
  subtitle: "Specializing in High-Scale Architectures, IoT & Automated CI/CD Pipelines",
  experienceYears: "4+",
  bio: "FullStack .NET / Java & Angular Developer with over 4 years of experience building, deploying, and maintaining modern web and mobile applications. Specialized in scalable microservices, automated testing (Selenium/MSTest), and CI/CD pipelines. Skilled in both Agile/Scrum methodologies and on-premise/cloud solutions.",
  birthdate: "November 11, 1998",
  primaryEmail: "salim.brahim.dev@gmail.com",
  backupEmail: "salimbrahim44@gmail.com",
  phone: "+216 95 733 775",
  location: "Tunis, Tunisia",
  hometown: "Mahdia, Tunisia",
  github: "https://github.com/salim250",
  linkedin: "https://www.linkedin.com/in/brahim-salim/",
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "bws-water",
    title: "Water Networks Equipment Maintenance Platform",
    company: "FREELANCE",
    role: "Fullstack Developer",
    period: "Oct 2023 - Present",
    description: "An industrial-grade IoT-enabled maintenance platform for water and hydraulic network systems across Tunisia. This system monitors active assets and provides predictive alert management.",
    tasks: [
      "Developed functional feature evolutions and bug fixes in ASP.NET MVC and AngularJS, significantly increasing platform stability and code quality.",
      "Configured automated GitHub Actions self-hosted pipelines that build, test, and instantly deploy code directly to on-premise IIS servers, creating automated version backups.",
      "Engineered automated E2E testing using Selenium and unit testing via MSTest, slash validation cycles from an entire week to under 2 hours.",
      "Worked closely in an Agile Scrum model to iterate on alerts, device diagnostics, and mapping capabilities."
    ],
    technologies: ["C#", "ASP.NET MVC 4.7", "Entity Framework", "Web API", "AngularJS", "JavaScript", "SQL Server", "Selenium", "MSTest", "GitHub Actions", "IIS", "Git", "Jira"],
    category: "dotnet",
    metrics: "Reduced testing regression cycles from 7 days to 2 hours (95% efficiency improvement)."
  },
  {
    id: "bws-energy",
    title: "BWS Platform – IoT Energy Steering Platform",
    company: "FREELANCE",
    role: "Fullstack Developer",
    period: "Oct 2023 - Present",
    description: "A comprehensive energetic monitoring and reporting ecosystem tailored for enterprises wanting to optimize their carbon footprint and reduce waste.",
    tasks: [
      "Designed and developed beautiful reactive frontend modules using Angular and robust backend systems with Java and Quarkus.",
      "Set up and operated GitLab CI pipelines, running automated JUnit test coverage metrics, SonarQube quality gates, and code-smell analysis.",
      "Pioneered a progressive modular migration of older features toward lightweight Quarkus-based microservices, reducing resource footprint and upgrading performance."
    ],
    technologies: ["Java", "Quarkus", "Angular", "TypeScript", "REST API", "JUnit", "SonarQube", "GitLab CI", "Docker", "Git"],
    category: "java",
    metrics: "Migrated 4 legacy modules to Quarkus microservices, improving memory overhead by 40%."
  },
  {
    id: "bws-fleet",
    title: "Smart Fleet Management & Mobile Ticketing",
    company: "FREELANCE",
    role: "Fullstack Developer",
    period: "Oct 2023 - Present",
    description: "A transportation platform featuring live GPS tracking and ticketing for public/private operators.",
    tasks: [
      "Implemented a backend planning optimizer utilizing OptaPlanner, analyzing thousands of route/driver constraints to yield optimal assignments.",
      "Developed slick Angular Material dashboard applications to manage and view vehicle positions in real-time.",
      "Created a native Kotlin Android app for rugged PDA terminal devices used by conductors on the move.",
      "Integrated electronic secure payments with the D17 wallet system directly onto PDA printers for mobile validation."
    ],
    technologies: ["Java", "Quarkus", "GraphQL", "Angular", "Angular Material", "Kotlin (Android)", "OptaPlanner", "MySQL", "D17 API", "JUnit"],
    category: "mobile",
    metrics: "Optimized driver schedules using OptaPlanner, saving up to 15% in daily fuel overhead."
  },
  {
    id: "bws-vtce",
    title: "Visual Test Case Editor (VTCE)",
    company: "FREELANCE",
    role: "Lead Designer & Developer",
    period: "Oct 2023 - Present",
    description: "An internal testing automation SaaS that allows QA and product managers to draw testing workflows visually and execute them automatically.",
    tasks: [
      "Designed and architected the full system with a beautiful drag-and-drop workflow interface using Angular, Tailwind CSS, and a Java Quarkus backend.",
      "Orchestrated test run sessions with Selenium WebDriver, storing detailed execution histories, visual dashboards, and exportable PDFs.",
      "Secured the enterprise platform using Keycloak OAuth2/OIDC integration for fine-grained role authorization."
    ],
    technologies: ["Java", "Quarkus", "Angular", "TypeScript", "Tailwind CSS", "Selenium WebDriver", "Keycloak", "OAuth2", "PostgreSQL", "SonarQube", "ESLint"],
    category: "devops",
    metrics: "Enabled non-technical product managers to configure over 50 automated QA routines."
  },
  {
    id: "twinkl",
    title: "TWINKL Education Web & Mobile App",
    company: "Freelance",
    role: "Fullstack & Mobile Architect",
    period: "2025 - 2026",
    description: "A high-performance modern web and mobile platform for an interactive educational and training center.",
    tasks: [
      "Engineered the responsive client web application using React, TypeScript, and Vite for lightning-fast loads.",
      "Designed a real-time secure teacher/student portal powered by Supabase for authentication, state-driven database, and bucket storage.",
      "Transformed the codebase into native Android and iOS builds with Capacitor, avoiding separate codebase maintenance."
    ],
    technologies: ["React", "TypeScript", "Vite", "Supabase", "Capacitor", "Tailwind CSS", "Git"],
    category: "frontend",
    url: "https://www.twinkleducation.org/",
    metrics: "Single-source web & mobile deployment, saving 50% in standard maintenance overhead."
  },
  {
    id: "shinzy",
    title: "Shinzy – Artistic Talent Networking App",
    company: "Freelance",
    role: "Mobile App Developer",
    period: "2025 - 2026",
    description: "A dual-market social and professional network built for artists, casting directors, and capital investors to discover talent, pitch projects, and chat.",
    tasks: [
      "Crafted a gorgeous cross-platform experience using React Native and Expo.",
      "Designed dynamic feed systems, media-rich portfolios, and full local SQLite database sync for offline operation.",
      "Added multi-lingual localization, native onboarding wizards, and smart persistent push notifications."
    ],
    technologies: ["React Native", "Expo", "TypeScript", "SQLite", "Local Storage", "Tailwind CSS", "Git"],
    category: "mobile",
    metrics: "Achieved seamless 60fps animations and instant local data query using indexed SQLite schemas."
  },
  {
    id: "addinn-claims",
    title: "Claims Management Platform",
    company: "FREELANCE",
    role: "Java Software Engineer",
    period: "Nov 2022 - Feb 2023",
    description: "An enterprise platform built for corporate claims resolution tracking using highly configurable BPMN state-machines.",
    tasks: [
      "Integrated Alfresco Activiti to design custom graphical workflows, enabling automatic escalation of claims.",
      "Developed backend RESTful APIs in Spring and handled ECM metadata tagging."
    ],
    technologies: ["Java", "Spring", "Alfresco Activiti", "BPMN 2.0", "RESTful API", "PostgreSQL"],
    category: "java"
  },
  {
    id: "addinn-pfe",
    title: "Web Debt Collection & Settlement Platform (PFE)",
    company: "FREELANCE",
    role: "Software Engineer Intern",
    period: "Feb 2022 - Aug 2022",
    description: "His graduation project (Projet de Fin d'Études) focusing on real-time collection processes and automated notification triggers.",
    tasks: [
      "Designed debt state models with Alfresco Activiti BPMN workflow systems.",
      "Wrote responsive Angular UI with robust Spring Boot background workers."
    ],
    technologies: ["Java", "Spring Boot", "Angular", "Alfresco Activiti", "PostgreSQL", "UML"],
    category: "java"
  }
];

export const SKILLS_DATA: Skill[] = [
  // Core Languages
  { name: "C# / .NET", level: 88, category: "core" },
  { name: "Java (JEE, Quarkus, Spring)", level: 85, category: "core" },
  { name: "TypeScript & JavaScript", level: 80, category: "core" },
  { name: "HTML5 & CSS3 & Tailwind CSS", level: 90, category: "core" },
  
  // Frameworks
  { name: "Angular / AngularJS", level: 85, category: "framework" },
  { name: "React / React Native", level: 82, category: "framework" },
  { name: "ASP.NET MVC / Web API", level: 86, category: "framework" },
  { name: "Quarkus & Spring Boot", level: 84, category: "framework" },
  
  // Databases
  { name: "Microsoft SQL Server", level: 85, category: "db" },
  { name: "PostgreSQL", level: 88, category: "db" },
  { name: "MySQL", level: 82, category: "db" },
  { name: "Supabase & SQLite", level: 80, category: "db" },
  
  // DevOps & QA
  { name: "GitHub Actions / Self-Hosted", level: 90, category: "devops" },
  { name: "GitLab CI / CD", level: 85, category: "devops" },
  { name: "Selenium WebDriver & E2E Testing", level: 88, category: "devops" },
  { name: "Docker & Containerization", level: 80, category: "devops" },
  { name: "SonarQube & Quality Gates", level: 85, category: "devops" },
  { name: "IIS Configuration & Hosting", level: 85, category: "devops" },
  
  // Tools & Collaboration
  { name: "Agile / Scrum (Jira, Confluence)", level: 90, category: "tools" },
  { name: "Keycloak OAuth2 / OIDC Security", level: 80, category: "tools" },
  { name: "OptaPlanner Optimization Engine", level: 78, category: "tools" },
  { name: "Capacitor & Expo (Mobile wrappers)", level: 82, category: "tools" }
];

export const LANGUAGES_DATA: Language[] = [
  { name: "Arabic", level: "Native / Mother Tongue", percent: 100 },
  { name: "French", level: "Professional working proficiency (B2)", percent: 75 },
  { name: "English", level: "Professional proficiency (B2)", percent: 75 }
];

export const EDUCATION_DATA = [
  {
    institution: "ESPRIT (École Supérieure Privée d’Ingénierie et de Technologie)",
    degree: "National Engineering Degree in Computer Science (Diplôme d'Ingénieur)",
    period: "2019 – 2022",
    details: "Specialized in Software Engineering and Enterprise Architectures."
  },
  {
    institution: "IPEIM (Institut Préparatoire aux Études d'Ingénieurs de Monastir)",
    degree: "Maths and Physics Preparatory Cycle",
    period: "2017 – 2019",
    details: "Intensive national mathematics and physics scientific preparation."
  }
];

export const CERTIFICATIONS_DATA = [
  {
    title: "Microsoft Certified: Azure Fundamentals (AZ-900)",
    issuer: "Microsoft",
    year: "2025",
    link: "#"
  }
];

export const BLOG_POST = {
  id: "dotnet-cicd-github-actions",
  title: "Setting Up CI/CD for .NET Web Applications Using GitHub Actions and Self-Hosted Windows Runners",
  subtitle: "Modern development workflows demand automation, consistency, and flexibility—especially when deploying .NET applications to on-premises IIS infrastructure.",
  author: "Salim Brahim",
  date: "June 9, 2025",
  readTime: "8 min read",
  tags: [".NET", "CI/CD", "GitHub Actions", "IIS", "DevOps"],
  intro: "While cloud-based CI/CD solutions work well for public-facing apps, many enterprises require self-hosted runners due to security policies, compliance, or performance needs. This guide provides a step-by-step approach to setting up a self-hosted Windows runner with GitHub Actions, automating builds, and deploying to IIS.",
  sections: [
    {
      title: "Why Use a Self-Hosted Runner?",
      content: "GitHub-hosted runners are extremely convenient, but self-hosted runners offer full control over your secure build environment, zero waiting queue times, instant local access to private internal servers (like on-premise IIS and staging databases), and complete compliance with corporate network policies."
    },
    {
      title: "Step 1: Install Chocolatey on the Server",
      content: "Chocolatey is a superb package manager for Windows that allows you to easily script installations. Open an administrative PowerShell prompt on your target Windows server and execute:",
      code: `Set-ExecutionPolicy Bypass -Scope Process -Force;
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072;
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))`,
      tip: "Verify installation with: choco -v. If it fails, double check proxy rules or group policies."
    },
    {
      title: "Step 2: Install Required Build Tools",
      content: "Since we are compiling enterprise .NET Framework apps, we require the MSBuild compiler tools and potentially a modern .NET SDK. Install them automatically via Chocolatey:",
      code: `choco install visualstudio2022buildtools \`
--params "'--add Microsoft.VisualStudio.Workload.WebBuildTools --quiet --norestart'" -y`,
      note: "For .NET Core or .NET 6+ platforms, also install the SDK: choco install dotnet-sdk -y"
    },
    {
      title: "Step 3: Register your GitHub Self-Hosted Runner",
      content: "Go to your GitHub repository -> Settings -> Actions -> Runners, click 'New self-hosted runner' and choose 'Windows'. Run the downloaded setup scripts on your Windows server. Once completed, your console will show:",
      code: `√ Connected to GitHub
Listening for Jobs...`,
      tip: "Install the runner as a Windows Service (./config.cmd --service) so it starts automatically if the server reboots."
    },
    {
      title: "Step 4: Configure IIS for Hosting",
      content: "Open IIS Manager (inetmgr), add your website mapping to 'C:\\inetpub\\wwwroot\\MyApp', and assign the correct directory permissions to let the runner write the compiled artifacts:",
      code: `icacls "C:\\inetpub\\wwwroot\\MyApp" /grant "IIS_IUSRS:(OI)(CI)(F)"`
    },
    {
      title: "Sample GitHub Actions Workflow (The pipeline file)",
      content: "Create a .github/workflows/deploy.yml in your repo. This pipeline will automatically stop IIS, back up the previous release with a timestamp, publish the new .NET artifacts, and bring IIS back online:",
      code: `name: .NET CI/CD to IIS

on:
  push:
    branches: [ main ]

jobs:
  build-deploy:
    runs-on: self-hosted  # Executes on your newly-connected Windows server

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup .NET SDK
        uses: actions/setup-dotnet@v3
        with:
          dotnet-version: '6.0.x'

      - name: Restore NuGet Packages
        run: dotnet restore MyApp.sln

      - name: Backup Old Deployment (PowerShell)
        shell: powershell
        run: |
          $DeployPath = "C:\\inetpub\\wwwroot\\MyApp"
          $BackupPath = "C:\\inetpub\\wwwroot\\Backups"
          $Timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
          $BackupFolder = "$BackupPath\\MyApp_$Timestamp"

          if (!(Test-Path $BackupPath)) { New-Item -Path $BackupPath -ItemType Directory }

          Write-Host "Stopping IIS..."
          iisreset /stop

          if (Test-Path $DeployPath) {
              Move-Item -Path $DeployPath -Destination $BackupFolder
              Write-Host "Backup saved to: $BackupFolder"
          }

          New-Item -Path $DeployPath -ItemType Directory | Out-Null

      - name: Build & Publish
        run: dotnet publish MyApp/MyApp.csproj -c Release -o C:\\inetpub\\wwwroot\\MyApp

      - name: Restart IIS
        run: iisreset /start`
    }
  ]
};
