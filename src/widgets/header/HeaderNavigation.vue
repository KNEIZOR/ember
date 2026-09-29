<script setup lang="ts">
import { ref } from 'vue'

const isMenuOpen = ref(false)

const navigationItems = [
  {
    label: 'Menu',
    href: '#menu',
  },
  {
    label: 'Our Story',
    href: '#story',
  },
  {
    label: 'Visit',
    href: '#visit',
  },
]

const toggleMenu = (): void => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = (): void => {
  isMenuOpen.value = false
}
</script>

<template>
  <header class="header" :class="{ 'header--menu-open': isMenuOpen }">
    <a class="header__logo" href="/" aria-label="EMBER home" @click="closeMenu"> EMBER </a>

    <nav class="header__navigation">
      <a v-for="item in navigationItems" :key="item.href" class="header__link" :href="item.href">
        <span class="header__link-label">{{ item.label }}</span>
        <span class="header__link-line" />
      </a>
    </nav>

    <a class="header__cta" href="#visit">
      <span>Find us</span>
      <span class="header__cta-arrow">↗</span>
    </a>

    <button
      class="header__menu-button"
      type="button"
      :aria-expanded="isMenuOpen"
      aria-label="Toggle navigation"
      @click="toggleMenu"
    >
      <span />
      <span />
    </button>

    <Transition name="mobile-menu">
      <div v-if="isMenuOpen" class="header__mobile-menu">
        <nav class="header__mobile-navigation">
          <a
            v-for="(item, index) in navigationItems"
            :key="item.href"
            class="header__mobile-link"
            :href="item.href"
            @click="closeMenu"
          >
            <span class="header__mobile-number"> 0{{ index + 1 }} </span>

            <span>{{ item.label }}</span>
          </a>
        </nav>

        <a class="header__mobile-cta" href="#visit" @click="closeMenu">
          Find us
          <span>↗</span>
        </a>
      </div>
    </Transition>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: fixed;
  z-index: var(--z-header);
  top: 0;
  left: 0;

  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;

  width: 100%;
  padding: 1.75rem var(--container-padding);

  color: var(--color-text-light);

  mix-blend-mode: difference;
}

.header__logo {
  justify-self: start;

  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.18em;
}

.header__navigation {
  display: flex;
  align-items: center;
  gap: clamp(1.5rem, 3vw, 3.5rem);
}

.header__link {
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  overflow: hidden;

  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.header__link-label {
  transition: transform var(--transition-fast);
}

.header__link-line {
  width: 100%;
  height: 1px;

  background: currentColor;

  transform: translateX(-105%);
  transition: transform var(--transition-fast);
}

.header__link:hover .header__link-line {
  transform: translateX(0);
}

.header__link:hover .header__link-label {
  transform: translateY(-1px);
}

.header__cta {
  justify-self: end;

  display: flex;
  align-items: center;
  gap: 0.6rem;

  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.header__cta-arrow {
  font-size: 1rem;
  transition: transform var(--transition-fast);
}

.header__cta:hover .header__cta-arrow {
  transform: translate(3px, -3px);
}

.header__menu-button,
.header__mobile-menu {
  display: none;
}

@media (max-width: 768px) {
  .header {
    display: flex;
    justify-content: space-between;

    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
  }

  .header__navigation,
  .header__cta {
    display: none;
  }

  .header__menu-button {
    position: relative;
    z-index: calc(var(--z-header) + 2);

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.35rem;

    width: 2.5rem;
    height: 2.5rem;

    cursor: pointer;
  }

  .header__menu-button span {
    display: block;

    width: 100%;
    height: 1px;

    background: currentColor;

    transition:
      transform var(--transition-fast),
      opacity var(--transition-fast);
  }

  .header--menu-open .header__menu-button span:first-child {
    transform: translateY(3px) rotate(45deg);
  }

  .header--menu-open .header__menu-button span:last-child {
    transform: translateY(-3px) rotate(-45deg);
  }

  .header__mobile-menu {
    position: fixed;
    z-index: var(--z-header);

    inset: 0;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding: 7rem var(--container-padding) 2rem;

    background: var(--color-bg-dark);
    color: var(--color-text-light);

    mix-blend-mode: normal;
  }

  .header__mobile-navigation {
    display: flex;
    flex-direction: column;
  }

  .header__mobile-link {
    display: flex;
    align-items: baseline;
    gap: 1.5rem;

    padding: 1rem 0;

    border-bottom: 1px solid rgba(241, 237, 229, 0.15);

    font-family: var(--font-display);
    font-size: clamp(2.5rem, 12vw, 5rem);
    line-height: 1;
  }

  .header__mobile-number {
    width: 1.5rem;

    font-family: var(--font-body);
    font-size: 0.6rem;
    letter-spacing: 0.1em;
  }

  .header__mobile-cta {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 1rem 0;

    border-bottom: 1px solid rgba(241, 237, 229, 0.3);

    font-size: 0.7rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .header__mobile-cta span {
    font-size: 1.1rem;
  }

  .mobile-menu-enter-active,
  .mobile-menu-leave-active {
    transition:
      opacity 400ms ease,
      transform 500ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .mobile-menu-enter-from,
  .mobile-menu-leave-to {
    opacity: 0;
    transform: translateY(-20px);
  }
}
</style>
