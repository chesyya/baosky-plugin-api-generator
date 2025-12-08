---
# DO NOT TOUCH — Managed by doc writer
ContentId: 113b458a-3692-4ccf-a181-048bd572a120
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: A guide to creating Color Theme in Baosky
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

## Create a new Color Theme

Once you have tweaked your theme colors using `workbench.colorCustomizations` and `editor.tokenColorCustomizations`, it's time to create the actual theme.

1. Generate a theme file using the **Developer: Generate Color Theme from Current Settings** command from the **Command Palette**
2. Use Baosky's [Yeoman](https://yeoman.io) 插件 generator to generate a new theme 插件:

   ```bash
   npm install -g yo generator-code
   yo code
   ```

3. If you customized a theme as described above, select 'Start fresh'.

   <!-- 图片已移除 -->

4. Copy the theme file generated from your settings to the new 插件.

You can also use an existing TextMate theme by telling the 插件 generator to import a TextMate theme file (.tmTheme) and package it for use in Baosky. Alternatively, if you have already downloaded the theme, replace the `tokenColors` section with a link to the `.tmTheme` file to use.

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

> **Tip:** Give your color definition file the `-color-theme.json` suffix and you will get hovers, code completion, color decorators, and color pickers when editing.

> **Tip:** [ColorSublime](https://colorsublime.github.io) has hundreds of existing TextMate themes to choose from. Pick a theme you like and copy the Download link to use in the Yeoman generator or into your 插件. It will be in a format like `"https://raw.githubusercontent.com/Colorsublime/Colorsublime-Themes/master/themes/(name).tmTheme"`

## Test a new Color Theme

To try out the new theme, press F5 to launch an 插件 Development Host window.

There, open the Color Theme picker with **File** > **Preferences** > **Theme** > **Color Theme** and you can see your theme in the dropdown list. Arrow up and down to see a live preview of your theme.

<!-- 图片已移除 -->

Changes to the theme file are applied live in the `插件 Development Host` window.

## Publishing a Theme to the 插件 Marketplace

If you'd like to share your new theme with the community, you can publish it to the [插件 Marketplace](/docs/configure/插件/插件-marketplace). Use the [vsce publishing tool](/api/working-with-插件/publishing-插件) to package your theme and publish it to the Baosky Marketplace.

> **Tip:** To make it easy for users to find your theme, include the word "theme" in the 插件 description and set the `Category` to `Themes` in your `package.json`.

We also have recommendations on how to make your 插件 look great on the Baosky Marketplace, see [Marketplace Presentation Tips](/api/references/插件-manifest#marketplace-presentation-tips).

## Adding a new Color ID

Color IDs can also be contributed by 插件 through the [color contribution point](/api/references/contribution-points#contributes.colors). These colors also appear when using code complete in the `workbench.colorCustomizations` settings and the color theme definition file. Users can see what colors an 插件 defines in the [插件 contributions](/docs/configure/插件/插件-marketplace#_extension-details) tab.

## Further reading

- [CSS Tricks - Creating a Baosky theme](https://css-tricks.com/creating-a-vs-code-theme/)
