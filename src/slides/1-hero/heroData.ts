import type { HeroData } from '../../types'

export const heroData: HeroData = {
  name: "Amar Shaw",
  headline: "Full-Stack Developer & US Healthcare RCM Specialist",
  tagline: "Bridging 5+ years of international operations, US healthcare prior authorization, denial management, and billing operations with modern full-stack web engineering.",
  location: "Kolkata, West Bengal, India",
  stats: [
    { label: "Overall Track Record", value: "5+ Years", detail: "Global Ops & RCM Domain" },
    { label: "Auth SLA", value: "99.4%", detail: "Availity, NaviNet & Evicore" },
    { label: "Tech Stack", value: "Full-Stack", detail: "Vue 3, TypeScript, Python" }
  ],
  quickCtas: [
    { label: "View Projects", slideIndex: 2, primary: true },
    { label: "Calculate ROI", slideIndex: 3, primary: false },
    { label: "Contact Me", slideIndex: 5, primary: false }
  ]
}
