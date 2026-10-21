<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import type { CertificateNode } from '../../types';

// 1. Future Proof Data Array: Yahan aap future me naye completed courses easily append kar sakte hain
const certificates = ref<CertificateNode[]>([
  {
    id: 1,
    title: 'Introduction to Front-End Development',
    duration: '19 hours',
    credentialId: '2N92TVJMQQHU',
    link: 'https://www.coursera.org/account/accomplishments/verify/2N92TVJMQQHU'
  },
  {
    id: 2,
    title: 'Programming with JavaScript',
    duration: '48 hours',
    credentialId: '40EXC4ZYGHDU',
    link: 'https://www.coursera.org/account/accomplishments/verify/40EXC4ZYGHDU'
  },
  {
    id: 3,
    title: 'Version Control',
    duration: '16 hours',
    credentialId: 'Q0XAECF646GI',
    link: 'https://www.coursera.org/account/accomplishments/verify/Q0XAECF646GI'
  },
  {
    id: 4,
    title: 'HTML and CSS in depth',
    duration: '29 hours',
    credentialId: '92TGQYIPQQYI',
    link: 'https://www.coursera.org/account/accomplishments/verify/92TGQYIPQQYI'
  },
  {
    id: 5,
    title: 'React Basics',
    duration: '30 hours',
    credentialId: 'NG8GIR33A8I5',
    link: 'https://www.coursera.org/account/accomplishments/verify/NG8GIR33A8I5'
  },
  {
    id: 6,
    title: 'Advanced React',
    duration: '26 hours',
    credentialId: 'BFSJ2MSS47R9',
    link: 'https://www.coursera.org/account/accomplishments/verify/BFSJ2MSS47R9'
  }
]);

// 2. Drag and Scroll Logic References
const sliderContainer = ref<HTMLElement | null>(null);
const isDragging = ref(false);
const startX = ref(0);
const scrollLeft = ref(0);

// Drag Handler Functions
const startDrag = (e: MouseEvent | TouchEvent) => {
  if (!sliderContainer.value) return;
  isDragging.value = true;
  
  const pageX = e instanceof MouseEvent ? e.pageX : e.touches.pageX;
  startX.value = pageX - sliderContainer.value.offsetLeft;
  scrollLeft.value = sliderContainer.value.scrollLeft;
};

const onDragging = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value || !sliderContainer.value) return;
  e.preventDefault();
  
  const pageX = e instanceof MouseEvent ? e.pageX : e.touches.pageX;
  const x = pageX - sliderContainer.value.offsetLeft;
  const walk = (x - startX.value) * 1.5; // Drag speed multiplier
  sliderContainer.value.scrollLeft = scrollLeft.value - walk;
};

const stopDrag = () => {
  isDragging.value = false;
};

// 3. Reset Button Action: Click karte hi container smoothly wapas X: 0 par aa jayega
const resetView = () => {
  if (sliderContainer.value) {
    sliderContainer.value.scrollTo({
      left: 0,
      behavior: 'smooth'
    });
  }
};

onUnmounted(() => {
  stopDrag();
});
</script>

