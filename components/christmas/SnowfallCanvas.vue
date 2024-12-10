<!-- components/SnowfallCanvas.vue -->
<template>
  <canvas ref="canvasRef" :style="canvasStyle"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Snowflake {
  x: number
  y: number
  radius: number
  speed: number
  opacity: number
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let snowflakes: Snowflake[] = []
const SNOWFLAKE_COUNT = 150
let animationFrame: number

const createSnowflake = (): Snowflake => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  radius: Math.random() * 3 + 1,
  speed: Math.random() + 1,
  opacity: Math.random() * 0.7 + 0.3
})

const initSnowflakes = () => {
  snowflakes = Array.from({ length: SNOWFLAKE_COUNT }, createSnowflake)
}

const drawSnowflakes = () => {
  if (!ctx || !canvasRef.value) return

  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

  snowflakes.forEach(flake => {
    ctx.beginPath()
    ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`
    ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2)
    ctx.fill()

    flake.x += Math.sin(flake.y * 0.1) * 0.5
    flake.y += flake.speed

    if (flake.y > window.innerHeight) {
      flake.y = -10
      flake.x = Math.random() * window.innerWidth
    }
  })

  animationFrame = requestAnimationFrame(drawSnowflakes)
}

const resizeCanvas = () => {
  if (canvasRef.value) {
    canvasRef.value.width = window.innerWidth
    canvasRef.value.height = window.innerHeight
  }
}

onMounted(() => {
  if (canvasRef.value) {
    ctx = canvasRef.value.getContext('2d')
    resizeCanvas()
    initSnowflakes()
    window.addEventListener('resize', resizeCanvas)
    animationFrame = requestAnimationFrame(drawSnowflakes)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas)
  cancelAnimationFrame(animationFrame)
})

const canvasStyle = {
  position: 'fixed',
  top: '0',
  left: '0',
  pointerEvents: 'none',
}
</script>