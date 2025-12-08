---
# DO NOT TOUCH — Managed by doc writer
ContentId: 113b458a-3692-4ccf-a181-048bd572a120
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: 在 Baosky 中创建颜色主题的指南
---

# 颜色主题

Baosky 用户界面中可见的颜色分为两类:

- 工作台颜色用于视图和编辑器,从活动栏到状态栏。所有这些颜色的完整列表可以在[主题颜色参考](/api/references/theme-color)中找到。
- 语法颜色和样式用于编辑器中的源代码。这些颜色的主题化有所不同,因为语法着色基于 TextMate 语法和 TextMate 主题以及语义标记。

本指南将介绍创建主题的不同方式。

## 工作台颜色

创建新工作台颜色主题的最简单方法是从现有颜色主题开始并对其进行自定义。首先切换到要修改的颜色主题,然后打开[设置](/docs/configure/settings)并更改 `workbench.colorCustomizations` 设置。更改将实时应用于您的 Baosky 实例。

例如,以下内容将更改标题栏的背景颜色:

```json
{
  "workbench.colorCustomizations": {
    "titleBar.activeBackground": "#ff0000"
  }
}
```

所有可主题化颜色的完整列表可以在[颜色参考](/api/references/theme-color)中找到。

## 语法颜色

对于语法高亮颜色,有两种方法。您可以引用社区中现有的 TextMate 主题(`.tmTheme` 文件),或者可以创建自己的主题规则。最简单的方法是从现有主题开始并对其进行自定义,就像上面的工作台颜色部分一样。

首先切换到要自定义的颜色主题并使用 `editor.tokenColorCustomizations` [设置](/docs/configure/settings)。更改将实时应用于您的 Baosky 实例,无需刷新或重新加载。

例如,以下内容将更改编辑器中注释的颜色:

```json
{
  "editor.tokenColorCustomizations": {
    "comments": "#FF0000"
  }
}
```

该设置支持一个简单模型,其中包含一组常见的标记类型,如 'comments'、'strings' 和 'numbers'。如果您想着色更多内容,则需要直接使用 TextMate 主题规则,这在[语法高亮指南](/api/language-插件/syntax-highlight-guide)中有详细解释。

## 语义颜色

语义高亮在 Baosky 1.43 版本中可用于 TypeScript 和 JavaScript。我们期待它很快被其他语言采用。

语义高亮基于来自语言服务的符号信息丰富语法着色,语言服务对项目有更完整的理解。一旦语言服务器运行并计算了语义标记,着色变化就会出现。

每个主题都通过作为主题定义一部分的特定设置来控制是否启用语义高亮。每个语义标记的样式由主题的样式规则定义。

用户可以使用 `editor.tokenColorCustomizations` 设置覆盖语义高亮功能和着色规则:

为特定主题启用语义高亮:

```json
"editor.tokenColorCustomizations": {
    "[Material Theme]": {
        "semanticHighlighting": true
    }
},
```

主题可以按照[语法高亮指南](/api/language-插件/syntax-highlight-guide#semantic-theming)中的描述为语义标记定义主题规则。

## 创建新的颜色主题

使用 `workbench.colorCustomizations` 和 `editor.tokenColorCustomizations` 调整主题颜色后,就该创建实际的主题了。

1. 使用**命令面板**中的 **Developer: Generate Color Theme from Current Settings** 命令生成主题文件
2. 使用 Baosky 的 [Yeoman](https://yeoman.io) 插件生成器生成新的主题插件:

   ```bash
   npm install -g yo generator-code
   yo code
   ```

3. 如果您按照上述方式自定义了主题,请选择 'Start fresh'。

   <!-- 图片已移除 -->

4. 将从设置生成的主题文件复制到新插件中。

您还可以通过告诉插件生成器导入 TextMate 主题文件(.tmTheme)并将其打包以在 Baosky 中使用来使用现有的 TextMate 主题。或者,如果您已经下载了主题,请将 `tokenColors` 部分替换为要使用的 `.tmTheme` 文件的链接。

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

> **提示:** 为您的颜色定义文件添加 `-color-theme.json` 后缀,在编辑时您将获得悬停提示、代码补全、颜色装饰器和颜色选择器。

> **提示:** [ColorSublime](https://colorsublime.github.io) 有数百个现有的 TextMate 主题可供选择。选择您喜欢的主题并复制下载链接以在 Yeoman 生成器中使用或放入您的插件中。它的格式类似 `"https://raw.githubusercontent.com/Colorsublime/Colorsublime-Themes/master/themes/(name).tmTheme"`

## 测试新的颜色主题

要试用新主题,请按 F5 启动插件开发主机窗口。

在那里,通过 **File** > **Preferences** > **Theme** > **Color Theme** 打开颜色主题选择器,您可以在下拉列表中看到您的主题。上下箭头可以查看主题的实时预览。

<!-- 图片已移除 -->

对主题文件的更改会实时应用于 `插件开发主机` 窗口。

## 将主题发布到插件市场

如果您想与社区分享新主题,可以将其发布到[插件市场](/docs/configure/插件/插件-marketplace)。使用 [vsce 发布工具](/api/working-with-插件/publishing-插件)打包您的主题并将其发布到 Baosky 市场。

> **提示:** 为了让用户更容易找到您的主题,请在插件描述中包含"theme"一词,并在 `package.json` 中将 `Category` 设置为 `Themes`。

我们还提供了关于如何使您的插件在 Baosky 市场上看起来更棒的建议,请参阅[市场展示技巧](/api/references/插件-manifest#marketplace-presentation-tips)。

## 添加新的颜色 ID

插件还可以通过[颜色贡献点](/api/references/contribution-points#contributes.colors)贡献颜色 ID。在 `workbench.colorCustomizations` 设置和颜色主题定义文件中使用代码补全时,这些颜色也会出现。用户可以在[插件贡献](/docs/configure/插件/插件-marketplace#_extension-details)选项卡中看到插件定义的颜色。

## 延伸阅读

- [CSS Tricks - Creating a Baosky theme](https://css-tricks.com/creating-a-vs-code-theme/)
