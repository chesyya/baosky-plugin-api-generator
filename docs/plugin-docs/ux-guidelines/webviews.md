---
# DO NOT TOUCH — Managed by doc writer

ContentId: 1c1f6d51-5914-44fa-ae10-0360be0ae2a3
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: Baosky 插件中 webview 的 UX 指南。
---

# Webviews

如果您需要显示超出 Baosky API 支持范围的自定义功能，可以使用完全可自定义的 [webviews](/api/extension-guides/webview)。重要的是要理解，只有在绝对需要时才应使用 webview。

**✔️ 建议**

* 仅在绝对必要时使用 webview。
* 仅在上下文适当时激活您的插件。
* 仅为活动窗口打开 webview。
* 确保视图中的所有元素都是可主题化的（参见 [webview-view-sample](https://github.com/microsoft/baosky-extension-samples/blob/main/webview-view-sample/media/main.css) 和 [颜色标记](/api/references/theme-color) 文档）。
* 确保您的视图遵循 [辅助功能指南](/docs/configure/accessibility/accessibility)（颜色对比度、ARIA 标签、键盘导航）。
* 在工具栏和视图中使用命令操作。

**❌ 不建议**

* 用于促销（升级、赞助商等）。
* 用于向导。
* 在每个窗口上打开。
* 在插件更新时打开（改为通过通知询问）。
* 添加与编辑器或工作区无关的功能。
* 重复现有功能（欢迎页面、设置、配置等）。

## Webview 示例

**Simple Browser**

此插件在编辑器侧面打开浏览器预览。

<!-- 图片已移除 -->

*此示例显示了直接在 Baosky 内部开发的 Baosky Web。Webview 面板用于渲染类似浏览器的窗口。*

**Pull Request**

此插件在自定义树视图中显示工作区存储库的拉取请求，然后使用 webview 显示拉取请求的详细视图。

<!-- 图片已移除 -->

## Webview 视图

您还可以将 webview 放置到任何视图容器（侧边栏或面板）中，这些元素称为 [webview 视图](/api/references/baosky-api#WebviewView)。同样的 webview 指南也适用于 webview 视图。

<!-- 图片已移除 -->

*此 webview 视图显示了用于创建拉取请求的内容，其中使用了下拉列表、输入框和按钮。*

## 链接

* [Webview 插件指南](/api/extension-guides/webview)
* [Webview 插件示例](https://github.com/Microsoft/baosky-extension-samples/tree/main/webview-sample)
* [Webview 视图插件示例](https://github.com/microsoft/baosky-extension-samples/tree/main/webview-view-sample)