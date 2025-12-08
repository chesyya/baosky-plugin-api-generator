---
# DO NOT TOUCH — Managed by doc writer

ContentId: A010AEDF-EF37-406E-96F5-E129408FFDE1
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: Baosky 内置命令参考。
---

# 内置命令手册

本文档精选了一些 Baosky 命令，您可以通过 `vscode.commands.executeCommand` API 来调用它们。

关于如何使用命令 API，请参阅 [命令指南](/api/extension-guides/command)。

以下示例展示了如何在 Baosky 中打开一个新文件夹：

```javascript
let uri = Uri.file('/some/path/to/folder');
let success = await commands.executeCommand('vscode.openFolder', uri);
```

> **注意**：您可以通过键盘快捷方式编辑器（**文件** > **首选项** > **键盘快捷方式**）查看 Baosky 的所有命令。该编辑器列出了 Baosky 内置的以及由插件贡献的所有命令，同时还显示了它们的快捷键绑定和可见性 `when` 子句。

## 命令列表

`vscode.executeDataToNotebook` - 调用笔记本序列化器

* _notebookType_ - 笔记本类型
* _data_ - 需要转换的字节数据
* _(返回值)_ - 笔记本数据 (Notebook Data)

`vscode.executeNotebookToData` - 调用笔记本序列化器

* _notebookType_ - 笔记本类型
* _NotebookData_ - 需要转换为字节的笔记本数据
* _(返回值)_ - 字节数据 (Bytes)

`notebook.selectKernel` - 为指定的笔记本编辑器小部件触发内核选择器

* _options_ - 选择内核的选项
* _(返回值)_ - 无返回值

`interactive.open` - 打开交互式窗口并返回笔记本编辑器及输入 URI

* _showOptions_ - 显示选项
* _resource_ - 交互式资源 Uri
* _controllerId_ - 笔记本控制器 Id
* _title_ - 交互式编辑器标题
* _(返回值)_ - 笔记本和输入 URI

`vscode.editorChat.start` - 启动新的编辑器聊天会话

* _Run arguments_ - 运行参数
* _(返回值)_ - 无返回值

`vscode.executeDocumentHighlights` - 执行文档高亮提供程序。

* _uri_ - 文本文档的 Uri
* _position_ - 文本文档中的位置
* _(返回值)_ - 一个 Promise，解析为 DocumentHighlight 实例数组。

`vscode.executeDocumentSymbolProvider` - 执行文档符号提供程序。

* _uri_ - 文本文档的 Uri
* _(返回值)_ - 一个 Promise，解析为 SymbolInformation 和 DocumentSymbol 实例数组。

`vscode.executeFormatDocumentProvider` - 执行文档格式化提供程序。

* _uri_ - 文本文档的 Uri
* _options_ - 格式化选项
* _(返回值)_ - 一个 Promise，解析为 TextEdits 数组。

`vscode.executeFormatRangeProvider` - 执行范围格式化提供程序。

* _uri_ - 文本文档的 Uri
* _range_ - 文本文档中的范围
* _options_ - 格式化选项
* _(返回值)_ - 一个 Promise，解析为 TextEdits 数组。

`vscode.executeFormatOnTypeProvider` - 执行输入时格式化提供程序。

* _uri_ - 文本文档的 Uri
* _position_ - 文本文档中的位置
* _ch_ - 触发字符
* _options_ - 格式化选项
* _(返回值)_ - 一个 Promise，解析为 TextEdits 数组。

`vscode.executeDefinitionProvider` - 执行所有定义提供程序。

* _uri_ - 文本文档的 Uri
* _position_ - 文本文档中的位置
* _(返回值)_ - 一个 Promise，解析为 Location 或 LocationLink 实例数组。

`vscode.executeTypeDefinitionProvider` - 执行所有类型定义提供程序。

