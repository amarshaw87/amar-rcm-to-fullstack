import type { HeroData } from '../../types'

export const heroData: HeroData = {
  name: "Amar Shaw",
  headline: "Full-Stack Developer & US Healthcare RCM Specialist",
  tagline: "Bridging 5+ years of international operations, US healthcare prior authorization, denial management, and billing operations with modern full-stack web engineering.",
  stats: [
    { value: "5+ Years", label: "Overall Track Record", detail: "Global Ops & RCM Domain" },
    { value: "99.4%", label: "Auth SLA", detail: "Availity, NaviNet & Evicore" },
    { value: "Full-Stack", label: "Tech Stack", detail: "Vue 3, TypeScript, Python" }
  ],
  quickCtas: [
    { label: "View Projects", slideIndex: 2, primary: true },
    { label: "Calculate ROI", slideIndex: 3, primary: false },
    { label: "Contact Me", slideIndex: 6, primary: false }
  ]
}
