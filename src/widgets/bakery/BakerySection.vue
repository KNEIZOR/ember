<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

import { gsap, ScrollTrigger } from '@/shared/animations/gsap'

const section = ref<HTMLElement | null>(null)
const image = ref<HTMLElement | null>(null)
const imageInner = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)
const eyebrow = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const description = ref<HTMLElement | null>(null)
const link = ref<HTMLElement | null>(null)

let context: gsap.Context | null = null

onMounted(async () => {
  await nextTick()

  if (
    !section.value ||
    !image.value ||
    !imageInner.value ||
    !content.value ||
    !eyebrow.value ||
    !title.value ||
    !description.value ||
    !link.value
  ) {
    return
  }

  context = gsap.context(() => {
    const titleWords = title.value?.querySelectorAll('.bakery__title-word')

    if (!titleWords || titleWords.length === 0) {
      return
    }

    gsap.set(eyebrow.value, {
      y: 30,
      opacity: 0,
    })

    gsap.set(titleWords, {
      yPercent: 110,
      opacity: 0,
    })

    gsap.set(description.value, {
      y: 30,
      opacity: 0,
    })

    gsap.set(link.value, {
      y: 20,
      opacity: 0,
    })

    gsap.set(imageInner.value, {
      scale: 1.25,
      yPercent: -8,
    })

    const revealTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section.value,
        start: 'top 70%',
        end: 'top 35%',
        scrub: 1,
      },
    })

    revealTimeline
      .to(
        eyebrow.value,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
        },
        0,
      )
      .to(
        titleWords,
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: 'power4.out',
        },
        0.08,
      )
      .to(
        description.value,
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
        },
        0.4,
      )
      .to(
        link.value,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
        },
        0.55,
      )

    gsap.to(imageInner.value, {
      yPercent: 12,
      scale: 1.05,
      ease: 'none',
      scrollTrigger: {
        trigger: section.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
      },
    })

    gsap.to(image.value, {
      yPercent: -7,
      ease: 'none',
      scrollTrigger: {
        trigger: section.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    })

    gsap.to(content.value, {
      yPercent: -16,
      ease: 'none',
      scrollTrigger: {
        trigger: section.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
      },
    })

    gsap.to(section.value, {
      '--image-scale': 1,
      ease: 'none',
      scrollTrigger: {
        trigger: section.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
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
  <section ref="section" class="bakery">
    <div ref="image" class="bakery__image">
      <div ref="imageInner" class="bakery__image-inner" />

      <div class="bakery__overlay" aria-hidden="true" />
    </div>

    <div ref="content" class="bakery__content">
      <span ref="eyebrow" class="bakery__eyebrow"> 05 — From the oven </span>

      <h2 ref="title" class="bakery__title">
        <span class="bakery__title-line">
          <span class="bakery__title-word"> Baked </span>
        </span>

        <span class="bakery__title-line">
          <span class="bakery__title-word"> every morning. </span>
        </span>
      </h2>

      <p ref="description" class="bakery__description">
        Butter, flour, time and patience. Everything comes together before the doors open.
      </p>

      <a ref="link" href="#menu" class="bakery__link">
        Explore the menu

        <span class="bakery__link-arrow"> ↗ </span>
      </a>
    </div>

    <div class="bakery__side-note" aria-hidden="true">
      <span>Fresh daily</span>
      <span>08 — 18</span>
    </div>
  </section>
</template>

<style scoped lang="scss">
.bakery {
  --image-scale: 1;

  position: relative;

  min-height: 120svh;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--color-text-light);

  background: #1e1a17;
}

.bakery__image {
  position: absolute;
  z-index: 0;

  inset: -12% 0;

  overflow: hidden;

  will-change: transform;
}

.bakery__image-inner {
  position: absolute;

  inset: -8%;

  background-image: url('https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=2400&q=90');
  background-position: center;
  background-size: cover;

  will-change: transform;
}

.bakery__overlay {
  position: absolute;

  inset: 0;

  background:
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.28) 0%,
      rgba(0, 0, 0, 0.08) 35%,
      rgba(0, 0, 0, 0.28) 100%
    ),
    linear-gradient(90deg, rgba(0, 0, 0, 0.25), transparent 55%);
}

.bakery__content {
  position: relative;
  z-index: 2;

  width: min(calc(100% - 2 * var(--container-padding)), var(--container-width));

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin-top: 10vh;

  will-change: transform;
}

.bakery__eyebrow {
  margin-bottom: clamp(2rem, 4vw, 4rem);

  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.bakery__title {
  max-width: 1100px;

  margin: 0;

  font-family: var(--font-display);
  font-size: clamp(5rem, 13vw, 13rem);
  font-weight: 400;
  line-height: 0.74;
  letter-spacing: -0.075em;
}

.bakery__title-line {
  display: block;

  overflow: hidden;
}

.bakery__title-word {
  display: inline-block;
}

.bakery__description {
  max-width: 27rem;

  margin-top: clamp(2.5rem, 5vw, 5rem);
  margin-left: clamp(0rem, 14vw, 14rem);

  font-family: var(--font-display);
  font-size: clamp(1.2rem, 2vw, 2rem);
  line-height: 1.12;
  letter-spacing: -0.02em;
}

.bakery__link {
  display: inline-flex;
  align-items: center;
  gap: 1rem;

  margin-top: 2rem;
  margin-left: clamp(0rem, 14vw, 14rem);

  padding-bottom: 0.5rem;

  border-bottom: 1px solid rgba(255, 255, 255, 0.55);

  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;

  transition:
    gap var(--transition-fast),
    border-color var(--transition-fast);
}

.bakery__link:hover {
  gap: 1.5rem;

  border-color: currentColor;
}

.bakery__link-arrow {
  font-size: 1rem;
}

.bakery__side-note {
  position: absolute;
  z-index: 3;
  right: var(--container-padding);
  bottom: 3rem;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-align: right;
  text-transform: uppercase;

  opacity: 0.7;
}

.bakery__side-note span:last-child {
  opacity: 0.6;
}

@media (max-width: 900px) {
  .bakery {
    min-height: 100svh;
  }

  .bakery__content {
    margin-top: 5vh;
  }

  .bakery__title {
    font-size: clamp(4.5rem, 15vw, 9rem);
  }

  .bakery__description,
  .bakery__link {
    margin-left: 0;
  }
}

@media (max-width: 600px) {
  .bakery {
    min-height: 100svh;
  }

  .bakery__image-inner {
    background-position: 62% center;
  }

  .bakery__title {
    font-size: clamp(4rem, 19vw, 7rem);
  }

  .bakery__description {
    max-width: 18rem;

    margin-top: 2.5rem;

    font-size: 1.25rem;
  }

  .bakery__side-note {
    right: var(--container-padding);
    bottom: 1.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .bakery__image,
  .bakery__image-inner,
  .bakery__content {
    transform: none !important;
  }

  .bakery__eyebrow,
  .bakery__title-word,
  .bakery__description,
  .bakery__link {
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>