* _uri_ - 文本文档的 Uri
* _position_ - 文本文档中的位置
* _(返回值)_ - 一个 Promise，解析为 Location 或 LocationLink 实例数组。

`vscode.executeDeclarationProvider` - 执行所有声明提供程序。

* _uri_ - 文本文档的 Uri
* _position_ - 文本文档中的位置
* _(返回值)_ - 一个 Promise，解析为 Location 或 LocationLink 实例数组。

`vscode.executeImplementationProvider` - 执行所有实现提供程序。

* _uri_ - 文本文档的 Uri
* _position_ - 文本文档中的位置
* _(返回值)_ - 一个 Promise，解析为 Location 或 LocationLink 实例数组。

`vscode.executeReferenceProvider` - 执行所有引用提供程序。

* _uri_ - 文本文档的 Uri
* _position_ - 文本文档中的位置
* _(返回值)_ - 一个 Promise，解析为 Location 实例数组。

`vscode.executeHoverProvider` - 执行所有悬停提示提供程序。

* _uri_ - 文本文档的 Uri
* _position_ - 文本文档中的位置
* _(返回值)_ - 一个 Promise，解析为 Hover 实例数组。

`vscode.executeSelectionRangeProvider` - 执行选择范围提供程序。

* _uri_ - 文本文档的 Uri
* _position_ - 文本文档中的位置
* _(返回值)_ - 一个 Promise，解析为 ranges 数组。

`vscode.executeWorkspaceSymbolProvider` - 执行所有工作区符号提供程序。

* _query_ - 搜索字符串
* _(返回值)_ - 一个 Promise，解析为 SymbolInformation 实例数组。

`vscode.prepareCallHierarchy` - 在文档内的某个位置准备调用层次结构

* _uri_ - 文本文档的 Uri
* _position_ - 文本文档中的位置
* _(返回值)_ - 一个 Promise，解析为 CallHierarchyItem 实例数组

`vscode.provideIncomingCalls` - 计算某一项的传入调用

* _item_ - 调用层次结构项
* _(返回值)_ - 一个 Promise，解析为 CallHierarchyIncomingCall 实例数组

`vscode.provideOutgoingCalls` - 计算某一项的传出调用

* _item_ - 调用层次结构项
* _(返回值)_ - 一个 Promise，解析为 CallHierarchyOutgoingCall 实例数组

`vscode.prepareRename` - 执行重命名提供程序的准备重命名操作。

* _uri_ - 文本文档的 Uri
* _position_ - 文本文档中的位置
* _(返回值)_ - 一个 Promise，解析为范围和占位符文本。

`vscode.executeDocumentRenameProvider` - 执行重命名提供程序。

* _uri_ - 文本文档的 Uri
* _position_ - 文本文档中的位置
* _newName_ - 新的符号名称
* _(返回值)_ - 一个 Promise，解析为 WorkspaceEdit。

`vscode.executeLinkProvider` - 执行文档链接提供程序。

* _uri_ - 文本文档的 Uri
* _linkResolveCount_ - (可选) 需要解析的链接数量，仅当链接未解析时使用。
* _(返回值)_ - 一个 Promise，解析为 DocumentLink 实例数组。

`vscode.provideDocumentSemanticTokensLegend` - 为文档提供语义标记图例

* _uri_ - 文本文档的 Uri
* _(返回值)_ - 一个 Promise，解析为 SemanticTokensLegend。

`vscode.provideDocumentSemanticTokens` - 为文档提供语义标记

* _uri_ - 文本文档的 Uri
* _(返回值)_ - 一个 Promise，解析为 SemanticTokens。

`vscode.provideDocumentRangeSemanticTokensLegend` - 为文档范围提供语义标记图例

* _uri_ - 文本文档的 Uri
* _range_ - (可选) 文本文档中的范围
* _(返回值)_ - 一个 Promise，解析为 SemanticTokensLegend。

`vscode.provideDocumentRangeSemanticTokens` - 为文档范围提供语义标记

