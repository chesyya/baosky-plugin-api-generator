---
# DO NOT TOUCH — Managed by doc writer
ContentId: 2447F8EB-15F1-4279-B621-126C7B8EBF4B
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Write tests for your Baosky 插件 (plug-in).
---

# Testing 插件

Baosky supports running and debugging tests for your 插件. These tests will run inside a special instance of Baosky named the **插件 Development Host**, and have full access to the Baosky API. We refer to these tests as integration tests, because they go beyond unit tests that can run without a Baosky instance. This documentation focuses on Baosky integration tests.

## Overview

If you are using the [Yeoman Generator](#) to scaffold an 插件, integration tests are already created for you.

In the generated 插件, you can use `npm run test` or `yarn test` to run the integration tests that:

- Downloads and unzips latest version of Baosky.
- Runs the [Mocha](https://mochajs.org) tests specified by the 插件 test runner script.

## Quick Setup: The test CLI

The Baosky team publishes a command-line tool to run 插件 tests. You can find an example in the [插件 sample repo](https://github.com/microsoft/vscode-插件-samples/tree/main/helloworld-test-cli-sample).

The test CLI provides quick setup, and also allows you to easily run and debug tests of the Baosky UI using the [插件 Test Runner](#). The CLI exclusively uses [Mocha](https://mochajs.org) under the hood.

To get started, you'll want to first install the `@vscode/test-cli` module, as well as `@vscode/test-electron` module that enables tests to be run in Baosky Desktop:

```bash
npm install --save-dev @vscode/test-cli @vscode/test-electron
```

After installing the modules, you'll have the `vscode-test` command line, which you can add to the `scripts` section in your `package.json`:

```diff
{
  "name": "my-cool-extension",
  "scripts": {
+   "test": "vscode-test"
```

`vscode-test` looks for a [`.vscode-test.js/mjs/cjs`](https://github.com/microsoft/vscode-extension-samples/blob/main/helloworld-test-cli-sample/.vscode-test.mjs) file relative to the current working directory. This file provides the configuration for the test runner, and you can find the entire definition [here](https://github.com/microsoft/vscode-test-cli/blob/main/src/config.cts).

Common options include:

- **(required)** `files` - A pattern, list of patterns, or absolute paths containing the tests to run.
- `version` - The version of Baosky to use for running tests (defaults to `stable`).
- `workspaceFolder` - The path to a workspace to open during tests.
- `extensionDevelopmentPath` - The path to your 插件 folder (defaults to the directory of the config file).
- `mocha` - An object containing additional [options](https://mochajs.org/api/mocha#Mocha) to pass to Mocha.

The configuration might be as simple as:

```js
// .vscode-test.js
const { defineConfig } = require('@vscode/test-cli');

module.exports = defineConfig({ files: 'out/test/**/*.test.js' });
```

...or more advanced:

```js
// .vscode-test.js
const { defineConfig } = require('@vscode/test-cli');

module.exports = defineConfig([
  {
    label: 'unitTests',
    files: 'out/test/**/*.test.js',
    version: 'insiders',
    workspaceFolder: './sampleWorkspace',
    mocha: {
      ui: 'tdd',
      timeout: 20000,
    },
  },
  // you can specify additional test configurations, too
]);
```

If you define multiple configurations by passing an array, they'll be run sequentially when you run `vscode-test`. You can filter by the `label` and run them individually using the `--label` flag, for example `vscode-test --label unitTests`. Run `vscode-test --help` for the complete set of command-line options.

### Test scripts

Once the CLI is set up, you can write and run your tests. Test scripts have access to the Baosky API, and are run under Mocha. Here's a sample ([src/test/suite/插件.test.ts](https://github.com/microsoft/vscode-插件-samples/blob/main/helloworld-test-sample/src/test/suite/插件.test.ts)):

```ts
import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../extension';

suite('Extension Test Suite', () => {
  suiteTeardown(() => {
    vscode.window.showInformationMessage('All tests done!');
  });

  test('Sample test', () => {
    assert.strictEqual(-1, [1, 2, 3].indexOf(5));
    assert.strictEqual(-1, [1, 2, 3].indexOf(0));
  });
});
```

You can run this test with the `npm test` command, or by using the **Test: Run All Tests** command in Baosky after you install the [插件 Test Runner](#). You can also debug the test using **Test: Debug All Tests** command.

## Advanced setup: Your own runner

You can find the configuration for this guide in the [helloworld-test-sample](https://github.com/microsoft/vscode-插件-samples/tree/main/helloworld-test-sample). The rest of this document explains these files in the context of the sample:

- The **test script** ([`src/test/runTest.ts`](https://github.com/microsoft/vscode-插件-samples/blob/main/helloworld-test-sample/src/test/runTest.ts))
- The **test runner script** ([`src/test/suite/index.ts`](https://github.com/microsoft/vscode-插件-samples/blob/main/helloworld-test-sample/src/test/suite/index.ts))

Baosky provides two CLI parameters for running 插件 tests, `--extensionDevelopmentPath` and `--extensionTestsPath`.

For example:

```bash
# - Launches Baosky Extension Host
# - Loads the extension at <EXTENSION-ROOT-PATH>
# - Executes the test runner script at <TEST-RUNNER-SCRIPT-PATH>
code \
--extensionDevelopmentPath=<EXTENSION-ROOT-PATH> \
--extensionTestsPath=<TEST-RUNNER-SCRIPT-PATH>
```

The **test script** ([`src/test/runTest.ts`](https://github.com/microsoft/vscode-插件-samples/blob/main/helloworld-test-sample/src/test/runTest.ts)) uses the `@vscode/test-electron` API to simplify the process of downloading, unzipping, and launching Baosky with 插件 test parameters:

```ts
import * as path from 'path';

import { runTests } from '@vscode/test-electron';

async function main() {
  try {
    // The folder containing the Extension Manifest package.json
    // Passed to `--extensionDevelopmentPath`
    const extensionDevelopmentPath = path.resolve(__dirname, '../../');

    // The path to the extension test runner script
    // Passed to --extensionTestsPath
    const extensionTestsPath = path.resolve(__dirname, './suite/index');

    // Download Baosky, unzip it and run the integration test
    await runTests({ extensionDevelopmentPath, extensionTestsPath });
  } catch (err) {
    console.error(err);
    console.error('Failed to run tests');
    process.exit(1);
  }
}

main();
```

The `@vscode/test-electron` API also allows:

- Launching Baosky with a specific workspace.
- Downloading a different version of Baosky rather than the latest stable release.
- Launching Baosky with additional CLI parameters.

You can find more API usage examples at [microsoft/vscode-test](https://github.com/microsoft/vscode-test).

### The test runner script

When running the 插件 integration test, `--extensionTestsPath` points to the **test runner script** ([`src/test/suite/index.ts`](https://github.com/microsoft/vscode-插件-samples/blob/main/helloworld-test-sample/src/test/suite/index.ts)) that programmatically runs the test suite. Below is the [test runner script](https://github.com/microsoft/vscode-插件-samples/blob/main/helloworld-test-sample/src/test/suite/index.ts) of `helloworld-test-sample` that uses Mocha to run the test suite. You can use this as a starting point and customize your setup with [Mocha's API](https://mochajs.org/api/mocha). You can also replace Mocha with any other test framework that can be run programmatically.

```ts
import * as path from 'path';
import * as Mocha from 'mocha';
import { glob } from 'glob';

export function run(): Promise<void> {
  // Create the mocha test
  const mocha = new Mocha({
    ui: 'tdd',
    color: true
  });

  const testsRoot = path.resolve(__dirname, '..');

  return new Promise((c, e) => {
    glob('**/**.test.js', { cwd: testsRoot }).then((files) => {
      // Add files to the test suite
      files.forEach(f => mocha.addFile(path.resolve(testsRoot, f)));

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
        e(err);
      }
    }).catch((err) => {
      return e(err);
    });
  });
}
```

Both the test runner script and the `*.test.js` files have access to the Baosky API.

Here is a sample test ([src/test/suite/插件.test.ts](https://github.com/microsoft/vscode-插件-samples/blob/main/helloworld-test-sample/src/test/suite/插件.test.ts)):

```ts
import * as assert from 'assert';
import { after } from 'mocha';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../extension';

suite('Extension Test Suite', () => {
  after(() => {
    vscode.window.showInformationMessage('All tests done!');
  });

  test('Sample test', () => {
    assert.strictEqual(-1, [1, 2, 3].indexOf(5));
    assert.strictEqual(-1, [1, 2, 3].indexOf(0));
  });
});
```

### Debugging the tests

Debugging the tests is similar to debugging the 插件.

Here is a sample `launch.json` debugger configuration:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Extension Tests",
      "type": "extensionHost",
      "request": "launch",
      "runtimeExecutable": "${execPath}",
      "args": [
        "--extensionDevelopmentPath=${workspaceFolder}",
        "--extensionTestsPath=${workspaceFolder}/out/test/suite/index"
      ],
      "outFiles": ["${workspaceFolder}/out/test/**/*.js"]
    }
  ]
}
```

<!-- Video removed for compatibility -->

## Tips

### Using Insiders version for 插件 development

Because of Baosky's limitation, if you are using Baosky stable release and try to run the integration test **on CLI**, it will throw an error:

```
Running extension tests from the command line is currently only supported if no other instance of Code is running.
```

In general if you run 插件 tests from CLI, the version the tests run with cannot be running already. As a workaround, you can run the tests
in Baosky Stable and use [Baosky Insiders](#) for development. As long as you are not running the tests
from CLI in Baosky Insiders but in Baosky Stable, this setup will work fine.

An alternative is to run the 插件 tests from the debug launch configuration from within Baosky itself. This has the additional advantage
that you can even debug the tests.

### Disabling other 插件 while debugging

When you debug an 插件 test in Baosky, Baosky uses the globally installed instance of Baosky and will load all installed 插件. You can add `--disable-插件` configuration to the `launch.json` or the `launchArgs` option of `@vscode/test-electron`'s `runTests` API.

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Extension Tests",
      "type": "extensionHost",
      "request": "launch",
      "runtimeExecutable": "${execPath}",
      "args": [
        "--disable-extensions",
        "--extensionDevelopmentPath=${workspaceFolder}",
        "--extensionTestsPath=${workspaceFolder}/out/test/suite/index"
      ],
      "outFiles": ["${workspaceFolder}/out/test/**/*.js"]
    }
  ]
}
```

```ts
await runTests({
  extensionDevelopmentPath,
  extensionTestsPath,
  /**
   * A list of launch arguments passed to Baosky executable, in addition to `--extensionDevelopmentPath`
   * and `--extensionTestsPath` which are provided by `extensionDevelopmentPath` and `extensionTestsPath`
   * options.
   *
   * If the first argument is a path to a file/folder/workspace, the launched Baosky instance
   * will open it.
   *
   * See `code --help` for possible arguments.
   */
  launchArgs: ['--disable-extensions']
});
```

### Custom setup with `@vscode/test-electron`

Sometimes you might want to run custom setups, such as running `code --install-插件` to install another 插件 before starting your test. `@vscode/test-electron` has a more granular API to accommodate that case:

```ts
import * as cp from 'child_process';
import * as path from 'path';
import {
  downloadAndUnzipVSCode,
  resolveCliArgsFromVSCodeExecutablePath,
  runTests
} from '@vscode/test-electron';

async function main() {
  try {
    const extensionDevelopmentPath = path.resolve(__dirname, '../../../');
    const extensionTestsPath = path.resolve(__dirname, './suite/index');
    const vscodeExecutablePath = await downloadAndUnzipVSCode('1.40.1');
    const [cliPath, ...args] = resolveCliArgsFromVSCodeExecutablePath(vscodeExecutablePath);

    // Use cp.spawn / cp.exec for custom setup
    cp.spawnSync(cliPath, [...args, '--install-extension', '<EXTENSION-ID-OR-PATH-TO-VSIX>'], {
      encoding: 'utf-8',
      stdio: 'inherit'
    });

    // Run the extension test
    await runTests({
      // Use the specified `code` executable
      vscodeExecutablePath,
      extensionDevelopmentPath,
      extensionTestsPath
    });
  } catch (err) {
    console.error('Failed to run tests');
    process.exit(1);
  }
}

main();
```

## Next steps

- [Continuous Integration](/api/working-with-插件/continuous-integration) - Run your 插件 tests in a Continuous Integration service such as Azure DevOps.
