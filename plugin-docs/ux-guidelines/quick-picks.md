---
# DO NOT TOUCH — Managed by doc writer
ContentId: 85918f63-ff5d-4ab8-8a18-26ad00618eff
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: UX guidelines for quick picks used in a Baosky 插件.
---

# Quick Picks

[Quick Picks](/api/插件-capabilities/common-capabilities#quick-pick) are an easy way to perform actions and receive input from the user. This is helpful when selecting a configuration option, needing to filter content, or picking from a list of items.

<!-- 图片已移除 -->

**✔️ Do**

* Use icons for clear metaphors
* Use thoughtful icons that add clarity and help differentiate items
* Use the description for displaying the current items (if applicable)
* Use the detail for providing (brief) additional context
* Use the multi-step pattern for a series of basic inputs
* Provide an option to create a new item when picking from a list (if applicable)
* Use a title for multi-step quick picks
* Use a title for quick picks without a text input
* Use a title for quick picks asking for text input (use the placeholder to show a hint or example)
* Use a title for quick picks featuring global buttons (e.g. a refresh icon)

❌ Don't

* Repeat existing functionality
* Use a title when the placeholder can describe the purpose on its own
* Use inputs without a placeholder

## Multiple steps

Quick Picks can be configured to feature multiple steps. Use these when you need to capture related-but-separate selections in a single flow. Avoid using quick picks for long flows with many steps—they aren't well suited to function as a wizard or similarly complex experience.

<!-- 图片已移除 -->

*Note the "1/3" text in the Quick Pick title that indicates the current and total number of steps in the flow.*

## Multiple selections

Use a multi-select quick pick for closely-related selections that need to be selected in one step.

<!-- 图片已移除 -->

## Title

Quick Picks can also be configured to show a title bar above the main input and selection UI. Use a title when the user needs more context for the selection being made. Avoid using a title that uses a label already used in the Quick Pick's input placeholder.

<!-- 图片已移除 -->

## Using separators

Quick Pick items can be grouped into clear sections using Quick Pick separators. These feature a divider and label to clearly show the section. Use separators if the 插件 features a quick pick containing multiple obvious groups of selections.

<!-- 图片已移除 -->

## Links

* [Quick Pick API reference](/api/references/vscode-api#QuickPick)
* [Quick Pick Item API reference](/api/references/vscode-api#QuickPickItem)
* [Quick Pick 插件 sample](https://github.com/microsoft/vscode-插件-samples/tree/main/quickinput-sample)
