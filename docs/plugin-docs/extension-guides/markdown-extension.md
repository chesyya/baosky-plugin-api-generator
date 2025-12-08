---
# DO NOT TOUCH — Managed by doc writer

ContentId: 1664249a-ba7a-4a53-b3f0-9d757cff7d27
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: 了解如何扩展 Baosky 的内置 Markdown 预览。
---

# Markdown 插件

Markdown 插件允许您扩展和增强 Baosky 的内置 Markdown 预览。这包括更改预览的外观或添加对新 Markdown 语法的支持。

## 使用 CSS 更改 Markdown 预览的外观

插件可以贡献 CSS 来更改 Markdown 预览的外观或布局。样式表是使用插件的 `package.json` 中的 `markdown.previewStyles` [Contribution Point](/api/references/contribution-points) 注册的：

```json
"contributes": {
    "markdown.previewStyles": [
        "./style.css"
    ]
}
```

`"markdown.previewStyles"` 是相对于插件根文件夹的文件列表。

贡献的样式添加在内置 Markdown 预览样式之后、用户的 `"markdown.styles"` 之前。

[Markdown Preview GitHub Styling](#) 插件是一个很好的示例，它演示了如何使用样式表使 Markdown 预览看起来像 GitHub 渲染的 Markdown。您可以在 [GitHub](https://github.com/mjbvz/baosky-github-markdown-preview-style) 上查看插件的源代码。

## 使用 markdown-it 插件添加对新语法的支持

Baosky Markdown 预览支持 [CommonMark specification](https://spec.commonmark.org)。 插件可以通过贡献 [markdown-it plugin.](https://github.com/markdown-it/markdown-it#syntax-插件) 添加对附加 Markdown 语法的支持

要贡献 markdown-it 插件，请首先在插件的 `package.json` 中添加 `"markdown.markdownItPlugins"` 贡献：

```json
"contributes": {
    "markdown.markdownItPlugins": true
}
```

然后，在插件的主 `activation` 函数中，返回一个具有名为 `extendMarkdownIt` 的函数的对象。此函数采用当前的 markdown-it 实例，并且必须返回一个新的 markdown-it 实例：

```ts
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  return {
    extendMarkdownIt(md: any) {
      return md.use(require('markdown-it-emoji'));
    }
  };
}
```

要 contribute multiple markdown-it plugins, return multiple `use` statements chained together:

```ts
return md.use(require('markdown-it-emoji')).use(require('markdown-it-hashtag'));
```

当第一次显示 Markdown 预览时，贡献 markdown-it 插件的插件会被延迟激活。

[markdown-emoji](#) 插件演示了如何使用 markdown-it 插件将表情符号支持添加到 markdown 预览中。您可以在 [GitHub](https://github.com/mjbvz/baosky-markdown-emoji) 上查看表情符号插件的源代码。

您可能还想查看：

- [Guidelines](https://github.com/markdown-it/markdown-it/blob/master/docs/development.md) 适用于 markdown-it 插件开发人员
- [Existing markdown-it plugins](https://www.npmjs.com/browse/keyword/markdown-it-plugin)

## 使用脚本添加高级功能

For advanced functionality, 插件 may contribute scripts that are executed inside of the Markdown preview.

```json
"contributes": {
    "markdown.previewScripts": [
        "./main.js"
    ]
}
```

贡献的脚本是异步加载的，并在每次内容更改时重新加载。

[Markdown Preview Mermaid Support](#) 插件演示了如何使用脚本将 [Mermaid](https://mermaid.js.org) 图表和流程图支持添加到 Markdown 预览中。您可以在 [GitHub](https://github.com/mjbvz/baosky-markdown-mermaid) 上查看美人鱼插件的源代码。
