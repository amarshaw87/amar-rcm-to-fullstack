import type { ProjectsData } from '../../types'

export const projectsData: ProjectsData = {
  title: "Healthcare Software & Engineering Projects",
  subtitle: "Domain-specific tools engineered to resolve live RCM denial bottlenecks and batch code verification.",
  projects: [
    {
      id: "prior-auth-engine",
      name: "Prior Auth Initiation & Approval Engine",
      tech: "React.js • Modern CSS • State Hooks",
      repo: "https://github.com/amarshaw87/prior-auth-engine",
      badge: "Full-Stack Web App",
      summary: "Enterprise-grade automation pipeline built to bridge real-world US Healthcare Revenue Cycle Management (RCM) operational bottlenecks with modern front-end engineering.",
      features: [
        "Eliminates manual re-typing of patient demographics, NPIs, and clinical codes.",
        "Automates cross-referencing against massive insurance policy matrices.",
        "Accelerates transmission of approval or denial evidence to avoid TFL penalties."
      ],
      metrics: [
        { label: "Daily Volume", value: "50+ Accounts" },
        { label: "Language", value: "React/JS" }
      ]
    },
    {
      id: "ar-caller-pro",
      name: "AR Caller Pro",
      tech: "React.js • Modern CSS • State Hooks",
      repo: "https://github.com/amarshaw87/Ar-Caller-Pro",
      badge: "Full-Stack Web App",
      summary: "High-performance web workspace designed to bridge complex US Healthcare RCM operational business rules with modern frontend engineering patterns.",
      features: [
        "Optimizes workflows around rigid Interactive Voice Response (IVR) phone trees.",
        "Provides a clear, responsive tracking UI for specialized CARC/RARC rejection codes.",
        "Reduces floor onboarding lag and phone anxiety for newly hired AR callers."
      ],
      metrics: [
        { label: "Deployment", value: "GitHub Pages" },
        { label: "Language", value: "React/JS" }
      ]
    },
    {
      id: "remit-x-matrix",
      name: "Remit-X-Matrix Engine",
      tech: "Vue 3 • TypeScript • Plain CSS",
      repo: "https://github.com/amarshaw87/remit-x-matrix",
      badge: "Vue 3 & TypeScript",
      summary: "An enterprise-grade, client-side EDI 835 Electronic Remittance Advice sandbox decoder engineered to handle legacy 5010 and future 008060 claims data streams.",
      features: [
        "Instantly decodes unstructured insurance remittance text paths into clear, plain English.",
        "Dynamic delimiter ingestion automatically adapts to Asterisks (*), Pipes (|), or Carets (^).",
        "Dual-version validation framework supporting classic 5010 and 11-element 008060 formats."
      ],
      metrics: [
        { label: "Vue / TS Mix", value: "98.7%" },
        { label: "Layout UI", value: "Obsidian Dark" }
      ]
    },
    {
      id: "crosswalk-iq",
      name: "CrosswalkIQ",
      tech: "Vue.js • TypeScript • Vite • Tailwind CSS",
      repo: "https://github.com/amarshaw87/CrosswalkIQ",
      badge: "Single-Page Application",
      summary: "Ultra-lightweight, zero-latency medical coding validation and anesthesia crosswalk engine engineered to automate complex prior authorization workflows within US Healthcare RCM operations.",
      features: [
        "Automates complex multi-level mapping across regional spinal anatomy CPT, ASA, and Diagnosis (DX) code matrices.",
        "Handles critical dynamic exception loops for specific insurance rules including Humana-exclusive MAC code overrides.",
        "Enforces strict compile-time validation frameworks via TypeScript to guarantee 100% error-free clean-claim submissions.",
        "Eliminates interface latency entirely by executing high-velocity data lookups locally within the client browser DOM."
      ],
      metrics: [
        { label: "Deployment", value: "Vercel Global Edge" },
        { label: "Language", value: "Vue / TS Mix" }
      ]
    }
  ]
}
