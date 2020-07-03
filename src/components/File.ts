import { html, TemplateResult, nothing } from 'lit-html'
import { until } from 'lit-html/directives/until.js'
import { apis, getFileUrl } from '../apis'

import './File.scss'

export const File = (id: string): TemplateResult =>
  html`${until(
    InnerFile(id),
    html`
      <article class="file" data-is-loading>
        <main class="loading">Now Loading</main>
      </article>
    `
  )}`

const InnerFile = async (
  id: string
): Promise<TemplateResult | typeof nothing> => {
  try {
    const file = (await apis.getFileMeta(id)).data

    if (!file.thumbnail) {
      return html`<div class="file">${file.name}</div>`
    }

    return html`
      <figure class="file">
        <img src=${getFileUrl(id)} />
        <figcaption>${file.name}</figcaption>
      </figure>
    `
  } catch {
    return nothing
  }
}
