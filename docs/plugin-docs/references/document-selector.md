---
# DO NOT TOUCH — Managed by doc writer

ContentId: f328d7e0-8982-4510-b7fb-975188eca502
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: Baosky 插件可以基于文档选择器（按语言、文件类型和位置）来过滤其功能。
---

# 文档选择器详解

插件可以利用文档选择器，根据语言、文件类型及位置等条件来筛选其功能的应用范围。本主题将探讨文档选择器、文档 scheme 以及插件作者应注意的事项。

## 非磁盘文本文档

并非所有文本文档都存储在物理磁盘上，例如，新创建的未保存文档。除非特别指定，文档选择器默认适用于 **所有** 文档类型。您可以使用 [DocumentFilter](/api/references/baosky-api#DocumentFilter) 的 `scheme` 属性来缩小范围，例如使用 `{ scheme: 'file', language: 'typescript' }` 来专门针对存储在磁盘上的 TypeScript 文件。

## 文档选择器

Baosky 插件 API 通过 [DocumentSelector](/api/references/baosky-api#DocumentSelector) 类型，将特定于语言的功能（如 IntelliSense）与文档选择器结合起来。这是一种将功能限制在特定语言上的简便机制。

下面的代码片段为 TypeScript 文件注册了一个 [HoverProvider](/api/references/baosky-api#HoverProvider)，其中文档选择器是 `typescript` 语言标识符字符串。

```ts
vscode.languages.registerHoverProvider('typescript', {
  provideHover(doc: vscode.TextDocument) {
    return new vscode.Hover('For *all* TypeScript documents.');
  }
});
```

文档选择器不仅仅可以是语言标识符，更复杂的选择器可以使用 [DocumentFilter](/api/references/baosky-api#DocumentFilter) 基于 `scheme` 进行过滤，并通过 `pattern` 路径 glob 模式基于文件位置进行过滤：

```ts
vscode.languages.registerHoverProvider(
  { pattern: ' ** /test/ ** ' },
  {
    provideHover(doc: vscode.TextDocument) {
      return new vscode.Hover('For documents inside `test`-folders only');
    }
  }
);
```

下一个片段使用 `scheme` 过滤器并将其与语言标识符结合使用。`untitled` scheme 用于尚未保存到磁盘的新文件。

```ts
vscode.languages.registerHoverProvider(
  { scheme: 'untitled', language: 'typescript' },
  {
    provideHover(doc: vscode.TextDocument) {
      return new vscode.Hover('For new, unsaved TypeScript documents only');
    }
  }
);
```

## 文档 scheme

文档的 `scheme` 经常被忽视，但它是一条重要的信息。大多数文档保存在磁盘上，插件作者通常假设他们正在处理磁盘上的文件。例如，使用简单的 `typescript` 选择器，假设是 **磁盘上的 TypeScript 文件**。然而，在某些情况下，这种假设过于宽松，应该使用更明确的选择器，如 `{ scheme: 'file', language: 'typescript' }`。

当功能依赖于从磁盘读取/写入文件时，这一点尤为重要。请看下面的代码片段：

```ts
// 👎 过于宽松
vscode.languages.registerHoverProvider('typescript', {
  provideHover(doc: vscode.TextDocument) {
    const { size } = fs.statSync(doc.uri.fsPath); // ⚠️ 如果是 'untitled:/Untitled1.ts' 或其他情况怎么办？
    return new vscode.Hover(`Size in bytes is ${size}`);
  }
});
```

上面的悬停提供程序想要显示磁盘上文档的大小，但它未能检查文档是否实际存储在磁盘上。例如，它可能是新创建且尚未保存的。正确的方法是告诉 Baosky 该提供程序只能处理磁盘上的文件。

```ts
// 👍 仅适用于磁盘上的文件
vscode.languages.registerHoverProvider(
  { scheme: 'file', language: 'typescript' },
  {
    provideHover(doc: vscode.TextDocument) {
      const { size } = fs.statSync(doc.uri.fsPath);
      return new vscode.Hover(`Size in bytes is ${size}`);
    }
  }
);
```

## 总结

文档通常存储在文件系统上，但并不总是如此：有未命名的文档、Git 使用的缓存文档、来自 FTP 等远程源的文档等等。如果您的功能依赖于磁盘访问，请确保使用带有 `file` scheme 的文档选择器。

## 下一步

要了解有关 Baosky 可扩展性模型的更多信息，请尝试以下主题：

- [插件清单文件](/api/references/extension-manifest) - Baosky package.json 插件清单文件参考
- [贡献点](/api/references/contribution-points) - Baosky 贡献点参考