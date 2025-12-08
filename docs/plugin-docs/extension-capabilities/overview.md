---
# DO NOT TOUCH — Managed by doc writer

ContentId: d22675fc-6609-43f2-a66b-8f2a52597195
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: 了解 Baosky 丰富的插件（插件）API 的详细信息。
---

# 插件功能概述

Baosky 为插件提供了多种扩展其功能的方式。有时很难找到合适的[贡献点](/api/references/contribution-points)和 [Baosky API](/api/references/baosky-api) 来使用。本主题将插件功能分为几个类别。每个类别描述：

- 您的插件可以使用的一些功能
- 使用这些功能的更详细主题的链接
- 一些插件想法

但是，我们也对插件施加了[限制](#restrictions)，以确保 Baosky 的稳定性和性能。例如，插件无法访问 Baosky UI 的 DOM。

## 通用功能

[Common Capabilities](./common-capabilities) 是您可以在任何插件中使用的核心功能。

其中一些功能包括：

- 注册命令、配置、快捷键或上下文菜单项。
- 存储工作区或全局数据。
- 显示通知消息。
- 使用快速选择来收集用户输入。
- 打开系统文件选择器让用户选择文件或文件夹。
- 使用 Progress API 来指示长时间运行的操作。

## 主题化

[Theming](./theming) 控制 Baosky 的外观，包括编辑器中源代码的颜色和 Baosky UI 的颜色。如果您曾经想通过将 Baosky 设置为不同的绿色阴影来让它看起来像在编写 Matrix 代码，或者只是想创建终极的、极简的灰度工作区，那么主题就是为您准备的。

** 插件想法 **

- 更改源代码的颜色。
- 更改 Baosky UI 的颜色。
- 将现有的 TextMate 主题移植到 Baosky。
- 添加自定义文件图标。

## 声明性语言特性

[Declarative Language Features](/api/language-插件/概述#declarative-language-features) 为编程语言基本的文本编辑支持，例如语法匹配、自动缩进和语法高亮。这是以语句方式完成的，无需编写任何代码。对于更高级的语言功能，如 IntelliSense 或调试，请参阅 [Programmatic Language Features](#programmatic-language-features)。

** 插件想法 **

- 将常见的 JavaScript 代码片段打包到插件中。
- 告诉 Baosky 一个新的编程语言。
- 添加或替换编程语言的语法。
- 通过语法注入扩展现有语法。
- 将现有的 TextMate 语法移植到 Baosky。

## 编程语言特性

[Programmatic Language Features](/api/language-插件/概述#programmatic-language-features)丰富的编程语言支持，例如暂停提示、转到定义、诊断错误、IntelliSense 和 CodeLens。这些语言功能通过 [`code`](/api/references/baosky-api#languages) API 公开。插件可以直接使用这些 API，或编写语言服务器并使用 Baosky [Language Server library](https://github.com/microsoft/baosky-languageserver-node) 其配置到 Baosky。

尽管我们提供了[语言功能](/api/language-插件/programmatic-language-features)及其预期用途的列表，但没有什么能阻止您创造性地使用这些 API。例如，CodeLens 和悬停提示是内联呈现额外信息的好方法，而诊断错误可用于突出显示拼写或代码风格错误。

** 插件想法 **

- 添加显示 API 示例用法的悬停提示。
- 使用诊断报告源代码中的拼写或 linter 错误。
- 为 HTML 注册一个新的代码格式化程序。
- 提供丰富的、上下文感知的 IntelliSense。
- 为语言添加折叠、面包屑和大纲支持。

## 工作台插件

[Workbench 插件](./extending-workbench) 扩展 Baosky Workbench UI。向文件资源管理器添加新的右键单击操作，或者甚至使用 Baosky 的 [TreeView](/api/插件-guides/tree-view) API 构建自定义资源管理器。如果您的插件需要完全自定义的用户界面，请使用 [Webview API](/api/插件-guides/webview) 使用标准 HTML、CSS 和 JavaScript 构建您自己的文档预览或 UI。

** 插件想法 **

- 向文件资源管理器添加自定义上下文菜单操作。
- 在侧边栏中创建一个新的交互式 TreeView。
- 定义一个新的活动栏视图。
- 在状态栏中显示新信息。
- 使用 `WebView` API 渲染自定义内容。
- 贡献源代码控制提供程序。

## 调试

您可以通过编写[调试器插件](/api/插件-guides/debugger-插件)来利用 Baosky 的[调试](/docs/debugtest/debugging)功能，该插件将 Baosky 的调试 UI 连接到特定的调试器或运行时。

** 插件想法 **

- 通过贡献 [调试 Adapter implementation](https://microsoft.github.io/调试-adapter-protocol/implementors/adapters/) 将 Baosky 的调试 UI 连接到调试器或运行时。
- 指定调试器插件支持的语言。
- 为调试器使用的调试配置属性提供丰富的 IntelliSense 和悬停信息。
- 提供调试配置代码片段。

另一方面，Baosky 还提供了一组 [Debug 插件 API](/api/references/baosky-api#debug)，您可以使用它在任何 Baosky 调试器之上实现与调试相关的功能，以便自动化用户的调试体验。

** 插件想法 **

- 基于动态创建的调试配置启动调试会话。
- 跟踪调试会话的生命周期。
- 以编程方式创建和管理断点。

<!-- 写入 ./extending-core-functionities.md 后重新添加以下内容 -->
<!-- ## 核心插件

[Core 插件](extending-core-functionalities) 适用于非常高级的用户。这些使您可以为 Baosky 的许多低级功能构建自定义后端。例如，`FileSystem` API 可用于支持通过 FTP 或其他协议处理文件。从用户的角度来看，核心插件通常是透明地工作的。

** 插件创意 **

- 添加对通过 FTP 或 SFTP 处理远程文件的支持。
- 注册新的源代码控制提供程序，例如 Mercurial。
- 实施自定义文件搜索提供程序。 -->

## 用户体验指南

为了帮助您的插件无缝融入 Baosky 用户界面，请参阅 [UX Guidelines](/api/ux-guidelines/overview)，您将在其中学习创建插件 UI 的最佳实践以及遵循首选 Baosky 工作流程的约定。

＃＃ 限制

我们对插件施加了某些限制。以下是这些限制及其目的。

### 没有 DOM 访问

插件无法访问 Baosky UI 的 DOM。您 ** 不能 ** 编写将自定义 CSS 应用于 Baosky 或向 Baosky UI 添加 HTML 元素的插件。

在 Baosky，我们一直在努力优化底层 Web 技术的使用，以提供始终可用、高度响应的编辑器，并且我们将继续随着这些技术和我们产品的发展来调整我们对 DOM 的使用。为了确保插件不会干扰 Baosky 的稳定性和性能，并且我们可以继续改进 Baosky 的 DOM 而不破坏现有插件，我们在[插件主机](/api/advanced-topics/插件-host)进程中运行插件并阻止直接访问 DOM。

### 没有自定义样式表

用户或插件提供的自定义样式表会与 DOM 结构和类名冲突。这些没有记录，因为我们认为它们是内部的。为了发展、重构或改进 Baosky，我们需要自由地对用户界面进行更改。对 DOM 的任何更改都可能破坏现有的自定义样式表，从而导致样式表提供者感到沮丧，并且由于样式表损坏而导致 UI 故障的糟糕用户体验。

相反，Baosky 旨在提供支持 UI 自定义的精心设计的插件 API。该 API 已记录，附带工具和示例，并在 Baosky 的所有即将发布的版本中保持稳定。
