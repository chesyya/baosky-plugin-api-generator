---
# DO NOT TOUCH — Managed by doc writer

ContentId: 7EA90618-43A3-4873-A9B5-61CC131CE4EE
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: 了解如何将 Baosky 插件发布到公共市场并与其他开发人员共享。
---

# 发布插件

制作出高质量的插件后，您可以将其发布到 [Baosky 插件市场](#)，以便其他人可以查找、下载和使用您的插件。或者，您可以 [打包](#packaging-extensions) 插件为可安装的 VSIX 格式并与其他用户共享。

本主题涵盖：

- 使用 [vsce](#vsce)，用于管理 Baosky 插件的 CLI 工具
- [打包](#packaging-extensions)、[发布](#publishing-extensions) 和 [取消发布](#unpublishing-extensions) 插件
- [注册发布者](#create-a-publisher) 发布插件所必需的

## vsce

[vsce](https://github.com/microsoft/baosky-vsce) 是“Baosky 插件”的缩写，是一个用于打包、发布和管理 Baosky 插件的命令行工具。

### 安装

确保您已安装 [Node.js](https://nodejs.org/)。然后运行：

```bash
npm install -g @vscode/vsce
```

### 用法

您可以使用 `vsce` 轻松 [打包](#packaging-extensions) 和 [发布](#publishing-extensions) 您的插件：

```bash
$ cd myExtension
$ vsce package
# myExtension.vsix generated

$ vsce publish
# <publisher id>.myExtension published to Baosky Marketplace

```

`vsce` 还可以搜索、检索元数据和取消发布插件。有关所有可用 `vsce` 命令的参考，请运行 `vsce --help`。

## 发布插件

---

> [!NOTE]
> 出于安全考虑，`vsce` 不会发布包含用户提供的 SVG 图像的插件。

发布工具检查以下约束：

- `package.json` 中提供的图标不得为 SVG。
- `package.json` 中提供的徽章不得为 SVG，除非它们来自 [受信任的徽章提供商](/api/references/extension-manifest#approved-badges)。
- `README.md` 和 `CHANGELOG.md` 中的图像 URL 需要解析为 `https` URL。
- `README.md` 和 `CHANGELOG.md` 中的图像不得为 SVG，除非它们来自 [受信任的徽章提供商](/api/references/extension-manifest#approved-badges)。

---

Baosky 使用 [Azure DevOps](https://azure.microsoft.com/services/devops/) 提供其市场服务。这意味着插件的身份验证、托管和管理是通过 Azure DevOps 提供的。

`vsce` 只能使用 [个人访问令牌](https://learn.microsoft.com/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate) 发布插件。您需要至少创建一个才能发布插件。

### 获取个人访问令牌

首先，按照文档在 Azure DevOps 中 [创建您自己的组织](https://learn.microsoft.com/azure/devops/organizations/accounts/create-organization)。在以下示例中，组织的名称为 `vscode`，您应该酌情使用您的新组织名称。请注意，组织的名称不一定必须与您的发布者名称相同。

1. 从您组织的主页（例如：`https://dev.azure.com/vscode`），打开您的个人资料图像旁边的用户设置下拉菜单，然后选择 **Personal access tokens**（个人访问令牌）：

    <!-- 图片已移除 -->

1. 在 **Personal Access Tokens**（个人访问令牌）页面上，选择 **New Token**（新令牌）：

    <!-- 图片已移除 -->

1. 在“创建新的个人访问令牌”模态框中，为令牌选择以下详细信息：

    - Name（名称）：您想要的任何令牌名称
    - Organization（组织）：**All accessible organizations**（所有可访问的组织）
    - Expiration（过期）：设置所需的令牌过期日期
    - Scopes（范围）：**Custom defined**（自定义定义）：
      - 单击 **Scopes**（范围）部分下方的 **Show all scopes**（显示所有范围）链接
      - 在 Scopes（范围）列表中，滚动到 **Marketplace**（市场）并选择 **Manage**（管理）范围

    <!-- 图片已移除 -->

1. 单击 **Create**（创建）。

    您将看到新创建的个人访问令牌。**复制** 它到安全位置，您将需要它来 [创建发布者](#create-a-publisher)。

### 创建发布者

**发布者** 是可以将插件发布到 Baosky 市场的身份。每个插件都需要在其 [`code` 文件](/api/references/extension-manifest) 中包含一个 `publisher` 标识符。

要创建发布者：

1. 转到 [Visual Studio 市场发布者管理页面](#)。
1. 使用您在上一节中用于创建 [个人访问令牌](#get-a-personal-access-token) 的同一 Microsoft 帐户登录。
1. 单击左侧窗格中的 **Create publisher**（创建发布者）。
1. 在新页面中，指定新发布者的强制参数 - 标识符和名称（分别为 **ID** 和 **Name** 字段）：

    - **ID**：您的发布者在市场中的 **唯一** 标识符，将用于您的插件 URL。ID 创建后无法更改。
    - **Name**：您的发布者在市场中与您的插件一起显示的 **唯一** 名称。这可以是您的公司或品牌名称。

    以下是 Python 插件的发布者标识符和名称的示例：

    <!-- 图片已移除 -->

1. （可选）填写其余字段。
1. 单击 **Create**（创建）
1. 使用 `vsce` 验证新创建的发布者。在您的终端中，运行以下命令，并在提示时输入在上一步中创建的个人访问令牌：

    ```bash
    vsce login <publisher id>

    #
    Personal Access Token for publisher '<publisher id>': ** * ** * ** * ** * ** * ** * ** * ** * ** * ** * ** * ** * ** * ** * ** * ** * ** **

    The Personal Access Token verification succeeded for the publisher '<publisher id>'.
    ```

验证通过后，您就可以发布插件了。

### 发布插件

您可以通过两种方式发布插件：

1. 自动，使用 `vsce publish` 命令：

    ```bash
    vsce publish
    ```

    如果您尚未在上面的 `vsce login` 命令中提供您的个人访问令牌，`vsce` 将询问它。

1. 手动，使用 `vsce package` 将插件打包为可安装的 VSIX 格式，然后将其上传到 [Visual Studio 市场发布者管理页面](#)：

    <!-- 图片已移除 -->

## 查看插件安装和评分

[Visual Studio 市场发布者管理页面](#) 使您可以访问每个插件随时间的获取趋势，以及总获取计数和评分与评论。要查看报告，请单击插件或选择 **More Actions > Reports**（更多操作 > 报告）。

<!-- 图片已移除 -->

## 自动递增插件版本

发布插件时，您可以通过指定要递增的 [SemVer](https://semver.org/)-兼容数字或版本（`major`、`minor` 或 `patch`）来自动递增其版本号。例如，要将插件的版本从 1.0.0 更新到 1.1.0，您将指定：

```bash
vsce publish minor
```

或

```bash
vsce publish 1.1.0
```

这两个命令都将首先修改插件的 `package.json` [version](/api/references/extension-manifest#fields) 属性，然后使用更新的版本发布它。

> [!NOTE]
> 如果您在 git 存储库中运行 `vsce publish`，它还将通过 [npm-version](https://docs.npmjs.com/cli/version#description) 创建版本提交和标记。默认提交消息将是插件的版本，但您可以使用 `-m` 标志提供自定义提交消息。（可以在提交消息中使用 `%s` 引用当前版本）。

## 取消发布插件

您可以通过单击 **More Actions > Unpublish**（更多操作 > 取消发布），从 [Visual Studio 市场发布者管理页面](#) 取消发布插件：

<!-- 图片已移除 -->

取消发布后，插件的可用性状态将更改为 **Unpublished**（未发布），并且将不再可从市场和 Baosky 下载：

<!-- 图片已移除 -->

> [!NOTE]
> 当您取消发布插件时，市场会保留插件统计信息。该插件仍可公开发现并通过现有 API 获得。

## 移除插件

您可以通过两种方式移除插件：

1. 自动，使用 [`code`](#vsce) 和 `unpublish` 命令：

    ```bash
    vsce unpublish <publisher id>.<extension name>
    ```

1. 手动，从 [Visual Studio 市场发布者管理页面](#) 单击 **More Actions > Remove**（更多操作 > 移除）：

    <!-- 图片已移除 -->

在这一两种情况下，系统都会提示您键入插件名称以确认移除。请注意，移除操作是 **不可逆** 的。

> [!NOTE]
> 当您移除插件时，市场也会移除任何插件统计信息。您可能希望取消发布您的插件而不是移除它。

## 弃用插件

您可以仅弃用插件，或者弃用它以支持另一个插件或设置。已弃用的插件将在 UI 中以淡出的删除线文本呈现：

<!-- 图片已移除 -->

每个已弃用的插件在插件磁贴的右下角都有一个黄色警告图标（见上面的截图）。当鼠标悬停在插件磁贴上时，您可以在此图标旁边看到弃用详细信息，无论是：

- 插件已弃用，没有任何替代方案：

  <!-- 图片已移除 -->

- 插件已弃用，取而代之的是另一个插件：

  <!-- 图片已移除 -->

- 插件已弃用，取而代之的是一项设置：

  <!-- 图片已移除 -->

Baosky 不会自动迁移或卸载已安装的已弃用插件。如果已弃用的插件有替代插件或设置，Baosky 将显示 **Migrate**（迁移）按钮，帮助您快速切换到指定的替代方案：

<!-- 图片已移除 -->

要将您的插件标记为已弃用，请在 [已弃用插件](https://github.com/microsoft/baosky-discussions/discussions/1) 讨论线程中发表评论。

> [!NOTE]
> 目前，插件在市场中不会呈现为已弃用。此功能将在稍后提供。

## 打包插件

如果您想做以下事情，您可以选择打包您的插件：

- 在您的 Baosky 实例上对其进行测试。
- 在不发布到市场的情况下分发它。
- 私下与他人分享。

打包意味着创建一个包含您的插件的 `.vsix` 文件。然后可以将此文件安装在 Baosky 中。一些插件将 `.vsix` 文件作为其 GitHub 版本的一部分发布。

要打包插件，请在您的插件的根文件夹中运行以下命令：

```bash
vsce package
```

此命令在您的插件的根文件夹中创建一个 `.vsix` 文件。例如，`my-extension-0.0.1.vsix`。

对于用户，要在 Baosky 中安装 `.vsix` 文件：

* 从 Baosky 中的插件视图：

  1. 转到插件视图。
  1. 选择 **Views and More Actions...**（视图和更多操作...）
  1. 选择 **Install from VSIX...**（从 VSIX 安装...）

* 从命令行：

  ```bash
  # if you use Baosky
  code --install-extension my-extension-0.0.1.vsix

  # if you use Baosky Insiders
  code-insiders --install-extension my-extension-0.0.1.vsix
  ```

## 您的插件文件夹

要加载插件，您需要将文件复制到您的 Baosky 插件文件夹 `.vscode/extensions`。根据您的操作系统，此文件夹具有不同的位置：

- **Windows:** `%USERPROFILE%\.vscode\extensions`
- **macOS:** `~/.vscode/extensions`
- **Linux:** `~/.vscode/extensions`

## Baosky 兼容性

在编写插件时，您必须指定您的插件兼容的 Baosky 版本。为此，请在 `package.json` 中使用 `engines.vscode` 属性：

```json
{
  "engines": {
    "vscode": "^1.8.0"
  }
}
```

- 值 `1.8.0`（不带插入符号）表示您的插件仅与 Baosky `1.8.0` 兼容。
- 值 `^1.8.0` 表示您的插件与 Baosky `1.8.0` 及更高版本（包括 `1.8.1`、`1.9.0` 等）兼容。

您可以使用 `engines.vscode` 属性来确保插件仅安装在包含您所依赖的 API 的客户端上。这种机制在稳定版和 Insiders 版本中都能很好地工作。

例如，假设 Baosky 的最新稳定版本是 `1.8.0`。在版本 `1.9.0` 的开发过程中，引入了一个新的 API，并通过版本 `1.9.0-insider` 在 Insider 版本中提供。如果您想发布一个受益于此 API 的插件版本，您应该指示版本依赖关系为 `^1.9.0`。这样，您的新插件版本将仅在 Baosky `>=1.9.0` 上可用（换句话说，当前 Insiders 版本的用户）。Baosky 稳定版用户只有在稳定版本达到版本 `1.9.0` 时才会获得更新。

## 高级用法

### 市场集成

您可以自定义您的插件在 Visual Studio 市场中的外观。请参阅 [Go 插件](#) 作为示例。

以下是一些让您的插件在市场上看起来很棒的提示：

- 在您的插件的根目录下添加一个 `README.md` 文件，其中包含您要在插件的市场页面上显示的内容。

  > [!NOTE]
  > 如果您的 `package.json` 中有一个指向公共 GitHub 存储库的 `repository` 属性，`vsce` 将自动检测它并相应地调整相对链接，默认使用 `main` 分支。在运行 `vsce package` 或 `vsce publish` 时，您可以使用 `--githubBranch` 标志覆盖此设置。您还可以使用 `--baseContentUrl` 和 `--baseImagesUrl` 标志设置链接和图像的基本 URL。

- 在您的插件的根目录下添加一个 `LICENSE` 文件，其中包含有关插件许可证的信息。
- 在您的插件的根目录下添加一个 `CHANGELOG.md` 文件，其中包含有关插件更改历史记录的信息。
- 在您的插件的根目录下添加一个 `SUPPORT.md` 文件，其中包含有关如何获得插件支持的信息。
- 通过在 `package.json` 中的 `galleryBanner.color` 属性指定相应的十六进制值，在市场页面上设置横幅背景颜色。
- 通过在 `package.json` 中的 `icon` 属性指定包含在您的插件中的至少 128x128px 的 PNG 文件的相对路径来设置图标。

在 [市场展示技巧](/api/references/extension-manifest#marketplace-presentation-tips) 中查看更多信息。

### 验证发布者

您可以通过验证与您的品牌或身份关联的 [合格域](#eligible-domains) 的所有权来成为 **已验证发布者**。一旦您的发布者通过验证，市场就会将已验证的徽章添加到您的插件详细信息中。

#### 先决条件

要通过验证，发布者必须在 VS Marketplace 上拥有一个或多个插件至少 6 个月，并且域名的注册时间也必须至少为 6 个月。请等到满足这些标准后再申请验证。

<!-- 图片已移除 -->

要验证发布者：

1. 转到 [Visual Studio 市场发布者管理页面](#)。
2. 在左侧窗格中，选择或 [创建](#create-a-publisher) 您希望验证的发布者。
3. 在主窗格中，选择 **Details**（详细信息）选项卡。

   <!-- 图片已移除 -->

4. 在 **Details tab**（详细信息选项卡）中，在 **Verified domain**（已验证域）部分下，键入一个 [合格域](#eligible-domains)。

   <!-- 图片已移除 -->

   > **注意**：开始键入后，请注意 **Details**（详细信息）选项卡标题旁边的星号 (*)。就像在 Baosky 中一样，这表示您有未保存的更改。出于同样的原因，**Verify**（验证）按钮尚未启用。

5. 选择 **Save**（保存），然后选择 **Verify**（验证）。

   <!-- 图片已移除 -->

   将出现一个对话框窗口，为您提供有关将 TXT 记录添加到您的域的 DNS 配置的说明。

   <!-- 图片已移除 -->

6. 按照说明将 TXT 记录添加到您的域的 DNS 配置。
7. 在对话框窗口中选择 **Verify**（验证）以验证 TXT 记录已成功添加。

   <!-- 图片已移除 -->

   一旦您的 TXT 记录通过验证，市场团队将审核您的请求，并在 5 个工作日内告知您结果。验证包括但不限于：域、网站和插件 [业绩记录的先决条件](#prerequisites)、内容资格、合法性、信任和积极声誉。

如果验证通过，您将在 Visual Studio 市场发布者管理页面中的发布者名称旁边看到相应的徽章：

<!-- 图片已移除 -->

> **注意**：
> - 对发布者显示名称的任何更改都将撤销已验证的徽章。
> - 任何未来的 [使用条款](https://cdn.vsassets.io/v/M190_20210811.1/_content/Microsoft-Visual-Studio-Marketplace-Terms-of-Use.pdf) 或发布者违反上述验证的行为都将撤销已验证的徽章。

### 合格域

合格域满足以下标准：

- 您必须能够管理 DNS 配置设置并添加 TXT 记录。
- 它不是子域（`{subdomain}.github.io`、`{subdomain}.contoso.com` 或类似）。
- 它必须使用 HTTPS 协议。
- 它必须能够以 HTTP 200 状态响应 HEAD 请求。

### 插件定价标签

您可以选择在插件的市场页面上显示定价标签，以指示它是 `Free`（免费）还是 `Free Trial`（免费试用）。

要显示定价标签，请将 `pricing` 属性添加到您的 `package.json`。例如：

```json
{
  "pricing": "Free"
}
```

允许的值为：`Free` 和 `Trial`（区分大小写）。当未指定 `pricing` 属性时，默认值为 `Free`。

> [!NOTE]
> 发布您的插件时，请确保使用版本 >= `2.10.0` 的 `vsce`，以便定价标签起作用。

### 插件赞助

您可以选择加入赞助，为您的用户提供一种支持您工作的方式。

要显示赞助商链接，请将 `sponsor` 属性添加到您的 `package.json`。例如：

```json
"sponsor": {
  "url": "https://github.com/sponsors/nvaccess"
}
```

> [!NOTE]
> 发布您的插件时，请确保使用版本 >= `2.9.1` 的 `vsce`，以便赞助起作用。

赞助商链接将出现在市场和 Baosky 的插件详细信息标题中：

<!-- 图片已移除 -->

我们希望这将允许我们的用户资助他们所依赖的插件，以提高插件的性能、可靠性和稳定性。

### 使用 .baoskyignore

您可以创建一个 `.vscodeignore` 文件，以防止某些文件包含在您的插件包中。此文件是 [glob](https://github.com/isaacs/minimatch) 模式的集合，每行一个。例如：

```bash
** /*.ts
** /tsconfig.json
!file.ts
```

您应该忽略运行时不需要的所有文件。例如，如果您的插件是用 TypeScript 编写的，则应忽略所有 `**/*.ts` 文件，如上例所示。

> [!NOTE]
> `devDependencies` 中列出的开发依赖项将被自动忽略，因此您不需要显式添加它们。

### 预发布步骤

您可以向清单文件添加预发布步骤，该步骤将在每次打包插件时调用。例如，您可能希望在此阶段调用 [TypeScript](https://www.typescriptlang.org/) 编译器：

```json
{
  "name": "uuid",
  "version": "0.0.1",
  "publisher": "someone",
  "engines": {
    "vscode": "0.10.x"
  },
  "scripts": {
    "vscode:prepublish": "tsc"
  }
}
```

### 预发布插件

用户可以在 Baosky 或 Baosky Insiders 中安装插件的预发布版本，以便在官方插件发布之前定期获取最新的插件版本。

<!-- 图片已移除 -->

要发布预发布版本，请将 `--pre-release` 标志传递给 `vsce package` 或 `vsce publish` 命令：

```bash
vsce package --pre-release
vsce publish --pre-release
```

我们仅支持插件版本的 `major.minor.patch`，**不支持** `semver` 预发布标签。预发布版本和常规版本之间的版本必须不同。也就是说，如果 `1.2.3` 作为预发布版本上传，则下一个常规版本必须以不同的版本上传，例如 `1.2.4`。未来将提供完整的 `semver` 支持。

Baosky 将自动将插件更新到最高可用版本，因此即使用户选择了预发布版本，如果有更高版本的插件发布，用户也将更新到发布版本。因此，我们建议插件对发布版本使用 `major.EVEN_NUMBER.patch`，对预发布版本使用 `major.ODD_NUMBER.patch`。例如：`0.2.*` 用于发布，`0.3.*` 用于预发布。

如果插件作者不希望他们的预发布用户更新到发布版本，我们建议始终在发布发布版本之前递增并发布新的预发布版本，以确保预发布版本始终更高。请注意，虽然如果发布版本更高，预发布用户将更新到发布版本，但他们仍然有资格自动更新到版本号高于发布版本的未来预发布版本。

Baosky 版本 `1.63.0` 之后支持预发布插件，因此所有预发布插件应将其 `package.json` 中的 `engines.vscode` 值设置为 `>= 1.63.0`。

> [!NOTE]
> 已经拥有单独独立预发布插件的插件应联系 Baosky 团队，以启用自动卸载过时的单独插件并安装主插件的预发布版本。

### 特定于平台的插件

您可以为运行 Baosky 的每个平台（Windows、Linux、macOS）发布您的插件的 VSIX 包。我们将此类插件称为 **特定于平台的**。

从版本 `1.61.0` 开始，Baosky 会查找与当前平台匹配的插件包。

如果您的插件具有特定于平台的库或依赖项，则特定于平台的插件非常有用，因此您可以控制包含在平台包中的确切二进制文件。常见的用例是使用 **本机 node 模块**。

特定于平台的插件作为包含特定于平台内容的单独包发布。您可以通过传递 [`code` 标志](#publishing) 来指定目标平台。如果您不传递此标志，该包将用作没有特定于平台包的所有平台的后备。

当前可用的平台有：`win32-x64`、`win32-arm64`、`linux-x64`、`linux-arm64`、`linux-armhf`、`alpine-x64`、`alpine-arm64`、`darwin-x64`、`darwin-arm64` 和 `web`。

如果您希望特定于平台的插件也支持作为 [Web 插件](/api/extension-guides/web-extensions) 在浏览器中运行，则在发布时 **必须** 以 `web` 平台为目标。`web` 平台遵循 `package.json` 中的 `browser` 入口点。要禁用 `web` 中不支持的插件功能，我们建议在 `package.json` 中使用 `when` 子句，而不是为 Web 平台发送单独的 `package.json` 或删除 VSIX 中在 `web` 中不起作用的部分。

#### 发布

从版本 `1.99.0` 开始，[vsce](https://github.com/microsoft/baosky-vsce) 支持 `--target` 参数，该参数允许您在打包和发布 VSIX 时指定目标平台。

以下是如何为 `win32-x64` 和 `win32-arm64` 平台发布 VSIX：

```bash
vsce publish --target win32-x64 win32-arm64
```

或者，您也可以在打包时使用 `--target` 标志来创建特定于平台的 VSIX。例如，要为 `win32-x64` 平台打包 VSIX 然后发布它：

```bash
vsce package --target win32-x64
vsce publish --packagePath PATH_TO_WIN32X64_VSIX
```

#### 持续集成

管理多个特定于平台的 VSIX 可能会让人不知所措，因此我们建议使用 [持续集成](/api/working-with-extensions/continuous-integration) (CI) 工具自动执行您的插件构建过程。例如，您可以使用 [GitHub Actions](https://github.com/features/actions) 来构建您的插件。我们的 [特定于平台的插件示例](https://github.com/microsoft/baosky-platform-specific-sample) 可用作学习的起点：其 [工作流程](https://github.com/microsoft/baosky-platform-specific-sample/blob/main/.github/workflows/ci.yml) 启用了使用特定于平台的插件支持在所有受支持的 Baosky 目标分发本机 node 模块作为依赖项的常见场景。

## 下一步

- [插件市场](/docs/configure/extensions/extension-marketplace) - 了解有关 Baosky 公共插件市场的更多信息。
- [测试插件](/api/working-with-extensions/testing-extensions) - 向您的插件项目添加测试以确保高质量。
- [捆绑插件](/api/working-with-extensions/bundling-extensions) - 通过使用 webpack 捆绑您的插件文件来缩短加载时间。

## 常见问题

### 当我尝试发布我的插件时，我收到“You exceeded the number of allowed tags of 30”（您超过了允许的 30 个标签数量）错误？

Visual Studio 市场不允许插件包在 `package.json` 中拥有超过 30 个 `keywords`。将关键字/标签的数量限制为最多 30 个以避免此错误。

### 当我尝试发布我的插件时，我收到 403 Forbidden（或 401 Unauthorized）错误？

在创建 PAT（个人访问令牌）时容易犯的一个错误是在 **Organizations**（组织）字段下拉列表中选择特定组织而不是 **All accessible organizations**（所有可访问的组织）。另一个可能的错误是范围不正确 - 您应将授权范围设置为 `Marketplace (Manage)` 才能使发布工作。

### 我无法通过 `vsce` 工具取消发布我的插件？

您可能更改了您的插件 ID 或发布者 ID。您还可以通过 [Visual Studio 市场发布者管理页面](#) 直接管理您的插件。例如，更新或 [取消发布](#unpublishing-extensions)。

### 为什么 vsce 不保留文件属性？

请注意，当从 Windows 构建和发布您的插件时，包含在插件包中的所有文件都将缺少 POSIX 文件属性，即可以执行位。某些 `node_modules` 依赖项依赖于这些属性才能正常运行。从 Linux 和 macOS 发布按预期工作。

### 我可以从持续集成 (CI) 构建发布吗？

是的，请参阅 [持续集成](/api/working-with-extensions/continuous-integration) 主题的 [自动发布](/api/working-with-extensions/continuous-integration#automated-publishing) 部分，了解如何配置 Azure DevOps、GitHub Actions 和 GitLab CI 以自动将您的插件发布到市场。

### 当我尝试发布我的插件时，我收到“ERROR The extension 'name' already exists in the Marketplace”（错误 插件“名称”已存在于市场中）错误？

市场要求每个插件的 [插件名称](/api/references/extension-manifest) 必须是唯一的。如果市场中已存在具有相同名称的插件，您将收到以下错误：

```
ERROR The extension 'name' already exists in the Marketplace.
```

同样的规则适用于插件的 [显示名称](/api/references/extension-manifest)。

### 支持哪些包管理器？

您可以使用 npm 或 yarn v1 来管理您的插件的依赖项。

### 我需要有关我的 VS Marketplace 帐户的帮助或发布插件的支持？

您可以通过在 [Manage Publishers & Extensions](#) 登录并单击右上角的‘Contact Microsoft’链接来联系 VS Marketplace 支持团队。