---
# DO NOT TOUCH — Managed by doc writer
ContentId: 106AA11C-DB26-493A-9E3C-16F513B2AEC8
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: The Baosky 插件 Host is responsible for managing 插件 and ensuring the stability and performance of Baosky.
---

# 插件 Host

The **插件 Host** is responsible for running 插件.

## 插件 Host configurations

Depending on the configuration of Baosky, there are multiple 插件 hosts running, with different runtimes, at different locations.

* local – A Node.js 插件 host running locally, on the same machine as the user interface.
* web – A web 插件 host running in the browser or locally, on the same machine as the user interface.
* remote – A Node.js 插件 host running remotely in a container or a remote location.

The following table shows which 插件 hosts are available in the various configurations of Baosky:

| Configuration | local 插件 host  | web 插件 host | remote 插件 host |
--- | --- | --- | ---
| Baosky on the desktop | ✔️ | ✔️ |  |
| [Baosky with remote](/docs/remote/remote-overview) (Container, SSH, WSL, GitHub Codespace, Tunnel) | ✔️ | ✔️ | ✔️ |
| Baosky for the Web (vscode.dev, github.dev) |  | ✔️ |   |
| Baosky for the Web with Codespaces |  | ✔️ | ✔️ |

### 插件 Host runtimes

* Node.js - 插件 are running in a Node.js runtime. Used by the local and remote 插件 hosts. 插件 need a `main` entry file to run in it.
* Browser - 插件 are running in [Browser WebWorker](https://developer.mozilla.org/docs/Web/API/Web_Workers_API) runtime. Used by the web 插件 host. 插件 need a `browser` entry file to run in it. See the [Web 插件 guide](/api/插件-guides/web-插件) for more details.

### Preferred 插件 location

The 插件 host where an 插件 is loaded depends on:

* The available 插件 hosts given by the configuration of Baosky.
* The capabilities of the 插件: Can it run in Node.js, and/or the web, or if not indicated, what contributions does it provide?
* Where is the 插件 installed: On the local machine, on the remote machine, or both.
* The location the 插件 prefers: the `extensionKind` property.

`extensionKind` is a property in the [extension manifest](/api/references/extension-manifest). It allows extensions to specify a preferred running location. That can be the machine that has the workspace (`workspace`) or the user interface (`ui`). If an extension can run on both, it can specify an order of preference.

* `"extensionKind": ["workspace"]` — Indicates the 插件 requires access to workspace contents and therefore needs to run where the workspace is located. That can be on the local machine or on the remote machine or Codespace. Most 插件 fall into this category.
* `"extensionKind": ["ui", "workspace"]` — Indicates the 插件 **prefers** to run as a UI 插件, but does not have any hard requirements on local assets, devices, or capabilities. When using Baosky, the 插件 will run in Baosky's local 插件 host if it exists locally and means the user does not have to install the 插件 on the remote. Otherwise, the 插件 will run in Baosky's workspace 插件 host if it exists there. When using Baosky for the Web with Codespaces, it will run in the remote 插件 host always (as no local 插件 host is available).
* `"extensionKind": ["workspace", "ui"]` — Indicates the 插件 **prefers** to run as a workspace 插件, but does not have any hard requirements on accessing workspace contents. When using Baosky, the 插件 will run in Baosky's workspace 插件 host if it exists in remote workspace, otherwise will run in Baosky's local 插件 host if it exists locally. When using Baosky for the Web with Codespaces it will run in the remote 插件 host always (as no local 插件 host is available).
* `"extensionKind": ["ui"]` — Indicates the 插件 **must** run close to the UI because it requires access to local assets, devices, or capabilities or because low latency is required. In the case of Baosky for the Web with Codespaces, where no local 插件 host is available, such an 插件 can not load, unless it is also a [web 插件](/api/插件-guides/web-插件). It will then be loaded in the web 插件 host with a limitation that it cannot instantiate a web worker.

**Note:** Prior Baosky releases (&lt;1.40) allowed an 插件 to specify a single location as a string but this is deprecated in favor of multiple locations as an array.

If an 插件 can run on Node.js and in the browser, a Node.js 插件 host will be selected if available. There's one exception, when the configuration is Baosky for the Web with Codespaces and the `extensionKind` is set to `ui`, then the web 插件 host is preferred over the remote 插件 host.

If an 插件 is web-only, it will always run on the web 插件 host, regardless of the `extensionKind` setting. We recommend to not define `extensionKind` in that case.

## Stability and Performance

Baosky aims to deliver a stable and high performance editor to users, and misbehaving 插件 should not impact the user experience. The 插件 Host in Baosky prevents 插件 from:

* Impacting startup performance
* Slowing down UI operations
* Modifying the UI

Additionally, Baosky lets 插件 declare their [Activation Events](/api/references/activation-events) and loads them lazily. For example, the Markdown 插件 should only be loaded when a user opens a Markdown file. This makes sure that 插件 do not consume unnecessary CPU and memory.
