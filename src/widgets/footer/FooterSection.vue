<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

import { gsap, ScrollTrigger } from '@/shared/animations/gsap'

const footer = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const navigation = ref<HTMLElement | null>(null)
const contact = ref<HTMLElement | null>(null)
const bottom = ref<HTMLElement | null>(null)

let context: gsap.Context | null = null

onMounted(async () => {
  await nextTick()

  if (!footer.value || !title.value || !navigation.value || !contact.value || !bottom.value) {
    return
  }

  context = gsap.context(() => {
    const titleLetters = title.value?.querySelectorAll('.footer__title-letter')

    if (!titleLetters || titleLetters.length === 0) {
      return
    }

    gsap.set(titleLetters, {
      yPercent: 110,
      opacity: 0,
    })

    gsap.set(navigation.value, {
      y: 35,
      opacity: 0,
    })

    gsap.set(contact.value, {
      y: 35,
      opacity: 0,
    })

    gsap.set(bottom.value, {
      y: 20,
      opacity: 0,
    })

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: footer.value,
        start: 'top 78%',
        end: 'top 35%',
        scrub: 1,
      },
    })

    timeline
      .to(titleLetters, {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.035,
        ease: 'power4.out',
      })
      .to(
        navigation.value,
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
        },
        '-=0.45',
      )
      .to(
        contact.value,
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
        },
        '-=0.55',
      )
      .to(
        bottom.value,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.45',
      )

    gsap.to(title.value, {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: footer.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    })

    ScrollTrigger.refresh()
  }, footer.value)
})

onBeforeUnmount(() => {
  context?.revert()
  context = null
})
</script>

<template>
  <footer ref="footer" class="footer">
    <div class="footer__container">
      <div class="footer__hero">
        <span class="footer__eyebrow"> See you soon </span>

        <h2 ref="title" class="footer__title" aria-label="EMBER">
          <span
            v-for="(letter, index) in ['E', 'M', 'B', 'E', 'R']"
            :key="`${letter}-${index}`"
            class="footer__title-letter"
          >
            {{ letter }}
          </span>
        </h2>
      </div>

      <div class="footer__grid">
        <nav ref="navigation" class="footer__column" aria-label="Footer navigation">
          <span class="footer__label"> Explore </span>

          <a href="#story"> Our story </a>

          <a href="#menu"> Menu </a>

          <a href="#visit"> Visit us </a>
        </nav>

        <div ref="contact" class="footer__column">
          <span class="footer__label"> Find us </span>

          <address>
            24 Rue du Café
            <br />
            75011 Paris, France
          </address>

          <a href="mailto:hello@ember.cafe"> hello@ember.cafe </a>
        </div>

        <div class="footer__column footer__column--social">
          <span class="footer__label"> Follow </span>

          <a href="#" aria-label="Instagram"> Instagram </a>

          <a href="#" aria-label="Facebook"> Facebook </a>
        </div>
      </div>

      <div ref="bottom" class="footer__bottom">
        <span> © {{ new Date().getFullYear() }} EMBER </span>

        <span> Coffee & bakery </span>

        <span> Paris </span>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  position: relative;

  min-height: 100svh;
  overflow: hidden;

  padding: clamp(5rem, 10vw, 10rem) 0 2rem;

  background: #171411;
  color: var(--color-text-light);
}

.footer__container {
  width: min(100%, var(--container-width));
  min-height: calc(100svh - 2rem);

  margin: 0 auto;
  padding: 0 var(--container-padding);

  display: flex;
  flex-direction: column;
}

.footer__hero {
  display: flex;
  flex-direction: column;

  margin-bottom: auto;
}

.footer__eyebrow {
  margin-bottom: clamp(2rem, 4vw, 4rem);

  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;

  opacity: 0.55;
}

.footer__title {
  display: flex;

  margin: 0;

  overflow: hidden;

  font-family: var(--font-display);
  font-size: clamp(7rem, 25vw, 26rem);
  font-weight: 400;
  line-height: 0.65;
  letter-spacing: -0.09em;

  will-change: transform;
}

.footer__title-letter {
  display: inline-block;

  will-change: transform, opacity;
}

.footer__grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  gap: 3rem;

  margin-top: clamp(5rem, 10vw, 10rem);
  padding-top: 2rem;

  border-top: 1px solid rgba(255, 255, 255, 0.18);
}

.footer__column {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.65rem;

  font-size: 0.72rem;
  line-height: 1.5;
}

.footer__label {
  margin-bottom: 0.75rem;

  font-size: 0.6rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;

  opacity: 0.4;
}

.footer__column a {
  position: relative;

  width: fit-content;
}

.footer__column a::after {
  position: absolute;
  right: 0;
  bottom: -0.15rem;
  left: 0;

  height: 1px;

  content: '';

  background: currentColor;

  transform: scaleX(0);
  transform-origin: right center;

  transition: transform var(--transition-fast);
}

.footer__column a:hover::after {
  transform: scaleX(1);
  transform-origin: left center;
}

.footer__column address {
  margin-bottom: 0.5rem;

  font-style: normal;
}

.footer__bottom {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  padding-top: 2rem;
  margin-top: 4rem;

  border-top: 1px solid rgba(255, 255, 255, 0.1);

  font-size: 0.58rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;

  opacity: 0.45;
}

.footer__bottom span:nth-child(2) {
  text-align: center;
}

.footer__bottom span:last-child {
  text-align: right;
}

@media (max-width: 700px) {
  .footer {
    min-height: auto;
  }

  .footer__container {
    min-height: auto;
  }

  .footer__title {
    font-size: clamp(5rem, 25vw, 10rem);
  }

  .footer__grid {
    grid-template-columns: 1fr 1fr;
  }

  .footer__column--social {
    grid-column: 1 / -1;
  }

  .footer__bottom {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .footer__bottom span:nth-child(2) {
    text-align: right;
  }

  .footer__bottom span:last-child {
    grid-column: 1 / -1;

    text-align: left;
  }
}

@media (max-width: 450px) {
  .footer__grid {
    grid-template-columns: 1fr;
  }

  .footer__column--social {
    grid-column: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .footer__title,
  .footer__title-letter {
    transform: none !important;
  }

  .footer__title-letter,
  .footer__grid,
  .footer__bottom {
    opacity: 1 !important;
  }
}
</style>
