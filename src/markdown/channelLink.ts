export const openChannelLink = (e: MouseEvent): void => {
  const $a = (e.target as HTMLElement).closest<HTMLAnchorElement>(
    'a.message-channel-link'
  )
  if (!$a) return

  // 同じタブで開かない場合は無視
  if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return
  if (e.button !== undefined && e.button !== 0) return

  e.preventDefault()

  // 先頭の/を消す
  const channelPath = $a.pathname.slice(1)

  if (!confirm(`traQで#${channelPath}を開きますか？`)) return
  window.open($a.href, '_blank')
}
