import { html, render, nothing } from 'lit-html'
import { Widget } from './components/Widget'
import { Login } from './components/Login'

export const rerender = (): void => {
  const app = html`
    ${Widget()} ${process.env.NODE_ENV !== 'production' ? Login() : nothing}
  `
  render(app, document.body)
}

rerender()
