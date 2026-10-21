<template>
  <div class="app-viewport relative w-screen h-screen overflow-hidden select-none bg-slate-950 font-sans">
    
    <!-- RESPONSIVE BACKGROUND SWITCHER -->
    <!-- Desktop (16:9 Landscape) -->
    <div 
      class="hidden md:block absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
      style="background-image: url('/backgrounds/bg-desktop.png');"
    ></div>

    <!-- Mobile (9:16 Portrait) -->
    <div 
      class="block md:hidden absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
      style="background-image: url('/backgrounds/bg-mobile.png');"
    ></div>

    <!-- TOP HEADER -->
    <header class="absolute top-0 inset-x-0 z-20 h-14 md:h-16 px-4 md:px-8 flex items-center justify-between backdrop-blur-md bg-slate-950/40 border-b border-white/5">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center font-bold text-white text-xs shadow-md shadow-sky-500/30">
          AS
        </div>
        <div>
          <span class="text-xs md:text-sm font-bold text-white tracking-wide block">Amar Shaw</span>
          <span class="text-[10px] text-sky-400 font-mono hidden sm:block">Healthcare RCM &bull; Full-Stack</span>
        </div>
      </div>

      <!-- Quick Slide Tabs -->
      <nav class="hidden lg:flex items-center gap-1">
        <button
          v-for="(slide, idx) in slides"
          :key="slide.name"
          @click="goToSlide(idx)"
          :class="[
            'px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer',
            currentSlide === idx 
              ? 'bg-sky-500/20 text-sky-300 border border-sky-400/40 shadow-sm' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          ]"
        >
          {{ slide.tabLabel }}
        </button>
      </nav>

      <!-- Slide Counter -->
      <div class="flex items-center gap-1.5 font-mono text-xs font-semibold">
        <span class="text-sky-400">0{{ currentSlide + 1 }}</span>
        <span class="text-slate-600">/</span>
        <span class="text-slate-400">0{{ slides.length }}</span>
      </div>
    </header>

    <!-- CENTER GLASS STAGE -->
    <main
      class="relative z-10 w-full h-full flex items-center justify-center px-4 md:px-8 pt-16 pb-20 md:pb-16"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
    >
      <div class="w-full max-w-4xl max-h-[82vh] md:max-h-[76vh] rounded-2xl md:rounded-3xl p-5 md:p-8 backdrop-blur-xl bg-slate-900/75 border border-white/15 shadow-2xl shadow-black/80 flex flex-col justify-between overflow-hidden relative">
        <transition :name="transitionName" mode="out-in">
          <component
            :is="slides[currentSlide].component"
            :key="currentSlide"
            @navigate="goToSlide"
          />
        </transition>
      </div>
    </main>

    <!-- BOTTOM CONTROLLER BAR -->
    <footer class="absolute bottom-0 inset-x-0 z-20 h-16 px-4 md:px-8 flex items-center justify-between backdrop-blur-md bg-slate-950/40 border-t border-white/5">
      <!-- Prev Button -->
      <button
        @click="prevSlide"
        :disabled="currentSlide === 0"
        :class="[
          'px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer',
          currentSlide === 0 ? 'opacity-30 cursor-not-allowed text-slate-500' : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
        ]"
      >
        &larr; <span class="hidden sm:inline">Prev</span>
      </button>

      <!-- Center Dots -->
      <div class="flex items-center gap-2">
        <button
          v-for="(_, idx) in slides"
          :key="idx"
          @click="goToSlide(idx)"
          class="p-1 cursor-pointer"
          :aria-label="'Slide ' + (idx + 1)"
        >
          <div
            :class="[
              'rounded-full transition-all duration-300',
              currentSlide === idx ? 'w-6 h-2 bg-sky-400 shadow-sm shadow-sky-400/80' : 'w-2 h-2 bg-slate-600'
            ]"
          ></div>
        </button>
      </div>

      <!-- Next Button -->
      <button
        @click="nextSlide"
        :disabled="currentSlide === slides.length - 1"
        :class="[
          'px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer',
          currentSlide === slides.length - 1 ? 'opacity-30 cursor-not-allowed text-slate-500' : 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-md shadow-sky-500/25'
        ]"
      >
        <span class="hidden sm:inline">Next</span> &rarr;
      </button>
    </footer>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { SlideConfig } from './types'

// Import Modular Slides (Total 7 Sections)
import HeroSlide from './slides/1-hero/HeroSlide.vue'
import CareerSlide from './slides/2-career/CareerSlide.vue'
import ProjectsSlide from './slides/3-projects/ProjectsSlide.vue'
import CostRoiSlide from './slides/4-cost-roi/CostRoiSlide.vue'
import MetaCertificatesSlide from './slides/5-meta-certificates/MetaCertificates.vue'
import TechStackSlide from './slides/6-tech-stack/TechStackSlide.vue'
import ContactSlide from './slides/7-contact/ContactSlide.vue'

const slides: SlideConfig[] = [
  { name: 'hero', tabLabel: '1. Hero', component: HeroSlide },
  { name: 'career', tabLabel: '2. Career', component: CareerSlide },
  { name: 'projects', tabLabel: '3. Projects', component: ProjectsSlide },
  { name: 'cost-roi', tabLabel: '4. Cost & ROI', component: CostRoiSlide },
  { name: 'meta-certificates', tabLabel: '5. Meta Certs', component: MetaCertificatesSlide },
  { name: 'tech-stack', tabLabel: '6. Tech Stack', component: TechStackSlide },
  { name: 'contact', tabLabel: '7. Contact', component: ContactSlide }
]

const currentSlide = ref<number>(0)
const transitionName = ref<string>('slide-next')

function goToSlide(index: number): void {
  if (index >= 0 && index < slides.length) {
    transitionName.value = index > currentSlide.value ? 'slide-next' : 'slide-prev'
    currentSlide.value = index
  }
}

function nextSlide(): void {
  if (currentSlide.value < slides.length - 1) {
    goToSlide(currentSlide.value + 1)
  }
}

function prevSlide(): void {
  if (currentSlide.value > 0) {
    goToSlide(currentSlide.value - 1)
  }
}

// Typed Keyboard Navigation
function handleKeydown(e: KeyboardEvent): void {
  if (e.key === 'ArrowRight' || e.key === 'PageDown') nextSlide()
  else if (e.key === 'ArrowLeft' || e.key === 'PageUp') prevSlide()
  else if (e.key === 'Home') goToSlide(0)
  else if (e.key === 'End') goToSlide(slides.length - 1)
}

// Typed Mobile Touch Swipe
let touchStartX: number = 0
let touchStartY: number = 0

function handleTouchStart(e: TouchEvent): void {
  touchStartX = e.changedTouches[0].screenX
  touchStartY = e.changedTouches[0].screenY
}

function handleTouchEnd(e: TouchEvent): void {
  const diffX = e.changedTouches[0].screenX - touchStartX
  const diffY = e.changedTouches[0].screenY - touchStartY
  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
    if (diffX < 0) nextSlide()
    else prevSlide()
  }
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<style scoped>
.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-next-enter-from { opacity: 0; transform: translateX(30px) scale(0.98); }
.slide-next-leave-to { opacity: 0; transform: translateX(-30px) scale(0.98); }
.slide-prev-enter-from { opacity: 0; transform: translateX(-30px) scale(0.98); }
.slide-prev-leave-to { opacity: 0; transform: translateX(30px) scale(0.98); }
</style>
