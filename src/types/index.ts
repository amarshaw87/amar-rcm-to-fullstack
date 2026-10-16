// Slide Configuration for App.vue
export interface SlideConfig {
  name: string
  tabLabel: string
  component: any
}

// Slide 1: Hero Data Types
export interface HeroStat {
  label: string
  value: string
  detail: string
}

export interface QuickCta {
  label: string
  slideIndex: number
  primary: boolean
}

export interface HeroData {
  name: string
  headline: string
  tagline: string
  location: string
  stats: HeroStat[]
  quickCtas: QuickCta[]
}

// Slide 2: Career Data Types
export interface CareerRole {
  period: string
  role: string
  company: string
  location: string
  focus: string
  skills: string[]
}

export interface CareerData {
  title: string
  subtitle: string
  roles: CareerRole[]
}

// Slide 3: Projects Data Types
export interface ProjectItem {
  id: string
  name: string
  tech: string
  repo: string
  badge: string
  summary: string
  features: string[]
  metrics: { label: string; value: string }[]
}

export interface ProjectsData {
  title: string
  subtitle: string
  projects: ProjectItem[]
}

// Slide 4: Cost & ROI Types
export interface CostAdvantage {
  title: string
  text: string
}

export interface CostRoiData {
  title: string
  subtitle: string
  advantages: CostAdvantage[]
}

// Slide 5: Tech Stack Types
export interface TechSkill {
  name: string
  level: 'Expert' | 'Mastery' | 'Advanced' | 'Proficient' | 'Intermediate'
  desc: string
}

export interface TechCategory {
  name: string
  color: 'sky' | 'emerald' | 'indigo'
  skills: TechSkill[]
}

export interface TechStackData {
  title: string
  subtitle: string
  categories: TechCategory[]
}

// Slide 6: Contact Types
export interface ContactMethod {
  type: string
  value: string
  href: string
  icon: string
}

export interface ContactData {
  title: string
  subtitle: string
  contacts: ContactMethod[]
  location: string
  availability: string
}
