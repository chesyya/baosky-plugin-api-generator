---
# DO NOT TOUCH — Managed by doc writer

ContentId: 6eb86aa4-0f4c-4168-b34a-6ec6b204e960
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: 使用自定义编辑器 API 在 Baosky 中创建可自定义的编辑器。
---

# 自定义编辑器 API

自定义编辑器允许插件创建完全可定制的读/写编辑器，用于代替 Baosky 的标准文本编辑器来处理特定类型的资源。它们有各种各样的用例，例如：

- Previewing assets, such as shaders or 3D models, directly in Baosky.
- 为 Markdown 或 XAML 等语言创建所见即所得编辑器。
- 为数据文件（例如 CSV 或 JSON 或 XML）提供替代视觉呈现。
- 为二进制或文本文件构建完全可定制的编辑体验。

本文档概述了自定义编辑器 API 以及实现自定义编辑器的基础知识。我们将了解两种类型的自定义编辑器及其区别，以及哪一种适合您的用例。然后，对于每种自定义编辑器类型，我们将介绍构建行为良好的自定义编辑器的基础知识。

Although custom editors are a powerful new 插件 point, implementing a basic custom editor is not actually that difficult! Still, if you are working on your first Baosky 插件, you may want 要 consider holding off on diving into custom editors until you are more familiar with the basics of the Baosky API. Custom editors build on a lot of Baosky concepts—such as [webviews](/api/插件-guides/webview) and text documents—so it may be a bit overwhelming if you are learning all of these new ideas at the same time.

但是，如果您已经准备好并正在考虑要构建的所有很酷的自定义编辑器，那么让我们开始吧！请务必下载 [自定义编辑器插件示例][示例]，以便您可以按照文档进行操作并了解自定义编辑器 API 如何组合在一起。

## 链接

- [自定义编辑器示例][示例]

### Baosky API 用法

