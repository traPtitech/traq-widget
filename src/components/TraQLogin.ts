import { html, TemplateResult } from 'lit-html'
import { until } from 'lit-html/directives/until.js'
import { rerender } from '../main'

export const TraQLogin = (): TemplateResult =>
  html`${until(InnerTraQLogin(), html`<p>Loading...</p>`)}`

const InnerTraQLogin = async (): Promise<TemplateResult> => {
  const isLoggedIn = (await fetch('/api/v3/users/me')).ok
  if (isLoggedIn) return html`<p>デバッグ用表示: ログイン済み</p>`

  const login = async (e: Event) => {
    e.preventDefault()

    const $form = e.currentTarget as HTMLFormElement
    const $id = $form.querySelector('[name="id"]') as HTMLInputElement
    const $pass = $form.querySelector('[name="pass"]') as HTMLInputElement

    const isLoggedIn = (
      await fetch('/api/v3/login', {
        method: 'POST',
        body: JSON.stringify({
          name: $id.value,
          password: $pass.value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    ).ok
    if (isLoggedIn) {
      rerender()
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
