import { atom } from 'recoil'

export const editorState = atom<string>({
  key: 'editorState',
  default: `# PHPでWebサイトを作成して公開する

## 静的なWebサイトを作成して公開する

### Webサイトを作成する
#### HTMLで構造を書く
#### CSSでスタイリングする
#### JavaScriptで動きをつける

### 作成したWebサイトを公開する
#### Linuxのターミナルを操作する
#### nginxでWebサイトを公開する

## PHP基礎`,
})
