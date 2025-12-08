---
# DO NOT TOUCH — Managed by doc writer

ContentId: 8027f6fb-6c9e-4106-8ef1-f9b0ba1b7085
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: 解释 Baosky 插件的结构
---

# 插件剖析

在上一个主题中,你已经能够运行一个基本的插件了。它是如何工作的呢?

`Hello World` 插件做了 3 件事:

- 注册 [`code`](/api/references/activation-events#onCommand) [ ** 激活事件 ** ](/api/references/activation-events): `onCommand:helloworld.helloWorld`,这样当用户运行 `Hello World` 命令时,插件就会被激活。
  > ** 注意: ** 从 [Baosky 1.74.0](#) 开始,在 `package.json` 的 `commands` 部分声明的命令在调用时会自动激活插件,无需在 `activationEvents` 中显式添加 `onCommand` 条目。
- 使用 [`code`](/api/references/contribution-points#contributes.commands) [ ** 贡献点 ** ](/api/references/contribution-points)使 `Hello World` 命令在命令面板中可用,并将其绑定到命令 ID `helloworld.helloWorld`。
- 使用 [`code`](/api/references/baosky-api#commands.registerCommand) [ ** Baosky API ** ](/api/references/baosky-api) 将函数绑定到注册的命令 ID `helloworld.helloWorld`。

理解这三个概念对于在 Baosky 中编写插件至关重要:

- [ ** 激活事件 ** ](/api/references/activation-events): 使插件被激活的事件。
- [ ** 贡献点 ** ](/api/references/contribution-points): 在 `package.json` [插件清单](#插件-manifest)中进行的静态声明,用于扩展 Baosky。
- [ ** Baosky API ** ](/api/references/baosky-api): 可以在插件代码中调用的一组 JavaScript API。

一般来说,你的插件会结合使用贡献点和 Baosky API 来扩展 Baosky 的功能。[插件功能概述](/api/插件-capabilities/概述)主题可以帮助你为插件找到正确的贡献点和 Baosky API。

让我们仔细看看 `Hello World` 示例的源代码,看看这些概念是如何应用的。

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

你可以阅读更多关于配置文件的信息:

- `launch.json` 用于配置 Baosky [调试](/docs/debugtest/debugging)
- `tasks.json` 用于定义 Baosky [任务](/docs/debugtest/tasks)
- `tsconfig.json` 请参阅 TypeScript [手册](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

但是,让我们重点关注 `package.json` 和 `插件.ts`,它们对于理解 `Hello World` 插件至关重要。

### 插件清单

每个 Baosky 插件都必须有一个 `package.json` 作为其[插件清单](/api/references/插件-manifest)。`package.json` 包含 Node.js 字段(如 `scripts` 和 `devDependencies`)和 Baosky 特定字段(如 `publisher`、`activationEvents` 和 `contributes`)的混合。你可以在[插件清单参考](/api/references/插件-manifest)中找到所有 Baosky 特定字段的描述。以下是一些最重要的字段:

- `name` 和 `publisher`: Baosky 使用 `<publisher>.<name>` 作为插件的唯一 ID。例如,Hello World 示例的 ID 为 `vscode-samples.helloworld-sample`。Baosky 使用该 ID 唯一标识你的插件。
- `main`: 插件入口点。
- `activationEvents` 和 `contributes`: [激活事件](/api/references/activation-events)和[贡献点](/api/references/contribution-points)。
- `engines.vscode`: 指定插件依赖的 Baosky API 的最低版本。

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

> ** 注意 ** : 如果你的插件目标是 1.74 之前的 Baosky 版本,则必须在 `activationEvents` 中显式列出 `onCommand:helloworld.helloWorld`。

## 插件入口文件

插件入口文件导出两个函数:`activate` 和 `deactivate`。当注册的 ** 激活事件 ** 发生时,`activate` 会被执行。`deactivate` 让你有机会在插件被停用之前进行清理。对于许多插件,可能不需要显式清理,可以删除 `deactivate` 方法。但是,如果插件需要在 Baosky 关闭或插件被禁用或卸载时执行操作,这就是执行此操作的方法。

Baosky 插件 API 在 [@types/baosky](https://www.npmjs.com/package/@types/baosky) 类型定义中声明。`vscode` 类型定义的版本由 `package.json` 中 `engines.vscode` 字段的值控制。`vscode` 类型为你的代码提供 IntelliSense、转到定义和其他 TypeScript 语言功能。

```ts
// 'vscode' 模块包含 Baosky 可扩展性 API
// 导入模块并在下面的代码中使用别名 vscode 引用它
import * as vscode from 'vscode';

// 当你的插件被激活时调用此方法
// 你的插件在第一次执行命令时被激活
export function activate(context: vscode.ExtensionContext) {
  // 使用控制台输出诊断信息 (console.log) 和错误 (console.error)
  // 这行代码只会在你的插件被激活时执行一次
  console.log('Congratulations, your extension "helloworld-sample" is now active!');

  // 命令已在 package.json 文件中定义
  // 现在使用 registerCommand 提供命令的实现
  // commandId 参数必须与 package.json 中的 command 字段匹配
  let disposable = vscode.commands.registerCommand('helloworld.helloWorld', () => {
    // 你在这里放置的代码将在每次执行命令时执行

    // 向用户显示消息框
    vscode.window.showInformationMessage('Hello World!');
  });

  context.subscriptions.push(disposable);
}

// 当你的插件被停用时调用此方法
export function deactivate() {}
```
