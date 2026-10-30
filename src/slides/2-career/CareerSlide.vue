<template>
  <div class="h-full flex flex-col justify-between">
    <!-- Header -->
    <div class="mb-2">
      <div class="text-[11px] font-mono uppercase tracking-wider text-sky-400">Track Record</div>
      <h2 class="text-xl md:text-2xl font-bold text-white">{{ careerData.title }}</h2>
      <p class="text-xs text-slate-300">{{ careerData.subtitle }}</p>
    </div>

    <!-- Timeline Scroll Container -->
    <div class="custom-scroll overflow-y-auto max-h-[380px] md:max-h-[420px] pr-2 space-y-3">
      <div
        v-for="(item, idx) in careerData.roles"
        :key="idx"
        class="relative pl-7 group"
      >
        <!-- Timeline Line & Neon Dot -->
        <div class="absolute left-1.5 top-2.5 w-3 h-3 rounded-full bg-slate-900 border-2 border-sky-400 group-hover:bg-sky-400 group-hover:shadow-md group-hover:shadow-sky-400/50 transition-all duration-200"></div>
        <div v-if="idx !== careerData.roles.length - 1" class="absolute left-[11px] top-5 bottom-[-16px] w-[2px] bg-sky-500/20"></div>

        <!-- Role Card -->
        <div class="p-3.5 rounded-xl bg-slate-900/60 border border-white/10 hover:border-sky-500/40 transition-all duration-200">
          <div class="flex flex-wrap items-center justify-between gap-1.5 mb-1">
            <span class="text-sm md:text-base font-bold text-white">{{ item.role }}</span>
            <span class="text-[10px] md:text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-sky-950/80 text-sky-300 border border-sky-800/50">
              {{ item.period }}
            </span>
          </div>

          <!-- Company Name with Integrated Logo -->
          <div class="flex items-center gap-2 text-xs text-sky-400 font-medium mb-1.5">
            <img 
              v-if="item.logo"
              :src="item.logo" 
              :alt="`${item.company} logo`" 
              class="w-4 h-4 object-contain rounded-sm"
            />
            <span>{{ item.company }} &bull; {{ item.location }}</span>
          </div>

          <p class="text-xs text-slate-300 mb-2.5 leading-relaxed">
            {{ item.focus }}
          </p>

          <!-- Skills Badges -->
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="(skill, sIdx) in item.skills"
              :key="sIdx"
              class="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-slate-300 font-mono"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { careerData } from './careerData'
</script>
