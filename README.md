# traQ-Widget

[![GitHub tag](https://img.shields.io/github/tag/traPtitech/traQ-Widget.svg)](https://GitHub.com/traPtitech/traQ-Widget/tags/)
![CI](https://github.com/traPtitech/traQ-Widget/workflows/CI/badge.svg)
![release](https://github.com/traPtitech/traQ-Widget/workflows/release/badge.svg)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=traPtitech/traQ-Widget)](https://dependabot.com)

traQ用ウィジェット  
認証通っている場合のみ表示される  
`<iframe>`での内部サービスへの埋め込みを意図  

## `?type=message&id=～`

- `type`: `message`
- `id`: メッセージID

メッセージ埋め込み

## 開発
`npm run dev`をすると`lccalhost:8500`でdev serverが起動する。
`/`で本体、`/iframe`でiframeで埋め込まれた状態を確認可能。
