---
# DO NOT TOUCH — Managed by doc writer

ContentId: 54fdcc33-7ad1-40cc-bc87-ded1841d01ad
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: Baosky 插件（扩展）中使用虚拟文档的指南
---

# 虚拟文档

文本文档内容提供程序 API 允许您从任意来源在 Baosky 中创建只读文档。您可以在以下位置找到带有源代码的示例插件：[https://github.com/microsoft/baosky-extension-samples/blob/main/virtual-document-sample/README.md](https://github.com/microsoft/baosky-extension-samples/blob/main/virtual-document-sample/README.md)。

## TextDocumentContentProvider

该 API 的工作原理是声明一个 uri-scheme，您的提供程序随后将为该 scheme 返回文本内容。注册提供程序时必须提供 scheme，之后不能更改。同一个提供程序可用于多个 scheme，并且可以为单个 scheme 注册多个提供程序。

```ts
vscode.workspace.registerTextDocumentContentProvider(myScheme, myProvider);
```

调用 `registerTextDocumentContentProvider` 会返回一个 disposable 对象，用于撤销注册。提供程序只需实现 `provideTextDocumentContent` 函数，该函数会在提供 uri 和取消令牌时被调用。

```ts
const myProvider = new class implements vscode.TextDocumentContentProvider {
  provideTextDocumentContent(uri: vscode.Uri): string {
    // invoke cowsay, use uri-path as text
    return cowsay.say({ text: uri.path });
  }
};
```

请注意，提供程序不会为虚拟文档创建 uri - 它的作用是在给定此类 uri 时 **提供** 内容。作为回报，内容提供程序被接入到打开文档的逻辑中，以便始终考虑提供程序。

此示例使用了一个 'cowsay' 命令，该命令构造一个 uri，编辑器随后应显示该 uri：

```ts
vscode.commands.registerCommand('cowsay.say', async () => {
  let what = await vscode.window.showInputBox({ placeHolder: 'cow say?' });
  if (what) {
    let uri = vscode.Uri.parse('cowsay:' + what);
    let doc = await vscode.workspace.openTextDocument(uri); // calls back into the provider
    await vscode.window.showTextDocument(doc, { preview: false });
  }
});
```

该命令提示输入，创建一个 `cowsay` scheme 的 uri，打开该 uri 的文档，最后为该文档打开一个编辑器。在第 3 步打开文档时，会请求提供程序为该 uri 提供内容。

至此，我们拥有了一个功能齐全的文本文档内容提供程序。下一节将描述如何更新虚拟文档以及如何为虚拟文档注册 UI 命令。

### 更新虚拟文档

根据不同的场景，虚拟文档可能会发生变化。为了支持这一点，提供程序可以实现 `onDidChange` 事件。

`vscode.Event` 类型定义了 Baosky 中的事件契约。实现事件的最简单方法是 `vscode.EventEmitter`，如下所示：

```ts
const myProvider = new class implements vscode.TextDocumentContentProvider {
  // emitter and its event
  onDidChangeEmitter = new vscode.EventEmitter<vscode.Uri>();
  onDidChange = this.onDidChangeEmitter.event;

  //...
};
```

事件发射器有一个 `fire` 方法，用于在文档发生更改时通知 Baosky。更改后的文档由作为 `fire` 方法参数提供的 uri 标识。如果文档仍然打开，则会再次调用提供程序以提供更新的内容。

这就是让 Baosky 监听虚拟文档更改所需的全部内容。要查看使用此功能的更复杂示例，请查看：[https://github.com/microsoft/baosky-extension-samples/blob/main/contentprovider-sample/README.md](https://github.com/microsoft/baosky-extension-samples/blob/main/contentprovider-sample/README.md)。

### 添加编辑器命令

可以添加仅与关联内容提供程序提供的文档交互的编辑器操作。这是一个反转刚才 cow 所说内容的示例命令：

```ts
// register a command that updates the current cowsay
subscriptions.push(
  vscode.commands.registerCommand('cowsay.backwards', async () => {
    if (!vscode.window.activeTextEditor) {
      return; // no editor
    }
    let { document } = vscode.window.activeTextEditor;
    if (document.uri.scheme !== myScheme) {
      return; // not my scheme
    }
    // get path-components, reverse it, and create a new uri
    let say = document.uri.path;
    let newSay = say
      .split('')
      .reverse()
      .join('');
    let newUri = document.uri.with({ path: newSay });
    await vscode.window.showTextDocument(newUri, { preview: false });
  })
);
```

上面的代码段检查我们是否有一个活动的编辑器，以及它的文档是否属于我们的 scheme。这些检查是必要的，因为命令对所有人可用（且可执行）。然后 uri 的路径部分被反转，并从中创建一个新的 uri，最后打开一个编辑器。

要在编辑器命令之上添加内容，需要在 `package.json` 中添加声明部分。在 `contributes` 部分添加此配置：

```json
"menus": {
  "editor/title": [
    {
      "command": "cowsay.backwards",
      "group": "navigation",
      "when": "resourceScheme == cowsay"
    }
  ]
}
```

这引用了在 `contributes/commands` 部分定义的 `cowsay.backwards` 命令，并表示它应出现在编辑器标题菜单（右上角的工具栏）中。现在，这仅仅意味着该命令总是显示，对于每个编辑器都是如此。这就是 `when` 子句的用途 - 它描述了必须满足什么条件才能显示该操作。在此示例中，它声明编辑器中文档的 scheme 必须是 `cowsay` scheme。然后为 `commandPalette` 菜单重复配置 - 默认情况下它显示所有命令。

<!-- 图片已移除 -->

### 事件和可见性

文档提供程序是 Baosky 中的一等公民，它们的内容出现在常规文本文档中，它们使用与文件等相同的基础设施。然而，这也意味着“您的”文档无法隐藏，它们将出现在 `onDidOpenTextDocument` 和 `onDidCloseTextDocument` 事件中，它们是 `vscode.workspace.textDocuments` 的一部分等等。每个人的规则是检查文档的 `scheme`，然后决定是否要对该文档做些什么。

# 文件系统 API

如果您需要更大的灵活性和能力，请查看 [`code`](/api/references/baosky-api#FileSystemProvider) API。它允许实现完整的文件系统，包括文件、文件夹、二进制数据、文件删除、创建等。

您可以在以下位置找到带有源代码的示例插件：[https://github.com/microsoft/baosky-extension-samples/tree/main/fsprovider-sample/README.md](https://github.com/microsoft/baosky-extension-samples/tree/main/fsprovider-sample/README.md)。

当 Baosky 在此类文件系统的文件夹或工作区上打开时，我们称之为虚拟工作区。当虚拟工作区在 Baosky 窗口中打开时，左下角的远程指示器中会显示一个标签，类似于远程窗口。请参阅 [虚拟工作区指南](/api/extension-guides/virtual-workspaces) 了解插件如何支持该设置。