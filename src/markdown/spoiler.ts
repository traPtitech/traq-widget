export const toggleSpoiler = (element: HTMLElement): void => {
  const $spoiler = element.closest('.spoiler')
  $spoiler?.toggleAttribute('shown')
}
