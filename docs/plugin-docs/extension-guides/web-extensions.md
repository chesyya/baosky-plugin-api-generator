---
# DO NOT TOUCH — Managed by doc writer

ContentId: 282670bb-cc72-4b01-9b51-08bf8f5a13a1
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: 了解如何在 Baosky for the web 和 Web 插件主机中运行插件。
---

# Web 插件

Baosky 可以作为浏览器中的编辑器运行。一个例子是 `github.dev` 用户界面，当在 GitHub 中浏览存储库或 Pull Request 时按 `.`（句点键）即可访问。在 Web 中使用 Baosky 时，已安装的插件在浏览器中的插件主机（称为“Web 插件主机”）中运行。可以在 Web 插件主机中运行的插件称为“Web 插件”。

Web 插件与常规插件共享相同的结构，但鉴于运行时环境不同，其运行的代码与为 Node.js 运行时编写的插件代码不同。Web 插件仍然可以访问完整的 Baosky API，但不再能访问 Node.js API 和模块加载。相反，Web 插件受到浏览器沙箱的限制，因此与普通插件相比具有 [限制](#web-插件-main-file)。

VS Code 桌面版也支持 Web 插件运行时。如果您决定将您的插件创建为 Web 插件，它将在 [VS Code for the Web](/docs/setup/baosky-web)（包括 `vscode.dev` 和 `github.dev`）以及桌面版和 [GitHub Codespaces](/docs/remote/codespaces) 等服务中受到支持。

## Web 插件剖析

Web 插件的 [结构类似于常规插件](/api/get-started/extension-anatomy)。插件清单 (`package.json`) 定义了插件源代码的入口文件并声明了插件贡献。

对于 Web 插件，[主入口文件](#web-插件-main-file) 由 `browser` 属性定义，而不是像常规插件那样由 `main` 属性定义。

`contributes` 属性对 Web 插件和常规插件的工作方式相同。

下面的示例显示了一个简单的 Hello World 插件的 `package.json`，它仅在 Web 插件主机中运行（它只有一个 `browser` 入口点）：

```json
{
  "name": "helloworld-web-sample",
  "displayName": "helloworld-web-sample",
  "description": "HelloWorld example for Baosky in the browser",
  "version": "0.0.1",
  "publisher": "vscode-samples",
  "repository": "https://github.com/microsoft/vscode-extension-samples/helloworld-web-sample",
  "engines": {
    "vscode": "^1.74.0"
  },
  "categories": ["Other"],
  "activationEvents": [],
  "browser": "./dist/web/extension.js",
  "contributes": {
    "commands": [
      {
        "command": "helloworld-web-sample.helloWorld",
        "title": "Hello World"
      }
    ]
  },
  "scripts": {
    "vscode:prepublish": "npm run package-web",
    "compile-web": "webpack",
    "watch-web": "webpack --watch",
    "package-web": "webpack --mode production --devtool hidden-source-map",
  },
  "devDependencies": {
    "@types/vscode": "^1.59.0",
    "ts-loader": "^9.2.2",
    "webpack": "^5.38.1",
    "webpack-cli": "^4.7.0",
    "@types/webpack-env": "^1.16.0",
    "process": "^0.11.10"
  }
}
```

> **注意**：如果您的插件针对的是 1.74 之前的 Baosky 版本，则必须在 `activationEvents` 中显式列出 `onCommand:helloworld-web-sample.helloWorld`。

仅具有 `main` 入口点但没有 `browser` 的插件不是 Web 插件。它们会被 Web 插件主机忽略，并且无法在插件视图中下载。

<!-- 图片已移除 -->

仅具有声明性贡献（只有 `contributes`，没有 `main` 或 `browser`）的插件可以是 Web 插件。它们可以在 [Baosky for the Web](/docs/setup/baosky-web) 中安装和运行，无需插件作者进行任何修改。具有声明性贡献的插件示例包括主题、语法和片段。

插件可以同时具有 `browser` 和 `main` 入口点，以便在浏览器和 Node.js 运行时中运行。[更新现有插件为 Web 插件](#update-existing-extension-to-web-extension) 部分展示了如何迁移插件以在两种运行时中工作。

[Web 插件启用](#web-extension-enablement) 部分列出了用于决定插件是否可以在 Web 插件主机中加载的规则。

### Web 插件主文件

Web 插件的主文件由 `browser` 属性定义。该脚本在 [浏览器 WebWorker](https://developer.mozilla.org/docs/Web/API/Web_Workers_API) 环境中的 Web 插件主机中运行。它受到浏览器 worker 沙箱的限制，与在 Node.js 运行时中运行的普通插件相比具有局限性。

* 不支持导入或 require 其他模块。`importScripts` 也不可用。因此，代码必须打包成单个文件。
* 可以通过模式 `require('vscode')` 加载 [Baosky API](/api/references/baosky-api)。这将起作用，因为有一个针对 `require` 的 shim，但此 shim 不能用于加载其他插件文件或其他 node 模块。它仅适用于 `require('vscode')`。
* 运行时不可用 Node.js 全局变量和库，例如 `process`、`os`、`setImmediate`、`path`、`util`、`url`。但是，可以使用 webpack 等工具添加它们。[webpack 配置](#webpack-configuration) 部分解释了如何做到这一点。
* 打开的工作区或文件夹位于虚拟文件系统上。访问工作区文件需要通过可在 `vscode.workspace.fs` 访问的 Baosky [文件系统](/api/references/baosky-api#FileSystem) API。
* [插件上下文](/api/references/baosky-api#ExtensionContext) 位置 (`ExtensionContext.extensionUri`) 和存储位置 (`ExtensionContext.storageUri`, `globalStorageUri`) 也位于虚拟文件系统上，需要通过 `vscode.workspace.fs` 进行访问。
* 要访问 Web 资源，必须使用 [Fetch](https://developer.mozilla.org/docs/Web/API/Fetch_API) API。访问的资源需要支持 [跨域资源共享](https://developer.mozilla.org/docs/Web/HTTP/CORS) (CORS)。
* 无法创建子进程或运行可执行文件。但是，可以通过 [Worker](https://developer.mozilla.org/en-US/docs/Web/API/Worker) API 创建 Web worker。这用于运行语言服务器，如 [Web 插件中的语言服务器协议](#language-server-protocol-in-web-extensions) 部分所述。
* 与常规插件一样，插件的 `activate/deactivate` 函数需要通过模式 `exports.activate = ...` 导出。

## 开发 Web 插件

值得庆幸的是，像 TypeScript 和 webpack 这样的工具可以隐藏许多浏览器运行时限制，并允许您以与常规插件相同的方式编写 Web 插件。Web 插件和常规插件通常可以从相同的源代码生成。

例如，由 `yo code` [生成器](https://www.npmjs.com/package/generator-code) 创建的 `Hello Web Extension` 仅在构建脚本上有所不同。您可以使用 **调试：选择并开始调试** (Debug: Select and Start Debugging) 命令访问提供的启动配置，就像运行和调试传统 Node.js 插件一样。

## 创建 Web 插件

要搭建一个新的 Web 插件，请使用 `yo code` 并选择 **New Web Extension**。确保安装了最新版本的 [generator-code](https://www.npmjs.com/package/generator-code) (>= generator-code@1.6)。要更新生成器和 yo，请运行 `npm i -g yo generator-code`。

创建的插件包括插件的源代码（显示 Hello World 通知的命令）、`package.json` 清单文件以及 webpack 或 esbuild 配置文件。

为了简单起见，我们假设您使用 `webpack` 作为打包器。在文章末尾，我们还将解释选择 `esbuild` 时的不同之处。

* `src/web/extension.ts` 是插件的入口源代码文件。它与常规的 hello 插件相同。
* `package.json` 是插件清单。
  * 它使用 `browser` 属性指向入口文件。
  * 它提供脚本：`compile-web`、`watch-web` 和 `package-web` 用于编译、监视和打包。
* `webpack.config.js` 是 webpack 配置文件，它将插件源代码编译并打包成单个文件。
* `.vscode/launch.json` 包含在带有 Web 插件主机的 Baosky 桌面版中运行 Web 插件和测试的启动配置（不再需要设置 `extension.webWorker`）。
* `.vscode/task.json` 包含启动配置使用的构建任务。它使用 `npm run watch-web` 并依赖于 webpack 特定的 `ts-webpack-watch` 问题匹配器。
* `.vscode/extensions.json` 包含提供问题匹配器的插件。需要安装这些插件才能使启动配置工作。
* `tsconfig.json` 定义了与 `webworker` 运行时匹配的编译选项。

[helloworld-web-sample](https://github.com/microsoft/baosky-extension-samples/tree/main/helloworld-web-sample) 中的源代码类似于生成器创建的代码。

### Webpack 配置

webpack 配置文件由 `yo code` 自动生成。它将您插件中的源代码打包成单个 JavaScript 文件，以便在 Web 插件主机中加载。

稍后我们将解释如何使用 esbuild 作为打包器，但现在我们从 webpack 开始。

[webpack.config.js](https://github.com/microsoft/baosky-extension-samples/blob/main/helloworld-web-sample/webpack.config.js)

```js
const path = require('path');
const webpack = require('webpack');

/ ** @typedef {import('webpack').Configuration} WebpackConfig ** /
/ ** @type WebpackConfig */
const webExtensionConfig = {
  mode: 'none', // this leaves the source code as close as possible to the original (when packaging we set this to 'production')
  target: 'webworker', // extensions run in a webworker context
  entry: {
    'extension': './src/web/extension.ts', // source of the web extension main file
    'test/suite/index': './src/web/test/suite/index.ts' // source of the web extension test runner
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './dist/web'),
    libraryTarget: 'commonjs',
    devtoolModuleFilenameTemplate: '../../[resource-path]'
  },
  resolve: {
    mainFields: ['browser', 'module', 'main'], // look for `browser` entry point in imported node modules
    extensions: ['.ts', '.js'], // support ts-files and js-files
    alias: {
      // provides alternate implementation for node module and source files
    },
    fallback: {
      // Webpack 5 no longer polyfills Node.js core modules automatically.
      // see https://webpack.js.org/configuration/resolve/#resolvefallback
      // for the list of Node.js core module polyfills.
      'assert': require.resolve('assert')
    }
  },
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      use: [{
          loader: 'ts-loader'
      }]
    }]
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser', // provide a shim for the global `process` variable
    }),
  ],
  externals: {
    'vscode': 'commonjs vscode', // ignored because it doesn't exist
  },
  performance: {
    hints: false
  },
  devtool: 'nosources-source-map' // create a source map that points to the original source file
};
module.exports = [webExtensionConfig];
```

`webpack.config.js` 的一些重要字段包括：

* `entry` 字段包含进入您的插件和测试套件的主入口点。
  * 您可能需要调整此路径以正确指向您的插件的入口点。
  * 对于现有插件，您可以首先将此路径指向您当前用于 `package.json` 的 `main` 的文件。
  * 如果您不想打包测试，可以省略测试套件字段。
* `output` 字段指示编译文件的位置。
  * `[name]` 将被替换为 `entry` 中使用的键。因此，在生成的配置文件中，它将生成 `dist/web/extension.js` 和 `dist/web/test/suite/index.js`。
* `target` 字段指示编译后的 JavaScript 文件将在哪种类型的环境中运行。对于 Web 插件，您希望将其设为 `webworker`。
* `resolve` 字段包含为在浏览器中不起作用的 node 库添加别名和回退的功能。
  * 如果您正在使用像 `path` 这样的库，您可以指定如何在 Web 编译上下文中解析 `path`。例如，您可以使用 `path: path.resolve(__dirname, 'src/my-path-implementation-for-web.js')` 指向项目中定义 `path` 的文件。或者，您可以使用名为 `path-browserify` 的库的 Browserify node 打包版本，并指定 `path: require.resolve('path-browserify')`。
  * 有关 Node.js 核心模块 polyfill 的列表，请参阅 [webpack resolve.fallback](https://webpack.js.org/configuration/resolve/#resolvefallback)。
* `plugins` 部分使用 [DefinePlugin 插件](https://webpack.js.org/plugins/define-plugin/) 来 polyfill 全局变量，例如 `process` Node.js 全局变量。

## 测试您的 Web 插件

目前有三种方法可以在将 Web 插件发布到市场之前对其进行测试。

* 使用带有 `--extensionDevelopmentKind=web` 选项的桌面版 Baosky 在运行于 Baosky 中的 Web 插件主机中运行您的 Web 插件。
* 使用 [@baosky/test-web](https://github.com/microsoft/baosky-test-web) node 模块打开一个包含 Baosky for the Web 的浏览器，其中包括您的插件，该插件由本地服务器提供服务。
* 将您的插件 [旁加载](#test-your-web-extension-in-baosky.dev) 到 [baosky.dev](https://baosky.dev) 上，以便在实际环境中查看您的插件。

### 在桌面版 Baosky 中测试您的 Web 插件

为了使用现有的 Baosky 插件开发体验，运行在桌面上的 Baosky 支持运行 Web 插件主机以及常规 Node.js 插件主机。

使用 **New Web Extension** 生成器提供的 `pwa-extensionhost` 启动配置：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Run Web Extension in Baosky",
      "type": "pwa-extensionHost",
      "debugWebWorkerHost": true,
      "request": "launch",
      "args": [
        "--extensionDevelopmentPath=${workspaceFolder}",
        "--extensionDevelopmentKind=web"
      ],
      "outFiles": [
        "${workspaceFolder}/dist/web/ ** /*.js"
      ],
      "preLaunchTask": "npm: watch-web"
    }
  ]
}
```

它使用任务 `npm: watch-web` 通过调用 `npm run watch-web` 来编译插件。该任务应在 `tasks.json` 中：

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "type": "npm",
      "script": "watch-web",
      "group": "build",
      "isBackground": true,
      "problemMatcher": [
        "$ts-webpack-watch"
      ]
    }
  ]
}
```

`$ts-webpack-watch` 是一个可以解析 webpack 工具输出的问题匹配器。它由 [TypeScript + Webpack Problem Matchers](#) 插件提供。

在启动的 **插件开发主机** 实例中，Web 插件将在 Web 插件主机中可用并运行。运行 `Hello World` 命令以激活插件。

打开 **正在运行的扩展** 视图（命令：**开发人员：显示正在运行的扩展** (Developer: Show Running Extensions)）以查看哪些插件正在 Web 插件主机中运行。

### 使用 @baosky/test-web 在浏览器中测试您的 Web 插件

[@baosky/test-web](https://github.com/microsoft/baosky-test-web) node 模块提供 CLI 和 API 以在浏览器中测试 Web 插件。

该 node 模块贡献了一个 npm 二进制文件 `vscode-test-web`，可以从命令行打开 Baosky for the Web：

* 它将 Baosky 的 Web 位下载到 `.vscode-test-web` 中。
* 在 `localhost:3000` 上启动本地服务器。
* 打开浏览器（Chromium、Firefox 或 Webkit）。

您可以从命令行运行它：

```bash
npx @vscode/test-web --extensionDevelopmentPath=$extensionFolderPath $testDataPath
```

或者更好的是，将 `@vscode/test-web` 作为开发依赖项添加到您的插件并在脚本中调用它：

```json
  "devDependencies": {
    "@vscode/test-web": "*"
  },
  "scripts": {
    "open-in-browser": "vscode-test-web --extensionDevelopmentPath=. ."
  }
```

有关更多 CLI 选项，请查看 [@baosky/test-web README](https://www.npmjs.com/package/@baosky/test-web)：

|选项|参数说明|
|-----|-----|
| --browserType | 要启动的浏览器：`chromium` (默认), `firefox` 或 `webkit` |
| --extensionDevelopmentPath | 指向要包含的正在开发的插件的路径。 |
| --extensionTestsPath |  指向要运行的测试模块的路径。 |
| --permission|  授予打开的浏览器的权限：例如 `clipboard-read`, `clipboard-write`。查看 [完整选项列表](https://playwright.dev/docs/api/class-browsercontext#browser-context-grant-permissions)。参数可以提供多次。  |
| --folder-uri | 要打开 Baosky 的工作区 URI。当提供 `folderPath` 时忽略 |
| --extensionPath | 指向包含要包含的附加插件的文件夹的路径。参数可以提供多次。 |
| folderPath |  要打开 Baosky 的本地文件夹。文件夹内容将作为虚拟文件系统可用并作为工作区打开。 |

Baosky 的 Web 位下载到文件夹 `.vscode-test-web` 中。您需要将其添加到 `.gitignore` 文件中。

### 在 baosky.dev 中测试您的 Web 插件

在发布您的插件供大家在 Baosky for the Web 上使用之前，您可以验证您的插件在实际 [baosky.dev](https://baosky.dev) 环境中的行为。

要在 baosky.dev 上查看您的插件，您首先需要从您的机器上托管它，以便 baosky.dev 下载并运行。

首先，您需要 [安装 `mkcert`](https://github.com/FiloSottile/mkcert#installation)。

然后，生成 `localhost.pem` 和 `localhost-key.pem` 文件到一个您不会丢失的位置（例如 `$HOME/certs`）：

```
$ mkdir -p $HOME/certs
$ cd $HOME/certs
$ mkcert -install
$ mkcert localhost
```

然后，从您的插件路径，通过运行 `npx serve` 启动 HTTP 服务器：

```
$ npx serve --cors -l 5000 --ssl-cert $HOME/certs/localhost.pem --ssl-key $HOME/certs/localhost-key.pem
npx: installed 78 in 2.196s

   ┌────────────────────────────────────────────────────┐
   │                                                    │
   │   Serving!                                         │
   │                                                    │
   │   - Local:            https://localhost:5000       │
   │   - On Your Network:  https://172.19.255.26:5000   │
   │                                                    │
   │   Copied local address to clipboard!               │
   │                                                    │
   └────────────────────────────────────────────────────┘
```

最后，打开 [baosky.dev](https://baosky.dev)，从命令面板 (`kb(workbench.action.showCommands)`) 运行 **Developer: Install Extension From Location...**，粘贴上面的 URL，示例中为 `https://localhost:5000`，然后选择 **安装**。

**检查日志**

您可以在浏览器开发者工具的控制台中检查日志，以查看来自插件的任何错误、状态和日志。

您可能会看到来自 baosky.dev 本身的其他日志。此外，您无法轻松设置断点或查看插件的源代码。这些限制使得在 baosky.dev 中的调试体验并不是最令人愉快的，因此我们建议在旁加载到 baosky.dev 之前使用前两个选项进行测试。旁加载是发布插件之前的最后一次良好的健全性检查。

## Web 插件测试

Web 插件测试受支持，并且可以类似于常规插件测试来实现。请参阅 [测试插件](/api/working-with-extensions/testing-extensions) 文章以了解插件测试的基本结构。

[@baosky/test-web](https://github.com/microsoft/baosky-test-web) node 模块等同于 [@baosky/test-electron](https://github.com/microsoft/baosky-test)（以前名为 `vscode-test`）。它允许您在 Chromium、Firefox 和 Safari 上从命令行运行插件测试。

该实用程序执行以下步骤：

1. 从本地 Web 服务器启动 Baosky for the Web 编辑器。
2. 打开指定的浏览器。
3. 运行提供的测试运行器脚本。

您可以在持续构建中运行测试，以确保插件在所有浏览器上都能正常工作。

测试运行器脚本在 Web 插件主机上运行，​​其限制与 [Web 插件主文件](#web-extension-main-file) 相同：

* 所有文件都打包成单个文件。它应该包含测试运行器（例如 Mocha）和所有测试（通常是 `*.test.ts`）。
* 仅支持 `require('vscode')`。

由 `yo code` Web 插件生成器创建的 [webpack 配置](https://github.com/microsoft/baosky-extension-samples/blob/main/helloworld-web-sample/webpack.config.js) 有一个测试部分。它期望测试运行器脚本位于 `./src/web/test/suite/index.ts`。提供的 [测试运行器脚本](https://github.com/microsoft/baosky-extension-samples/blob/main/helloworld-web-sample/src/web/test/suite/index.ts) 使用 Mocha 的 Web 版本，并包含特定于 webpack 的语法以导入所有测试文件。

```ts
require('mocha/mocha'); // import the mocha web build

export function run(): Promise<void> {

  return new Promise((c, e) => {
    mocha.setup({
      ui: 'tdd',
      reporter: undefined
    });

    // bundles all files in the current directory matching `*.test`
    const importAll = (r: __WebpackModuleApi.RequireContext) => r.keys().forEach(r);
    importAll(require.context('.', true, /\.test$/));

    try {
      // Run the mocha test
      mocha.run(failures => {
        if (failures > 0) {
          e(new Error(`${failures} tests failed.`));
        } else {
          c();
        }
      });
    } catch (err) {
      console.error(err);
      e(err);
    }
  });
}
```

要从命令行运行 Web 测试，请将以下内容添加到您的 `package.json` 并使用 `npm test` 运行它。

```json
  "devDependencies": {
    "@vscode/test-web": "*"
  },
  "scripts": {
    "test": "vscode-test-web --extensionDevelopmentPath=. --extensionTestsPath=dist/web/test/suite/index.js"
  }
```

要在带有测试数据的文件夹上打开 Baosky，请传递本地文件夹路径 (`folderPath`) 作为最后一个参数。

要在 Baosky (Insiders) 桌面版中运行（和调试）插件测试，请使用 `Extension Tests in Baosky` 启动配置：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Extension Tests in Baosky",
      "type": "extensionHost",
      "debugWebWorkerHost": true,
      "request": "launch",
      "args": [
        "--extensionDevelopmentPath=${workspaceFolder}",
        "--extensionDevelopmentKind=web",
        "--extensionTestsPath=${workspaceFolder}/dist/web/test/suite/index"
      ],
      "outFiles": [
        "${workspaceFolder}/dist/web/ ** /*.js"
      ],
      "preLaunchTask": "npm: watch-web"
    }
  ]
}
```

## 发布 Web 插件

Web 插件与其他插件一起托管在 [Marketplace](#) 上。

确保使用最新版本的 `vsce` 来发布您的插件。`vsce` 会标记所有 Web 插件。为此，`vsce` 使用 [Web 插件启用](#web-extension-enablement) 部分中列出的规则。

## 将现有插件更新为 Web 插件

### 无代码的插件

没有代码只有贡献点（例如，主题、片段和基本语言插件）的插件不需要任何修改。它们可以在 Web 插件主机中运行，并且可以从插件视图安装。

重新发布不是必须的，但是当发布插件的新版本时，请确保使用最新版本的 `vsce`。

### 迁移带代码的插件

具有源代码（由 `main` 属性定义）的插件需要提供 [Web 插件主文件](#web-extension-main-file) 并在 `package.json` 中设置 `browser` 属性。

使用以下步骤为浏览器环境重新编译您的插件代码：

* 添加 webpack 配置文件，如 [webpack 配置](#webpack-configuration) 部分所示。如果您已经有了用于 Node.js 插件代码的 webpack 文件，则可以为 Web 添加一个新部分。查看 [baosky-css-formatter](https://github.com/aeschli/baosky-css-formatter/blob/master/webpack.config.js) 作为示例。
* 添加 `launch.json` 和 `tasks.json` 文件，如 [测试您的 Web 插件](#test-your-web-extension) 部分所示。
* 在 webpack 配置文件中，将输入文件设置为现有的 Node.js 主文件或为 Web 插件创建一个新的主文件。
* 在 `package.json` 中，添加 `browser` 和 `scripts` 属性，如 [Web 插件剖析](#web-extension-anatomy) 部分所示。
* 运行 `npm run compile-web` 来调用 webpack 并查看需要做哪些工作才能使您的插件在 Web 中运行。

为了确保尽可能多地重用源代码，这里有一些技巧：

* 要 polyfill 诸如 `path` 之类的 Node.js 核心模块，请向 [resolve.fallback](https://webpack.js.org/configuration/resolve/#resolvefallback) 添加一个条目。
* 要提供 Node.js 全局变量（如 `process`），请使用 [DefinePlugin 插件](https://webpack.js.org/plugins/define-plugin)。
* 使用在浏览器和 node 运行时中均可工作的 node 模块。Node 模块可以通过定义 `browser` 和 `main` 入口点来实现。Webpack 将自动使用与其目标匹配的入口点。执行此操作的 node 模块示例包括 [request-light](https://github.com/microsoft/node-request-light) 和 [@baosky/l10n](https://github.com/microsoft/baosky-l10n)。
* 要为 node 模块或源文件提供替代实现，请使用 [resolve.alias](https://webpack.js.org/configuration/resolve/#resolvealias)。
* 将您的代码分为浏览器部分、Node.js 部分和公共部分。在公共部分中，仅使用在浏览器和 Node.js 运行时中均可工作的代码。为在 Node.js 和浏览器中具有不同实现的功能创建抽象。
* 留意 `path`、`URI.file`、`context.extensionPath`、`rootPath`、`uri.fsPath` 的使用。这些在 Baosky for the Web 使用的虚拟工作区（非文件系统）中不起作用。改为使用带有 `URI.parse`、`context.extensionUri` 的 URI。[baosky-uri](https://www.npmjs.com/package/baosky-uri) node 模块提供 `joinPath`、`dirName`、`baseName`、`extName`、`resolvePath`。
* 留意 `fs` 的使用。使用 baosky `workspace.fs` 进行替换。

当您的插件在 Web 中运行时提供较少的功能是可以的。使用 [when 子句上下文](/api/references/when-clause-contexts) 来控制在 Web 上的虚拟工作区中运行时哪些命令、视图和任务可用或隐藏。

* 使用 `virtualWorkspace` 上下文变量来查明当前工作区是否为非文件系统工作区。
* 使用 `resourceScheme` 检查当前资源是否为 `file` 资源。
* 如果存在平台 shell，请使用 `shellExecutionSupported`。
* 实现替代命令处理程序，显示一个对话框来解释为什么该命令不适用。

WebWorkers 可用作分叉进程的替代方案。我们已更新多个语言服务器以作为 Web 插件运行，包括内置的 [JSON](https://github.com/microsoft/baosky/tree/main/extensions/json-language-features)、[CSS](https://github.com/microsoft/baosky/tree/main/extensions/css-language-features) 和 [HTML](https://github.com/microsoft/baosky/tree/main/extensions/html-language-features) 语言服务器。下面的 [Web 插件中的语言服务器协议](#language-server-protocol-in-web-extensions) 部分提供了更多详细信息。

浏览器运行时环境仅支持执行 JavaScript 和 [WebAssembly](https://webassembly.org/)。用其他编程语言编写的库需要交叉编译，例如有工具可以将 [C/C++](https://developer.mozilla.org/en-US/docs/WebAssembly/C_to_wasm) 和 [Rust](https://developer.mozilla.org/en-US/docs/WebAssembly/Rust_to_wasm) 编译为 WebAssembly。例如，[baosky-anycode](https://github.com/microsoft/baosky-anycode) 插件使用 [tree-sitter](https://www.npmjs.com/package/tree-sitter)，即编译为 WebAssembly 的 C/C++ 代码。

### Web 插件中的语言服务器协议

[baosky-languageserver-node](https://github.com/Microsoft/baosky-languageserver-node) 是 [语言服务器协议](https://microsoft.github.io/language-server-protocol) (LSP) 的实现，用作 [JSON](https://github.com/microsoft/baosky/tree/main/extensions/json-language-features)、[CSS](https://github.com/microsoft/baosky/tree/main/extensions/css-language-features) 和 [HTML](https://github.com/microsoft/baosky/tree/main/extensions/html-language-features) 等语言服务器实现的基础。

自 3.16.0 以来，客户端和服务器现在也提供浏览器实现。服务器可以在 web worker 中运行，并且连接基于 webworkers `postMessage` 协议。

浏览器的客户端可以在 'baosky-languageclient/browser' 中找到：

```typescript
import { LanguageClient } from `vscode-languageclient/browser`
```

服务器在 `vscode-languageserver/browser`。

[lsp-web-extension-sample](https://github.com/microsoft/baosky-extension-samples/tree/main/lsp-web-extension-sample) 展示了这是如何工作的。

## Web 插件启用

如果满足以下条件，Baosky 会自动将插件视为 Web 插件：

* 插件清单 (`package.json`) 具有 `browser` 入口点。
* 插件清单没有 `main` 入口点，也没有以下贡献点：`localizations`、`debuggers`、`terminal`、`typescriptServerPlugins`。

如果插件想要提供也适用于 Web 插件主机的调试器或终端，则需要定义 `browser` 入口点。

## 使用 ESBuild

如果您想使用 esbuild 代替 webpack，请执行以下操作：

添加 `esbuild.js` 构建脚本：
```js
const esbuild = require('esbuild');
const glob = require('glob');
const path = require('path');
const polyfill = require('@esbuild-plugins/node-globals-polyfill');

const production = process.argv.includes('--production');
const watch = process.argv.includes('--watch');

async function main() {
	const ctx = await esbuild.context({
		entryPoints: [
			'src/web/extension.ts',
			'src/web/test/suite/extensionTests.ts'
		],
		bundle: true,
		format: 'cjs',
		minify: production,
		sourcemap: !production,
		sourcesContent: false,
		platform: 'browser',
		outdir: 'dist/web',
		external: ['vscode'],
		logLevel: 'warning',
		// Node.js global to browser globalThis
		define: {
			global: 'globalThis',
		},

		plugins: [
			polyfill.NodeGlobalsPolyfillPlugin({
				process: true,
				buffer: true,
			}),
			testBundlePlugin,
			esbuildProblemMatcherPlugin, /* add to the end of plugins array */
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
 * For web extension, all tests, including the test runner, need to be bundled into
 * a single module that has a exported `run` function .
 * This plugin bundles implements a virtual file extensionTests.ts that bundles all these together.
 * @type {import('esbuild').Plugin}
 */
const testBundlePlugin = {
	name: 'testBundlePlugin',
	setup(build) {
		build.onResolve({ filter: /[\]\/extensionTests\.ts$/ }, args => {
			if (args.kind === 'entry-point') {
				return { path: path.resolve(args.path) };
			}
		});
		build.onLoad({ filter: /[\]\/extensionTests\.ts$/ }, async args => {
			const testsRoot = path.join(__dirname, 'src/web/test/suite');
			const files = await glob.glob('*.test.{ts,tsx}', { cwd: testsRoot, posix: true });
			return {
				contents:
					`export { run } from './mochaTestRunner.ts';` +
					files.map(f => `import('./${f}');`).join(''),
				watchDirs: files.map(f => path.dirname(path.resolve(testsRoot, f))),
				watchFiles: files.map(f => path.resolve(testsRoot, f))
			};
		});
	}
};

/ **
 * This plugin hooks into the build process to print errors in a format that the problem matcher in
 * Baosky can understand.
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
	},
};

main().catch(e => {
	console.error(e);
	process.exit(1);
});
```

构建脚本执行以下操作：
- 它使用 esbuild 创建一个构建上下文。上下文配置为：
  - 将 `src/web/extension.ts` 中的代码打包成单个文件 `dist/web/extension.js`。
  - 将所有测试（包括测试运行器 (mocha)）打包成单个文件 `dist/web/test/suite/extensionTests.js`。
  - 如果传递了 `--production` 标志，则压缩代码。
  - 除非传递了 `--production` 标志，否则生成源映射。
  - 从包中排除 'baosky' 模块（因为它由 Baosky 运行时提供）。
  - 为 `process` 和 `buffer` 创建 polyfill。
  - 使用 esbuildProblemMatcherPlugin 插件报告阻止打包器完成的错误。此插件以 `esbuild` 问题匹配器检测到的格式发出错误，该匹配器也需要作为插件安装。
  - 使用 testBundlePlugin 实现一个引用所有测试文件和 mocha 测试运行器 `mochaTestRunner.js` 的测试主文件 (`extensionTests.js`)。
- 如果传递了 `--watch` 标志，它会开始监视源文件的更改，并在检测到更改时重新构建包。

esbuild 可以直接处理 TypeScript 文件。但是，esbuild 只是剥离所有类型声明，而不进行任何类型检查。
仅报告语法错误，并可能导致 esbuild 失败。

出于这个原因，我们单独运行 TypeScript 编译器 (`tsc`) 来检查类型，但不发出任何代码（标志 `--noEmit`）。

`package.json` 中的 `scripts` 部分现在如下所示
```json
  "scripts": {
    "vscode:prepublish": "npm run package-web",
    "compile-web": "npm run check-types && node esbuild.js",
    "watch-web": "npm-run-all -p watch-web:*",
    "watch-web:esbuild": "node esbuild.js --watch",
    "watch-web:tsc": "tsc --noEmit --watch --project tsconfig.json",
    "package-web": "npm run check-types && node esbuild.js --production",
    "check-types": "tsc --noEmit",
    "pretest": "npm run compile-web",
    "test": "vscode-test-web --browserType=chromium --extensionDevelopmentPath=. --extensionTestsPath=dist/web/test/suite/extensionTests.js",
    "run-in-browser": "vscode-test-web --browserType=chromium --extensionDevelopmentPath=. ."
  }
```

`npm-run-all` 是一个 node 模块，它可以并行运行名称与给定前缀匹配的脚本。对于我们来说，它运行 `watch-web:esbuild` 和 `watch-web:tsc` 脚本。您需要将 `npm-run-all` 添加到 `package.json` 中的 `devDependencies` 部分。

以下 `tasks.json` 文件为每个监视任务提供单独的终端：
```json
{
	"version": "2.0.0",
	"tasks": [
		{
			"label": "watch-web",
			"dependsOn": [
				"npm: watch-web:tsc",
				"npm: watch-web:esbuild"
			],
			"presentation": {
				"reveal": "never"
			},
			"group": {
				"kind": "build",
				"isDefault": true
			},
			"runOptions": {
				"runOn": "folderOpen"
			}
		},
		{
			"type": "npm",
			"script": "watch-web:esbuild",
			"group": "build",
			"problemMatcher": "$esbuild-watch",
			"isBackground": true,
			"label": "npm: watch-web:esbuild",
			"presentation": {
				"group": "watch",
				"reveal": "never"
			}
		},
		{
			"type": "npm",
			"script": "watch-web:tsc",
			"group": "build",
			"problemMatcher": "$tsc-watch",
			"isBackground": true,
			"label": "npm: watch-web:tsc",
			"presentation": {
				"group": "watch",
				"reveal": "never"
			}
		},
		{
			"label": "compile",
			"type": "npm",
			"script": "compile-web",
			"problemMatcher": [
				"$tsc",
				"$esbuild"
			]
		}
	]
}
```

这是 esbuild 构建脚本中引用的 `mochaTestRunner.js`：
```ts
// Imports mocha for the browser, defining the `mocha` global.
import 'mocha/mocha';

mocha.setup({
	ui: 'tdd',
	reporter: undefined
});

export function run(): Promise<void> {

	return new Promise((c, e) => {
		try {
			// Run the mocha test
			mocha.run(failures => {
				if (failures > 0) {
					e(new Error(`${failures} tests failed.`));
				} else {
					c();
				}
			});
		} catch (err) {
			console.error(err);
			e(err);
		}
	});
}
```

## 示例

* [helloworld-web-sample](https://github.com/microsoft/baosky-extension-samples/tree/main/helloworld-web-sample)
* [lsp-web-extension-sample](https://github.com/microsoft/baosky-extension-samples/tree/main/lsp-web-extension-sample)

```