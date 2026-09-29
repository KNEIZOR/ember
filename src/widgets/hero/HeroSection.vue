<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

import { gsap, ScrollTrigger } from '@/shared/animations/gsap'

const hero = ref<HTMLElement | null>(null)
const heroImage = ref<HTMLElement | null>(null)
const heroContent = ref<HTMLElement | null>(null)
const eyebrow = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const description = ref<HTMLElement | null>(null)
const scrollIndicator = ref<HTMLElement | null>(null)

let context: gsap.Context | null = null

const animateHero = async (): Promise<void> => {
  await nextTick()

  if (!hero.value || !title.value) {
    return
  }

  context = gsap.context(() => {
    const titleLetters = title.value?.querySelectorAll('.hero__title-word')

    if (!titleLetters || titleLetters.length === 0) {
      return
    }

    const timeline = gsap.timeline({
      defaults: {
        ease: 'power4.out',
      },
    })

    gsap.set(heroImage.value, {
      scale: 1.14,
    })

    gsap.set(eyebrow.value, {
      y: 30,
      opacity: 0,
    })

    gsap.set(titleLetters, {
      yPercent: 110,
      opacity: 0,
    })

    gsap.set(description.value, {
      y: 25,
      opacity: 0,
    })

    gsap.set(scrollIndicator.value, {
      y: 20,
      opacity: 0,
    })

    timeline
      .to(heroImage.value, {
        scale: 1,
        duration: 1.8,
        ease: 'power3.out',
      })
      .to(
        eyebrow.value,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
        },
        '-=1.25',
      )
      .to(
        titleLetters,
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.12,
        },
        '-=0.45',
      )
      .to(
        description.value,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
        },
        '-=0.55',
      )
      .to(
        scrollIndicator.value,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
        },
        '-=0.4',
      )

    if (heroImage.value && hero.value) {
      gsap.to(heroImage.value, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: hero.value,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }

    if (heroContent.value && hero.value) {
      gsap.to(heroContent.value, {
        yPercent: -18,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: hero.value,
          start: 'top top',
          end: '75% top',
          scrub: true,
        },
      })
    }

    ScrollTrigger.refresh()
  }, hero.value)
}

onMounted(() => {
  void animateHero()
})

onBeforeUnmount(() => {
  context?.revert()
})
</script>

<template>
  <section ref="hero" class="hero" aria-labelledby="hero-title">
    <div ref="heroImage" class="hero__image" aria-hidden="true" />

    <div class="hero__overlay" aria-hidden="true" />

    <div ref="heroContent" class="hero__content">
      <p ref="eyebrow" class="hero__eyebrow">Specialty coffee & bakery</p>

      <h1 id="hero-title" ref="title" class="hero__title">
        <span class="hero__title-word">EMBER</span>
      </h1>

      <p ref="description" class="hero__description">Coffee worth slowing down for.</p>
    </div>

    <div ref="scrollIndicator" class="hero__scroll">
      <span class="hero__scroll-label"> Scroll to explore </span>

      <span class="hero__scroll-line">
        <span class="hero__scroll-progress" />
      </span>
    </div>

    <div class="hero__location">
      <span>Paris</span>
      <span>48°51′N</span>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  position: relative;

  min-height: 100svh;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #24201c;
  color: var(--color-text-light);
}

.hero__image {
  position: absolute;
  inset: -12% 0;

  background-image: url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=2200&q=90');
  background-position: center;
  background-size: cover;

  will-change: transform;
}

.hero__overlay {
  position: absolute;
  inset: 0;

  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.08) 35%,
    rgba(0, 0, 0, 0.3) 100%
  );
}

.hero__content {
  position: relative;
  z-index: 2;

  width: min(calc(100% - 2 * var(--container-padding)), var(--container-width));

  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;

  will-change: transform, opacity;
}

.hero__eyebrow {
  margin-bottom: clamp(1.5rem, 3vw, 2.5rem);

  font-size: clamp(0.65rem, 0.8vw, 0.8rem);
  font-weight: 500;
  letter-spacing: 0.24em;
  line-height: 1.2;
  text-transform: uppercase;
}

.hero__title {
  margin: 0;

  overflow: hidden;

  font-family: var(--font-display);
  font-size: clamp(7rem, 22vw, 22rem);
  font-weight: 400;
  letter-spacing: -0.075em;
  line-height: 0.72;
}

.hero__title-word {
  display: block;
}

.hero__description {
  margin-top: clamp(2rem, 4vw, 3.5rem);

  font-family: var(--font-display);
  font-size: clamp(1.3rem, 2.2vw, 2.2rem);
  font-weight: 400;
  line-height: 1;
}

.hero__scroll {
  position: absolute;
  z-index: 2;
  bottom: 2rem;
  left: var(--container-padding);

  display: flex;
  align-items: center;
  gap: 1rem;

  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.hero__scroll-line {
  position: relative;

  display: block;

  width: clamp(3rem, 6vw, 6rem);
  height: 1px;

  overflow: hidden;

  background: rgba(255, 255, 255, 0.35);
}

.hero__scroll-progress {
  position: absolute;
  inset: 0;

  width: 35%;

  background: currentColor;

  animation: scroll-progress 2s ease-in-out infinite;
}

.hero__location {
  position: absolute;
  z-index: 2;
  right: var(--container-padding);
  bottom: 2rem;

  display: flex;
  gap: 1rem;

  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

@keyframes scroll-progress {
  0% {
    transform: translateX(-120%);
  }

  50% {
    transform: translateX(280%);
  }

  100% {
    transform: translateX(280%);
  }
}

@media (max-width: 768px) {
  .hero__image {
    background-position: 58% center;
  }

  .hero__title {
    font-size: clamp(5.5rem, 27vw, 10rem);
  }

  .hero__description {
    max-width: 18rem;
  }

  .hero__location {
    display: none;
  }

  .hero__scroll {
    right: var(--container-padding);
    justify-content: space-between;
  }

  .hero__scroll-line {
    flex: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__scroll-progress {
    animation: none;
  }
}
</style>
