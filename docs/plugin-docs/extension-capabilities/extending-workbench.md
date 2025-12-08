---
# DO NOT TOUCH — Managed by doc writer

ContentId: e0d5bd37-f020-4235-ad81-c977baaeb24f
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: 解释如何使用自定义 UI 组件扩展 Baosky 的工作台区域
---

# 扩展工作台

"Workbench" 指的是整体 Baosky UI，它包含以下 UI 组件：

- 标题栏
- 活动栏
- 侧边栏
- 面板
- 编辑器组
- 状态栏

Baosky 提供了各种 API，允许您向 Workbench 添加自己的组件。例如，在下面的图片中：

<!-- 图片已移除 -->

- 活动栏：[Azure App Service 插件](#) 添加了一个 [View Container](#views-container)
- 侧边栏：内置的[NPM 插件](https://github.com/microsoft/baosky/tree/main/插件/npm) 向资源管理器视图添加了一个[Tree View](#tree-view)
- 编辑器组：内置的 [Markdown 插件](https://github.com/microsoft/baosky/tree/main/插件/markdown-language-features) 在编辑器组中其他编辑器旁边添加了一个 [Webview](#webview)
- 状态栏：[BaoskyVim 插件](#) 在状态栏添加了一个 [Status Bar Item](#status-bar-item)

## 视图容器

通过 [`code`](/api/references/contribution-points#contributes.viewsContainers) 贡献点，您可以在新视图容器旁边的五个内置视图容器中添加显示。请访问 [Tree View](/api/插件-guides/tree-view) 主题了解更多信息。

## 树视图

通过 [`code`](/api/references/contribution-points#contributes.views) 贡献点，您可以在任何视图容器中添加显示的新视图。请访问 [Tree View](/api/插件-guides/tree-view) 主题了解更多信息。

## Webview

Webview 是使用 HTML/CSS/JavaScript 构建的高度可定制的视图。它们显示在编辑器组区域中的文本编辑器旁边。在 [Webview guide](/api/插件-guides/webview) 中了解有关 Webview 的更多信息。

## 状态栏项目

插件可以创建显示在状态栏中的自定义 [`code`](/api/references/baosky-api#StatusBarItem)。状态栏项目可以显示文本和图标并在单击事件上运行命令。

- 显示文本和图标
- 单击时运行命令

您可以通过查看[Status Bar 插件 sample](https://github.com/microsoft/baosky-插件-samples/tree/main/statusbar-sample)了解更多信息。
