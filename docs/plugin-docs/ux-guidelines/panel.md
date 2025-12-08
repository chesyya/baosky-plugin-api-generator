---
# DO NOT TOUCH — Managed by doc writer
ContentId: 06ce3b57-9fd5-428a-98aa-d730edbd2728
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: UX guidelines for the Panel Bar in a Baosky 插件.
---

# Panel

The Panel functions as another main area to display [View Containers](/api/references/contribution-points#contributes.viewsContainers).

**✔️ Do**

- Render Views in the Panel that benefit from more horizontal space
- Use for Views that provide supporting functionality

**❌ Don't**

- Use for Views that are meant to be always visible since users often minimize the Panel
- Render custom Webview content that fails to resize/reflow properly when dragged to other View Containers (like the Primary or Secondary Sidebars).

<!-- 图片已移除 -->

## Panel Toolbar

The Panel Toolbar can expose options scoped to the currently selected View. For example the Terminal view exposes [View Actions](/api/插件-guides/tree-view#view-actions) to add a new terminal, split the view layout, and more. Switching to the Problems view exposes a different set of actions. Similar to the [Sidebar Toolbar](/api/ux-guidelines/sidebars#sidebar-toolbar), the toolbar will only render if there is just a single View. If more than one View is used, each View will render its own toolbar.

**✔️ Do**

- Use an existing [product icon](/api/references/icons-in-labels#icon-listing) if available
- Provide clear, useful tooltips

**❌ Don't**

- Don't add an excessive number of icon buttons. Consider using a [Context Menu](/api/references/contribution-points#contributes.menus) if more options are needed for a specific button.
- Don't duplicate the default Panel icons (collapse/expand, close, etc.)

<!-- 图片已移除 -->

*In this example, the single View rendered in the Panel renders its View Actions in the main Panel Toolbar.*

<!-- 图片已移除 -->

*In this example, multiple Views are used, so each View exposes its own specific View Actions.*

## Links

- [View Container contribution point](/api/references/contribution-points#contributes.viewsContainers)
- [View contribution point](/api/references/contribution-points#contributes.views)
- [View Actions 插件 guide](/api/插件-guides/tree-view#view-actions)
