---
# DO NOT TOUCH — Managed by doc writer

ContentId: 38af73fd-ca95-48e3-9965-81f4cfe29996
DateApproved: 11/12/2025

MetaDescription: Baosky when 子句上下文参考。
---
# when 子句上下文参考

Baosky 会根据 UI 中可见或激活的元素，设置各种上下文键（context keys）和具体的值。这些上下文可用于有选择地启用或禁用插件命令和 UI 元素，例如菜单和视图。

例如，Baosky 使用 when 子句来启用或禁用命令键绑定，您可以在默认键绑定 JSON (**首选项：打开默认键盘快捷方式 (JSON)**) 中看到：

```json
{ "key": "f5",  "command": "workbench.action.debug.start",
                   "when": "debuggersAvailable && !inDebugMode" },
```

在上面，内置的 **开始调试** 命令具有键盘快捷键 `kb(workbench.action.debug.start)`，仅当有合适的调试器可用（上下文键 `debuggersAvailable` 为 true）且编辑器未处于调试模式（上下文键 `inDebugMode` 为 false）时才启用。

## 条件运算符

when 子句可以包含一个上下文键（例如 `inDebugMode`）或使用各种运算符来表达更细微的编辑器状态。

### 逻辑运算符

逻辑运算符允许组合简单的上下文键或包含其他逻辑、相等、比较、匹配、`in`/`not in` 运算符或括号表达式的 when 子句表达式。

| 运算符 | 符号 | 示例 |
| :--- | :--- | :--- |
| 非 | `!` | `"!editorReadonly"` 或 <code>"!(editorReadonly || inDebugMode)"</code> |
| 与 | `&&` | `"textInputFocus && !editorReadonly"` |
| 或 | <code>||</code> | `"isLinux`<code> || </code>`isWindows"` |

关于逻辑运算符优先级的说明：上表按优先级从高到低的顺序列出了运算符。示例：

| 写法 | 解释为 |
| :--- | :--- |
| `!foo && bar` | `(!foo) && bar` |
| <code>!foo || bar </code> | <code>(!foo) || bar</code> |
| <code>foo || bar && baz </code> | <code>foo || (bar && baz)</code> |
| <code>!foo && bar || baz </code> | <code>(!foo && bar) || baz</code> |
| <code>!(foo || bar) && baz </code> | <code>(保持不变) !(foo || bar) && baz</code> |

### 相等运算符

您可以检查上下文键的值是否等于指定值。请注意，右侧是一个值，不被解释为上下文键，这意味着不在上下文中查找它。

| 运算符 | 符号 | 示例 |
| :--- | :--- | :--- |
| 等于 | `==` | `"editorLangId == typescript"` 或 `"editorLangId == 'typescript'"` |
| 不等于 | `!=` | `"resourceExtname != .js"` 或 `"resourceExtname != '.js'"` |

注意：

* 如果右侧的值是包含空格的字符串，则必须用单引号括起来 - `"resourceFilename == 'My New File.md'"`。
* `===` 具有与 `==` 相同的行为，`!==` 具有与 `!=` 相同的行为

### 比较运算符

您可以将上下文键的值与数字进行比较。请注意，运算符的左侧和右侧必须用空格分隔 - `foo < 1`，但不能是 `foo<1`。

| 运算符 | 符号 | 示例 |
| :--- | :--- | :--- |
| 大于 | `>`, `>=` | `"gitOpenRepositoryCount >= 1"` 但不是 `"gitOpenRepositoryCount>=1"` |
| 小于 | `<`, `<=` | `"workspaceFolderCount < 2"` 但不是 `"workspaceFolderCount<2"` |

### 匹配运算符

(以前的名称：键值对匹配运算符)

| 运算符 | 符号 | 示例 |
| :--- | :--- | :--- |
| 匹配 | `=~` | `"resourceScheme =~ /^untitled$\|^file$/"` |

when 子句有一个匹配运算符 (`=~`)。表达式 `key =~ regularExpressionLiteral` 将右侧视为正则表达式字面量，以匹配左侧。例如，要为所有 Docker 文件贡献上下文菜单项，可以使用：

```json
   "when": "resourceFilename =~ /docker/"
```

注意：

