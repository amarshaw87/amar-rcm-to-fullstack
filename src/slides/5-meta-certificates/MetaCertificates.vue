<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import type { CertificateNode } from '../../types';

// Extended type contract with positioning vectors for interactive physics nodes
interface PhysicsCertificateNode extends CertificateNode {
  offsetX: number;
  offsetY: number;
}

const certificates = ref<PhysicsCertificateNode[]>([
  {
    id: 1,
    title: 'Introduction to Front-End Development',
    duration: '19 hours',
    credentialId: '2N92TVJMQQHU',
    link: 'https://www.coursera.org/account/accomplishments/verify/2N92TVJMQQHU',
    offsetX: 0,
    offsetY: 0
  },
  {
    id: 2,
    title: 'Programming with JavaScript',
    duration: '48 hours',
    credentialId: '40EXC4ZYGHDU',
    link: 'https://www.coursera.org/account/accomplishments/verify/40EXC4ZYGHDU',
    offsetX: 0,
    offsetY: 0
  },
  {
    id: 3,
    title: 'Version Control',
    duration: '16 hours',
    credentialId: 'Q0XAECF646GI',
    link: 'https://www.coursera.org/account/accomplishments/verify/Q0XAECF646GI',
    offsetX: 0,
    offsetY: 0
  },
  {
    id: 4,
    title: 'HTML and CSS in depth',
    duration: '29 hours',
    credentialId: '92TGQYIPQQYI',
    link: 'https://www.coursera.org/account/accomplishments/verify/92TGQYIPQQYI',
    offsetX: 0,
    offsetY: 0
  },
  {
    id: 5,
    title: 'React Basics',
    duration: '30 hours',
    credentialId: 'NG8GIR33A8I5',
    link: 'https://www.coursera.org/account/accomplishments/verify/NG8GIR33A8I5',
    offsetX: 0,
    offsetY: 0
  },
  {
    id: 6,
    title: 'Advanced React',
    duration: '26 hours',
    credentialId: 'BFSJ2MSS47R9',
    link: 'https://www.coursera.org/account/accomplishments/verify/BFSJ2MSS47R9',
    offsetX: 0,
    offsetY: 0
  }
]);

// Canvas Global Drag Parameters
const sliderContainer = ref<HTMLElement | null>(null);
const isCanvasDragging = ref(false);
const startCanvasX = ref(0);
const canvasScrollLeft = ref(0);

// Node Specific Physics Drag Parameters
const activeNodeId = ref<number | null>(null);
const nodeStartX = ref(0);
const nodeStartY = ref(0);
const isNodeDragging = ref(false);
const isResetting = ref(false); // To handle spring-back transition timing flags

// --- CANVAS HORIZONTAL OVERFLOW SCROLL DRAG SYSTEM ---
const startCanvasDrag = (e: MouseEvent | TouchEvent) => {
  if (isNodeDragging.value || !sliderContainer.value) return;
  isCanvasDragging.value = true;
  const pageX = e instanceof MouseEvent ? e.pageX : e.touches[0].pageX;
  startCanvasX.value = pageX - sliderContainer.value.offsetLeft;
  canvasScrollLeft.value = sliderContainer.value.scrollLeft;
};

const handleGlobalDragging = (e: MouseEvent | TouchEvent) => {
  if (isNodeDragging.value && activeNodeId.value !== null) {
    // 2D Node Physics Positioning Modification Execution
    const currentX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
    const currentY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
    
    const deltaX = currentX - nodeStartX.value;
    const deltaY = currentY - nodeStartY.value;
    
    const targetNode = certificates.value.find(n => n.id === activeNodeId.value);
    if (targetNode) {
      targetNode.offsetX = deltaX;
      targetNode.offsetY = deltaY;
    }
    return;
  }

  if (!isCanvasDragging.value || !sliderContainer.value) return;
  const pageX = e instanceof MouseEvent ? e.pageX : e.touches[0].pageX;
  const x = pageX - sliderContainer.value.offsetLeft;
  const walk = (x - startCanvasX.value) * 1.5;
  sliderContainer.value.scrollLeft = canvasScrollLeft.value - walk;
};

const stopGlobalDrag = () => {
  isCanvasDragging.value = false;
  isNodeDragging.value = false;
  activeNodeId.value = null;
};

// --- INTERACTIVE INDIVIDUAL BOX FLEX DRAG SYSTEM ---
const startNodeDrag = (e: MouseEvent | TouchEvent, nodeId: number) => {
  e.stopPropagation(); // Prevents bubbling to container canvas tracking layers
  isNodeDragging.value = true;
  activeNodeId.value = nodeId;
  isResetting.value = false;
  
  const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
  const clientY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
  
  const targetNode = certificates.value.find(n => n.id === nodeId);
  if (targetNode) {
    nodeStartX.value = clientX - targetNode.offsetX;
    nodeStartY.value = clientY - targetNode.offsetY;
  }
};

// --- ISOLATED TEXT REDIRECTION SYSTEM ---
const openCertificate = (url: string) => {
  if (isCanvasDragging.value || isNodeDragging.value) return; 
  window.open(url, '_blank', 'noopener,noreferrer');
};

