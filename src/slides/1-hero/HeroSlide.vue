<template>
  <div class="h-full flex flex-col justify-center">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-7 items-center">
      
      <!-- Rounded-Square Profile Photo & Badges -->
      <div class="md:col-span-5 flex flex-col items-center text-center">
        <div class="relative">
          <!-- Rounded-Square Frame -->
          <div class="w-32 h-32 md:w-44 md:h-44 rounded-2xl overflow-hidden border-2 border-sky-400 shadow-xl shadow-sky-500/30 bg-slate-900 flex items-center justify-center relative">
            <img 
              src="/profile.png" 
              alt="Amar Shaw" 
              class="w-full h-full object-cover"
              onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
            />
            <!-- Fallback Initials -->
            <div class="hidden absolute inset-0 items-center justify-center font-extrabold text-3xl md:text-5xl text-sky-400">
              AS
            </div>
          </div>

          <div class="absolute -bottom-2 inset-x-0 flex justify-center">
            <span class="bg-gradient-to-r from-sky-500 to-blue-600 text-white text-[10px] md:text-xs font-bold px-3 py-0.5 rounded-full shadow-md">
              Ready to Deploy
            </span>
          </div>
        </div>

        <div class="mt-4 flex flex-wrap gap-1.5 justify-center">
          <span class="px-2 py-0.5 rounded-md bg-sky-950/80 border border-sky-700/50 text-sky-300 text-[11px] font-medium font-mono">Meta Certified</span>
          <span class="px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-700/50 text-emerald-300 text-[11px] font-medium font-mono">5+ Yrs RCM</span>
          <span class="px-2 py-0.5 rounded-md bg-blue-950/80 border border-blue-700/50 text-blue-300 text-[11px] font-medium font-mono">TypeScript</span>
        </div>
      </div>

      <!-- Intro & Metric Blocks -->
      <div class="md:col-span-7 flex flex-col space-y-3 text-left">
        <div>
          <div class="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-sky-400 mb-1">
            <span class="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
            Executive Portfolio &amp; Pitch-Deck
          </div>
          <h1 class="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
            {{ heroData.name }}
          </h1>
          <p class="text-xs md:text-sm font-semibold text-slate-300 mt-0.5">
            {{ heroData.headline }}
          </p>
        </div>

        <p class="text-xs md:text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-2.5 rounded-xl border border-white/5">
          {{ heroData.tagline }}
        </p>

        <!-- 3 Metrics -->
        <div class="grid grid-cols-3 gap-2 pt-1">
          <div v-for="(stat, idx) in heroData.stats" :key="idx" class="p-2 rounded-xl bg-white/5 border border-white/10 text-center">
            <div class="text-sm md:text-base font-bold text-sky-400">{{ stat.value }}</div>
            <div class="text-[10px] text-slate-400 font-medium">{{ stat.label }}</div>
          </div>
        </div>

        <!-- Quick CTAs -->
        <div class="flex flex-wrap gap-2 pt-1.5">
          <button
            v-for="(cta, idx) in heroData.quickCtas"
            :key="idx"
            @click="emit('navigate', cta.slideIndex)"
            :class="[
              'px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer',
              cta.primary 
                ? 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-md shadow-sky-500/25'
                : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10'
            ]"
          >
            {{ cta.label }} &rarr;
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { heroData } from './heroData'

const emit = defineEmits<{
  (e: 'navigate', index: number): void
}>()
</script>
