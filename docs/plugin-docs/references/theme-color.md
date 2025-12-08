---
# DO NOT TOUCH — Managed by doc writer

ContentId: 8e03996d-35e9-4e9f-a60e-50d0962231b8
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: 引用列表，列出了 Baosky 中所有可主题化的颜色。
---

# 主题颜色指南

您可以通过修改用户设置中的 `workbench.colorCustomizations` 字段，来个性化定制当前激活的 Baosky [颜色主题](/docs/getstarted/themes)。

```json
{
  "workbench.colorCustomizations": {
    "activityBar.background": "#00AA00"
  }
}
```

**注意**：如果您希望使用现成的颜色主题，请参阅 [颜色主题](/docs/getstarted/themes) 章节，了解如何通过 **首选项：颜色主题** 下拉菜单 (`kb(workbench.action.selectTheme)`) 来设置活动颜色主题。

在 [webviews](/api/extension-guides/webview) 中，主题颜色可以作为 CSS 变量使用，此外，还有一个 [插件](#) 可以为这些变量提供智能感知功能。

## 颜色格式

颜色值使用带有 alpha 通道（用于透明度）的 RGB 颜色模型定义。支持以下十六进制格式：`#RGB`、`#RGBA`、`#RRGGBB` 和 `#RRGGBBAA`。其中 R（红）、G（绿）、B（蓝）和 A（alpha）是十六进制字符（0-9，a-f 或 A-F）。三位表示法 (`#RGB`) 是六位形式 (`#RRGGBB`) 的简写，四位 RGB 表示法 (`#RGBA`) 是八位形式 (`#RRGGBBAA`) 的简写。例如 `#e35f` 与 `#ee3355ff` 代表相同的颜色。

如果未定义 alpha 值，则默认为 `ff`（不透明，无透明度）。如果 alpha 设置为 `00`，则颜色完全透明。

某些颜色不应是不透明的，以免遮挡其他注释。请查看颜色描述，了解这适用于哪些颜色。

## 对比色

对比色通常仅针对高对比度主题进行设置。如果设置了这些颜色，它们会在 UI 项目周围添加额外的边框以增加对比度。

- `contrastActiveBorder`: 活动元素周围的额外边框，以便与其他元素区分开来，提高对比度。
- `contrastBorder`: 元素周围的额外边框，以便与其他元素区分开来，提高对比度。

## 基础颜色

- `focusBorder`: 聚焦元素的整体边框颜色。仅当组件未覆盖此颜色时使用。
- `foreground`: 整体前景色。仅当组件未覆盖此颜色时使用。
- `disabledForeground`: 禁用元素的整体前景色。仅当组件未覆盖此颜色时使用。
- `widget.border`: 编辑器内小部件（如查找/替换）的边框颜色。
- `widget.shadow`: 编辑器内小部件（如查找/替换）的阴影颜色。
- `selection.background`: 工作台中文本选择的背景颜色（用于输入字段或文本区域，不适用于编辑器和终端内的选择）。
- `descriptionForeground`: 提供附加信息的描述文本的前景色，例如标签。
- `errorForeground`: 错误消息的整体前景色（仅当组件未覆盖此颜色时使用）。
- `icon.foreground`: 工作台中图标的默认颜色。
- `sash.hoverBorder`: 可拖动分隔条的悬停边框颜色。

## 窗口边框

Baosky 窗口边框的主题颜色。

- `window.activeBorder`: 活动（聚焦）窗口的边框颜色。
- `window.inactiveBorder`: 非活动（未聚焦）窗口的边框颜色。

窗口边框颜色仅在 macOS 和 Linux（非 Windows）上受支持，并且仅当启用自定义标题栏 (`"window.titleBarStyle": "custom"`) 时才受支持。

## 文本颜色

文本文档内的颜色，例如欢迎页面。

- `textBlockQuote.background`: 文本中块引用的背景颜色。
- `textBlockQuote.border`: 文本中块引用的边框颜色。
- `textCodeBlock.background`: 文本中代码块的背景颜色。
- `textLink.activeForeground`: 点击或鼠标悬停时文本中链接的前景色。
- `textLink.foreground`: 文本中链接的前景色。
- `textPreformat.foreground`: 预格式化文本段的前景色。
- `textPreformat.background`: 预格式化文本段的背景色。
- `textSeparator.foreground`: 文本分隔符的颜色。

## 操作颜色

一组用于控制工作台中操作交互的颜色。

- `toolbar.hoverBackground`: 使用鼠标悬停在操作上时的工具栏背景
- `toolbar.hoverOutline`: 使用鼠标悬停在操作上时的工具栏轮廓
- `toolbar.activeBackground`: 鼠标按住操作时的工具栏背景
- `editorActionList.background`: 操作列表背景颜色。
- `editorActionList.foreground`: 操作列表前景色。
- `editorActionList.focusForeground`: 聚焦项的操作列表前景色。
- `editorActionList.focusBackground`: 聚焦项的操作列表背景颜色。

## 按钮控件

一组用于按钮小部件的颜色，例如新窗口资源管理器中的 **打开文件夹** 按钮。

<!-- 图片已移除 -->

- `button.background`: 按钮背景颜色。
- `button.foreground`: 按钮前景色。
- `button.border`: 按钮边框颜色。
- `button.separator`: 按钮分隔符颜色。
- `button.hoverBackground`: 悬停时的按钮背景颜色。
- `button.secondaryForeground`: 辅助按钮前景色。
- `button.secondaryBackground`: 辅助按钮背景颜色。
- `button.secondaryHoverBackground`: 悬停时的辅助按钮背景颜色。
- `checkbox.background`: 复选框小部件的背景颜色。
- `checkbox.foreground`: 复选框小部件的前景色。
- `checkbox.disabled.background`: 禁用复选框的背景。
- `checkbox.disabled.foreground`: 禁用复选框的前景。
- `checkbox.border`: 复选框小部件的边框颜色。
- `checkbox.selectBackground`: 当选中复选框所在元素时，复选框小部件的背景颜色。
- `checkbox.selectBorder`: 当选中复选框所在元素时，复选框小部件的边框颜色。
- `radio.activeForeground`: 活动单选选项的前景色。
- `radio.activeBackground`: 活动单选选项的背景颜色。
- `radio.activeBorder`: 活动单选选项的边框颜色。
- `radio.inactiveForeground`: 非活动单选选项的前景色。
- `radio.inactiveBackground`: 非活动单选选项的背景颜色。
- `radio.inactiveBorder`: 非活动单选选项的边框颜色。
- `radio.inactiveHoverBackground`: 悬停时非活动单选选项的背景颜色。

## 下拉控件

一组用于所有下拉小部件（例如在集成终端或输出面板中）的颜色。请注意，macOS 目前不使用下拉控件。

<!-- 图片已移除 -->

- `dropdown.background`: 下拉背景。
- `dropdown.listBackground`: 下拉列表背景。
- `dropdown.border`: 下拉边框。
- `dropdown.foreground`: 下拉前景。

## 输入控件

用于输入控件（例如搜索视图或查找/替换对话框中）的颜色。

<!-- 图片已移除 -->

- `input.background`: 输入框背景。
- `input.border`: 输入框边框。
- `input.foreground`: 输入框前景。
- `input.placeholderForeground`: 占位符文本的输入框前景色。
- `inputOption.activeBackground`: 输入字段中激活选项的背景颜色。
- `inputOption.activeBorder`: 输入字段中激活选项的边框颜色。
- `inputOption.activeForeground`: 输入字段中激活选项的前景色。
- `inputOption.hoverBackground`: 输入字段中激活选项的背景颜色。
- `inputValidation.errorBackground`: 错误严重性的输入验证背景颜色。
- `inputValidation.errorForeground`: 错误严重性的输入验证前景色。
- `inputValidation.errorBorder`: 错误严重性的输入验证边框颜色。
- `inputValidation.infoBackground`: 信息严重性的输入验证背景颜色。
- `inputValidation.infoForeground`: 信息严重性的输入验证前景色。
- `inputValidation.infoBorder`: 信息严重性的输入验证边框颜色。
- `inputValidation.warningBackground`: 警告信息的输入验证背景颜色。
- `inputValidation.warningForeground`: 警告严重性的输入验证前景色。
- `inputValidation.warningBorder`: 警告严重性的输入验证边框颜色。

## 滚动条控件

- `scrollbar.background`: 滚动条滑道背景颜色。
- `scrollbar.shadow`: 滚动条滑块阴影，用于指示视图已滚动。
- `scrollbarSlider.activeBackground`: 点击时的滚动条滑块背景颜色。
- `scrollbarSlider.background`: 滚动条滑块背景颜色。
- `scrollbarSlider.hoverBackground`: 悬停时的滚动条滑块背景颜色。

## 徽章 (Badge)

徽章是小型信息标签，例如搜索结果计数。

- `badge.foreground`: 徽章前景色。
- `badge.background`: 徽章背景颜色。

## 进度条

- `progressBar.background`: 用于长时间运行操作显示的进度条的背景颜色。

## 列表和树

用于列表和树（如文件资源管理器）的颜色。活动列表/树具有键盘焦点，非活动则没有。

- `list.activeSelectionBackground`: 当列表/树处于活动状态时，所选项的列表/树背景颜色。
- `list.activeSelectionForeground`: 当列表/树处于活动状态时，所选项的列表/树前景色。
- `list.activeSelectionIconForeground`: 当列表/树处于活动状态时，所选项的列表/树图标前景色。活动列表/树具有键盘焦点，非活动则没有。
- `list.dropBackground`: 使用鼠标移动项目时的列表/树拖放背景。
- `list.focusBackground`: 当列表/树处于活动状态时，聚焦项的列表/树背景颜色。
- `list.focusForeground`: 当列表/树处于活动状态时，聚焦项的列表/树前景色。活动列表/树具有键盘焦点，非活动则没有。
- `list.focusHighlightForeground`: 在列表/树内搜索时，主动聚焦项上匹配高亮显示的列表/树前景色。
- `list.focusOutline`: 当列表/树处于活动状态时，聚焦项的列表/树轮廓颜色。活动列表/树具有键盘焦点，非活动则没有。
- `list.focusAndSelectionOutline`: 当列表/树处于活动状态并被选中时，聚焦项的列表/树轮廓颜色。活动列表/树具有键盘焦点，非活动则没有。
- `list.highlightForeground`: 在列表/树内搜索时，匹配高亮显示的列表/树前景色。
- `list.hoverBackground`: 使用鼠标悬停在项目上时的列表/树背景。
- `list.hoverForeground`: 使用鼠标悬停在项目上时的列表/树前景。
- `list.inactiveSelectionBackground`: 当列表/树处于非活动状态时，所选项的列表/树背景颜色。
- `list.inactiveSelectionForeground`: 当列表/树处于非活动状态时，所选项的列表/树前景色。活动列表/树具有键盘焦点，非活动则没有。
- `list.inactiveSelectionIconForeground`: 当列表/树处于非活动状态时，所选项的列表/树图标前景色。活动列表/树具有键盘焦点，非活动则没有。
- `list.inactiveFocusBackground`: 当列表处于非活动状态时，聚焦项的列表背景颜色。活动列表具有键盘焦点，非活动则没有。目前仅在列表中受支持。
- `list.inactiveFocusOutline`: 当列表/树处于非活动状态时，聚焦项的列表/树轮廓颜色。活动列表/树具有键盘焦点，非活动则没有。
- `list.invalidItemForeground`: 无效项的列表/树前景色，例如资源管理器中未解析的根目录。
- `list.errorForeground`: 包含错误的列表项的前景色。
- `list.warningForeground`: 包含警告的列表项的前景色。
- `listFilterWidget.background`: 在列表/树内搜索时，键入文本的列表/树过滤器背景颜色。
- `listFilterWidget.outline`: 在列表/树内搜索时，键入文本的列表/树过滤器小部件轮廓颜色。
- `listFilterWidget.noMatchesOutline`: 在列表/树内搜索时，未找到匹配项时键入文本的列表/树过滤器小部件轮廓颜色。
- `listFilterWidget.shadow`: 列表和树中类型过滤器小部件的阴影颜色。
- `list.filterMatchBackground`: 列表和树中过滤匹配项的背景颜色。
- `list.filterMatchBorder`: 列表和树中过滤匹配项的边框颜色。
- `list.deemphasizedForeground`: 被淡化项的列表/树前景色。
- `list.dropBetweenBackground`: 使用鼠标在项目之间移动项目时的列表/树拖放边框颜色。
- `tree.indentGuidesStroke`: 缩进参考线的树小部件描边颜色。
- `tree.inactiveIndentGuidesStroke`: 非活动缩进参考线的树描边颜色。
- `tree.tableColumnsBorder`: 表格列的树描边颜色。
- `tree.tableOddRowsBackground`: 奇数表格行的背景颜色。

## 活动栏

活动栏通常显示在工作台的最左侧或最右侧，允许在侧边栏视图之间快速切换。

- `activityBar.background`: 活动栏背景颜色。
- `activityBar.dropBorder`: 活动栏项目的拖放反馈颜色。活动栏显示在最左侧或最右侧，允许在侧边栏视图之间切换。
- `activityBar.foreground`: 活动栏前景色（例如用于图标）。
- `activityBar.inactiveForeground`: 活动栏项目处于非活动状态时的前景色。
- `activityBar.border`: 活动栏与侧边栏的边框颜色。
- `activityBarBadge.background`: 活动通知徽章背景颜色。
- `activityBarBadge.foreground`: 活动通知徽章前景色。
- `activityBar.activeBorder`: 活动栏活动指示器边框颜色。
- `activityBar.activeBackground`: 活动栏活动元素的可选背景颜色。
- `activityBar.activeFocusBorder`: 活动项目的活动栏焦点边框颜色。
- `activityBarTop.foreground`: 当活动栏位于顶部时，活动栏中项目的活动前景色。活动栏允许在侧边栏视图之间切换。
- `activityBarTop.activeBorder`: 当活动栏位于顶部时，活动栏中活动项目的焦点边框颜色。活动栏允许在侧边栏视图之间切换。
- `activityBarTop.inactiveForeground`: 当活动栏位于顶部时，活动栏中项目的非活动前景色。活动栏允许在侧边栏视图之间切换。
- `activityBarTop.dropBorder`: 当活动栏位于顶部时，活动栏中项目的拖放反馈颜色。活动栏允许在侧边栏视图之间切换。
- `activityBarTop.background`: 当设置为顶部/底部时，活动栏的背景颜色。
- `activityBarTop.activeBackground`: 当位于顶部/底部时，活动栏中活动项目的背景颜色。活动栏允许在侧边栏视图之间切换。
- `activityWarningBadge.foreground`: 警告活动徽章的前景色
- `activityWarningBadge.background`: 警告活动徽章的背景颜色
- `activityErrorBadge.foreground`: 错误活动徽章的前景色
- `activityErrorBadge.background`: 错误活动徽章的背景颜色

## 配置文件

- `profileBadge.background`: 配置文件徽章背景颜色。配置文件徽章显示在活动栏中的设置齿轮图标顶部。
- `profileBadge.foreground`: 配置文件徽章前景色。配置文件徽章显示在活动栏中的设置齿轮图标顶部。
- `profiles.sashBorder`: 配置文件编辑器拆分视图分隔条边框的颜色。

## 侧边栏

侧边栏包含诸如资源管理器和搜索之类的视图。

- `sideBar.background`: 侧边栏背景颜色。
- `sideBar.foreground`: 侧边栏前景色。侧边栏是资源管理器和搜索等视图的容器。
- `sideBar.border`: 分隔编辑器的侧边栏边框颜色。
- `sideBar.dropBackground`: 侧边栏部分的拖放反馈颜色。颜色应具有透明度，以便侧边栏部分仍然可以透出。

- `sideBarTitle.foreground`: 侧边栏标题前景色。
- `sideBarSectionHeader.background`: 侧边栏部分标题背景颜色。
- `sideBarSectionHeader.foreground`: 侧边栏部分标题前景色。
- `sideBarSectionHeader.border`: 侧边栏部分标题边框颜色。
- `sideBarActivityBarTop.border`: 顶部/底部活动栏与视图之间的边框颜色。
- `sideBarTitle.background`: 侧边栏标题背景颜色。侧边栏是资源管理器和搜索等视图的容器。
- `sideBarTitle.border`: 侧边栏底部的标题边框颜色，将标题与视图分隔开。侧边栏是资源管理器和搜索等视图的容器。
- `sideBarStickyScroll.background`: 侧边栏中粘性滚动的背景颜色。
- `sideBarStickyScroll.border`: 侧边栏中粘性滚动的边框颜色。
- `sideBarStickyScroll.shadow`: 侧边栏中粘性滚动的阴影颜色。

## 缩略图 (Minimap)

缩略图显示当前文件的缩小版本。

- `minimap.findMatchHighlight`: 文件内搜索匹配项的高亮颜色。
- `minimap.selectionHighlight`: 编辑器选择的高亮颜色。
- `minimap.errorHighlight`: 编辑器内错误的高亮颜色。
- `minimap.warningHighlight`: 编辑器内警告的高亮颜色。
- `minimap.background`: 缩略图背景颜色。
- `minimap.selectionOccurrenceHighlight`: 重复编辑器选择的缩略图标记颜色。
- `minimap.foregroundOpacity`: 缩略图中渲染的前景元素的不透明度。例如，"#000000c0" 将以 75% 的不透明度渲染元素。
- `minimap.infoHighlight`: 信息的缩略图标记颜色。
- `minimap.chatEditHighlight`: 缩略图中待处理编辑区域的颜色。

- `minimapSlider.background`: 缩略图滑块背景颜色。
- `minimapSlider.hoverBackground`: 悬停时的缩略图滑块背景颜色。
- `minimapSlider.activeBackground`: 点击时的缩略图滑块背景颜色。

- `minimapGutter.addedBackground`: 已添加内容的缩略图装订线颜色。
- `minimapGutter.modifiedBackground`: 已修改内容的缩略图装订线颜色。
- `minimapGutter.deletedBackground`: 已删除内容的缩略图装订线颜色。
- `editorMinimap.inlineChatInserted`: 内联聊天插入内容的缩略图标记颜色。

## 编辑器组和选项卡

编辑器组是编辑器的容器。可以有多个编辑器组。选项卡是编辑器的容器。一个编辑器组中可以打开多个选项卡。

- `editorGroup.border`: 用于分隔多个编辑器组的颜色。

  <!-- 图片已移除 -->

- `editorGroup.dropBackground`: 拖动编辑器时的背景颜色。

  <!-- 图片已移除 -->

- `editorGroupHeader.noTabsBackground`: 使用单个选项卡时编辑器组标题头的背景颜色（设置 `"workbench.editor.showTabs": "single"`）。

  <!-- 图片已移除 -->

- `editorGroupHeader.tabsBackground`: 选项卡容器的背景颜色。

  <!-- 图片已移除 -->

- `editorGroupHeader.tabsBorder`: 启用选项卡时，编辑器选项卡控件下方的边框颜色。

  <!-- 图片已移除 -->

- `editorGroupHeader.border`: 编辑器组标题与编辑器之间的边框颜色（如果启用了面包屑，则在面包屑下方）。
- `editorGroup.emptyBackground`: 空编辑器组的背景颜色。
- `editorGroup.focusedEmptyBorder`: 聚焦的空编辑器组的边框颜色。
- `editorGroup.dropIntoPromptForeground`: 拖动文件时显示在编辑器上方的文本的前景色。此文本通知用户可以按住 shift 键放入编辑器。
- `editorGroup.dropIntoPromptBackground`: 拖动文件时显示在编辑器上方的文本的背景颜色。此文本通知用户可以按住 shift 键放入编辑器。
- `editorGroup.dropIntoPromptBorder`: 拖动文件时显示在编辑器上方的文本的边框颜色。此文本通知用户可以按住 shift 键放入编辑器。

- `tab.activeBackground`: 活动组中活动选项卡的背景颜色。
- `tab.unfocusedActiveBackground`: 非活动编辑器组中活动选项卡的背景颜色。
- `tab.activeForeground`: 活动组中活动选项卡的前景色。
- `tab.border`: 用于分隔选项卡的边框。
- `tab.activeBorder`: 活动选项卡的底部边框。
- `tab.selectedBorderTop`: 选中选项卡顶部的边框。选项卡是编辑器区域中编辑器的容器。一个编辑器组中可以打开多个选项卡。可以有多个编辑器组。
- `tab.selectedBackground`: 选中选项卡的背景。选项卡是编辑器区域中编辑器的容器。一个编辑器组中可以打开多个选项卡。可以有多个编辑器组。
- `tab.selectedForeground`: 选中选项卡的前景。选项卡是编辑器区域中编辑器的容器。一个编辑器组中可以打开多个选项卡。可以有多个编辑器组。
- `tab.dragAndDropBorder`: 选项卡之间的边框，用于指示可以在两个选项卡之间插入选项卡。选项卡是编辑器区域中编辑器的容器。一个编辑器组中可以打开多个选项卡。可以有多个编辑器组。
- `tab.unfocusedActiveBorder`: 非活动编辑器组中活动选项卡的底部边框。
- `tab.activeBorderTop`: 活动选项卡的顶部边框。
- `tab.unfocusedActiveBorderTop`: 非活动编辑器组中活动选项卡的顶部边框。
- `tab.lastPinnedBorder`: 最后一个固定编辑器右侧的边框，用于与未固定编辑器分隔。
- `tab.inactiveBackground`: 非活动选项卡背景颜色。
- `tab.unfocusedInactiveBackground`: 未聚焦组中非活动选项卡的背景颜色。
- `tab.inactiveForeground`: 活动组中非活动选项卡的前景色。
- `tab.unfocusedActiveForeground`: 非活动编辑器组中活动选项卡的前景色。
- `tab.unfocusedInactiveForeground`: 非活动编辑器组中非活动选项卡的前景色。
- `tab.hoverBackground`: 悬停时的选项卡背景颜色。
- `tab.unfocusedHoverBackground`: 悬停时未聚焦组中的选项卡背景颜色。
- `tab.hoverForeground`: 悬停时的选项卡前景色。
- `tab.unfocusedHoverForeground`: 悬停时未聚焦组中的选项卡前景色。
- `tab.hoverBorder`: 悬停时用于高亮显示选项卡的边框。
- `tab.unfocusedHoverBorder`: 悬停时用于高亮显示未聚焦组中选项卡的边框。
- `tab.activeModifiedBorder`: 活动组中已修改（脏）活动选项卡顶部的边框。
- `tab.inactiveModifiedBorder`: 活动组中已修改（脏）非活动选项卡顶部的边框。
- `tab.unfocusedActiveModifiedBorder`: 未聚焦组中已修改（脏）活动选项卡顶部的边框。
- `tab.unfocusedInactiveModifiedBorder`: 未聚焦组中已修改（脏）非活动选项卡顶部的边框。
- `editorPane.background`: 居中编辑器布局左右两侧可见的编辑器窗格的背景颜色。
- `sideBySideEditor.horizontalBorder`: 当在编辑器组中从上到下并排显示时，用于分隔两个编辑器的颜色。
- `sideBySideEditor.verticalBorder`: 当在编辑器组中从左到右并排显示时，用于分隔两个编辑器的颜色。

## 编辑器颜色

最突出的编辑器颜色是用于语法高亮显示的标记颜色，基于已安装的语言语法。这些颜色由颜色主题定义，但也可以通过 `editor.tokenColorCustomizations` 设置进行自定义。有关更新颜色主题和可用标记类型的详细信息，请参阅 [自定义颜色主题](/docs/getstarted/themes#customizing-a-color-theme)。

此处列出了所有其他编辑器颜色：

- `editor.background`: 编辑器背景颜色。
- `editor.foreground`: 编辑器默认前景色。
- `editorLineNumber.foreground`: 编辑器行号的颜色。
- `editorLineNumber.activeForeground`: 活动编辑器行号的颜色。
- `editorLineNumber.dimmedForeground`: 当 editor.renderFinalNewline 设置为 dimmed 时，最后一行编辑器行的颜色。
- `editorCursor.background`: 编辑器光标的背景颜色。允许自定义被块光标覆盖的字符的颜色。
- `editorCursor.foreground`: 编辑器光标的颜色。
- `editorMultiCursor.primary.foreground`: 存在多个光标时，主编辑器光标的颜色。
- `editorMultiCursor.primary.background`: 存在多个光标时，主编辑器光标的背景颜色。允许自定义被块光标覆盖的字符的颜色。
- `editorMultiCursor.secondary.foreground`: 存在多个光标时，次要编辑器光标的颜色。
- `editorMultiCursor.secondary.background`: 存在多个光标时，次要编辑器光标的背景颜色。允许自定义被块光标覆盖的字符的颜色。
- `editor.placeholder.foreground`: 编辑器中占位符文本的前景色。
- `editor.compositionBorder`: 输入法编辑器 (IME) 组合窗口的边框颜色。

选择颜色在选择一个或多个字符时可见。除了选择之外，所有具有相同内容的区域也会高亮显示。

<!-- 图片已移除 -->

- `editor.selectionBackground`: 编辑器选择的颜色。
- `editor.selectionForeground`: 高对比度下选定文本的颜色。
- `editor.inactiveSelectionBackground`: 非活动编辑器中选择的颜色。颜色不得为不透明，以免遮挡底层装饰。
- `editor.selectionHighlightBackground`: 内容与选择相同的区域的颜色。颜色不得为不透明，以免遮挡底层装饰。
- `editor.selectionHighlightBorder`: 内容与选择相同的区域的边框颜色。

当光标位于符号或单词内时，单词高亮颜色可见。根据文件类型可用的语言支持，所有匹配的引用和声明都会高亮显示，并且读取和写入访问会获得不同的颜色。如果文档符号语言支持不可用，则回退到单词高亮显示。

<!-- 图片已移除 -->

- `editor.wordHighlightBackground`: 符号在读取访问期间的背景颜色，例如读取变量时。颜色不得为不透明，以免遮挡底层装饰。
- `editor.wordHighlightBorder`: 符号在读取访问期间的边框颜色，例如读取变量时。
- `editor.wordHighlightStrongBackground`: 符号在写入访问期间的背景颜色，例如写入变量时。颜色不得为不透明，以免遮挡底层装饰。
- `editor.wordHighlightStrongBorder`: 符号在写入访问期间的边框颜色，例如写入变量时。
- `editor.wordHighlightTextBackground`: 符号的文本出现的背景颜色。颜色不得为不透明，以免遮挡底层装饰。
- `editor.wordHighlightTextBorder`: 符号的文本出现的边框颜色。

查找颜色取决于查找/替换对话框中当前的查找字符串。

<!-- 图片已移除 -->

- `editor.findMatchBackground`: 当前搜索匹配项的颜色。
- `editor.findMatchForeground`: 当前搜索匹配项的文本颜色。
- `editor.findMatchHighlightForeground`: 其他搜索匹配项的前景色。
- `editor.findMatchHighlightBackground`: 其他搜索匹配项的颜色。颜色不得为不透明，以免遮挡底层装饰。
- `editor.findRangeHighlightBackground`: 限制搜索范围的颜色（在查找小部件中启用“在选择中查找”）。颜色不得为不透明，以免遮挡底层装饰。
- `editor.findMatchBorder`: 当前搜索匹配项的边框颜色。
- `editor.findMatchHighlightBorder`: 其他搜索匹配项的边框颜色。
- `editor.findRangeHighlightBorder`: 限制搜索范围的边框颜色（在查找小部件中启用“在选择中查找”）。

搜索颜色用于搜索视图栏的全局搜索结果。

<!-- 图片已移除 -->

- `search.resultsInfoForeground`: 搜索视图栏完成消息中的文本颜色。例如，此颜色用于显示 "`{x} results in {y} files`" 的文本中。

搜索编辑器颜色高亮显示搜索编辑器中的结果。这可以与其他查找匹配项分开配置，以便更好地区分同一编辑器中的不同类别的匹配项。

<!-- 图片已移除 -->

- `searchEditor.findMatchBackground`: 编辑器结果的颜色。
- `searchEditor.findMatchBorder`: 编辑器结果的边框颜色。
- `searchEditor.textInputBorder`: 搜索编辑器文本输入框边框。

悬停高亮显示在显示悬停的符号后面。

<!-- 图片已移除 -->

- `editor.hoverHighlightBackground`: 显示悬停的单词下方的高亮。颜色不得为不透明，以免遮挡底层装饰。

当前行通常显示为背景高亮或边框（不是两者都有）。

<!-- 图片已移除 -->

- `editor.lineHighlightBackground`: 光标位置行高亮的背景颜色。
- `editor.lineHighlightBorder`: 光标位置行周围边框的背景颜色。

编辑器水印的颜色

- `editorWatermark.foreground`: 编辑器水印中标签的前景色。

unicode 高亮的颜色

- `editorUnicodeHighlight.border`: 用于高亮显示 unicode 字符的边框颜色。
- `editorUnicodeHighlight.background`: 用于高亮显示 unicode 字符的背景颜色。

点击链接时，链接颜色可见。

<!-- 图片已移除 -->

- `editorLink.activeForeground`: 活动链接的颜色。

选择搜索结果时，范围高亮可见。

<!-- 图片已移除 -->

- `editor.rangeHighlightBackground`: 高亮范围的背景颜色，由快速打开、文件中的符号和查找功能使用。颜色不得为不透明，以免遮挡底层装饰。
- `editor.rangeHighlightBorder`: 高亮范围周围边框的背景颜色。

当通过诸如 **转到定义** 之类的命令导航到符号时，符号高亮可见。

- `editor.symbolHighlightBackground`: 高亮符号的背景颜色。颜色不得为不透明，以免遮挡底层装饰。
- `editor.symbolHighlightBorder`: 高亮符号周围边框的背景颜色。

要查看编辑器空白，请启用 **切换渲染空白**。

- `editorWhitespace.foreground`: 编辑器中空白字符的颜色。

要查看编辑器缩进参考线，请设置 `"editor.guides.indentation": true` 和 `"editor.guides.highlightActiveIndentation": true`。

- `editorIndentGuide.background`: 编辑器缩进参考线的颜色。
- `editorIndentGuide.background1`: 编辑器缩进参考线 (1) 的颜色。
- `editorIndentGuide.background2`: 编辑器缩进参考线 (2) 的颜色。
- `editorIndentGuide.background3`: 编辑器缩进参考线 (3) 的颜色。
- `editorIndentGuide.background4`: 编辑器缩进参考线 (4) 的颜色。
- `editorIndentGuide.background5`: 编辑器缩进参考线 (5) 的颜色。
- `editorIndentGuide.background6`: 编辑器缩进参考线 (6) 的颜色。
- `editorIndentGuide.activeBackground`: 活动编辑器缩进参考线的颜色。
- `editorIndentGuide.activeBackground1`: 活动编辑器缩进参考线 (1) 的颜色。
- `editorIndentGuide.activeBackground2`: 活动编辑器缩进参考线 (2) 的颜色。
- `editorIndentGuide.activeBackground3`: 活动编辑器缩进参考线 (3) 的颜色。
- `editorIndentGuide.activeBackground4`: 活动编辑器缩进参考线 (4) 的颜色。
- `editorIndentGuide.activeBackground5`: 活动编辑器缩进参考线 (5) 的颜色。
- `editorIndentGuide.activeBackground6`: 活动编辑器缩进参考线 (6) 的颜色。

要查看编辑器内联提示，请设置 `"editor.inlineSuggest.enabled": true`。

- `editorInlayHint.background`: 内联提示的背景颜色。
- `editorInlayHint.foreground`: 内联提示的前景色。
- `editorInlayHint.typeForeground`: 类型内联提示的前景色
- `editorInlayHint.typeBackground`: 类型内联提示的背景颜色
- `editorInlayHint.parameterForeground`: 参数内联提示的前景色
- `editorInlayHint.parameterBackground`: 参数内联提示的背景颜色

要查看编辑器标尺，请使用 `"editor.rulers"` 定义其位置

- `editorRuler.foreground`: 编辑器标尺的颜色。

- `editor.linkedEditingBackground`: 编辑器处于链接编辑模式时的背景颜色。

CodeLens:

<!-- 图片已移除 -->

- `editorCodeLens.foreground`: 编辑器 CodeLens 的前景色。

灯泡：

- `editorLightBulb.foreground`: 灯泡操作图标使用的颜色。
- `editorLightBulbAutoFix.foreground`: 灯泡自动修复操作图标使用的颜色。
- `editorLightBulbAi.foreground`: 灯泡 AI 图标使用的颜色。

括号匹配：

<!-- 图片已移除 -->

- `editorBracketMatch.background`: 匹配括号后面的背景颜色。
- `editorBracketMatch.border`: 匹配括号框的颜色。

括号对彩色化：

- `editorBracketHighlight.foreground1`: 括号 (1) 的前景色。需要启用括号对彩色化。
- `editorBracketHighlight.foreground2`: 括号 (2) 的前景色。需要启用括号对彩色化。
- `editorBracketHighlight.foreground3`: 括号 (3) 的前景色。需要启用括号对彩色化。
- `editorBracketHighlight.foreground4`: 括号 (4) 的前景色。需要启用括号对彩色化。
- `editorBracketHighlight.foreground5`: 括号 (5) 的前景色。需要启用括号对彩色化。
- `editorBracketHighlight.foreground6`: 括号 (6) 的前景色。需要启用括号对彩色化。
- `editorBracketHighlight.unexpectedBracket.foreground`: 意外括号的前景色。

括号对指南：

- `editorBracketPairGuide.activeBackground1`: 活动括号对指南 (1) 的背景颜色。需要启用括号对指南。
- `editorBracketPairGuide.activeBackground2`: 活动括号对指南 (2) 的背景颜色。需要启用括号对指南。
- `editorBracketPairGuide.activeBackground3`: 活动括号对指南 (3) 的背景颜色。需要启用括号对指南。
- `editorBracketPairGuide.activeBackground4`: 活动括号对指南 (4) 的背景颜色。需要启用括号对指南。
- `editorBracketPairGuide.activeBackground5`: 活动括号对指南 (5) 的背景颜色。需要启用括号对指南。
- `editorBracketPairGuide.activeBackground6`: 活动括号对指南 (6) 的背景颜色。需要启用括号对指南。

- `editorBracketPairGuide.background1`: 非活动括号对指南 (1) 的背景颜色。需要启用括号对指南。
- `editorBracketPairGuide.background2`: 非活动括号对指南 (2) 的背景颜色。需要启用括号对指南。
- `editorBracketPairGuide.background3`: 非活动括号对指南 (3) 的背景颜色。需要启用括号对指南。
- `editorBracketPairGuide.background4`: 非活动括号对指南 (4) 的背景颜色。需要启用括号对指南。
- `editorBracketPairGuide.background5`: 非活动括号对指南 (5) 的背景颜色。需要启用括号对指南。
- `editorBracketPairGuide.background6`: 非活动括号对指南 (6) 的背景颜色。需要启用括号对指南。

折叠：

- `editor.foldBackground`: 折叠范围的背景颜色。颜色不得为不透明，以免遮挡底层装饰。
- `editor.foldPlaceholderForeground`: 折叠范围第一行后折叠文本的颜色。

概览标尺：

此标尺位于编辑器右边缘的滚动条下方，提供编辑器中装饰的概览。

- `editorOverviewRuler.background`: 编辑器概览标尺的背景颜色。仅当启用了缩略图并将其放置在编辑器右侧时才使用。
- `editorOverviewRuler.border`: 概览标尺边框的颜色。
- `editorOverviewRuler.findMatchForeground`: 查找匹配项的概览标尺标记颜色。颜色不得为不透明，以免遮挡底层装饰。
- `editorOverviewRuler.rangeHighlightForeground`: 高亮范围（如快速打开、文件中的符号和查找功能）的概览标尺标记颜色。颜色不得为不透明，以免遮挡底层装饰。
- `editorOverviewRuler.selectionHighlightForeground`: 选择高亮的概览标尺标记颜色。颜色不得为不透明，以免遮挡底层装饰。
- `editorOverviewRuler.wordHighlightForeground`: 符号高亮的概览标尺标记颜色。颜色不得为不透明，以免遮挡底层装饰。
- `editorOverviewRuler.wordHighlightStrongForeground`: 写入访问符号高亮的概览标尺标记颜色。颜色不得为不透明，以免遮挡底层装饰。
- `editorOverviewRuler.wordHighlightTextForeground`: 符号文本出现的概览标尺标记颜色。颜色不得为不透明，以免遮挡底层装饰。
- `editorOverviewRuler.modifiedForeground`: 已修改内容的概览标尺标记颜色。
- `editorOverviewRuler.addedForeground`: 已添加内容的概览标尺标记颜色。
- `editorOverviewRuler.deletedForeground`: 已删除内容的概览标尺标记颜色。
- `editorOverviewRuler.errorForeground`: 错误的概览标尺标记颜色。
- `editorOverviewRuler.warningForeground`: 警告的概览标尺标记颜色。
- `editorOverviewRuler.infoForeground`: 信息的概览标尺标记颜色。
- `editorOverviewRuler.bracketMatchForeground`: 匹配括号的概览标尺标记颜色。
- `editorOverviewRuler.inlineChatInserted`: 内联聊天插入内容的概览标尺标记颜色。
- `editorOverviewRuler.inlineChatRemoved`: 内联聊天删除内容的概览标尺标记颜色。

错误和警告：

- `editorError.foreground`: 编辑器中错误波浪线的前景色。
- `editorError.border`: 编辑器中错误框的边框颜色。
- `editorError.background`: 编辑器中错误文本的背景颜色。颜色不得为不透明，以免遮挡底层装饰。
- `editorWarning.foreground`: 编辑器中警告波浪线的前景色。
- `editorWarning.border`: 编辑器中警告框的边框颜色。
- `editorWarning.background`: 编辑器中警告文本的背景颜色。颜色不得为不透明，以免遮挡底层装饰。
- `editorInfo.foreground`: 编辑器中信息波浪线的前景色。
- `editorInfo.border`: 编辑器中信息框的边框颜色。
- `editorInfo.background`: 编辑器中信息文本的背景颜色。颜色不得为不透明，以免遮挡底层装饰。
- `editorHint.foreground`: 编辑器中提示的前景色。
- `editorHint.border`: 编辑器中提示框的边框颜色。
- `problemsErrorIcon.foreground`: 问题错误图标使用的颜色。
- `problemsWarningIcon.foreground`: 问题警告图标使用的颜色。
- `problemsInfoIcon.foreground`: 问题信息图标使用的颜色。

未使用的源代码：

- `editorUnnecessaryCode.border`: 编辑器中不必要（未使用）源代码的边框颜色。
- `editorUnnecessaryCode.opacity`: 编辑器中不必要（未使用）源代码的不透明度。例如，`"#000000c0"` 将以 75% 的不透明度渲染代码。对于高对比度主题，使用 `"editorUnnecessaryCode.border"` 主题颜色来下划线不必要的代码，而不是使其淡出。

装订线包含字形边距和行号：

- `editorGutter.background`: 编辑器装订线的背景颜色。装订线包含字形边距和行号。
- `editorGutter.modifiedBackground`: 已修改行的编辑器装订线背景颜色。
- `editorGutter.modifiedSecondaryBackground`: 已修改行的编辑器装订线次要背景颜色。
- `editorGutter.addedBackground`: 已添加行的编辑器装订线背景颜色。
- `editorGutter.addedSecondaryBackground`: 已添加行的编辑器装订线次要背景颜色。
- `editorGutter.deletedBackground`: 已删除行的编辑器装订线背景颜色。
- `editorGutter.deletedSecondaryBackground`: 已删除行的编辑器装订线次要背景颜色。
- `editorGutter.commentRangeForeground`: 评论范围的编辑器装订线装饰颜色。
- `editorGutter.commentGlyphForeground`: 评论字形的编辑器装订线装饰颜色。
- `editorGutter.commentUnresolvedGlyphForeground`: 未解决评论线程的评论字形的编辑器装订线装饰颜色。
- `editorGutter.foldingControlForeground`: 编辑器装订线中折叠控件的颜色。
- `editorGutter.itemGlyphForeground`: 装订线项目字形的编辑器装订线装饰颜色。
- `editorGutter.itemBackground`: 装订线项目背景的编辑器装订线装饰颜色。此颜色应为不透明。

审查拉取请求时可以看到编辑器评论小部件：

- `editorCommentsWidget.resolvedBorder`: 已解决评论的边框和箭头的颜色。
- `editorCommentsWidget.unresolvedBorder`: 未解决评论的边框和箭头的颜色。
- `editorCommentsWidget.rangeBackground`: 评论范围的背景颜色。
- `editorCommentsWidget.rangeActiveBackground`: 当前选中或悬停的评论范围的背景颜色。
- `editorCommentsWidget.replyInputBackground`: 评论回复输入框的背景颜色。

在使用 Copilot 建议下一个更改时，可以看到编辑器内联编辑：

- `inlineEdit.gutterIndicator.primaryBorder`: 主要内联编辑装订线指示器的边框颜色。
- `inlineEdit.gutterIndicator.primaryForeground`: 主要内联编辑装订线指示器的前景色。
- `inlineEdit.gutterIndicator.primaryBackground`: 主要内联编辑装订线指示器的背景颜色。
- `inlineEdit.gutterIndicator.secondaryBorder`: 次要内联编辑装订线指示器的边框颜色。
- `inlineEdit.gutterIndicator.secondaryForeground`: 次要内联编辑装订线指示器的前景色。
- `inlineEdit.gutterIndicator.secondaryBackground`: 次要内联编辑装订线指示器的背景颜色。
- `inlineEdit.gutterIndicator.successfulBorder`: 成功内联编辑装订线指示器的边框颜色。
- `inlineEdit.gutterIndicator.successfulForeground`: 成功内联编辑装订线指示器的前景色。
- `inlineEdit.gutterIndicator.successfulBackground`: 成功内联编辑装订线指示器的背景颜色。
- `inlineEdit.gutterIndicator.background`: 内联编辑装订线指示器的背景颜色。
- `inlineEdit.originalBackground`: 内联编辑中原始文本的背景颜色。
- `inlineEdit.modifiedBackground`: 内联编辑中修改后文本的背景颜色。
- `inlineEdit.originalChangedLineBackground`: 内联编辑原始文本中已更改行的背景颜色。
- `inlineEdit.originalChangedTextBackground`: 内联编辑原始文本中已更改文本的叠加颜色。
- `inlineEdit.modifiedChangedLineBackground`: 内联编辑修改后文本中已更改行的背景颜色。
- `inlineEdit.modifiedChangedTextBackground`: 内联编辑修改后文本中已更改文本的叠加颜色。
- `inlineEdit.originalBorder`: 内联编辑中原始文本的边框颜色。
- `inlineEdit.modifiedBorder`: 内联编辑中修改后文本的边框颜色。
- `inlineEdit.tabWillAcceptModifiedBorder`: 当 tab 键将接受修改时，内联编辑小部件的修改边框颜色。
- `inlineEdit.tabWillAcceptOriginalBorder`: 当 tab 键将接受修改时，内联编辑小部件覆盖原始文本的原始边框颜色。

## 差异编辑器颜色

对于插入和删除文本的着色，请使用背景或边框颜色，但不要同时使用两者。

- `diffEditor.insertedTextBackground`: 插入文本的背景颜色。颜色不得为不透明，以免遮挡底层装饰。
- `diffEditor.insertedTextBorder`: 插入文本的轮廓颜色。
- `diffEditor.removedTextBackground`: 移除文本的背景颜色。颜色不得为不透明，以免遮挡底层装饰。
- `diffEditor.removedTextBorder`: 移除文本的轮廓颜色。
- `diffEditor.border`: 两个文本编辑器之间的边框颜色。
- `diffEditor.diagonalFill`: 差异编辑器对角线填充的颜色。对角线填充用于并排差异视图。
- `diffEditor.insertedLineBackground`: 插入行的背景颜色。颜色不得为不透明，以免遮挡底层装饰。
- `diffEditor.removedLineBackground`: 移除行的背景颜色。颜色不得为不透明，以免遮挡底层装饰。
- `diffEditorGutter.insertedLineBackground`: 插入行所在边距的背景颜色。
- `diffEditorGutter.removedLineBackground`: 移除行所在边距的背景颜色。
- `diffEditorOverview.insertedForeground`: 插入内容的差异概览标尺前景。
- `diffEditorOverview.removedForeground`: 移除内容的差异概览标尺前景。
- `diffEditor.unchangedRegionBackground`: 差异编辑器中未更改块的颜色。
- `diffEditor.unchangedRegionForeground`: 差异编辑器中未更改块的前景色。
- `diffEditor.unchangedRegionShadow`: 未更改区域小部件周围阴影的颜色。
- `diffEditor.unchangedCodeBackground`: 差异编辑器中未更改代码的背景颜色。
- `diffEditor.move.border`: 差异编辑器中移动文本的边框颜色。
- `diffEditor.moveActive.border`: 差异编辑器中移动文本的活动边框颜色。
- `multiDiffEditor.headerBackground`: 差异编辑器标题的背景颜色
- `multiDiffEditor.background`: 多文件差异编辑器的背景颜色
- `multiDiffEditor.border`: 多文件差异编辑器的边框颜色

## 聊天颜色

- `chat.requestBorder`: 聊天请求的边框颜色。
- `chat.requestBackground`: 聊天请求的背景颜色。
- `chat.slashCommandBackground`: 聊天斜杠命令的背景颜色。
- `chat.slashCommandForeground`: 聊天斜杠命令的前景色。
- `chat.avatarBackground`: 聊天头像的背景颜色。
- `chat.avatarForeground`: 聊天头像的前景色。
- `chat.editedFileForeground`: 已编辑文件列表中聊天编辑文件的前景色。
- `chat.linesAddedForeground`: 聊天代码块药丸中添加行的前景色。
- `chat.linesRemovedForeground`: 聊天代码块药丸中移除行的前景色。
- `chat.requestCodeBorder`: 聊天请求气泡内代码块的边框颜色。
- `chat.requestBubbleBackground`: 聊天请求气泡的背景颜色。
- `chat.requestBubbleHoverBackground`: 悬停时聊天请求气泡的背景颜色。
- `chat.checkpointSeparator`: 聊天检查点分隔符颜色。
- `chatManagement.sashBorder`: 聊天管理编辑器拆分视图分隔条边框的颜色。

## 内联聊天颜色

- `inlineChat.background`: 交互式编辑器小部件的背景颜色。
- `inlineChat.foreground`: 交互式编辑器小部件的前景色
- `inlineChat.border`: 交互式编辑器小部件的边框颜色。
- `inlineChat.shadow`: 交互式编辑器小部件的阴影颜色。
- `inlineChatInput.border`: 交互式编辑器输入的边框颜色。
- `inlineChatInput.focusBorder`: 聚焦时交互式编辑器输入的边框颜色。
- `inlineChatInput.placeholderForeground`: 交互式编辑器输入占位符的前景色。
- `inlineChatInput.background`: 交互式编辑器输入的背景颜色。
- `inlineChatDiff.inserted`: 交互式编辑器输入中插入文本的背景颜色。
- `inlineChatDiff.removed`: 交互式编辑器输入中移除文本的背景颜色。

## 面板聊天颜色

- `interactive.activeCodeBorder`: 编辑器获得焦点时当前交互式代码单元的边框颜色。
- `interactive.inactiveCodeBorder`: 编辑器未获得焦点时当前交互式代码单元的边框颜色。

## 编辑器小部件颜色

编辑器小部件显示在编辑器内容的前面。例如查找/替换对话框、建议小部件和编辑器悬停。

- `editorWidget.foreground`: 编辑器小部件（如查找/替换）的前景色。
- `editorWidget.background`: 编辑器小部件（如查找/替换）的背景颜色。
- `editorWidget.border`: 编辑器小部件的边框颜色，除非小部件不包含边框或定义了自己的边框颜色。
- `editorWidget.resizeBorder`: 编辑器小部件调整大小条的边框颜色。仅当小部件选择具有调整大小边框且颜色未被小部件覆盖时使用。

- `editorSuggestWidget.background`: 建议小部件的背景颜色。
- `editorSuggestWidget.border`: 建议小部件的边框颜色。
- `editorSuggestWidget.foreground`: 建议小部件的前景色。
- `editorSuggestWidget.focusHighlightForeground`: 当项目聚焦时，建议小部件中匹配高亮显示的颜色。
- `editorSuggestWidget.highlightForeground`: 建议小部件中匹配高亮显示的颜色。
- `editorSuggestWidget.selectedBackground`: 建议小部件中所选项的背景颜色。
- `editorSuggestWidget.selectedForeground`: 建议小部件中所选项的前景色。
- `editorSuggestWidget.selectedIconForeground`: 建议小部件中所选项的图标前景色。
- `editorSuggestWidgetStatus.foreground`: 建议小部件状态的前景色。

- `editorHoverWidget.foreground`: 编辑器悬停的前景色。
- `editorHoverWidget.background`: 编辑器悬停的背景颜色。
- `editorHoverWidget.border`: 编辑器悬停的边框颜色。
- `editorHoverWidget.highlightForeground`: 参数提示中活动项的前景色。
- `editorHoverWidget.statusBarBackground`: 编辑器悬停状态栏的背景颜色。

- `editorGhostText.border`: 内联补全提供程序和建议预览显示的幽灵文本的边框颜色。
- `editorGhostText.background`: 编辑器中幽灵文本的背景颜色。
- `editorGhostText.foreground`: 内联补全提供程序和建议预览显示的幽灵文本的前景色。

- `editorStickyScroll.background`: 编辑器粘性滚动背景颜色。
- `editorStickyScroll.border`: 编辑器中粘性滚动的边框颜色。
- `editorStickyScroll.shadow`:  编辑器中粘性滚动的阴影颜色。
- `editorStickyScrollGutter.background`: 编辑器中粘性滚动装订线部分的背景颜色。
- `editorStickyScrollHover.background`: 编辑器粘性滚动悬停背景颜色。

调试异常小部件是一个快速查看视图，当调试在异常处停止时在编辑器中显示。

- `debugExceptionWidget.background`: 异常小部件背景颜色。
- `debugExceptionWidget.border`: 异常小部件边框颜色。

当导航到编辑器中的错误和警告时（**转到下一个错误或警告** 命令），显示编辑器标记视图。

- `editorMarkerNavigation.background`: 编辑器标记导航小部件背景。
- `editorMarkerNavigationError.background`: 编辑器标记导航小部件错误颜色。
- `editorMarkerNavigationWarning.background`: 编辑器标记导航小部件警告颜色。
- `editorMarkerNavigationInfo.background`: 编辑器标记导航小部件信息颜色。
- `editorMarkerNavigationError.headerBackground`: 编辑器标记导航小部件错误标题背景。
- `editorMarkerNavigationWarning.headerBackground`: 编辑器标记导航小部件警告标题背景。
- `editorMarkerNavigationInfo.headerBackground`: 编辑器标记导航小部件信息标题背景。

## 快速查看 (Peek View) 颜色

快速查看用于在编辑器内作为视图显示引用和声明。

<!-- 图片已移除 -->

- `peekView.border`: 快速查看边框和箭头的颜色。
- `peekViewEditor.background`: 快速查看编辑器的背景颜色。
- `peekViewEditorGutter.background`: 快速查看编辑器中装订线的背景颜色。
- `peekViewEditor.matchHighlightBackground`: 快速查看编辑器中匹配高亮显示的颜色。
- `peekViewEditor.matchHighlightBorder`: 快速查看编辑器中匹配高亮显示的边框颜色。
- `peekViewResult.background`: 快速查看结果列表的背景颜色。
- `peekViewResult.fileForeground`: 快速查看结果列表中文件节点的前景色。
- `peekViewResult.lineForeground`: 快速查看结果列表中行节点的前景色。
- `peekViewResult.matchHighlightBackground`: 快速查看结果列表中匹配高亮显示的颜色。
- `peekViewResult.selectionBackground`: 快速查看结果列表中所选项的背景颜色。
- `peekViewResult.selectionForeground`: 快速查看结果列表中所选项的前景色。
- `peekViewTitle.background`: 快速查看标题区域的背景颜色。
- `peekViewTitleDescription.foreground`: 快速查看标题信息的颜色。
- `peekViewTitleLabel.foreground`: 快速查看标题的颜色。
- `peekViewEditorStickyScroll.background`: 快速查看编辑器中粘性滚动的背景颜色。
- `peekViewEditorStickyScrollGutter.background`: 快速查看编辑器中粘性滚动的装订线部分的背景颜色。

## 合并冲突颜色

当编辑器包含特殊的差异范围时，会显示合并冲突装饰。

<!-- 图片已移除 -->

- `merge.currentHeaderBackground`: 内联合并冲突中的当前标题背景。颜色不得为不透明，以免遮挡底层装饰。
- `merge.currentContentBackground`: 内联合并冲突中的当前内容背景。颜色不得为不透明，以免遮挡底层装饰。
- `merge.incomingHeaderBackground`: 内联合并冲突中的传入标题背景。颜色不得为不透明，以免遮挡底层装饰。
- `merge.incomingContentBackground`: 内联合并冲突中的传入内容背景。颜色不得为不透明，以免遮挡底层装饰。
- `merge.border`: 内联合并冲突中标题和拆分器的边框颜色。
- `merge.commonContentBackground`: 内联合并冲突中的共同祖先内容背景。颜色不得为不透明，以免遮挡底层装饰。
- `merge.commonHeaderBackground`: 内联合并冲突中的共同祖先标题背景。颜色不得为不透明，以免遮挡底层装饰。
- `editorOverviewRuler.currentContentForeground`: 内联合并冲突的当前概览标尺前景。
- `editorOverviewRuler.incomingContentForeground`: 内联合并冲突的传入概览标尺前景。
- `editorOverviewRuler.commonContentForeground`: 内联合并冲突的共同祖先概览标尺前景。
- `editorOverviewRuler.commentForeground`: 已解决评论的编辑器概览标尺装饰颜色。此颜色应为不透明。
- `editorOverviewRuler.commentUnresolvedForeground`: 未解决评论的编辑器概览标尺装饰颜色。此颜色应为不透明。
- `mergeEditor.change.background`: 更改的背景颜色。
- `mergeEditor.change.word.background`: 单词更改的背景颜色。
- `mergeEditor.conflict.unhandledUnfocused.border`: 未处理未聚焦冲突的边框颜色。
- `mergeEditor.conflict.unhandledFocused.border`: 未处理聚焦冲突的边框颜色。
- `mergeEditor.conflict.handledUnfocused.border`: 已处理未聚焦冲突的边框颜色。
- `mergeEditor.conflict.handledFocused.border`: 已处理聚焦冲突的边框颜色。
- `mergeEditor.conflict.handled.minimapOverViewRuler`: 输入 1 中更改的前景色。
- `mergeEditor.conflict.unhandled.minimapOverViewRuler`: 输入 1 中更改的前景色。
- `mergeEditor.conflictingLines.background`: “冲突行”文本的背景。
- `mergeEditor.changeBase.background`: 基础中更改的背景颜色。
- `mergeEditor.changeBase.word.background`: 基础中单词更改的背景颜色。
- `mergeEditor.conflict.input1.background`: 输入 1 中装饰的背景颜色。
- `mergeEditor.conflict.input2.background`: 输入 2 中装饰的背景颜色。

## 面板颜色

面板显示在编辑器区域下方，包含输出和集成终端等视图。

- `panel.background`: 面板背景颜色。
- `panel.border`: 面板边框颜色，用于将面板与编辑器分隔开。
- `panel.dropBorder`: 面板标题的拖放反馈颜色。面板显示在编辑器区域下方，包含输出和集成终端等视图。
- `panelTitle.activeBorder`: 活动面板标题的边框颜色。
- `panelTitle.activeForeground`: 活动面板的标题颜色。
- `panelTitle.inactiveForeground`: 非活动面板的标题颜色。
- `panelTitle.border`: 面板标题底部的边框颜色，将标题与视图分隔开。面板显示在编辑器区域下方，包含输出和集成终端等视图。
- `panelTitleBadge.background`: 面板标题徽章背景颜色。面板显示在编辑器区域下方，包含输出和集成终端等视图。
- `panelTitleBadge.foreground`: 面板标题徽章前景色。面板显示在编辑器区域下方，包含输出和集成终端等视图。
- `panelInput.border`: 面板中输入的输入框边框。
- `panelSection.border`: 当多个视图在面板中水平堆叠时使用的面板部分边框颜色。面板显示在编辑器区域下方，包含输出和集成终端等视图。
- `panelSection.dropBackground`: 面板部分的拖放反馈颜色。颜色应具有透明度，以便面板部分仍然可以透出。面板显示在编辑器区域下方，包含输出和集成终端等视图。
- `panelSectionHeader.background`: 面板部分标题背景颜色。面板显示在编辑器区域下方，包含输出和集成终端等视图。
- `panelSectionHeader.foreground`: 面板部分标题前景色。面板显示在编辑器区域下方，包含输出和集成终端等视图。
- `panelStickyScroll.background`: 面板中粘性滚动的背景颜色。
- `panelStickyScroll.border`: 面板中粘性滚动的边框颜色。
- `panelStickyScroll.shadow`: 面板中粘性滚动的阴影颜色。
- `panelSectionHeader.border`: 当多个视图在面板中垂直堆叠时使用的面板部分标题边框颜色。面板显示在编辑器区域下方，包含输出和集成终端等视图。
- `outputView.background`: 输出视图背景颜色。
- `outputViewStickyScroll.background`: 输出视图粘性滚动背景颜色。

## 状态栏颜色

状态栏显示在工作台的底部。

- `statusBar.background`: 标准状态栏背景颜色。
- `statusBar.foreground`: 状态栏前景色。
- `statusBar.border`: 分隔状态栏和编辑器的状态栏边框颜色。
- `statusBar.debuggingBackground`: 调试程序时的状态栏背景颜色。
- `statusBar.debuggingForeground`: 调试程序时的状态栏前景色。
- `statusBar.debuggingBorder`: 调试程序时分隔状态栏和编辑器的状态栏边框颜色。
- `statusBar.noFolderForeground`: 未打开文件夹时的状态栏前景色。
- `statusBar.noFolderBackground`: 未打开文件夹时的状态栏背景颜色。
- `statusBar.noFolderBorder`: 未打开文件夹时分隔状态栏和编辑器的状态栏边框颜色。
- `statusBarItem.activeBackground`: 点击时的状态栏项目背景颜色。
- `statusBarItem.hoverForeground`: 悬停时的状态栏项目前景色。状态栏显示在窗口底部。
- `statusBarItem.hoverBackground`: 悬停时的状态栏项目背景颜色。
- `statusBarItem.prominentForeground`: 状态栏突出项目前景色。
- `statusBarItem.prominentBackground`: 状态栏突出项目背景颜色。
- `statusBarItem.prominentHoverForeground`: 悬停时的状态栏突出项目前景色。突出项目与其他状态栏条目区分开来以指示重要性。状态栏显示在窗口底部。
- `statusBarItem.prominentHoverBackground`: 悬停时的状态栏突出项目背景颜色。
- `statusBarItem.remoteBackground`: 状态栏上远程指示器的背景颜色。
- `statusBarItem.remoteForeground`: 状态栏上远程指示器的前景色。
- `statusBarItem.remoteHoverBackground`: 悬停时状态栏上远程指示器的背景颜色。
- `statusBarItem.remoteHoverForeground`: 悬停时状态栏上远程指示器的前景色。
- `statusBarItem.errorBackground`: 状态栏错误项目背景颜色。错误项目与其他状态栏条目区分开来以指示错误条件。
- `statusBarItem.errorForeground`: 状态栏错误项目前景色。错误项目与其他状态栏条目区分开来以指示错误条件。
- `statusBarItem.errorHoverBackground`: 悬停时的状态栏错误项目背景颜色。错误项目与其他状态栏条目区分开来以指示错误条件。状态栏显示在窗口底部。
- `statusBarItem.errorHoverForeground`: 悬停时的状态栏错误项目前景色。错误项目与其他状态栏条目区分开来以指示错误条件。状态栏显示在窗口底部。
- `statusBarItem.warningBackground`: 状态栏警告项目背景颜色。警告项目与其他状态栏条目区分开来以指示警告条件。状态栏显示在窗口底部。
- `statusBarItem.warningForeground`: 状态栏警告项目前景色。警告项目与其他状态栏条目区分开来以指示警告条件。状态栏显示在窗口底部。
- `statusBarItem.warningHoverBackground`: 悬停时的状态栏警告项目背景颜色。警告项目与其他状态栏条目区分开来以指示警告条件。状态栏显示在窗口底部。
- `statusBarItem.warningHoverForeground`: 悬停时的状态栏警告项目前景色。警告项目与其他状态栏条目区分开来以指示警告条件。状态栏显示在窗口底部。
- `statusBarItem.compactHoverBackground`: 悬停包含两个悬停的项目时的状态栏项目背景颜色。状态栏显示在窗口底部。
- `statusBarItem.focusBorder`: 键盘导航聚焦时的状态栏项目边框颜色。状态栏显示在窗口底部。
- `statusBar.focusBorder`: 键盘导航聚焦时的状态栏边框颜色。状态栏显示在窗口底部。
- `statusBarItem.offlineBackground`: 工作台脱机时的状态栏项目背景颜色。
- `statusBarItem.offlineForeground`: 工作台脱机时的状态栏项目前景色。
- `statusBarItem.offlineHoverForeground`: 工作台脱机时的状态栏项目前景悬停颜色。
- `statusBarItem.offlineHoverBackground`: 工作台脱机时的状态栏项目背景悬停颜色。

突出项目与其他状态栏条目区分开来以指示重要性。一个例子是 **切换 Tab 键移动焦点** 命令更改模式指示器。

## 标题栏颜色

- `titleBar.activeBackground`: 窗口处于活动状态时的标题栏背景。
- `titleBar.activeForeground`: 窗口处于活动状态时的标题栏前景。
- `titleBar.inactiveBackground`: 窗口处于非活动状态时的标题栏背景。
- `titleBar.inactiveForeground`: 窗口处于非活动状态时的标题栏前景。
- `titleBar.border`: 标题栏边框颜色。

## 菜单栏颜色

- `menubar.selectionForeground`: 菜单栏中所选菜单项的前景色。
- `menubar.selectionBackground`: 菜单栏中所选菜单项的背景颜色。
- `menubar.selectionBorder`: 菜单栏中所选菜单项的边框颜色。
- `menu.foreground`: 菜单项的前景色。
- `menu.background`: 菜单项的背景颜色。
- `menu.selectionForeground`: 菜单中所选菜单项的前景色。
- `menu.selectionBackground`: 菜单中所选菜单项的背景颜色。
- `menu.selectionBorder`: 菜单中所选菜单项的边框颜色。
- `menu.separatorBackground`: 菜单中分隔符菜单项的颜色。
- `menu.border`: 菜单的边框颜色。

## 命令中心颜色

- `commandCenter.foreground`: 命令中心的前景色。
- `commandCenter.activeForeground`: 命令中心的活动前景色。
- `commandCenter.background`: 命令中心的背景颜色。
- `commandCenter.activeBackground`: 命令中心的活动背景颜色。
- `commandCenter.border`: 命令中心的边框颜色。
- `commandCenter.inactiveForeground`: 窗口处于非活动状态时命令中心的前景色。
- `commandCenter.inactiveBorder`: 窗口处于非活动状态时命令中心的边框颜色。
- `commandCenter.activeBorder`: 命令中心的活动边框颜色。
- `commandCenter.debuggingBackground`: 调试程序时命令中心的背景颜色。

## 通知颜色

通知 toast 从工作台右下角滑出。

<!-- 图片已移除 -->

一旦在通知中心打开，它们将显示在带有标题的列表中：

<!-- 图片已移除 -->

- `notificationCenter.border`: 通知中心边框颜色。
- `notificationCenterHeader.foreground`: 通知中心标题前景色。
- `notificationCenterHeader.background`: 通知中心标题背景颜色。
- `notificationToast.border`: 通知 toast 边框颜色。
- `notifications.foreground`: 通知前景色。
- `notifications.background`: 通知背景颜色。
- `notifications.border`: 与通知中心中其他通知分隔的通知边框颜色。
- `notificationLink.foreground`: 通知链接前景色。
- `notificationsErrorIcon.foreground`: 通知错误图标使用的颜色。
- `notificationsWarningIcon.foreground`: 通知警告图标使用的颜色。
- `notificationsInfoIcon.foreground`: 通知信息图标使用的颜色。

## 横幅颜色

横幅出现在标题栏下方，可见时跨越工作台的整个宽度。

- `banner.background`: 横幅背景颜色。
- `banner.foreground`: 横幅前景色。
- `banner.iconForeground`: 横幅文本前面图标的颜色。

## 插件颜色

- `extensionButton.prominentForeground`: 插件视图按钮前景色（例如 **安装** 按钮）。
- `extensionButton.prominentBackground`: 插件视图按钮背景颜色。
- `extensionButton.prominentHoverBackground`: 插件视图按钮背景悬停颜色。
- `extensionButton.background`: 插件操作的按钮背景颜色。
- `extensionButton.foreground`: 插件操作的按钮前景色。
- `extensionButton.hoverBackground`: 插件操作的按钮背景悬停颜色。
- `extensionButton.separator`: 插件操作的按钮分隔符颜色。
- `extensionBadge.remoteBackground`: 插件视图中远程徽章的背景颜色。
- `extensionBadge.remoteForeground`: 插件视图中远程徽章的前景色。
- `extensionIcon.starForeground`: 插件评分的图标颜色。
- `extensionIcon.verifiedForeground`: 插件已验证发布者的图标颜色。
- `extensionIcon.preReleaseForeground`: 预发布插件的图标颜色。
- `extensionIcon.sponsorForeground`: 插件赞助商的图标颜色。
- `extensionIcon.privateForeground`: 私有插件的图标颜色。
- `mcpIcon.starForeground`: mcp 星标的图标颜色。

## 快速选择器颜色

- `pickerGroup.border`: 快速选择器（快速打开）分组边框的颜色。
- `pickerGroup.foreground`: 快速选择器（快速打开）分组标签的颜色。
- `quickInput.background`: 快速输入背景颜色。快速输入小部件是颜色主题选择器等视图的容器。
- `quickInput.foreground`: 快速输入前景色。快速输入小部件是颜色主题选择器等视图的容器。
- `quickInputList.focusBackground`: 聚焦项的快速选择器背景颜色。
- `quickInputList.focusForeground`: 聚焦项的快速选择器前景色。
- `quickInputList.focusIconForeground`: 聚焦项的快速选择器图标前景色。
- `quickInputTitle.background`: 快速选择器标题背景颜色。快速选择器小部件是命令面板等选择器的容器。

## 键绑定标签颜色

当命令有关联的键绑定时，会显示键绑定标签。在命令面板中可以看到键绑定标签的示例：

<!-- 图片已移除 -->

键绑定标签的用途包括（但不限于）：

- 命令面板
- 键盘快捷方式编辑器
- 键盘快捷方式记录器模态框
- 插件市场页面的“功能贡献”部分

以下自定义可用：

- `keybindingLabel.background`: 键绑定标签背景颜色。键绑定标签用于表示键盘快捷键。
- `keybindingLabel.foreground`: 键绑定标签前景色。键绑定标签用于表示键盘快捷键。
- `keybindingLabel.border`: 键绑定标签边框颜色。键绑定标签用于表示键盘快捷键。
- `keybindingLabel.bottomBorder`: 键绑定标签底部边框颜色。键绑定标签用于表示键盘快捷键。

## 键盘快捷方式表颜色

- `keybindingTable.headerBackground`: 键盘快捷方式表标题的背景颜色。
- `keybindingTable.rowsBackground`: 键盘快捷方式表交替行的背景颜色。

## 集成终端颜色

- `terminal.background`: 集成终端视口的背景。
- `terminal.border`: 分隔终端内拆分窗格的边框颜色。默认为 panel.border。
- `terminal.foreground`: 集成终端的默认前景色。
- `terminal.ansiBlack`: 终端中的“黑色” ANSI 颜色。
- `terminal.ansiBlue`: 终端中的“蓝色” ANSI 颜色。
- `terminal.ansiBrightBlack`: 终端中的“亮黑色” ANSI 颜色。
- `terminal.ansiBrightBlue`: 终端中的“亮蓝色” ANSI 颜色。
- `terminal.ansiBrightCyan`: 终端中的“亮青色” ANSI 颜色。
- `terminal.ansiBrightGreen`: 终端中的“亮绿色” ANSI 颜色。
- `terminal.ansiBrightMagenta`: 终端中的“亮洋红色” ANSI 颜色。
- `terminal.ansiBrightRed`: 终端中的“亮红色” ANSI 颜色。
- `terminal.ansiBrightWhite`: 终端中的“亮白色” ANSI 颜色。
- `terminal.ansiBrightYellow`: 终端中的“亮黄色” ANSI 颜色。
- `terminal.ansiCyan`: 终端中的“青色” ANSI 颜色。
- `terminal.ansiGreen`: 终端中的“绿色” ANSI 颜色。
- `terminal.ansiMagenta`: 终端中的“洋红色” ANSI 颜色。
- `terminal.ansiRed`: 终端中的“红色” ANSI 颜色。
- `terminal.ansiWhite`: 终端中的“白色” ANSI 颜色。
- `terminal.ansiYellow`: 终端中的“黄色” ANSI 颜色。
- `terminal.selectionBackground`: 终端的选择背景颜色。
- `terminal.selectionForeground`: 终端的选择前景色。当此项为 null 时，将保留选择前景并应用最小对比度特性。
- `terminal.inactiveSelectionBackground`: 终端未获得焦点时的选择背景颜色。
- `terminal.findMatchBackground`: 终端中当前搜索匹配项的颜色。颜色不得为不透明，以免遮挡底层终端内容。
- `terminal.findMatchBorder`: 终端中当前搜索匹配项的边框颜色。
- `terminal.findMatchHighlightBackground`: 终端中其他搜索匹配项的颜色。颜色不得为不透明，以免遮挡底层终端内容。
- `terminal.findMatchHighlightBorder`: 终端中其他搜索匹配项的边框颜色。
- `terminal.hoverHighlightBackground`: 悬停在终端链接上时的高亮颜色。
- `terminalCursor.background`: 终端光标的背景颜色。允许自定义被块光标覆盖的字符的颜色。
- `terminalCursor.foreground`: 终端光标的前景色。
- `terminal.dropBackground`: 拖动到终端顶部时的背景颜色。颜色应具有透明度，以便终端内容仍然可以透出。
- `terminal.tab.activeBorder`: 面板中终端选项卡侧面的边框。默认为 `tab.activeBorder`。
- `terminalCommandDecoration.defaultBackground`: 默认终端命令装饰背景颜色。
- `terminalCommandDecoration.successBackground`: 成功命令的终端命令装饰背景颜色。
- `terminalCommandDecoration.errorBackground`: 错误命令的终端命令装饰背景颜色。
- `terminalOverviewRuler.cursorForeground`: 概览标尺光标颜色。
- `terminalOverviewRuler.findMatchForeground`: 终端中查找匹配项的概览标尺标记颜色。
- `terminalStickyScroll.background`: 终端中粘性滚动叠加层的背景颜色。
- `terminalStickyScroll.border`: 终端中粘性滚动叠加层的边框。
- `terminalStickyScrollHover.background`: 悬停时终端中粘性滚动叠加层的背景颜色。
- `terminal.initialHintForeground`: 终端初始提示的前景色。
- `terminalOverviewRuler.border`: 概览标尺左侧边框颜色。
- `terminalCommandGuide.foreground`: 悬停时出现在命令及其输出左侧的终端命令指南的前景色。

- `terminalSymbolIcon.aliasForeground`: 别名图标的前景色。这些图标将出现在终端建议小部件中
- `terminalSymbolIcon.branchForeground`: 分支图标的前景色。这些图标将出现在终端建议小部件中。
- `terminalSymbolIcon.commitForeground`: 提交图标的前景色。这些图标将出现在终端建议小部件中。
- `terminalSymbolIcon.flagForeground`: 标志图标的前景色。这些图标将出现在终端建议小部件中
- `terminalSymbolIcon.optionForeground`: 选项图标的前景色。这些图标将出现在终端建议小部件中。
- `terminalSymbolIcon.optionValueForeground`: 枚举成员图标的前景色。这些图标将出现在终端建议小部件中。
- `terminalSymbolIcon.methodForeground`: 方法图标的前景色。这些图标将出现在终端建议小部件中。
- `terminalSymbolIcon.argumentForeground`: 参数图标的前景色。这些图标将出现在终端建议小部件中。
- `terminalSymbolIcon.inlineSuggestionForeground`: 内联建议图标的前景色。这些图标将出现在终端建议小部件中。
- `terminalSymbolIcon.fileForeground`: 文件图标的前景色。这些图标将出现在终端建议小部件中。
- `terminalSymbolIcon.folderForeground`: 文件夹图标的前景色。这些图标将出现在终端建议小部件中。
- `terminalSymbolIcon.pullRequestDoneForeground`: 已完成拉取请求图标的前景色。这些图标将出现在终端建议小部件中。
- `terminalSymbolIcon.pullRequestForeground`: 拉取请求图标的前景色。这些图标将出现在终端建议小部件中。
- `terminalSymbolIcon.remoteForeground`: 远程图标的前景色。这些图标将出现在终端建议小部件中。
- `terminalSymbolIcon.stashForeground`: 藏匿图标的前景色。这些图标将出现在终端建议小部件中。
- `terminalSymbolIcon.symbolText`: 纯文本建议的前景色。这些图标将出现在终端建议小部件中。
- `terminalSymbolIcon.symbolicLinkFileForeground`: 符号链接文件图标的前景色。这些图标将出现在终端建议小部件中。
- `terminalSymbolIcon.symbolicLinkFolderForeground`: 符号链接文件夹图标的前景色。这些图标将出现在终端建议小部件中。
- `terminalSymbolIcon.tagForeground`: 标签图标的前景色。这些图标将出现在终端建议小部件中。

## 调试颜色

- `debugToolBar.background`: 调试工具栏背景颜色。
- `debugToolBar.border`: 调试工具栏边框颜色。
- `editor.stackFrameHighlightBackground`: 编辑器中顶部堆栈帧高亮的背景颜色。
- `editor.focusedStackFrameHighlightBackground`: 编辑器中聚焦堆栈帧高亮的背景颜色。
- `editor.inlineValuesForeground`: 调试内联值文本的颜色。
- `editor.inlineValuesBackground`: 调试内联值背景的颜色。
- `debugView.exceptionLabelForeground`: 当调试器在异常处中断时，调用堆栈视图中显示的标签的前景色。
- `debugView.exceptionLabelBackground`: 当调试器在异常处中断时，调用堆栈视图中显示的标签的背景颜色。
- `debugView.stateLabelForeground`: 调用堆栈视图中显示当前会话或线程状态的标签的前景色。
- `debugView.stateLabelBackground`: 调用堆栈视图中显示当前会话或线程状态的标签的背景颜色。
- `debugView.valueChangedHighlight`: 用于在调试视图（例如变量视图）中高亮显示值更改的颜色。
- `debugTokenExpression.name`: 调试视图（例如变量或监视视图）中显示的标记名称的前景色。
- `debugTokenExpression.value`: 调试视图中显示的标记值的前景色。
- `debugTokenExpression.string`: 调试视图中字符串的前景色。
- `debugTokenExpression.boolean`: 调试视图中布尔值的前景色。
- `debugTokenExpression.number`: 调试视图中数字的前景色。
- `debugTokenExpression.error`: 调试视图中表达式错误的前景色。
- `debugTokenExpression.type`: 调试视图（即变量或监视视图）中显示的标记类型的前景色。

## 测试颜色

- `testing.runAction`: 编辑器中“运行”图标的颜色。
- `testing.iconErrored`: 测试资源管理器中“出错”图标的颜色。
- `testing.iconFailed`: 测试资源管理器中“失败”图标的颜色。
- `testing.iconPassed`: 测试资源管理器中“通过”图标的颜色。
- `testing.iconQueued`: 测试资源管理器中“已排队”图标的颜色。
- `testing.iconUnset`: 测试资源管理器中“未设置”图标的颜色。
- `testing.iconSkipped`: 测试资源管理器中“已跳过”图标的颜色。
- `testing.iconErrored.retired`: 测试资源管理器中“出错”图标的过期颜色。
- `testing.iconFailed.retired`: 测试资源管理器中“失败”图标的过期颜色。
- `testing.iconPassed.retired`: 测试资源管理器中“通过”图标的过期颜色。
- `testing.iconQueued.retired`: 测试资源管理器中“已排队”图标的过期颜色。
- `testing.iconUnset.retired`: 测试资源管理器中“未设置”图标的过期颜色。
- `testing.iconSkipped.retired`: 测试资源管理器中“已跳过”图标的过期颜色。
- `testing.peekBorder`: 快速查看边框和箭头的颜色。
- `testing.peekHeaderBackground`: 快速查看边框和箭头的颜色。
- `testing.message.error.lineBackground`: 编辑器中内联显示的错误消息旁边的边距颜色。
- `testing.message.info.decorationForeground`: 编辑器中内联显示的测试信息消息的文本颜色。
- `testing.message.info.lineBackground`: 编辑器中内联显示的信息消息旁边的边距颜色。
- `testing.messagePeekBorder`: 查看记录的消息时快速查看边框和箭头的颜色。
- `testing.messagePeekHeaderBackground`: 查看记录的消息时快速查看边框和箭头的颜色。
- `testing.coveredBackground`: 已覆盖文本的背景颜色。
- `testing.coveredBorder`: 已覆盖文本的边框颜色。
- `testing.coveredGutterBackground`: 代码已覆盖区域的装订线颜色。
- `testing.uncoveredBranchBackground`: 为未覆盖分支显示的小部件的背景。
- `testing.uncoveredBackground`: 未覆盖文本的背景颜色。
- `testing.uncoveredBorder`: 未覆盖文本的边框颜色。
- `testing.uncoveredGutterBackground`: 代码未覆盖区域的装订线颜色。
- `testing.coverCountBadgeBackground`: 指示执行计数的徽章的背景
- `testing.coverCountBadgeForeground`: 指示执行计数的徽章的前景
- `testing.message.error.badgeBackground`: 编辑器中内联显示的测试错误消息的背景颜色。
- `testing.message.error.badgeBorder`: 编辑器中内联显示的测试错误消息的边框颜色。
- `testing.message.error.badgeForeground`: 编辑器中内联显示的测试错误消息的文本颜色。

## 欢迎页面颜色

- `welcomePage.background`: 欢迎页面的背景颜色。
- `welcomePage.progress.background`: 欢迎页面进度条的前景色。
- `welcomePage.progress.foreground`: 欢迎页面进度条的背景颜色。
- `welcomePage.tileBackground`: 欢迎页面上磁贴的背景颜色。
- `welcomePage.tileHoverBackground`: 欢迎页面上磁贴的悬停背景颜色。
- `welcomePage.tileBorder`: 欢迎页面上磁贴的边框颜色。

- `walkThrough.embeddedEditorBackground`: 交互式游乐场上嵌入式编辑器的背景颜色。
- `walkthrough.stepTitle.foreground`: 每个入门指引步骤标题的前景色。

## Git 颜色

- `gitDecoration.addedResourceForeground`: 已添加 Git 资源的颜色。用于文件标签和 SCM 视图。
- `gitDecoration.modifiedResourceForeground`: 已修改 Git 资源的颜色。用于文件标签和 SCM 视图。
- `gitDecoration.deletedResourceForeground`: 已删除 Git 资源的颜色。用于文件标签和 SCM 视图。
- `gitDecoration.renamedResourceForeground`: 已重命名或复制 Git 资源的颜色。用于文件标签和 SCM 视图。
- `gitDecoration.stageModifiedResourceForeground`: 已暂存修改 git 装饰的颜色。用于文件标签和 SCM 视图。
- `gitDecoration.stageDeletedResourceForeground`: 已暂存删除 git 装饰的颜色。用于文件标签和 SCM 视图。
- `gitDecoration.untrackedResourceForeground`: 未跟踪 Git 资源的颜色。用于文件标签和 SCM 视图。
- `gitDecoration.ignoredResourceForeground`: 已忽略 Git 资源的颜色。用于文件标签和 SCM 视图。
- `gitDecoration.conflictingResourceForeground`: 冲突 Git 资源的颜色。用于文件标签和 SCM 视图。
- `gitDecoration.submoduleResourceForeground`: 子模块资源的颜色。
- `git.blame.editorDecorationForeground`: blame 编辑器装饰的颜色。

## 源代码管理图颜色

- `scmGraph.historyItemHoverLabelForeground`: 历史项目悬停标签前景色。
- `scmGraph.foreground1`: 源代码管理图前景色 (1)。
- `scmGraph.foreground2`: 源代码管理图前景色 (2)。
- `scmGraph.foreground3`: 源代码管理图前景色 (3)。
- `scmGraph.foreground4`: 源代码管理图前景色 (4)。
- `scmGraph.foreground5`: 源代码管理图前景色 (5)。
- `scmGraph.historyItemHoverAdditionsForeground`: 历史项目悬停添加前景色。
- `scmGraph.historyItemHoverDeletionsForeground`: 历史项目悬停删除前景色。
- `scmGraph.historyItemRefColor`: 历史项目引用颜色。
- `scmGraph.historyItemRemoteRefColor`: 历史项目远程引用颜色。
- `scmGraph.historyItemBaseRefColor`: 历史项目基础引用颜色。
- `scmGraph.historyItemHoverDefaultLabelForeground`: 历史项目悬停默认标签前景色。
- `scmGraph.historyItemHoverDefaultLabelBackground`: 历史项目悬停默认标签背景颜色。

## 设置编辑器颜色

**注意：** 这些颜色用于 GUI 设置编辑器，可以使用 `Preferences: Open Settings (UI)` 命令打开。

- `settings.headerForeground`: 部分标题或活动标题的前景色。
- `settings.modifiedItemIndicator`: 指示已修改设置的线。
- `settings.dropdownBackground`: 下拉背景。
- `settings.dropdownForeground`: 下拉前景。
- `settings.dropdownBorder`: 下拉边框。
- `settings.dropdownListBorder`: 下拉列表边框。
- `settings.checkboxBackground`: 复选框背景。
- `settings.checkboxForeground`: 复选框前景。
- `settings.checkboxBorder`: 复选框边框。
- `settings.rowHoverBackground`: 悬停时设置行的背景颜色。
- `settings.textInputBackground`: 文本输入框背景。
- `settings.textInputForeground`: 文本输入框前景。
- `settings.textInputBorder`: 文本输入框边框。
- `settings.numberInputBackground`: 数字输入框背景。
- `settings.numberInputForeground`: 数字输入框前景。
- `settings.numberInputBorder`: 数字输入框边框。
- `settings.focusedRowBackground`: 聚焦设置行的背景颜色。
- `settings.focusedRowBorder`: 聚焦行时行的顶部和底部边框的颜色。
- `settings.headerBorder`: 标题容器边框的颜色。
- `settings.sashBorder`: 设置编辑器拆分视图分隔条边框的颜色。
- `settings.settingsHeaderHoverForeground`: 部分标题或悬停标题的前景色。

## 面包屑颜色

面包屑导航的主题颜色：

- `breadcrumb.foreground`: 面包屑项目的颜色。
- `breadcrumb.background`: 面包屑项目的背景颜色。
- `breadcrumb.focusForeground`: 聚焦面包屑项目的颜色。
- `breadcrumb.activeSelectionForeground`: 选定面包屑项目的颜色。
- `breadcrumbPicker.background`: 面包屑项目选择器的背景颜色。

## 代码片段颜色

代码片段的主题颜色：

- `editor.snippetTabstopHighlightBackground`: 代码片段制表位的高亮背景颜色。
- `editor.snippetTabstopHighlightBorder`: 代码片段制表位的高亮边框颜色。
- `editor.snippetFinalTabstopHighlightBackground`: 代码片段最终制表位的高亮背景颜色。
- `editor.snippetFinalTabstopHighlightBorder`: 代码片段最终制表位的高亮边框颜色。

## 符号图标颜色

出现在大纲视图、面包屑导航和建议小部件中的符号图标的主题颜色：

- `symbolIcon.arrayForeground`: 数组符号的前景色。
- `symbolIcon.booleanForeground`: 布尔符号的前景色。
- `symbolIcon.classForeground`: 类符号的前景色。
- `symbolIcon.colorForeground`: 颜色符号的前景色。
- `symbolIcon.constantForeground`: 常量符号的前景色。
- `symbolIcon.constructorForeground`: 构造函数符号的前景色。
- `symbolIcon.enumeratorForeground`: 枚举器符号的前景色。
- `symbolIcon.enumeratorMemberForeground`: 枚举器成员符号的前景色。
- `symbolIcon.eventForeground`: 事件符号的前景色。
- `symbolIcon.fieldForeground`: 字段符号的前景色。
- `symbolIcon.fileForeground`: 文件符号的前景色。
- `symbolIcon.folderForeground`: 文件夹符号的前景色。
- `symbolIcon.functionForeground`: 函数符号的前景色。
- `symbolIcon.interfaceForeground`: 接口符号的前景色。
- `symbolIcon.keyForeground`: 键符号的前景色。
- `symbolIcon.keywordForeground`: 关键字符号的前景色。
- `symbolIcon.methodForeground`: 方法符号的前景色。
- `symbolIcon.moduleForeground`: 模块符号的前景色。
- `symbolIcon.namespaceForeground`: 命名空间符号的前景色。
- `symbolIcon.nullForeground`: 空符号的前景色。
- `symbolIcon.numberForeground`: 数字符号的前景色。
- `symbolIcon.objectForeground`: 对象符号的前景色。
- `symbolIcon.operatorForeground`: 运算符符号的前景色。
- `symbolIcon.packageForeground`: 包符号的前景色。
- `symbolIcon.propertyForeground`: 属性符号的前景色。
- `symbolIcon.referenceForeground`: 参考符号的前景色。
- `symbolIcon.snippetForeground`: 代码片段符号的前景色。
- `symbolIcon.stringForeground`: 字符串符号的前景色。
- `symbolIcon.structForeground`: 结构符号的前景色。
- `symbolIcon.textForeground`: 文本符号的前景色。
- `symbolIcon.typeParameterForeground`: 类型参数符号的前景色。
- `symbolIcon.unitForeground`: 单位符号的前景色。
- `symbolIcon.variableForeground`: 变量符号的前景色。

## 调试图标颜色

- `debugIcon.breakpointForeground`: 断点的图标颜色。
- `debugIcon.breakpointDisabledForeground`: 禁用断点的图标颜色。
- `debugIcon.breakpointUnverifiedForeground`: 未验证断点的图标颜色。
- `debugIcon.breakpointCurrentStackframeForeground`: 当前断点堆栈帧的图标颜色。
- `debugIcon.breakpointStackframeForeground`: 所有断点堆栈帧的图标颜色。
- `debugIcon.startForeground`: 开始调试的调试工具栏图标。
- `debugIcon.pauseForeground`: 暂停的调试工具栏图标。
- `debugIcon.stopForeground`: 停止的调试工具栏图标。
- `debugIcon.disconnectForeground`: 断开连接的调试工具栏图标。
- `debugIcon.restartForeground`: 重启的调试工具栏图标。
- `debugIcon.stepOverForeground`: 步过的调试工具栏图标。
- `debugIcon.stepIntoForeground`: 步入的调试工具栏图标。
- `debugIcon.stepOutForeground`: 步出的调试工具栏图标。
- `debugIcon.continueForeground`: 继续的调试工具栏图标。
- `debugIcon.stepBackForeground`: 后退的调试工具栏图标。

- `debugConsole.infoForeground`: 调试 REPL 控制台中信息消息的前景色。
- `debugConsole.warningForeground`: 调试 REPL 控制台中警告消息的前景色。
- `debugConsole.errorForeground`: 调试 REPL 控制台中错误消息的前景色。
- `debugConsole.sourceForeground`: 调试 REPL 控制台中源文件名的前景色。
- `debugConsoleInputIcon.foreground`: 调试控制台输入标记图标的前景色。

## 笔记本颜色

- `notebook.editorBackground`: 笔记本背景颜色。
- `notebook.cellBorderColor`: 笔记本单元格的边框颜色。
- `notebook.cellHoverBackground`: 单元格悬停时的背景颜色。
- `notebook.cellInsertionIndicator`: 笔记本单元格插入指示器的颜色。
- `notebook.cellStatusBarItemHoverBackground`: 笔记本单元格状态栏项目的背景颜色。
- `notebook.cellToolbarSeparator`: 单元格底部工具栏中分隔符的颜色
- `notebook.cellEditorBackground`: 笔记本单元格编辑器背景的颜色
- `notebook.focusedCellBackground`: 单元格聚焦时的背景颜色。
- `notebook.focusedCellBorder`: 单元格聚焦时单元格焦点指示器边框的颜色。
- `notebook.focusedEditorBorder`: 笔记本单元格编辑器边框的颜色。
- `notebook.inactiveFocusedCellBorder`: 当单元格聚焦而主焦点在编辑器外部时，单元格顶部和底部边框的颜色。
- `notebook.inactiveSelectedCellBorder`: 当选中多个单元格时，单元格边框的颜色。
- `notebook.outputContainerBackgroundColor`: 笔记本输出容器背景的颜色。
- `notebook.outputContainerBorderColor`: 笔记本输出容器的边框颜色。
- `notebook.selectedCellBackground`: 单元格被选中时的背景颜色。
- `notebook.selectedCellBorder`: 当单元格被选中但未聚焦时，单元格顶部和底部边框的颜色。
- `notebook.symbolHighlightBackground`: 高亮单元格的背景颜色
- `notebookScrollbarSlider.activeBackground`: 点击时的笔记本滚动条滑块背景颜色。
- `notebookScrollbarSlider.background`: 笔记本滚动条滑块背景颜色。
- `notebookScrollbarSlider.hoverBackground`: 悬停时的笔记本滚动条滑块背景颜色。
- `notebookStatusErrorIcon.foreground`: 单元格状态栏中笔记本单元格的错误图标颜色。
- `notebookStatusRunningIcon.foreground`: 单元格状态栏中笔记本单元格的运行图标颜色。
- `notebookStatusSuccessIcon.foreground`: 单元格状态栏中笔记本单元格的成功图标颜色。
- `notebookEditorOverviewRuler.runningCellForeground`: 笔记本编辑器概览标尺中正在运行的单元格装饰的颜色。

## 图表颜色

- `charts.foreground`: 图表中文字的对比色。
- `charts.lines`: 图表中线条的颜色。
- `charts.red`: 图表中红色元素的颜色。
- `charts.blue`: 图表中蓝色元素的颜色。
- `charts.yellow`: 图表中黄色元素的颜色。
- `charts.orange`: 图表中橙色元素的颜色。
- `charts.green`: 图表中绿色元素的颜色。
- `charts.purple`: 图表中紫色元素的颜色。
- `chart.line`: 图表的线条颜色。
- `chart.axis`: 图表的轴颜色。
- `chart.guide`: 图表的参考线。

## 端口颜色

- `ports.iconRunningProcessForeground`: 具有关联正在运行进程的端口的图标颜色。

## 评论视图颜色

- `commentsView.resolvedIcon`: 已解决评论的图标颜色。
- `commentsView.unresolvedIcon`: 未解决评论的图标颜色。

## 动作栏颜色

- `actionBar.toggledBackground`: 动作栏中切换动作项的背景颜色。

## 简单查找小部件颜色

- `simpleFindWidget.sashBorder`: 分隔条边框的边框颜色。

## 仪表颜色

- `gauge.background`: 仪表背景颜色。
- `gauge.foreground`: 仪表前景色。
- `gauge.border`: 仪表边框颜色。
- `gauge.warningBackground`: 仪表警告背景颜色。
- `gauge.warningForeground`: 仪表警告前景色。
- `gauge.errorBackground`: 仪表错误背景颜色。
- `gauge.errorForeground`: 仪表错误前景色。

## Markdown

- `markdownAlert.note.foreground`: Markdown 中笔记警报的前景色。
- `markdownAlert.tip.foreground`: Markdown 中提示警报的前景色。
- `markdownAlert.important.foreground`: Markdown 中重要警报的前景色。
- `markdownAlert.warning.foreground`: Markdown 中警告警报的前景色。
- `markdownAlert.caution.foreground`: Markdown 中注意警报的前景色。

## 插件颜色

颜色 ID 也可以由插件通过 [颜色贡献点](/api/references/contribution-points#contributes.colors) 贡献。在 `workbench.colorCustomizations` 设置和颜色主题定义文件中使用代码补全时，这些颜色也会出现。用户可以在 [插件贡献](/docs/configure/extensions/extension-marketplace#extension-details) 选项卡中查看插件定义了哪些颜色。