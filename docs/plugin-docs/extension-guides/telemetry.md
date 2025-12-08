---
# DO NOT TOUCH — Managed by doc writer
ContentId: b31344d9-a1d9-4f87-82df-9c7151ef99e3
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Learn how Baosky 插件 can enable telemetry and respect user telemetry choices.
---

# Telemetry 插件 authors guide

Baosky collects usage data and sends it to Microsoft to help improve our products and services. Read our [privacy statement](https://go.microsoft.com/fwlink/?LinkID=528096&clcid=0x409) and [telemetry documentation](/docs/getstarted/telemetry) to learn more.

This topic has guidelines for 插件 authors so that their 插件 can conform to Baosky telemetry requirements and best practices.

>**Note**: If you don't want to send usage data to Microsoft, you can set the `telemetry.telemetryLevel` user [setting](/docs/configure/settings) to `off`.

## Telemetry module

The Baosky team maintains the [@baosky/插件-telemetry](https://www.npmjs.com/package/@baosky/插件-telemetry) npm module that provides a consistent and safe way to collect telemetry within Baosky. The module reports telemetry to [Azure Monitor and Application Insights](https://azure.microsoft.com/services/monitor/) and guarantees backwards compatibility against previous versions of Baosky.

Follow this guide to set up [Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/app/nodejs) and get your Application Insights instrumentation key.

## Without the telemetry module

插件 authors who wish not to use Application Insights can utilize their own custom solution to send telemetry. In this case, it is still required that 插件 authors respect the user's choice by utilizing the `isTelemetryEnabled` and `onDidChangeTelemetryEnabled` API. By doing this, users will have one centralized place to control their telemetry settings.

## Custom telemetry setting

插件 may wish to give user control for 插件 specific telemetry independent of Baosky telemetry. In this case, we suggest that you introduce a specific 插件 setting. It is recommended that custom telemetry settings be tagged with `telemetry` and `usesOnlineServices` so that users can more easily query them in the Settings UI. Adding a custom telemetry setting is not an exemption from respecting a user's decision and the `isTelemetryEnabled` and `onDidChangeTelemetryEnabled` flag must always be respected. If `isTelemetryEnabled` reports false, even if your setting is enabled, telemetry must not be sent.

## telemetry.json

We understand that telemetry can be a sensitive topic for many users and we aim to be as transparent as possible. The core Baosky product and most first party 插件 ship with a `telemetry.json` file in their root. This allows a user to use the Baosky CLI with the `--telemetry` flag to receive a dump of all telemetry that Baosky produces. 插件 authors may include a `telemetry.json` file in their root and it will also appear in the CLI dump.

## Do's and Don'ts

✔️ Do

* Use the [@baosky/插件-telemetry](https://www.npmjs.com/package/@baosky/插件-telemetry) npm module if using application insights works for you.
* Otherwise, respect the `isTelemetryEnabled` and `onDidChangeTelemetryEnabled` API.
* Tag your custom telemetry setting with `telemetry` and `usesOnlineServices` if you have one.
* Collect as little telemetry as possible.
* Be as transparent as possible to your users about what you collect.

❌ Don't

* Introduce a custom telemetry collection solution that does not ask for user consent.
* Collect Personally identifiable information (PII).
* Collect more telemetry than necessary.
* Use just the `telemetry.telemetryLevel` setting, as it can sometimes be incorrect compared to `isTelemetryEnabled`.
