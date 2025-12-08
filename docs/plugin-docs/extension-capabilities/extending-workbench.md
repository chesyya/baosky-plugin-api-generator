---
# DO NOT TOUCH — Managed by doc writer
ContentId: e0d5bd37-f020-4235-ad81-c977baaeb24f
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Explain how to extend Baosky's workbench area with custom UI components
---

# Extending Workbench

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
- 侧边栏：内置的 [NPM 插件](https://github.com/microsoft/baosky/tree/main/插件/npm) 向资源管理器视图添加了一个 [Tree View](#tree-view)
- 编辑器组：内置的 [Markdown 插件](https://github.com/microsoft/baosky/tree/main/插件/markdown-language-features) 在编辑器组中其他编辑器旁边添加了一个 [Webview](#webview)
- 状态栏：[BaoskyVim 插件](#) 在状态栏中添加了一个 [Status Bar Item](#status-bar-item)

## Views Container

With the [`code`](/api/references/contribution-points#contributes.viewsContainers) Contribution Point, you can add new Views Containers that display next to the five built-in Views Containers. Learn more at the [Tree View](/api/插件-guides/tree-view) topic.

## Tree View

With the [`code`](/api/references/contribution-points#contributes.views) Contribution Point, you can add new Views that display in any of the View Containers. Learn more at the [Tree View](/api/插件-guides/tree-view) topic.

## Webview

Webviews are highly customizable views built with HTML/CSS/JavaScript. They display next to text editors in the Editor Group areas. Read more about Webview in the [Webview guide](/api/插件-guides/webview).

## Status Bar Item

插件 can create custom [`code`](/api/references/baosky-api#StatusBarItem) that display in the Status Bar. Status Bar Items can show text and icons and run commands on click events.

- Show text and icons
- Run a command on click

You can learn more by reviewing the [Status Bar 插件 sample](https://github.com/microsoft/baosky-插件-samples/tree/main/statusbar-sample).
