# Red conversation text · 对话文字变红

把 **DeepSeek Harness（DSH）Web GUI 的对话面板文字变成红色**的本地 UI 插件，零依赖、无构建步骤。

A zero-dependency local UI plugin for the DeepSeek Harness Web GUI that turns the
conversation pane's text red.

[中文](#中文) · [English](#english)

---

## 中文

### 效果

对话面板（`data-conversation-content` 子树）内的正文文字统一显示为红色：

| 变红 | 保持原样 |
| --- | --- |
| 你发送的消息、助手的回复 | 代码块中带语法高亮的高亮 token |
| 输入框文字与光标 | 面板外的侧边栏、对话标题栏、右栏 |
| 新会话欢迎语、面板内的内联菜单 | portal 到 `body` 的宿主浮层 |

红色取主题的 `--dsw-alias-state-error-primary`（浅色为 red-600、深色为 red-400），
切换浅色 / 深色主题时自动适配，不需要额外配置。

### 安装

前提：DSH `0.2.2-rc.5`（Desktop 版）或相近版本，并已启用 Web GUI。

1. 打开 **设置 → 插件 → 添加插件**；
2. 填入本仓库的本地目录绝对路径，例如
   `/Users/you/code/dsh-red-dialog-text`；
   也支持 GitHub 仓库地址：`https://github.com/ShaohonChen/dsh-red-dialog-text`；
3. 安装成功后，插件列表会出现「对话文字变红 / Red conversation text」。
   若页面没有立即生效，按 `⌘R`（Windows 为 `Ctrl+R`）刷新一次。

### 停用与卸载

- **停用**：设置 → 插件 → 已安装插件 → 「对话文字变红」的启用开关关闭，文字立即恢复原色。
- **卸载**：进入该插件详情页 → 右上角「卸载」按钮。

### 兼容性

- 依赖 DSH 页面上的两个稳定钩子：对话面板的 `data-conversation-content` 容器，
  以及 `--dsw-alias-*` 主题 token。
- 在 DSH `0.2.2-rc.5`（macOS Desktop）上开发；其他版本未逐一测试。
  若 DSH 调整了上述钩子，插件可能不再生效，需要更新选择器。

### 实现

- Host 半边（`index.js`）为空，只负责让插件行加载客户端模块。
- 客户端半边（`client.js`）在 `apply` 中用 `ctx.effect` 注入一段 `<style>`，
  插件停用 / 卸载时自动移除。
- 样式只做一件事：在对话面板子树里把 label 系列 token 重定向到主题错误红，
  并给编辑区加红色光标；不修改 DOM 结构。
- 不读写任何会话数据，不发网络请求，不申请额外权限。

### 自定义

直接改 [client.js](client.js) 里 `CSS` 字符串中的 token 与选择器：

| 目标 | 改法 |
| --- | --- |
| 换颜色 | 把 `var(--dsw-alias-state-error-primary)` 换成其他 `--dsw-alias-*` token 或具体颜色值 |
| 只让消息变红、不动输入框 | 把选择器 `[data-conversation-content]` 换成 `[data-conversation-region="chat"]` |
| 只让输入框变红 | 把选择器换成 `[data-conversation-region="composer"]` |

本地目录安装时改完刷新页面即可；Git 仓库安装时需重新安装。

### 开发

| 文件 | 作用 |
| --- | --- |
| [package.json](package.json) | 包声明：组合包 patch、`dsh.client` Web 入口、导出与文件清单 |
| [cordis.patch.yml](cordis.patch.yml) | 把插件行插入当前 profile |
| [index.js](index.js) | Host 半边（空实现） |
| [client.js](client.js) | 客户端半边：注入作用域样式 |
| [locale/zh.json](locale/zh.json) / [locale/en.json](locale/en.json) | 插件管理器中的标题与说明 |
| [icon.svg](icon.svg) | 插件图标（36×36） |
| [README.md](README.md) | 本文档 |
| [LICENSE](LICENSE) | 许可证 |

提交前快速校验：

```sh
node --check client.js
node -e "JSON.parse(require('fs').readFileSync('package.json','utf8'))"
xmllint --noout icon.svg   # 可选，校验 SVG 格式
```

欢迎提 Issue / PR，但请保持插件足够小、只做「对话面板文字变红」这一件事。

### 许可证

[The Unlicense](LICENSE)：公有领域。复制、修改、商用、再发布都无需署名，也无需保留任何声明。

---

## English

### What it does

Turns the body text inside the DSH conversation pane red — your messages, the
assistant's messages, the composer, and the empty-session greeting. The red uses
the theme's `--dsw-alias-state-error-primary` token, so light and dark themes are
both covered. Highlighted code tokens keep their syntax colors; the sidebar,
conversation header, right column, and portalled surfaces keep the host palette.

### Install

1. Open **Settings → Plugins → Add plugin**;
2. Enter the absolute path of this repository on your machine, or the GitHub URL
   `https://github.com/ShaohonChen/dsh-red-dialog-text`;
3. Keep **Red conversation text** enabled. Refresh the page (`⌘R`) if the recolor
   does not show up immediately.

### Disable or uninstall

- Disable the **Red conversation text** switch in Settings → Plugins to restore
  the normal colors.
- Uninstall from the plugin's detail page to remove the bundle entirely.

### Compatibility

Built against DSH `0.2.2-rc.5` (macOS Desktop). It relies on the
`data-conversation-content` container and the `--dsw-alias-*` theme tokens; a host
release that changes those hooks may require a selector update.

### License

[The Unlicense](LICENSE) — public domain. Use, modify, sell, and redistribute
freely, with no attribution required.
