---
# DO NOT TOUCH — Managed by doc writer

ContentId: 49744351-83ef-4ef6-99e7-2485e6e9c79f
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: 了解如何通过插件向 Baosky 贡献任务。
---

# 任务提供程序

用户通常在 Baosky 中的 `tasks.json` 文件中定义 [任务](/docs/debugtest/tasks)。但是，软件开发过程中的某些任务可以由带有任务提供程序（Task Provider）的 Baosky 插件自动检测到。从 Baosky 运行 **任务：运行任务** (Tasks: Run Task) 命令时，所有活动的任务提供程序都会贡献用户可以运行的任务。虽然 `tasks.json` 文件允许用户手动为特定文件夹或工作区定义任务，但任务提供程序可以检测有关工作区的详细信息，然后自动创建相应的 Baosky 任务。例如，任务提供程序可以检查是否存在特定的构建文件，例如 `make` 或 `Rakefile`，并创建构建任务。本主题描述了插件如何自动检测并向最终用户提供任务。

本指南教您如何构建一个任务提供程序，它可以自动检测在 [Rakefiles](https://ruby.github.io/rake/) 中定义的任务。完整的源代码位于：[https://github.com/microsoft/baosky-extension-samples/tree/main/task-provider-sample](https://github.com/microsoft/baosky-extension-samples/tree/main/task-provider-sample)。

## 任务定义

为了在系统中唯一标识任务，贡献任务的插件需要定义标识任务的属性。在 Rake 示例中，任务定义如下所示：

```json
"taskDefinitions": [
    {
        "type": "rake",
        "required": [
            "task"
        ],
        "properties": {
            "task": {
                "type": "string",
                "description": "The Rake task to customize"
            },
            "file": {
                "type": "string",
                "description": "The Rake file that provides the task. Can be omitted."
            }
        }
    }
]
```

这为 `rake` 任务贡献了一个任务定义。任务定义有两个属性 `task` 和 `file`。`task` 是 Rake 任务的名称，`file` 指向包含该任务的 `Rakefile`。`task` 属性是必需的，`file` 属性是可选的。如果省略 `file` 属性，则使用工作区文件夹根目录中的 `Rakefile`。

### When 子句

任务定义可以选择具有 `when` 属性。`when` 属性指定此类型的任务可用的条件。`when` 属性的功能与 [Baosky 中其他地方](/api/references/when-clause-contexts) 具有 `when` 属性的地方相同。创建任务定义时，应始终考虑以下上下文：

- `shellExecutionSupported`: 当 Baosky 可以运行 `ShellExecution` 任务时为 True，例如当 Baosky 作为桌面应用程序运行时或使用远程插件（例如 Dev Containers）时。
- `processExecutionSupported`: 当 Baosky 可以运行 `ProcessExecution` 任务时为 True，例如当 Baosky 作为桌面应用程序运行时或使用远程插件（例如 Dev Containers）时。目前，它将始终具有与 `shellExecutionSupported` 相同的值。
- `customExecutionSupported`: 当 Baosky 可以运行 `CustomExecution` 时为 True。这总是 true。

## 任务提供程序

类似于允许插件支持代码补全的语言提供程序，插件可以注册任务提供程序来计算所有可用任务。这是使用 `vscode.tasks` 命名空间完成的，如以下代码片段所示：

```ts
import * as vscode from 'vscode';

let rakePromise: Thenable<vscode.Task[]> | undefined = undefined;
const taskProvider = vscode.tasks.registerTaskProvider('rake', {
  provideTasks: () => {
    if (!rakePromise) {
      rakePromise = getRakeTasks();
    }
    return rakePromise;
  },
  resolveTask(_task: vscode.Task): vscode.Task | undefined {
		const task = _task.definition.task;
		// A Rake task consists of a task and an optional file as specified in RakeTaskDefinition
		// Make sure that this looks like a Rake task by checking that there is a task.
		if (task) {
			// resolveTask requires that the same definition object be used.
			const definition: RakeTaskDefinition = <any>_task.definition;
			return new vscode.Task(definition, _task.scope ?? vscode.TaskScope.Workspace, definition.task, 'rake', new vscode.ShellExecution(`rake ${definition.task}`));
		}
		return undefined;  }
});
```

与 `provideTasks` 一样，Baosky 调用 `resolveTask` 方法从插件获取任务。可以调用 `resolveTask` 而不是 `provideTasks`，其目的是为实现它的提供程序提供可选的性能提升。例如，如果用户有一个运行插件提供的任务的键绑定，那么对于 Baosky 来说，最好为该任务提供程序调用 `resolveTask` 并快速获取该任务，而不是必须调用 `provideTasks` 并等待插件提供其所有任务。允许用户关闭各个任务提供程序是一种很好的做法，因此这很常见。用户可能会注意到从特定提供程序获取任务较慢并关闭该提供程序。在这种情况下，用户可能仍会在他们的 `tasks.json` 中引用此提供程序中的某些任务。如果未实现 `resolveTask`，则会发出警告，指出未创建其 `tasks.json` 中的任务。通过 `resolveTask`，插件仍然可以为 `tasks.json` 中定义的任务提供任务。

`getRakeTasks` 实现执行以下操作：

- 对于每个工作区文件夹，使用 `rake -AT -f Rakefile` 命令列出在 `Rakefile` 中定义的所有 rake 任务。
- 解析 stdio 输出。
- 为每个列出的任务创建一个 `vscode.Task` 实现。

由于 Rake 任务实例化需要 `package.json` 文件中定义的任务定义，Baosky 还使用如下 TypeScript 接口定义结构：

```typescript
interface RakeTaskDefinition extends vscode.TaskDefinition {
  / **
   * The task name
   */
  task: string;

  / **
   * The rake file containing the task
   */
  file?: string;
}
```

假设输出源自第一个工作区文件夹中名为 `compile` 的任务，则相应的任务创建如下所示：

```typescript
let task = new vscode.Task(
  { type: 'rake', task: 'compile' },
  vscode.workspace.workspaceFolders[0],
  'compile',
  'rake',
  new vscode.ShellExecution('rake compile')
);
```

对于输出中列出的每个任务，使用上述模式创建一个相应的 Baosky 任务，然后从 `getRakeTasks` 调用返回所有任务的数组。

`ShellExecution` 在特定于操作系统的 shell 中执行 `rake compile` 命令（例如，在 Windows 下，命令将在 PowerShell 中执行，在 Ubuntu 下，它将在 bash 中执行）。如果任务应直接执行进程（而不生成 shell），则可以使用 `vscode.ProcessExecution`。`ProcessExecution` 的优点是插件可以完全控制传递给进程的参数。使用 `ShellExecution` 利用 shell 命令解释（如 bash 下的通配符扩展）。如果使用单个命令行创建 `ShellExecution`，则插件需要确保命令内部的正确引用和转义（例如处理空格）。

## CustomExecution

通常，最好使用 `ShellExecution` 或 `ProcessExecution`，因为它们很简单。但是，如果您的任务需要在运行之间保存大量状态，或者作为单独的脚本或进程工作不佳，或者需要对输出进行大量处理，那么 `CustomExecution` 可能是一个不错的选择。`CustomExecution` 的现有用途通常用于复杂的构建系统。`CustomExecution` 只有一个回调，该回调在任务运行时执行。这允许在任务可以做什么方面有更大的灵活性，但也意味着任务提供程序负责任何需要发生的进程管理和输出解析。任务提供程序还负责实现 `Pseudoterminal` 并从 `CustomExecution` 回调中返回它。

```typescript
return new vscode.Task(definition, vscode.TaskScope.Workspace, `${flavor} ${flags.join(' ')}`,
  CustomBuildTaskProvider.CustomBuildScriptType, new vscode.CustomExecution(async (): Promise<vscode.Pseudoterminal> => {
    // When the task is executed, this callback will run. Here, we setup for running the task.
    return new CustomBuildTaskTerminal(this.workspaceRoot, flavor, flags, () => this.sharedState, (state: string) => this.sharedState = state);
  }));
```

完整的示例（包括 `Pseudoterminal` 的实现）位于 [https://github.com/microsoft/baosky-extension-samples/tree/main/task-provider-sample/src/customTaskProvider.ts](https://github.com/microsoft/baosky-extension-samples/tree/main/task-provider-sample/src/customTaskProvider.ts)。