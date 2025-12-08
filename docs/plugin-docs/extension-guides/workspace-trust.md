---
# DO NOT TOUCH — Managed by doc writer

ContentId: 31f461b7-c216-414a-b701-78c205fde8a8
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: Baosky 插件更新指南，以支持工作区信任
---

# 工作区信任插件指南

## 什么是工作区信任？

[工作区信任](/docs/editor/workspace-trust) 是一项由用户在 Baosky 中打开工作区时意外代码执行相关的安全风险驱动的功能。例如，考虑到语言插件为了提供功能，可能会执行当前加载的工作区中的代码。在这种情况下，用户应该信任工作区的内容不是恶意的。工作区信任在 Baosky 中集中了这一决策，并支持 [受限模式](/docs/editor/workspace-trust#_restricted-mode) 来防止自动代码执行，这样插件作者就不必自己处理这些基础设施。Baosky 提供了静态声明和 API 支持，以便快速加载插件，而无需在插件之间复制代码。

## 入门

### 静态声明

在您的插件的 `package.json` 中，Baosky 支持以下新的 `capabilities` 属性 `untrustedWorkspaces`：

```typescript
capabilities:
  untrustedWorkspaces:
    { supported: true } |
    { supported: false, description: string } |
    { supported: 'limited', description: string, restrictedConfigurations?: string[] }
```

对于 `supported` 属性，接受以下值：

* `true` - 插件在受限模式下完全受支持，因为它不需要工作区信任来执行任何功能。它将像以前一样启用。
* `false` - 插件在受限模式下不受支持，因为没有工作区信任它无法运行。它将保持禁用状态，直到授予工作区信任。
* `'limited'` - 插件的某些功能在受限模式下受支持。在授予工作区信任之前，应禁用信任敏感的功能。插件可以使用 Baosky API 来隐藏或禁用这些功能。工作区设置可以使用 `restrictedConfigurations` 属性自动通过信任进行控制。

对于 `description` 属性，必须提供关于为何需要信任的描述，以帮助用户了解在授予或拒绝工作区信任之前哪些功能将被禁用或他们应该审查什么。如果 `supported` 设置为 `true`，则忽略此属性。

`description` 属性的值应添加到 `package.nls.json` 中，然后在 `package.json` 文件中引用以支持本地化。

`restrictedConfigurations` 属性接受配置设置 ID 的数组。对于列出的设置，在受限模式下针对不受信任的工作区时，插件将不会获得工作区定义的值。

## 如何支持受限模式？

为了帮助插件作者了解工作区信任的范围以及哪些类型的功能在受限模式下是安全的，这里有一些需要考虑的问题列表。

### 我的插件有主入口点吗？

如果插件没有 `main` 入口点（例如主题和语言语法），则该插件不需要工作区信任。插件作者无需对此类插件采取任何操作，因为无论工作区是否受信任，它们都将继续运行。

### 我的插件是否依赖打开的工作区中的文件来提供功能？

这可能意味着可以由工作区设置的设置或工作区中的实际代码。如果插件从不使用工作区的任何内容，它可能不需要信任。否则，请查看其他问题。

### 我的插件是否将工作区的任何内容视为代码？

最常见的例子是使用项目的依赖项，例如存储在本地工作区中的 Node.js 模块。恶意工作区可能会签入模块的受损版本。因此，这对用户和插件都是安全风险。此外，插件可能依赖于控制插件或其他模块行为的 JavaScript 或其他配置文件。还有许多其他示例，例如执行打开的代码文件以确定其输出以进行错误报告。

### 我的插件是否使用可以在工作区中定义的决定代码执行的设置？

您的插件可能会将设置值作为标志用于插件执行的 CLI。如果这些设置被恶意工作区覆盖，它们可以用作针对您的插件的攻击向量。另一方面，如果设置的值仅用于检测某些条件，那么它可能不是安全风险，并且不需要工作区信任。例如，插件可能会检查首选 shell 设置的值是 `bash` 还是 `pwsh`，以确定要显示的文档。下面的 [配置（设置）](#configurations-settings) 部分提供了有关设置的指南，以帮助您找到插件的最佳配置。

这并不是可能需要工作区信任的所有情况的详尽列表。随着我们要审查更多插件，我们将更新此列表。在考虑工作区信任时，请使用此列表来思考您的插件可能正在执行的类似行为。

### 如果我不更改我的插件会怎样？

如上所述，对其 `package.json` 没有任何贡献的插件将被视为不支持工作区信任。当工作区处于受限模式时，它将被禁用，并且用户将收到通知，指出由于工作区信任，某些插件无法工作。这种措施是对用户最具有安全意识的方法。即使这是默认设置，最佳实践也是设置适当的值，表明作为插件作者，您已努力保护用户和您的插件免受恶意工作区内容的侵害。

## 工作区信任 API

如上所述，使用 API 的第一步是将静态声明添加到您的 `package.json`。最简单的入门方法是对 `supported` 属性使用 `false` 值。再一次，即使您什么都不做，这也是默认行为，但这是一个向用户发出的良好信号，表明您做出了深思熟虑的选择。在这种情况下，您的插件不需要做任何其他事情。直到给予信任，它才会被激活，然后您的插件将知道它是在用户同意的情况下执行的。但是，如果您的插件仅部分功能需要信任，这可能不是最佳选择。

对于希望基于工作区信任控制其功能的插件，它们应该对 `supported` 属性使用 `'limited'` 值，并且 Baosky 提供以下 API：

```typescript
export namespace workspace {
  / **
    * When true, the user has explicitly trusted the contents of the workspace.
    */
  export const isTrusted: boolean;

  / **
    * Event that fires when the current workspace has been trusted.
    */
  export const onDidGrantWorkspaceTrust: Event<void>;
}
```

使用 `isTrusted` 属性来确定当前工作区是否受信任，并使用 `onDidGrantWorkspaceTrust` 事件来监听何时授予工作区信任。一旦工作区受到信任，您就可以使用此 API 阻止特定的代码路径并执行任何必要的注册。

Baosky 还公开了一个上下文键 `isWorkspaceTrusted`，用于在 `when` 子句中使用，如下所述。

## 贡献点

### 命令、视图或其他 UI

当用户未信任工作区时，他们将在受限模式下操作，功能有限，主要面向浏览代码。您在受限模式下禁用的任何功能都应对用户隐藏。这可以通过 [when 子句上下文](/api/references/when-clause-contexts) 和上下文键 `isWorkspaceTrusted` 来完成。即使命令未在 UI 中显示，仍然可以调用该命令，因此您应该阻止执行或根据插件代码中的上述 API 不注册命令。

### 配置（设置）

首先，您应该检查您的设置以确定它们是否需要考虑信任。如上所述，工作区可能会为您插件使用的设置定义一个对使用来说是恶意的值。如果您发现易受攻击的设置，则应对 `supported` 属性使用 `'limited'`，并在 `restrictedConfigurations` 数组中列出设置 ID。

当您将设置 ID 添加到 `restrictedConfigurations` 数组时，Baosky 将仅返回受限模式下用户定义的设置值。您的插件随后无需进行任何其他代码更改来处理设置。当授予信任时，除了工作区信任事件之外，还会触发配置更改事件。

### 调试插件

Baosky 将阻止在受限模式下进行调试。因此，调试插件通常不需要要求信任，并且应该为 `supported` 属性选择 `true`。但是，如果您的插件提供不属于内置调试流程的附加功能、命令或设置，则应使用 `'limited'` 并遵循上述指南。

### 任务提供程序

与调试类似，Baosky 阻止在受限模式下运行任务。如果您的插件提供不属于内置任务流程的附加功能、命令或设置，则应使用 `'limited'` 并遵循上述指南。否则，您可以指定 `supported: true`。

## 测试工作区信任

有关启用和配置工作区信任的详细信息，请参阅 [工作区信任用户指南](/docs/editor/workspace-trust)。