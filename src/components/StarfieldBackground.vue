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
}

interface ShootingStar {
  x: number
  y: number
  length: number
  speed: number
  angle: number
  alpha: number
}

let animationFrameId: number
let particles: Particle[] = []
let shootingStars: ShootingStar[] = []
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
    const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 9000)
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        alpha: Math.random() * 0.7 + 0.3
      })
    }
  }

  const maybeSpawnShootingStar = () => {
    if (Math.random() < 0.03 && shootingStars.length < 2) {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: 0,
        length: Math.random() * 80 + 40,
        speed: Math.random() * 6 + 4,
        angle: Math.PI / 4, // 45 degree diagonal streak
        alpha: 1
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

    // Deep cosmic background gradient
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 50,
      canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) * 0.8
    )
    gradient.addColorStop(0, 'rgba(2, 6, 23, 0.85)')
    gradient.addColorStop(1, 'rgba(2, 6, 23, 1)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // 1. Render & Update Standard Particles
    particles.forEach((p) => {
      p.x += p.vx
      p.y += p.vy

      if (p.x < 0) p.x = canvas.width
      if (p.x > canvas.width) p.x = 0
      if (p.y < 0) p.y = canvas.height
      if (p.y > canvas.height) p.y = 0

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
      ctx.fillStyle = `rgba(56, 189, 248, ${currentAlpha})`
      ctx.shadowBlur = 6
      ctx.shadowColor = 'rgba(56, 189, 248, 0.6)'
      ctx.fill()
      ctx.shadowBlur = 0
    })

    // 2. Render & Update Shooting Stars
    maybeSpawnShootingStar()
    shootingStars.forEach((star, index) => {
      star.x += Math.cos(star.angle) * star.speed
      star.y += Math.sin(star.angle) * star.speed
      star.alpha -= 0.015

      if (star.alpha <= 0 || star.x > canvas.width || star.y > canvas.height) {
        shootingStars.splice(index, 1)
        return
      }

      ctx.save()
      ctx.strokeStyle = `rgba(186, 230, 253, ${star.alpha})`
      ctx.lineWidth = 1.5
      ctx.shadowBlur = 10
      ctx.shadowColor = 'rgba(56, 189, 248, 0.9)'
      ctx.beginPath()
      ctx.moveTo(star.x, star.y)
      ctx.lineTo(
        star.x - Math.cos(star.angle) * star.length,
        star.y - Math.sin(star.angle) * star.length
      )
      ctx.stroke()
      ctx.restore()
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

