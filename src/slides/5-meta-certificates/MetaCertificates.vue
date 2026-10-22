<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import { certificatesData } from './certificatesData';

// Stripped local reactive wrapper structure to match exact PhysicsCertificateNode definition
const certificates = ref(
  certificatesData.map(node => ({
    id: node.id,
    title: node.title,
    duration: node.duration,
    credentialId: node.credentialId,
    link: node.link,
    offsetX: node.offsetX || 0,
    offsetY: node.offsetY || 0
  }))
);

// Canvas Global Drag Parameters
const sliderContainer = ref<HTMLElement | null>(null);
const isCanvasDragging = ref(false);
const startCanvasX = ref(0);
const canvasScrollLeft = ref(0);

// Custom Horizontal Range Navigation Slider Parameter
const scrollProgress = ref(0);

// Node Specific Physics Drag Parameters
const activeNodeId = ref<number | null>(null);
const nodeStartX = ref(0);
const nodeStartY = ref(0);
const isNodeDragging = ref(false);
const isResetting = ref(false);

// --- DYNAMIC SLIDER TRACKING SYSTEM ---
const handleCanvasScrollSync = () => {
  if (!sliderContainer.value || isCanvasDragging.value) return;
  const { scrollLeft, scrollWidth, clientWidth } = sliderContainer.value;
  const maxScroll = scrollWidth - clientWidth;
  if (maxScroll > 0) {
    scrollProgress.value = (scrollLeft / maxScroll) * 100;
  }
};

const handleSliderInput = (e: Event) => {
  if (!sliderContainer.value) return;
  const target = e.target as HTMLInputElement;
  const val = parseFloat(target.value);
  scrollProgress.value = val;
  
  const maxScroll = sliderContainer.value.scrollWidth - sliderContainer.value.clientWidth;
  sliderContainer.value.scrollLeft = (val / 100) * maxScroll;
};

// --- CANVAS SCROLL DRAG SYSTEM ---
const startCanvasDrag = (e: MouseEvent | TouchEvent) => {
  if (isNodeDragging.value || !sliderContainer.value) return;
  isCanvasDragging.value = true;
  
  const pageX = e instanceof MouseEvent ? e.pageX : (e.touches && e.touches[0] ? e.touches[0].pageX : 0);
  startCanvasX.value = pageX - sliderContainer.value.offsetLeft;
  canvasScrollLeft.value = sliderContainer.value.scrollLeft;
};

const handleGlobalDragging = (e: MouseEvent | TouchEvent) => {
  if (isNodeDragging.value && activeNodeId.value !== null) {
    e.preventDefault();
    
    const currentX = e instanceof MouseEvent ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const currentY = e instanceof MouseEvent ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
    
    const deltaX = currentX - nodeStartX.value;
    const deltaY = currentY - nodeStartY.value;
    
    const activeIndex = certificates.value.findIndex(n => n.id === activeNodeId.value);
    
    if (activeIndex !== -1) {
      certificates.value[activeIndex].offsetX = deltaX;
      certificates.value[activeIndex].offsetY = deltaY;
      
      // PHYSICS PROPAGATION CHAIN LOGIC: Soft wave tension dropoff decay (0.45 factor)
      for (let i = activeIndex - 1; i >= 0; i--) {
        const distance = activeIndex - i;
        const dampFactor = Math.pow(0.45, distance); 
        certificates.value[i].offsetX = deltaX * dampFactor;
        certificates.value[i].offsetY = deltaY * dampFactor;
      }
      
      for (let i = activeIndex + 1; i < certificates.value.length; i++) {
        const distance = i - activeIndex;
        const dampFactor = Math.pow(0.45, distance); 
        certificates.value[i].offsetX = deltaX * dampFactor;
        certificates.value[i].offsetY = deltaY * dampFactor;
      }
    }
    return;
  }

  if (!isCanvasDragging.value || !sliderContainer.value) return;
  const pageX = e instanceof MouseEvent ? e.pageX : (e.touches && e.touches[0] ? e.touches[0].pageX : 0);
  const x = pageX - sliderContainer.value.offsetLeft;
  const walk = (x - startCanvasX.value) * 1.5;
  sliderContainer.value.scrollLeft = canvasScrollLeft.value - walk;
  
  const maxScroll = sliderContainer.value.scrollWidth - sliderContainer.value.clientWidth;
  if (maxScroll > 0) {
    scrollProgress.value = (sliderContainer.value.scrollLeft / maxScroll) * 100;
  }
};

const stopGlobalDrag = () => {
  isCanvasDragging.value = false;
  isNodeDragging.value = false;
  activeNodeId.value = null;
};

const startNodeDrag = (e: MouseEvent | TouchEvent, nodeId: number) => {
  e.stopPropagation();
  isNodeDragging.value = true;
  activeNodeId.value = nodeId;
  isResetting.value = false;
  
  const clientX = e instanceof MouseEvent ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
  const clientY = e instanceof MouseEvent ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
  
  const targetNode = certificates.value.find(n => n.id === nodeId);
  if (targetNode) {
    nodeStartX.value = clientX - targetNode.offsetX;
    nodeStartY.value = clientY - targetNode.offsetY;
  }
};

