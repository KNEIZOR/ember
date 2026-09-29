<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

import { gsap, ScrollTrigger } from '@/shared/animations/gsap'

type ProcessStep = {
  number: string
  title: string
  description: string
  detail: string
}

const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Origin',
    description:
      'We work with producers who care deeply about the land, the crop and the people behind every harvest.',
    detail: 'Single origin',
  },
  {
    number: '02',
    title: 'Roast',
    description:
      'Every coffee is roasted in small batches to bring out its natural sweetness, clarity and character.',
    detail: 'Small batch',
  },
  {
    number: '03',
    title: 'Grind',
    description:
      'The grind is adjusted throughout the day. Temperature, humidity and the coffee itself all matter.',
    detail: 'Dialled daily',
  },
  {
    number: '04',
    title: 'Brew',
    description:
      'From espresso to filter, every extraction is built around balance rather than speed.',
    detail: 'Precise extraction',
  },
  {
    number: '05',
    title: 'Serve',
    description:
      'The final step is simple: a good cup, a quiet moment and enough time to actually enjoy it.',
    detail: 'Made for you',
  },
]

const section = ref<HTMLElement | null>(null)
const track = ref<HTMLElement | null>(null)
const eyebrow = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const progress = ref<HTMLElement | null>(null)

let context: gsap.Context | null = null

