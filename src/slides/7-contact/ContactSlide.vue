<template>
  <div class="h-full flex flex-col justify-between">
    <!-- Header -->
    <div class="mb-2">
      <div class="text-[11px] font-mono uppercase tracking-wider text-sky-400">Direct Connect</div>
      <h2 class="text-xl md:text-2xl font-bold text-white">{{ contactData.title }}</h2>
      <p class="text-xs text-slate-300">{{ contactData.subtitle }}</p>
    </div>

    <!-- Contact Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
      <a
        v-for="(c, idx) in contactData.contacts"
        :key="idx"
        :href="c.href"
        :target="c.href.startsWith('http') ? '_blank' : '_self'"
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
