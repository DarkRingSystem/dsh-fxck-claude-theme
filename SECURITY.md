# 安全策略 / Security Policy

本插件是一个纯样式叠加件：它在 Web GUI 里注入一段 CSS，并把 `dsh-claude-style` 的 `brandInk` 配置项写回 `original`。它不发起网络请求、不读取凭据、不下载或执行远程代码、不含第三方运行时依赖。

This plugin is a styling overlay. It injects one stylesheet into the Web GUI and writes the theme's `brandInk` back to `original`. It makes no network requests, reads no credentials, loads no remote code and has no third-party runtime dependencies.

## 支持版本 / Supported versions

| 版本 | 支持 |
|---|---|
| 1.0.x | ✅ |
| < 1.0 | ❌ |

## 报告漏洞 / Reporting a vulnerability

**请使用 GitHub 的私密报告，不要开公开 issue。**

Please report privately — do not open a public issue.

- <https://github.com/DarkRingSystem/dsh-fxck-claude-theme/security/advisories/new>

报告里如果能附上 DSH 版本、`dsh-claude-style` 版本、浏览器版本和复现步骤，处理会快很多。

Including your DSH version, `dsh-claude-style` version, browser version and reproduction steps helps a lot.

我会尽力在 7 天内首次回复。这是一个个人维护的小项目，没有 SLO 承诺。

Best-effort first response within 7 days. This is a small personal project with no formal SLA.

## 信任模型 / What you are trusting

安装任何 DSH 插件，都等于把它的代码放进 Host 进程和 Web 页面里跑。本插件用的是同样的权限模型，没有额外申请什么：

- **Host 侧**（`index.js`）：只注入 `configEditor`，读取主题条目、改一个配置项。不碰文件系统、不碰 shell、不碰网络。
- **Client 侧**（`client.js`）：只注册一个 `shell.overlay` slot，向页面插入一个 `<style>` 元素。不读取 DOM 内容，不监听输入，不向任何地址发送数据。

如果你不希望自己的主题配置被改动，就别装它——`brandInk` 的改写是这个插件达到目标视觉的必然步骤，不是可以关掉的副作用。

## 不算安全漏洞的 / Out of scope

下面这些请走普通 issue，不要占用私密报告通道：

- 主题升级后样式错位、字标尺寸或比例不对
- `Fuck` 前缀的字体回退、基线偏移、多语言下的排版差异
- 主题切到 DeepSeek 档位时插件应有的让位行为
- 「它改了我的主题设置」——这是已记录的设计行为，见上一节
