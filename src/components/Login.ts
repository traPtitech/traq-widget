import { html, TemplateResult } from 'lit-html'
import { until } from 'lit-html/directives/until.js'
import { createRef, ref } from 'lit-html/directives/ref.js'
import { apis } from '../apis'

import './Login.scss'

export const Login = (): TemplateResult =>
  html`${until(
    InnerLogin(),
    html`<aside id="login"><p>Loading...</p></aside>`
  )}`

const InnerLogin = async (): Promise<TemplateResult> => {
  try {
    await apis.getMe()

    return html`<aside id="login"><p>デバッグ用表示: ログイン済み</p></aside>`
    // eslint-disable-next-line no-empty
  } catch {}

  const idRef = createRef<HTMLInputElement>()
  const passRef = createRef<HTMLInputElement>()

  const login = async (e: Event) => {
    if (!idRef.value || !passRef.value) return
    e.preventDefault()

    try {
      await apis.login(undefined, {
        name: idRef.value.value,
        password: passRef.value.value
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
        <input ${ref(idRef)} name="id" type="text" />
        <input ${ref(passRef)} name="pass" type="password" />
        <button type="submit">Login</button>
      </form>
    </aside>
  `
}
