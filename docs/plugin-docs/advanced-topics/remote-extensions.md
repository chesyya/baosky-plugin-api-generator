---
ContentId: 5c708951-e566-42db-9d97-e9715d95cdd1
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: 将 Baosky 远程开发和 GitHub Codespaces 支持添加到插件的指南
---
# 支持远程开发和 ___TERM_GitHub__ Codespaces

** [Baosky Remote Development](/docs/remote/remote-概述) ** 允许您透明地与其他计算机（无论是虚拟机还是物理机）上的源代码和运行时环境进行交互。 ** [GitHub Codespaces](https://github.com/features/codespaces) ** 是一项通过托管云托管环境扩展这些功能的服务，可从 Baosky 和基于浏览器的编辑器访问这些环境。

为了确保性能，远程开发和 _GitHub Codespaces 都透明地远程运行某些 Baosky 插件。然而，这可能会对插件的工作方式产生微妙的影响。  虽然许多插件无需任何修改即可工作，但您可能需要进行更改，以便您的插件在所有环境中正常工作，尽管这些更改通常相当小。

本文总结了插件作者需要了解的有关远程开发和代码空间的知识，包括插件 [architecture](#architecture-and-插件-kinds)、如何在远程工作区或代码空间中 [调试 your 插件](#调试-插件) 以及关于 [what 要 do if your 插件 does not work properly](#common-problems) 的建议。

## 架构和插件类型

为了使远程开发或代码空间的使用对用户尽可能透明，Baosky 区分了两种插件：

- ** UI 插件 ** ：这些插件有助于 Baosky 用户界面，并且始终在用户的本地计算机上运行。 UI 插件无法直接访问远程工作区中的文件，也无法运行该工作区或计算机上安装的脚本/工具。示例 UI 插件包括：主题、片段、语言语法和键盘映射。

- ** 工作区插件 ** ：这些插件在工作区所在的同一台计算机上运行。在本地工作区中时，工作区 插件在本地计算机上运行。在远程工作空间中或使用 Codespaces 时，工作区 插件在远程计算机/环境上运行。工作区插件可以访问工作区中的文件，以提供丰富的多文件语言服务、调试器支持，或对工作区中的多个文件执行复杂的操作（直接或通过调用脚本/工具）。虽然 工作区 插件并不专注于修改 UI，但它们也可以贡献浏览器、视图和其他 UI 元素。

当用户安装插件时，Baosky 会根据其类型自动将其安装到正确的位置。如果插件可以以任何一种方式运行，Baosky 将尝试根据情况选择最佳的插件； UI 插件将在 Baosky 的 [local 插件 Host](/api/advanced-topics/插件-host) 中运行，而工作区插件将在位于小型 [ ** Baosky Server ** ](/docs/remote/baosky-server) 中的 ** 远程插件主机 ** 中运行（如果它存在于远程工作区中），否则将在 Baosky 的本地插件主机（如果本地存在）中运行。为了确保最新的Baosky客户端功能可用，服务器需要完全匹配Baosky客户端版本。因此，当您使用 Codespaces 在容器中、远程 SSH 主机上或在 Windows Subsystem for Linux (WSL) 中打开文件夹时，远程开发或 GitHub Codespaces 插件会自动安装（或更新）服务器。 （Baosky 还会自动管理服务器的启动和停止，因此用户不会意识到它的存在。）

<!-- 图片已移除 -->

Baosky API 旨在从 UI 或 工作区 插件调用时自动在正确的计算机（本地或远程）上运行。但是，如果您的插件使用 Baosky 未提供的 API（例如使用 Node API 或运行 shell 脚本），则远程运行时可能无法正常工作。我们建议您测试插件的所有功能是否在本地和远程工作区中正常工作。

## 调试插件

当您在远程环境中[can install a development version of your 插件](#installing-a-development-version-of-your-插件)进行测试时，如果遇到问题，您可能希望直接在远程环境中调试您的插件。在本节中，我们将介绍如何在 [GitHub Codespaces](#调试-with-github-codespaces)、[local container](#调试-in-a-custom-development-container)、[SSH host](#调试-using-ssh) 或 [WSL](#调试-using-wsl) 中编辑、启动和调试插件。

通常，测试的最佳起点是使用限制端口访问的远程环境（例如 Codespaces、容器或具有限制性防火墙的远程 SSH 主机），因为在这些环境中工作的插件往往在 WSL 等限制较少的环境中工作。

### 使用 ___TERM__GitHub__ Codespaces 进行调试

在 [GitHub Codespaces](https://docs.github.com/github/developing-online-with-codespaces) 预览插件中调试插件可能是一个很好的起点，因为您可以使用 Baosky 和基于浏览器的 Codespaces 编辑器进行测试和故障排除。如果愿意，您还可以使用 [custom development container](#调试-in-a-custom-development-container)。

请按照下列步骤操作：

1. 导航到包含 ___TERM_GitHub__ 和 [open it in a codespace](https://docs.github.com/github/developing-online-with-codespaces/creating-a-codespace) 上的插件的存储库，以便在基于浏览器的编辑器中使用它。如果您愿意，也可以[open the codespace in Baosky](https://docs.github.com/github/developing-online-with-codespaces/using-codespaces-in-visual-studio-code)。

2. 虽然 _GitHub Codespaces 的默认映像应该具备大多数插件所需的所有先决条件，但您可以在新的 Baosky 终端窗口 (`kb(工作台.action.terminal.new)`) 中安装任何其他所需的依赖项（例如，使用 `yarn install` 或 `sudo apt-get`）。

3. 最后，按 `kb(工作台.action.调试.start)` 或使用 ** 运行和调试 ** 视图在代码空间中启动插件。

> ** 注意： ** 您将无法在出现的窗口中打开插件源代码文件夹，但您可以打开子文件夹或代码空间中的其他位置。

出现的插件开发主机窗口将包括在代码空间中运行的插件，并附加了调试器。

### 在自定义开发容器中调试

请按照下列步骤操作：

1.要在本地使用开发容器，[install and configure the Dev Containers 插件](/docs/devcontainers/containers#getting-started)，并使用 ** 文件 > 打开... /打开文件夹... ** 在 Baosky 中本地打开源代码。要使用 Codespaces，请导航到包含 __TERM_GitHub__ 和 [open it in a codespace](https://docs.github.com/github/developing-online-with-codespaces/creating-a-codespace) 上的插件的存储库，以便在基于浏览器的编辑器中使用它。如果您愿意，也可以[open the codespace in Baosky](https://docs.github.com/github/developing-online-with-codespaces/using-codespaces-in-visual-studio-code)。

2. 从命令面板 (`kbstyle(F1)`) 中选择 ** Dev Containers: Add Dev Container Files 配置... ** 或 ** Codespaces: Add Dev Container 配置文件... ** ，然后选择 ** Node.js 和 TypeScript ** （如果不使用 TypeScript，则选择 Node.js）以添加所需的容器配置文件。

3. ** 可选： ** 运行此命令后，您可以修改 `.devcontainer` 文件夹的内容以包含其他构建或运行时要求。有关详细信息，请参阅深入的 [Create a Dev Container](/docs/devcontainers/create-dev-container) 文档。

4. 运行 ** Dev Containers: Reopen in Container ** 或 ** Codespaces: Add Dev Container 配置 Files... ** 稍后，Baosky 将设置容器并连接。现在，您将能够从容器内部开发源代码，就像在本地情况下一样。

5. 在新的 Baosky 终端窗口 (`kb(工作台.action.terminal.new)`) 中运行 `yarn install` 或 `npm install`，以确保安装 Linux 版本 Node.js 本机依赖项。您还可以安装其他操作系统或运行时依赖项，但您可能还想将它们添加到 `.devcontainer/Dockerfile` 中，以便在重建容器时它们可用。

6. 最后，按 `kb(工作台.action.调试.start)` 或使用 ** 运行和调试 ** 视图在同一容器内启动插件并附加调试器。

> ** 注意： ** 您将无法在出现的窗口中打开插件源代码文件夹，但您可以打开子文件夹或容器中的其他位置。

出现的插件开发主机窗口将包括在步骤 2 中定义的容器中运行的插件，并附加了调试器。

### 使用 SSH 进行调试

请按照步骤：

1. 在 [installing and configuring the Remote - SSH 插件](/docs/remote/ssh#getting-started) 之后，从 Baosky 中的命令面板 (`kbstyle(F1)`) 选择 ** Remote-SSH: Connect 要 Host... ** 以连接到主机。

2. 连接后，使用 ** 文件 > 打开... / 打开文件夹... ** 选择其中包含插件源代码的远程文件夹，或者从命令面板 (`kbstyle(F1)`) 中选择 ** Git: Clone ** 以克隆它并在远程主机上打开它。

3. 在新的 Baosky 终端窗口 (`kb(工作台.action.terminal.new)`) 中安装可能缺少的任何必需依赖项（例如使用 `yarn install` 或 `apt-get`）。

4. 最后，按 `kb(工作台.action.调试.start)` 或使用 ** 运行和调试 ** 视图在远程主机上启动内部插件并附加调试器。

> ** 注意： ** 您将无法在出现的窗口中打开插件源代码文件夹，但您可以在 SSH 主机上打开子文件夹或其他位置。

出现的插件开发主机窗口将包括在 SSH 主机上运行的插件，并附加了调试器。

### 使用 WSL 进行调试

请按照下列步骤操作：

1. 在 [installing and configuring the WSL 插件](/docs/remote/wsl) 之后，从 Baosky 的命令面板 (`kbstyle(F1)`) 中选择 ** WSL：新闻 ** 。

2. 在出现的新窗口中，使用 ** 文件 > 打开... / 打开文件夹... ** 选择其中包含插件源代码的远程文件夹，或者从命令面板 (`kbstyle(F1)`) 中选择 ** Git: Clone ** 以克隆它并在 WSL 中打开它。

> ** 提示： ** 您可以选择 `/mnt/c` 文件夹来访问 Windows 端的任何克隆源代码。

3. 在新的 Baosky 终端窗口 (`kb(工作台.action.terminal.new)`) 中安装可能缺少的任何必需依赖项（例如使用 `apt-get`）。您至少需要运行 `yarn install` 或 `npm install` 以确保 Linux 版本的本机 Node.js 依赖项可用。

4. 最后，按 `kb(工作台.action.调试.start)` 或使用 ** 运行和调试 ** 视图启动插件并附加调试器，就像在本地一样。

> ** 注意： ** 您将无法在出现的窗口中打开插件源代码文件夹，但您可以在 WSL 中打开子文件夹或其他位置。

出现的插件开发主机窗口将包括在 WSL 中运行的插件以及附加的调试器。

## 安装插件的开发版本

每当 Baosky 自动在 SSH 主机上、容器或 WSL 内或通过 GitHub Codespaces 安装插件时，都会使用 市场 版本（而不是本地计算机上已安装的版本）。

虽然这在大多数情况下都是有意义的，但您可能希望使用（或共享）插件的未发布版本进行测试，而无需设置调试环境。要安装插件的未发布版本，您可以将插件打包为 `VSIX` 并手动将其安装到已连接到正在运行的远程环境的 Baosky 窗口中。

请按照下列步骤操作：

1. 如果这是已发布的插件，您可能需要将 `"插件.autoUpdate": false` 添加到 `settings.json` 以防止其自动更新到最新的 市场 版本。
2. 接下来，使用 `vsce package` 将您的插件打包为 VSIX。
3. 连接到[codespace](https://docs.github.com/github/developing-online-with-codespaces)、[Dev Containers](/docs/devcontainers/containers)、[SSH host](/docs/remote/ssh) 或 [WSL environment](/docs/remote/wsl)。
4. 使用插件视图 ** 更多操作 ** (`...`) 菜单中提供的 ** 从 VSIX 安装... ** 命令在此特定窗口（不是本地窗口）中安装插件。
5. 出现提示时重新加载。

> ** 提示： ** 安装后，您可以使用 ** 开发者：显示正在运行的插件 ** 命令来查看 Baosky 是否在本地或远程运行插件。

## 使用远程插件处理依赖关系

插件可以依赖于 API 的其他插件。例如：

- 插件可以从其 `activate` 函数导出 API 。
- 此 API 将可供在同一插件主机中运行的所有插件使用。
- 消费者插件在其 `package.json` 中声明它们依赖于使用 `extensionDependencies` 属性提供的插件。

当所有插件都在本地运行并共享相同的插件主机时，插件依赖项可以正常工作。

在处理远程场景时，远程运行的插件可能对本地运行的插件具有依赖关系。例如，本地插件公开了对于远程插件的功能至关重要的命令。在这种情况下，我们建议远程插件将本地插件声明为 `extensionDependency`，但问题是该插件运行在两个不同的插件主机上，这意味着来自提供商的 API 对消费者不可用。因此，提供插件必须完全放弃通过在其插件的 `package.json` 中使用 `"api": "none"` 来导出任何 API 的能力。该插件仍然可以使用 Baosky 命令（异步）进行通信。

这似乎对提供的插件有不必要的严格限制，但使用 `"api": "none"` 的插件只会放弃从其 `activate` 方法返回 API 的能力。在其他插件主机上执行的消费者插件仍然可以依赖它们并将被激活。

## 常见问题

Baosky 的 API 旨在自动在正确的位置运行，无论您的插件恰好位于何处。考虑到这一点，有一些 API 可以帮助您避免意外行为。

### 执行位置不正确

如果您的插件未按预期运行，它可能运行在错误的位置。最常见的是，当您希望它仅在本地运行时，它会显示为远程运行的插件。您可以使用命令面板 (`kbstyle(F1)`) 中的 ** 开发人员：显示正在运行的插件 ** 命令来查看插件正在运行的位置。

如果 ** 开发人员：显示正在运行的插件 ** 命令显示 UI 插件被错误地视为工作区插件，反之亦然，请尝试按照 [插件 Kinds section](/api/advanced-topics/插件-host#preferred-插件-location) 中的说明在插件的 [package.json](/api/get-started/插件-anatomy#插件-清单) 中设置 `extensionKind` 属性。

您可以快速 ** 测试 ** 使用 `remote.extensionKind` [setting](/docs/configure/settings) 更改插件类型的效果。此设置是插件 ID 到插件类型的映射。例如，如果您想强制 [Azure Databases](#) 插件成为 UI 插件（而不是其工作区默认插件），并将 [Remote - SSH: Editing 配置 Files](#) 插件强制成为工作空间插件（而不是其 UI 默认值），您可以设置：

```json
{
  "remote.extensionKind": {
      "ms-azuretools.vscode-cosmosdb": ["ui"],
      "ms-vscode-remote.remote-ssh-edit": ["workspace"]
  }
}
```

使用 `remote.extensionKind` 允许您快速测试插件的已发布版本，而无需修改其 `package.json` 并重建它们。

### 持久化插件数据或状态

在某些情况下，您的插件可能需要保留不属于 `settings.json` 或单独的工作区配置文件（例如 `.eslintrc`）的状态信息。为了解决这个问题，Baosky 在激活期间传递给插件的 `vscode.ExtensionContext` 对象上提供了一组有用的存储属性。如果您的插件已经利用了这些属性，那么无论它在哪里运行，它都应该继续运行。

但是，如果您的插件依赖当前的 Baosky 路径约定（例如 `~/.vscode`）或某些操作系统文件夹（例如 Linux 上的 `~/.config/Code`）来保存数据，您可能会遇到问题。幸运的是，更新你的插件并避免这些挑战应该很简单。

如果要保留简单的键值对，则可以分别使用 `vscode.ExtensionContext.workspaceState` 或 `vscode.ExtensionContext.globalState` 存储工作区特定或全局状态信息。如果您的数据比键值对更复杂，则 `globalStorageUri` 和 `storageUri` 属性提供“安全”URI，您可以使用它们在文件中读取/写入全局工作区特定信息。

要使用 API：

```TypeScript
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('myAmazingExtension.persistWorkspaceData', async () => {
            if (!context.storageUri) {
                return;
            }

            // Create the extension's workspace storage folder if it doesn't already exist
            try {
                // When folder doesn't exist, and error gets thrown
                await vscode.workspace.fs.stat(context.storageUri);
            } catch {
                // Create the extension's workspace storage folder
                await vscode.workspace.fs.createDirectory(context.storageUri)
            }

            const workspaceData = vscode.Uri.joinPath(context.storageUri, 'workspace-data.json');
            const writeData = new TextEncoder().encode(JSON.stringify({ now: Date.now() }));
            vscode.workspace.fs.writeFile(workspaceData, writeData);
        }
    ));

    context.subscriptions.push(
        vscode.commands.registerCommand('myAmazingExtension.persistGlobalData', async () => {

        if (!context.globalStorageUri) {
            return;
        }

        // Create the extension's global (cross-workspace) folder if it doesn't already exist
        try {
            // When folder doesn't exist, and error gets thrown
            await vscode.workspace.fs.stat(context.globalStorageUri);
        } catch {
            await vscode.workspace.fs.createDirectory(context.globalStorageUri)
        }

        const workspaceData = vscode.Uri.joinPath(context.globalStorageUri, 'global-data.json');
        const writeData = new TextEncoder().encode(JSON.stringify({ now: Date.now() }));
        vscode.workspace.fs.writeFile(workspaceData, writeData);
    ));
}
```

### 在机器之间同步用户全局状态

如果您的插件需要在不同的计算机上保留某些用户状态，则使用 `vscode.ExtensionContext.globalState.setKeysForSync` 向 [Settings Sync](/docs/configure/settings-sync) 提供状态。这有助于防止在多台计算机上向用户显示相同的欢迎或更新页面。

[插件 Capabilities](/api/插件-capabilities/common-capabilities#data-storage) 主题中有一个使用 `setKeysforSync` 的示例。

### 持久的秘密

如果您的插件需要保留密码或其他秘密，您可能需要使用 Baosky 的 [SecretStorage API](#) 它提供了一种在加密支持的文件系统上安全存储文本的方法。例如，在桌面上，我们使用 Electron 的 [safeStorage API](https://www.electronjs.org/docs/latest/api/safe-storage) 来加密机密，然后再将其存储到文件系统上。 API 将始终将机密存储在客户端，但无论您的插件在何处运行，您都可以使用此 API 并检索相同的机密值。

> ** 注意 ** ：此 API 是保存密码和机密的推荐方法。您 ** **不要使用 `vscode.ExtensionContext.workspaceState` 或 `vscode.ExtensionContext.globalState` 存储您的机密，因为这些 API 以文形式存储明数据。

这是一个例子：

```typescript
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    // ...
    const myApiKey = context.secrets.get('apiKey');
    // ...
    context.secrets.delete('apiKey');
    // ...
    context.secrets.store('apiKey', myApiKey);
}
```

### 使用剪贴板

从历史上看，插件作者使用 Node.js 模块（例如 `clipboardy`）与剪贴板进行交互。不幸的是，如果您在 工作区 插件中使用这些模块，它们将使用远程剪贴板而不是用户的本地剪贴板。 Baosky 剪贴板 API 解决了这个问题。它始终在本地运行，无论调用它的插件类型如何。

要在插件中使用 Baosky 剪贴板 API：

```typescript
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand('myAmazingExtension.clipboardIt', async () => {
        // Read from clipboard
        const text = await vscode.env.clipboard.readText();

        // Write to clipboard
        await vscode.env.clipboard.writeText(`It looks like you're copying "${text}". Would you like help?`);
    }));
}
```

### 在本地浏览器或应用程序中打开某些内容

生成进程或使用 `opn` 之类的模块来针对特定 URI 启动浏览器或其他应用程序可以很好地适应本地场景，但 工作区 插件远程运行，这可能会导致应用程序在错误的一侧启动。 Baosky 远程开发 ** 部分 ** 填充 `opn` 节点模块，以允许现有插件运行。您可以使用 URI 调用该模块，并且 Baosky 将导致 URI 的默认应用程序出现在客户端。但是，这不是完整的实现，因为不支持选项并且不返回 `child_process` 对象。

我们建议插件利用 `vscode.env.openExternal` 方法在本地操作系统上针对给定的 URI 启动默认注册的应用程序，而不是依赖第三方节点模块。更好的是，`vscode.env.openExternal` ** 自动进行本地主机端口转发！ ** 您可以使用它指向远程计算机或代码空间上的本地 Web 服务器并提供内容，即使该端口被外部阻止也是如此。

> ** 注意： ** 目前 Codespaces 基于浏览器的编辑器中的转发机制仅支持 ** http 和 https 请求 ** 。但是，当从 Baosky 连接到代码空间时，您可以与任何 TCP 连接进行交互。

要使用 `vscode.env.openExternal` API：

```typescript
import * as vscode from 'vscode';

export async function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand('myAmazingExtension.openExternal', () => {

        // Example 1 - Open the Baosky homepage in the default browser.
        vscode.env.openExternal(vscode.Uri.parse('#));

        // Example 2 - Open an auto-forwarded localhost HTTP server.
        vscode.env.openExternal(vscode.Uri.parse('http://localhost:3000'));

        // Example 3 - Open the default email application.
        vscode.env.openExternal(vscode.Uri.parse('mailto:<fill in your email here>'));
    }));
}
```

### 转发本地主机

虽然[localhost forwarding mechanism in `code` is useful](#opening-something-in-a-local-browser-or-application)，但也可能存在您想要转发某些内容但实际上启动新的浏览器窗口或应用程序的情况。这就是 `vscode.env.asExternalUri` API 的用武之地。

> ** 注意： ** 目前 Codespaces 基于浏览器的编辑器中的转发机制仅支持 ** http 和 https 请求 ** 。但是，当从 Baosky 连接到代码空间时，您可以与任何 TCP 连接进行交互。

要使用 `vscode.env.asExternalUri` API：

```typescript
import * as vscode from 'vscode';
import { getExpressServerPort } from './server';

export async function activate(context: vscode.ExtensionContext) {

    const dynamicServerPort = await getWebServerPort();

    context.subscriptions.push(vscode.commands.registerCommand('myAmazingExtension.forwardLocalhost', async () =>

        // Make the port available locally and get the full URI
        const fullUri = await vscode.env.asExternalUri(
            vscode.Uri.parse(`http://localhost:${dynamicServerPort}`));

        // ... do something with the fullUri ...

    }));
}
```

需要注意的是，由 API 传回的 URI ** 可能根本不引用 localhost ** ，因此您应该完整地使用它。这对于无法使用 localhost 的基于浏览器的 Codespaces 编辑器尤其重要。

### 回调和 URI 处理程序

`vscode.window.registerUriHandler` API 允许您的插件注册自定义 URI ，如果在浏览器中打开，将在您的插件中触发回调函数。注册 URI 处理程序的常见用例是使用 [OAuth 2.0](https://oauth.net/2/) 身份验证提供程序（例如 Azure AD）实现服务登录。但是，它可用于您希望外部应用程序或浏览器向您的插件发送信息的任何场景。

Baosky 中的远程开发和 Codespaces 插件将透明地处理将 URI 传递给您的插件，无论它实际运行在何处（本地或远程）。但是，`vscode://` URI 不适用于 Codespaces 基于浏览器的编辑器，因为在浏览器之类的设备中打开这些 URI 会尝试将它们传递到本地 Baosky 客户端，而不是基于浏览器的编辑器。幸运的是，可以通过使用 `vscode.env.asExternalUri` API 轻松解决此问题。

让我们使用 `vscode.window.registerUriHandler` 和 `vscode.env.asExternalUri` 的组合来连接示例 OAuth 身份验证回调：

```typescript
import * as vscode from 'vscode';

// This is ${publisher}.${name} from package.json
const extensionId = 'my.amazing-extension';

export async function activate(context: vscode.ExtensionContext) {

    // Register a URI handler for the authentication callback
    vscode.window.registerUriHandler({
        handleUri(uri: vscode.Uri): vscode.ProviderResult<void> {

            // Add your code for what to do when the authentication completes here.
            if (uri.path === '/auth-complete') {
                vscode.window.showInformationMessage('Sign in successful!');
            }

        }
    });

    // Register a sign in command
    context.subscriptions.push(vscode.commands.registerCommand(`${extensionId}.signin`, async () => {

        // Get an externally addressable callback URI for the handler that the authentication provider can use
        const callbackUri = await vscode.env.asExternalUri(vscode.Uri.parse(`${vscode.env.uriScheme}://${extensionId}/auth-complete`));

        // Add your code to integrate with an authentication provider here - we'll fake it.
        vscode.env.clipboard.writeText(callbackUri.toString());
        await vscode.window.showInformationMessage('Open the URI copied to the clipboard in a browser window to authorize.');
    }));
}
```

在 Baosky 中运行此示例时，它会连接一个 `vscode://` 或 `vscode-insiders://` URI，可用作身份验证提供程序的回调。在基于浏览器的 Codespaces 编辑器中运行时，它会连接 `https://*.github.dev` URI ，无需任何代码更改或特殊条件。

虽然 OAuth 超出了本文档的范围，但请注意，如果您将此示例改编为真正的身份验证提供程序，则可能需要在提供程序之前构建代理服务。这是因为并非所有提供商都允许 `vscode://` 回调 URIs，而其他提供商则不允许通过 HTTPS 进行回调的通配符主机名。我们还建议尽可能使用 [OAuth 2.0 Authorization Code with PKCE flow](https://oauth.net/2/pkce/)（例如，Azure AD 支持 PKCE）以提高回调的安全性。

### 远程运行或在 Codespaces 浏览器编辑器中运行时的不同行为

在某些情况下，您的 工作区 插件可能需要改变远程运行时的行为。在其他情况下，您可能希望在 Codespaces 基于浏览器的编辑器中运行时改变其行为。 Baosky 提供了三个 API 来检测这些情况：`vscode.env.uiKind`、`插件.extensionKind` 和 `vscode.env.remoteName`。

接下来，您可以使用三个 API，如下所示：

```typescript
import * as vscode from 'vscode';

export async function activate(context: vscode.ExtensionContext) {

    // extensionKind returns ExtensionKind.UI when running locally, so use this to detect remote
    const extension = vscode.extensions.getExtension('your.extensionId');
    if (extension.extensionKind === vscode.ExtensionKind.Workspace) {
        vscode.window.showInformationMessage('I am running remotely!');
    }

    // Codespaces browser-based editor will return UIKind.Web for uiKind
    if (vscode.env.uiKind === vscode.UIKind.Web) {
        vscode.window.showInformationMessage('I am running in the Codespaces browser editor!');
    }

    // Baosky will return undefined for remoteName if working with a local workspace
    if (typeof(vscode.env.remoteName) === 'undefined') {
        vscode.window.showInformationMessage('Not currently connected to a remote workspace.');
    }

}
```

### 使用命令在插件之间进行通信

某些插件返回 API 作为其激活的一部分，供其他插件使用（通过 `vscode.插件.getExtension(extensionName).exports`）。虽然如果涉及的所有插件都在同一侧（所有 UI 插件或所有 工作区 插件），这些插件都可以工作，但这些插件在 UI 和 工作区 插件之间不起作用。

幸运的是，Baosky 会自动将任何执行的命令路由到正确的插件，无论其位置如何。您可以自由调用任何命令（包括其他插件提供的命令），而不必担心影响。

如果您有一组需要相互交互的插件，那么使用私有命令公开功能可以帮助您避免意外的影响。但是，作为参数传入的任何对象在传输之前都将被“字符串化”(`JSON.stringify`)，因此该对象不能具有循环引用，并且最终将在另一侧作为“普通旧 JavaScript 对象”。

例如：

```typescript
import * as vscode from 'vscode';

export async function activate(context: vscode.ExtensionContext) {
    // Register the private echo command
    const echoCommand = vscode.commands.registerCommand('_private.command.called.echo',
        (value: string) => {
            return value;
        }
    );
    context.subscriptions.push(echoCommand);
}
```

有关使用命令的详细信息，请参阅 [命令 API guide](/api/插件-guides/命令)。

## 使用 Webview API

与剪贴板 API 一样，[Webview API](/api/插件-guides/webview) 始终在用户的本地计算机或浏览器中运行，即使是从 工作区 插件使用时也是如此。这意味着许多基于 Webview 的插件应该可以正常工作，即使在远程工作空间或代码空间中使用也是如此。但是，需要注意一些注意事项，以便您的 webview 插件在远程运行时正常工作。

### 始终使用 asWebviewUri

您应该使用 `asWebviewUri` API 来管理插件资源。需要使用此 API 而不是硬编码 `vscode-resource://` URIs 来确保 Codespaces 基于浏览器的编辑器与您的插件配合使用。有关详细信息，请参阅 [Webview API](/api/插件-guides/webview) 指南，但这里有一个简单的示例。

您可以在内容中使用 API，如下所示：

```typescript
// Create the webview
const panel = vscode.window.createWebviewPanel(
    'catWebview',
    'Cat Webview',
    vscode.ViewColumn.One);

// Get the content Uri
const catGifUri = panel.webview.asWebviewUri(
    vscode.Uri.joinPath(context.extensionUri, 'media', 'cat.gif'));

// Reference it in your content
panel.webview.html = `<!DOCTYPE html>
<html>
<body>
    <img src="${catGifUri}" width="300" />
</body>
</html>`;
```

### 使用消息传递 API 来获取动态 Web 视图内容

Baosky webview 包含 [message passing](/api/插件-guides/webview#scripts-and-message-passing) API，允许您动态更新 webview 内容，而无需使用本地 Web 服务器。即使您的插件正在运行一些您想要与之交互以更新 webview 内容的本地 Web 服务，您也可以从插件本身而不是直接从 HTML 内容执行此操作。

这是远程开发和 GitHub Codespaces 的重要模式，可确保您的 webview 代码在 Baosky 和 Codespaces 基于浏览器的编辑器中工作。

** 为什么是消息传递而不是本地主机 Web 服务器？ **

另一种模式是在 `iframe` 中提供 Web 内容，或者让 Webview 内容直接与本地主机服务器交互。不幸的是，默认情况下，webview 中的 `localhost` 将解析为开发人员的本地计算机。这意味着对于远程运行的工作区插件，它创建的 webview 将无法访问该插件生成的本地服务器。即使您使用计算机的 IP，您连接的端口通常也会在云虚拟机或容器中默认被阻止。即使这在 Baosky 中有效，它也不会在基于浏览器的 Codespaces 编辑器中工作。

以下是使用 Remote - SSH 插件时出现的问题的说明，但 Dev Containers 和 GitHub Codespaces 也存在该问题：

<!-- 图片已移除 -->

如果可能的话， ** 您应该避免这样做 ** ，因为它会使您的插件显着复杂化。 [Message passing](/api/插件-guides/webview#scripts-and-message-passing) API 可以实现相同类型的用户体验，而无需这些类型的麻烦。插件本身将在远程端的 Baosky 服务器中运行，因此它可以透明地与您的插件因从 Web 视图传递到它的任何消息而启动的任何 Web 服务器进行交互。

### 从 Web 视图使用 localhost 的解决方法

如果您由于某种原因无法使用 [message passing](/api/插件-guides/webview#scripts-and-message-passing) API，有两个选项可以与 Baosky 中的远程开发和 __TERM_GitHub__ Codespaces 插件配合使用。

每个选项都允许 webview 内容通过 Baosky 用于与 Baosky 服务器通信的同一通道进行路由。例如，如果我们更新上一节中远程 - SSH 的插图，您将看到以下内容：

<!-- 图片已移除 -->

### 选项 1 - 使用 asExternalUri

Baosky 1.40 引入了 `vscode.env.asExternalUri` API 来允许插件以编程方式远程转发本地 `http` 和 `https` 请求。当您的插件在 Baosky 中运行时，您可以使用相同的 API 将请求从 Web 视图转发到 `localhost` Web 服务器。

使用 API 获取 iframe 的完整 URI 并将其添加到您的 HTML 中。您还需要在 Web 视图中启用脚本并将 CSP 添加到您的 HTML 内容。

```typescript
// Use asExternalUri to get the URI for the web server
const dynamicWebServerPort = await getWebServerPort();
const fullWebServerUri = await vscode.env.asExternalUri(
        vscode.Uri.parse(`http://localhost:${dynamicWebServerPort}`)
    );

// Create the webview
const panel = vscode.window.createWebviewPanel(
    'asExternalUriWebview',
    'asExternalUri Example',
    vscode.ViewColumn.One, {
        enableScripts: true
    });

const cspSource = panel.webview.cspSource;
panel.webview.html = `<!DOCTYPE html>
        <head>
            <meta
                http-equiv="Content-Security-Policy"
                content="default-src 'none'; frame-src ${fullWebServerUri} ${cspSource} https:; img-src ${cspSource} https:; script-src ${cspSource}; style-src ${cspSource};"
            />
        </head>
        <body>
        <!-- All content from the web server must be in an iframe -->
        <iframe src="${fullWebServerUri}">
    </body>
    </html>`;
```

请注意，上例中 `iframe` 中提供的任何 HTML 内容 ** 需要使用相对路径 ** ，而不是硬编码 `localhost`。

### 选项 2 - 使用端口映射

如果您 ** 不打算支持 Codespaces 基于浏览器的编辑器 ** ，您可以使用 Web 视图 API 中提供的 `portMapping` 选项。 （此方法也适用于 Baosky 客户端的 Codespaces，但不适用于浏览器）。

要使用端口映射，请在创建 webview 时传入 `portMapping` 对象：

```typescript
const LOCAL_STATIC_PORT = 3000;
const dynamicServerPort = await getWebServerPort();

// Create webview and pass portMapping in
const panel = vscode.window.createWebviewPanel(
    'remoteMappingExample',
    'Remote Mapping Example',
    vscode.ViewColumn.One, {
        portMapping: [
            // This maps localhost:3000 in the webview to the web server port on the remote host.
            { webviewPort: LOCAL_STATIC_PORT, extensionHostPort: dynamicServerPort }
        ]
    });

// Reference the port in any full URIs you reference in your HTML.
panel.webview.html = `<!DOCTYPE html>
    <body>
        <!-- This will resolve to the dynamic server port on the remote machine -->
        <img src="http://localhost:${LOCAL_STATIC_PORT}/canvas.png">
    </body>
    </html>`;
```

在此示例中，在远程和本地情况下，对 `http://localhost:3000` 发出的任何请求都将自动映射到 Express.js Web 服务器正在运行的动态端口。

## 使用原生 Node.js 模块

与 Baosky 插件捆绑（或必须动态获取）的本机模块重新编译 [using Electron's `code`](https://electronjs.org/docs/tutorial/using-native-node-modules)。但是，Baosky 服务器运行标准（非 Electron）版本的 Node.js，这可能会导致二进制文件在远程使用时失败。

为了解决这个问题：

1. 包含（或动态获取）Baosky 附带的 Node.js 中“模块”版本的两组二进制文件（Electron 和标准 Node.js）。
2.检查`vscode.插件.getExtension('your.extensionId').extensionKind === vscode.ExtensionKind.工作区`是否根据插件是远程运行还是本地运行来设置正确的二进制文件。
3.您可能还想通过 [following similar logic](#supporting-nonx8664-hosts-or-alpine-linux-containers) 同时添加对非 x86_64 目标和 Alpine Linux 的支持。

您可以通过转到 ** 帮助 > 开发人员工具 ** 并在控制台中键入 `process.versions.modules` 来找到 Baosky 使用的“模块”版本。但是，为了确保本机模块在不同的 Node.js 环境中无缝工作，您可能需要针对所有可能的 Node.js “模块”版本和您想要支持的平台（Electron Node.js、官方 Node.js Windows/Darwin/Linux、所有版本）编译本机模块。 [node-tree-sitter](https://github.com/tree-sitter/node-tree-sitter/releases/tag/v0.14.0) 模块就是一个很好的例子，它可以很好地做到这一点。

## 支持非 x86_64 主机或 Alpine Linux 容器

如果您的插件纯粹是用 JavaScript/TypeScript 编写的，您可能不需要执行任何操作即可向您的插件添加对其他处理器架构或基于 `musl` 的 Alpine Linux 的支持。

但是，如果您的插件可在 Debian 9+、Ubuntu 16.04+ 或 RHEL / CentOS 7+ 远程 SSH 主机、容器或 WSL 上运行，但在受支持的非 x86_64 主机（例如 ARMv7l）或 Alpine Linux 容器上失败，则插件可能包含 x86_64 `glibc` 特定本机代码或运行时，这些代码或运行时将在这些架构/操作系统上失败。

例如，您的插件可能只包含本机模块或运行时的 x86_64 编译版本。对于 Alpine Linux，由于 Alpine Linux (`musl`) 和其他发行版本 (`glibc`) 中 `libc` 的实现方式之间的 [fundamental differences](https://wiki.musl-libc.org/functional-differences-from-glibc.html) ，所包含的本机代码或运行时可能无法工作。

要解决此问题：

1. 如果您要动态获取编译代码，则可以通过使用 `process.arch` 检测非 x86_64 目标并下载为正确架构编译的版本来添加支持。如果您在插件中包含所有受支持架构的二进制文件，则可以使用此逻辑来使用正确的架构。

2. 对于 Alpine Linux，您可以使用 `await fs.exists('/etc/alpine-release')` 检测操作系统，并再次下载或使用基于 `musl` 的操作系统的正确二进制文件。

3. 如果您不想支持这些平台，您可以使用相同的逻辑来提供良好的错误消息。

请务必注意，某些第三方 npm 模块包含可能导致此问题的本机代码。因此，在某些情况下，您可能需要与 npm 模块作者合作来添加其他编译目标。

## 避免使用 Electron 模块

虽然依赖插件 API 未公开的内置 Electron 或 Baosky 模块可能很方便，但需要注意的是 Baosky Server 运行标准（非 Electron）版本的 Node.js。远程运行时这些模块将丢失。有一些例外，其中有特定的代码可以使它们工作。

在插件 VSIX 中使用基本 Node.js 模块或模块来避免这些问题。如果您绝对必须使用 Electron 模块，请确保在模块丢失时有后备方案。

下面的示例将使用 Electron `original-fs` 节点模块（如果找到），如果没有，则回退到基本 Node.js `fs` 模块。

```typescript
function requireWithFallback(electronModule: string, nodeModule: string) {
    try {
        return require(electronModule);
    }
    catch (err) { }
    return require(nodeModule);
}

const fs = requireWithFallback('original-fs', 'fs');
```

尽可能避免这些情况。

## 已知问题

有一些插件问题可以通过 工作区 插件的一些附加功能来解决。下表列出了正在考虑的已知问题：

|问题 |描述 |
|---------|-------------|
| ** 无法从 工作区 插件访问连接的设备 ** | 访问本地连接设备的插件在远程运行时将无法连接到它们。克服这个问题的一种方法是创建一个配套的 UI 插件，其工作是访问连接的设备并提供远程插件也可以调用的命令。   另一种方法是反向隧道，它在 [Baosky repo issue](https://github.com/microsoft/baosky/issues/100222) 中进行跟踪。 |

## 问题和反馈

- 请参阅 [Tips and Tricks](/docs/remote/故障排除) 或 [常见问题](/docs/remote/常见问题)。
- 在 [Stack Overflow](https://stackoverflow.com/questions/tagged/baosky-remote) 上的答案中搜索。
- [Upvote a feature or request a new one](https://aka.ms/baosky-remote/feature-requests)，搜索[existing issues](https://aka.ms/baosky-remote/issues) 或 [report a problem](https://aka.ms/baosky-remote/issues/new)。
- 创建 [development container Template](https://containers.dev/templates) 或 [Feature](https://containers.dev/features) 供其他人使用。
- 为 [our documentation](https://github.com/microsoft/baosky-docs) 或 [Baosky](https://github.com/microsoft/baosky) 做出贡献。
-有关详细信息，请参阅我们的[CONTRIBUTING](https://aka.ms/baosky-remote/contributing) 指南。
