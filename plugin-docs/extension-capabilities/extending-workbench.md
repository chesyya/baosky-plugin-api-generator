---
# DO NOT TOUCH — Managed by doc writer
ContentId: e0d5bd37-f020-4235-ad81-c977baaeb24f
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Explain how to extend Baosky's workbench area with custom UI components
---

# 扩展工作台

"工作台"是指包含以下 UI 组件的整体 Baosky UI：

- 标题栏
- 活动栏
- 侧边栏
- 面板
- 编辑器组
- 状态栏

Baosky 提供了各种 API，允许您向工作台添加自己的组件。例如，在下图中：

<!-- 图片已移除 -->

- 活动栏：[Azure App Service 插件](#)添加了一个[视图容器](#视图容器)
- 侧边栏：内置 [NPM 插件](https://github.com/microsoft/vscode/tree/main/插件/npm)向资源管理器视图添加了一个[树视图](#树视图)
- 编辑器组：内置 [Markdown 插件](https://github.com/microsoft/vscode/tree/main/插件/markdown-language-features)在编辑器组中的其他编辑器旁边添加了一个 [Webview](#webview)
- 状态栏：[VSCodeVim 插件](#)在状态栏中添加了一个[状态栏项](#状态栏项)

## 视图容器

使用 [`contributes.viewsContainers`](/api/references/contribution-points#contributes.viewsContainers) 贡献点，您可以添加显示在五个内置视图容器旁边的新视图容器。在[树视图](/api/插件-guides/tree-view)主题中了解更多信息。

## 树视图

使用 [`contributes.views`](/api/references/contribution-points#contributes.views) 贡献点，您可以添加显示在任何视图容器中的新视图。在[树视图](/api/插件-guides/tree-view)主题中了解更多信息。

## Webview

Webview 是使用 HTML/CSS/JavaScript 构建的高度可自定义的视图。它们显示在编辑器组区域中的文本编辑器旁边。在 [Webview 指南](/api/插件-guides/webview)中阅读有关 Webview 的更多信息。

## 状态栏项

插件可以创建在状态栏中显示的自定义 [`StatusBarItem`](/api/references/vscode-api#StatusBarItem)。状态栏项可以显示文本和图标，并在单击事件时运行命令。

- 显示文本和图标
- 在单击时运行命令

您可以通过查看[状态栏插件示例](https://github.com/microsoft/vscode-插件-samples/tree/main/statusbar-sample)了解更多信息。
