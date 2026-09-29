import Lenis from 'lenis'

let lenis: Lenis | null = null

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
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  return lenis
}

export const getLenis = (): Lenis | null => lenis

export const destroySmoothScroll = (): void => {
  lenis?.destroy()
  lenis = null
}
