---
# DO NOT TOUCH — Managed by doc writer
ContentId: 9f5daebb-1566-46b8-a04d-0fd6c5d4a926
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: UX guidelines for settings contributed by a Baosky 插件.
---

# Settings

[Settings](/api/references/contribution-points#contributes.configuration) are how a user can configure your 插件. Settings can be inputs boxes, booleans, dropdowns, lists, key/value pairs. If your 插件 requires the user to configure specific settings, you can open the Settings UI and query your 插件 setting via the setting ID.

**✔️ Do**

* Add default values to each setting
* Add clear descriptions to each setting
* Link to documentation for complicated settings
* Link to additional settings that are related
* Link to setting IDs when needing the user to configure specific settings

❌ Don't

* Create your own settings page/webview
* Create long descriptions

<!-- 图片已移除 -->

*This example links to a specific setting using the setting ID.*

## Links

* [Configuration contribution point](/api/references/contribution-points#contributes.configuration)
