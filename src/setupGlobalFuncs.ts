import { openChannelLink } from './markdown/channelLink'
import { toggleSpoiler } from './markdown/spoiler'

export const setupGlobalFuncs = (): void => {
  document.body.addEventListener('click', e => {
    openChannelLink(e)
  })

  document.body.addEventListener('click', e => {
    toggleSpoiler(e.target as HTMLElement)
  })
}