<template>
  <!-- Full Viewport Lock Dashboard Component Container -->
  <section class="relative w-full h-full flex flex-col justify-between items-center bg-[#060b13] text-white overflow-hidden p-4 select-none">
    
    <!-- Top Decorative Header Section -->
    <div class="text-center mt-2">
      <span class="text-[10px] font-semibold tracking-widest text-[#38bdf8] uppercase">Professional Validation</span>
      <h2 class="text-xl md:text-2xl font-bold mt-0.5 text-white tracking-tight drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]">
        Meta Front-End Engineering Pathway
      </h2>
      <p class="text-[11px] text-slate-400 mt-0.5 max-w-md mx-auto">
        Line-by-line sequential milestone tracking. Drag left or right to explore nodes.
      </p>
    </div>

    <!-- Draggable Flowchart Canvas Area Wrapper -->
    <div 
      ref="sliderContainer"
      @mousedown="startDrag"
      @mousemove="onDragging"
      @mouseup="stopDrag"
      @mouseleave="stopDrag"
      @touchstart="startDrag"
      @touchmove="onDragging"
      @touchend="stopDrag"
      :class="[isDragging ? 'cursor-grabbing' : 'cursor-grab']"
      class="w-full overflow-x-auto overflow-y-hidden flex items-center relative py-6 px-4 scrollbar-hide snap-x"
    >
      
      <!-- Continuous Flowchart Neon Background Connecting Line -->
      <div class="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500/20 via-blue-500 to-indigo-500/20 z-0 top-[35%]"></div>

      <!-- Node Track Rendering Node Grid Mapping Loop -->
      <div class="flex items-start space-x-12 md:space-x-16 relative z-10 mx-auto px-8">
        <div 
          v-for="(node, index) in certificates" 
          :key="node.id" 
          class="flex flex-col items-center w-36 md:w-44 text-center shrink-0 snap-center group"
        >
          
          <!-- Interactive Functional Square Meta Branding Node Container Button -->
          <button 
            @click="window.open(node.link, '_blank')"
            title="Click to view full verifiable certificate token credentials"
            class="w-14 h-14 md:w-16 md:h-16 bg-slate-900 border border-slate-700 rounded-xl flex items-center justify-center relative shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:border-[#38bdf8] group-hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all duration-300 transform group-hover:-translate-y-1"
          >
            <!-- Badge Order Sequential Node Label Overlay Indicator -->
            <div class="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#38bdf8] text-[#060b13] text-[9px] font-black rounded-full flex items-center justify-center shadow-md">
              0{{ index + 1 }}
            </div>

            <!-- Meta Infographic Minimalist Branding SVG Asset Logo Icon Vector Element -->
            <svg class="w-8 h-8 md:w-10 md:h-10 text-[#38bdf8] group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.48 7.42c-1.07 0-2.07.47-2.82 1.3-.61-.71-1.46-1.16-2.42-1.25-1.12-.11-2.23.27-3.07 1.03-1.07.97-1.67 2.37-1.67 3.89s.6 2.92 1.67 3.89c.84.76 1.95 1.14 3.07 1.03.96-.09 1.81-.54 2.42-1.25.75.83 1.75 1.3 2.82 1.3 2.21 0 4.02-1.9 4.02-4.24s-1.81-4.24-4.02-4.24zm-6.22 7.02c-.59.05-1.17-.15-1.62-.56-.58-.53-.91-1.3-.91-2.12s.33-1.59.91-2.12c.45-.41 1.03-.61 1.62-.56.59.05 1.12.33 1.46.79.13.18.23.38.29.6.09.32.11.66.07.99-.04.33-.14.65-.3.94-.34.46-.87.74-1.46.79zm6.22.36c-1.22 0-2.22-1.05-2.22-2.34s1-2.34 2.22-2.34 2.22 1.05 2.22 2.34-1 2.34-2.22 2.34z"/>
            </svg>
          </button>

          <!-- Text Information Box Structure Node Title Layout Descriptor Alignment Block -->
          <div class="mt-3 flex flex-col items-center w-full">
            <h4 class="text-[11px] md:text-xs font-semibold tracking-wide text-slate-100 group-hover:text-[#38bdf8] line-clamp-2 min-h-[2rem] transition-colors duration-200 px-1">
              {{ node.title }}
            </h4>
            <span class="text-[9px] text-slate-500 font-mono tracking-wider mt-0.5 block uppercase">
              ⏱️ {{ node.duration }}
            </span>
            <span class="text-[8px] text-slate-600 font-mono tracking-tight mt-0.5 block truncate max-w-[100px]">
              ID: {{ node.credentialId }}
            </span>
          </div>

        </div>
      </div>

    </div>

    <!-- Bottom UX Interface Controller Panel Alignment Footer Block -->
    <div class="mb-2 flex flex-col items-center space-y-1.5">
      <button 
        @click="resetView"
        class="px-4 py-1.5 text-[10px] font-semibold tracking-widest text-[#38bdf8] border border-[#38bdf8]/30 rounded-full bg-[#38bdf8]/5 hover:bg-[#38bdf8] hover:text-[#060b13] hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all duration-300 uppercase transform active:scale-95 cursor-pointer"
      >
        🎯 Reset Viewport Path
      </button>
      <span class="text-[9px] text-slate-500 font-mono">
        ← Swipe / Hold to drag canvas left or right →
      </span>
    </div>

  </section>
</template>

<style scoped>
/* Hide standard horizontal scrollbar indicators */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
