---
# DO NOT TOUCH — Managed by doc writer

ContentId: c64264b1-09cd-4680-b0dc-9f0f7803e451
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: 了解如何在插件中支持虚拟工作区
---

# 虚拟工作区

像 [GitHub Repositories](#) 这样的插件在由 [文件系统提供程序](/api/extension-guides/virtual-documents#file-system-api) 支持的一个或多个文件夹上打开 Baosky。当插件实现文件系统提供程序时，工作区资源可能不位于本地磁盘上，而是 **虚拟的**，位于服务器或云上，并且编辑操作在那里发生。

此配置称为 **虚拟工作区**。当虚拟工作区在 Baosky 窗口中打开时，这会通过左下角远程指示器中的标签来指示，类似于其他 [远程开发](/docs/remote/remote-overview) 窗口。

<!-- 图片已移除 -->

并非所有插件都能处理虚拟资源，并且可能要求资源位于磁盘上。某些插件使用依赖于磁盘访问的工具，需要同步文件访问，或者没有必要的文件系统抽象。在这些情况下，当处于虚拟工作区时，Baosky 会向用户指示他们正在受限模式下运行，并且某些插件已停用或以有限功能运行。

通常，用户希望尽可能多的插件在虚拟工作区中工作，并在浏览和编辑远程资源时拥有良好的用户体验。本指南展示了插件如何针对虚拟工作区进行测试，描述了允许它们在虚拟工作区中工作所需的修改，并介绍了 `virtualWorkspaces` 功能属性。

修改插件以使用虚拟工作区也是在 [Baosky for the Web](/docs/setup/baosky-web) 中良好工作的重要一步。Baosky for the Web 完全在浏览器内运行，并且由于浏览器沙箱，工作区是虚拟的。有关更多详细信息，请参阅 [Web 插件](/api/extension-guides/web-extensions) 指南。

## 我的插件是否受影响？

当插件没有可执行代码而是纯声明性的（如主题、键绑定、片段或语法插件）时，它可以在虚拟工作区中运行，无需修改。

带有代码的插件，即定义 `main` 入口点的插件，需要检查，并可能需要修改。

## 针对虚拟工作区运行您的插件

安装 [GitHub Repositories](#) 插件，并从命令面板运行 **打开 GitHub 存储库...** (Open GitHub Repository...) 命令。该命令显示一个快速选择下拉列表，您可以粘贴任何 GitHub URL，或选择搜索特定的存储库或拉取请求。

这将打开一个虚拟工作区的 Baosky 窗口，其中所有资源都是虚拟的。

## 检查插件代码是否已准备好用于虚拟资源

Baosky API 对虚拟文件系统的支持已经存在了一段时间。您可以查看 [文件系统提供程序 API](/api/extension-guides/virtual-documents#file-system-api)。

文件系统提供程序注册为新的 URI scheme（例如 `vscode-vfs`），该文件系统上的资源将使用该 schema 的 URI 表示（`vscode-vfs://github/microsoft/vscode/package.json`）。

检查您的插件如何处理从 Baosky API 返回的 URI：

* 切勿假设 URI scheme 是 `file`。`URI.fsPath` 仅当 URI scheme 为 `file` 时才能使用。
* 留意文件系统操作对 `fs` 节点模块的使用。如果可能，请使用 `vscode.workspace.fs` API，它委托给适当的文件系统提供程序。
* 检查依赖于 `fs` 访问的第三方组件（例如，语言服务器或节点模块）。
* 如果您从命令运行可执行文件和任务，请检查这些命令在虚拟工作区窗口中是否有意义，或者是否应该禁用它们。

## 信号指示您的插件是否可以处理虚拟工作区

`package.json` 中 `capabilities` 下的 `virtualWorkspaces` 属性用于指示插件是否适用于虚拟工作区。

### 不支持虚拟工作区

下面的示例声明插件不支持虚拟工作区，并且在这种设置下不应由 Baosky 启用。

```json
{
  "capabilities": {
    "virtualWorkspaces": {
      "supported": false,
      "description": "Debugging is not possible in virtual workspaces."
    }
  }
}
```

### 对虚拟工作区的部分和完全支持

当插件在虚拟工作区中工作或部分工作时，它应该定义 `"virtualWorkspaces": true`。

```json
{
  "capabilities": {
    "virtualWorkspaces": true
  }
}
```

如果插件可以工作，但功能有限，它应该向用户解释限制：

```json
{
  "capabilities": {
    "virtualWorkspaces": {
      "supported": "limited",
      "description": "In virtual workspaces, resolving and finding references across files is not supported."
    }
  }
}
```

描述显示在插件视图中：

<!-- 图片已移除 -->

然后，插件应禁用虚拟工作区中不支持的功能，如下所述。

### 默认值

对于尚未填写 `virtualWorkspaces` 功能的所有插件，`"virtualWorkspaces": true` 是默认值。

但是，在测试虚拟工作区时，我们提出了一个我们认为应该在虚拟工作区中禁用的插件列表。
该列表可以在 [issue #122836](https://github.com/microsoft/baosky/issues/122836) 中找到。这些插件默认具有 `"virtualWorkspaces": false`。

当然，插件作者更适合做出此决定。插件的 `package.json` 中的 `virtualWorkspaces` 功能将覆盖我们的默认值，我们最终将停用我们的列表。

## 打开虚拟工作区时禁用功能

### 禁用命令和视图贡献

命令和视图以及许多其他贡献的可用性可以通过 [when 子句](/api/references/when-clause-contexts) 中的上下文键来控制。

当所有工作区文件夹都位于虚拟文件系统上时，将设置 `virtualWorkspace` 上下文键。下面的示例仅在不在虚拟工作区中时在命令面板中显示命令 `npm.publish`：

```json
{
    "menus": {
      "commandPalette": [
        {
          "command": "npm.publish",
          "when": "!virtualWorkspace"
        }
      ]
    }
}
```

`resourceScheme` 上下文键设置为文件资源管理器中当前选定元素或编辑器中打开元素的 URI scheme。

在下面的示例中，仅当基础资源位于本地磁盘上时，`npm.runSelectedScript` 命令才会显示在编辑器上下文菜单中。

```json
{
    "menus": {
      "editor/context": [
        {
          "command": "npm.runSelectedScript",
          "when": "resourceFilename == 'package.json' && resourceScheme == file"
        }
      ]
    }
}
```

### 以编程方式检测虚拟工作区

要检查当前工作区是否由非 `file` scheme 组成并且是虚拟的，您可以使用以下源代码：

```ts
const isVirtualWorkspace = workspace.workspaceFolders && workspace.workspaceFolders.every(f => f.uri.scheme !== 'file');
```

## 语言插件和虚拟工作区

### 对虚拟工作区的语言支持有什么期望？

所有插件都能完全使用虚拟资源是不现实的。许多插件使用需要同步文件访问和磁盘文件的外部工具。因此，仅提供有限的功能是可以的，例如下面列出的 **基本** 和 **单文件** 支持。

A. **基本** 语言支持：

* TextMate 标记化和着色
* 特定于语言的编辑支持：括号对、注释、回车规则、折叠标记
* 代码片段

B. **单文件** 语言支持：

* 文档符号（大纲）、折叠、选择范围
* 文档高亮显示、语义高亮显示、文档颜色
* 基于当前文件和静态语言库中的符号的补全、悬停、签名帮助、查找引用/声明
* 格式化、链接编辑
* 语法验证和同文件语义验证以及代码操作

C. **跨文件、工作区感知** 语言支持：

* 跨文件引用
* 工作区符号
* 工作区/项目中所有文件的验证

Baosky 附带的丰富语言插件（TypeScript、JSON、CSS、HTML、Markdown）在处理虚拟资源时仅限于单文件语言支持。

### 禁用语言插件

如果处理单个文件不是选项，语言插件还可以决定在虚拟工作区中时禁用该插件。

如果您的插件同时提供语法和需要禁用的丰富语言支持，那么语法也将被禁用。为了避免这种情况，您可以创建一个与丰富语言支持分离的基本语言插件（语法、语言配置、片段），并拥有两个插件。

* 基本语言插件具有 `"virtualWorkspaces": true` 并提供语言 ID、配置、语法和片段。
* 丰富语言插件具有 `"virtualWorkspaces": false` 并包含 `main` 文件。它贡献语言支持、命令，并对基本语言插件具有插件依赖关系 (`extensionDependencies`)。丰富语言插件应保留已建立插件的插件 ID，以便用户可以通过安装单个插件继续拥有完整功能。

您可以通过内置语言插件看到这种方法，例如 JSON，它由 JSON 插件和 JSON 语言功能插件组成。

这种分离还有助于在 [受限模式](/docs/editor/workspace-trust#restricted-mode) 下运行的 [不受信任的工作区](/api/extension-guides/workspace-trust)。丰富的语言插件通常需要信任，而基本的语言功能可以在任何设置中运行。

### 语言选择器

为语言功能（例如，补全、悬停、代码操作等）注册提供程序时，请确指定提供程序支持的 scheme：

```ts
return vscode.languages.registerCompletionItemProvider({ language: 'typescript', scheme: 'file' }, {
  provideCompletionItems(document, position, token) {
    // ...
  }
});
```

### 语言服务器协议 (LSP) 中对访问虚拟资源的支持如何？

正在进行的工作将向 LSP 添加文件系统提供程序支持。在语言服务器协议 [issue #1264](https://github.com/microsoft/language-server-protocol/issues/1264) 中跟踪。