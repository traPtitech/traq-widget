import { toggleSpoiler } from "./markdown/spoiler"

interface ExtendedWindow extends Window {
  openUserModal(userId: string): void
  openGroupModal(userGroupId: string): void
  changeChannel(channelPath: string): void
}
declare const window: ExtendedWindow

export const setupGlobalFuncs = (): void => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  window.openUserModal = (_userId: string): void => {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  window.openGroupModal = (_userGroupId: string): void => {}

  window.changeChannel = (channelPath: string) => {
    if (!confirm(`traQで#${channelPath}を開きますか？`)) return
    window.open(`https://q.trap.jp/channels/${channelPath}`, '_blank')
  }

  document.body.addEventListener('click', e => {
    toggleSpoiler(e.target as HTMLElement)
  })
}
