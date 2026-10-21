<template>
  <div class="h-full flex flex-col justify-between">
    <!-- Header -->
    <div class="mb-2">
      <div class="text-[11px] font-mono uppercase tracking-wider text-sky-400">Technical Arsenal</div>
      <h2 class="text-xl md:text-2xl font-bold text-white">{{ techStackData.title }}</h2>
      <p class="text-xs text-slate-300">{{ techStackData.subtitle }}</p>
    </div>

    <!-- 3 Category Columns -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-2.5 flex-1 overflow-y-auto custom-scroll pr-1">
      <div
        v-for="(cat, cIdx) in techStackData.categories"
        :key="cIdx"
        class="p-3 rounded-xl bg-slate-900/60 border border-white/10 flex flex-col"
      >
        <div class="flex items-center gap-2 mb-2.5 pb-1.5 border-b border-white/10">
          <span class="w-2.5 h-2.5 rounded-full" :class="getCategoryDot(cat.color)"></span>
          <h3 class="text-xs md:text-sm font-bold text-white">{{ cat.name }}</h3>
        </div>

        <div class="space-y-2 flex-1">
          <div
            v-for="(skill, sIdx) in cat.skills"
            :key="sIdx"
            class="p-2 rounded-lg bg-white/5 border border-white/5 hover:border-sky-500/30 transition-all"
          >
            <div class="flex items-center justify-between mb-0.5">
              <span class="text-xs font-bold text-slate-200">{{ skill.name }}</span>
              <span class="text-[9px] md:text-[10px] font-semibold px-1.5 py-0.2 rounded font-mono" :class="getLevelBadge(skill.level)">
                {{ skill.level }}
              </span>
            </div>
            <p class="text-[11px] text-slate-400 leading-tight">{{ skill.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { techStackData } from './techStackData'

function getCategoryDot(color: 'sky' | 'emerald' | 'indigo'): string {
  if (color === 'sky') return 'bg-sky-400'
  if (color === 'emerald') return 'bg-emerald-400'
  return 'bg-indigo-400'
}

function getLevelBadge(level: string): string {
  if (level === 'Expert' || level === 'Mastery') return 'bg-emerald-950 text-emerald-300 border border-emerald-800/60'
  if (level === 'Advanced') return 'bg-sky-950 text-sky-300 border border-sky-800/60'
  return 'bg-indigo-950 text-indigo-300 border border-indigo-800/60'
}
</script>
