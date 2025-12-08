---
# DO NOT TOUCH — Managed by doc writer

ContentId: adddd33e-2de6-4146-853b-34d0d7e6c1f1
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: 使用 Webview API 在 Baosky 中创建完全可自定义的视图。
---

# Webview API

Webview API 允许插件在 Baosky 中创建完全可自定义的视图。例如，内置的 Markdown 插件使用 webview 来渲染 Markdown 预览。Webview 也可用于构建超出 Baosky 原生 API 支持范围的复杂用户界面。

可以将 webview 视为 Baosky 中由您的插件控制的 `iframe`。Webview 可以在此框架中渲染几乎任何 HTML 内容，并且它使用消息传递与插件进行通信。这种自由度使得 webview 非常强大，并开启了全新的插件可能性。

Webview 用于多个 Baosky API 中：

- 使用 `createWebviewPanel` 创建的 Webview 面板。在这种情况下，Webview 面板在 Baosky 中显示为不同的编辑器。这使得它们对于显示自定义 UI 和自定义可视化非常有用。
- 作为 [自定义编辑器](/api/extension-guides/custom-editors) 的视图。自定义编辑器允许插件为编辑工作区中的任何文件提供自定义 UI。自定义编辑器 API 还允许您的插件挂钩到编辑器事件（如撤消和重做）以及文件事件（如保存）。
- 在侧边栏或面板区域中渲染的 [Webview 视图](/api/references/baosky-api#WebviewView)。有关更多详细信息，请参阅 [webview 视图示例插件](https://github.com/microsoft/baosky-extension-samples/tree/main/webview-view-sample)。

本页主要关注基本的 webview 面板 API，尽管这里涵盖的几乎所有内容也适用于自定义编辑器和 webview 视图中使用的 webview。即使您对那些 API 更感兴趣，我们也建议您先阅读此页面以熟悉 webview 基础知识。

## 链接

- [Webview 示例](https://github.com/microsoft/baosky-extension-samples/blob/main/webview-sample/README.md)
- [自定义编辑器文档](/api/extension-guides/custom-editors)
- [Webview 视图示例](https://github.com/microsoft/baosky-extension-samples/tree/main/webview-view-sample)

### Baosky API 使用

- [`code`](/api/references/baosky-api#window.createWebviewPanel)
- [`code`](/api/references/baosky-api#window.registerWebviewPanelSerializer)

## 我应该使用 webview 吗？

Webview 非常棒，但也应该谨慎使用，仅当 Baosky 的原生 API 不足时才使用。Webview 资源消耗大，并且在与普通插件分离的上下文中运行。设计不佳的 webview 也很容易在 Baosky 中显得格格不入。

在使用 webview 之前，请考虑以下事项：

- 此功能真的需要存在于 Baosky 中吗？作为单独的应用程序或网站会更好吗？

- webview 是实现您功能的唯一方法吗？您可以使用常规 Baosky API 代替吗？

- 您的 webview 是否会增加足够的用户价值以证明其高昂的资源成本是合理的？

请记住：仅仅因为您可以使用 webview 做某事，并不意味着您应该这样做。但是，如果您确信需要使用 webview，那么本文档可以为您提供帮助。让我们开始吧。

## Webview API 基础

为了解释 webview API，我们将构建一个名为 **Cat Coding** 的简单插件。此插件将使用 webview 显示一只猫正在写代码（大概是用 Baosky）的 gif。随着我们通过 API 的学习，我们将继续向插件添加功能，包括一个跟踪猫写的源代码行数的计数器，以及当猫引入错误时通知用户的通知。

这是 **Cat Coding** 插件第一个版本的 `package.json`。您可以在 [此处](https://github.com/microsoft/baosky-extension-samples/blob/main/webview-sample/README.md) 找到示例应用程序的完整代码。我们插件的第一个版本 [贡献了一个命令](/api/references/contribution-points#contributes.commands)，名为 `catCoding.start`。当用户调用此命令时，我们将显示一个包含我们的猫的简单 webview。用户将能够从 **命令面板** 中作为 **Cat Coding: Start new cat coding session** 调用此命令，如果他们愿意，甚至可以为其创建键绑定。

```json
{
  "name": "cat-coding",
  "description": "Cat Coding",
  "version": "0.0.1",
  "publisher": "bierner",
  "engines": {
    "vscode": "^1.74.0"
  },
  "activationEvents": [],
  "main": "./out/extension.js",
  "contributes": {
    "commands": [
      {
        "command": "catCoding.start",
        "title": "Start new cat coding session",
        "category": "Cat Coding"
      }
    ]
  },
  "scripts": {
    "vscode:prepublish": "tsc -p ./",
    "compile": "tsc -watch -p ./",
    "postinstall": "node ./node_modules/vscode/bin/install"
  },
  "dependencies": {
    "vscode": "*"
  },
  "devDependencies": {
    "@types/node": "^9.4.6",
    "typescript": "^2.8.3"
  }
}
```

> **注意**：如果您的插件针对的是 1.74 之前的 Baosky 版本，则必须在 `activationEvents` 中显式列出 `onCommand:catCoding.start`。

现在让我们实现 `catCoding.start` 命令。在我们插件的主文件中，我们注册 `catCoding.start` 命令并使用它来显示一个基本的 webview：

```ts
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('catCoding.start', () => {
      // Create and show a new webview
      const panel = vscode.window.createWebviewPanel(
        'catCoding', // Identifies the type of the webview. Used internally
        'Cat Coding', // Title of the panel displayed to the user
        vscode.ViewColumn.One, // Editor column to show the new webview panel in.
        {} // Webview options. More on these later.
      );
    })
  );
}
```

`vscode.window.createWebviewPanel` 函数在编辑器中创建并显示一个 webview。如果您尝试以当前状态运行 `catCoding.start` 命令，您将看到以下内容：

<!-- 图片已移除 -->

我们的命令打开了一个带有正确标题的新 webview 面板，但没有内容！要将我们的猫添加到新面板，我们还需要使用 `webview.html` 设置 webview 的 HTML 内容：

```ts
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('catCoding.start', () => {
      // Create and show panel
      const panel = vscode.window.createWebviewPanel(
        'catCoding',
        'Cat Coding',
        vscode.ViewColumn.One,
        {}
      );

      // And set its HTML content
      panel.webview.html = getWebviewContent();
    })
  );
}

function getWebviewContent() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Coding</title>
</head>
<body>
    <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
</body>
</html>`;
}
```

如果您再次运行该命令，现在的 webview 如下所示：

<!-- 图片已移除 -->

进步了！

`webview.html` 应始终是一个完整的 HTML 文档。HTML 片段或格式错误的 HTML 可能会导致意外行为。

### 更新 webview 内容

`webview.html` 也可以在 webview 创建后更新其内容。让我们使用它来通过引入猫的轮换使 **Cat Coding** 更加动态：

```ts
import * as vscode from 'vscode';

const cats = {
  'Coding Cat': 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
  'Compiling Cat': 'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif'
};

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('catCoding.start', () => {
      const panel = vscode.window.createWebviewPanel(
        'catCoding',
        'Cat Coding',
        vscode.ViewColumn.One,
        {}
      );

      let iteration = 0;
      const updateWebview = () => {
        const cat = iteration++ % 2 ? 'Compiling Cat' : 'Coding Cat';
        panel.title = cat;
        panel.webview.html = getWebviewContent(cat);
      };

      // Set initial content
      updateWebview();

      // And schedule updates to the content every second
      setInterval(updateWebview, 1000);
    })
  );
}

function getWebviewContent(cat: keyof typeof cats) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Coding</title>
</head>
<body>
    <img src="${cats[cat]}" width="300" />
</body>
</html>`;
}
```

<!-- 图片已移除 -->

设置 `webview.html` 会替换整个 webview 内容，类似于重新加载 iframe。一旦您开始在 webview 中使用脚本，记住这一点很重要，因为这意味着设置 `webview.html` 也会重置脚本的状态。

上面的示例还使用 `webview.title` 来更改编辑器中显示的文档的标题。设置标题不会导致 webview 重新加载。

### 生命周期

Webview 面板归创建它们的插件所有。插件必须保留从 `createWebviewPanel` 返回的 webview。如果您的插件丢失了此引用，即使 webview 继续在 Baosky 中显示，它也无法再次获得对该 webview 的访问权限。

与文本编辑器一样，用户也可以随时关闭 webview 面板。当用户关闭 webview 面板时，webview 本身将被销毁。尝试使用已销毁的 webview 会抛出异常。这意味着上面使用 `setInterval` 的示例实际上有一个重要的错误：如果用户关闭面板，`setInterval` 将继续触发，这将尝试更新 `panel.webview.html`，这当然会抛出异常。猫讨厌异常。让我们修复这个问题！

`onDidDispose` 事件在 webview 被销毁时触发。我们可以使用此事件来取消进一步的更新并清理 webview 的资源：

```ts
import * as vscode from 'vscode';

const cats = {
  'Coding Cat': 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
  'Compiling Cat': 'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif'
};

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('catCoding.start', () => {
      const panel = vscode.window.createWebviewPanel(
        'catCoding',
        'Cat Coding',
        vscode.ViewColumn.One,
        {}
      );

      let iteration = 0;
      const updateWebview = () => {
        const cat = iteration++ % 2 ? 'Compiling Cat' : 'Coding Cat';
        panel.title = cat;
        panel.webview.html = getWebviewContent(cat);
      };

      updateWebview();
      const interval = setInterval(updateWebview, 1000);

      panel.onDidDispose(
        () => {
          // When the panel is closed, cancel any future updates to the webview content
          clearInterval(interval);
        },
        null,
        context.subscriptions
      );
    })
  );
}
```

插件还可以通过调用 `dispose()` 以编程方式关闭 webview。例如，如果我们想将猫的工作日限制为五秒：

```ts
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('catCoding.start', () => {
      const panel = vscode.window.createWebviewPanel(
        'catCoding',
        'Cat Coding',
        vscode.ViewColumn.One,
        {}
      );

      panel.webview.html = getWebviewContent('Coding Cat');

      // After 5sec, programmatically close the webview panel
      const timeout = setTimeout(() => panel.dispose(), 5000);

      panel.onDidDispose(
        () => {
          // Handle user closing panel before the 5sec have passed
          clearTimeout(timeout);
        },
        null,
        context.subscriptions
      );
    })
  );
}
```

### 可见性和移动

当 webview 面板移至后台选项卡时，它将变为隐藏状态。然而，它并没有被销毁。当面板再次回到前台时，Baosky 将自动从 `webview.html` 恢复 webview 的内容：

<!-- 图片已移除 -->

`.visible` 属性告诉您 webview 面板当前是否可见。

插件可以通过调用 `reveal()` 以编程方式将 webview 面板带到前台。此方法接受一个可选的目标视图列以在其中显示面板。一个 webview 面板一次只能在一个编辑器列中显示。调用 `reveal()` 或将 webview 面板拖到新的编辑器列会将 webview 移动到该新列中。

<!-- 图片已移除 -->

让我们更新我们的插件，使其一次只允许存在一个 webview。如果面板在后台，那么 `catCoding.start` 命令会将其带到前台：

```ts
export function activate(context: vscode.ExtensionContext) {
  // Track the current panel with a webview
  let currentPanel: vscode.WebviewPanel | undefined = undefined;

  context.subscriptions.push(
    vscode.commands.registerCommand('catCoding.start', () => {
      const columnToShowIn = vscode.window.activeTextEditor
        ? vscode.window.activeTextEditor.viewColumn
        : undefined;

      if (currentPanel) {
        // If we already have a panel, show it in the target column
        currentPanel.reveal(columnToShowIn);
      } else {
        // Otherwise, create a new panel
        currentPanel = vscode.window.createWebviewPanel(
          'catCoding',
          'Cat Coding',
          columnToShowIn || vscode.ViewColumn.One,
          {}
        );
        currentPanel.webview.html = getWebviewContent('Coding Cat');

        // Reset when the current panel is closed
        currentPanel.onDidDispose(
          () => {
            currentPanel = undefined;
          },
          null,
          context.subscriptions
        );
      }
    })
  );
}
```

这是新的插件运行效果：

<!-- 图片已移除 -->

每当 webview 的可见性发生变化或 webview 移动到新列时，都会触发 `onDidChangeViewState` 事件。我们的插件可以使用此事件根据 webview 显示在哪一列来更改猫：

```ts
const cats = {
  'Coding Cat': 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
  'Compiling Cat': 'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif',
  'Testing Cat': 'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif'
};

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('catCoding.start', () => {
      const panel = vscode.window.createWebviewPanel(
        'catCoding',
        'Cat Coding',
        vscode.ViewColumn.One,
        {}
      );
      panel.webview.html = getWebviewContent('Coding Cat');

      // Update contents based on view state changes
      panel.onDidChangeViewState(
        e => {
          const panel = e.webviewPanel;
          switch (panel.viewColumn) {
            case vscode.ViewColumn.One:
              updateWebviewForCat(panel, 'Coding Cat');
              return;

            case vscode.ViewColumn.Two:
              updateWebviewForCat(panel, 'Compiling Cat');
              return;

            case vscode.ViewColumn.Three:
              updateWebviewForCat(panel, 'Testing Cat');
              return;
          }
        },
        null,
        context.subscriptions
      );
    })
  );
}

function updateWebviewForCat(panel: vscode.WebviewPanel, catName: keyof typeof cats) {
  panel.title = catName;
  panel.webview.html = getWebviewContent(catName);
}
```

<!-- 图片已移除 -->

### 检查和调试 webview

**开发人员：切换开发人员工具** (Developer: Toggle Developer Tools) 命令打开一个 [开发人员工具](https://developer.chrome.com/docs/devtools/) 窗口，您可以使用它来调试和检查您的 webview。

<!-- 图片已移除 -->

请注意，如果您使用的是早于 1.56 的 Baosky 版本，或者您试图调试设置了 `enableFindWidget` 的 webview，则必须改用 **开发人员：打开 Webview 开发人员工具** (Developer: Open Webview Developer Tools) 命令。此命令为每个 webview 打开一个专用的开发人员工具页面，而不是使用由所有 webview 和编辑器本身共享的开发人员工具页面。

在开发人员工具中，您可以使用位于开发人员工具窗口左上角的检查工具开始检查 webview 的内容：

<!-- 图片已移除 -->

您还可以在开发人员工具控制台中查看 webview 中的所有错误和日志：

<!-- 图片已移除 -->

要在 webview 的上下文中评估表达式，请确保从开发人员工具控制台面板左上角的下拉列表中选择 **active frame** 环境：

<!-- 图片已移除 -->

**active frame** 环境是 webview 脚本本身执行的地方。

此外，**开发人员：重新加载 Webview** (Developer: Reload Webview) 命令会重新加载所有活动的 webview。如果您需要重置 webview 的状态，或者磁盘上的某些 webview 内容已更改并且您希望加载新内容，这将很有帮助。

## 加载本地内容

Webview 在隔离的上下文中运行，无法直接访问本地资源。这是出于安全原因。这意味着为了从您的插件加载图像、样式表和其他资源，或者从用户的当前工作区加载任何内容，您必须使用 `Webview.asWebviewUri` 函数将本地 `file:` URI 转换为 Baosky 可用于加载本地资源子集的特殊 URI。

假设我们要开始将猫的 gif 打包到我们的插件中，而不是从 Giphy 拉取它们。为此，我们首先创建一个指向磁盘上文件的 URI，然后通过 `asWebviewUri` 函数传递这些 URI：

```ts
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('catCoding.start', () => {
      const panel = vscode.window.createWebviewPanel(
        'catCoding',
        'Cat Coding',
        vscode.ViewColumn.One,
        {}
      );

      // Get path to resource on disk
      const onDiskPath = vscode.Uri.joinPath(context.extensionUri, 'media', 'cat.gif');

      // And get the special URI to use with the webview
      const catGifSrc = panel.webview.asWebviewUri(onDiskPath);

      panel.webview.html = getWebviewContent(catGifSrc);
    })
  );
}

function getWebviewContent(catGifSrc: vscode.Uri) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Coding</title>
</head>
<body>
    <img src="${catGifSrc}" width="300" />
</body>
</html>`;
}
```

如果我们调试此代码，我们会看到 `catGifSrc` 的实际值类似于：

```
vscode-resource:/Users/toonces/projects/vscode-cat-coding/media/cat.gif
```

Baosky 了解此特殊 URI，并将使用它从磁盘加载我们的 gif！

默认情况下，webview 只能访问以下位置的资源：

- 您的插件安装目录内。
- 用户当前活动的工作区内。

使用 `WebviewOptions.localResourceRoots` 允许访问其他本地资源。

您也可以始终使用数据 URI 将资源直接嵌入到 webview 中。

### 控制对本地资源的访问

Webview 可以使用 `localResourceRoots` 选项控制可以从用户计算机加载哪些资源。`localResourceRoots` 定义了一组根 URI，可以从中加载本地内容。

我们可以使用 `localResourceRoots` 来限制 **Cat Coding** webview 仅加载我们插件中 `media` 目录的资源：

```ts
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('catCoding.start', () => {
      const panel = vscode.window.createWebviewPanel(
        'catCoding',
        'Cat Coding',
        vscode.ViewColumn.One,
        {
          // Only allow the webview to access resources in our extension's media directory
          localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, 'media')]
        }
      );

      const onDiskPath = vscode.Uri.joinPath(context.extensionUri, 'media', 'cat.gif');
      const catGifSrc = panel.webview.asWebviewUri(onDiskPath);

      panel.webview.html = getWebviewContent(catGifSrc);
    })
  );
}
```

要禁止所有本地资源，只需将 `localResourceRoots` 设置为 `[]`。

通常，webview 在加载本地资源时应尽可能严格。但是，请记住，`localResourceRoots` 本身并不能提供完整的安全保护。确保您的 webview 也遵循 [安全最佳实践](#security)，并添加 [内容安全策略](#content-security-policy) 以进一步限制可以加载的内容。

### 设置 webview 内容的主题

Webview 可以使用 CSS 根据 Baosky 的当前主题更改其外观。Baosky 将主题分为三类，并向 `body` 元素添加一个特殊的类来指示当前主题：

- `vscode-light` - 浅色主题。
- `vscode-dark` - 深色主题。
- `vscode-high-contrast` - 高对比度主题。

以下 CSS 根据用户的当前主题更改 webview 的文本颜色：

```css
body.vscode-light {
  color: black;
}

