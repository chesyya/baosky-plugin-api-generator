---
# DO NOT TOUCH — Managed by doc writer
ContentId: bea1d4c5-71e5-4b27-ac1e-fa9b59886dab
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: 本教程将指导您使用聊天 API 在 Baosky 中创建 GitHub Copilot 聊天参与者。
---

# 教程:使用聊天 API 构建代码教程聊天参与者

在本教程中,您将学习如何创建与 GitHub Copilot 聊天体验集成的 Baosky 插件。您将使用聊天插件 API 来贡献聊天参与者。您的参与者将是一个代码导师,可以提供编程概念的解释和示例练习。

## 前提条件

您需要以下工具和帐户来完成本教程:

- [Baosky](#)
- [GitHub Copilot](#)
- [Node.js](https://nodejs.org/en/download/)

## 步骤 1: 设置您的项目

首先,使用 Yeoman 和 Baosky 插件生成器生成插件项目。

```bash
npx --package yo --package generator-code -- yo code
```

选择以下选项以完成设置:

```bash
# ? What type of extension do you want to create? New Extension (TypeScript)
# ? What's the name of your extension? Code Tutor

### Press <Enter> to choose default for all options below ###

# ? What's the identifier of your extension? code-tutor
# ? What's the description of your extension? LEAVE BLANK
# ? Initialize a git repository? Yes
# ? Bundle the source code with webpack? No
# ? Which package manager to use? npm

# ? Do you want to open the new folder with Baosky? Open with `code`
```

一旦生成了插件项目,您将在两个文件中工作:`插件.ts` 和 `package.json`,您可以在[插件结构文档](/api/get-started/插件-anatomy#插件-file-structure)中了解更多信息。作为快速概述:

- `插件.ts` 是插件的主入口点,包含聊天参与者的逻辑。
- `package.json` 包含插件的元数据,例如参与者的名称和描述。

删除 `插件.ts` 中 `activate()` 方法中自动生成的代码。这是您将放置聊天参与者逻辑的地方。

## 步骤 2: 注册聊天参与者

在 `package.json` 文件中,将自动生成的 `contributes` 部分替换为以下内容:

```json
"contributes":{
    "chatParticipants": [
    {
        "id": "chat-tutorial.code-tutor",
        "fullName": "Code Tutor",
        "name": "tutor",
        "description": "What can I teach you?",
        "isSticky": true
    }
    ]
}
```

此代码注册了一个具有以下属性的聊天参与者:

- 唯一 ID `chat-tutorial.code-tutor`,将在代码中引用
- 完整名称 `Code Tutor`,将显示在参与者响应的标题区域中
- 名称 `tutor`,将用于在聊天视图中引用聊天参与者为 `@tutor`
- 描述 "What can I teach you?",将作为占位符文本显示在聊天输入字段中

最后,设置 `isSticky: true` 将在用户开始与参与者交互后自动在聊天输入字段中添加参与者名称前缀。

## 步骤 3: 制作提示

现在参与者已注册,您可以开始实现代码导师的逻辑。在 `插件.ts` 文件中,您将为请求定义一个提示。

制作一个好的提示是从参与者获得最佳响应的关键。查看[这篇文章](https://platform.openai.com/docs/guides/prompt-engineering)以获取提示工程技巧。

您的代码导师应该通过引导学生理解概念而不是提供直接答案来模拟真实世界的导师。此外,导师应该专注于主题,并避免回答非编程问题。

考虑以下两个提示。哪个更有可能给出指定的行为?

1. > You are a helpful code tutor. Your job is to teach the user with simple descriptions and sample code of the concept.
2. > You are a helpful code tutor. Your job is to teach the user with simple descriptions and sample code of the concept. Respond with a guided overview of the concept in a series of messages. Do not give the user the answer directly, but guide them to find the answer themselves. If the user asks a non-programming question, politely decline to respond.

第二个提示更具体,并为参与者提供了如何响应的明确方向。在 `插件.ts` 文件中添加此提示。

```ts
const BASE_PROMPT = 'You are a helpful code tutor. Your job is to teach the user with simple descriptions and sample code of the concept. Respond with a guided overview of the concept in a series of messages. Do not give the user the answer directly, but guide them to find the answer themselves. If the user asks a non-programming question, politely decline to respond.';
```

## 步骤 4: 实现请求处理程序

现在已选择了提示,您需要实现请求处理程序。这将处理用户的聊天请求。您将定义请求处理程序,执行处理请求的逻辑,并向用户返回响应。

首先,定义处理程序:

```ts
// define a chat handler
const handler: vscode.ChatRequestHandler = async (request: vscode.ChatRequest, context: vscode.ChatContext, stream: vscode.ChatResponseStream, token: vscode.CancellationToken) => {

    return;
}
```

在此处理程序的主体中,初始化提示和一个包含提示的 `messages` 数组。然后,发送用户在聊天框中输入的内容。您可以通过 `request.prompt` 访问此内容。

使用 `request.model.sendRequest` 发送请求,这将使用当前选定的模型发送请求。最后,将响应流式传输给用户。

```ts
// define a chat handler
const handler: vscode.ChatRequestHandler = async (request: vscode.ChatRequest, context: vscode.ChatContext, stream: vscode.ChatResponseStream, token: vscode.CancellationToken) => {

    // initialize the prompt
    let prompt = BASE_PROMPT;

    // initialize the messages array with the prompt
    const messages = [
        vscode.LanguageModelChatMessage.User(prompt),
    ];

    // add in the user's message
    messages.push(vscode.LanguageModelChatMessage.User(request.prompt));

    // send the request
    const chatResponse = await request.model.sendRequest(messages, {}, token);

    // stream the response
    for await (const fragment of chatResponse.text) {
        stream.markdown(fragment);
    }

    return;
};
```

## 步骤 5: 创建聊天参与者

一旦实现了处理程序,最后一步是使用聊天插件 API 中的 `createChatParticipant` 方法创建聊天参与者。确保使用您在 `package.json` 中使用的相同 ID。

您应该通过为其添加图标来进一步自定义您的参与者。这将在与参与者交互时显示在聊天视图中。

```ts
// define a chat handler
const handler: vscode.ChatRequestHandler = async (request: vscode.ChatRequest, context: vscode.ChatContext, stream: vscode.ChatResponseStream, token: vscode.CancellationToken) => {

    // initialize the prompt
    let prompt = BASE_PROMPT;

    // initialize the messages array with the prompt
    const messages = [
        vscode.LanguageModelChatMessage.User(prompt),
    ];

    // add in the user's message
    messages.push(vscode.LanguageModelChatMessage.User(request.prompt));

    // send the request
    const chatResponse = await request.model.sendRequest(messages, {}, token);

    // stream the response
    for await (const fragment of chatResponse.text) {
        stream.markdown(fragment);
    }

    return;
};

// create participant
const tutor = vscode.chat.createChatParticipant("chat-tutorial.code-tutor", handler);

// add icon to participant
tutor.iconPath = vscode.Uri.joinPath(context.extensionUri, 'tutor.jpeg');
```

## 步骤 6: 运行代码

您现在已准备好尝试您的聊天参与者!
按 `kbstyle(F5)` 运行代码。将打开一个新的 Baosky 窗口,其中包含您的聊天参与者。

在 Copilot 聊天窗格中,您现在可以通过输入 `@tutor` 来调用您的参与者!

<!-- 图片已移除 -->

通过输入您想要学习的内容进行测试。您应该会看到一个响应,为您提供概念的概述!

如果您输入相关消息以继续对话,您会注意到参与者没有根据您的对话给出后续响应。这是因为我们当前的参与者仅发送用户的当前消息,而不是参与者消息历史记录。

在下面的屏幕截图中,导师正确地响应了堆栈的起始解释。但是,在后续中,它不理解用户正在继续对话以查看 Python 中堆栈的实现,因此它给出了关于 Python 的通用响应。

<!-- 图片已移除 -->

## 步骤 7: 添加消息历史记录以获得更多上下文

Copilot 聊天的最大价值之一是能够在多条消息上进行迭代以获得最佳响应。为此,您希望将参与者的消息历史记录发送到聊天请求。您可以通过 `context.history` 访问此内容。

您需要检索该历史记录并将其添加到 `messages` 数组中。您需要在添加 `request.prompt` 之前执行此操作。

```ts
// define a chat handler
const handler: vscode.ChatRequestHandler = async (request: vscode.ChatRequest, context: vscode.ChatContext, stream: vscode.ChatResponseStream, token: vscode.CancellationToken) => {

    // initialize the prompt
    let prompt = BASE_PROMPT;

    // initialize the messages array with the prompt
    const messages = [
        vscode.LanguageModelChatMessage.User(prompt),
    ];

    // get all the previous participant messages
    const previousMessages = context.history.filter(
        (h) => h instanceof vscode.ChatResponseTurn
    );

    // add the previous messages to the messages array
    previousMessages.forEach((m) => {
        let fullMessage = '';
        m.response.forEach((r) => {
            const mdPart = r as vscode.ChatResponseMarkdownPart;
            fullMessage += mdPart.value.value;
        });
        messages.push(vscode.LanguageModelChatMessage.Assistant(fullMessage));
    });

    // add in the user's message
    messages.push(vscode.LanguageModelChatMessage.User(request.prompt));

    // send the request
    const chatResponse = await request.model.sendRequest(messages, {}, token);

    // stream the response
    for await (const fragment of chatResponse.text) {
        stream.markdown(fragment);
    }

    return;
};
```

现在当您运行代码时,您可以与参与者进行对话,并包含所有先前消息的上下文!在下面的屏幕截图中,参与者正确地理解用户正在请求查看 Python 中堆栈的实现。

<!-- 图片已移除 -->

## 步骤 8: 添加命令

现在已实现基本参与者,您可以通过添加命令来扩展它。命令是常见用户意图的速记符号,由 `/` 符号表示。然后插件可以使用命令相应地提示语言模型。

添加一个命令以提示您的导师为概念提供练习题会很棒。您需要在 `package.json` 文件中注册该命令并在 `插件.ts` 中实现逻辑。您可以将命令命名为 `exercise`,以便可以通过输入 `/exercise` 来调用它。

在 `package.json` 中,将 `commands` 属性添加到 `chatParticipants` 属性。在这里,您将指定命令的名称和快速描述:

```json
"contributes": {
    "chatParticipants": [
      {
        "id": "chat-tutorial.code-tutor",
        "fullName": "Code Tutor",
        "name": "tutor",
        "description": "What can I teach you?",
        "isSticky": true,
        "commands": [
          {
            "name": "exercise",
            "description": "Provide exercises to practice a concept."
          }
        ]
      }
    ]
  },
```

要实现从导师获取示例练习的逻辑,最简单的方法是更改您发送到请求的提示。创建一个新提示 `EXERCISES_PROMPT`,要求参与者返回示例练习。以下是其外观的示例:

```ts
const EXERCISES_PROMPT = 'You are a helpful tutor. Your job is to teach the user with fun, simple exercises that they can complete in the editor. Your exercises should start simple and get more complex as the user progresses. Move one concept at a time, and do not move on to the next concept until the user provides the correct answer. Give hints in your exercises to help the user learn. If the user is stuck, you can provide the answer and explain why it is the answer. If the user asks a non-programming question, politely decline to respond.';
```

在请求处理程序中,您需要添加逻辑以检测用户是否引用了命令。您可以通过 `request.command` 属性执行此操作。

如果引用了命令,请将提示更新为新创建的 `EXERCISES_PROMPT`

```ts
// define a chat handler
const handler: vscode.ChatRequestHandler = async (request: vscode.ChatRequest, context: vscode.ChatContext, stream: vscode.ChatResponseStream, token: vscode.CancellationToken) => {

    // initialize the prompt
    let prompt = BASE_PROMPT;

    if (request.command === 'exercise') {
        prompt = EXERCISES_PROMPT;
    }

    // initialize the messages array with the prompt
    const messages = [
        vscode.LanguageModelChatMessage.User(prompt),
    ];

    // get all the previous participant messages
    const previousMessages = context.history.filter(
        (h) => h instanceof vscode.ChatResponseTurn
    );

    // add the previous messages to the messages array
    previousMessages.forEach((m) => {
        let fullMessage = '';
        m.response.forEach((r) => {
            const mdPart = r as vscode.ChatResponseMarkdownPart;
            fullMessage += mdPart.value.value;
        });
        messages.push(vscode.LanguageModelChatMessage.Assistant(fullMessage));
    });

    // add in the user's message
    messages.push(vscode.LanguageModelChatMessage.User(request.prompt));

    // send the request
    const chatResponse = await request.model.sendRequest(messages, {}, token);

    // stream the response
    for await (const fragment of chatResponse.text) {
        stream.markdown(fragment);
    }

    return;
};
```

这就是所需添加的全部内容!获取消息历史记录、发送请求和流式传输请求的其余逻辑都保持不变。

现在您可以输入 `/exercise`,这将调出您的聊天参与者,您可以获得交互式练习来练习编码!

<!-- 图片已移除 -->

## 后续步骤

恭喜!您已成功创建了一个可以提供编程概念解释和示例练习的聊天参与者。您可以通过微调提示、添加更多斜杠命令或利用其他 API(如[语言模型 API](/api/插件-guides/ai/language-model))来进一步扩展您的参与者。准备好后,您还可以将插件发布到 [Baosky Marketplace](#)。

您可以在 [vscode-插件-sample 存储库](https://github.com/microsoft/vscode-插件-samples/tree/main/chat-tutorial)中找到本教程的完整源代码。

## 相关内容

- [聊天 API 插件指南](/api/插件-guides/ai/chat)
- [教程:使用语言模型 API 生成 AI 驱动的代码注释](/api/插件-guides/ai/language-model-tutorial)
- [语言模型 API 插件指南](/api/插件-guides/ai/language-model)
