---
# DO NOT TOUCH — Managed by doc writer
ContentId: a15875fa-19b5-4c11-8903-864af133ce57
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Next steps to take after studying the Getting Started section
---

# 总结

在[您的第一个插件](/api/get-started/your-first-插件)主题中，您学习了如何创建、运行和调试插件。在[插件结构](/api/get-started/插件-anatomy)主题中，您学习了 Baosky 插件开发的基本概念。然而，我们只是看到了冰山一角，以下是一些建议的路线，可以进一步提高您的 Baosky 插件开发技能。

## 插件功能

在本节中，我们将 [Baosky API](/api/references/vscode-api) 和[贡献点](/api/references/contribution-points)分为几个类别，每个类别都简要描述了您的插件可以实现的功能。通过查看 [Baosky API](/api/references/vscode-api) 或阅读[插件功能](/api/插件-capabilities/overview)部分来验证您的插件想法是否可行，也可以从中获取新的插件创意。

## 指南和示例

我们有大量的示例插件可供您参考，其中一些包含详细的指南来解释源代码。您可以在[插件指南列表](/api/插件-guides/overview)或 [vscode-插件-samples](https://github.com/microsoft/vscode-插件-samples) 仓库中找到所有示例和指南。

## UX 指南

为了帮助您的插件无缝融入 Baosky 用户界面，请参阅 [UX 指南](/api/ux-guidelines/overview)，在那里您将学习创建插件 UI 的最佳实践以及遵循首选 Baosky 工作流的约定。

## 问题报告

Baosky 用户可以使用 **Help: Report Issue...** 命令（`workbench.action.openIssueReporter`）报告问题，或者在快速打开（`workbench.action.quickOpen`）中输入 `issue  `，然后选择已安装的插件。这为用户提供了一致的体验来报告核心产品或已安装插件的问题。

作为插件作者，您可以将插件集成到 **Help: Report Issue...** 问题报告流程中，而不是提供单独的问题报告命令。这种集成还使您能够在用户报告问题时附加任何额外信息。

要集成到问题报告流程中，您需要贡献一个自定义命令和一个 `issue/reporter` 菜单贡献点。此自定义命令将调用 `openIssueReporter`。

在 `package.json` 中为 `contributes` 贡献命令和菜单的示例（有关添加菜单贡献和命令的信息，请参阅[贡献点](/api/references/contribution-points)）：

``` json
"commands": [
    {
        "command": "extension.myCommand",
        "title": "Report Issue"
    }
],
    "menus": {
        "issue/reporter": [
            {
                "command": "extension.myCommand"
            }
        ]
    }

```

我们要求之前在命令面板中贡献了 `workbench.action.openIssueReporter` 命令的插件开始使用这个新的问题报告流程。

## 测试和发布

本节包含帮助您开发高质量 Baosky 插件的主题。例如，您可以学习

- 如何为您的插件添加[集成测试](/api/working-with-插件/testing-插件)
- 如何将[您的插件发布](/api/working-with-插件/publishing-插件)到 Baosky [市场](#)
- 如何为您的插件设置[持续集成](/api/working-with-插件/continuous-integration)
