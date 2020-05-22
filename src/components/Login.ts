import { html, TemplateResult } from 'lit-html'
import { until } from 'lit-html/directives/until.js'
import { rerender } from '../main'
import { apis } from '../apis'

export const Login = (): TemplateResult =>
  html`${until(InnerLogin(), html`<p>Loading...</p>`)}`

const InnerLogin = async (): Promise<TemplateResult> => {
  try {
    await apis.getMe()

    return html`<p>デバッグ用表示: ログイン済み</p>`
    // eslint-disable-next-line no-empty
  } catch {}

  const login = async (e: Event) => {
    e.preventDefault()

    const $form = e.currentTarget as HTMLFormElement
    const $id = $form.querySelector('[name="id"]') as HTMLInputElement
    const $pass = $form.querySelector('[name="pass"]') as HTMLInputElement

    try {
      await apis.login(undefined, {
        name: $id.value,
        password: $pass.value
      })
      rerender()
    } catch (e) {
      console.error('ログインに失敗しました', e)
    }
  }

  return html`
    <p>デバッグ用ログイン</p>
    <form @submit=${login}>
      <input name="id" type="text" />
      <input name="pass" type="password" />
      <button type="submit">Login</button>
    </form>
  `
}
