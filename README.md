# dsh-fxck-claude-theme

[![license](https://img.shields.io/badge/license-MIT-2EA44F.svg)](LICENSE)

An overlay plugin for the [dsh-claude-style](https://github.com/Nwflower/dsh-claude-style) theme in DeepSeek Harness. It keeps Claude's original vector lettering at its native size, puts a serif **Fuck** in front of it, and leaves orange on the sidebar flower alone.

> 一个很小的装饰插件：在 `dsh-claude-style` 主题的字标前加一个衬线「Fuck」，字标本身保持原版矢量、原版尺寸和原版文字色，橘色只留在侧栏那朵菊花上。

## 要求

| 依赖 | 版本 |
|---|---|
| DeepSeek Harness | `>=0.1.7` |
| [`dsh-claude-style`](https://www.npmjs.com/package/dsh-claude-style) | `0.19.x` |

第二个依赖是硬性的：本插件不改主题代码，而是在运行时叠加样式，读的是主题自己在 DOM 上打的标记和 CSS 变量。主题改了这部分，插件就得跟着改。

## 它做了什么

- **字标**：主题用 `::before` 加 `--dsh-claude-mask-claude-word` 把 Claude 字标画成遮罩形状。本插件沿用同一个遮罩、同一个 18px 高度和 `512.22 / 121.54` 的原始宽高比，颜色跟随正文。
- **前缀**：在字标之前插入衬线 `Fuck`，用主题的品牌字体，24px / 字重 500，与字标基线对齐。
- **橘色**：只给展开侧栏的花和收起 rail 的花上 `#d97757`，不上整枚字标。
- **主题配置**：`dsh-claude-style` 的「强调色」会把上传的图片一起当成形状染色，所以 host 侧在首次加载时把该条目的 `brandInk` 写回 `original` 并清空 `brandAccent`，其余偏好一律保留。若这一步没有生效（例如没跑过工具、配置锁未释放），在主题设置里手动把「标志颜色」选成「标志原色」即可。

只在主题的 `brand=claude` 档位下生效；切到 DeepSeek 档位时插件完全让位。

## 安装

在 DeepSeek Harness 的插件管理器（dshmarket）里安装：

```sh
plugin_manager install_bundle dsh-fxck-claude-theme
```

或者手动把它加进 profile 的 `package.json`：

```json
{
  "dependencies": { "dsh-fxck-claude-theme": "1.0.0" },
  "dsh": { "profile": { "bundles": ["dsh-fxck-claude-theme"] } }
}
```

然后重启 Web GUI。本包自带 `cordis.patch.yml`，安装后会自动插到 `ui-skin-claude-style` 之后；如果主题挂在别的 loader 条目 id 上，改这个文件里的 `target`。

## 配置

只有一项：

| 键 | 默认值 | 说明 |
|---|---|---|
| `target` | `ui-skin-claude-style` | `dsh-claude-style` 在 loader 里的条目 id |

## 已知限制

- 前缀写死在 `client.js` 的 CSS 里（`content: "Fuck"`）。想换词直接改这一行，不需要重新构建。
- 遮罩尺寸是两个魔数（`512.22 / 121.54`），来自主题 0.19.6 的字标资源；主题换图后要跟着量一次。
- 只在 Web 端生效，不改 Native 端。

## 卸载

从 profile 的 `bundles` 里去掉即可，重启后样式消失。主题配置会停在「标志原色」，这是主题的正常默认值，不会留下多余的改动。

## 许可证与商标

代码以 MIT 发布，见 [LICENSE](LICENSE)。

本包**不含** Anthropic 的任何素材：Claude 字标是 `dsh-claude-style` 在运行时用 CSS 遮罩绘制的，本包只引用它的 CSS 变量和 DOM 属性，图片、字体都不随包分发。

Claude、Claude Code 是 Anthropic 的商标。本项目是非官方爱好者作品，与 Anthropic、Nwflower 都没有关联或背书关系。如果这个名字或这个效果让任何一方不适，提个 issue 就好。