body.vscode-dark {
  color: white;
}

body.vscode-high-contrast {
  color: red;
}
```

在开发 webview 应用程序时，请确保它适用于这三种类型的主题。并始终在高对比度模式下测试您的 webview，以确保视力障碍人士可以使用它。

Webview 还可以使用 [CSS 变量](https://developer.mozilla.org/docs/Web/CSS/Using_CSS_variables) 访问 Baosky 主题颜色。这些变量名称以 `vscode` 为前缀，并将 `.` 替换为 `-`。例如 `editor.foreground` 变为 `var(--vscode-editor-foreground)`：

```css
code {
  color: var(--vscode-editor-foreground);
}
```

查看 [主题颜色参考](/api/references/theme-color) 以获取可用的主题变量。有一个可用的 [插件](#)，它为变量提供 IntelliSense 建议。

还定义了以下与字体相关的变量：

- `--vscode-editor-font-family` - 编辑器字体系列（来自 `editor.fontFamily` 设置）。
- `--vscode-editor-font-weight` - 编辑器字体粗细（来自 `editor.fontWeight` 设置）。
- `--vscode-editor-font-size` - 编辑器字体大小（来自 `editor.fontSize` 设置）。

最后，对于您需要编写针对单个主题的 CSS 的特殊情况，webview 的 body 元素具有一个名为 `vscode-theme-id` 的数据属性，该属性存储当前活动主题的 ID。这使您可以为 webview 编写特定于主题的 CSS：

```css
body[data-vscode-theme-id="One Dark Pro"] {
    background: hotpink;
}
```

### 支持的媒体格式

Webview 支持音频和视频，但并非支持所有媒体编解码器或媒体文件容器类型。

Webview 中可以使用以下音频格式：

- Wav
- Mp3
- Ogg
- Flac

Webview 中可以使用以下视频格式：

- H.264
- VP8

对于视频文件，请确保视频和音频轨道的媒体格式均受支持。例如，许多 `.mp4` 文件使用 `H.264` 视频和 `AAC` 音频。Baosky 将能够播放 `mp4` 的视频部分，但由于不支持 `AAC` 音频，因此不会有声音。您需要为音频轨道使用 `mp3`。

### 上下文菜单

高级 webview 可以自定义用户在 webview 内部右键单击时显示的上下文菜单。这是使用类似于 Baosky 常规上下文菜单的 [贡献点](/api/references/contribution-points) 完成的，因此自定义菜单非常适合编辑器的其余部分。Webview 还可以为 webview 的不同部分显示自定义上下文菜单。

要将新的上下文菜单项添加到您的 webview，首先在新的 `webview/context` 部分下的 `menus` 中添加一个新条目。每个贡献都需要一个 `command`（这也是项目标题的来源）和一个 `when` 子句。[when 子句](/api/references/when-clause-contexts) 应包含 `webviewId == 'YOUR_WEBVIEW_VIEW_TYPE'`，以确保上下文菜单仅适用于您的插件的 webview：

```json
"contributes": {
  "menus": {
    "webview/context": [
      {
        "command": "catCoding.yarn",
        "when": "webviewId == 'catCoding'"
      },
      {
        "command": "catCoding.insertLion",
        "when": "webviewId == 'catCoding' && webviewSection == 'editor'"
      }
    ]
  },
  "commands": [
    {
      "command": "catCoding.yarn",
      "title": "Yarn 🧶",
      "category": "Cat Coding"
    },
    {
      "command": "catCoding.insertLion",
      "title": "Insert 🦁",
      "category": "Cat Coding"
    },
    ...
  ]
}
```

在 webview 内部，您还可以使用 `data-vscode-context` [数据属性](https://developer.mozilla.org/docs/Learn/HTML/Howto/Use_data_attributes)（或在 JavaScript 中使用 `dataset.vscodeContext`）设置 HTML 特定区域的上下文。`data-vscode-context` 值是一个 JSON 对象，指定用户右键单击元素时要设置的上下文。最终上下文是通过从文档根目录到被点击的元素确定的。

考虑这个 HTML 示例：

```html
<div class="main" data-vscode-context='{"webviewSection": "main", "mouseCount": 4}'>
  <h1>Cat Coding</h1>

  <textarea data-vscode-context='{"webviewSection": "editor", "preventDefaultContextMenuItems": true}'></textarea>
