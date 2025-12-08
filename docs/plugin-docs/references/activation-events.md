---
# DO NOT TOUCH — Managed by doc writer

ContentId: C83BB647-A37E-45CE-BA4C-837B397C2ABE
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: 为了支持 Baosky 插件的延迟加载，您的插件可以通过一组激活事件来控制何时加载。
---

# 激活事件详解

在您的插件项目的 `package.json` 文件中，有一个名为 `activationEvents` 的字段，您可以在其中进行一系列 JSON 声明，这些声明被称为 **激活事件**。一旦触发了这些 **激活事件**，您的插件就会被启动。下表列出了所有可供使用的 **激活事件**：

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

此外，您还可以查阅 [`code` 插件清单](/api/references/extension-manifest) 文档，了解其中所有字段的详细信息。

## onLanguage

只要用户打开的文件被识别为特定语言，就会触发此激活事件，进而启动对此感兴趣的插件。

```json
"activationEvents": [
    "onLanguage:python"
]
```

`onLanguage` 事件需要指定一个[语言标识符](/docs/languages/identifiers)。

您也可以在 `activationEvents` 列表中添加多个 `onLanguage` 项，以支持多种语言：

```json
"activationEvents": [
    "onLanguage:json",
    "onLanguage:markdown",
    "onLanguage:typescript"
]
```

> **注意**：自 Baosky 1.74.0 版本起，如果您的插件自行贡献了语言支持，则无需再显式声明 `onLanguage` 激活事件，插件也能自动激活。

另外，如果您的插件需要在任何语言环境开始前就启动，可以使用通用的 `onLanguage` 事件来实现：

```json
"activationEvents": [
    "onLanguage"
]
```

> **注意**：我们建议仅在用户确实需要时才激活插件。如果您的插件只针对部分语言有效，请明确列出这些语言，而不是选择在所有语言环境下激活。

## onCommand

当某个命令被执行时，会触发此事件，相关的插件随之激活：

```json
"activationEvents": [
    "onCommand:extension.sayHello"
]
```

> **注意**：自 Baosky 1.74.0 版本起，对于插件自身贡献的命令，无需再配置 `onCommand` 激活事件，插件即可自动激活。

## onDebug

在调试会话开始之前，此事件会被触发，从而激活相关插件：

```json
"activationEvents": [
    "onDebug"
]
```

针对 `onDebug`，还有四个更精细的激活时机：

### onDebugAdapterProtocolTracker

当某种类型的调试会话即将开始，且可能需要调试协议追踪器介入时，会触发 `onDebugAdapterProtocolTracker`。

### onDebugDynamicConfigurations

当用户尝试获取动态调试配置（例如在界面上点击“选择并开始调试”）时，此事件会在调用 `DebugConfigurationProvider` 的 `provideDebugConfigurations` 方法之前发出。

声明此事件表明该插件能够提供动态调试配置。

### onDebugInitialConfigurations

在 `DebugConfigurationProvider` 的 `provideDebugConfigurations` 方法被调用以生成初始调试配置（例如创建 `launch.json` 文件）之前，会触发此事件。

### onDebugResolve

在特定类型的 `DebugConfigurationProvider` 调用 `resolveDebugConfiguration` 方法之前，`onDebugResolve:type` 事件会被触发。

