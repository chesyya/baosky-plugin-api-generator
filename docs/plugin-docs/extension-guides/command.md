---
# DO NOT TOUCH — Managed by doc writer

ContentId: 995c7085-5fc0-44e0-a171-30a759c0b7da
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: 在 Baosky 插件（插件）中以编程方式使用命令的指南
---

# 命令

命令在 Baosky 中触发操作。如果你曾经[配置过键绑定](/docs/getstarted/keybindings)，那么你就已经使用过命令了。命令还被插件用于向用户公开功能、绑定到 Baosky 的 UI 操作，以及实现内部逻辑。

## 使用命令

Baosky 包含大量的[内置命令](/api/references/commands)，你可以使用这些命令与编辑器交互、控制用户界面或执行后台操作。许多插件还将其核心功能作为命令公开，供用户和其他插件使用。

### 以编程方式执行命令

[`code`](/api/references/baosky-api#commands.executeCommand) API 以编程方式执行命令。这使您可以使用 Baosky 的内置功能，并基于插件（如 Baosky 的内置 Git 和 Markdown ）进行构建。

例如，`editor.action.addCommentLine` 命令会注释活动文本编辑器中当前选定的行：

```ts
import * as vscode from 'vscode';

function commentLine() {
  vscode.commands.executeCommand('editor.action.addCommentLine');
}
```

有些命令接受参数来控制其行为。命令还可能返回结果。例如，类似 API 的 `vscode.executeDefinitionProvider` 命令会在文档中查询给定位置的定义。它接受文档 URI 和位置作为参数，并返回一个包含定义列表的 promise：

```ts
import * as vscode from 'vscode';

async function printDefinitionsForActiveEditor() {
  const activeEditor = vscode.window.activeTextEditor;
  if (!activeEditor) {
    return;
  }

  const definitions = await vscode.commands.executeCommand<vscode.Location[]>(
    'vscode.executeDefinitionProvider',
    activeEditor.document.uri,
    activeEditor.selection.active
  );

  for (const definition of definitions) {
    console.log(definition);
  }
}
```

要查找可用的命令：

- [浏览键盘快捷键](/docs/getstarted/keybindings)
- [查看 Baosky 的内置高级命令 API](/api/references/commands)

### 命令 URI

命令 URI 是执行给定命令的链接。它们可以用作悬停文本、完成项详细信息中的可点击链接，或在 webview 内部使用。

命令 URI 使用 `command` 方案，后跟命令名称。例如，`editor.action.addCommentLine` 命令的命令 URI 是 `command:editor.action.addCommentLine`。下面是一个悬停提供程序，它在活动文本编辑器的当前行注释中显示一个链接：

```ts
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  vscode.languages.registerHoverProvider(
    'javascript',
    new class implements vscode.HoverProvider {
      provideHover(
        _document: vscode.TextDocument,
        _position: vscode.Position,
        _token: vscode.CancellationToken
      ): vscode.ProviderResult<vscode.Hover> {
        const commentCommandUri = vscode.Uri.parse(`command:editor.action.addCommentLine`);
        const contents = new vscode.MarkdownString(`[Add comment](${commentCommandUri})`);

        // 要在 Markdown 内容中启用命令 URI，必须设置 `isTrusted` 标志。
        // 创建受信任的 Markdown 字符串时，请确保正确清理所有
        // 输入内容，以便只执行预期的命令 URI
        contents.isTrusted = true;

        return new vscode.Hover(contents);
      }
    }()
  );
}
```

命令的参数列表作为正确 URI 编码的 JSON 数组传递：下面的示例使用 `git.stage` 命令创建一个暂存当前文件的悬停链接：

```ts
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  vscode.languages.registerHoverProvider(
    'javascript',
    new class implements vscode.HoverProvider {
      provideHover(
        document: vscode.TextDocument,
        _position: vscode.Position,
        _token: vscode.CancellationToken
      ): vscode.ProviderResult<vscode.Hover> {
        const args = [{ resourceUri: document.uri }];
        const stageCommandUri = vscode.Uri.parse(
          `command:git.stage?${encodeURIComponent(JSON.stringify(args))}`
        );
        const contents = new vscode.MarkdownString(`[Stage file](${stageCommandUri})`);
        contents.isTrusted = true;
        return new vscode.Hover(contents);
      }
    }()
  );
}
```

您可以在 webview 时通过在 `WebviewOptions` 中设置 `enableCommandUris` 来在 [webview](/api/插件-guides/webview) 中启用命令 URI。

## 创建新命令

### 注册命令

[`code`](/api/references/baosky-api#commands.registerCommand) 将命令 ID 绑定到插件中的处理函数：

```ts
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const command = 'myExtension.sayHello';

  const commandHandler = (name: string = 'world') => {
    console.log(`Hello ${name}!!!`);
  };

  context.subscriptions.push(vscode.commands.registerCommand(command, commandHandler));
}
```

每当执行 `myExtension.sayHello` 命令时，处理函数都会被调用，无论是通过 `executeCommand` 以编程方式调用、从 Baosky UI 调用，还是通过键绑定调用。

### 创建面向用户的命令

`vscode.commands.registerCommand` 仅将命令 ID 绑定到处理函数。要在命令面板中公开此命令以便用户可以发现它，你还需要在扩展的 `package.json` 中添加相应的命令 `contribution`：

```json
{
  "contributes": {
    "commands": [
      {
        "command": "myExtension.sayHello",
        "title": "Say Hello"
      }
    ]
  }
}
```

`commands` 贡献告诉 Baosky 你的插件提供了给定的命令，并且应该在调用该命令时激活，还可以让你控制命令在 UI 中的显示方式。创建命令时，请确保遵循[命令命名约定](#naming-conventions)。

<!-- 图片已移除 -->

现在，当用户首次从命令面板或通过键绑定调用 `myExtension.sayHello` 命令时，插件将被激活，`registerCommand` 会将 `myExtension.sayHello` 绑定到正确的处理函数。

> ** 注意 ** ：面向 1.74.0 之前的 Baosky 版本的插件必须为所有面向用户的命令显式注册 `onCommand` `activationEvent`，以便插件激活并执行 `registerCommand`：
> ```json
> {
> "activationEvents": ["onCommand:myExtension.sayHello"]
> }
> ```


你不需要为内部命令设置 `onCommand` 激活事件，但必须为以下任何命令定义它们：

- 可以使用命令面板调用。
- 可以使用键绑定调用。
- 可以通过 Baosky UI 调用，例如通过编辑器标题栏。
- 旨在作为 API 供其他插件使用。

### 控制命令何时显示在命令面板中

默认情况下，通过 `package.json` 的 `commands` 部分贡献的所有面向用户的命令都会显示在命令面板中。然而，许多命令仅在特定情况下才相关，例如当存在给定语言的活动文本编辑器时，或者当用户设置了某个配置选项时。

[`code`](/api/references/contribution-points#contributes.menus) 贡献点允许你限制命令何时应显示在命令面板中。它接受目标命令的 ID 和一个控制何时显示命令的 [when 子句](/api/references/when-clause-contexts)：

```json
{
  "contributes": {
    "menus": {
      "commandPalette": [
        {
          "command": "myExtension.sayHello",
          "when": "editorLangId == markdown"
        }
      ]
    }
  }
}
```

现在，`myExtension.sayHello` 命令只会在用户处于 Markdown 文件中时显示在命令面板中。

### 命令的启用

命令通过 `enablement` 属性支持启用 - 其值是一个 [when 子句](/api/references/when-clause-contexts)。启用适用于所有菜单和已注册的键绑定。

> ** 注意 ** ：`enablement` 和菜单项的 `when` 条件之间存在语义重叠。后者用于防止菜单充满禁用的项。例如，分析 JavaScript 正则表达式的命令应该在文件是 JavaScript 时 ** 显示 ** （when），并且仅在光标位于正则表达式上方时 ** 启用 ** （enabled）。`when` 子句通过不为所有其他语言文件显示命令来防止混乱。强烈建议防止菜单混乱。

最后，显示命令的菜单（如命令面板或上下文菜单）实现了处理启用的不同方式。编辑器和资源管理器上下文菜单会渲染启用/禁用的项，而命令面板则会过滤它们。

### 使用自定义 when 子句上下文

如果你正在创作自己的 Baosky 插件，并且需要使用 `when` 子句上下文来启用/禁用命令、菜单或视图，而现有的键都不符合你的需求，那么你可以添加自己的上下文。

下面的第一个示例将键 `myExtension.showMyCommand` 设置为 true，你可以在命令的启用中或与 `when` 属性一起使用它。第二个示例存储了一个值，你可以使用 `when` 子句来检查打开的酷东西的数量是否大于 2。

```js
vscode.commands.executeCommand('setContext', 'myExtension.showMyCommand', true);

vscode.commands.executeCommand('setContext', 'myExtension.numberOfCoolOpenThings', 2);
```

## 命名约定

创建命令时，你应该遵循以下命名约定：

- 命令标题
  - 使用标题样式大写。不要大写四个或更少字母的介词（例如 on、to、in、of、with 和 for），除非介词是第一个或最后一个单词。
  - 以动词开头，描述将要执行的操作。
  - 使用名词描述操作的目标。
  - 避免在标题中使用"command"。