</div>
```

如果用户右键单击 `textarea`，将设置以下上下文：

* `webviewSection == 'editor'` - 这会覆盖父元素的 `webviewSection`。
* `mouseCount == 4` - 这是从父元素继承的。
* `preventDefaultContextMenuItems == true` - 这是一个特殊的上下文，用于隐藏 Baosky 通常添加到 webview 上下文菜单中的复制和粘贴条目。

如果用户在 `<textarea>` 内部右键单击，他们将看到：

<!-- 图片已移除 -->

有时在左键/主键单击时显示菜单很有用。例如，在拆分按钮上显示菜单。您可以通过在 `onClick` 事件中分派 `contextmenu` 事件来执行此操作：

```html
<button data-vscode-context='{"preventDefaultContextMenuItems": true }' onClick='((e) => {
        e.preventDefault();
        e.target.dispatchEvent(new MouseEvent("contextmenu", { bubbles: true, clientX: e.clientX, clientY: e.clientY }));
        e.stopPropagation();
    })(event)'>Create</button>
```

<!-- 图片已移除 -->


## 脚本和消息传递

Webview 就像 iframe 一样，这意味着它们也可以运行脚本。默认情况下，webview 中禁用 JavaScript，但可以通过传入 `enableScripts: true` 选项轻松重新启用。

让我们使用一个脚本来添加一个计数器，跟踪我们的猫编写的源代码行数。运行基本脚本非常简单，但请注意，此示例仅用于演示目的。在实践中，您的 webview 应始终使用 [内容安全策略](#content-security-policy) 禁用内联脚本：

```ts
import * as path from 'path';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('catCoding.start', () => {
      const panel = vscode.window.createWebviewPanel(
        'catCoding',
        'Cat Coding',
        vscode.ViewColumn.One,
        {
          // Enable scripts in the webview
          enableScripts: true
        }
      );

      panel.webview.html = getWebviewContent();
    })
  );
}

