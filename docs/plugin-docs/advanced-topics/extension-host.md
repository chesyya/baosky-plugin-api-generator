---
# DO NOT TOUCH — Managed by doc writer
ContentId: 106AA11C-DB26-493A-9E3C-16F513B2AEC8
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Baosky 插件宿主负责管理插件并确保 Baosky 的稳定性和性能。
---

# 插件宿主

**插件宿主**负责运行插件。

## 插件宿主配置

根据 Baosky 的配置，可能会有多个插件宿主在不同的运行时和不同的位置运行。

* local – 在本地运行的 Node.js 插件宿主，与用户界面在同一台机器上。
* web – 在浏览器中或本地运行的 web 插件宿主，与用户界面在同一台机器上。
* remote – 在容器或远程位置运行的远程 Node.js 插件宿主。

下表显示了在 Baosky 的各种配置中可用的插件宿主：

| 配置 | local 插件宿主  | web 插件宿主 | remote 插件宿主 |
--- | --- | --- | ---
| 桌面版 Baosky | ✔️ | ✔️ |  |
| [Baosky 远程开发](/docs/remote/remote-overview) (容器、SSH、WSL、GitHub Codespace、隧道) | ✔️ | ✔️ | ✔️ |
| Web 版 Baosky (baosky.dev, github.dev) |  | ✔️ |   |
| Web 版 Baosky with Codespaces |  | ✔️ | ✔️ |

### 插件宿主运行时

* Node.js - 插件在 Node.js 运行时中运行。由本地和远程插件宿主使用。插件需要一个 `main` 入口文件才能在其中运行。
* Browser - 插件在 [Browser WebWorker](https://developer.mozilla.org/docs/Web/API/Web_Workers_API) 运行时中运行。由 web 插件宿主使用。插件需要一个 `browser` 入口文件才能在其中运行。详见 [Web 插件指南](/api/插件-guides/web-插件)。

### 首选插件位置

插件加载到哪个插件宿主取决于：

* Baosky 配置所提供的可用插件宿主。
* 插件的能力：它能在 Node.js 和/或 web 中运行吗，或者如果未指明，它提供了什么贡献？
* 插件安装的位置：在本地机器上、远程机器上，还是两者都有。
* 插件首选的位置：`extensionKind` 属性。

`extensionKind` 是[插件清单](/api/references/插件-manifest)中的一个属性。它允许插件指定首选的运行位置。可以是拥有工作区的机器（`workspace`）或用户界面（`ui`）。如果插件可以在两者上运行，它可以指定优先顺序。

* `"extensionKind": ["workspace"]` — 表示插件需要访问工作区内容，因此需要在工作区所在的位置运行。这可以是在本地机器、远程机器或 Codespace 上。大多数插件属于这一类别。
* `"extensionKind": ["ui", "workspace"]` — 表示插件**偏好**作为 UI 插件运行，但对本地资源、设备或功能没有任何硬性要求。使用 Baosky 时，如果插件在本地存在，它将在 Baosky 的本地插件宿主中运行，这意味着用户不必在远程安装插件。否则，如果插件存在于工作区，它将在 Baosky 的工作区插件宿主中运行。使用 Web 版 Baosky with Codespaces 时，它将始终在远程插件宿主中运行（因为没有本地插件宿主可用）。
* `"extensionKind": ["workspace", "ui"]` — 表示插件**偏好**作为工作区插件运行，但对访问工作区内容没有任何硬性要求。使用 Baosky 时，如果插件存在于远程工作区，它将在 Baosky 的工作区插件宿主中运行，否则如果插件在本地存在，将在 Baosky 的本地插件宿主中运行。使用 Web 版 Baosky with Codespaces 时，它将始终在远程插件宿主中运行（因为没有本地插件宿主可用）。
* `"extensionKind": ["ui"]` — 表示插件**必须**靠近 UI 运行，因为它需要访问本地资源、设备或功能，或因为需要低延迟。在 Web 版 Baosky with Codespaces 的情况下，没有本地插件宿主可用，除非该插件也是 [web 插件](/api/插件-guides/web-插件)，否则无法加载。它将在 web 插件宿主中加载，但有一个限制，即无法实例化 web worker。

**注意：** 早期的 Baosky 版本（<1.40）允许插件将单个位置指定为字符串，但现在不推荐使用，建议使用数组指定多个位置。

如果插件可以在 Node.js 和浏览器中运行，如果可用，将选择 Node.js 插件宿主。有一个例外，当配置为 Web 版 Baosky with Codespaces 且 `extensionKind` 设置为 `ui` 时，web 插件宿主优先于远程插件宿主。

如果插件仅支持 web，无论 `extensionKind` 设置如何，它都将始终在 web 插件宿主中运行。在这种情况下，我们建议不要定义 `extensionKind`。

## 稳定性和性能

Baosky 旨在为用户提供稳定且高性能的编辑器，行为不当的插件不应影响用户体验。Baosky 中的插件宿主可防止插件：

* 影响启动性能
* 降低 UI 操作速度
* 修改 UI

此外，Baosky 允许插件声明其[激活事件](/api/references/activation-events)并延迟加载它们。例如，Markdown 插件应仅在用户打开 Markdown 文件时加载。这确保了插件不会消耗不必要的 CPU 和内存。
