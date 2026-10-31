# Amar Shaw — Healthcare RCM to Full-Stack Pitch-Deck

An executive-level interactive presentation platform and portfolio built with **Vue 3 (Composition API)**, **TypeScript**, **Vite**, and **Tailwind CSS**. Engineered specifically to demonstrate how 5+ years of deep US Healthcare Revenue Cycle Management (RCM) domain expertise translates into high-impact full-stack software solutions.

---

## ⚡ Architecture & Features

- **Strict TypeScript Architecture**: 100% typed data contracts and global interfaces (`src/types/index.ts`) ensuring zero runtime errors.
- **Cinematic Sci-Fi Visual Layer**:
  - **Interactive Starfield Background**: HTML5 Canvas rendering dynamic cosmic dust particles with mouse-follow repulsion and live diagonal shooting star / meteor streaks.
  - **3D Glass Card Tilt Effect**: Interactive depth perspective reacting smoothly to cursor movements on the central glass container.
  - **Pulsing Glow Animations**: Custom Tailwind keyframe animations (`animate-pulse-glow`) providing a soft breathing neon aura around active UI components.
- **7 Dedicated Modular Slides**:
  - `src/slides/1-hero/`: Profile photo, core value proposition, and key domain performance metrics (99.4% Auth SLA).
  - `src/slides/2-career/`: 5+ years domain leadership track record (RCM Workshop, Value RCM, Sunknowledge, Fusion BPO) focusing on denial prevention and complex claims.
  - `src/slides/3-projects/`: Specialized Healthcare Software Suite:
    - **CrosswalkIQ** (Live on Vercel): Ultra-lightweight, zero-latency medical coding validation and anesthesia crosswalk engine built with Vue 3 and TypeScript, automating complex multi-level spinal anatomy and payer-specific MAC code overrides.
    - **AR Caller Pro** (Currently in Development): High-performance web workspace designed to bridge complex US Healthcare RCM operational business rules with modern frontend engineering patterns, optimizing IVR workflows and CARC/RARC tracking.
    - **Prior Auth Initiation & Approval Engine**: React/JS full-stack web application resolving operational bottlenecks, eliminating manual re-typing errors, and mitigating Timely Filing Limit (TFL) penalties.
    - **Remit-X-Matrix Engine**: Enterprise client-side EDI 835 Electronic Remittance Advice sandbox decoder handling dynamic delimiter configurations across legacy 5010 and future 008060 claims data streams.
  - `src/slides/4-cost-roi/`: Interactive live ROI & startup capital efficiency simulator demonstrating a clear $96,000+ net savings advantage.
  - `src/slides/5-meta-certs/`: Professional validation framework rendering a custom-mapped, physics-based elastic path tracing the **Meta Full-Stack Developer Professional Certificate** with pulsing live-status node hooks.
  - `src/slides/6-tech-stack/`: 3-column competency matrix categorizing Frontend Core, Backend & Data Pipelines, and specialized US Healthcare Domain compliance criteria.
  - `src/slides/7-contact/`: Frictionless direct communication hub integrating a direct native **WhatsApp API chat protocol link** alongside a premium, custom **Orbiting Sci-Fi Glow Resume Download Button**.
- **100% Viewport Lock (`100dvh`)**: App-like pitch-deck feel optimized to prevent layout overflows and scroll layout fragmentation.
- **Dual Navigation**: Keyboard arrow controls (`←` / `→`) / Page Up/Down on desktop screens paired with responsive touch swipe gesture detection on mobile layouts.

---

## 🚀 Quick Start Guide

```bash
# Clone the repository
git clone [https://github.com/amarshaw87/amar-rcm-to-fullstack.git](https://github.com/amarshaw87/amar-rcm-to-fullstack.git)

# Navigate into directory
cd amar-rcm-to-fullstack

# Install dependencies
npm install

# Run local development server
npm run dev

# Build for production with strict type-checking
npm run build
