---
# DO NOT TOUCH — Managed by doc writer

ContentId: 1e37b895-d0b3-45b8-a071-107bd665248e
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: Baosky 插件中视图的 UX 指南。
---

# 视图 (Views)

[视图](/api/references/contribution-points#contributes.views) 是可以出现在侧边栏或面板中的内容容器。视图可以包含树视图、欢迎视图或 Webview 视图，还可以显示视图操作。视图也可以由用户重新排列或移动到另一个视图容器（例如，从主侧边栏移动到辅助侧边栏）。限制创建的视图数量，因为其他插件可以在同一视图容器中贡献。

**✔️ 建议**

* 尽可能使用现有图标。
* 为语言文件使用文件图标。
* 使用树视图显示数据。
* 为每个视图添加图标（以防它被移动到活动栏或辅助侧边栏——这两者都使用图标来表示视图）。
* 将视图数量保持在最低限度。
* 将名称长度保持在最低限度。
* 限制自定义 Webview 视图的使用。

**❌ 不建议**

* 重复现有功能。
* 将树项目用作单操作项目（例如，单击时触发命令）。
* 如果没有必要，使用自定义 Webview 视图。
* 使用活动栏项目（视图容器）在编辑器中打开 Webview。

<!-- 图片已移除 -->

*此示例使用树视图显示树视图项目的平面列表。*

## 视图位置

视图可以放置在 [现有视图容器](/api/references/contribution-points#contributes.views) 中，例如文件资源管理器、源代码管理 (SCM) 和调试视图容器。它们也可以通过活动栏添加到自定义 [视图容器](/api/ux-guidelines/views#view-containers)。此外，视图可以添加到面板中的任何视图容器。它们也可以被拖到辅助侧边栏。

<!-- 图片已移除 -->

## 视图容器

视图容器，顾名思义，是渲染视图的“父”容器。插件可以将自定义视图容器贡献给 [活动栏](/api/ux-guidelines/activity-bar)/[主侧边栏](/api/ux-guidelines/sidebars) 或面板。用户可以将整个视图容器从活动栏拖到面板（反之亦然），也可以移动单个视图。

<!-- 图片已移除 -->

*这是放置在活动栏/主侧边栏中的视图容器示例*

<!-- 图片已移除 -->

*这是放置在面板中的视图容器示例*

## 树视图

树视图是在视图中显示内容的一种强大而灵活的格式。插件可以添加从简单的平面列表到深层嵌套树的所有内容。

* 使用描述性标签为项目提供上下文（如果适用）。
* 使用产品图标区分项目类型（如果适用）。

**❌ 不建议**

* 使用树视图项目作为按钮来触发命令。
* 避免深层嵌套，除非必要。几层文件夹/项目对于大多数情况来说是一个很好的平衡。
* 向一个项目添加超过三个操作。

<!-- 图片已移除 -->

## 欢迎视图

当视图为空时，您可以 [添加内容以引导用户](/api/references/contribution-points#contributes.viewsWelcome) 如何使用您的插件或入门。欢迎视图中支持链接和图标。

**✔️ 建议**

* 仅在必要时使用欢迎视图。
* 尽可能使用链接而不是按钮。
* 仅对主要操作使用按钮。
* 使用清晰的链接文本指示链接目标。
* 限制内容的长度。
* 限制欢迎视图的数量。
* 限制视图中按钮的数量。

**❌ 不建议**

* 如果没有必要，使用按钮。
* 将欢迎视图用于促销。
* 使用通用的“阅读更多”作为链接文本。

<!-- 图片已移除 -->

*此示例显示了插件的一个主要操作，以及指向文档的附加链接。*

## 带进度的视图

您还可以通过引用视图的 ID 在视图中 [显示进度](/api/references/baosky-api#ProgressLocation)。

<!-- 图片已移除 -->

## 视图操作

视图可以在视图工具栏上公开 [视图操作](/api/extension-guides/tree-view#view-actions)。请注意不要添加太多操作，以避免噪音和混淆。使用内置产品图标有助于插件与本机 UI 融为一体。但是，如果需要自定义图标，可以提供 SVG 图标。

<!-- 图片已移除 -->

## 链接

* [视图容器 API 参考](/api/references/contribution-points#contributes.viewsContainers)
* [视图 API 参考](/api/references/contribution-points#contributes.views)
* [视图操作插件指南](/api/extension-guides/tree-view#view-actions)
* [树视图插件示例](https://github.com/microsoft/baosky-extension-samples/tree/main/tree-view-sample)
* [欢迎视图插件示例](https://github.com/microsoft/baosky-extension-samples/tree/main/welcome-view-content-sample)
* [Webview 视图插件示例](https://github.com/microsoft/baosky-extension-samples/tree/main/webview-view-sample)