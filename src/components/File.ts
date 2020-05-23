import { html, TemplateResult, nothing } from 'lit-html'
import { until } from 'lit-html/directives/until.js'
import { apis, getFileUrl } from '../apis'

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

    return html`
      <div class="file">
        <p>${file.name}</p>
        ${file.thumbnail ? html`<img src=${getFileUrl(id)} />` : nothing}
      </div>
    `
  } catch {
    return nothing
  }
}
