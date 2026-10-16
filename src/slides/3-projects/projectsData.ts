import type { ProjectsData } from '../../types'

export const projectsData: ProjectsData = {
  title: "Healthcare Software & Engineering Projects",
  subtitle: "Domain-specific tools engineered to resolve live RCM denial bottlenecks and batch code verification.",
  projects: [
    {
      id: "rcm-dashboard",
      name: "Healthcare RCM Analytics Dashboard",
      tech: "React.js • Modern CSS • State Hooks",
      repo: "github.com/amarshaw87/healthcare-rcm-dashboard",
      badge: "Full-Stack Web App",
      summary: "Interactive US Healthcare claims audit and denial management platform visualizing submissions, revenue-at-risk, and real-time approval ratios.",
      features: [
        "Audit engine auto-classifies submissions into Approved, Denied, or Manual Review.",
        "Calculates Clean Claims Rate, Revenue-at-Risk, and Total Billed metrics.",
        "Live searchable and filterable claims table with patient and CPT code lookups."
      ],
      metrics: [
        { label: "Audit Accuracy", value: "100%" },
        { label: "Latency", value: "<120ms" }
      ]
    },
    {
      id: "claims-automation",
      name: "Healthcare Claims Code Audit Automation",
      tech: "Python • Batch Processing • Data Validation",
      repo: "github.com/amarshaw87/healthcare-claims-automation",
      badge: "Backend Automation",
      summary: "High-throughput batch verification script auditing active ICD-10, CPT, and HCPCS billing codes against legacy databases to eliminate payer rejections.",
      features: [
        "Automated legacy ICD-9 cross-reference detection to prevent billing rejections.",
        "Generates audit executive reports with flagged anomalies and revenue totals.",
        "Robust error-handling for large-volume batch file ingestion."
      ],
      metrics: [
        { label: "Throughput", value: "10k+ rows/min" },
        { label: "Compliance", value: "Zero Rejections" }
      ]
    },
    {
      id: "rcm-to-fullstack",
      name: "Healthcare RCM to Full-Stack Pitch-Deck",
      tech: "Vue 3 • TypeScript • Vite • CSS Glassmorphism",
      repo: "github.com/amarshaw87/amar-rcm-to-fullstack",
      badge: "Vue 3 & TypeScript",
      summary: "Ultra-responsive 6-folder presentation deck with automatic 16:9/9:16 background switching, 100dvh viewport lock, and touch swipe.",
      features: [
        "Strict TypeScript architecture with global interfaces and 100% typed data contracts.",
        "Automatic background switching between landscape desktop and portrait mobile.",
        "Hardware-accelerated glass card transitions with zero window scrolling."
      ],
      metrics: [
        { label: "Architecture", value: "6 Modules" },
        { label: "Performance", value: "60 FPS" }
      ]
    }
  ]
}
