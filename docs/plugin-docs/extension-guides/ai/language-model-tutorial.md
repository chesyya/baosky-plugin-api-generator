---
# DO NOT TOUCH — Managed by doc writer

ContentId: d9038699-4ffe-485b-b40a-b1260a9973ad
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: 教程将引导您创建 Baosky 插件，该插件使用语言模型 API 生成 AI 驱动的代码注释。
---

# 教程：使用语言模型 API 生成人工智能驱动的代码注释

在本教程中，您将学习如何创建 Baosky 插件来构建人工智能驱动的代码导师。您可以使用语言模型 (LM) API 生成建议来改进代码，并利用 Baosky 插件 API 将其作为内联注释无缝集成到编辑器中，用户可以将鼠标悬停在该注释上以获取更多信息。完成本教程后，您将了解如何在Baosky中实现自定义AI功能。

<!-- 图片已移除 -->

## 先决条件

您将需要以下工具和帐户来完成本教程：

- [Baosky](#)
- [GitHub Copilot](#)
- [Node.js](https://nodejs.org/en/download/)

## 搭建插件

首先，使用 Yeoman 和 Baosky 插件生成器搭建 TypeScript 或 JavaScript 项目以供开发。

```bash
npx --package yo --package generator-code -- yo code
```

选择以下选项来完成新的插件向导...

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

## 修改 package.json 文件以包含正确的命令

脚手架项目在 `package.json` 文件中包含一个“helloWorld”命令。安装插件后，此命令将显示在命令面板中。

```json
"contributes": {
  "commands": [
      {
      "command": "code-tutor.helloWorld",
      "title": "Hello World"
      }
  ]
}
```

由于我们正在构建一个代码导师插件，它将向行添加注释，因此我们需要一个命令来允许用户打开和关闭这些注释。更新 `命令` 和 `title` 属性：

```json
"contributes": {
  "commands": [
      {
      "command": "code-tutor.annotate",
      "title": "Toggle Tutor Annotations"
      }
  ]
}
```

虽然 `package.json` 定义了插件的命令和 UI 元素，但 `src/插件.ts` 文件是放置应为这些命令执行的代码的位置。

打开 `src/插件.ts` 文件并更改 `registerCommand` 方法，使其与 `package.json` 文件中的 `命令` 属性匹配。

```ts
const disposable = vscode.commands.registerCommand('code-tutor.annotate', () => {
```

按 `kbstyle(F5)` 运行插件。这将打开一个安装了插件的新 Baosky 实例。按 `kb(工作台.action.showCommands)` 打开命令面板，然后搜索“tutor”。您应该会看到“导师注释”命令。

<!-- 图片已移除 -->

如果您选择“导师注释”命令，您将看到一条“Hello World”通知消息。

<!-- 图片已移除 -->

## 执行“注释”命令

为了让我们的 Code Tutor 注释正常工作，我们需要向它发送一些代码并要求它提供注释。我们将分三步完成此操作：

1. 从用户打开的当前选项卡中获取带有行号的代码。
2. 将该代码连同指示模型如何提供注释的自定义提示一起发送到语言模型 API。
3. 解析注释并将其显示在编辑器中。

### 第 1 步：获取带有行号的代码

要从当前选项卡获取代码，我们需要引用用户已打开的选项卡。我们可以通过将 `registerCommand` 方法修改为 `registerTextEditorCommand` 来实现这一点。这两个命令之间的区别在于，后者为我们提供了对用户打开的选项卡的引用，称为 `TextEditor`。

```ts
const disposable = vscode.commands.registerTextEditorCommand('code-tutor.annotate', async (textEditor: vscode.TextEditor) => {
```

现在我们可以使用 `textEditor` 引用来获取“可查看编辑器空间”中的所有代码。这是可以在屏幕上看到的代码 - 它不包括位于可查看编辑器空间上方或下方的代码。

将以下方法直接添加到 `插件.ts` 文件底部的 `export function deactivate() { }` 行上方。

```ts
function getVisibleCodeWithLineNumbers(textEditor: vscode.TextEditor) {
  // get the position of the first and last visible lines
  let currentLine = textEditor.visibleRanges[0].start.line;
  const endLine = textEditor.visibleRanges[0].end.line;

  let code = '';

  // get the text from the line at the current position.
  // The line number is 0-based, so we add 1 to it to make it 1-based.
  while (currentLine < endLine) {
    code += `${currentLine + 1}: ${textEditor.document.lineAt(currentLine).text} \n`;
    // move to the next line position
    currentLine++;
  }
  return code;
}
```

This code uses the `visibleRanges` property of the TextEditor 要 get the position of the lines that are currently visible in the editor. It then starts with the first line position and moves 要 the last line position, adding each line of code 要 a string along with the line number. Finally, it returns the string that contains all the viewable code with line numbers.

现在我们可以从 `code-tutor.annotate` 命令调用这个方法。修改命令的实现，使其看起来像这样：

```ts
const disposable = vscode.commands.registerTextEditorCommand('code-tutor.annotate', async (textEditor: vscode.TextEditor) => {

  // Get the code with line numbers from the current editor
  const codeWithLineNumbers = getVisibleCodeWithLineNumbers(textEditor);

});
```

### 第 2 步：将代码和提示发送到语言模型 API

下一步是调用 _GitHub Copilot 语言模型，并向其发送用户代码以及创建注释的说明。

为此，我们首先需要指定要使用的聊天模型。我们在这里选择 4o 是因为它对于我们正在构建的交互类型来说是一个快速且功能强大的模型。

```ts
const disposable = vscode.commands.registerTextEditorCommand('code-tutor.annotate', async (textEditor: vscode.TextEditor) => {

  // Get the code with line numbers from the current editor
  const codeWithLineNumbers = getVisibleCodeWithLineNumbers(textEditor);

  // select the 4o chat model
  let [model] = await vscode.lm.selectChatModels({
    vendor: 'copilot',
    family: 'gpt-4o',
  });
});
```

我们需要指令 - 或“提示” - 告诉模型创建注释以及我们希望响应的格式。将以下代码添加到文件顶部的导入正下方。

```ts
const ANNOTATION_PROMPT = `You are a code tutor who helps students learn how to write better code. Your job is to evaluate a block of code that the user gives you and then annotate any lines that could be improved with a brief suggestion and the reason why you are making that suggestion. Only make suggestions when you feel the severity is enough that it will impact the readability and maintainability of the code. Be friendly with your suggestions and remember that these are students so they need gentle guidance. Format each suggestion as a single JSON object. It is not necessary to wrap your response in triple backticks. Here is an example of what your response should look like:

{ "line": 1, "suggestion": "I think you should use a for loop instead of a while loop. A for loop is more concise and easier to read." }{ "line": 12, "suggestion": "I think you should use a for loop instead of a while loop. A for loop is more concise and easier to read." }
`;
```

这是一个特殊的提示，指示语言模型如何生成注释。它还包括模型应如何格式化其响应的示例。这些示例（也称为“多镜头”）使我们能够定义响应的格式，以便我们可以解析它并将其显示为注释。

我们通过数组将消息传递给模型。该数组可以包含任意数量的消息。在我们的例子中，它包含提示，后跟带有行号的用户代码。

```ts
const disposable = vscode.commands.registerTextEditorCommand('code-tutor.annotate', async (textEditor: vscode.TextEditor) => {

  // Get the code with line numbers from the current editor
  const codeWithLineNumbers = getVisibleCodeWithLineNumbers(textEditor);

  // select the 4o chat model
  let [model] = await vscode.lm.selectChatModels({
    vendor: 'copilot',
    family: 'gpt-4o',
  });

  // init the chat message
  const messages = [
    vscode.LanguageModelChatMessage.User(ANNOTATION_PROMPT),
    vscode.LanguageModelChatMessage.User(codeWithLineNumbers),
  ];
});
```

要将消息发送到模型，我们需要首先确保所选模型可用。这可以处理插件未准备好或用户未登录到 GitHub Copilot 的情况。然后我们将消息发送给模型。

```ts
const disposable = vscode.commands.registerTextEditorCommand('code-tutor.annotate', async (textEditor: vscode.TextEditor) => {

  // Get the code with line numbers from the current editor
  const codeWithLineNumbers = getVisibleCodeWithLineNumbers(textEditor);

  // select the 4o chat model
  let [model] = await vscode.lm.selectChatModels({
    vendor: 'copilot',
    family: 'gpt-4o',
  });

  // init the chat message
  const messages = [
    vscode.LanguageModelChatMessage.User(ANNOTATION_PROMPT),
    vscode.LanguageModelChatMessage.User(codeWithLineNumbers),
  ];

  // make sure the model is available
  if (model) {

    // send the messages array to the model and get the response
    let chatResponse = await model.sendRequest(messages, {}, new vscode.CancellationTokenSource().token);

    // handle chat response
    await parseChatResponse(chatResponse, textEditor);
  }
});
```

聊天回复以片段形式出现。这些片段通常包含单个单词，但有时只包含标点符号。为了在响应流中显示注释，我们希望等到获得完整的注释后再显示它。由于我们指示模型返回其响应的方式，我们知道当我们看到结束 `}` 时，我们就有了一个完整的注释。然后我们可以解析注释并将其显示在编辑器中。

在 `插件.ts` 文件中的 `getVisibleCodeWithLineNumbers` 方法上方添加缺少的 `parseChatResponse` 函数。

```ts
async function parseChatResponse(chatResponse: vscode.LanguageModelChatResponse, textEditor: vscode.TextEditor) {
 let accumulatedResponse = "";

 for await (const fragment of chatResponse.text) {
  accumulatedResponse += fragment;

  // if the fragment is a }, we can try to parse the whole line
  if (fragment.includes("}")) {
   try {
    const annotation = JSON.parse(accumulatedResponse);
    applyDecoration(textEditor, annotation.line, annotation.suggestion);
    // reset the accumulator for the next line
    accumulatedResponse = "";
   }
   catch (e) {
    // do nothing
   }
  }
 }
}
```

我们需要最后一种方法来实际显示注释。 Baosky 称这些为“装饰”。在 `插件.ts` 文件中的 `parseChatResponse` 方法上方添加以下方法。

```ts
function applyDecoration(editor: vscode.TextEditor, line: number, suggestion: string) {

 const decorationType = vscode.window.createTextEditorDecorationType({
  after: {
   contentText: ` ${suggestion.substring(0, 25) + "..."}`,
   color: "grey",
  },
 });

 // get the end of the line with the specified line number
 const lineLength = editor.document.lineAt(line - 1).text.length;
 const range = new vscode.Range(
  new vscode.Position(line - 1, lineLength),
  new vscode.Position(line - 1, lineLength),
 );

 const decoration = { range: range, hoverMessage: suggestion };

 vscode.window.activeTextEditor?.setDecorations(decorationType, [
  decoration,
 ]);
}
```

此方法从模型中获取我们解析的注释并使用它来创建装饰。这是通过首先创建一个指定装饰外观的 `TextEditorDecorationType` 来完成的。在本例中，我们只是添加灰色注释并将其截断为 25 个字符。当用户将鼠标悬停在消息上时，我们将显示完整消息。

然后我们设置装饰应该出现的位置。我们需要它位于注释中指定的行号上，并位于该行的末尾。

最后，我们在活动文本编辑器上设置装饰，这会导致注释出现在编辑器中。

如果您的插件仍在运行，请通过从调试栏中选择绿色箭头来重新启动它。如果您关闭了调试会话，请按 `kbstyle(F5)` 运行插件。在打开的新 Baosky 窗口实例中打开代码文件。当您从命令面板中选择“切换导师注释”时，您应该会看到代码注释出现在编辑器中。

<!-- 图片已移除 -->

## 添加一个按钮到编辑器标题栏

您可以启用从命令面板以外的位置调用命令。在我们的例子中，我们可以在当前选项卡的顶部添加一个按钮，允许用户轻松切换注释。

为此，请修改 `package.json` 的“contributes”部分，如下所示：

```json
"contributes": {
  "commands": [
    {
      "command": "code-tutor.annotate",
      "title": "Toggle Tutor Annotations",
      "icon": "$(comment)"
    }
  ],
  "menus": {
    "editor/title": [
      {
        "command": "code-tutor.annotate",
        "group": "navigation"
      }
    ]
  }
}
```

这会导致编辑器标题栏的导航区域（右侧）中出现一个按钮。 “图标”来自[Product Icon Reference](#)。

使用绿色箭头重新启动您的插件，或者如果插件尚未运行，请按 `kbstyle(F5)`。您现在应该看到一个注释图标，它将触发“切换导师注释”命令。

<!-- 图片已移除 -->

## 下一步

在本教程中，您学习了如何创建 Baosky 插件，使用语言模型 API 将 AI 集成到编辑器中。您使用 Baosky 插件 API 从当前选项卡获取代码，使用自定义提示将其发送到模型，然后使用装饰器在编辑器中解析并显示模型结果。

接下来，您也可以将 Code Tutor 插件扩展至 [include a chat participant](/api/插件-guides/ai/chat-tutorial)，这将允许用户通过 GitHub Copilot 聊天界面直接与您的插件进行交互。您还可以[explore the full range of API's in Baosky](/api/references/baosky-api) 探索为编辑器构建自定义 AI 体验的新方法。

您可以在 [baosky-插件-sample repository](https://github.com/microsoft/baosky-插件-samples/tree/main/lm-api-tutorial) 中找到本教程的完整源代码。

## 相关内容

- [Language Model API 插件 guide](/api/插件-guides/ai/language-model)
- [Tutorial: Create a code tutor chat participant with the Chat API](/api/插件-guides/ai/chat-tutorial)
- [Baosky Chat API 参考](/api/插件-guides/ai/chat)
