# dsh-fxck-claude-theme

[![license](https://img.shields.io/badge/license-MIT-2EA44F.svg)](LICENSE)
[![简体中文](https://img.shields.io/badge/lang-简体中文-d97757.svg)](README.md) [![日本語](https://img.shields.io/badge/lang-日本語-4a5568.svg)](README.ja.md)

> DeepSeek Harness のテーマ [`dsh-claude-style`](https://github.com/Nwflower/dsh-claude-style) のワードマークの前に、セリフ体の「Fuck」を足すだけの小さな装飾プラグインです。ワードマーク自体は元のベクター、元のサイズ、元の文字色のまま。オレンジはサイドバーの花マークにだけ残します。

## 動作要件

| 依存 | バージョン |
|---|---|
| DeepSeek Harness | `>=0.1.7` |
| [`dsh-claude-style`](https://www.npmjs.com/package/dsh-claude-style) | `0.19.x` |

2 つ目は必須です。本プラグインはテーマのコードを書き換えず、実行時にスタイルを重ねるだけです。参照しているのはテーマが DOM に付けるマークと CSS 変数なので、テーマ側でそこが変われば本プラグインも追随する必要があります。

## 何をするか

- **ワードマーク**：テーマは `::before` と `--dsh-claude-mask-claude-word` で Claude のワードマークをマスクとして描画します。本プラグインは同じマスク、同じ 18px の高さ、そして `512.22 / 121.54` の元の縦横比をそのまま使い、色は本文色に従います。
- **プレフィックス**：ワードマークの前にセリフ体の `Fuck` を挿入します。テーマのブランドフォント、24px / ウェイト 500 で、ベースラインを揃えます。
- **オレンジ**：展開時のサイドバーの花と、折りたたみレールの花にだけ `#d97757` を載せます。ワードマーク全体には載せません。
- **テーマ設定**：`dsh-claude-style` の「アクセントカラー」はアップロードした画像まで図形として着色してしまうため、ホスト側が初回読み込み時にその項目の `brandInk` を `original` に戻し、`brandAccent` を空にします。他の設定は一切変更しません。この処理が効かない場合（ツールを一度も実行していない、設定ロックが解放されていないなど）は、テーマ設定で「ロゴの色」を「ロゴ本来の色」に手動で変更してください。

テーマが `brand=claude` のときだけ有効です。DeepSeek 側に切り替えると本プラグインは完全に退きます。

## インストール

DeepSeek Harness のプラグインマネージャー（dshmarket）から：

```sh
plugin_manager install_bundle dsh-fxck-claude-theme
```

または profile の `package.json` に手動で追加：

```json
{
  "dependencies": { "dsh-fxck-claude-theme": "1.0.0" },
  "dsh": { "profile": { "bundles": ["dsh-fxck-claude-theme"] } }
}
```

その後 Web GUI を再起動してください。本パッケージは `cordis.patch.yml` を同梱しており、インストールすると `ui-skin-claude-style` の後ろに自動で挿入されます。テーマが別の loader エントリ id でマウントされている場合は、このファイルの `target` を変更してください。

## 設定

項目は 1 つだけです：

| キー | 既定値 | 説明 |
|---|---|---|
| `target` | `ui-skin-claude-style` | `dsh-claude-style` の loader エントリ id |

## 既知の制限

- プレフィックスは `client.js` の CSS に直書きです（`content: "Fuck"`）。文言を変えたいときはこの行を書き換えるだけで、ビルドは不要です。
- マスクの寸法は 2 つのマジックナンバー（`512.22 / 121.54`）で、テーマ 0.19.6 のワードマーク素材に由来します。テーマ側で画像が変わったら測り直す必要があります。
- Web のみで動作し、Native 側には影響しません。

## アンインストール

profile の `bundles` から外して再起動すればスタイルは消えます。テーマ設定は「ロゴ本来の色」のまま残りますが、これはテーマの通常の既定値なので、余計な変更は残りません。

## ライセンスと商標

コードは MIT で公開しています。[LICENSE](LICENSE) を参照してください。

本パッケージには Anthropic の素材は**一切含まれていません**。Claude のワードマークは `dsh-claude-style` が実行時に CSS マスクで描画しているもので、本パッケージはその CSS 変数と DOM 属性を参照するだけです。画像もフォントも同梱していません。

Claude、Claude Code は Anthropic の商標です。本プロジェクトは非公式のファンメイドであり、Anthropic とも Nwflower とも提携・推奨関係はありません。この名前やこの見た目がどちらかの気分を害するようでしたら、issue を立てていただければ対応します。
