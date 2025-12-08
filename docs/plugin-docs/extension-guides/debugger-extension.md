---
# DO NOT TOUCH — Managed by doc writer

ContentId: 49EF49AD-8BE6-4D46-ADC8-D678BDC04E85
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: 了解如何通过调试适配器为 Baosky 提供调试器插件（插件）。
---

# 调试器插件

Baosky 的调试架构允许插件作者轻松地将现有调试器集成到 Baosky 中，同时与所有这些调试器具有通用的用户界面。

Baosky 附带一个内置调试器插件，即 [Node.js](https://nodejs.org) 调试器插件，这是 Baosky 支持的许多调试器功能的绝佳展示：

<!-- 图片已移除 -->

此屏幕截图显示了以下调试功能：

1.调试配置管理。
2. 调试启动/停止和单步操作。
3. 源断点、函数断点、条件断点、内联断点和日志点。
4. 堆栈跟踪，包括多线程和多进程支持。
5. 在视图和悬停中浏览复杂的数据结构。
6. 悬停中显示的变量值或源代码中内嵌的变量值。
7. 管理监视表达式。
8. 调试控制台，用于具有自动完成功能的交互式评估。

本文档将帮助您创建一个调试器插件，它可以使任何调试器与 Baosky 一起工作。

## Baosky 调试架构

Baosky 基于我们引入的与调试器后端通信的抽象协议实现通用（与语言无关）调试器 UI。
由于调试器通常不实现此协议，因此需要一些中介来使调试器“适应”该协议。
该中介通常是与调试器通信的独立进程。

<!-- 图片已移除 -->

我们将此中介称为 ** 调试适配器 ** （或简称 ** DA ** ），DA 和 Baosky 之间使用的抽象协议是 ** 调试适配器协议 ** （简称 ** DAP ** ）。
由于调试适配器协议独立于 Baosky，它有自己的 [web site](https://microsoft.github.io/调试-adapter-protocol/)，您可以在其中找到 [introduction and 概述](https://microsoft.github.io/调试-adapter-protocol/overview)、详细的 [specification](https://microsoft.github.io/调试-adapter-protocol/specification) 以及一些带有 [known implementations and supporting tools](https://microsoft.github.io/调试-adapter-protocol/implementors/adapters/) 的列表。
此 [blog post](#) 解释了 DAP 的历史和背后的动机。

由于调试适配器独立于 Baosky 并且可以在 [other developments tools](https://microsoft.github.io/调试-adapter-protocol/implementors/tools/) 中使用，因此它们与 Baosky 基于插件和贡献点的可扩展性架构不匹配。

因此 Baosky 提供了一个贡献点 `debuggers`，其中可以在特定调试类型下提供调试适配器（例如 `node` 用于 Node.js 调试器）。每当用户启动该类型的调试会话时，Baosky 都会启动已注册的 DA。

因此，在其最基本的形式中，调试器插件只是调试适配器实现的声明性贡献，并且插件基本上是调试适配器的打包容器，无需任何附加代码。

<!-- 图片已移除 -->

更现实的调试器插件将以下许多或全部声明性项目贡献给 Baosky：

- 调试器支持的语言列表。 Baosky 使 UI 能够为这些语言设置断点。
- 调试器引入的调试配置属性的 JSON 架构。 Baosky 使用此架构来验证 launch.json 编辑器中的配置并提供 IntelliSense。请注意，不支持 JSON 架构构造 `$ref` 和 `definition`。
- Baosky 创建的初始 launch.json 的默认调试配置。
- 调试用户可以添加到 launch.json 文件的配置片段。
- 可在调试配置中使用的变量声明。

您可以在 [`code`](/api/references/contribution-points#contributes.breakpoints) 和 [`code`](/api/references/contribution-points#contributes.debuggers) 参考文献中找到更多信息。

除了上面的纯声明性贡献之外，调试插件 API 还支持此基于代码的功能：

- 为 Baosky 创建的初始 launch.json 动态生成默认调试配置。
- 确定要动态使用的调试适配器。
- 在将调试配置传递到调试适配器之前验证或修改它们。
- 与调试适配器通信。
- Send messages 要 the debug console.

在本文档的其余部分中，我们将展示如何开发调试器插件。

## 模拟调试插件

由于从头开始创建调试适配器对于本教程来说有点繁重，因此我们将从一个简单的 DA 开始，我们已将其创建为教育性“调试适配器入门套件”。它被称为“模拟调试”，因为它不与真正的调试器对话，而是模拟调试器。 Mock 调试 模拟一个调试器，支持单步、继续、断点、异常和变量访问，但它没有连接到任何真实的调试器。

在深入研究模拟调试的开发设置之前，我们首先安装 [pre-built version](#)
从 Baosky 市场并使用它：

- 切换到插件视图并输入“mock”以搜索 Mock 调试 插件，
- “安装”和“重新加载”插件。

尝试模拟调试：

- 创建一个新的空文件夹`mock test`并在Baosky中打开它。
- 创建文件 `readme.md` 并输入多行任意文本。
- 切换到“运行和调试”视图 (`kb(工作台.view.调试)`) 并选择 ** 创建 launch.json 文件 ** 链接。
- Baosky 将让您选择一个“调试器”以创建默认启动配置。选择“模拟调试”。
- 按绿色 ** 开始 ** 按钮，然后按 `kbstyle(Enter)` 确认建议的文件 `readme.md`。

调试会话启动，您可以“单步执行”自述文件，设置并命中断点，并遇到异常（如果单词 `exception` 出现在一行中）。

<!-- 图片已移除 -->

在使用 Mock 调试 作为您自己开发的起点之前，我们建议先卸载预构建的版本：

- 切换到插件视图并单击模拟调试插件的齿轮图标。
- 运行“卸载”操作，然后“重新加载”窗口。

## 模拟调试的开发设置

现在让我们获取 Mock 调试 的源代码并在 Baosky 中开始对其进行开发：

```bash
git clone https://github.com/microsoft/vscode-mock-debug.git
cd vscode-mock-debug
yarn
```

Open the project folder `vscode-mock-debug` in Baosky.

包裹里有什么？

- `package.json` 是模拟调试插件的清单：
- 它列出了模拟调试插件的贡献。
- `compile` 和 `watch` 脚本用于将 TypeScript 源文件转译到 `out` 文件夹中，并监视后续源文件的修改。
- 依赖项 `vscode-debugprotocol`、`vscode-debugadapter` 和 `vscode-debugadapter-testsupport` 是 NPM 模块，可简化基于节点的调试适配器的开发。
- `src/mockRuntime.ts` 是一个带有简单调试 API 的 _mock_ 运行时。
- 让运行时适应调试适配器协议的代码位于 `src/mockDebug.ts` 中。在这里您可以找到 DAP 各种请求的处理程序。
- 由于调试器插件的实现位于调试适配器中，因此根本不需要插件代码（即在插件主机进程中运行的代码）。然而，Mock 调试 有一个小的 `src/插件.ts` 因为它说明了在调试器插件的插件代码中可以做什么。

现在，通过选择 ** 插件 ** 启动配置并点击 `F5` 来构建并启动模拟调试插件。
最初，这会将 TypeScript 源完全转译到 `out` 文件夹中。
完整构建后，将启动一个_watcher 任务_来转译您所做的任何更改。

转译源代码后，会出现一个标有“[插件开发主机]”的新 Baosky 窗口，其中 Mock 调试 插件现在在调试模式下运行。从该窗口中使用 `readme.md` 文件打开 `mock test` 项目，使用“F5”启动调试会话，然后单步执行：

<!-- 图片已移除 -->

由于您在调试模式下运行插件，因此您现在可以在 `src/插件.ts` 中设置并命中断点，但正如我上面提到的，插件中执行的代码并不多。有趣的代码在调试适配器中运行，这是一个单独的进程。

为了调试调试适配器本身，我们必须在调试模式下运行它。通过在_服务器模式_下运行调试适配器并配置 Baosky 以连接到它，可以最轻松地实现这一点。在您的 Baosky baosky-mock-调试 项目中，从下拉菜单中选择启动配置 ** Server ** 并按绿色启动按钮。

由于我们已经为插件建立了一个活动的调试会话，Baosky 调试器 UI 现在进入 _multi session_ 模式，这可以通过查看 CALL STACK 视图中显示的两个调试会话 ** 插件 ** 和 ** Server ** 的名称来指示：

<!-- 图片已移除 -->

现在我们可以同时调试插件和 DA。
到达这里的更快方法是使用 ** 插件 + Server ** 启动配置，它会自动启动两个会话。

另一种更简单的调试插件和 DA 的方法可以在 [below](#alternative-approach-to-develop-a-调试器-插件) 中找到。

在文件 `src/mockDebug.ts` 中方法 `launchRequest(...)` 的开头设置一个断点，最后一步通过将端口 `4711` 的 `debugServer` 属性添加到模拟测试启动配置来配置模拟调试器以连接到 DA 服务器：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "mock",
      "request": "launch",
      "name": "mock test",
      "program": "${workspaceFolder}/readme.md",
      "stopOnEntry": true,
      "debugServer": 4711
    }
  ]
}
```

如果您现在启动此调试配置，Baosky 不会将模拟调试适配器作为单独的进程启动，而是直接连接到已运行服务器的本地端口 4711，并且您应该在 `launchRequest` 中命中断点。

With this setup, 您可以 now easily edit, transpile, and debug Mock Debug.

但现在真正的工作开始了：您必须用一些与“真实”调试器或运行时对话的代码替换 `src/mockDebug.ts` 和 `src/mockRuntime.ts` 中调试适配器的模拟实现。这涉及理解和实现调试适配器协议。更多详情
关于此内容可以找到[here](https://microsoft.github.io/调试-adapter-protocol/overview#How_it_works)。

## 调试器 package.json 插件的剖析

除了提供调试适配器的特定于调试器的实现之外，调试器插件还需要一个 `package.json` 来贡献各种与调试相关的贡献点。

那么让我们仔细看看 Mock 调试 的 `package.json` 。

与每个 Baosky 插件一样，`package.json` 声明插件的基本属性 ** name ** 、 ** publisher ** 和 ** version ** 。使用 ** categories ** 字段可以更轻松地在 Baosky 插件市场中找到插件。

```json
{
  "name": "mock-debug",
  "displayName": "Mock Debug",
  "version": "0.24.0",
  "publisher": "...",
  "description": "Starter extension for developing debug adapters for Baosky.",
  "author": {
    "name": "...",
    "email": "..."
  },
  "engines": {
    "vscode": "^1.17.0",
    "node": "^7.9.0"
  },
  "icon": "images/mock-debug-icon.png",
  "categories": ["Debuggers"],

  "contributes": {
    "breakpoints": [{ "language": "markdown" }],
    "debuggers": [
      {
        "type": "mock",
        "label": "Mock Debug",

        "program": "./out/mockDebug.js",
        "runtime": "node",

        "configurationAttributes": {
          "launch": {
            "required": ["program"],
            "properties": {
              "program": {
                "type": "string",
                "description": "Absolute path to a text file.",
                "default": "${workspaceFolder}/${command:AskForProgramName}"
              },
              "stopOnEntry": {
                "type": "boolean",
                "description": "Automatically stop after launch.",
                "default": true
              }
            }
          }
        },

        "initialConfigurations": [
          {
            "type": "mock",
            "request": "launch",
            "name": "Ask for file name",
            "program": "${workspaceFolder}/${command:AskForProgramName}",
            "stopOnEntry": true
          }
        ],

        "configurationSnippets": [
          {
            "label": "Mock Debug: Launch",
            "description": "A new configuration for launching a mock debug program",
            "body": {
              "type": "mock",
              "request": "launch",
              "name": "${2:Launch Program}",
              "program": "^\"\\${workspaceFolder}/${1:Program}\""
            }
          }
        ],

        "variables": {
          "AskForProgramName": "extension.mock-debug.getProgramName"
        }
      }
    ]
  },

  "activationEvents": ["onDebug", "onCommand:extension.mock-debug.getProgramName"]
}
```

现在看一下 ** contributes ** 部分，其中包含特定于调试插件的贡献。

首先，我们使用 ** breakpoints ** 贡献点来列出将启用设置断点的语言。如果没有这个，就不可能在 Markdown 文件中设置断点。

接下来是 ** 调试器 ** 部分。这里，在调试 ** 类型 ** `mock` 下引入了一个调试器。用户可以在启动配置中引用此类型。可选属性 ** label ** 可用于在 UI 中显示调试类型时为其指定一个好听的名称。

由于调试插件使用调试适配器，因此其代码的相对路径作为 ** program ** 属性给出。
为了使插件独立，应用程序必须位于插件文件夹内。按照惯例，我们将此应用程序保存在名为 `out` 或 `bin` 的文件夹中，但您可以随意使用其他名称。

由于Baosky运行在不同的平台上，我们必须确保DA程序也支持不同的平台。为此，我们有以下选择：

1. 如果程序以平台无关的方式实现，例如作为在所有支持的平台上可用的运行时上运行的程序，您可以通过 ** runtime ** 属性指定此运行时。截至今天，Baosky 支持 `node` 和 `mono` 运行时。上面的模拟调试适配器就使用了这种方法。

1. 如果您的 DA 实现需要在不同平台上使用不同的可执行文件，则可以针对特定平台限定 ** program ** 属性，如下所示：

   ```json
   "debuggers": [{
       "type": "gdb",
       "windows": {
           "program": "./bin/gdbDebug.exe",
       },
       "osx": {
           "program": "./bin/gdbDebug.sh",
       },
       "linux": {
           "program": "./bin/gdbDebug.sh",
       }
   }]
   ```

1. 两种方法的结合也是可能的。以下示例来自 Mono DA，它作为单声道应用程序实现，需要在 macOS 和 Linux 上运行，但不需要在 Windows 上运行：

   ```json
   "debuggers": [{
       "type": "mono",
       "program": "./bin/monoDebug.exe",
       "osx": {
           "runtime": "mono"
       },
       "linux": {
           "runtime": "mono"
       }
   }]
   ```

** configurationAttributes ** 声明可用于此调试器的 `launch.json` 属性的架构。此架构用于在编辑启动配置时验证 `launch.json` 并支持 IntelliSense 和悬停帮助。

** initialConfigurations ** 定义此调试器的默认 `launch.json` 的初始内容。当项目没有 `launch.json` 并且用户启动调试会话或在“运行和调试”视图中选择 ** 创建 launch.json 文件 ** 链接时，将使用此信息。在本例中，Baosky 让用户选择一个调试环境，然后创建相应的 `launch.json`：

<!-- 图片已移除 -->

可以通过实现 `DebugConfigurationProvider` 来动态计算初始配置，而不是在 `package.json` 中静态定义 `launch.json` 的初始内容（有关详细信息，请参阅 [Using a DebugConfigurationProvider below](#using-a-debugconfigurationprovider) 部分）。

** configurationSnippets ** 定义编辑 `launch.json` 时在 IntelliSense 中显示的启动配置片段。作为惯例，请在代码片段的 `label` 属性前加上调试环境名称前缀，以便在出现在许多代码片段提案的列表中时可以清楚地识别它。

** 变量 ** 贡献将“变量”绑定到“命令”。这些变量可以使用 `\${命令:xyz}` 语法在启动配置中使用，并且在启动调试会话时，这些变量将被从绑定命令返回的值替换。

命令的实现存在于插件中，它的范围可以从没有 UI 的简单表达式，到基于插件 API 中可用的 UI 功能的复杂功能。
模拟调试将变量 `AskForProgramName` 绑定到命令 `插件.mock-调试.getProgramName`。 `src/插件.ts` 中该命令的 [implementation](https://github.com/microsoft/baosky-mock-调试/blob/606454ff3bd669867a38d9b2dc7b348d324a3f6b/src/插件.ts#L21-L26) 使用 `showInputBox` 让用户输入程序名称：

```ts
vscode.commands.registerCommand('extension.mock-debug.getProgramName', config => {
  return vscode.window.showInputBox({
    placeHolder: 'Please enter the name of a markdown file in the workspace folder',
    value: 'readme.md'
  });
});
```

该变量现在可以在启动配置的任何字符串类型值中使用，如 `\${命令:AskForProgramName}`。

## 使用 DebugConfigurationProvider

如果 `package.json` 中调试贡献的静态性质不够，则可以使用 `DebugConfigurationProvider` 来动态控制调试插件的以下方面：

- 新创建的 launch.json 的初始调试配置可以动态生成，例如基于工作区中可用的一些上下文信息。
- 启动配置在用于启动新的调试会话之前可以_解析_（或修改）。这允许根据工作区中可用的信息填充默认值。存在两种 _resolve_ 方法： `resolveDebugConfiguration` 在启动配置中替换变量之前调用， `resolveDebugConfigurationWithSubstitutedVariables` 在所有变量替换后调用。如果验证逻辑将其他变量插入调试配置中，则必须使用前者。如果验证逻辑需要访问所有调试配置属性的最终值，则必须使用后者。

`src/插件.ts` 中的 `MockConfigurationProvider` 实现 `resolveDebugConfiguration` 来检测当不存在 launch.json 但在活动编辑器中打开 Markdown 文件时启动调试会话的情况。这是一个典型的场景，用户在编辑器中打开了一个文件，只想调试它而不创建 launch.json。

调试配置提供程序通过 `vscode.调试.registerDebugConfigurationProvider` 注册用于特定调试类型，通常在插件的 `activate` 函数中。
为了确保 `DebugConfigurationProvider` 足够早地注册，必须在使用调试功能后立即激活插件。这可以通过在 `package.json` 中为 `onDebug` 事件配置插件激活来轻松实现：

```json
"activationEvents": [
    "onDebug",
    // ...
],
```

一旦使用任何调试功能，就会触发这个包罗万象的 `onDebug`。只要插件的启动成本低廉（即在启动顺序上不花费大量时间），这种方法就可以正常工作。如果调试插件的启动成本很高（例如，由于启动语言服务器），则 `onDebug` 激活事件可能会对其他调试插件产生负面影响，因为它触发得相当早，并且不考虑特定的调试类型。

对于昂贵的调试插件来说，更好的方法是使用更细粒度的激活事件：

- `onDebugInitialConfigurations` 在调用 `DebugConfigurationProvider` 的 `provideDebugConfigurations` 方法之前触发。
- `onDebugResolve:type` 在调用指定类型的 `DebugConfigurationProvider` 的 `resolveDebugConfiguration` 或 `resolveDebugConfigurationWithSubstitutedVariables` 方法之前触发。

** 经验法则： ** 如果激活调试插件很便宜，请使用 `onDebug`。如果成本昂贵，请使用 `onDebugInitialConfigurations` 和/或 `onDebugResolve`，具体取决于 `DebugConfigurationProvider` 是否实现相应的方法 `provideDebugConfigurations` 和/或 `resolveDebugConfiguration`。

## 发布你的调试器插件

创建调试器插件后，您可以将其发布到市场：

- 更新 `package.json` 中的属性以反映调试器插件的命名和用途。
- 按照 [Publishing 插件](/api/working-with-插件/publishing-插件) 中的说明上传到市场。

## 开发调试器插件的替代方法

正如我们所看到的，开发调试器插件通常涉及在两个并行会话中调试插件和调试适配器。如上所述，Baosky 很好地支持了这一点，但如果插件和调试适配器都是一个可以在一个调试会话中调试的程序，那么开发可能会更容易。

事实上，只要您的调试适配器是在 TypeScript/JavaScript 中实现的，这种方法就很容易实现。基本思想是直接在插件内部运行调试适配器，并使 Baosky 连接到它，而不是在每个会话中启动新的外部调试适配器。

为此，Baosky 提供了插件 API 来控制调试适配器的创建和运行方式。 `DebugAdapterDescriptorFactory` 有一个方法 `createDebugAdapterDescriptor`，当调试会话启动并且需要调试适配器时，该方法由 Baosky 调用。此方法必须返回一个描述调试适配器如何运行的描述符对象 (`DebugAdapterDescriptor`)。

如今 Baosky 支持三种不同的方式来运行调试适配器，因此提供三种不同的描述符类型：

- `DebugAdapterExecutable`：此对象将调试适配器描述为具有路径、可选参数和运行时的外部可执行文件。可执行文件必须实现调试适配器协议并通过 stdin/stdout 进行通信。这是 Baosky 的默认操作模式，如果没有显式注册 `DebugAdapterDescriptorFactory` ，Baosky 会自动使用此描述符以及 package.json 中的相应值。
- `DebugAdapterServer`：此对象描述作为服务器运行的调试适配器，通过特定的本地或远程端口进行通信。基于 [`code`](https://www.npmjs.com/package/baosky-debugadapter) npm 模块的调试适配器实现自动支持此服务器模式。
- `DebugAdapterInlineImplementation`: this object describes a debug adapter as a JavaScript or Typescript object that implements the `vscode.DebugAdapter` interface. A debug adapter implementation based on version 1.38-pre.4 or later of the [`code`](https://www.npmjs.com/package/baosky-debugadapter) npm module implements the interface automatically.

模拟调试显示 [three types of DebugAdapterDescriptorFactories](https://github.com/microsoft/baosky-mock-调试/blob/668fa6f5db95dbb76825d4eb670ab0d305050c3b/src/插件.ts#L91-L150) 的示例以及它们如何 [registered for the 'mock' 调试 type](https://github.com/microsoft/baosky-mock-调试/blob/668fa6f5db95dbb76825d4eb670ab0d305050c3b/src/插件.ts#L50)。可以通过 [setting the global variable `code`](https://github.com/microsoft/baosky-mock-调试/blob/668fa6f5db95dbb76825d4eb670ab0d305050c3b/src/插件.ts#L16) 将要使用的运行模式选择为可能值 `external`、`server` 或 `inline` 之一。

对于开发来说， `inline` 和 `server` 模式特别有用，因为它们允许在单个进程中调试插件和调试适配器。
