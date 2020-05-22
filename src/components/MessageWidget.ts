import { html, TemplateResult } from 'lit-html'
import { until } from 'lit-html/directives/until.js'
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js'
import { apis } from '../apis'
import { render } from '../markdown'
import { getStore } from '../store'

export const MessageWidget = (params: URLSearchParams): TemplateResult =>
  html`${until(
    InnerMessageWidget(params),
    html`
      <div class="message" data-is-loading>
        <span class="loading">Now Loading</span>
      </div>
    `
  )}`

const InnerMessageWidget = async (
  params: URLSearchParams
): Promise<TemplateResult> => {
  const id = params.get('id')
  if (id === null) {
    return html`
      <div class="message" data-is-error>
        <span class="error">IDが存在しません</span>
      </div>
    `
  }

  try {
    const message = (await apis.getMessage(id)).data
    const rendered = await render(message.content)

    const store = await getStore()
    const user = store.userIdMap.get(message.userId)

    return html`
      <div>
        <div>${user?.displayName}(@${user?.name})</div>
        <div>${unsafeHTML(rendered.renderedText)}</div>
      </div>
    `
  } catch {
    return html`
      <div class="message" data-is-error>
        <span class="error">メッセージ(ID: ${id})の取得に失敗しました</span>
      </div>
    `
  }
}