- [`code`](/api/references/baosky-api#window.registerCustomEditorProvider)
- [`code`](/api/references/baosky-api#CustomTextEditorProvider)

## 自定义编辑器 API 基础知识

自定义编辑器是替代视图，用于替代特定资源的 Baosky 标准文本编辑器。自定义编辑器有两个部分：用户交互的视图和插件用于与底层资源交互的文档模型。

自定义编辑器的视图端是使用 [webview](/api/插件-guides/webview) 实现的。这使您可以使用标准 HTML、CSS 和 JavaScript 构建自定义编辑器的用户界面。 Webviews 无法直接访问 Baosky API，但它们可以通过来回传递消息来与插件对话。请查看我们的[webview documentation](/api/插件-guides/webview)，了解有关网络视图以及使用它们的最佳实践的更多信息。

自定义编辑器的另一部分是文档模型。这个模型是你的插件如何理解它正在使用的资源（文件）的。 `CustomTextEditorProvider` 使用 Baosky 的标准 [TextDocument](/api/references/baosky-api#TextDocument) 作为其文档模型，并且对文件的所有更改都使用 Baosky 的标准文本编辑 API 来表达。另一方面，`CustomReadonlyEditorProvider` 和 `CustomEditorProvider` 允许您提供自己的文档模型，这使它们可用于非文本文件格式。

自定义编辑器的每个资源都有一个文档模型，但该文档可能有多个编辑器实例（视图）。例如，假设您打开一个具有 `CustomTextEditorProvider` 的文件，然后运行 ​​*View: Split editor ** 命令。在这种情况下，仍然只有一个 `TextDocument` ，因为工作区中仍然只有一个资源副本，但现在该资源有两个 Web 视图。

### `CustomEditor` 与 `CustomTextEditor`

自定义编辑器有两类：自定义文本编辑器和自定义编辑器。它们之间的主要区别在于它们如何定义文档模型。

`CustomTextEditorProvider` 使用 Baosky 的标准 [`code`](#) 作为其数据模型。您可以将 `CustomTextEditor` 用于任何基于文本的文件类型。 `CustomTextEditor` 更容易实现，因为 Baosky 已经知道如何处理文本文件，因此可以实现诸如保存和备份文件以进行热退出等操作。

另一方面，使用 `CustomEditorProvider` ，您的插件会带来自己的文档模型。这意味着您可以将 `CustomEditor` 用于图像等二进制格式，但这也意味着您的插件负责更多功能，包括实现保存和支持。如果您的自定义编辑器是只读的，例如用于预览的自定义编辑器，您可以跳过大部分复杂性。

当尝试决定使用哪种类型的自定义编辑器时，决定通常很简单：如果您正在使用基于文本的文件格式，请使用 `CustomTextEditorProvider`，对于二进制文件格式，请使用 `CustomEditorProvider`。

###贡献点

`customEditors` [contribution point](/api/references/contribution-points) 是插件告诉 Baosky 它提供的自定义编辑器的方式。例如，Baosky 需要知道您的自定义编辑器可以使用哪些类型的文件，以及如何在任何 UI 中识别您的自定义编辑器。

以下是 [自定义编辑器插件示例][示例] 的基本 `customEditor` 贡献：

```json
"contributes": {
  "customEditors": [
    {
      "viewType": "catEdit.catScratch",
      "displayName": "Cat Scratch",
      "selector": [
        {
          "filenamePattern": "*.cscratch"
        }
      ],
      "priority": "default"
    }
  ]
}
```

`customEditors` 是一个数组，因此您的插件可以贡献多个自定义编辑器。让我们分解一下自定义编辑器条目本身：

- `viewType` - 自定义编辑器的唯一标识符。

这就是 Baosky 将 `package.json` 中的自定义编辑器贡献与代码中的自定义编辑器实现联系起来的方式。这在所有插件中必须是唯一的，因此不要使用通用的 `viewType` （例如 `"preview"`），而是确保使用您的插件所特有的，例如 `"viewType": "myAmazingExtension.svgPreview"`

- `displayName` - 标识 Baosky UI 中自定义编辑器的名称。

显示名称在 Baosky UI 中向用户显示，例如 ** View: Reopen with ** 下拉列表。

- `selector` - 指定自定义编辑器对哪些文件处于活动状态。

`selector` 是一个包含一个或多个 [glob patterns](/docs/editor/glob-patterns) 的数组。这些 glob 模式与文件名进行匹配，以确定自定义编辑器是否可用于它们。 `filenamePattern`（例如 `*.png`）将为所有 PNG 文件启用自定义编辑器。

您还可以创建与文件或目录名称匹配的更具体的模式，例如 ` ** /translations/*.json`。

- `priority` -（可选）指定何时使用自定义编辑器。

    `priority` controls when a custom editor is used when a resource is open. Possible values are:

- `"default"` - 尝试对与自定义​​编辑器的 `selector` 匹配的每个文件使用自定义编辑器。如果给定文件有多个自定义编辑器，则用户必须选择他们想要使用的自定义编辑器。
- `"option"` - 默认情况下不使用自定义编辑器，但允许用户切换到它或将其配置为默认值。

### 自定义编辑器激活

当用户打开您的自定义编辑器之一时，Baosky 会触发 `onCustomEditor:VIEW_TYPE` 激活事件。在激活期间，您的插件必须调用 `registerCustomEditorProvider` 以使用预期的 `viewType` 注册自定义编辑器。

需要注意的是，只有当 Baosky 需要创建自定义编辑器的实例时，才会调用 `onCustomEditor` 。如果 Baosky 只是向用户显示有关可用自定义编辑器的一些信息（例如使用 ** View: Reopen with ** 命令），则您的插件将不会被激活。

## 自定义文本编辑器

自定义文本编辑器允许您为文本文件创建自定义编辑器。这可以是从纯非结构化文本到 [CSV](https://en.wikipedia.org/wiki/Comma-separated_values) 到 JSON 或 XML 的任何内容。自定义文本编辑器使用 Baosky 的标准 [TextDocument](/api/references/baosky-api#TextDocument) 作为其文档模型。

[自定义编辑器插件示例][示例] 包括一个用于猫草文件的简单示例自定义文本编辑器（只是以 `.cscratch` 文件插件结尾的 JSON 文件）。让我们看一下实现自定义文本编辑器的一些重要部分。

### 自定义文本编辑器生命周期

Baosky 处理自定义文本编辑器的视图组件（webviews）和模型组件（`TextDocument`）的生命周期。当需要创建新的自定义编辑器实例时，Baosky 会调用您的插件，并在用户关闭选项卡时清理编辑器实例和文档模型。

为了了解这一切在实践中是如何工作的，让我们从插件的角度来了解当用户打开自定义文本编辑器以及当用户关闭自定义文本编辑器时会发生什么。

** 打开自定义文本编辑器 **

使用 [自定义编辑器插件示例][示例]，以下是用户首次打开 `.cscratch` 文件时发生的情况：

1. Baosky 触发 `onCustomEditor:catCustoms.catScratch` 激活事件。

如果我们的插件尚未激活，这将激活它。在激活期间，我们的插件必须确保插件通过调用 `registerCustomEditorProvider` 为 `catCustoms.catScratch` 注册 `CustomTextEditorProvider`。

1. Baosky 然后在已注册的 `CustomTextEditorProvider` 上为 `catCustoms.catScratch` 调用 `resolveCustomTextEditor`。

此方法采用正在打开的资源的 `TextDocument` 和 `WebviewPanel`。插件必须填写此 webview 面板的初始 HTML 内容。

一旦 `resolveCustomTextEditor` 返回，我们的自定义编辑器就会显示给用户。 webview 中绘制的内容完全取决于我们的插件。

每次打开自定义编辑器时都会发生相同的流程，即使您拆分了自定义编辑器也是如此。自定义编辑器的每个实例都有自己的 `WebviewPanel`，尽管多个自定义文本编辑器将共享相同的 `TextDocument`（如果它们用于相同的资源）。请记住：将 `TextDocument` 视为资源的模型，而 web 视图面板是该模型的视图。

** 关闭自定义文本编辑器 **

当用户关闭自定义文本编辑器时，Baosky 会在 `WebviewPanel` 上触发 `WebviewPanel.onDidDispose` 事件。此时，您的插件应该清理与该编辑器关联的所有资源（事件订阅、文件观察器等）

当给定资源的最后一个自定义编辑器关闭时，如果没有其他编辑器使用它并且没有其他插件保留它，则该资源的 `TextDocument` 也将被释放。您可以检查 `TextDocument.isClosed` 属性以查看 `TextDocument` 是否已关闭。关闭 `TextDocument` 后，使用自定义编辑器打开相同的资源将导致打开新的 `TextDocument`。

### 与 TextDocument 同步更改

由于自定义文本编辑器使用 `TextDocument` 作为其文档模型，因此它们负责在自定义编辑器中发生编辑时更新 `TextDocument` ，并在 `TextDocument` 更改时更新自身。

** 从网页视图到`TextDocument` **

自定义文本编辑器中的编辑可以采取多种不同的形式——单击按钮、更改一些文本、拖动一些项目。每当用户在自定义文本编辑器中编辑文件本身时，插件必须更新 `TextDocument`。以下是猫抓痕插件的实现方式：

1. 用户单击 Web 视图中的 ** 添加暂存 ** 按钮。这个 [posts a message](/api/插件-guides/webview#scripts-and-message-passing) 从 webview 回到插件。

1.插件接收消息。然后，它更新文档的内部模型（在猫抓示例中仅包含向 JSON 添加新条目）。

1.插件创建一个 `WorkspaceEdit` ，将更新后的 JSON 写入文档。此编辑是使用 `vscode.工作区.applyEdit` 应用的。

尝试将工作区编辑保持在更新文档所需的最小更改范围内。另请记住，如果您使用的是 JSON 这样的语言，您的插件应尝试遵守用户现有的格式约定（空格与制表符、缩进大小等）。

** 从 `TextDocument` 到网页视图 **

当 `TextDocument` 更改时，您的插件还需要确保其 Web 视图反映文档的新状态。文本文档可以通过用户操作进行更改，例如撤消、重做或恢复文件；通过使用 `WorkspaceEdit` 的其他插件；或者由在 Baosky 的默认文本编辑器中打开文件的用户执行。以下是猫抓痕插件的实现方式：

1. 在插件中，我们订阅 `vscode.工作区.onDidChangeTextDocument` 事件。对 `TextDocument` 的每次更改都会触发此事件（包括我们的自定义编辑器所做的更改！）

1. 当我们有编辑器的文档发生更改时，我们会向 webview 发布一条消息及其新文档状态。然后，该 Web 视图会更新自身以呈现更新后的文档。

请务必记住，自定义编辑器触发的任何文件编辑都会导致 `onDidChangeTextDocument` 触发。确保您的插件不会进入更新循环，即用户在 webview 中进行编辑，从而触发 `onDidChangeTextDocument`，从而导致 webview 更新，从而导致 webview 触发插件上的另一个更新，从而触发 `onDidChangeTextDocument`，依此类推。

另请记住，如果您使用结构化语言（例如 JSON 或 XML），则文档可能并不总是处于有效状态。您的插件必须能够优雅地处理错误或向用户显示错误消息，以便他们了解问题所在以及如何修复它。

最后，如果更新您的网络视图的成本很高，请考虑[debouncing](https://davidwalsh.name/javascript-debounce-function)更新您的网络视图。

## 自定义编辑器

`CustomEditorProvider` 和 `CustomReadonlyEditorProvider` 允许您为二进制文件格式创建自定义编辑器。这个 API 使您可以完全控制如何向用户显示文件、如何对其进行编辑，并让您的插件挂钩到 `save` 和其他文件操作。同样，如果您正在为基于文本的文件格式构建编辑器，请强烈考虑使用 [`code`](#custom-text-editor) 来代替，因为它们实现起来要简单得多。

[自定义编辑器插件示例][示例] 包括一个用于 paw 绘制文件的简单示例自定义二进制编辑器（这些文件只是以 `.pawdraw` 文件插件结尾的 jpeg 文件）。让我们看一下为二进制文件构建自定义编辑器的过程。

### 自定义文档

使用自定义编辑器，您的插件负责使用 `CustomDocument` 接口实现自己的文档模型。这使得您的插件可以自由地在 `CustomDocument` 上存储所需的任何数据，以便与自定义编辑器交互，但这也意味着您的插件必须实现基本的文档操作，例如保存和备份文件数据以进行热退出。

每个打开的文件都有一个 `CustomDocument`。用户可以为单个资源打开多个编辑器（例如通过拆分当前自定义编辑器），但所有这些编辑器都将由相同的 `CustomDocument` 支持。

### 自定义编辑器生命周期

** 支持每个文档多个编辑器 **

默认情况下，Baosky 只允许每个自定义文档有一个编辑器。此限制使正确实现自定义编辑器变得更加容易，因为您不必担心多个自定义编辑器实例彼此同步。

但是，如果您的插件可以支持它，我们建议在注册自定义编辑器时设置 `supportsMultipleEditorsPerDocument: true` ，以便可以为同一文档打开多个编辑器实例。这将使您的自定义编辑器的行为更像 Baosky 的普通文本编辑器。

** 打开自定义编辑器 **
当用户打开与 `customEditor` 贡献点匹配的文件时，Baosky 会触发 `onCustomEditor` [activation event](/api/references/activation-events)，然后调用为所提供的视图类型注册的提供程序。 `CustomEditorProvider` 有两个作用：为自定义编辑器提供文档，然后提供编辑器本身。以下是[自定义编辑器插件示例][示例]中 `catCustoms.pawDraw` 编辑器发生的情况的有序列表：

1. Baosky 触发 `onCustomEditor:catCustoms.pawDraw` 激活事件。

如果我们的插件尚未激活，这将激活它。我们还必须确保我们的插件在激活期间为 `catCustoms.pawDraw` 注册 `CustomReadonlyEditorProvider` 或 `CustomEditorProvider` 。

1. Baosky 在为 `catCustoms.pawDraw` 编辑器注册的 `CustomReadonlyEditorProvider` 或 `CustomEditorProvider` 上调用 `openCustomDocument`。

这里我们的插件被赋予了一个资源 uri，并且必须为该资源返回一个新的 `CustomDocument` 。这是我们的插件应该为该资源创建其文档内部模型的点。这可能涉及从磁盘读取和解析初始资源状态或初始化我们的新 `CustomDocument`。

我们的插件可以通过创建一个实现 `CustomDocument` 的新类来定义此模型。请记住，这个初始化阶段完全取决于插件； Baosky 不关心 `CustomDocument` 上存储的任何附加信息插件。

1. Baosky 使用步骤 2 中的 `CustomDocument` 和新的 `WebviewPanel` 调用 `resolveCustomEditor`。

这里我们的插件必须填写自定义编辑器的初始 html。如果需要，我们还可以保留对 `WebviewPanel` 的引用，以便稍后可以引用它，例如在命令内。

一旦 `resolveCustomEditor` 返回，我们的自定义编辑器就会显示给用户。

如果用户使用我们的自定义编辑器在另一个编辑器组中打开相同的资源（例如通过拆分第一个编辑器），插件的工作就会得到简化。在这种情况下，Baosky 只是使用我们在打开第一个编辑器时创建的相同 `CustomDocument` 来调用 `resolveCustomEditor` 。

** 关闭自定义编辑器 **

假设我们为同一资源打开了两个自定义编辑器实例。当用户关闭这些编辑器时，Baosky 会向我们的插件发出信号，以便它可以清理与编辑器关联的任何资源。

当第一个编辑器实例关闭时，Baosky 从关闭的编辑器中触发 `WebviewPanel` 上的 `WebviewPanel.onDidDispose` 事件。此时，我们的插件必须清理与该特定编辑器实例关联的所有资源。

当第二个编辑器关闭时，Baosky 再次触发 `WebviewPanel.onDidDispose`。但是现在我们还关闭了与 `CustomDocument` 相关的所有编辑器。当 `CustomDocument` 不再有编辑器时，Baosky 会调用 `CustomDocument.dispose` 。我们的插件的 `dispose` 实现必须清理与文档关联的所有资源。

如果用户随后使用我们的自定义编辑器重新打开相同的资源，我们将使用新的 `CustomDocument` 返回整个 `openCustomDocument`、`resolveCustomEditor` 流程。

### 只读自定义编辑器

以下许多部分仅适用于支持编辑的自定义编辑器，虽然听起来可能很矛盾，但许多自定义编辑器根本不需要编辑功能。例如，考虑图像预览。或者内存转储的视觉呈现。两者都可以使用自定义编辑器来实现，但都不需要可编辑。这就是 `CustomReadonlyEditorProvider` 发挥作用的地方。

`CustomReadonlyEditorProvider` 允许您创建不支持编辑的自定义编辑器。它们仍然可以交互，但不支持撤消和保存等操作。与完全可编辑的编辑器相比，实现只读自定义编辑器也要简单得多。

### 可编辑自定义编辑器基础知识

可编辑的自定义编辑器可让您连接到标准 Baosky 操作，例如撤消和重做、保存和热退出。这使得可编辑自定义编辑器非常强大，但也意味着正确实现编辑器比实现可编辑自定义文本编辑器或只读自定义编辑器复杂得多。

可编辑的自定义编辑器由 `CustomEditorProvider` 实现。该接口扩展了 `CustomReadonlyEditorProvider`，因此您必须实现 `openCustomDocument` 和 `resolveCustomEditor` 等基本操作，以及一组特定于编辑的操作。我们来看看`CustomEditorProvider`的编辑具体部分。

** 编辑 **

对可编辑自定义文档的更改通过编辑来表达。编辑可以是任何内容，从文本更改、图像旋转到列表重新排序。 Baosky 将编辑的具体操作完全取决于您的插件，但 Baosky 确实需要知道编辑何时发生。编辑是 Baosky 将文档标记为脏的方式，从而启用自动保存和备份。

每当用户在自定义编辑器的任何 Web 视图中进行编辑时，您的插件都必须从其 `CustomEditorProvider` 触发 `onDidChangeCustomDocument` 事件。 `onDidChangeCustomDocument` 事件可以触发两种事件类型，具体取决于您的自定义编辑器实现：`CustomDocumentContentChangeEvent` 和 `CustomDocumentEditEvent`。

** CustomDocumentContentChangeEvent **

`CustomDocumentContentChangeEvent` 是一个简单的编辑。它唯一的功能是告诉Baosky文档已被编辑。

当插件从 `onDidChangeCustomDocument` 触发 `CustomDocumentContentChangeEvent` 时，Baosky 会将关联文档标记为脏文档。此时，使文档变得不脏的唯一方法是用户保存或恢复它。使用 `CustomDocumentContentChangeEvent` 的自定义编辑器不支持撤消/重做。

** 自定义文档编辑事件 **

`CustomDocumentEditEvent` 是一个更复杂的编辑，允许撤消/重做。您应该始终尝试使用 `CustomDocumentEditEvent` 来实现自定义编辑器，并且只有在无法实现撤消/重做时才回退到使用 `CustomDocumentContentChangeEvent` 。

`CustomDocumentEditEvent` 具有以下字段：

- `document` — 编辑所针对的 `CustomDocument`。
- `label` — 描述编辑类型的可选文本（例如：“裁剪”、“插入”...）
- `undo` — Function invoked by Baosky when the edit needs 要 be undone.
- `redo` — 当需要重做编辑时由 Baosky 调用的函数。

当插件从 `onDidChangeCustomDocument` 触发 `CustomDocumentEditEvent` 时，Baosky 将关联文档标记为脏文档。为了使文档不再脏，用户可以保存或恢复文档，或者撤消/重做回到文档上次保存的状态。

当需要撤消或重新应用特定编辑时，编辑器上的 `undo` 和 `redo` 方法由 Baosky 调用。 Baosky 维护一个内部编辑堆栈，因此如果您的插件通过三个编辑触发 `onDidChangeCustomDocument`，我们称它们为 `a`、`b`、`c`：

```ts
onDidChangeCustomDocument(a);
onDidChangeCustomDocument(b);
onDidChangeCustomDocument(c);
```

以下用户操作序列会导致这些调用：

```
undo — c.undo()
undo — b.undo()
redo — b.redo()
redo — c.redo()
redo — no op, no more edits
```

要实现撤消/重做，您的插件必须更新其关联的自定义文档的内部状态，并更新文档的所有关联的 Web 视图，以便它们反映文档的新状态。请记住，单个资源可能有多个 Web 视图。这些必须始终显示相同的文档数据。例如，图像编辑器的多个实例必须始终显示相同的像素数据，但可以允许每个编辑器实例拥有自己的缩放级别和 UI 状态。

### 保存

当用户保存自定义编辑器时，您的插件负责将当前状态下保存的资源写入磁盘。您的自定义编辑器如何执行此操作很大程度上取决于您的插件的 `CustomDocument` 类型以及您的插件如何在内部跟踪编辑。

保存的第一步是将数据流写入磁盘。常见的方法包括：

- 跟踪资源的状态，以便可以快速序列化。

例如，基本图像编辑器可以维护像素数据的缓冲区。

- 自上次保存以来重播编辑以生成新文件。

例如，更高效的图像编辑器可能会跟踪自上次保存以来的编辑，例如 `crop`、`rotate`、`scale`。保存时，它会将这些编辑应用到文件上次保存的状态以生成新文件。

- 向 `WebviewPanel` 询问要保存的文件数据的自定义编辑器。

请记住，即使自定义编辑器不可见，也可以保存它们。因此，建议您的插件的 `save` 实现不依赖于 `WebviewPanel`。如果这是不可能的，您可以使用 `WebviewPanelOptions.retainContextWhenHidden` 设置，以便 web 视图即使在隐藏时也保持活动状态。 `retainContextWhenHidden` 确实有很大的内存开销，所以使用它时要保守。

获取资源数据后，通常应该使用 [工作区 FS API](#) 将其写入磁盘。 FS API 接受 `UInt8Array` 数据，并且可以写出基于二进制和文本的文件。对于二进制文件数据，只需将二进制数据放入`UInt8Array`即可。对于文本文件数据，使用 `Buffer` 将字符串转换为 `UInt8Array`：

```ts
const writeData = Buffer.from("my text data", 'utf8');
vscode.workspace.fs.writeFile(fileUri, writeData);
```

## 后续步骤

如果您想了解有关 Baosky 可扩展性的更多信息，请尝试以下主题：

- [插件 API](/api) - 了解完整的 Baosky 插件 API。
- [插件 Capabilities](/api/插件-capabilities/overview) - 查看扩展 Baosky 的其他方法。

[示例]：https://github.com/microsoft/baosky-插件-samples/tree/main/custom-editor-sample
