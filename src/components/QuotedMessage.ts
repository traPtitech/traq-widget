import { html, TemplateResult, nothing } from 'lit-html'
import { until } from 'lit-html/directives/until.js'
import { ifDefined } from 'lit-html/directives/if-defined.js'
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js'
import { apis, getFileUrl } from '../apis'
import { render } from '../markdown/markdown'
import { getStore } from '../store'

import '../markdown/markdown.scss'
import 'katex/dist/katex.css'
import './QuotedMessage.scss'

export const QuotedMessage = (id: string): TemplateResult =>
  html`${until(
    InnerQuotedMessage(id),
    html`
      <article class="quoted-message message" data-is-loading>
        <main class="loading">Now Loading</main>
      </article>
    `
  )}`

const InnerQuotedMessage = async (
  id: string
): Promise<TemplateResult | typeof nothing> => {
  try {
    const message = (await apis.getMessage(id)).data
    const rendered = await render(message.content)

    const store = await getStore()
    const user = await store.getUser(message.userId)

    return html`
      <article class="quoted-message message">
        <header>
          <img src=${ifDefined(getFileUrl(user?.iconFileId))} />
          <p>${user?.displayName}(@${user?.name})</p>
        </header>
        <main class="markdown-body">${unsafeHTML(rendered.renderedText)}</main>
        <footer></footer>
      </article>
    `
  } catch {
    return nothing
  }
}
