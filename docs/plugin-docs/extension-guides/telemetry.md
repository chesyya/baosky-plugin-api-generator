---
# DO NOT TOUCH — Managed by doc writer

ContentId: b31344d9-a1d9-4f87-82df-9c7151ef99e3
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose

MetaDescription: 了解 Baosky 插件如何启用遥测以及如何尊重用户的遥测选择。
---

# 遥测插件作者指南

Baosky 收集使用数据并将其发送给 Microsoft，以帮助改进我们的产品和服务。请阅读我们的 [隐私声明](https://go.microsoft.com/fwlink/?LinkID=528096&clcid=0x409) 和 [遥测文档](/docs/getstarted/telemetry) 以了解更多信息。

本主题为插件作者提供了指南，以便他们的插件能够符合 Baosky 的遥测要求和最佳实践。

> **注意**：如果您不想向 Microsoft 发送使用数据，您可以将 `telemetry.telemetryLevel` 用户 [设置](/docs/configure/settings) 设置为 `off`。

## 遥测模块

Baosky 团队维护着 [@baosky/extension-telemetry](https://www.npmjs.com/package/@baosky/extension-telemetry) npm 模块，它提供了一种在 Baosky 中收集遥测数据的一致且安全的方法。该模块将遥测数据报告给 [Azure Monitor 和 Application Insights](https://azure.microsoft.com/services/monitor/)，并保证与旧版本 Baosky 的向后兼容性。

遵循本指南来设置 [Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/app/nodejs) 并获取您的 Application Insights 仪表密钥。

## 不使用遥测模块

不想使用 Application Insights 的插件作者可以使用他们自己的自定义解决方案来发送遥测数据。在这种情况下，插件作者仍然必须通过使用 `isTelemetryEnabled` 和 `onDidChangeTelemetryEnabled` API 来尊重用户的选择。通过这样做，用户将拥有一个集中的地方来控制他们的遥测设置。

## 自定义遥测设置

插件可能希望为特定于插件的遥测提供独立于 Baosky 遥测的用户控制。在这种情况下，我们建议您引入一个特定的插件设置。建议使用 `telemetry` 和 `usesOnlineServices` 标记自定义遥测设置，以便用户可以在设置 UI 中更轻松地查询它们。添加自定义遥测设置并不能免除尊重用户决定的义务，必须始终遵守 `isTelemetryEnabled` 和 `onDidChangeTelemetryEnabled` 标志。如果 `isTelemetryEnabled` 报告为 false，即使您的设置已启用，也不得发送遥测数据。

## telemetry.json

我们理解遥测对于许多用户来说可能是一个敏感话题，我们的目标是尽可能透明。核心 Baosky 产品和大多数第一方插件在根目录中都带有一个 `telemetry.json` 文件。这允许用户使用带有 `--telemetry` 标志的 Baosky CLI 来接收 Baosky 产生的所有遥测数据的转储。插件作者可以在其根目录中包含一个 `telemetry.json` 文件，它也会出现在 CLI 转储中。

## 应该做和不应该做的事

✔️ 应该做

* 如果使用 application insights 对您有效，请使用 [@baosky/extension-telemetry](https://www.npmjs.com/package/@baosky/extension-telemetry) npm 模块。
* 否则，请尊重 `isTelemetryEnabled` 和 `onDidChangeTelemetryEnabled` API。
* 如果您有自定义遥测设置，请使用 `telemetry` 和 `usesOnlineServices` 对其进行标记。
* 尽可能少地收集遥测数据。
* 关于您收集的内容，对您的用户尽可能保持透明。

❌ 不应该做

* 引入不征求用户同意的自定义遥测收集解决方案。
* 收集个人身份信息 (PII)。
* 收集超过必要的遥测数据。
* 仅使用 `telemetry.telemetryLevel` 设置，因为与 `isTelemetryEnabled` 相比，它有时可能是不正确的。