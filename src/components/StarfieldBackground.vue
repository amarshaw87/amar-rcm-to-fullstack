<template>
  <canvas ref="canvasRef" class="absolute inset-0 w-full h-full pointer-events-none z-0"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)

interface Particle {
  x: number
  y: number
  radius: number
  vx: number
  vy: number
  alpha: number
  originalAlpha: number
}

let animationFrameId: number
let particles: Particle[] = []
let mouseX = -1000
let mouseY = -1000

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const resizeCanvas = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    initParticles()
  }

  const initParticles = () => {
    particles = []
    const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 9000) // Screen size ke hisaab se density
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        alpha: Math.random() * 0.7 + 0.3,
        originalAlpha: Math.random() * 0.7 + 0.3
      })
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    mouseX = e.clientX
    mouseY = e.clientY
  }

  window.addEventListener('resize', resizeCanvas)
  window.addEventListener('mousemove', handleMouseMove)

  resizeCanvas()

  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Optional: Subtle deep cosmic gradient background overlay
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 50,
      canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) * 0.8
    )
    gradient.addColorStop(0, 'rgba(2, 6, 23, 0.8)') // slate-950 tone
    gradient.addColorStop(1, 'rgba(2, 6, 23, 1)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw and update particles
    particles.forEach((p) => {
      p.x += p.vx
      p.y += p.vy

      // Screen boundary wrap-around
      if (p.x < 0) p.x = canvas.width
      if (p.x > canvas.width) p.x = 0
      if (p.y < 0) p.y = canvas.height
      if (p.y > canvas.height) p.y = 0

      // Mouse interactivity / gentle repulsion & glow
      const dx = mouseX - p.x
      const dy = mouseY - p.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      const maxDist = 120

      let currentAlpha = p.alpha
      if (dist < maxDist) {
        const force = (1 - dist / maxDist)
        p.x -= (dx / dist) * force * 1.5
        p.y -= (dy / dist) * force * 1.5
        currentAlpha = Math.min(1, p.alpha + force * 0.5)
      }

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(56, 189, 248, ${currentAlpha})` // Sky blue glowing cosmic dust color
      ctx.shadowBlur = 6
      ctx.shadowColor = 'rgba(56, 189, 248, 0.6)'
      ctx.fill()
      ctx.shadowBlur = 0 // Reset shadow for performance
    })

    animationFrameId = requestAnimationFrame(render)
  }

  render()

  onUnmounted(() => {
    window.removeEventListener('resize', resizeCanvas)
    window.removeEventListener('mousemove', handleMouseMove)
    cancelAnimationFrame(animationFrameId)
  })
})
</script>
