---
# DO NOT TOUCH — Managed by doc writer
ContentId: C83BB647-A37E-45CE-BA4C-837B397C2ABE
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: To support lazy activation of Baosky 插件 (plug-ins), your 插件 controls when it should be loaded through a set of Activation Events.
---

# 激活事件

**激活事件**是您在 `package.json` [插件清单](/api/references/插件-manifest)的 `activationEvents` 字段中进行的一组 JSON 声明。当**激活事件**发生时，您的插件将被激活。以下是所有可用的**激活事件**列表：

- [`code`](/api/references/activation-events#onAuthenticationRequest)
- [`code`](/api/references/activation-events#onChatParticipant)
- [`code`](/api/references/activation-events#onCommand)
- [`code`](/api/references/activation-events#onCustomEditor)
- [`code`](/api/references/activation-events#onDebug)
  - [`code`](/api/references/activation-events#onDebugAdapterProtocolTracker)
  - [`code`](/api/references/activation-events#onDebugDynamicConfigurations)
  - [`code`](/api/references/activation-events#onDebugInitialConfigurations)
  - [`code`](/api/references/activation-events#onDebugResolve)
- [`code`](/api/references/activation-events#onEditSession)
- [`code`](/api/references/activation-events#onFileSystem)
- [`code`](/api/references/activation-events#onIssueReporterOpened)
- [`code`](/api/references/activation-events#onLanguage)
- [`code`](/api/references/activation-events#onLanguageModelTool)
- [`code`](/api/references/activation-events#onNotebook)
- [`code`](/api/references/activation-events#onOpenExternalUri)
- [`code`](/api/references/activation-events#onRenderer)
- [`code`](/api/references/activation-events#onSearch)
- [`code`](/api/references/activation-events#onStartupFinished)
- [`code`](/api/references/activation-events#onTaskType)
- [`code`](/api/references/activation-events.md#onTerminal)
    - [`code`](/api/references/activation-events#onTerminalProfile)
    - [`code`](/api/references/activation-events.md#onTerminalShellIntegration)
- [`code`](/api/references/activation-events#onUri)
- [`code`](/api/references/activation-events#onView)
- [`code`](/api/references/activation-events#onWalkthrough)
- [`code`](/api/references/activation-events#onWebviewPanel)
- [`code`](/api/references/activation-events#workspaceContains)
- [`code`](/api/references/activation-events#Start-up)

我们还提供了 [`code` 插件清单](/api/references/插件-manifest)中所有字段的参考。

## onLanguage

当打开解析为特定语言的文件时，将发出此激活事件，感兴趣的插件将被激活。

```json
"activationEvents": [
    "onLanguage:python"
]
```

`onLanguage` 事件采用[语言标识符](/docs/languages/identifiers)值。

可以在 `activationEvents` 数组中使用单独的 `onLanguage` 条目声明多个语言。

```json
"activationEvents": [
    "onLanguage:json",
    "onLanguage:markdown",
    "onLanguage:typescript"
]
```

> **注意**：从 Baosky 1.74.0 开始，您的插件贡献的语言不需要相应的 `onLanguage` 激活事件声明即可激活您的插件。

此外，如果您的插件需要在使用任何语言之前激活，您可以使用通用的 `onLanguage` 激活事件来确保这一点：

```json
"activationEvents": [
    "onLanguage"
]
```

> **注意**：最佳实践是仅在用户需要您的插件时才激活。如果您的插件仅适用于语言的子集，则最好列出该子集而不是在所有语言上激活。

## onCommand

当调用命令时，将发出此激活事件，感兴趣的插件将被激活：

```json
"activationEvents": [
    "onCommand:extension.sayHello"
]
```

> **注意**：从 Baosky 1.74.0 开始，您的插件贡献的命令不需要相应的 `onCommand` 激活事件声明即可激活您的插件。

## onDebug

在调试会话启动之前，将发出此激活事件，感兴趣的插件将被激活：

```json
"activationEvents": [
    "onDebug"
]
```

以下是四个更细粒度的 `onDebug` 激活事件：

### onDebugAdapterProtocolTracker

当即将启动具有特定类型的调试会话并且可能需要调试协议跟踪器时，将发出 `onDebugAdapterProtocolTracker`。

### onDebugDynamicConfigurations

当用户请求动态调试配置时（例如通过 UI 使用"选择并开始调试"命令），在调用 `DebugConfigurationProvider` 的 `provideDebugConfigurations` 方法之前，将发出此激活事件。

此激活事件的存在用作插件贡献动态调试配置的信号。

### onDebugInitialConfigurations

在调用 `DebugConfigurationProvider` 的 `provideDebugConfigurations` 方法以提供初始调试配置时（例如每当需要创建 `launch.json` 时），将发出此激活事件。

### onDebugResolve

在调用指定类型的 `DebugConfigurationProvider` 的 `resolveDebugConfiguration` 方法之前，将触发 `onDebugResolve:type`。

**经验法则：** 如果调试插件的激活是轻量级的，请使用 `onDebug`。如果是重量级的，请使用 `onDebugInitialConfigurations` 和/或 `onDebugResolve`，具体取决于 `DebugConfigurationProvider` 是否实现了相应的方法 `provideDebugConfigurations` 和/或 `resolveDebugConfiguration`。有关这些方法的更多详细信息，请参阅[使用 DebugConfigurationProvider](/api/插件-guides/debugger-插件#using-a-debugconfigurationprovider)。

## workspaceContains

当打开文件夹并且该文件夹包含至少一个与 [glob 模式](/docs/editor/glob-patterns)匹配的文件时，将发出 `workspaceContains:path`，感兴趣的扩展将被激活。

```json
"activationEvents": [
    "workspaceContains:**/.editorconfig"
]
```

## onFileSystem

当读取来自特定 _scheme_ 的文件或文件夹时，将发出 `onFileSystem:scheme`，感兴趣的扩展将被激活。这通常是 `file` scheme，但使用自定义文件系统提供程序时，会引入更多 scheme，例如 `ftp` 或 `ssh`。

```json
"activationEvents": [
    "onFileSystem:sftp"
]
```

## onView

当在 Baosky 侧边栏中展开指定 id 的视图时，将发出此激活事件，感兴趣的插件将被激活。内置视图不会发出激活事件。

下面的激活事件将在具有 `nodeDependencies` id 的视图可见时触发：

```json
"activationEvents": [
    "onView:nodeDependencies"
]
```

> **注意**：从 Baosky 1.74.0 开始，您的插件贡献的视图不需要相应的 `onView` 激活事件声明即可激活您的插件。

## onUri

当打开该插件的系统范围 Uri 时，将发出此激活事件，感兴趣的插件将被激活。Uri scheme 固定为 `vscode` 或 `vscode-insiders`。Uri authority 必须是插件的标识符。Uri 的其余部分是任意的。

```json
"activationEvents": [
    "onUri"
]
```

如果 `vscode.git` 插件将 `onUri` 定义为激活事件，则在打开以下任何 Uri 时都将被激活：

- `vscode://vscode.git/init`
- `vscode://vscode.git/clone?url=https%3A%2F%2Fgithub.com%2FMicrosoft%2Fvscode-vsce.git`
- `vscode-insiders://vscode.git/init` (for Baosky Insiders)

## onWebviewPanel

当 Baosky 需要恢复具有匹配 `viewType` 的 [webview](/api/插件-guides/webview) 时，将发出此激活事件，感兴趣的插件将被激活。

例如，下面的 `onWebviewPanel` 声明：

```json
"activationEvents": [
    "onWebviewPanel:catCoding"
]
```

将导致插件在 Baosky 需要恢复 viewType 为 `catCoding` 的 webview 时被激活。viewType 在调用 `window.createWebviewPanel` 时设置，您需要有另一个激活事件（例如 onCommand）来初始激活您的插件并创建 webview。

## onCustomEditor

当 Baosky 需要创建具有匹配 `viewType` 的[自定义编辑器](/api/插件-guides/custom-editors)时，将发出此激活事件，感兴趣的插件将被激活。

例如，下面的 `onCustomEditor` 声明：

```json
"activationEvents": [
    "onCustomEditor:catCustoms.pawDraw"
]
```

将导致插件在 Baosky 需要恢复 viewType 为 `catCustoms.pawDraw` 的自定义编辑器时被激活。viewType 在 [`code` 贡献点](/api/插件-guides/custom-editors#contribution-point)中设置，并通过 `registerCustomEditorProvider` 绑定到提供程序。

> **注意**：从 Baosky 1.74.0 开始，您的插件贡献的自定义编辑器不需要相应的 `onCustomEditor` 激活事件声明即可激活您的插件。

## onAuthenticationRequest

当插件通过 `authentication.getSession()` API 请求具有匹配 `providerId` 的身份验证会话时，将发出此激活事件，感兴趣的插件将被激活。

例如，下面的 `onAuthenticationRequest` 声明：

```json
"activationEvents": [
    "onAuthenticationRequest:github"
]
```

将导致插件在 Baosky 需要检索类型为 `github` 的 `AuthenticationSession` 时被激活。

> **注意**：从 Baosky 1.74.0 开始，您的插件贡献的身份验证提供程序不需要相应的 `onAuthenticationRequest` 激活事件声明即可激活您的插件。

## onStartupFinished

在 Baosky 启动**一段时间后**，将发出此激活事件，感兴趣的插件将被激活。这类似于 `*` 激活事件，但不会减慢 Baosky 启动速度。目前，此事件在所有 `*` 激活的插件完成激活后发出。

```json
"activationEvents": [
    "onStartupFinished"
]
```

## onTaskType

当需要列出或解析特定类型的任务时，将发出 `onTaskType:type`。

```json
"activationEvents": [
    "onTaskType:npm"
]
```

> **注意**：从 Baosky 1.76.0 开始，您的插件贡献的任务不需要相应的 `onTaskType` 激活事件声明即可激活您的插件。

## onEditSession

当使用给定 scheme 访问编辑会话时，将发出 `onEditSession:scheme`。

```json
"activationEvents": [
    "onEditSession:file"
]
```

## onSearch

当在具有给定 scheme 的文件夹中开始搜索时，将发出 `onSearch:scheme`。

```json
"activationEvents": [
    "onSearch:file"
]
```

## onOpenExternalUri

当打开外部 URI（例如 http 或 https 链接）时发出的激活事件。

```json
"activationEvents": [
    "onOpenExternalUri"
]
```

## onNotebook

当打开指定的笔记本文档类型时，将发出 `onNotebook:type`。

```json
"activationEvents": [
    "onNotebook:jupyter-notebook",
    "onNotebook:interactive"
]
```

## onRenderer

当使用笔记本输出渲染器时，将发出 `onRenderer:id`。

```json
"activationEvents": [
    "onRenderer:ms-toolsai.jupyter-renderers"
]
```

## onTerminal

当打开具有给定 shell 类型的特定终端时，将发出 `onTerminal:shellType`。

```json
"activationEvents": [
  "onTerminal:bash"
]
```

## onTerminalProfile

当启动特定终端配置文件时，将发出 `onTerminalProfile:id`。

```json
"activationEvents": [
    "onTerminalProfile:terminalTest.terminal-profile"
]
```

## onTerminalShellIntegration

`onTerminalShellIntegration:shellType` is emitted when a terminal with the given shell type has shell integration activated.

```json
"activationEvents": [
    "onTerminalShellIntegration:bash"
]
```

## onWalkthrough

`onWalkthrough:id` is emitted when a specified walkthrough is opened.

```json
"activationEvents": [
    "onWalkthrough:nodejsWelcome"
]
```

## onIssueReporterOpened

This activation event is emitted when the issue reporter is opened (for example, by using **Help: Report Issue**).

```json
"activationEvents": [
    "onIssueReporterOpened"
]
```

## onChatParticipant

An activation event emitted when the specified chat participant is invoked.

```json
"activationEvents": [
    "onChatParticipant:my-chat-participant"
]
```

## onLanguageModelTool

An activation event emitted when the specified language model tool is invoked.

```json
"activationEvents": [
    "onLanguageModelTool:my-language-model-tool"
]
```

## Start up

The `*` activation event is emitted and interested 插件 will be activated whenever Baosky starts up.

> **Note:** To ensure a great user experience, please use this activation event in your 插件 only when no other activation events combination works in your use-case.

```json
"activationEvents": [
    "*"
]
```

> **Note:** An 插件 can listen to multiple activation events, and that is preferable to listening to `"*"`.

> **Note:** An 插件 **must** export an `activate()` function from its main module and it will be invoked **only once** by Baosky when any of the specified activation events is emitted. Also, an 插件 **should** export a `deactivate()` function from its main module to perform cleanup tasks on Baosky shutdown. 插件 **must** return a Promise from `deactivate()` if the cleanup process is asynchronous. An 插件 may return `undefined` from `deactivate()` if the cleanup runs synchronously.
