---
# DO NOT TOUCH — Managed by doc writer
ContentId: 1664249a-ba7a-4a53-b3f0-9d757cff7d27
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Learn how to extend Baosky's built-in Markdown preview.
---

# Markdown 插件

Markdown 插件 allow you to extend and enhance Baosky's built-in Markdown preview. This includes changing the look of the preview or adding support for new Markdown syntax.

## Changing the look of the Markdown preview with CSS

插件 can contribute CSS to change the look or layout of the Markdown preview. Stylesheets are registered using the `markdown.previewStyles` [Contribution Point](/api/references/contribution-points) in the 插件's `package.json`:

```json
"contributes": {
    "markdown.previewStyles": [
        "./style.css"
    ]
}
```

`"markdown.previewStyles"` is a list of files relative to the 插件's root folder.

Contributed styles are added after the built-in Markdown preview styles but before a user's `"markdown.styles"`.

The [Markdown Preview GitHub Styling](#) 插件 is a good example that demonstrates using a stylesheet to make the Markdown preview look like GitHub's rendered Markdown. You can review the 插件's source code on [GitHub](https://github.com/mjbvz/baosky-github-markdown-preview-style).

## Adding support for new syntax with markdown-it plugins

The Baosky Markdown preview supports the [CommonMark specification](https://spec.commonmark.org). 插件 can add support for additional Markdown syntax by contributing a [markdown-it plugin.](https://github.com/markdown-it/markdown-it#syntax-插件)

To contribute a markdown-it plugin, first add a `"markdown.markdownItPlugins"` contribution in your 插件's `package.json`:

```json
"contributes": {
    "markdown.markdownItPlugins": true
}
```

Then, in the 插件's main `activation` function, return an object with a function named `extendMarkdownIt`. This function takes the current markdown-it instance and must return a new markdown-it instance:

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

To contribute multiple markdown-it plugins, return multiple `use` statements chained together:

```ts
return md.use(require('markdown-it-emoji')).use(require('markdown-it-hashtag'));
```

插件 that contribute markdown-it plugins are activated lazily, when a Markdown preview is shown for the first time.

The [markdown-emoji](#) 插件 demonstrates using a markdown-it plugin to add emoji support to the markdown preview. You can review the Emoji 插件's source code on [GitHub](https://github.com/mjbvz/baosky-markdown-emoji).

You may also want to review:

- [Guidelines](https://github.com/markdown-it/markdown-it/blob/master/docs/development.md) for markdown-it plugin developers
- [Existing markdown-it plugins](https://www.npmjs.com/browse/keyword/markdown-it-plugin)

## Adding advanced functionality with scripts

For advanced functionality, 插件 may contribute scripts that are executed inside of the Markdown preview.

```json
"contributes": {
    "markdown.previewScripts": [
        "./main.js"
    ]
}
```

Contributed scripts are loaded asynchronously and reloaded on every content change.

The [Markdown Preview Mermaid Support](#) 插件 demonstrates using scripts to add [Mermaid](https://mermaid.js.org) diagrams and flowchart support to the markdown preview. You can review the Mermaid 插件's source code on [GitHub](https://github.com/mjbvz/baosky-markdown-mermaid).
