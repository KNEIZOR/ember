<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

import { gsap, ScrollTrigger } from '@/shared/animations/gsap'

const section = ref<HTMLElement | null>(null)
const image = ref<HTMLElement | null>(null)
const imageElement = ref<HTMLImageElement | null>(null)
const eyebrow = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const paragraphs = ref<HTMLElement | null>(null)
const details = ref<HTMLElement | null>(null)

let context: gsap.Context | null = null

const storyImage =
  'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1800&q=90'

onMounted(async () => {
  await nextTick()

  if (
    !section.value ||
    !image.value ||
    !imageElement.value ||
    !eyebrow.value ||
    !title.value ||
    !paragraphs.value ||
    !details.value
  ) {
    return
  }

  context = gsap.context(() => {
    const titleWords = title.value?.querySelectorAll('.story__title-word')

    if (!titleWords || titleWords.length === 0) {
      return
    }

    gsap.set(titleWords, {
      yPercent: 110,
      opacity: 0,
    })

    gsap.set(eyebrow.value, {
      y: 20,
      opacity: 0,
    })

    gsap.set(paragraphs.value, {
      y: 35,
      opacity: 0,
    })

    gsap.set(details.value, {
      y: 30,
      opacity: 0,
    })

    gsap.set(imageElement.value, {
      scale: 1.18,
      yPercent: -8,
    })

    const introTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section.value,
        start: 'top 75%',
        once: true,
      },
    })

    introTimeline
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
          stagger: 0.08,
          ease: 'power4.out',
        },
        0.15,
      )
      .to(
        paragraphs.value,
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
        },
        0.45,
      )
      .to(
        details.value,
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
        },
        0.65,
      )

    /*
     * Main image parallax.
     *
     * The image starts slightly enlarged and shifted upward.
     * During the entire section scroll it moves downward,
     * creating a clearly visible depth effect.
     */
    gsap.to(imageElement.value, {
      scale: 1,
      yPercent: 8,
      ease: 'none',
      scrollTrigger: {
        trigger: section.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    })

    /*
     * A second, slower movement is applied to the image wrapper.
     * This makes the entire visual block subtly drift in the
     * opposite direction to the image itself.
     */
    gsap.to(image.value, {
      yPercent: -5,
      ease: 'none',
      scrollTrigger: {
        trigger: section.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
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
  <section id="story" ref="section" class="story">
    <div class="story__container">
      <div class="story__header">
        <span ref="eyebrow" class="story__eyebrow"> 01 — Our story </span>

        <div ref="title" class="story__title" aria-label="A place made slowly">
          <span class="story__title-line">
            <span class="story__title-word">A place</span>
          </span>

          <span class="story__title-line">
            <span class="story__title-word">made slowly.</span>
          </span>
        </div>
      </div>

      <div class="story__content">
        <div ref="image" class="story__image-wrapper">
          <img
            ref="imageElement"
            class="story__image"
            :src="storyImage"
            alt="Warm specialty coffee shop interior"
            loading="lazy"
          />

          <span class="story__image-caption"> EMBER — EST. 2026 </span>
        </div>

        <div class="story__copy">
          <div ref="paragraphs" class="story__paragraphs">
            <p>Ember was created around a simple idea: good coffee deserves time.</p>

            <p>
              We roast with intention, bake throughout the day, and make space for the moments
              between one place and the next.
            </p>
          </div>

          <div ref="details" class="story__details">
            <div class="story__detail">
              <span class="story__detail-label">01</span>
              <span class="story__detail-text">Specialty coffee</span>
            </div>

            <div class="story__detail">
              <span class="story__detail-label">02</span>
              <span class="story__detail-text">Slow bakery</span>
            </div>

            <div class="story__detail">
              <span class="story__detail-label">03</span>
              <span class="story__detail-text">Daily rituals</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.story {
  position: relative;

  overflow: hidden;

  padding: var(--section-padding) 0;

  background: var(--color-bg);
  color: var(--color-text);
}

.story__container {
  width: min(100%, var(--container-width));
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.story__header {
  display: grid;
  grid-template-columns: minmax(8rem, 0.25fr) minmax(0, 1fr);

  margin-bottom: clamp(4rem, 9vw, 9rem);
}

.story__eyebrow {
  align-self: start;

  padding-top: 0.75rem;

  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.story__title {
  max-width: 950px;

  font-family: var(--font-display);
  font-size: clamp(4rem, 9vw, 9rem);
  font-weight: 400;
  line-height: 0.82;
  letter-spacing: -0.055em;
}

.story__title-line {
  display: block;

  overflow: hidden;
}

.story__title-word {
  display: inline-block;
}

.story__content {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(18rem, 0.75fr);
  align-items: start;
  gap: clamp(3rem, 8vw, 9rem);
}

.story__image-wrapper {
  position: relative;

  height: clamp(32rem, 58vw, 52rem);

  overflow: hidden;

  will-change: transform;
}

.story__image {
  display: block;

  width: 100%;
  height: 125%;

  object-fit: cover;
  object-position: center;
  transform-origin: center center;

  will-change: transform;
}

.story__image-caption {
  position: absolute;
  right: 1.25rem;
  bottom: 1.25rem;

  padding: 0.5rem 0.7rem;

  background: rgba(23, 21, 19, 0.7);
  color: var(--color-text-light);

  font-size: 0.55rem;
  letter-spacing: 0.14em;

  backdrop-filter: blur(8px);
}

.story__copy {
  display: flex;
  flex-direction: column;

  min-height: 100%;
  padding-top: clamp(2rem, 8vw, 8rem);
}

.story__paragraphs {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  max-width: 30rem;
}

.story__paragraphs p {
  font-size: clamp(1rem, 1.4vw, 1.2rem);
  line-height: 1.7;
}

.story__paragraphs p:first-child {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3vw, 3rem);
  line-height: 1.05;
  letter-spacing: -0.025em;
}

.story__details {
  display: flex;
  flex-direction: column;

  margin-top: clamp(4rem, 10vw, 9rem);

  border-top: 1px solid var(--color-border);
}

.story__detail {
  display: grid;
  grid-template-columns: 2rem 1fr;
  gap: 1rem;

  padding: 1rem 0;

  border-bottom: 1px solid var(--color-border);
}

.story__detail-label {
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  opacity: 0.55;
}

.story__detail-text {
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

@media (max-width: 900px) {
  .story__header {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .story__eyebrow {
    padding-top: 0;
  }

  .story__content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .story__image-wrapper {
    height: 75svh;
    min-height: 30rem;
  }

  .story__copy {
    padding-top: 0;
  }

  .story__paragraphs {
    max-width: 40rem;
  }

  .story__details {
    max-width: 40rem;
    margin-top: 4rem;
  }
}

@media (max-width: 600px) {
  .story__title {
    font-size: clamp(3.5rem, 18vw, 6rem);
  }

  .story__image-wrapper {
    height: 65svh;
    min-height: 26rem;
  }

  .story__paragraphs p:first-child {
    font-size: 2rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .story__title-word,
  .story__eyebrow,
  .story__paragraphs,
  .story__details {
    opacity: 1 !important;
    transform: none !important;
  }

  .story__image-wrapper,
  .story__image {
    transform: none !important;
  }
}
</style>
