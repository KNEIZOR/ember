<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

import { gsap, ScrollTrigger } from '@/shared/animations/gsap'

const section = ref<HTMLElement | null>(null)
const imageFrame = ref<HTMLElement | null>(null)
const image = ref<HTMLElement | null>(null)
const eyebrow = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const description = ref<HTMLElement | null>(null)
const notes = ref<HTMLElement | null>(null)
const number = ref<HTMLElement | null>(null)

let context: gsap.Context | null = null

const coffeeImage =
  'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=2200&q=90'

onMounted(async () => {
  await nextTick()

  if (
    !section.value ||
    !imageFrame.value ||
    !image.value ||
    !eyebrow.value ||
    !title.value ||
    !description.value ||
    !notes.value ||
    !number.value
  ) {
    return
  }

  context = gsap.context(() => {
    const titleWords = title.value?.querySelectorAll('.signature__title-word')

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

    gsap.set(notes.value, {
      y: 25,
      opacity: 0,
    })

    gsap.set(number.value, {
      x: 30,
      opacity: 0,
    })

    gsap.set(image.value, {
      scale: 1.25,
      yPercent: -10,
    })

    const revealTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section.value,
        start: 'top 70%',
        once: true,
      },
    })

    revealTimeline
      .to(
        eyebrow.value,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
        },
        0,
      )
      .to(
        titleWords,
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.1,
          ease: 'power4.out',
        },
        0.15,
      )
      .to(
        description.value,
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
        },
        0.45,
      )
      .to(
        notes.value,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
        },
        0.6,
      )
      .to(
        number.value,
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
        },
        0.5,
      )

    /*
     * Main image parallax.
     *
     * The image moves considerably slower than the page,
     * creating depth while remaining inside its frame.
     */
    gsap.to(image.value, {
      yPercent: 10,
      scale: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: section.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    })

    /*
     * The frame moves in the opposite direction.
     * The two layers create a stronger depth effect.
     */
    gsap.to(imageFrame.value, {
      yPercent: -7,
      ease: 'none',
      scrollTrigger: {
        trigger: section.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    })

    /*
     * Decorative number drifts independently.
     */
    gsap.to(number.value, {
      yPercent: -35,
      ease: 'none',
      scrollTrigger: {
        trigger: section.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
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
  <section id="signature" ref="section" class="signature">
    <div class="signature__container">
      <div class="signature__intro">
        <span ref="eyebrow" class="signature__eyebrow"> 02 — Signature coffee </span>

        <div ref="title" class="signature__title">
          <span class="signature__title-line">
            <span class="signature__title-word">Roasted</span>
          </span>

          <span class="signature__title-line">
            <span class="signature__title-word">with intent.</span>
          </span>
        </div>
      </div>

      <div class="signature__visual">
        <div ref="imageFrame" class="signature__image-frame">
          <div
            ref="image"
            class="signature__image"
            :style="{ backgroundImage: `url(${coffeeImage})` }"
            aria-hidden="true"
          />

          <div class="signature__image-overlay" />

          <div class="signature__image-label">
            <span>EMBER</span>
            <span>01 / 06</span>
          </div>
        </div>

        <span ref="number" class="signature__number" aria-hidden="true"> 01 </span>
      </div>

      <div class="signature__bottom">
        <div ref="description" class="signature__description">
          <p>
            A seasonal expression of what we love about coffee: clarity, sweetness and a little
            surprise.
          </p>
        </div>

        <div ref="notes" class="signature__notes">
          <span class="signature__notes-label"> Tasting notes </span>

          <div class="signature__notes-list">
            <span>Floral</span>
            <span>Citrus</span>
            <span>Honey</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.signature {
  position: relative;

  overflow: hidden;

  padding: var(--section-padding) 0;

  background: var(--color-bg-dark);
  color: var(--color-text-light);
}

.signature__container {
  width: min(100%, var(--container-width));
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.signature__intro {
  display: grid;
  grid-template-columns: minmax(8rem, 0.25fr) minmax(0, 1fr);

  margin-bottom: clamp(4rem, 8vw, 8rem);
}

.signature__eyebrow {
  padding-top: 0.75rem;

  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.signature__title {
  max-width: 950px;

  font-family: var(--font-display);
  font-size: clamp(4rem, 9vw, 9rem);
  font-weight: 400;
  line-height: 0.82;
  letter-spacing: -0.055em;
}

.signature__title-line {
  display: block;
  overflow: hidden;
}

.signature__title-word {
  display: inline-block;
}

.signature__visual {
  position: relative;

  width: 100%;
}

.signature__image-frame {
  position: relative;

  width: min(100%, 1050px);
  height: clamp(32rem, 65vw, 58rem);
  margin-left: auto;

  overflow: hidden;

  will-change: transform;
}

.signature__image {
  position: absolute;
  inset: -12% 0;

  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  will-change: transform;
}

.signature__image-overlay {
  position: absolute;
  inset: 0;

  background: linear-gradient(180deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.32));
}

.signature__image-label {
  position: absolute;
  right: 1.5rem;
  bottom: 1.5rem;

  display: flex;
  gap: 1rem;

  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.signature__number {
  position: absolute;
  z-index: 2;
  left: 0;
  bottom: -2rem;

  font-family: var(--font-display);
  font-size: clamp(10rem, 22vw, 23rem);
  font-weight: 400;
  line-height: 0.7;
  letter-spacing: -0.08em;

  color: var(--color-accent);

  pointer-events: none;
  user-select: none;

  will-change: transform;
}

.signature__bottom {
  display: grid;
  grid-template-columns: minmax(8rem, 0.25fr) minmax(18rem, 0.75fr);

  margin-top: clamp(4rem, 8vw, 8rem);
}

.signature__description {
  grid-column: 2;

  max-width: 35rem;
}

.signature__description p {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3vw, 3rem);
  line-height: 1.05;
  letter-spacing: -0.025em;
}

.signature__notes {
  grid-column: 2;

  display: flex;
  align-items: center;
  gap: 2rem;

  margin-top: 3rem;
  padding-top: 1.25rem;

  border-top: 1px solid rgba(241, 237, 229, 0.2);
}

.signature__notes-label {
  font-size: 0.6rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;

  opacity: 0.55;
}

.signature__notes-list {
  display: flex;
  gap: 1.5rem;

  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.signature__notes-list span::before {
  content: '—';
  margin-right: 0.5rem;

  color: var(--color-accent);
}

@media (max-width: 900px) {
  .signature__intro {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .signature__eyebrow {
    padding-top: 0;
  }

  .signature__image-frame {
    width: 100%;
    height: 70svh;
    min-height: 30rem;
  }

  .signature__number {
    left: -0.5rem;
    bottom: -1rem;
  }

  .signature__bottom {
    grid-template-columns: 1fr;
  }

  .signature__description,
  .signature__notes {
    grid-column: 1;
  }
}

@media (max-width: 600px) {
  .signature__title {
    font-size: clamp(3.5rem, 18vw, 6rem);
  }

  .signature__image-frame {
    height: 65svh;
    min-height: 26rem;
  }

  .signature__number {
    font-size: 10rem;
  }

  .signature__notes {
    align-items: flex-start;
    flex-direction: column;
    gap: 1rem;
  }

  .signature__notes-list {
    flex-wrap: wrap;
  }
}

@media (prefers-reduced-motion: reduce) {
  .signature__eyebrow,
  .signature__title-word,
  .signature__description,
  .signature__notes,
  .signature__number {
    opacity: 1 !important;
    transform: none !important;
  }

  .signature__image,
  .signature__image-frame {
    transform: none !important;
  }
}
</style>
