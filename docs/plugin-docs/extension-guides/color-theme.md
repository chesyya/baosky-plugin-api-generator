---
# DO NOT TOUCH — Managed by doc writer

ContentId: 113b458a-3692-4ccf-a181-048bd572a120
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: 在Baosky中创建颜色主题的指南
---

# 颜色主题

Baosky 用户界面中可见的颜色分为两类：

- 工作台颜色用于视图和编辑器，从活动栏到状态栏。所有这些颜色的完整列表可以在[主题颜色参考](/api/references/theme-color)中找到。
- 语法颜色和样式用于编辑器中的源代码。这些颜色的主题化不同，因为语法着色基于 TextMate 语法和 TextMate 主题以及语义令牌。

本指南将介绍创建主题的不同方式。

## 工作台颜色

创建新工作台颜色主题的最简单方法是从现有颜色主题开始并自定义它。首先切换到你想要修改的颜色主题，然后打开你的[设置](/docs/configure/settings)并更改 `workbench.colorCustomizations` 设置。更改会实时应用到你的 Baosky 实例。

例如，以下内容会更改标题栏的背景色：

```json
{
  "workbench.colorCustomizations": {
    "titleBar.activeBackground": "#ff0000"
  }
}
```

所有可主题化颜色的完整列表可以在[颜色参考](/api/references/theme-color)中找到。

## 语法颜色

对于语法高亮颜色，有两种方法。你可以引用社区的现有 TextMate 主题（`.tmTheme` 文件），或者你可以创建自己的主题规则。最简单的方法是从现有主题开始并自定义它，就像上面的工作台颜色部分一样。

首先切换到要自定义的颜色主题，然后使用 `editor.tokenColorCustomizations` [设置](/docs/configure/settings)。更改会实时应用到你的 Baosky 实例，不需要刷新或重新加载。

例如，以下内容会更改编辑器中注释的颜色：

```json
{
  "editor.tokenColorCustomizations": {
    "comments": "#FF0000"
  }
}
```

该设置支持一个简单的模型，其中包含一组常见的令牌类型，如 'comments'、'strings' 和 'numbers'。如果你想着色更多内容，你需要直接使用 TextMate 主题规则，这在[语法高亮指南](/api/language-插件/syntax-highlight-guide)中有详细说明。

## 语义颜色

语义高亮在 Baosky 1.43 版本中可用于 TypeScript 和 JavaScript。我们期望它很快会被其他语言采用。

语义高亮基于来自语言服务的符号信息丰富语法着色，语言服务对项目有更完整的理解。一旦语言服务器运行并计算出语义令牌，着色更改就会出现。

每个主题都通过主题定义中的特定设置来控制是否启用语义高亮。每个语义令牌的样式由主题的样式规则定义。

用户可以使用 `editor.tokenColorCustomizations` 设置覆盖语义高亮功能和着色规则：

为特定主题启用语义高亮：

```json
"editor.tokenColorCustomizations": {
    "[Material Theme]": {
        "semanticHighlighting": true
    }
},
```

主题可以为语义令牌定义主题规则，如[语法高亮指南](/api/language-插件/syntax-highlight-guide#semantic-theming)中所述。

## 创建一个新的颜色主题

使用 `工作台.colorCustomizations` 和 `editor.tokenColorCustomizations` 调整主题颜色后，就可以创建实际的主题了。

1. 使用 ** 命令面板 ** 中的 ** 开发人员：从当前设置生成颜色主题 ** 命令生成主题文件
2. 使用Baosky的[Yeoman](https://yeoman.io)插件生成器生成新的主题插件：

   ```bash
   npm install -g yo generator-code
   yo code
   ```

3. 如果您如上所述自定义了主题，请选择“重新开始”。

   <!-- 图片已移除 -->

4. 将根据您的设置生成的主题文件复制到新的插件中。

您还可以通过告诉插件生成器导入 TextMate 主题文件 (.tmTheme) 并将其打包以在 Baosky 中使用来使用现有的 TextMate 主题。或者，如果您已经下载了主题，请将 `tokenColors` 部分替换为要使用的 `.tmTheme` 文件的链接。

```json
{
  "type": "dark",
  "colors": {
    "editor.background": "#1e1e1e",
    "editor.foreground": "#d4d4d4",
    "editorIndentGuide.background": "#404040",
    "editorRuler.foreground": "#333333",
    "activityBarBadge.background": "#007acc",
    "sideBarTitle.foreground": "#bbbbbb"
  },
  "tokenColors": "./Diner.tmTheme"
}
```

> ** 提示： ** 为您的颜色定义文件添加 `-color-主题.json` 后缀，您将在编辑时获得悬停、代码完成、颜色装饰器和颜色选择器。

> ** 提示： ** [ColorSublime](https://colorsublime.github.io) 有数百个现有 TextMate 主题可供选择。选择您喜欢的主题，然后复制下载链接以在 Yeoman 生成器中使用或插入您的插件中。其格式类似于 `"https://raw.githubusercontent.com/Colorsublime/Colorsublime-Themes/master/themes/(name).tmTheme"`

## 测试新的颜色主题

要 try out the new theme, press F5 要 launch an 插件 Development Host window.

在那里，通过 ** 文件 ** > ** 首选项 ** > ** 主题 ** > ** 颜色主题 ** 打开颜色主题选择器，您可以在下拉列表中看到您的主题。向上和向下箭头可查看主题的实时预览。

<!-- 图片已移除 -->

对主题文件的更改将实时应用在 `插件 Development Host` 窗口中。

## 将主题发布到插件市场

如果您想与社区分享您的新主题，可以将其发布到 [插件 市场](/docs/configure/插件/插件-市场)。使用[vsce publishing tool](/api/working-with-插件/publishing-插件)打包您的主题并将其发布到Baosky 市场。

> ** 提示： ** 为了让用户轻松找到您的主题，请在插件描述中包含“主题”一词，并将 `package.json` 中的 `Category` 设置为 `Themes`。

我们还提供了有关如何使您的插件在 Baosky 市场 上看起来很棒的建议，请参阅 [市场 Presentation Tips](/api/references/插件-清单#市场-presentation-tips)。

## 添加新的颜色 ID

颜色 ID 也可以由插件通过 [color contribution point](/api/references/contribution-points#contributes.colors) 提供。当使用 `工作台.colorCustomizations` 设置和颜色主题定义文件中的完整代码时，也会出现这些颜色。用户可以在 [插件 contributions](/docs/configure/插件/插件-市场#_extension-details) 选项卡中查看插件定义的颜色。

## 进一步阅读

- [CSS Tricks - Creating a Baosky 主题](https://css-tricks.com/creating-a-vs-code-主题/)
