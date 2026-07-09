import React, { useState, useEffect, useRef } from "react";
import {
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Award,
  FileText,
  Terminal,
  CheckCircle2,
  Play,
  RefreshCw,
  Search,
  ArrowRight,
  ExternalLink,
  Menu,
  X,
  Sun,
  Moon,
  Code,
  Database,
  Cpu,
  Layers,
  Activity,
  Check,
  Copy,
  ChevronRight,
  Info,
  Sparkles,
  Clock,
  ArrowLeft,
  Send,
  Smartphone,
  Eye,
  Download
} from "lucide-react";
import {
  PROFILE_INFO,
  PROJECTS_DATA,
  SKILLS_DATA,
  LANGUAGES_DATA,
  EDUCATION_DATA,
  CERTIFICATIONS_DATA,
  BLOG_POST,
  Project
} from "./data/portfolioData";
import PublishedBlogs from "./components/PublishedBlogs";

// Inline Custom SVGs for Social Icons to ensure absolute build stability
const GithubIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function App() {
  // Theme state (default dark for sleek dev look, easily toggleable)
  const [darkMode, setDarkMode] = useState<boolean>(false);
  
  // Project filter states
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Blog viewer states
  const [showFullBlog, setShowFullBlog] = useState<boolean>(false);
  const [copiedTextId, setCopiedTextId] = useState<string | null>(null);
  
  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  
  // Contact state
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSending, setIsSending] = useState<boolean>(false);
  const [sentMessages, setSentMessages] = useState<Array<{
    id: string;
    timestamp: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    reply: string;
  }>>([]);
  const [contactAlert, setContactAlert] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  // Interactive CI/CD pipeline simulator states
  const [pipelineState, setPipelineState] = useState<{
    isRunning: boolean;
    currentStep: number;
    logs: string[];
    status: 'idle' | 'running' | 'success' | 'failed';
  }>({
    isRunning: false,
    currentStep: -1,
    logs: [],
    status: 'idle'
  });

  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll terminal logs
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [pipelineState.logs]);

  // Skills Categories
  const skillCategories = [
    { id: "all", label: "All Skills" },
    { id: "core", label: "Languages" },
    { id: "framework", label: "Frameworks" },
    { id: "db", label: "Databases" },
    { id: "devops", label: "DevOps & QA" },
    { id: "tools", label: "Tools & Ecosystem" }
  ];
  const [activeSkillCat, setActiveSkillCat] = useState<string>("all");

  // Filtering Projects
  const filteredProjects = PROJECTS_DATA.filter((project) => {
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase())) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle contact submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      setContactAlert({ type: 'error', text: "Please fill in all required fields." });
      return;
    }
    
    setIsSending(true);
    setContactAlert(null);
    
    // Simulate SMTP delivery with realistic console logs
    setTimeout(() => {
      const generatedReply = `Hello ${contactForm.name}! \n\nThank you for reaching out through my portfolio. I've received your inquiry regarding "${contactForm.subject || 'Opportunity'}".\n\nSince this is an interactive CV simulator, your message has been saved in my web state! I will also receive a direct notification at salim.brahim.dev@gmail.com and reply back to you at ${contactForm.email} shortly.\n\nLet's connect soon!\nBest regards,\nSalim Brahim.`;
      
      const newMessage = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        name: contactForm.name,
        email: contactForm.email,
        subject: contactForm.subject || "No Subject",
        message: contactForm.message,
        reply: generatedReply
      };
      
      setSentMessages(prev => [newMessage, ...prev]);
      setIsSending(false);
      setContactForm({ name: "", email: "", subject: "", message: "" });
      setContactAlert({
        type: 'success',
        text: "Message delivered successfully! See the simulated response below."
      });
    }, 1800);
  };

  // Run DevOps Pipeline Simulator
  const triggerPipeline = () => {
    if (pipelineState.isRunning) return;
    
    const steps = [
      {
        title: "Initializing Workspace & Self-Hosted Windows Runner Connection",
        delay: 800,
        logs: [
          "[INFO] GitHub Actions Runner v2.304.0 started.",
          "[INFO] Preparing self-hosted Windows environment on host 'BWS-SRV-IIS01'.",
          "[OK] Connected to GitHub repositories securely.",
          "[INFO] Triggered by push on branch 'main' by salim250 (Salim Brahim).",
          "[INFO] Creating clean checkout directory: C:\\actions-runner\\workspace\\MyApp"
        ]
      },
      {
        title: "Checkout Repository & Load Submodules",
        delay: 1000,
        logs: [
          "Syncing repository: https://github.com/salim250/bws-portal",
          "Checking out commit sha: f48b8c2 - 'Update IoT hydraulic alerts integration'",
          "Successfully loaded 4 submodules.",
          "[OK] Git checkout finished in 482ms."
        ]
      },
      {
        title: "Restore NuGet Packages & Setup .NET Framework",
        delay: 1200,
        logs: [
          "Searching for package restore locks in 'MyApp.sln'...",
          "Running 'dotnet restore MyApp.sln' on local compiler toolchain.",
          "Restoring NuGet package 'EntityFramework.6.4.4' from cache.",
          "Restoring NuGet package 'Newtonsoft.Json.13.0.3' from cache.",
          "Restoring NuGet package 'Microsoft.AspNet.Mvc.5.2.9'...",
          "[OK] All 48 project dependencies resolved successfully. (1.2 seconds)"
        ]
      },
      {
        title: "Compile Solution & Execute Unit Tests (MSTest & Selenium E2E)",
        delay: 2000,
        logs: [
          "Compiling: C:\\actions-runner\\workspace\\MyApp -> C# MSBuild v17.0",
          "[WARNING] CS1998: This async method lacks 'await' operators (non-blocking). Proceeding.",
          "Compilation complete: 0 Errors, 1 Warning.",
          "Running MSTest Suite (12 Unit Tests detected)...",
          "  ✔ Test_Hydraulic_Threshold_Calculation: PASSED (12ms)",
          "  ✔ Test_Device_Status_Decoding: PASSED (4ms)",
          "Running Automated UI Tests with Selenium Headless Chrome Driver...",
          "  ✔ Selenium_Test_User_Dashboard_Metrics_Load: PASSED (342ms)",
          "  ✔ Selenium_Test_Alert_Trigger_Water_Overflow: PASSED (511ms)",
          "[OK] All 14 tests executed successfully. Code Quality Gate Passed!"
        ]
      },
      {
        title: "Run SonarQube Static Analysis & Code Quality Gates",
        delay: 1500,
        logs: [
          "Starting SonarScanner for MSBuild...",
          "Analyzing source files (78 .cs files, 42 .ts files, 15 .js files)",
          "Calculating code coverage index...",
          "  - Coverage: 87.4% (Target: >80.0%)",
          "  - Code Smells: 4 (Technical Debt: 32 mins)",
          "  - Security Vulnerabilities: 0 (Rating: A)",
          "  - Bugs: 0 (Rating: A)",
          "[OK] SonarQube quality gate PASSED. Uploading report to GitLab/GitHub dashboard."
        ]
      },
      {
        title: "Backup Existing On-Premise IIS Web Application",
        delay: 1300,
        logs: [
          "Executing deployment preparation PowerShell commands...",
          "Set path variables: $DeployPath = 'C:\\inetpub\\wwwroot\\MyApp'",
          "Stopping IIS service pool: 'iisreset /stop'...",
          "[IIS] Windows Process Activation Service stopped.",
          "[IIS] World Wide Web Publishing Service stopped.",
          "Creating backup archive directory: 'C:\\inetpub\\wwwroot\\Backups'",
          "Moving active deployment folder to 'C:\\inetpub\\wwwroot\\Backups\\MyApp_202603_Backup'...",
          "[OK] Backup stored. Original folder purged for greenfield deploy."
        ]
      },
      {
        title: "Publish Compiled Artifacts & Restart IIS Web Server",
        delay: 1400,
        logs: [
          "Running publish action: 'dotnet publish MyApp/MyApp.csproj -c Release -o C:\\inetpub\\wwwroot\\MyApp'",
          "Copying binaries, scripts, view templates, and web.config to target destination.",
          "Transpiling AngularJS client assets & minifying output styles.",
          "Copying 152 web assets to target folder.",
          "Restarting IIS service pool: 'iisreset /start'...",
          "[IIS] World Wide Web Publishing Service started successfully.",
          "[IIS] Windows Process Activation Service started successfully.",
          "Pinging production port 80 to verify warm-up...",
          "  - HTTP GET http://localhost/MyApp/ -> Status 200 (OK) in 842ms.",
          "[SUCCESS] Live Deployment complete!"
        ]
      }
    ];

    setPipelineState({
      isRunning: true,
      currentStep: 0,
      logs: [
        `[${new Date().toLocaleTimeString()}] ▶ Triggering CI/CD Workflow: .NET CI/CD to IIS`,
        "----------------------------------------------------------------",
        ...steps[0].logs
      ],
      status: 'running'
    });

    let current = 0;
    const runNextStep = () => {
      if (current < steps.length - 1) {
        current++;
        setTimeout(() => {
          setPipelineState(prev => ({
            ...prev,
            currentStep: current,
            logs: [
              ...prev.logs,
              "",
              `[${new Date().toLocaleTimeString()}] ➜ STEP ${current + 1}: ${steps[current].title}`,
              "----------------------------------------------------------------",
              ...steps[current].logs
            ]
          }));
          runNextStep();
        }, steps[current].delay);
      } else {
        setTimeout(() => {
          setPipelineState(prev => ({
            ...prev,
            status: 'success',
            isRunning: false,
            logs: [
              ...prev.logs,
              "",
              "================================================================",
              `[${new Date().toLocaleTimeString()}] 🎉 DEPLOYMENT COMPLETED SUCCESSFULLY!`,
              "🚀 App is fully functional & responding to IoT requests in live environment.",
              "================================================================"
            ]
          }));
        }, 1000);
      }
    };

    setTimeout(() => {
      runNextStep();
    }, steps[0].delay);
  };

  const resetPipeline = () => {
    setPipelineState({
      isRunning: false,
      currentStep: -1,
      logs: [],
      status: 'idle'
    });
  };

  // Helper for copy to clipboard
  const handleCopyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTextId(id);
    setTimeout(() => {
      setCopiedTextId(null);
    }, 2000);
  };

  // Simulated PDF Downloader
  const handlePrintCV = () => {
    window.print();
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 right-0 h-[600px] pointer-events-none overflow-hidden z-0">
        <div className={`absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px] opacity-45 mix-blend-screen transition-colors duration-500 ${darkMode ? 'bg-indigo-900/40' : 'bg-indigo-300/30'}`}></div>
        <div className={`absolute -top-40 right-1/4 w-[450px] h-[450px] rounded-full blur-[140px] opacity-45 mix-blend-screen transition-colors duration-500 ${darkMode ? 'bg-teal-900/30' : 'bg-teal-300/20'}`}></div>
        <div className={`absolute top-20 left-1/3 w-full h-[1px] ${darkMode ? 'bg-gradient-to-r from-transparent via-slate-800 to-transparent' : 'bg-gradient-to-r from-transparent via-slate-200 to-transparent'}`}></div>
      </div>

      {/* Global Sticky Navigation */}
      <nav className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-300 border-b ${darkMode ? 'bg-slate-950/80 border-slate-900' : 'bg-white/85 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo Brand */}
            <a href="#home" className="flex items-center space-x-3 group" onClick={() => setShowFullBlog(false)}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-teal-400 p-[1.5px] shadow-md shadow-indigo-500/10 transition-transform duration-300 group-hover:scale-105">
                <div className={`w-full h-full rounded-[10px] flex items-center justify-center font-bold text-sm ${darkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
                  SB
                </div>
              </div>
              <div>
                <span className="font-extrabold tracking-tight text-lg block">
                  Salim <span className="text-indigo-500">Brahim</span>
                </span>
                <span className="text-[10px] block font-mono text-indigo-400 tracking-wider uppercase -mt-1 font-semibold">
                  .NET & Java Architect
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              <a href="#about" onClick={() => setShowFullBlog(false)} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${darkMode ? 'text-slate-300 hover:text-white hover:bg-slate-900/50' : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/60'}`}>
                About
              </a>
              <a href="#projects" onClick={() => setShowFullBlog(false)} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${darkMode ? 'text-slate-300 hover:text-white hover:bg-slate-900/50' : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/60'}`}>
                Projects
              </a>
              <a href="#pipeline" onClick={() => setShowFullBlog(false)} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${darkMode ? 'text-slate-300 hover:text-white hover:bg-slate-900/50' : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/60'}`}>
                Interactive CI/CD
              </a>
              <a href="#skills" onClick={() => setShowFullBlog(false)} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${darkMode ? 'text-slate-300 hover:text-white hover:bg-slate-900/50' : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/60'}`}>
                Skills
              </a>
              <a href="#blog" onClick={() => setShowFullBlog(true)} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${showFullBlog || searchQuery === "blog" ? 'text-indigo-400 bg-indigo-500/10' : darkMode ? 'text-slate-300 hover:text-white hover:bg-slate-900/50' : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/60'}`}>
                Blog Post
              </a>
              <a href="#contact" onClick={() => setShowFullBlog(false)} className="ml-2 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm shadow-indigo-600/25 transition-all">
                Contact Me
              </a>
            </div>

            {/* Quick Actions Panel (Dark Mode Toggle & CV Quick download) */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg border transition-colors ${darkMode ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800' : 'bg-slate-100 border-slate-200 text-indigo-600 hover:bg-slate-200'}`}
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <button
                onClick={handlePrintCV}
                className={`hidden lg:inline-flex items-center space-x-1 px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${darkMode ? 'border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-indigo-500/50' : 'border-slate-200 bg-white text-slate-700 hover:text-indigo-600 hover:border-indigo-600/50'}`}
                title="Print Resume or Save as PDF"
              >
                <FileText size={14} className="text-indigo-500" />
                <span>Print CV</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-slate-900 text-slate-400' : 'hover:bg-slate-100 text-slate-600'}`}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Dropdown Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden border-t px-4 pt-2 pb-4 space-y-1 transition-all duration-200 ${darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-200'}`}>
            <a
              href="#about"
              onClick={() => { setMobileMenuOpen(false); setShowFullBlog(false); }}
              className={`block px-3 py-2 rounded-md text-base font-medium ${darkMode ? 'hover:bg-slate-900 text-slate-200' : 'hover:bg-indigo-50 text-slate-800'}`}
            >
              About
            </a>
            <a
              href="#projects"
              onClick={() => { setMobileMenuOpen(false); setShowFullBlog(false); }}
              className={`block px-3 py-2 rounded-md text-base font-medium ${darkMode ? 'hover:bg-slate-900 text-slate-200' : 'hover:bg-indigo-50 text-slate-800'}`}
            >
              Projects & Portfolios
            </a>
            <a
              href="#pipeline"
              onClick={() => { setMobileMenuOpen(false); setShowFullBlog(false); }}
              className={`block px-3 py-2 rounded-md text-base font-medium ${darkMode ? 'hover:bg-slate-900 text-slate-200' : 'hover:bg-indigo-50 text-slate-800'}`}
            >
              Interactive CI/CD
            </a>
            <a
              href="#skills"
              onClick={() => { setMobileMenuOpen(false); setShowFullBlog(false); }}
              className={`block px-3 py-2 rounded-md text-base font-medium ${darkMode ? 'hover:bg-slate-900 text-slate-200' : 'hover:bg-indigo-50 text-slate-800'}`}
            >
              Technical Skills
            </a>
            <a
              href="#blog"
              onClick={() => { setMobileMenuOpen(false); setShowFullBlog(true); }}
              className={`block px-3 py-2 rounded-md text-base font-medium ${darkMode ? 'hover:bg-slate-900 text-indigo-400' : 'hover:bg-indigo-50 text-indigo-600 font-semibold'}`}
            >
              Technical Blog Post
            </a>
            <a
              href="#contact"
              onClick={() => { setMobileMenuOpen(false); setShowFullBlog(false); }}
              className={`block px-3 py-2 rounded-md text-base font-medium text-center text-white bg-indigo-600 hover:bg-indigo-500`}
            >
              Contact Me
            </a>
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500">Resume Utilities</span>
              <button
                onClick={() => { handlePrintCV(); setMobileMenuOpen(false); }}
                className="inline-flex items-center space-x-1 text-xs text-indigo-400 hover:underline"
              >
                <Download size={12} />
                <span>Save CV PDF</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-10 pb-20 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left text column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Availability Badge */}
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium border border-teal-500/20 bg-teal-500/5 text-teal-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                </span>
                <span>Active &amp; Open to Senior / Lead .NET &amp; Java Roles</span>
              </div>

              {/* Sub-header greeting */}
              <h4 className="text-indigo-400 font-mono text-sm tracking-wider uppercase font-semibold">
                Hello, I am
              </h4>

              {/* Main Headline */}
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                  <span className="bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent block">
                    {PROFILE_INFO.fullName}
                  </span>
                  <span className="bg-gradient-to-r from-indigo-500 via-purple-400 to-teal-400 bg-clip-text text-transparent text-3xl sm:text-4xl lg:text-5xl block mt-2 font-black">
                    {PROFILE_INFO.title}
                  </span>
                </h1>
                <p className={`text-base sm:text-lg max-w-xl ${darkMode ? 'text-slate-400' : 'text-slate-600'} leading-relaxed mt-4`}>
                  {PROFILE_INFO.subtitle}. With over <span className="text-indigo-400 font-bold">{PROFILE_INFO.experienceYears} years</span> of expert enterprise software background crafting IoT platforms, automated testing frameworks, and advanced workflows.
                </p>
              </div>

              {/* Badges of Key Expertise for Salim */}
              <div className="flex flex-wrap gap-2 pt-2">
                {["C# .NET", "Java Spring/Quarkus", "Angular", "React & React Native", "Docker", "CI/CD Windows Self-Hosted", "Selenium E2E"].map((tag, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 rounded-md text-xs font-mono font-medium ${darkMode ? 'bg-slate-900 border-slate-800 text-indigo-300' : 'bg-indigo-50/80 border-indigo-100 text-indigo-700'} border`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="#projects"
                  onClick={() => setShowFullBlog(false)}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all hover:-translate-y-0.5"
                >
                  <span>Explore Portfolio</span>
                  <ArrowRight size={18} className="ml-2" />
                </a>
                
                <a
                  href="#pipeline"
                  onClick={() => setShowFullBlog(false)}
                  className={`inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-xl border transition-all hover:-translate-y-0.5 ${darkMode ? 'border-slate-800 bg-slate-900/60 text-indigo-400 hover:text-white hover:bg-slate-900' : 'border-slate-200 bg-white text-indigo-600 hover:bg-indigo-50'}`}
                >
                  <Terminal size={18} className="mr-2" />
                  <span>Run Live CI/CD Demo</span>
                </a>
                
                <button
                  onClick={handlePrintCV}
                  className={`inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-xl border transition-all hover:-translate-y-0.5 ${darkMode ? 'border-slate-800 bg-slate-900/40 text-slate-300 hover:text-white' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'}`}
                >
                  <FileText size={18} className="mr-2 text-indigo-500" />
                  <span>Interactive Print CV</span>
                </button>
              </div>

              {/* Social Channels Row */}
              <div className="flex items-center space-x-6 pt-4 border-t border-slate-800/60">
                <span className="text-xs text-slate-500 font-mono tracking-wider uppercase">Find Me:</span>
                <a href={PROFILE_INFO.linkedin} target="_blank" rel="noopener noreferrer" className={`hover:text-indigo-400 transition-colors ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  <span className="sr-only">LinkedIn</span>
                  <LinkedinIcon className="w-5 h-5" />
                </a>
                <a href={PROFILE_INFO.github} target="_blank" rel="noopener noreferrer" className={`hover:text-indigo-400 transition-colors ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  <span className="sr-only">GitHub</span>
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a href={`mailto:${PROFILE_INFO.primaryEmail}`} className={`hover:text-indigo-400 transition-colors ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  <span className="sr-only">Email</span>
                  <Mail size={20} />
                </a>
                <a href={`tel:${PROFILE_INFO.phone.replace(/\s+/g, '')}`} className={`hover:text-indigo-400 transition-colors ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  <span className="sr-only">Phone</span>
                  <Phone size={18} />
                </a>
              </div>

            </div>

            {/* Right Interactive Tech Card Column */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-teal-500/10 rounded-3xl blur-2xl pointer-events-none"></div>
              
              {/* Immersive Mock IDE Card */}
              <div className={`relative border rounded-2xl shadow-2xl overflow-hidden transition-colors ${darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-950 text-slate-200 border-slate-900'}`}>
                {/* OS/IDE Header tabs */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-900">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <span className="text-xs font-mono text-slate-400 flex items-center space-x-1.5">
                    <Code size={12} className="text-indigo-400" />
                    <span>SalimBrahim.cs</span>
                  </span>
                  <div className="w-4"></div>
                </div>

                {/* IDE Code Content */}
                <div className="p-5 sm:p-6 font-mono text-xs overflow-x-auto space-y-4 text-left">
                  <div>
                    <span className="text-purple-400">using</span> System;
                    <br />
                    <span className="text-purple-400">using</span> SalimBrahim.Core.Expertise;
                  </div>
                  
                  <div>
                    <span className="text-purple-400">namespace</span> <span className="text-teal-400">SalimPortfolio</span>
                    {" {"}
                    <div className="pl-4">
                      <span className="text-purple-400">public class</span> <span className="text-yellow-300">SoftwareEngineer</span>
                      {" {"}
                      <div className="pl-4 space-y-1">
                        <div>
                          <span className="text-purple-400">public string</span> Name {"=>"} <span className="text-emerald-400">"Salim Brahim"</span>;
                        </div>
                        <div>
                          <span className="text-purple-400">public string</span> Role {"=>"} <span className="text-emerald-400">"Fullstack .NET & Java"</span>;
                        </div>
                        <div>
                          <span className="text-purple-400">public int</span> ExperienceYears {"=>"} <span className="text-cyan-400">4</span>;
                        </div>
                        <div className="pt-2">
                          <span className="text-slate-500">// Specialized in automated CI/CD and telemetry</span>
                        </div>
                        <div>
                          <span className="text-purple-400">public string[]</span> PrimaryFrameworks {"=>"} <span className="text-purple-400">new</span>[] {"{"}
                        </div>
                        <div className="pl-4 text-emerald-400">
                          "ASP.NET MVC", "Angular", "Quarkus", "Spring Boot", "React Native"
                        </div>
                        <div>{"};"}</div>

                        <div className="pt-2 text-slate-500">// Devops & Quality tools</div>
                        <div>
                          <span className="text-purple-400">public object</span> DevOpsTools {"=>"} <span className="text-purple-400">new</span> {"{"}
                        </div>
                        <div className="pl-4 space-y-0.5">
                          <div>CI_CD = <span className="text-emerald-400">"GitHub Actions & GitLab CI"</span>,</div>
                          <div>E2E_Test = <span className="text-emerald-400">"Selenium WebDriver"</span>,</div>
                          <div>Quality = <span className="text-emerald-400">"SonarQube Static Analysis"</span>,</div>
                          <div>Host = <span className="text-emerald-400">"On-Premises IIS & Docker"</span></div>
                        </div>
                        <div>{"};"}</div>
                      </div>
                      {"}"}
                    </div>
                    {"}"}
                  </div>

                  {/* Micro stats banner inside IDE */}
                  <div className="pt-4 border-t border-slate-800/55 flex justify-between items-center text-[10px] text-slate-400">
                    <span className="flex items-center space-x-1">
                      <Check size={12} className="text-teal-400" />
                      <span>Ready to Deploy</span>
                    </span>
                    <span className="text-slate-500">Ln 24, Col 12</span>
                    <span className="text-indigo-400 hover:underline cursor-pointer flex items-center space-x-1" onClick={triggerPipeline}>
                      <Play size={10} />
                      <span>Run Code</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Widget 1 */}
              <div className={`absolute -bottom-6 -left-6 border rounded-xl p-4 shadow-xl flex items-center space-x-3 hidden sm:flex transition-colors backdrop-blur-md ${darkMode ? 'bg-slate-950/90 border-slate-800 text-slate-100' : 'bg-white/95 border-slate-200 text-slate-900'}`}>
                <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400">
                  <Activity size={20} className="animate-pulse" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-mono">TEST QUALITY RATE</div>
                  <div className="text-sm font-bold flex items-center">
                    <span>99.2% Uptime</span>
                    <span className="text-[10px] text-teal-400 ml-1.5 font-normal">SonarQube A+</span>
                  </div>
                </div>
              </div>

              {/* Floating Widget 2 */}
              <div className={`absolute -top-6 -right-6 border rounded-xl p-3 shadow-xl flex items-center space-x-2.5 hidden sm:flex transition-colors backdrop-blur-md ${darkMode ? 'bg-slate-950/90 border-slate-800 text-slate-100' : 'bg-white/95 border-slate-200 text-slate-900'}`}>
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                  IoT
                </div>
                <div>
                  <div className="text-[9px] text-slate-500 font-mono uppercase">Telemetry Node</div>
                  <div className="text-xs font-semibold">Active Fleet Client Pings</div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Main Section Content Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32 pb-32">
        
        {/* About & Personal Info Section */}
        <section id="about" className="pt-10 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              About <span className="text-indigo-500">My Background</span>
            </h2>
            <div className="h-1.5 w-16 bg-indigo-600 mx-auto rounded-full"></div>
            <p className={`text-sm sm:text-base ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Get to know the professional profile, core metrics, and structured expertise of Salim Brahim.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Bio Card */}
            <div className={`lg:col-span-5 p-6 rounded-2xl border transition-all ${darkMode ? 'bg-slate-900/50 border-slate-800/80' : 'bg-white border-slate-200/80 shadow-md'} space-y-5`}>
              <h3 className="text-xl font-bold flex items-center space-x-2">
                <Sparkles size={18} className="text-indigo-400" />
                <span>Who is Salim Brahim?</span>
              </h3>
              
              <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'} leading-relaxed`}>
                I am a passionate software engineer, currently based in Tunis, Tunisia. Over the course of my career, I've developed deep technical specialization in <strong>C# .NET</strong> and <strong>Java Enterprise</strong> frameworks, bridging them with modern single-page-application (SPA) client layers like <strong>Angular</strong>, <strong>AngularJS</strong>, and <strong>React</strong>.
              </p>

              <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'} leading-relaxed`}>
                My primary expertise lies in enterprise-scale architecture, telemetry/IoT integration, and automated quality infrastructure. I have configured continuous integration workflows and automated complex test cases with Selenium and JUnit, creating resilient software structures.
              </p>

              <div className="pt-4 border-t border-slate-800/60 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-slate-500">Birthdate</div>
                  <div className="text-sm font-semibold">{PROFILE_INFO.birthdate}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Primary Location</div>
                  <div className="text-sm font-semibold">{PROFILE_INFO.location}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Phone Contact</div>
                  <a href={`tel:${PROFILE_INFO.phone.replace(/\s+/g, '')}`} className="text-sm font-semibold text-indigo-400 hover:underline block">
                    {PROFILE_INFO.phone}
                  </a>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Main Email</div>
                  <a href={`mailto:${PROFILE_INFO.primaryEmail}`} className="text-sm font-semibold text-indigo-400 hover:underline block truncate" title={PROFILE_INFO.primaryEmail}>
                    {PROFILE_INFO.primaryEmail}
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handlePrintCV}
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 transition-all"
                >
                  <Download size={14} className="mr-1.5" />
                  <span>Download / Print Full Resume</span>
                </button>
              </div>
            </div>

            {/* Matrix of Tech Expertise */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-xl font-bold flex items-center space-x-2">
                <Layers size={18} className="text-indigo-400" />
                <span>Expertise Portfolio Matrix</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Skill blocks */}
                <div className={`p-4 rounded-xl border transition-all ${darkMode ? 'bg-slate-900/35 border-slate-800/65' : 'bg-white border-slate-200/60 shadow-sm'} space-y-2`}>
                  <div className="flex items-center space-x-2 text-indigo-400 font-semibold text-sm">
                    <Code size={16} />
                    <span>Languages</span>
                  </div>
                  <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    C#, Java (JEE), JavaScript, TypeScript, HTML5, CSS3, SQL.
                  </p>
                </div>

                <div className={`p-4 rounded-xl border transition-all ${darkMode ? 'bg-slate-900/35 border-slate-800/65' : 'bg-white border-slate-200/60 shadow-sm'} space-y-2`}>
                  <div className="flex items-center space-x-2 text-indigo-400 font-semibold text-sm">
                    <Cpu size={16} />
                    <span>Frameworks</span>
                  </div>
                  <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    ASP.NET MVC, Spring Boot, Quarkus, Angular, AngularJS, React, React Native.
                  </p>
                </div>

                <div className={`p-4 rounded-xl border transition-all ${darkMode ? 'bg-slate-900/35 border-slate-800/65' : 'bg-white border-slate-200/60 shadow-sm'} space-y-2`}>
                  <div className="flex items-center space-x-2 text-indigo-400 font-semibold text-sm">
                    <Database size={16} />
                    <span>Databases</span>
                  </div>
                  <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Microsoft SQL Server, PostgreSQL, MySQL, Supabase, SQLite.
                  </p>
                </div>

                <div className={`p-4 rounded-xl border transition-all ${darkMode ? 'bg-slate-900/35 border-slate-800/65' : 'bg-white border-slate-200/60 shadow-sm'} space-y-2`}>
                  <div className="flex items-center space-x-2 text-indigo-400 font-semibold text-sm">
                    <Terminal size={16} />
                    <span>DevOps &amp; Testing</span>
                  </div>
                  <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    GitHub Actions, GitLab CI/CD, IIS Hosting, Selenium, JUnit, MSTest, SonarQube, Docker.
                  </p>
                </div>

                <div className={`p-4 rounded-xl border transition-all ${darkMode ? 'bg-slate-900/35 border-slate-800/65' : 'bg-white border-slate-200/60 shadow-sm'} space-y-2`}>
                  <div className="flex items-center space-x-2 text-indigo-400 font-semibold text-sm">
                    <Layers size={16} />
                    <span>Enterprise &amp; ECM</span>
                  </div>
                  <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Alfresco Activiti Workflow, BPMN 2.0 State-Machines, Keycloak OIDC, OptaPlanner optimization.
                  </p>
                </div>

                <div className={`p-4 rounded-xl border transition-all ${darkMode ? 'bg-slate-900/35 border-slate-800/65' : 'bg-white border-slate-200/60 shadow-sm'} space-y-2`}>
                  <div className="flex items-center space-x-2 text-indigo-400 font-semibold text-sm">
                    <Smartphone size={16} />
                    <span>Cross-Platform Mobile</span>
                  </div>
                  <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Kotlin (PDA Android), React Native with Expo, Capacitor wrappers.
                  </p>
                </div>

              </div>

              {/* Dynamic educational pathway */}
              <div className={`p-5 rounded-xl border transition-all ${darkMode ? 'bg-slate-900/20 border-slate-800/50' : 'bg-white border-slate-200/55 shadow-sm'} space-y-4`}>
                <div className="text-xs text-slate-500 font-mono tracking-wider uppercase font-semibold">Educational Achievements &amp; Credentials</div>
                <div className="space-y-4">
                  {EDUCATION_DATA.map((edu, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                        <GraduationCap size={16} />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">{edu.period}</div>
                        <div className="text-sm font-bold">{edu.institution}</div>
                        <div className="text-xs text-indigo-400 font-medium">{edu.degree}</div>
                        <p className={`text-[11px] ${darkMode ? 'text-slate-400' : 'text-slate-500'} mt-0.5`}>{edu.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Interactive CI/CD Terminal Simulator Section */}
        <section id="pipeline" className="scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Explanatory text of DevOps abilities */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono border border-indigo-500/30 bg-indigo-500/5 text-indigo-400">
                <Terminal size={12} />
                <span>CI/CD Automation Expertise</span>
              </div>
              
              <h2 className="text-3xl font-extrabold tracking-tight">
                Interactive <span className="text-indigo-500">DevOps pipeline</span> Simulator
              </h2>
              
              <div className="h-1.5 w-12 bg-indigo-600 rounded-full"></div>
              
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'} leading-relaxed`}>
                As a developer, I doesn't just write code—he automates compile sequences, unit tests, code quality scans (SonarQube), and secure IIS deployment procedures.
              </p>

              <div className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-900/30 border-slate-800' : 'bg-slate-100 border-slate-200'} space-y-2`}>
                <h4 className="text-xs font-mono font-bold text-indigo-400 uppercase">Featured Pipeline Stages:</h4>
                <ul className="text-xs space-y-1.5 text-slate-400">
                  <li className="flex items-center space-x-1.5 text-slate-300 font-medium">
                    <CheckCircle2 size={12} className="text-teal-400 shrink-0" />
                    <span>Workspace Initialization &amp; Git Checkout</span>
                  </li>
                  <li className="flex items-center space-x-1.5 text-slate-300 font-medium">
                    <CheckCircle2 size={12} className="text-teal-400 shrink-0" />
                    <span>NuGet Dependency Restore &amp; Compile</span>
                  </li>
                  <li className="flex items-center space-x-1.5 text-slate-300 font-medium">
                    <CheckCircle2 size={12} className="text-teal-400 shrink-0" />
                    <span>Selenium E2E &amp; MSTest Suite executions</span>
                  </li>
                  <li className="flex items-center space-x-1.5 text-slate-300 font-medium">
                    <CheckCircle2 size={12} className="text-teal-400 shrink-0" />
                    <span>SonarQube Code Coverage &amp; Vulnerability Rating Scan</span>
                  </li>
                  <li className="flex items-center space-x-1.5 text-slate-300 font-medium">
                    <CheckCircle2 size={12} className="text-teal-400 shrink-0" />
                    <span>On-Premise IIS Server Stop &amp; Auto-Backup (PowerShell)</span>
                  </li>
                  <li className="flex items-center space-x-1.5 text-slate-300 font-medium">
                    <CheckCircle2 size={12} className="text-teal-400 shrink-0" />
                    <span>Live .NET Core/MVC Build Publish &amp; IIS Restart</span>
                  </li>
                </ul>
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  onClick={triggerPipeline}
                  disabled={pipelineState.isRunning}
                  className={`inline-flex items-center justify-center px-5 py-3 text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition-all ${pipelineState.isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Play size={16} className="mr-2" />
                  <span>Trigger Deployment Pipeline</span>
                </button>
                
                {pipelineState.status !== 'idle' && (
                  <button
                    onClick={resetPipeline}
                    className={`inline-flex items-center justify-center px-4 py-3 text-sm font-semibold rounded-xl border transition-all ${darkMode ? 'border-slate-800 bg-slate-900 text-slate-300 hover:text-white' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'}`}
                  >
                    <RefreshCw size={14} className="mr-1.5" />
                    <span>Clear Terminal</span>
                  </button>
                )}
              </div>
            </div>

            {/* Interactive CLI Terminal Window */}
            <div className="lg:col-span-7">
              <div className="border border-slate-900 bg-slate-950 rounded-2xl shadow-2xl overflow-hidden">
                
                {/* Terminal Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-950">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    <span className="text-[10px] font-mono text-slate-400 pl-2">PowerShell - GitHub Runner service</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    {pipelineState.isRunning && (
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                    )}
                    <span className="text-[10px] font-mono text-slate-400">IIS01_Runner</span>
                  </div>
                </div>

                {/* Terminal Body */}
                <div className="p-4 sm:p-5 font-mono text-xs text-left h-80 sm:h-96 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-slate-800">
                  
                  {pipelineState.logs.length === 0 ? (
                    <div className="text-slate-500 flex flex-col items-center justify-center h-full text-center space-y-3">
                      <Terminal size={32} className="text-slate-700 animate-pulse" />
                      <div className="space-y-1 max-w-sm">
                        <p className="font-semibold text-slate-400 text-sm">Runner is Idle</p>
                        <p className="text-[11px]">Click "Trigger Deployment Pipeline" on the left to see the interactive GitHub Actions run.</p>
                      </div>
                    </div>
                  ) : (
                    pipelineState.logs.map((log, index) => {
                      let color = "text-slate-300";
                      if (log.includes("[INFO]")) color = "text-indigo-400";
                      else if (log.includes("[OK]") || log.includes("✔") || log.includes("[SUCCESS]")) color = "text-emerald-400 font-bold";
                      else if (log.includes("[WARNING]")) color = "text-yellow-400";
                      else if (log.includes("----------------") || log.includes("=========")) color = "text-slate-600";
                      else if (log.includes("▶") || log.includes("➜")) color = "text-indigo-300 font-bold";
                      else if (log.includes("🎉") || log.includes("🚀")) color = "text-teal-400 font-extrabold";
                      
                      return (
                        <div key={index} className={`${color} whitespace-pre-wrap leading-relaxed break-all`}>
                          {log}
                        </div>
                      );
                    })
                  )}
                  <div ref={terminalEndRef} />
                </div>

                {/* Terminal Footer Info */}
                <div className="px-4 py-2.5 bg-slate-900/60 border-t border-slate-950 flex justify-between items-center text-[10px] text-slate-400">
                  <span className="flex items-center space-x-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${pipelineState.isRunning ? 'bg-indigo-400 animate-ping' : pipelineState.status === 'success' ? 'bg-emerald-500' : 'bg-slate-500'}`}></span>
                    <span>Status: {pipelineState.status.toUpperCase()}</span>
                  </span>
                  <span>Branch: main</span>
                  <span>Execution: Self-Hosted Server</span>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* Project Portfolio Section */}
        <section id="projects" className="scroll-mt-20">
          <div className="space-y-6">
            
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2 text-left">
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Featured <span className="text-indigo-500">Project Desk</span>
                </h2>
                <div className="h-1.5 w-16 bg-indigo-600 rounded-full"></div>
                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Discover 8 high-performance products built at BE Wireless Solutions, ADDINN, and as custom freelance platforms.
                </p>
              </div>

              {/* Real-time search */}
              <div className="relative shrink-0 max-w-sm w-full">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search projects, technologies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-indigo-500 ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100 placeholder-slate-500' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'}`}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-indigo-400"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2 pb-2">
              {[
                { id: "all", label: "All Projects" },
                { id: "dotnet", label: ".NET C#" },
                { id: "java", label: "Java Quarkus / Spring" },
                { id: "frontend", label: "React / Vite Web" },
                { id: "mobile", label: "Mobile (Kotlin, Native, Expo)" },
                { id: "devops", label: "DevOps & Quality Automation" }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${selectedCategory === cat.id ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/15' : darkMode ? 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.length === 0 ? (
                <div className={`col-span-full text-center py-16 rounded-2xl border ${darkMode ? 'bg-slate-900/10 border-slate-800/60' : 'bg-slate-100 border-slate-200'}`}>
                  <p className="text-slate-500 text-sm">No projects match your current category and search query filters.</p>
                  <button
                    onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
                    className="mt-3 text-xs text-indigo-400 hover:underline"
                  >
                    Reset all filters
                  </button>
                </div>
              ) : (
                filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className={`group rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${darkMode ? 'bg-slate-900/40 border-slate-800/80 hover:border-indigo-500/30' : 'bg-white border-slate-200/80 hover:border-indigo-500/40 shadow-sm'}`}
                  >
                    <div className="p-5 space-y-4">
                      
                      {/* Company & Period Row */}
                      <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                        <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-semibold uppercase tracking-wider">{project.company}</span>
                        <span>{project.period}</span>
                      </div>

                      {/* Title & Role */}
                      <div className="space-y-1 text-left">
                        <h3 className="text-base font-extrabold group-hover:text-indigo-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs text-indigo-400 font-medium">{project.role}</p>
                      </div>

                      {/* Description */}
                      <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'} line-clamp-3 text-left leading-relaxed`}>
                        {project.description}
                      </p>

                      {/* Project Performance metric metrics badge if available */}
                      {project.metrics && (
                        <div className="inline-flex items-center space-x-1.5 p-2 rounded-lg text-[10px] bg-emerald-500/5 text-emerald-400 border border-emerald-500/15 w-full">
                          <Check size={12} className="shrink-0" />
                          <span className="font-medium text-left">{project.metrics}</span>
                        </div>
                      )}

                    </div>

                    <div className="px-5 pb-5 pt-2 space-y-4">
                      
                      {/* Technologies tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 5).map((tech, i) => (
                          <span
                            key={i}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono ${darkMode ? 'bg-slate-950 text-slate-400 border-slate-900' : 'bg-slate-50 text-slate-600 border-slate-200'} border`}
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 5 && (
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${darkMode ? 'bg-slate-950 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
                            +{project.technologies.length - 5} more
                          </span>
                        )}
                      </div>

                      {/* Card Actions buttons */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-800/55">
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="inline-flex items-center text-xs font-semibold text-indigo-400 hover:text-indigo-300 hover:underline"
                        >
                          <Eye size={12} className="mr-1" />
                          <span>View Details</span>
                        </button>
                        
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-xs font-semibold text-teal-400 hover:text-teal-300 hover:underline"
                          >
                            <span>Live Site</span>
                            <ExternalLink size={10} className="ml-1" />
                          </a>
                        )}
                      </div>

                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        </section>

        {/* Technical Skills and Languages Progress Section */}
        <section id="skills" className="scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Skill Matrix Progress */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="space-y-2 text-left">
                <h2 className="text-3xl font-extrabold tracking-tight">
                  Technical <span className="text-indigo-500">Skills Track</span>
                </h2>
                <div className="h-1.5 w-16 bg-indigo-600 rounded-full"></div>
                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Click the categories to filter my specialized technical competencies. I am skilled in high-complexity enterprise and mobile projects.
                </p>
              </div>

              {/* Skills categorization sub-filters */}
              <div className="flex flex-wrap gap-1.5">
                {skillCategories.map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => setActiveSkillCat(sc.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeSkillCat === sc.id ? 'bg-indigo-600 text-white' : darkMode ? 'bg-slate-900 text-slate-400 hover:text-slate-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    {sc.label}
                  </button>
                ))}
              </div>

              {/* Skill Bars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                {SKILLS_DATA.filter(skill => activeSkillCat === "all" || skill.category === activeSkillCat).map((skill, idx) => (
                  <div key={idx} className="space-y-1.5 text-left">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold">{skill.name}</span>
                      <span className="text-indigo-400 font-mono font-semibold">{skill.level}%</span>
                    </div>
                    
                    {/* Progress Bar Track */}
                    <div className={`h-2 w-full rounded-full overflow-hidden ${darkMode ? 'bg-slate-900' : 'bg-slate-200'}`}>
                      <div
                        className="h-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-teal-400 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Column: Spoken Languages & Credentials */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Spoken Languages card */}
              <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} space-y-5`}>
                <h3 className="text-lg font-bold flex items-center space-x-2 text-left">
                  <Activity size={18} className="text-indigo-400" />
                  <span>Spoken Languages</span>
                </h3>

                <div className="space-y-4">
                  {LANGUAGES_DATA.map((lang, idx) => (
                    <div key={idx} className="space-y-1 text-left">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold">{lang.name}</span>
                        <span className={`text-[10px] ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{lang.level}</span>
                      </div>
                      
                      <div className={`h-1.5 w-full rounded-full overflow-hidden ${darkMode ? 'bg-slate-950' : 'bg-slate-100'}`}>
                        <div
                          className="h-full bg-teal-400 rounded-full"
                          style={{ width: `${lang.percent}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications and achievements list card */}
              <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} space-y-4`}>
                <h3 className="text-lg font-bold flex items-center space-x-2 text-left">
                  <Award size={18} className="text-indigo-400" />
                  <span>Certifications</span>
                </h3>

                <div className="space-y-3">
                  {CERTIFICATIONS_DATA.map((cert, idx) => (
                    <div key={idx} className="flex gap-2.5 items-start text-left">
                      <div className="w-7 h-7 rounded bg-teal-500/10 flex items-center justify-center text-teal-400 shrink-0">
                        <Award size={14} />
                      </div>
                      <div>
                        <div className="text-xs font-bold leading-snug">{cert.title}</div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">{cert.issuer} • {cert.year}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Full-Fidelity Embedded Blog Post Section */}
        <section id="blog" className="scroll-mt-20">

          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Technical <span className="text-indigo-500">Guides &amp; Blog</span>
            </h2>
            <div className="h-1.5 w-16 bg-indigo-600 mx-auto rounded-full"></div>
            <p className={`text-sm sm:text-base ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              I share real-world entreprise solutions on my specialized blog.
            </p>
          </div>

          <div className="mb-8">
            <PublishedBlogs darkMode={darkMode} />
          </div>

          
        </section>

        {/* Contact section with digital twin assistant reply */}
        <section id="contact" className="scroll-mt-20">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Get In <span className="text-indigo-500">Touch</span>
            </h2>
            <div className="h-1.5 w-16 bg-indigo-600 mx-auto rounded-full"></div>
            <p className={`text-sm sm:text-base ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Send Salim an automated secure message or explore direct contact methods.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Contact details and card info */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className={`p-6 rounded-2xl border text-left space-y-6 transition-all ${darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-md'}`}>
                <h3 className="text-lg font-bold">Contact Directory</h3>
                
                <div className="space-y-4">
                  
                  {/* Phone */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center shrink-0">
                      <Phone size={18} />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-mono">PHONE</div>
                      <a href={`tel:${PROFILE_INFO.phone.replace(/\s+/g, '')}`} className={`text-sm font-bold hover:text-indigo-400 hover:underline block ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                        {PROFILE_INFO.phone}
                      </a>
                    </div>
                  </div>

                  {/* Primary Email */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center shrink-0">
                      <Mail size={18} />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-mono">PRIMARY EMAIL</div>
                      <a href={`mailto:${PROFILE_INFO.primaryEmail}`} className={`text-sm font-bold hover:text-indigo-400 hover:underline block break-all ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                        {PROFILE_INFO.primaryEmail}
                      </a>
                    </div>
                  </div>

                  {/* Backup Email */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center shrink-0">
                      <Mail size={18} />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-mono">BACKUP EMAIL</div>
                      <a href={`mailto:${PROFILE_INFO.backupEmail}`} className={`text-sm font-bold hover:text-indigo-400 hover:underline block break-all ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                        {PROFILE_INFO.backupEmail}
                      </a>
                    </div>
                  </div>

                  {/* Location Address */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-mono">LOCATION</div>
                      <div className="text-sm font-bold">
                        {PROFILE_INFO.location}, {PROFILE_INFO.hometown}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Social media connections info */}
                <div className="pt-4 border-t border-slate-800/60 flex items-center gap-4">
                  <span className="text-xs text-slate-500 font-mono">SOCIAL CHANNELS:</span>
                  <a href={PROFILE_INFO.linkedin} target="_blank" rel="noopener noreferrer" className={`hover:text-indigo-400 transition-colors ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    <LinkedinIcon className="w-5 h-5" />
                  </a>
                  <a href={PROFILE_INFO.github} target="_blank" rel="noopener noreferrer" className={`hover:text-indigo-400 transition-colors ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    <GithubIcon className="w-5 h-5" />
                  </a>
                </div>

              </div>

            </div>

            {/* Simulated mailing form */}
            <div className="lg:col-span-7">
              <div className={`p-6 sm:p-8 rounded-2xl border text-left space-y-5 transition-all ${darkMode ? 'bg-slate-900/20 border-slate-800' : 'bg-white border-slate-200 shadow-md'}`}>
                
                <div className="space-y-1">
                  <h3 className="text-lg font-bold">Send Me a Message</h3>
                  <p className="text-xs text-slate-500">Your message will simulate an active secure SMTP deployment sequence below.</p>
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 font-semibold">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="John Doe"
                        className={`w-full p-2.5 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-indigo-500 ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100 placeholder-slate-600' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'}`}
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 font-semibold">Your Email *</label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="john.doe@example.com"
                        className={`w-full p-2.5 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-indigo-500 ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100 placeholder-slate-600' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'}`}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-semibold">Subject</label>
                    <input
                      type="text"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      placeholder="e.g. Senior Backend Role Opportunity"
                      className={`w-full p-2.5 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-indigo-500 ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100 placeholder-slate-600' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'}`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-semibold">Message Content *</label>
                    <textarea
                      required
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Write your message details..."
                      className={`w-full p-2.5 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-indigo-500 ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100 placeholder-slate-600' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'}`}
                    ></textarea>
                  </div>

                  {contactAlert && (
                    <div className={`p-3 rounded-xl text-xs flex items-start gap-2 ${contactAlert.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                      <Info size={14} className="shrink-0 mt-0.5" />
                      <p>{contactAlert.text}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full inline-flex items-center justify-center px-5 py-3 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition-all disabled:opacity-50 hover:cursor-pointer"
                  >
                    {isSending ? (
                      <>
                        <RefreshCw size={14} className="mr-1.5 animate-spin" />
                        <span>Sending secure SMTP packet...</span>
                      </>
                    ) : (
                      <>
                        <Send size={14} className="mr-1.5" />
                        <span>Deliver Message Securely</span>
                      </>
                    )}
                  </button>

                </form>

                {/* Simulated sent message log area (WOW factor) */}
                {sentMessages.length > 0 && (
                  <div className="space-y-4 pt-5 border-t border-slate-800/60">
                    <h4 className="text-xs font-mono font-bold text-indigo-400 uppercase">Simulated Mail Server logs ({sentMessages.length})</h4>
                    
                    <div className="space-y-4 max-h-60 overflow-y-auto">
                      {sentMessages.map((msg) => (
                        <div key={msg.id} className={`p-4 rounded-xl border space-y-3 text-xs ${darkMode ? 'bg-slate-950 border-slate-900' : 'bg-slate-50 border-slate-200'}`}>
                          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                            <span>From: {msg.email}</span>
                            <span>Time: {msg.timestamp}</span>
                          </div>
                          <div className={darkMode ? 'text-slate-200 font-medium' : 'text-slate-900 font-medium'}>
                            <span className="font-semibold text-slate-400">Subject:</span> {msg.subject}
                          </div>
                          <p className={`text-slate-400 pl-2 border-l border-slate-800 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{msg.message}</p>
                          
                          {/* Automated Digital Twin reply block */}
                          <div className="pt-3 border-t border-slate-900/60">
                            <div className="flex items-center space-x-1 text-teal-400 font-mono text-[10px] font-semibold mb-1">
                              <Sparkles size={10} />
                              <span>Salim's digital twin reply:</span>
                            </div>
                            <p className="text-[11px] text-teal-400/90 whitespace-pre-wrap leading-relaxed font-mono bg-teal-500/5 p-2 rounded-lg border border-teal-500/10">
                              {msg.reply}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </section>

      </main>

      {/* Global Detailed Project Dialog Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className={`w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden transition-all text-left flex flex-col max-h-[90vh] ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'}`}>
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/60 shrink-0">
              <div>
                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest font-semibold">{selectedProject.company} • {selectedProject.period}</span>
                <h3 className="text-lg font-black leading-snug">{selectedProject.title}</h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className={`p-1.5 rounded-lg transition-colors ${darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'}`}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-sm leading-relaxed">
              
              <div>
                <h4 className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider mb-1">Role / Designation</h4>
                <p className="font-bold text-indigo-400">{selectedProject.role}</p>
              </div>

              <div>
                <h4 className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider mb-1">Overview Description</h4>
                <p className={darkMode ? 'text-slate-300' : 'text-slate-700'}>{selectedProject.description}</p>
              </div>

              {selectedProject.metrics && (
                <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/25 flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-emerald-400">Business Impact & Key Achievement Metric</h4>
                    <p className="text-xs text-emerald-400/90 mt-0.5 font-medium">{selectedProject.metrics}</p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <h4 className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider">Key Tasks & Contributions</h4>
                <ul className="space-y-2 text-xs">
                  {selectedProject.tasks.map((task, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <ChevronRight size={14} className="text-indigo-400 shrink-0 mt-0.5" />
                      <span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider">Technologies Utilized</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className={`px-2.5 py-1 rounded text-xs font-mono ${darkMode ? 'bg-slate-950 text-slate-400 border-slate-900' : 'bg-slate-50 text-slate-600 border-slate-200'} border`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer Actions */}
            <div className="px-6 py-4 border-t border-slate-800/60 shrink-0 flex items-center justify-between">
              <span className="text-xs text-slate-500"></span>
              <div className="flex space-x-2">
                {selectedProject.url && (
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500"
                  >
                    <span>Visit Live Website</span>
                    <ExternalLink size={12} className="ml-1" />
                  </a>
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold border ${darkMode ? 'border-slate-800 bg-slate-900 text-slate-300 hover:text-white' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'}`}
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Global Footer */}
      <footer className={`border-t py-8 text-center transition-colors ${darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <span className="font-extrabold text-slate-400">{PROFILE_INFO.fullName}</span>
            <span className="text-indigo-600">•</span>
            <span className="text-xs font-mono text-indigo-400">{PROFILE_INFO.title}</span>
          </div>
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Salim Brahim. All rights reserved. Created with React, Vite, and Tailwind CSS.
          </p>
        </div>
      </footer>

    </div>
  );
}
