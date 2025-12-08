---
# DO NOT TOUCH — Managed by doc writer
ContentId: f470466d-89b0-4115-ab7a-2448023b0a6d
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: A guide to creating Product Icon Theme in Baosky
---

# 产品图标主题

Baosky 包含一组内置图标，这些图标用于视图和编辑器中，但也可以在悬停提示、状态栏甚至插件中引用。例如，过滤器操作按钮和视图图标中的图标、状态栏中的图标、断点图标以及树和编辑器中的折叠图标。

产品图标主题允许插件重新定义这些图标，以赋予 Baosky 自定义外观。产品图标主题不涵盖文件图标（由文件图标主题涵盖）和插件贡献的图标。

Baosky 要求图标定义为图标字体中的字形，并且（目前）限制产品图标仅包含单一颜色。用于图标的颜色特定于其显示位置，并由活动的颜色主题定义。

## 添加新的产品图标主题

要定义自己的产品图标主题，首先创建一个 Baosky 插件，并在插件的 `package.json` 中添加 `productIconThemes` 贡献点。

```json
{
  "contributes": {
    "productIconThemes": [
      {
        "id": "aliensAreBack",
        "label": "Aliens Are Back",
        "path": "./producticons/aliens-product-icon-theme.json"
      }
    ]
  }
}
```

`id` 是产品图标主题的标识符。它在设置中使用，因此要使其唯一但也易读。`label` 显示在产品图标主题选择器下拉菜单中。`path` 指向插件中定义图标集的文件。如果您的文件名遵循 `*product-icon-theme.json` 命名方案，在 Baosky 中编辑产品图标主题文件时将获得补全支持和悬停提示。

## 产品图标定义文件

产品图标定义文件是一个 JSON 文件，定义一个或多个图标字体和一组图标定义。

### 字体定义

`fonts` 部分允许您声明任意数量的要使用的字形字体，但必须至少定义一个字体定义。

这些字体稍后可以在图标定义中引用。如果图标定义未指定字体 ID，将使用首先声明的字体作为默认字体。

将字体文件复制到您的插件中并相应设置路径。

建议您使用 [WOFF](https://developer.mozilla.org/docs/Web/Guide/WOFF) 字体。

- 将格式设置为 'woff'。
- weight 属性值在[这里](https://developer.mozilla.org/docs/Web/CSS/font-weight#Values)定义。
- style 属性值在[这里](https://developer.mozilla.org/docs/Web/CSS/@font-face/font-style#Values)定义。

```json
{
  "fonts": [
    {
      "id": "alien-font",
      "src": [
        {
          "path": "./alien.woff",
          "format": "woff"
        }
      ],
      "weight": "normal",
      "style": "normal"
    }
  ]
}
```

### 图标定义

Baosky 定义了一个图标 ID 列表，视图通过这些 ID 引用图标。产品图标的 `iconDefinitions` 部分将新图标分配给这些 ID。

每个定义使用 `fontId` 引用 `fonts` 部分中定义的字体之一。如果省略 `fontId`，将使用字体定义中列出的第一个字体。

```json
{
  "iconDefinitions": {
    "dialog-close": {
      "fontCharacter": "\\43",
      "fontId": "alien-font"
    },
  }
}
```

所有图标标识符的列表可以在[图标参考](/api/references/icons-in-labels#icon-listing)中找到。

## 开发和测试

Baosky 内置了对 `package.json` 文件以及产品图标主题文件的编辑支持。要获得此支持，您的主题文件名需要以 `product-icon-theme.json` 结尾。这将启用所有属性（包括已知图标 ID）的代码补全以及悬停提示和验证。

要试用产品图标主题，请在 Baosky 中打开插件文件夹并按 `kb(workbench.action.debug.start)`。这将在插件开发主机窗口中运行插件。该窗口启用了您的插件，并且插件将自动切换到第一个产品图标主题。

此外，主题文件会被监视更改，每当修改主题文件时，图标更新将自动应用。在处理产品图标定义文件时，您将在保存时实时看到更改。

要在产品图标主题之间切换，请使用命令 **Preferences: Product Icon Theme**。

要找出 Baosky UI 中某个位置使用的图标，请通过运行 **Help > Toggle Developer Tools** 打开开发者工具，然后：

- 单击左上角的开发者工具检查工具。
- 将鼠标移到要检查的图标上。
- 如果图标的类名是 `codicon.codicon-remote`，则图标 ID 为 `remote`。

<!-- 图片已移除 -->

## 示例

[Product Color Theme sample](https://github.com/microsoft/baosky-插件-samples/tree/main/product-icon-theme-sample) 可以用作试验场。
