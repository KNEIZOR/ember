<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

import { scrollToAnchor } from '@/shared/animations/smoothScroll'

const page = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)

let animationFrame: number | null = null

onMounted(() => {
  if (!page.value || !content.value) {
    return
  }

  const start = performance.now()

  const animate = (time: number) => {
    if (!content.value) {
      return
    }

    const progress = Math.min((time - start) / 1200, 1)
    const eased = 1 - Math.pow(1 - progress, 4)

    content.value.style.opacity = String(eased)
    content.value.style.transform = `translateY(${30 - 30 * eased}px)`

    if (progress < 1) {
      animationFrame = requestAnimationFrame(animate)
    }
  }

  animationFrame = requestAnimationFrame(animate)
})

onBeforeUnmount(() => {
  if (animationFrame !== null) {
    cancelAnimationFrame(animationFrame)
    animationFrame = null
  }
})

const goHome = (): void => {
  window.location.href = '/'

  scrollToAnchor('#top')
}
</script>

<template>
  <main ref="page" class="not-found">
    <div ref="content" class="not-found__content">
      <span class="not-found__eyebrow"> EMBER / 404 </span>

      <div class="not-found__number">404</div>

      <h1 class="not-found__title">This page has gone cold.</h1>

      <p class="not-found__description">The page you're looking for doesn't exist or has moved.</p>

      <button class="not-found__button" type="button" @click="goHome">
        <span>Back to EMBER</span>

        <span aria-hidden="true">↗</span>
      </button>
    </div>

    <div class="not-found__grain" aria-hidden="true" />

    <span class="not-found__corner not-found__corner--top"> Paris </span>

    <span class="not-found__corner not-found__corner--bottom"> Coffee & bakery </span>
  </main>
</template>

<style scoped lang="scss">
.not-found {
  position: relative;

  min-height: 100svh;
  overflow: hidden;

  display: grid;
  place-items: center;

  background: #171411;
  color: var(--color-text-light);
}

.not-found__content {
  position: relative;
  z-index: 2;

  width: min(calc(100% - 2 * var(--container-padding)), 70rem);

  text-align: center;
}

.not-found__eyebrow {
  display: block;

  margin-bottom: 1.5rem;

  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;

  opacity: 0.45;
}

.not-found__number {
  margin-bottom: clamp(1.5rem, 3vw, 2.5rem);

  font-family: var(--font-display);
  font-size: clamp(9rem, 25vw, 24rem);
  font-weight: 400;
  line-height: 0.7;
  letter-spacing: -0.09em;

  color: rgba(241, 237, 229, 0.08);

  user-select: none;
}

.not-found__title {
  position: relative;

  margin: 0;

  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 5rem);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: -0.04em;
}

.not-found__description {
  max-width: 28rem;

  margin: 1.5rem auto 0;

  font-size: 0.85rem;
  line-height: 1.7;

  opacity: 0.55;
}

.not-found__button {
  display: inline-flex;
  align-items: center;
  gap: 1.5rem;

  margin-top: 2.5rem;
  padding: 1rem 0;

  border-bottom: 1px solid rgba(241, 237, 229, 0.5);

  color: inherit;

  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;

  cursor: pointer;

  transition:
    gap 300ms ease,
    border-color 300ms ease;
}

.not-found__button:hover {
  gap: 2rem;

  border-color: currentColor;
}

.not-found__button span:last-child {
  font-size: 1rem;
}

.not-found__grain {
  position: absolute;
  inset: 0;

  opacity: 0.035;

  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E");
  pointer-events: none;
}

.not-found__corner {
  position: absolute;
  z-index: 2;

  font-size: 0.55rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;

  opacity: 0.35;
}

.not-found__corner--top {
  top: 2rem;
  left: var(--container-padding);
}

.not-found__corner--bottom {
  right: var(--container-padding);
  bottom: 2rem;
}

@media (max-width: 600px) {
  .not-found__number {
    font-size: clamp(7rem, 35vw, 12rem);
  }

  .not-found__description {
    max-width: 20rem;
  }

  .not-found__corner--top {
    top: 1.5rem;
  }

  .not-found__corner--bottom {
    bottom: 1.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .not-found__content {
    opacity: 1 !important;
    transform: none !important;
  }

  .not-found__button {
    transition: none;
  }
}
</style>