* _uri_ - 文本文档的 Uri
* _range_ - 文本文档中的范围
* _(返回值)_ - 一个 Promise，解析为 SemanticTokens。

`vscode.executeCompletionItemProvider` - 执行补全项提供程序。

* _uri_ - 文本文档的 Uri
* _position_ - 文本文档中的位置
* _triggerCharacter_ - (可选) 触发补全的字符，例如 `,` 或 `(`
* _itemResolveCount_ - (可选) 要解析的补全项数量（数量过大会降低补全速度）
* _(返回值)_ - 一个 Promise，解析为 CompletionList 实例。

`vscode.executeSignatureHelpProvider` - 执行签名帮助提供程序。

* _uri_ - 文本文档的 Uri
* _position_ - 文本文档中的位置
* _triggerCharacter_ - (可选) 触发签名帮助的字符，例如 `,` 或 `(`
* _(返回值)_ - 一个 Promise，解析为 SignatureHelp。

`vscode.executeCodeLensProvider` - 执行 Code Lens 提供程序。

* _uri_ - 文本文档的 Uri
* _itemResolveCount_ - (可选) 应解析并返回的 lens 数量。仅返回已解析的 lens，会影响性能
* _(返回值)_ - 一个 Promise，解析为 CodeLens 实例数组。

`vscode.executeCodeActionProvider` - 执行代码操作提供程序。

* _uri_ - 文本文档的 Uri
* _rangeOrSelection_ - 文本文档中的范围。某些重构提供程序需要 Selection 对象。
* _kind_ - (可选) 要返回的代码操作类型
* _itemResolveCount_ - (可选) 要解析的代码操作数量（数量过大会降低代码操作速度）
* _(返回值)_ - 一个 Promise，解析为 Command 实例数组。

`vscode.executeDocumentColorProvider` - 执行文档颜色提供程序。

* _uri_ - 文本文档的 Uri
* _(返回值)_ - 一个 Promise，解析为 ColorInformation 对象数组。

`vscode.executeColorPresentationProvider` - 执行颜色呈现提供程序。

* _color_ - 要显示和插入的颜色
* _context_ - 包含 uri 和 range 的上下文对象
* _(返回值)_ - 一个 Promise，解析为 ColorPresentation 对象数组。

`vscode.executeInlayHintProvider` - 执行内联提示提供程序

* _uri_ - 文本文档的 Uri
* _range_ - 文本文档中的范围
* _(返回值)_ - 一个 Promise，解析为 Inlay 对象数组

`vscode.executeFoldingRangeProvider` - 执行折叠范围提供程序

* _uri_ - 文本文档的 Uri
* _(返回值)_ - 一个 Promise，解析为 FoldingRange 对象数组

`vscode.resolveNotebookContentProviders` - 解析笔记本内容提供程序

* _(返回值)_ - 一个 Promise，解析为 NotebookContentProvider 静态信息对象数组。

`vscode.executeInlineValueProvider` - 执行内联值提供程序

* _uri_ - 文本文档的 Uri
* _range_ - 文本文档中的范围
* _context_ - InlineValueContext 上下文
* _(返回值)_ - 一个 Promise，解析为 InlineValue 对象数组

`vscode.open` - 在编辑器中打开提供的资源。可以是文本或二进制文件，或者是 http(s) URL。如果您需要更多控制打开文本文件的选项，请改用 `vscode.window.showTextDocument`。

* _uri_ - 文本或二进制文件，或 http(s) URL 的 Uri
* _columnOrOptions_ - (可选) 打开的列，或编辑器选项，参见 `vscode.TextDocumentShowOptions`
* _label_ - 编辑器标签 (可选)
* _(返回值)_ - 无返回值

`vscode.openWith` - 使用特定编辑器打开提供的资源。

