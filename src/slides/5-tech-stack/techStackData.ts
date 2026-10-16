import type { TechStackData } from '../../types'

export const techStackData: TechStackData = {
  title: "Modern Tech Stack & Skill Matrix",
  subtitle: "Production-grade frontend architectures paired with backend scripting and healthcare domain precision.",
  categories: [
    {
      name: "Frontend Core",
      color: "sky",
      skills: [
        { name: "Vue 3", level: "Advanced", desc: "Composition API, Vite, Reactive State & Components" },
        { name: "TypeScript", level: "Proficient", desc: "Strict Typing, Interfaces, Generics & vue-tsc" },
        { name: "React.js", level: "Proficient", desc: "Hooks (useState, useEffect), Component Lifecycle" },
        { name: "HTML5 & CSS3", level: "Mastery", desc: "Tailwind CSS, Glassmorphism, 100dvh Lock" }
      ]
    },
    {
      name: "Backend & Data",
      color: "emerald",
      skills: [
        { name: "Python", level: "Proficient", desc: "Automation Pipelines, Data Auditing, Batch Processing" },
        { name: "PostgreSQL", level: "Intermediate", desc: "Relational Schema Design & Query Optimization" },
        { name: "MongoDB", level: "Intermediate", desc: "Document Collections & Aggregation Pipelines" },
        { name: "RESTful APIs", level: "Proficient", desc: "Endpoints, Payload Validation & Error Handling" }
      ]
    },
    {
      name: "Healthcare Domain",
      color: "indigo",
      skills: [
        { name: "Prior Authorizations", level: "Expert", desc: "Availity, NaviNet, Evicore & STAT Cases" },
        { name: "ICD-10 / CPT / HCPCS", level: "Expert", desc: "Clinical Code Audits & Denial Mitigation" },
        { name: "A/R & Appeals", level: "Expert", desc: "90+ Day Aging Overturn & LCD/NCD Guidelines" },
        { name: "US Medical Billing", level: "Expert", desc: "End-to-End Adjudication & Payer Compliance" }
      ]
    }
  ]
}
