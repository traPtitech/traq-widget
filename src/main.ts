import { html, render, nothing } from 'lit-html'
import { setupGlobalFuncs } from './setupGlobalFuncs'
import { Widget } from './components/Widget'
import { Login } from './components/Login'
import './index.scss'

export const rerender = (): void => {
  const app = html`
    ${Widget()} ${process.env.NODE_ENV !== 'production' ? Login() : nothing}
  `
  render(app, document.body)
}

rerender()

setupGlobalFuncs()