onMounted(async () => {
  await nextTick()

  if (!section.value || !track.value || !eyebrow.value || !title.value || !progress.value) {
    return
  }

  context = gsap.context(() => {
    const cards = track.value?.querySelectorAll('.process__card')

    if (!cards || cards.length === 0) {
      return
    }

    const getScrollDistance = (): number => {
      if (!track.value) {
        return 0
      }

      return Math.max(0, track.value.scrollWidth - window.innerWidth)
    }

    gsap.set(eyebrow.value, {
      y: 20,
      opacity: 0,
    })

    gsap.set(title.value, {
      y: 30,
      opacity: 0,
    })

    gsap.set(cards, {
      opacity: 0.35,
      scale: 0.94,
    })

    const introTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section.value,
        start: 'top 80%',
        end: 'top 45%',
        scrub: 1,
      },
    })

    introTimeline
      .to(eyebrow.value, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
      })
      .to(
        title.value,
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
        },
        '-=0.25',
      )

    const horizontalAnimation = gsap.to(track.value, {
      x: () => -getScrollDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section.value,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${getScrollDistance()}`,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    })

    gsap.to(progress.value, {
      scaleX: 1,
      transformOrigin: 'left center',
      ease: 'none',
      scrollTrigger: {
        trigger: section.value,
        start: 'top top',
        end: () => `+=${getScrollDistance()}`,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    })

    cards.forEach((card, index) => {
      gsap.to(card, {
        opacity: 1,
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          containerAnimation: horizontalAnimation,
          start: 'left 80%',
          end: 'left 45%',
          scrub: true,
        },
      })

      if (index > 0) {
        gsap.to(card, {
          yPercent: index % 2 === 0 ? -4 : 4,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            containerAnimation: horizontalAnimation,
            start: 'left right',
            end: 'right left',
            scrub: 1.5,
          },
        })
      }
    })

    ScrollTrigger.refresh()
  }, section.value)
})

onBeforeUnmount(() => {
  context?.revert()
  context = null
})
</script>

<template>
  <section ref="section" class="process">
    <div class="process__header">
      <span ref="eyebrow" class="process__eyebrow"> 04 — Our process </span>

      <div ref="title" class="process__title">
        <span>From bean</span>
        <span>to cup.</span>
      </div>

      <p class="process__hint">
        Scroll to explore
        <span>→</span>
      </p>
    </div>

    <div ref="track" class="process__track">
      <article v-for="step in processSteps" :key="step.number" class="process__card">
        <div class="process__card-top">
          <span class="process__number">
            {{ step.number }}
          </span>

          <span class="process__detail">
            {{ step.detail }}
          </span>
        </div>

        <div class="process__card-content">
          <h2 class="process__card-title">
            {{ step.title }}
          </h2>

          <p class="process__card-description">
            {{ step.description }}
          </p>
        </div>

        <div class="process__card-line">
          <span />
        </div>
      </article>
    </div>

    <div class="process__progress">
      <span ref="progress" class="process__progress-value" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.process {
  position: relative;

  min-height: 100svh;
  overflow: hidden;

  background: var(--color-surface);
  color: var(--color-text);
}

.process__header {
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;

  display: grid;
  grid-template-columns: minmax(8rem, 0.25fr) minmax(0, 1fr) auto;
  align-items: start;

  width: 100%;

  padding: clamp(2rem, 4vw, 4rem) var(--container-padding);
}

.process__eyebrow {
  padding-top: 0.7rem;

  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.process__title {
  display: flex;
  flex-direction: column;

  font-family: var(--font-display);
  font-size: clamp(3rem, 6vw, 6rem);
  font-weight: 400;
  line-height: 0.82;
  letter-spacing: -0.05em;
}

.process__title span:last-child {
  margin-left: clamp(2rem, 8vw, 9rem);
}

.process__hint {
  display: flex;
  align-items: center;
  gap: 0.75rem;

  padding-top: 0.7rem;

  font-size: 0.6rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;

  opacity: 0.6;
}

.process__hint span {
  font-size: 1rem;
}

.process__track {
  display: flex;
  align-items: center;
  gap: clamp(2rem, 5vw, 5rem);

  width: max-content;
  min-height: 100svh;

  padding: clamp(9rem, 16vh, 12rem) var(--container-padding) clamp(5rem, 10vh, 8rem);

  will-change: transform;
}

.process__card {
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: clamp(22rem, 42vw, 42rem);
  height: clamp(24rem, 58vh, 38rem);

  flex-shrink: 0;

  padding: clamp(1.5rem, 3vw, 3rem);

  border: 1px solid rgba(23, 21, 19, 0.18);

  background: rgba(241, 237, 229, 0.32);

  will-change: transform, opacity;
}

.process__card:nth-child(even) {
  margin-top: clamp(3rem, 10vh, 7rem);
}

.process__card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-bottom: 1.25rem;

  border-bottom: 1px solid rgba(23, 21, 19, 0.15);
}

.process__number {
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.15em;
}

.process__detail {
  font-size: 0.6rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;

  opacity: 0.5;
}

.process__card-content {
  max-width: 31rem;

  margin-top: auto;
  margin-bottom: auto;
}

.process__card-title {
  margin-bottom: 1.5rem;

  font-family: var(--font-display);
  font-size: clamp(4rem, 8vw, 8rem);
  font-weight: 400;
  line-height: 0.8;
  letter-spacing: -0.06em;
}

.process__card-description {
  max-width: 26rem;

  font-size: clamp(0.9rem, 1.1vw, 1rem);
  line-height: 1.65;

  opacity: 0.72;
}

.process__card-line {
  position: relative;

  width: 100%;
  height: 1px;

  background: rgba(23, 21, 19, 0.15);
}

.process__card-line span {
  position: absolute;
  left: 0;
  top: 0;

  width: 30%;
  height: 1px;

  background: var(--color-accent);
}

.process__progress {
  position: absolute;
  z-index: 4;
  right: var(--container-padding);
  bottom: 2rem;
  left: var(--container-padding);

  height: 1px;

  overflow: hidden;

  background: rgba(23, 21, 19, 0.18);
}

.process__progress-value {
  display: block;

  width: 100%;
  height: 100%;

  background: var(--color-text);

  transform: scaleX(0);
}

@media (max-width: 900px) {
  .process__header {
    grid-template-columns: 1fr auto;
  }

  .process__eyebrow {
    display: none;
  }

  .process__title {
    grid-column: 1;
  }

  .process__hint {
    grid-column: 2;
  }

  .process__track {
    gap: 1.5rem;

    padding-right: var(--container-padding);
    padding-left: var(--container-padding);
  }

  .process__card {
    width: min(78vw, 34rem);
  }
}

@media (max-width: 600px) {
  .process__header {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }

  .process__title {
    font-size: clamp(2.8rem, 13vw, 5rem);
  }

  .process__hint {
    font-size: 0.55rem;
  }

  .process__track {
    padding-top: 9rem;
  }

  .process__card {
    width: 78vw;
    height: 62vh;
    min-height: 25rem;
  }

  .process__card-title {
    font-size: clamp(3.5rem, 16vw, 6rem);
  }

  .process__card-description {
    font-size: 0.85rem;
  }

  .process__card:nth-child(even) {
    margin-top: 2rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .process__eyebrow,
  .process__title,
  .process__card {
    opacity: 1 !important;
    transform: none !important;
  }

  .process__progress-value {
    transform: scaleX(1) !important;
  }
}
</style>

