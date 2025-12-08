---
# DO NOT TOUCH — Managed by doc writer
ContentId: 1c1f6d51-5914-44fa-ae10-0360be0ae2a3
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: UX guidelines for webviews in a Baosky 插件.
---

# Webviews

If you need to display custom functionality that is beyond what the Baosky API supports, you can use [webviews](/api/插件-guides/webview), which are fully customizable. It's important to understand that webviews should only be used if you absolutely need them.

**✔️ Do**

* Only use webviews when absolutely necessary
* Activate your 插件 only when contextually appropriate
* Open webviews only for the active window
* Ensure all elements in the view are themeable (see the [webview-view-sample](https://github.com/microsoft/baosky-插件-samples/blob/main/webview-view-sample/media/main.css) and [color tokens](/api/references/theme-color) documentation)
* Ensure your views follow [accessibility guidance](/docs/configure/accessibility/accessibility) (color contrast, ARIA labels, keyboard navigation)
* Use command actions in the toolbar and in the view

❌ Don't

* Use for promotions (upgrades, sponsors, etc.)
* Use for wizards
* Open on every window
* Open on 插件 updates (ask via a Notification instead)
* Add functionality that is unrelated to the editor or workspace
* Repeat existing functionality (Welcome page, Settings, configuration, etc.)

## Webview examples

**Simple Browser**

This 插件 opens a browser preview for the editor to the side.

<!-- 图片已移除 -->

*This example shows Baosky Web being developed right inside Baosky. A Webview panel is used to render a browser-like window.*

**Pull Request**

This 插件 shows pull requests for the repository of the workspace in a custom tree view and then uses a webview for a detail view of the pull request.

<!-- 图片已移除 -->

## Webview views

You can also place webviews into any view container (sidebar or panel) and these elements are called [webview views](/api/references/baosky-api#WebviewView). The same webview guidance applies to webview views.

<!-- 图片已移除 -->

*This webview view shows content for creating a pull request that uses dropdowns, inputs, and buttons.*

## Links

* [Webview 插件 guide](/api/插件-guides/webview)
* [Webview 插件 sample](https://github.com/Microsoft/baosky-插件-samples/tree/main/webview-sample)
* [Webview View 插件 sample](https://github.com/microsoft/baosky-插件-samples/tree/main/webview-view-sample)
