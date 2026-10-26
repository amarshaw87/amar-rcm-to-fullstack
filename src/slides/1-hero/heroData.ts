import type { HeroData } from '../../types'

export const heroData: HeroData = {
  name: "Amar Shaw",
  headline: "Full-Stack Developer & US Healthcare RCM Specialist",
  tagline: "Bridging 5+ years of international operations, US healthcare prior authorization, denial management, and billing operations with modern full-stack web engineering.",
  stats: [
    { value: "5+ Years", label: "Overall Track Record" },
    { value: "99.4%", label: "Auth SLA" },
    { value: "Full-Stack", label: "Tech Stack" }
  ],
  quickCtas: [
    { label: "View Projects", slideIndex: 2, primary: true },
    { label: "Calculate ROI", slideIndex: 3, primary: false },
    { label: "Contact Me", slideIndex: 6, primary: false }
  ]
}
