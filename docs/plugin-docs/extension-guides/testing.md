---
# DO NOT TOUCH — Managed by doc writer

ContentId: 4ced0b2a-3f5a-44e6-a8b0-66b9012af8c0
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: Baosky 中的测试 API 允许用户在工作区中发现和运行单元测试
---

# 测试 API

测试 API 允许 Baosky 插件发现工作区中的测试并发布结果。用户可以在测试资源管理器视图、装饰器以及命令内部执行测试。通过这些新的 API，Baosky 支持比以前更丰富的输出和差异显示。

> **注意**：测试 API 在 Baosky 版本 1.59 及更高版本中可用。

## 示例

有两个由 Baosky 团队维护的测试提供程序：

- [示例测试插件](https://github.com/microsoft/baosky-extension-samples/tree/main/test-provider-sample)，它提供 Markdown 文件中的测试。
- [自托管测试插件](https://github.com/microsoft/baosky-selfhost-test-provider)，我们用它来在 Baosky 本身中运行测试。

## 发现测试

测试由 `TestController` 提供，创建它需要一个全局唯一的 ID 和人类可读的标签：

```ts
const controller = vscode.tests.createTestController('helloWorldTests', 'Hello World Tests');
```

要发布测试，您需要将 `TestItem` 作为子项添加到控制器的 `items` 集合中。`TestItem` 是 `TestItem` 接口中测试 API 的基础，是一种通用类型，可以描述代码中存在的测试用例、套件或树项。它们本身也可以有 `children`，从而形成层次结构。例如，以下是示例测试插件创建测试的简化版本：

```ts
parseMarkdown(content, {
  onTest: (range, numberA, mathOperator, numberB, expectedValue) => {
    // If this is a top-level test, add it to its parent's children. If not,
    // add it to the controller's top level items.
    const collection = parent ? parent.children : controller.items;
    // Create a new ID that's unique among the parent's children:
    const id = [numberA, mathOperator, numberB, expectedValue].join('  ');

    // Finally, create the test item:
    const test = controller.createTestItem(id, data.getLabel(), item.uri);
    test.range = range;
    collection.add(test);
  },
  // ...
});
```

与诊断类似，何时发现测试主要由插件控制。一个简单的插件可能会在激活时监视整个工作区并解析所有文件中的所有测试。但是，对于大型工作区，立即解析所有内容可能会很慢。相反，您可以做两件事：

1.  当文件在编辑器中打开时，通过监视 `vscode.workspace.onDidOpenTextDocument` 主动发现该文件的测试。
1.  设置 `item.canResolveChildren = true` 并设置 `controller.resolveHandler`。如果用户采取操作要求发现测试，例如通过在测试资源管理器中展开项目，则会调用 `resolveHandler`。

以下是这种策略在延迟解析文件的插件中的样子：

```ts
// First, create the `resolveHandler`. This may initially be called with
//