import { TemplateResult } from 'lit-html'
import { MessageWidget } from './MessageWidget'

export const Widget = (): TemplateResult => {
  const params = new URLSearchParams(location.search)
  const type = params.get('type')

  switch (type) {
    case 'message':
      return MessageWidget(params)
    default:
      return MessageWidget(params)
  }
}
