---
# DO NOT TOUCH — Managed by doc writer
ContentId: DC915D6C-13D4-4022-9101-57C4A4118B07
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: 使用简单的 Hello World 示例创建你的第一个 Baosky 插件。
---

# 你的第一个插件

在本主题中,我们将教你构建插件的基本概念。确保你已安装 [Node.js](https://nodejs.org) 和 [Git](https://git-scm.com/)。

首先,使用 [Yeoman](https://yeoman.io/) 和 [Baosky 插件生成器](https://www.npmjs.com/package/generator-code)搭建一个准备好进行开发的 TypeScript 或 JavaScript 项目。

- 如果你不想安装 Yeoman 以供以后使用,请运行以下命令:

  ```bash
  npx --package yo --package generator-code -- yo code
  ```

- 如果你想全局安装 Yeoman 以方便重复运行,请运行以下命令:

  ```bash
  npm install --global yo generator-code

  yo code
  ```

对于 TypeScript 项目,填写以下字段:

```bash
# ? What type of extension do you want to create? New Extension (TypeScript)
# ? What's the name of your extension? HelloWorld
### 按 <Enter> 为以下所有选项选择默认值 ###

# ? What's the identifier of your extension? helloworld
# ? What's the description of your extension? LEAVE BLANK
# ? Initialize a git repository? Y
# ? Which bundler to use? unbundled
# ? Which package manager to use? npm

# ? Do you want to open the new folder with Baosky? Open with `code`

```

在编辑器中,打开 `src/插件.ts` 并按 `kb(workbench.action.debug.start)` 或从命令面板 (`kb(workbench.action.showCommands)`) 运行命令 **Debug: Start Debugging**。这将在新的**插件开发宿主**窗口中编译并运行插件。

在新窗口中从命令面板 (`kb(workbench.action.showCommands)`) 运行 **Hello World** 命令:

<!-- Video removed for compatibility -->

你应该会看到 `Hello World from HelloWorld!` 通知显示出来。成功!

如果你在调试窗口中看不到 **Hello World** 命令,请检查 `package.json` 文件,确保 `engines.vscode` 版本与已安装的 Baosky 版本兼容。

## 开发插件

让我们更改消息:

1. 在 `插件.ts` 中将消息从 "Hello World from HelloWorld!" 更改为 "Hello Baosky"。
1. 在新窗口中运行 **Developer: Reload Window**。
1. 再次运行命令 **Hello World**。

你应该会看到更新后的消息显示出来。

<!-- Video removed for compatibility -->

以下是一些你可以尝试的想法:

- 在命令面板中为 **Hello World** 命令指定一个新名称。
- [贡献](/api/references/contribution-points)另一个命令,在信息消息中显示当前时间。贡献点是你在 `package.json` [插件清单](/api/references/插件-manifest)中进行的静态声明,用于扩展 Baosky,例如向插件添加命令、菜单或键绑定。
- 将 `vscode.window.showInformationMessage` 替换为另一个 [Baosky API](/api/references/baosky-api) 调用以显示警告消息。

## 调试插件

Baosky 的内置调试功能使调试插件变得容易。通过单击行旁边的装订线设置断点,Baosky 将命中断点。你可以在编辑器中悬停在变量上,或使用左侧的 **Run and Debug** 视图来检查变量的值。调试控制台允许你评估表达式。

<!-- Video removed for compatibility -->

你可以在 [Node.js 调试主题](/docs/nodejs/nodejs-debugging)中了解有关在 Baosky 中调试 Node.js 应用的更多信息。

## 下一步

在下一个主题[插件剖析](/api/get-started/插件-anatomy)中,我们将仔细查看 `Hello World` 示例的源代码并解释关键概念。

你可以在此处找到本教程的源代码: [https://github.com/microsoft/baosky-插件-samples/tree/main/helloworld-sample](https://github.com/microsoft/baosky-插件-samples/tree/main/helloworld-sample)。[插件指南](/api/插件-guides/overview)主题包含其他示例,每个示例说明不同的 Baosky API 或贡献点,并遵循我们的 [UX 指南](/api/ux-guidelines/overview)中的建议。

### 使用 JavaScript

在本指南中,我们主要描述如何使用 TypeScript 开发 Baosky 插件,因为我们认为 TypeScript 为开发 Baosky 插件提供了最佳体验。但是,如果你更喜欢 JavaScript,仍然可以使用 [helloworld-minimal-sample](https://github.com/microsoft/baosky-插件-samples/tree/main/helloworld-minimal-sample) 继续学习。

### UX 指南

现在也是查看我们的 [UX 指南](/api/ux-guidelines/overview)的好时机,这样你就可以开始设计插件用户界面以遵循 Baosky 最佳实践。