function getWebviewContent() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Coding</title>
</head>
<body>
    <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
    <h1 id="lines-of-code-counter">0</h1>

    <script>
        const counter = document.getElementById('lines-of-code-counter');

        let count = 0;
        setInterval(() => {
            counter.textContent = count++;
        }, 100);
    </script>
</body>
</html>`;
}
```

<!-- 图片已移除 -->

哇！真是一只多产的猫。

Webview 脚本几乎可以做普通网页上脚本可以做的任何事情。但请记住，webview 存在于其自己的上下文中，因此 webview 中的脚本无法访问 Baosky API。这就是消息传递的用武之地！

### 从插件向 webview 传递消息

插件可以使用 `webview.postMessage()` 向其 webview 发送数据。此方法将任何 JSON 可序列化数据发送到 webview。消息在 webview 内部通过标准 `message` 事件接收。

为了演示这一点，让我们向 **Cat Coding** 添加一个新命令，指示当前正在编码的猫重构其代码（从而减少总行数）。新的 `catCoding.doRefactor` 命令使用 `postMessage` 将指令发送到当前 webview，并在 webview 本身内部使用 `window.addEventListener('message', event => { ... })` 来处理消息：

```ts
export function activate(context: vscode.ExtensionContext) {
  // Only allow a single Cat Coder
  let currentPanel: vscode.WebviewPanel | undefined = undefined;

  context.subscriptions.push(
    vscode.commands.registerCommand('catCoding.start', () => {
      if (currentPanel) {
        currentPanel.reveal(vscode.ViewColumn.One);
      } else {
        currentPanel = vscode.window.createWebviewPanel(
          'catCoding',
          'Cat Coding',
          vscode.ViewColumn.One,
          {
            enableScripts: true
          }
        );
        currentPanel.webview.html = getWebviewContent();
        currentPanel.onDidDispose(
          () => {
            currentPanel = undefined;
          },
          undefined,
          context.subscriptions
        );
      }
    })
  );

  // Our new command
  context.subscriptions.push(
    vscode.commands.registerCommand('catCoding.doRefactor', () => {
      if (!currentPanel) {
        return;
      }

      // Send a message to our webview.
      // You can send any JSON serializable data.
      currentPanel.webview.postMessage({ command: 'refactor' });
    })
  );
}

function getWebviewContent() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Coding</title>
</head>
<body>
    <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
    <h1 id="lines-of-code-counter">0</h1>

    <script>
        const counter = document.getElementById('lines-of-code-counter');

        let count = 0;
        setInterval(() => {
            counter.textContent = count++;
        }, 100);

        // Handle the message inside the webview
        window.addEventListener('message', event => {

            const message = event.data; // The JSON data our extension sent

            switch (message.command) {
                case 'refactor':
                    count = Math.ceil(count * 0.5);
                    counter.textContent = count;
                    break;
            }
        });
    </script>
</body>
</html>`;
}
```

<!-- 图片已移除 -->

### 从 webview 向插件传递消息

Webview 也可以将消息传回其插件。这是通过在 webview 内部的特殊 Baosky API 对象上使用 `postMessage` 函数来实现的。要访问 Baosky API 对象，请在 webview 内部调用 `acquireVsCodeApi`。此函数每个会话只能调用一次。您必须保留此方法返回的 Baosky API 实例，并将其分发给任何其他需要使用它的函数。

我们可以在 **Cat Coding** webview 中使用 Baosky API 和 `postMessage`，以便当我们的猫在其代码中引入错误时向插件发出警报：

```js
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('catCoding.start', () => {
      const panel = vscode.window.createWebviewPanel(
        'catCoding',
        'Cat Coding',
        vscode.ViewColumn.One,
        {
          enableScripts: true
        }
      );

      panel.webview.html = getWebviewContent();

      // Handle messages from the webview
      panel.webview.onDidReceiveMessage(
        message => {
          switch (message.command) {
            case 'alert':
              vscode.window.showErrorMessage(message.text);
              return;
          }
        },
        undefined,
        context.subscriptions
      );
    })
  );
}