* _resource_ - 要打开的资源
* _viewId_ - 自定义编辑器视图 id 或 'default' 以使用 Baosky 的默认编辑器
* _columnOrOptions_ - (可选) 打开的列或编辑器选项，参见 baosky.TextDocumentShowOptions
* _(返回值)_ - 无返回值

`vscode.diff` - 在差异编辑器中打开提供的资源以比较其内容。

* _left_ - 差异编辑器的左侧资源
* _right_ - 差异编辑器的右侧资源
* _title_ - 差异编辑器的可读标题
* _options_ - (可选) 打开的列，或编辑器选项 (参见 baosky.TextDocumentShowOptions)

`vscode.changes` - 在变更编辑器中打开资源列表以比较其内容。

* _title_ - 变更编辑器的可读标题
* _resourceList_ - 要比较的资源列表

`vscode.prepareTypeHierarchy` - 在文档内的某个位置准备类型层次结构

* _uri_ - 文本文档的 Uri
* _position_ - 文本文档中的位置
* _(返回值)_ - 一个 Promise，解析为 TypeHierarchyItem 实例数组

`vscode.provideSupertypes` - 计算某一项的超类型

* _item_ - 类型层次结构项
* _(返回值)_ - 一个 Promise，解析为 TypeHierarchyItem 实例数组

`vscode.provideSubtypes` - 计算某一项的子类型

* _item_ - 类型层次结构项
* _(返回值)_ - 一个 Promise，解析为 TypeHierarchyItem 实例数组

`vscode.revealTestInExplorer` - 在资源管理器中显示测试实例

* _testItem_ - Baosky TestItem。
* _(返回值)_ - 无返回值

`setContext` - 设置自定义上下文键值，可用于 when 子句。

* _name_ - 上下文键名称
* _value_ - 上下文键值
* _(返回值)_ - 无返回值

`cursorMove` - 将光标移动到视图中的逻辑位置

* _光标移动参数对象_ - 可以通过此参数传递的属性-值对：
  * 'to': 强制性的逻辑位置值，指定光标移动的目的地。
    ```
    'left', 'right', 'up', 'down', 'prevBlankLine', 'nextBlankLine',
    'wrappedLineStart', 'wrappedLineEnd', 'wrappedLineColumnCenter'
    'wrappedLineFirstNonWhitespaceCharacter', 'wrappedLineLastNonWhitespaceCharacter'
    'viewPortTop', 'viewPortCenter', 'viewPortBottom', 'viewPortIfOutside'
    ```
  * 'by': 移动单位。默认基于 'to' 值计算。
    ```
    'line', 'wrappedLine', 'character', 'halfLine'
    ```
  * 'value': 移动的单位数量。默认为 '1'。
  * 'select': 如果为 'true'，则进行选择。默认为 'false'。

`editorScroll` - 在给定方向上滚动编辑器

* _编辑器滚动参数对象_ - 可以通过此参数传递的属性-值对：
  * 'to': 强制性的方向值。
    ```
    'up', 'down'
    ```
  * 'by': 移动单位。默认基于 'to' 值计算。
    ```
    'line', 'wrappedLine', 'page', 'halfPage', 'editor'
    ```
  * 'value': 移动的单位数量。默认为 '1'。
  * 'revealCursor': 如果为 'true'，则在光标位于视口外时显示光标。

`revealLine` - 在给定的逻辑位置显示给定的行

* _显示行参数对象_ - 可以通过此参数传递的属性-值对：
  * 'lineNumber': 强制性的行号值。
  * 'at': 行被显示的逻辑位置。
    ```
    'top', 'center', 'bottom'
    ```

`editor.unfold` - 展开编辑器中的内容

* _展开编辑器参数_ - 可以通过此参数传递的属性-值对：
  * 'levels': 要展开的层级数。如果未设置，默认为 1。
  * 'direction': 如果为 'up'，则向上展开给定数量的层级，否则向下展开。
  * 'selectionLines': 应用展开操作的编辑器选择的起始行（从 0 开始）数组。如果未设置，将使用当前活动的选择。

