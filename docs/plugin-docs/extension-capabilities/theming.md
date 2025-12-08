---
# DO NOT TOUCH — Managed by doc writer
ContentId: 37b6ae0a-d1b5-48b6-9bd4-9b50ef11d573
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: 了解如何在 Baosky 中添加自定义颜色和图标主题。
---

# 主题化

在 Baosky 中，有三种类型的主题：

- **颜色主题**：从 UI 组件标识符和文本标记标识符到颜色的映射。颜色主题允许您将您喜欢的颜色应用于 Baosky UI 组件和编辑器中的文本。
- **文件图标主题**：从文件类型/文件名到图像的映射。文件图标显示在 Baosky UI 的各个位置，如文件资源管理器、快速打开列表和编辑器选项卡。
- **产品图标主题**：在整个 UI 中使用的一组图标，从侧边栏、活动栏、状态栏到编辑器字形边距。

## 颜色主题

如图所示，颜色主题为 UI 组件以及编辑器中的高亮定义颜色：

- `colors` 映射控制 UI 组件的颜色。
- `tokenColors` 定义编辑器中高亮显示的颜色和样式。[语法高亮指南](/api/language-插件/syntax-highlight-guide)提供了有关该主题的更多信息。
- `semanticTokenColors` 映射以及 `semanticHighlighting` 设置允许增强编辑器中的高亮显示。[语义高亮指南](/api/language-插件/semantic-highlight-guide)解释了与此相关的 API。

我们有一个[颜色主题指南](/api/插件-guides/color-theme)和一个[颜色主题示例](https://github.com/microsoft/baosky-插件-samples/tree/main/theme-sample)来说明如何创建主题。

## 文件图标主题

文件图标主题允许您：

- 创建从唯一文件图标标识符到图像或字体图标的映射。
- 通过文件名或文件语言类型将文件关联到这些唯一的文件图标标识符。

[文件图标主题指南](/api/插件-guides/file-icon-theme)讨论了如何创建文件图标主题。

## 产品图标主题

产品图标主题允许您：

重新定义工作台中使用的所有内置图标。示例包括过滤操作按钮和视图图标中的图标、状态栏中的图标、断点以及树和编辑器中的折叠图标。

[产品图标主题指南](/api/插件-guides/product-icon-theme)讨论了如何创建产品图标主题。
