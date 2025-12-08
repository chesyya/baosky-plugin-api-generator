---
# DO NOT TOUCH — Managed by doc writer

ContentId: 05bd995d-946e-4046-8816-c6d50dccb1b4
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: Baosky 插件中侧边栏的 UX 指南。
---

# 侧边栏

主侧边栏和辅助侧边栏由一个或多个由 [视图容器](/api/ux-guidelines/views#view-containers) 贡献的 [视图](/api/ux-guidelines/views) 组成。插件可以将视图贡献给现有的视图容器（例如，资源管理器），或者它们可以贡献一个全新的视图容器。

**✔️ 建议**

* 将相关的视图和内容分组在一起。
* 为视图容器及其视图使用清晰、描述性的名称。

**❌ 不建议**

* 使用过多数量的视图容器。对于大多数插件来说，单个视图容器（例如具有该插件唯一视图的侧边栏）通常就足够了。
* 使用过多数量的视图（对于大多数屏幕尺寸，3-5 个是舒适的最大值）。
* 将本可以是简单命令的内容添加到侧边栏。
* 重复现有功能。

<!-- 图片已移除 -->

## 主侧边栏

许多插件选择将视图和/或视图容器贡献给主侧边栏，因为它给内容提供了高可见性。在此处添加内容时请运用良好的判断力——过多的贡献 UI 可能导致混乱的体验，从而使用户感到困惑。

<!-- 图片已移除 -->

## 辅助侧边栏

顾名思义，辅助侧边栏通常被视为视图的辅助位置。虽然插件默认不能直接向其贡献视图，但用户可以从主侧边栏或面板拖动视图以自定义其布局。

<!-- 图片已移除 -->

## 侧边栏工具栏

默认情况下，侧边栏中具有多个视图的视图容器将在侧边栏工具栏中具有一个 `...` 图标按钮，以显示和隐藏每个视图。这看起来像这样：

<!-- 图片已移除 -->

但是，如果仅使用一个视图，侧边栏将自动合并 UI 以使用侧边栏工具栏来渲染特定于该视图的所有操作。代替 `...` 按钮，与其关联的两个操作（'Notes' 视图）将渲染在其位置：

<!-- 图片已移除 -->

与其他工具栏一样，请注意不要添加太多操作，以减少混乱和困惑。如果可能，请使用现有的产品图标配对描述性的命令名称。

## 链接

* [视图容器贡献点](/api/references/contribution-points#contributes.viewsContainers)
* [视图贡献点](/api/references/contribution-points#contributes.views)
* [视图操作插件指南](/api/extension-guides/tree-view#view-actions)
* [欢迎视图贡献点](/api/references/contribution-points#contributes.viewsWelcome)
* [树视图插件示例](https://github.com/microsoft/baosky-extension-samples/tree/main/tree-view-sample)
* [Webview 视图插件示例](https://github.com/microsoft/baosky-extension-samples/tree/main/webview-view-sample)
* [欢迎视图插件示例](https://github.com/microsoft/baosky-extension-samples/tree/main/welcome-view-content-sample)