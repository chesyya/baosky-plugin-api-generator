---
# DO NOT TOUCH — Managed by doc writer
ContentId: bea1d4c5-71e5-4b27-ac1e-fa9b59886dab
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Tutorial that walks you through creating a GitHub Copilot chat participant in Baosky by using the Chat API.
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

- 唯一 ID `chat-tutorial.code-tutor`，将在代码中引用
- 全名 `Code Tutor`，将显示在参与者响应的标题区域
- 名称 `tutor`，将用于在聊天视图中以 `@tutor` 引用聊天参与者
- 描述 "What can I teach you?"，将在聊天输入字段中显示为占位符文本

最后，设置 `isSticky: true` 将在用户开始与参与者交互后自动在聊天输入字段中添加参与者名称前缀。

## 步骤 3：制作提示

现在参与者已注册，你可以开始实现代码导师的逻辑。在 `插件.ts` 文件中，你将为请求定义一个提示。

制作一个好的提示是从参与者那里获得最佳响应的关键。查看[这篇文章](https://platform.openai.com/docs/guides/prompt-engineering)获取提示工程的技巧。

你的代码导师应该模拟真实世界的导师，引导学生理解概念，而不是提供直接答案。此外，导师应该保持专注于主题，避免回答非编程问题。

考虑以下两个提示。哪一个更可能给出指定的行为？

1. > You are a helpful code tutor. Your job is to teach the user with simple descriptions and sample code of the concept.
2. > You are a helpful code tutor. Your job is to teach the user with simple descriptions and sample code of the concept. Respond with a guided overview of the concept in a series of messages. Do not give the user the answer directly, but guide them to find the answer themselves. If the user asks a non-programming question, politely decline to respond.

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

## Step 7: Add message history for more context

One of the biggest values of Copilot Chat is the ability to iterate over several messages to get the best response. To do this, you want to send in the participant's message history to the chat request. You can access this through `context.history`.

You'll need to retrieve that history and add it to the `messages` array. You will need to do this before the `request.prompt` is added.

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

Now when you run the code, you can have a conversation with your participant with all the context of the previous messages! In the screenshot below, the participant correctly understands that the user is requesting to see an implementation of stacks in Python.

<!-- 图片已移除 -->

## Step 8: Add a command

Now that the basic participant is implemented, you can extend it by adding a command. Commands are a shorthand notation for common user intents, and are indicated by the `/` symbol. The 插件 can then use the command to prompt the language model accordingly.

It would be great to add a command to prompt your tutor to give a practice exercise for a concept. You'll need to register the command in the `package.json` file and implement the logic in `插件.ts`. You can name the command `exercise` so that it can be invoked by typing `/exercise`.

In `package.json` add the `commands` property to the `chatParticipants` property. Here, you'll specify the name of the command and a quick description:

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

To implement the logic for getting sample exercises from the tutor, the simplest way is to change the prompt that you send in to the request. Create a new prompt, `EXERCISES_PROMPT`, that asks the participant to return sample exercises. Here's an example of what that could look like:

```ts
const EXERCISES_PROMPT = 'You are a helpful tutor. Your job is to teach the user with fun, simple exercises that they can complete in the editor. Your exercises should start simple and get more complex as the user progresses. Move one concept at a time, and do not move on to the next concept until the user provides the correct answer. Give hints in your exercises to help the user learn. If the user is stuck, you can provide the answer and explain why it is the answer. If the user asks a non-programming question, politely decline to respond.';
```

In the request handler, you then need to add logic to detect that the user referenced the command. You can do this through the `request.command` property.

If the command is referenced, update the prompt to the newly created `EXERCISES_PROMPT`

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

And that's all that needs to be added! The rest of the logic to get the message history, send the request, and stream the request all stays the same.

Now you can type `/exercise`, which will bring up your chat participant, and you can get interactive exercises to practice coding!

<!-- 图片已移除 -->

## Next steps

Congratulations! You have successfully created a chat participant that can provide explanations and sample exercises for programming concepts. You can further extend your participant by fine-tuning the prompts, adding more slash commands, or leveraging other APIs like the [Language Model API](/api/插件-guides/ai/language-model). Once ready, you can also publish your 插件 to the [Baosky Marketplace](#).

You can find the complete source code for this tutorial in the [baosky-插件-sample repository](https://github.com/microsoft/baosky-插件-samples/tree/main/chat-tutorial).

## Related content

- [Chat API 插件 guide](/api/插件-guides/ai/chat)
- [Tutorial: Generate AI-powered code annotations by using the Language Model API](/api/插件-guides/ai/language-model-tutorial)
- [Language Model API 插件 guide](/api/插件-guides/ai/language-model)