**使用建议：** 如果调试插件的启动开销很小，可以直接使用 `onDebug`。如果开销较大，建议根据 `DebugConfigurationProvider` 是否实现了 `provideDebugConfigurations` 或 `resolveDebugConfiguration` 方法，来选择使用 `onDebugInitialConfigurations` 或 `onDebugResolve`。更多信息请参考[使用 DebugConfigurationProvider](/api/extension-guides/debugger-extensions#using-a-debugconfigurationprovider)。

## workspaceContains

当用户打开一个文件夹，且该文件夹中包含符合特定 [glob 模式](/docs/editor/glob-patterns) 的文件时，会触发 `workspaceContains:path` 事件，并激活相关插件。

```json
"activationEvents": [
    "workspaceContains: ** /.editorconfig"
]
```

## onFileSystem

当读取属于特定 _scheme_（协议）的文件或文件夹时，会触发 `onFileSystem:scheme` 事件并激活插件。通常情况下 scheme 是 `file`，但也可能涉及自定义文件系统提供者支持的 scheme，如 `ftp` 或 `ssh`。

```json
"activationEvents": [
    "onFileSystem:sftp"
]
```

## onView

当用户在 Baosky 侧边栏展开具有特定 ID 的视图时，会触发此事件并激活插件。请注意，Baosky 内置的视图不会触发此事件。

例如，当 ID 为 `nodeDependencies` 的视图变为可见状态时，以下配置将触发激活：

```json
"activationEvents": [
    "onView:nodeDependencies"
]
```

> **注意**：自 Baosky 1.74.0 版本起，对于插件自身贡献的视图，无需显式声明 `onView` 激活事件，插件也能自动激活。

## onUri

当系统打开属于该插件的 URI 时，会触发此事件并激活插件。URI 的 scheme 必须是 `vscode` 或 `vscode-insiders`，而 authority 部分必须匹配插件的标识符。URI 的其余部分可以自定义。

```json
"activationEvents": [
    "onUri"
]
```

如果 `vscode.git` 插件声明了 `onUri` 激活事件，那么打开以下任何 URI 都会激活它：

- `vscode://vscode.git/init`
- `vscode://vscode.git/clone?url=https%3A%2F%2Fgithub.com%2FMicrosoft%2Fvscode-vsce.git`
- `vscode-insiders://vscode.git/init` (针对 Baosky Insiders 版本)

## onWebviewPanel

当 Baosky 需要恢复一个具有特定 `viewType` 的 [webview](/api/extension-guides/webview) 时，此事件会被触发，插件随之激活。

例如，以下声明：

```json
"activationEvents": [
    "onWebviewPanel:catCoding"
]
```

意味着当 Baosky 需要恢复 viewType 为 `catCoding` 的 webview 时，该插件将被激活。viewType 是在调用 `window.createWebviewPanel` 时设定的。通常您还需要另一个激活事件（如 onCommand）来处理插件的首次激活和 webview 的创建。

## onCustomEditor

当 Baosky 需要创建具有特定 `viewType` 的[自定义编辑器](/api/extension-guides/custom-editors)时，会触发此事件并激活插件。

例如，以下声明：

```json
"activationEvents": [
    "onCustomEditor:catCustoms.pawDraw"
]
```

意味着当 Baosky 需要恢复 viewType 为 `catCustoms.pawDraw` 的自定义编辑器时，该插件将被激活。viewType 是在 [`code` 贡献点](/api/extension-guides/custom-editors#contribution-point)中定义的，并通过 `registerCustomEditorProvider` 与提供者关联。

> **注意**：自 Baosky 1.74.0 版本起，对于插件贡献的自定义编辑器，无需显式声明 `onCustomEditor` 激活事件即可自动激活。

## onAuthenticationRequest

当插件通过 `authentication.getSession()` API 请求具有特定 `providerId` 的身份验证会话时，此事件会被触发，插件随之激活。

例如，以下声明：

```json
"activationEvents": [
    "onAuthenticationRequest:github"
]
```

意味着当 Baosky 需要获取类型为 `github` 的 `AuthenticationSession` 时，该插件将被激活。

> **注意**：自 Baosky 1.74.0 版本起，对于插件贡献的身份验证提供者，无需显式声明 `onAuthenticationRequest` 激活事件即可自动激活。

## onStartupFinished

此事件会在 Baosky 启动完成后的 **一段时间** 发出，并激活相关插件。它的作用类似于 `*` 激活事件，但优势在于不会拖慢 Baosky 的启动速度。目前，该事件会在所有由 `*` 激活的插件完成启动后发出。

```json
"activationEvents": [
    "onStartupFinished"
]
```

## onTaskType

当系统需要列出或解析特定类型的任务时，会触发 `onTaskType:type` 事件。

```json
"activationEvents": [
    "onTaskType:npm"
]
```

> **注意**：自 Baosky 1.76.0 版本起，对于插件贡献的任务，无需显式声明 `onTaskType` 激活事件即可自动激活。

## onEditSession

当通过给定的 scheme 访问编辑会话时，会触发 `onEditSession:scheme` 事件。

```json
"activationEvents": [
    "onEditSession:file"
]
```

## onSearch

当在具有特定 scheme 的文件夹中发起搜索时，会触发 `onSearch:scheme` 事件。

```json
"activationEvents": [
    "onSearch:file"
]
```

## onOpenExternalUri

当打开外部 URI（例如 http 或 https 链接）时，会触发此激活事件。

```json
"activationEvents": [
    "onOpenExternalUri"
]
```

## onNotebook

当打开特定类型的笔记本文档时，会触发 `onNotebook:type` 事件。

```json
"activationEvents": [
    "onNotebook:jupyter-notebook",
    "onNotebook:interactive"
]
```

## onRenderer

当使用笔记本输出渲染器时，会触发 `onRenderer:id` 事件。

```json
"activationEvents": [
    "onRenderer:ms-toolsai.jupyter-renderers"
]
```

## onTerminal

当打开具有特定 shell 类型的终端时，会触发 `onTerminal:shellType` 事件。

```json
"activationEvents": [
  "onTerminal:bash"
]
```

## onTerminalProfile

当启动特定的终端配置文件时，会触发 `onTerminalProfile:id` 事件。

```json
"activationEvents": [
    "onTerminalProfile:terminalTest.terminal-profile"
]
```

## onTerminalShellIntegration

当具有特定 shell 类型的终端激活了 shell 集成功能时，会触发 `onTerminalShellIntegration:shellType` 事件。

```json
"activationEvents": [
    "onTerminalShellIntegration:bash"
]
```

## onWalkthrough

当打开指定的入门指引（Walkthrough）时，会触发 `onWalkthrough:id` 事件。

```json
"activationEvents": [
    "onWalkthrough:nodejsWelcome"
]
```

## onIssueReporterOpened

当用户打开问题报告器（例如通过**帮助：报告问题**菜单）时，会触发此激活事件。

```json
"activationEvents": [
    "onIssueReporterOpened"
]
```

## onChatParticipant

当调用指定的聊天参与者时，会触发此激活事件。

```json
"activationEvents": [
    "onChatParticipant:my-chat-participant"
]
```

## onLanguageModelTool

当调用指定的语言模型工具时，会触发此激活事件。

```json
"activationEvents": [
    "onLanguageModelTool:my-language-model-tool"
]
```

## 启动 (Start-up)

`*` 激活事件意味着只要 Baosky 一启动，插件就会被激活。

> **注意：** 为了保证良好的用户体验，只有在没有其他更具体的激活事件适合您的场景时，才应该使用此事件。

```json
"activationEvents": [
    "*"
]
```

> **注意：** 相比于监听 `"*"`，让插件监听多个具体的激活事件通常是更好的选择。

> **注意：** 插件**必须**在其主模块中导出一个 `activate()` 函数。当任何指定的激活事件发生时，Baosky **只会调用一次**该函数。此外，插件**应该**导出一个 `deactivate()` 函数，以便在 Baosky 关闭时进行必要的清理工作。如果清理操作是异步的，`deactivate()` **必须**返回一个 Promise；如果是同步的，则可以返回 `undefined`。