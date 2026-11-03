<template>
  <div class="h-full flex flex-col justify-between">
    <!-- Header -->
    <div class="mb-2">
      <div class="text-[11px] font-mono uppercase tracking-wider text-sky-400">Engineering Work</div>
      <h2 class="text-xl md:text-2xl font-bold text-white">{{ projectsData.title }}</h2>
      <p class="text-xs text-slate-300">{{ projectsData.subtitle }}</p>
    </div>

    <!-- Project Tabs -->
    <div class="flex gap-2 mb-3 overflow-x-auto pb-1 custom-scroll">
      <button
        v-for="(proj, idx) in projectsData.projects"
        :key="proj.id"
        @click="activeIdx = idx"
        :class="[
          'px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer',
          activeIdx === idx 
            ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/50' 
            : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
        ]"
      >
        {{ 
          proj.id === 'prior-auth-engine' ? 'Prior Auth' : 
          proj.id === 'ar-caller-pro' ? 'AR Caller' : 
          proj.id === 'remit-x-matrix' ? 'Remit-X-Matrix' : 
          'CrosswalkIQ' 
        }}
      </button>
    </div>

    <!-- Active Project Details Card -->
    <div class="p-4 rounded-xl bg-slate-900/70 border border-white/10 flex-1 flex flex-col justify-between relative overflow-hidden">
      <div>
        <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
          <h3 class="text-base md:text-lg font-bold text-white flex items-center gap-2">
            {{ currentProject.name }}
            <!-- Real-World Enterprise Production Badge with Pulsing Ring Layer for CrosswalkIQ Only -->
            <span 
              v-if="currentProject.id === 'crosswalk-iq'" 
              class="inline-flex items-center gap-1.5 text-[9px] font-mono font-bold tracking-wide px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase animate-fade-in"
            >
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Live Use @ RCM Workshop (30+ Members)
            </span>
          </h3>
          <div class="flex items-center gap-1.5">
            <!-- Dynamic Active Development Status Flag Badge -->
            <span 
              v-if="currentProject.id === 'ar-caller-pro'" 
              class="inline-flex items-center gap-1 text-[9px] font-mono tracking-wide px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold uppercase"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              Development In Progress
            </span>
            <span class="text-[10px] md:text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-sky-950 text-sky-300 border border-sky-800">
              {{ currentProject.badge }}
            </span>
          </div>
        </div>
        
        <div class="text-xs font-mono text-sky-400 mb-2">{{ currentProject.tech }}</div>
        
        <p class="text-xs md:text-sm text-slate-300 mb-2.5 leading-relaxed">
          {{ currentProject.summary }}
        </p>

        <!-- Key Features List -->
        <div class="space-y-1.5 mb-2">
          <!-- Injected Production Validation Bullet Point into the top layer of CrosswalkIQ -->
          <div v-if="currentProject.id === 'crosswalk-iq'" class="flex items-start text-xs text-slate-200 font-medium">
            <span class="text-emerald-400 mr-2 font-bold">&check;</span>
            <span>Successfully deployed in core operations, actively accelerating real-time verification benchmarks for 30+ enterprise team users.</span>
          </div>

          <div
            v-for="(feat, fIdx) in currentProject.features"
            :key="fIdx"
            class="flex items-start text-xs text-slate-300"
          >
            <span class="text-sky-400 mr-2 font-bold">&check;</span>
            <span>{{ feat }}</span>
          </div>
        </div>
      </div>

      <!-- Footer Metrics & GitHub Link -->
      <div class="pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
        <div class="flex gap-4">
          <div v-for="(metric, mIdx) in currentProject.metrics" :key="mIdx">
            <span class="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">{{ metric.label }}</span>
            <span class="text-xs md:text-sm font-bold text-emerald-400">{{ metric.value }}</span>
          </div>
          <!-- Extended Live Infrastructure Environment Metadata Field -->
          <div v-if="currentProject.id === 'crosswalk-iq'">
            <span class="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">Environment</span>
            <span class="text-xs md:text-sm font-bold text-sky-400">Enterprise Live</span>
          </div>
        </div>
        
        <a
          :href="currentProject.repo"
          target="_blank"
          rel="noopener noreferrer"
          class="text-xs font-semibold px-3 py-1.5 rounded-lg bg-sky-900/60 hover:bg-sky-800 text-sky-200 border border-sky-700/50 flex items-center gap-1.5 transition-colors"
        >
          <span>GitHub Code</span> &rarr;
        </a>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { projectsData } from './projectsData'
import type { ProjectItem } from '../../types'

const activeIdx = ref<number>(0)
const currentProject = computed<ProjectItem>(() => projectsData.projects[activeIdx.value])
</script>
<style scoped>
.custom-scroll::-webkit-scrollbar {
  height: 4px;
}
.custom-scroll::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.02);
}
.custom-scroll::-webkit-scrollbar-thumb {
  background: rgba(56, 189, 248, 0.2);
  border-radius: 2px;
}

@keyframes fadeInEffect {
  from { opacity: 0; transform: translateY(2px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeInEffect 0.4s ease-out forwards;
}
</style>
