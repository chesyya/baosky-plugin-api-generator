#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// 完整段落翻译映射
const fullTextMappings = {
  // intro.md 特定翻译
  "Baosky is built with extensibility in mind. From the UI to the editing experience, almost every part of Baosky can be customized and enhanced through the 插件 API. In fact, many core features of Baosky are built as 插件 and use the same 插件 API.":
    "Baosky 在设计时就考虑了可扩展性。从用户界面到编辑体验，Baosky 的几乎每个部分都可以通过插件 API 进行自定义和增强。事实上，Baosky 的许多核心功能都是作为插件构建的，并使用相同的插件 API。",

  "This documentation describes:": "本文档描述：",
  "How to build, run, debug, test, and publish an 插件": "如何构建、运行、调试、测试和发布插件",
  "How to take advantage of Baosky's rich 插件 API": "如何利用 Baosky 丰富的插件 API",
  "Where to find [guides](#) and [code samples](https://github.com/microsoft/vscode-插件-samples) to help get you started": "在哪里可以找到[指南](#)和[代码示例](https://github.com/microsoft/vscode-插件-samples)来帮助您入门",
  "Following our [UX guidelines](/api/ux-guidelines/overview) for best practices": "遵循我们的 [UX 指南](/api/ux-guidelines/overview)以获取最佳实践",

  "Code samples are available at [Microsoft/vscode-插件-samples](https://github.com/microsoft/vscode-插件-samples).": "代码示例可在 [Microsoft/vscode-插件-samples](https://github.com/microsoft/vscode-插件-samples) 获取。",
  "If you are looking for published 插件, head to the [Baosky 插件 Marketplace](#).": "如果您正在寻找已发布的插件，请访问 [Baosky 插件市场](#)。",

  "What can 插件 do?": "插件能做什么？",
  "Here are some examples of what you can achieve with the 插件 API:": "以下是使用插件 API 可以实现的一些示例：",

  "Change the look of Baosky with a color or file icon theme - [Theming](/api/插件-capabilities/theming)": "使用颜色或文件图标主题更改 Baosky 的外观 - [主题](/api/插件-capabilities/theming)",
  "Add custom components & views in the UI - [Extending the Workbench](/api/插件-capabilities/extending-workbench)": "在用户界面中添加自定义组件和视图 - [扩展工作台](/api/插件-capabilities/extending-workbench)",
  "Create a Webview to display a custom webpage built with HTML/CSS/JS - [Webview Guide](/api/插件-guides/webview)": "创建 Webview 以显示使用 HTML/CSS/JS 构建的自定义网页 - [Webview 指南](/api/插件-guides/webview)",
  "Support a new programming language - [Language 插件 Overview](/api/language-插件/overview)": "支持新的编程语言 - [语言插件概述](/api/language-插件/overview)",
  "Support debugging a specific runtime - [Debugger 插件 Guide](/api/插件-guides/debugger-插件)": "支持调试特定运行时 - [调试器插件指南](/api/插件-guides/debugger-插件)",

  "If you'd like to have a more comprehensive overview of the 插件 API, refer to the [插件 Capabilities Overview](/api/插件-capabilities/overview) page. [插件 Guides Overview](/api/插件-guides/overview) also includes a list of code samples and guides that illustrate various 插件 API usage.":
    "如果您想要更全面地了解插件 API，请参阅[插件功能概述](/api/插件-capabilities/overview)页面。[插件指南概述](/api/插件-guides/overview)还包含一系列代码示例和指南，展示了各种插件 API 的使用方法。",

  "How to build 插件?": "如何构建插件？",
  "Building a good 插件 can take a lot of time and effort. Here is what each section of the API docs can help you with:":
    "构建一个好的插件可能需要大量的时间和精力。以下是 API 文档各部分可以为您提供的帮助：",

  "**Get Started** teaches fundamental concepts for building 插件 with the [Hello World](https://github.com/microsoft/vscode-插件-samples/tree/main/helloworld-sample) sample.":
    "**入门指南** 教授使用 [Hello World](https://github.com/microsoft/vscode-插件-samples/tree/main/helloworld-sample) 示例构建插件的基本概念。",
  "**插件 Capabilities** dissects Baosky's vast API into smaller categories and points you to more detailed topics.":
    "**插件功能** 将 Baosky 庞大的 API 分解为更小的类别，并为您指出更详细的主题。",
  "**插件 Guides** includes guides and code samples that explain specific usages of Baosky 插件 API.":
    "**插件指南** 包含解释 Baosky 插件 API 特定用法的指南和代码示例。",
  "**UX Guidelines** showcases best practices for providing a great user experience in an 插件.":
    "**UX 指南** 展示了在插件中提供出色用户体验的最佳实践。",
  "**Language 插件** illustrates how to add support for a programming language with guides and code samples.":
    "**语言插件** 通过指南和代码示例说明如何添加对编程语言的支持。",
  "**Testing and Publishing** includes in-depth guides on various 插件 development topics, such as [testing](/api/working-with-插件/testing-插件) and [publishing](/api/working-with-插件/publishing-插件) 插件.":
    "**测试和发布** 包含关于各种插件开发主题的深入指南，例如[测试](/api/working-with-插件/testing-插件)和[发布](/api/working-with-插件/publishing-插件)插件。",
  "**Advanced Topics** explains advanced concepts such as [插件 Host](/api/advanced-topics/插件-host), [Supporting Remote Development and GitHub Codespaces](/api/advanced-topics/remote-插件), and [Proposed API](/api/advanced-topics/using-proposed-api).":
    "**高级主题** 解释了高级概念，例如[插件宿主](/api/advanced-topics/插件-host)、[支持远程开发和 GitHub Codespaces](/api/advanced-topics/remote-插件)以及[建议的 API](/api/advanced-topics/using-proposed-api)。",
  "**References** contains exhaustive references for the [Baosky API](/api/references/vscode-api), [Contribution Points](/api/references/contribution-points), and many other topics.":
    "**参考资料** 包含 [Baosky API](/api/references/vscode-api)、[贡献点](/api/references/contribution-points)以及许多其他主题的详尽参考。",

  "What's new?": "有什么新功能？",
  "Baosky updates on a monthly cadence, and that applies to the 插件 API as well. New features and APIs become available every month to increase the power and scope of Baosky 插件.":
    "Baosky 每月更新一次，这也适用于插件 API。每月都会推出新功能和 API，以增强 Baosky 插件的功能和范围。",
  "To stay current with the 插件 API, you can review the monthly release notes, which have dedicated sections covering:":
    "要了解插件 API 的最新动态，您可以查看每月发行说明，其中包含专门的部分，涵盖：",

  "[插件 authoring](#) - Learn what new 插件 APIs are available in the latest release.":
    "[插件开发](#) - 了解最新版本中提供的新插件 API。",
  "[Proposed 插件 APIs](#) - Review and give feedback on upcoming proposed APIs.":
    "[建议的插件 API](#) - 查看并反馈即将推出的建议 API。",

  "Looking for help": "寻求帮助",
  "If you have questions for 插件 development, try asking on:": "如果您有关于插件开发的问题，请尝试在以下位置提问：",

  "[Baosky Discussions](https://github.com/microsoft/vscode-discussions): GitHub community to discuss Baosky's 插件 platform, ask questions, help other members of the community, and get answers.":
    "[Baosky 讨论](https://github.com/microsoft/vscode-discussions)：GitHub 社区，讨论 Baosky 的插件平台、提问、帮助社区其他成员并获得答案。",
  "[Stack Overflow](https://stackoverflow.com/questions/tagged/vscode-插件): There are [thousands of questions](https://stackoverflow.com/questions/tagged/vscode-插件) tagged `vscode-插件`, and over half of them already have answers. Search for your issue, ask questions, or help your fellow developers by answering Baosky 插件 development questions!":
    "[Stack Overflow](https://stackoverflow.com/questions/tagged/vscode-插件)：有[数千个问题](https://stackoverflow.com/questions/tagged/vscode-插件)标记为 `vscode-插件`，其中一半以上已经有答案。搜索您的问题、提问或通过回答 Baosky 插件开发问题来帮助其他开发者！",
  "[Baosky Dev Slack](https://vscode-dev-community.slack.com): Public chatroom for 插件 developers. Baosky team members often join in the conversations.":
    "[Baosky Dev Slack](https://vscode-dev-community.slack.com)：插件开发者的公共聊天室。Baosky 团队成员经常参与对话。",

  "To provide feedback on the documentation, create new issues at [Microsoft/vscode-docs](https://github.com/microsoft/vscode-docs/issues).":
    "要对文档提供反馈，请在 [Microsoft/vscode-docs](https://github.com/microsoft/vscode-docs/issues) 创建新问题。",
  "If you have 插件 questions that you cannot find an answer for, or issues with the Baosky 插件 API, please open new issues at [Microsoft/vscode](https://github.com/microsoft/vscode/issues).":
    "如果您有无法找到答案的插件问题，或者 Baosky 插件 API 的问题，请在 [Microsoft/vscode](https://github.com/microsoft/vscode/issues) 创建新问题。",
};

