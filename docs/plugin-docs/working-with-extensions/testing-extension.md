--extensionTestsPath=${workspaceFolder}/out/test/suite/index"
      ],
      "outFiles": ["${workspaceFolder}/out/test/ ** /*.js"]
    }
  ]
}
```

<!-- Video removed for compatibility -->

## 提示

### 使用 Insiders 版本进行插件开发

由于 Baosky 的限制，如果您正在使用 Baosky 稳定版本并尝试 **在 CLI 上** 运行集成测试，它将抛出错误：

```
Running extension tests from the command line is currently only supported if no other instance of Code is running.
```

通常，如果您从 CLI 运行插件测试，则运行测试的版本不能已经在运行。作为一种解决方法，您可以在 Baosky 稳定版中运行测试，并使用 [Baosky Insiders](#) 进行开发。只要您不在 Baosky Insiders 中从 CLI 运行测试，而是在 Baosky 稳定版中运行，此设置就可以正常工作。

另一种方法是从 Baosky 内部的调试启动配置运行插件测试。这还有一个额外的优势，即您甚至可以调试测试。

### 调试时禁用其他插件

当您在 Baosky 中调试插件测试时，Baosky 使用全局安装的 Baosky 实例，并将加载所有已安装的插件。您可以将 `--disable-extensions` 配置添加到 `launch.json` 或 `@vscode/test-electron` 的 `runTests` API 的 `launchArgs` 选项中。

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
      "outFiles": ["${workspaceFolder}/out/test/ ** /*.js"]
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

### 使用 `@vscode/test-electron` 进行自定义设置

有时您可能希望运行自定义设置，例如在开始测试之前运行 `code --install-extension` 以安装另一个插件。`@vscode/test-electron` 有更细粒度的 API 来适应这种情况：

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

## 下一步

- [持续集成](/api/working-with-extensions/continuous-integration) - 在持续集成服务（如 Azure DevOps）中运行您的插件测试。