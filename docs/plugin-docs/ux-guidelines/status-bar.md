---
# DO NOT TOUCH — Managed by doc writer

ContentId: 2d16d367-2831-47ca-8f0e-22e3e5fd24bc
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: Baosky 插件中状态栏和状态栏项目的 UX 指南。
---

# 状态栏

[状态栏](/api/extension-capabilities/extending-workbench#status-bar-item) 位于 Baosky 工作台的底部，显示与您的工作区相关的信息和操作。项目分为两组：主要（左侧）和次要（右侧）。与整个工作区相关的项目（状态、问题/警告、同步）位于左侧，而次要或上下文项目（语言、间距、反馈）位于右侧。限制添加的项目数量，因为其他插件也会贡献到同一区域。

<!-- 图片已移除 -->

**✔️ 建议**

* 使用简短的文本标签。
* 仅在必要时使用图标。
* 仅用于清晰隐喻的图标。
* 将主要（全局）项目放在左侧。
* 将次要（上下文）项目放在右侧。

**❌ 不建议**

* 添加自定义颜色。
* 添加多个图标（除非必要）。
* 添加多个项目（除非必要）。

## 状态栏项目

<!-- 图片已移除 -->

*此示例显示了 GitHub Pull Requests and Issues 插件贡献的一个项目。它与整个工作区相关，因此放置在左侧。*

### 进度状态栏项目

当需要显示不显眼的进度（在后台发生的进度）时，建议显示带有加载图标的状态栏项目（您也可以添加旋转动画）。如果进度需要引起用户注意，我们建议改用进度通知。

<!-- 图片已移除 -->

*此示例显示了一个不显眼的进度状态栏项目。*

### 错误和警告状态栏项目

如果您需要显示一个用于警告或错误目的的高度可见的项目，您可以配置状态栏项目以使用警告或错误背景颜色。鉴于它们在状态栏中的突出地位，仅在万不得已时和特殊情况下使用此模式。

<!-- 图片已移除 -->

*此示例使用错误状态栏项目显示文件中的阻塞错误。*

<!-- 图片已移除 -->

*此示例使用警告状态栏项目显示文件中的警告。*

## 链接

* [状态栏项目 API 参考](/api/references/baosky-api#StatusBarItem)
* [状态栏插件示例](https://github.com/microsoft/baosky-extension-samples/tree/main/statusbar-sample)