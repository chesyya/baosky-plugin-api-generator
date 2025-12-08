---
# DO NOT TOUCH — Managed by doc writer

ContentId: e655f324-ed0b-452d-aff3-52cdca3978a5
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: 为开发人员构建与 Baosky 配合使用的 MCP 服务器的综合指南。
---

# MCP 开发者指南

模型上下文协议（MCP）是一种开放标准，使人工智能模型能够通过统一的接口与外部工具和服务进行交互。 Baosky 实现了完整的 MCP 规范，使您能够创建 MCP 服务器，该服务器提供工具、提示和资源，用于扩展 Baosky 中的 AI 代理的功能。

MCP 服务器提供 Baosky 中可用的三种工具之一，以及内置工具和插件贡献的工具。了解有关[tool types](/docs/copilot/chat/chat-tools.md#types-of-tools)的更多信息。

本指南涵盖了构建与 Baosky 和其他 MCP 客户端无缝协作的 MCP 服务器所需了解的所有内容。

> [!提示]
> 有关作为最终用户使用 MCP 服务器的信息，请参阅[Use MCP servers in Baosky](/docs/copilot/customization/mcp-servers.md)。

## 为什么使用 MCP 服务器？

实现 MCP 服务器以使用语言模型工具扩展 Baosky 中的聊天具有以下好处：

- ** 使用专门的、特定于域的工具扩展代理模式 ** ，这些工具会作为响应用户提示的一部分自动调用。例如，启用数据库支架和查询以动态为法学硕士提供相关上下文。
- ** 灵活的部署选项 ** 适用于本地和远程场景。
- ** 在不同的工具和平台上重复使用 ** 您的 MCP 服务器。

您可以考虑在以下场景中使用 [Language Model API](/api/插件-guides/ai/tools) 实现语言模型工具：

- 您想通过使用插件 APIs 与 Baosky 深度集成。
- 您想要使用 Visual Studio 市场 分发您的工具和更新。

## Baosky 支持的 MCP 功能

Baosky 支持以下 MCP 功能：

* [Transports](https://modelcontextprotocol.io/specification/2025-06-18/basic/transports)：
* 本地标准输入/输出 (`stdio`)
* 可流式传输 HTTP (`http`)
* 服务器发送的事件 (`sse`) - 旧版支持。

* [Features](https://modelcontextprotocol.io/specification/2025-06-18#features)：
* 工具：使用额外的工具扩展[agent mode](/docs/copilot/chat/chat-agent-mode)
* 提示：在聊天中添加可重复使用的提示作为斜杠命令
* 资源：提供数据和内容，用户可以添加为聊天上下文或直接在Baosky中进行交互
* 启发：请求用户输入
* 采样：使用用户配置的模型和订阅来发出语言模型请求
* 身份验证：使用 OAuth 授权访问 MCP 服务器
* 服务器指令
* Roots：提供有关用户工作区根文件夹的信息

＃＃＃ 工具

#### 工具定义

Baosky 支持代理模式的 MCP 工具，根据任务需要调用它们。用户可以使用工具选择器启用和配置它们。工具描述显示在工具选择器中、工具名称旁边，以及在运行工具之前要求确认时的对话框中。

<!-- 图片已移除 -->

用户可以在工具确认对话框中编辑模型生成的输入参数。对于所有未标有 `readOnlyHint` 注释的工具，都会显示确认对话框。

<!-- 图片已移除 -->

#### 动态工具发现

Baosky 还支持 [dynamic tool discovery](https://modelcontextprotocol.io/docs/concepts/tools#tool-discovery-and-updates)，允许服务器在运行时注册工具。例如，服务器可以基于工作区中检测到的框架或语言，或者响应用户的聊天提示来提供不同的工具。

#### 工具注释

要提供有关工具行为的额外元数据，您可以使用 [tool annotations](https://modelcontextprotocol.io/docs/concepts/tools#tool-annotations)：

- `title`：工具的人类可读标题，在调用工具时显示在聊天视图中
- `readOnlyHint`：可选提示，指示该工具是只读的。 Baosky 不要求确认运行只读工具。

＃＃＃ 资源

Resources enable you 要 provide data and content 要 users in a structured way. Users can directly access resources in Baosky, or use them as context in chat prompts. 例如, an MCP server could generate screenshots and make them available as resources, or provide access 要 log files, which are then updated in real-time.

定义 MCP 资源时，资源名称将显示在 MCP 资源快速选择中。可以通过 ** MCP：浏览资源 ** 命令打开资源，或使用 ** 添加上下文 ** 将资源附加到聊天请求，然后选择 ** MCP 资源 ** 。资源可以包含文本或二进制内容。

<!-- 图片已移除 -->

Baosky支持资源更新，使用户可以在编辑器中实时看到资源内容的变化。

#### 资源模板

Baosky 还支持 [resource templates](https://modelcontextprotocol.io/docs/concepts/resources#resource-templates)，允许用户在引用资源时提供输入参数。例如，数据库查询工具可以询问数据库表名称。

使用模板访问资源时，系统会提示用户在“快速选择”中输入所需参数。您可以提供补全来建议参数值。

### 提示

提示是可重用的聊天提示模板，用户可以使用斜杠命令 (`mcp.servername.promptname`) 在聊天中调用它们。通过突出显示各种工具或提供适应用户本地上下文和服务的内置复杂工作流程，提示对于将用户引入您的服务器非常有用。

如果您定义 [completions](https://modelcontextprotocol.io/specification/2025-06-18/server/utilities/completion) 来建议提示输入参数的值，则 Baosky 会显示一个对话框来收集用户的输入。

```typescript
server.prompt(
    "teamGreeting", "Generate a greeting for team members",
    {
        name: completable(z.string(), (value) => {
            return ["Alice", "Bob", "Charlie"].filter(n => n.startsWith(value));
        })
    },
    async ({ name }) => ({
        messages: [{
            role: "assistant",
            content: { type: "text", text: `Hello ${name}, welcome to the team!` }
        }]
    })
);
```

<!-- 图片已移除 -->

> [!注意]
> 用户可以在提示对话框中输入终端命令，并将命令输出作为提示的输入。

当您在提示响应中包含资源类型时，Baosky 会将该资源作为上下文附加到聊天提示。

＃＃＃ 授权

Baosky 支持需要身份验证的 MCP 服务器，允许用户与代表其用户帐户操作该服务的 MCP 服务器进行交互。

[authorization specification](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization) 将作为资源服务器的 MCP 服务器与授权服务器完全分开，允许开发人员将身份验证委托给现有身份提供商 (IdP)，而不是从头开始构建自己的 OAuth 实现。

Baosky 内置了对 GitHub 和 Microsoft Entra 的身份验证支持。如果您的 MCP 服务器实施最新规范并使用 GitHub 或 Microsoft Entra 作为授权服务器，则用户可以通过该帐户的 ** 帐户菜单 ** > ** 管理受信任的 MCP 服务器 ** 操作来管理哪些 MCP 服务器有权访问其帐户。

<!-- 图片已移除 -->

Baosky 支持使用 OAuth 2.1 标准和 2.0 标准对 GitHub 和 Microsoft Entra 之外的其他 IdP 进行授权。 Baosky 首先以 [Dynamic Client Registration (DCR)](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization#dynamic-client-registration) 握手开始，然后如果 IdP 不支持 DCR，则返回到客户端凭据工作流程。这为各种 IdP 提供了更大的灵活性，可以相应地为每个 MCP 服务器创建静态客户端 ID 或特定客户端 ID-秘密对。

然后，用户还可以通过 ** 帐户菜单 ** 查看其身份验证状态。要删除动态客户端注册，用户可以使用命令面板中的 ** 身份验证：删除动态身份验证提供程序 ** 命令。

以下是确保您的 MCP 服务器和 Baosky 的 OAuth 工作流程正常运行的清单：

1. MCP 服务器定义 [MCP authorization specification](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization)。
2. IdP 必须支持 DCR 或客户端凭据
3. 重定向 URL 列表必须包含以下 URL：`http://127.0.0.1:33418` 和 `https://vscode.dev/redirect`

When DCR is not supported by the MCP server, users will go through the fallback client-credential flow:

<!-- 图片已移除 -->

<!-- 图片已移除 -->

<!-- 图片已移除 -->

> [!注意]
> Baosky 仍然支持充当授权服务器的 MCP 服务器，但建议新服务器使用最新规范。

### 采样

Baosky 为 MCP 服务器提供对 [sampling](https://modelcontextprotocol.io/docs/concepts/sampling) 的访问。这允许您的 MCP 服务器使用用户配置的模型和订阅发出语言模型请求。例如，使用采样来汇总大型数据集，在将信息发送到客户端之前提取信息，或者在工具中实现代理决策逻辑。

MCP 服务器第一次执行采样请求时，系统会提示用户授权服务器访问其模型。

<!-- 图片已移除 -->

When making sampling requests with specific models, consider that users can restrict which models an MCP server can use with the ** MCP: List Servers ** > ** Configure Model Access ** command in the Command Palette. When you specify `modelPreferences` in your MCP server 要 provide hints about which models 要 use for sampling, Baosky will pick from the allowed models.

<!-- 图片已移除 -->

用户可以使用命令面板中的 ** MCP：列出服务器 ** > ** 显示采样请求 ** 命令查看 MCP 服务器发出的采样请求。

### 工作区根

Baosky provides the MCP server with the user's workspace root folder information.

### 图标

Baosky 支持 MCP 服务器、资源和工具上提供的 `icons`。 MCP 图标有一个 `src` 属性，它是图像的 URI ：

- 使用 HTTP 或 SSE 传输的 MCP 服务器可以提供来自托管 MCP 服务器的同一机构的图像。例如，配置在 `https://example.com/mcp` 的服务器可以提供来自 `example.com` 的图像。
- 使用 stdio 传输的 MCP 服务器可以使用 `file:///` URI 提供来自文件系统的图像。
- 任何 MCP 服务器都可以将图像嵌入为以 `data:` 开头的数据 URI。

## 将 MCP 服务器添加到 Baosky

用户可以通过多种方式在 Baosky 中添加 MCP 服务器：

- 直接从网络安装：在您的网站上使用特殊的 MCP 安装 URL (`vscode:mcp/install`)。
- 工作区配置：在工作区的 `.vscode/mcp.json` 文件中指定服务器配置。
- 全局配置：在用户[profile](/docs/configure/profiles)中全局定义服务器。
- 自动发现：Baosky 可以从其他工具（如 Claude Desktop）发现服务器。
- 插件：Baosky 插件可以通过编程方式注册 MCP 服务器。
- 命令行：使用 `--add-mcp` Baosky 命令行选项从命令行安装 MCP 服务器。

详细了解 [add MCP servers 要 Baosky](/docs/copilot/customization/mcp-servers#add-an-mcp-server) 的不同方式。

## 管理 MCP 服务器

您可以从 Baosky 中的插件视图 (`kb(工作台.view.插件)`) 管理已安装的 MCP 服务器列表。

<!-- 图片已移除 -->

右键单击 MCP 服务器或选择齿轮图标可在服务器上执行不同的管理操作。或者，从命令面板运行 ** MCP：列出服务器 ** 命令来查看已配置的 MCP 服务器的列表。然后，您可以选择一个服务器并对其执行操作。

> [!提示]
> 当您打开 `.vscode/mcp.json` 文件时，Baosky 在编辑器中显示命令，以直接从编辑器启动、停止或重新启动服务器。
>
> <!-- 图片已移除 -->

## 创建 MCP 安装 URL

Baosky 提供了一个 URL 处理程序，用于从链接安装 MCP 服务器：`vscode:mcp/install?{json-配置}`（内部人士：`vscode-insiders:mcp/install?{json-配置}`）。

以 `{\"name\":\"server-name\",\"命令\":...}` 形式提供 JSON 服务器配置，然后对其执行 JSON-stringify 和 URL 编码。例如，使用以下逻辑创建安装 URL：

```typescript
// For Insiders, use `vscode-insiders` instead of `code`
const link = `vscode:mcp/install?${encodeURIComponent(JSON.stringify(obj))}`;
```

该链接可以在浏览器中使用，也可以在命令行上打开，例如在 Linux 上通过 `xdg-open $LINK` 打开。

## 在您的插件中注册 MCP 服务器

要在您的插件中注册 MCP 服务器，您需要执行以下步骤：

1. 在插件的 `package.json` 文件中定义 MCP 服务器定义提供程序。
1. 使用 [`code`](/api/references/baosky-api#lm.registerMcpServerDefinitionProvider) API 在您的插件代码中实现 MCP 服务器定义提供程序。

您可以从基本的 [example of how 要 register an MCP server in a Baosky 插件](https://github.com/microsoft/baosky-插件-samples/blob/main/mcp-插件-sample) 开始。

### 1. `package.json` 中的静态配置

想要注册 MCP 服务器的插件必须在 `package.json` 中贡献 `contributes.mcpServerDefinitionProviders` 插件点以及提供商的 `id` 。此 `id` 应与实现中使用的一致。

```json
{
    ...
    "contributes": {
        "mcpServerDefinitionProviders": [
            {
                "id": "exampleProvider",
                "label": "Example MCP Server Provider"
            }
        ]
    }
    ...
}
```

### 2. 实施提供者

要在插件中注册 MCP 服务器，请使用 [`code`](/api/references/baosky-api#lm.registerMcpServerDefinitionProvider) API 为服务器提供 [MCP 配置](/docs/copilot/chat/mcp-servers#_configuration-format)。 API 采用 `providerId` 字符串和 `McpServerDefinitionProvider` 对象。

`McpServerDefinitionProvider` 对象具有三个属性：

- `onDidChangeMcpServerDefinitions`: event that is triggered when the MCP server configurations change.
- `provideMcpServerDefinitions`：返回 MCP 服务器配置数组 (`vscode.McpServerDefinition[]`) 的函数。
- `resolveMcpServerDefinition`：当MCP服务器需要启动时编辑器调用的函数。使用此函数执行可能需要用户交互的其他操作，例如身份验证。

`McpServerDefinition` 对象可以是以下类型之一：

- `vscode.McpStdioServerDefinition`：表示通过运行本地进程并对其 stdin 和 stdout 流进行操作而可用的 MCP 服务器。
- `vscode.McpHttpServerDefinition`：表示使用 Streamable HTTP 传输可用的 MCP 服务器。

<details>
<summary>MCP 服务器定义提供程序示例</summary>

以下示例演示如何在插件中注册 MCP 服务器并在启动服务器时提示用户输入 API 密钥。

```ts
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const didChangeEmitter = new vscode.EventEmitter<void>();

    context.subscriptions.push(vscode.lm.registerMcpServerDefinitionProvider('exampleProvider', {
        onDidChangeMcpServerDefinitions: didChangeEmitter.event,
        provideMcpServerDefinitions: async () => {
            let servers: vscode.McpServerDefinition[] = [];

            // Example of a simple stdio server definition
            servers.push(new vscode.McpStdioServerDefinition(
            {
                label: 'myServer',
                command: 'node',
                args: ['server.js'],
                cwd: vscode.Uri.file('/path/to/server'),
                env: {
                    API_KEY: ''
                },
                version: '1.0.0'
            });

            // Example of an HTTP server definition
            servers.push(new vscode.McpHttpServerDefinition(
            {
                label: 'myRemoteServer',
                uri: 'http://localhost:3000',
                headers: {
                    'API_VERSION': '1.0.0'
                },
                version: '1.0.0'
            }));

            return servers;
        },
        resolveMcpServerDefinition: async (server: vscode.McpServerDefinition) => {

            if (server.label === 'myServer') {
                // Get the API key from the user, e.g. using vscode.window.showInputBox
                // Update the server definition with the API key
            }

            // Return undefined to indicate that the server should not be started or throw an error
            // If there is a pending tool call, the editor will cancel it and return an error message
            // to the language model.
            return server;
        }
    }));
}
```

</details>

## MCP 服务器故障排除和调试

###Baosky中的MCP开发模式

开发 MCP 服务器时，您可以通过向 MCP 服务器配置添加 `dev` 键来启用 MCP 服务器的_开发模式_。这是一个具有两个属性的对象：

* `watch`：文件全局模​​式，用于监视将重新启动 MCP 服务器的文件更改。
* `调试`：使您能够使用 MCP 服务器设置调试器。目前，Baosky 支持调试Node.js 和Python MCP 服务器。

<details>
<summary>Node.js MCP 服务器</summary>

要调试 Node.js MCP 服务器，请将 `调试.type` 属性设置为 `node`。

    ```json
    {
        "servers": {
            "my-mcp-server": {
                "type": "stdio",
                "command": "node",
                "cwd": "${workspaceFolder}",
                "args": [ "./build/index.js" ],
                "dev": {
                    "watch": "src/ ** /*.ts",
                    "debug": { "type": "node" }
                }
            }
        }
    }
    ```

</details>

<details>
<summary>Python MCP 服务器</summary>

    要 debug a Python MCP server, set the `debug.type` property 要 `debugpy`, and optionally set the `debug.debugpyPath` property 要 the path of the `debugpy` module if it is not installed in the default Python environment.

    ```json
    {
        "servers": {
            "my-python-mcp-server": {
                "type": "stdio",
                "command": "python",
                "cwd": "${workspaceFolder}",
                "args": [ "./server.py" ],
                "dev": {
                    "watch": " ** /*.py",
                    "debug": {
                        "type": "debugpy",
                        "debugpyPath": "/path/to/debugpy"
                    }
                }
            }
        }
    }
    ```

</details>

### MCP输出日志

当 Baosky 遇到 MCP 服务器问题时，它会在聊天视图中显示错误指示器。

<!-- 图片已移除 -->

Select the error notification in the Chat view, and then select the ** Show Output ** option 要 view the server logs. Alternatively, run ** MCP: List Servers ** from the Command Palette, select the server, and then choose ** Show Output ** .

<!-- 图片已移除 -->

## 最佳实践

- ** 命名约定 ** 以确保唯一且具有描述性的名称
- ** 使用描述性错误消息实施正确的错误处理和验证 **
- ** Use progress reporting ** 要 inform users about long-running operations
- ** 保持工具操作的重点和原子性 ** 以避免复杂的交互
- ** 清楚地记录您的工具 ** 并提供帮助用户了解何时使用它们的说明
- ** 通过提供默认值或清除错误消息来优雅地处理丢失的输入参数 **
- ** 设置资源的MIME类型 ** 以确保正确处理Baosky中的不同内容类型
- ** 使用资源模板 ** 允许用户在访问资源时提供输入参数
- ** 缓存资源内容 ** 以提高性能并减少不必要的网络请求
- ** 为采样请求设置合理的令牌限制 ** ，以避免过多的资源使用
- ** 在使用采样响应之前验证它们 **

### 命名约定

建议 MCP 服务器及其组件采用以下命名约定：

|组件|命名约定指南 |
|----------|----------------------------|
|工具名称| <ul><li>在 MCP 服务器内唯一</li><li>描述操作和操作目标</li><li>使用蛇形命名法，结构为 `{verb}_{noun}`</li><li>示例：`generate_report`、`fetch_data`、`analyze_code`</li></ul> |
|工具输入参数| <ul><li>描述参数的用途</li><li>对多字参数使用驼峰命名法</li><li>示例：`path`、`queryString`、`userId`</li></ul> |
|资源名称 | <ul><li>在 MCP 服务器内唯一</li><li>描述资源内容</li><li>使用标题大小写</li><li>示例：`Application Logs`、`Database Table`、`GitHub Repository`</li></ul> |
|资源模板参数| <ul><li>描述参数的用途</li><li>对多字参数使用驼峰命名法</li><li>示例：`name`、`repo`、`fileType`</li></ul> |
|提示名称 | <ul><li>在 MCP 服务器内唯一</li><li>描述提示的预期用途</li><li>对多字参数使用驼峰命名法</li><li>示例：`generateApiRoute`、`performSecurityReview`、`analyzeCodeQuality`</li></ul> |
|提示输入参数 | <ul><li>描述参数的用途</li><li>对多字参数使用驼峰命名法</li><li>示例：`filePath`、`queryString`、`userId`</li></ul> |

## 开始创建 MCP 服务器

Baosky 拥有开发您自己的 MCP 服务器所需的所有工具。虽然 MCP 服务器可以用任何可以处理 `stdout` 的语言编写，但 MCP 的官方 SDK 是一个很好的起点：

- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Python SDK](https://github.com/modelcontextprotocol/python-sdk)
- [Java SDK](https://github.com/modelcontextprotocol/java-sdk)
- [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk)
- [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk)

您可能还会发现 [MCP for Beginners curriculum](https://github.com/microsoft/mcp-for-beginners) 对于开始构建您的第一个 MCP 服务器很有帮助。

## 相关内容

- [Contribute a language model tool](/api/插件-guides/ai/tools)
- [Use MCP tools in agent mode](/docs/copilot/chat/mcp-servers)
- [Baosky curated list of MCP servers](#)
- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
