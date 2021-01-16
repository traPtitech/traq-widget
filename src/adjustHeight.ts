import { debounce } from 'throttle-debounce'

export const adjust = (): void =>
  window.parent.postMessage(
    [location.href, 32 + document.body.getBoundingClientRect().height],
    '*'
  )

// for no scrollbar
export const setAdjustHandler = (): void => {
  if (window.parent) {
    window.addEventListener('load', adjust)
    new ResizeObserver(debounce(100, adjust)).observe(document.body)
  }
}
