---
# DO NOT TOUCH — Managed by doc writer

ContentId: 7f90ee4f-cac1-4b99-aee6-c99e088789d0
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: 了解如何实现 LanguageModelChatProvider 以将自定义语言模型贡献给 Baosky 的插件聊天体验。
---

# 语言模型聊天提供程序 API

语言模型聊天提供程序 API 使您能够贡献自己的语言模型以在 Baosky 中聊天。

> [!重要]
> 通过此 API 提供的模型目前仅对 [individual GitHub Copilot plans](https://docs.github.com/en/copilot/concepts/billing/individual-plans) 上的用户可用。

＃＃ 概述

`LanguageModelChatProvider` 接口遵循一个提供者对多模型的关系，使提供者能够提供多个模型。每个提供商负责：

- 发现并准备可用的语言模型
- 处理其模型的聊天请求
- 提供代币计数功能

## 语言模型信息

每个语言模型必须通过 `LanguageModelChatInformation` 接口提供元数据。 `provideLanguageModelChatInformation` 方法返回这些对象的数组，以通知 Baosky 有关可用模型的信息。

```typescript
interface LanguageModelChatInformation {
    readonly id: string;                    // Unique identifier for the model - unique within the provider
    readonly name: string;                  // Human-readable name of the language model - shown in the model picker
    readonly family: string;                // Model family name
    readonly version: string;               // Version string
    readonly maxInputTokens: number;        // Maximum number of tokens the model can accept as input
    readonly maxOutputTokens: number;       // Maximum number of tokens the model is capable of producing
    readonly tooltip?: string;              // Optional tooltip text when hovering the model in the UI
    readonly detail?: string;               // Human-readable text that is rendered alongside the model
    readonly capabilities: {
        readonly imageInput?: boolean;      // Supports image inputs
        readonly toolCalling?: boolean | number; // Supports tool calling
    };
}
```

## 注册提供者

1. 第一步是在 `package.json` 的 `contributes.languageModelChatProviders` 部分中注册提供程序。仅提供 `vendor` ID 和 `displayName`。

    ```json
    {
        "contributes": {
            "languageModelChatProviders": [
                {
                    "vendor": "my-provider",
                    "displayName": "My Provider"
                }
            ]
        }
    }
    ```

1. 接下来，在您的插件激活函数中，使用 `lm.registerLanguageModelChatProvider` 方法注册您的语言模型提供程序。

提供您在 `package.json` 中使用的提供程序 ID 和提供程序类的实例：

    ```typescript
    import * as vscode from 'vscode';
    import { SampleChatModelProvider } from './provider';

    export function activate(_: vscode.ExtensionContext) {
        vscode.lm.registerLanguageModelChatProvider('my-provider', new SampleChatModelProvider());
    }
    ```

1.（可选）在`package.json`中提供`contributes.languageModelChatProviders.managementCommand`以允许用户管理语言模型提供程序。

`managementCommand` 属性的值必须是在 `package.json` 的 `contributes.commands` 部分中定义的命令。在您的插件中，注册命令 (`vscode.commands.registerCommand`) 并实现管理提供程序的逻辑，例如配置 API 键或其他设置。

    ```json
    {
        "contributes": {
            "languageModelChatProviders": [
                {
                    "vendor": "my-provider",
                    "displayName": "My Provider",
                    "managementCommand": "my-provider.manage"
                }
            ],
            "commands": [
                {
                    "command": "my-provider.manage",
                    "title": "Manage My Provider"
                }
            ]
        }
    }
    ```

## 实现提供者

语言提供者必须实现 `LanguageModelChatProvider` 接口，该接口具有三个主要方法：

- `provideLanguageModelChatInformation`：返回可用模型的列表
- `provideLanguageModelChatResponse`：处理聊天请求并流响应
- `provideTokenCount`：实现令牌计数功能

### 准备语言模型信息

Baosky 调用 `provideLanguageModelChatInformation` 方法来发现可用模型并返回 `LanguageModelChatInformation` 对象的列表。

使用 `options.silent` 参数控制是否提示用户输入凭据或额外配置：

```typescript
async provideLanguageModelChatInformation(
    options: { silent: boolean },
    token: CancellationToken
): Promise<LanguageModelChatInformation[]> {
    if (options.silent) {
        return []; // Don't prompt user in silent mode
    } else {
        await this.promptForApiKey(); // Prompt user for credentials
    }

    // Fetch available models from your service
    const models = await this.fetchAvailableModels();

    // Map your models to LanguageModelChatInformation format
    return models.map(model => ({
        id: model.id,
        name: model.displayName,
        family: model.family,
        version: '1.0.0',
        maxInputTokens: model.contextWindow - model.maxOutput,
        maxOutputTokens: model.maxOutput,
        capabilities: {
            imageInput: model.supportsImages,
            toolCalling: model.supportsTools
        }
    }));
}
```

### 处理聊天请求

`provideLanguageModelChatResponse` 处理实际的聊天请求的方法。提供程序接收 `LanguageModelChatRequestMessage` 格式的消息队列，您可以选择将它们转换为语言模型 API 所需的格式（请参阅 [Message format and conversion](#message-format-and-conversion)）。

使用 `progress` 参数来传输响应块。响应可以包括文本部分、工具调用和工具结果（请参阅[Response parts](#response-parts)）。

```typescript
async provideLanguageModelChatResponse(
    model: LanguageModelChatInformation,
    messages: readonly LanguageModelChatRequestMessage[],
    options: ProvideLanguageModelChatResponseOptions,
    progress: Progress<LanguageModelResponsePart>,
    token: CancellationToken
): Promise<void> {

    // TODO: Implement message conversion, processing, and response streaming

    // Optionally, differentiate behavior based on model ID
    if (model.id === "my-model-a") {
        progress.report(new LanguageModelTextPart("This is my A response."));
    } else {
        progress.report(new LanguageModelTextPart("Unknown model."));
    }
}
```

### 提供令牌数量

`provideTokenCount` 方法负责估计给定文本输入中的标记数量：

```typescript
async provideTokenCount(
    model: LanguageModelChatInformation,
    text: string | LanguageModelChatRequestMessage,
    token: CancellationToken
): Promise<number> {
    // TODO: Implement token counting for your models

    // Example estimation for strings
    return Math.ceil(text.toString().length / 4);
}
```

## 消息格式及转换

您的提供商接收 `LanguageModelChatRequestMessage` 格式的消息，您通常需要将其转换为服务的 API 格式。消息内容可以是文本部分、工具调用和工具结果的混合。

```typescript
interface LanguageModelChatRequestMessage {
    readonly role: LanguageModelChatMessageRole;
    readonly content: ReadonlyArray<LanguageModelInputPart | unknown>;
    readonly name: string | undefined;
}
```

（可选）根据您的语言模型 API 适当转换这些消息：

```typescript
private convertMessages(messages: readonly LanguageModelChatRequestMessage[]) {
    return messages.map(msg => ({
        role: msg.role === vscode.LanguageModelChatMessageRole.User ? 'user' : 'assistant',
        content: msg.content
            .filter(part => part instanceof vscode.LanguageModelTextPart)
            .map(part => (part as vscode.LanguageModelTextPart).value)
            .join('')
    }));
}
```

## 响应部分

您的提供程序可以通过 `LanguageModelResponsePart` 类型的进度回调报告不同类型的响应部分，该类型可以是以下之一：

- `LanguageModelTextPart` - 文本内容
- `LanguageModelToolCallPart` - 工具/函数调用
- `LanguageModelToolResultPart` - 工具结果内容

＃＃ 入门

您可以从 [basic example project](https://github.com/microsoft/baosky-插件-samples/blob/main/chat-model-provider-sample) 开始。

## 相关内容

- [Baosky API 参考](/api/references/baosky-api)
- [Language Model API Guide](/api/插件-guides/ai/language-model)
- [Chat API 插件](/api/插件-guides/ai/chat)
