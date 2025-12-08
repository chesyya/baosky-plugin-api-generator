---
# DO NOT TOUCH — Managed by doc writer

ContentId: 92904eb4-6ef0-4801-80d2-6c2c3326ad82
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: Baosky 插件中通知的 UX 指南。
---

# 通知

[通知](/api/extension-capabilities/common-capabilities#display-notifications) 从 Baosky 的右下角弹出，显示简短的信息。

<!-- 图片已移除 -->

您可以发送三种类型的通知：

* [信息](/api/references/baosky-api#window.showInformationMessage)
* [警告](/api/references/baosky-api#window.showWarningMessage)
* [错误](/api/references/baosky-api#window.showErrorMessage)

限制发送的通知数量非常重要，以尊重用户的注意力。为了帮助您决定是否应该显示通知，请遵循我们的通知决策树：

[<!-- 图片已移除 -->](/assets/api/ux-guidelines/examples/notification-decision-tree.png)

## 通知示例

<!-- 图片已移除 -->

*此通知在用户运行 **更新版本** 命令后出现。请注意，这里没有其他操作，纯粹是信息性的。*

<!-- 图片已移除 -->

*此示例突出了一个功能的问题，该功能需要用户输入并显示解决该问题的操作。*

<!-- 图片已移除 -->

*此示例显示了一个失败通知，其中包含解决问题的操作。*

**✔️ 建议**

* 仅在绝对必要时才发送通知，以此尊重用户的注意力
* 为每个通知添加 **不再显示** 选项
* 一次只显示一个通知

**❌ 不建议**

* 发送重复的通知
* 用于促销
* 在首次安装时请求反馈
* 如果没有任何操作，则显示操作

## 进度通知

当需要在不确定的时间范围内显示进度（例如，设置环境）时，可以使用进度通知。这种类型的全局进度通知应作为最后的手段使用，因为进度最好保持在上下文中（在视图或编辑器内）。

**✔️ 建议**

* 显示链接以查看更多详细信息（如日志）
* 随着设置的进行显示信息（正在初始化、正在构建等）
* 提供取消操作的选项（如果适用）
* 为超时场景添加计时器

**❌ 不建议**

* 让通知一直处于运行状态

<!-- 图片已移除 -->

*此示例使用进度通知来显示远程连接所涉及的设置，同时也提供了指向输出日志（**详细信息**）的链接。*

## 模态对话框

当您需要用户立即输入以进行操作时，可以选择显示模态对话框。应谨慎使用此 UI 元素，因为模态对话框会阻止对话框之外的用户交互，直到将其关闭。

<!-- 图片已移除 -->

*此对话框在移动 JavaScript/TypeScript 文件后出现，询问是否更新其他文件中的导入语句。*

**✔️ 建议**

* 仅当您需要立即的用户交互时才使用模态对话框
* 在适当的情况下，提供避免重复用户确认的操作（*总是*/*从不* 操作）
* 考虑使用复选框来记住用户的选择

**❌ 不建议**

* 使用模态对话框确认多个步骤
* 使用模态对话框显示不需要用户操作的消息
* 为非用户明确发起的操作显示模态对话框

## 链接

* [Hello World 插件示例](https://github.com/microsoft/baosky-extension-samples/tree/main/helloworld-sample)
* [通知插件示例](https://github.com/microsoft/baosky-extension-samples/tree/main/notifications-sample)