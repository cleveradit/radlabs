---
# English landing page text. EVERY visible string on /en/ is read from
# here. Indonesian source: content/id/site.md. Keys must match.
#
# Text marked [GANTI: ...] is a fact not yet available. Render it as is.
#
# Tone: neutral and concise. The page introduces a person, it does not
# sell a service. Avoid superlatives and promised outcomes.
#
# Recognised markers:
#   **text**   → emphasis (rendered bold, ink colour)
#   {n}, {first}, {last} → values computed from data, never hand-written

meta:
  siteName: "radlabs"
  siteNameExpansion: "radityo laboratory"
  url: "https://radlabs.my.id"
  description: "Radityo Dwiki Putra Hamas, Web Developer & System Analyst at LHI International Islamic School, Surabaya. Analyses and builds the school's internal systems, including a student admission system used by five school units. Laravel, Filament, Docker."

ui:
  navLabel: "Main navigation"
  railLabel: "Section indicator"
  menuOpen: "Open navigation menu"
  menuClose: "Close navigation menu"
  themeToLight: "Switch to light theme"
  themeToDark: "Switch to dark theme"
  # The language button names the TARGET language.
  langSwitch:
    label: "ID"
    srLabel: "Versi Bahasa Indonesia"

nav:
  - label: "About"
    href: "#tentang"
  - label: "Experience"
    href: "#pengalaman"
  - label: "Skills"
    href: "#keahlian"
  - label: "Research"
    href: "#penelitian"
  - label: "Contact"
    href: "#kontak"

hero:
  railLabel: "LAB-00"
  status: "Lab status: active"
  eyebrow: "Surabaya, Indonesia"
  welcome: "Welcome to the Radityo Laboratory"
  name: "Radityo Dwiki Putra Hamas"
  intro: "A software engineering workspace and lab where I **take apart real operational problems in the field** and assemble them into **web systems proven in production**."
  lede: "Laravel · Filament · PHP · Docker · Domain-Driven Design"
  roles:
    - "Web Developer"
    - "System Analyst"
  labNote:
    label: "Lab note"
    live: "Live log"
    notes:
      - code: "MOD-01"
        title: "Code experiments & construction"
        desc: "Translating school business and operational rules into separate modules with Laravel, Filament, Docker, and automated releases."
      - code: "MOD-02"
        title: "System observation & analysis"
        desc: "Gathering requirements directly from admins in the field, asking what problem they face before deciding which pages to build."
    stationsLabel: "Research stations"
    stationsValue: "{n} main sections"
    archiveLabel: "Case study archive"
    archiveValue: "{first} to {last}"
  backdrop: "radLabs"
  actions:
    - label: "View research"
      href: "#penelitian"
      variant: "primary"
    - label: "Contact"
      href: "#kontak"
      variant: "outline"
  scrollHint: "Enter the observation room"

tentang:
  eyebrow: "Researcher profile"
  title: "About"
  description: "A background in Information Systems and the method used to take problems apart inside the lab."
  hypothesis:
    label: "Main working hypothesis"
    text: "Ask **what problem is being faced** before asking **which page is needed**."
  paragraphs:
    - "As an Information Systems graduate, I work on both sides of a system, understanding its operational problems and building the software that solves them."
    - "Currently an **IT Specialist at LHI International Islamic School**, a foundation with five school units, focused on web development. Day to day the work is analysing and building the school's internal systems, including the **student admission system (SPMB)** now used by every unit. It covers gathering requirements directly from admins in the field, turning the rules in practice into system behaviour, and implementation with Laravel, Filament, Docker, and GitHub Actions."
    - "When requirements are unclear, the first step is asking \"what problem is being faced\" before \"which page is needed\". From there, the proposed solution starts from a real problem and stays realistic to build."
    - "The **Google Project Management Professional Certificate** strengthened how work is planned and how stakeholders are kept informed."
  pendidikan:
    title: "Education & credentials"
    verifyLabel: "↗ Verify"
    items:
      - title: "Bachelor of Information Systems"
        org: "Universitas Brawijaya"
        period: "August 2018 - January 2025"
      - title: "Google Project Management Professional Certificate"
        org: "Coursera"
        period: "2026"
        note: "Verified certificate."
        href: "https://www.coursera.org/verify/professional-cert/1N9BWR1AQS1D"

