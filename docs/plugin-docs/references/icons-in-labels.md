--- 
# DO NOT TOUCH — Managed by doc writer

ContentId: 109a10fc-2d64-44b6-98ce-b8375d245776
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: 按 ID 列出的所有产品图标参考
---

# 产品图标参考手册

Baosky 内置了一套图标集，这些图标不仅用于视图和编辑器，还可以用于悬停提示、状态栏以及插件中。这些图标被称为 **产品图标**，以区别于在 UI 中显示在文件名旁边的 **文件图标**。

Baosky 附带的产品图标包含在 [Codicon 图标字体](https://github.com/microsoft/baosky-codicons) 中，并构成了 **默认** 的产品图标主题。插件可以提供新的 [产品图标主题](/api/extension-guides/product-icon-theme) 来重新定义这些图标，从而赋予 Baosky 新的外观。

为了实现这一点，所有产品图标都由一个 ID 标识。图标标识符用于 UI 组件的标签中 (`$(pencil)`)、API 中的 `ThemeIcon` 以及需要图标的贡献点中。

将图标标识符关联到实际图标字体字形的工作是由产品图标主题完成的。

## 标签中的图标

图标可以用在悬停提示的 Markdown 标签中、[StatusBarItem](/api/references/baosky-api#StatusBarItem) 文本中以及 [QuickPickItem](/api/references/baosky-api#QuickPickItem) 标签 API 中。在 Markdown 中添加图标的语法是 `$(iconIdentifier)`：

```ts
$(alert);
```

您还可以嵌入文本并使用多个图标：

```ts
$(eye) $(heart) $(mark-github) GitHub
```

要在标签中放置字面意义的 `$(...)` 文本，请使用反斜杠转义 `$`：

```ts
\$(eye)
```

## 动画

您可以通过在图标名称后附加 `~spin` 来将旋转动画应用于以下图标：

- `sync`
- `loading`
- `gear`

```ts
$(sync~spin)
```

## 图标贡献点

图标贡献点允许插件通过 ID 定义额外的图标，以及默认图标。然后，插件（或依赖该插件的任何其他插件）可以在标签 (`$(iconId)`) 或可以使用 `ThemeIcon` 的所有位置 (`new ThemeIcon("iconId")`) 使用该图标 ID。

```json
"contributes": {
  "icons": {
        "distro-ubuntu": {
            "description": "Ubuntu icon",
            "default": {
                "fontPath": "./distroicons.woff",
                "fontCharacter": "\\E001"
            }
        },
        "distro-fedora": {
            "description": "Ubuntu icon",
            "default": {
                "fontPath": "./distroicons.woff",
                "fontCharacter": "\\E002"
            }
        }
    }
}
```

产品图标主题可以重新定义图标（如果它们知道图标 ID）。

## 图标列表

下面是按标识符列出的内置产品图标。

图标的 ID 标识了图标使用的位置。默认 codicon ID 描述了默认情况下使用 codicon 库中的哪个图标，预览显示了该图标的外观。

[产品图标主题](/api/extension-guides/product-icon-theme) 可以单独替换每个图标，也可以替换 codicon 库中的所有图标。

<div id="codicon-listing">

| 预览        | 标识符                           | 默认 codicon ID                   | 描述 |
| ----------- | --------------------------------- | --------------------------------- | --------------------------------- |
|<i class="codicon codicon-account"></i>|accounts-view-bar-icon|account|视图栏中的账户图标。|
|<i class="codicon codicon-activate-breakpoints"></i>|breakpoints-activate|activate-breakpoints|断点视图中激活操作的图标。|
|<i class="codicon codicon-close-all"></i>|breakpoints-remove-all|close-all|断点视图中全部移除操作的图标。|
|<i class="codicon codicon-debug-alt"></i>|breakpoints-view-icon|debug-alt|断点视图的视图图标。|
|<i class="codicon codicon-call-incoming"></i>|callhierarchy-incoming|call-incoming|调用层次结构视图中传入调用的图标。|
|<i class="codicon codicon-call-outgoing"></i>|callhierarchy-outgoing|call-outgoing|调用层次结构视图中传出调用的图标。|
|<i class="codicon codicon-debug-alt"></i>|callstack-view-icon|debug-alt|调用堆栈视图的视图图标。|
|<i class="codicon codicon-bug"></i>|callstack-view-session|bug|调用堆栈视图中会话图标的图标。|
|<i class="codicon codicon-comment-discussion"></i>|chat-editor-label-icon|comment-discussion|聊天编辑器标签的图标。|
|<i class="codicon codicon-comment-discussion"></i>|comments-view-icon|comment-discussion|评论视图的视图图标。|
|<i class="codicon codicon-debug-breakpoint"></i>|debug-breakpoint|debug-breakpoint|断点图标。|
|<i class="codicon codicon-debug-breakpoint-conditional"></i>|debug-breakpoint-conditional|debug-breakpoint-conditional|条件断点图标。|
|<i class="codicon codicon-debug-breakpoint-conditional-disabled"></i>|debug-breakpoint-conditional-disabled|debug-breakpoint-conditional-disabled|禁用的条件断点图标。|
|<i class="codicon codicon-debug-breakpoint-conditional-unverified"></i>|debug-breakpoint-conditional-unverified|debug-breakpoint-conditional-unverified|未验证的条件断点图标。|
|<i class="codicon codicon-debug-breakpoint-data"></i>|debug-breakpoint-data|debug-breakpoint-data|数据断点图标。|
|<i class="codicon codicon-debug-breakpoint-data-disabled"></i>|debug-breakpoint-data-disabled|debug-breakpoint-data-disabled|禁用的数据断点图标。|
|<i class="codicon codicon-debug-breakpoint-data-unverified"></i>|debug-breakpoint-data-unverified|debug-breakpoint-data-unverified|未验证的数据断点图标。|
|<i class="codicon codicon-debug-breakpoint-disabled"></i>|debug-breakpoint-disabled|debug-breakpoint-disabled|禁用的断点图标。|
|<i class="codicon codicon-debug-breakpoint-function"></i>|debug-breakpoint-function|debug-breakpoint-function|函数断点图标。|
|<i class="codicon codicon-debug-breakpoint-function-disabled"></i>|debug-breakpoint-function-disabled|debug-breakpoint-function-disabled|禁用的函数断点图标。|
|<i class="codicon codicon-debug-breakpoint-function-unverified"></i>|debug-breakpoint-function-unverified|debug-breakpoint-function-unverified|未验证的函数断点图标。|
|<i class="codicon codicon-debug-breakpoint-log"></i>|debug-breakpoint-log|debug-breakpoint-log|日志断点图标。|
|<i class="codicon codicon-debug-breakpoint-log-disabled"></i>|debug-breakpoint-log-disabled|debug-breakpoint-log-disabled|禁用的日志断点图标。|
|<i class="codicon codicon-debug-breakpoint-log-unverified"></i>|debug-breakpoint-log-unverified|debug-breakpoint-log-unverified|未验证的日志断点图标。|
|<i class="codicon codicon-debug-breakpoint-unsupported"></i>|debug-breakpoint-unsupported|debug-breakpoint-unsupported|不支持的断点图标。|
|<i class="codicon codicon-debug-breakpoint-unverified"></i>|debug-breakpoint-unverified|debug-breakpoint-unverified|未验证的断点图标。|
|<i class="codicon codicon-collapse-all"></i>|debug-collapse-all|collapse-all|调试视图中全部折叠操作的图标。|
|<i class="codicon codicon-gear"></i>|debug-configure|gear|调试配置操作的图标。|
|<i class="codicon codicon-debug-console"></i>|debug-console|debug-console|打开调试控制台操作的图标。|
|<i class="codicon codicon-clear-all"></i>|debug-console-clear-all|clear-all|调试控制台中全部清除操作的图标。|
|<i class="codicon codicon-arrow-small-right"></i>|debug-console-evaluation-input|arrow-small-right|调试评估输入标记的图标。|
|<i class="codicon codicon-chevron-right"></i>|debug-console-evaluation-prompt|chevron-right|调试评估提示的图标。|
|<i class="codicon codicon-debug-console"></i>|debug-console-view-icon|debug-console|调试控制台视图的视图图标。|
|<i class="codicon codicon-debug-continue"></i>|debug-continue|debug-continue|调试继续操作的图标。|
|<i class="codicon codicon-debug-disconnect"></i>|debug-disconnect|debug-disconnect|调试断开连接操作的图标。|
|<i class="codicon codicon-gripper"></i>|debug-gripper|gripper|调试栏抓手的图标。|
|<i class="codicon codicon-debug-hint"></i>|debug-hint|debug-hint|在编辑器字形边距悬停时显示的断点提示图标。|
|<i class="codicon codicon-debug-pause"></i>|debug-pause|debug-pause|调试暂停操作的图标。|
|<i class="codicon codicon-debug-restart"></i>|debug-restart|debug-restart|调试重启操作的图标。|
|<i class="codicon codicon-debug-restart-frame"></i>|debug-restart-frame|debug-restart-frame|调试重启帧操作的图标。|
|<i class="codicon codicon-debug-reverse-continue"></i>|debug-reverse-continue|debug-reverse-continue|调试反向继续操作的图标。|
|<i class="codicon codicon-debug-stackframe"></i>|debug-stackframe|debug-stackframe|编辑器字形边距中显示的堆栈帧图标。|
|<i class="codicon codicon-debug-stackframe-focused"></i>|debug-stackframe-focused|debug-stackframe-focused|编辑器字形边距中显示的聚焦堆栈帧图标。|
|<i class="codicon codicon-debug-start"></i>|debug-start|debug-start|调试开始操作的图标。|
|<i class="codicon codicon-debug-step-back"></i>|debug-step-back|debug-step-back|调试后退操作的图标。|
|<i class="codicon codicon-debug-step-into"></i>|debug-step-into|debug-step-into|调试步入操作的图标。|
|<i class="codicon codicon-debug-step-out"></i>|debug-step-out|debug-step-out|调试步出操作的图标。|
|<i class="codicon codicon-debug-step-over"></i>|debug-step-over|debug-step-over|调试步过操作的图标。|
|<i class="codicon codicon-debug-stop"></i>|debug-stop|debug-stop|调试停止操作的图标。|
|<i class="codicon codicon-window"></i>|default-view-icon|window|默认视图图标。|
|<i class="codicon codicon-arrow-down"></i>|diff-editor-next-change|arrow-down|差异编辑器中下一个更改操作的图标。|
|<i class="codicon codicon-arrow-up"></i>|diff-editor-previous-change|arrow-up|差异编辑器中上一个更改操作的图标。|
|<i class="codicon codicon-whitespace"></i>|diff-editor-toggle-whitespace|whitespace|差异编辑器中切换空白字符操作的图标。|
|<i class="codicon codicon-add"></i>|diff-insert|add|差异编辑器中插入的行装饰。|
|<i class="codicon codicon-remove"></i>|diff-remove|remove|差异编辑器中移除的行装饰。|
|<i class="codicon codicon-close"></i>|diff-review-close|close|差异审查中“关闭”的图标。|
|<i class="codicon codicon-add"></i>|diff-review-insert|add|差异审查中“插入”的图标。|
|<i class="codicon codicon-remove"></i>|diff-review-remove|remove|差异审查中“移除”的图标。|
|<i class="codicon codicon-debug"></i>|disassembly-editor-label-icon|debug|反汇编编辑器标签的图标。|
|<i class="codicon codicon-files"></i>|explorer-view-icon|files|资源管理器视图的视图图标。|
|<i class="codicon codicon-clear-all"></i>|extension-clear-search-results|clear-all|插件视图中“清除搜索结果”操作的图标。|
|<i class="codicon codicon-pencil"></i>|extension-configure-recommended|pencil|插件视图中“配置推荐插件”操作的图标。|
|<i class="codicon codicon-extensions"></i>|extension-editor-label-icon|extensions|插件编辑器标签的图标。|
|<i class="codicon codicon-filter"></i>|extension-filter|filter|插件视图中“过滤”操作的图标。|
|<i class="codicon codicon-info"></i>|extension-info-message|info|插件编辑器中随信息消息显示的图标。|
|<i class="codicon codicon-cloud-download"></i>|extension-install-count|cloud-download|插件视图和编辑器中随安装计数显示的图标。|
|<i class="codicon codicon-cloud-download"></i>|extension-install-local-in-remote|cloud-download|插件视图中“在远程安装本地插件”操作的图标。|
|<i class="codicon codicon-cloud-download"></i>|extension-install-workspace-recommended|cloud-download|插件视图中“安装工作区推荐插件”操作的图标。|
|<i class="codicon codicon-gear"></i>|extension-manage|gear|插件视图中“管理”操作的图标。|
|<i class="codicon codicon-star"></i>|extension-rating|star|插件视图和编辑器中随评分显示的图标。|
|<i class="codicon codicon-refresh"></i>|extension-refresh|refresh|插件视图中“刷新”操作的图标。|
|<i class="codicon codicon-remote"></i>|extension-remote|remote|插件视图和编辑器中指示插件是远程的图标。|
|<i class="codicon codicon-star-empty"></i>|extension-star-empty|star-empty|插件编辑器中用于评分的空星图标。|
|<i class="codicon codicon-star-full"></i>|extension-star-full|star-full|插件编辑器中用于评分的实星图标。|
|<i class="codicon codicon-star-half"></i>|extension-star-half|star-half|插件编辑器中用于评分的半星图标。|
|<i class="codicon codicon-sync"></i>|extension-sync-enabled|sync|指示插件已同步的图标。|
|<i class="codicon codicon-sync-ignored"></i>|extension-sync-ignored|sync-ignored|指示同步时忽略插件的图标。|
|<i class="codicon codicon-extensions"></i>|extension-view-icon|extensions|插件视图的视图图标。|
|<i class="codicon codicon-warning"></i>|extension-warning-message|warning|插件编辑器中随警告消息显示的图标。|
|<i class="codicon codicon-chevron-right"></i>|find-collapsed|chevron-right|指示编辑器查找小部件已折叠的图标。|
|<i class="codicon codicon-chevron-down"></i>|find-expanded|chevron-down|指示编辑器查找小部件已展开的图标。|
|<i class="codicon codicon-arrow-down"></i>|find-next-match|arrow-down|编辑器查找小部件中“查找下一个”的图标。|
|<i class="codicon codicon-arrow-up"></i>|find-previous-match|arrow-up|编辑器查找小部件中“查找上一个”的图标。|
|<i class="codicon codicon-replace"></i>|find-replace|replace|编辑器查找小部件中“替换”的图标。|
|<i class="codicon codicon-replace-all"></i>|find-replace-all|replace-all|编辑器查找小部件中“全部替换”的图标。|
|<i class="codicon codicon-selection"></i>|find-selection|selection|编辑器查找小部件中“在选择中查找”的图标。|
|<i class="codicon codicon-chevron-right"></i>|folding-collapsed|chevron-right|编辑器字形边距中折叠范围的图标。|
|<i class="codicon codicon-chevron-down"></i>|folding-expanded|chevron-down|编辑器字形边距中展开范围的图标。|
|<i class="codicon codicon-lightbulb"></i>|getting-started-beginner|lightbulb|入门初学者类别使用的图标|
|<i class="codicon codicon-github"></i>|getting-started-codespaces|github|入门 codespaces 类别使用的图标|
|<i class="codicon codicon-pass-filled"></i>|getting-started-item-checked|pass-filled|用于表示已完成的入门项目|
|<i class="codicon codicon-circle-large-outline"></i>|getting-started-item-unchecked|circle-large-outline|用于表示未完成的入门项目|
|<i class="codicon codicon-heart"></i>|getting-started-setup|heart|入门设置类别使用的图标|
|<i class="codicon codicon-arrow-down"></i>|goto-next-location|arrow-down|跳转到下一个编辑器位置的图标。|
|<i class="codicon codicon-arrow-up"></i>|goto-previous-location|arrow-up|跳转到上一个编辑器位置的图标。|
|<i class="codicon codicon-add"></i>|keybindings-add|add|键绑定 UI 中添加操作的图标。|
|<i class="codicon codicon-edit"></i>|keybindings-edit|edit|键绑定 UI 中编辑操作的图标。|
|<i class="codicon codicon-keyboard"></i>|keybindings-editor-label-icon|keyboard|键绑定编辑器标签的图标。|
|<i class="codicon codicon-record-keys"></i>|keybindings-record-keys|record-keys|键绑定 UI 中“记录按键”操作的图标。|
|<i class="codicon codicon-sort-precedence"></i>|keybindings-sort|sort-precedence|键绑定 UI 中“按优先级排序”切换的图标。|
|<i class="codicon codicon-debug-alt"></i>|loaded-scripts-view-icon|debug-alt|已加载脚本视图的视图图标。|
|<i class="codicon codicon-chevron-down"></i>|marker-navigation-next|chevron-down|跳转到下一个标记的图标。|
|<i class="codicon codicon-chevron-up"></i>|marker-navigation-previous|chevron-up|跳转到上一个标记的图标。|
|<i class="codicon codicon-filter"></i>|markers-view-filter|filter|标记视图中过滤器配置的图标。|
|<i class="codicon codicon-warning"></i>|markers-view-icon|warning|标记视图的视图图标。|
|<i class="codicon codicon-chevron-down"></i>|markers-view-multi-line-collapsed|chevron-down|指示标记视图中多行折叠的图标。|
|<i class="codicon codicon-chevron-up"></i>|markers-view-multi-line-expanded|chevron-up|指示标记视图中多行显示的图标。|
|<i class="codicon codicon-diff-multiple"></i>|multi-diff-editor-label-icon|diff-multiple|多重差异编辑器标签的图标。|
|<i class="codicon codicon-clear-all"></i>|notebook-clear|clear-all|清除笔记本编辑器中单元格输出的图标。|
|<i class="codicon codicon-chevron-right"></i>|notebook-collapsed|chevron-right|注释笔记本编辑器中折叠部分的图标。|
|<i class="codicon codicon-trash"></i>|notebook-delete-cell|trash|删除笔记本编辑器中单元格的图标。|
|<i class="codicon codicon-pencil"></i>|notebook-edit|pencil|编辑笔记本编辑器中单元格的图标。|
|<i class="codicon codicon-play"></i>|notebook-execute|play|笔记本编辑器中执行的图标。|
|<i class="codicon codicon-run-all"></i>|notebook-execute-all|run-all|执行笔记本编辑器中所有单元格的图标。|
|<i class="codicon codicon-chevron-down"></i>|notebook-expanded|chevron-down|注释笔记本编辑器中展开部分的图标。|
|<i class="codicon codicon-settings-gear"></i>|notebook-kernel-configure|settings-gear|笔记本编辑器中内核配置小部件的配置图标。|
|<i class="codicon codicon-server-environment"></i>|notebook-kernel-select|server-environment|笔记本编辑器中选择内核的配置图标。|
|<i class="codicon codicon-code"></i>|notebook-mimetype|code|笔记本编辑器中 mime 类型的图标。|
|<i class="codicon codicon-arrow-down"></i>|notebook-move-down|arrow-down|笔记本编辑器中下移单元格的图标。|
|<i class="codicon codicon-arrow-up"></i>|notebook-move-up|arrow-up|笔记本编辑器中上移单元格的图标。|
|<i class="codicon codicon-file-code"></i>|notebook-open-as-text|file-code|在文本编辑器中打开笔记本的图标。|
|<i class="codicon codicon-preview"></i>|notebook-render-output|preview|在差异编辑器中渲染输出的图标。|
|<i class="codicon codicon-discard"></i>|notebook-revert|discard|笔记本编辑器中还原的图标。|
|<i class="codicon codicon-split-vertical"></i>|notebook-split-cell|split-vertical|笔记本编辑器中拆分单元格的图标。|
|<i class="codicon codicon-error"></i>|notebook-state-error|error|指示笔记本编辑器中错误状态的图标。|
|<i class="codicon codicon-check"></i>|notebook-state-success|check|指示笔记本编辑器中成功状态的图标。|
|<i class="codicon codicon-primitive-square"></i>|notebook-stop|primitive-square|停止笔记本编辑器中执行的图标。|
|<i class="codicon codicon-check"></i>|notebook-stop-edit|check|停止编辑笔记本编辑器中单元格的图标。|
|<i class="codicon codicon-unfold"></i>|notebook-unfold|unfold|展开笔记本编辑器中单元格的图标。|
|<i class="codicon codicon-close"></i>|notifications-clear|close|通知中清除操作的图标。|
|<i class="codicon codicon-clear-all"></i>|notifications-clear-all|clear-all|通知中全部清除操作的图标。|
|<i class="codicon codicon-chevron-down"></i>|notifications-collapse|chevron-down|通知中折叠操作的图标。|
|<i class="codicon codicon-gear"></i>|notifications-configure|gear|通知中配置操作的图标。|
|<i class="codicon codicon-chevron-up"></i>|notifications-expand|chevron-up|通知中展开操作的图标。|
|<i class="codicon codicon-chevron-down"></i>|notifications-hide|chevron-down|通知中隐藏操作的图标。|
|<i class="codicon codicon-book"></i>|open-editors-view-icon|book|打开编辑器视图的视图图标。|
|<i class="codicon codicon-symbol-class"></i>|outline-view-icon|symbol-class|大纲视图的视图图标。|
|<i class="codicon codicon-output"></i>|output-view-icon|output|输出视图的视图图标。|
|<i class="codicon codicon-close"></i>|panel-close|close|关闭面板的图标。|
|<i class="codicon codicon-chevron-up"></i>|panel-maximize|chevron-up|最大化面板的图标。|
|<i class="codicon codicon-chevron-down"></i>|panel-restore|chevron-down|还原面板的图标。|
|<i class="codicon codicon-chevron-down"></i>|parameter-hints-next|chevron-down|显示下一个参数提示的图标。|
|<i class="codicon codicon-chevron-up"></i>|parameter-hints-previous|chevron-up|显示上一个参数提示的图标。|
|<i class="codicon codicon-plus"></i>|ports-forward-icon|plus|转发操作的图标。|
|<i class="codicon codicon-globe"></i>|ports-open-browser-icon|globe|打开浏览器操作的图标。|
|<i class="codicon codicon-x"></i>|ports-stop-forward-icon|x|停止转发操作的图标。|
|<i class="codicon codicon-plug"></i>|ports-view-icon|plug|远程端口视图的视图图标。|
|<i class="codicon codicon-clear-all"></i>|preferences-clear-input|clear-all|设置和键绑定 UI 中清除输入的图标。|
|<i class="codicon codicon-go-to-file"></i>|preferences-open-settings|go-to-file|打开设置命令的图标。|
|<i class="codicon codicon-lock"></i>|private-ports-view-icon|lock|代表私有远程端口的图标。|
|<i class="codicon codicon-eye"></i>|public-ports-view-icon|eye|代表公共远程端口的图标。|
|<i class="codicon codicon-lightbulb"></i>|refactor-preview-view-icon|lightbulb|重构预览视图的视图图标。|
|<i class="codicon codicon-book"></i>|remote-explorer-documentation|book|远程资源管理器视图中的文档图标。|
|<i class="codicon codicon-twitter"></i>|remote-explorer-feedback|twitter|远程资源管理器视图中的反馈图标。|
|<i class="codicon codicon-star"></i>|remote-explorer-get-started|star|远程资源管理器视图中的入门图标。|
|<i class="codicon codicon-comment"></i>|remote-explorer-report-issues|comment|远程资源管理器视图中的报告问题图标。|
|<i class="codicon codicon-issues"></i>|remote-explorer-review-issues|issues|远程资源管理器视图中的审查问题图标。|
|<i class="codicon codicon-remote-explorer"></i>|remote-explorer-view-icon|remote-explorer|远程资源管理器视图的视图图标。|
|<i class="codicon codicon-chevron-up"></i>|review-comment-collapse|chevron-up|折叠审查评论的图标。|
|<i class="codicon codicon-debug-alt"></i>|run-view-icon|debug-alt|运行和调试视图的视图图标。|
|<i class="codicon codicon-extensions"></i>|runtime-extension-editor-label-icon|extensions|运行时插件编辑器标签的图标。|
|<i class="codicon codicon-clear-all"></i>|search-clear-results|clear-all|搜索视图中清除结果的图标。|
|<i class="codicon codicon-collapse-all"></i>|search-collapse-results|collapse-all|搜索视图中折叠结果的图标。|
|<i class="codicon codicon-ellipsis"></i>|search-details|ellipsis|使搜索详细信息可见的图标。|
|<i class="codicon codicon-search"></i>|search-editor-label-icon|search|搜索编辑器标签的图标。|
|<i class="codicon codicon-expand-all"></i>|search-expand-results|expand-all|搜索视图中展开结果的图标。|
|<i class="codicon codicon-chevron-right"></i>|search-hide-replace|chevron-right|在搜索视图中折叠替换部分的图标。|
|<i class="codicon codicon-new-file"></i>|search-new-editor|new-file|打开新搜索编辑器操作的图标。|
|<i class="codicon codicon-refresh"></i>|search-refresh|refresh|搜索视图中刷新的图标。|
|<i class="codicon codicon-close"></i>|search-remove|close|移除搜索结果的图标。|
|<i class="codicon codicon-replace"></i>|search-replace|replace|搜索视图中替换的图标。|
|<i class="codicon codicon-replace-all"></i>|search-replace-all|replace-all|搜索视图中全部替换的图标。|
|<i class="codicon codicon-list-selection"></i>|search-show-context|list-selection|在搜索编辑器中切换上下文的图标。|
|<i class="codicon codicon-chevron-down"></i>|search-show-replace|chevron-down|在搜索视图中展开替换部分的图标。|
|<i class="codicon codicon-search-stop"></i>|search-stop|search-stop|搜索视图中停止的图标。|
|<i class="codicon codicon-search"></i>|search-view-icon|search|搜索视图的视图图标。|
|<i class="codicon codicon-add"></i>|settings-add|add|设置 UI 中添加操作的图标。|
|<i class="codicon codicon-discard"></i>|settings-discard|discard|设置 UI 中丢弃操作的图标。|
|<i class="codicon codicon-edit"></i>|settings-edit|edit|设置 UI 中编辑操作的图标。|
|<i class="codicon codicon-settings"></i>|settings-editor-label-icon|settings|设置编辑器标签的图标。|
|<i class="codicon codicon-triangle-down"></i>|settings-folder-dropdown|triangle-down|拆分 JSON 设置编辑器中文件夹下拉按钮的图标。|
|<i class="codicon codicon-chevron-right"></i>|settings-group-collapsed|chevron-right|拆分 JSON 设置编辑器中折叠部分的图标。|
|<i class="codicon codicon-chevron-down"></i>|settings-group-expanded|chevron-down|拆分 JSON 设置编辑器中展开部分的图标。|
|<i class="codicon codicon-gear"></i>|settings-more-action|gear|设置 UI 中“更多操作”操作的图标。|
|<i class="codicon codicon-close"></i>|settings-remove|close|设置 UI 中移除操作的图标。|
|<i class="codicon codicon-sync"></i>|settings-sync-view-icon|sync|设置同步视图的视图图标。|
|<i class="codicon codicon-settings-gear"></i>|settings-view-bar-icon|settings-gear|视图栏中的设置图标。|
|<i class="codicon codicon-source-control"></i>|source-control-view-icon|source-control|源代码管理视图的视图图标。|
|<i class="codicon codicon-chevron-right"></i>|suggest-more-info|chevron-right|建议小部件中更多信息的图标。|
|<i class="codicon codicon-gear"></i>|tasks-list-configure|gear|任务选择列表中的配置图标。|
|<i class="codicon codicon-close"></i>|tasks-remove|close|任务选择列表中的移除图标。|
|<i class="codicon codicon-trash"></i>|terminal-kill|trash|终止终端实例的图标。|
|<i class="codicon codicon-add"></i>|terminal-new|add|创建新终端实例的图标。|
|<i class="codicon codicon-gear"></i>|terminal-rename|gear|终端快速菜单中重命名的图标。|
|<i class="codicon codicon-terminal"></i>|terminal-view-icon|terminal|终端视图的视图图标。|
|<i class="codicon codicon-beaker"></i>|test-view-icon|beaker|测试视图的视图图标。|
|<i class="codicon codicon-close"></i>|testing-cancel-icon|close|取消正在进行的测试运行的图标。|
|<i class="codicon codicon-debug-alt"></i>|testing-debug-icon|debug-alt|“调试测试”操作的图标。|
|<i class="codicon codicon-warning"></i>|testing-error-icon|warning|显示有错误的测试的图标。|
|<i class="codicon codicon-close"></i>|testing-failed-icon|close|显示失败测试的图标。|
|<i class="codicon codicon-pass"></i>|testing-passed-icon|pass|显示通过测试的图标。|
|<i class="codicon codicon-watch"></i>|testing-queued-icon|watch|显示已排队测试的图标。|
|<i class="codicon codicon-run-all"></i>|testing-run-all-icon|run-all|“运行所有测试”操作的图标。|
|<i class="codicon codicon-run"></i>|testing-run-icon|run|“运行测试”操作的图标。|
|<i class="codicon codicon-list-tree"></i>|testing-show-as-list-icon|list-tree|当测试资源管理器被禁用为树时显示的图标。|
|<i class="codicon codicon-debug-step-over"></i>|testing-skipped-icon|debug-step-over|显示已跳过测试的图标。|
|<i class="codicon codicon-circle-outline"></i>|testing-unset-icon|circle-outline|显示处于未设置状态的测试的图标。|
|<i class="codicon codicon-history"></i>|timeline-open|history|打开时间线操作的图标。|
|<i class="codicon codicon-pin"></i>|timeline-pin|pin|固定时间线操作的图标。|
|<i class="codicon codicon-refresh"></i>|timeline-refresh|refresh|刷新时间线操作的图标。|
|<i class="codicon codicon-pinned"></i>|timeline-unpin|pinned|取消固定时间线操作的图标。|
|<i class="codicon codicon-history"></i>|timeline-view-icon|history|时间线视图的视图图标。|
|<i class="codicon codicon-debug-alt"></i>|variables-view-icon|debug-alt|变量视图的视图图标。|
|<i class="codicon codicon-chevron-right"></i>|view-pane-container-collapsed|chevron-right|折叠视图窗格容器的图标。|
|<i class="codicon codicon-chevron-down"></i>|view-pane-container-expanded|chevron-down|展开视图窗格容器的图标。|
|<i class="codicon codicon-add"></i>|watch-expressions-add|add|监视视图中添加操作的图标。|
|<i class="codicon codicon-add"></i>|watch-expressions-add-function-breakpoint|add|监视视图中添加函数断点操作的图标。|
|<i class="codicon codicon-close-all"></i>|watch-expressions-remove-all|close-all|监视视图中全部移除操作的图标。|
|<i class="codicon codicon-debug-alt"></i>|watch-view-icon|debug-alt|监视视图的视图图标。|
|<i class="codicon codicon-close"></i>|widget-close|close|小部件中关闭操作的图标。|
|<i class="codicon codicon-shield"></i>|workspace-trust-editor-label-icon|shield|工作区信任编辑器标签的图标。|

Codicon 库包含了 Baosky 视图中使用的所有图标，以及一套有用的图标。

Baosky 插件可以在标签、视图和树中使用这些图标。

| 预览 | 标识符
| --- | --- |
|<i class="codicon codicon-account"></i>|account|
|<i class="codicon codicon-activate-breakpoints"></i>|activate-breakpoints|
|<i class="codicon codicon-add"></i>|add|
|<i class="codicon codicon-alert"></i>|alert|
|<i class="codicon codicon-archive"></i>|archive|
|<i class="codicon codicon-array"></i>|array|
|<i class="codicon codicon-arrow-both"></i>|arrow-both|
|<i class="codicon codicon-arrow-circle-down"></i>|arrow-circle-down|
|<i class="codicon codicon-arrow-circle-left"></i>|arrow-circle-left|
|<i class="codicon codicon-arrow-circle-right"></i>|arrow-circle-right|
|<i class="codicon codicon-arrow-circle-up"></i>|arrow-circle-up|
|<i class="codicon codicon-arrow-down"></i>|arrow-down|
|<i class="codicon codicon-arrow-left"></i>|arrow-left|
|<i class="codicon codicon-arrow-right"></i>|arrow-right|
|<i class="codicon codicon-arrow-small-down"></i>|arrow-small-down|
|<i class="codicon codicon-arrow-small-left"></i>|arrow-small-left|
|<i class="codicon codicon-arrow-small-right"></i>|arrow-small-right|
|<i class="codicon codicon-arrow-small-up"></i>|arrow-small-up|
|<i class="codicon codicon-arrow-swap"></i>|arrow-swap|
|<i class="codicon codicon-arrow-up"></i>|arrow-up|
|<i class="codicon codicon-azure-devops"></i>|azure-devops|
|<i class="codicon codicon-azure"></i>|azure|
|<i class="codicon codicon-beaker-stop"></i>|beaker-stop|
|<i class="codicon codicon-beaker"></i>|beaker|
|<i class="codicon codicon-bell"></i>|bell|
|<i class="codicon codicon-bell-dot"></i>|bell-dot|
|<i class="codicon codicon-bell-slash"></i>|bell-slash|
|<i class="codicon codicon-bell-slash-dot"></i>|bell-slash-dot|
|<i class="codicon codicon-bold"></i>|bold|
|<i class="codicon codicon-book"></i>|book|
|<i class="codicon codicon-bookmark"></i>|bookmark|
|<i class="codicon codicon-bracket-dot"></i>|bracket-dot|
|<i class="codicon codicon-bracket-error"></i>|bracket-error|
|<i class="codicon codicon-bracket"></i>|bracket|
|<i class="codicon codicon-briefcase"></i>|briefcase|
|<i class="codicon codicon-broadcast"></i>|broadcast|
|<i class="codicon codicon-browser"></i>|browser|
|<i class="codicon codicon-bug"></i>|bug|
|<i class="codicon codicon-calendar"></i>|calendar|
|<i class="codicon codicon-call-incoming"></i>|call-incoming|
|<i class="codicon codicon-call-outgoing"></i>|call-outgoing|
|<i class="codicon codicon-case-sensitive"></i>|case-sensitive|
|<i class="codicon codicon-check"></i>|check|
|<i class="codicon codicon-check-all"></i>|check-all|
|<i class="codicon codicon-checklist"></i>|checklist|
|<i class="codicon codicon-chevron-down"></i>|chevron-down|
|<i class="codicon codicon-chevron-left"></i>|chevron-left|
|<i class="codicon codicon-chevron-right"></i>|chevron-right|
|<i class="codicon codicon-chevron-up"></i>|chevron-up|
|<i class="codicon codicon-chip"></i>|chip|
|<i class="codicon codicon-chrome-close"></i>|chrome-close|
|<i class="codicon codicon-chrome-maximize"></i>|chrome-maximize|
|<i class="codicon codicon-chrome-minimize"></i>|chrome-minimize|
|<i class="codicon codicon-chrome-restore"></i>|chrome-restore|
|<i class="codicon codicon-circle-filled"></i>|circle-filled|
|<i class="codicon codicon-circle-large-filled"></i>|circle-large-filled|
|<i class="codicon codicon-circle-large-outline"></i>|circle-large-outline|
|<i class="codicon codicon-circle-outline"></i>|circle-outline|
|<i class="codicon codicon-circle-slash"></i>|circle-slash|
|<i class="codicon codicon-circuit-board"></i>|circuit-board|
|<i class="codicon codicon-clear-all"></i>|clear-all|
|<i class="codicon codicon-clippy"></i>|clippy|
|<i class="codicon codicon-clock"></i>|clock|
|<i class="codicon codicon-clone"></i>|clone|
|<i class="codicon codicon-close"></i>|close|
|<i class="codicon codicon-close-all"></i>|close-all|
|<i class="codicon codicon-close-dirty"></i>|close-dirty|
|<i class="codicon codicon-cloud"></i>|cloud|
|<i class="codicon codicon-cloud-download"></i>|cloud-download|
|<i class="codicon codicon-cloud-upload"></i>|cloud-upload|
|<i class="codicon codicon-code"></i>|code|
|<i class="codicon codicon-coffee"></i>|coffee|
|<i class="codicon codicon-collapse-all"></i>|collapse-all|
|<i class="codicon codicon-color-mode"></i>|color-mode|
|<i class="codicon codicon-combine"></i>|combine|
|<i class="codicon codicon-comment"></i>|comment|
|<i class="codicon codicon-comment-add"></i>|comment-add|
|<i class="codicon codicon-comment-discussion"></i>|comment-discussion|
|<i class="codicon codicon-comment-draft"></i>|comment-draft|
|<i class="codicon codicon-comment-unresolved"></i>|comment-unresolved|
|<i class="codicon codicon-compare-changes"></i>|compare-changes|
|<i class="codicon codicon-compass-active"></i>|compass-active|
|<i class="codicon codicon-compass-dot"></i>|compass-dot|
|<i class="codicon codicon-compass"></i>|compass|
|<i class="codicon codicon-console"></i>|console|
|<i class="codicon codicon-copilot"></i>|copilot|
|<i class="codicon codicon-copy"></i>|copy|
|<i class="codicon codicon-credit-card"></i>|credit-card|
|<i class="codicon codicon-dash"></i>|dash|
|<i class="codicon codicon-dashboard"></i>|dashboard|
|<i class="codicon codicon-database"></i>|database|
|<i class="codicon codicon-debug-all"></i>|debug-all|
|<i class="codicon codicon-debug"></i>|debug|
|<i class="codicon codicon-debug-alt"></i>|debug-alt|
|<i class="codicon codicon-debug-alt-small"></i>|debug-alt-small|
|<i class="codicon codicon-debug-breakpoint"></i>|debug-breakpoint|
|<i class="codicon codicon-debug-breakpoint-conditional"></i>|debug-breakpoint-conditional|
|<i class="codicon codicon-debug-breakpoint-conditional-disabled"></i>|debug-breakpoint-conditional-disabled|
|<i class="codicon codicon-debug-breakpoint-conditional-unverified"></i>|debug-breakpoint-conditional-unverified|
|<i class="codicon codicon-debug-breakpoint-data"></i>|debug-breakpoint-data|
|<i class="codicon codicon-debug-breakpoint-data-disabled"></i>|debug-breakpoint-data-disabled|
|<i class="codicon codicon-debug-breakpoint-data-unverified"></i>|debug-breakpoint-data-unverified|
|<i class="codicon codicon-debug-breakpoint-disabled"></i>|debug-breakpoint-disabled|
|<i class="codicon codicon-debug-breakpoint-function"></i>|debug-breakpoint-function|
|<i class="codicon codicon-debug-breakpoint-function-disabled"></i>|debug-breakpoint-function-disabled|
|<i class="codicon codicon-debug-breakpoint-function-unverified"></i>|debug-breakpoint-function-unverified|
|<i class="codicon codicon-debug-breakpoint-log"></i>|debug-breakpoint-log|
|<i class="codicon codicon-debug-breakpoint-log-disabled"></i>|debug-breakpoint-log-disabled|
|<i class="codicon codicon-debug-breakpoint-log-unverified"></i>|debug-breakpoint-log-unverified|
|<i class="codicon codicon-debug-breakpoint-unsupported"></i>|debug-breakpoint-unsupported|
|<i class="codicon codicon-debug-breakpoint-unverified"></i>|debug-breakpoint-unverified|
|<i class="codicon codicon-debug-console"></i>|debug-console|
|<i class="codicon codicon-debug-continue-small"></i>|debug-continue-small|
|<i class="codicon codicon-debug-continue"></i>|debug-continue|
|<i class="codicon codicon-debug-coverage"></i>|debug-coverage|
|<i class="codicon codicon-debug-disconnect"></i>|debug-disconnect|
|<i class="codicon codicon-debug-hint"></i>|debug-hint|
|<i class="codicon codicon-debug-line-by-line"></i>|debug-line-by-line|
|<i class="codicon codicon-debug-pause"></i>|debug-pause|
|<i class="codicon codicon-debug-rerun"></i>|debug-rerun|
|<i class="codicon codicon-debug-restart"></i>|debug-restart|
|<i class="codicon codicon-debug-restart-frame"></i>|debug-restart-frame|
|<i class="codicon codicon-debug-reverse-continue"></i>|debug-reverse-continue|
|<i class="codicon codicon-debug-stackframe"></i>|debug-stackframe|
|<i class="codicon codicon-debug-stackframe-active"></i>|debug-stackframe-active|
|<i class="codicon codicon-debug-stackframe-dot"></i>|debug-stackframe-dot|
|<i class="codicon codicon-debug-stackframe-focused"></i>|debug-stackframe-focused|
|<i class="codicon codicon-debug-start"></i>|debug-start|
|<i class="codicon codicon-debug-step-back"></i>|debug-step-back|
|<i class="codicon codicon-debug-step-into"></i>|debug-step-into|
|<i class="codicon codicon-debug-step-out"></i>|debug-step-out|
|<i class="codicon codicon-debug-step-over"></i>|debug-step-over|
|<i class="codicon codicon-debug-stop"></i>|debug-stop|
|<i class="codicon codicon-desktop-download"></i>|desktop-download|
|<i class="codicon codicon-device-camera"></i>|device-camera|
|<i class="codicon codicon-device-camera-video"></i>|device-camera-video|
|<i class="codicon codicon-device-desktop"></i>|device-desktop|
|<i class="codicon codicon-device-mobile"></i>|device-mobile|
|<i class="codicon codicon-diff"></i>|diff|
|<i class="codicon codicon-diff-added"></i>|diff-added|
|<i class="codicon codicon-diff-ignored"></i>|diff-ignored|
|<i class="codicon codicon-diff-modified"></i>|diff-modified|
|<i class="codicon codicon-diff-removed"></i>|diff-removed|
|<i class="codicon codicon-diff-renamed"></i>|diff-renamed|
|<i class="codicon codicon-discard"></i>|discard|
|<i class="codicon codicon-edit"></i>|edit|
|<i class="codicon codicon-editor-layout"></i>|editor-layout|
|<i class="codicon codicon-ellipsis"></i>|ellipsis|
|<i class="codicon codicon-empty-window"></i>|empty-window|
|<i class="codicon codicon-error-small"></i>|error-small|
|<i class="codicon codicon-error"></i>|error|
|<i class="codicon codicon-exclude"></i>|exclude|
|<i class="codicon codicon-expand-all"></i>|expand-all|
|<i class="codicon codicon-export"></i>|export|
|<i class="codicon codicon-extensions"></i>|extensions|
|<i class="codicon codicon-eye"></i>|eye|
|<i class="codicon codicon-eye-closed"></i>|eye-closed|
|<i class="codicon codicon-eye-unwatch"></i>|eye-unwatch|
|<i class="codicon codicon-eye-watch"></i>|eye-watch|
|<i class="codicon codicon-feedback"></i>|feedback|
|<i class="codicon codicon-file"></i>|file|
|<i class="codicon codicon-file-add"></i>|file-add|
|<i class="codicon codicon-file-binary"></i>|file-binary|
|<i class="codicon codicon-file-code"></i>|file-code|
|<i class="codicon codicon-file-directory"></i>|file-directory|
|<i class="codicon codicon-file-directory-create"></i>|file-directory-create|
|<i class="codicon codicon-file-media"></i>|file-media|
|<i class="codicon codicon-file-pdf"></i>|file-pdf|
|<i class="codicon codicon-file-submodule"></i>|file-submodule|
|<i class="codicon codicon-file-symlink-directory"></i>|file-symlink-directory|
|<i class="codicon codicon-file-symlink-file"></i>|file-symlink-file|
|<i class="codicon codicon-file-text"></i>|file-text|
|<i class="codicon codicon-file-zip"></i>|file-zip|
|<i class="codicon codicon-files"></i>|files|
|<i class="codicon codicon-filter-filled"></i>|filter-filled|
|<i class="codicon codicon-filter"></i>|filter|
|<i class="codicon codicon-flame"></i>|flame|
|<i class="codicon codicon-fold"></i>|fold|
|<i class="codicon codicon-fold-down"></i>|fold-down|
|<i class="codicon codicon-fold-up"></i>|fold-up|
|<i class="codicon codicon-folder"></i>|folder|
|<i class="codicon codicon-folder-active"></i>|folder-active|
|<i class="codicon codicon-folder-library"></i>|folder-library|
|<i class="codicon codicon-folder-opened"></i>|folder-opened|
|<i class="codicon codicon-game"></i>|game|
|<i class="codicon codicon-gather"></i>|gather|
|<i class="codicon codicon-gear"></i>|gear|
|<i class="codicon codicon-gift"></i>|gift|
|<i class="codicon codicon-gist"></i>|gist|
|<i class="codicon codicon-gist-fork"></i>|gist-fork|
|<i class="codicon codicon-gist-new"></i>|gist-new|
|<i class="codicon codicon-gist-private"></i>|gist-private|
|<i class="codicon codicon-gist-secret"></i>|gist-secret|
|<i class="codicon codicon-git-branch"></i>|git-branch|
|<i class="codicon codicon-git-branch-create"></i>|git-branch-create|
|<i class="codicon codicon-git-branch-delete"></i>|git-branch-delete|
|<i class="codicon codicon-git-commit"></i>|git-commit|
|<i class="codicon codicon-git-compare"></i>|git-compare|
|<i class="codicon codicon-git-fetch"></i>|git-fetch|
|<i class="codicon codicon-git-fork-private"></i>|git-fork-private|
|<i class="codicon codicon-git-merge"></i>|git-merge|
|<i class="codicon codicon-git-pull-request"></i>|git-pull-request|
|<i class="codicon codicon-git-pull-request-abandoned"></i>|git-pull-request-abandoned|
|<i class="codicon codicon-git-pull-request-closed"></i>|git-pull-request-closed|
|<i class="codicon codicon-git-pull-request-create"></i>|git-pull-request-create|
|<i class="codicon codicon-git-pull-request-draft"></i>|git-pull-request-draft|
|<i class="codicon codicon-git-pull-request-new-changes"></i>|git-pull-request-new-changes|
|<i class="codicon codicon-git-pull-request-go-to-changes"></i>|git-pull-request-go-to-changes|
|<i class="codicon codicon-github"></i>|github|
|<i class="codicon codicon-github-action"></i>|github-action|
|<i class="codicon codicon-github-alt"></i>|github-alt|
|<i class="codicon codicon-github-inverted"></i>|github-inverted|
|<i class="codicon codicon-globe"></i>|globe|
|<i class="codicon codicon-go-to-file"></i>|go-to-file|
|<i class="codicon codicon-grabber"></i>|grabber|
|<i class="codicon codicon-graph"></i>|graph|
|<i class="codicon codicon-graph-left"></i>|graph-left|
|<i class="codicon codicon-graph-line"></i>|graph-line|
|<i class="codicon codicon-graph-scatter"></i>|graph-scatter|
|<i class="codicon codicon-gripper"></i>|gripper|
|<i class="codicon codicon-group-by-ref-type"></i>|group-by-ref-type|
|<i class="codicon codicon-heart"></i>|heart|
|<i class="codicon codicon-history"></i>|history|
|<i class="codicon codicon-home"></i>|home|
|<i class="codicon codicon-horizontal-rule"></i>|horizontal-rule|
|<i class="codicon codicon-hubot"></i>|hubot|
|<i class="codicon codicon-inbox"></i>|inbox|
|<i class="codicon codicon-indent"></i>|indent|
|<i class="codicon codicon-info"></i>|info|
|<i class="codicon codicon-insert"></i>|insert|
|<i class="codicon codicon-inspect"></i>|inspect|
|<i class="codicon codicon-issue-closed"></i>|issue-closed|
|<i class="codicon codicon-issue-draft"></i>|issue-draft|
|<i class="codicon codicon-issue-opened"></i>|issue-opened|
|<i class="codicon codicon-issue-reopened"></i>|issue-reopened|
|<i class="codicon codicon-issues"></i>|issues|
|<i class="codicon codicon-italic"></i>|italic|
|<i class="codicon codicon-jersey"></i>|jersey|
|<i class="codicon codicon-json"></i>|json|
|<i class="codicon codicon-kebab-horizontal"></i>|kebab-horizontal|
|<i class="codicon codicon-kebab-vertical"></i>|kebab-vertical|
|<i class="codicon codicon-key"></i>|key|
|<i class="codicon codicon-keyboard"></i>|keyboard|
|<i class="codicon codicon-law"></i>|law|
|<i class="codicon codicon-layers-active"></i>|layers-active|
|<i class="codicon codicon-layers-dot"></i>|layers-dot|
|<i class="codicon codicon-layers"></i>|layers|
|<i class="codicon codicon-layout-activitybar-left"></i>|layout-activitybar-left|
|<i class="codicon codicon-layout-activitybar-right"></i>|layout-activitybar-right|
|<i class="codicon codicon-layout-centered"></i>|layout-centered|
|<i class="codicon codicon-layout-menubar"></i>|layout-menubar|
|<i class="codicon codicon-layout-panel-center"></i>|layout-panel-center|
|<i class="codicon codicon-layout-panel-justify"></i>|layout-panel-justify|
|<i class="codicon codicon-layout-panel-left"></i>|layout-panel-left|
|<i class="codicon codicon-layout-panel-right"></i>|layout-panel-right|
|<i class="codicon codicon-layout-panel"></i>|layout-panel|
|<i class="codicon codicon-layout-sidebar-left"></i>|layout-sidebar-left|
|<i class="codicon codicon-layout-sidebar-right"></i>|layout-sidebar-right|
|<i class="codicon codicon-layout-statusbar"></i>|layout-statusbar|
|<i class="codicon codicon-layout"></i>|layout|
|<i class="codicon codicon-library"></i>|library|
|<i class="codicon codicon-light-bulb"></i>|light-bulb|
|<i class="codicon codicon-lightbulb"></i>|lightbulb|
|<i class="codicon codicon-lightbulb-autofix"></i>|lightbulb-autofix|
|<i class="codicon codicon-link"></i>|link|
|<i class="codicon codicon-link-external"></i>|link-external|
|<i class="codicon codicon-list-filter"></i>|list-filter|
|<i class="codicon codicon-list-flat"></i>|list-flat|
|<i class="codicon codicon-list-ordered"></i>|list-ordered|
|<i class="codicon codicon-list-selection"></i>|list-selection|
|<i class="codicon codicon-list-tree"></i>|list-tree|
|<i class="codicon codicon-list-unordered"></i>|list-unordered|
|<i class="codicon codicon-live-share"></i>|live-share|
|<i class="codicon codicon-loading"></i>|loading|
|<i class="codicon codicon-location"></i>|location|
|<i class="codicon codicon-lock-small"></i>|lock-small|
|<i class="codicon codicon-lock"></i>|lock|
|<i class="codicon codicon-log-in"></i>|log-in|
|<i class="codicon codicon-log-out"></i>|log-out|
|<i class="codicon codicon-logo-github"></i>|logo-github|
|<i class="codicon codicon-magnet"></i>|magnet|
|<i class="codicon codicon-mail"></i>|mail|
|<i class="codicon codicon-mail-read"></i>|mail-read|
|<i class="codicon codicon-mail-reply"></i>|mail-reply|
|<i class="codicon codicon-mark-github"></i>|mark-github|
|<i class="codicon codicon-markdown"></i>|markdown|
|<i class="codicon codicon-megaphone"></i>|megaphone|
|<i class="codicon codicon-mention"></i>|mention|
|<i class="codicon codicon-menu"></i>|menu|
|<i class="codicon codicon-merge"></i>|merge|
|<i class="codicon codicon-mic"></i>|mic|
|<i class="codicon codicon-mic-filled"></i>|mic-filled|
|<i class="codicon codicon-microscope"></i>|microscope|
|<i class="codicon codicon-milestone"></i>|milestone|
|<i class="codicon codicon-mirror"></i>|mirror|
|<i class="codicon codicon-mirror-private"></i>|mirror-private|
|<i class="codicon codicon-mirror-public"></i>|mirror-public|
|<i class="codicon codicon-more"></i>|more|
|<i class="codicon codicon-mortar-board"></i>|mortar-board|
|<i class="codicon codicon-move"></i>|move|
|<i class="codicon codicon-multiple-windows"></i>|multiple-windows|
|<i class="codicon codicon-music"></i>|music|
|<i class="codicon codicon-mute"></i>|mute|
|<i class="codicon codicon-new-file"></i>|new-file|
|<i class="codicon codicon-new-folder"></i>|new-folder|
|<i class="codicon codicon-newline"></i>|newline|
|<i class="codicon codicon-no-newline"></i>|no-newline|
|<i class="codicon codicon-note"></i>|note|
|<i class="codicon codicon-notebook"></i>|notebook|
|<i class="codicon codicon-notebook-template"></i>|notebook-template|
|<i class="codicon codicon-octoface"></i>|octoface|
|<i class="codicon codicon-open-preview"></i>|open-preview|
|<i class="codicon codicon-organization"></i>|organization|
|<i class="codicon codicon-organization-filled"></i>|organization-filled|
|<i class="codicon codicon-organization-outline"></i>|organization-outline|
|<i class="codicon codicon-output"></i>|output|
|<i class="codicon codicon-package"></i>|package|
|<i class="codicon codicon-paintcan"></i>|paintcan|
|<i class="codicon codicon-pass"></i>|pass|
|<i class="codicon codicon-pass-filled"></i>|pass-filled|
|<i class="codicon codicon-pencil"></i>|pencil|
|<i class="codicon codicon-person"></i>|person|
|<i class="codicon codicon-person-add"></i>|person-add|
|<i class="codicon codicon-person-filled"></i>|person-filled|
|<i class="codicon codicon-person-follow"></i>|person-follow|
|<i class="codicon codicon-person-outline"></i>|person-outline|
|<i class="codicon codicon-pie-chart"></i>|pie-chart|
|<i class="codicon codicon-piano"></i>|piano|
|<i class="codicon codicon-pin"></i>|pin|
|<i class="codicon codicon-pinned"></i>|pinned|
|<i class="codicon codicon-pinned-dirty"></i>|pinned-dirty|
|<i class="codicon codicon-play"></i>|play|
|<i class="codicon codicon-play-circle"></i>|play-circle|
|<i class="codicon codicon-plug"></i>|plug|
|<i class="codicon codicon-plus"></i>|plus|
|<i class="codicon codicon-preserve-case"></i>|preserve-case|
|<i class="codicon codicon-preview"></i>|preview|
|<i class="codicon codicon-primitive-dot"></i>|primitive-dot|
|<i class="codicon codicon-primitive-square"></i>|primitive-square|
|<i class="codicon codicon-project"></i>|project|
|<i class="codicon codicon-pulse"></i>|pulse|
|<i class="codicon codicon-question"></i>|question|
|<i class="codicon codicon-quote"></i>|quote|
|<i class="codicon codicon-radio-tower"></i>|radio-tower|
|<i class="codicon codicon-reactions"></i>|reactions|
|<i class="codicon codicon-record"></i>|record|
|<i class="codicon codicon-record-keys"></i>|record-keys|
|<i class="codicon codicon-record-small"></i>|record-small|
|<i class="codicon codicon-redo"></i>|redo|
|<i class="codicon codicon-references"></i>|references|
|<i class="codicon codicon-refresh"></i>|refresh|
|<i class="codicon codicon-regex"></i>|regex|
|<i class="codicon codicon-remote"></i>|remote|
|<i class="codicon codicon-remote-explorer"></i>|remote-explorer|
|<i class="codicon codicon-remove"></i>|remove|
|<i class="codicon codicon-remove-close"></i>|remove-close|
|<i class="codicon codicon-repl"></i>|repl|
|<i class="codicon codicon-replace"></i>|replace|
|<i class="codicon codicon-replace-all"></i>|replace-all|
|<i class="codicon codicon-reply"></i>|reply|
|<i class="codicon codicon-repo"></i>|repo|
|<i class="codicon codicon-repo-clone"></i>|repo-clone|
|<i class="codicon codicon-repo-create"></i>|repo-create|
|<i class="codicon codicon-repo-delete"></i>|repo-delete|
|<i class="codicon codicon-repo-force-push"></i>|repo-force-push|
|<i class="codicon codicon-repo-forked"></i>|repo-forked|
|<i class="codicon codicon-repo-pull"></i>|repo-pull|
|<i class="codicon codicon-repo-push"></i>|repo-push|
|<i class="codicon codicon-repo-sync"></i>|repo-sync|
|<i class="codicon codicon-report"></i>|report|
|<i class="codicon codicon-request-changes"></i>|request-changes|
|<i class="codicon codicon-rocket"></i>|rocket|
|<i class="codicon codicon-root-folder"></i>|root-folder|
|<i class="codicon codicon-root-folder-opened"></i>|root-folder-opened|
|<i class="codicon codicon-rss"></i>|rss|
|<i class="codicon codicon-ruby"></i>|ruby|
|<i class="codicon codicon-run"></i>|run|
|<i class="codicon codicon-run-all"></i>|run-all|
|<i class="codicon codicon-run-above"></i>|run-above|
|<i class="codicon codicon-run-below"></i>|run-below|
|<i class="codicon codicon-run-errors"></i>|run-errors|
|<i class="codicon codicon-save"></i>|save|
|<i class="codicon codicon-save-all"></i>|save-all|
|<i class="codicon codicon-save-as"></i>|save-as|
|<i class="codicon codicon-screen-full"></i>|screen-full|
|<i class="codicon codicon-screen-normal"></i>|screen-normal|
|<i class="codicon codicon-search"></i>|search|
|<i class="codicon codicon-search-save"></i>|search-save|
|<i class="codicon codicon-search-stop"></i>|search-stop|
|<i class="codicon codicon-search-fuzzy"></i>|search-fuzzy|
|<i class="codicon codicon-selection"></i>|selection|
|<i class="codicon codicon-send"></i>|send|
|<i class="codicon codicon-server"></i>|server|
|<i class="codicon codicon-server-environment"></i>|server-environment|
|<i class="codicon codicon-server-process"></i>|server-process|
|<i class="codicon codicon-settings"></i>|settings|
|<i class="codicon codicon-settings-gear"></i>|settings-gear|
|<i class="codicon codicon-shield"></i>|shield|
|<i class="codicon codicon-sign-in"></i>|sign-in|
|<i class="codicon codicon-sign-out"></i>|sign-out|
|<i class="codicon codicon-smiley"></i>|smiley|
|<i class="codicon codicon-snake"></i>|snake|
|<i class="codicon codicon-sparkle"></i>|sparkle|
|<i class="codicon codicon-sort-precedence"></i>|sort-precedence|
|<i class="codicon codicon-source-control"></i>|source-control|
|<i class="codicon codicon-split-horizontal"></i>|split-horizontal|
|<i class="codicon codicon-split-vertical"></i>|split-vertical|
|<i class="codicon codicon-squirrel"></i>|squirrel|
|<i class="codicon codicon-star"></i>|star|
|<i class="codicon codicon-star-add"></i>|star-add|
|<i class="codicon codicon-star-delete"></i>|star-delete|
|<i class="codicon codicon-star-empty"></i>|star-empty|
|<i class="codicon codicon-star-full"></i>|star-full|
|<i class="codicon codicon-star-half"></i>|star-half|
|<i class="codicon codicon-stop"></i>|stop|
|<i class="codicon codicon-stop-circle"></i>|stop-circle|
|<i class="codicon codicon-symbol-array"></i>|symbol-array|
|<i class="codicon codicon-symbol-boolean"></i>|symbol-boolean|
|<i class="codicon codicon-symbol-class"></i>|symbol-class|
|<i class="codicon codicon-symbol-color"></i>|symbol-color|
|<i class="codicon codicon-symbol-constant"></i>|symbol-constant|
|<i class="codicon codicon-symbol-constructor"></i>|symbol-constructor|
|<i class="codicon codicon-symbol-enum"></i>|symbol-enum|
|<i class="codicon codicon-symbol-enum-member"></i>|symbol-enum-member|
|<i class="codicon codicon-symbol-event"></i>|symbol-event|
|<i class="codicon codicon-symbol-field"></i>|symbol-field|
|<i class="codicon codicon-symbol-file"></i>|symbol-file|
|<i class="codicon codicon-symbol-folder"></i>|symbol-folder|
|<i class="codicon codicon-symbol-function"></i>|symbol-function|
|<i class="codicon codicon-symbol-interface"></i>|symbol-interface|
|<i class="codicon codicon-symbol-key"></i>|symbol-key|
|<i class="codicon codicon-symbol-keyword"></i>|symbol-keyword|
|<i class="codicon codicon-symbol-method"></i>|symbol-method|
|<i class="codicon codicon-symbol-misc"></i>|symbol-misc|
|<i class="codicon codicon-symbol-module"></i>|symbol-module|
|<i class="codicon codicon-symbol-namespace"></i>|symbol-namespace|
|<i class="codicon codicon-symbol-null"></i>|symbol-null|
|<i class="codicon codicon-symbol-number"></i>|symbol-number|
|<i class="codicon codicon-symbol-numeric"></i>|symbol-numeric|
|<i class="codicon codicon-symbol-object"></i>|symbol-object|
|<i class="codicon codicon-symbol-operator"></i>|symbol-operator|
|<i class="codicon codicon-symbol-package"></i>|symbol-package|
|<i class="codicon codicon-symbol-parameter"></i>|symbol-parameter|
|<i class="codicon codicon-symbol-property"></i>|symbol-property|
|<i class="codicon codicon-symbol-reference"></i>|symbol-reference|
|<i class="codicon codicon-symbol-ruler"></i>|symbol-ruler|
|<i class="codicon codicon-symbol-snippet"></i>|symbol-snippet|
|<i class="codicon codicon-symbol-string"></i>|symbol-string|
|<i class="codicon codicon-symbol-struct"></i>|symbol-struct|
|<i class="codicon codicon-symbol-structure"></i>|symbol-structure|
|<i class="codicon codicon-symbol-text"></i>|symbol-text|
|<i class="codicon codicon-symbol-type-parameter"></i>|symbol-type-parameter|
|<i class="codicon codicon-symbol-unit"></i>|symbol-unit|
|<i class="codicon codicon-symbol-value"></i>|symbol-value|
|<i class="codicon codicon-symbol-variable"></i>|symbol-variable|
|<i class="codicon codicon-sync"></i>|sync|
|<i class="codicon codicon-sync-ignored"></i>|sync-ignored|
|<i class="codicon codicon-tag-add"></i>|tag-add|
|<i class="codicon codicon-tag-remove"></i>|tag-remove|
|<i class="codicon codicon-tag"></i>|tag|
|<i class="codicon codicon-target"></i>|target|
|<i class="codicon codicon-tasklist"></i>|tasklist|
|<i class="codicon codicon-telescope"></i>|telescope|
|<i class="codicon codicon-terminal-bash"></i>|terminal-bash|
|<i class="codicon codicon-terminal-cmd"></i>|terminal-cmd|
|<i class="codicon codicon-terminal-debian"></i>|terminal-debian|
|<i class="codicon codicon-terminal-linux"></i>|terminal-linux|
|<i class="codicon codicon-terminal-powershell"></i>|terminal-powershell|
|<i class="codicon codicon-terminal-tmux"></i>|terminal-tmux|
|<i class="codicon codicon-terminal-ubuntu"></i>|terminal-ubuntu|
|<i class="codicon codicon-terminal"></i>|terminal|
|<i class="codicon codicon-text-size"></i>|text-size|
|<i class="codicon codicon-three-bars"></i>|three-bars|
|<i class="codicon codicon-thumbsdown"></i>|thumbsdown|
|<i class="codicon codicon-thumbsdown-filled"></i>|thumbsdown-filled|
|<i class="codicon codicon-thumbsup"></i>|thumbsup|
|<i class="codicon codicon-thumbsup-filled"></i>|thumbsup-filled|
|<i class="codicon codicon-tools"></i>|tools|
|<i class="codicon codicon-trash"></i>|trash|
|<i class="codicon codicon-trashcan"></i>|trashcan|
|<i class="codicon codicon-triangle-down"></i>|triangle-down|
|<i class="codicon codicon-triangle-left"></i>|triangle-left|
|<i class="codicon codicon-triangle-right"></i>|triangle-right|
|<i class="codicon codicon-triangle-up"></i>|triangle-up|
|<i class="codicon codicon-twitter"></i>|twitter|
|<i class="codicon codicon-type-hierarchy-sub"></i>|type-hierarchy|
|<i class="codicon codicon-type-hierarchy-sub"></i>|type-hierarchy-sub|
|<i class="codicon codicon-type-hierarchy-super"></i>|type-hierarchy-super|
|<i class="codicon codicon-unfold"></i>|unfold|
|<i class="codicon codicon-ungroup-by-ref-type"></i>|ungroup-by-ref-type|
|<i class="codicon codicon-unlock"></i>|unlock|
|<i class="codicon codicon-unmute"></i>|unmute|
|<i class="codicon codicon-unverified"></i>|unverified|
|<i class="codicon codicon-variable"></i>|variable|
|<i class="codicon codicon-verified-filled"></i>|verified-filled|
|<i class="codicon codicon-verified"></i>|verified|
|<i class="codicon codicon-versions"></i>|versions|
|<i class="codicon codicon-vm"></i>|vm|
|<i class="codicon codicon-vm-active"></i>|vm-active|
|<i class="codicon codicon-vm-connect"></i>|vm-connect|
|<i class="codicon codicon-vm-outline"></i>|vm-outline|
|<i class="codicon codicon-vm-running"></i>|vm-running|
|<i class="codicon codicon-vr"></i>|vr|
|<i class="codicon codicon-warning"></i>|warning|
|<i class="codicon codicon-watch"></i>|watch|
|<i class="codicon codicon-whitespace"></i>|whitespace|
|<i class="codicon codicon-whole-word"></i>|whole-word|
|<i class="codicon codicon-window"></i>|window|
|<i class="codicon codicon-word-wrap"></i>|word-wrap|
|<i class="codicon codicon-workspace-trusted"></i>|workspace-trusted|
|<i class="codicon codicon-workspace-unknown"></i>|workspace-unknown|
|<i class="codicon codicon-workspace-untrusted"></i>|workspace-untrusted|
|<i class="codicon codicon-wrench"></i>|wrench|
|<i class="codicon codicon-wrench-subaction"></i>|wrench-subaction|
|<i class="codicon codicon-x"></i>|x|
|<i class="codicon codicon-zap"></i>|zap|
|<i class="codicon codicon-zoom-in"></i>|zoom-in|
|<i class="codicon codicon-zoom-out"></i>|zoom-out|
</div>