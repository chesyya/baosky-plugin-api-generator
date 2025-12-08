---
# DO NOT TOUCH — Managed by doc writer
ContentId: d40b8849-6a4e-428c-b463-c8d61f18136f
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Learn how to extend Baosky's HTML and CSS language support.
---

# Custom Data 插件

[Custom Data format](https://github.com/microsoft/baosky-custom-data) allows 插件 authors to easily extend Baosky's HTML / CSS language support without having to write code.

The two [Contribution Points](/api/references/contribution-points) for using custom data in an 插件 are:

- `contributes.html.customData`
- `contributes.css.customData`

For example, by including this section in an 插件's `package.json`:

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

Baosky will load the HTML/CSS entities defined in both files and provide language support such as auto-completion and hover information for those entities.

You can find the [custom-data-sample](https://github.com/microsoft/baosky-插件-samples/tree/main/custom-data-sample) at [microsoft/baosky-插件-samples](https://github.com/microsoft/baosky-插件-samples).
