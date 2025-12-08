---
# DO NOT TOUCH — Managed by doc writer
ContentId: bf0d9a5e-897b-450a-adf4-3c8ca9b8e9de
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: UX guidelines for the Command Palette in a Baosky 插件.
---

# 命令面板

[命令面板](/api/references/contribution-points#contributes.commands)是找到所有命令的地方。重要的是你的命令名称要标记得当，以便用户可以轻松找到它们。

**✔️ 应该**

* 在适当的地方添加键盘快捷键
* 为命令使用清晰的名称
* 将命令按相同类别分组

❌ 不应该

* 覆盖现有的键盘快捷键
* 在命令名称中使用表情符号

<!-- 图片已移除 -->

*此示例展示的命令每个都显示一个清晰的 `category` 前缀，例如 "GitHub Issues"。*

## 链接

* [命令 API 参考](/api/references/contribution-points#contributes.commands)
* [命令插件指南](/api/插件-guides/command)
* [Hello World 插件示例](https://github.com/microsoft/baosky-插件-samples/tree/main/helloworld-sample)
