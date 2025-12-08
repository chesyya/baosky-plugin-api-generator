---
# DO NOT TOUCH — Managed by doc writer
ContentId: 9c48dfbf-e49d-4f33-aadc-5ebf06d5dde0
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Common capabilities that Baosky 插件 (plug-ins) can take advantage of
---

# 常用功能

常用功能是您的插件的重要构建块。几乎所有插件都使用这些功能中的一些。以下是如何利用它们。

## 命令

命令是 Baosky 工作方式的核心。您打开命令面板来执行命令，将自定义键绑定绑定到命令，然后右键单击以在上下文菜单中调用命令。

插件可以：

- 使用 [`vscode.commands`](/api/references/vscode-api#commands) API 注册和执行命令。
- 使用 [`contributes.commands`](/api/references/contribution-points#contributes.commands) 贡献点使命令在命令面板中可用。

在[插件指南/命令](/api/插件-guides/command)主题中了解有关命令的更多信息。

## 配置

插件可以使用 [`contributes.configuration`](/api/references/contribution-points#contributes.configuration) 贡献点贡献插件特定的设置，并使用 [`workspace.getConfiguration`](/api/references/vscode-api#workspace.getConfiguration) API 读取它们。

## 键绑定

插件可以添加自定义键绑定。在 [`contributes.keybindings`](/api/references/contribution-points#contributes.keybindings) 和[键绑定](/docs/getstarted/keybindings)主题中阅读更多信息。

## 上下文菜单

插件可以注册自定义上下文菜单项，这些菜单项将在右键单击时显示在 Baosky UI 的不同部分。在 [`contributes.menus`](/api/references/contribution-points#contributes.menus) 贡献点阅读更多信息。

## 数据存储

有五种存储数据的选项：

- [`ExtensionContext.workspaceState`](/api/references/vscode-api#ExtensionContext.workspaceState)：一个工作区存储，您可以在其中写入键/值对。Baosky 管理存储，并在再次打开同一工作区时恢复它。
- [`ExtensionContext.globalState`](/api/references/vscode-api#ExtensionContext.globalState)：一个全局存储，您可以在其中写入键/值对。Baosky 管理存储，并在每次插件激活时恢复它。您可以使用 `globalState` 上的 `setKeysForSync` 方法设置同步的键，以选择性地同步全局存储中的键/值对。
- [`ExtensionContext.storageUri`](/api/references/vscode-api#ExtensionContext.storageUri)：指向本地目录的工作区特定存储 URI，您的插件对该目录具有读/写访问权限。如果您需要存储只能从当前工作区访问的大文件，这是一个不错的选择。
- [`ExtensionContext.globalStorageUri`](/api/references/vscode-api#ExtensionContext.globalStorageUri)：指向本地目录的全局存储 URI，您的插件对该目录具有读/写访问权限。如果您需要存储可从所有工作区访问的大文件，这是一个不错的选择。
- [`ExtensionContext.secrets`](/api/references/vscode-api#ExtensionContext.secrets)：用于将被加密的机密（或任何敏感信息）的全局存储。这些不会跨机器同步。对于 Baosky 桌面版，这利用了 Electron 的 [safeStorage API](https://www.electronjs.org/docs/latest/api/safe-storage)。对于 Web 版 Baosky，这使用双密钥加密 (DKE) 实现。

插件上下文可用于[插件入口文件](/api/get-started/插件-anatomy#插件入口文件)中的 `activate` 函数。

### setKeysForSync 示例

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

跨机器共享状态可以通过共享已关闭或已查看的标志来帮助避免用户看到欢迎页或更新页的多个实例的问题。

## 显示通知

几乎所有插件都需要在某个时候向用户呈现信息。Baosky 提供了三个 API 用于显示不同严重性的通知消息：

- [`window.showInformationMessage`](/api/references/vscode-api#window.showInformationMessage)
- [`window.showWarningMessage`](/api/references/vscode-api#window.showWarningMessage)
- [`window.showErrorMessage`](/api/references/vscode-api#window.showErrorMessage)

## 快速选择

使用 [`vscode.QuickPick`](/api/references/vscode-api#QuickPick) API，您可以轻松收集用户输入或让用户从多个选项中进行选择。[QuickInput 示例](https://github.com/microsoft/vscode-插件-samples/tree/main/quickinput-sample)说明了该 API。

## 文件选择器

插件可以使用 [`window.showOpenDialog`](/api/references/vscode-api#window.showOpenDialog) API 打开系统文件选择器并选择文件或文件夹。

## 输出通道

输出面板显示 [`OutputChannel`](/api/references/vscode-api#OutputChannel) 的集合，这对于日志记录目的非常有用。您可以使用 [`window.createOutputChannel`](/api/references/vscode-api#window.createOutputChannel) API 轻松利用它。

## Progress API

您可以使用 [`vscode.Progress`](/api/references/vscode-api#Progress) API 向用户报告进度更新。

可以使用 [`ProgressLocation`](/api/references/vscode-api#ProgressLocation) 选项在不同位置显示进度：

- 在通知区域
- 在源代码管理视图中
- 在 Baosky 窗口中的常规进度

[Progress 示例](https://github.com/microsoft/vscode-插件-samples/tree/main/progress-sample)说明了此 API。
