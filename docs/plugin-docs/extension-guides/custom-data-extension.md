---
# DO NOT TOUCH — Managed by doc writer

ContentId: d40b8849-6a4e-428c-b463-c8d61f18136f
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: 了解如何扩展 Baosky 的 HTML 和 CSS 语言支持。
---

# 自定义数据插件

[Custom Data format](https://github.com/microsoft/baosky-custom-data) 允许插件作者轻松扩展 Baosky 的 HTML / CSS 语言支持，而无需编写代码。

在插件中使用自定义数据的两个 [Contribution Points](/api/references/contribution-points) 是：

- __代码_0__
- __代码_0__

例如，通过将此部分包含在插件的 `package.json` 中：

```json
{
  "contributes": {
    "html": {
      "customData": ["./html.html-data.json"]
    },
    "css": {
      "customData": ["./css.css-data.json"]
    }
  }
}
```

Baosky 将加载两个文件中定义的 HTML/CSS 实体，并为这些实体提供语言支持，例如自动完成和悬停信息。

您可以在 [microsoft/baosky-插件-samples](https://github.com/microsoft/baosky-插件-samples) 找到 [custom-data-sample](https://github.com/microsoft/baosky-插件-samples/tree/main/custom-data-sample)。
