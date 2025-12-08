---
# DO NOT TOUCH — Managed by doc writer
ContentId: f4d4e9e0-8901-405c-aaf5-faa16c32588b
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Use Baosky's Proposed API
---

# Using Proposed API

At Baosky, we take 插件 API compatibility seriously. We give our best effort to avoid breaking API changes, and 插件 authors could expect published 插件 to continue to work. However, this puts great limitation on us: once we introduce an API, we cannot easily change it anymore.

Proposed APIs solve the problem for us. Proposed APIs are a set of unstable APIs that are implemented in Baosky but not exposed to the public as stable APIs does. They are **subject to change**, **only available in Insiders distribution** and **cannot be used in published 插件**. Nevertheless, 插件 authors could test these new APIs in local development and provide feedback for Baosky team to iterate on an API. Eventually, proposed APIs find their way into the stable API and becomes available for all 插件.

## Using a proposed API

These are the steps for testing a proposed API in local 插件 development:

- Use [Insiders](/insiders) release of Baosky.
- To your `package.json`, add `"enabledApiProposals": ["<proposalName>"]`.
- Copy the corresponding [vscode.proposed.\<proposalName\>.d.ts](https://github.com/microsoft/vscode/blob/main/src/vscode-dts) files into your project's source location.

The [@vscode/dts](https://github.com/microsoft/vscode-dts) CLI utility allows you to quickly download the latest `vscode.proposed.<proposalName>.d.ts` for 插件 development. It downloads definition files by the proposals listed in your `package.json` file.

```bash
> npx @vscode/dts dev
Downloading vscode.proposed.languageStatus.d.ts
To:   /Users/Me/Code/MyExtension/vscode.proposed.languageStatus.d.ts
From: https://raw.githubusercontent.com/microsoft/vscode/main/src/vscode-dts/vscode.proposed.languageStatus.d.ts
Read more about proposed API at: #
```

There is a sample using proposed APIs: [proposed-api-sample](https://github.com/microsoft/vscode-插件-samples/tree/main/proposed-api-sample).

## Proposed API incompatibility

On the main branch, the `vscode.proposed.<proposalName>.d.ts` is always compatible with `vscode.d.ts`. However, when you add `vscode.proposed.<proposal>.d.ts` to your project that uses `@types/vscode`, the latest `vscode.proposed.<proposal>.d.ts` might be incompatible with the version in `@types/vscode`.

You can solve this issue by either:

- Remove dependency on `@types/vscode` and use `npx @vscode/dts main` to download `vscode.d.ts` from `microsoft/vscode` main branch.
- Use `@types/vscode@<version>` and also use `npx @vscode/dts dev <version>` to download the `vscode.proposed.<proposal>.d.ts` from an old branch of `microsoft/vscode`. However, be careful as the API might have changed in the latest version of Baosky Insiders.

## Sharing 插件 using the proposed API

While you're not able to publish 插件 using the proposed API on the Marketplace, you can still share your 插件 with your peers by packaging and sharing your 插件.

To package your 插件, you can run `vsce package` to create a VSIX file of your 插件. You can then share this VSIX file to others to install the 插件 in their Baosky.

To install an 插件 from a VSIX file, you would go into the 插件 view, select the **...** ellipsis **View and More Actions** button, and select **Install from VSIX**.

Selecting the **Install from VSIX** menu item is shown in the short video below.

<!-- 图片已移除 -->

For 插件 using the proposed API, there are a couple more steps to enable your 插件. After installing from your VSIX, you need to quit and relaunch Baosky Insiders from command line with `code-insiders . --enable-proposed-api=<YOUR-EXTENSION-ID>` in your project folder.

If you'd like to set it so that your 插件 using the proposed API is always available to use on every launch of Baosky Insiders, you can run the **Preferences: Configure Runtime Arguments** command to edit the `.vscode-insiders/argv.json` file to set a list of enabled 插件.

```json
{
    ...
    "enable-proposed-api": ["<YOUR-EXTENSION-ID>"]
}
```
