---
# DO NOT TOUCH — Managed by doc writer

ContentId: 9b10cda2-4eb0-4989-8f82-23a46b96c1bb
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: Baosky 插件（plug-in）中使用树视图的指南。
---

# 树视图 API

树视图 API 允许插件在 Baosky 的侧边栏中显示内容。此内容结构化为树，并符合 Baosky [内置视图](/docs/getstarted/userinterface#_views) 的样式。

例如，内置的引用搜索视图插件将引用搜索结果显示为单独的视图。

<!-- 图片已移除 -->

**查找所有引用** 结果显示在 **引用：结果** 树视图中，该视图位于 **引用** 视图容器中。

本指南教您如何编写向 Baosky 贡献树视图和视图容器的插件。

## 树视图 API 基础

为了解释树视图 API，我们将构建一个名为 **Node Dependencies** 的示例插件。此插件将使用树视图显示当前文件夹中的所有 Node.js 依赖项。添加树视图的步骤是在 `package.json` 中贡献树视图，创建 `TreeDataProvider`，并注册 `TreeDataProvider`。您可以在 [baosky-extension-samples](https://github.com/microsoft/baosky-extension-samples/tree/main/tree-view-sample/README.md) GitHub 存储库的 `tree-view-sample` 中找到此示例插件的完整源代码。

### package.json 贡献

首先，您必须让 Baosky 知道您正在贡献一个视图，这是使用 `package.json` 中的 [contributes.views](/api/references/contribution-points#contributes.views) 贡献点来完成的。

这是我们插件第一个版本的 `package.json`：

```json
{
    "name": "custom-view-samples",
    "displayName": "Custom view Samples",
    "description": "Samples for Baosky's view API",
    "version": "0.0.1",
    "publisher": "alexr00",
    "engines": {
        "vscode": "^1.74.0"
    },
    "activationEvents": [],
    "main": "./out/extension.js",
    "contributes": {
        "views": {
            "explorer": [
                {
                    "id": "nodeDependencies",
                    "name": "Node Dependencies"
                }
            ]
        }
    },
    "scripts": {
        "vscode:prepublish": "npm run compile",
        "compile": "tsc -p ./",
        "watch": "tsc -watch -p ./"
    },
    "devDependencies": {
        "@types/node": "^10.12.21",
        "@types/vscode": "^1.42.0",
        "typescript": "^3.5.1",
        "tslint": "^5.12.1"
    }
}
```

> **注意**：如果您的插件针对的是 1.74 之前的 Baosky 版本，则必须在 `activationEvents` 中显式列出 `onView:nodeDependencies`。

您必须为视图指定标识符和名称，并且您可以贡献到以下位置：

- `explorer`: 侧边栏中的资源管理器视图
- `debug`: 侧边栏中的运行和调试视图
- `scm`: 侧边栏中的源代码管理视图
- `test`: 侧边栏中的测试资源管理器视图
- [自定义视图容器](#view-container)

### 树数据提供程序

第二步是为您注册的视图提供数据，以便 Baosky 可以在视图中显示数据。为此，您应该首先实现 [TreeDataProvider](/api/references/baosky-api#TreeDataProvider)。我们的 `TreeDataProvider` 将提供节点依赖项数据，但您可以拥有提供其他类型数据的数据提供程序。

此 API 中有两个必须实现的方法：

- `getChildren(element?: T): ProviderResult<T[]>` - 实现此方法以返回给定 `element` 的子项或根（如果未传递任何元素）。
- `getTreeItem(element: T): TreeItem | Thenable<TreeItem>` - 实现此方法以返回在视图中显示的元素的 UI 表示 ([TreeItem](/api/references/baosky-api#TreeItem))。

当用户打开树视图时，将调用 `getChildren` 方法而不带 `element`。从那里，您的 `TreeDataProvider` 应该返回您的顶层树项。在我们的示例中，顶层树项的 `collapsibleState` 为 `TreeItemCollapsibleState.Collapsed`，这意味着顶层树项将显示为折叠状态。将 `collapsibleState` 设置为 `TreeItemCollapsibleState.Expanded` 将导致树项显示为展开状态。将 `collapsibleState` 保持为其默认值 `TreeItemCollapsibleState.None` 表示树项没有子项。对于 `collapsibleState` 为 `TreeItemCollapsibleState.None` 的树项，不会调用 `getChildren`。

以下是一个提供节点依赖项数据的 `TreeDataProvider` 实现示例：

```ts
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class NodeDependenciesProvider implements vscode.TreeDataProvider<Dependency> {

    constructor(private workspaceRoot: string) {}

    getTreeItem(element: Dependency): vscode.TreeItem {
        return element;
    }

    getChildren(element?: Dependency): Thenable<Dependency[]> {
        if (!this.workspaceRoot) {
            vscode.window.showInformationMessage('No dependency in empty workspace');
            return Promise.resolve([]);
        }

        if (element) {
            return Promise.resolve(this.getDepsInPackageJson(path.join(this.workspaceRoot, 'node_modules', element.label, 'package.json')));
        } else {
            const packageJsonPath = path.join(this.workspaceRoot, 'package.json');
            if (this.pathExists(packageJsonPath)) {
                return Promise.resolve(this.getDepsInPackageJson(packageJsonPath));
            } else {
                vscode.window.showInformationMessage('Workspace has no package.json');
                return Promise.resolve([]);
            }
        }

    }

    / **
     * Given the path to package.json, read all its dependencies and devDependencies.
     */
    private getDepsInPackageJson(packageJsonPath: string): Dependency[] {
        if (this.pathExists(packageJsonPath)) {
            const toDep = (moduleName: string, version: string): Dependency => {
                if (this.pathExists(path.join(this.workspaceRoot, 'node_modules', moduleName))) {
                    return new Dependency(moduleName, version, vscode.TreeItemCollapsibleState.Collapsed);
                } else {
                    return new Dependency(moduleName, version, vscode.TreeItemCollapsibleState.None);
                }
            };

            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

            const deps = packageJson.dependencies
                ? Object.keys(packageJson.dependencies).map(dep => toDep(dep, packageJson.dependencies[dep]))
                : [];
            const devDeps = packageJson.devDependencies
                ? Object.keys(packageJson.devDependencies).map(dep => toDep(dep, packageJson.devDependencies[dep]))
                : [];
            return deps.concat(devDeps);
        } else {
            return [];
        }
    }

    private pathExists(p: string): boolean {
        try {
            fs.accessSync(p);
        } catch (err) {
            return false;
        }
        return true;
    }
}

class Dependency extends vscode.TreeItem {

    constructor(
        public readonly label: string,
        private version: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    ) {
        super(label, collapsibleState);
        this.tooltip = `${this.label}-${this.version}`;
        this.description = this.version;
    }

    iconPath = {
        light: path.join(__filename, '..', '..', 'resources', 'light', 'dependency.svg'),
        dark: path.join(__filename, '..', '..', 'resources', 'dark', 'dependency.svg')
    };

}
```

### 注册 TreeDataProvider

第三步是将上述数据提供程序注册到您的视图。

这可以通过以下两种方式完成：

- `vscode.window.registerTreeDataProvider` - 通过提供已注册的视图 ID 和上述数据提供程序来注册树数据提供程序。

    ```typescript
    const rootPath = (vscode.workspace.workspaceFolders && (vscode.workspace.workspaceFolders.length > 0))
		? vscode.workspace.workspaceFolders[0].uri.fsPath : undefined;
    vscode.window.registerTreeDataProvider('nodeDependencies', new NodeDependenciesProvider(rootPath));
    ```

- `vscode.window.createTreeView` - 通过提供已注册的视图 ID 和上述数据提供程序来创建树视图。这将提供对 [TreeView](/api/references/baosky-api#TreeView) 的访问权限，您可以使用它来执行其他视图操作。如果您需要 `TreeView` API，请使用 `createTreeView`。

    ```typescript
    vscode.window.createTreeView('nodeDependencies', { treeDataProvider: new NodeDependenciesProvider(rootPath)});
    ```

这是运行中的插件：

<!-- 图片已移除 -->

### 更新树视图内容

我们的节点依赖项视图很简单，一旦数据显示出来，它就不会更新。但是，在视图中有一个刷新按钮并用 `package.json` 的当前内容更新节点依赖项视图将会很有用。为此，我们可以使用 `onDidChangeTreeData` 事件。

- `onDidChangeTreeData?: Event<T | undefined | null | void>` - 如果您的树数据可能会更改并且您想要更新树视图，请实现此方法。

将以下内容添加到您的 `NodeDependenciesProvider`。

```ts
  private _onDidChangeTreeData: vscode.EventEmitter<Dependency | undefined | null | void> = new vscode.EventEmitter<Dependency | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<Dependency | undefined | null | void> = this._onDidChangeTreeData.event;

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }
```

现在我们有一个刷新方法，但没有人调用它。我们可以添加一个命令来调用刷新。

在 `package.json` 的 `contributes` 部分中，添加：

```json
    "commands": [
            {
                "command": "nodeDependencies.refreshEntry",
                "title": "Refresh",
                "icon": {
                    "light": "resources/light/refresh.svg",
                    "dark": "resources/dark/refresh.svg"
                }
            },
    ]
```

并在您的插件激活中注册命令：

```ts
import * as vscode from 'vscode';
import { NodeDependenciesProvider } from './nodeDependencies';

export function activate(context: vscode.ExtensionContext) {
    const rootPath = (vscode.workspace.workspaceFolders && (vscode.workspace.workspaceFolders.length > 0))
		? vscode.workspace.workspaceFolders[0].uri.fsPath : undefined;
    const nodeDependenciesProvider = new NodeDependenciesProvider(rootPath);
    vscode.window.registerTreeDataProvider('nodeDependencies', nodeDependenciesProvider);
    vscode.commands.registerCommand('nodeDependencies.refreshEntry', () => nodeDependenciesProvider.refresh());
}
```

现在我们有一个刷新节点依赖项视图的命令，但在视图上有一个按钮会更好。我们已经为命令添加了 `icon`，因此当我们将其添加到视图时，它将显示该图标。

在 `package.json` 的 `contributes` 部分中，添加：

```json
"menus": {
    "view/title": [
        {
            "command": "nodeDependencies.refreshEntry",
            "when": "view == nodeDependencies",
            "group": "navigation"
        },
    ]
}
```

## 激活

重要的是，仅当用户需要您的插件提供的功能时才激活您的插件。在这种情况下，您应该考虑仅当用户开始使用视图时才激活您的插件。当您的插件声明视图贡献时，Baosky 会自动为您执行此操作。当用户打开视图时，Baosky 会发出激活事件 `onView:${viewId}`（对于上面的示例为 `onView:nodeDependencies`）。

> **注意**：对于 1.74.0 之前的 Baosky 版本，您必须在 `package.json` 中显式注册此激活事件，以便 Baosky 在此视图上激活您的插件：
>```json
>"activationEvents": [
>        "onView:nodeDependencies",
>],
>```

## 视图容器

视图容器包含显示在活动栏或面板中的视图列表以及内置视图容器。内置视图容器的示例包括源代码管理和资源管理器。

<!-- 图片已移除 -->

要贡献视图容器，您应该首先使用 `package.json` 中的 [contributes.viewsContainers](/api/references/contribution-points#contributes.viewsContainers) 贡献点对其进行注册。

您必须指定以下必填字段：

- `id` - 您正在创建的新视图容器的 ID。
- `title` - 将显示在视图容器顶部的名称。
- `icon` - 在活动栏中时将为视图容器显示的图像。

```json
"contributes": {
  "viewsContainers": {
    "activitybar": [
      {
        "id": "package-explorer",
        "title": "Package Explorer",
        "icon": "media/dep.svg"
      }
    ]
  }
}
```

或者，您可以将此视图放在 `panel` 节点下，将其贡献到面板。

```json
"contributes": {
  "viewsContainers": {
    "panel": [
      {
        "id": "package-explorer",
        "title": "Package Explorer",
        "icon": "media/dep.svg"
      }
    ]
  }
}
```

## 将视图贡献给视图容器

一旦创建了视图容器，您就可以在 `package.json` 中使用 [contributes.views](/api/references/contribution-points#contributes.views) 贡献点。

```json
"contributes": {
  "views": {
    "package-explorer": [
      {
        "id": "nodeDependencies",
        "name": "Node Dependencies",
        "icon": "media/dep.svg",
        "contextualTitle": "Package Explorer"
      }
    ]
  }
}
```

视图还可以具有可选的 `visibility` 属性，可以将其设置为 `visible`、`collapsed` 或 `hidden`。仅当第一次使用此视图打开工作区时，Baosky 才会遵守此属性。之后，可见性设置为用户选择的任何内容。如果您的视图容器有许多视图，或者如果您的视图并非对插件的每个用户都有用，请考虑将视图设置为 `collapsed` 或 `hidden`。`hidden` 视图将出现在视图容器的“视图”菜单中：

<!-- 图片已移除 -->

## 视图操作

操作可用作单个树项上的内联图标、树项上下文菜单中以及视图标题顶部的图标。操作是您通过向 `package.json` 添加贡献来设置为在这些位置显示的命令。

要贡献到这三个位置，您可以在 package.json 中使用以下菜单贡献点：

- `view/title` - 在视图标题中显示操作的位置。主要或内联操作使用 `"group": "navigation"`，其余是辅助操作，位于 `...` 菜单中。
- `view/item/context` - 显示树项操作的位置。内联操作使用 `"group": "inline"`，其余是辅助操作，位于 `...` 菜单中。

您可以使用 [when 子句](/api/references/when-clause-contexts) 控制这些操作的可见性。

<!-- 图片已移除 -->

示例：

```json
"contributes": {
  "commands": [
    {
      "command": "nodeDependencies.refreshEntry",
      "title": "Refresh",
      "icon": {
        "light": "resources/light/refresh.svg",
        "dark": "resources/dark/refresh.svg"
      }
    },
    {
      "command": "nodeDependencies.addEntry",
      "title": "Add"
    },
    {
      "command": "nodeDependencies.editEntry",
      "title": "Edit",
      "icon": {
        "light": "resources/light/edit.svg",
        "dark": "resources/dark/edit.svg"
      }
    },
    {
      "command": "nodeDependencies.deleteEntry",
      "title": "Delete"
    }
  ],
  "menus": {
    "view/title": [
      {
        "command": "nodeDependencies.refreshEntry",
        "when": "view == nodeDependencies",
        "group": "navigation"
      },
      {
        "command": "nodeDependencies.addEntry",
        "when": "view == nodeDependencies"
      }
    ],
    "view/item/context": [
      {
        "command": "nodeDependencies.editEntry",
        "when": "view == nodeDependencies && viewItem == dependency",
        "group": "inline"
      },
      {
        "command": "nodeDependencies.deleteEntry",
        "when": "view == nodeDependencies && viewItem == dependency"
      }
    ]
  }
}
```

默认情况下，操作按字母顺序排列。要指定不同的顺序，请添加 `@` 后跟您想要的组顺序。例如，`navigation@3` 将导致操作在 `navigation` 组中显示为第 3 个。

您可以通过创建不同的组来进一步分隔 `...` 菜单中的项目。这些组名是任意的，并按组名按字母顺序排序。

**注意：** 如果您想为特定的树项显示操作，您可以通过使用 `TreeItem.contextValue` 定义树项的上下文来实现，并且您可以在 `when` 表达式中为键 `viewItem` 指定上下文值。

示例：

```json
"contributes": {
  "menus": {
    "view/item/context": [
      {
        "command": "nodeDependencies.deleteEntry",
        "when": "view == nodeDependencies && viewItem == dependency"
      }
    ]
  }
}
```

## 欢迎内容

如果您的视图可以为空，或者如果您想将欢迎内容添加到另一个插件的空视图，您可以贡献 `viewsWelcome` 内容。空视图是指没有 `TreeView.message` 且树为空的视图。

```json
"contributes": {
  "viewsWelcome": [
    {
      "view": "nodeDependencies",
      "contents": "No node dependencies found [learn more](https://www.npmjs.com/).\n[Add Dependency](command:nodeDependencies.addEntry)"
    }
  ]
}
```

<!-- 图片已移除 -->

欢迎内容中支持链接。按照惯例，单独一行的链接是一个按钮。每个欢迎内容还可以包含一个 `when` 子句。有关更多示例，请参阅 [内置 Git 插件](https://github.com/microsoft/baosky/tree/main/extensions/git)。

## TreeDataProvider

插件编写者应以编程方式注册 [TreeDataProvider](/api/references/baosky-api#TreeDataProvider) 以在视图中填充数据。

```typescript
vscode.window.registerTreeDataProvider('nodeDependencies', new DepNodeProvider());
```

有关实现，请参阅 `tree-view-sample` 中的 [nodeDependencies.ts](https://github.com/microsoft/baosky-extension-samples/tree/main/tree-view-sample/src/nodeDependencies.ts)。

## TreeView

如果您想以编程方式对视图执行某些 UI 操作，可以使用 `window.createTreeView` 而不是 `window.registerTreeDataProvider`。这将提供对视图的访问权限，您可以使用它来执行视图操作。

```typescript
vscode.window.createTreeView('ftpExplorer', {
  treeDataProvider: new FtpTreeDataProvider()
});
```

有关实现，请参阅 `tree-view-sample` 中的 [ftpExplorer.ts](https://github.com/microsoft/baosky-extension-samples/tree/main/tree-view-sample/src/ftpExplorer.ts)。