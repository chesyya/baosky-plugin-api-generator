---
# DO NOT TOUCH — Managed by doc writer
ContentId: fdd5476c-13e2-4f78-9dd3-0157eed36a29
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: UX guidelines for using context menus in a Baosky 插件.
---

# 上下文菜单

[菜单项](/api/references/contribution-points#contributes.menus)出现在视图、操作和右键菜单中。重要的是菜单分组保持一致。如果你的插件有与文件相关的操作，请将你的操作放在文件资源管理器上下文菜单中（在适当的时候）。如果插件对某些文件类型有操作，只为这些项目显示它。

**✔️ 应该**

* 在上下文适当时显示操作
* 将类似的操作分组在一起
* 将大量操作组放入子菜单

❌ 不应该

* 为每个文件显示操作而不考虑上下文

<!-- 图片已移除 -->

*此示例将 **Copy GitHub Permalink** 放在其他复制命令旁边。此操作仅出现在来自 GitHub 存储库的文件上。*

## 链接

* [上下文菜单 API 参考](/api/references/contribution-points#contributes.menus)
