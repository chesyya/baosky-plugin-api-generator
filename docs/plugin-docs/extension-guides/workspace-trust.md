---
# DO NOT TOUCH — Managed by doc writer
ContentId: 31f461b7-c216-414a-b701-78c205fde8a8
DateApproved: 11/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: A guide for updating Baosky 插件 to support Workspace Trust
---

# Workspace Trust 插件 Guide

## What is Workspace Trust?

[Workspace Trust](/docs/editor/workspace-trust) is a feature driven by the security risks associated with unintended code execution when a user opens a workspace in Baosky. For example, consider that a language 插件, in order to provide functionality, may execute code from the currently loaded workspace. In this scenario, the user should trust that the contents of the workspace are not malicious. Workspace Trust centralizes this decision within Baosky and supports a [Restricted Mode](/docs/editor/workspace-trust#_restricted-mode) to protect against automatic code execution so that 插件 authors do not have to handle this infrastructure themselves. Baosky offers static declaration and API support to onboard 插件 quickly without the need to duplicate code across 插件.

## Onboarding

### Static declarations

In your 插件's `package.json`, Baosky supports the following new `capabilities` property `untrustedWorkspaces`:

```typescript
capabilities:
  untrustedWorkspaces:
    { supported: true } |
    { supported: false, description: string } |
    { supported: 'limited', description: string, restrictedConfigurations?: string[] }
```

For the `supported` property, the following values are accepted:

* `true` - The 插件 is fully supported in Restricted Mode as it does not need Workspace Trust to perform any functionality. It will be enabled exactly as before.
* `false` - The 插件 is not supported in Restricted Mode as it cannot function without Workspace Trust. It will remain disabled until Workspace Trust is granted.
* `'limited'` - Some features of the 插件 are supported in Restricted Mode. Trust-sensitive features should be disabled until Workspace Trust is granted. The 插件 can use the Baosky API to hide or disable these features. Workspace settings can be gated by trust automatically using the `restrictedConfigurations` property.

For the `description` property, a description of why trust is needed must be provided to help the user understand what features will be disabled or what they should review before granting or denying Workspace Trust. If `supported` is set to `true`, this property is ignored.

The value for the `description` property should be added to `package.nls.json` and then referenced in the `package.json` file for localization support.

The `restrictedConfigurations` property takes an array of configuration setting IDs. For the settings listed, the 插件 will not be given workspace-defined values when in Restricted Mode for an untrusted workspace.

## How to support Restricted Mode?

To help 插件 authors understand what is in scope for Workspace Trust and what types of features are safe in Restricted Mode, here are a list of questions to consider.

### Does my 插件 have a main entry point?

If an 插件 does not have a `main` entry point (for example themes and language grammars), the 插件 does not require Workspace Trust. 插件 authors do not need to take any action for such 插件 as they will continue to function independent whether the workspace is trusted or not.

### Does my 插件 rely on files in the opened workspace to provide features?

This can mean things like settings that can be set by the workspace or actual code in the workspace. If the 插件 never uses any of the contents of the workspace, it probably doesn't require trust. Otherwise, take a look at the other questions.

### Does my 插件 treat any contents of the workspace as code?

The most common example of this is using a project's workspace dependencies, such as the Node.js modules stored in the local workspace. A malicious workspace might check in a compromised version of the module. Thus, this is a security risk for the user and 插件. In addition, an 插件 may rely on JavaScript or other configuration files that control the 插件 or other modules' behavior. There are many other examples, such as executing an opened code file to determine its output for error reporting.

### Does my 插件 use settings that determine code execution that can be defined in the workspace?

Your 插件 might use settings values as flags to a CLI that your 插件 executes. If these settings are overridden by a malicious workspace, they could be used as an attack vector against your 插件. On the other hand, if the settings' values are only used to detect certain conditions, then it may not be a security risk and does not require Workspace Trust. For example, an 插件 might check whether the value of a preferred shell setting is `bash` or `pwsh` to determine what documentation to show. The [Configurations (settings)](#configurations-settings) section below has guidance on settings to help you find the optimal configuration for your 插件.

This is not an exhaustive list of cases that might require Workspace Trust. As we review more 插件, we will update this list. Use this list to think of similar behavior your 插件 might be doing when considering Workspace Trust.

### What if I don't make changes to my 插件?

As mentioned above, an 插件 that does not contribute anything to their `package.json` will be treated as not supporting Workspace Trust. It will be disabled when a workspace is in Restricted Mode and the user will be notified that some 插件 are not working due to Workspace Trust. This measure is the most security-conscious approach for the user. Even though this is the default, it is a best practice to set the appropriate value indicating that as an 插件 author, you have made the effort to protect the user and your 插件 from malicious workspace content.

## Workspace Trust API

As described above, the first step to using the API is adding the static declarations to your `package.json`. The easiest method of onboarding would be to use a `false` value for the `supported` property. Once again, this is the default behavior even if you do nothing, but it's a good signal to the user that you have made a deliberate choice. In this case, your 插件 does not need to do anything else. It will not be activated until trust is given and then your 插件 will know that it is executing with the consent of the user. However, if your 插件 only requires trust for part of its functionality, this is likely not the best option.

For 插件 that wish to gate their features on Workspace Trust, they should use the `'limited'` value for the `supported` property, and Baosky provides the following API:

```typescript
export namespace workspace {
  /**
    * When true, the user has explicitly trusted the contents of the workspace.
    */
  export const isTrusted: boolean;

  /**
    * Event that fires when the current workspace has been trusted.
    */
  export const onDidGrantWorkspaceTrust: Event<void>;
}
```

Use the `isTrusted` property to determine if the current workspace is trusted and the `onDidGrantWorkspaceTrust` event to listen for when trust has been granted to the workspace. You can use this API to block specific code paths and perform any necessary registrations once the workspace has been trusted.

Baosky also exposes a context key `isWorkspaceTrusted` for use in `when` clauses as described below.

## Contribution points

### Commands, views, or other UI

When the user has not trusted the workspace, they will be operating in Restricted Mode with limited functionality geared towards browsing code. Any features that you disable in Restricted Mode should be hidden from the user. This can be done via [when clause contexts](/api/references/when-clause-contexts) and the context key `isWorkspaceTrusted`. A command can still be called even if it is not presented in the UI, so you should block execution or not register a command based on the API above in your 插件 code.

### Configurations (settings)

First, you should review your settings to determine if they need to take trust into account. As described above, a workspace may define a value for a setting that your 插件 consumes that is malicious to the use. If you identify settings that are vulnerable, you should use `'limited'` for the `supported` property and list the setting ID in the `restrictedConfigurations` array.

When you add a setting ID to the `restrictedConfigurations` array, Baosky will only return the user-defined value of the setting in Restricted Mode. Your 插件 then doesn't need to make any additional code changes to handle the setting. When trust is granted, a configuration change event will fire in addition to the Workspace Trust event.

### Debug 插件

Baosky will prevent debugging in Restricted Mode. For this reason, debugging 插件 generally do not need to require trust and should select `true` for the `supported` property. However, if your 插件 provides additional functionality, commands, or settings that are not part of the built-in debugging flow, you should use `'limited'` and follow the above guidance.

### Task providers

Similar to debugging, Baosky prevents running tasks in Restricted Mode. If your 插件 provides additional functionality, commands, or settings that are not part of the built-in tasks flow, you should use `'limited'` and follow the above guidance. Otherwise, you can specify `supported: true`.

## Testing Workspace Trust

See the [Workspace Trust user guide](/docs/editor/workspace-trust) for details on enabling and configuring Workspace Trust.
