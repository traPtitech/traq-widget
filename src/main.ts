import { html, render, nothing } from 'lit-html'
import { TraQLogin } from './components/TraQLogin'

export const rerender = (): void => {
  const app = html`
    <p>po</p>
    ${process.env.NODE_ENV !== 'production' ? TraQLogin() : nothing}
  `
  render(app, document.body)
}

rerender()
