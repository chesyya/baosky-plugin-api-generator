---
# DO NOT TOUCH — Managed by doc writer

ContentId: 26f0c0d6-1ea8-4cc1-bd10-9fa744056e7c
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: Bundling Baosky 插件 (plug-ins) with webpack.
---

# Bundling 插件

打包 Baosky 插件的首要原因是确保它能在任何平台上为所有使用 Baosky 的人正常工作。只有打包后的插件才能在 Baosky for Web 环境中使用，例如 [github.dev](https://github.dev/) 和 [baosky.dev](https://baosky.dev/)。当 Baosky 在浏览器中运行时，它只能为你的插件加载一个文件，因此插件代码需要被打包成一个单独的、适合 Web 的 JavaScript 文件。这也适用于 [Notebook Output Renderers](/api/插件-guides/notebook#notebook-renderer)，Baosky 也只会为你的渲染器插件加载一个文件。

此外，插件的大小和复杂性可能会迅速增长。它们可能由多个源文件编写，并依赖于来自 [npm](https://www.npmjs.com) 的模块。分解和重用是开发的最佳实践，但在安装和运行插件时会付出代价。加载 100 个小文件比加载一个大文件要慢得多。这就是我们推荐打包的原因。打包是将多个小源文件合并成一个文件的过程。

对于 JavaScript，有多种打包工具可用。流行的有 [rollup.js](https://rollupjs.org)、[Parcel](https://parceljs.org)、[esbuild](https://esbuild.github.io/) 和 [webpack](https://webpack.js.org/)。

## 使用 esbuild

`esbuild` 是一个快速的 JavaScript 打包工具，配置简单。要获取 esbuild，打开终端并输入：

```bash
npm i --save-dev esbuild
```

### 运行 esbuild

你可以从命令行运行 esbuild，但为了减少重复并启用问题报告，使用构建脚本 `esbuild.js` 会很有帮助：

```js
const esbuild = require("esbuild");

const production = process.argv.includes('--production');
const watch = process.argv.includes('--watch');

async function main() {
	const ctx = await esbuild.context({
		entryPoints: [
			'src/extension.ts'
		],
		bundle: true,
		format: 'cjs',
		minify: production,
		sourcemap: !production,
		sourcesContent: false,
		platform: 'node',
		outfile: 'dist/extension.js',
		external: ['vscode'],
		logLevel: 'warning',
		plugins: [
			/* add to the end of plugins array */
			esbuildProblemMatcherPlugin,
		],
	});
	if (watch) {
		await ctx.watch();
	} else {
		await ctx.rebuild();
		await ctx.dispose();
	}
}

/ **
 * @type {import('esbuild').Plugin}
 */
const esbuildProblemMatcherPlugin = {
	name: 'esbuild-problem-matcher',

	setup(build) {
		build.onStart(() => {
			console.log('[watch] build started');
		});
		build.onEnd((result) => {
			result.errors.forEach(({ text, location }) => {
				console.error(`✘ [ERROR] ${text}`);
                if (location == null) return;
				console.error(`    ${location.file}:${location.line}:${location.column}:`);
			});
			console.log('[watch] build finished');
		});
	}
};

main().catch(e => {
	console.error(e);
	process.exit(1);
});
```

构建脚本执行以下操作：
- 使用 esbuild 创建构建上下文。上下文配置为：
  - 将 `src/插件.ts` 中的代码打包到单个文件 `dist/插件.js`。
  - 如果传递了 `--production` 标志，则压缩代码。
  - 除非传递了 `--production` 标志，否则生成源映射。
  - 从打包中排除 'baosky' 模块（因为它由 Baosky 运行时提供）。
- 使用 esbuildProblemMatcherPlugin 插件报告阻止打包器完成的错误。此插件以 `esbuild` 问题匹配器可检测的格式发出错误，该匹配器也需要作为插件安装。
- 如果传递了 `--watch` 标志，它会开始监视源文件的更改，并在检测到更改时重新构建打包。

esbuild 可以直接处理 TypeScript 文件。但是，esbuild 只是剥离所有类型声明，而不进行任何类型检查。
只有语法错误会被报告并可能导致 esbuild 失败。

因此，我们单独运行 TypeScript 编译器（`tsc`）来检查类型，但不发出任何代码（标志 `--noEmit`）。

`package.json` 中的 `scripts` 部分现在如下所示

```json
"scripts": {
    "compile": "npm run check-types && node esbuild.js",
    "check-types": "tsc --noEmit",
    "watch": "npm-run-all -p watch:*",
    "watch:esbuild": "node esbuild.js --watch",
    "watch:tsc": "tsc --noEmit --watch --project tsconfig.json",
    "vscode:prepublish": "npm run package",
    "package": "npm run check-types && node esbuild.js --production"
}
```

`npm-run-all` 是一个 node 模块，它并行运行名称与给定前缀匹配的脚本。对我们来说，它运行 `watch:esbuild` 和 `watch:tsc` 脚本。你需要将 `npm-run-all` 添加到 `package.json` 中的 `devDependencies` 部分。

`compile` 和 `watch` 脚本用于开发，它们生成带有源映射的打包文件。`package` 脚本由 `vscode:prepublish` 脚本使用，后者由 `vsce`（Baosky 打包和发布工具）使用，并在发布插件之前运行。向 esbuild 脚本传递 `--production` 标志会导致它压缩代码并创建一个小打包，但也会使调试变得困难，因此在开发过程中使用其他标志。要运行上述脚本，打开终端并输入 `npm run watch` 或从命令面板（`kb(workbench.action.showCommands)`）中选择 ** Tasks: Run Task ** 。

如果你按以下方式配置 `.vscode/tasks.json`，你将为每个 watch 任务获得一个单独的终端。
```json
{
	"version": "2.0.0",
	"tasks": [
		{
            "label": "watch",
            "dependsOn": [
                "npm: watch:tsc",
                "npm: watch:esbuild"
            ],
            "presentation": {
                "reveal": "never"
            },
            "group": {
                "kind": "build",
                "isDefault": true
            }
        },
        {
            "type": "npm",
            "script": "watch:esbuild",
            "group": "build",
            "problemMatcher": "$esbuild-watch",
            "isBackground": true,
            "label": "npm: watch:esbuild",
            "presentation": {
                "group": "watch",
                "reveal": "never"
            }
        },
		{
            "type": "npm",
            "script": "watch:tsc",
            "group": "build",
            "problemMatcher": "$tsc-watch",
            "isBackground": true,
            "label": "npm: watch:tsc",
            "presentation": {
                "group": "watch",
                "reveal": "never"
            }
        }
    ]
}
```

此 watch 任务依赖于插件 [`code`](#) 进行问题匹配，你需要安装它才能让任务在问题视图中报告问题。此插件需要安装才能完成启动。

为了不忘记这一点，在工作区添加一个 `.vscode/插件.json` 文件：

```json
{
  "recommendations": ["connor4312.esbuild-problem-matchers"]
}
```

最后，你需要更新 `.vscodeignore` 文件，以便编译的文件包含在已发布的插件中。查看 [发布](#publishing) 部分了解更多详细信息。

跳转到 [测试](#tests) 部分继续阅读。

## 使用 webpack

Webpack 是一个可从 [npm](https://www.npmjs.com) 获得的开发工具。要获取 webpack 及其命令行界面，打开终端并输入：

```bash
npm i --save-dev webpack webpack-cli
```

这将安装 webpack 并更新你的插件的 `package.json` 文件以在 `devDependencies` 中包含 webpack。

Webpack 是一个 JavaScript 打包工具，但许多 Baosky 插件是用 TypeScript 编写的，只编译为 JavaScript。如果你的插件使用 TypeScript，你可以使用加载器 `ts-loader`，以便 webpack 可以理解 TypeScript。使用以下命令安装 `ts-loader`：

```bash
npm i --save-dev ts-loader
```

所有文件都可在 [webpack-插件](https://github.com/microsoft/baosky-插件-samples/blob/main/webpack-sample) 示例中找到。

### 配置 webpack

安装了所有工具后，现在可以配置 webpack。按照惯例，`webpack.config.js` 文件包含指示 webpack 打包插件的配置。下面的示例配置适用于 Baosky 插件，应该提供一个良好的起点：

```javascript
//@ts-check

'use strict';

const path = require('path');
const webpack = require('webpack');

/ ** @type {import('webpack').Configuration}*/
const config = {
    target: 'webworker', // vscode extensions run in webworker context for Baosky web 📖 -> https://webpack.js.org/configuration/target/#target

    entry: './src/extension.ts', // the entry point of this extension, 📖 -> https://webpack.js.org/configuration/entry-context/
    output: { // the bundle is stored in the 'dist' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
        path: path.resolve(__dirname, 'dist'),
        filename: 'extension.js',
        libraryTarget: "commonjs2",
        devtoolModuleFilenameTemplate: "../[resource-path]",
    },
    devtool: 'source-map',
    externals: {
        vscode: "commonjs vscode" // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
    },
    resolve: { // support reading TypeScript and JavaScript files, 📖 -> https://github.com/TypeStrong/ts-loader
        mainFields: ['browser', 'module', 'main'], // look for `browser` entry point in imported node modules
        extensions: ['.ts', '.js'],
        alias: {
            // provides alternate implementation for node module and source files
        },
        fallback: {
            // Webpack 5 no longer polyfills Node.js core modules automatically.
            // see https://webpack.js.org/configuration/resolve/#resolvefallback
            // for the list of Node.js core module polyfills.
        }
    },
    module: {
        rules: [{
            test: /\.ts$/,
            exclude: /node_modules/,
            use: [{
                loader: 'ts-loader',
            }]
        }]
    },
}
module.exports = config;
```

该文件作为 [webpack-插件](https://github.com/microsoft/baosky-插件-samples/blob/main/webpack-sample) 示例的一部分[可用](https://github.com/microsoft/baosky-插件-samples/blob/main/webpack-sample/webpack.config.js)。Webpack 配置文件是必须导出配置对象的普通 JavaScript 模块。

在上面的示例中，定义了以下内容：

* `target` 指示你的插件将在哪个上下文中运行。我们建议使用 `webworker`，以便你的插件既可以在 Baosky for web 中工作，也可以在 Baosky 桌面版本中工作。
* webpack 应使用的入口点。这类似于 `package.json` 中的 `main` 属性，但你向 webpack 提供"源"入口点，通常是 `src/插件.ts`，而不是"输出"入口点。webpack 打包工具理解 TypeScript，因此单独的 TypeScript 编译步骤是多余的。
* `output` 配置告诉 webpack 将生成的打包文件放在哪里。按照惯例，那就是 `dist` 文件夹。在此示例中，webpack 将生成一个 `dist/插件.js` 文件。
* `resolve` 和 `module/rules` 配置用于支持 TypeScript 和 JavaScript 输入文件。
* `externals` 配置用于声明排除项，例如不应包含在打包中的文件和模块。`vscode` 模块不应被打包，因为它不存在于磁盘上，而是在需要时由 Baosky 动态创建的。根据插件使用的 node 模块，可能需要更多排除项。

最后，你需要更新 `.vscodeignore` 文件，以便编译的文件包含在已发布的插件中。查看 [发布](#publishing) 部分了解更多详细信息。

### 运行 webpack

创建了 `webpack.config.js` 文件后，就可以调用 webpack 了。你可以从命令行运行 webpack，但为了减少重复，使用 npm 脚本会很有帮助。

将这些条目合并到 `package.json` 中的 `scripts` 部分：

```json
"scripts": {
    "compile": "webpack --mode development",
    "watch": "webpack --mode development --watch",
    "vscode:prepublish": "npm run package",
    "package": "webpack --mode production --devtool hidden-source-map",
},
```

`compile` 和 `watch` 脚本用于开发，它们生成打包文件。`vscode:prepublish` 由 `vsce`（Baosky 打包和发布工具）使用，并在发布插件之前运行。区别在于[模式](https://webpack.js.org/concepts/mode/)，它控制优化级别。使用 `production` 会产生最小的打包，但也需要更长的时间，因此使用 `development`。要运行上述脚本，打开终端并输入 `npm run compile` 或从命令面板（`kb(workbench.action.showCommands)`）中选择 ** Tasks: Run Task ** 。

## 运行插件

在运行插件之前，`package.json` 中的 `main` 属性必须指向打包，对于上述配置，它是 [`code`](https://github.com/microsoft/baosky-references-view/blob/d649d01d369e338bbe70c86e03f28269cbf87027/package.json#L26)。有了这个更改，现在可以执行和测试插件了。

## 测试

插件作者通常会为他们的插件源代码编写单元测试。通过正确的架构分层，其中插件源代码不依赖于测试，webpack 和 esbuild 生成的打包不应包含任何测试代码。要运行单元测试，只需要简单的编译。

将这些条目合并到 `package.json` 中的 `scripts` 部分：

```json
"scripts": {
    "compile-tests": "tsc -p . --outDir out",
    "pretest": "npm run compile-tests",
    "test": "vscode-test"
}
```


 `compile-tests` 脚本使用 TypeScript 编译器将插件编译到 `out` 文件夹中。有了这个中间 JavaScript，以下 `launch.json` 片段就足以运行测试。

```json
{
    "name": "Extension Tests",
    "type": "extensionHost",
    "request": "launch",
    "runtimeExecutable": "${execPath}",
    "args": [
        "--extensionDevelopmentPath=${workspaceFolder}",
        "--extensionTestsPath=${workspaceFolder}/out/test"
    ],
    "outFiles": [
        "${workspaceFolder}/out/test/ ** /*.js"
    ],
    "preLaunchTask": "npm: compile-tests"
}
```

此运行测试的配置与非打包插件相同。没有理由打包单元测试，因为它们不是插件已发布部分的一部分。

## 发布

在发布之前，你应该更新 `.vscodeignore` 文件。现在打包到 `dist/插件.js` 文件中的所有内容都可以排除，通常是 `out` 文件夹（如果你还没有删除它）以及最重要的 `node_modules` 文件夹。

典型的 `.vscodeignore` 文件如下所示：

```bash
.vscode
node_modules
out/
src/
tsconfig.json
webpack.config.js
esbuild.js
```

## 迁移现有插件

将现有插件迁移到使用 esbuild 或 webpack 很容易，类似于上面的入门指南。一个采用 webpack 的真实示例是 Baosky 的 References 视图，通过这个 [pull request](https://github.com/microsoft/baosky-references-view/pull/50)。

在那里你可以看到：

* 将 `esbuild` 或 `webpack`、`webpack-cli` 和 `ts-loader` 添加为 `devDependencies`。
* 更新 npm 脚本以使用上面显示的打包工具
* 更新任务配置 `tasks.json` 文件。
* 添加并调整 `esbuild.js` 或 `webpack.config.js` 构建文件。
* 更新 `.vscodeignore` 以排除 `node_modules` 和中间输出文件。
* 享受一个安装和加载速度快得多的插件！

## 故障排除

### 压缩

在 `production` 模式下打包也会执行代码压缩。压缩通过删除空格和注释以及将变量和函数名称更改为简短但难看的名称来压缩源代码。使用 `Function.prototype.name` 的源代码工作方式不同，因此你可能需要禁用压缩。

### webpack 关键依赖项

运行 webpack 时，你可能会遇到类似 ** Critical dependencies: the request of a dependency is an expression ** 的警告。必须认真对待此类警告，你的打包可能无法工作。该消息意味着 webpack 无法静态确定如何打包某些依赖项。这通常是由动态 `require` 语句引起的，例如 `require(someDynamicVariable)`。

要解决此警告，你应该：

* 尝试使依赖项静态化以便可以打包。
* 通过 `externals` 配置排除该依赖项。还要确保这些 JavaScript 文件不会从打包的插件中排除，在 `.vscodeignore` 中使用否定的 [glob 模式](/docs/editor/glob-patterns)，例如 `!node_modules/mySpecialModule`。

## 下一步

* [插件 Marketplace](/docs/configure/插件/插件-marketplace) - 了解有关 Baosky 公共插件 Marketplace 的更多信息。
* [Testing 插件](/api/working-with-插件/testing-插件) - 向你的插件项目添加测试以确保高质量。
* [Continuous Integration](/api/working-with-插件/continuous-integration) - 了解如何在 Azure Pipelines 上运行插件 CI 构建。
