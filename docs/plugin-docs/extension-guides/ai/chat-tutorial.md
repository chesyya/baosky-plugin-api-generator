---
# DO NOT TOUCH — Managed by doc writer

ContentId: bea1d4c5-71e5-4b27-ac1e-fa9b59886dab
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: 教程将引导您使用聊天 API 在 Baosky 中创建 _GitHub Copilot 聊天参与者。
---

# 教程：使用 Chat API 构建代码教程聊天参与者

在本教程中，你将学习如何创建一个与 GitHub Copilot Chat 体验集成的 Baosky 插件。你将使用 Chat 插件 API 来贡献一个聊天参与者。你的参与者将是一个代码导师，可以为编程概念提供解释和示例练习。

## 先决条件

完成本教程需要以下工具和账户：

- [Baosky](#)
- [GitHub Copilot](#)
- [Node.js](https://nodejs.org/en/download/)

## 步骤 1：设置项目

首先，使用 Yeoman 和 Baosky 插件生成器生成插件项目。

```bash
npx --package yo --package generator-code -- yo code
```

选择以下选项以完成设置：

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

一旦生成插件项目，你将在两个文件中工作：`插件.ts` 和 `package.json`，你可以在[插件解剖文档](/api/get-started/插件-anatomy#插件-file-structure)中了解更多信息。快速概述如下：

- `插件.ts` 是插件的主入口点，包含聊天参与者的逻辑。
- `package.json` 包含插件的元数据，例如参与者的名称和描述。

删除 `插件.ts` `activate()` 方法中的自动生成代码。这是你将放置聊天参与者逻辑的地方。

## 步骤 2：注册聊天参与者

在 `package.json` 文件中，将自动生成的 `contributes` 部分替换为以下内容：

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

此代码注册了一个具有以下属性的聊天参与者：

- 唯一ID `chat-tutorial.code-tutor`，将在代码中引用
- 全名 `Code Tutor`，将显示在参与者响应的标题区域
- 名称 `tutor`，将用于在聊天视图中以 `@tutor` 引用聊天参与者
- 描述 "What can I teach you?"，将在聊天输入字段中显示为占位符文本

最后，设置 `isSticky: true` 将在用户开始与参与者交互后自动在聊天输入字段中添加参与者名称前缀。

## 步骤 3：制作提示

现在参与者已注册，你可以开始实现代码导师的逻辑。在 `插件.ts` 文件中，你将为请求定义一个提示。

制作一个好的提示是从参与者那里获得最佳响应的关键。查看[这篇文章](https://platform.openai.com/docs/guides/prompt-engineering)获取提示工程的技巧。

你的代码导师应该模拟真实世界的导师，引导学生理解概念，而不是提供直接答案。此外，导师应该保持专注于主题，避免回答非编程问题。

考虑以下两个提示。哪一个更可能给出指定的行为？

1. > 你是一位乐于助人的代码导师。您的工作是通过概念的简单描述和示例代码来教导用户。
2. > 你是一位乐于助人的代码导师。您的工作是通过概念的简单描述和示例代码来教导用户。通过一系列消息中的概念指导概述进行回应。不要直接给用户答案，而是引导他们自己寻找答案。如果用户提出非编程问题，请礼貌地拒绝回复。

第二个提示更具体，为参与者提供了如何响应的明确方向。在 `插件.ts` 文件中添加此提示。

```ts
const BASE_PROMPT = 'You are a helpful code tutor. Your job is to teach the user with simple descriptions and sample code of the concept. Respond with a guided overview of the concept in a series of messages. Do not give the user the answer directly, but guide them to find the answer themselves. If the user asks a non-programming question, politely decline to respond.';
```

## 步骤 4：实现请求处理程序

现在提示已选择，你需要实现请求处理程序。这是将处理用户聊天请求的内容。你将定义请求处理程序，执行处理请求的逻辑，并向用户返回响应。

首先，定义处理程序：

```ts
// define a chat handler
const handler: vscode.ChatRequestHandler = async (request: vscode.ChatRequest, context: vscode.ChatContext, stream: vscode.ChatResponseStream, token: vscode.CancellationToken) => {

    return;
}
```

在此处理程序的主体中，初始化提示和一个带有提示的 `messages` 数组。然后，发送用户在聊天框中输入的内容。你可以通过 `request.prompt` 访问它。

使用 `request.model.sendRequest` 发送请求，这将使用当前选定的模型发送请求。最后，将响应流式传输给用户。

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

## 步骤 5：创建聊天参与者

一旦实现了处理程序，最后一步是使用 Chat 插件 API 中的 `createChatParticipant` 方法创建聊天参与者。确保使用你在 `package.json` 中使用的相同 ID。

你应该通过为其添加图标来进一步自定义参与者。这将在与参与者交互时显示在聊天视图中。

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

## 步骤 6：运行代码

你现在已准备好试用聊天参与者！
按 `kbstyle(F5)` 运行代码。将打开一个新的 Baosky 窗口，其中包含你的聊天参与者。

在 Copilot Chat 窗格中，你现在可以通过输入 `@tutor` 来调用你的参与者！

<!-- 图片已移除 -->

通过输入你想了解的内容来测试它。你应该会看到一个响应，为你提供概念的概述！

如果你输入相关消息以继续对话，你会注意到参与者不会根据你的对话提供后续响应。这是因为我们当前的参与者只发送用户的当前消息，而不是参与者消息历史记录。

在下面的屏幕截图中，导师正确地响应了关于栈的起始解释。然而，在后续中，它不理解用户正在继续对话以查看 Python 中栈的实现，因此它给出了关于 Python 的通用响应。

<!-- 图片已移除 -->

## 步骤 7：添加消息历史记录以获取更多上下文

Copilot Chat 的最大价值之一是能够迭代多条消息以获得最佳响应。为此，您需要将参与者的消息历史记录发送到聊天请求。您可以通过 `context.history` 访问它。

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

现在，当您运行代码时，您可以与参与者进行对话，并了解之前消息的所有上下文！在下面的屏幕截图中，参与者正确理解用户正在请求查看 Python 中堆栈的实现。

<!-- 图片已移除 -->

## 步骤8：添加命令

现在基本参与者已经实现，您可以通过添加命令来扩展它。命令是常见用户意图的简写符号，由 `/` 符号表示。然后插件可以使用该命令来相应地提示语言模型。

如果添加一个命令来提示您的导师对某个概念进行练习，那就太好了。您需要在 `package.json` 文件中注册命令并在 `插件.ts` 中实现逻辑。您可以将命令命名为 `exercise`，以便可以通过键入 `/exercise` 来调用它。

在 `package.json` 中，将 `commands` 属性添加到 `chatParticipants` 属性中。在这里，您将指定命令的名称和快速描述：

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

要实现从导师处获取示例练习的逻辑，最简单的方法是更改​​发送到请求的提示。创建一个新提示 `EXERCISES_PROMPT`，要求参与者返回示例练习。下面是一个示例：

```ts
const EXERCISES_PROMPT = 'You are a helpful tutor. Your job is to teach the user with fun, simple exercises that they can complete in the editor. Your exercises should start simple and get more complex as the user progresses. Move one concept at a time, and do not move on to the next concept until the user provides the correct answer. Give hints in your exercises to help the user learn. If the user is stuck, you can provide the answer and explain why it is the answer. If the user asks a non-programming question, politely decline to respond.';
```

然后，您需要在请求处理程序中添加逻辑来检测用户是否引用了该命令。您可以通过 `request.命令` 属性来执行此操作。

如果引用该命令，则将提示更新为新创建的`EXERCISES_PROMPT`

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

这就是需要添加的全部内容！获取消息历史记录、发送请求和流式传输请求的其余逻辑都保持不变。

现在您可以输入 `/exercise`，这将调出您的聊天参与者，您可以获得交互式练习来练习编码！

<!-- 图片已移除 -->

## 后续步骤

恭喜！您已成功创建一个聊天参与者，可以为编程概念提供解释和示例练习。您可以通过微调提示、添加更多斜线命令或利用其他 API（如 [Language Model API](/api/插件-guides/ai/language-model)）来进一步扩展您的参与者。准备好后，您还可以将插件发布到 [Baosky 市场](#)。

您可以在 [baosky-插件-sample repository](https://github.com/microsoft/baosky-插件-samples/tree/main/chat-tutorial) 中找到本教程的完整源代码。

## 相关内容

- [Chat API 插件 guide](/api/插件-guides/ai/chat)
- [Tutorial: Generate AI-powered code annotations by using the Language Model API](/api/插件-guides/ai/language-model-tutorial)
- [Language Model API 插件 guide](/api/插件-guides/ai/language-model)
