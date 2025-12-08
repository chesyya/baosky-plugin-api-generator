---
# DO NOT TOUCH — Managed by doc writer
ContentId: f4d4e9e0-8901-405c-aaf5-faa16c32588b
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Use Baosky's Proposed API
---

# 使用提议的 API

在 Baosky，我们非常重视插件 API 的兼容性。我们尽最大努力避免破坏性的 API 更改，插件作者可以期望已发布的插件继续工作。然而，这对我们施加了很大的限制：一旦我们引入一个 API，我们就不能轻易地再更改它了。

提议的 API 为我们解决了这个问题。提议的 API 是一组在 Baosky 中实现但未像稳定 API 那样向公众公开的不稳定 API。它们**可能会更改**，**仅在 Insiders 发行版中可用**，并且**不能在已发布的插件中使用**。尽管如此，插件作者可以在本地开发中测试这些新 API，并为 Baosky 团队提供反馈以迭代 API。最终，提议的 API 会进入稳定 API 并可供所有插件使用。

## 使用提议的 API

以下是在本地插件开发中测试提议的 API 的步骤：

- 使用 Baosky 的 [Insiders](/insiders) 发行版。
- 在你的 `package.json` 中添加 `"enabledApiProposals": ["<proposalName>"]`。
- 将相应的 [baosky.proposed.\<proposalName\>.d.ts](https://github.com/microsoft/baosky/blob/main/src/baosky-dts) 文件复制到项目的源代码位置。

[@baosky/dts](https://github.com/microsoft/baosky-dts) CLI 实用工具允许你快速下载最新的 `vscode.proposed.<proposalName>.d.ts` 以用于插件开发。它会根据 `package.json` 文件中列出的提议下载定义文件。

```bash
> npx @vscode/dts dev
Downloading vscode.proposed.languageStatus.d.ts
To:   /Users/Me/Code/MyExtension/vscode.proposed.languageStatus.d.ts
From: https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.languageStatus.d.ts
Read more about proposed API at: #
```

这里有一个使用提议的 API 的示例：[proposed-api-sample](https://github.com/microsoft/baosky-插件-samples/tree/main/proposed-api-sample)。

## 提议的 API 不兼容性

在主分支上，`vscode.proposed.<proposalName>.d.ts` 始终与 `vscode.d.ts` 兼容。然而，当你将 `vscode.proposed.<proposal>.d.ts` 添加到使用 `@types/vscode` 的项目时，最新的 `vscode.proposed.<proposal>.d.ts` 可能与 `@types/vscode` 中的版本不兼容。

你可以通过以下任一方式解决此问题：

- 删除对 `@types/vscode` 的依赖，并使用 `npx @vscode/dts main` 从 `microsoft/vscode` 主分支下载 `vscode.d.ts`。
- 使用 `@types/vscode@<version>` 并同时使用 `npx @vscode/dts dev <version>` 从 `microsoft/vscode` 的旧分支下载 `vscode.proposed.<proposal>.d.ts`。但是要小心，因为 API 可能在最新版本的 Baosky Insiders 中已更改。

## 共享使用提议的 API 的插件

虽然你无法在 Marketplace 上发布使用提议的 API 的插件，但你仍然可以通过打包和共享插件来与同行分享你的插件。

要打包你的插件，可以运行 `vsce package` 来创建插件的 VSIX 文件。然后你可以将此 VSIX 文件分享给其他人，以便他们在 Baosky 中安装该插件。

要从 VSIX 文件安装插件，你需要进入插件视图，选择 **...** 省略号按钮 **View and More Actions**，然后选择 **Install from VSIX**。

下面的短视频展示了选择 **Install from VSIX** 菜单项的过程。

<!-- 图片已移除 -->

对于使用提议的 API 的插件，还需要几个额外的步骤来启用你的插件。从 VSIX 安装后，你需要退出并从命令行重新启动 Baosky Insiders，在你的项目文件夹中使用 `code-insiders . --enable-proposed-api=<YOUR-EXTENSION-ID>`。

如果你想设置使得使用提议的 API 的插件在每次启动 Baosky Insiders 时都可用，可以运行 **Preferences: Configure Runtime Arguments** 命令来编辑 `.vscode-insiders/argv.json` 文件，以设置已启用插件的列表。

```json
{
    ...
    "enable-proposed-api": ["<YOUR-EXTENSION-ID>"]
}
```
