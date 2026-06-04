import { useState, useEffect } from 'react';
import { Home, User, Cpu, BookOpen, MessageSquare, Mail, Phone, ExternalLink, Search } from 'lucide-react';
import ContactForm from './ContactForm';

const allRepositories = [
  {
    id: 'job-portal',
    title: 'Job Portal',
    subtitle: 'MERN Stack Web App',
    color: '#00f0ff',
    lang: 'JavaScript',
    githubUrl: 'https://github.com/JANAC77/Job-Portal',
    details: 'Built a MERN Stack Job Portal with role-based access control, job posting, applications, and resume upload.'
  },
  {
    id: 'lms',
    title: 'LMS System',
    subtitle: 'Full-Stack Platform',
    color: '#bd00ff',
    lang: 'JavaScript',
    githubUrl: 'https://github.com/JANAC77/Learning-management-system',
    details: 'Developed a full-stack Learning Management System (LMS) supporting course listings and user authentication.'
  },
  {
    id: 'weather',
    title: 'Weather Search',
    subtitle: 'API Weather App',
    color: '#39ff14',
    lang: 'JavaScript',
    githubUrl: 'https://github.com/JANAC77/Weather-Search',
    details: 'Developed a responsive Weather Search application using React.js and OpenWeather API.'
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Storefront',
    subtitle: 'Vanilla JS Storefront',
    color: '#0072ff',
    lang: 'HTML',
    githubUrl: 'https://github.com/JANAC77/E-commerce',
    details: 'Designed and developed a responsive E-Commerce website using HTML, CSS, and JavaScript with cart features.'
  },
  {
    id: 'carlos-cake-website',
    title: 'Carlos Cake Website',
    subtitle: 'Storefront Portal',
    color: '#00f0ff',
    lang: 'JavaScript',
    githubUrl: 'https://github.com/JANAC77/carlos_cake_website',
    details: 'A clean, responsive storefront application designed for Carlos Cake bakery to present menus and product catalog items.'
  },
  {
    id: 'carlos-cake-admin',
    title: 'Carlos Cake Admin',
    subtitle: 'Admin dashboard console',
    color: '#bd00ff',
    lang: 'JavaScript',
    githubUrl: 'https://github.com/JANAC77/carlos_cake_admin',
    details: 'Administrative dashboard portal built to manage orders, catalog inventory, and incoming consumer inquiries for bakery managers.'
  },
  {
    id: 'rainbow-kids-school',
    title: 'Rainbow Kids School',
    subtitle: 'Educational Platform',
    color: '#39ff14',
    lang: 'JavaScript',
    githubUrl: 'https://github.com/JANAC77/rainbow_kids_school_website',
    details: 'A vibrant, accessible web landing site developed for schools, managing calendars, events, curriculum, and admissions.'
  },
  {
    id: 'rainbow-kids-admin',
    title: 'Rainbow Kids Admin',
    subtitle: 'School Management Admin',
    color: '#0072ff',
    lang: 'JavaScript',
    githubUrl: 'https://github.com/JANAC77/rainbow_kids_admin_panel',
    details: 'Administrative operations console configured to organize calendars, teacher details, parent inquiries, and student admissions.'
  },
  {
    id: 'dump-drop-admin',
    title: 'Dump Drop Admin',
    subtitle: 'Logistics Console',
    color: '#00f0ff',
    lang: 'JavaScript',
    githubUrl: 'https://github.com/JANAC77/dump-drop_admin',
    details: 'Operations console designed to manage dump booking logs, disposal schedules, location tracking, and logistics analytics.'
  },
  {
    id: 'brightways',
    title: 'Brightways Platform',
    subtitle: 'Business Landing Node',
    color: '#bd00ff',
    lang: 'JavaScript',
    githubUrl: 'https://github.com/JANAC77/brightways',
    details: 'Responsive, optimized business platform constructed for Brightways, maximizing visual styling grids and load latency.'
  },
  {
    id: 'dump-and-drop',
    title: 'Dump & Drop App',
    subtitle: 'Waste Management System',
    color: '#39ff14',
    lang: 'JavaScript',
    githubUrl: 'https://github.com/JANAC77/dump-and-drop',
    details: 'User interface dashboard allowing customers to schedule waste collection orders, track pickups, and log locations.'
  },
  {
    id: 'feliz-ecommerce',
    title: 'Feliz E-Commerce',
    subtitle: 'Stylized Product Catalog',
    color: '#0072ff',
    lang: 'CSS',
    githubUrl: 'https://github.com/JANAC77/feliz_ecommerce',
    details: 'Prinsitine CSS-driven e-commerce layout emphasizing modern typography, transition layers, and product catalogs.'
  },
  {
    id: 'ats-ecommerce',
    title: 'ATS E-Commerce',
    subtitle: 'E-Commerce storefront API',
    color: '#00f0ff',
    lang: 'JavaScript',
    githubUrl: 'https://github.com/JANAC77/ats_e-commerce',
    details: 'Digital storefront integration displaying catalogs, handling cart state changes, and maintaining session trackers.'
  },
  {
    id: 'afs-admin',
    title: 'AFS Admin Dashboard',
    subtitle: 'Security Console Panel',
    color: '#bd00ff',
    lang: 'JavaScript',
    githubUrl: 'https://github.com/JANAC77/afs_admin',
    details: 'A secure backend administration manager dashboard to monitor client records, API status, and transaction histories.'
  },
  {
    id: 'dynamic-form',
    title: 'Dynamic Form Generator',
    subtitle: 'JSON Schema Generator',
    color: '#bd00ff',
    lang: 'N/A',
    githubUrl: 'https://github.com/JANAC77/Dynamicform',
    details: 'Developer utility application parsing JSON configuration files to dynamically build verified input fields.'
  },
  {
    id: 'dashboard-generic',
    title: 'Generic Admin Dashboard',
    subtitle: 'UI Component Module',
    color: '#39ff14',
    lang: 'JavaScript',
    githubUrl: 'https://github.com/JANAC77/dashboard',
    details: 'A clean, customizable developer dashboard panel containing charts, analytics tables, and navigation structures.'
  },
  {
    id: 'crud-operation-test',
    title: 'CRUD Operation Testbed',
    subtitle: 'API Database Sandbox',
    color: '#0072ff',
    lang: 'N/A',
    githubUrl: 'https://github.com/JANAC77/CRUD-operation',
    details: 'Database connectivity prototype showcasing CRUD operations, database queries, and response logs.'
  },
  {
    id: 'string-analysis',
    title: 'String Analysis Tool',
    subtitle: 'Algorithm testing utility',
    color: '#00f0ff',
    lang: 'JavaScript',
    githubUrl: 'https://github.com/JANAC77/String-analysis',
    details: 'Utility analyzing inputs for character distributions, vowel metrics, regex matching, and string patterns.'
  },
  {
    id: 'user-api-endpoints',
    title: 'User Management API',
    subtitle: 'Authentication Endpoint',
    color: '#bd00ff',
    lang: 'JavaScript',
    githubUrl: 'https://github.com/JANAC77/user-api',
    details: 'Backend Node/Express API module rendering login pathways, password hashing, and token checks.'
  },
  {
    id: 'merge-conflict-sandbox',
    title: 'Git Conflict Sandbox',
    subtitle: 'Version Control Testbed',
    color: '#39ff14',
    lang: 'N/A',
    githubUrl: 'https://github.com/JANAC77/mergeconflict',
    details: 'Workspace structured to practice branching structures, PR configurations, and resolving merge conflicts.'
  },
  {
    id: 'gitgithub2-practice',
    title: 'Git & GitHub Practice v2',
    subtitle: 'Branching Workflow Practice',
    color: '#0072ff',
    lang: 'N/A',
    githubUrl: 'https://github.com/JANAC77/gitgithub2',
    details: 'Demonstrator repository highlighting pull requests, commit trees, and baseline git commands.'
  },
  {
    id: 'git-github-learning',
    title: 'Git & GitHub Guides',
    subtitle: 'Version Control Tutorial',
    color: '#00f0ff',
    lang: 'N/A',
    githubUrl: 'https://github.com/JANAC77/Git-Github-learn',
    details: 'Educational repository listing syntax documentation, branching rules, and version management tips.'
  },
  {
    id: 'todo-app',
    title: 'To-Do List App',
    subtitle: 'Interactive task tracker',
    color: '#bd00ff',
    lang: 'JavaScript',
    githubUrl: 'https://github.com/JANAC77/To-do-list-app',
    details: 'Dynamic client to-do tracker application built to practice state updates, item deletions, and storage.'
  },
  {
    id: 'react-social-app-mock',
    title: 'React Social App Mock',
    subtitle: 'Social feed simulation',
    color: '#39ff14',
    lang: 'JavaScript',
    githubUrl: 'https://github.com/JANAC77/react-social-app',
    details: 'Interactive React application simulating a social media timeline, user profile feeds, and posting triggers.'
  }
];

