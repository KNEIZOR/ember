<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

import { gsap, ScrollTrigger } from '@/shared/animations/gsap'

const section = ref<HTMLElement | null>(null)
const eyebrow = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const description = ref<HTMLElement | null>(null)
const details = ref<HTMLElement | null>(null)
const circle = ref<HTMLElement | null>(null)
const coordinates = ref<HTMLElement | null>(null)

let context: gsap.Context | null = null

onMounted(async () => {
  await nextTick()

  if (
    !section.value ||
    !eyebrow.value ||
    !title.value ||
    !description.value ||
    !details.value ||
    !circle.value ||
    !coordinates.value
  ) {
    return
  }

  context = gsap.context(() => {
    const titleWords = title.value?.querySelectorAll('.visit__title-word')

    if (!titleWords || titleWords.length === 0) {
      return
    }

    gsap.set(eyebrow.value, {
      y: 25,
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

    gsap.set(details.value, {
      y: 35,
      opacity: 0,
    })

    gsap.set(coordinates.value, {
      opacity: 0,
    })

    gsap.set(circle.value, {
      scale: 0.7,
      opacity: 0,
    })

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section.value,
        start: 'top 70%',
        end: 'top 25%',
        scrub: 1,
      },
    })

    timeline
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
          duration: 0.8,
          ease: 'power3.out',
        },
        0.35,
      )
      .to(
        details.value,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
        },
        0.5,
      )
      .to(
        circle.value,
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
        },
        0.2,
      )
      .to(
        coordinates.value,
        {
          opacity: 1,
          duration: 0.5,
        },
        0.65,
      )

    gsap.to(circle.value, {
      yPercent: -25,
      rotation: 12,
      ease: 'none',
      scrollTrigger: {
        trigger: section.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    })

    gsap.to(title.value, {
      yPercent: -12,
      ease: 'none',
      scrollTrigger: {
        trigger: section.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    })

    gsap.to(coordinates.value, {
      yPercent: 35,
      ease: 'none',
      scrollTrigger: {
        trigger: section.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
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
  <section id="visit" ref="section" class="visit">
    <div ref="circle" class="visit__circle" aria-hidden="true">
      <span>EMBER</span>
    </div>

    <div class="visit__container">
      <div class="visit__top">
        <span ref="eyebrow" class="visit__eyebrow"> 06 — Come by </span>

        <span ref="coordinates" class="visit__coordinates">
          48°51′N
          <br />
          2°21′E
        </span>
      </div>

      <div class="visit__main">
        <h2 ref="title" class="visit__title">
          <span class="visit__title-line">
            <span class="visit__title-word"> Take </span>
          </span>

          <span class="visit__title-line">
            <span class="visit__title-word"> your time. </span>
          </span>
        </h2>

        <p ref="description" class="visit__description">
          A quiet corner in Paris for good coffee, warm bread and conversations that don't need to
          be rushed.
        </p>
      </div>

      <div ref="details" class="visit__details">
        <div class="visit__detail">
          <span class="visit__detail-label"> Address </span>

          <address>
            24 Rue du Café
            <br />
            75011 Paris, France
          </address>
        </div>

        <div class="visit__detail">
          <span class="visit__detail-label"> Opening hours </span>

          <p>
            Monday — Friday
            <br />
            08:00 — 18:00
          </p>

          <p>
            Saturday — Sunday
            <br />
            09:00 — 19:00
          </p>
        </div>

        <div class="visit__detail">
          <span class="visit__detail-label"> Contact </span>

          <a href="mailto:hello@ember.cafe"> hello@ember.cafe </a>

          <a href="tel:+33145800000"> +33 1 45 80 00 00 </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.visit {
  position: relative;

  min-height: 120svh;
  overflow: hidden;

  padding: clamp(7rem, 15vw, 15rem) 0 clamp(5rem, 10vw, 10rem);

  background: var(--color-bg);
  color: var(--color-text);
}

.visit__container {
  position: relative;
  z-index: 2;

  width: min(100%, var(--container-width));
  min-height: 100svh;
  margin: 0 auto;
  padding: 0 var(--container-padding);

  display: flex;
  flex-direction: column;
}

.visit__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.visit__eyebrow,
.visit__coordinates {
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.visit__coordinates {
  line-height: 1.5;
  text-align: right;

  opacity: 0.5;
}

.visit__main {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(16rem, 0.35fr);
  align-items: end;
  gap: 5rem;

  margin-top: auto;
  margin-bottom: auto;
}

.visit__title {
  margin: 0;

  font-family: var(--font-display);
  font-size: clamp(6rem, 16vw, 16rem);
  font-weight: 400;
  line-height: 0.68;
  letter-spacing: -0.08em;

  will-change: transform;
}

.visit__title-line {
  display: block;

  overflow: hidden;
}

.visit__title-word {
  display: inline-block;
}

.visit__description {
  max-width: 23rem;

  padding-bottom: 1rem;

  font-family: var(--font-display);
  font-size: clamp(1.25rem, 2vw, 2rem);
  line-height: 1.12;
  letter-spacing: -0.02em;
}

.visit__details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  padding-top: 2rem;

  border-top: 1px solid var(--color-border);

  will-change: transform;
}

.visit__detail {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;

  font-size: 0.7rem;
  line-height: 1.6;
}

.visit__detail-label {
  margin-bottom: 0.35rem;

  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;

  opacity: 0.45;
}

.visit__detail address {
  font-style: normal;
}

.visit__detail p {
  margin: 0;
}

.visit__detail a {
  width: fit-content;

  border-bottom: 1px solid transparent;

  transition:
    border-color var(--transition-fast),
    opacity var(--transition-fast);
}

.visit__detail a:hover {
  border-color: currentColor;
}

.visit__circle {
  position: absolute;
  z-index: 1;

  top: 16%;
  right: 8%;

  width: clamp(12rem, 25vw, 30rem);
  aspect-ratio: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: var(--color-accent);
  color: var(--color-text-light);

  will-change: transform;
}

.visit__circle span {
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.35em;
  text-transform: uppercase;
}

@media (max-width: 900px) {
  .visit {
    min-height: 100svh;
  }

  .visit__main {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .visit__description {
    margin-left: auto;
  }

  .visit__circle {
    top: 18%;
    right: -5%;
  }

  .visit__details {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 600px) {
  .visit {
    padding-top: 6rem;
  }

  .visit__title {
    font-size: clamp(5rem, 22vw, 8rem);
  }

  .visit__description {
    max-width: 18rem;

    margin-left: 0;

    font-size: 1.25rem;
  }

  .visit__circle {
    top: 13%;
    right: -15%;

    width: 12rem;
  }

  .visit__details {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .visit__coordinates {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .visit__circle,
  .visit__title,
  .visit__coordinates {
    transform: none !important;
  }

  .visit__eyebrow,
  .visit__title-word,
  .visit__description,
  .visit__details,
  .visit__circle,
  .visit__coordinates {
    opacity: 1 !important;
  }
}
</style>
