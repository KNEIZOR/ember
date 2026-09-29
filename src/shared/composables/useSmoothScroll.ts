import { onBeforeUnmount, onMounted } from 'vue'

import { destroySmoothScroll, initSmoothScroll } from '@/shared/animations/smoothScroll'

export const useSmoothScroll = (): void => {
  onMounted(() => {
    initSmoothScroll()
  })

  onBeforeUnmount(() => {
    destroySmoothScroll()
  })
}