pengalaman:
  eyebrow: "Field log"
  title: "Experience"
  description: "Select an assignment log to inspect the operational problem and the solution applied."
  tabsLabel: "Experience log"
  prevLabel: "Previous experience"
  nextLabel: "Next experience"
  logLabel: "Assignment log"
  codePrefix: "EXP-"
  items:
    - role: "IT Specialist"
      org: "LHI International Islamic School"
      period: "January 2026 - Present"
      tabPeriod: "2026 – Now"
      current: true
      summary: "Analysing, building, and maintaining internal school systems for a foundation with five school units."
      points:
        - "Continued developing the **student admission system (SPMB)** now used by every unit, and keep maintaining it in production."
        - "Gather requirements directly from admins in the field and turn the rules in practice into system behaviour."
        - "Proposed an official notification channel to guardians via **email and WhatsApp Business**; the proposal was accepted."
        - "Apply **Domain-Driven Design** principles, deploy Docker on a VPS, and release automatically through GitHub Actions."
      tags: ["Laravel", "Filament", "Domain-Driven Design", "Docker", "GitHub Actions", "WhatsApp Business"]
    - role: "Web developer - Freelance"
      org: "Healthcare-sector client"
      period: "May 2025 - December 2025"
      tabPeriod: "May – Dec 2025"
      summary: "Built a medical records web application together with one other developer."
      points:
        - "Handled most client meetings, requirement gathering, and clarification."
        - "When revisions kept repeating, **shifted the focus from fulfilling requests to understanding the client's operational problem**, then proposed solutions before implementation continued."
        - "Co-developed the application with a teammate."
      tags: ["Requirements Analysis", "Medical Records App", "Client Communication", "Web Development"]
    - role: "Web developer - Freelance"
      org: "Bumi Lestari Perkasa"
      period: "September 2023 - November 2023"
      tabPeriod: "Sep – Nov 2023"
      summary: "A web-based point-of-sale and sales data processing application, built by a team of two."
      points:
        - "Joined when the project had been running for a month and the client kept adding new page requests every week."
        - "Changed the approach by **asking what problem the client wanted to solve**, not only which page they wanted."
        - "Translated client problems into solution proposals for the developer, matched to the team's capacity."
        - "Acted as the client liaison while building lighter features; the teammate built the larger ones."
        - "**New requests per meeting dropped, the timeline became more controlled**, and the application is used for business operations."
      tags: ["PHP", "JavaScript", "CodeIgniter", "Problem Analysis"]
    - role: "Intern"
      org: "East Java Provincial Government"
      period: "January 2023 - February 2023"
      tabPeriod: "Jan – Feb 2023"
      summary: "Developed a website and managed and recapitulated asset data for the East Java Provincial Government."
      points:
        - "Developed and maintained a website supporting the agency's operations."
        - "Recorded and catalogued information on assets owned by the East Java Provincial Government."
        - "Recapitulated asset data to ensure administrative completeness and order."
      tags: ["Web Maintenance", "Asset Data Management", "Administrative Recapitulation"]
    - role: "AI/ML Independent Study Participant, Kampus Merdeka"
      tabRole: "AI/ML Independent Study"
      org: "PT Orbit Ventura Indonesia"
      period: "February 2022 - July 2022"
      tabPeriod: "Feb – Jul 2022"
      summary: "Studied machine learning models and deep learning, and built a forecasting final project."
      points: []
      tags: ["Python", "Machine Learning", "Deep Learning", "Forecasting"]

keahlian:
  eyebrow: "Lab instruments"
  title: "Skills"
  description: "The analysis tools, software architecture, and infrastructure tooling used inside the lab."
  summary:
    label: "Instrument categories"
    value: "{n} units"
    text: "Covering upstream (requirements & business rules) through downstream (code implementation, containerisation, & automated releases)."
  codePrefix: "LAB-"
  groups:
    - title: "System analysis"
      items:
        [
          "Requirements analysis",
          "Business process analysis",
          "Business rule definition",
          "Turning requirements into tickets",
        ]
    - title: "Backend"
      items: ["PHP", "Laravel", "Filament", "Livewire", "MySQL", "Redis"]
      highlight: ["PHP", "Laravel", "Filament"]
    - title: "Architecture & quality"
      items:
        [
          "Domain-Driven Design",
          "Module separation",
          "Automated testing",
          "Technical decision records",
        ]
    - title: "Infrastructure & release"
      items: ["Docker", "VPS", "GitHub Actions", "CI/CD"]
      highlight: ["Docker"]
    - title: "Integration & frontend"
      items:
        [
          "WhatsApp Business Cloud API",
          "Tailwind CSS",
          "JavaScript",
          "React & TypeScript",
        ]
    - title: "Other"
      items:
        [
          "Python",
          "Machine learning & forecasting",
          "Project management (Google certificate)",
        ]

penelitian:
  eyebrow: "Experiment archive"
  title: "Research"
  description: "System case studies and technical experiments I have worked on inside the lab."
  countLabel: "{n} research files"
  hint: "Click any experiment card ({first} to {last}) to open its **lab observation sheet**."
  cardAction: "Open lab sheet →"
  repoLabel: "↗ GitHub"
  privateRepoLabel: "Private repository"
  catalogPrefix: "P-"
  backLabel: "← All research"
  dialog:
    label: "Lab file //"
    problemLabel: "01. Field problem observation"
    solutionLabel: "02. System design & experiment"
    openLabel: "Open research article →"
    closeLabel: "Close file"
    closeSrLabel: "Close observation sheet"
  dataSheetLabel: "Data sheet"
  manifest:
    role: "Role"
    team: "Team"
    period: "Period"
    status: "Status"
    stack: "Stack"
    repo: "Repo"

kontak:
  eyebrow: "Transmission channels"
  title: "Contact"
  description: "Email is easiest. Other links are alongside for connecting or discussing systems and web engineering."
  copyLabel: "Copy email"
  copiedLabel: "✓ Email copied"
  sendLabel: "Send ↗"
  links:
    - label: "Email"
      value: "radityodwiki@gmail.com"
      href: "mailto:radityodwiki@gmail.com"
    - label: "GitHub"
      value: "cleveradit"
      href: "https://github.com/cleveradit"
      display: "github.com/cleveradit →"
    - label: "LinkedIn"
      value: "Radityo Dwiki Putra Hamas"
      href: "https://www.linkedin.com/in/radityo-dwiki/"
      display: "linkedin.com/in/radityo-dwiki →"
  backToTop: "↑ Back to the lab entrance"

notFound:
  heading: "404"
  body: "The page you are looking for is not here."
  backLabel: "Back to home"

footer:
  text: "radlabs · 2026"
---
