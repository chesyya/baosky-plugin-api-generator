---
# DO NOT TOUCH — Managed by doc writer

ContentId: 06ce3b57-9fd5-428a-98aa-d730edbd2728
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: Baosky 插件中面板栏的 UX 指南。
---

# 面板

面板是另一个主要区域，用于显示 [视图容器](/api/references/contribution-points#contributes.viewsContainers)。

**✔️ 建议**

- 在面板中渲染受益于更多水平空间的视图。
- 用于提供辅助功能的视图。

**❌ 不建议**

- 用于旨在始终可见的视图，因为用户经常最小化面板。
- 渲染自定义 Webview 内容，这些内容在拖动到其他视图容器（如主侧边栏或辅助侧边栏）时无法正确调整大小/重排。

<!-- 图片已移除 -->

## 面板工具栏

面板工具栏可以公开适用于当前选定视图的选项。例如，终端视图公开 [视图操作](/api/extension-guides/tree-view#view-actions) 以添加新终端、拆分视图布局等。切换到“问题”视图会公开一组不同的操作。类似于 [侧边栏工具栏](/api/ux-guidelines/sidebars#sidebar-toolbar)，如果只有一个视图，工具栏才会渲染。如果使用多个视图，每个视图将渲染其自己的工具栏。

**✔️ 建议**

- 如果可用，使用现有的 [产品图标](/api/references/icons-in-labels#icon-listing)。
- 提供清晰、有用的工具提示。

**❌ 不建议**

- 不要添加过多数量的图标按钮。如果特定按钮需要更多选项，请考虑使用 [上下文菜单](/api/references/contribution-points#contributes.menus)。
- 不要复制默认的面板图标（折叠/展开、关闭等）。

<!-- 图片已移除 -->

*在此示例中，面板中渲染的单个视图在主面板工具栏中渲染其视图操作。*

<!-- 图片已移除 -->

*在此示例中，使用了多个视图，因此每个视图公开其自己的特定视图操作。*

## 链接

- [视图容器贡献点](/api/references/contribution-points#contributes.viewsContainers)
- [视图贡献点](/api/references/contribution-points#contributes.views)
- [视图操作插件指南](/api/extension-guides/tree-view#view-actions)