`editor.fold` - 折叠编辑器中的内容

* _折叠编辑器参数_ - 可以通过此参数传递的属性-值对：
  * 'levels': 要折叠的层级数。
  * 'direction': 如果为 'up'，则向上折叠给定数量的层级，否则向下折叠。
  * 'selectionLines': 应用折叠操作的编辑器选择的起始行（从 0 开始）数组。如果未设置，将使用当前活动的选择。
  如果未设置 levels 或 direction，则在位置处折叠区域，或者如果已经折叠，则折叠第一个未折叠的父级。

`editor.toggleFold` - 根据当前状态折叠或展开编辑器中的内容

`editor.actions.findWithArgs` - 打开具有特定选项的新编辑器内查找小部件。

* searchString - 用于预填充查找输入的字符串
* replaceString - 用于预填充替换输入的字符串
* isRegex - 启用正则表达式
* preserveCase - 替换时尝试保留相同的大小写
* findInSelection - 限制查找位置为当前选择
* matchWholeWord - 全字匹配
* isCaseSensitive - 区分大小写

`editor.action.goToLocations` - 从文件中的位置跳转到位置

* _uri_ - 起始文本文档
* _position_ - 起始位置
* _locations_ - 位置数组。
* _multiple_ - 定义有多个结果时要做什么，可以是 `peek`, `gotoAndPeek`, 或 `goto`
* _noResultsMessage_ - 当位置为空时显示的可读消息。

`editor.action.peekLocations` - 从文件中的位置快速查看位置

* _uri_ - 起始文本文档
* _position_ - 起始位置
* _locations_ - 位置数组。
* _multiple_ - 定义有多个结果时要做什么，可以是 `peek`, `gotoAndPeek`, 或 `goto`

`workbench.action.quickOpen` - 快速访问

* _prefix_ - 前缀

`notebook.cell.toggleOutputs` - 切换输出

* _options_ - 单元格范围选项

`notebook.fold` - 折叠单元格

* _index_ - 单元格索引

`notebook.unfold` - 展开单元格

* _index_ - 单元格索引

`notebook.selectKernel` - 笔记本内核参数

* _kernelInfo_ - 内核信息

`notebook.cell.changeLanguage` - 更改单元格语言

* _range_ - 单元格范围
* _language_ - 目标单元格语言

`notebook.execute` - 全部运行

* _uri_ - 文档 uri

`notebook.cell.execute` - 执行单元格

* _options_ - 单元格范围选项

`notebook.cell.executeAndFocusContainer` - 执行单元格并聚焦容器

* _options_ - 单元格范围选项

`notebook.cell.cancelExecution` - 停止单元格执行

* _options_ - 单元格范围选项

`workbench.action.findInFiles` - 打开工作区搜索

* _A set of options for the search_ - 搜索的一组选项

`_interactive.open` - 打开交互式窗口

* _showOptions_ - 显示选项
* _resource_ - 交互式资源 Uri
* _controllerId_ - 笔记本控制器 Id
* _title_ - 笔记本编辑器标题

`interactive.execute` - 执行输入框的内容

* _resource_ - 交互式资源 Uri

`search.action.openNewEditor` - 打开一个新的搜索编辑器。传递的参数可以包括像 `${relativeFileDirname}` 这样的变量。

* _Open new Search Editor args_ - 打开新搜索编辑器参数

`search.action.openEditor` - 打开一个新的搜索编辑器。传递的参数可以包括像 `${relativeFileDirname}` 这样的变量。

* _Open new Search Editor args_ - 打开新搜索编辑器参数

`search.action.openNewEditorToSide` - 打开一个新的搜索编辑器。传递的参数可以包括像 `${relativeFileDirname}` 这样的变量。

* _Open new Search Editor args_ - 打开新搜索编辑器参数

