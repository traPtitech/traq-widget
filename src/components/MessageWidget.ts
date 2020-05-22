import { html, TemplateResult } from 'lit-html'
import { until } from 'lit-html/directives/until.js'
import { ifDefined } from 'lit-html/directives/if-defined'
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js'
import { apis, getFileUrl } from '../apis'
import { render } from '../markdown'
import { getStore } from '../store'

import '@traptitech/traq-markdown-it/src/css/index.scss'

export const MessageWidget = (params: URLSearchParams): TemplateResult =>
  html`${until(
    InnerMessageWidget(params),
    html`
      <article class="message" data-is-loading>
        <main class="loading">Now Loading</main>
      </article>
    `
  )}`

const InnerMessageWidget = async (
  params: URLSearchParams
): Promise<TemplateResult> => {
  const id = params.get('id')
  if (id === null) {
    return html`
      <article class="message" data-is-error>
        <main class="error">IDが存在しません</main>
      </article>
    `
  }

  try {
    const message = (await apis.getMessage(id)).data
    const rendered = await render(message.content)

    const store = await getStore()
    const user = store.userIdMap.get(message.userId)

    return html`
      <article class="message">
        <header>
          <img src=${ifDefined(getFileUrl(user?.iconFileId))} />
          <p>${user?.displayName}(@${user?.name})</p>
        </header>
        <main class="markdown-body">${unsafeHTML(rendered.renderedText)}</main>
        <footer>
          <a href="https://q.trap.jp/messages/${id}">traQで開く</a>
        </footer>
      </article>
    `
  } catch {
    return html`
      <article class="message" data-is-error>
        <main class="error">メッセージ(ID: ${id})の取得に失敗しました</main>
      </article>
    `
  }
}
