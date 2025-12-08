---
# DO NOT TOUCH — Managed by doc writer
ContentId: C83BB647-A37E-45CE-BA4C-837B397C2ABE
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: 为了支持 Baosky 插件（plug-ins）的延迟激活，您的插件可以通过一组激活事件来控制何时应该加载。
---

# 激活事件

**激活事件**是您在 `package.json` [插件清单](/api/references/插件-manifest)的 `activationEvents` 字段中声明的一组 JSON 声明。当**激活事件**发生时，您的插件就会被激活。以下是所有可用的**激活事件**列表：

- [`onAuthenticationRequest`](/api/references/activation-events#onAuthenticationRequest)
- [`onChatParticipant`](/api/references/activation-events#onChatParticipant)
- [`onCommand`](/api/references/activation-events#onCommand)
- [`onCustomEditor`](/api/references/activation-events#onCustomEditor)
- [`onDebug`](/api/references/activation-events#onDebug)
  - [`onDebugAdapterProtocolTracker`](/api/references/activation-events#onDebugAdapterProtocolTracker)
  - [`onDebugDynamicConfigurations`](/api/references/activation-events#onDebugDynamicConfigurations)
  - [`onDebugInitialConfigurations`](/api/references/activation-events#onDebugInitialConfigurations)
  - [`onDebugResolve`](/api/references/activation-events#onDebugResolve)
- [`onEditSession`](/api/references/activation-events#onEditSession)
- [`onFileSystem`](/api/references/activation-events#onFileSystem)
- [`onIssueReporterOpened`](/api/references/activation-events#onIssueReporterOpened)
- [`onLanguage`](/api/references/activation-events#onLanguage)
- [`onLanguageModelTool`](/api/references/activation-events#onLanguageModelTool)
- [`onNotebook`](/api/references/activation-events#onNotebook)
- [`onOpenExternalUri`](/api/references/activation-events#onOpenExternalUri)
- [`onRenderer`](/api/references/activation-events#onRenderer)
- [`onSearch`](/api/references/activation-events#onSearch)
- [`onStartupFinished`](/api/references/activation-events#onStartupFinished)
- [`onTaskType`](/api/references/activation-events#onTaskType)
- [`onTerminal`](/api/references/activation-events.md#onTerminal)
    - [`onTerminalProfile`](/api/references/activation-events#onTerminalProfile)
    - [`onTerminalShellIntegration`](/api/references/activation-events.md#onTerminalShellIntegration)
- [`onUri`](/api/references/activation-events#onUri)
- [`onView`](/api/references/activation-events#onView)
- [`onWalkthrough`](/api/references/activation-events#onWalkthrough)
- [`onWebviewPanel`](/api/references/activation-events#onWebviewPanel)
- [`workspaceContains`](/api/references/activation-events#workspaceContains)
- [`*`](/api/references/activation-events#Start-up)

我们还提供了 [`package.json` 插件清单](/api/references/插件-manifest)中所有字段的参考。

## onLanguage

每当打开解析为特定语言的文件时，都会发出此激活事件，相关的插件将被激活。

```json
"activationEvents": [
    "onLanguage:python"
]
```

`onLanguage` 事件接受一个[语言标识符](/docs/languages/identifiers)值。

可以在 `activationEvents` 数组中使用单独的 `onLanguage` 条目来声明多种语言。

```json
"activationEvents": [
    "onLanguage:json",
    "onLanguage:markdown",
    "onLanguage:typescript"
]
```

> **注意**：从 Baosky 1.74.0 开始，您的插件贡献的语言不再需要相应的 `onLanguage` 激活事件声明即可激活您的插件。

此外，如果您的插件需要在使用任何语言之前激活，您可以使用通用的 `onLanguage` 激活事件来确保这一点：

```json
"activationEvents": [
    "onLanguage"
]
```

> **注意**：最佳实践是仅在用户需要您的插件时才激活。如果您的插件适用于某个语言子集，最好列出该子集，而不是在所有语言上激活。

## onCommand

每当调用命令时，都会发出此激活事件，相关的插件将被激活：

```json
"activationEvents": [
    "onCommand:extension.sayHello"
]
```

> **注意**：从 Baosky 1.74.0 开始，您的插件贡献的命令不再需要相应的 `onCommand` 激活事件声明即可激活您的插件。

## onDebug

在调试会话开始之前，会发出此激活事件，相关的插件将被激活：

```json
"activationEvents": [
    "onDebug"
]
```

还有四个更细粒度的 `onDebug` 激活事件：

### onDebugAdapterProtocolTracker

当即将启动具有特定类型的调试会话并且可能需要调试协议跟踪器时，会发出 `onDebugAdapterProtocolTracker`。

### onDebugDynamicConfigurations

在调用 `DebugConfigurationProvider` 的 `provideDebugConfigurations` 方法以提供动态调试配置之前，会发出此激活事件，例如当用户通过 UI 的"选择并开始调试"命令请求它们时。

此激活事件的存在用作插件贡献动态调试配置的信号。

### onDebugInitialConfigurations

在调用 `DebugConfigurationProvider` 的 `provideDebugConfigurations` 方法以提供初始调试配置之前，会发出此激活事件，例如每当需要创建 `launch.json` 时。

### onDebugResolve

在为指定类型调用 `DebugConfigurationProvider` 的 `resolveDebugConfiguration` 方法之前，会触发 `onDebugResolve:type`。

**经验法则：**如果调试插件的激活是轻量级的，请使用 `onDebug`。如果是重量级的，则根据 `DebugConfigurationProvider` 是否实现了相应的方法 `provideDebugConfigurations` 和/或 `resolveDebugConfiguration`，使用 `onDebugInitialConfigurations` 和/或 `onDebugResolve`。有关这些方法的更多详细信息，请参见[使用 DebugConfigurationProvider](/api/插件-guides/debugger-插件#using-a-debugconfigurationprovider)。

## workspaceContains

每当打开文件夹并且该文件夹包含至少一个与[全局模式](/docs/editor/glob-patterns)匹配的文件时，就会发出 `workspaceContains:path`，相关的插件将被激活。

```json
"activationEvents": [
    "workspaceContains:**/.editorconfig"
]
```

## onFileSystem

每当读取来自特定 _scheme_ 的文件或文件夹时，就会发出 `onFileSystem:scheme`，相关的插件将被激活。这通常是 `file` scheme，但通过自定义文件系统提供程序，会出现更多 scheme，例如 `ftp` 或 `ssh`。

```json
"activationEvents": [
    "onFileSystem:sftp"
]
```

## onView

每当在 Baosky 侧边栏中展开指定 id 的视图时，都会发出此激活事件，相关的插件将被激活。内置视图不会发出激活事件。

下面的激活事件将在具有 `nodeDependencies` id 的视图可见时触发：

```json
"activationEvents": [
    "onView:nodeDependencies"
]
```

> **注意**：从 Baosky 1.74.0 开始，您的插件贡献的视图不再需要相应的 `onView` 激活事件声明即可激活您的插件。

## onUri

每当打开该插件的系统范围 Uri 时，都会发出此激活事件，相关的插件将被激活。Uri scheme 固定为 `vscode` 或 `vscode-insiders`。Uri authority 必须是插件的标识符。Uri 的其余部分是任意的。

```json
"activationEvents": [
    "onUri"
]
```

如果 `vscode.git` 插件将 `onUri` 定义为激活事件，它将在打开以下任何 Uri 时被激活：

- `vscode://vscode.git/init`
- `vscode://vscode.git/clone?url=https%3A%2F%2Fgithub.com%2FMicrosoft%2Fvscode-vsce.git`
- `vscode-insiders://vscode.git/init`（用于 Baosky Insiders）

## onWebviewPanel

每当 Baosky 需要还原具有匹配 `viewType` 的 [webview](/api/插件-guides/webview) 时，都会发出此激活事件，相关的插件将被激活。

例如，下面的 `onWebviewPanel` 声明：

```json
"activationEvents": [
    "onWebviewPanel:catCoding"
]
```

将导致在 Baosky 需要还原具有 viewType: `catCoding` 的 webview 时激活插件。viewType 在调用 `window.createWebviewPanel` 时设置，您需要有另一个激活事件（例如 onCommand）来初始激活您的插件并创建 webview。

## onCustomEditor

每当 Baosky 需要创建具有匹配 `viewType` 的[自定义编辑器](/api/插件-guides/custom-editors)时，都会发出此激活事件，相关的插件将被激活。

例如，下面的 `onCustomEditor` 声明：

```json
"activationEvents": [
    "onCustomEditor:catCustoms.pawDraw"
]
```

将导致在 Baosky 需要还原具有 viewType: `catCustoms.pawDraw` 的自定义编辑器时激活插件。viewType 在 [`customEditors` 贡献点](/api/插件-guides/custom-editors#contribution-point)中设置，并通过 `registerCustomEditorProvider` 绑定到提供程序。

> **注意**：从 Baosky 1.74.0 开始，您的插件贡献的自定义编辑器不再需要相应的 `onCustomEditor` 激活事件声明即可激活您的插件。

## onAuthenticationRequest

每当插件请求具有匹配 `providerId` 的身份验证会话（通过 `authentication.getSession()` API）时，都会发出此激活事件，相关的插件将被激活。

例如，下面的 `onAuthenticationRequest` 声明：

```json
"activationEvents": [
    "onAuthenticationRequest:github"
]
```

将导致在 Baosky 需要检索类型为 `github` 的 `AuthenticationSession` 时激活插件。

> **注意**：从 Baosky 1.74.0 开始，您的插件贡献的身份验证提供程序不再需要相应的 `onAuthenticationRequest` 激活事件声明即可激活您的插件。

## onStartupFinished

此激活事件在 Baosky 启动后**一段时间**发出，相关的插件将被激活。这类似于 `*` 激活事件，但不会减慢 Baosky 启动速度。目前，此事件在所有 `*` 激活的插件完成激活后发出。

```json
"activationEvents": [
    "onStartupFinished"
]
```

## onTaskType

每当需要列出或解析某种类型的任务时，就会发出 `onTaskType:type`。

```json
"activationEvents": [
    "onTaskType:npm"
]
```

> **注意**：从 Baosky 1.76.0 开始，您的插件贡献的任务不再需要相应的 `onTaskType` 激活事件声明即可激活您的插件。

## onEditSession

当使用给定 scheme 访问编辑会话时，会发出 `onEditSession:scheme`。

```json
"activationEvents": [
    "onEditSession:file"
]
```

## onSearch

当在具有给定 scheme 的文件夹中开始搜索时，会发出 `onSearch:scheme`。

```json
"activationEvents": [
    "onSearch:file"
]
```

## onOpenExternalUri

每当打开外部 URI（例如 http 或 https 链接）时发出的激活事件。

```json
"activationEvents": [
    "onOpenExternalUri"
]
```

## onNotebook

当打开指定的 notebook 文档类型时，会发出 `onNotebook:type`。

```json
"activationEvents": [
    "onNotebook:jupyter-notebook",
    "onNotebook:interactive"
]
```

## onRenderer

当使用 notebook 输出渲染器时，会发出 `onRenderer:id`。

```json
"activationEvents": [
    "onRenderer:ms-toolsai.jupyter-renderers"
]
```

## onTerminal

当打开具有给定 shell 类型的特定终端时，会发出 `onTerminal:shellType`。

```json
"activationEvents": [
  "onTerminal:bash"
]
```

## onTerminalProfile

当启动特定终端配置文件时，会发出 `onTerminalProfile:id`。

```json
"activationEvents": [
    "onTerminalProfile:terminalTest.terminal-profile"
]
```

## onTerminalShellIntegration

当具有给定 shell 类型的终端激活了 shell 集成时，会发出 `onTerminalShellIntegration:shellType`。

```json
"activationEvents": [
    "onTerminalShellIntegration:bash"
]
```

## onWalkthrough

当打开指定的演练时，会发出 `onWalkthrough:id`。

```json
"activationEvents": [
    "onWalkthrough:nodejsWelcome"
]
```

## onIssueReporterOpened

当问题报告器被打开时（例如，通过使用 **Help: Report Issue**），会发出此激活事件。

```json
"activationEvents": [
    "onIssueReporterOpened"
]
```

## onChatParticipant

当调用指定的聊天参与者时发出的激活事件。

```json
"activationEvents": [
    "onChatParticipant:my-chat-participant"
]
```

## onLanguageModelTool

当调用指定的语言模型工具时发出的激活事件。

```json
"activationEvents": [
    "onLanguageModelTool:my-language-model-tool"
]
```

## 启动

每当 Baosky 启动时，都会发出 `*` 激活事件，相关的插件将被激活。

> **注意**：为了确保良好的用户体验，请仅在其他激活事件组合无法满足您的用例时才在插件中使用此激活事件。

```json
"activationEvents": [
    "*"
]
```

> **注意**：插件可以监听多个激活事件，这比监听 `"*"` 更可取。

> **注意**：插件**必须**从其主模块导出 `activate()` 函数，并且当发出任何指定的激活事件时，Baosky **只会调用一次**该函数。此外，插件**应该**从其主模块导出 `deactivate()` 函数，以在 Baosky 关闭时执行清理任务。如果清理过程是异步的，插件**必须**从 `deactivate()` 返回 Promise。如果清理同步运行，插件可以从 `deactivate()` 返回 `undefined`。
