<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

import { gsap, ScrollTrigger } from '@/shared/animations/gsap'

type MenuItem = {
  name: string
  description: string
  price: string
}

type MenuCategory = {
  number: string
  title: string
  items: MenuItem[]
}

const menuCategories: MenuCategory[] = [
  {
    number: '01',
    title: 'Coffee',
    items: [
      {
        name: 'Espresso',
        description: 'Double shot · House blend',
        price: '€3.20',
      },
      {
        name: 'Flat white',
        description: 'Double espresso · Steamed milk',
        price: '€4.50',
      },
      {
        name: 'Filter',
        description: 'Seasonal single origin',
        price: '€5.00',
      },
      {
        name: 'Cold brew',
        description: '18h extraction · Served cold',
        price: '€4.80',
      },
    ],
  },
  {
    number: '02',
    title: 'Bakery',
    items: [
      {
        name: 'Butter croissant',
        description: 'French butter · Laminated daily',
        price: '€3.80',
      },
      {
        name: 'Pain au chocolat',
        description: 'Dark chocolate · Cultured butter',
        price: '€4.20',
      },
      {
        name: 'Cardamom bun',
        description: 'Green cardamom · Brown sugar',
        price: '€4.50',
      },
      {
        name: 'Seasonal tart',
        description: 'Market fruit · Vanilla cream',
        price: '€5.50',
      },
    ],
  },
  {
    number: '03',
    title: 'Something more',
    items: [
      {
        name: 'House granola',
        description: 'Yoghurt · Seasonal fruit · Honey',
        price: '€7.50',
      },
      {
        name: 'Sourdough toast',
        description: 'Cultured butter · Seasonal preserve',
        price: '€6.50',
      },
      {
        name: 'Morning plate',
        description: 'Eggs · Sourdough · Greens',
        price: '€11.00',
      },
    ],
  },
]

const section = ref<HTMLElement | null>(null)
const eyebrow = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const intro = ref<HTMLElement | null>(null)

let context: gsap.Context | null = null

