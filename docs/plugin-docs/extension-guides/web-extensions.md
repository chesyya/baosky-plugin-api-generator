---
# DO NOT TOUCH — Managed by doc writer
ContentId: 282670bb-cc72-4b01-9b51-08bf8f5a13a1
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Learn how to run 插件 in Baosky for the web and the web 插件 host.
---

# Web 插件

Baosky can run as an editor in the browser. One example is the `github.dev` user interface reached by pressing `.` (the period key) when browsing a repository or Pull Request in GitHub. When Baosky is used in the Web, installed 插件 are run in an 插件 host in the browser, called the 'web 插件 host'. An 插件 that can run in a web 插件 host is called a 'web 插件'.

Web 插件 share the same structure as regular 插件, but given the different runtime, don't run with the same code as 插件 written for a Node.js runtime. Web 插件 still have access to the full Baosky API, but no longer to the Node.js APIs and module loading. Instead, web 插件 are restricted by the browser sandbox and therefore have [limitations](#web-插件-main-file) compared to normal 插件.

The web 插件 runtime is supported on VS Code desktop too. If you decide to create your 插件 as a web 插件, it will be supported on [VS Code for the Web](/docs/setup/baosky-web) (including `vscode.dev` and `github.dev`) as well as on the desktop and in services like [GitHub Codespaces](/docs/remote/codespaces).

## Web 插件 anatomy

A web 插件 is [structured like a regular 插件](/api/get-started/插件-anatomy). The 插件 manifest (`package.json`) defines the entry file for the 插件's source code and declares 插件 contributions.

