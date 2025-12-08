---
# DO NOT TOUCH — Managed by doc writer

ContentId: aa6d312f-cbac-4633-8579-64d3cb4d17be
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: 创建语言模型工具以及如何在聊天插件中实现工具调用的指南
---

# 语言模型工具 API

语言模型工具使您能够在聊天中扩展大型语言模型 (LLM) 的功能，并具有特定于域的功能。为了处理用户的聊天提示，Baosky 中的 [agent mode](/docs/copilot/chat/chat-agent-mode) 可以自动调用这些工具来执行专门的任务作为对话的一部分。

通过在 Baosky 插件中提供语言模型工具，您可以扩展代理编码工作流程，同时还提供与编辑器的深度集成。 插件工具是 Baosky 中提供的三种工具之一，另外还有 [built-in tools and MCP tools](/docs/copilot/chat/chat-tools.md#types-of-tools)。

在本插件指南中，您将了解如何使用语言模型工具 API 创建语言模型工具以及如何在聊天插件中实现工具调用。

您还可以通过贡献 [MCP server](/api/插件-guides/ai/mcp) 使用专用工具扩展聊天体验。有关不同选项以及如何决定使用哪种方法的详细信息，请参阅[AI Extensibility 概述](/api/插件-guides/ai/ai-extensibility-概述)。

> [!提示]
> 有关作为最终用户使用工具的信息，请参阅[Use tools in chat](/docs/copilot/chat/chat-tools.md)。

## LLM 中的工具调用是什么？

语言模型工具是可以作为语言模型请求的一部分调用的函数。例如，您可能有一个从数据库检索信息、执行某些计算或调用在线 API 的函数。当您在 Baosky 插件中贡献一个工具时，代理模式可以根据对话的上下文调用该工具。

LLM 实际上从不执行工具本身，而是生成用于调用工具的参数。清楚地描述该工具的用途、功能和输入参数非常重要，以便可以在正确的上下文中调用该工具。

下图展示了Baosky中代理模式下的工具调用流程。有关所涉及的具体步骤的详细信息，请参阅[Tool-calling flow](#tool-calling-flow)。

<!-- 图片已移除 -->

在 OpenAI 文档中阅读有关 [function calling](https://platform.openai.com/docs/guides/function-calling) 的更多信息。

## 为什么要在你的插件中实现语言模型工具？

在插件中实现语言模型工具有几个好处：

- ** 使用专门的、特定于域的工具扩展代理模式 ** ，这些工具会作为响应用户提示的一部分自动调用。例如，启用数据库支架和查询以动态为法学硕士提供相关上下文。
- ** 通过使用广泛的插件 API 与 Baosky ** 深度集成。例如，使用 [调试 APIs](/api/插件-guides/调试器-插件) 获取当前调试上下文并将其用作工具功能的一部分。
- 通过 Visual Studio 市场 ** 分发和部署 ** 工具，为用户提供可靠、无缝的体验。用户不需要为您的工具单独安装和更新过程。

在以下场景中，您可以考虑使用 [MCP server](/api/插件-guides/ai/mcp) 实现语言模型工具：

- 您已经有一个 MCP 服务器实现，并且还想在 Baosky 中使用它。
- 您希望在不同的开发环境和平台上重用相同的工具。
- 您的工具作为服务远程托管。
- 您不需要访问Baosky API。

了解有关 [differences between tool types](/docs/copilot/chat/chat-tools.md#types-of-tools) 的更多信息。

## 创建语言模型工具

实现语言模型工具由两个主要部分组成：

1. 在插件的 `package.json` 文件中定义工具的配置。
1. 使用 [Language Model API 参考](/api/references/baosky-api#lm) 在您的插件代码中实现该工具

您可以从 [basic example project](https://github.com/microsoft/baosky-插件-samples/tree/main/chat-sample) 开始。

### 1. `package.json` 中的静态配置

在插件中定义语言模型工具的第一步是在插件的 `package.json` 文件中定义它。此配置包括工具名称、描述、输入架构和其他元数据：

1. 在插件的 `package.json` 文件的 `contributes.languageModelTools` 部分中为您的工具添加一个条目。

1. 为该工具指定一个唯一的名称：

|物业 |描述 |
    | -------- | ----------- |
| __代码_0__ |工具的唯一名称，用于在插件实现代码中引用该工具。按照 `{verb}_{noun}` 格式设置名称格式。请参阅[naming guidelines](#guidelines-and-conventions)。 |
| __代码_0__ |工具的用户友好名称，用于在 UI 中显示。 |

1. 如果该工具可以在 [agent mode](/docs/copilot/chat/chat-agent-mode) 中使用或在聊天提示中通过 `#` 引用，请添加以下属性：

用户可以在聊天视图中启用或禁用该工具，类似于 [Model Context Protocol (MCP) tools](/docs/copilot/chat/chat-tools.md#mcp-tools) 的操作方式。

|物业 |描述 |
    | -------- | ----------- |
| __代码_0__ |如果该工具可以在 [agent mode](/docs/copilot/chat/chat-agent-mode) 中使用或在聊天中引用，则设置为 `true`。 |
| __代码_0__ |用户通过 `#` 在聊天提示中引用该工具的名称。 |
| __代码_0__ | UI 中显示的工具图标。 |
| __代码_0__ |工具的用户友好描述，用于在 UI 中显示。 |

1. 在`modelDescription`中添加详细描述。法学硕士使用此信息来确定您的工具应在哪种情况下使用。

- 该工具到底有什么作用？
- 它返回什么样的信息？
- 什么时候应该使用，什么时候不应该使用？
- 描述该工具的重要限制或限制。

1. 如果工具采用输入参数，请添加描述工具输入参数的 `inputSchema` 属性。

此 JSON 架构描述了一个对象，该对象具有该工具作为输入的属性以及它们是否是必需的。文件路径应该是绝对路径。

    Describe what each parameter does and how it relates 要 the tool's functionality.

1. 添加 `when` 子句来控制该工具何时可用。

`languageModelTools` 贡献点可让您限制工具何时可用于代理模式或可以使用 [when clause](/api/references/when-clause-contexts) 在提示中引用。例如，获取调试调用堆栈信息的工具应该仅在用户调试时可用。

    ```json
    "contributes": {
        "languageModelTools": [
            {
                "name": "chat-tools-sample_tabCount",
                ...
                "when": "debugState == 'running'"
            }
        ]
    }
    ```

<details>
<summary>工具定义示例</summary>

以下示例演示如何定义一个工具来计算选项卡组中活动选项卡的数量。

```json
"contributes": {
    "languageModelTools": [
        {
            "name": "chat-tools-sample_tabCount",
            "tags": [
                "editors",
                "chat-tools-sample"
            ],
            "toolReferenceName": "tabCount",
            "displayName": "Tab Count",
            "modelDescription": "The number of active tabs in a tab group in Baosky.",
            "userDescription": "Count the number of active tabs in a tab group.",
            "canBeReferencedInPrompt": true,
            "icon": "$(files)",
            "inputSchema": {
                "type": "object",
                "properties": {
                    "tabGroup": {
                        "type": "number",
                        "description": "The index of the tab group to check. This is optional- if not specified, the active tab group will be checked.",
                        "default": 0
                    }
                }
            }
        }
    ]
}
```

</details>

### 2.工具实现

使用 [Language Model API](/api/references/baosky-api#lm) 实现语言模型工具。这包括以下步骤：

1. 激活插件后，使用 [`code`](/api/references/baosky-api#lm.registerTool) 注册该工具。

提供您在 `package.json` 的 `name` 属性中指定的工具名称。

如果您希望该工具对您的插件是私有的，请跳过工具注册步骤。

    ```ts
    export function registerChatTools(context: vscode.ExtensionContext) {
        context.subscriptions.push(vscode.lm.registerTool('chat-tools-sample_tabCount', new TabCountTool()));
    }
    ```

1. 创建一个实现 [`code`](/api/references/baosky-api#LanguageModelTool&lt;T&gt;) 接口的类。

1. 在`prepareInvocation`方法中添加工具确认消息。

对于来自插件的工具，将始终显示通用确认对话框，但该工具可以自定义确认消息。为用户提供足够的上下文以了解该工具正在做什么。该消息可以是包含代码块的 `MarkdownString`。

以下示例显示如何为选项卡计数工具提供确认消息。

    ```ts
    async prepareInvocation(
        options: vscode.LanguageModelToolInvocationPrepareOptions<ITabCountParameters>,
        _token: vscode.CancellationToken
    ) {
        const confirmationMessages = {
            title: 'Count the number of open tabs',
            message: new vscode.MarkdownString(
                `Count the number of open tabs?` +
                (options.input.tabGroup !== undefined
                    ? ` in tab group ${options.input.tabGroup}`
                    : '')
            ),
        };

        return {
            invocationMessage: 'Counting the number of tabs',
            confirmationMessages,
        };
    }
    ```

如果 `prepareInvocation` 返回 `undefined`，将显示通用确认消息。请注意，用户还可以选择“始终允许”某个工具。

1. 定义一个描述工具输入参数的接口。

该接口用于 `vscode.LanguageModelTool` 类的 `invoke` 方法。输入参数根据您在 `package.json` 的 `inputSchema` 中定义的 JSON 架构进行验证。

以下示例显示了选项卡计数工具的界面。

    ```ts
    export interface ITabCountParameters {
        tabGroup?: number;
    }
    ```

1. 实现`invoke`方法。当处理聊天提示时调用语言模型工具时，会调用此方法。

`invoke` 方法接收 `options` 参数中的工具输入参数。这些参数根据 `package.json` 中的 `inputSchema` 中定义的 JSON 架构进行验证。

当发生错误时，抛出一个错误并包含一条对 LLM 有意义的消息。 （可选）提供有关 LLM 接下来应执行的操作的说明，例如使用不同的参数重试，或执行不同的操作。

以下示例显示了选项卡计数工具的实现。该工具的结果是 `vscode.LanguageModelToolResult` 类型的实例。

    ```ts
    async invoke(
        options: vscode.LanguageModelToolInvocationOptions<ITabCountParameters>,
        _token: vscode.CancellationToken
    ) {
        const params = options.input;
        if (typeof params.tabGroup === 'number') {
            const group = vscode.window.tabGroups.all[Math.max(params.tabGroup - 1, 0)];
            const nth =
                params.tabGroup === 1
                    ? '1st'
                    : params.tabGroup === 2
                        ? '2nd'
                        : params.tabGroup === 3
                            ? '3rd'
                            : `${params.tabGroup}th`;
            return new vscode.LanguageModelToolResult([new vscode.LanguageModelTextPart(`There are ${group.tabs.length} tabs open in the ${nth} tab group.`)]);
        } else {
            const group = vscode.window.tabGroups.activeTabGroup;
            return new vscode.LanguageModelToolResult([new vscode.LanguageModelTextPart(`There are ${group.tabs.length} tabs open.`)]);
        }
    }
    ```

在 Baosky 插件示例存储库中查看实现 [language model tool](https://github.com/microsoft/baosky-插件-samples/blob/main/chat-sample/src/tools.ts) 的完整源代码。

## 工具调用流程

当用户发送聊天提示时，会发生以下步骤：

1. Copilot 根据用户的配置确定可用工具的列表。

工具列表由内置工具、插件注册的工具以及[MCP servers](/docs/copilot/chat/mcp-servers) 中的工具组成。您可以通过插件或 MCP 服务器为代理模式做出贡献（图中以绿色显示）。

1. Copilot 将请求发送给 LLM，并向其提供提示、聊天上下文以及要考虑的工具定义列表。

LLM 生成响应，其中可能包括一个或多个调用工具的请求。

1. 如果需要，Copilot 使用法学硕士提供的参数值调用建议的工具。

工具响应可能会导致更多的工具调用请求。

1. 如果出现错误或后续工具请求，Copilot 会迭代工具调用流程，直到解决所有工具请求。

1. Copilot 将最终响应返回给用户，其中可能包括来自多个工具的响应。

## 准则和约定

- ** 命名 ** ：为工具和参数编写清晰且具有描述性的名称。

- ** 工具名称 ** ：应该是唯一的，并清楚地描述其意图。以 `{verb}_{noun}` 格式构建工具名称。例如，`get_weather`、`get_azure_deployment` 或 `get_terminal_output`。

- ** 参数名称 ** ：应描述参数的用途。以 `{noun}` 格式构建参数名称。例如，`destination_location`、`ticker` 或 `file_name`。

- ** 描述 ** ：编写工具和参数的详细描述。

- 描述该工具的用途以及何时应该使用和不应该使用该工具。例如，“此工具检索给定位置的天气。”
- 描述每个参数的作用以及它与工具功能的关系。例如，“`destination_location` 参数指定要检索天气的位置。它应该是有效的位置名称或坐标。”
- 描述该工具的重要限制或限制。例如，“此工具仅检索美国境内位置的天气数据。它可能不适用于其他地区。”

- ** 用户确认 ** ：为工具调用提供确认消息。对于来自插件的工具，将始终显示通用确认对话框，但该工具可以自定义确认消息。为用户提供足够的上下文以了解该工具正在做什么。

- ** 错误处理 ** ：发生错误时，抛出错误并提供对 LLM 有意义的消息。 （可选）提供有关 LLM 接下来应执行的操作的说明，例如使用不同的参数重试，或执行不同的操作。

在 [OpenAI documentation](https://platform.openai.com/docs/guides/function-calling?api-mode=chat#best-practices-for-defining-functions) 和 [Anthropic documentation](https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview) 中获取更多创建工具的最佳实践。

## 相关内容

- [Language Model API 参考](/api/references/baosky-api#lm)
- [Register an MCP server in a Baosky 插件](/api/插件-guides/ai/mcp)
- [Use MCP tools in agent mode](/docs/copilot/chat/mcp-servers)
