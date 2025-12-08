---
# DO NOT TOUCH — Managed by doc writer

ContentId: 79996489-8D16-4C0A-8BE8-FF4B1E9C223A
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: A guide illustrating how to use Source Control API.
---

# 源代码管理 API

源代码管理 API 允许插件作者定义源代码管理（SCM）功能。这是一个精简但强大的 API 界面，允许许多不同的 SCM 系统集成到 Baosky 中，同时为所有系统提供通用的用户界面。

<!-- 图片已移除 -->

Baosky 本身附带一个源代码管理提供程序，即 Git 插件，它是此 API 的最佳参考，如果您想贡献自己的 SCM 提供程序，这是[一个很好的起点](https://github.com/microsoft/baosky/blob/main/插件/git/src/repository.ts)。市场中还有其他很好的示例，例如 [SVN 插件](#)。

本文档将帮助您构建一个可以使任何 SCM 系统与 Baosky 配合工作的插件。

> ** 注意： ** 您始终可以在我们的文档中参考 [`code` 命名空间 API 参考](/api/references/baosky-api#scm)。

## 源代码管理模型

`SourceControl` 是负责使用 ** 资源状态 ** （`SourceControlResourceState` 的实例）填充源代码管理模型的实体。资源状态本身组织在 ** 组 ** 中，即 `SourceControlResourceGroup` 的实例。

您可以使用 `vscode.scm.createSourceControl` 创建新的 SourceControl。

为了更好地理解这三个实体之间的关系，让我们以 [Git](https://github.com/microsoft/baosky/tree/main/插件/git) 为例。考虑以下 `git status` 的输出：

```bash
vsce main* → git status
On branch main
Your branch is up-to-date with 'origin/main'.
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        modified:   README.md
        renamed:    src/api.ts -> src/test/api.ts

Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        deleted:    .travis.yml
        modified:   README.md
```

此工作区中发生了许多事情。首先，`README.md` 文件已被修改、暂存，然后再次修改。其次，`src/api.ts` 文件已移动到 `src/test/api.ts`，该移动已暂存。最后，`.travis.yml` 文件已被删除。

对于此工作区，Git 定义了两个资源组： ** 工作树 ** 和 ** 索引 ** 。该组内的每个 ** 文件更改 ** 都是 ** 资源状态 ** ：

- ** Index ** - 资源组
  - `README.md`，已修改 - 资源状态
  - `src/test/api.ts`，从 `src/api.ts` 重命名 - 资源状态
- ** Working Tree ** - 资源组
  - `.travis.yml`，已删除 - 资源状态
  - `README.md`，已修改 - 资源状态

注意同一个文件 `README.md` 如何成为两个不同资源状态的一部分。

以下是 Git 如何创建此模型的：

```ts
function createResourceUri(relativePath: string): vscode.Uri {
  const absolutePath = path.join(vscode.workspace.rootPath, relativePath);
  return vscode.Uri.file(absolutePath);
}

const gitSCM = vscode.scm.createSourceControl('git', 'Git');

const index = gitSCM.createResourceGroup('index', 'Index');
index.resourceStates = [
  { resourceUri: createResourceUri('README.md') },
  { resourceUri: createResourceUri('src/test/api.ts') }
];

const workingTree = gitSCM.createResourceGroup('workingTree', 'Changes');
workingTree.resourceStates = [
  { resourceUri: createResourceUri('.travis.yml') },
  { resourceUri: createResourceUri('README.md') }
];
```

对源代码管理和资源组所做的更改将传播到源代码管理视图。

## 源代码管理视图

随着源代码管理模型的变化，Baosky 能够填充源代码管理视图。资源状态可使用 `SourceControlResourceDecorations` 自定义：

```ts
export interface SourceControlResourceState {
  readonly decorations?: SourceControlResourceDecorations;
}
```

上面的示例足以在源代码管理视图中填充一个简单列表，但用户可能希望对每个资源执行许多交互操作。例如，当用户单击资源状态时会发生什么？资源状态可以选择性地提供一个命令来处理此操作：

```ts
export interface SourceControlResourceState {
  readonly command?: Command;
}
```

### 菜单

有六个源代码管理菜单 ID，您可以在其中放置菜单项，以便为用户提供更丰富的用户界面。

`scm/title` 菜单位于 SCM 视图标题的右侧。`navigation` 组中的菜单项将以内联方式显示，而所有其他菜单项将在 `…` 下拉菜单中。

以下三个类似：

- `scm/resourceGroup/context` 向 [`code`](/api/references/contribution-points#contributes.menus) 项添加命令。
- `scm/resourceState/context` 向 [`code`](/api/references/contribution-points#contributes.menus) 项添加命令。
- `scm/resourceFolder/context` 向当 [`code`](/api/references/contribution-points#contributes.menus) 的 resourceUri 路径包含文件夹且用户选择了树视图而非列表视图模式时出现的中间文件夹添加命令。

将菜单项放在 `inline` 组中以使其内联显示。所有其他菜单项组将在上下文菜单中表示，通常可通过鼠标右键单击访问。

注意 SCM 视图支持多选，因此命令接收的参数是一个或多个资源的数组。

例如, Git supports staging multiple files by adding the `git.stage` command 要 the `scm/resourceState/context` menu and using such a method declaration:

```ts
stage(...resourceStates: SourceControlResourceState[]): Promise<void>;
```

When creating them, `SourceControl` and `SourceControlResourceGroup` instances require you 要 provide an `id` string. These values will be populated in the `scmProvider` and `scmResourceGroup` context keys, respectively. 您可以 rely on these [context keys](/api/references/when-clause-contexts) in the `when` clauses of your menu items. Here's how Git is able 要 show an inline menu item for its `git.stage` command:

```json
{
  "command": "git.stage",
  "when": "scmProvider == git && scmResourceGroup == merge",
  "group": "inline"
}
```

The `scm/repository` menu is the menu on each `SourceControl` instance in the ** Source Control Repositories ** view. Place menu items in the `inline` group 要 have them appear inline. All other menu item groups will be shown in the `...` menu. The `inline` group is rendered given the available space and menu items that do not fit are automatically moved into the `...` menu.

The `scm/sourceControl` menu is the context menu on each `SourceControl` instance in the ** Source Control Repositories ** view:

<!-- 图片已移除 -->

The `scm/change/title` allows you 要 contribute commands 要 the title bar of the [Quick Diff](/api/references/baosky-api#QuickDiffProvider) inline diff editor, described [further ahead](#quick-diff). The command will be passed as arguments the URI of the document, the array of changes within it, and the index of the change which the inline change diff editor is currently focused on. 例如, here's the declaration of the `stageChange` Git command which is contributed 要 this menu with a `when` clause testing that the `originalResourceScheme` [context key](/api/references/when-clause-contexts) equals `git`:

```ts
async stageChange(uri: Uri, changes: LineChange[], index: number): Promise<void>;
```

### SCM Input Box

The Source Control Input Box, located atop of each Source Control view, allows the user 要 input a message. 您可以 get (and set) this message in order 要 perform operations. In Git, 例如, this is used as the commit box, in which users type in commit messages and `git commit` commands pick them up.

```ts
export interface SourceControlInputBox {
  value: string;
}

export interface SourceControl {
  readonly inputBox: SourceControlInputBox;
}
```

The user can type <kbd>Ctrl+Enter</kbd> (or <kbd>Cmd+Enter</kbd> on macOS) 要 accept any message. 您可以 handle this event by providing a `acceptInputCommand` 要 your `SourceControl` instance.

```ts
export interface SourceControl {
  readonly acceptInputCommand?: Command;
}
```

## Quick Diff

Baosky also supports displaying ** quick diff ** editor gutter decorations. Clicking those decorations will reveal an inline diff experience, 要 which 您可以 contribute contextual commands:

<!-- 图片已移除 -->

These decorations are computed by Baosky itself. All you need 要 do is provide Baosky with the original contents of any given file.

```ts
export interface SourceControl {
  quickDiffProvider?: QuickDiffProvider;
}
```

Using a `QuickDiffProvider`'s `provideOriginalResource` method, your implementation is able 要 tell Baosky the `Uri` of the original resource that matches the resource whose `Uri` is provided as an argument 要 the method.

Combine this API with the [`code` method in the `code` namespace](/api/references/baosky-api#workspace), which lets you provide contents for arbitrary resources, given a [`code`](/api/references/baosky-api#Uri) matching the custom `scheme` that it registered for.

## 下一步

要 了解更多 about Baosky extensibility model, try these topics:

- [SCM API 参考](/api/references/baosky-api#scm) - Read the full SCM API documentation
- [Git 插件](https://github.com/microsoft/baosky/tree/main/插件/git) - Learn by reading the Git 插件 implementation
- [插件 API 概述](/api) - Learn about the full Baosky extensibility model.
- [插件 Manifest File](/api/references/插件-manifest) - Baosky package.json 插件 manifest file reference
- [Contribution Points](/api/references/contribution-points) - Baosky contribution points reference
