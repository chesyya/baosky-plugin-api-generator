---
# DO NOT TOUCH — Managed by doc writer
ContentId: 9c48dfbf-e49d-4f33-aadc-5ebf06d5dde0
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Common capabilities that Baosky 插件 (plug-ins) can take advantage of
---

# Common Capabilities

Common Capabilities 是您插件的重要构建块。几乎所有插件都使用其中一些功能。以下是您如何利用它们。

## Command

命令是 Baosky 工作方式的核心。您打开命令面板来执行命令，将自定义快捷键绑定到命令，以及右键单击在上下文菜单中调用命令。

插件可以：

- 使用 [`code`](/api/references/baosky-api#commands) API 注册和执行命令。
- 使用 [`code`](/api/references/contribution-points#contributes.commands) 贡献点在命令面板中提供命令。

在[插件指南 / Command](/api/插件-guides/command) 主题中了解更多关于命令的信息。

## Configuration

插件可以使用 [`code`](/api/references/contribution-points#contributes.configuration) 贡献点提供插件特定的设置，并使用 [`code`](/api/references/baosky-api#workspace.getConfiguration) API 读取它们。

## Keybinding

插件可以添加自定义快捷键。在 [`code`](/api/references/contribution-points#contributes.keybindings) 和 [Key Bindings](/docs/getstarted/keybindings) 主题中了解更多信息。

## Context Menu

插件可以注册自定义上下文菜单项，这些项将在右键单击时显示在 Baosky UI 的不同部分。在 [`code`](/api/references/contribution-points#contributes.menus) 贡献点了解更多信息。

## Data Storage

有五种存储数据的选项：

- [`code`](/api/references/baosky-api#ExtensionContext.workspaceState): 一个工作区存储，您可以在其中写入键/值对。Baosky 管理存储，并在再次打开同一工作区时恢复它。
- [`code`](/api/references/baosky-api#ExtensionContext.globalState): 一个全局存储，您可以在其中写入键/值对。Baosky 管理存储，并在每次插件激活时恢复它。您可以通过在 `globalState` 上使用 `setKeysForSync` 方法设置同步键来选择性地同步全局存储中的键/值对。
- [`code`](/api/references/baosky-api#ExtensionContext.storageUri): 一个工作区特定的存储 URI，指向您的插件具有读/写访问权限的本地目录。如果您需要存储仅从当前工作区访问的大文件，这是一个不错的选择。
- [`code`](/api/references/baosky-api#ExtensionContext.globalStorageUri): 一个全局存储 URI，指向您的插件具有读/写访问权限的本地目录。如果您需要存储可从所有工作区访问的大文件，这是一个不错的选择。
- [`code`](/api/references/baosky-api#ExtensionContext.secrets): 用于存储将被加密的机密（或任何敏感信息）的全局存储。这些不会在机器之间同步。对于 Baosky 桌面版，这利用了 Electron 的 [safeStorage API](https://www.electronjs.org/docs/latest/api/safe-storage)。对于 Baosky Web 版，这使用双密钥加密 (DKE) 实现。

插件上下文可用于[插件入口文件](/api/get-started/插件-anatomy#插件-entry-file)中的 `activate` 函数。

### setKeysForSync example

如果您的插件需要在不同机器之间保留某些用户状态，则使用 `vscode.ExtensionContext.globalState.setKeysForSync` 将状态提供给[设置同步](/docs/configure/settings-sync)。

您可以使用以下模式：

```TypeScript
// on activate
const versionKey = 'shown.version';
context.globalState.setKeysForSync([versionKey]);

// later on show page
const currentVersion = context.extension.packageJSON.version;
const lastVersionShown = context.globalState.get(versionKey);
if (isHigher(currentVersion, lastVersionShown)) {
    context.globalState.update(versionKey, currentVersion);
}
```

通过共享已关闭或已查看的标志，跨机器共享状态可以帮助避免用户看到多个欢迎页面或更新页面实例的问题。

## Display Notifications

几乎所有插件都需要在某个时候向用户呈现信息。Baosky 提供了三个 API 用于显示不同严重程度的通知消息：

- [`code`](/api/references/baosky-api#window.showInformationMessage)
- [`code`](/api/references/baosky-api#window.showWarningMessage)
- [`code`](/api/references/baosky-api#window.showErrorMessage)

## Quick Pick

使用 [`code`](/api/references/baosky-api#QuickPick) API，您可以轻松收集用户输入或让用户从多个选项中进行选择。[QuickInput sample](https://github.com/microsoft/baosky-插件-samples/tree/main/quickinput-sample) 说明了该 API。

## File Picker

插件可以使用 [`code`](/api/references/baosky-api#window.showOpenDialog) API 打开系统文件选择器并选择文件或文件夹。

## Output Channel

输出面板显示一组 [`code`](/api/references/baosky-api#OutputChannel)，这对于日志记录目的非常有用。您可以使用 [`code`](/api/references/baosky-api#window.createOutputChannel) API 轻松利用它。

## Progress API

您可以使用 [`code`](/api/references/baosky-api#Progress) API 向用户报告进度更新。

使用 [`code`](/api/references/baosky-api#ProgressLocation) 选项可以在不同位置显示进度：

- 在通知区域
- 在源代码控制视图中
- 在 Baosky 窗口中的常规进度

[Progress sample](https://github.com/microsoft/baosky-插件-samples/tree/main/progress-sample) 说明了此 API。
