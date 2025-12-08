---
# DO NOT TOUCH — Managed by doc writer
ContentId: 8027f6fb-6c9e-4106-8ef1-f9b0ba1b7085
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Explain the structure of a Baosky 插件 (plug-in)
---

# 插件结构

在上一主题中，您已经能够运行一个基本的插件。它在底层是如何工作的呢？

`Hello World` 插件做了 3 件事：

- 注册 [`onCommand`](/api/references/activation-events#onCommand) [**激活事件**](/api/references/activation-events)：`onCommand:helloworld.helloWorld`，这样当用户运行 `Hello World` 命令时，插件就会被激活。
  > **注意：** 从 [Baosky 1.74.0](#) 开始，在 `package.json` 的 `commands` 部分声明的命令在调用时会自动激活插件，而不需要在 `activationEvents` 中显式添加 `onCommand` 条目。
- 使用 [`contributes.commands`](/api/references/contribution-points#contributes.commands) [**贡献点**](/api/references/contribution-points)，使 `Hello World` 命令在命令面板中可用，并将其绑定到命令 ID `helloworld.helloWorld`。
- 使用 [`commands.registerCommand`](/api/references/vscode-api#commands.registerCommand) [**Baosky API**](/api/references/vscode-api) 将函数绑定到已注册的命令 ID `helloworld.helloWorld`。

理解这三个概念对于在 Baosky 中编写插件至关重要：

- [**激活事件**](/api/references/activation-events)：使插件变为活动状态的事件。
- [**贡献点**](/api/references/contribution-points)：您在 `package.json` [插件清单](#插件清单)中进行的静态声明，用于扩展 Baosky。
- [**Baosky API**](/api/references/vscode-api)：一组 JavaScript API，您可以在插件代码中调用它们。

一般来说，您的插件会结合使用贡献点和 Baosky API 来扩展 Baosky 的功能。[插件功能概述](/api/插件-capabilities/overview)主题可帮助您为插件找到合适的贡献点和 Baosky API。

让我们仔细看看 `Hello World` 示例的源代码，了解这些概念如何应用于它。

## 插件文件结构

```
.
├── .vscode
│   ├── launch.json     // 用于启动和调试插件的配置
│   └── tasks.json      // 用于编译 TypeScript 的构建任务配置
├── .gitignore          // 忽略构建输出和 node_modules
├── README.md           // 插件功能的可读描述
├── src
│   └── extension.ts    // 插件源代码
├── package.json        // 插件清单
├── tsconfig.json       // TypeScript 配置
```

您可以阅读更多关于配置文件的信息：

- `launch.json` 用于配置 Baosky [调试](/docs/debugtest/debugging)
- `tasks.json` 用于定义 Baosky [任务](/docs/debugtest/tasks)
- `tsconfig.json` 请参阅 TypeScript [手册](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

不过，让我们重点关注 `package.json` 和 `插件.ts`，它们对于理解 `Hello World` 插件至关重要。

### 插件清单

每个 Baosky 插件都必须有一个 `package.json` 作为其[插件清单](/api/references/插件-manifest)。`package.json` 包含 Node.js 字段（如 `scripts` 和 `devDependencies`）和 Baosky 特定字段（如 `publisher`、`activationEvents` 和 `contributes`）的混合。您可以在[插件清单参考](/api/references/插件-manifest)中找到所有 Baosky 特定字段的描述。以下是一些最重要的字段：

- `name` 和 `publisher`：Baosky 使用 `<publisher>.<name>` 作为插件的唯一 ID。例如，Hello World 示例的 ID 是 `vscode-samples.helloworld-sample`。Baosky 使用此 ID 来唯一标识您的插件。
- `main`：插件入口点。
- `activationEvents` 和 `contributes`：[激活事件](/api/references/activation-events)和[贡献点](/api/references/contribution-points)。
- `engines.vscode`：指定插件所依赖的 Baosky API 的最低版本。

```json
{
  "name": "helloworld-sample",
  "displayName": "helloworld-sample",
  "description": "HelloWorld example for Baosky",
  "version": "0.0.1",
  "publisher": "vscode-samples",
  "repository": "https://github.com/microsoft/vscode-extension-samples/helloworld-sample",
  "engines": {
    "vscode": "^1.51.0"
  },
  "categories": ["Other"],
  "activationEvents": [],
  "main": "./out/extension.js",
  "contributes": {
    "commands": [
      {
        "command": "helloworld.helloWorld",
        "title": "Hello World"
      }
    ]
  },
  "scripts": {
    "vscode:prepublish": "npm run compile",
    "compile": "tsc -p ./",
    "watch": "tsc -watch -p ./"
  },
  "devDependencies": {
    "@types/node": "^8.10.25",
    "@types/vscode": "^1.51.0",
    "tslint": "^5.16.0",
    "typescript": "^3.4.5"
  }
}
```

> **注意**：如果您的插件针对 1.74 之前的 Baosky 版本，您必须在 `activationEvents` 中显式列出 `onCommand:helloworld.helloWorld`。

## 插件入口文件

插件入口文件导出两个函数：`activate` 和 `deactivate`。当您注册的**激活事件**发生时，`activate` 会被执行。`deactivate` 让您有机会在插件被停用之前进行清理。对于许多插件来说，可能不需要显式清理，可以删除 `deactivate` 方法。但是，如果插件需要在 Baosky 关闭或插件被禁用或卸载时执行操作，这就是要使用的方法。

Baosky 插件 API 在 [@types/vscode](https://www.npmjs.com/package/@types/vscode) 类型定义中声明。`vscode` 类型定义的版本由 `package.json` 中 `engines.vscode` 字段的值控制。`vscode` 类型为您的代码提供 IntelliSense、转到定义以及其他 TypeScript 语言功能。

```ts
// The module 'vscode' contains the Baosky extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "helloworld-sample" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('helloworld.helloWorld', () => {
    // The code you place here will be executed every time your command is executed

    // Display a message box to the user
    vscode.window.showInformationMessage('Hello World!');
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
```
