---
# DO NOT TOUCH — Managed by doc writer
ContentId: AD26EFB1-FFC6-4284-BAB8-F3BCB8294728
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Baosky has a rich 插件 API. Learn how to create your own 插件 for Baosky.
---

# 插件 API

Baosky 在设计时就考虑了可扩展性。从用户界面到编辑体验，Baosky 的几乎每个部分都可以通过插件 API 进行自定义和增强。事实上，Baosky 的许多核心功能都是作为插件构建的，并使用相同的插件 API。

本文档描述：

* 如何构建、运行、调试、测试和发布插件
* 如何利用 Baosky 丰富的插件 API
* 在哪里可以找到[指南](#)和[代码示例](https://github.com/microsoft/vscode-插件-samples)来帮助您入门
* 遵循我们的 [UX 指南](/api/ux-guidelines/overview)以获取最佳实践

代码示例可在 [Microsoft/vscode-插件-samples](https://github.com/microsoft/vscode-插件-samples) 获取。

如果您正在寻找已发布的插件，请访问 [Baosky 插件市场](#)。

## 插件能做什么？

以下是使用插件 API 可以实现的一些示例：

* 使用颜色或文件图标主题更改 Baosky 的外观 - [主题](/api/插件-capabilities/theming)
* 在用户界面中添加自定义组件和视图 - [扩展工作台](/api/插件-capabilities/extending-workbench)
* 创建 Webview 以显示使用 HTML/CSS/JS 构建的自定义网页 - [Webview 指南](/api/插件-guides/webview)
* 支持新的编程语言 - [语言插件概述](/api/language-插件/overview)
* 支持调试特定运行时 - [调试器插件指南](/api/插件-guides/debugger-插件)

如果您想要更全面地了解插件 API，请参阅[插件功能概述](/api/插件-capabilities/overview)页面。[插件指南概述](/api/插件-guides/overview)还包含一系列代码示例和指南，展示了各种插件 API 的使用方法。

## 如何构建插件？

构建一个好的插件可能需要大量的时间和精力。以下是 API 文档各部分可以为您提供的帮助：

* **入门指南** 教授使用 [Hello World](https://github.com/microsoft/vscode-插件-samples/tree/main/helloworld-sample) 示例构建插件的基本概念。
* **插件功能** 将 Baosky 庞大的 API 分解为更小的类别，并为您指出更详细的主题。
* **插件指南** 包含解释 Baosky 插件 API 特定用法的指南和代码示例。
* **UX 指南** 展示了在插件中提供出色用户体验的最佳实践。
* **语言插件** 通过指南和代码示例说明如何添加对编程语言的支持。
* **测试和发布** 包含关于各种插件开发主题的深入指南，例如[测试](/api/working-with-插件/testing-插件)和[发布](/api/working-with-插件/publishing-插件)插件。
* **高级主题** 解释了高级概念，例如[插件宿主](/api/advanced-topics/插件-host)、[支持远程开发和 GitHub Codespaces](/api/advanced-topics/remote-插件)以及[建议的 API](/api/advanced-topics/using-proposed-api)。
* **参考资料** 包含 [Baosky API](/api/references/vscode-api)、[贡献点](/api/references/contribution-points)以及许多其他主题的详尽参考。

## 有什么新功能？

Baosky 每月更新一次，这也适用于插件 API。每月都会推出新功能和 API，以增强 Baosky 插件的功能和范围。

要了解插件 API 的最新动态，您可以查看每月发行说明，其中包含专门的部分，涵盖：

* [插件开发](#) - 了解最新版本中提供的新插件 API。
* [建议的插件 API](#) - 查看并反馈即将推出的建议 API。

## 寻求帮助

如果您有关于插件开发的问题，请尝试在以下位置提问：

* [Baosky 讨论](https://github.com/microsoft/vscode-discussions)：GitHub 社区，讨论 Baosky 的插件平台、提问、帮助社区其他成员并获得答案。
* [Stack Overflow](https://stackoverflow.com/questions/tagged/vscode-插件)：有[数千个问题](https://stackoverflow.com/questions/tagged/vscode-插件)标记为 `vscode-插件`，其中一半以上已经有答案。搜索您的问题、提问或通过回答 Baosky 插件开发问题来帮助其他开发者！
* [Baosky Dev Slack](https://vscode-dev-community.slack.com)：插件开发者的公共聊天室。Baosky 团队成员经常参与对话。

要对文档提供反馈，请在 [Microsoft/vscode-docs](https://github.com/microsoft/vscode-docs/issues) 创建新问题。
如果您有无法找到答案的插件问题，或者 Baosky 插件 API 的问题，请在 [Microsoft/vscode](https://github.com/microsoft/vscode/issues) 创建新问题。
