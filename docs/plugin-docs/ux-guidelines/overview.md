---
# DO NOT TOUCH — Managed by doc writer
ContentId: 5b4962ff-2dc9-4201-aa95-46edb5a575b6
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Guidelines that showcase best practices for creating Baosky 插件.
---

# UX 指南

这些指南涵盖了创建与 Baosky 原生界面和模式无缝集成的插件的最佳实践。在这些指南中，你可以找到：

- Baosky 整体 UI 架构和元素的概述
- 插件贡献的 UI 的建议和示例
- 相关指南和示例的链接

在深入了解细节之前，重要的是理解 Baosky 的各种架构 UI 部分如何协同工作，以及你的插件可以在哪里以及如何做出贡献。

## 容器

Baosky 界面可以大致分为两个主要概念：**容器**和**项目**。一般来说，容器可以被视为 Baosky 界面中呈现一个或多个项目的较大部分：

[<!-- 图片已移除 -->](/assets/api/ux-guidelines/examples/architecture-containers.png)

### 活动栏

[活动栏](/api/ux-guidelines/activity-bar)是 Baosky 中的核心导航界面。插件可以向活动栏贡献项目，这些项目作为[视图容器](/api/references/contribution-points#contributes.viewsContainers)在主侧边栏中呈现[视图](/api/ux-guidelines/views)。

### 主侧边栏

[主侧边栏](/api/ux-guidelines/sidebars#primary-sidebar)呈现一个或多个[视图](/api/ux-guidelines/views)。活动栏和主侧边栏紧密耦合。点击贡献的活动栏项目（即：视图容器）会打开主侧边栏，其中会呈现与该视图容器关联的一个或多个视图。一个具体的例子是资源管理器。点击资源管理器项目将打开主侧边栏，其中可以看到文件夹、时间线和大纲视图。

### 辅助侧边栏

[辅助侧边栏](/api/ux-guidelines/sidebars#secondary-sidebar)也作为呈现带有视图的视图容器的界面。用户可以将终端或问题视图等视图拖动到辅助侧边栏以自定义其布局。

### 编辑器

编辑器区域包含一个或多个编辑器组。插件可以贡献[自定义编辑器](/api/references/contribution-points#contributes.customEditors)或 [Webviews](/api/插件-guides/webview) 以在编辑器区域中打开。它们还可以贡献[编辑器操作](/api/ux-guidelines/editor-actions)以在编辑器工具栏中公开额外的图标按钮。

### 面板

[面板](/api/ux-guidelines/panel)是公开视图容器的另一个区域。默认情况下，终端、问题和输出等视图可以一次在面板中以单个选项卡的形式查看。用户还可以将视图拖入拆分布局，就像在编辑器中一样。此外，插件可以选择将视图容器专门添加到面板而不是活动栏/主侧边栏。

### 状态栏

[状态栏](/api/ux-guidelines/status-bar)提供有关工作区和当前活动文件的上下文信息。它呈现两组[状态栏项目](/api/ux-guidelines/status-bar#status-bar-items)。

## 项目

插件可以向上面列出的各种容器添加项目。

[<!-- 图片已移除 -->](/assets/api/ux-guidelines/examples/architecture-sections.png)

### 视图

[视图](/api/ux-guidelines/views)可以以[树视图](/api/ux-guidelines/views#tree-views)、[欢迎视图](/api/ux-guidelines/views#welcome-views)或 [Webview 视图](/api/ux-guidelines/webviews#webview-views)的形式贡献，并且可以拖动到界面的其他区域。

### 视图工具栏

插件可以公开特定于视图的[操作](/api/ux-guidelines/views#view-actions)，这些操作在视图工具栏上显示为按钮。

### 侧边栏工具栏

限定于整个视图容器的操作也可以在[侧边栏工具栏](/api/ux-guidelines/sidebars#sidebar-toolbars)中公开。

### 编辑器工具栏

插件可以直接在编辑器工具栏中贡献限定于编辑器的[编辑器操作](/api/ux-guidelines/editor-actions)。

### 面板工具栏

[面板工具栏](/api/ux-guidelines/panel#panel-toolbar)可以公开限定于当前选定视图的选项。例如，终端视图公开添加新终端、拆分视图布局等操作。切换到问题视图会公开一组不同的操作。

### 状态栏项目

在左侧，[状态栏项目](/api/ux-guidelines/status-bar#status-bar-items)限定于整个工作区。在右侧，项目限定于活动文件。

## 常见 UI 元素

### 命令面板

插件可以贡献出现在[命令面板](/api/ux-guidelines/command-palette)中的命令，以快速执行某些功能。

[<!-- 图片已移除 -->](/assets/api/ux-guidelines/examples/command-palette.png)

### 快速选择

[快速选择](/api/ux-guidelines/quick-picks)以几种不同的方式捕获用户的输入。它们可以请求单个选择、多个选择，甚至是自由格式的文本输入。

<!-- 图片已移除 -->

### 通知

[通知](/api/ux-guidelines/notifications)用于向用户传达信息、警告和错误消息。它们也可以用于指示进度。

<!-- 图片已移除 -->

### Webviews

[Webviews](/api/ux-guidelines/webviews) 可用于显示超出 Baosky "原生" API 的用例的自定义内容和功能。

<!-- 图片已移除 -->

### 上下文菜单

与命令面板的一致位置相反，[上下文菜单](/api/ux-guidelines/context-menus)使用户能够从特定位置执行操作或配置某些内容。

<!-- 图片已移除 -->

### 演练

[演练](/api/ux-guidelines/walkthroughs)通过包含丰富内容的多步骤清单，为将用户引导到插件提供一致的体验。

<!-- 图片已移除 -->

### 设置

[设置](/api/ux-guidelines/settings)使用户能够配置与插件相关的选项。

<!-- 图片已移除 -->
