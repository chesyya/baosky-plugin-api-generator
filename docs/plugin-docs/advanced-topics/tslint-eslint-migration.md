---
ContentId: f00c4913-58e3-4a61-aa42-e769c3430906
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: 将插件项目从 TSLint linter 迁移到 ESLint 的指南。
---
# 从 TSLint 迁移到 ESLint

[TSLint](https://palantir.github.io/tslint/) 曾是过去推荐的 linter，但现在 TSLint 已被废弃，[ESLint](https://eslint.org/) 正在接管其职责。本文将帮助你从 TSLint 迁移到 ESLint。

## ESLint：安装

你需要安装 ESLint。ESLint 暂时不支持 TypeScript，因此你还需要安装 eslint-typescript-support：

```bash
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

或者如果你使用 yarn 作为包管理器：

```bash
yarn add eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --dev
```

上述命令会添加 ESLint，添加一个让 ESLint 理解 TypeScript 的解析器，并添加一些 TypeScript 特定的规则。

现在，为了使实际迁移更简单，运行 [tslint-to-eslint-config](https://github.com/typescript-eslint/tslint-to-eslint-config) 实用工具。此工具将获取您的 TSLint 配置并配置配置创建“最接近”的 ESLint 配置。

```bash
npx tslint-to-eslint-config
```

此命令会[下载并执行](https://www.npmjs.com/package/npx)该实用工具来执行迁移。有关更多选项，请查看该实用工具的[使用指南](https://github.com/typescript-eslint/tslint-to-eslint-config#usage)。

现在应该有一个新的 `.eslintrc.js` 文件、一个日志文件（`tslint-to-eslint-config.log`），以及可能对其他文件（如 `.vscode/settings.json`）的更改。仔细检查这些更改，特别是对现有文件的更改，并检查日志文件。

## ESLint：配置

`.eslintrc.js` 文件通常足以开始使用，但 `parserOptions.project` 属性可能仍设置为你的 `tsconfig.json` 文件。这意味着 ESLint 规则可以使用语义信息，例如，这个变量是字符串还是数字数组？此配置启用了一些强大的规则，但也意味着 ESLint 需要更长的计算时间。插件的默认规则不需要语义信息，除非你添加了需要此信息的规则，否则我们建议你删除 `parserOptions.project` 属性。

## ESLint：运行

你现在可以运行 ESLint 了，但在此之前，我们建议你禁用 TSLint。为此，请打开插件视图，并在 TSLint 插件的上下文菜单中选择 ** 禁用 ** 。

是时候进行 lint 了！使用此命令：`eslint -c .eslintrc.js --ext .ts <mySrcFolder>`（注意 `--ext .ts` 选项告诉 ESLint 查看 TypeScript 文件）。我们建议将命令放在 `package.json` 的 `scripts` 部分，如下图：

```json
"lint": "eslint -c .eslintrc.js --ext .ts <mySrcFolder>"
```

要将 ESLint 与 Baosky 集成，请执行以下操作：

* 安装 [ESLint](#) 插件。
* 通过 ** Tasks:Configure Task ** 命令创建一个任务，并选择 ** npm: lint ** 。
* 在生成的 `tasks.json` 文件中，将问题匹配器配置为 `$eslint-stylish`。

** 提示 ** ：ESLint 在处理事情的方式上有时"更正确"，你可能会看到以前没有的警告，例如指出缺少分号。尝试使用 `--fix` 选项让 ESLint 为你清理这些问题。

## TSLint：移除

恭喜。你现在应该有一个可用的 ESLint 设置，是时候进行清理了。

TSLint 的移除取决于你的项目，但通常这些是步骤：

* 更新 `.vscode/插件.json` 以推荐 ESLint 插件而不再推荐 TSLint：

  ```json
  "recommendations": [
    "dbaeumer.vscode-eslint"
  ]
  ```

* 删除 `tslint.json` 文件。
* 删除 `package.json` 文件中对 `tslint` 的依赖。
* 使用 `npm uninstall tslint` 卸载 TSLint。
