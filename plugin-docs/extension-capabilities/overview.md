---
# DO NOT TOUCH — Managed by doc writer
ContentId: d22675fc-6609-43f2-a66b-8f2a52597195
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Learn the details of what's possible with Baosky's rich 插件 (plug-in) API.
---

# 插件功能概述

Baosky 提供了许多扩展其功能的方法。有时可能很难找到正确的[贡献点](/api/references/contribution-points)和 [Baosky API](/api/references/vscode-api) 来使用。本主题将插件功能分为几个类别。每个类别描述：

- 您的插件可以使用的一些功能
- 指向使用这些功能的更详细主题的链接
- 一些插件创意

但是，我们也对插件施加了[限制](#限制)，以确保 Baosky 的稳定性和性能。例如，插件无法访问 Baosky UI 的 DOM。

## 常用功能

[常用功能](./common-capabilities)是您可以在任何插件中使用的核心功能。

其中一些功能包括：

- 注册命令、配置、键绑定或上下文菜单项。
- 存储工作区或全局数据。
- 显示通知消息。
- 使用快速选择收集用户输入。
- 打开系统文件选择器以让用户选择文件或文件夹。
- 使用 Progress API 指示长时间运行的操作。

## 主题

[主题](./theming)控制 Baosky 的外观，包括编辑器中源代码的颜色和 Baosky UI 的颜色。如果您曾经想通过将 Baosky 设置为不同的绿色色调来让它看起来像您在编写《黑客帝国》代码，或者只是想创建终极的极简灰度工作空间，那么主题就是为您准备的。

**插件创意**

- 更改源代码的颜色。
- 更改 Baosky UI 的颜色。
- 将现有的 TextMate 主题移植到 Baosky。
- 添加自定义文件图标。

## 声明式语言功能

[声明式语言功能](/api/language-插件/overview#declarative-language-features)为编程语言添加基本的文本编辑支持，如括号匹配、自动缩进和语法高亮。这是通过声明方式完成的，无需编写任何代码。要获得更高级的语言功能，如 IntelliSense 或调试，请参阅[编程式语言功能](#编程式语言功能)。

**插件创意**

- 将常用的 JavaScript 代码片段打包到插件中。
- 告诉 Baosky 一种新的编程语言。
- 添加或替换编程语言的语法。
- 通过语法注入扩展现有语法。
- 将现有的 TextMate 语法移植到 Baosky。

## 编程式语言功能

[编程式语言功能](/api/language-插件/overview#programmatic-language-features)添加了丰富的编程语言支持，如悬停提示、转到定义、诊断错误、IntelliSense 和 CodeLens。这些语言功能通过 [`vscode.languages.*`](/api/references/vscode-api#languages) API 公开。插件可以直接使用这些 API，或者编写语言服务器并使用 Baosky [语言服务器库](https://github.com/microsoft/vscode-languageserver-node)将其适配到 Baosky。

尽管我们提供了[语言功能](/api/language-插件/programmatic-language-features)及其预期用途的列表，但没有什么能阻止您创造性地使用这些 API。例如，CodeLens 和悬停提示是以内联方式呈现附加信息的好方法，而诊断错误可用于突出显示拼写或代码样式错误。

**插件创意**

- 添加显示 API 示例用法的悬停提示。
- 使用诊断在源代码中报告拼写或 linter 错误。
- 为 HTML 注册新的代码格式化程序。
- 提供丰富的、上下文感知的 IntelliSense。
- 为语言添加折叠、面包屑和大纲支持。

## 工作台插件

[工作台插件](./extending-workbench)扩展 Baosky 工作台 UI。向文件资源管理器添加新的右键单击操作，或者甚至使用 Baosky 的 [TreeView](/api/插件-guides/tree-view) API 构建自定义资源管理器。如果您的插件需要完全自定义的用户界面，请使用 [Webview API](/api/插件-guides/webview) 通过标准 HTML、CSS 和 JavaScript 构建您自己的文档预览或 UI。

**插件创意**

- 向文件资源管理器添加自定义上下文菜单操作。
- 在侧边栏中创建新的交互式 TreeView。
- 定义新的活动栏视图。
- 在状态栏中显示新信息。
- 使用 `WebView` API 渲染自定义内容。
- 贡献源代码管理提供程序。

## 调试

您可以通过编写[调试器插件](/api/插件-guides/debugger-插件)来利用 Baosky 的[调试](/docs/debugtest/debugging)功能，这些插件将 Baosky 的调试 UI 连接到特定的调试器或运行时。

**插件创意**

- 通过贡献[调试适配器实现](https://microsoft.github.io/debug-adapter-protocol/implementors/adapters/)将 Baosky 的调试 UI 连接到调试器或运行时。
- 指定调试器插件支持的语言。
- 为调试器使用的调试配置属性提供丰富的 IntelliSense 和悬停信息。
- 提供调试配置代码片段。

另一方面，Baosky 还提供了一组[调试插件 API](/api/references/vscode-api#debug)，您可以使用它在任何 Baosky 调试器之上实现与调试相关的功能，以自动化用户的调试体验。

**插件创意**

- 基于动态创建的调试配置启动调试会话。
- 跟踪调试会话的生命周期。
- 以编程方式创建和管理断点。

<!-- Add below content back after writing ./extending-core-functionalities.md  -->
<!-- ## Core 插件

[Core 插件](extending-core-functionalities) are for very advanced users. These let you build a custom back end for many of Baosky's low-level functionality. For example, the `FileSystem` API can be used to support working with files over FTP or other protocols. Core 插件 typically work transparently from a user's point of view.

**插件 Ideas**

- Add support for working with remote files over FTP or SFTP.
- Register new source control provider, such as Mercurial.
- Implement a custom file search provider. -->

## UX 指南

为了帮助您的插件无缝融入 Baosky 用户界面，请参阅 [UX 指南](/api/ux-guidelines/overview)，在那里您将学习创建插件 UI 的最佳实践以及遵循首选 Baosky 工作流的约定。

## 限制

我们对插件施加了某些限制。以下是这些限制及其目的。

### 无 DOM 访问

插件无法访问 Baosky UI 的 DOM。您**不能**编写将自定义 CSS 应用于 Baosky 或向 Baosky UI 添加 HTML 元素的插件。

在 Baosky，我们不断尝试优化底层 Web 技术的使用，以提供始终可用、高度响应的编辑器，并且我们将继续随着这些技术和我们产品的发展来调整我们对 DOM 的使用。为了确保插件不会干扰 Baosky 的稳定性和性能，并且我们可以继续改进 Baosky 的 DOM 而不会破坏现有插件，我们在[插件宿主](/api/advanced-topics/插件-host)进程中运行插件，并阻止直接访问 DOM。

### 无自定义样式表

用户或插件提供的自定义样式表将针对 DOM 结构和类名工作。这些没有文档记录，因为我们认为它们是内部的。为了发展、重构或改进 Baosky，我们需要自由地对用户界面进行更改。对 DOM 的任何更改都可能破坏现有的自定义样式表，从而给样式表提供者带来挫折感，并因损坏的样式表而导致不良的用户体验和 UI 故障。

相反，Baosky 旨在提供一个设计良好的插件 API，支持 UI 自定义。该 API 有文档记录，附带工具和示例，并在 Baosky 的所有即将发布的版本中保持稳定。