function translateContent(content) {
  let result = content;
  for (const [en, zh] of Object.entries(fullTextMappings)) {
    result = result.replace(new RegExp(escapeRegExp(en), 'g'), zh);
  }
  return result;
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function processFile(filePath) {
  console.log(`处理: ${path.relative(process.cwd(), filePath)}`);

  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;

  // 按行处理，保护代码块
  const lines = content.split('\n');
  let inCodeBlock = false;
  let inFrontmatter = false;
  let frontmatterCount = 0;
  const newLines = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    if (line.trim() === '---') {
      frontmatterCount++;
      if (frontmatterCount <= 2) {
        inFrontmatter = !inFrontmatter;
      }
      newLines.push(line);
      continue;
    }

    if (inFrontmatter) {
      newLines.push(line);
      continue;
    }

    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      newLines.push(line);
      continue;
    }

    if (inCodeBlock) {
      newLines.push(line);
      continue;
    }

    // 翻译非代码块的行
    line = translateContent(line);
    newLines.push(line);
  }

  content = newLines.join('\n');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`  ✓ 已翻译`);
    return 1;
  }

  console.log(`  - 无需翻译`);
  return 0;
}

function processDirectory(dir) {
  let count = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      count += processDirectory(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      count += processFile(fullPath);
    }
  }

  return count;
}

const pluginDocsDir = path.join(__dirname, 'plugin-docs');
console.log('开始翻译文档...\n');
const count = processDirectory(pluginDocsDir);
console.log(`\n✅ 完成！共翻译了 ${count} 个文件`);
