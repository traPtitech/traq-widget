import { html, TemplateResult } from 'lit-html'
import { until } from 'lit-html/directives/until'
import { apis } from '../apis'

import './Login.scss'

export const Login = (): TemplateResult =>
  html`${until(InnerLogin(), html`<aside id="login"><p>Loading...</p></aside>`)}`

const InnerLogin = async (): Promise<TemplateResult> => {
  try {
    await apis.getMe()

    return html`<aside id="login"><p>デバッグ用表示: ログイン済み</p></aside>`
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
      location.reload()
    } catch (e) {
      console.error('ログインに失敗しました', e)
    }
  }

  return html`
    <aside id="login">
      <p>デバッグ用ログイン</p>
      <form @submit=${login}>
        <input name="id" type="text" />
        <input name="pass" type="password" />
        <button type="submit">Login</button>
      </form>
    </aside>
  `
}