* `=~` 运算符的右侧遵循与 JavaScript 中正则表达式字面量相同的规则 ([参考](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Regular_Expressions#creating_a_regular_expression))，除了字符需要遵循 JSON 字符串和正则表达式的转义规则。例如，在 JavaScript 中匹配子字符串 `file://` 的正则表达式字面量为 `/file:\/\//`，但在 when 子句中为 `/file:\\/\\//`，因为反斜杠需要在 JSON 字符串中转义，斜杠需要在正则表达式模式中转义。
* 不存在运算符 `!=~`，但您可以否定匹配表达式 - `!(foo =~ /baz/)`。

#### 正则表达式标志

可以在正则表达式字面量中使用标志。例如，`resourceFilename =~ /json/i` 或 `myContextKey =~ /baz/si`。

支持的标志：`i`, `s`, `m`, `u`。

忽略的标志：`g`, `y`。 &lt;!-- 让我们更明确地指出不支持的标志 --&gt;

### 'in' 和 'not in' 条件运算符

when 子句的 `in` 运算符允许在另一个上下文键的值中动态查找上下文键的值。例如，如果您想向包含特定类型文件的文件夹（或无法静态知道的内容）添加上下文菜单命令，您现在可以使用 `in` 运算符来实现。您可以使用 `not in` 运算符来检查相反的条件。

| 运算符 | 符号 | 示例 |
| :--- | :--- | :--- |
| 在...中 | `in` | `"resourceFilename in supportedFolders"` |
| 不在...中 | `not in` | `"resourceFilename not in supportedFolders"` |

首先，确定哪些文件夹应支持该命令，并将文件夹名称添加到数组中。然后，使用 [`code` 命令](#add-a-custom-when-clause-context) 将数组转换为上下文键：

```ts
vscode.commands.executeCommand('setContext', 'ext.supportedFolders', [ 'test', 'foo', 'bar' ]);

// 或者

// 注意在这种情况下（使用对象），值无关紧要，它基于对象中键的存在
// 值必须是简单类型
vscode.commands.executeCommand('setContext', 'ext.supportedFolders', { 'test': true, 'foo': 'anything', 'bar': false });
```

然后，在 `package.json` 中，您可以为 `explorer/context` 菜单添加菜单贡献：

```json
// 注意，这假设您已经定义了一个名为 ext.doSpecial 的命令
"menus": {
  "explorer/context": [
    {
      "command": "ext.doSpecial",
      "when": "explorerResourceIsFolder && resourceFilename in ext.supportedFolders"
    }
  ]
}
```

在该示例中，我们要获取 `resourceFilename` 的值（在本例中为文件夹的名称）并检查其是否存在于 `ext.supportedFolders` 的值中。如果存在，将显示菜单。这个强大的运算符应该允许更丰富的条件和动态贡献，支持 `when` 子句，例如菜单、视图等。

&lt;!-- TODO@ulugbekna: 最好有一个“更高级表达式示例”部分，其中包含一些使用多个运算符的示例 --&gt;

## 可用上下文键列表

&lt;!-- @ulugbekna: 我们是否应该在页面开头的某个地方提及此列表，但将列表本身移动到底部作为附录？ --&gt;

以下是一些可用的上下文键，它们的计算结果为布尔值 true/false。

此处的列表并不详尽，您可以通过在键盘快捷方式编辑器 (**首选项：打开键盘快捷方式**) 中搜索和过滤或查看默认键绑定 JSON 文件 (**首选项：打开默认键盘快捷方式 (JSON)**) 来找到其他 when 子句上下文。您还可以使用 [检查上下文键实用程序](#inspect-context-keys-utility) 识别您感兴趣的上下文键。

| 上下文名称 | 为 True 当 |
| :--- | :--- |
| **编辑器上下文** | |
| `editorFocus` | 编辑器具有焦点，无论是文本还是小部件。 |
| `editorTextFocus` | 编辑器中的文本具有焦点（光标在闪烁）。 |
| `textInputFocus` | 任何编辑器具有焦点（常规编辑器、调试 REPL 等）。 |
| `inputFocus` | 任何文本输入区域具有焦点（编辑器或文本框）。 |
| `editorTabMovesFocus` | `kbstyle(Tab)` 是否会将焦点移出编辑器。 |
| `editorHasSelection` | 编辑器中选择了文本。 |
| `editorHasMultipleSelections` | 选择了多个文本区域（多光标）。 |
| `editorReadonly` | 编辑器是只读的。 |
| `editorLangId` | 当编辑器的关联 [语言 ID](/docs/languages/identifiers) 匹配时为 True。<br />示例：`"editorLangId == typescript"`。 |
| `isInDiffEditor` | 活动编辑器是差异编辑器。 |
| `isInEmbeddedEditor` | 当焦点位于嵌入式编辑器内部时为 True。 |
| **操作系统上下文** | |
| `isLinux` | 当操作系统是 Linux 时为 True。 |
| `isMac` | 当操作系统是 macOS 时为 True。 |
| `isWindows` | 当操作系统是 Windows 时为 True。 |
| `isWeb` | 当从 Web 访问编辑器时为 True。 |
| **列表上下文** | |
| `listFocus` | 列表具有焦点。 |
| `listSupportsMultiselect` | 列表支持多选。 |
| `listHasSelectionOrFocus` | 列表具有选择或焦点。 |
| `listDoubleSelection` | 列表选择了 2 个元素。 |
| `listMultiSelection` | 列表选择了多个元素。 |
| **模式上下文** | |
| `inSnippetMode` | 编辑器处于代码片段模式。 |
| `inQuickOpen` | 快速打开下拉列表具有焦点。 |
| **资源上下文** | |
| `resourceScheme` | 当资源 Uri scheme 匹配时为 True。<br />示例：`"resourceScheme == file"` |
| `resourceFilename` | 当资源管理器或编辑器文件名匹配时为 True。<br />示例：`"resourceFilename == gulpfile.js"` |
| `resourceExtname` | 当资源管理器或编辑器文件扩展名匹配时为 True。<br />示例：`"resourceExtname == .js"` |
| `resourceDirname` | 当资源管理器或编辑器的资源绝对文件夹路径匹配时为 True。<br />示例：`"resourceDirname == /users/alice/project/src"` |
| `resourcePath` | 当资源管理器或编辑器的资源绝对路径匹配时为 True。<br />示例：`"resourcePath == /users/alice/project/gulpfile.js"` |
| `resourceLangId` | 当资源管理器或编辑器标题 [语言 ID](/docs/languages/identifiers) 匹配时为 True。<br />示例：`"resourceLangId == markdown"` |
| `isFileSystemResource` | 当资源管理器或编辑器文件是可以从文件系统提供程序处理的文件系统资源时为 True。 |
| `resourceSet` | 当设置了资源管理器或编辑器文件时为 True。 |
| `resource` | 资源管理器或编辑器文件的完整 Uri。 |
| **资源管理器上下文** | |
| `explorerViewletVisible` | 如果资源管理器视图可见，则为 True。 |
| `explorerViewletFocus` | 如果资源管理器视图具有键盘焦点，则为 True。 |
| `filesExplorerFocus` | 如果文件资源管理器部分具有键盘焦点，则为 True。 |
| `openEditorsFocus` | 如果打开的编辑器部分具有键盘焦点，则为 True。 |
| `explorerResourceIsFolder` | 如果在资源管理器中选择了文件夹，则为 True。 |
| **编辑器小部件上下文** | |
| `findWidgetVisible` | 编辑器查找小部件可见。 |
| `suggestWidgetVisible` | 建议小部件 (IntelliSense) 可见。 |
| `suggestWidgetMultipleSuggestions` | 显示多个建议。 |
| `renameInputVisible` | 重命名输入文本框可见。 |
| `referenceSearchVisible` | 快速查看引用窗口已打开。 |
| `inReferenceSearchEditor` | 快速查看引用窗口编辑器具有焦点。 |
| `config.editor.stablePeek` | 保持快速查看编辑器打开（由 `editor.stablePeek` 设置控制）。 |
| `codeActionMenuVisible` | 代码操作菜单可见。 |
| `parameterHintsVisible` | 参数提示可见（由 `editor.parameterHints.enabled` 设置控制）。 |
| `parameterHintsMultipleSignatures` | 显示多个参数提示。 |
| **调试器上下文** | |
| `debuggersAvailable` | 有合适的调试器插件可用。 |
| `inDebugMode` | 正在运行调试会话。 |
| `debugState` | 活动调试器状态。<br />可能的值为 `inactive`, `initializing`, `stopped`, `running`。 |
| `debugType` | 当调试类型匹配时为 True。<br />示例：`"debugType == 'node'"`。 |
| `inDebugRepl` | 焦点在调试控制台 REPL 中。 |
| **集成终端上下文** | |
| `terminalFocus` | 集成终端具有焦点。 |
| `terminalIsOpen` | 集成终端已打开。 |
| **时间线视图上下文** | |
| `timelineFollowActiveEditor` | 如果时间线视图跟随活动编辑器，则为 True。 |
| **时间线视图项目上下文** | |
| `timelineItem` | 当时间线项目的上下文值匹配时为 True。<br />示例：`"timelineItem =~ /git:file:commit\\b/"`。 |
| **插件上下文** | |
| `extension` | 当插件的 ID 匹配时为 True。<br />示例：`"extension == eamodio.gitlens"`。 |
| `extensionStatus` | 当插件已安装时为 True。<br />示例：`"extensionStatus == installed"`。 |
| `extensionHasConfiguration` | 如果插件具有配置，则为 True。 |
| **全局 UI 上下文** | |
| `notificationFocus` | 通知具有键盘焦点。 |
| `notificationCenterVisible` | 通知中心在 Baosky 右下角可见。 |
| `notificationToastsVisible` | 通知 toast 在 Baosky 右下角可见。 |
| `searchViewletVisible` | 搜索视图已打开。 |
| `sideBarVisible` | 侧边栏已显示。 |
| `sideBarFocus` | 侧边栏具有焦点。 |
| `panelFocus` | 面板具有焦点。 |
| `inZenMode` | 窗口处于禅模式。 |
| `isCenteredLayout` | 编辑器处于居中布局模式。 |
| `workbenchState` | 可以是 `empty`, `folder` (1 个文件夹), 或 `workspace`。 |
| `workspaceFolderCount` | 工作区文件夹的数量。 |
| `replaceActive` | 搜索视图替换文本框已打开。 |
| `view` | 对于 `view/title` 和 `view/item/context`，要在其中显示命令的视图。<br />示例：`"view == myViewsExplorerID"`。 |
| `viewItem` | 对于 `view/item/context`，来自树项目的 `contextValue`。<br />示例： `"viewItem == someContextValue"`。 |
| `webviewId` | 对于 `webview/context`，要在其中显示命令的 webview ID。<br />示例：`"webviewId == catCoding"`。 |
| `isFullscreen` | 当窗口处于全屏时为 True。 |
| `focusedView` | 当前聚焦视图的标识符。 |
| `canNavigateBack` | 如果可以向后导航，则为 True。 |
| `canNavigateForward` | 如果可以向前导航，则为 True。 |
| `canNavigateToLastEditLocation` | 如果可以导航到上次编辑位置，则为 True。 |
| **全局编辑器 UI 上下文** | |
| `textCompareEditorVisible` | 至少有一个差异（比较）编辑器可见。 |
| `textCompareEditorActive` | 差异（比较）编辑器处于活动状态。 |
| `editorIsOpen` | 如果打开了一个编辑器，则为 True。 |
| `groupEditorsCount` | 组中编辑器的数量。 |
| `activeEditorGroupEmpty` | 如果活动编辑器组没有编辑器，则为 True。 |
| `activeEditorGroupIndex` | 一个从 `1` 开始的数字，反映编辑器组在编辑器网格中的位置。<br />索引为 `1` 的组将是左上角的第一个组。 |
| `activeEditorGroupLast` | 对于编辑器网格中的最后一个编辑器组，将为 `true`。 |
| `multipleEditorGroups` | 当存在多个编辑器组时为 True。 |
| `activeEditor` | 组中活动编辑器的标识符。 |
| `activeEditorIsDirty` | 当组中的活动编辑器为脏（未保存）时为 True。 |
| `activeEditorIsNotPreview` | 当组中的活动编辑器不处于预览模式时为 True。 |
| `activeEditorIsPinned` | 当组中的活动编辑器已固定时为 True。 |
| `inSearchEditor` | 当焦点在搜索编辑器内时为 True。 |
| `activeWebviewPanelId` | 当前活动 [webview 面板](/api/extension-guides/webview) 的 id。 |
| `activeCustomEditorId` | 当前活动 [自定义编辑器](/api/extension-guides/custom-editors) 的 id。 |
| **配置设置上下文** | |
| `config.editor.minimap.enabled` | 当设置 `editor.minimap.enabled` 为 `true` 时为 True。 |

> **注意**：您可以在此处使用任何计算结果为布尔值的用户或工作区设置，并加上前缀 `"config."`。

## 可见/聚焦视图 when 子句上下文

您可以有一个 when 子句来检查特定 [视图](/api/ux-guidelines/views) 是否可见或聚焦。

| 上下文名称 | 为 True 当 |
| :--- | :--- |
| `view.${viewId}.visible` | 当特定视图可见时为 True。<br />示例：`"view.workbench.explorer.fileView.visible"` |
| `focusedView` | 当特定视图聚焦时为 True。<br />示例：`"focusedView == 'workbench.explorer.fileView'"` |

视图标识符：

* `workbench.explorer.fileView` - 文件资源管理器
* `workbench.explorer.openEditorsView` - 打开的编辑器
* `outline` - 大纲视图
* `timeline` - 时间线视图
* `workbench.scm` - 源代码管理
* `workbench.scm.repositories` - 源代码管理存储库
* `workbench.debug.variablesView` - 变量
* `workbench.debug.watchExpressionsView` - 监视
* `workbench.debug.callStackView` - 调用堆栈
* `workbench.debug.loadedScriptsView` - 已加载脚本
* `workbench.debug.breakPointsView` - 断点
* `workbench.debug.disassemblyView` - 反汇编
* `workbench.views.extensions.installed` - 已安装的插件
* `extensions.recommendedList` - 推荐的插件
* `workbench.panel.markers.view` - 问题
* `workbench.panel.output` - 输出
* `workbench.panel.repl.view` - 调试控制台
* `terminal` - 集成终端
* `workbench.panel.comments` - 评论

## 可见视图容器 when 子句上下文

您可以有一个 when 子句来检查特定 [视图容器](/api/ux-guidelines/views#view-containers) 是否可见

| 上下文名称 | 为 True 当 |
| :--- | :--- |
| `activeViewlet` | 当视图容器在侧边栏中可见时为 True。<br />示例：`"activeViewlet == 'workbench.view.explorer'"` |
| `activePanel` | 当视图容器在面板中可见时为 True。<br />示例：`"activePanel == 'workbench.panel.output'"` |
| `activeAuxiliary` | 当视图容器在辅助侧边栏中可见时为 True。<br />示例：`"activeAuxiliary == 'workbench.view.debug'"` |

视图容器标识符：

* `workbench.view.explorer` - 文件资源管理器
* `workbench.view.search` - 搜索
* `workbench.view.scm` - 源代码管理
* `workbench.view.debug` - 运行
* `workbench.view.extensions` - 插件
* `workbench.panel.markers` - 问题
* `workbench.panel.output` - 输出
* `workbench.panel.repl` - 调试控制台
* `terminal` - 集成终端
* `workbench.panel.comments` - 评论

如果您想要一个仅在特定视图容器具有焦点时才启用的 when 子句，请结合使用 `sideBarFocus` 或 `panelFocus` 或 `auxiliaryBarFocus` 与 `activeViewlet` 或 `activePanel` 或 `activeAuxiliary` 上下文键。

例如，下面的 when 子句仅当文件资源管理器具有焦点时才为 true：

```json
"sideBarFocus && activeViewlet == 'workbench.view.explorer'"
```

## 在 when 子句中检查设置

在 when 子句中，您可以通过添加前缀 `config.` 来引用配置（设置）值，例如 `config.editor.tabCompletion` 或 `config.breadcrumbs.enabled`。

## 添加自定义 when 子句上下文

如果您正在编写自己的 Baosky 插件，并且需要使用 when 子句上下文启用/禁用命令、菜单或视图，而现有键都不符合您的需求，您可以使用 `setContext` 命令添加自己的上下文键。

The first example below sets the key `myExtension.showMyCommand` to true, which you can use in enablement of commands or with the `when` property. The second example stores a value that you could use with a when clause to check if the number of cool open things is greater than 2.

```js
vscode.commands.executeCommand('setContext', 'myExtension.showMyCommand', true);

vscode.commands.executeCommand('setContext', 'myExtension.numberOfCoolOpenThings', 4);
```

## Inspect Context Keys utility

If you would like to see all currently active context keys at runtime, you can use the **Developer: Inspect Context Keys** command from the Command Palette (`kb(workbench.action.showCommands)`). **Inspect Context Keys** will display context keys and their values in the Baosky Developer Tools **Console** tab (**Help** > **Toggle Developer Tools**).

When you run **Developer: Inspect Context Keys**, your cursor will highlight elements in the Baosky UI and when you click on an element, the current context keys and their states will be output as an object to the Console.

<!-- 图片已移除 -->

The list of active context keys is extensive and may contain [custom context keys](#add-a-custom-when-clause-context) from extensions you have installed.

> **Note**: Some context keys are for Baosky internal use and may change in the future.