const Github = ({ size = 16, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ size = 16, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function HudOverlay({
  activeSection,
  setActiveSection,
  selectedProject,
  setSelectedProject,
  selectedSkillCategory,
  setSelectedSkillCategory
}) {
  const [projectTab, setProjectTab] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  // Scroll to section trigger
  const handleNavClick = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(sectionId);
    if (sectionId !== 'projects') setSelectedProject(null);
    if (sectionId !== 'skills') setSelectedSkillCategory(null);
  };

  // Scroll spy IntersectionObserver logic
  useEffect(() => {
    const sectionIds = ['home', 'skills', 'projects', 'education', 'contact'];

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px', // Trigger when section occupies screen center
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [setActiveSection]);

  const sections = [
    { id: 'home', label: 'DASHBOARD', icon: <Home size={18} /> },
    { id: 'skills', label: 'TECH MATRIX', icon: <Cpu size={18} /> },
    { id: 'projects', label: 'PROJECT BUILDS', icon: <User size={18} /> },
    { id: 'education', label: 'ACADEMICS', icon: <BookOpen size={18} /> },
    { id: 'contact', label: 'COMM LINK', icon: <MessageSquare size={18} /> }
  ];

  // Set default skill category to Frontend if null
  const activeSkillCat = selectedSkillCategory || {
    name: 'Frontend',
    color: '#00f0ff',
    skills: ['React.js', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Tailwind CSS']
  };

  return (
    <div
      className="hud-container"
      style={{
        position: 'relative',
        width: '100%',
        zIndex: 10,
        boxSizing: 'border-box'
      }}
    >
      {/* Sticky Header */}
      <header className="sticky-header">
        <div className="sticky-header-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: 'var(--accent-cyan)',
                boxShadow: 'var(--glow-cyan)'
              }}
            />
            <h1
              style={{
                fontFamily: 'Orbitron',
                fontSize: '1.2rem',
                letterSpacing: '2px',
                fontWeight: 800,
                background: 'linear-gradient(to right, #00f0ff, #bd00ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              JANARTHANAN_C
            </h1>
          </div>
          <nav className="sticky-nav">
            {sections.map((sec) => (
              <button
                key={sec.id}
                id={`nav-link-${sec.id}`}
                onClick={() => handleNavClick(sec.id)}
                className={`sticky-nav-btn ${activeSection === sec.id ? 'active' : ''}`}
              >
                {sec.icon}
                <span className="hidden-mobile" style={{ fontSize: '0.8rem' }}>{sec.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Sections Scrolling Container */}
      <main className="page-container" style={{ paddingTop: '80px' }}>
        {/* Home / Hero Section */}
        <section id="home" className="section-container">
          <div className="hero-split">
            {/* Left Column: Bio Details */}
            <div className="fade-in-section" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="hud-border-cyan" style={{ paddingLeft: '16px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>
                  SYSTEM INITIALIZED: WELCOME
                </span>
                <h2 style={{ fontFamily: 'Orbitron', fontSize: '2.5rem', fontWeight: 800, color: '#fff', margin: '8px 0 16px 0', lineHeight: '1.1' }}>
                  JANARTHANAN
                </h2>
                <p style={{ color: 'var(--accent-cyan)', fontSize: '1rem', fontWeight: 600, letterSpacing: '1px', marginBottom: '16px' }}>
                  MERN STACK & UI DEVELOPER
                </p>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '1.05rem', fontWeight: 600 }}>
                  I am a Full Stack Developer (MERN) and Frontend Engineer. I build responsive, secure, and visually premium web systems using React.js, Node.js, Express, and MongoDB. Scroll down to scan my technical modules, projects database, and educational coordinates.
                </p>
              </div>

              {/* Home Quick Actions */}
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '10px' }}>
                <button
                  onClick={() => handleNavClick('projects')}
                  className="badge-cyan"
                  style={{ padding: '12px 24px', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'Orbitron', letterSpacing: '1px', border: '1.5px solid var(--accent-cyan)', borderRadius: '6px' }}
                >
                  SCAN PROJECT ARCHIVE
                </button>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="badge-purple"
                  style={{ padding: '12px 24px', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'Orbitron', letterSpacing: '1px', border: '1.5px solid var(--accent-purple)', borderRadius: '6px' }}
                >
                  ESTABLISH COMM LINK
                </button>
              </div>

              {/* General Tech Tag Pills */}
              <div style={{ marginTop: '20px' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>
                  CORE STACK MATRIX
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <span className="badge-cyan">React.js</span>
                  <span className="badge-cyan">Node.js</span>
                  <span className="badge-cyan">Express.js</span>
                  <span className="badge-cyan">MongoDB</span>
                  <span className="badge-purple">JWT Authentication</span>
                  <span className="badge-purple">RESTful APIs</span>
                  <span className="badge-purple">Tailwind CSS</span>
                  <span className="badge-purple">Git / GitHub</span>
                </div>
              </div>
            </div>

            {/* Right Column: Terminal Emulator */}
            <div className="terminal-window" style={{ boxShadow: '0 0 30px rgba(0,0,0,0.5)' }}>
              <div className="terminal-header">
                <span className="terminal-dot red"></span>
                <span className="terminal-dot yellow"></span>
                <span className="terminal-dot green"></span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginLeft: '8px', fontFamily: 'monospace' }}>
                  guest@janarthanan-shell:~
                </span>
              </div>
              <div className="terminal-body" style={{ fontSize: '0.85rem' }}>
                <p style={{ color: 'var(--accent-green)', marginBottom: '4px' }}>$ cat profile.json</p>
                <pre style={{ whiteSpace: 'pre-wrap', color: '#a5b4fc', fontFamily: 'monospace', marginBottom: '16px' }}>
                  {`{
  "developer": "Janarthanan",
  "focus": ["Frontend", "Full Stack Development", "MERN Architectures"],
  "specialties": ["Responsive UI", "JWT Authentication", "REST APIs", "CRUD Systems"],
  "philosophy": "Write clean, highly scalable and visually outstanding systems."
}`}
                </pre>
                <p style={{ color: 'var(--accent-green)', marginBottom: '4px' }}>$ check_experience</p>
                <p style={{ color: 'var(--text-primary)' }}>
                  &gt; Hands-on experience developing end-to-end LMS portals, secure Job Portals with role management, real-time API weather search systems, and responsive e-commerce layers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section-container">
          <div className="hud-border-purple" style={{ paddingLeft: '16px', marginBottom: '32px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-purple)', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>
              TECHNICAL MATRIX
            </span>
            <h2 style={{ fontFamily: 'Orbitron', fontSize: '2rem', fontWeight: 700, color: '#fff', marginTop: '6px' }}>
              DIAGNOSTIC STATS
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '8px', fontWeight: 600 }}>
              Select a category module block below to inspect detailed skill telemetry and diagnostics.
            </p>
          </div>

          <div className="skills-split">
            {/* Left side: Category grid buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
              <div
                onClick={() => setSelectedSkillCategory({ name: 'Frontend', color: '#00f0ff', skills: ['React.js', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Tailwind CSS'] })}
                className={`glass-panel card-glow-cyan ${activeSkillCat.name === 'Frontend' ? 'active' : ''}`}
                style={{
                  padding: '24px',
                  cursor: 'pointer',
                  borderLeft: '4px solid #00f0ff',
                  borderColor: activeSkillCat.name === 'Frontend' ? '#00f0ff' : 'var(--glass-border)',
                  boxShadow: activeSkillCat.name === 'Frontend' ? '0 0 15px rgba(0,240,255,0.2)' : 'none'
                }}
              >
                <h4 style={{ fontFamily: 'Orbitron', marginBottom: '8px', color: '#fff' }}>Frontend</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px', fontWeight: 600 }}>Interactive, accessible, and fast layout rendering.</p>
                <span className="badge-cyan">4 Skills</span>
              </div>

              <div
                onClick={() => setSelectedSkillCategory({ name: 'Backend', color: '#bd00ff', skills: ['Node.js', 'Express.js', 'RESTful APIs', 'JWT Security'] })}
                className={`glass-panel card-glow-purple ${activeSkillCat.name === 'Backend' ? 'active' : ''}`}
                style={{
                  padding: '24px',
                  cursor: 'pointer',
                  borderLeft: '4px solid #bd00ff',
                  borderColor: activeSkillCat.name === 'Backend' ? '#bd00ff' : 'var(--glass-border)',
                  boxShadow: activeSkillCat.name === 'Backend' ? '0 0 15px rgba(189,0,255,0.2)' : 'none'
                }}
              >
                <h4 style={{ fontFamily: 'Orbitron', marginBottom: '8px', color: '#fff' }}>Backend</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px', fontWeight: 600 }}>Highly modular endpoints, security auth, and pipelines.</p>
                <span className="badge-purple">4 Skills</span>
              </div>

              <div
                onClick={() => setSelectedSkillCategory({ name: 'Database', color: '#39ff14', skills: ['MongoDB', 'CRUD Operations', 'Query Optimization'] })}
                className={`glass-panel ${activeSkillCat.name === 'Database' ? 'active' : ''}`}
                style={{
                  padding: '24px',
                  cursor: 'pointer',
                  borderLeft: '4px solid #39ff14',
                  borderColor: activeSkillCat.name === 'Database' ? '#39ff14' : 'var(--glass-border)',
                  boxShadow: activeSkillCat.name === 'Database' ? '0 0 15px rgba(57,255,20,0.2)' : 'none'
                }}
                onMouseOver={(e) => e.currentTarget.style.borderColor = '#39ff14'}
                onMouseOut={(e) => { if (activeSkillCat.name !== 'Database') e.currentTarget.style.borderColor = 'var(--glass-border)'; }}
              >
                <h4 style={{ fontFamily: 'Orbitron', marginBottom: '8px', color: '#fff' }}>Database</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px', fontWeight: 600 }}>Data integrity, schemas and high uptime databases.</p>
                <span className="badge-cyan" style={{ borderColor: '#39ff14', color: '#39ff14' }}>3 Skills</span>
              </div>

              <div
                onClick={() => setSelectedSkillCategory({ name: 'Tools & CS', color: '#0072ff', skills: ['Git / GitHub', 'Postman Client', 'OOP Concepts', 'DSA Basics'] })}
                className={`glass-panel ${activeSkillCat.name === 'Tools & CS' ? 'active' : ''}`}
                style={{
                  padding: '24px',
                  cursor: 'pointer',
                  borderLeft: '4px solid #0072ff',
                  borderColor: activeSkillCat.name === 'Tools & CS' ? '#0072ff' : 'var(--glass-border)',
                  boxShadow: activeSkillCat.name === 'Tools & CS' ? '0 0 15px rgba(0,114,255,0.2)' : 'none'
                }}
                onMouseOver={(e) => e.currentTarget.style.borderColor = '#0072ff'}
                onMouseOut={(e) => { if (activeSkillCat.name !== 'Tools & CS') e.currentTarget.style.borderColor = 'var(--glass-border)'; }}
              >
                <h4 style={{ fontFamily: 'Orbitron', marginBottom: '8px', color: '#fff' }}>Tools & CS</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px', fontWeight: 600 }}>CI/CD pipelines, code testing, and logic fundamentals.</p>
                <span className="badge-cyan" style={{ borderColor: '#0072ff', color: '#0072ff' }}>4 Skills</span>
              </div>
            </div>

            {/* Right side: Detailed Stats panel */}
            <div className="terminal-window" style={{ borderColor: activeSkillCat.color }}>
              <div className="terminal-header" style={{ borderBottom: `1px solid ${activeSkillCat.color}20` }}>
                <span className="terminal-dot red"></span>
                <span className="terminal-dot yellow"></span>
                <span className="terminal-dot green"></span>
                <span style={{ fontSize: '0.8rem', color: activeSkillCat.color, marginLeft: '8px', fontWeight: 'bold', fontFamily: 'monospace' }}>
                  {activeSkillCat.name.toUpperCase()} SKILLS TELEMETRY
                </span>
              </div>
              <div className="terminal-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <p style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                  Diagnostics report for individual assets in the <strong>{activeSkillCat.name}</strong> sub-matrix.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {activeSkillCat.skills.map((skill, sIdx) => {
                    const percentages = [95, 90, 85, 80];
                    const percent = percentages[sIdx % percentages.length];
                    return (
                      <div key={skill}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                          <span style={{ fontWeight: 600 }}>{skill}</span>
                          <span style={{ color: activeSkillCat.color, fontFamily: 'monospace', fontWeight: 'bold' }}>{percent}%</span>
                        </div>
                        <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                          <div
                            style={{
                              height: '100%',
                              width: `${percent}%`,
                              background: activeSkillCat.color,
                              boxShadow: `0 0 10px ${activeSkillCat.color}`,
                              transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ marginTop: '10px', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px dashed rgba(255,255,255,0.08)' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '1px', display: 'block', marginBottom: '4px' }}>
                    ADDITIONAL ASSETS
                  </span>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', fontWeight: 600 }}>
                    {activeSkillCat.name === 'Frontend' && "Web Performance Optimization • Responsive Grids • Cross-Browser Compatibility • Accessible HTML5."}
                    {activeSkillCat.name === 'Backend' && "REST API Routing • Security Auth (JWT) • CORS & Middleware Orchestration • Request Schema Validation."}
                    {activeSkillCat.name === 'Database' && "NoSQL Database Schemas • CRUD Operation Testing • MongoDB Atlas Deployment • Query Performance Tuning."}
                    {activeSkillCat.name === 'Tools & CS' && "Git Branching Workflow • Postman Endpoint Mocking • Object Oriented Programming (OOP) Logic • Core DSA Competency."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section-container">
          <div className="hud-border-cyan" style={{ paddingLeft: '16px', marginBottom: '32px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>
              PROJECT ARCHIVE REGISTRY
            </span>
            <h2 style={{ fontFamily: 'Orbitron', fontSize: '2rem', fontWeight: 700, color: '#fff', marginTop: '6px' }}>
              CODE BUILDS
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '8px', fontWeight: 600 }}>
              Explore my featured application architectures and standard repository registries.
            </p>
          </div>

          {selectedProject ? (
            <div className="terminal-window" style={{ borderColor: selectedProject.color, width: '100%', marginBottom: '20px' }}>
              <div className="terminal-header" style={{ borderBottom: `1px solid ${selectedProject.color}20` }}>
                <span className="terminal-dot red"></span>
                <span className="terminal-dot yellow"></span>
                <span className="terminal-dot green"></span>
                <span style={{ fontSize: '0.8rem', color: selectedProject.color, marginLeft: '8px', fontWeight: 'bold', fontFamily: 'monospace' }}>
                  PROJECT SPEC: {selectedProject.title.toUpperCase()}
                </span>
              </div>
              <div className="terminal-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <h3 style={{ fontFamily: 'Orbitron', color: '#fff', fontSize: '1.4rem', marginBottom: '4px' }}>{selectedProject.title}</h3>
                    <p style={{ color: selectedProject.color, fontSize: '0.85rem', fontWeight: 'bold' }}>{selectedProject.subtitle}</p>
                  </div>
                  <span className="badge-cyan" style={{ borderColor: selectedProject.color, color: selectedProject.color }}>
                    LANG: {selectedProject.lang}
                  </span>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', fontWeight: 600 }}>
                  {selectedProject.details}
                </p>

                <div style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', background: 'rgba(255,255,255,0.01)', padding: '16px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>
                    TECHNICAL INTEGRATION PROTOCOLS
                  </span>
                  <ul style={{ paddingLeft: '18px', fontSize: '0.88rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: 600 }}>
                    {selectedProject.id === 'job-portal' && (
                      <>
                        <li>Built a MERN Stack Job Portal with role-based access control, job posting, application trackers, and resume upload channels.</li>
                        <li>Developed RESTful APIs and implemented JWT authentication for secure user session management.</li>
                        <li>Created responsive UI components using React.js and dynamic Hooks.</li>
                      </>
                    )}
                    {selectedProject.id === 'lms' && (
                      <>
                        <li>Developed a full-stack Learning Management System supporting course catalog lists and secure login.</li>
                        <li>Implemented student and instructor dashboards with responsive UI design and role-based access control.</li>
                        <li>Utilized React Hooks (useState, useEffect) for dynamic UI rendering and smooth navigation paths.</li>
                      </>
                    )}
                    {selectedProject.id === 'weather' && (
                      <>
                        <li>Developed a responsive Weather Search application using React.js and OpenWeather API.</li>
                        <li>Implemented dynamic UI rendering based on weather variables using React state Hooks.</li>
                        <li>Optimized modular component-based architecture for enhanced client-side performance.</li>
                      </>
                    )}
                    {selectedProject.id === 'ecommerce' && (
                      <>
                        <li>Designed and developed a responsive E-Commerce store using HTML, CSS, and Vanilla JavaScript.</li>
                        <li>Implemented local cart state management and add-to-cart handlers in vanilla JS.</li>
                        <li>Focused on pristine UI/UX alignment, cross-browser compatibility, and fast loading layouts.</li>
                      </>
                    )}
                    {!['job-portal', 'lms', 'weather', 'ecommerce'].includes(selectedProject.id) && (
                      <>
                        <li>Repository Code Identifier: <code>{selectedProject.id}</code></li>
                        <li>Primary Language Vector: <strong>{selectedProject.lang}</strong></li>
                        <li>Full Function Description: {selectedProject.details}</li>
                        <li>Integrated codebase ready for version controls and deployment pipelines.</li>
                      </>
                    )}
                  </ul>
                </div>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <a
                    id="btn-project-github"
                    href={selectedProject.githubUrl || "https://github.com/JANAC77"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="badge-cyan"
                    style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', fontFamily: 'Orbitron', fontSize: '0.8rem', letterSpacing: '1px', border: '1.5px solid var(--accent-cyan)' }}
                  >
                    <Github size={16} /> VIEW REPOSITORY <ExternalLink size={12} />
                  </a>

                  <button
                    id="btn-project-reset"
                    className="badge-purple"
                    onClick={() => setSelectedProject(null)}
                    style={{ cursor: 'pointer', background: 'transparent', padding: '10px 20px', fontFamily: 'Orbitron', fontSize: '0.8rem', letterSpacing: '1px', border: '1.5px solid var(--accent-purple)', borderRadius: '20px' }}
                  >
                    BACK TO INDEX
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Tab Selector */}
              <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '10px' }}>
                <button
                  id="tab-featured"
                  onClick={() => setProjectTab('featured')}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    borderBottom: projectTab === 'featured' ? '2px solid var(--accent-cyan)' : 'none',
                    color: projectTab === 'featured' ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontFamily: 'Orbitron',
                    fontSize: '0.85rem',
                    letterSpacing: '1px',
                    padding: '6px 12px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    transition: 'all 0.3s ease'
                  }}
                >
                  FEATURED BUILDS
                </button>
                <button
                  id="tab-all"
                  onClick={() => setProjectTab('all')}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    borderBottom: projectTab === 'all' ? '2px solid var(--accent-cyan)' : 'none',
                    color: projectTab === 'all' ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontFamily: 'Orbitron',
                    fontSize: '0.85rem',
                    letterSpacing: '1px',
                    padding: '6px 12px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    transition: 'all 0.3s ease'
                  }}
                >
                  ALL REPOSITORIES ({allRepositories.length})
                </button>
              </div>

              {projectTab === 'featured' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>
                    Select a featured project module below to display detailed system integrations and source code links.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                    {allRepositories.filter(r => r.id === 'job-portal' || r.id === 'lms' || r.id === 'weather' || r.id === 'ecommerce').map((p) => (
                      <div
                        key={p.id}
                        onClick={() => setSelectedProject(p)}
                        className="glass-panel"
                        style={{
                          padding: '24px',
                          cursor: 'pointer',
                          borderLeft: `4px solid ${p.color}`,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '12px',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.borderColor = p.color;
                          e.currentTarget.style.boxShadow = `0 0 20px ${p.color}25`;
                          e.currentTarget.style.transform = 'translateY(-4px)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.borderColor = 'var(--glass-border)';
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <div>
                          <h4 style={{ fontFamily: 'Orbitron', fontSize: '1.1rem', color: '#fff', marginBottom: '4px' }}>{p.title}</h4>
                          <span style={{ color: p.color, fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '0.5px' }}>{p.subtitle}</span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', fontWeight: 600 }}>{p.details}</p>
                        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span className="badge-cyan" style={{ borderColor: p.color, color: p.color, fontSize: '0.7rem' }}>
                            {p.lang}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>SCAN SYSTEM &gt;</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Search and Filters */}
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
                      <input
                        id="repo-search"
                        type="text"
                        placeholder="Search repository index..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="form-input"
                        style={{ paddingLeft: '36px' }}
                      />
                      <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                    </div>

                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {['all', 'JavaScript', 'HTML', 'CSS', 'N/A'].map((l) => (
                        <button
                          key={l}
                          onClick={() => setSelectedLanguage(l)}
                          style={{
                            background: selectedLanguage === l ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid',
                            borderColor: selectedLanguage === l ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.1)',
                            color: selectedLanguage === l ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                            padding: '6px 12px',
                            borderRadius: '15px',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            fontWeight: 600,
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {l.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Repos Grid */}
                  <div className="scroll-pane" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', maxHeight: '500px', overflowY: 'auto', paddingRight: '4px' }}>
                    {allRepositories
                      .filter((r) => {
                        const matchQ = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.details.toLowerCase().includes(searchQuery.toLowerCase());
                        const matchL = selectedLanguage === 'all' || r.lang === selectedLanguage;
                        return matchQ && matchL;
                      })
                      .map((p) => (
                        <div
                          key={p.id}
                          onClick={() => setSelectedProject(p)}
                          className="glass-panel"
                          style={{
                            padding: '20px',
                            cursor: 'pointer',
                            borderLeft: `3px solid ${p.color}`,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.borderColor = p.color;
                            e.currentTarget.style.boxShadow = `0 0 15px ${p.color}20`;
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.borderColor = 'var(--glass-border)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                            <h4 style={{ fontFamily: 'Orbitron', fontSize: '0.95rem', color: '#fff', fontWeight: 600 }}>{p.title}</h4>
                            <span
                              style={{
                                fontSize: '0.65rem',
                                color: p.color,
                                borderColor: p.color,
                                border: '1px solid',
                                padding: '2px 6px',
                                borderRadius: '10px',
                                fontWeight: 'bold',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {p.lang}
                            </span>
                          </div>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', fontWeight: 600 }}>{p.details}</p>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Education Section */}
        <section id="education" className="section-container">
          <div className="hud-border-cyan" style={{ paddingLeft: '16px', marginBottom: '32px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>
              ACADEMIC COORDINATES
            </span>
            <h2 style={{ fontFamily: 'Orbitron', fontSize: '2rem', fontWeight: 700, color: '#fff', marginTop: '6px' }}>
              EDUCATION TIMELINE
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '8px', fontWeight: 600 }}>
              Chronological records of university studies, academic scores and credentials.
            </p>
          </div>

          <div style={{ position: 'relative', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ position: 'absolute', left: '6px', top: '8px', bottom: '8px', width: '2px', background: 'linear-gradient(to bottom, var(--accent-cyan), var(--accent-purple))' }}></div>

            <div className="timeline-item">
              <div className="timeline-dot" style={{ borderColor: 'var(--accent-cyan)' }}></div>
              <div
                className="glass-panel"
                style={{
                  padding: '24px',
                  borderLeft: '4px solid var(--accent-cyan)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'var(--glass-border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                  <span className="badge-cyan">2023 – 2025</span>
                  <span className="badge-purple" style={{ borderColor: 'var(--accent-green)', color: 'var(--accent-green)', textShadow: '0 0 5px rgba(57,255,20,0.3)' }}>CGPA: 8.3</span>
                </div>
                <h4 style={{ fontFamily: 'Orbitron', fontSize: '1.2rem', color: '#fff', marginBottom: '6px' }}>
                  Master of Computer Applications (MCA)
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 500 }}>
                  Government Arts College (A)
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '12px', lineHeight: '1.6', fontWeight: 600 }}>
                  Advanced coursework in web application architectures, database management systems, system design, object-oriented concepts, and project lifecycle management.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot" style={{ borderColor: 'var(--accent-purple)' }}></div>
              <div
                className="glass-panel"
                style={{
                  padding: '24px',
                  borderLeft: '4px solid var(--accent-purple)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-purple)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(189, 0, 255, 0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'var(--glass-border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                  <span className="badge-cyan">2020 – 2023</span>
                  <span className="badge-purple" style={{ borderColor: 'var(--accent-green)', color: 'var(--accent-green)', textShadow: '0 0 5px rgba(57,255,20,0.3)' }}>CGPA: 7.8</span>
                </div>
                <h4 style={{ fontFamily: 'Orbitron', fontSize: '1.2rem', color: '#fff', marginBottom: '6px' }}>
                  Bachelor of Computer Applications (BCA)
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 500 }}>
                  Government Arts College (A)
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '12px', lineHeight: '1.6', fontWeight: 600 }}>
                  Foundation systems logic, database schemas, object-oriented programming (OOP) logic, and standard web technologies (HTML, CSS, JS).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section-container" style={{ minHeight: 'auto', paddingBottom: '100px' }}>
          <div className="hud-border-purple" style={{ paddingLeft: '16px', marginBottom: '32px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-purple)', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>
              COMMUNICATION FREQUENCY
            </span>
            <h2 style={{ fontFamily: 'Orbitron', fontSize: '2rem', fontWeight: 700, color: '#fff', marginTop: '6px' }}>
              COMM LINK
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '8px', fontWeight: 600 }}>
              Initialize connection protocols. Complete the data packet transmission form, or establish direct contact using the links.
            </p>
          </div>

          <div className="contact-split">
            <ContactForm />

            <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '1px' }}>
                DIRECT DATA PORTS
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <a
                  id="link-github"
                  href="https://github.com/JANAC77"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  <Github size={18} /> <span>GitHub Profile</span> <span>github.com/JANAC77</span>
                </a>

                <a
                  id="link-linkedin"
                  href="https://www.linkedin.com/in/janarthanan-c-502563250"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  <Linkedin size={18} /> <span>LinkedIn Network</span> <span>linkedin/Janarthanan-c</span>
                </a>

                <a
                  id="link-email"
                  href="mailto:janarthananc01@gmail.com"
                  className="contact-link"
                >
                  <Mail size={18} /> <span>Email Address</span> <span>janarthananc01@gmail.com</span>
                </a>

                <a
                  id="link-phone"
                  href="tel:+917502981623"
                  className="contact-link"
                >
                  <Phone size={18} /> <span>Phone Link</span> <span>+91 75029 81623</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Futuristic HUD Footer */}
      <footer
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          maxWidth: '1200px',
          margin: '0 auto',
          borderTop: '1px solid rgba(255,255,255,0.05)'
        }}
      >
        <span>SYS.V: SCROLLING // REACT + THREE_FIBER</span>
        <span>DESIGNED & CODED BY JANARTHANAN © {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}
