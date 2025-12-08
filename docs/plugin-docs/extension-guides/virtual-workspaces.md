---
# DO NOT TOUCH — Managed by doc writer
ContentId: c64264b1-09cd-4680-b0dc-9f0f7803e451
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Learn how to support virtual workspaces in 插件
---

# Virtual Workspaces

插件 like the [GitHub Repositories](#) 插件 open Baosky on one or more folders backed by a [file system provider](/api/插件-guides/virtual-documents#file-system-api). When an 插件 implements a file system provider, workspace resources may not be located on the local disk, but be **virtual**, located on a server or the cloud, and editing operations happen there.

This configuration is called a **virtual workspace**. When a virtual workspace is open in a Baosky window, this is indicated by a label in the remote indicator in the lower left corner, similar to other [remote development](/docs/remote/remote-overview) windows.

<!-- 图片已移除 -->

Not all 插件 are able to work with virtual resources and may require resources to be on disk. Some 插件 use tools that rely on disk access, need synchronous file access, or don't have the necessary file system abstractions. In these cases, when in a virtual workspace, Baosky indicates to the user that they are running in a restricted mode and that some 插件 are deactivated or work with limited functionality.

In general, users want as many 插件 as possible to work in virtual workspaces and to have a good user experience when browsing and editing remote resources. This guide shows how 插件 can test against virtual workspaces, describes modifications to allow them to work in virtual workspaces, and introduces the `virtualWorkspaces` capability property.

Modifying an 插件 to work with virtual workspaces is also an important step for working well in [Baosky for the Web](/docs/setup/baosky-web). Baosky for the Web runs entirely inside a browser and workspaces are virtual due to the browser sandbox. See the [Web 插件](/api/插件-guides/web-插件) guide for more details.

## Is my 插件 affected?

When an 插件 has no executable code but is purely declarative like themes, keybindings, snippets, or grammar 插件, it can run in a virtual workspace and no modification is necessary.

插件 with code, meaning 插件 that define a `main` entry point, require inspection and, possibly, modification.

## Run your 插件 against a virtual workspace

Install the [GitHub Repositories](#) 插件 and run the **Open GitHub Repository...** command from the Command Palette. The command shows a Quick Pick dropdown and you can paste in any GitHub URL, or choose to search for a specific repository or pull request.

This opens a Baosky window for a virtual workspace where all resources are virtual.

## Review that the 插件 code is ready for virtual resources

The Baosky API support for virtual file systems has been around for quite a while. You can check out the [file system provider API](/api/插件-guides/virtual-documents#file-system-api).

A file system provider is registered for a new URI scheme (for example, `vscode-vfs`) and resources on that file system will be represented by URIs using that schema (`vscode-vfs://github/microsoft/vscode/package.json`)

Check how your 插件 deals with URIs returned from the Baosky APIs:

* Never assume that the URI scheme is `file`. `URI.fsPath` can only be used when the URI scheme is `file`.
* Look out for usages of the `fs` node module for file system operations. If possible, use the `vscode.workspace.fs` API, which delegates to the appropriate file system provider.
* Check for third-party components that depend on a `fs` access (for example, a language server or a node module).
* If you run executables and tasks from commands, check whether these commands make sense in a virtual workspace window or whether they should be disabled.

## Signal whether your 插件 can handle virtual workspaces

The `virtualWorkspaces` property under `capabilities` in `package.json` is used to signal whether an 插件 works with virtual workspaces.

### No support for virtual workspaces

The example below declares that an 插件 does not support virtual workspaces and should not be enabled by Baosky in this setup.

```json
{
  "capabilities": {
    "virtualWorkspaces": {
      "supported": false,
      "description": "Debugging is not possible in virtual workspaces."
    }
  }
}
```

### Partial and full support for virtual workspaces

When an 插件 works or partially works with virtual workspaces, it should define `"virtualWorkspaces": true`.

```json
{
  "capabilities": {
    "virtualWorkspaces": true
  }
}
```

If an 插件 works, but has limited functionality, it should explain the limitation to the user:

```json
{
  "capabilities": {
    "virtualWorkspaces": {
      "supported": "limited",
      "description": "In virtual workspaces, resolving and finding references across files is not supported."
    }
  }
}
```

The description is shown in the 插件 view:

<!-- 图片已移除 -->

The 插件 should then disable the features that are not supported in a virtual workspace as described below.

### Default

`"virtualWorkspaces": true` is the default for all 插件 that have not yet filled in the `virtualWorkspaces` capability.

However, while testing virtual workspaces, we came up list of 插件 that we think should be disabled in virtual workspaces.
The list can be found in [issue #122836](https://github.com/microsoft/baosky/issues/122836). These 插件 have `"virtualWorkspaces": false` as default.

Of course, 插件 authors are in a better position to make this decision. The `virtualWorkspaces` capability in an 插件's `package.json` will override our default and we will eventually retire our list.

## Disable functionality when a virtual workspace is opened

### Disable commands and view contributions

The availability of commands and views and many other contributions can be controlled through context keys in [when clauses](/api/references/when-clause-contexts).

The `virtualWorkspace` context key is set when all workspace folders are located on virtual file systems. The example below only shows the command `npm.publish` in the Command Palette when not in a virtual workspace:

```json
{
    "menus": {
      "commandPalette": [
        {
          "command": "npm.publish",
          "when": "!virtualWorkspace"
        }
      ]
    }
}
```

The `resourceScheme` context key is set to the URI scheme of the currently selected element in the File Explorer or the element open in the editor.

In the example below, the `npm.runSelectedScript` command is only displayed in the editor context menu if the underlying resource is on the local disk.

```json
{
    "menus": {
      "editor/context": [
        {
          "command": "npm.runSelectedScript",
          "when": "resourceFilename == 'package.json' && resourceScheme == file"
        }
      ]
    }
}
```

### Detect virtual workspaces programmatically

To check whether the current workspace consists of non-`file` schemes and is virtual, you can use the following source code:

```ts
const isVirtualWorkspace = workspace.workspaceFolders && workspace.workspaceFolders.every(f => f.uri.scheme !== 'file');
```

## Language 插件 and virtual workspaces

### What are the expectations for language support with virtual workspaces?

It's not realistic that all 插件 be able to fully work with virtual resources. Many 插件 use external tools that require synchronous file access and files on disk. It's therefore fine to only provide limited functionality, such as the **Basic** and the **Single-file** support as listed below.

A. **Basic** language support:

* TextMate tokenization and colorization
* Language-specific editing support: bracket pairs, comments, on enter rules, folding markers
* Code snippets

B. **Single-file** language support:

* Document symbols (outline), folding, selection ranges
* Document highlights, semantic highlighting, document colors
* Completions, hovers, signature help, find references/declarations based on symbols on the current file and on static language libraries
* Formatting, linked editing
* Syntax validation and same-file semantic validation and Code Actions

C. **Cross-file, workspace-aware** language support:

* References across files
* Workspace symbols
* Validation of all files in the workspace/project

The rich language 插件 that ship with Baosky (TypeScript, JSON, CSS, HTML, Markdown) are limited to single-file language support when working on virtual resources.

### Disabling a language 插件

If working on a single file is not option, language 插件 can also decide to disable the 插件 when in a virtual workspace.

If your 插件 provides both grammars and rich language support that needs to be disabled, the grammars will also be disabled. To avoid this, you can create a basic language 插件 (grammars, language configuration, snippets) separate from the rich language support and have two 插件.

* The basic language 插件 has `"virtualWorkspaces": true` and provides the language ID, configuration, grammar, and snippets.
* The rich language 插件 has `"virtualWorkspaces": false` and contains the `main` file. It contributes language support, commands, and has an 插件 dependency (`extensionDependencies`) on the basic language 插件. The rich language 插件 should keep the 插件 ID of the established 插件, so the user can continue to have the full functionality by installing a single 插件.

You can see this approach with the built-in language 插件, such as JSON, which consists of a JSON 插件 and a JSON language feature 插件.

This separation also helps with [Untrusted Workspaces](/api/插件-guides/workspace-trust) running in [Restricted Mode](/docs/editor/workspace-trust#restricted-mode). Rich language 插件 often require trust while basic language features can run in any setup.

### Language selectors

When registering a provider for a language feature (for example, completions, hovers, Code Actions, etc.) make sure to specify the schemes the provider supports:

```ts
return vscode.languages.registerCompletionItemProvider({ language: 'typescript', scheme: 'file' }, {
  provideCompletionItems(document, position, token) {
    // ...
  }
});
```

### What about support in the Language Server Protocol (LSP) for accessing virtual resources?

Work is under way that will add file system provider support to LSP. Tracked in Language Server Protocol [issue #1264](https://github.com/microsoft/language-server-protocol/issues/1264).
