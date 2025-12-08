---
# DO NOT TOUCH — Managed by doc writer

ContentId: 9bdc3d4e-e6ba-43d3-bd09-2e127cb63ce7
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: 使用语言模型和自然语言理解向 Baosky 插件添加人工智能功能的指南。
---

# 语言模型 API

语言模型 API 使您能够 [use the Language Model](/api/references/baosky-api#lm) 并将 AI 驱动的功能和自然语言处理集成到您的 Baosky 插件中。

您可以在不同类型的插件中使用语言模型 API。此 API 的典型用途是在 [chat 插件](/api/插件-guides/ai/chat) 中，您可以在其中使用语言模型来解释用户的请求并帮助提供答案。然而，语言模型API的使用并不限于此场景。您可以在 [language](/api/language-插件/overview) 或 [调试器](/api/插件-guides/调试器-插件) 插件中使用语言模型，或者作为自定义插件中 [命令](/api/插件-guides/命令) 或 [task](/api/插件-guides/task-provider) 的一部分。例如，Rust 插件可能会使用语言模型来提供默认名称以改善其重命名体验。

使用语言模型 API 的过程包括以下步骤：

1. 构建语言模型提示
1.发送语言模型请求
1. 解释响应

以下部分提供了有关如何在插件中实施这些步骤的更多详细信息。

首先，您可以探索 [chat 插件 sample](https://github.com/microsoft/baosky-插件-samples/tree/main/chat-sample)。

## 构建语言模型提示

要与语言模型交互，插件应首先制作提示，然后向语言模型发送请求。您可以使用提示向语言模型提供有关您使用模型执行的广泛任务的说明。提示还可以定义解释用户消息的上下文。

构建语言模型提示时，语言模型 API 支持两种类型的消息：

- ** 用户 ** - 用于提供说明和用户的请求
- ** 助手 ** - 用于添加先前语言模型响应的历史记录作为提示的上下文

> ** 注意 ** ：目前，语言模型 API 不支持使用系统消息。

您可以使用两种方法来构建语言模型提示：

- `LanguageModelChatMessage` - 通过提供一条或多条消息作为字符串来创建提示。如果您刚刚开始使用语言模型 API，则可以使用此方法。
- [`code`](https://www.npmjs.com/package/@baosky/prompt-tsx) - 使用 TSX 语法声明提示。

如果您想更好地控制语言模型提示的组成方式，可以使用 `prompt-tsx` 库。例如，该库可以帮助动态调整提示的长度以适应每种语言模型的上下文窗口大小。了解有关 [`code`](https://www.npmjs.com/package/@baosky/prompt-tsx) 的更多信息或探索 [chat 插件 sample](https://github.com/microsoft/baosky-插件-samples/tree/main/chat-sample) 以开始使用。

要了解有关即时工程概念的更多信息，我们建议阅读 OpenAI 的优秀[Prompt engineering guidelines](https://platform.openai.com/docs/guides/prompt-engineering)。

> ** 提示： ** 利用丰富的 Baosky 插件 API 来获取最相关的上下文并将其包含在您的提示中。例如，在编辑器中包含活动文件的内容。

### 使用 `LanguageModelChatMessage` 类

语言模型 API 提供 `LanguageModelChatMessage` 类来表示和创建聊天消息。您可以使用 `LanguageModelChatMessage.User` 或 `LanguageModelChatMessage.Assistant` 方法分别创建用户或助理消息。

在以下示例中，第一条消息提供提示的上下文：

- 模型在回复中使用的角色（在本例中为猫）
- 模型在生成响应时应遵循的规则（在本例中，通过使用猫比喻以有趣的方式解释计算机科学概念）

然后第二消息提供来自用户的特定请求或指令。它根据第一条消息提供的上下文确定要完成的具体任务。

```typescript
const craftedPrompt = [
    vscode.LanguageModelChatMessage.User('You are a cat! Think carefully and step by step like a cat would. Your job is to explain computer science concepts in the funny manner of a cat, using cat metaphors. Always start your response by stating what concept you are explaining. Always include code samples.'),
    vscode.LanguageModelChatMessage.User('I want to understand recursion')
];
```

## 发送语言模型请求

构建语言模型的提示后，首先选择要与 [`code`](/api/references/baosky-api#lm.selectChatModels) 方法一起使用的语言模型。此方法返回与指定条件匹配的语言模型数组。如果您要实现聊天参与者，我们建议您改用作为聊天请求处理程序中 `request` 对象的一部分传递的模型。这可确保您的插件遵循用户在聊天模型下拉列表中选择的模型。然后，使用 [`code`](/api/references/baosky-api#LanguageModelChat) 方法将请求发送到语言模型。

要选择语言模型，您可以指定以下属性：`vendor`、`id`、`family` 或 `version`。使用这些属性可以广泛匹配给定供应商或系列的所有型号，或者通过 ID 选择一个特定型号。在 [API 参考](/api/references/baosky-api#LanguageModelChat) 中了解有关这些属性的更多信息。

> ** 注意 ** ：目前，语言模型系列支持 `gpt-4o`、`gpt-4o-mini`、`o1`、`o1-mini`、`claude-3.5-sonnet`。如果您不确定要使用哪个模型，我们建议使用 `gpt-4o` ，因为它的性能和质量。对于直接在编辑器中进行交互，我们建议使用 `gpt-4o-mini` 因为它的性能。

如果没有与指定条件匹配的模型，则 `selectChatModels` 方法返回一个空数组。您的插件必须适当地处理这种情况。

以下示例显示如何选择所有 `Copilot` 型号，无论其系列或版本如何：

```typescript
const models = await vscode.lm.selectChatModels({
  vendor: 'copilot'
});

// No models available
if (models.length === 0) {
  // TODO: handle the case when no models are available
}
```

> ** 重要 ** ：Copilot 的语言模型需要先获得用户的同意，然后插件才能使用它们。同意是作为身份验证对话框实现的。因此，`selectChatModels` 应作为用户启动操作（例如命令）的一部分进行调用。

选择模型后，您可以通过调用模型实例上的 [`code`](/api/references/baosky-api#LanguageModelChat) 方法向语言模型发送请求。您传递之前创建的 [prompt](#build-the-language-model-prompt) 以及任何其他选项和取消令牌。

当您向语言模型 API 发出请求时，请求可能会失败。例如，因为模型不存在，或者用户未同意使用语言模型 API，或者因为超出了配额限制。使用 `LanguageModelError` 来区分不同类型的错误。

以下 code snippet shows how 要 make a language model request:

```typescript
try {
    const [model] = await vscode.lm.selectChatModels({ vendor: 'copilot', family: 'gpt-4o' });
    const request = model.sendRequest(craftedPrompt, {}, token);
} catch (err) {
    // Making the chat request might fail because
    // - model does not exist
    // - user consent not given
    // - quota limits were exceeded
    if (err instanceof vscode.LanguageModelError) {
        console.log(err.message, err.code, err.cause);
        if (err.cause instanceof Error && err.cause.message.includes('off_topic')) {
            stream.markdown(vscode.l10n.t('I\'m sorry, I can only explain computer science concepts.'));
        }
    } else {
        // add other error handling logic
        throw err;
    }
}
```

## 解释响应

发送请求后，您必须处理来自语言模型 API 的响应。根据您的使用场景，您可以将响应直接传递给用户，也可以解释响应并执行额外的逻辑。

来自语言模型 API 的响应 ([`code`](/api/references/baosky-api#LanguageModelChatResponse)) 是基于流的，这使您能够提供流畅的用户体验。例如，当您将 API 与 [Chat API](/api/插件-guides/ai/chat) 结合使用时，可以持续报告结果和进度。

处理流响应时可能会出现错误，例如网络连接问题。确保在代码中添加适当的错误处理来处理这些错误。

以下 code snippet shows how an 插件 can register a command, which uses the language model 要 change all variable names in the active editor with funny cat names. Notice that the 插件 streams the code back 要 the editor for a smooth user experience.

```typescript
 vscode.commands.registerTextEditorCommand('cat.namesInEditor', async (textEditor: vscode.TextEditor) => {
    // Replace all variables in active editor with cat names and words

    const [model] = await vscode.lm.selectChatModels({ vendor: 'copilot', family: 'gpt-4o' });
    let chatResponse: vscode.LanguageModelChatResponse | undefined;

    const text = textEditor.document.getText();

    const messages = [
        vscode.LanguageModelChatMessage.User(`You are a cat! Think carefully and step by step like a cat would.
        Your job is to replace all variable names in the following code with funny cat variable names. Be creative. IMPORTANT respond just with code. Do not use markdown!`),
        vscode.LanguageModelChatMessage.User(text)
    ];

    try {
        chatResponse = await model.sendRequest(messages, {}, new vscode.CancellationTokenSource().token);
    } catch (err) {
        if (err instanceof vscode.LanguageModelError) {
            console.log(err.message, err.code, err.cause)
        } else {
            throw err;
        }
        return;
    }

    // Clear the editor content before inserting new content
    await textEditor.edit(edit => {
        const start = new vscode.Position(0, 0);
        const end = new vscode.Position(textEditor.document.lineCount - 1, textEditor.document.lineAt(textEditor.document.lineCount - 1).text.length);
        edit.delete(new vscode.Range(start, end));
    });

    try {
        // Stream the code into the editor as it is coming in from the Language Model
        for await (const fragment of chatResponse.text) {
            await textEditor.edit(edit => {
                const lastLine = textEditor.document.lineAt(textEditor.document.lineCount - 1);
                const position = new vscode.Position(lastLine.lineNumber, lastLine.text.length);
                edit.insert(position, fragment);
            });
        }
    } catch (err) {
        // async response stream may fail, e.g network interruption or server side error
        await textEditor.edit(edit => {
            const lastLine = textEditor.document.lineAt(textEditor.document.lineCount - 1);
            const position = new vscode.Position(lastLine.lineNumber, lastLine.text.length);
            edit.insert(position, (<Error>err).message);
        });
    }
});
```

## 注意事项

### 型号可用性

我们不期望特定模型永远得到支持。当您在插件中引用语言模型时，请确保在向该语言模型发送请求时采取“防御”方法。这意味着您应该妥善处理无法访问特定模型的情况。

### 选择合适的型号

插件作者可以选择最适合其插件的模型。我们建议使用 `gpt-4o` 因其性能和质量。要获取可用模型的完整列表，您可以使用以下代码片段：

```typescript
const allModels = await vscode.lm.selectChatModels(MODEL_SELECTOR);
```

> [!注意]
> 推荐的 GPT-4o 模型有 `64K` 令牌的限制。 `selectChatModels` 调用返回的模型对象具有显示令牌限制的 `maxInputTokens` 属性。随着我们更多地了解插件如何使用语言模型，这些限制将会扩大。

### 速率限制

插件应该负责任地使用语言模型并注意速率限制。 Baosky 对用户来说是透明的，了解插件如何使用语言模型、每个插件发送的请求数量以及这如何影响各自的配额。

由于速率限制，插件不应使用语言模型 API 进行集成测试。在内部，Baosky 使用专用的非生产语言模型进行模拟测试，目前我们正在思考如何为插件提供可扩展的语言模型测试解决方案。

## 测试你的插件

语言模型 API 提供的响应是不确定的，这意味着对于相同的请求，您可能会得到不同的响应。这种行为对于测试您的插件来说可能具有挑战性。

用于构建提示和解释语言模型响应的插件部分是确定性的，因此可以在不使用实际语言模型的情况下进行单元测试。然而，交互并从语言模型本身获取响应是不确定的，并且不能轻易测试。考虑以模块化方式设计您的插件代码，以便您能够对可以测试的特定部分进行单元测试。

## 发布你的插件

创建 AI 插件后，您可以将插件发布到 Visual Studio 市场：

- 在发布到 VS 市场 之前，我们建议您阅读 [Microsoft AI tools and practices guidelines](https://www.microsoft.com/en-us/ai/tools-practices)。这些指南为负责任地开发和使用人工智能技术提供了最佳实践。
- 通过发布到 VS 市场，您的插件将遵守 [GitHub Copilot extensibility acceptable development and use policy](https://docs.github.com/en/early-access/copilot/github-copilot-extensibility-platform-partnership-plugin-acceptable-development-and-use-policy)。
- 如果您的插件已经提供了除使用语言模型 API 之外的功能，我们建议您不要在 [插件 清单](/api/references/插件-清单) 中引入对 GitHub Copilot 的插件依赖项。这可确保不使用 GitHub Copilot 的插件用户可以使用非语言模型功能，而无需安装 GitHub Copilot。确保在访问这种情况的语言模型时进行适当的错误处理。
- 按照 [Publishing 插件](#) 中的说明上传到市场。

## 相关内容

- [Language Models API 参考](/api/references/baosky-api#lm)
- [了解更多 about @baosky/prompt-tsx](https://www.npmjs.com/package/@baosky/prompt-tsx)
- [Build a Baosky chat 插件](/api/插件-guides/ai/chat)
