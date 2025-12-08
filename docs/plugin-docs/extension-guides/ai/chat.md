---
# DO NOT TOUCH — Managed by doc writer

ContentId: ac3f00c8-78a8-408c-8af6-3e997a482972
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: 在 Baosky 中创建 AI 插件的指南
---

# 聊天参与者 API

聊天参与者是专业助理，使用户能够与特定领域的专家一起扩展 [chat in Baosky](/docs/copilot/chat/copilot-chat)。用户通过@提及来调用聊天参与者，然后参与者负责处理用户的自然语言提示。

在此插件指南中，您将了解如何使用聊天参与者 API 创建聊天参与者。

Baosky 有几个内置的聊天参与者，例如 `@vscode`、`@terminal` 或 `@工作区`。它们经过优化可以回答有关各自领域的问题。

聊天参与者与 [language model tools](/api/插件-guides/ai/tools) 不同，后者作为 LLM 的一部分调用，编排解决用户聊天提示所需的步骤。聊天参与者接收用户的提示并自行安排所需的任务。

## 为什么要在你的插件中实现聊天参与者？

在插件中实现聊天参与者有几个好处：

- ** 利用专业的、特定领域的知识和专业知识来扩展聊天 ** 。例如，内置 `@vscode` 参与者了解 Baosky 及其插件 APIs。
- 通过管理端到端用户聊天提示和响应来进行 ** 自己的对话 ** 。
- ** 通过使用广泛的插件 API 与 Baosky ** 深度集成。例如，使用 [调试 APIs](/api/插件-guides/调试器-插件) 获取当前调试上下文并将其用作工具功能的一部分。
- 通过 Visual Studio 市场 ** 分发和部署 ** 聊天参与者，为用户提供可靠且无缝的体验。用户不需要单独的安装和更新过程。

如果您希望提供可以作为自主、代理编码会话的一部分自动调用的特定于域的功能，您可以考虑实现 [language model tool](/api/插件-guides/ai/tools) 或 [MCP server](/api/插件-guides/ai/mcp)。有关不同选项以及如何决定使用哪种方法的详细信息，请参阅 [AI Extensibility 概述](/api/插件-guides/ai/ai-extensibility-概述)。

## 部分聊天用户体验

以下屏幕截图显示了示例插件的 Baosky 聊天体验中的不同聊天概念。

<!-- 图片已移除 -->

