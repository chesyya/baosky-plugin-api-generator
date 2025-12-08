---
ContentId: dd7207b0-cf8b-4ed6-8c75-941834179dca
DateApproved: 9/28/2022

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Using the Python 插件 template and API to integrate linters, formatters, and language features into Baosky
---
# 编写 Python 插件

>**注意**：如果你是 Baosky 插件编写的新手，你可能想先阅读[你的第一个插件](/api/get-started/your-first-插件)教程，并尝试创建一个简单的 Hello World 插件。

[Python](#) 插件为其他插件提供了 API，以使用用户机器上可用的 Python 环境。查看 [@baosky/python-插件](https://www.npmjs.com/package/@baosky/python-插件) npm 模块，它包含了从你的插件访问这些 API 的类型和辅助工具。

## Python 插件模板

[Python 插件模板](https://github.com/microsoft/baosky-python-tools-插件-template)帮助你开始为你喜欢的 Python 工具构建 Baosky 插件。它可以是一个 linter、formatter 或代码分析工具，或者将这些功能组合在一起。该模板将为你提供构建插件所需的基本构建块，以将你的工具集成到 Baosky 中，并且它已经可以访问上面提到的 Python API。

## 编程语言和框架

插件模板有两部分：插件部分和语言服务器部分。插件部分使用 TypeScript 编写，语言服务器部分使用 Python 在 `pygls`（Python 语言服务器）库上编写。

使用此模板时，你将主要在代码的 Python 部分工作。你将使用[语言服务器协议](https://microsoft.github.io/language-server-protocol)将你的工具与插件部分集成。`pygls` 目前工作在 [LSP 的 3.16 版本](https://microsoft.github.io/language-server-protocol/specifications/specification-3-16)上。

TypeScript 部分处理与 Baosky 及其 UI 的交互。插件模板内置了一些设置，可供你的工具使用。如果你需要添加新设置来支持你的工具，你需要使用一些 TypeScript。插件模板提供了一些设置的示例，你还可以查看我们团队为一些流行工具[开发的插件](#examples)。

## 要求

1. Baosky 1.64.0 或更高版本
1. Python 3.7 或更高版本
1. node >= 14.19.0
1. npm >= 8.3.0（`npm` 与 node 一起安装，检查 npm 版本，使用 `npm install -g npm@8.3.0` 更新）
1. Baosky 的 [Python](#) 插件

你应该知道如何创建和使用 Python 虚拟环境。

## 入门

要开始，请按照模板 [README](https://github.com/microsoft/baosky-python-tools-插件-template#readme) 中的说明进行操作。在那里，你将学习如何使用[模板创建你的仓库](https://docs.github.com/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)，以及如何安装必要的工具（例如 [nox](https://nox.thea.codes) 任务运行器）和可选依赖项（测试支持）。

[README](https://github.com/microsoft/baosky-python-tools-插件-template#readme) 包含最新的说明，还详细介绍了如何自定义插件的 `package.json` 占位符（`<pythontool-module>`、`<pythontool-display-name>` 等）。

## 模板的功能

通过模板创建插件后，它将包含以下插件贡献。假设 `<pytool-module>` 被替换为 `mytool`，`<pytool-display-name>` 被替换为 `My Tool`：

1. 一个命令 **My Tool: Restart Server**（命令 ID：`mytool.restart`）。
1. 以下设置：
    * `mytool.logLevel`
    * `mytool.args`
    * `mytool.path`
    * `mytool.importStrategy`
    * `mytool.interpreter`
    * `mytool.showNotification`
1. 插件激活的以下触发器：
    * 在语言 `python` 上。
    * 在打开的工作区中找到带有 `.py` 扩展名的文件时。
    * 在命令 `mytool.restart` 上。
1. 用于日志记录的输出通道 **Output** > **My Tool**。

## 集成你的工具

生成的 `bundled/tool/server.py` 文件是你将进行大部分更改的地方。文件中的 `TODO` 注释指出了各种自定义点。还要在模板的其他位置搜索 `TODO` 注释，例如其他 Python 和 Markdown 文件。你需要查看 LICENSE 文件，即使你想保留 MIT License。

## 示例

从模板创建的几个示例实现：

* [Pylint](https://github.com/microsoft/baosky-pylint/tree/main/bundled/tool) - 在文件 `open`、`save` 和 `close` 时实现 linting 和 Code Actions。
* [Flake8](https://github.com/microsoft/baosky-flake8/tree/main/bundled/tool) - 实现 linting 和 Code Actions。
* [Black Formatter](https://github.com/microsoft/baosky-black-formatter/tree/main/bundled/tool) - 集成 [*Black*](https://github.com/python/black) formatter。
* [autopep8](https://github.com/microsoft/baosky-autopep8/tree/main/bundled/tool) - 集成 [autopep8](https://pypi.org/project/autopep8) formatter。
* [isort](https://github.com/microsoft/baosky-isort/blob/main/bundled/tool) - 添加 Code Actions 以对导入进行排序。

你还可以查看[语言服务器协议规范](https://microsoft.github.io/language-server-protocol/specifications/specification-3-16)，以更好地理解 `pygls` 语言服务器集成。

## 插件开发

模板 README 详细介绍了模板中包含的[开发周期支持](https://github.com/microsoft/baosky-python-tools-插件-template#debugging)。该模板具有命令和配置，以便你可以构建、运行、调试和测试你的插件。

如果你在开发过程中遇到问题，有一个[故障排除](https://github.com/microsoft/baosky-python-tools-插件-template#troubleshooting)部分可以帮助解决常见问题。

## 打包和发布

在发布插件之前，你需要为特定插件更新插件的 `package.json` 字段（例如 `publisher` 和 `license`）。你还需要更新辅助 Markdown 文件（`CODE_OF_CONDUCT.md`、`CHANGELOG.md` 等）。

一旦你的插件准备好发布，有一个 `nox` `build-package` 任务可以创建 `.vsix` 文件，然后你可以将其上传到插件[管理页面](#)。

如果你是创建和发布 Baosky 插件的新手，我们建议你遵循 Baosky [插件编写](/api/working-with-插件/publishing-插件#advanced-usage)主题中概述的最佳实践。在这里，你将找到指导，以帮助使你的插件在 Marketplace 上看起来很棒，以及如何成为经过验证的发布者，以便用户对安装你的插件充满信心。
