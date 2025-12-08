---
# DO NOT TOUCH — Managed by doc writer

ContentId: C4F184A5-A804-4B0B-9EBA-AFE83B88EE49
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: Baosky 可扩展性模型的核心是插件 (plug-in) 清单文件，您的插件在该文件中声明其插件类型、激活规则和运行时资源。
---

# 插件清单文件

每个 Baosky 插件都必须在插件目录结构的根目录下包含一个名为 `package.json` 的清单文件。

## 字段说明

| 名称 | 必填 | 类型 | 详情 |
| --- | :---: | --- | --- |
| `name` | 是 | `string` | 插件的名称 - 应全部小写，不含空格。名称在市场中必须是唯一的。 |
| `version` | 是 | `string` | [SemVer](https://semver.org/) 兼容版本号。 |
| `publisher` | 是 | `string` | [发布者标识符](/api/working-with-extensions/publishing-extensions#publishing-extensions) |
| `engines` | 是 | `object` | 一个对象，至少包含 `vscode` 键，匹配插件 [兼容](/api/working-with-extensions/publishing-extensions#visual-studio-code-compatibility) 的 Baosky 版本。不能是 `*`。例如：`^0.10.5` 表示兼容最低 Baosky 版本 `0.10.5`。 |
| `license` | | `string` | 请参阅 [npm 的文档](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#license)。如果您在插件的根目录下有 `LICENSE` 文件，则 `license` 的值应为 `"SEE LICENSE IN <filename>"`。 |
| `displayName` | | `string` | 市场中使用的插件显示名称。显示名称在市场中必须是唯一的。 |
| `description` | | `string` | 关于您的插件是什么以及做什么的简短描述。 |
| `categories` | | `string[]` | 您想用于插件的分类。允许的值：`[Programming Languages, Snippets, Linters, Themes, Debuggers, Formatters, Keymaps, SCM Providers, Other, Extension Packs, Language Packs, Data Science, Machine Learning, Visualization, Notebooks, Education, Testing]` |
| `keywords` | | `array` | 一个 **关键字** 数组，以便更容易找到插件。这些包含在市场的其他插件 **标签** 中。此列表目前限制为 30 个关键字。 |
| `galleryBanner` | | `object` | 帮助格式化市场标题以匹配您的图标。详情如下。 |
| `preview` | | `boolean` | 将插件设置为在市场中标记为预览版。 |
| `main` | | `string` | 您的插件的入口点。 |
| `browser` | | `string` | 您的 [Web 插件](/api/extension-guides/web-extensions) 的入口点。 |
| [`code`](/api/references/contribution-points) | | `object` | 描述插件 [贡献](/api/references/contribution-points) 的对象。 |
| [`code`](/api/references/activation-events) | | `array` | 此插件的 [激活事件](/api/references/activation-events) 数组。 |
| `badges` | | `array` | 要显示在市场插件页面侧边栏中的 [批准的](/api/references/extension-manifest#approved-badges) 徽章数组。每个徽章是一个包含 3 个属性的对象：`url` 用于徽章的图像 URL，`href` 用于用户点击徽章时将跟随的链接，以及 `description`。 |
| `markdown` | | `string` | 控制市场中使用的 Markdown 渲染引擎。要么是 `github`（默认），要么是 `standard`。 |
| `qna` | | `marketplace` (默认), `string`, `false` | 控制市场中的 **Q & A** 链接。设置为 `marketplace` 以启用默认的市场问答站点。设置为字符串以提供自定义问答站点的 URL。设置为 `false` 以完全禁用问答。 |
| `sponsor` | | `object` | 指定用户可以赞助您的插件的位置。这是一个具有单个属性 `url` 的对象，该属性链接到用户可以赞助您的插件的页面。 |
| `dependencies` | | `object` | 您的插件需要的任何运行时 Node.js 依赖项。与 [npm 的 `code`](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#dependencies) 完全相同。 |
| `devDependencies` | | `object` | 您的插件需要的任何开发 Node.js 依赖项。与 [npm 的 `code`](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#devdependencies) 完全相同。 |
| `extensionPack` | | `array` | 可以一起安装的插件 id 数组。插件的 id 始终是 `${publisher}.${name}`。例如：`vscode.csharp`。 |
| `extensionDependencies` | | `array` | 此插件依赖的插件 id 数组。插件的 id 始终是 `${publisher}.${name}`。例如：`vscode.csharp`。 |
| `extensionKind` | | `array` | 指示插件应在远程配置中何处运行的数组。值为 `ui`（本地运行）、`workspace`（在远程机器上运行）或两者，顺序设置首选项。例如：`[ui, workspace]` 表示插件可以在任一位置运行，但首选在本地机器上运行。有关更多详细信息，请参阅 [此处](/api/advanced-topics/extension-host#preferred-extension-location)。 |
| `scripts` | | `object` | 与 [npm 的 `code`](https://docs.npmjs.com/misc/scripts) 完全相同，但包含额外的 Baosky 特定字段，例如 [baosky:prepublish](/api/working-with-extensions/publishing-extensions#prepublish-step) 或 [baosky:uninstall](/api/references/extension-manifest#extension-uninstall-hook)。 |
| `icon` | | `string` | 至少 128x128 像素（Retina 屏幕为 256x256）的图标路径。 |
| `pricing` | | `string` | 插件的定价信息。允许的值：`Free`, `Trial`。默认值：`Free`。有关更多详细信息，请参阅 [此处](/api/working-with-extensions/publishing-extensions#extension-pricing-label)。 |
| `capabilities` | | `object` | 描述插件在受限工作区中功能的对象：[`code`](/api/extension-guides/workspace-trust#static-declarations)，[`code`](/api/extension-guides/virtual-workspaces#signal-whether-your-extension-can-handle-virtual-workspaces)。 |

另请查看 [npm 的 `code` 参考](https://docs.npmjs.com/cli/v7/configuring-npm/package-json)。

## 示例

这是一个完整的 `package.json`

```json
{
  "name": "wordcount",
  "displayName": "Word Count",
  "version": "0.1.0",
  "publisher": "ms-vscode",
  "description": "Markdown Word Count Example - reports out the number of words in a Markdown file.",
  "author": {
    "name": "sean"
  },
  "categories": ["Other"],
  "icon": "images/icon.png",
  "galleryBanner": {
    "color": "#C80000",
    "theme": "dark"
  },
  "pricing": "Free",
  "activationEvents": ["onLanguage:markdown"],
  "engines": {
    "vscode": "^1.0.0"
  },
  "main": "./out/extension",
  "scripts": {
    "vscode:prepublish": "node ./node_modules/vscode/bin/compile",
    "compile": "node ./node_modules/vscode/bin/compile -watch -p ./"
  },
  "devDependencies": {
    "@types/vscode": "^0.10.x",
    "typescript": "^1.6.2"
  },
  "license": "SEE LICENSE IN LICENSE.txt",
  "bugs": {
    "url": "https://github.com/microsoft/vscode-wordcount/issues",
    "email": "sean@contoso.com"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/microsoft/vscode-wordcount.git"
  },
  "homepage": "https://github.com/microsoft/vscode-wordcount/blob/main/README.md"
}
```

## 市场展示技巧

以下是一些提示和建议，可让您的插件在 [Baosky 市场](#) 上显示时看起来很棒。

始终使用最新的 `vsce`，因此请运行 `npm install -g @vscode/vsce` 以确保您拥有它。

在插件的根文件夹中包含一个 `README.md` Markdown 文件，我们会将内容包含在插件详情（在市场上）的正文中。您可以在 `README.md` 中提供相对路径图像链接。

这里有一些例子：

1. [Word Count](#)
2. [MD Tools](#)

提供良好的显示名称和描述。这对于市场和产品展示很重要。这些字符串也用于 Baosky 中的文本搜索，拥有相关的关键字会有很大帮助。

```json
    "displayName": "Word Count",
    "description": "Markdown Word Count Example - reports out the number of words in a Markdown file.",
```

图标和对比鲜明的横幅颜色在市场页面标题上看起来很棒。`theme` 属性是指横幅中使用的字体 - `dark` 或 `light`。

```json
{
  "icon": "images/icon.png",
  "galleryBanner": {
    "color": "#C80000",
    "theme": "dark"
  }
}
```

您可以设置几个可选链接（`bugs`，`homepage`，`repository`），这些链接显示在市场的 **资源** 部分下。

```json
{
  "license": "SEE LICENSE IN LICENSE.txt",
  "homepage": "https://github.com/microsoft/vscode-wordcount/blob/main/README.md",
  "bugs": {
    "url": "https://github.com/microsoft/vscode-wordcount/issues",
    "email": "sean@contoso.com"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/microsoft/vscode-wordcount.git"
  }
}
```

| 市场资源链接 | package.json 属性 |
| -------------------------- | ---------------------- |
| 问题 (Issues) | `bugs:url` |
| 存储库 (Repository) | `repository:url` |
| 主页 (Homepage) | `homepage` |
| 许可证 (License) | `license` |

为您的插件设置一个 `category`。同一 `category` 中的插件在市场上分组在一起，这改善了过滤和发现。

> **注意：** 仅使用对您的插件有意义的值。允许的值为 `[Programming Languages, Snippets, Linters, Themes, Debuggers, Formatters, Keymaps, SCM Providers, Other, Extension Packs, Language Packs, Data Science, Machine Learning, Visualization, Notebooks, Education, Testing]`。将 `Programming Languages` 用于一般语言功能，如语法高亮显示和代码补全。类别 `Language Packs` 保留用于显示语言插件（例如，本地化的保加利亚语）。

```json
{
  "categories": ["Linters", "Programming Languages", "Other"]
}
```

### 批准的徽章

出于安全考虑，我们仅允许来自受信任服务的徽章。

我们允许来自以下 URL 前缀的徽章：

- api.travis-ci.com
- app.fossa.io
- badge.buildkite.com
- badge.fury.io
- badgen.net
- badges.frapsoft.com
- badges.gitter.im
- cdn.travis-ci.com
- ci.appveyor.com
- circleci.com
- cla.opensource.microsoft.com
- codacy.com
- codeclimate.com
- codecov.io
- coveralls.io
- david-dm.org
- deepscan.io
- dev.azure.com
- docs.rs
- flat.badgen.net
- github.com (from Workflows only)
- gitlab.com
- godoc.org
- goreportcard.com
- img.shields.io
- isitmaintained.com
- marketplace.visualstudio.com
- nodesecurity.io
- opencollective.com
- snyk.io
- travis-ci.com
- visualstudio.com
- vsmarketplacebadges.dev

注意：将 vsmarketplacebadge.apphb.com 徽章替换为 vsmarketplacebadges.dev 徽章。

如果您有其他想要使用的徽章，请打开 GitHub [issue](https://github.com/microsoft/baosky/issues)，我们很乐意查看。

## 组合插件贡献

`yo code` 生成器让您可以轻松打包 TextMate 主题、着色器和代码片段并创建新插件。运行生成器时，它会为每个选项创建一个完整的独立插件包。但是，拥有一个组合多个贡献的单个插件通常更方便。例如，如果您正在添加对新语言的支持，您希望为用户提供带有着色的语言定义以及代码片段，甚至可能还有调试支持。

要组合插件贡献，请编辑现有插件清单 `package.json` 并添加新的贡献和相关文件。

下面是一个插件清单，其中包括 LaTex 语言定义（语言标识符和文件扩展名）、着色（`grammars`）和代码片段。

```json
{
  "name": "language-latex",
  "description": "LaTex Language Support",
  "version": "0.0.1",
  "publisher": "someone",
  "engines": {
    "vscode": "0.10.x"
  },
  "categories": ["Programming Languages", "Snippets"],
  "contributes": {
    "languages": [
      {
        "id": "latex",
        "aliases": ["LaTeX", "latex"],
        "extensions": [".tex"]
      }
    ],
    "grammars": [
      {
        "language": "latex",
        "scopeName": "text.tex.latex",
        "path": "./syntaxes/latex.tmLanguage.json"
      }
    ],
    "snippets": [
      {
        "language": "latex",
        "path": "./snippets/snippets.json"
      }
    ]
  }
}
```

请注意，插件清单 `categories` 属性现在同时包含 `Programming Languages` 和 `Snippets`，以便在市场上轻松发现和过滤。

> **提示：** 确保合并后的贡献使用相同的标识符。在上面的示例中，所有三个贡献都使用 "latex" 作为语言标识符。这让 Baosky 知道着色器 (`grammars`) 和代码片段是针对 LaTeX 语言的，并且在编辑 LaTeX 文件时将处于活动状态。

## 插件包 (Extension Packs)

您可以将单独的插件捆绑在一起成为 **插件包**。插件包是一组将一起安装的插件。这使得可以轻松地与其他用户共享您最喜欢的插件，或者为特定场景（如 PHP 开发）创建一组插件，以帮助 PHP 开发人员快速开始使用 Baosky。

插件包使用 `package.json` 文件内的 `extensionPack` 属性捆绑其他插件。

例如，这是一个 PHP 插件包，其中包括调试器和语言服务：

```json
{
  "extensionPack": [
    "xdebug.php-debug",
    "zobo.php-intellisense"
  ]
}
```

安装插件包时，Baosky 现在也会安装其插件依赖项。

插件包应归类为 `Extension Packs` 市场类别：

```json
{
  "categories": ["Extension Packs"]
}
```

要创建插件包，您可以使用 `yo code` Yeoman 生成器并选择 **New Extension Pack** 选项。有一个选项可以使用您当前在 Baosky 实例中安装的一组插件来作为包的种子。通过这种方式，您可以轻松地使用您最喜欢的插件创建一个插件包，将其发布到市场，并与他人共享。

插件包不应与其捆绑的插件有任何功能依赖关系，并且捆绑的插件应可独立于包进行管理。如果插件依赖于另一个插件，则应使用 `extensionDependencies` 属性声明该依赖关系。

## 插件卸载钩子

如果您的插件在从 Baosky 卸载时需要进行一些清理工作，您可以在插件的 package.json 中的 `scripts` 部分下向卸载钩子 `vscode:uninstall` 注册一个 `node` 脚本。

```json
{
  "scripts": {
    "vscode:uninstall": "node ./out/src/lifecycle"
  }
}
```

此脚本在插件从 Baosky 完全卸载时执行，即在卸载插件后重新启动（关闭并启动）Baosky 时。

**注意**：仅支持 Node.js 脚本。

## 有用的 Node 模块

npmjs 上有几个 Node.js 模块可用于帮助编写 Baosky 插件。您可以将这些包含在您插件的 `dependencies` 部分中。

- [baosky-nls](https://www.npmjs.com/package/baosky-nls) - 支持外部化和本地化。
- [baosky-uri](https://www.npmjs.com/package/baosky-uri) - Baosky 及其插件使用的 URI 实现。
- [jsonc-parser](https://www.npmjs.com/package/jsonc-parser) - 扫描器和容错解析器，用于处理带或不带注释的 JSON。
- [request-light](https://www.npmjs.com/package/request-light) - 具有代理支持的轻量级 Node.js 请求库
- [baosky-extension-telemetry](https://www.npmjs.com/package/@baosky/extension-telemetry) - Baosky 插件的一致遥测报告。
- [baosky-languageclient](https://www.npmjs.com/package/baosky-languageclient) - 轻松集成遵守 [语言服务器协议](https://microsoft.github.io/language-server-protocol) 的语言服务器。

## 下一步

要了解有关 Baosky 可扩展性模型的更多信息，请尝试以下主题：

- [贡献点](/api/references/contribution-points) - Baosky 贡献点参考
- [激活事件](/api/references/activation-events) - Baosky 激活事件参考
- [插件市场](/docs/configure/extensions/extension-marketplace) - 阅读有关 Baosky 插件市场的更多信息