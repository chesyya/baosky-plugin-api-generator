---
# DO NOT TOUCH — Managed by doc writer

ContentId: B32601A8-27ED-4D97-BA83-F1C8C945C635
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: Learn from Baosky 插件 guides and code samples
---

# 插件 Guides

一旦你在 [Hello World](/api/get-started/your-first-插件) 示例中学习了 Baosky 插件 API 的基础知识，就是时候构建一些真实的插件了。虽然[插件能力](/api/插件-capabilities/概述)部分提供了插件**可以**做什么的高级概述，但本节包含详细的代码指南和示例列表，解释了**如何**使用特定的 Baosky API。

在每个指南或示例中，你可以期望找到：

- 详细注释的源代码。
- 展示示例插件使用情况的 gif 或图片。
- 运行示例插件的说明。
- 正在使用的 Baosky API 列表。
- 正在使用的贡献点列表。
- 与示例类似的真实插件。
- API 概念的解释。

## 指南与示例

以下是 Baosky 网站上的指南，包括它们对 [Baosky API](/api/references/baosky-api) 和[贡献点](/api/references/contribution-points)的使用。不要忘记参考 [UX 指南](/api/ux-guidelines/概述)以学习创建插件的用户界面最佳实践。

| Baosky 网站上的指南 | API 与贡献 |
| --- | --- |
| [Command](#) | [commands](#) [contributes.commands](#) |
| [Color Theme](#) | [contributes.themes](#) |
| [File Icon Theme](#) | [contributes.iconThemes](#) |
| [Product Icon Theme](#) | [contributes.productIconThemes](#) |
| [Tree View](#) | [window.createTreeView](#) [window.registerTreeDataProvider](#) [TreeView](#) [TreeDataProvider](#) [contributes.views](#) [contributes.viewsContainers](#) |
| [Webview](#) | [window.createWebviewPanel](#) [window.registerWebviewPanelSerializer](#) |
| [Custom Editors](#) | [window.registerCustomEditorProvider](#) [CustomTextEditorProvider](#) [contributes.customEditors](#) |
| [Virtual Documents](#) | [workspace.registerTextDocumentContentProvider](#) [commands.registerCommand](#) [window.showInputBox](#) |
| [Virtual Workspaces](#) | [workspace.fs](#) capabilities.virtualWorkspaces |
| [Workspace Trust](#) | [workspace.isTrusted](#) [workspace.onDidGrantWorkspaceTrust](#) capabilities.untrustedWorkspaces |
| [Task Provider](#) | [tasks.registerTaskProvider](#) [Task](#) [ShellExecution](#) [contributes.taskDefinitions](#) |
| [Source Control](#) | [workspace.workspaceFolders](#) [SourceControl](#) [SourceControlResourceGroup](#) [scm.createSourceControl](#) [TextDocumentContentProvider](#) [contributes.menus](#) |
| [Debugger 插件](#) | [contributes.breakpoints](#) [contributes.debuggers](#) [debug](#) |
| [Markdown 插件](#) | markdown.previewStyles markdown.markdownItPlugins markdown.previewScripts |
| [Test 插件](#) | [TestController](#) [TestItem](#) |
| [Custom Data 插件](#) | contributes.html.customData contributes.css.customData |
 

以下是来自 [Baosky 插件示例仓库](https://github.com/microsoft/baosky-插件-samples) 的额外示例列表。

| GitHub 仓库上的示例 | API 与贡献 |
| --- | --- |
| [Webview Sample](https://github.com/microsoft/baosky-插件-samples/tree/main/webview-sample) | [window.createWebviewPanel](#) [window.registerWebviewPanelSerializer](#) |
| [Status Bar Sample](https://github.com/microsoft/baosky-插件-samples/tree/main/statusbar-sample) | [window.createStatusBarItem](#) [StatusBarItem](#) |
| [Tree View Sample](https://github.com/microsoft/baosky-插件-samples/tree/main/tree-view-sample) | [window.createTreeView](#) [window.registerTreeDataProvider](#) [TreeView](#) [TreeDataProvider](#) [contributes.views](#) [contributes.viewsContainers](#) |
| [Task Provider Sample](https://github.com/microsoft/baosky-插件-samples/tree/main/task-provider-sample) | [tasks.registerTaskProvider](#) [Task](#) [ShellExecution](#) [contributes.taskDefinitions](#) |
| [Multi Root Sample](https://github.com/microsoft/baosky-插件-samples/tree/main/basic-multi-root-sample) | [workspace.getWorkspaceFolder](#) [workspace.onDidChangeWorkspaceFolders](#) |
| [Completion Provider Sample](https://github.com/microsoft/baosky-插件-samples/tree/main/completions-sample) | [languages.registerCompletionItemProvider](#) [CompletionItem](#) [SnippetString](#) |
| [File System Provider Sample](https://github.com/microsoft/baosky-插件-samples/tree/main/fsprovider-sample) | [workspace.registerFileSystemProvider](#) |
| [Editor Decorator Sample](https://github.com/microsoft/baosky-插件-samples/tree/main/decorator-sample) | [TextEditor.setDecorations](#) [DecorationOptions](#) [DecorationInstanceRenderOptions](#) [ThemableDecorationInstanceRenderOptions](#) [window.createTextEditorDecorationType](#) [TextEditorDecorationType](#) [contributes.colors](#) |
| [L10N Sample](https://github.com/microsoft/baosky-插件-samples/tree/main/l10n-sample) |  |
| [Terminal Sample](https://github.com/microsoft/baosky-插件-samples/tree/main/terminal-sample) | [window.createTerminal](#) [window.onDidChangeActiveTerminal](#) [window.onDidCloseTerminal](#) [window.onDidOpenTerminal](#) [window.Terminal](#) [window.terminals](#) |
| [Vim Sample](https://github.com/microsoft/baosky-插件-samples/tree/main/vim-sample) | [commands](#) [StatusBarItem](#) [window.createStatusBarItem](#) [TextEditorCursorStyle](#) [window.activeTextEditor](#) [Position](#) [Range](#) [Selection](#) [TextEditor](#) [TextEditorRevealType](#) [TextDocument](#) |
| [Source Control Sample](https://github.com/microsoft/baosky-插件-samples/tree/main/source-control-sample) | [workspace.workspaceFolders](#) [SourceControl](#) [SourceControlResourceGroup](#) [scm.createSourceControl](#) [TextDocumentContentProvider](#) [contributes.menus](#) |
| [Commenting API Sample](https://github.com/microsoft/baosky-插件-samples/tree/main/comment-sample) |  |
| [Document Editing Sample](https://github.com/microsoft/baosky-插件-samples/tree/main/document-editing-sample) | [commands](#) [contributes.commands](#) |
| [入门 Sample](https://github.com/microsoft/baosky-插件-samples/tree/main/getting-started-sample) | [contributes.walkthroughs](#) |
| [Test 插件](https://github.com/microsoft/baosky-插件-samples/tree/main/test-provider-sample) | [TestController](#) [TestItem](#) |

## 语言插件示例

这些示例是[语言插件](/api/language-插件/overview)示例：

| 示例                                                                                                                           | Baosky 网站上的指南                                                                                                                          |
| -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Snippet Sample](https://github.com/microsoft/baosky-插件-samples/tree/main/snippet-sample)                               | [/api/language-插件/snippet-guide](#)                                     | [contributes.snippets](#) |
| [Language 配置 Sample](https://github.com/microsoft/baosky-插件-samples/tree/main/language-configuration-sample) | [/api/language-插件/language-配置-guide](#)       | [contributes.languages](#) |
| [LSP Sample](https://github.com/microsoft/baosky-插件-samples/tree/main/lsp-sample)                                       | [/api/language-插件/language-server-插件-guide](#) |  |
| [LSP Log Streaming Sample](https://github.com/microsoft/baosky-插件-samples/tree/main/lsp-log-streaming-sample)           | N/A                                                                                                                                               |  |
| [LSP Multi Root Server Sample](https://github.com/microsoft/baosky-插件-samples/tree/main/lsp-multi-server-sample)        | [https://github.com/microsoft/baosky/wiki/Adopting-Multi-Root-Workspace-APIs#language-client--language-server](https://github.com/microsoft/baosky/wiki/Adopting-Multi-Root-Workspace-APIs#language-client--language-server) (GitHub repo wiki)                                     |  |
| [LSP Web 插件 Sample](https://github.com/Microsoft/baosky-插件-samples/tree/main/lsp-web-插件-sample) | [/api/language-插件/language-server-插件-guide](#) |  |