1. 使用 `@` 语法调用 `@cat` 聊天参与者
1.使用`/`语法调用`/teach`命令
1. 用户提供的查询，也称为用户提示
1. 图标和参与者 `fullName` 表明 Copilot 正在使用 `@cat` 聊天参与者
1. Markdown 响应，由 `@cat` 提供
1. markdown响应中包含的代码片段
1. `@cat` 响应中包含按钮，该按钮调用 Baosky 命令
1. 聊天参与者提供的建议[follow-up questions](#4-register-follow-up-requests)
1. 聊天输入字段，其中包含聊天参与者的 `description` 属性提供的占位符文本

## 创建聊天参与者

实现聊天参与者由以下部分组成：

1. 在插件的 `package.json` 文件中定义聊天参与者。
1. 实现一个请求处理程序来处理用户的聊天提示并返回响应。
1. （可选）实施聊天斜线命令，为用户提供常见任务的简写符号。
1.（可选）定义建议的后续问题。
1. （可选）实现参与者检测，其中 Baosky 自动将聊天请求路由到适当的聊天参与者，而无需用户明确提及。

您可以从 [basic example project](https://github.com/microsoft/baosky-插件-samples/tree/main/chat-sample) 开始。

<!-- 图片已移除 -->

### 1. 注册聊天参与者

创建聊天插件的第一步是将其注册到您的 `package.json` 中，并具有以下属性：

- `id`：聊天参与者的唯一标识符，如 `package.json` 文件中定义。
- `name`：聊天参与者的简称，用于聊天中的@提及。
- `fullName`：聊天参与者的全名，显示在响应的标题区域中。
- `description`：聊天参与者目的的简短描述，用作聊天输入字段中的占位符文本。
- `isSticky`：一个布尔值，指示聊天参与者在响应后是否持续留在聊天输入字段中。

```json
"contributes": {
        "chatParticipants": [
            {
                "id": "chat-sample.my-participant",
                "name": "my-participant",
                "fullName": "My Participant",
                "description": "What can I teach you?",
                "isSticky": true
            }
        ]
}
```

我们使用小写 `name` 并使用 `fullName` 建议的标题大小写，以与现有聊天参与者保持一致。获取有关 [naming conventions for chat participants](#chat-participant-naming-conventions) 的更多信息。

> [!注意]
> 部分参与者姓名已被保留。如果您使用此类保留名称，Baosky 将显示您的聊天参与者的完全限定名称（包括插件 ID）。

### 2. 实现请求处理程序

使用 [Chat Participant API](/api/references/baosky-api#chat) 实现聊天参与者。这包括以下步骤：

1.激活插件后，使用 `vscode.chat.createChatParticipant` 创建参与者。

提供您在 `package.json` 中定义的 ID，以及对您在下一步中实现的请求处理程序的引用。

    ```typescript
    export function activate(context: vscode.ExtensionContext) {

        // Register the chat participant and its request handler
        const cat = vscode.chat.createChatParticipant('chat-sample.my-participant', handler);

        // Optionally, set some properties for @cat
        cat.iconPath = vscode.Uri.joinPath(context.extensionUri, 'cat.jpeg');

        // Add the chat request handler here
    }
    ```

1. 在 `activate` 函数中，定义 `vscode.ChatRequestHandler` 请求处理程序。

请求处理程序负责处理Baosky聊天视图中用户的聊天请求。每次用户在聊天输入字段中输入提示时，都会调用聊天请求处理程序。

    ```typescript
    const handler: vscode.ChatRequestHandler = async (request: vscode.ChatRequest, context: vscode.ChatContext, stream: vscode.ChatResponseStream, token: vscode.CancellationToken): Promise<ICatChatResult> => {

        // Chat request handler implementation goes here

    };
    ```

1.从`vscode.ChatRequest`判断用户的意图。

要确定用户请求的意图，您可以引用 `vscode.ChatRequest` 参数来访问用户的提示文本、命令和聊天位置。

或者，您可以利用语言模型来确定用户的意图，而不是使用传统逻辑。作为 `request` 对象的一部分，您将获得用户在聊天模型下拉列表中选择的语言模型实例。了解如何在插件中使用 [Language Model API](/api/插件-guides/ai/language-model)。

下面的代码片段展示了首先使用命令，然后根据用户提示来确定用户意图的基本结构：

    ```typescript
    const handler: vscode.ChatRequestHandler = async (request: vscode.ChatRequest, context: vscode.ChatContext, stream: vscode.ChatResponseStream, token: vscode.CancellationToken): Promise<ICatChatResult> => {

        // Test for the `teach` command
        if (request.command == 'teach') {

            // Add logic here to handle the teaching scenario
            doTeaching(request.prompt, request.variables);

        } else {

            // Determine the user's intent
            const intent = determineUserIntent(request.prompt, request.variables, request.model);

            // Add logic here to handle other scenarios
        }
    };
    ```

1. 添加处理用户请求的逻辑。

通常，聊天插件使用 `request.model` 语言模型实例来处理请求。在这种情况下，您可以调整语言模型提示以匹配用户的意图。

或者，您可以通过调用后端服务、使用传统编程逻辑或使用所有这些选项的组合来实现插件逻辑。例如，您可以调用 Web 搜索来收集其他信息，然后将其作为上下文提供给语言模型。

在处理当前请求时，您可能需要参考以前的聊天消息。例如，如果先前的响应返回 C# 代码片段，则用户当前的请求可能是“给出 Python 代码”。 [Learn how 您可以 use the chat message history](#use-the-chat-message-history)。

如果要根据聊天输入的位置（聊天视图、快速聊天、内联聊天）以不同方式处理请求，可以使用 `vscode.ChatRequest` 的 `location` 属性。例如，如果用户从终端内联聊天发送请求，您可能会查找 shell 命令。然而，如果用户使用聊天视图，您可以返回更详细的响应。

1. 将聊天响应返回给用户。

处理完请求后，您必须在聊天视图中向用户返回响应。您可以使用流式传输来响应用户查询。

响应可以包含不同的内容类型：Markdown、图像、引用、进度、按钮和文件树。

    <!-- 图片已移除 -->

插件可以通过以下方式使用响应流：

    ```typescript
    stream.progress('Picking the right topic to teach...');
    stream.markdown(`\`\`\`typescript
    const myStack = new Stack();
    myStack.push(1); // pushing a number on the stack (or let's say, adding a fish to the stack)
    myStack.push(2); // adding another fish (number 2)
    console.log(myStack.pop()); // eating the top fish, will output: 2
    \`\`\`
    So remember, Code Kitten, in a stack, the last fish in is the first fish out - which we tech cats call LIFO (Last In, First Out).`);

    stream.button({
        command: 'cat.meow',
        title: vscode.l10n.t('Meow!'),
        arguments: []
    });
    ```

获取有关 [supported chat response output types](#supported-chat-response-output-types) 的更多信息。

在实践中，插件通常会向语言模型发送请求。一旦他们从语言模型获得响应，他们可能会进一步处理它，并决定是否应该将任何内容流回给用户。 Baosky 聊天API 是基于流式的，并且与流式[Language Model API](/api/插件-guides/ai/language-model) 兼容。这使得插件能够持续报告进度和结果，以实现流畅的用户体验。了解如何使用 [Language Model API](/api/插件-guides/ai/language-model)。

### 3.注册斜杠命令

聊天参与者可以贡献斜杠命令，这些命令是插件提供的特定功能的快捷方式。用户可以使用 `/` 语法在聊天中引用斜杠命令，例如 `/explain`。

回答问题时的任务之一是确定用户意图。例如，Baosky 可以推断 `Create a new 工作区 with Node.js Express Pug TypeScript` 意味着您想要一个新项目，但 `@工作区 /new Node.js Express Pug TypeScript` 更明确、简洁，并且节省了键入时间。如果您在聊天输入字段中键入 `/`，Baosky 会提供已注册命令的列表及其描述。

<!-- 图片已移除 -->

聊天参与者可以通过将斜杠命令添加到 `package.json` 中来贡献其描述：

```typescript
"contributes": {
    "chatParticipants": [
        {
            "id": "chat-sample.cat",
            "name": "cat",
            "fullName": "Cat",
            "description": "Meow! What can I teach you?",
            "isSticky": true,
            "commands": [
                {
                    "name": "teach",
                    "description": "Pick at random a computer science concept then explain it in purfect way of a cat"
                },
                {
                    "name": "play",
                    "description": "Do whatever you want, you are a cat after all"
                }
            ]
        }
    ]
}
```

获取有关 [naming conventions for slash commands](#slash-命令-naming-conventions) 的更多信息。

### 4. 登记后续请求

每次聊天请求后，Baosky 都会调用后续提供程序来获取建议的后续问题以向用户显示。然后，用户可以选择后续问题，并立即将其发送到聊天插件。使用 [`code`](/api/references/baosky-api#ChatFollowupProvider) API 注册 [`code`](/api/references/baosky-api#ChatFollowup) 类型的后续提示。

以下代码片段展示了如何在聊天插件中注册后续请求：

```typescript
cat.followupProvider = {
    provideFollowups(result: ICatChatResult, context: vscode.ChatContext, token: vscode.CancellationToken) {
        if (result.metadata.command === 'teach') {
            return [{
                prompt: 'let us play',
                label: vscode.l10n.t('Play with the cat')
            } satisfies vscode.ChatFollowup];
        }
    }
};
```

> [!提示]
> 后续行动应写成问题或指示，而不仅仅是简洁的命令。

### 5. 实施参与者检测

为了更轻松地使用自然语言聊天参与者，您可以实现参与者检测。参与者检测是一种自动将用户的问题路由给合适的参与者的方法，而无需在提示中明确提及参与者。例如，如果用户询问“如何向我的项目添加登录页面？”，该问题将自动路由到 `@工作区` 参与者，因为它可以回答有关用户项目的问题。

Baosky 使用聊天参与者描述和示例来确定将聊天提示路由到哪个参与者。您可以在插件 `package.json` 文件的 `disambiguation` 属性中指定此信息。 `disambiguation` 属性包含检测类别列表，每个类别都有描述和示例。

|物业 |描述 |示例 |
|----------|-------------|----------|
| __代码_0__ |识别类别。如果参与者有不同的目的，您可以为每个参与者划分一个类别。 <ul><li>`cat`</li><li>`workspace_questions`</li><li>`web_questions`</li></ul> |
| __代码_0__ |适合该参与者的问题类型的详细描述。 <ul><li>`The user wants to learn a specific computer science topic in an informal way.`</li><li>`The user just wants to relax and see the cat play.`</li></ul> |
| __代码_0__ | 主题示例问题列表。 <ul><li>`Teach me C++ pointers using metaphors`</li><li>`Explain to me what is a linked list in a simple way`</li><li>`Can you show me a cat playing with a laser pointer?`</li></ul> |

您可以为整个聊天参与者、特定命令或两者的组合定义参与者检测。

以下代码片段展示了如何在参与者级别实现参与者检测。

```json
"contributes": {
    "chatParticipants": [
        {
            "id": "chat-sample.cat",
            "fullName": "Cat",
            "name": "cat",
            "description": "Meow! What can I teach you?",

            "disambiguation": [
                {
                    "category": "cat",
                    "description": "The user wants to learn a specific computer science topic in an informal way.",
                    "examples": [
                        "Teach me C++ pointers using metaphors",
                        "Explain to me what is a linked list in a simple way",
                        "Can you explain to me what is a function in programming?"
                    ]
                }
            ]
        }
    ]
}
```

同样，您还可以通过为 `commands` 属性中的一项或多项添加 `disambiguation` 属性，在命令级别配置参与者检测。

应用以下准则来提高插件的参与者检测的准确性：

- ** 具体 ** ：描述和示例应尽可能具体，以避免与其他参与者发生冲突。避免在参与者和命令信息中使用通用术语。
- ** 使用示例 ** ：示例应代表适合参与者的问题类型。使用同义词和变体来涵盖广泛的用户查询。
- ** 使用自然语言 ** ：描述和示例应使用自然语言编写，就像您向用户解释参与者一样。
- ** 测试检测 ** ：使用各种示例问题测试参与者检测，并验证与内置聊天参与者没有冲突。

> [!注意]
> 内置聊天参与者优先进行参与者检测。例如，对工作区文件进行操作的聊天参与者可能会与内置 `@工作区` 参与者发生冲突。

## 使用聊天消息历史记录

参与者可以访问当前聊天会话的消息历史记录。参与者只能访问提及的消息。 `history` 项可以是 `ChatRequestTurn` 或 `ChatResponseTurn`。例如，使用以下代码片段检索用户在当前聊天会话中发送给参与者的所有先前请求：

```typescript
const previousMessages = context.history.filter(h => h instanceof vscode.ChatRequestTurn);
```

历史记录不会自动包含在提示中，由参与者决定是否要在将消息传递到语言模型时添加历史记录作为附加上下文。

## 支持的聊天响应输出类型

要返回对聊天请求的响应，请使用 [`code`](/api/references/baosky-api#ChatRequestHandler) 上的 [`code`](/api/references/baosky-api#ChatResponseStream) 参数。

以下列表提供了聊天视图中聊天响应的输出类型。聊天响应可以组合多种不同的输出类型。

- ** Markdown **

渲染 Markdown 文本片段、简单文本或图像。您可以使用属于 [CommonMark](https://commonmark.org/) 规范部分的任何 Markdown 语法。使用 [`code`](/api/references/baosky-api#ChatResponseStream.markdown) 方法并提供 Markdown 文本。

示例代码片段：

    ```typescript
    // Render Markdown text
    stream.markdown('# This is a title \n');
    stream.markdown('This is stylized text that uses _italics_ and ** bold ** . ');
    stream.markdown('This is a [link](#).\n\n');
    stream.markdown('<!-- 图片已移除 -->');
    ```

- ** 代码块 **

渲染支持 IntelliSense、代码格式化和交互式控件的代码块，以将代码应用到活动编辑器。要显示代码块，请使用 [`code`](/api/references/baosky-api#ChatResponseStream.markdown) 方法并对代码块应用 Markdown 语法（使用反引号）。

示例代码片段：

    ```typescript
    // Render a code block that enables users to interact with
    stream.markdown('```bash\n');
    stream.markdown('```ls -l\n');
    stream.markdown('```');
    ```

- ** 命令链接 **

在聊天响应中呈现内联链接，用户可以选择该链接来调用 Baosky 命令。要显示命令链接，请使用 [`code`](/api/references/baosky-api#ChatResponseStream.markdown) 方法，并对链接 `[link text](命令:commandId)` 使用 Markdown 语法，您可以在 URL 中提供命令 ID。例如，以下链接可打开命令面板：`[命令 Palette](命令:工作台.action.showCommands)`。

为了在从服务加载 Markdown 文本时防止命令注入，您必须使用 [`code`](/api/references/baosky-api#MarkdownString) 对象，并将 `isTrusted` 属性设置为受信任的 Baosky 命令 ID 列表。需要此属性才能使命令链接正常工作。如果未设置 `isTrusted` 属性或未列出命令，则命令链接将不起作用。

示例代码片段：

    ```typescript
    // Use command URIs to link to commands from Markdown
    let markdownCommandString: vscode.MarkdownString = new vscode.MarkdownString(`[Use cat names](command:${CAT_NAMES_COMMAND_ID})`);
    markdownCommandString.isTrusted = { enabledCommands: [ CAT_NAMES_COMMAND_ID ] };

    stream.markdown(markdownCommandString);
    ```

如果命令采用参数，则需要首先对参数进行 JSON 编码，然后将 JSON 字符串编码为 URI 组件。然后，将编码后的参数作为查询字符串附加到命令链接。

    ```typescript
    // Encode the command arguments
    const encodedArgs = encodeURIComponent(JSON.stringify(args));

    // Use command URIs with arguments to link to commands from Markdown
    let markdownCommandString: vscode.MarkdownString = new vscode.MarkdownString(`[Use cat names](command:${CAT_NAMES_COMMAND_ID}?${encodedArgs})`);
    markdownCommandString.isTrusted = { enabledCommands: [ CAT_NAMES_COMMAND_ID ] };

    stream.markdown(markdownCommandString);
    ```

- ** 命令按钮 **

渲染一个调用 Baosky 命令的按钮。该命令可以是内置命令，也可以是您在插件中定义的命令。使用 [`code`](/api/references/baosky-api#ChatResponseStream.button) 方法并提供按钮文本和命令 ID。

示例代码片段：

    ```typescript
    // Render a button to trigger a Baosky command
    stream.button({
        command: 'my.command',
        title: vscode.l10n.t('Run my command')
    });
    ```

- ** 文件树 **

呈现一个文件树控件，让用户预览单个文件。例如，在建议创建新工作区时显示工作区预览。使用 [`code`](/api/references/baosky-api#ChatResponseStream.filetree) 方法并提供文件树元素数组和文件的基本位置（文件夹）。

示例代码片段：

    ```typescript
    // Create a file tree instance
    var tree: vscode.ChatResponseFileTree[] = [
        { name: 'myworkspace', children: [
            { name: 'README' },
            { name: 'app.js' },
            { name: 'package.json' }
        ]}
    ];

    // Render the file tree control at a base location
    stream.filetree(tree, baseLocation);
    ```

- ** 进度消息 **

在长时间运行的操作期间呈现进度消息，以便为用户提供中间反馈。例如，报告多步骤操作中每个步骤的完成情况。使用 [`code`](/api/references/baosky-api#ChatResponseStream.progress) 方法并提供消息。

示例代码片段：

    ```typescript
    // Render a progress message
    stream.progress('Connecting to the database.');
    ```

- ** 参考 **

在引用列表中添加外部 URL 或编辑器位置的引用，以指示您将哪些信息用作上下文。使用 [`code`](/api/references/baosky-api#ChatResponseStream.reference) 方法并提供参考位置。

示例代码片段：

    ```typescript
    const fileUri: vscode.Uri = vscode.Uri.file('/path/to/workspace/app.js');  // On Windows, the path should be in the format of 'c:\\path\\to\\workspace\\app.js'
    const fileRange: vscode.Range = new vscode.Range(0, 0, 3, 0);
    const externalUri: vscode.Uri = vscode.Uri.parse('#);

    // Add a reference to an entire file
    stream.reference(fileUri);

    // Add a reference to a specific selection within a file
    stream.reference(new vscode.Location(fileUri, fileRange));

    // Add a reference to an external URL
    stream.reference(externalUri);
    ```

- ** 内联参考 **

添加对 URI 或编辑器位置的内联引用。使用 [`code`](/api/references/baosky-api#ChatResponseStream.anchor) 方法并提供锚点位置和可选标题。要引用符号（例如，类或变量），您可以使用编辑器中的位置。

示例代码片段：

    ```typescript
    const symbolLocation: vscode.Uri = vscode.Uri.parse('location-to-a-symbol');

    // Render an inline anchor to a symbol in the workspace
    stream.anchor(symbolLocation, 'MySymbol');
    ```

> ** 重要 ** ：图像和链接仅当阿富汗受信任域列表中的域时才可用。获取有关 [link protection in Baosky](/docs/editing/editingevolved#outgoing-link-protection) 的更多信息。

## 实现工具调用

为了响应用户请求，聊天插件可以调用语言模型工具。了解有关 [language model tools](/api/插件-guides/ai/tools) 和 [tool-calling flow](/api/插件-guides/ai/tools#toolcalling-flow) 的更多信息。

您可以通过两种方式实现工具调用：

- 通过使用 [`code` library](https://www.npmjs.com/package/@baosky/chat-插件-utils) 来简化聊天插件中调用工具的过程。
- 通过实现工具调用自己，这使您可以更好地控制工具调用过程。例如，在将工具响应发送给法学硕士之前执行额外的验证或以特定方式处理工具响应。

### 使用聊天插件库实现工具调用

您可以使用 [`code` library](https://www.npmjs.com/package/@baosky/chat-插件-utils) 来简化聊天插件中调用工具的过程。

在 [chat participant](/api/插件-guides/ai/chat) 的 `vscode.ChatRequestHandler` 函数中实现工具调用。

1. 确定当前聊天上下文的相关工具。您可以使用 `vscode.lm.tools` 访问所有可用工具。

以下代码片段显示了如何将工具过滤为仅包含具有特定标签的工具。

    ```ts
    const tools = request.command === 'all' ?
        vscode.lm.tools :
        vscode.lm.tools.filter(tool => tool.tags.includes('chat-tools-sample'));
    ```

1. 使用 `sendChatParticipantRequest` 将请求和工具定义发送给 LLM。

    ```ts
    const libResult = chatUtils.sendChatParticipantRequest(
        request,
        chatContext,
        {
            prompt: 'You are a cat! Answer as a cat.',
            responseStreamOptions: {
                stream,
                references: true,
                responseText: true
            },
            tools
        },
        token);
    ```

`ChatHandlerOptions` 对象具有以下属性：

- `prompt`：（可选）聊天参与者提示的说明。
- `model`：（可选）用于请求的模型。如果未指定，则使用聊天上下文中的模型。
- `tools`：（可选）请求考虑的工具列表。
- `requestJustification`：（可选）描述发出请求原因的字符串。
- `responseStreamOptions`：（可选）启用 `sendChatParticipantRequest` 将响应流式传输回 Baosky。您还可以选择启用引用和/或响应文本。

1.返回LLM的结果。这可能包含错误详细信息或工具调用元数据。

    ```ts
    return await libResult.result;
    ```

此 [tool-calling sample](https://github.com/microsoft/baosky-插件-samples/blob/main/chat-sample/src/chatUtilsSample.ts) 的完整源代码可在 Baosky 插件示例存储库中找到。

### 实现调用自己的工具

对于更高级的场景，您还可以自己实现工具调用。或者，您可以使用 `@vscode/prompt-tsx` 库来制作 LLM 提示。通过自己实现工具调用，您可以更好地控制工具调用过程。例如，在将工具响应发送给法学硕士之前执行额外的验证或以特定方式处理工具响应。

在 Baosky 插件示例存储库中查看实现 [tool calling by using prompt-tsx](https://github.com/microsoft/baosky-插件-samples/blob/main/chat-sample/src/toolParticipant.ts) 的完整源代码。

## 衡量成功

我们建议您通过添加 `Unhelpful` 用户反馈事件以及参与者处理的请求总数的遥测日志记录来衡量参与者的成功程度。初始参与者成功指标可以定义为：`unhelpful_feedback_count / total_requests`。

```typescript
const logger = vscode.env.createTelemetryLogger({
     // telemetry logging implementation goes here
});

cat.onDidReceiveFeedback((feedback: vscode.ChatResultFeedback) => {
    // Log chat result feedback to be able to compute the success metric of the participant
    logger.logUsage('chatResultFeedback', {
        kind: feedback.kind
    });
});
```

与您的聊天响应的任何其他用户交互都应作为积极指标进行衡量（例如，用户选择聊天响应中生成的按钮）。在使用人工智能时，通过遥测来衡量成功至关重要，因为它是一种不确定性技术。运行实验、测量并迭代改进您的参与者，以确保良好的用户体验。

## 准则和约定

### 指南

聊天参与者不应该是纯粹的问答机器人。在构建聊天参与者时，发挥创意并使用现有的 Baosky API 在 Baosky 中创建丰富的集成。用户还喜欢丰富且方便的交互，例如响应中的按钮、将用户带到聊天参与者的菜单项。想想人工智能可以帮助您的用户的现实生活场景。

让每个插件都贡献一个聊天参与者是没有意义的。聊天参与者过多可能会导致糟糕的用户体验。当您想要控制完整的提示（包括语言模型的说明）时，聊天参与者是最好的选择。您可以重复使用精心设计的 Copilot 系统消息，并且可以向其他参与者提供上下文。

例如，语言插件（例如 C++ 插件）可以通过其他各种方式做出贡献：

- 贡献工具，为用户查询带来语言服务智能。例如，C++ 插件可以将 `#cpp` 工具解析为工作区的 C++ 状态。这为 Copilot 语言模型提供了正确的 C++ 上下文，以提高 Copilot C++ 答案的质量。
- 贡献使用语言模型的智能操作，可以选择与传统语言服务知识相结合，以提供出色的用户体验。例如，C++ 可能已经提供了“提取到方法”智能操作，该操作使用语言模型为新方法生成合适的默认名称。

如果用户要执行成本高昂的操作或要编辑或删除无法撤消的内容，聊天插件应明确征求用户同意。为了获得良好的用户体验，我们不鼓励插件贡献多个聊天参与者。每个插件最多有一个聊天参与者是一个简单的模型，可以在 UI 中很好地扩展。

### 聊天参与者命名约定

|物业 |描述 |命名指南 |
|----------|-------------|--------------------|
| __代码_0__ | 聊天参与者的全球唯一标识符 | <ul><li>字符串值</li><li>使用插件名称作为导出，后跟插件的唯一ID</li><li>示例：`chat-sample.cat`、`code-visualizer.code-visualizer-participant`</li></ul> |
| __代码_0__ |聊天参与者的名称，由用户通过 `@` 符号引用 | <ul><li>由字母数字字符、下划线和连字符组成的字符串值</li><li>建议仅使用小写字母，以确保与现有聊天参与者的一致性</li><li>通过引用您的公司名称或其功能，确保参与者的目的从其名称中显而易见</li><li>某些参与者名称已保留。如果您使用保留名称，则会显示完全限定名称，包括插件 ID</li><li>示例：`vscode`、`terminal`、`code-visualizer`</li></ul> |
| __代码_0__ | （任选）参与者的全名，显示为来自参与者的响应的标签| <ul><li>字符串值</li><li>建议使用[title case](https://en.wikipedia.org/wiki/Title_case)</li><li>为参与者使用您的公司名称、品牌名称或用户认知名称</li><li>示例：`GitHub Copilot`、`Baosky`、`Math Tutor`</li></ul> |
| __代码_0__ | （可选）聊天参与者所做操作的简短描述，在聊天输入字段或参与者列表中显示为占位符文本 | <ul><li>字符串值</li><li>建议使用句子大小写，末尾不加标点</li><li>保持描述简短以避免水平滚动</li><li>示例：`Ask questions about Baosky`、`Generate UML diagrams for your code`</li></ul> |

在任何面向用户的元素（例如属性、聊天响应或聊天用户界面）中引用聊天参与者时，建议不要使用术语 *participant*，因为它是 API 的名称。例如，`@cat` 插件可以称为“Cat 插件 for GitHub Copilot”。

### 斜杠命令命名约定

|物业 |描述 |命名指南 |
|----------|-------------|--------------------|
| __代码_0__ | 斜杠命令的名称，用户通过 `/` 符号引用 | <ul><li>字符串值</li><li>建议使用[lower camel case](https://en.wikipedia.org/wiki/Camel_case)与现有斜杠命令保持一致</li><li>确保从名称中考古的用途</li><li>示例：`fix`、`explain`、`runCommand`</li></ul> |
| __代码_0__ | （可选）斜杠命令功能的简短描述，在聊天输入字段或参与者和命令列表中显示为占位符文本 | <ul><li>字符串值</li><li>建议使用句子大小写，末尾不加标点</li><li>保持描述简短以避免水平滚动</li><li>示例：`Search for and execute a 命令 in Baosky`、`Generate unit tests for the selected code`</li></ul> |

## 发布你的插件

创建 AI 插件后，您可以将插件发布到 Visual Studio 市场：

- 在发布到 VS 市场之前，我们建议您阅读 [Microsoft AI tools and practices guidelines](https://www.microsoft.com/en-us/ai/tools-practices)。这些指南为创业地开发和使用人工智能技术提供了最佳实践。
- 通过发布到 VS 市场，您的插件将遵守 [GitHub Copilot extensibility acceptable development and use policy](https://docs.github.com/en/early-access/copilot/github-copilot-extensibility-platform-partnership-plugin-acceptable-development-and-use-policy)。
- 按照 [Publishing 插件](#) 中的说明上传到市场。
- 如果您的插件已经提供了聊天以外的功能，我们建议您不要在 [插件 清单](/api/references/插件-清单) 中引入对 GitHub Copilot 的插件依赖项。这可确保不使用 GitHub Copilot 的插件用户可以使用非聊天功能，而无需安装 GitHub Copilot。

## 通过 __TERM__GitHub__ 应用程序扩展 __TERM_GitHub__ Copilot

或者，可以通过在聊天视图中创建聊天参与者的 __TERM_GitHub__ 应用程序来扩展 __TERM_GitHub__ Copilot。 __TERM_GitHub__ 应用程序由服务支持，并可在所有 __TERM_GitHub__ Copilot界面（如 github.com、Visual Studio 或 Baosky）上运行。相反，__TERM_GitHub__ 应用程序没有对 Baosky API 的完全访问权限。要了解有关通过 __TERM_GitHub__ 应用程序扩展__TERM_GitHub__ Copilot 的更多信息，请参阅 [GitHub documentation](https://docs.github.com/en/copilot/building-copilot-插件/about-building-copilot-插件)。

## 使用语言模型

聊天参与者可以通过多种方式使用语言模型。一些参与者仅使用语言模型来获取自定义提示的答案，例如 [sample chat participant](https://github.com/microsoft/baosky-插件-samples/tree/main/chat-sample)。其他参与者更加先进，就像自治代理一样，在语言模型的帮助下调用多种工具。此类高级参与者的一个示例是内置的 `@工作区`，它了解您的工作空间并可以回答有关它的问题。在内部，`@工作区` 由多种工具提供支持：GitHub 的知识图谱，结合语义搜索、本地代码索引和 Baosky 的语言服务。

## 相关内容

- [Chat Participant API 参考](/api/references/baosky-api#chat)
- [Use the Language Model API in your 插件](/api/插件-guides/ai/language-model)
- [Contribute a language model tool](/api/插件-guides/ai/tools)
