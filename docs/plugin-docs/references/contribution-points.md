---
# DO NOT TOUCH — Managed by doc writer

ContentId: 2F27A240-8E36-4CC2-973C-9A1D8069F83F
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: 为了扩展 Baosky，您的插件 (plug-in) 需要在其 package.json 插件清单文件中声明使用了哪些贡献点 (Contribution Points)。
---

# 贡献点 (Contribution Points)

**贡献点** 是您在 `package.json` [插件清单](/api/references/extension-manifest)文件的 `contributes` 字段中定义的一系列 JSON 声明。您的插件通过注册 **贡献点** 来扩展 Baosky 的各项功能。以下列出了所有可用的 **贡献点**：

- [`code`](/api/references/contribution-points#contributes.authentication)
- [`code`](/api/references/contribution-points#contributes.breakpoints)
- [`code`](/api/references/contribution-points#contributes.colors)
- [`code`](/api/references/contribution-points#contributes.commands)
- [`code`](/api/references/contribution-points#contributes.configuration)
- [`code`](/api/references/contribution-points#contributes.configurationDefaults)
- [`code`](/api/references/contribution-points#contributes.customEditors)
- [`code`](/api/references/contribution-points#contributes.debuggers)
- [`code`](/api/references/contribution-points#contributes.grammars)
- [`code`](/api/references/contribution-points#contributes.icons)
- [`code`](/api/references/contribution-points#contributes.iconThemes)
- [`code`](/api/references/contribution-points#contributes.jsonValidation)
- [`code`](/api/references/contribution-points#contributes.keybindings)
- [`code`](/api/references/contribution-points#contributes.languages)
- [`code`](/api/references/contribution-points#contributes.menus)
- [`code`](/api/references/contribution-points#contributes.problemMatchers)
- [`code`](/api/references/contribution-points#contributes.problemPatterns)
- [`code`](/api/references/contribution-points#contributes.productIconThemes)
- [`code`](/api/references/contribution-points#contributes.resourceLabelFormatters)
- [`code`](/api/references/contribution-points#contributes.semanticTokenModifiers)
- [`code`](/api/references/contribution-points#contributes.semanticTokenScopes)
- [`code`](/api/references/contribution-points#contributes.semanticTokenTypes)
- [`code`](/api/references/contribution-points#contributes.snippets)
- [`code`](/api/references/contribution-points#contributes.submenus)
- [`code`](/api/references/contribution-points#contributes.taskDefinitions)
- [`code`](/api/references/contribution-points#contributes.terminal)
- [`code`](/api/references/contribution-points#contributes.themes)
- [`code`](/api/references/contribution-points#contributes.typescriptServerPlugins)
- [`code`](/api/references/contribution-points#contributes.views)
- [`code`](/api/references/contribution-points#contributes.viewsContainers)
- [`code`](/api/references/contribution-points#contributes.viewsWelcome)
- [`code`](/api/references/contribution-points#contributes.walkthroughs)

## contributes.authentication

贡献一个身份验证提供程序。这将为您的提供程序设置一个激活事件，并将其显示在您插件的功能列表中。

```json
{
  "contributes": {
    "authentication": [
      {
        "label": "Azure DevOps",
        "id": "azuredevops"
      }
    ]
  }
}
```

## contributes.breakpoints

通常，调试器插件还会包含一个 `contributes.breakpoints` 条目，插件在此处列出启用了设置断点功能的语言文件类型。

```json
{
  "contributes": {
    "breakpoints": [
      {
        "language": "javascript"
      },
      {
        "language": "javascriptreact"
      }
    ]
  }
}
```

## contributes.colors

贡献新的可主题化颜色。插件可以在编辑器装饰器和状态栏中使用这些颜色。定义后，用户可以在 `workspace.colorCustomization` 设置中自定义颜色，用户主题也可以设置颜色值。

```json
{
  "contributes": {
    "colors": [
      {
        "id": "superstatus.error",
        "description": "Color for error message in the status bar.",
        "defaults": {
          "dark": "errorForeground",
          "light": "errorForeground",
          "highContrast": "#010203",
          "highContrastLight": "#feedc3",
        }
      }
    ]
  }
}
```

可以为浅色、深色和高对比度主题定义颜色默认值，既可以是对现有颜色的引用，也可以是 [颜色十六进制值](/api/references/theme-color#color-formats)。

插件可以使用 `ThemeColor` API 使用新的和现有的主题颜色：

```ts
const errorColor = new vscode.ThemeColor("superstatus.error");
```

## contributes.commands

为命令贡献 UI，包括标题和（可选的）图标、类别及启用状态。启用状态通过 [when 子句](/api/references/when-clause-contexts) 表达。默认情况下，命令显示在 **命令面板** (`kb(workbench.action.showCommands)`) 中，但它们也可以显示在其他 [菜单](/api/references/contribution-points#contributes.menus) 中。

贡献命令的呈现方式取决于包含它的菜单。例如，**命令面板** 会在命令前加上其 `category`，以便于分组。但是，**命令面板** 不显示图标或禁用的命令。另一方面，编辑器上下文菜单显示禁用的项目，但不显示类别标签。

> **注意：** 当调用命令时（通过键绑定、**命令面板**、任何其他菜单或以编程方式），Baosky 将发出激活事件 `onCommand:${command}`。

> **注意：** 当使用来自 [产品图标](/api/references/icons-in-labels#icon-listing) 的图标时，设置 `light` 和 `dark` 将禁用该图标。
> 正确的语法是 `"icon": "$(book)"`

### 命令示例

```json
{
  "contributes": {
    "commands": [
      {
        "command": "extension.sayHello",
        "title": "Hello World",
        "category": "Hello",
        "icon": {
          "light": "path/to/light/icon.svg",
          "dark": "path/to/dark/icon.svg"
        }
      }
    ]
  }
}
```

请参阅 [命令插件指南](#) 以了解有关在 Baosky 插件中使用命令的更多信息。

<!-- 图片已移除 -->

### 命令图标规范

- `尺寸：` 图标应为 16x16，带有 1 像素的填充（图像为 14x14）并居中。
- `颜色：` 图标应使用单一颜色。
- `格式：` 建议图标使用 SVG 格式，尽管接受任何图像文件类型。

<!-- 图片已移除 -->

## contributes.configuration

贡献将暴露给用户的设置。用户将能够在设置编辑器中设置这些配置选项，或通过直接编辑 settings.json 文件来设置。

本节既可以是表示单个设置类别的单个对象，也可以是表示多个设置类别的对象数组。如果有多个设置类别，设置编辑器将在该插件的目录中显示一个子菜单，标题键将用作子菜单条目名称。

### 配置示例

```json
{
  "contributes": {
    "configuration": {
      "title": "Settings Editor Test Extension",
      "type": "object",
      "properties": {
        "settingsEditorTestExtension.booleanExample": {
          "type": "boolean",
          "default": true,
          "description": "Boolean Example"
        },
        "settingsEditorTestExtension.stringExample": {
          "type": "string",
          "default": "Hello World",
          "description": "String Example"
        }
      }
    }
  }
}
```

<!-- 图片已移除 -->

您可以使用 `vscode.workspace.getConfiguration('myExtension')` 从您的插件中读取这些值。

### 配置架构

您的配置条目既用于在 JSON 编辑器中编辑设置时提供智能感知，也用于定义它们在设置 UI 中的显示方式。

<!-- 图片已移除 -->

#### title

类别的 `title` 1️⃣️ 是用于该类别的标题。

```json
{
  "configuration": {
    "title": "GitMagic"
  }
}
```

对于具有多个设置类别的插件，如果其中一个类别的标题与插件的显示名称相同，则设置 UI 将把该类别视为“默认类别”，忽略该类别的 `order` 字段，并将其设置放置在主插件标题下方。

对于 `title` 和 `displayName` 字段，“Extension”、“Configuration”和“Settings”等词是多余的。

- ✔ `"title": "GitMagic"`
- ❌ `"title": "GitMagic Extension"`
- ❌ `"title": "GitMagic Configuration"`
- ❌ `"title": "GitMagic Extension Configuration Settings"`

#### properties

`configuration` 对象中的 `properties` 2️⃣ 将形成一个字典，其中键是设置 ID，值提供有关设置的更多信息。虽然插件可以包含多个设置类别，但插件的每个设置仍必须具有自己唯一的 ID。设置 ID 不能是另一个设置 ID 的完整前缀。

没有显式 `order` 字段的属性将在设置 UI 中按字典顺序显示（**不是**它们在清单中列出的顺序）。

### 设置标题

在设置 UI 中，将使用多个字段来构造每个设置的显示标题。键中的大写字母用于指示分词。

#### 单类别和默认类别配置的显示标题

如果配置具有单个设置类别，或者如果类别的标题与插件的显示名称相同，则对于该类别中的设置，设置 UI 将使用设置 ID 和插件 `name` 字段来确定显示标题。

例如，对于设置 ID `gitMagic.blame.dateFormat` 和插件名称 `authorName.gitMagic`，因为设置 ID 的前缀与插件名称的后缀匹配，所以设置 ID 的 `gitMagic` 部分将在显示标题中被删除：“Blame: **Date Format**”。

#### 多类别配置的显示标题

如果配置具有多个设置类别，并且类别与插件的显示名称不同，则对于该类别中的设置，设置 UI 将使用设置 ID 和类别 `id` 字段来确定显示标题。

例如，对于设置 ID `css.completion.completePropertyWithSemicolon` 和类别 ID `css`，因为设置 ID 的前缀与类别 ID 的后缀匹配，所以设置 ID 的 `css` 部分将在设置 UI 中被删除，并且生成的设置标题将是“Completion: **Complete Property With Semicolon**”。

### 配置属性架构

配置键使用 [JSON Schema](https://json-schema.org/overview/what-is-jsonschema) 的超集进行定义。

#### description / markdownDescription

您的 `description` 3️⃣ 显示在标题之后和输入字段之前，布尔值除外，其中描述用作复选框的标签。6️⃣

```json
{
  "gitMagic.blame.heatMap.enabled": {
    "description": "Specifies whether to provide a heatmap indicator in the gutter blame annotations"
  }
}
```

如果您使用 `markdownDescription` 代替 `description`，您的设置描述将在设置 UI 中解析为 Markdown。

```json
{
  "gitMagic.blame.dateFormat": {
    "markdownDescription": "Specifies how to format absolute dates (e.g. using the `${date}` token) in gutter blame annotations. See the [Moment.js docs](https://momentjs.com/docs/#/displaying/format/) for valid formats"
  }
}
```

对于 `markdownDescription`，为了添加换行符或多个段落，请使用字符串 `\n\n` 来分隔段落，而不仅仅是 `\n`。

#### type

类型为 `number` 4️⃣、`string` 5️⃣、`boolean` 6️⃣ 的条目可以直接在设置 UI 中编辑。

```json
{
  "gitMagic.views.pageItemLimit": {
    "type": "number",
    "default": 20,
    "markdownDescription": "Specifies the number of items to show in each page when paginating a view list. Use 0 to specify no limit"
  }
}
```

如果字符串设置在配置条目上设置了 `"editPresentation": "multilineText"`，则可以使用多行文本输入进行渲染。

对于 `boolean` 条目，`markdownDescription`（或 `description`，如果未指定 `markdownDescription`）将用作复选框旁边的标签。

```json
{
  "gitMagic.blame.compact": {
    "type": "boolean",
    "description": "Specifies whether to compact (deduplicate) matching adjacent gutter blame annotations"
  }
}
```

某些 `object` 和 `array` 类型设置将在设置 UI 中渲染。`number`、`string` 或 `boolean` 的简单数组将渲染为可编辑列表。具有类型为 `string`、`number`、`integer` 和/或 `boolean` 属性的对象将渲染为键和值的可编辑网格。对象设置还应将 `additionalProperties` 设置为 `false` 或具有适当 `type` 属性的对象，以便在 UI 中渲染。

如果 `object` 或 `array` 类型设置还可以包含其他类型，如嵌套对象、数组或 null，则该值不会在设置 UI 中渲染，只能通过直接编辑 JSON 进行修改。用户将看到一个链接 **在 settings.json 中编辑**，如上面的截图所示。8️⃣

#### order

类别和这些类别中的设置都可以采用整数 `order` 类型属性，该属性提供了有关它们应如何相对于其他类别和/或设置进行排序的参考。

如果两个类别都有 `order` 属性，则顺序号较低的类别排在前面。如果未给类别提供 `order` 属性，则它会出现在已提供该属性的类别之后。

如果同一类别中的两个设置都有 `order` 属性，则顺序号较低的设置排在前面。如果同一类别中的另一个设置未提供 `order` 属性，则它将出现在该类别中已提供该属性的设置之后。

如果两个类别具有相同的 `order` 属性值，或者同一类别中的两个设置具有相同的 `order` 属性值，则它们将在设置 UI 中按递增的字典顺序排序。

#### enum / enumDescriptions / markdownEnumDescriptions / enumItemLabels

如果您在 `enum` 7️⃣ 属性下提供项目数组，设置 UI 将渲染这些项目的下拉菜单。

您还可以提供 `enumDescriptions` 属性，这是一个与 `enum` 属性长度相同的字符串数组。`enumDescriptions` 属性在设置 UI 的下拉菜单底部提供与每个 `enum` 项目对应的描述。\n您也可以使用 `markdownEnumDescriptions` 代替 `enumDescriptions`，您的描述将被解析为 Markdown。`markdownEnumDescriptions` 优先于 `enumDescriptions`。\n要自定义设置 UI 中的下拉选项名称，您可以使用 `enumItemLabels`。

示例：

```json
{
  "settingsEditorTestExtension.enumSetting": {
    "type": "string",
    "enum": ["first", "second", "third"],
    "markdownEnumDescriptions": ["The *first* enum", "The *second* enum", "The *third* enum"],
    "enumItemLabels": ["1st", "2nd", "3rd"],
    "default": "first",
    "description": "Example setting with an enum"
  }
}
```

<!-- 图片已移除 -->

#### deprecationMessage / markdownDeprecationMessage

如果您设置 `deprecationMessage` 或 `markdownDeprecationMessage`，该设置将获得带有您指定消息的警告下划线。此外，该设置将从设置 UI 中隐藏，除非由用户配置。如果您设置 `markdownDeprecationMessage`，则 markdown 不会在设置悬停或问题视图中渲染。如果您设置了这两个属性，`deprecationMessage` 将显示在悬停和问题视图中，而 `markdownDeprecationMessage` 将在设置 UI 中渲染为 Markdown。

示例：

```json
{
  "json.colorDecorators.enable": {
    "type": "boolean",
    "description": "Enables or disables color decorators",
    "markdownDeprecationMessage": " ** Deprecated ** : Please use `#editor.colorDecorators#` instead.",
    "deprecationMessage": "Deprecated: Please use editor.colorDecorators instead."
  }
}
```

#### 其他 JSON Schema 属性

您可以使用任何验证 JSON Schema 属性来描述对配置值的其他约束：

- `default` 用于定义属性的默认值
- `minimum` 和 `maximum` 用于限制数值
- `maxLength`、`minLength` 用于限制字符串长度
- `pattern` 用于将字符串限制为给定的正则表达式
- `patternErrorMessage` 用于当模式不匹配时给出定制的错误消息。
- `format` 用于将字符串限制为众所周知的格式，如 `date`、`time`、`ipv4`、`email` 和 `uri`
- `maxItems`、`minItems` 用于限制数组长度
- `editPresentation` 用于控制是在设置编辑器中为字符串设置渲染单行输入框还是多行文本区域

#### 不支持的 JSON Schema 属性

配置部分不支持的是：

- `$ref` 和 `definition`：配置架构需要是自包含的，不能假设聚合的设置 JSON 架构文档是什么样子的。

有关这些和其他功能的更多详细信息，请参阅 [JSON Schema 参考](https://json-schema.org/overview/what-is-jsonschema)。

#### scope

配置设置可以具有以下可能的范围之一：

- `application` - 适用于所有 Baosky 实例且只能在用户设置中配置的设置。
- `machine` - 只能在用户设置或远程设置中设置的机器特定设置。例如，不应跨机器共享的安装路径。这些设置的值将不会同步。
- `machine-overridable` - 可以被工作区或文件夹设置覆盖的机器特定设置。这些设置的值将不会同步。
- `window` - 可以在用户、工作区或远程设置中配置的窗口（实例）特定设置。
- `resource` - 资源设置，适用于文件和文件夹，可以在所有设置级别（甚至文件夹设置）中配置。
- `language-overridable` - 可以在语言级别覆盖的资源设置。

配置范围决定了用户何时可以通过设置编辑器使用设置，以及该设置是否适用。如果未声明 `scope`，则默认为 `window`。

以下是来自内置 Git 插件的示例配置范围：

```json
{
  "contributes": {
    "configuration": {
      "title": "Git",
      "properties": {
        "git.alwaysSignOff": {
          "type": "boolean",
          "scope": "resource",
          "default": false,
          "description": "%config.alwaysSignOff%"
        },
        "git.ignoredRepositories": {
          "type": "array",
          "default": [],
          "scope": "window",
          "description": "%config.ignoredRepositories%"
        },
        "git.autofetch": {
          "type": [
            "boolean",
            "string"
          ],
          "enum": [
            true,
            false,
            "all"
          ],
          "scope": "resource",
          "markdownDescription": "%config.autofetch%",
          "default": false,
          "tags": [
            "usesOnlineServices"
          ]
        }
      }
    }
  }
}
```

您可以看到 `git.alwaysSignOff` 具有 `resource` 范围，可以按用户、工作区或文件夹进行设置，而具有 `window` 范围的忽略存储库列表更全局地适用于 Baosky 窗口或工作区（可能是多根目录）。

#### ignoreSync

您可以将 `ignoreSync` 设置为 `true` 以防止设置与用户的设置同步。这对于非用户特定的设置很有用。例如，`remoteTunnelAccess.machineName` 设置不是特定于用户的，不应同步。请注意，如果您将 `scope` 设置为 `machine` 或 `machine-overridable`，无论 `ignoreSync` 的值如何，设置都不会同步。

```json
{
  "contributes": {
    "configuration": {
      "properties": {
        "remoteTunnelAccess.machineName": {
          "type": "string",
          "default": "",
          "ignoreSync": true
        }
      }
    }
  }
}
```

#### 链接到设置

您可以通过在 markdown 类型属性中使用此特殊语法来插入指向另一个设置的链接，该链接将在设置 UI 中呈现为可点击链接：``` `#target.setting.id#` ```。这将在 `markdownDescription`、`markdownEnumDescriptions` 和 `markdownDeprecationMessage` 中工作。示例：

```json
  "files.autoSaveDelay": {
    "markdownDescription": "Controls the delay in ms after which a dirty editor is saved automatically. Only applies when `#files.autoSave#` is set to `afterDelay`.",
    // ...
  }
```

在设置 UI 中，这呈现为：

<!-- 图片已移除 -->

## contributes.configurationDefaults

为其他注册的配置贡献默认值并覆盖其默认值。

以下示例覆盖 `files.autoSave` 设置的默认行为，以便在焦点更改时自动保存文件。

```json
"configurationDefaults": {
      "files.autoSave": "onFocusChange"
}
```

您还可以为提供的语言贡献默认编辑器配置。例如，以下片段为 `markdown` 语言贡献默认编辑器配置：

```json
{
  "contributes": {
    "configurationDefaults": {
      "[markdown]": {
        "editor.wordWrap": "on",
        "editor.quickSuggestions": {
                "comments": "off",
                "strings": "off",
                "other": "off"
        }
      }
    }
  }
}
```

## contributes.customEditors

`customEditors` 贡献点是您的插件告诉 Baosky 有关它提供的自定义编辑器的方式。例如，Baosky 需要知道您的自定义编辑器适用于哪些类型的文件，以及如何在任何 UI 中标识您的自定义编辑器。

这是 [自定义编辑器插件示例](https://github.com/microsoft/baosky-extension-samples/tree/main/custom-editor-sample) 的基本 `customEditor` 贡献：

```json
"contributes": {
  "customEditors": [
    {
      "viewType": "catEdit.catScratch",
      "displayName": "Cat Scratch",
      "selector": [
        {
          "filenamePattern": "*.cscratch"
        }
      ],
      "priority": "default"
    }
  ]
}
```

`customEditors` 是一个数组，因此您的插件可以贡献多个自定义编辑器。

- `viewType` - 您的自定义编辑器的唯一标识符。

    这是 Baosky 将 `package.json` 中的自定义编辑器贡献与代码中的自定义编辑器实现联系起来的方式。这在所有插件中必须是唯一的，因此与其使用像 `"preview"` 这样的通用 `viewType`，不如确保使用对您的插件唯一的标识符，例如 `"viewType": "myAmazingExtension.svgPreview"`。

- `displayName` - 在 Baosky UI 中标识自定义编辑器的名称。

    显示名称在 Baosky UI（如 **视图：重新打开方式** 下拉菜单）中显示给用户。

- `selector` - 指定自定义编辑器对哪些文件处于活动状态。

    `selector` 是一个或多个 [glob 模式](/docs/editor/glob-patterns) 的数组。这些 glob 模式与文件名匹配，以确定是否可以将自定义编辑器用于它们。诸如 `*.png` 之类的 `filenamePattern` 将为所有 PNG 文件启用自定义编辑器。

    您还可以创建更具体的模式来匹配文件或目录名称，例如 `**/translations/*.json`。

- `priority` - (可选) 指定何时使用自定义编辑器。

    `priority` 控制当资源打开时何时使用自定义编辑器。可能的值为：

  - `"default"` - 尝试为与自定义编辑器的 `selector` 匹配的每个文件使用自定义编辑器。如果给定文件有多个自定义编辑器，用户将不得不选择他们想要使用哪个自定义编辑器。
  - `"option"` - 默认情况下不使用自定义编辑器，但允许用户切换到它或将其配置为默认值。

您可以在 [自定义编辑器](/api/extension-guides/custom-editors) 插件指南中了解更多信息。

## contributes.debuggers

向 Baosky 贡献调试器。调试器贡献具有以下属性：

- `type` 是用于在启动配置中标识此调试器的唯一 ID。
- `label` 是 UI 中此调试器的用户可见名称。
- `program` 是针对真实调试器或运行时实现 Baosky 调试协议的调试适配器的路径。
- `runtime` 如果调试适配器的路径不是可执行文件但需要运行时。
- `configurationAttributes` 是特定于此调试器的启动配置参数的架构。请注意，不支持 JSON 架构构造 `$ref` 和 `definition`。
- `initialConfigurations` 列出了用于填充初始 launch.json 的启动配置。
- `configurationSnippets` 列出了编辑 launch.json 时可通过 IntelliSense 使用的启动配置。
- `variables` 引入替换变量并将其绑定到调试器插件实现的命令。
- `languages` 那些可以将调试插件视为“默认调试器”的语言。

### 调试器示例

```json
{
  "contributes": {
    "debuggers": [
      {
        "type": "node",
        "label": "Node Debug",

        "program": "./out/node/nodeDebug.js",
        "runtime": "node",

        "languages": ["javascript", "typescript", "javascriptreact", "typescriptreact"],

        "configurationAttributes": {
          "launch": {
            "required": ["program"],
            "properties": {
              "program": {
                "type": "string",
                "description": "The program to debug."
              }
            }
          }
        },

        "initialConfigurations": [
          {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${workspaceFolder}/app.js"
          }
        ],

        "configurationSnippets": [
          {
            "label": "Node.js: Attach Configuration",
            "description": "A new configuration for attaching to a running node program.",
            "body": {
              "type": "node",
              "request": "attach",
              "name": "${2:Attach to Port}",
              "port": 9229
            }
          }
        ],

        "variables": {
          "PickProcess": "extension.node-debug.pickNodeProcess"
        }
      }
    ]
  }
}
```

有关如何集成 `debugger` 的完整演练，请转到 [调试器插件](/api/extension-guides/debugger-extensions)。

## contributes.grammars

为语言贡献 TextMate 语法。您必须提供此语法适用的 `language`、语法的 TextMate `scopeName` 和文件路径。

> **注意：** 包含语法的文件可以是 JSON（以 .json 结尾的文件名）或 XML plist 格式（所有其他文件）。

### 语法示例

```json
{
  "contributes": {
    "grammars": [
      {
        "language": "markdown",
        "scopeName": "text.html.markdown",
        "path": "./syntaxes/markdown.tmLanguage.json",
        "embeddedLanguages": {
          "meta.embedded.block.frontmatter": "yaml"
        }
      }
    ]
  }
}
```

请参阅 [语法高亮指南](/api/language-extensions/syntax-highlight-guide) 以了解有关如何注册与语言关联的 TextMate 语法以接收语法高亮的更多信息。

<!-- 图片已移除 -->

## contributes.icons

按 ID 贡献新图标，以及默认图标。然后，插件（或任何依赖该插件的其他插件）可以在任何可以使用 `ThemeIcon` `new ThemeIcon("iconId")` 的地方、[Markdown 字符串](/api/references/icons-in-labels#icon-in-labels) (`$(iconId)`) 中以及作为某些贡献点中的图标使用图标 ID。

```json
{
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
}
```

## contributes.iconThemes

向 Baosky 贡献文件图标主题。文件图标显示在文件名旁边，指示文件类型。

您必须指定一个 ID（用于设置）、一个标签和文件图标定义文件的路径。

### 文件图标主题示例

```json
{
  "contributes": {
    "iconThemes": [
      {
        "id": "my-cool-file-icons",
        "label": "Cool File Icons",
        "path": "./fileicons/cool-file-icon-theme.json"
      }
    ]
  }
}
```

<!-- 图片已移除 -->

请参阅 [文件图标主题指南](/api/extension-guides/file-icon-theme) 了解如何创建文件图标主题。

## contributes.jsonValidation

为特定类型的 `json` 文件贡献验证架构。`url` 值可以是包含在插件中的架构文件的本地路径，也可以是远程服务器 URL，例如 [json schema store](https://www.schemastore.org/)。

```json
{
  "contributes": {
    "jsonValidation": [
      {
        "fileMatch": ".jshintrc",
        "url": "https://json.schemastore.org/jshintrc"
      }
    ]
  }
}
```

## contributes.keybindings

贡献键绑定规则，定义当用户按下组合键时应调用什么命令。请参阅 [键绑定](/docs/getstarted/keybindings) 主题，其中详细解释了键绑定。

贡献键绑定将导致默认键盘快捷方式显示您的规则，并且命令的每个 UI 表示现在都将显示您添加的键绑定。当然，当用户按下组合键时，将调用该命令。

> **注意：** 由于 Baosky 在 Windows、macOS 和 Linux 上运行，修饰符不同，您可以使用 "key" 设置默认组合键，并使用特定平台覆盖它。

> **注意：** 当调用命令时（通过键绑定或从命令面板），Baosky 将发出激活事件 `onCommand:${command}`。

### 键绑定示例

定义在 Windows 和 Linux 下 `kbstyle(Ctrl+F1)` 以及在 macOS 下 `kbstyle(Cmd+F1)` 触发 `"extension.sayHello"` 命令：

```json
{
  "contributes": {
    "keybindings": [
      {
        "command": "extension.sayHello",
        "key": "ctrl+f1",
        "mac": "cmd+f1",
        "when": "editorTextFocus"
      }
    ]
  }
}
```

<!-- 图片已移除 -->

## contributes.languages

贡献编程语言的定义。这将引入一种新语言或丰富 Baosky 对某种语言的了解。

`contributes.languages` 的主要作用是：

- 定义一个可以在 Baosky API 其他部分重用的 `languageId`，例如 `vscode.TextDocument.languageId` 和 `onLanguage` 激活事件。
  - 您可以使用 `aliases` 字段贡献人类可读的名称。列表中的第一项将用作人类可读标签。
- 将文件扩展名 (`extensions`)、文件名 (`filenames`)、文件名 [glob 模式](/docs/editor/glob-patterns) (`filenamePatterns`)、以特定行（如 hashbang）开头的文件 (`firstLine`) 和 `mimetypes` 关联到该 `languageId`。
- 为贡献的语言贡献一组 [声明性语言功能](/api/language-extensions/overview#declarative-language-features)。在 [语言配置指南](/api/language-extensions/language-configuration-guide) 中了解有关可配置编辑功能的更多信息。
- 贡献一个图标，如果主题不包含该语言的图标，则可以在文件图标主题中使用该图标

### 语言示例

```json
{
  "contributes": {
    "languages": [
      {
        "id": "python",
        "extensions": [".py"],
        "aliases": ["Python", "py"],
        "filenames": [],
        "firstLine": "^#!/.*\\bpython[0-9.-]*\\b",
        "configuration": "./language-configuration.json",
        "icon": {
          "light": "./icons/python-light.png",
          "dark": "./icons/python-dark.png"
        }
      }
    ]
  }
}
```

## contributes.menus

为编辑器或资源管理器贡献命令的菜单项。菜单项定义包含选择时应调用的命令以及该项目应显示的条件。后者使用 `when` 子句定义，该子句使用键绑定 [when 子句上下文](/api/references/when-clause-contexts)。

`command` 属性指示选择菜单项时要运行哪个命令。`submenu` 属性指示在此位置渲染哪个子菜单。

当声明 `command` 菜单项时，也可以使用 `alt` 属性定义替代命令。当在打开菜单时按下 `kbstyle(Alt)` 时，它将被显示并调用。在 Windows 和 Linux 上 `kbstyle(Shift)` 也可以这样做，这在 `kbstyle(Alt)` 会触发窗口菜单栏的情况下很有用。

最后，`group` 属性定义菜单项的排序和分组。`navigation` 组很特殊，因为它总是被排序到菜单的顶部/开始。

> **注意** `when` 子句适用于菜单，`enablement` 子句适用于命令。`enablement` 适用于所有菜单甚至键绑定，而 `when` 仅适用于单个菜单。

目前插件编写者可以贡献到：

- `commandPalette` - 全局命令面板
- `comments/comment/title` - 评论标题菜单栏
- `comments/comment/context` - 评论上下文菜单
- `comments/commentThread/title` - 评论线程标题菜单栏
- `comments/commentThread/context`- 评论线程上下文菜单
- `debug/callstack/context` - 调试调用堆栈视图上下文菜单
- `debug/callstack/context` 组 `inline` - 调试调用堆栈视图内联操作
- `debug/toolBar` - 调试视图工具栏
- `debug/variables/context` - 调试变量视图上下文菜单
- `editor/context` - 编辑器上下文菜单
- `editor/lineNumber/context` - 编辑器行号上下文菜单
- `editor/title` - 编辑器标题菜单栏
- `editor/title/context` - 编辑器标题上下文菜单
- `editor/title/run` - 编辑器标题菜单栏上的运行子菜单
- `explorer/context` - 资源管理器视图上下文菜单
- `extension/context` - 插件视图上下文菜单
- `file/newFile`  - 文件菜单和欢迎页面中的新建文件项
- `interactive/toolbar` - 交互式窗口工具栏
- `interactive/cell/title` - 交互式窗口单元格标题菜单栏
- `notebook/toolbar` - 笔记本工具栏
- `notebook/cell/title` - 笔记本单元格标题菜单栏
- `notebook/cell/execute` - 笔记本单元格执行菜单
- `scm/title` - [SCM 标题菜单](/api/extension-guides/scm-provider#menus)
- `scm/resourceGroup/context` - [SCM 资源组](/api/extension-guides/scm-provider#menus) 菜单
- `scm/resourceFolder/context` - [SCM 资源文件夹](/api/extension-guides/scm-provider#menus) 菜单
- `scm/resourceState/context` - [SCM 资源](/api/extension-guides/scm-provider#menus) 菜单
- `scm/change/title` - [SCM 更改标题](/api/extension-guides/scm-provider#menus) 菜单
- `scm/repository` - [SCM 存储库菜单](/api/extension-guides/scm-provider#menus)
- `scm/sourceControl`- [SCM 源代码管理菜单](/api/extension-guides/scm-provider#menus)
- `terminal/context` - 终端上下文菜单
- `terminal/title/context` - 终端标题上下文菜单
- `testing/item/context` - 测试资源管理器项上下文菜单
- `testing/item/gutter` - 测试项的装订线装饰菜单
- `timeline/title` - 时间线视图标题菜单栏
- `timeline/item/context` - 时间线视图项上下文菜单
- `touchBar` - macOS 触控栏
- `view/title` - [视图标题菜单](/api/references/contribution-points#contributes.views)
- `view/item/context` - [视图项上下文菜单](/api/references/contribution-points#contributes.views)
- `webview/context` - 任何 [webview](/api/extension-guides/webview) 上下文菜单
- 任何 [贡献的子菜单](/api/references/contribution-points#contributes.submenus)

> **注意 1：** 当从（上下文）菜单调用命令时，Baosky 尝试推断当前选定的资源，并在调用命令时将其作为参数传递。例如，资源管理器内的菜单项被传递所选资源的 URI，编辑器内的菜单项被传递文档的 URI。

> **注意 2：** 贡献给 `editor/lineNumber/context` 的菜单项的命令也会被传递行号。此外，这些项目可以在其 `when` 子句中引用 `editorLineNumber` 上下文键，例如通过使用 `in` 或 `not in` 运算符来针对插件管理的数组值上下文键进行测试。

除了标题之外，贡献的命令还可以指定图标，当调用菜单项表示为按钮（例如在标题菜单栏上）时，Baosky 将显示该图标。

### 菜单示例

这是一个命令菜单项：

```json
{
  "contributes": {
    "menus": {
      "editor/title": [
        {
          "when": "resourceLangId == markdown",
          "command": "markdown.showPreview",
          "alt": "markdown.showPreviewToSide",
          "group": "navigation"
        }
      ]
    }
  }
}
```

<!-- 图片已移除 -->

同样，这是一个添加到特定视图的命令菜单项。下面的示例贡献给像终端这样的任意视图：

```json
{
  "contributes": {
    "menus": {
      "view/title": [
        {
          "command": "terminalApi.sendText",
          "when": "view == terminal",
          "group": "navigation"
        }
      ]
    }
  }
}
```

<!-- 图片已移除 -->

这是一个子菜单菜单项：

```json
{
  "contributes": {
    "menus": {
      "scm/title": [
        {
          "submenu": "git.commit",
          "group": "2_main@1",
          "when": "scmProvider == git"
        }
      ]
    }
  }
}
```

<!-- 图片已移除 -->

### 命令面板菜单项的上下文特定可见性

在 `package.json` 中注册命令时，它们将自动显示在 **命令面板** (`kb(workbench.action.showCommands)`) 中。为了允许更多地控制命令可见性，可以使用 `commandPalette` 菜单项。它允许您定义 `when` 条件来控制命令是否应在 **命令面板** 中可见。

下面的代码片段使“Hello World”命令仅在编辑器中选择了某些内容时才在 **命令面板** 中可见：

```json
{
  "commands": [
    {
      "command": "extension.sayHello",
      "title": "Hello World"
    }
  ],
  "menus": {
    "commandPalette": [
      {
        "command": "extension.sayHello",
        "when": "editorHasSelection"
      }
    ]
  }
}
```

### 组的排序

菜单项可以分类到组中。它们按字典顺序排序，具有以下默认值/规则。\n您可以向这些组添加菜单项，或者在它们之间、下方或上方添加新的菜单项组。

**编辑器上下文菜单** 具有这些默认组：

- `navigation` - `navigation` 组在所有情况下都排在第一位。
- `1_modification` - 此组接下来出现，包含修改代码的命令。
- `9_cutcopypaste` - 倒数第二个默认组，包含基本编辑命令。
- `z_commands` - 最后一个默认组，包含打开命令面板的条目。

<!-- 图片已移除 -->

**资源管理器上下文菜单** 具有这些默认组：

- `navigation` - 与跨 Baosky 导航相关的命令。此组在所有情况下都排在第一位。
- `2_workspace` - 与工作区操作相关的命令。
- `3_compare` - 与在差异编辑器中比较文件相关的命令。
- `4_search` - 与在搜索视图中搜索相关的命令。
- `5_cutcopypaste` - 与剪切、复制和粘贴文件相关的命令。
- `6_copypath` - 与复制文件路径相关的命令。
- `7_modification` - 与文件修改相关的命令。

**编辑器选项卡上下文菜单** 具有这些默认组：

- `1_close` - 与关闭编辑器相关的命令。
- `3_preview` - 与固定编辑器相关的命令。

**编辑器标题菜单** 具有这些默认组：

- `navigation` - 与导航相关的命令。
- `1_run` - 与运行和调试编辑器相关的命令。
- `1_diff` - 与使用差异编辑器相关的命令。
- `3_open` - 与打开编辑器相关的命令。
- `5_close` - 与关闭编辑器相关的命令。

`navigation` 和 `1_run` 显示在主编辑器标题区域中。其他组显示在次要区域中 - 在 `...` 菜单下。

**终端选项卡上下文菜单** 具有这些默认组：

- `1_create` - 与创建终端相关的命令。
- `3_run` - 与在终端中运行/执行某事相关的命令。
- `5_manage` - 与管理终端相关的命令。
- `7_configure` - 与终端配置相关的命令。

**终端上下文菜单** 具有这些默认组：

- `1_create` - 与创建终端相关的命令。
- `3_edit` - 与操作文本、选择或剪贴板相关的命令。
- `5_clear` - 与清除终端相关的命令。
- `7_kill` - 与关闭/终止终端相关的命令。
- `9_config` - 与终端配置相关的命令。

**时间线视图项上下文菜单** 具有这些默认组：

- `inline` - 重要或常用的时间线项命令。渲染为工具栏。
- `1_actions` - 与处理时间线项相关的命令。
- `5_copy` - 与复制时间线项信息相关的命令。

**插件视图上下文菜单** 具有这些默认组：

- `1_copy` - 与复制插件信息相关的命令。
- `2_configure` - 与配置插件相关的命令。

### 组内排序

组内的顺序取决于标题或 order 属性。菜单项的组内顺序通过将 `@<number>` 附加到组标识符来指定，如下所示：

```json
{
  "editor/title": [
    {
      "when": "editorHasSelection",
      "command": "extension.Command",
      "group": "myGroup@1"
    }
  ]
}
```

## contributes.problemMatchers

贡献问题匹配器模式。这些贡献在输出面板运行器和终端运行器中都有效。下面是在插件中为 gcc 编译器贡献问题匹配器的示例：

```json
{
  "contributes": {
    "problemMatchers": [
      {
        "name": "gcc",
        "owner": "cpp",
        "fileLocation": ["relative", "${workspaceFolder}"],
        "pattern": {
          "regexp": "^(.*):(\\d+):(\\d+):\\s+(warning|error):\\s+(.*)$",
          "file": 1,
          "line": 2,
          "column": 3,
          "severity": 4,
          "message": 5
        }
      }
    ]
  }
}
```

现在可以通过名称引用 `$gcc` 在 `tasks.json` 文件中使用此问题匹配器。示例如下所示：

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "build",
      "command": "gcc",
      "args": ["-Wall", "helloWorld.c", "-o", "helloWorld"],
      "problemMatcher": "$gcc"
    }
  ]
}
```

另请参阅：[定义问题匹配器](/docs/debugtest/tasks#_defining-a-problem-matcher)

## contributes.problemPatterns

贡献可在问题匹配器中使用的命名问题模式（见上文）。

## contributes.productIconThemes

向 Baosky 贡献产品图标主题。产品图标是 Baosky 中使用的所有图标，文件图标和插件贡献的图标除外。

您必须指定一个 ID（用于设置）、一个标签和图标定义文件的路径。

### 产品图标主题示例

```json
{
  "contributes": {
    "productIconThemes": [
      {
        "id": "elegant",
        "label": "Elegant Icon Theme",
        "path": "./producticons/elegant-product-icon-theme.json"
      }
    ]
  }
}
```

<!-- 图片已移除 -->

请参阅 [产品图标主题指南](/api/extension-guides/product-icon-theme) 了解如何创建产品图标主题。

## contributes.resourceLabelFormatters

贡献资源标签格式化程序，指定如何在工作台各处显示 URI。例如，插件如何为具有 scheme `remotehub` 的 URI 贡献格式化程序：

```json
{
  "contributes": {
    "resourceLabelFormatters": [
      {
        "scheme": "remotehub",
        "formatting": {
          "label": "${path}",
          "separator": "/",
          "workspaceSuffix": "GitHub"
        }
      }
    ]
  }
}
```

这意味着所有具有 scheme `remotehub` 的 URI 将通过仅显示 URI 的 `path` 段来渲染，分隔符将为 `/`。具有 `remotehub` URI 的工作区将在其标签中具有 GitHub 后缀。

## contributes.semanticTokenModifiers

贡献可以通过主题规则高亮显示的新语义标记修饰符。

```json
{
  "contributes": {
    "semanticTokenModifiers": [
      {
        "id": "native",
        "description": "Annotates a symbol that is implemented natively"
      }
    ]
  }
}
```

请参阅 [语义高亮指南](/api/language-extensions/semantic-highlight-guide) 以阅读有关语义高亮的更多信息。

## contributes.semanticTokenScopes

贡献语义标记类型和修饰符与范围之间的映射，作为回退或支持特定于语言的主题。

```json
{
  "contributes": {
    "semanticTokenScopes": [
      {
        "language": "typescript",
        "scopes": {
          "property.readonly": ["variable.other.constant.property.ts"]
        }
      }
    ]
  }
}
```

请参阅 [语义高亮指南](/api/language-extensions/semantic-highlight-guide) 以阅读有关语义高亮的更多信息。

## contributes.semanticTokenTypes

贡献可以通过主题规则高亮显示的新语义标记类型。

```json
{
  "contributes": {
    "semanticTokenTypes": [
      {
        "id": "templateType",
        "superType": "type",
        "description": "A template type."
      }
    ]
  }
}
```

请参阅 [语义高亮指南](/api/language-extensions/semantic-highlight-guide) 以阅读有关语义高亮的更多信息。

## contributes.snippets

为特定语言贡献代码片段。`language` 属性是 [语言标识符](/docs/languages/identifiers)，`path` 是代码片段文件的相对路径，该文件以 [Baosky 代码片段格式](/docs/editing/userdefinedsnippets#_snippet-syntax) 定义代码片段。

下面的示例显示了为 Go 语言添加代码片段。

```json
{
  "contributes": {
    "snippets": [
      {
        "language": "go",
        "path": "./snippets/go.json"
      }
    ]
  }
}
```

## contributes.submenus

贡献一个子菜单作为占位符，菜单项可以贡献到该占位符上。子菜单需要一个 `label` 才能在父菜单中显示。

除了标题之外，命令还可以定义 Baosky 将在编辑器标题菜单栏中显示的图标。

### 子菜单示例

```json
{
  "contributes": {
    "submenus": [
      {
        "id": "git.commit",
        "label": "Commit"
      }
    ]
  }
}
```

<!-- 图片已移除 -->

## contributes.taskDefinitions

贡献并定义一个对象字面量结构，该结构允许在系统中唯一标识贡献的任务。任务定义至少具有 `type` 属性，但通常定义其他属性。例如，表示 package.json 文件中脚本的任务的任务定义如下所示：

```json
{
  "taskDefinitions": [
    {
      "type": "npm",
      "required": ["script"],
      "properties": {
        "script": {
          "type": "string",
          "description": "The script to execute"
        },
        "path": {
          "type": "string",
          "description": "The path to the package.json file. If omitted the package.json in the root of the workspace folder is used."
        }
      }
    }
  ]
}
```

任务定义使用 JSON 架构语法定义 `required` 和 `properties` 属性。`type` 属性定义任务类型。如果上面的例子：

- `"type": "npm"` 将任务定义与 npm 任务关联起来
- `"required": [ "script" ]` 定义 `script` 属性为必填项。`path` 属性是可选的。
- `"properties" : { ... }` 定义附加属性及其类型。

当插件实际创建任务时，它需要传递一个符合 package.json 文件中贡献的任务定义的 `TaskDefinition`。对于 `npm` 示例，package.json 文件内测试脚本的任务创建如下所示：

```ts
let task = new vscode.Task({ type: 'npm', script: 'test' }, ....);
```

## contributes.terminal

向 Baosky 贡献终端配置文件，允许插件处理配置文件的创建。定义后，该配置文件应在创建终端配置文件时出现

```json
{
  "activationEvents": [
    "onTerminalProfile:my-ext.terminal-profile"
  ],
  "contributes": {
    "terminal": {
      "profiles": [
        {
          "title": "Profile from extension",
          "id": "my-ext.terminal-profile"
        }
      ]
    },
  }
}
```

定义后，配置文件将显示在终端配置文件选择器中。激活后，通过返回终端选项来处理配置文件的创建：

```ts
vscode.window.registerTerminalProfileProvider('my-ext.terminal-profile', {
  provideTerminalProfile(token: vscode.CancellationToken): vscode.ProviderResult<vscode.TerminalOptions | vscode.ExtensionTerminalOptions> {
    return { name: 'Profile from extension', shellPath: 'bash' };
  }
});
```

## contributes.themes

向 Baosky 贡献颜色主题，为编辑器中的语法标记定义工作台颜色和样式。

您必须指定标签、主题是深色主题还是浅色主题（以便 Baosky 的其余部分进行更改以匹配您的主题）以及文件的路径（JSON 格式）。

### 主题示例

```json
{
  "contributes": {
    "themes": [
      {
        "label": "Monokai",
        "uiTheme": "vs-dark",
        "path": "./themes/monokai-color-theme.json"
      }
    ]
  }
}
```

<!-- 图片已移除 -->

请参阅 [颜色主题指南](/api/extension-guides/color-theme) 了解如何创建颜色主题。

## contributes.typescriptServerPlugins

贡献 [TypeScript 服务器插件](https://github.com/microsoft/TypeScript/wiki/Writing-a-Language-Service-Plugin)，以增强 Baosky 的 JavaScript 和 TypeScript 支持：

```json
{
  "contributes": {
    "typescriptServerPlugins": [
      {
        "name": "typescript-styled-plugin"
      }
    ]
  }
}
```

上面的示例插件贡献了 [`code`](https://github.com/microsoft/typescript-styled-plugin)，它为 JavaScript 和 TypeScript 添加了样式化组件 IntelliSense。此插件将从扩展加载，并且必须作为普通 NPM `dependency` 安装在插件中：

```json
{
  "dependencies": {
    "typescript-styled-plugin": "*"
  }
}
```

当用户使用 Baosky 的 TypeScript 版本时，将为所有 JavaScript 和 TypeScript 文件加载 TypeScript 服务器插件。如果用户使用的是工作区版本的 TypeScript，则不会激活它们，除非插件显式设置 `"enableForWorkspaceTypeScriptVersions": true`。

```json
{
  "contributes": {
    "typescriptServerPlugins": [
      {
        "name": "typescript-styled-plugin",
        "enableForWorkspaceTypeScriptVersions": true
      }
    ]
  }
}
```

### 插件配置

插件可以通过 Baosky 内置 TypeScript 插件提供的 API 将配置数据发送到贡献的 TypeScript 插件：

```ts
// In your Baosky extension

export async function activate(context: vscode.ExtensionContext) {
  // Get the TS extension
  const tsExtension = vscode.extensions.getExtension('vscode.typescript-language-features');
  if (!tsExtension) {
    return;
  }

  await tsExtension.activate();

  // Get the API from the TS extension
  if (!tsExtension.exports || !tsExtension.exports.getAPI) {
    return;
  }

  const api = tsExtension.exports.getAPI(0);
  if (!api) {
    return;
  }

  // Configure the 'my-typescript-plugin-id' plugin
  api.configurePlugin('my-typescript-plugin-id', {
    someValue: process.env['SOME_VALUE']
  });
}
```

TypeScript 服务器插件通过 `onConfigurationChanged` 方法接收配置数据：

```ts
// In your TypeScript plugin

import * as ts_module from 'typescript/lib/tsserverlibrary';

export = function init({ typescript }: { typescript: typeof ts_module }) {
  return {
    create(info: ts.server.PluginCreateInfo) {
      // Create new language service
    },
    onConfigurationChanged(config: any) {
      // Receive configuration changes sent from Baosky
    }
  };
};
```

此 API 允许 Baosky 插件将 Baosky 设置与 TypeScript 服务器插件同步，或动态更改插件的行为。看看 [TypeScript TSLint 插件](https://github.com/microsoft/baosky-typescript-tslint-plugin/blob/main/src/index.ts) 和 [lit-html](https://github.com/mjbvz/baosky-lit-html/blob/master/src/index.ts) 插件，看看这个 API 是如何在实践中使用的。

## contributes.views

向 Baosky 贡献视图。您必须为视图指定标识符和名称。您可以贡献到以下视图容器：

- `explorer`: 活动栏中的资源管理器视图容器
- `scm`: 活动栏中的源代码管理 (SCM) 视图容器
- `debug`: 活动栏中的运行和调试视图容器
- `test`: 活动栏中的测试视图容器
- 由插件贡献的 [自定义视图容器](#contributes.viewsContainers)。

当用户打开视图时，Baosky 将发出激活事件 `onView:${viewId}`（对于下面的示例为 `onView:nodeDependencies`）。您还可以通过提供 `when` 上下文值来控制视图的可见性。指定的 `icon` 将在无法显示标题时使用（例如，当视图被拖动到活动栏时）。`contextualTitle` 用于视图移出其默认视图容器并需要附加上下文时。

```json
{
  "contributes": {
    "views": {
      "explorer": [
        {
          "id": "nodeDependencies",
          "name": "Node Dependencies",
          "when": "workspaceHasPackageJSON",
          "icon": "media/dep.svg",
          "contextualTitle": "Package Explorer"
        }
      ]
    }
  }
}
```

<!-- 图片已移除 -->

可以通过两种方式填充视图的内容：

- 使用 [TreeView](/api/references/baosky-api#TreeView)，通过 `createTreeView` API 提供 [数据提供程序](/api/references/baosky-api#TreeDataProvider)，或直接通过 `registerTreeDataProvider` API 注册 [数据提供程序](/api/references/baosky-api#TreeDataProvider) 来填充数据。TreeView 非常适合显示分层数据和列表。请参阅 [tree-view-sample](https://github.com/microsoft/baosky-extension-samples/tree/main/tree-view-sample)。
- 使用 [WebviewView](/api/references/baosky-api#WebviewView)，通过 `registerWebviewViewProvider` 注册 [提供程序](/api/references/baosky-api#WebviewViewProvider)。Webview 视图允许在视图中渲染任意 HTML。有关更多详细信息，请参阅 [webview 视图示例插件](https://github.com/microsoft/baosky-extension-samples/tree/main/webview-view-sample)。

## contributes.viewsContainers

贡献一个视图容器，可以将 [自定义视图](#contributes.views) 贡献到其中。您必须指定视图容器的标识符、标题和图标。目前，您可以将它们贡献给活动栏 (`activitybar`) 和面板 (`panel`)。下面的示例展示了如何将 `Package Explorer` 视图容器贡献给活动栏，以及如何将视图贡献给它。

```json
{
  "contributes": {
    "viewsContainers": {
      "activitybar": [
        {
          "id": "package-explorer",
          "title": "Package Explorer",
          "icon": "resources/package-explorer.svg"
        }
      ]
    },
    "views": {
      "package-explorer": [
        {
          "id": "package-dependencies",
          "name": "Dependencies"
        },
        {
          "id": "package-outline",
          "name": "Outline"
        }
      ]
    }
  }
}
```

<!-- 图片已移除 -->

### 图标规范

- `尺寸：` 图标应为 24x24 并居中。
- `颜色：` 图标应使用单一颜色。
- `格式：` 建议图标使用 SVG 格式，尽管接受任何图像文件类型。
- `状态：` 所有图标继承以下状态样式：

  | 状态   | 不透明度 |
  | ------- | ------- |
  | 默认 | 60%     |
  | 悬停   | 100%    |
  | 活动  | 100%    |

## contributes.viewsWelcome

向 [自定义视图](#contributes.views) 贡献欢迎内容。欢迎内容仅适用于空树视图。如果树没有子项且没有 `TreeView.message`，则认为视图为空。按照惯例，任何单独一行的命令链接都显示为按钮。您可以使用 `view` 属性指定欢迎内容应应用于哪个视图。可以使用 `when` 上下文值控制欢迎内容的可见性。要显示为欢迎内容的文本通过 `contents` 属性设置。

```json
{
  "contributes": {
    "viewsWelcome": [
      {
        "view": "scm",
        "contents": "In order to use git features, you can open a folder containing a git repository or clone from a URL.\n[Open Folder](command:vscode.openFolder)\n[Clone Repository](command:git.clone)\nTo learn more about how to use git and source control in Baosky [read our docs](https://aka.ms/vscode-scm).",
        "when": "config.git.enabled && git.state == initialized && workbenchState == empty"
      }
    ]
  }
}
```

<!-- 图片已移除 -->

可以将多个欢迎内容项贡献给一个视图。发生这种情况时，来自 Baosky 核心的内容排在最前面，其次是来自内置插件的内容，然后是来自所有其他插件的内容。

## contributes.walkthroughs

[示例插件](https://github.com/microsoft/baosky-extension-samples/tree/main/getting-started-sample)

贡献出现在入门页面上的入门指引 (Walkthroughs)。入门指引在安装您的插件时自动打开，并提供了一种向用户介绍您的插件功能的便捷方式。

入门指引由标题、描述、ID 和一系列步骤组成。此外，可以设置 `when` 条件以根据上下文键隐藏或显示入门指引。例如，解释 Linux 平台设置的入门指引可以给予 `when: "isLinux"` 以仅出现在 Linux 机器上。

入门指引中的每一步都有标题、描述、ID 和媒体元素（图像或 Markdown 内容），以及一组可选的会导致该步骤被选中的事件（如下面的示例所示）。步骤描述是 Markdown 内容，并支持 `**粗体**`、`__下划线__` 和 ``` ``代码`` ``` 渲染以及链接。与入门指引类似，可以给步骤 `when` 条件以根据上下文键隐藏或显示它们。

建议使用 SVG 作为图像，因为它们具有缩放能力并且支持 Baosky 的主题颜色。使用 [Baosky Color Mapper](https://www.figma.com/community/plugin/1218260433851630449) Figma 插件可以轻松引用 SVG 中的主题颜色。

```json
{
  "contributes": {
    "walkthroughs": [
      {
        "id": "sample",
        "title": "Sample",
        "description": "A sample walkthrough",
        "steps": [
          {
            "id": "runcommand",
            "title": "Run Command",
            "description": "This step will run a command and check off once it has been run.\n[Run Command](command:getting-started-sample.runCommand)",
            "media": { "image": "media/image.png", "altText": "Empty image" },
            "completionEvents": ["onCommand:getting-started-sample.runCommand"]
          },
          {
            "id": "changesetting",
            "title": "Change Setting",
            "description": "This step will change a setting and check off when the setting has changed\n[Change Setting](command:getting-started-sample.changeSetting)",
            "media": { "markdown": "media/markdown.md" },
            "completionEvents": ["onSettingChanged:getting-started-sample.sampleSetting"]
          }
        ]
      }
    ]
  }
}
```

<!-- 图片已移除 -->

### 完成事件

默认情况下，如果没有提供 `completionEvents` 事件，则当单击步骤的任何按钮时，或者如果步骤没有按钮，则在打开步骤时，将检查该步骤。如果需要更精细的控制，可以提供 `completionEvents` 列表。

可用的完成事件包括：

- `onCommand:myCommand.id`：当运行命令时检查步骤。
- `onSettingChanged:mySetting.id`：一旦修改了给定的设置，就检查步骤。
- `onContext:contextKeyExpression`：当上下文键表达式计算为真时检查步骤。
- `extensionInstalled:myExt.id`：如果安装了给定的插件，则检查步骤。
- `onView:myView.id`：一旦给定的视图变为可见，就检查步骤。
- `onLink:https://...`：一旦通过入门指引打开给定的链接，就检查步骤。

一旦选中了一个步骤，它将保持选中状态，直到用户显式取消选中该步骤或重置其进度（通过 **入门：重置进度** 命令）。