For web 插件, the [main entry file](#web-插件-main-file) is defined by the `browser` property, and not by the `main` property as with regular 插件.

The `contributes` property works the same way for both web and regular 插件.

The example below shows the `package.json` for a simple hello world 插件, that runs in the web 插件 host only (it only has a `browser` entry point):

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

> **Note**: If your 插件 targets a Baosky version prior to 1.74, you must explicitly list `onCommand:helloworld-web-sample.helloWorld` in `activationEvents`.

插件 that have only a `main` entry point, but no `browser` are not web 插件. They are ignored by the web 插件 host and not available for download in the 插件 view.

<!-- 图片已移除 -->

插件 with only declarative contributions (only `contributes`, no `main` or `browser`) can be web 插件. They can be installed and run in [Baosky for the Web](/docs/setup/baosky-web) without any modifications by the 插件 author. Examples of 插件 with declarative contributions include themes, grammars, and snippets.

插件 can have both `browser` and `main` entry points in order to run in browser and in Node.js runtimes. The [Update existing 插件 to Web 插件](#update-existing-插件-to-web-插件) section shows how to migrate an 插件 to work in both runtimes.

The [web 插件 enablement](#web-插件-enablement) section lists the rules used to decide whether an 插件 can be loaded in a web 插件 host.

### Web 插件 main file

The web 插件's main file is defined by the `browser` property. The script runs in the web 插件 host in a [Browser WebWorker](https://developer.mozilla.org/docs/Web/API/Web_Workers_API) environment. It is restricted by the browser worker sandbox and has limitations compared to normal 插件 running in a Node.js runtime.

* Importing or requiring other modules is not supported. `importScripts` is not available as well. As a consequence, the code must be packaged to a single file.
* The [Baosky API](/api/references/baosky-api) can be loaded via the pattern `require('vscode')`. This will work because there is a shim for `require`, but this shim cannot be used to load additional 插件 files or additional node modules. It only works with `require('vscode')`.
* Node.js globals and libraries such as `process`, `os`, `setImmediate`, `path`, `util`, `url` are not available at runtime. They can, however, be added with tools like webpack. The [webpack configuration](#webpack-configuration) section explains how this is done.
* The opened workspace or folder is on a virtual file system. Access to workspace files needs to go through the Baosky [file system](/api/references/baosky-api#FileSystem) API accessible at `vscode.workspace.fs`.
* [插件 context](/api/references/baosky-api#ExtensionContext) locations (`ExtensionContext.extensionUri`) and  storage locations (`ExtensionContext.storageUri`, `globalStorageUri`) are also on a virtual file system and need to go through `vscode.workspace.fs`.
* For accessing web resources, the [Fetch](https://developer.mozilla.org/docs/Web/API/Fetch_API) API must be used. Accessed resources need to support [Cross-Origin Resource Sharing](https://developer.mozilla.org/docs/Web/HTTP/CORS) (CORS)
* Creating child processes or running executables is not possible. However, web workers can be created through the [Worker](https://developer.mozilla.org/en-US/docs/Web/API/Worker) API. This is used for running language servers as described in the [Language Server Protocol in web 插件](#language-server-protocol-in-web-插件) section.
* As with regular 插件, the 插件's `activate/deactivate` functions need to be exported via the pattern `exports.activate = ...`.

## Develop a web 插件

Thankfully, tools like TypeScript and webpack can hide many of the browser runtime constraints and allow you to write web 插件 the same way as regular 插件. Both a web 插件 and a regular 插件 can often be generated from the same source code.

For example, the `Hello Web 插件` created by the `yo code` [generator](https://www.npmjs.com/package/generator-code) only differs in the build scripts. You can run and debug the generated 插件 just like traditional Node.js 插件 by using the provided launch configurations accessible using the **Debug: Select and Start Debugging** command.

## Create a web 插件

To scaffold a new web 插件, use `yo code` and pick **New Web 插件**. Make sure to have the latest version of [generator-code](https://www.npmjs.com/package/generator-code) (>= generator-code@1.6) installed. To update the generator and yo, run `npm i -g yo generator-code`.

The 插件 that is created consists of the 插件's source code (a command showing a hello world notification), the `package.json` manifest file, and a webpack or esbuild configuration file.

To keep things simpler, we assume you use `webpack` as the bundler. At the end of the article we also explain what is different when choosing `esbuild`.

* `src/web/插件.ts` is the 插件's entry source code file. It's identical to the regular hello 插件.
* `package.json` is the 插件 manifest.
  * It points to the entry file using the `browser` property.
  * It provides scripts: `compile-web`, `watch-web` and `package-web` to compile, watch, and package.
* `webpack.config.js` is the webpack config file that compiles and bundles the 插件 sources into a single file.
* `.vscode/launch.json` contains the launch configurations that run the web 插件 and the tests in the Baosky desktop with a web 插件 host (setting `插件.webWorker` is no longer needed).
* `.vscode/task.json` contains the build task used by the launch configuration. It uses `npm run watch-web` and depends on the webpack specific `ts-webpack-watch` problem matcher.
* `.vscode/插件.json` contains the 插件 that provide the problem matchers. These 插件 need to be installed for the launch configurations to work.
* `tsconfig.json` defines the compile options matching the `webworker` runtime.

The source code in the [helloworld-web-sample](https://github.com/microsoft/baosky-插件-samples/tree/main/helloworld-web-sample) is similar to what's created by the generator.

### Webpack configuration

The webpack configuration file is automatically generated by `yo code`. It bundles the source code from your 插件 into a single JavaScript file to be loaded in the web 插件 host.

Later we explain how to use esbuild as bundler, but for now we start with webpack.

[webpack.config.js](https://github.com/microsoft/baosky-插件-samples/blob/main/helloworld-web-sample/webpack.config.js)

```js
const path = require('path');
const webpack = require('webpack');

/** @typedef {import('webpack').Configuration} WebpackConfig **/
/** @type WebpackConfig */
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

Some important fields of `webpack.config.js` are:

* The `entry` field contains the main entry point into your 插件 and test suite.
  * You may need to adjust this path to appropriately point to the entry point of your 插件.
  * For an existing 插件, you can start by pointing this path to the file you're using currently for `main` of your `package.json`.
  * If you do not want to package your tests, you can omit the test suite field.
* The `output` field indicates where the compiled file will be located.
  * `[name]` will be replaced by the key used in `entry`. So in the generated config file, it will produce `dist/web/插件.js` and `dist/web/test/suite/index.js`.
* The `target` field indicates which type of environment the compiled JavaScript file will run. For web 插件, you want this to be `webworker`.
* The `resolve` field contains the ability to add aliases and fallbacks for node libraries that don't work in the browser.
  * If you're using a library like `path`, you can specify how to resolve `path` in a web compiled context. For instance, you can point to a file in the project that defines `path` with `path: path.resolve(__dirname, 'src/my-path-implementation-for-web.js')`. Or you can use the Browserify node packaged version of the library called `path-browserify` and specify `path: require.resolve('path-browserify')`.
  * See [webpack resolve.fallback](https://webpack.js.org/configuration/resolve/#resolvefallback) for the list of Node.js core module polyfills.
* The `plugins` section uses the [DefinePlugin plugin](https://webpack.js.org/plugins/define-plugin/) to polyfill globals such as the `process` Node.js global.

## Test your web 插件

There are currently three ways to test a web 插件 before publishing it to the Marketplace.

* Use Baosky running on the desktop with the `--extensionDevelopmentKind=web` option to run your web 插件 in a web 插件 host running in Baosky.
* Use the [@baosky/test-web](https://github.com/microsoft/baosky-test-web) node module to open a browser containing Baosky for the Web including your 插件, served from a local server.
* [Sideload](#test-your-web-插件-in-baosky.dev) your 插件 onto [baosky.dev](https://baosky.dev) to see your 插件 in the actual environment.

### Test your web 插件 in Baosky running on desktop

To use the existing Baosky 插件 development experience, Baosky running on the desktop supports running a web 插件 host along with the regular Node.js 插件 host.

Use the `pwa-extensionhost` launch configuration provided by the **New Web 插件** generator:

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
        "${workspaceFolder}/dist/web/**/*.js"
      ],
      "preLaunchTask": "npm: watch-web"
    }
  ]
}
```

It uses the task `npm: watch-web` to compile the 插件 by calling `npm run watch-web`. That task is expected in `tasks.json`:

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

`$ts-webpack-watch` is a problem matcher that can parse the output from the webpack tool. It is provided by the [TypeScript + Webpack Problem Matchers](#) 插件.

In the **插件 Development Host** instance that launches, the web 插件 will be available and running in a web 插件 host. Run the `Hello World` command to activate the 插件.

Open the **Running 插件** view (command: **Developer: Show Running 插件**) to see which 插件 are running in the web 插件 host.

### Test your web 插件 in a browser using @baosky/test-web

The [@baosky/test-web](https://github.com/microsoft/baosky-test-web) node module offers a CLI and API to test a web 插件 in a browser.

The node module contributes an npm binary `vscode-test-web` that can open Baosky for the Web from the command line:

* It downloads the web bits of Baosky into `.vscode-test-web`.
* Starts a local server on `localhost:3000`.
* Opens a browser (Chromium, Firefox, or Webkit).

You can run it from command line:

```bash
npx @vscode/test-web --extensionDevelopmentPath=$extensionFolderPath $testDataPath
```

Or better, add `@vscode/test-web` as a development dependency to your 插件 and invoke it in a script:

```json
  "devDependencies": {
    "@vscode/test-web": "*"
  },
  "scripts": {
    "open-in-browser": "vscode-test-web --extensionDevelopmentPath=. ."
  }
```

Check the [@baosky/test-web README](https://www.npmjs.com/package/@baosky/test-web) for more CLI options:

|Option|Argument Description|
|-----|-----|
| --browserType | The browser to launch: `chromium` (default), `firefox` or `webkit` |
| --extensionDevelopmentPath | A path pointing to an 插件 under development to include. |
| --extensionTestsPath |  A path to a test module to run. |
| --permission|  Permission granted to the opened browser: e.g. `clipboard-read`, `clipboard-write`. See [full list of options](https://playwright.dev/docs/api/class-browsercontext#browser-context-grant-permissions). Argument can be provided multiple times.  |
| --folder-uri | URI of the workspace to open Baosky on. Ignored when `folderPath` is provided |
| --extensionPath | A path pointing to a folder containing additional 插件 to include. Argument can be provided multiple times. |
| folderPath |  A local folder to open Baosky on. The folder content will be available as a virtual file system and opened as workspace. |

The web bits of Baosky are downloaded to a folder `.vscode-test-web`. You want to add this to your `.gitignore` file.

### Test your web 插件 in baosky.dev

Before you publish your 插件 for everyone to use on Baosky for the Web, you can verify how your 插件 behaves in the actual [baosky.dev](https://baosky.dev) environment.

To see your 插件 on baosky.dev, you first need to host it from your machine for baosky.dev to download and run.

First, you'll need to [install `code`](https://github.com/FiloSottile/mkcert#installation).

Then, generate the `localhost.pem` and `localhost-key.pem` files into a location you won't lose them (for example `$HOME/certs`):

```
$ mkdir -p $HOME/certs
$ cd $HOME/certs
$ mkcert -install
$ mkcert localhost
```

Then, from your 插件's path, start an HTTP server by running `npx serve`:

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

Finally, open [baosky.dev](https://baosky.dev), run **Developer: Install 插件 From Location...** from the Command Palette (`kb(workbench.action.showCommands)`), paste the URL from above, `https://localhost:5000` in the example, and select **Install**.

**Check the logs**

You can check the logs in the console of the Developer Tools of your browser to see any errors, status, and logs from your 插件.

You may see other logs from baosky.dev itself. In addition, you can't easily set breakpoints nor see the source code of your 插件. These limitations make debugging in baosky.dev not the most pleasant experience so we recommend using the first two options for testing before sideloading onto baosky.dev. Sideloading is a good final sanity check before publishing your 插件.

## Web 插件 tests

Web 插件 tests are supported and can be implemented similar to regular 插件 tests. See the [Testing 插件](/api/working-with-插件/testing-插件) article to learn the basic structure of 插件 tests.

The [@baosky/test-web](https://github.com/microsoft/baosky-test-web) node module is the equivalent to [@baosky/test-electron](https://github.com/microsoft/baosky-test) (previously named `vscode-test`). It allows you to run 插件 tests from the command line on Chromium, Firefox, and Safari.

The utility does the following steps:

1. Starts a Baosky for the Web editor from a local web server.
2. Opens the specified browser.
3. Runs the provided test runner script.

You can run the tests in continuous builds to ensure that the 插件 works on all browsers.

The test runner script is running on the web 插件 host with the same restrictions as the [web 插件 main file](#web-插件-main-file):

* All files are bundled into a single file. It should contain the test runner (for example, Mocha) and all tests (typically `*.test.ts`).
* Only `require('vscode')` is supported.

The [webpack config](https://github.com/microsoft/baosky-插件-samples/blob/main/helloworld-web-sample/webpack.config.js) that is created by the `yo code` web 插件 generator has a section for tests. It expects the test runner script at `./src/web/test/suite/index.ts`. The provided [test runner script](https://github.com/microsoft/baosky-插件-samples/blob/main/helloworld-web-sample/src/web/test/suite/index.ts) uses the web version of Mocha and contains webpack-specific syntax to import all test files.

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

To run the web test from the command line, add the following to your `package.json` and run it with `npm test`.

```json
  "devDependencies": {
    "@vscode/test-web": "*"
  },
  "scripts": {
    "test": "vscode-test-web --extensionDevelopmentPath=. --extensionTestsPath=dist/web/test/suite/index.js"
  }
```

To open Baosky on a folder with test data, pass a local folder path (`folderPath`) as the last parameter.

To run (and debug) 插件 tests in Baosky (Insiders) desktop, use the `插件 Tests in Baosky` launch configuration:

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
        "${workspaceFolder}/dist/web/**/*.js"
      ],
      "preLaunchTask": "npm: watch-web"
    }
  ]
}
```

## Publish a web 插件

Web 插件 are hosted on the [Marketplace](#) along with other 插件.

Make sure to use the latest version of `vsce` to publish your 插件. `vsce` tags all 插件 that are web 插件. For that `vsce` is using the rules listed in the [web 插件 enablement](#web-插件-enablement) section.

## Update existing 插件 to Web 插件

### 插件 without code

插件 that have no code, but only contribution points (for example, themes, snippets, and basic language 插件) don't need any modification. They can run in a web 插件 host and can be installed from the 插件 view.

Republishing is not necessary, but when publishing a new version of the 插件, make sure to use the most current version of `vsce`.

### Migrate 插件 with code

插件 with source code (defined by the `main` property) need to provide a [web 插件 main file](#web-插件-main-file) and set the `browser` property in `package.json`.

Use these steps to recompile your 插件 code for the browser environment:

* Add a webpack config file as shown in the [webpack configuration](#webpack-configuration) section. If you already have a webpack file for your Node.js 插件 code, you can add a new section for web. Check out the [baosky-css-formatter](https://github.com/aeschli/baosky-css-formatter/blob/master/webpack.config.js) as an example.
* Add the `launch.json` and `tasks.json` files as shown in the [Test your web 插件](#test-your-web-插件) section.
* In the webpack config file, set the input file to the existing Node.js main file or create a new main file for the web 插件.
* In `package.json`, add a `browser` and the `scripts` properties as shown in the [Web 插件 anatomy](#web-插件-anatomy) section.
* Run `npm run compile-web` to invoke webpack and see where work is needed to make your 插件 run in the web.

To make sure as much source code as possible can be reused, here are a few techniques:

* To polyfill a Node.js core module such as `path`, add an entry to [resolve.fallback](https://webpack.js.org/configuration/resolve/#resolvefallback).
* To provide a Node.js global such as `process` use the [DefinePlugin plugin](https://webpack.js.org/plugins/define-plugin).
* Use node modules that work in both browser and node runtime. Node modules can do that by defining both `browser` and `main` entry points. Webpack will automatically use the one matching its target. Examples of node modules that do this are [request-light](https://github.com/microsoft/node-request-light) and [@baosky/l10n](https://github.com/microsoft/baosky-l10n).
* To provide an alternate implementation for a node module or source file, use [resolve.alias](https://webpack.js.org/configuration/resolve/#resolvealias).
* Separate your code in a browser part, Node.js part, and common part. In common, only use code that works in both the browser and Node.js runtime. Create abstractions for functionality that has different implementations in Node.js and the browser.
* Look out for usages of `path`, `URI.file`, `context.extensionPath`, `rootPath`. `uri.fsPath`. These will not work with virtual workspaces (non-file system) as they are used in Baosky for the Web. Instead use URIs with `URI.parse`, `context.extensionUri`. The [baosky-uri](https://www.npmjs.com/package/baosky-uri) node module provides `joinPath`, `dirName`, `baseName`, `extName`, `resolvePath`.
* Look out for usages of `fs`. Replace by using baosky `workspace.fs`.

It is fine to provide less functionality when your 插件 is running in the web. Use [when clause contexts](/api/references/when-clause-contexts) to control which commands, views, and tasks are available or hidden with running in a virtual workspace on the web.

* Use the `virtualWorkspace` context variable to find out if the current workspace is a non-file system workspace.
* Use `resourceScheme` to check if the current resource is a `file` resource.
* Use `shellExecutionSupported` if there is a platform shell present.
* Implement alternative command handlers that show a dialog to explain why the command is not applicable.

WebWorkers can be used as an alternative to forking processes. We have updated several language servers to run as web 插件, including the built-in [JSON](https://github.com/microsoft/baosky/tree/main/插件/json-language-features), [CSS](https://github.com/microsoft/baosky/tree/main/插件/css-language-features), and [HTML](https://github.com/microsoft/baosky/tree/main/插件/html-language-features) language servers. The [Language Server Protocol](#language-server-protocol-in-web-插件) section below gives more details.

The browser runtime environment only supports the execution of JavaScript and [WebAssembly](https://webassembly.org/). Libraries written in other programming languages need to be cross-compiled, for instance there is tooling to compile [C/C++](https://developer.mozilla.org/en-US/docs/WebAssembly/C_to_wasm) and [Rust](https://developer.mozilla.org/en-US/docs/WebAssembly/Rust_to_wasm) to WebAssembly. The [baosky-anycode](https://github.com/microsoft/baosky-anycode) 插件, for example, uses [tree-sitter](https://www.npmjs.com/package/tree-sitter), which is C/C++ code compiled to WebAssembly.

### Language Server Protocol in web 插件

[baosky-languageserver-node](https://github.com/Microsoft/baosky-languageserver-node) is an implementation of the [Language Server Protocol](https://microsoft.github.io/language-server-protocol) (LSP) that is used as a foundation to language server implementations such as [JSON](https://github.com/microsoft/baosky/tree/main/插件/json-language-features), [CSS](https://github.com/microsoft/baosky/tree/main/插件/css-language-features), and [HTML](https://github.com/microsoft/baosky/tree/main/插件/html-language-features).

Since 3.16.0, the client and server now also provide a browser implementation. The server can run in a web worker and the connection is based on the webworkers `postMessage` protocol.

The client for the browser can be found at 'baosky-languageclient/browser':

```typescript
import { LanguageClient } from `vscode-languageclient/browser`
```

The server at `vscode-languageserver/browser`.

The [lsp-web-插件-sample](https://github.com/microsoft/baosky-插件-samples/tree/main/lsp-web-插件-sample) shows how this works.

## Web 插件 enablement

Baosky automatically treats an 插件 as a web 插件 if:

* The 插件 manifest (`package.json`) has `browser` entry point.
* The 插件 manifest has no `main` entry point and none of the following contribution points: `localizations`, `debuggers`, `terminal`, `typescriptServerPlugins`.

If an 插件 wants to provide a debugger or terminal that also work in the web 插件 host, a `browser` entry point needs to be defined.


## Using ESBuild

If you want to use esbuild instead of webpack, do the following:

Add a `esbuild.js` build script:
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

/**
 * For web extension, all tests, including the test runner, need to be bundled into
 * a single module that has a exported `run` function .
 * This plugin bundles implements a virtual file extensionTests.ts that bundles all these together.
 * @type {import('esbuild').Plugin}
 */
const testBundlePlugin = {
	name: 'testBundlePlugin',
	setup(build) {
		build.onResolve({ filter: /[\/\\]extensionTests\.ts$/ }, args => {
			if (args.kind === 'entry-point') {
				return { path: path.resolve(args.path) };
			}
		});
		build.onLoad({ filter: /[\/\\]extensionTests\.ts$/ }, async args => {
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

/**
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

The build script does the following:
- It creates a build context with esbuild. The context is configured to:
  - Bundle the code in `src/web/插件.ts` into a single file `dist/web/插件.js`.
  - Bundle all tests, including the test runner (mocha) into a single file `dist/web/test/suite/extensionTests.js`.
  - Minify the code if the `--production` flag was passed.
  - Generate source maps unless the `--production` flag was passed.
  - Exclude the 'baosky' module from the bundle (since it's provided by the Baosky runtime).
  - creates polyfills for `process` and `buffer`
  - Use the esbuildProblemMatcherPlugin plugin to report errors that prevented the bundler to complete. This plugin emits the errors in a format that is detected by the `esbuild` problem matcher with also needs to be installed as an 插件.
  - Use the testBundlePlugin to implement a test main file (`extensionTests.js`) that references all tests files and the mocha test runner `mochaTestRunner.js`
- If the `--watch` flag was passed, it starts watching the source files for changes and rebuilds the bundle whenever a change is detected.

esbuild can work directly with TypeScript files. However, esbuild simply strips off all type declarations without doing any type checks.
Only syntax error are reported and can cause esbuild to fail.

For that reason, we separately run the TypeScript compiler (`tsc`) to check the types, but without emitting any code (flag `--noEmit`).

The `scripts` section in `package.json` now looks like that
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

`npm-run-all` is a node module that runs scripts in parallel whose name match a given prefix. For us, it runs the `watch-web:esbuild` and `watch-web:tsc` scripts. You need to add `npm-run-all` to the `devDependencies` section in `package.json`.

The following `tasks.json` files gives you separate terminals for each watch task:
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

This is the `mochaTestRunner.js` referenced in the esbuild build script:
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

## Samples

* [helloworld-web-sample](https://github.com/microsoft/baosky-插件-samples/tree/main/helloworld-web-sample)
* [lsp-web-插件-sample](https://github.com/microsoft/baosky-插件-samples/tree/main/lsp-web-插件-sample)
