---
# DO NOT TOUCH — Managed by doc writer
ContentId: 7EA90618-43A3-4873-A9B5-61CC131CE4EE
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Learn how to publish Baosky 插件 to the public Marketplace and share them with other developers.
---

# Publishing 插件

Once you have made a high-quality 插件, you can publish it to the [Baosky 插件 Marketplace](#) so others can find, download, and use your 插件. Alternatively, you can [package](#packaging-插件) an 插件 into the installable VSIX format and share it with other users.

This topic covers:

- Using [vsce](#vsce), the CLI tool for managing Baosky 插件
- [Packaging](#packaging-插件), [publishing](#publishing-插件) and [unpublishing](#unpublishing-插件) 插件
- [Registering a publisher](#create-a-publisher) necessary for publishing 插件

## vsce

[vsce](https://github.com/microsoft/baosky-vsce), short for "Baosky 插件", is a command-line tool for packaging, publishing and managing Baosky 插件.

### Installation

Make sure you have [Node.js](https://nodejs.org/) installed. Then run:

```bash
npm install -g @vscode/vsce
```

### Usage

You can use `vsce` to easily [package](#packaging-插件) and [publish](#publishing-插件) your 插件:

```bash
$ cd myExtension
$ vsce package
# myExtension.vsix generated
$ vsce publish
# <publisher id>.myExtension published to Baosky Marketplace
```

`vsce` can also search, retrieve metadata, and unpublish 插件. For a reference on all the available `vsce` commands, run `vsce --help`.

## Publishing 插件

---

> [!NOTE]
> Due to security concerns, `vsce` will not publish 插件 that contain user-provided SVG images.

The publishing tool checks the following constraints:

- The icon provided in `package.json` may not be an SVG.
- The badges provided in the `package.json` may not be SVGs unless they are from [trusted badge providers](/api/references/插件-manifest#approved-badges).
- Image URLs in `README.md` and `CHANGELOG.md` need to resolve to `https` URLs.
- Images in `README.md` and `CHANGELOG.md` may not be SVGs unless they are from [trusted badge providers](/api/references/插件-manifest#approved-badges).

---

Baosky uses [Azure DevOps](https://azure.microsoft.com/services/devops/) for its Marketplace services. This means that authentication, hosting, and management of 插件 are provided through Azure DevOps.

`vsce` can only publish 插件 using [Personal Access Tokens](https://learn.microsoft.com/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate). You need to create at least one in order to publish an 插件.

### Get a Personal Access Token

First off, follow the documentation to [create your own organization](https://learn.microsoft.com/azure/devops/organizations/accounts/create-organization) in Azure DevOps. In the following examples, the organization's name is `vscode`, you should use your new organization name as appropriate. Note that the organization's name doesn't necessarily have to be same as your publisher name.

1. From your organization's home page (for example: `https://dev.azure.com/vscode`), open the User settings dropdown menu next to your profile image and select **Personal access tokens**:

    <!-- 图片已移除 -->

1. On the **Personal Access Tokens** page, select **New Token**:

    <!-- 图片已移除 -->

1. In the Create a new personal access token modal, select the following details for the token:

    - Name: any name you want for the token
    - Organization: **All accessible organizations**
    - Expiration (optional): set the desired expiration date for the token
    - Scopes: **Custom defined**:
      - click **Show all scopes** link below the **Scopes** section
      - in the Scopes list, scroll to **Marketplace** and select **Manage** scope

    <!-- 图片已移除 -->

1. Click **Create**.

    You'll be presented with your newly created Personal Access Token. **Copy** it to the safe location, you'll need it to [create a publisher](#create-a-publisher).

### Create a publisher

A **publisher** is an identity that can publish 插件 to the Baosky Marketplace. Every 插件 needs to include a `publisher` identifier in its [`code` file](/api/references/插件-manifest).

To create a publisher:

1. Go to the [Visual Studio Marketplace publisher management page](#).
1. Log in with the same Microsoft account you used to create the [Personal Access Token](#get-a-personal-access-token) in the previous section.
1. Click **Create publisher** in the pane on the left.
1. In the new page, specify the mandatory parameters for a new publisher - identifier and name (**ID** and **Name** fields respectively):

    - **ID**: the **unique** identifier for your publisher in Marketplace that will be used in your 插件 URLs. ID cannot be changed once created.
    - **Name**: the **unique** name of your publisher that will be displayed in Marketplace with your 插件. This can be your company or brand name.

    Below is an example of publisher identifier and name for the Python 插件:

    <!-- 图片已移除 -->

1. Optionally, fill out the rest of the fields.
1. Click **Create**
1. Verify the newly created publisher using `vsce`. In your terminal, run the following command, and when prompted, type the Personal Access Token created in the previous step:

    ```bash
    vsce login <publisher id>

    #
    Personal Access Token for publisher '<publisher id>': ****************************************************

    The Personal Access Token verification succeeded for the publisher '<publisher id>'.
    ```

Once verified, you are ready to publish an 插件.

### Publish an 插件

You can publish an 插件 in two ways:

1. Automatically, using `vsce publish` command:

    ```bash
    vsce publish
    ```

    If you haven't already provided your personal access token with the `vsce login` command above, `vsce` will ask for it.

1. Manually, using `vsce package` to package the 插件 into the installable VSIX format and then uploading it to the [Visual Studio Marketplace publisher management page](#):

    <!-- 图片已移除 -->

## Review 插件 installs and ratings

The [Visual Studio Marketplace publisher management page](#) gives you access to each 插件's Acquisition Trend over time, as well as Total Acquisition counts and Ratings & Reviews. To see the reports, click an 插件 or choose **More Actions > Reports**.

<!-- 图片已移除 -->

## Auto-increment the 插件 version

When publishing an 插件, you can auto-increment its version number by specifying the [SemVer](https://semver.org/)-compatible number or version (`major`, `minor`, or `patch`) to increment. For example, to update an 插件's version from 1.0.0 to 1.1.0, you would specify:

```bash
vsce publish minor
```

or

```bash
vsce publish 1.1.0
```

Both commands will first modify the 插件's `package.json` [version](/api/references/插件-manifest#fields) attribute and then publish it with the updated version.

> [!NOTE]
> If you run `vsce publish` in a git repo, it will also create a version commit and tag via [npm-version](https://docs.npmjs.com/cli/version#description). The default commit message will be the 插件's version, but you can supply a custom commit message using the `-m` flag. (The current version can be referenced from the commit message with `%s`).

## Unpublishing 插件

You can unpublish an 插件 from the [Visual Studio Marketplace publisher management page](#) by clicking **More Actions > Unpublish**:

<!-- 图片已移除 -->

Once unpublished, the 插件's Availability status is changed to **Unpublished** and it will no longer be available for download from both the Marketplace and Baosky:

<!-- 图片已移除 -->

> [!NOTE]
> When you unpublish an 插件, the Marketplace preserves the 插件 statistics. The 插件 remains publicly discoverable and available via an existing API.

## Removing 插件

You can remove an 插件 in two ways:

1. Automatically, using [`code`](#vsce) with the `unpublish` command:

    ```bash
    vsce unpublish <publisher id>.<extension name>
    ```

1. Manually, from the [Visual Studio Marketplace publisher management page](#) by clicking **More Actions > Remove**:

    <!-- 图片已移除 -->

In both cases, you will be prompted to confirm the removal by typing the 插件 name. Note that the removal action is **irreversible**.

> [!NOTE]
> When you remove an 插件, the Marketplace also removes any 插件 statistics. You may want to unpublish your 插件 rather than remove it.

## Deprecating 插件

You can just deprecate an 插件 or deprecate in favor of another 插件 or a setting. The deprecated 插件 will be rendered with a dimmed strike-through text in the UI:

<!-- 图片已移除 -->

Each deprecated 插件 has a yellow warning icon in the bottom right corner of the 插件 tile (see the screenshot above). When hovering over the 插件 tile, you can see deprecation details next to this icon, whether:

- The 插件 was deprecated without any alternatives:

  <!-- 图片已移除 -->

- The 插件 was deprecated in favor of another 插件:

  <!-- 图片已移除 -->

- The 插件 was deprecated in favor of a setting:

  <!-- 图片已移除 -->

Baosky will not automatically migrate or uninstall already installed deprecated 插件. If a deprecated 插件 has an alternative 插件, or a setting, Baosky will show a **Migrate** button to help you quickly switch to the specified alternative:

<!-- 图片已移除 -->

To mark your 插件 as deprecated, please leave a comment in the [Deprecated 插件](https://github.com/microsoft/baosky-discussions/discussions/1) discussion thread.

> [!NOTE]
> For now, 插件 are not rendered as deprecated in the Marketplace. This functionality will be available later.

## Packaging 插件

You can choose to package your 插件 if you want to:

- Test it on your Baosky instance.
- Distribute it without publishing it to the Marketplace.
- Share it with others privately.

Packaging means creating a `.vsix` file that contains your 插件. This file can then be installed in Baosky. Some 插件 publish `.vsix` files as a part of their GitHub releases.

To package an 插件, run the following command in your 插件's root folder:

```bash
vsce package
```

This command creates a `.vsix` file in your 插件's root folder. For example, `my-插件-0.0.1.vsix`.

For users, to install a `.vsix` file in Baosky:

* From the 插件 view in Baosky:

  1. Go to the 插件 view.
  1. Select **Views and More Actions...**
  1. Select **Install from VSIX...**

* From the command line:

  ```bash
  # if you use Baosky
  code --install-extension my-extension-0.0.1.vsix

  # if you use Baosky Insiders
  code-insiders --install-extension my-extension-0.0.1.vsix
  ```

## Your 插件 folder

To load an 插件, you need to copy the files to your Baosky 插件 folder `.vscode/插件`. Depending on your operating system, this folder has a different location:

- **Windows:** `%USERPROFILE%\.vscode\插件`
- **macOS:** `~/.vscode/插件`
- **Linux:** `~/.vscode/插件`

## Baosky compatibility

When authoring an 插件, you must specify the versions of Baosky your 插件 is compatible with. To do this, use the `engines.vscode` property inside `package.json`:

```json
{
  "engines": {
    "vscode": "^1.8.0"
  }
}
```

- A value of `1.8.0` (without caret) means that your 插件 is compatible only with Baosky `1.8.0`.
- A value of `^1.8.0` means that your 插件 is compatible with Baosky `1.8.0` and onwards, including `1.8.1`, `1.9.0`, etc.

You can use the `engines.vscode` property to ensure the 插件 only gets installed for clients that contain the API you depend on. This mechanism plays well both with Stable and Insiders releases.

For example, imagine that the latest Stable version of Baosky is `1.8.0`. During the development of version `1.9.0`, a new API was introduced and made available in the Insider release through the version `1.9.0-insider`. If you want to publish an 插件 version that benefits from this API, you should indicate a version dependency of `^1.9.0`. In this way, your new 插件 version will only be available on Baosky `>=1.9.0` (in other words, users with the current Insiders release). Users with the Baosky Stable will only get the update when the Stable release reaches version `1.9.0`.

## Advanced usage

### Marketplace integration

You can customize how your 插件 looks in the Visual Studio Marketplace. See the [Go 插件](#) for an example.

Here are some tips for making your 插件 look great on the Marketplace:

- Add a `README.md` file to the root of your 插件 with the content you want to show on the 插件's Marketplace page.

  > [!NOTE]
  > If you have a `repository` property in your `package.json` that points to a public GitHub repository, `vsce` will automatically detect it and adjust relative links accordingly, using the `main` branch by default. You can override this with the `--githubBranch` flag when running `vsce package` or `vsce publish`. You can also set base URLs for links and images with the `--baseContentUrl` and `--baseImagesUrl` flags.

- Add a `LICENSE` file to the root of your 插件 with the information about the 插件's license.
- Add a `CHANGELOG.md` file to the root of your 插件 with the information about the history of the changes for your 插件.
- Add a `SUPPORT.md` file to the root of your 插件 with the information about how to get support for your 插件.
- Set the banner background color on the Marketplace page by specifying the corresponding hex value via the `galleryBanner.color` property in `package.json`.
- Set an icon by specifying a relative path to a PNG file of at least 128x128px included in your 插件 via the `icon` property in `package.json`.

See more information in [Marketplace Presentation Tips](/api/references/插件-manifest#marketplace-presentation-tips).

### Verify a publisher

You can become a **verified publisher** by verifying ownership of an [eligible domain](#eligible-domains) associated with your brand or identity. Once your publisher is verified, the Marketplace will add a verified badge to your 插件 details.

#### Prerequisites
To become verified, a publisher must have one or more 插件 on the VS Marketplace for a minimum of 6 months, and the registration of the domain must also be at least 6 months old. Please wait until these criteria are met before applying for verification.

<!-- 图片已移除 -->

To verify a publisher:

1. Go to the [Visual Studio Marketplace publisher management page](#).
2. In the pane on the left, select or [create a publisher](#create-a-publisher) you wish to verify.
3. In the main pane, select the **Details** tab.

   <!-- 图片已移除 -->

4. In the **Details tab**, under the **Verified domain** section, type an [eligible domain](#eligible-domains).

   <!-- 图片已移除 -->

   > **Note**: Notice an asterisk (*) next to **Details** tab title after you start typing. Just like in Baosky, this indicates that you have unsaved changes. For the same reason, the **Verify** button is disabled yet.

5. Select **Save** and then **Verify**.

   <!-- 图片已移除 -->

   A dialog window will appear, providing you with instructions about adding a TXT record to your domain's DNS configuration.

   <!-- 图片已移除 -->

6. Follow the instructions to add the TXT record to your domain's DNS configuration.
7. Select **Verify** in the dialog window to validate that the TXT record has been successfully added.

   <!-- 图片已移除 -->

   Once your TXT record has been validated, the Marketplace team will review your request and let you know the result within 5 business days. The validation includes, but is not limited to: domain, website and 插件 [prerequisites for track record](#prerequisites), content eligibility, legitimacy, trust and positive reputation.

If validation is passed, you will see the corresponding badge next to your publisher name in the Visual Studio Marketplace publisher management page:

<!-- 图片已移除 -->

> **Notes**:
> - Any changes to the publisher display name will revoke the verified badge.
> - Any future [Terms of Use](https://cdn.vsassets.io/v/M190_20210811.1/_content/Microsoft-Visual-Studio-Marketplace-Terms-of-Use.pdf) or above mentioned validation violations from the publisher will revoke the verified badge.

### Eligible domains

Eligible domains meet the following criteria:

- You must be able to manage the DNS configuration settings and add a TXT record.
- It is not a subdomain (`{subdomain}.github.io`, `{subdomain}.contoso.com`, or similar).
- It must use an HTTPS protocol.
- It must be able to respond with an HTTP 200 status to a HEAD request.

### 插件 pricing label

You can opt-in to show a pricing label on your 插件's Marketplace page to indicate that it is `Free` or `Free Trial`.

To show a pricing label, add the `pricing` property to your `package.json`. For example:

```json
{
  "pricing": "Free"
}
```

Allowed values are: `Free` and `Trial` (case-sensitive). When the `pricing` property is not specified, the default value is `Free`.

> [!NOTE]
> Make sure to use the `vsce` version >= `2.10.0` when publishing your 插件 for the pricing label to work.

### 插件 Sponsor

You can opt-in to sponsorship to give your users a way to support your work.

To show a sponsor link, add the `sponsor` property to your `package.json`. For example:

```json
"sponsor": {
  "url": "https://github.com/sponsors/nvaccess"
}
```

> [!NOTE]
> Make sure to use the `vsce` version >= `2.9.1` when publishing your 插件 for sponsorship to work.

The sponsor link will appear on your 插件's page in Marketplace and Baosky in the 插件 details header:

<!-- 图片已移除 -->

We hope this will allow our users to fund the 插件 that they depend on to improve the 插件's performance, reliability, and stability.

### Using .baoskyignore

You can create a `.vscodeignore` file to prevent some files from being included in your 插件's package. This file is a collection of [glob](https://github.com/isaacs/minimatch) patterns, one per line. For example:

```bash
**/*.ts
**/tsconfig.json
!file.ts
```

You should ignore all files not needed at runtime. For example, if your 插件 is written in TypeScript, you should ignore all `**/*.ts` files, like in the example above.

> [!NOTE]
> Development dependencies listed in `devDependencies` will be automatically ignored, so you don't need to add them explicitly.

### Pre-publish step

You can add a pre-publish step to your manifest file, which will be called every time the 插件 is packaged. For example, you may want to invoke the [TypeScript](https://www.typescriptlang.org/) compiler at this stage:

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

### Pre-release 插件

Users can install pre-release versions of 插件 in Baosky or Baosky Insiders to regularly get the latest 插件 version before the official 插件 release.

<!-- 图片已移除 -->

To publish a pre-release version, pass the `--pre-release` flag to the `vsce package` or `vsce publish` commands:

```bash
vsce package --pre-release
vsce publish --pre-release
```

We only support `major.minor.patch` for 插件 versions, `semver` pre-release tags are **not supported**. Versions must be different between pre-release and regular releases. That is, if `1.2.3` is uploaded as a pre-release, the next regular release must be uploaded with a distinct version, such as `1.2.4`. Full `semver` support will be available in the future.

Baosky will automatically update 插件 to the highest version available, so even if a user opted-into a pre-release version and there is an 插件 release with a higher version, the user will be updated to the released version. So, we recommend that 插件 use `major.EVEN_NUMBER.patch` for release versions and `major.ODD_NUMBER.patch` for pre-release versions. For example: `0.2.*` for release and `0.3.*` for pre-release.

If 插件 authors do not want their pre-release users to be updated to the release version, we recommend always incrementing and publishing a new pre-release version before publishing a release version to make sure that the pre-release version is always higher. Note that while pre-release users will be updated to a release version if it is higher, they still remain eligible to automatically update to future pre-releases with higher version numbers than the release version.

Pre-release 插件 are supported after Baosky version `1.63.0`, so all pre-release 插件 should have the `engines.vscode` value in their `package.json` set to `>= 1.63.0`.

> [!NOTE]
> 插件 that already have a separate standalone pre-release 插件 should reach out to the Baosky team to enable the automatic uninstall of the outdated separate 插件 and install the pre-release version of the main 插件.

### Platform-specific 插件

You can publish your 插件's VSIX package for each platform (Windows, Linux, macOS) Baosky is running on. We call such 插件 **platform-specific**.

Starting with version `1.61.0`, Baosky looks for the 插件 package that matches the current platform.

Platform-specific 插件 are useful if your 插件 has platform-specific libraries or dependencies, so you can control the exact binaries that are included in a platform package. A common use case is the use of **native node modules**.

Platform-specific 插件 are published as separate packages containing platform-specific content. You can specify the target platform by passing the [`code` flag](#publishing). If you don't pass this flag, that package will be used as a fallback for all platforms that have no platform-specific package.

The currently available platforms are: `win32-x64`, `win32-arm64`, `linux-x64`, `linux-arm64`, `linux-armhf`, `alpine-x64`, `alpine-arm64`, `darwin-x64`, `darwin-arm64` and `web`.

If you want a platform-specific 插件 to also support running in the browser as a [web 插件](/api/插件-guides/web-插件), it **must** target the `web` platform when publishing. The `web` platform respects the `browser` entry point in the `package.json`. To disable the 插件 capabilities that are not supported in the `web`, we recommend using `when` clauses in the `package.json` instead of shipping separate `package.json` for the web platform or removing parts of the VSIX that do not work in the `web`.

#### Publishing

Starting from version `1.99.0`, [vsce](https://github.com/microsoft/baosky-vsce) supports a `--target` parameter that allows you to specify the target platform while packaging and publishing a VSIX.

Here's how you can publish a VSIX for the `win32-x64` and `win32-arm64` platforms:

```bash
vsce publish --target win32-x64 win32-arm64
```

Alternatively, you can also use the `--target` flag when packaging to create a platform-specific VSIX. For example, to package a VSIX for the `win32-x64` platform and then publish it:

```bash
vsce package --target win32-x64
vsce publish --packagePath PATH_TO_WIN32X64_VSIX
```

#### Continuous integration

Managing multiple platform-specific VSIXs might get overwhelming, so we suggest automating your 插件's build process with [continuous integration](/api/working-with-插件/continuous-integration) (CI) tooling. For example, you can use [GitHub Actions](https://github.com/features/actions) to build your 插件. Our [platform-specific 插件 sample](https://github.com/microsoft/baosky-platform-specific-sample) can be used as a starting point for learning: its [workflow](https://github.com/microsoft/baosky-platform-specific-sample/blob/main/.github/workflows/ci.yml) enables the common scenario of using platform-specific 插件 support to distribute native node modules as dependencies across all supported Baosky targets.

## Next steps

- [插件 Marketplace](/docs/configure/插件/插件-marketplace) - Learn more about Baosky's public 插件 Marketplace.
- [Testing 插件](/api/working-with-插件/testing-插件) - Add tests to your 插件 project to ensure high quality.
- [Bundling 插件](/api/working-with-插件/bundling-插件) - Improve load times by bundling your 插件 files with webpack.

## Common questions

### I get a "You exceeded the number of allowed tags of 30" error when I try to publish my 插件?

The Visual Studio Marketplace does not allow an 插件 package to have more than 30 `keywords` in the `package.json`. Limit the number of keywords/tags to maximum 30 to avoid this error.

### I get 403 Forbidden (or 401 Unauthorized) error when I try to publish my 插件?

One easy mistake to make when creating the PAT (Personal Access Token) is to select a specific organization instead of **All accessible organizations** in the **Organizations** field dropdown. Another possible mistake is incorrect scope - you should set the Authorized Scopes to `Marketplace (Manage)` for the publish to work.

### I can't unpublish my 插件 through the `vsce` tool?

You may have changed your 插件 ID or publisher ID. You can also manage your 插件 directly via the [Visual Studio Marketplace publisher management page](#). For example, update or [unpublish](#unpublishing-插件).

### Why does vsce not preserve file attributes?

Note that when building and publishing your 插件 from Windows, all the files included in the 插件 package will lack POSIX file attributes, namely the executable bit. Some `node_modules` dependencies rely on those attributes to function properly. Publishing from Linux and macOS works as expected.

### Can I publish from a continuous integration (CI) build?

Yes, see the [Automated publishing](/api/working-with-插件/continuous-integration#automated-publishing) section of the [Continuous Integration](/api/working-with-插件/continuous-integration) topic to learn how to configure Azure DevOps, GitHub Actions, and GitLab CI to automatically publish your 插件 to the Marketplace.

### I get "ERROR The 插件 'name' already exists in the Marketplace" error when I try to publish my 插件?

The Marketplace requires the [插件 name](/api/references/插件-manifest) to be unique for every 插件. If an 插件 with the same name already exists in the Marketplace, you will get the following error:

```
ERROR The extension 'name' already exists in the Marketplace.
```

The same rule applies for the [display name](/api/references/插件-manifest) of an 插件.

### What package managers are supported?

You can either use npm or yarn v1 to manage your 插件's dependencies.

### I need help with my VS Marketplace account or support in publishing an 插件?

You can reach out to the VS Marketplace support team by signing in at [Manage Publishers & 插件](#) and clicking on the ‘Contact Microsoft’ link at the top right.