onMounted(async () => {
  await nextTick()

  if (!section.value || !eyebrow.value || !title.value || !intro.value) {
    return
  }

  context = gsap.context(() => {
    const titleWords = title.value?.querySelectorAll('.menu__title-word')

    const menuRows = section.value?.querySelectorAll('.menu__item')

    const categories = section.value?.querySelectorAll('.menu__category')

    if (!titleWords || !menuRows || !categories) {
      return
    }

    gsap.set(eyebrow.value, {
      y: 20,
      opacity: 0,
    })

    gsap.set(titleWords, {
      yPercent: 110,
      opacity: 0,
    })

    gsap.set(intro.value, {
      y: 25,
      opacity: 0,
    })

    gsap.set(categories, {
      y: 45,
      opacity: 0,
    })

    gsap.set(menuRows, {
      y: 20,
      opacity: 0,
    })

    const introTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section.value,
        start: 'top 72%',
        once: true,
      },
    })

    introTimeline
      .to(
        eyebrow.value,
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
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
          stagger: 0.1,
          ease: 'power4.out',
        },
        0.1,
      )
      .to(
        intro.value,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
        },
        0.35,
      )
      .to(
        categories,
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
        },
        0.45,
      )

    categories.forEach((category) => {
      const rows = category.querySelectorAll('.menu__item')

      gsap.to(rows, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: category,
          start: 'top 82%',
          once: true,
        },
      })
    })

    gsap.to(title.value, {
      yPercent: -8,
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
  <section id="menu" ref="section" class="menu">
    <div class="menu__container">
      <div class="menu__header">
        <span ref="eyebrow" class="menu__eyebrow"> 03 — The menu </span>

        <div ref="title" class="menu__title" aria-label="Simple things, done well.">
          <span class="menu__title-line">
            <span class="menu__title-word"> Simple things, </span>
          </span>

          <span class="menu__title-line">
            <span class="menu__title-word"> done well. </span>
          </span>
        </div>
      </div>

      <div ref="intro" class="menu__intro">
        <p>
          Our menu follows the seasons. A small selection, prepared carefully and changed when it
          feels right.
        </p>

        <span class="menu__intro-note"> Served daily · 08:00 — 18:00 </span>
      </div>

      <div class="menu__categories">
        <article v-for="category in menuCategories" :key="category.number" class="menu__category">
          <header class="menu__category-header">
            <span class="menu__category-number">
              {{ category.number }}
            </span>

            <h2 class="menu__category-title">
              {{ category.title }}
            </h2>
          </header>

          <div class="menu__items">
            <div v-for="item in category.items" :key="item.name" class="menu__item">
              <div class="menu__item-main">
                <h3 class="menu__item-name">
                  {{ item.name }}
                </h3>

                <p class="menu__item-description">
                  {{ item.description }}
                </p>
              </div>

              <span class="menu__item-price">
                {{ item.price }}
              </span>
            </div>
          </div>
        </article>
      </div>

      <div class="menu__footer">
        <span>Everything is prepared in-house.</span>

        <a href="#visit" class="menu__link">
          Visit EMBER
          <span>↗</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.menu {
  position: relative;

  overflow: hidden;

  padding: var(--section-padding) 0;

  background: var(--color-bg);
  color: var(--color-text);
}

.menu__container {
  width: min(100%, var(--container-width));
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.menu__header {
  display: grid;
  grid-template-columns: minmax(8rem, 0.25fr) minmax(0, 1fr);

  margin-bottom: clamp(3rem, 7vw, 7rem);
}

.menu__eyebrow {
  padding-top: 0.75rem;

  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.menu__title {
  max-width: 1000px;

  font-family: var(--font-display);
  font-size: clamp(4rem, 9vw, 9rem);
  font-weight: 400;
  line-height: 0.82;
  letter-spacing: -0.055em;

  will-change: transform;
}

.menu__title-line {
  display: block;

  overflow: hidden;
}

.menu__title-word {
  display: inline-block;
}

.menu__intro {
  display: grid;
  grid-template-columns: minmax(8rem, 0.25fr) minmax(0, 0.75fr);
  gap: 2rem;

  margin-bottom: clamp(5rem, 10vw, 10rem);
}

.menu__intro p {
  grid-column: 2;

  max-width: 34rem;

  font-family: var(--font-display);
  font-size: clamp(1.5rem, 2.5vw, 2.5rem);
  line-height: 1.1;
  letter-spacing: -0.025em;
}

.menu__intro-note {
  grid-column: 2;

  margin-top: 1.5rem;

  font-size: 0.6rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;

  opacity: 0.55;
}

.menu__categories {
  display: flex;
  flex-direction: column;
}

.menu__category {
  display: grid;
  grid-template-columns: minmax(8rem, 0.25fr) minmax(0, 0.75fr);

  padding: clamp(2.5rem, 5vw, 5rem) 0;

  border-top: 1px solid var(--color-border);
}

.menu__category:last-child {
  border-bottom: 1px solid var(--color-border);
}

.menu__category-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.menu__category-number {
  font-size: 0.6rem;
  letter-spacing: 0.12em;

  opacity: 0.5;
}

.menu__category-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 4rem);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: -0.035em;
}

.menu__items {
  display: flex;
  flex-direction: column;
}

.menu__item {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 2rem;

  padding: 1.5rem 0;

  border-bottom: 1px solid rgba(23, 21, 19, 0.08);

  transition:
    padding var(--transition-fast),
    background-color var(--transition-fast);
}

.menu__item:first-child {
  padding-top: 0;
}

.menu__item:last-child {
  border-bottom: 0;
}

.menu__item:hover {
  padding-right: 0.75rem;
}

.menu__item-main {
  min-width: 0;
}

.menu__item-name {
  margin-bottom: 0.4rem;

  font-family: var(--font-display);
  font-size: clamp(1.4rem, 2.2vw, 2.1rem);
  font-weight: 400;
  line-height: 1;
  letter-spacing: -0.02em;
}

.menu__item-description {
  font-size: 0.65rem;
  line-height: 1.5;
  letter-spacing: 0.04em;

  opacity: 0.55;
}

.menu__item-price {
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.08em;
}

.menu__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  margin-top: 2rem;
  padding-top: 2rem;

  font-size: 0.6rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.menu__footer > span {
  opacity: 0.55;
}

.menu__link {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
}

.menu__link span {
  font-size: 1rem;

  transition: transform var(--transition-fast);
}

.menu__link:hover span {
  transform: translate(3px, -3px);
}

@media (max-width: 900px) {
  .menu__header {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .menu__eyebrow {
    padding-top: 0;
  }

  .menu__intro {
    grid-template-columns: 1fr;
  }

  .menu__intro p,
  .menu__intro-note {
    grid-column: 1;
  }

  .menu__category {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

@media (max-width: 600px) {
  .menu__title {
    font-size: clamp(3.5rem, 18vw, 6rem);
  }

  .menu__intro p {
    font-size: 1.8rem;
  }

  .menu__item {
    gap: 1rem;
  }

  .menu__item-description {
    max-width: 16rem;
  }

  .menu__footer {
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (prefers-reduced-motion: reduce) {
  .menu__eyebrow,
  .menu__title-word,
  .menu__intro,
  .menu__category,
  .menu__item {
    opacity: 1 !important;
    transform: none !important;
  }

  .menu__title {
    transform: none !important;
  }
}
</style>