const openCertificate = (url: string) => {
  if (isCanvasDragging.value || isNodeDragging.value) return; 
  window.open(url, '_blank', 'noopener,noreferrer');
};

const resetView = () => {
  isResetting.value = true;
  certificates.value.forEach(node => {
    node.offsetX = 0;
    node.offsetY = 0;
  });

  scrollProgress.value = 0;
  if (sliderContainer.value) {
    sliderContainer.value.scrollTo({
      left: 0,
      behavior: 'smooth'
    });
  }

  setTimeout(() => {
    isResetting.value = false;
  }, 600);
};

onUnmounted(() => {
  stopGlobalDrag();
});
</script>
<template>
  <section class="relative w-full h-full flex flex-col justify-between items-center bg-gradient-to-b from-[#0a111e] to-[#0c192c] border border-slate-800/40 rounded-2xl text-white overflow-hidden p-4 select-none shadow-2xl backdrop-blur-md">
    
    <!-- Top Decorative Header Section -->
    <div class="text-center mt-2">
      <span class="text-[10px] font-semibold tracking-widest text-[#38bdf8] uppercase">Professional Validation</span>
      <h2 class="text-xl md:text-2xl font-bold mt-0.5 text-white tracking-tight drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]">
        Meta Front-End Engineering Pathway
      </h2>
      <p class="text-[11px] text-slate-400 mt-0.5 max-w-md mx-auto">
        Hold & drag square icons to stretch the dynamic elastic path. Click course text links to verify tokens.
      </p>
    </div>

    <!-- Draggable Flowchart Canvas Area Wrapper -->
    <div 
      ref="sliderContainer"
      @scroll="handleCanvasScrollSync"
      @mousedown="startCanvasDrag"
      @mousemove="handleGlobalDragging"
      @mouseup="stopGlobalDrag"
      @mouseleave="stopGlobalDrag"
      @touchstart="startCanvasDrag"
      @touchmove="handleGlobalDragging"
      @touchend="stopGlobalDrag"
      :class="[isCanvasDragging ? 'cursor-grabbing' : 'cursor-grab']"
      class="w-full overflow-x-auto overflow-y-hidden flex items-center relative py-16 px-4 scrollbar-hide snap-x"
    >
      
      <!-- DYNAMIC SVG ROPE GENERATOR LAYER -->
      <svg class="absolute left-0 top-0 h-full w-[1800px] pointer-events-none z-0" xmlns="http://w3.org">
        <path 
          :d="`
            M 10,120 
            Q 80,${120 + (certificates[0] ? certificates[0].offsetY : 0)} 160,${120 + (certificates[0] ? certificates[0].offsetY : 0)} 
            C 240,${120 + (certificates[0] ? certificates[0].offsetY : 0)} 240,${120 + (certificates[1] ? certificates[1].offsetY : 0)} 320,${120 + (certificates[1] ? certificates[1].offsetY : 0)}
            C 400,${120 + (certificates[1] ? certificates[1].offsetY : 0)} 400,${120 + (certificates[2] ? certificates[2].offsetY : 0)} 480,${120 + (certificates[2] ? certificates[2].offsetY : 0)}
            C 560,${120 + (certificates[2] ? certificates[2].offsetY : 0)} 560,${120 + (certificates[3] ? certificates[3].offsetY : 0)} 640,${120 + (certificates[3] ? certificates[3].offsetY : 0)}
            C 720,${120 + (certificates[3] ? certificates[3].offsetY : 0)} 720,${120 + (certificates[4] ? certificates[4].offsetY : 0)} 800,${120 + (certificates[4] ? certificates[4].offsetY : 0)}
            C 880,${120 + (certificates[4] ? certificates[4].offsetY : 0)} 880,${120 + (certificates[5] ? certificates[5].offsetY : 0)} 960,${120 + (certificates[5] ? certificates[5].offsetY : 0)}
            L 1800,120
          `"
          fill="none"
          stroke="url(#rope-gradient)"
          stroke-width="3"
          :class="[isResetting ? 'transition-all duration-[600ms] cubic-bezier(0.25, 1, 0.5, 1)' : '']"
          stroke-dasharray="6 3"
          class="drop-shadow-[0_0_10px_rgba(56,189,248,0.7)]"
        />
        <defs>
          <linearGradient id="rope-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.4" />
            <stop offset="50%" stop-color="#38bdf8" stop-opacity="1" />
            <stop offset="100%" stop-color="#6366f1" stop-opacity="0.4" />
          </linearGradient>
        </defs>
      </svg>

      <!-- Node Track Rendering Layout Grid Layer -->
      <div class="flex items-start space-x-12 md:space-x-16 relative z-10 px-4 w-max pt-6">
        <div 
          v-for="(node, index) in certificates" 
          :key="node.id" 
          :style="{ 
            transform: `translate(${node.offsetX}px, ${node.offsetY}px)`,
            transition: isResetting ? 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
          }"
          :class="[isNodeDragging && activeNodeId === node.id ? 'z-50' : 'z-20']"
          class="flex flex-col items-center w-36 md:w-44 text-center shrink-0 snap-center select-none"
        >
          
          <!-- Flexible Individual Square Node Icon -->
          <div
            @mousedown="(e) => startNodeDrag(e, node.id)"
            @touchstart="(e) => startNodeDrag(e, node.id)"
            :class="[isNodeDragging && activeNodeId === node.id ? 'scale-105 cursor-grabbing border-[#38bdf8] shadow-[0_0_25px_rgba(56,189,248,0.5)]' : 'cursor-grab hover:border-[#38bdf8]/70 hover:shadow-[0_0_15px_rgba(56,189,248,0.2)]']"
            class="w-14 h-14 md:w-16 md:h-16 bg-slate-900 border border-slate-700 rounded-xl flex items-center justify-center relative shadow-xl transition-all duration-200 ease-out"
          >
            <div class="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#38bdf8] text-[#060b13] text-[9px] font-black rounded-full flex items-center justify-center shadow-md select-none pointer-events-none">
              0{{ index + 1 }}
            </div>
            <svg class="w-8 h-8 md:w-10 md:h-10 text-[#38bdf8] pointer-events-none select-none" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.48 7.42c-1.07 0-2.07.47-2.82 1.3-.61-.71-1.46-1.16-2.42-1.25-1.12-.11-2.23.27-3.07 1.03-1.07.97-1.67 2.37-1.67 3.89s.6 2.92 1.67 3.89c.84.76 1.95 1.14 3.07 1.03.96-.09 1.81-.54 2.42-1.25.75.83 1.75 1.3 2.82 1.3 2.21 0 4.02-1.9 4.02-4.24s-1.81-4.24-4.02-4.24zm-6.22 7.02c-.59.05-1.17-.15-1.62-.56-.58-.53-.91-1.3-.91-2.12s.33-1.59.91-2.12c.45-.41 1.03-.61 1.62-.56.59.05 1.12.33 1.46.79.13.18.23.38.29.6.09.32.11.66.07.99-.04.33-.14.65-.3.94-.34.46-.87.74-1.46.79zm6.22.36c-1.22 0-2.22-1.05-2.22-2.34s1-2.34 2.22-2.34 2.22 1.05 2.22 2.34-1 2.34-2.22 2.34z"/>
            </svg>
          </div>

          <!-- Unified Dragging Text Block Content -->
          <div class="mt-4 flex flex-col items-center w-full relative z-30">
            <button
              @click="openCertificate(node.link)"
              @mousedown.stop
              @touchstart.stop
              class="text-[11px] md:text-xs font-semibold tracking-wide text-slate-100 hover:text-[#38bdf8] active:scale-95 line-clamp-2 min-h-[2rem] transition-all duration-200 px-1 cursor-pointer underline decoration-dotted decoration-slate-700 hover:decoration-[#38bdf8]"
            >
              {{ node.title }}
            </button>
            <span class="text-[9px] text-slate-500 font-mono tracking-wider mt-1 block uppercase pointer-events-none select-none">
              ⏱️ {{ node.duration }}
            </span>
            <span class="text-[8px] text-slate-600 font-mono tracking-tight mt-0.5 block truncate max-w-[100px] pointer-events-none select-none">
              ID: {{ node.credentialId }}
            </span>
          </div>

        </div>
      </div>

    </div>

    <!-- Bottom UX Interface Controller Panel -->
    <div class="mb-2 flex flex-col items-center space-y-3 w-full max-w-xs">
      
      <button 
        @click="resetView"
        class="px-4 py-1.5 text-[10px] font-semibold tracking-widest text-[#38bdf8] border border-[#38bdf8]/30 rounded-full bg-[#38bdf8]/5 hover:bg-[#38bdf8] hover:text-[#060b13] hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all duration-300 uppercase transform active:scale-95 cursor-pointer"
      >
        Reset Viewport Path
      </button>

      <!-- Sync Horizontal Range Element Track Component -->
      <div class="w-full flex flex-col items-center px-2">
        <input 
          type="range" 
          min="0" 
          max="100" 
          :value="scrollProgress" 
          @input="handleSliderInput"
          class="custom-path-slider w-full h-1 bg-slate-900 border border-slate-800 rounded-lg appearance-none cursor-pointer"
        />
        <div class="w-full flex justify-between mt-1 text-[8px] font-mono text-slate-500 tracking-wider uppercase">
          <span>Start</span>
          <span>More Tracks ➔</span>
        </div>
      </div>

      <span class="text-[9px] text-slate-500 font-mono text-center">
        ← Swipe canvas or slide to view more certificates • Drag boxes to test elastic path →
      </span>
    </div>

  </section>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Custom CSS Styling for Neon Slider Thumb UI */
.custom-path-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #38bdf8;
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.8);
  cursor: pointer;
  transition: transform 0.1s ease;
}
.custom-path-slider::-webkit-slider-thumb:hover {
  transform: scale(1.25);
}
.custom-path-slider::-moz-range-thumb {
  width: 12px;
  height: 12px;
  border: none;
  border-radius: 50%;
  background: #38bdf8;
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.8);
  cursor: pointer;
}
</style>
