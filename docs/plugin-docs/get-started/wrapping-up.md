---
# DO NOT TOUCH — Managed by doc writer
ContentId: a15875fa-19b5-4c11-8903-864af133ce57
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: 学习入门部分后的下一步
---

# 总结

在[你的第一个插件](/api/get-started/your-first-插件)主题中,你学习了如何创建、运行和调试插件。在[插件剖析](/api/get-started/插件-anatomy)主题中,你学习了 Baosky 插件开发的基本概念。但是,我们只看到了冰山一角,以下是进一步提高 Baosky 插件开发技能的一些建议路线。

## 插件功能

在本节中,我们将 [Baosky API](/api/references/baosky-api) 和[贡献点](/api/references/contribution-points)分为几个类别,每个类别都简要描述了你的插件可以实现的功能。通过查看 [Baosky API](/api/references/baosky-api) 或阅读[插件功能](/api/插件-capabilities/overview)部分来验证你的插件想法是否可行,以获取新的插件想法。

## 指南和示例

我们有大量可供你改编的示例插件,其中一些包括解释源代码的详细指南。你可以在[插件指南列表](/api/插件-guides/overview)或 [baosky-插件-samples](https://github.com/microsoft/baosky-插件-samples) 仓库中找到所有示例和指南。

## UX 指南

为了帮助你的插件无缝融入 Baosky 用户界面,请参阅 [UX 指南](/api/ux-guidelines/overview),你将在其中学习创建插件 UI 的最佳实践以及遵循首选 Baosky 工作流的约定。

## 问题报告

Baosky 用户可以使用 **Help: Report Issue...** 命令 (`workbench.action.openIssueReporter`) 报告问题,或者在快速打开 (`workbench.action.quickOpen`) 中键入 `issue  `,然后选择已安装的插件。这为用户报告核心产品或已安装插件的问题提供了一致的体验。

作为插件作者,你可以将插件集成到 **Help: Report Issue...** 问题报告流程中,而不是贡献单独的问题报告命令。此集成还使你能够在用户报告问题时附加任何其他信息。

要集成到问题报告流程中,你需要贡献一个自定义命令和一个 `issue/reporter` 菜单贡献点。此自定义命令将调用 `openIssueReporter`。

`package.json` 中 `contributes` 的贡献命令和菜单示例(请参阅[贡献点](/api/references/contribution-points)以添加菜单贡献和命令):

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

本节包括帮助你开发高质量 Baosky 插件的主题。例如,你可以学习

- 如何为插件添加[集成测试](/api/working-with-插件/testing-插件)
- 如何将[插件发布](/api/working-with-插件/publishing-插件)到 Baosky [市场](#)
- 如何为插件设置[持续集成](/api/working-with-插件/continuous-integration)