function getWebviewContent() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Coding</title>
</head>
<body>
    <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
    <h1 id="lines-of-code-counter">0</h1>

    <script>
        (function() {
            const vscode = acquireVsCodeApi();
            const counter = document.getElementById('lines-of-code-counter');

            let count = 0;
            setInterval(() => {
                counter.textContent = count++;

                // Alert the extension when our cat introduces a bug
                if (Math.random() < 0.001 * count) {
                    vscode.postMessage({
                        command: 'alert',
                        text: '🐛  on line ' + count
                    })
                }
            }, 100);
        }())
    </script>
</body>
</html>`;
}
```

<!-- 图片已移除 -->

出于安全原因，您必须将 Baosky API 对象保密，并确保其永远不会泄露到全局范围。

### 使用 Web Workers

[Web Workers](https://developer.mozilla.org/docs/Web/API/Web_Workers_API/Using_web_workers) 在 webview 内部受支持，但有一些重要的限制需要注意。

首先，worker 只能使用 `data:` 或 `blob:` URI 加载。您不能直接从您的插件文件夹加载 worker。

如果您确实需要从插件中的 JavaScript 文件加载 worker 代码，请尝试使用 `fetch`：

```js
const workerSource = 'absolute/path/to/worker.js';

fetch(workerSource)
  .then(result => result.blob())
  .then(blob => {
    const blobUrl = URL.createObjectURL(blob)
    new Worker(blobUrl);
  });
```

Worker 脚本也不支持使用 `importScripts` 或 `import(...)` 导入源代码。如果您的 worker 动态加载代码，请尝试使用像 [webpack](https://webpack.js.org) 这样的打包器将 worker 脚本打包成单个文件。

使用 `webpack`，您可以使用 `LimitChunkCountPlugin` 强制将编译后的 worker JavaScript 变成单个文件：

```js
const path = require('path');
const webpack = require('webpack');

module.exports = {
  target: 'webworker',
  entry: './worker/src/index.js',
  output: {
    filename: 'worker.js',
    path: path.resolve(__dirname, 'media'),
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
};
```

## 安全性

与任何网页一样，创建 webview 时，您必须遵循一些基本的安全最佳实践。

### 限制功能

Webview 应具有其所需的最小功能集。例如，如果您的 webview 不需要运行脚本，请不要设置 `enableScripts: true`。如果您的 webview 不需要从用户的工作区加载资源，请将 `localResourceRoots` 设置为 `[vscode.Uri.file(extensionContext.extensionPath)]` 甚至 `[]` 以禁止访问所有本地资源。

### 内容安全策略

[内容安全策略](https://developers.google.com/web/fundamentals/security/csp/) 进一步限制了可以在 webview 中加载和执行的内容。例如，内容安全策略可以确保只有允许的脚本列表才能在 webview 中运行，甚至告诉 webview 仅通过 `https` 加载图像。

要添加内容安全策略，请在 webview 的 `<head>` 顶部放置 `<meta http-equiv="Content-Security-Policy">` 指令

```ts
function getWebviewContent() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta http-equiv="Content-Security-Policy" content="default-src 'none';">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Cat Coding</title>
</head>
<body>
    ...
</body>
</html>`;
}
```

策略 `default-src 'none';` 禁止所有内容。然后，我们可以重新打开我们的插件运行所需的最小量内容。这是一个允许加载本地脚本和样式表，并通过 `https` 加载图像的内容安全策略：

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'none'; img-src ${webview.cspSource} https:; script-src ${webview.cspSource}; style-src ${webview.cspSource};"
/>
```

`${webview.cspSource}` 值是一个占位符，用于来自 webview 对象本身的值。有关如何使用此值的完整示例，请参阅 [webview 示例](https://github.com/microsoft/baosky-extension-samples/blob/main/webview-sample)。

此内容安全策略还隐式禁用了内联脚本和样式。最佳做法是将所有内联样式和脚本提取到外部文件中，以便可以在不放宽内容安全策略的情况下正确加载它们。

### 仅通过 https 加载内容

如果您的 webview 允许加载外部资源，强烈建议您仅允许通过 `https` 加载这些资源，而不是通过 http。上面的示例内容安全策略已经通过仅允许通过 `https:` 加载图像来做到这一点。

### 清理所有用户输入

就像普通网页一样，在为 webview 构造 HTML 时，必须清理所有用户输入。未能正确清理输入可能会允许内容注入，这可能会使用户面临安全风险。

必须清理的示例值：

- 文件内容。
- 文件和文件夹路径。
- 用户和工作区设置。

考虑使用辅助库来构造 HTML 字符串，或者至少确保来自用户工作区的所有内容都已正确清理。

永远不要仅仅依靠清理来保证安全。确保遵循其他安全最佳实践，例如拥有 [内容安全策略](#content-security-policy) 以尽量减少任何潜在内容注入的影响。

## 持久性

在标准 webview [生命周期](#lifecycle) 中，webview 由 `createWebviewPanel` 创建，并在用户关闭它们或调用 `.dispose()` 时销毁。然而，webview 的内容是在 webview 变为可见时创建的，并在 webview 移至后台时销毁。当 webview 移至后台选项卡时，webview 内的任何状态都将丢失。

解决此问题的最佳方法是使您的 webview 无状态。使用 [消息传递](#passing-messages-from-a-webview-to-an-extension) 保存 webview 的状态，然后在 webview 再次变为可见时恢复状态。

### getState 和 setState

在 webview 内部运行的脚本可以使用 `getState` 和 `setState` 方法来保存和恢复 JSON 可序列化状态对象。即使当 webview 面板隐藏导致 webview 内容本身被销毁后，此状态也会保留。当 webview 面板被销毁时，状态将被销毁。

```js
// Inside a webview script
const vscode = acquireVsCodeApi();

const counter = document.getElementById('lines-of-code-counter');

// Check if we have an old state to restore from
const previousState = vscode.getState();
let count = previousState ? previousState.count : 0;
counter.textContent = count;

setInterval(() => {
  counter.textContent = count++;
  // Update the saved state
  vscode.setState({ count });
}, 100);
```

`getState` 和 `setState` 是持久化状态的首选方法，因为它们的性能开销比 `retainContextWhenHidden` 低得多。

### 序列化

通过实现 `WebviewPanelSerializer`，您的 webview 可以在 Baosky 重新启动时自动恢复。序列化建立在 `getState` 和 `setState` 之上，并且仅当您的插件为您的 webview 注册了 `WebviewPanelSerializer` 时才启用。

为了使我们的编码猫在 Baosky 重新启动后仍然存在，首先将 `onWebviewPanel` 激活事件添加到插件的 `package.json`：

```json
"activationEvents": [
    ...,
    "onWebviewPanel:catCoding"
]
```

此激活事件确保每当 Baosky 需要恢复具有 viewType：`catCoding` 的 webview 时，我们的插件都会被激活。

然后，在插件的 `activate` 方法中，调用 `registerWebviewPanelSerializer` 注册一个新的 `WebviewPanelSerializer`。`WebviewPanelSerializer` 负责从持久化状态恢复 webview 的内容。此状态是 webview 内容使用 `setState` 设置的 JSON blob。

```ts
export function activate(context: vscode.ExtensionContext) {
  // Normal setup...

  // And make sure we register a serializer for our webview type
  vscode.window.registerWebviewPanelSerializer('catCoding', new CatCodingSerializer());
}

class CatCodingSerializer implements vscode.WebviewPanelSerializer {
  async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel, state: any) {
    // `state` is the state persisted using `setState` inside the webview
    console.log(`Got state: ${state}`);

    // Restore the content of our webview.
    //
    // Make sure we hold on to the `webviewPanel` passed in here and
    // also restore any event listeners we need on it.
    webviewPanel.webview.html = getWebviewContent();
  }
}
```

现在，如果您在打开猫编码面板的情况下重新启动 Baosky，该面板将自动恢复到相同的编辑器位置。

### retainContextWhenHidden

对于具有非常复杂的 UI 或无法快速保存和恢复的状态的 webview，您可以改用 `retainContextWhenHidden` 选项。此选项使 webview 保持其内容，但处于隐藏状态，即使 webview 本身不再处于前台也是如此。

虽然 **Cat Coding** 很难说具有复杂状态，但让我们尝试启用 `retainContextWhenHidden` 以查看该选项如何改变 webview 的行为：

```ts
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('catCoding.start', () => {
      const panel = vscode.window.createWebviewPanel(
        'catCoding',
        'Cat Coding',
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          retainContextWhenHidden: true
        }
      );
      panel.webview.html = getWebviewContent();
    })
  );
}

function getWebviewContent() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Coding</title>
</head>
<body>
    <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
    <h1 id="lines-of-code-counter">0</h1>

    <script>
        const counter = document.getElementById('lines-of-code-counter');

        let count = 0;
        setInterval(() => {
            counter.textContent = count++;
        }, 100);
    </script>
</body>
</html>`;
}
```

<!-- 图片已移除 -->

请注意，现在当 webview 隐藏然后恢复时，计数器不会重置。无需额外的代码！使用 `retainContextWhenHidden`，webview 的行为类似于 Web 浏览器中的后台选项卡。脚本和其他动态内容即使在选项卡不活动或不可见时也会继续运行。当启用 `retainContextWhenHidden` 时，您还可以向隐藏的 webview 发送消息。

尽管 `retainContextWhenHidden` 可能很吸引人，但请记住，这具有很高的内存开销，并且仅应在其他持久性技术不起作用时使用。

## 辅助功能

`vscode-using-screen-reader` 类将在用户使用屏幕阅读器操作 Baosky 的上下文中添加到 webview 的主体中。此外，在用户表示偏好减少窗口中的运动量的情况下，`vscode-reduce-motion` 类将添加到文档的主体元素中。通过观察这些类并相应地调整您的渲染，您的 webview 内容可以更好地反映用户的偏好。

## 下一步

如果您想了解有关 Baosky 可扩展性的更多信息，请尝试以下主题：

- [插件 API](/api) - 了解完整的 Baosky 插件 API。
- [插件功能](/api/extension-capabilities/overview) - 查看扩展 Baosky 的其他方法。