// --- SPRING BACK RESNAP VIEW RECONCILIATION DRIVER ---
const resetView = () => {
  isResetting.value = true;
  
  certificates.value.forEach(node => {
    node.offsetX = 0;
    node.offsetY = 0;
  });

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
  <!-- Full Viewport Lock Dashboard Component Container -->
  <section class="relative w-full h-full flex flex-col justify-between items-center bg-[#060b13] text-white overflow-hidden p-4 select-none">
    
    <!-- Top Decorative Header Section -->
    <div class="text-center mt-2">
      <span class="text-[10px] font-semibold tracking-widest text-[#38bdf8] uppercase">Professional Validation</span>
      <h2 class="text-xl md:text-2xl font-bold mt-0.5 text-white tracking-tight drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]">
        Meta Front-End Engineering Pathway
      </h2>
      <p class="text-[11px] text-slate-400 mt-0.5 max-w-md mx-auto">
        Drag square cards to stretch positions. Click course titles below to verify credential links.
      </p>
    </div>

    <!-- Draggable Flowchart Canvas Area Wrapper -->
    <div 
      ref="sliderContainer"
      @mousedown="startCanvasDrag"
      @mousemove="handleGlobalDragging"
      @mouseup="stopGlobalDrag"
      @mouseleave="stopGlobalDrag"
      @touchstart="startCanvasDrag"
      @touchmove="handleGlobalDragging"
      @touchend="stopGlobalDrag"
      :class="[isCanvasDragging ? 'cursor-grabbing' : 'cursor-grab']"
      class="w-full overflow-x-auto overflow-y-hidden flex items-center relative py-12 px-4 scrollbar-hide snap-x"
    >
      
      <!-- Continuous Flowchart Background Connecting Line -->
      <div class="absolute left-0 w-[1800px] h-[2px] bg-gradient-to-r from-cyan-500/20 via-blue-500/70 to-indigo-500/20 z-0 top-[42%]"></div>

      <!-- Node Track Rendering Layout Grid Layer -->
      <div class="flex items-start space-x-12 md:space-x-16 relative z-10 px-4 w-max">
        <div 
          v-for="(node, index) in certificates" 
          :key="node.id" 
          class="flex flex-col items-center w-36 md:w-44 text-center shrink-0 snap-center"
        >
          
          <!-- Flexible Individual Custom Physical Dragging Node Shell -->
          <div
            @mousedown="(e) => startNodeDrag(e, node.id)"
            @touchstart="(e) => startNodeDrag(e, node.id)"
            :style="{ 
              transform: `translate(${node.offsetX}px, ${node.offsetY}px)`,
              transition: isResetting ? 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
            }"
            :class="[isNodeDragging && activeNodeId === node.id ? 'z-50 scale-105 cursor-grabbing' : 'z-20 cursor-grab']"
            class="w-14 h-14 md:w-16 md:h-16 bg-slate-900 border border-slate-700 rounded-xl flex items-center justify-center relative shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:border-[#38bdf8] hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-shadow duration-300"
          >
            <!-- Badge Order Sequential Node Label Overlay Indicator -->
            <div class="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#38bdf8] text-[#060b13] text-[9px] font-black rounded-full flex items-center justify-center shadow-md select-none pointer-events-none">
              0{{ index + 1 }}
            </div>

            <!-- Meta Asset Logo Vector Icon Element -->
            <svg class="w-8 h-8 md:w-10 md:h-10 text-[#38bdf8] pointer-events-none select-none" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.48 7.42c-1.07 0-2.07.47-2.82 1.3-.61-.71-1.46-1.16-2.42-1.25-1.12-.11-2.23.27-3.07 1.03-1.07.97-1.67 2.37-1.67 3.89s.6 2.92 1.67 3.89c.84.76 1.95 1.14 3.07 1.03.96-.09 1.81-.54 2.42-1.25.75.83 1.75 1.3 2.82 1.3 2.21 0 4.02-1.9 4.02-4.24s-1.81-4.24-4.02-4.24zm-6.22 7.02c-.59.05-1.17-.15-1.62-.56-.58-.53-.91-1.3-.91-2.12s.33-1.59.91-2.12c.45-.41 1.03-.61 1.62-.56.59.05 1.12.33 1.46.79.13.18.23.38.29.6.09.32.11.66.07.99-.04.33-.14.65-.3.94-.34.46-.87.74-1.46.79zm6.22.36c-1.22 0-2.22-1.05-2.22-2.34s1-2.34 2.22-2.34 2.22 1.05 2.22 2.34-1 2.34-2.22 2.34z"/>
            </svg>
          </div>

          <!-- Text Information Box Structure Node Title Layout (EXCLUSIVE LINK CLICK CONTAINER) -->
          <div class="mt-4 flex flex-col items-center w-full z-10 relative">
            <button
              @click="openCertificate(node.link)"
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

    <div class="mb-2 flex flex-col items-center space-y-1.5">
      <button 
        @click="resetView"
        class="px-4 py-1.5 text-[10px] font-semibold tracking-widest text-[#38bdf8] border border-[#38bdf8]/30 rounded-full bg-[#38bdf8]/5 hover:bg-[#38bdf8] hover:text-[#060b13] hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all duration-300 uppercase transform active:scale-95 cursor-pointer"
      >
        🎯 Reset Viewport Path
      </button>
      <span class="text-[9px] text-slate-500 font-mono">
        ← Swipe canvas left/right • Hold & drag square boxes to float them →
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
</style>
