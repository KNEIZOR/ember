import Lenis from 'lenis'

let lenis: Lenis | null = null
let rafId: number | null = null

export const initSmoothScroll = (): Lenis => {
  if (lenis) {
    return lenis
  }

  lenis = new Lenis({
    autoRaf: false,
    smoothWheel: true,
    lerp: 0.08,
  })

  const raf = (time: number) => {
    lenis?.raf(time)

    rafId = requestAnimationFrame(raf)
  }

  rafId = requestAnimationFrame(raf)

  return lenis
}

export const getLenis = (): Lenis | null => lenis

export const scrollToAnchor = (href: string, offset = 0): void => {
  if (!href.startsWith('#')) {
    return
  }

  const target = document.querySelector(href)

  if (!target) {
    return
  }

  if (!lenis) {
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })

    return
  }

  lenis.scrollTo(target as HTMLElement, {
    offset,
    duration: 1.4,
    easing: (value: number) => Math.min(1, 1.001 - Math.pow(2, -10 * value)),
  })
}

export const destroySmoothScroll = (): void => {
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }

  lenis?.destroy()
  lenis = null
}
