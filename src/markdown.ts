import MarkdownIt, {
  MarkdownRenderResult,
  Store
} from '@traptitech/traq-markdown-it'
import { getStore } from './store'

const createMdStore = async (): Promise<Store> => {
  const store = await getStore()
  return {
    getUser: id => store.userIdMap.get(id),
    getChannel: id => store.channelIdMap.get(id),
    getChannelPath: id => {
      let channel = store.channelIdMap.get(id)
      let path = channel?.name ?? 'unknown'
      while (channel?.parentId) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        channel = store.channelIdMap.get(channel!.parentId!)
        path = `${channel?.name ?? 'unknown'}/${path}`
      }
      return path
    },
    getUserGroup: id => store.userGroupIdMap.get(id),
    getMe: () => store.me,
    getStampByName: name => store.stampNameMap.get(name),
    getUserByName: name => store.userNameMap.get(name)
  }
}

export const render = async (text: string): Promise<MarkdownRenderResult> => {
  const store = await createMdStore()
  const md = new MarkdownIt(store, [], 'https://q.trap.jp')
  return md.render(text)
}

export const toggleSpoiler = (element: HTMLElement): void => {
  const $spoiler = element.closest('.spoiler')
  $spoiler?.toggleAttribute('shown')
}
