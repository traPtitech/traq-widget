import { debounce } from 'throttle-debounce'

export const adjust = (): void =>
  window.parent.postMessage(
    32 + document.body.getBoundingClientRect().height,
    '*'
  )

// for no scrollbar
export const setAdjustHandler = (): void => {
  if (window.parent) {
    window.addEventListener('load', adjust)
    window.addEventListener('resize', debounce(100, adjust))
  }
}
