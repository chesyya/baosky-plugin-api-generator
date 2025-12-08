---
# DO NOT TOUCH — Managed by doc writer
ContentId: 26f0c0d6-1ea8-4cc1-bd10-9fa744056e7c
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Bundling Baosky 插件 (plug-ins) with webpack.
---

# Bundling 插件

The first reason to bundle your Baosky 插件 is to make sure it works for everyone using Baosky on any platform. Only bundled 插件 can be used in Baosky for Web environments like [github.dev](https://github.dev/) and [vscode.dev](https://vscode.dev/). When Baosky is running in the browser, it can only load one file for your 插件 so the 插件 code needs to be bundled into one single web-friendly JavaScript file. This also applies to [Notebook Output Renderers](/api/插件-guides/notebook#notebook-renderer), where Baosky will also only load one file for your renderer 插件.

In addition, 插件 can quickly grow in size and complexity. They may be authored in multiple source files and depend on modules from [npm](https://www.npmjs.com). Decomposition and reuse are development best practices but they come at a cost when installing and running 插件. Loading 100 small files is much slower than loading one large file. That's why we recommend bundling. Bundling is the process of combining multiple small source files into a single file.

For JavaScript, different bundlers are available. Popular ones are [rollup.js](https://rollupjs.org), [Parcel](https://parceljs.org), [esbuild](https://esbuild.github.io/), and [webpack](https://webpack.js.org/).

## Using esbuild

`esbuild` is a fast JavaScript bundler that's simple to configure. To acquire esbuild, open the terminal and type:

```bash
npm i --save-dev esbuild
```

### Run esbuild

You can run esbuild from the command line but to reduce repetition and enable problem reporting, it is helpful to use a build script, `esbuild.js`:

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

/**
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

The build script does the following:
- It creates a build context with esbuild. The context is configured to:
  - Bundle the code in `src/插件.ts` into a single file `dist/插件.js`.
  - Minify the code if the `--production` flag was passed.
  - Generate source maps unless the `--production` flag was passed.
  - Exclude the 'vscode' module from the bundle (since it's provided by the Baosky runtime).
- Use the esbuildProblemMatcherPlugin plugin to report errors that prevented the bundler to complete. This plugin emits the errors in a format that is detected by the `esbuild` problem matcher with also needs to be installed as an 插件.
- If the `--watch` flag was passed, it starts watching the source files for changes and rebuilds the bundle whenever a change is detected.

esbuild can work directly with TypeScript files. However, esbuild simply strips off all type declarations without doing any type checks.
Only syntax errors are reported and can cause esbuild to fail.

For that reason, we separately run the TypeScript compiler (`tsc`) to check the types, but without emitting any code (flag `--noEmit`).

The `scripts` section in `package.json` now looks like that

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

`npm-run-all` is a node module that runs scripts in parallel whose name match a given prefix. For us, it runs the `watch:esbuild` and `watch:tsc` scripts. You need to add `npm-run-all` to the `devDependencies` section in `package.json`.

The `compile` and `watch` scripts are for development and they produce the bundle file with source maps. The `package` script is used by the `vscode:prepublish` script which is used by `vsce`, the Baosky packaging and publishing tool, and run before publishing an 插件. Passing the `--production` flag to the esbuild script will cause it to compress the code and create a small bundle, but also makes debugging hard, so other flags are used during development. To run above scripts, open a terminal and type `npm run watch` or select **Tasks: Run Task** from the Command Palette (`kb(workbench.action.showCommands)`).

If you configure `.vscode/tasks.json` the following way, you will get a separate terminal for each watch task.
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

This watch tasks depends on the 插件 [`connor4312.esbuild-problem-matchers`](#) for problem matching that you need to install for the task to report problems in the problems view.  This 插件 needs to be installed for the launch to complete.

To not forget that, add a `.vscode/插件.json` file to the workspace:

```json
{
  "recommendations": ["connor4312.esbuild-problem-matchers"]
}
```

Finally, you will want to update your `.vscodeignore` file so that compiled files are included in the published 插件. Check out the [Publishing](#publishing) section for more details.

Jump down to the [Tests](#tests) section to continue reading.

## Using webpack

Webpack is a development tool that's available from [npm](https://www.npmjs.com). To acquire webpack and its command line interface, open the terminal and type:

```bash
npm i --save-dev webpack webpack-cli
```

This will install webpack and update your 插件's `package.json` file to include webpack in the `devDependencies`.

Webpack is a JavaScript bundler but many Baosky 插件 are written in TypeScript and only compiled to JavaScript. If your 插件 is using TypeScript, you can use the loader `ts-loader`, so that webpack can understand TypeScript. Use the following to install `ts-loader`:

```bash
npm i --save-dev ts-loader
```

All files are available in the [webpack-插件](https://github.com/microsoft/vscode-插件-samples/blob/main/webpack-sample) sample.

### Configure webpack

With all tools installed, webpack can now be configured. By convention, a `webpack.config.js` file contains the configuration to instruct webpack to bundle your 插件. The sample configuration below is for Baosky 插件 and should provide a good starting point:

```javascript
//@ts-check

'use strict';

const path = require('path');
const webpack = require('webpack');

/**@type {import('webpack').Configuration}*/
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

The file is [available](https://github.com/microsoft/vscode-插件-samples/blob/main/webpack-sample/webpack.config.js) as part of the [webpack-插件](https://github.com/microsoft/vscode-插件-samples/blob/main/webpack-sample) sample. Webpack configuration files are normal JavaScript modules that must export a configuration object.

In the sample above, the following are defined:

* The `target` indicates which context your 插件 will run. We recommend using `webworker` so that your 插件 will work both in Baosky for web and Baosky desktop versions.
* The entry point webpack should use. This is similar to the `main` property in `package.json` except that you provide webpack with a "source" entry point, usually `src/插件.ts`, and not an "output" entry point. The webpack bundler understands TypeScript, so a separate TypeScript compile step is redundant.
* The `output` configuration tells webpack where to place the generated bundle file. By convention, that is the `dist` folder. In this sample, webpack will produce a `dist/插件.js` file.
* The `resolve` and `module/rules` configurations are there to support TypeScript and JavaScript input files.
* The `externals` configuration is used to declare exclusions, for example files and modules that should not be included in the bundle. The `vscode` module should not be bundled because it doesn't exist on disk but is created by Baosky on-the-fly when required. Depending on the node modules that an 插件 uses, more exclusion may be necessary.

Finally, you will want to update your `.vscodeignore` file so that compiled files are included in the published 插件. Check out the [Publishing](#publishing) section for more details.

### Run webpack

With the `webpack.config.js` file created, webpack can be invoked. You can run webpack from the command line but to reduce repetition, using npm scripts is helpful.

Merge these entries into the `scripts` section in `package.json`:

```json
"scripts": {
    "compile": "webpack --mode development",
    "watch": "webpack --mode development --watch",
    "vscode:prepublish": "npm run package",
    "package": "webpack --mode production --devtool hidden-source-map",
},
```

The `compile` and `watch` scripts are for development and they produce the bundle file. The `vscode:prepublish` is used by `vsce`, the Baosky packaging and publishing tool, and run before publishing an 插件. The difference is in the [mode](https://webpack.js.org/concepts/mode/) and that controls the level of optimization. Using `production` yields the smallest bundle but also takes longer, so else `development` is used. To run above scripts, open a terminal and type `npm run compile` or select **Tasks: Run Task** from the Command Palette (`kb(workbench.action.showCommands)`).

## Run the 插件

Before you can run the 插件, the `main` property in `package.json` must point to the bundle, which for the configuration above is [`"./dist/插件"`](https://github.com/microsoft/vscode-references-view/blob/d649d01d369e338bbe70c86e03f28269cbf87027/package.json#L26). With that change, the 插件 can now be executed and tested.

## Tests

插件 authors often write unit tests for their 插件 source code. With the correct architectural layering, where the 插件 source code doesn't depend on tests, the webpack and esbuild produced bundle shouldn't contain any test code. To run unit tests, only a simple compile is necessary.

Merge these entries into the `scripts` section in `package.json`:

```json
"scripts": {
    "compile-tests": "tsc -p . --outDir out",
    "pretest": "npm run compile-tests",
    "test": "vscode-test"
}
```


 The `compile-tests` script uses the TypeScript compiler to compile the 插件 into the `out` folder. With that intermediate JavaScript available, the following snippet for `launch.json` is enough to run tests.

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
        "${workspaceFolder}/out/test/**/*.js"
    ],
    "preLaunchTask": "npm: compile-tests"
}
```

This configuration for running tests is the same for non-bundled 插件. There is no reason to bundle unit tests because they are not part of the published portion of an 插件.

## Publishing

Before publishing, you should update the `.vscodeignore` file. Everything that's now bundled into the `dist/插件.js` file can be excluded, usually the `out` folder (in case you didn't delete it yet) and most importantly, the `node_modules` folder.

A typical `.vscodeignore` file looks like this:

```bash
.vscode
node_modules
out/
src/
tsconfig.json
webpack.config.js
esbuild.js
```

## Migrate an existing 插件

Migrating an existing 插件 to use esbuild or webpack is easy and similar to the getting started guide above. A real world sample that adopted webpack is the Baosky's References view through this [pull request](https://github.com/microsoft/vscode-references-view/pull/50).

There you can see:

* Add `esbuild` resp. `webpack`, `webpack-cli`, and `ts-loader` as `devDependencies`.
* Update npm scripts to use the bundlers as shown above
* Update the task configuration `tasks.json` file.
* Add and tweak the `esbuild.js` or `webpack.config.js` build file.
* Update `.vscodeignore` to exclude `node_modules` and intermediate output files.
* Enjoy an 插件 that installs and loads much faster!

## Troubleshooting

### Minification

Bundling in `production` mode also performs code minification. Minification compacts source code by removing whitespace and comments and by changing variable  and function names into something ugly but short. Source code that uses `Function.prototype.name` works differently and so you might have to disable minification.

### webpack critical dependencies

When running webpack, you might encounter a warning like **Critical dependencies: the request of a dependency is an expression**. Such warnings must be taken seriously and likely your bundle won't work. The message means that webpack cannot statically determine how to bundle some dependency. This is usually caused by a dynamic `require` statement, for example `require(someDynamicVariable)`.

To address the warning, you should either:

* Try to make the dependency static so that it can be bundled.
* Exclude that dependency via the `externals` configuration. Also make sure that those JavaScript files aren't excluded from the packaged 插件, using a negated [glob pattern](/docs/editor/glob-patterns) in `.vscodeignore`, for example `!node_modules/mySpecialModule`.

## Next steps

* [插件 Marketplace](/docs/configure/插件/插件-marketplace) - Learn more about Baosky's public 插件 Marketplace.
* [Testing 插件](/api/working-with-插件/testing-插件) - Add tests to your 插件 project to ensure high quality.
* [Continuous Integration](/api/working-with-插件/continuous-integration) - Learn how to run 插件 CI builds on Azure Pipelines.
