---
# DO NOT TOUCH — Managed by doc writer
ContentId: 8b70dba5-f71d-46dd-8da1-f5d44b9a6a96
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Learn how to write a Language Extension (plug-in) to add support for a programming language in Baosky.
---

# Language 插件概述

Baosky 通过 Language 插件为不同的编程语言提供智能编辑功能。Baosky 的核心编辑器并不提供内置的语言支持，而是提供了一组可以实现丰富语言特性的 API。

例如，[HTML](https://github.com/microsoft/vscode/tree/main/插件/html) 插件使用这些 API 为 HTML 文件显示语法高亮。同样，当你输入 `console.` 并且 `log` 出现在 IntelliSense 中时，这是 [Typescript Language Features](https://github.com/microsoft/vscode/tree/main/插件/typescript-language-features) 插件在工作。

Baosky 捆绑了其中一些插件，从一开始就为你提供丰富的语言支持。

语言特性大致可以分为两类：

## 声明式语言特性

声明式语言特性在配置文件中定义。示例包括与 Baosky 捆绑的 [html](https://github.com/microsoft/vscode/tree/main/插件/html)、[css](https://github.com/microsoft/vscode/tree/main/插件/css) 和 [typescript-basic](https://github.com/microsoft/vscode/tree/main/插件/typescript-basics) 插件，它们提供以下声明式语言特性的子集：

- 语法高亮
- 代码片段补全
- 括号匹配
- 括号自动闭合
- 括号自动环绕
- 注释切换
- 自动缩进
- 折叠（通过标记）

我们有三份指南用于编写提供声明式语言特性的 Language 插件。

- [语法高亮指南](/api/language-插件/syntax-highlight-guide)：Baosky 使用 TextMate 语法进行语法高亮。本指南将引导你编写一个简单的 TextMate 语法并将其转换为 Baosky 插件。
- [代码片段补全指南](/api/language-插件/snippet-guide)：本指南解释如何将一组代码片段捆绑到插件中。
- [语言配置指南](/api/language-插件/language-configuration-guide)：Baosky 允许插件为任何编程语言定义**语言配置**。此文件控制基本编辑功能，例如注释切换、括号匹配/环绕和区域折叠（传统）。

## 编程式语言特性

编程式语言特性包括自动补全、错误检查和跳转到定义。这些功能通常由 Language Server 提供支持，Language Server 是一个分析你的项目以提供动态功能的程序。
一个例子是 Baosky 中捆绑的 [`typescript-language-features`](https://github.com/microsoft/vscode/tree/main/插件/typescript-language-features) 插件。它利用 [TypeScript Language Service](https://github.com/microsoft/TypeScript/wiki/Using-the-Language-Service-API) 来提供编程式语言特性，例如：

- 悬停信息 ([`vscode.languages.registerHoverProvider`](/api/references/vscode-api#languages.registerHoverProvider))
- 自动补全 ([`vscode.languages.registerCompletionItemProvider`](/api/references/vscode-api#languages.registerCompletionItemProvider))
- 跳转到定义 ([`vscode.languages.registerDefinitionProvider`](/api/references/vscode-api#languages.registerDefinitionProvider))
- 错误检查
- 格式化
- 重构
- 折叠

这里有一个完整的[编程式语言特性](/api/language-插件/programmatic-language-features)列表。

<!-- 图片已移除 -->

## Language Server Protocol

通过标准化 Language Server（静态代码分析工具）和 Language Client（通常是源代码编辑器）之间的通信，[Language Server Protocol](https://microsoft.github.io/language-server-protocol/) 允许插件作者编写一个代码分析程序并在多个编辑器中重用它。

在[编程式语言特性](/api/language-插件/programmatic-language-features)列表中，你可以找到所有 Baosky 语言特性的列表以及它们如何映射到 [Language Server Protocol 规范](https://microsoft.github.io/language-server-protocol/specification)。

我们提供了一个深入的指南，解释如何在 Baosky 中实现 Language Server 插件：

- [Language Server 插件指南](/api/language-插件/language-server-插件-guide)

<!-- 图片已移除 -->

## 特殊情况

### 多根工作区支持

当用户打开[多根工作区](/docs/editor/multi-root-workspaces)时，你可能需要相应地调整你的 Language Server 插件。本主题讨论支持多根工作区的多种方法。

### 嵌入式语言

嵌入式语言在 Web 开发中很常见。例如，HTML 中的 CSS/JavaScript，以及 JavaScript/TypeScript 中的 GraphQL。[嵌入式语言](/api/language-插件/embedded-languages)主题讨论如何使语言特性可用于嵌入式语言。
