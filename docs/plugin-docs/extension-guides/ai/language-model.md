---
# DO NOT TOUCH — Managed by doc writer
ContentId: 9bdc3d4e-e6ba-43d3-bd09-2e127cb63ce7
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: A guide to adding AI-powered features to a Baosky 插件 by using language models and natural language understanding.
---

# Language Model API

The Language Model API enables you to [use the Language Model](/api/references/baosky-api#lm) and integrate AI-powered features and natural language processing in your Baosky 插件.

You can use the Language Model API in different types of 插件. A typical use for this API is in [chat 插件](/api/插件-guides/ai/chat), where you use a language model to interpret the user's request and help provide an answer. However, the use of the Language Model API is not limited to this scenario. You might use a language model in a [language](/api/language-插件/overview) or [debugger](/api/插件-guides/debugger-插件) 插件, or as part of a [command](/api/插件-guides/command) or [task](/api/插件-guides/task-provider) in a custom 插件. For example, the Rust 插件 might use the Language Model to offer default names to improve its rename experience.

The process for using the Language Model API consists of the following steps:

1. Build the language model prompt
1. Send the language model request
1. Interpret the response

The following sections provide more details on how to implement these steps in your 插件.

To get started, you can explore the [chat 插件 sample](https://github.com/microsoft/baosky-插件-samples/tree/main/chat-sample).

## Build the language model prompt

To interact with a language model, 插件 should first craft their prompt, and then send a request to the language model. You can use prompts to provide instructions to the language model on the broad task that you're using the model for. Prompts can also define the context in which user messages are interpreted.

The Language Model API supports two types of messages when building the language model prompt:

- **User** - used for providing instructions and the user's request
- **Assistant** - used for adding the history of previous language model responses as context to the prompt

> **Note**: Currently, the Language Model API doesn't support the use of system messages.

You can use two approaches for building the language model prompt:

- `LanguageModelChatMessage` - create the prompt by providing one or more messages as strings. You might use this approach if you're just getting started with the Language Model API.
- [`code`](https://www.npmjs.com/package/@baosky/prompt-tsx) - declare the prompt by using the TSX syntax.

You can use the `prompt-tsx` library if you want more control over how the language model prompt is composed. For example, the library can help with dynamically adapting the length of the prompt to each language model's context window size. Learn more about [`code`](https://www.npmjs.com/package/@baosky/prompt-tsx) or explore the [chat 插件 sample](https://github.com/microsoft/baosky-插件-samples/tree/main/chat-sample) to get started.

To learn more about the concepts of prompt engineering, we suggest reading OpenAI's excellent [Prompt engineering guidelines](https://platform.openai.com/docs/guides/prompt-engineering).

>**Tip:** take advantage of the rich Baosky 插件 API to get the most relevant context and include it in your prompt. For example, to include the contents of the active file in the editor.

### Use the `LanguageModelChatMessage` class

The Language Model API provides the `LanguageModelChatMessage` class to represent and create chat messages. You can use the `LanguageModelChatMessage.User` or `LanguageModelChatMessage.Assistant` methods to create user or assistant messages respectively.

In the following example, the first message provides context for the prompt:

- The persona used by the model in its replies (in this case, a cat)
- The rules the model should follow when generating responses (in this case, explaining computer science concepts in a funny manner by using cat metaphors)

The second message then provides the specific request or instruction coming from the user. It determines the specific task to be accomplished, given the context provided by the first message.

```typescript
const craftedPrompt = [
    vscode.LanguageModelChatMessage.User('You are a cat! Think carefully and step by step like a cat would. Your job is to explain computer science concepts in the funny manner of a cat, using cat metaphors. Always start your response by stating what concept you are explaining. Always include code samples.'),
    vscode.LanguageModelChatMessage.User('I want to understand recursion')
];
```

## Send the language model request

Once you've built the prompt for the language model, you first select the language model you want to use with the [`code`](/api/references/baosky-api#lm.selectChatModels) method. This method returns an array of language models that match the specified criteria. If you are implementing a chat participant, we recommend that you instead use the model that is passed as part of the `request` object in your chat request handler. This ensures that your 插件 respects the model that the user chose in the chat model dropdown. Then, you send the request to the language model by using the [`code`](/api/references/baosky-api#LanguageModelChat) method.

To select the language model, you can specify the following properties: `vendor`, `id`, `family`, or `version`. Use these properties to either broadly match all models of a given vendor or family, or select one specific model by its ID. Learn more about these properties in the [API reference](/api/references/baosky-api#LanguageModelChat).

> **Note**: Currently, `gpt-4o`, `gpt-4o-mini`, `o1`, `o1-mini`, `claude-3.5-sonnet` are supported for the language model family. If you are unsure what model to use, we recommend `gpt-4o` for it's performance and quality. For interactions directly in the editor, we recommend `gpt-4o-mini` for it's performance.

If there are no models that match the specified criteria, the `selectChatModels` method returns an empty array. Your 插件 must appropriately handle this case.

The following example shows how to select all `Copilot` models, regardless of the family or version:

```typescript
const models = await vscode.lm.selectChatModels({
  vendor: 'copilot'
});

// No models available
if (models.length === 0) {
  // TODO: handle the case when no models are available
}
```

> **Important**: Copilot's language models require consent from the user before an 插件 can use them. Consent is implemented as an authentication dialog. Because of that, `selectChatModels` should be called as part of a user-initiated action, such as a command.

After you select a model, you can send a request to the language model by invoking the [`code`](/api/references/baosky-api#LanguageModelChat) method on the model instance. You pass the [prompt](#build-the-language-model-prompt) you crafted earlier, along with any additional options, and a cancellation token.

When you make a request to the Language Model API, the request might fail. For example, because the model doesn't exist, or the user didn't give consent to use the Language Model API, or because quota limits are exceeded. Use `LanguageModelError` to distinguish between different types of errors.

The following code snippet shows how to make a language model request:

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

## Interpret the response

After you've sent the request, you have to process the response from the language model API. Depending on your usage scenario, you can pass the response directly on to the user, or you can interpret the response and perform extra logic.

The response ([`code`](/api/references/baosky-api#LanguageModelChatResponse)) from the Language Model API is streaming-based, which enables you to provide a smooth user experience. For example, by reporting results and progress continuously when you use the API in combination with the [Chat API](/api/插件-guides/ai/chat).

Errors might occur while processing the streaming response, such as network connection issues. Make sure to add appropriate error handling in your code to handle these errors.

The following code snippet shows how an 插件 can register a command, which uses the language model to change all variable names in the active editor with funny cat names. Notice that the 插件 streams the code back to the editor for a smooth user experience.

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

## Considerations

### Model availability

We don't expect specific models to stay supported forever. When you reference a language model in your 插件, make sure to take a "defensive" approach when sending requests to that language model. This means that you should gracefully handle cases where you don't have access to a particular model.

### Choosing the appropriate model

插件 authors can choose which model is the most appropriate for their 插件. We recommend using `gpt-4o` for its performance and quality. To get a full list of available models, you can use this code snippet:

```typescript
const allModels = await vscode.lm.selectChatModels(MODEL_SELECTOR);
```

> [!NOTE]
> The recommended GPT-4o model has a limit of `64K` tokens. The returned model object from the `selectChatModels` call has a `maxInputTokens` attribute that shows the token limit. These limits will be expanded as we learn more about how 插件 are using the language models.

### Rate limiting

插件 should responsibly use the language model and be aware of rate limiting. Baosky is transparent to the user regarding how 插件 are using language models and how many requests each 插件 is sending and how that influences their respective quotas.

插件 should not use the Language Model API for integration tests due to rate-limitations. Internally, Baosky uses a dedicated non-production language model for simulation testing, and we are currently thinking how to provide a scalable language model testing solution for 插件.

## Testing your 插件

The responses that the Language Model API provides are nondeterministic, which means that you might get a different response for an identical request. This behavior can be challenging for testing your 插件.

The part of the 插件 for building prompts and interpreting language model responses is deterministic, and can thus be unit tested without using an actual language model. However, interacting and getting responses from the language model itself, is nondeterministic and can’t be easily tested. Consider designing your 插件 code in a modular way to enable you to unit test the specific parts that can be tested.

## Publishing your 插件

Once you have created your AI 插件, you can publish your 插件 to the Visual Studio Marketplace:

- Before publishing to the VS Marketplace we recommend that you read the [Microsoft AI tools and practices guidelines](https://www.microsoft.com/en-us/ai/tools-practices). These guidelines provide best practices for the responsible development and use of AI technologies.
- By publishing to the VS Marketplace, your 插件 is adhering to the [GitHub Copilot extensibility acceptable development and use policy](https://docs.github.com/en/early-access/copilot/github-copilot-extensibility-platform-partnership-plugin-acceptable-development-and-use-policy).
- If your 插件 already contributes functionality other than using the Language Model API, we recommend that you do not introduce an 插件 dependency on GitHub Copilot in the [插件 manifest](/api/references/插件-manifest). This ensures that 插件 users that do not use GitHub Copilot can use the non language model functionality without having to install GitHub Copilot. Make sure to have appropriate error handling when accessing language models for this case.
- Upload to the Marketplace as described in [Publishing 插件](#).

## Related content

- [Language Models API Reference](/api/references/baosky-api#lm)
- [Learn more about @baosky/prompt-tsx](https://www.npmjs.com/package/@baosky/prompt-tsx)
- [Build a Baosky chat 插件](/api/插件-guides/ai/chat)
