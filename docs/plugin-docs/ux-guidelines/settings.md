---
# DO NOT TOUCH — Managed by doc writer

ContentId: 9f5daebb-1566-46b8-a04d-0fd6c5d4a926
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: 由 Baosky 插件贡献的设置的 UX 指南。
---

# 设置

[设置](/api/references/contribution-points#contributes.configuration) 是用户配置您的插件的方式。设置可以是输入框、布尔值、下拉列表、列表、键/值对。如果您的插件需要用户配置特定设置，您可以打开设置 UI 并通过设置 ID 查询您的插件设置。

**✔️ 建议**

* 为每个设置添加默认值。
* 为每个设置添加清晰的描述。
* 链接到复杂设置的文档。
* 链接到相关的其他设置。
* 当需要用户配置特定设置时，链接到设置 ID。

**❌ 不建议**

* 创建您自己的设置页面/webview。
* 创建过长的描述。

<!-- 图片已移除 -->

*此示例使用设置 ID 链接到特定设置。*

## 链接

* [配置贡献点](/api/references/contribution-points#contributes.configuration)