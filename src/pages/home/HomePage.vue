<script setup lang="ts">
import HeaderNavigation from '@/widgets/header/HeaderNavigation.vue'
import HeroSection from '@/widgets/hero/HeroSection.vue'
import MenuSection from '@/widgets/menu/MenuSection.vue'
import SignatureCoffeeSection from '@/widgets/signature/SignatureCoffeeSection.vue'
import StorySection from '@/widgets/story/StorySection.vue'
import CoffeeProcessSection from '@/widgets/coffee-process/CoffeeProcessSection.vue'

import { useSmoothScroll } from '@/shared/composables/useSmoothScroll'
import BakerySection from '@/widgets/bakery/BakerySection.vue'

useSmoothScroll()
</script>

<template>
  <div class="home-page">
    <HeaderNavigation />

    <main>
      <HeroSection />
      <StorySection />
      <SignatureCoffeeSection />
      <MenuSection />
      <CoffeeProcessSection />
      <BakerySection />

      <section id="visit" class="home-page__placeholder">
        <span>06</span>
        <h2>Visit us.</h2>
      </section>
    </main>
  </div>
</template>

<style scoped lang="scss">
.home-page {
  min-height: 100vh;
}

.home-page__placeholder {
  min-height: 100svh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  padding: var(--section-padding);

  background: var(--color-bg);
}

.home-page__placeholder span {
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.home-page__placeholder h2 {
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 8rem);
  font-weight: 400;
  letter-spacing: -0.04em;
}
</style>
