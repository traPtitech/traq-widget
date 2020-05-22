import { Store as IDBStore, get, set } from 'idb-keyval'
import { apis } from './apis'
import { User, MyUserDetail, UserGroup, Channel, Stamp } from '@traptitech/traq'

/**
 * IndexedDBに保存されるキャッシュ
 * 取得が1日以内なら使いまわす
 *
 * **キー: 内容**
 * - updatedAt: 最終取得日時のミリ秒(`Date.now()`)
 * - userIdMap: userId/UserのMap
 * - userNameMap: username/UserのMap
 * - me: MyUserDetail
 * - userGroupIdMap: userGroupId/UserGroupのMap
 * - channelIdMap: channelId/ChannelのMap (公開チャンネルに限る)
 * - stampNameMap: stampName/StampのMap
 */
const store = new IDBStore('widget-store', 'widget-store')

const isCacheAvailable = (date: unknown): boolean => {
  if (typeof date !== 'number' || date < 0) return false
  const msDiff = Date.now() - date
  const dayDiff = msDiff / 1000 / 60 / 60 / 24
  return dayDiff < 1
}

const fetchAndSetUsers = async (): Promise<void> => {
  const users = (await apis.getUsers()).data

  const userIdMap = new Map(users.map(u => [u.id, u]))
  const userNameMap = new Map(users.map(u => [u.name, u]))

  await Promise.all([
    set('userIdMap', userIdMap, store),
    set('userNameMap', userNameMap, store)
  ])
}

const fetchAndSetMe = async (): Promise<void> => {
  const me = (await apis.getMe()).data
  set('me', me, store)
}

const fetchAndSetUserGroups = async (): Promise<void> => {
  const userGroups = (await apis.getUserGroups()).data
  const userGroupIdMap = new Map(userGroups.map(g => [g.id, g]))
  set('userGroupIdMap', userGroupIdMap, store)
}

const fetchAndSetChannels = async (): Promise<void> => {
  const channels = (await apis.getChannels()).data.public
  const channelIdMap = new Map(channels.map(c => [c.id, c]))
  set('channelIdMap', channelIdMap, store)
}

const fetchAndSetStamps = async (): Promise<void> => {
  const stamps = (await apis.getStamps()).data
  const stampNameMap = new Map(stamps.map(s => [s.name, s]))
  set('stampNameMap', stampNameMap, store)
}

const fetchAndSet = async (): Promise<void> => {
  await Promise.all([
    fetchAndSetUsers(),
    fetchAndSetMe(),
    fetchAndSetUserGroups(),
    fetchAndSetChannels(),
    fetchAndSetStamps()
  ])
}

interface Store {
  userIdMap: Map<string, User>
  userNameMap: Map<string, User>
  me: MyUserDetail
  userGroupIdMap: Map<string, UserGroup>
  channelIdMap: Map<string, Channel>
  stampNameMap: Map<string, Stamp>
}

const createStore = async (): Promise<Store> => {
  const [
    userIdMap,
    userNameMap,
    me,
    userGroupIdMap,
    channelIdMap,
    stampNameMap
  ] = await Promise.all([
    get<Map<string, User>>('userIdMap', store),
    get<Map<string, User>>('userNameMap', store),
    get<MyUserDetail>('me', store),
    get<Map<string, UserGroup>>('userGroupIdMap', store),
    get<Map<string, Channel>>('channelIdMap', store),
    get<Map<string, Stamp>>('stampNameMap', store)
  ])
  return {
    userIdMap,
    userNameMap,
    me,
    userGroupIdMap,
    channelIdMap,
    stampNameMap
  }
}

const initStore = async (): Promise<Store> => {
  const updatedAt = await get('updatedAt', store)

  if (!isCacheAvailable(updatedAt)) {
    await fetchAndSet()
    await set('updatedAt', Date.now(), store)
  }

  return createStore()
}

let _store: Store | undefined

export const getStore = async (): Promise<Store> => {
  if (_store) return _store
  _store = await initStore()
  return _store
}