`vscode.openFolder` - 在当前窗口或新窗口中打开文件夹或工作区，具体取决于 newWindow 参数。请注意，除非 newWindow 参数设置为 true，否则在同一窗口中打开将关闭当前的插件主机进程并在给定的文件夹/工作区上启动一个新的进程。

* _uri_ - (可选) 要打开的文件夹或工作区文件的 Uri。如果未提供，本机对话框将询问用户文件夹
* _options_ - (可选) 选项。具有以下属性的对象：`forceNewWindow`: 是否在新窗口或同一窗口中打开文件夹/工作区。默认为在同一窗口中打开。`forceReuseWindow`: 是否强制在同一窗口中打开文件夹/工作区。默认为 false。`noRecentEntry`: 打开的 URI 是否出现在“最近打开”列表中。默认为 false。注意，为了向后兼容，选项也可以是布尔类型，代表 `forceNewWindow` 设置。

`vscode.newWindow` - 打开一个新窗口，具体取决于 newWindow 参数。

* _options_ - (可选) 选项。具有以下属性的对象：`reuseWindow`: 是否打开新窗口或同一窗口。默认为打开新窗口。

`vscode.removeFromRecentlyOpened` - 从最近打开的列表中删除具有给定路径的条目。

* _path_ - 要从最近打开中删除的 URI 或 URI 字符串。

`moveActiveEditor` - 按选项卡或组移动活动编辑器

* _活动编辑器移动参数_ - 参数属性：
  * 'to': 提供移动目的地的字符串值。
  * 'by': 提供移动单位的字符串值（按选项卡或按组）。
  * 'value': 提供要移动多少位置或绝对位置的数值。

`copyActiveEditor` - 按组复制活动编辑器

* _活动编辑器复制参数_ - 参数属性：
  * 'to': 提供复制目的地的字符串值。
  * 'value': 提供要复制多少位置或绝对位置的数值。

`vscode.getEditorLayout` - 获取编辑器布局

* _(返回值)_ - 一个编辑器布局对象，格式与 baosky.setEditorLayout 相同

`workbench.action.files.newUntitledFile` - 新建无标题文本文件

* _New Untitled Text File arguments_ - 编辑器视图类型或语言 ID（如果已知）

`workbench.extensions.installExtension` - 安装给定的插件

* _extensionIdOrVSIXUri_ - 插件 id 或 VSIX 资源 uri
* _options_ - (可选) 安装插件的选项。具有以下属性的对象：`installOnlyNewlyAddedFromExtensionPackVSIX`: 启用时，Baosky 仅安装插件包 VSIX 中新添加的插件。此选项仅在安装 VSIX 时考虑。

`workbench.extensions.uninstallExtension` - 卸载给定的插件

* _Id of the extension to uninstall_ - 要卸载的插件 ID

`workbench.extensions.search` - 搜索特定插件

* _Query to use in search_ - 搜索中使用的查询

`workbench.action.tasks.runTask` - 运行任务

* _args_ - 过滤快速选择中显示的任务

`workbench.action.openIssueReporter` - 打开问题报告器并可选择预填充部分表单。

* _options_ - 用于预填充问题报告器的数据。

`vscode.openIssueReporter` - 打开问题报告器并可选择预填充部分表单。

* _options_ - 用于预填充问题报告器的数据。

`workbench.action.openLogFile` - workbench.action.openLogFile

* _logFile_ - 日志文件

`workbench.action.openWalkthrough` - 打开入门指引 (Walkthrough)。

* _walkthroughID_ - 要打开的入门指引 ID。
* _toSide_ - 在侧面的新编辑器组中打开入门指引。

## 简单命令

那些不需要参数的简单命令，您可以在默认的 `keybindings.json` 文件中的键盘快捷方式列表中找到。未绑定的命令列在文件底部的注释块中。

要查看默认的 `keybindings.json`，请从命令面板 (`kb(workbench.action.showCommands)`) 运行 **首选项：打开默认键盘快捷方式 (JSON)**。