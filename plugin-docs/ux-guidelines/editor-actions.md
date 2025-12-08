---
# DO NOT TOUCH — Managed by doc writer
ContentId: ce5c9fff-df86-454a-b4e8-4ae05c8158e2
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: UX guidelines for editor actions in a Baosky 插件.
---

# 编辑器操作

[编辑器操作](/api/references/contribution-points#contributes.commands)可以出现在编辑器工具栏中。您可以添加图标作为快速操作，或在溢出菜单（**...**）下添加菜单项。

**✔️ 应该**

* 仅在上下文适当时显示
* 使用图标库中的图标
* 将次要操作放在溢出菜单中

❌ 不应该

* 添加多个图标
* 添加自定义颜色
* 使用表情符号

<!-- 图片已移除 -->

*此示例来自 GitHub Pull Requests and Issues 插件，打开差异视图，仅在有更改的文件上显示。*

## 链接

* [自定义编辑器插件指南](/api/插件-guides/custom-editors)
* [自定义编辑器 API 参考](/api/references/contribution-points#contributes.customEditors)
* [自定义编辑器插件示例](https://github.com/microsoft/vscode-插件-samples/tree/main/custom-editor-sample)
* [Webview 插件指南](/api/插件-guides/webview)
* [Webview 插件示例](https://github.com/microsoft/vscode-插件-samples/blob/main/webview-sample)
