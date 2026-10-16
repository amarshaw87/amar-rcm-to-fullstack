<template>
  <div class="h-full flex flex-col justify-between">
    <!-- Header -->
    <div class="mb-2">
      <div class="text-[11px] font-mono uppercase tracking-wider text-emerald-400">Financial Value</div>
      <h2 class="text-xl md:text-2xl font-bold text-white">{{ costRoiData.title }}</h2>
      <p class="text-xs text-slate-300">{{ costRoiData.subtitle }}</p>
    </div>

    <!-- Interactive Calculator Card -->
    <div class="p-3.5 rounded-xl bg-slate-900/80 border border-emerald-500/30 mb-2.5 shadow-lg">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
        <span class="text-xs font-bold text-white uppercase tracking-wider font-mono">Live Savings Simulation</span>
        <span class="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
          Save {{ savingsPercent }}% Capital
        </span>
      </div>

      <!-- Controls -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2.5">
        <div>
          <div class="flex justify-between text-xs text-slate-300 mb-1">
            <span>Project Duration:</span>
            <span class="font-bold text-sky-400">{{ months }} Months</span>
          </div>
          <input
            type="range"
            min="3"
            max="24"
            v-model.number="months"
            class="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-400"
          />
        </div>
        <div>
          <div class="flex justify-between text-xs text-slate-300 mb-1">
            <span>Engineering Roles:</span>
            <span class="font-bold text-sky-400">{{ teamSize }} Engineer(s)</span>
          </div>
          <input
            type="range"
            min="1"
            max="4"
            v-model.number="teamSize"
            class="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-400"
          />
        </div>
      </div>

      <!-- Totals Comparison -->
      <div class="grid grid-cols-3 gap-2 text-center pt-2 border-t border-white/10">
        <div class="p-2 rounded-lg bg-red-950/40 border border-red-800/30">
          <div class="text-[10px] text-slate-400 uppercase font-mono">US Domestic</div>
          <div class="text-xs md:text-base font-bold text-red-300">${{ usCostFormatted }}</div>
        </div>
        <div class="p-2 rounded-lg bg-sky-950/40 border border-sky-800/30">
          <div class="text-[10px] text-slate-400 uppercase font-mono">Remote Model</div>
          <div class="text-xs md:text-base font-bold text-sky-300">${{ amarCostFormatted }}</div>
        </div>
        <div class="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/50">
          <div class="text-[10px] text-emerald-300 uppercase font-semibold font-mono">Net Savings</div>
          <div class="text-xs md:text-base font-extrabold text-emerald-400">${{ savingsFormatted }}</div>
        </div>
      </div>
    </div>

    <!-- Strategic Benefits Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
      <div
        v-for="(adv, idx) in costRoiData.advantages"
        :key="idx"
        class="p-2.5 rounded-lg bg-white/5 border border-white/5"
      >
        <div class="text-xs font-bold text-sky-400 mb-1">{{ adv.title }}</div>
        <div class="text-[11px] text-slate-300 leading-tight">{{ adv.text }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { costRoiData } from './costRoiData'

const months = ref<number>(12)
const teamSize = ref<number>(1)

const usCost = computed<number>(() => months.value * 10000 * teamSize.value)
const amarCost = computed<number>(() => months.value * 2000 * teamSize.value)
const savings = computed<number>(() => usCost.value - amarCost.value)
const savingsPercent = computed<number>(() => Math.round((savings.value / usCost.value) * 100))

const usCostFormatted = computed<string>(() => usCost.value.toLocaleString())
const amarCostFormatted = computed<string>(() => amarCost.value.toLocaleString())
const savingsFormatted = computed<string>(() => savings.value.toLocaleString())
</script>
