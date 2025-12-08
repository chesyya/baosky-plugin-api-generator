---
# DO NOT TOUCH — Managed by doc writer
ContentId: 92904eb4-6ef0-4801-80d2-6c2c3326ad82
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: UX guidelines for notifications in a Baosky 插件.
---

# 通知

[通知](/api/插件-capabilities/common-capabilities#display-notifications)显示从 Baosky 右下角浮出的简短信息。

<!-- 图片已移除 -->

您可以发送三种类型的通知：

* [信息](/api/references/vscode-api#window.showInformationMessage)
* [警告](/api/references/vscode-api#window.showWarningMessage)
* [错误](/api/references/vscode-api#window.showErrorMessage)

为了尊重用户的注意力，限制发送的通知数量非常重要。为了帮助您决定是否应该显示通知，请遵循我们的通知决策树：

[<!-- 图片已移除 -->](/assets/api/ux-guidelines/examples/notification-decision-tree.png)

## Notification examples

<!-- 图片已移除 -->

*This notification appears after the user runs an **Update version** command. Notice that there are no additional actions and is purely informational.*

<!-- 图片已移除 -->

*This example highlights an issue with a feature that requires user input and shows actions to resolve the issue.*

<!-- 图片已移除 -->

*This example shows a failure notification with an action to resolve the issue.*

**✔️ Do**

* Respect the user's attention by only sending notifications when absolutely necessary
* Add a **Do not show again** option for every notification
* Show one notification at a time

**❌ Don't**

* Send repeated notifications
* Use for promotion
* Ask for feedback on the first install
* Show actions if there aren't any

## Progress notification

When needing to display progress for an indeterminate timeframe (for example, setting up an environment), you can use the progress notification. This type of global progress notification should be used as a last resort as progress is best kept within context (within a view or editor).

**✔️ Do**

* Show a link to see more details (like logs)
* Show information as setup progresses (initializing, building, etc.)
* Provide an action to cancel the operation (if applicable)
* Add timers for timed out scenarios

**❌ Don't**

* Leave a notification running in progress

<!-- 图片已移除 -->

*This example uses the progress notification to show the setup involved for a remote connection, while also providing a link to the output logs (**details**).*

## Modal dialog

When you need immediate user input for an action, you can opt to show a modal dialog. This UI element should be used with caution because a modal dialog blocks user interactions outside the dialog, until it's dismissed.

<!-- 图片已移除 -->

*This dialog appears after moving a JavaScript/TypeScript file, asking to update import statements in other files.*

**✔️ Do**

* Only use modal dialogs if you need immediate user interaction
* Where appropriate, provide an action to avoid repeated user confirmation (*Always*/*Never* action)
* Consider using a checkbox to remember the user's choice

**❌ Don't**

* Use modal dialogs to confirm multiple steps
* Use modal dialogs for showing messages that don't require an action from the user
* Show a modal dialog for actions that are not explicitly initiated by the user

## Links

* [Hello World 插件 sample](https://github.com/microsoft/vscode-插件-samples/tree/main/helloworld-sample)
* [Notifications 插件 sample](https://github.com/microsoft/vscode-插件-samples/tree/main/notifications-sample)
