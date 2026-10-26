<template>
  <div class="h-full flex flex-col justify-between">
    <!-- Header Container with Top-Right Button Alignment -->
    <div class="mb-2 flex items-start justify-between gap-4">
      <div>
        <div class="text-[11px] font-mono uppercase tracking-wider text-sky-400">Direct Connect</div>
        <h2 class="text-xl md:text-2xl font-bold text-white">{{ contactData.title }}</h2>
        <p class="text-xs text-slate-300">{{ contactData.subtitle }}</p>
      </div>

      <!-- Sci-Fi Orbiting Glow Resume Download Button -->
      <a
        href="/Amar_Shaw_Resume.pdf"
        download="Amar_Shaw_Resume.pdf"
        class="relative inline-flex items-center justify-center px-4 py-2 text-[11px] font-bold font-mono tracking-wider text-sky-400 uppercase rounded-full bg-slate-950/90 hover:text-white transition-colors duration-300 group/btn border border-sky-500/30 shrink-0 mt-1"
      >
        <!-- Orbiting Radial Glow Ring (Placed behind/around the button edges) -->
        <span class="absolute -inset-[2px] rounded-full overflow-hidden pointer-events-none z-0">
          <!-- The Orbiting Planet Beam (Wider aspect to guarantee clear edge sweeping) -->
          <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[50%] bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-90 blur-[3px] animate-[orbit_3s_linear_infinite] group-hover/btn:animate-[orbit_1.2s_linear_infinite]"></span>
        </span>

        <!-- Inner Structural Mask to maintain dark text backing contrast -->
        <span class="absolute inset-[1px] bg-slate-950 rounded-full group-hover/btn:bg-slate-900/90 transition-colors z-10"></span>
        
        <!-- Button Interactive Text Label -->
        <span class="relative z-20 flex items-center gap-1.5">
          Resume
          <span class="text-[9px] opacity-70 font-sans font-normal">↓</span>
        </span>
      </a>
    </div>

    <!-- Contact Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
      <a
        v-for="(c, idx) in contactData.contacts"
        :key="idx"
        :href="c.href"
        :target="c.href.startsWith('http') || c.href.startsWith('https') ? '_blank' : '_self'"
        rel="noopener noreferrer"
        class="p-3.5 rounded-xl bg-slate-900/60 border border-white/10 hover:border-sky-500/50 hover:bg-sky-500/10 transition-all duration-200 flex items-center justify-between group"
      >
        <div>
          <div class="text-[10px] text-slate-400 font-semibold uppercase font-mono">{{ c.type }}</div>
          <div class="text-xs md:text-sm font-bold text-white group-hover:text-sky-300 transition-colors break-all">
            {{ c.value }}
          </div>
        </div>
        <span class="text-sky-400 text-sm font-bold ml-2 transition-transform group-hover:translate-x-1">&nearr;</span>
      </a>
    </div>

    <!-- Availability & Location Strip -->
    <div class="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
      <div class="flex items-center justify-between text-xs">
        <span class="text-slate-400">Location:</span>
        <span class="text-white font-semibold">{{ contactData.location }}</span>
      </div>
      <div class="flex items-center justify-between text-xs">
        <span class="text-slate-400">Availability:</span>
        <span class="text-emerald-400 font-semibold">{{ contactData.availability }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { contactData } from './contactData'
</script>

<style scoped>
/* Keyframe definition for the orbiting edge illumination effect */
@keyframes orbit {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
