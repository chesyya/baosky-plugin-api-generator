# @baosky/plugin API 文档

> 本文档自动生成自 TypeScript 源代码

---

## authentication

#### Functions

<div id="authentication-getsession"></div>

<details>
<summary><code>export function getSession(providerId: string, scopes: readonly string[], options: AuthenticationGetSessionOptions & &#123; createIfNone: true &#125;): Thenable&lt;AuthenticationSession&gt;;</code></summary>

##### 描述
Get an authentication session matching the desired scopes. Rejects if a provider with providerId is not
registered, or if the user does not consent to sharing authentication information with
the extension. If there are multiple sessions with the same scopes, the user will be shown a
quickpick to select which account they would like to use.

Currently, there are only two authentication providers that are contributed from built in extensions
to VS Code that implement GitHub and Microsoft authentication: their providerId's are 'github' and 'microsoft'.

##### 参数
- **providerId**: `string`  
  The id of the provider to use

- **scopes**: `readonly string[]`  
  A list of scopes representing the permissions requested. These are dependent on the authentication provider

- **options**: `<a href="#authenticationgetsessionoptions">AuthenticationGetSessionOptions</a> & &#123; createIfNone: true &#125;`  
  The getSessionOptions to use

##### 返回值
- `Thenable&lt;<a href="#authenticationsession">AuthenticationSession</a>&gt;` - A thenable that resolves to an authentication session

</details>

<div id="authentication-getsession"></div>

<details>
<summary><code>export function getSession(providerId: string, scopes: readonly string[], options: AuthenticationGetSessionOptions & &#123; forceNewSession: true | &#123; detail: string &#125; &#125;): Thenable&lt;AuthenticationSession&gt;;</code></summary>

##### 描述
Get an authentication session matching the desired scopes. Rejects if a provider with providerId is not
registered, or if the user does not consent to sharing authentication information with
the extension. If there are multiple sessions with the same scopes, the user will be shown a
quickpick to select which account they would like to use.

Currently, there are only two authentication providers that are contributed from built in extensions
to the editor that implement GitHub and Microsoft authentication: their providerId's are 'github' and 'microsoft'.

##### 参数
- **providerId**: `string`  
  The id of the provider to use

- **scopes**: `readonly string[]`  
  A list of scopes representing the permissions requested. These are dependent on the authentication provider

- **options**: `<a href="#authenticationgetsessionoptions">AuthenticationGetSessionOptions</a> & &#123; forceNewSession: true | &#123; detail: string &#125; &#125;`  
  The <a href="#authenticationgetsessionoptions">AuthenticationGetSessionOptions</a> to use

##### 返回值
- `Thenable&lt;<a href="#authenticationsession">AuthenticationSession</a>&gt;` - A thenable that resolves to an authentication session

</details>

<div id="authentication-getsession"></div>

<details>
<summary><code>export function getSession(providerId: string, scopes: readonly string[], options?: AuthenticationGetSessionOptions): Thenable&lt;AuthenticationSession | undefined&gt;;</code></summary>

##### 描述
Get an authentication session matching the desired scopes. Rejects if a provider with providerId is not
registered, or if the user does not consent to sharing authentication information with
the extension. If there are multiple sessions with the same scopes, the user will be shown a
quickpick to select which account they would like to use.

##### 参数
- **providerId**: `string`  
  The id of the provider to use

- **scopes**: `readonly string[]`  
  A list of scopes representing the permissions requested. These are dependent on the authentication provider

- **options**: `<a href="#authenticationgetsessionoptions">AuthenticationGetSessionOptions</a>` (可选)  
  The getSessionOptions to use

##### 返回值
- `Thenable&lt;<a href="#authenticationsession">AuthenticationSession</a> | undefined&gt;` - A thenable that resolves to an authentication session if available, or undefined if there are no sessions

</details>

<div id="authentication-getaccounts"></div>

<details>
<summary><code>export function getAccounts(providerId: string): Thenable&lt;readonly AuthenticationSessionAccountInformation[]&gt;;</code></summary>

##### 描述
Get all accounts that the user is logged in to for the specified provider.
Use this paired with `getSession` in order to get an authentication session for a specific account.

Currently, there are only two authentication providers that are contributed from built in extensions
to the editor that implement GitHub and Microsoft authentication: their providerId's are 'github' and 'microsoft'.

Note: Getting accounts does not imply that your extension has access to that account or its authentication sessions. You can verify access to the account by calling `getSession`.

##### 参数
- **providerId**: `string`  
  The id of the provider to use

##### 返回值
- `Thenable&lt;readonly <a href="#authenticationsessionaccountinformation">AuthenticationSessionAccountInformation</a>[]&gt;` - A thenable that resolves to a readonly array of authentication accounts.

</details>

<div id="authentication-registerauthenticationprovider"></div>

<details>
<summary><code>export function registerAuthenticationProvider(id: string, label: string, provider: AuthenticationProvider, options?: AuthenticationProviderOptions): Disposable;</code></summary>

##### 描述
Register an authentication provider.

There can only be one provider per id and an error is being thrown when an id
has already been used by another provider. Ids are case-sensitive.

##### 参数
- **id**: `string`  
  The unique identifier of the provider.

- **label**: `string`  
  The human-readable name of the provider.

- **provider**: `<a href="#authenticationprovider">AuthenticationProvider</a>`  
  The authentication provider provider.

- **options**: `<a href="#authenticationprovideroptions">AuthenticationProviderOptions</a>` (可选)  

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">Disposable</a> that unregisters this provider when being disposed.

</details>

#### Events

<div id="authentication-ondidchangesessions"></div>

<details>
<summary><code>onDidChangeSessions: <a href="#event">Event</a>&lt;<a href="#authenticationsessionschangeevent">AuthenticationSessionsChangeEvent</a>&gt;</code></summary>

##### 描述
An <a href="#event">event</a> which fires when the authentication sessions of an authentication provider have
been added, removed, or changed.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#authenticationsessionschangeevent">AuthenticationSessionsChangeEvent</a>&gt;`

</details>

#### Variables

_此 namespace 暂无变量_

---

## chat

#### Functions

<div id="chat-createchatparticipant"></div>

<details>
<summary><code>export function createChatParticipant(id: string, handler: ChatRequestHandler): ChatParticipant;</code></summary>

##### 描述
Create a new <a href="#chatparticipant">chat participant</a> instance.

##### 参数
- **id**: `string`  
  A unique identifier for the participant.

- **handler**: `<a href="#chatrequesthandler">ChatRequestHandler</a>`  
  A request handler for the participant.

##### 返回值
- `<a href="#chatparticipant">ChatParticipant</a>` - A new chat participant

</details>

<div id="chat-registermappededitsprovider"></div>

<details>
<summary><code>export function registerMappedEditsProvider(documentSelector: DocumentSelector, provider: MappedEditsProvider): Disposable;</code></summary>

##### 参数
- **documentSelector**: `<a href="#documentselector">DocumentSelector</a>`  

- **provider**: `<a href="#mappededitsprovider">MappedEditsProvider</a>`  

##### 返回值
- `<a href="#disposable">Disposable</a>`

</details>

<div id="chat-registermappededitsprovider2"></div>

<details>
<summary><code>export function registerMappedEditsProvider2(provider: MappedEditsProvider2): Disposable;</code></summary>

##### 参数
- **provider**: `<a href="#mappededitsprovider2">MappedEditsProvider2</a>`  

##### 返回值
- `<a href="#disposable">Disposable</a>`

</details>

#### Events

_此 namespace 暂无事件_

#### Variables

_此 namespace 暂无变量_

---

## commands

#### Functions

<div id="commands-getkeybindingforcommand"></div>

<details>
<summary><code>export function getKeyBindingForCommand(commandId: string): Thenable&lt;CommandKeyBinding[] | undefined&gt;;</code></summary>

##### 描述
Get the keybindings associated to commandId.

##### 参数
- **commandId**: `string`  
  The ID of the command for which we are looking for keybindings.

##### 返回值
- `Thenable&lt;<a href="#commandkeybinding">CommandKeyBinding</a>[] | undefined&gt;`

</details>

<div id="commands-getkeybindingforkeybinding"></div>

<details>
<summary><code>export function getKeyBindingForKeybinding(keybinding: string): Thenable&lt;CommandKeyBinding[] | undefined&gt;;</code></summary>

##### 参数
- **keybinding**: `string`  

##### 返回值
- `Thenable&lt;<a href="#commandkeybinding">CommandKeyBinding</a>[] | undefined&gt;`

</details>

<div id="commands-editkeybinding"></div>

<details>
<summary><code>export function editKeybinding(keyBinding: CommandKeyBinding): Thenable&lt;boolean&gt;;</code></summary>

##### 参数
- **keyBinding**: `<a href="#commandkeybinding">CommandKeyBinding</a>`  

##### 返回值
- `Thenable&lt;boolean&gt;`

</details>

<div id="commands-registercommand"></div>

<details>
<summary><code>export function registerCommand(command: CommandDescription | string, handler?: (...args: any[]) =&gt; any, thisArg?: any): Disposable;</code></summary>

##### 描述
Register the given command and handler if present.

Throw if a command is already registered for the given command identifier.

##### 参数
- **command**: `<a href="#commanddescription">CommandDescription</a> | string`  

- **handler**: `(...args: any[]) =&gt; any` (可选)  

- **thisArg**: `any` (可选)  

##### 返回值
- `<a href="#disposable">Disposable</a>`

</details>

<div id="commands-registerhandler"></div>

<details>
<summary><code>export function registerHandler(commandId: string, handler: (...args: any[]) =&gt; any, thisArg?: any): Disposable;</code></summary>

##### 描述
Register the given handler for the given command identifier.

##### 参数
- **commandId**: `string`  
  a given command id

- **handler**: `(...args: any[]) =&gt; any`  
  a command handler

Throw if a handler for the given command identifier is already registered.

- **thisArg**: `any` (可选)  

##### 返回值
- `<a href="#disposable">Disposable</a>`

</details>

<div id="commands-registertexteditorcommand"></div>

<details>
<summary><code>export function registerTextEditorCommand(command: string, callback: (textEditor: TextEditor, edit: TextEditorEdit, ...args: any[]) =&gt; void, thisArg?: any): Disposable;</code></summary>

##### 描述
Registers a text editor command that can be invoked via a keyboard shortcut,
a menu item, an action, or directly.

Text editor commands are different from ordinary commands as
they only execute when there is an active editor when the command is called. Also, the
command handler of an editor command has access to the active editor and to an
<a href="#texteditoredit">edit</a>-builder.

##### 参数
- **command**: `string`  
  A unique identifier for the command.

- **callback**: `(textEditor: <a href="#texteditor">TextEditor</a>, edit: <a href="#texteditoredit">TextEditorEdit</a>, ...args: any[]) =&gt; void`  
  A command handler function with access to an <a href="#texteditor">editor</a> and an <a href="#texteditoredit">edit</a>.

- **thisArg**: `any` (可选)  
  The `this` context used when invoking the handler function.

##### 返回值
- `<a href="#disposable">Disposable</a>` - Disposable which unregisters this command on disposal.

</details>

<div id="commands-executecommand"></div>

<details>
<summary><code>export function executeCommand&lt;T&gt;(commandId: string, ...args: any[]): Thenable&lt;T | undefined&gt;;</code></summary>

##### 描述
Execute the active handler for the given command and arguments.

Reject if a command cannot be executed.

##### 参数
- **commandId**: `string`  

- **args**: `any[]`  

##### 返回值
- `Thenable&lt;T | undefined&gt;`

</details>

<div id="commands-getcommands"></div>

<details>
<summary><code>export function getCommands(filterInternal?: boolean): Thenable&lt;string[]&gt;;</code></summary>

##### 描述
Retrieve the list of all available commands. Commands starting an underscore are
treated as internal commands.

##### 参数
- **filterInternal**: `boolean` (可选)  
  Set `true` to not see internal commands (starting with an underscore)

##### 返回值
- `Thenable&lt;string[]&gt;` - Thenable that resolves to a list of command ids.

</details>

<div id="commands-registerdiffinformationcommand"></div>

<details>
<summary><code>export function registerDiffInformationCommand(command: string, callback: (diff: LineChange[], ...args: any[]) =&gt; any, thisArg?: any): Disposable;</code></summary>

##### 描述
Registers a diff information command that can be invoked via a keyboard shortcut,
a menu item, an action, or directly.

Diff information commands are different from ordinary commands as
they only execute when there is an active diff editor when the command is called, and the diff
information has been computed. Also, the command handler of an editor command has access to
the diff information.

##### 参数
- **command**: `string`  
  A unique identifier for the command.

- **callback**: `(diff: <a href="#linechange">LineChange</a>[], ...args: any[]) =&gt; any`  
  A command handler function with access to the <a href="#linechange">diff information</a>.

- **thisArg**: `any` (可选)  
  The `this` context used when invoking the handler function.

##### 返回值
- `<a href="#disposable">Disposable</a>` - Disposable which unregisters this command on disposal.

</details>

#### Events

_此 namespace 暂无事件_

#### Variables

_此 namespace 暂无变量_

---

## comments

#### Functions

<div id="comments-createcommentcontroller"></div>

<details>
<summary><code>export function createCommentController(id: string, label: string): CommentController;</code></summary>

##### 描述
Creates a new <a href="#commentcontroller">comment controller</a> instance.

##### 参数
- **id**: `string`  
  An `id` for the comment controller.

- **label**: `string`  
  A human-readable string for the comment controller.

##### 返回值
- `<a href="#commentcontroller">CommentController</a>` - An instance of <a href="#commentcontroller">comment controller</a>.

</details>

#### Events

_此 namespace 暂无事件_

#### Variables

_此 namespace 暂无变量_

---

## debug

#### Functions

<div id="debug-registerdebugadapterdescriptorfactory"></div>

<details>
<summary><code>export function registerDebugAdapterDescriptorFactory(debugType: string, factory: DebugAdapterDescriptorFactory): Disposable;</code></summary>

##### 描述
Register a <a href="#debugadapterdescriptorfactory">debug adapter descriptor factory</a> for a specific debug type.
An extension is only allowed to register a DebugAdapterDescriptorFactory for the debug type(s) defined by the extension. Otherwise an error is thrown.
Registering more than one DebugAdapterDescriptorFactory for a debug type results in an error.

##### 参数
- **debugType**: `string`  
  The debug type for which the factory is registered.

- **factory**: `<a href="#debugadapterdescriptorfactory">DebugAdapterDescriptorFactory</a>`  
  The <a href="#debugadapterdescriptorfactory">debug adapter descriptor factory</a> to register.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">disposable</a> that unregisters this factory when being disposed.

</details>

<div id="debug-asdebugsourceuri"></div>

<details>
<summary><code>export function asDebugSourceUri(source: DebugProtocolSource, session?: DebugSession): Uri;</code></summary>

##### 描述
Converts a "Source" descriptor object received via the Debug Adapter Protocol into a Uri that can be used to load its contents.
If the source descriptor is based on a path, a file Uri is returned. If the source descriptor uses a reference number, a
specific debug Uri (scheme 'debug') is constructed that requires a corresponding ContentProvider and a running debug session
If the "Source" descriptor has insufficient information for creating the Uri, an error is thrown.

##### 参数
- **source**: `<a href="#debugprotocolsource">DebugProtocolSource</a>`  
  An object conforming to the Source type defined in the Debug Adapter Protocol.

- **session**: `<a href="#debugsession">DebugSession</a>` (可选)  
  An optional debug session that will be used when the source descriptor uses a reference number to load the contents from an active debug session.

##### 返回值
- `<a href="#uri">Uri</a>`

</details>

<div id="debug-registerdebugconfigurationprovider"></div>

<details>
<summary><code>export function registerDebugConfigurationProvider(debugType: string, provider: DebugConfigurationProvider, triggerKind?: DebugConfigurationProviderTriggerKind): Disposable;</code></summary>

##### 描述
Register a <a href="#debugconfigurationprovider">debug configuration provider</a> for a specific debug type.
The optional <a href="#debugconfigurationprovidertriggerkind">triggerKind</a> can be used to specify when the `provideDebugConfigurations` method of the provider is triggered.
Currently there are two situations:
 (1) providing debug configurations to populate a newly created `launch.json`
 (2) providing dynamically generated configurations when the user asks for them through the UI (e.g. via the "Select and Start Debugging" command).
Please note that the `triggerKind` argument only applies to the `provideDebugConfigurations` method, the `resolveDebugConfiguration` methods are not affected at all.
Registering a single provider with resolve methods for different trigger kinds results in the same resolve methods being called multiple times.
More than one provider can be registered for the same type.

##### 参数
- **debugType**: `string`  
  The debug type for which the provider is registered.

- **provider**: `<a href="#debugconfigurationprovider">DebugConfigurationProvider</a>`  
  The <a href="#debugconfigurationprovider">debug configuration provider</a> to register.

- **triggerKind**: `<a href="#debugconfigurationprovidertriggerkind">DebugConfigurationProviderTriggerKind</a>` (可选)  
  The trigger for which the 'provideDebugConfiguration' method of the provider is registered. If `triggerKind` is missing, the value `DebugConfigurationProviderTriggerKind.Initial` is assumed.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">Disposable</a> that unregisters this provider when being disposed.

</details>

<div id="debug-registerdebugadaptertrackerfactory"></div>

<details>
<summary><code>export function registerDebugAdapterTrackerFactory(debugType: string, factory: DebugAdapterTrackerFactory): Disposable;</code></summary>

##### 描述
Register a debug adapter tracker factory for the given debug type.

##### 参数
- **debugType**: `string`  
  The debug type for which the factory is registered or '*' for matching all debug types.

- **factory**: `<a href="#debugadaptertrackerfactory">DebugAdapterTrackerFactory</a>`  
  The <a href="#debugadaptertrackerfactory">debug adapter tracker factory</a> to register.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">disposable</a> that unregisters this factory when being disposed.

</details>

<div id="debug-startdebugging"></div>

<details>
<summary><code>export function startDebugging(folder: WorkspaceFolder | undefined, nameOrConfiguration: string | DebugConfiguration, parentSessionOrOptions?: DebugSession | DebugSessionOptions): Thenable&lt;boolean&gt;;</code></summary>

##### 描述
Start debugging by using either a named launch or named compound configuration,
or by directly passing a <a href="#debugconfiguration">DebugConfiguration</a>.
The named configurations are looked up in '.vscode/launch.json' found in the given folder.
Before debugging starts, all unsaved files are saved and the launch configurations are brought up-to-date.
Folder specific variables used in the configuration (e.g. '$&#123;workspaceFolder&#125;') are resolved against the given folder.

##### 参数
- **folder**: `<a href="#workspacefolder">WorkspaceFolder</a> | undefined`  
  The <a href="#workspacefolder">workspace folder</a> for looking up named configurations and resolving variables or `undefined` for a non-folder setup.

- **nameOrConfiguration**: `string | <a href="#debugconfiguration">DebugConfiguration</a>`  
  Either the name of a debug or compound configuration or a <a href="#debugconfiguration">DebugConfiguration</a> object.

- **parentSessionOrOptions**: `<a href="#debugsession">DebugSession</a> | <a href="#debugsessionoptions">DebugSessionOptions</a>` (可选)  
  Debug session options. When passed a parent debug session, assumes options with just this parent session.

##### 返回值
- `Thenable&lt;boolean&gt;` - A thenable that resolves when debugging could be successfully started.

</details>

<div id="debug-stopdebugging"></div>

<details>
<summary><code>export function stopDebugging(session?: DebugSession): Thenable&lt;void&gt;;</code></summary>

##### 描述
Stop the given debug session or stop all debug sessions if session is omitted.

##### 参数
- **session**: `<a href="#debugsession">DebugSession</a>` (可选)  
  The <a href="#debugsession">debug session</a> to stop; if omitted all sessions are stopped.

##### 返回值
- `Thenable&lt;void&gt;`

</details>

<div id="debug-addbreakpoints"></div>

<details>
<summary><code>export function addBreakpoints(breakpoints: readonly Breakpoint[]): void;</code></summary>

##### 描述
Add breakpoints.

##### 参数
- **breakpoints**: `readonly <a href="#breakpoint">Breakpoint</a>[]`  
  The breakpoints to add.

##### 返回值
- `void`

</details>

<div id="debug-removebreakpoints"></div>

<details>
<summary><code>export function removeBreakpoints(breakpoints: readonly Breakpoint[]): void;</code></summary>

##### 描述
Remove breakpoints.

##### 参数
- **breakpoints**: `readonly <a href="#breakpoint">Breakpoint</a>[]`  
  The breakpoints to remove.

##### 返回值
- `void`

</details>

<div id="debug-registerdebugvisualizationprovider"></div>

<details>
<summary><code>export function registerDebugVisualizationProvider&lt;T extends DebugVisualization&gt;( id: string, provider: DebugVisualizationProvider&lt;T&gt; ): Disposable;</code></summary>

##### 描述
Registers a custom data visualization for variables when debugging.

##### 参数
- **id**: `string`  
  The corresponding ID in the package.json `debugVisualizers` contribution point.

- **provider**: `<a href="#debugvisualizationprovider">DebugVisualizationProvider</a>&lt;T&gt;`  
  The <a href="#debugvisualizationprovider">DebugVisualizationProvider</a> to register

##### 返回值
- `<a href="#disposable">Disposable</a>`

</details>

<div id="debug-registerdebugvisualizationtreeprovider"></div>

<details>
<summary><code>export function registerDebugVisualizationTreeProvider&lt;T extends DebugTreeItem&gt;( id: string, provider: DebugVisualizationTree&lt;T&gt; ): Disposable;</code></summary>

##### 描述
Registers a tree that can be referenced by visualization.

##### 参数
- **id**: `string`  

- **provider**: `<a href="#debugvisualizationtree">DebugVisualizationTree</a>&lt;T&gt;`  

##### 返回值
- `<a href="#disposable">Disposable</a>`

</details>

#### Events

<div id="debug-ondidchangeactivedebugsession"></div>

<details>
<summary><code>onDidChangeActiveDebugSession: <a href="#event">Event</a>&lt;<a href="#debugsession">DebugSession</a> | undefined&gt;</code></summary>

##### 描述
An <a href="#event">event</a> which fires when the active debug session
has changed. *Note* that the event also fires when the active debug session changes
to `undefined`.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#debugsession">DebugSession</a> | undefined&gt;`

</details>

<div id="debug-ondidstartdebugsession"></div>

<details>
<summary><code>onDidStartDebugSession: <a href="#event">Event</a>&lt;<a href="#debugsession">DebugSession</a>&gt;</code></summary>

##### 描述
An <a href="#event">event</a> which fires when a new <a href="#debugsession">debug session</a> has been started.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#debugsession">DebugSession</a>&gt;`

</details>

<div id="debug-ondidreceivedebugsessioncustomevent"></div>

<details>
<summary><code>onDidReceiveDebugSessionCustomEvent: <a href="#event">Event</a>&lt;<a href="#debugsessioncustomevent">DebugSessionCustomEvent</a>&gt;</code></summary>

##### 描述
An <a href="#event">event</a> which fires when a custom DAP event is received from the <a href="#debugsession">debug session</a>.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#debugsessioncustomevent">DebugSessionCustomEvent</a>&gt;`

</details>

<div id="debug-ondidterminatedebugsession"></div>

<details>
<summary><code>onDidTerminateDebugSession: <a href="#event">Event</a>&lt;<a href="#debugsession">DebugSession</a>&gt;</code></summary>

##### 描述
An <a href="#event">event</a> which fires when a <a href="#debugsession">debug session</a> has terminated.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#debugsession">DebugSession</a>&gt;`

</details>

<div id="debug-ondidchangebreakpoints"></div>

<details>
<summary><code>onDidChangeBreakpoints: <a href="#event">Event</a>&lt;<a href="#breakpointschangeevent">BreakpointsChangeEvent</a>&gt;</code></summary>

##### 描述
An <a href="#event">event</a> that is emitted when the set of breakpoints is added, removed, or changed.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#breakpointschangeevent">BreakpointsChangeEvent</a>&gt;`

</details>

<div id="debug-ondidchangeactivestackitem"></div>

<details>
<summary><code>onDidChangeActiveStackItem: <a href="#event">Event</a>&lt;<a href="#debugthread">DebugThread</a> | <a href="#debugstackframe">DebugStackFrame</a> | undefined&gt;</code></summary>

##### 描述
An event which fires when the <a href="#debug-activestackitem">activeStackItem</a> has changed.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#debugthread">DebugThread</a> | <a href="#debugstackframe">DebugStackFrame</a> | undefined&gt;`

</details>

#### Variables

<div id="debug-activedebugsession"></div>

<details>
<summary><code>activeDebugSession: <a href="#debugsession">DebugSession</a> | undefined</code></summary>

##### 描述
The currently active <a href="#debugsession">debug session</a> or `undefined`. The active debug session is the one
represented by the debug action floating window or the one currently shown in the drop down menu of the debug action floating window.
If no debug session is active, the value is `undefined`.

##### 类型
```typescript
DebugSession | undefined
```

</details>

<div id="debug-activedebugconsole"></div>

<details>
<summary><code>activeDebugConsole: <a href="#debugconsole">DebugConsole</a></code></summary>

##### 描述
The currently active <a href="#debugconsole">debug console</a>.

##### 类型
```typescript
DebugConsole
```

</details>

<div id="debug-breakpoints"></div>

<details>
<summary><code>breakpoints: readonly <a href="#breakpoint">Breakpoint</a>[]</code></summary>

##### 描述
List of breakpoints.

##### 类型
```typescript
readonly Breakpoint[]
```

</details>

<div id="debug-activestackitem"></div>

<details>
<summary><code>activeStackItem: <a href="#debugthread">DebugThread</a> | <a href="#debugstackframe">DebugStackFrame</a> | undefined</code></summary>

##### 描述
The currently focused thread or stack frame, or `undefined` if no
thread or stack is focused. A thread can be focused any time there is
an active debug session, while a stack frame can only be focused when
a session is paused and the call stack has been retrieved.

##### 类型
```typescript
DebugThread | DebugStackFrame | undefined
```

##### 只读
- 是

</details>

---

## env

#### Functions

<div id="env-getclientoperatingsystem"></div>

<details>
<summary><code>export function getClientOperatingSystem(): Thenable&lt;OperatingSystem&gt;;</code></summary>

##### 描述
Returns the type of the operating system on the client side (like browser'OS if using browser mode). If it is neither [Windows](isWindows) nor [OS X](isOSX), then
it always return with the `Linux` OS type.

##### 返回值
- `Thenable&lt;<a href="#operatingsystem">OperatingSystem</a>&gt;`

</details>

<div id="env-getenvvariable"></div>

<details>
<summary><code>export function getEnvVariable(envVarName: string): Thenable&lt;string | undefined&gt;;</code></summary>

##### 描述
Gets environment variable value by name.

##### 参数
- **envVarName**: `string`  
  name of environment variable to get

##### 返回值
- `Thenable&lt;string | undefined&gt;` - value of the given environment variable name or undefined if there is no such variable.

</details>

<div id="env-getqueryparameter"></div>

<details>
<summary><code>export function getQueryParameter(queryParamName: string): string | string[] | undefined;</code></summary>

##### 描述
Gets query parameter value by name.

##### 参数
- **queryParamName**: `string`  
  name of query parameter to get.

##### 返回值
- `string | string[] | undefined` - value of the given query parameter or undefined if there is no such variable.

</details>

<div id="env-getqueryparameters"></div>

<details>
<summary><code>export function getQueryParameters(): &#123; [key: string]: string | string[] &#125; | undefined;</code></summary>

##### 描述
Returns all query parameters of current IDE.

##### 返回值
- `&#123; [key: string]: string | string[] &#125; | undefined`

</details>

<div id="env-createtelemetrylogger"></div>

<details>
<summary><code>export function createTelemetryLogger(sender: TelemetrySender, options?: TelemetryLoggerOptions): TelemetryLogger;</code></summary>

##### 描述
Creates a new <a href="#telemetrylogger">telemetry logger</a>.

##### 参数
- **sender**: `<a href="#telemetrysender">TelemetrySender</a>`  
  The telemetry sender that is used by the telemetry logger.

- **options**: `<a href="#telemetryloggeroptions">TelemetryLoggerOptions</a>` (可选)  
  Options for the telemetry logger.

##### 返回值
- `<a href="#telemetrylogger">TelemetryLogger</a>` - A new telemetry logger

</details>

<div id="env-openexternal"></div>

<details>
<summary><code>export function openExternal(target: Uri): Thenable&lt;boolean&gt;;</code></summary>

##### 描述
Opens an *external* item, e.g. a http(s) or mailto-link, using the
default application.

*Note* that [`showTextDocument`](#window.showTextDocument) is the right
way to open a text document inside the editor, not this function.

##### 参数
- **target**: `<a href="#uri">Uri</a>`  
  The uri that should be opened.

##### 返回值
- `Thenable&lt;boolean&gt;` - A promise indicating if open was successful.

</details>

<div id="env-asexternaluri"></div>

<details>
<summary><code>export function asExternalUri(target: Uri): Thenable&lt;Uri&gt;;</code></summary>

##### 描述
Resolves an *external* uri, such as a `http:` or `https:` link, from where the extension is running to a
uri to the same resource on the client machine.

This is a no-op if the extension is running on the client machine. Currently only supports
`https:` and `http:` uris.

If the extension is running remotely, this function automatically establishes a port forwarding tunnel
from the local machine to `target` on the remote and returns a local uri to the tunnel. The lifetime of
the port forwarding tunnel is managed by VS Code and the tunnel can be closed by the user.

Extensions should not cache the result of `asExternalUri` as the resolved uri may become invalid due to
a system or user action — for example, in remote cases, a user may close a port forwarding tunnel
that was opened by `asExternalUri`.

*Note* that uris passed through `openExternal` are automatically resolved and you should not call `asExternalUri`
on them.

##### 参数
- **target**: `<a href="#uri">Uri</a>`  

##### 返回值
- `Thenable&lt;<a href="#uri">Uri</a>&gt;` - A uri that can be used on the client machine.

</details>

#### Events

<div id="env-ondidchangeshell"></div>

<details>
<summary><code>onDidChangeShell: <a href="#event">Event</a>&lt;string&gt;</code></summary>

##### 描述
An <a href="#event">Event</a> which fires when the default shell changes. This fires with the new
shell path.

##### 类型
- `<a href="#event">Event</a>&lt;string&gt;`

</details>

<div id="env-ondidchangetelemetryenabled"></div>

<details>
<summary><code>onDidChangeTelemetryEnabled: <a href="#event">Event</a>&lt;boolean&gt;</code></summary>

##### 描述
An <a href="#event">Event</a> which fires when the user enabled or disables telemetry.
`true` if the user has enabled telemetry or `false` if the user has disabled telemetry.

##### 类型
- `<a href="#event">Event</a>&lt;boolean&gt;`

</details>

<div id="env-ondidchangeloglevel"></div>

<details>
<summary><code>onDidChangeLogLevel: <a href="#event">Event</a>&lt;<a href="#loglevel">LogLevel</a>&gt;</code></summary>

##### 描述
An <a href="#event">Event</a> which fires when the log level of the editor changes.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#loglevel">LogLevel</a>&gt;`

</details>

#### Variables

<div id="env-appname"></div>

<details>
<summary><code>appName: string</code></summary>

##### 描述
The application name of the editor, like 'Eclipse Theia'.

##### 类型
```typescript
string
```

##### 只读
- 是

</details>

<div id="env-approot"></div>

<details>
<summary><code>appRoot: string</code></summary>

##### 描述
The application root folder from which the editor is running.

*Note* that the value is the empty string when running in an
environment that has no representation of an application root folder.

##### 类型
```typescript
string
```

##### 只读
- 是

</details>

<div id="env-apphost"></div>

<details>
<summary><code>appHost: string</code></summary>

##### 描述
The hosted location of the application
On desktop this is 'desktop'
In the web this is the specified embedder i.e. 'github.dev', 'codespaces', or 'web' if the embedder
does not provide that information

##### 类型
```typescript
string
```

##### 只读
- 是

</details>

<div id="env-urischeme"></div>

<details>
<summary><code>uriScheme: string</code></summary>

##### 描述
The custom uri scheme the editor registers to in the operating system.

##### 类型
```typescript
string
```

##### 只读
- 是

</details>

<div id="env-language"></div>

<details>
<summary><code>language: string</code></summary>

##### 描述
Represents the preferred user-language, like `de-CH`, `fr`, or `en-US`.

##### 类型
```typescript
string
```

##### 只读
- 是

</details>

<div id="env-isnewappinstall"></div>

<details>
<summary><code>isNewAppInstall: boolean</code></summary>

##### 描述
Indicates that this is a fresh install of the application.
`true` if within the first day of installation otherwise `false`.

##### 类型
```typescript
boolean
```

##### 只读
- 是

</details>

<div id="env-istelemetryenabled"></div>

<details>
<summary><code>isTelemetryEnabled: boolean</code></summary>

##### 描述
Indicates whether the users has telemetry enabled.
Can be observed to determine if the extension should send telemetry.

##### 类型
```typescript
boolean
```

##### 只读
- 是

</details>

<div id="env-remotename"></div>

<details>
<summary><code>remoteName: string | undefined</code></summary>

##### 描述
The name of a remote. Defined by extensions, popular samples are `wsl` for the Windows
Subsystem for Linux or `ssh-remote` for remotes using a secure shell.

*Note* that the value is `undefined` when there is no remote extension host but that the
value is defined in all extension hosts (local and remote) in case a remote extension host
exists. Use extensionKind to know if
a specific extension runs remote or not.

##### 类型
```typescript
string | undefined
```

##### 只读
- 是

</details>

<div id="env-shell"></div>

<details>
<summary><code>shell: string</code></summary>

##### 描述
The detected default shell for the extension host, this is overridden by the
`terminal.integrated.defaultProfile` setting for the extension host's platform. Note that in
environments that do not support a shell the value is the empty string.

##### 类型
```typescript
string
```

##### 只读
- 是

</details>

<div id="env-uikind"></div>

<details>
<summary><code>uiKind: <a href="#uikind">UIKind</a></code></summary>

##### 描述
The UI kind property indicates from which UI extensions
are accessed from. For example, extensions could be accessed
from a desktop application or a web browser.

##### 类型
```typescript
UIKind
```

##### 只读
- 是

</details>

<div id="env-clipboard"></div>

<details>
<summary><code>clipboard: <a href="#clipboard">Clipboard</a></code></summary>

##### 描述
The system clipboard.

##### 类型
```typescript
Clipboard
```

##### 只读
- 是

</details>

<div id="env-machineid"></div>

<details>
<summary><code>machineId: string</code></summary>

##### 描述
A unique identifier for the computer.

##### 类型
```typescript
string
```

##### 只读
- 是

</details>

<div id="env-sessionid"></div>

<details>
<summary><code>sessionId: string</code></summary>

##### 描述
A unique identifier for the current session.
Changes each time the editor is started.

##### 类型
```typescript
string
```

##### 只读
- 是

</details>

<div id="env-loglevel"></div>

<details>
<summary><code>logLevel: <a href="#loglevel">LogLevel</a></code></summary>

##### 描述
The current log level of the editor.

##### 类型
```typescript
LogLevel
```

##### 只读
- 是

</details>

---

## extensions

#### Functions

<div id="extensions-getextension"></div>

<details>
<summary><code>export function getExtension&lt;T = any&gt;(extensionId: string): Extension&lt;T&gt; | undefined;</code></summary>

##### 描述
Get an extension by its full identifier in the form of: `publisher.name`.

##### 参数
- **extensionId**: `string`  
  An extension identifier.

##### 返回值
- `<a href="#extension">Extension</a>&lt;T&gt; | undefined` - An extension or `undefined`.

</details>

<div id="extensions-getextension"></div>

<details>
<summary><code>export function getExtension&lt;T = any&gt;(extensionId: string, includeDifferentExtensionHosts: boolean): Extension&lt;T&gt; | undefined;</code></summary>

##### 描述
Get an extension by its full identifier in the form of: `publisher.name`.

##### 参数
- **extensionId**: `string`  
  An extension identifier.

- **includeDifferentExtensionHosts**: `boolean`  
  Include extensions from different extension host

##### 返回值
- `<a href="#extension">Extension</a>&lt;T&gt; | undefined` - An extension or `undefined`.

*Note* In Theia, includeDifferentExtensionHosts will always be set to false, as we only support one host currently.

</details>

<div id="extensions-getextension"></div>

<details>
<summary><code>export function getExtension&lt;T = any&gt;(extensionId: string, includeDifferentExtensionHosts: true): Extension&lt;T | undefined&gt; | undefined;</code></summary>

##### 参数
- **extensionId**: `string`  

- **includeDifferentExtensionHosts**: `true`  

##### 返回值
- `<a href="#extension">Extension</a>&lt;T | undefined&gt; | undefined`

</details>

#### Events

<div id="extensions-ondidchange"></div>

<details>
<summary><code>onDidChange: <a href="#event">Event</a>&lt;void&gt;</code></summary>

##### 描述
An event which fires when `extensions.all` changes. This can happen when extensions are
installed, uninstalled, enabled or disabled.

##### 类型
- `<a href="#event">Event</a>&lt;void&gt;`

</details>

#### Variables

<div id="extensions-all"></div>

<details>
<summary><code>all: readonly <a href="#extension">Extension</a>&lt;any&gt;[]</code></summary>

##### 描述
All extensions currently known to the system.

##### 类型
```typescript
readonly Extension<any>[]
```

##### 只读
- 是

</details>

<div id="extensions-allacrossextensionhosts"></div>

<details>
<summary><code>allAcrossExtensionHosts: readonly <a href="#extension">Extension</a>&lt;void&gt;[]</code></summary>

##### 描述
All extensions across all extension hosts.

##### 类型
```typescript
readonly Extension<void>[]
```

##### 只读
- 是

</details>

---

## l10n

#### Functions

<div id="l10n-t"></div>

<details>
<summary><code>export function t(message: string, ...args: Array&lt;string | number | boolean&gt;): string;</code></summary>

##### 描述
Marks a string for localization. If a localized bundle is available for the language specified by
<a href="#env-language">language</a> and the bundle has a localized value for this message, then that localized
value will be returned (with injected `args` values for any templated values).

##### 参数
- **message**: `string`  
  - The message to localize. Supports index templating where strings like `&#123;0&#125;` and `&#123;1&#125;` are
replaced by the item at that index in the `args` array.

- **args**: `Array&lt;string | number | boolean&gt;`  
  - The arguments to be used in the localized string. The index of the argument is used to
match the template placeholder in the localized string.

##### 返回值
- `string` - localized string with injected arguments.

##### 示例
```typescript
`l10n.t('Hello {0}!', 'World');`
```

</details>

<div id="l10n-t"></div>

<details>
<summary><code>export function t(message: string, args: Record&lt;string, any&gt;): string;</code></summary>

##### 描述
Marks a string for localization. If a localized bundle is available for the language specified by
<a href="#env-language">language</a> and the bundle has a localized value for this message, then that localized
value will be returned (with injected `args` values for any templated values).

##### 参数
- **message**: `string`  
  The message to localize. Supports named templating where strings like `&#123;foo&#125;` and `&#123;bar&#125;` are
replaced by the value in the Record for that key (foo, bar, etc).

- **args**: `Record&lt;string, any&gt;`  
  The arguments to be used in the localized string. The name of the key in the record is used to
match the template placeholder in the localized string.

##### 返回值
- `string` - localized string with injected arguments.

##### 示例
```typescript
`l10n.t('Hello {name}', { name: 'Erich' });`
```

</details>

<div id="l10n-t"></div>

<details>
<summary><code>export function t(options: &#123; message: string; args?: Array&lt;string | number | boolean&gt; | Record&lt;string, any&gt;; comment: string | string[]; &#125;): string;</code></summary>

##### 描述
Marks a string for localization. If a localized bundle is available for the language specified by
<a href="#env-language">language</a> and the bundle has a localized value for this message, then that localized
value will be returned (with injected args values for any templated values).

##### 参数
- **options**: `&#123; message: string; args?: Array&lt;string | number | boolean&gt; | Record&lt;string, any&gt;; comment: string | string[]; &#125;`  
  The options to use when localizing the message.

##### 返回值
- `string` - localized string with injected arguments.

</details>

#### Events

_此 namespace 暂无事件_

#### Variables

<div id="l10n-bundle"></div>

<details>
<summary><code>bundle: &#123; [key: string]: string &#125; | undefined</code></summary>

##### 描述
The bundle of localized strings that have been loaded for the extension.
It's undefined if no bundle has been loaded. The bundle is typically not loaded if
there was no bundle found or when we are running with the default language.

##### 类型
```typescript
{ [key: string]: string } | undefined
```

##### 只读
- 是

</details>

<div id="l10n-uri"></div>

<details>
<summary><code>uri: <a href="#uri">Uri</a> | undefined</code></summary>

##### 描述
The URI of the localization bundle that has been loaded for the extension.
It's undefined if no bundle has been loaded. The bundle is typically not loaded if
there was no bundle found or when we are running with the default language.

##### 类型
```typescript
Uri | undefined
```

##### 只读
- 是

</details>

---

## languages

#### Functions

<div id="languages-getlanguages"></div>

<details>
<summary><code>export function getLanguages(): Thenable&lt;string[]&gt;;</code></summary>

##### 描述
Return the identifiers of all known languages.

##### 返回值
- `Thenable&lt;string[]&gt;` - Promise resolving to an array of identifier strings.

</details>

<div id="languages-settextdocumentlanguage"></div>

<details>
<summary><code>export function setTextDocumentLanguage(document: TextDocument, languageId: string): Thenable&lt;TextDocument&gt;;</code></summary>

##### 描述
Set (and change) the language that is associated
with the given document.

*Note* that calling this function will trigger the [`onDidCloseTextDocument`](#workspace.onDidCloseTextDocument) event
followed by the [`onDidOpenTextDocument`](#workspace.onDidOpenTextDocument) event.

##### 参数
- **document**: `<a href="#textdocument">TextDocument</a>`  
  The document which language is to be changed

- **languageId**: `string`  
  The new language identifier.

##### 返回值
- `Thenable&lt;<a href="#textdocument">TextDocument</a>&gt;` - A thenable that resolves with the updated document.

</details>

<div id="languages-match"></div>

<details>
<summary><code>export function match(selector: DocumentSelector, document: TextDocument): number;</code></summary>

##### 描述
Compute the match between a document <a href="#documentselector">selector</a> and a document. Values
greater than zero mean the selector matches the document.

A match is computed according to these rules:
1. When [`DocumentSelector`](#DocumentSelector) is an array, compute the match for each contained `DocumentFilter` or language identifier and take the maximum value.
2. A string will be desugared to become the `language`-part of a [`DocumentFilter`](#DocumentFilter), so `"fooLang"` is like `&#123; language: "fooLang" &#125;`.
3. A [`DocumentFilter`](#DocumentFilter) will be matched against the document by comparing its parts with the document. The following rules apply:
 1. When the `DocumentFilter` is empty (`&#123;&#125;`) the result is `0`
 2. When `scheme`, `language`, or `pattern` are defined but one doesn’t match, the result is `0`
 3. Matching against `*` gives a score of `5`, matching via equality or via a glob-pattern gives a score of `10`
 4. The result is the maximum value of each match

Samples:
```js
// default document from disk (file-scheme)
doc.uri; //'file:///my/file.js'
doc.languageId; // 'javascript'
match('javascript', doc); // 10;
match(&#123;language: 'javascript'&#125;, doc); // 10;
match(&#123;language: 'javascript', scheme: 'file'&#125;, doc); // 10;
match('*', doc); // 5
match('fooLang', doc); // 0
match(['fooLang', '*'], doc); // 5

// virtual document, e.g. from git-index
doc.uri; // 'git:/my/file.js'
doc.languageId; // 'javascript'
match('javascript', doc); // 10;
match(&#123;language: 'javascript', scheme: 'git'&#125;, doc); // 10;
match('*', doc); // 5
```

##### 参数
- **selector**: `<a href="#documentselector">DocumentSelector</a>`  
  A document selector.

- **document**: `<a href="#textdocument">TextDocument</a>`  
  A text document.

##### 返回值
- `number` - A number `&gt;0` when the selector matches and `0` when the selector does not match.

</details>

<div id="languages-getdiagnostics"></div>

<details>
<summary><code>export function getDiagnostics(resource: Uri): Promise&lt;Diagnostic[]&gt;;</code></summary>

##### 描述
Get all diagnostics for a given resource. *Note* that this includes diagnostics from
all extensions but *not yet* from the task framework.

##### 参数
- **resource**: `<a href="#uri">Uri</a>`  
  A resource

##### 返回值
- `Promise&lt;<a href="#diagnostic">Diagnostic</a>[]&gt;` - An array of <a href="#diagnostic">diagnostics</a> objects or an empty array.

</details>

<div id="languages-getdiagnostics"></div>

<details>
<summary><code>export function getDiagnostics(): Promise&lt;[Uri, Diagnostic[]][]&gt;;</code></summary>

##### 描述
Get all diagnostics. *Note* that this includes diagnostics from
all extensions but *not yet* from the task framework.

##### 返回值
- `Promise&lt;[<a href="#uri">Uri</a>, <a href="#diagnostic">Diagnostic</a>[]][]&gt;` - An array of uri-diagnostics tuples or an empty array.

</details>

<div id="languages-creatediagnosticcollection"></div>

<details>
<summary><code>export function createDiagnosticCollection(name?: string): DiagnosticCollection;</code></summary>

##### 描述
Create a diagnostics collection.

##### 参数
- **name**: `string` (可选)  
  The name of the collection.

##### 返回值
- `<a href="#diagnosticcollection">DiagnosticCollection</a>` - A new diagnostic collection.

</details>

<div id="languages-setlanguageconfiguration"></div>

<details>
<summary><code>export function setLanguageConfiguration(language: string, configuration: LanguageConfiguration): Disposable;</code></summary>

##### 描述
Set a <a href="#languageconfiguration">language configuration</a> for a language.

##### 参数
- **language**: `string`  
  A language identifier like `typescript`.

- **configuration**: `<a href="#languageconfiguration">LanguageConfiguration</a>`  
  Language configuration.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">disposable</a> that unsets this configuration.

</details>

<div id="languages-registercompletionitemprovider"></div>

<details>
<summary><code>export function registerCompletionItemProvider(selector: DocumentSelector, provider: CompletionItemProvider, ...triggerCharacters: string[]): Disposable;</code></summary>

##### 描述
Register a completion provider.

Multiple providers can be registered for a language. In that case providers are sorted
by their score and groups of equal score are sequentially asked for
completion items. The process stops when one or many providers of a group return a
result. A failing provider (rejected promise or exception) will not fail the whole
operation.

##### 参数
- **selector**: `<a href="#documentselector">DocumentSelector</a>`  
  A selector that defines the documents this provider is applicable to.

- **provider**: `<a href="#completionitemprovider">CompletionItemProvider</a>`  
  A completion provider.

- **triggerCharacters**: `string[]`  
  Trigger completion when the user types one of the characters, like `.` or `:`.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">disposable</a> that unregisters this provider when being disposed.

</details>

<div id="languages-registerinlinecompletionitemprovider"></div>

<details>
<summary><code>export function registerInlineCompletionItemProvider(selector: DocumentSelector, provider: InlineCompletionItemProvider): Disposable;</code></summary>

##### 描述
Registers an inline completion provider.

Multiple providers can be registered for a language. In that case providers are asked in
parallel and the results are merged. A failing provider (rejected promise or exception) will
not cause a failure of the whole operation.

##### 参数
- **selector**: `<a href="#documentselector">DocumentSelector</a>`  
  A selector that defines the documents this provider is applicable to.

- **provider**: `<a href="#inlinecompletionitemprovider">InlineCompletionItemProvider</a>`  
  An inline completion provider.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">Disposable</a> that unregisters this provider when being disposed.

</details>

<div id="languages-registerdefinitionprovider"></div>

<details>
<summary><code>export function registerDefinitionProvider(selector: DocumentSelector, provider: DefinitionProvider): Disposable;</code></summary>

##### 描述
Register a definition provider.

Multiple providers can be registered for a language. In that case providers are asked in
parallel and the results are merged. A failing provider (rejected promise or exception) will
not cause a failure of the whole operation.

##### 参数
- **selector**: `<a href="#documentselector">DocumentSelector</a>`  
  A selector that defines the documents this provider is applicable to.

- **provider**: `<a href="#definitionprovider">DefinitionProvider</a>`  
  A definition provider.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">disposable</a> that unregisters this provider when being disposed.

</details>

<div id="languages-registerdocumentdropeditprovider"></div>

<details>
<summary><code>export function registerDocumentDropEditProvider(selector: DocumentSelector, provider: DocumentDropEditProvider): Disposable;</code></summary>

##### 描述
Registers a new <a href="#documentdropeditprovider">DocumentDropEditProvider</a>.

##### 参数
- **selector**: `<a href="#documentselector">DocumentSelector</a>`  
  A selector that defines the documents this provider applies to.

- **provider**: `<a href="#documentdropeditprovider">DocumentDropEditProvider</a>`  
  A drop provider.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">Disposable</a> that unregisters this provider when disposed of.

</details>

<div id="languages-registerdeclarationprovider"></div>

<details>
<summary><code>export function registerDeclarationProvider(selector: DocumentSelector, provider: DeclarationProvider): Disposable;</code></summary>

##### 描述
Register a declaration provider.

Multiple providers can be registered for a language. In that case providers are asked in
parallel and the results are merged. A failing provider (rejected promise or exception) will
not cause a failure of the whole operation.

##### 参数
- **selector**: `<a href="#documentselector">DocumentSelector</a>`  
  A selector that defines the documents this provider is applicable to.

- **provider**: `<a href="#declarationprovider">DeclarationProvider</a>`  
  A declaration provider.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">disposable</a> that unregisters this provider when being disposed.

</details>

<div id="languages-registersignaturehelpprovider"></div>

<details>
<summary><code>export function registerSignatureHelpProvider(selector: DocumentSelector, provider: SignatureHelpProvider, ...triggerCharacters: string[]): Disposable;</code></summary>

##### 描述
Register a signature help provider.

Multiple providers can be registered for a language. In that case providers are sorted
by their score and called sequentially until a provider returns a
valid result.

##### 参数
- **selector**: `<a href="#documentselector">DocumentSelector</a>`  
  A selector that defines the documents this provider is applicable to.

- **provider**: `<a href="#signaturehelpprovider">SignatureHelpProvider</a>`  
  A signature help provider.

- **triggerCharacters**: `string[]`  
  Trigger signature help when the user types one of the characters, like `,` or `(`.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">disposable</a> that unregisters this provider when being disposed.

</details>

<div id="languages-registersignaturehelpprovider"></div>

<details>
<summary><code>export function registerSignatureHelpProvider(selector: DocumentSelector, provider: SignatureHelpProvider, metadata: SignatureHelpProviderMetadata): Disposable;</code></summary>

##### 参数
- **selector**: `<a href="#documentselector">DocumentSelector</a>`  

- **provider**: `<a href="#signaturehelpprovider">SignatureHelpProvider</a>`  

- **metadata**: `<a href="#signaturehelpprovidermetadata">SignatureHelpProviderMetadata</a>`  

##### 返回值
- `<a href="#disposable">Disposable</a>`

</details>

<div id="languages-registertypedefinitionprovider"></div>

<details>
<summary><code>export function registerTypeDefinitionProvider(selector: DocumentSelector, provider: TypeDefinitionProvider): Disposable;</code></summary>

##### 描述
Register a type definition provider.

Multiple providers can be registered for a language. In that case providers are asked in
parallel and the results are merged. A failing provider (rejected promise or exception) will
not cause a failure of the whole operation.

##### 参数
- **selector**: `<a href="#documentselector">DocumentSelector</a>`  
  A selector that defines the documents this provider is applicable to.

- **provider**: `<a href="#typedefinitionprovider">TypeDefinitionProvider</a>`  
  A type definition provider.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">disposable</a> that unregisters this provider when being disposed.

</details>

<div id="languages-registerimplementationprovider"></div>

<details>
<summary><code>export function registerImplementationProvider(selector: DocumentSelector, provider: ImplementationProvider): Disposable;</code></summary>

##### 描述
Register an implementation provider.

Multiple providers can be registered for a language. In that case providers are asked in
parallel and the results are merged. A failing provider (rejected promise or exception) will
not cause a failure of the whole operation.

##### 参数
- **selector**: `<a href="#documentselector">DocumentSelector</a>`  
  A selector that defines the documents this provider is applicable to.

- **provider**: `<a href="#implementationprovider">ImplementationProvider</a>`  
  An implementation provider.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">disposable</a> that unregisters this provider when being disposed.

</details>

<div id="languages-registerhoverprovider"></div>

<details>
<summary><code>export function registerHoverProvider(selector: DocumentSelector, provider: HoverProvider): Disposable;</code></summary>

##### 描述
Register a hover provider.

Multiple providers can be registered for a language. In that case providers are asked in
parallel and the results are merged. A failing provider (rejected promise or exception) will
not cause a failure of the whole operation.

##### 参数
- **selector**: `<a href="#documentselector">DocumentSelector</a>`  
  A selector that defines the documents this provider is applicable to.

- **provider**: `<a href="#hoverprovider">HoverProvider</a>`  
  A hover provider.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">disposable</a> that unregisters this provider when being disposed.

</details>

<div id="languages-registerevaluatableexpressionprovider"></div>

<details>
<summary><code>export function registerEvaluatableExpressionProvider(selector: DocumentSelector, provider: EvaluatableExpressionProvider): Disposable;</code></summary>

##### 描述
Register a provider that locates evaluatable expressions in text documents.
The editor will evaluate the expression in the active debug session and will show the result in the debug hover.

If multiple providers are registered for a language an arbitrary provider will be used.

##### 参数
- **selector**: `<a href="#documentselector">DocumentSelector</a>`  
  A selector that defines the documents this provider is applicable to.

- **provider**: `<a href="#evaluatableexpressionprovider">EvaluatableExpressionProvider</a>`  
  An evaluatable expression provider.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">Disposable</a> that unregisters this provider when being disposed.

</details>

<div id="languages-registerinlinevaluesprovider"></div>

<details>
<summary><code>export function registerInlineValuesProvider(selector: DocumentSelector, provider: InlineValuesProvider): Disposable;</code></summary>

##### 描述
Register a provider that returns data for the debugger's 'inline value' feature.
Whenever the generic debugger has stopped in a source file, providers registered for the language of the file
are called to return textual data that will be shown in the editor at the end of lines.

Multiple providers can be registered for a language. In that case providers are asked in
parallel and the results are merged. A failing provider (rejected promise or exception) will
not cause a failure of the whole operation.

##### 参数
- **selector**: `<a href="#documentselector">DocumentSelector</a>`  
  A selector that defines the documents this provider is applicable to.

- **provider**: `<a href="#inlinevaluesprovider">InlineValuesProvider</a>`  
  An inline values provider.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">Disposable</a> that unregisters this provider when being disposed.

</details>

<div id="languages-registerworkspacesymbolprovider"></div>

<details>
<summary><code>export function registerWorkspaceSymbolProvider(provider: WorkspaceSymbolProvider): Disposable;</code></summary>

##### 描述
Register a workspace symbol provider.

Multiple providers can be registered for a language. In that case providers are asked in
parallel and the results are merged. A failing provider (rejected promise or exception) will
not cause a failure of the whole operation.

##### 参数
- **provider**: `<a href="#workspacesymbolprovider">WorkspaceSymbolProvider</a>`  
  A workspace symbol provider.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">disposable</a> that unregisters this provider when being disposed.

</details>

<div id="languages-registerdocumenthighlightprovider"></div>

<details>
<summary><code>export function registerDocumentHighlightProvider(selector: DocumentSelector, provider: DocumentHighlightProvider): Disposable;</code></summary>

##### 描述
Register a document highlight provider.

Multiple providers can be registered for a language. In that case providers are sorted
by their score and groups sequentially asked for document highlights.
The process stops when a provider returns a `non-falsy` or `non-failure` result.

##### 参数
- **selector**: `<a href="#documentselector">DocumentSelector</a>`  
  A selector that defines the documents this provider is applicable to.

- **provider**: `<a href="#documenthighlightprovider">DocumentHighlightProvider</a>`  
  A document highlight provider.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">disposable</a> that unregisters this provider when being disposed.

</details>

<div id="languages-registerdocumentformattingeditprovider"></div>

<details>
<summary><code>export function registerDocumentFormattingEditProvider(selector: DocumentSelector, provider: DocumentFormattingEditProvider): Disposable;</code></summary>

##### 描述
Register a formatting provider for a document.

Multiple providers can be registered for a language. In that case providers are sorted
by their score and the best-matching provider is used. Failure
of the selected provider will cause a failure of the whole operation.

##### 参数
- **selector**: `<a href="#documentselector">DocumentSelector</a>`  
  A selector that defines the documents this provider is applicable to.

- **provider**: `<a href="#documentformattingeditprovider">DocumentFormattingEditProvider</a>`  
  A document formatting edit provider.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">disposable</a> that unregisters this provider when being disposed.

</details>

<div id="languages-registerdocumentrangeformattingeditprovider"></div>

<details>
<summary><code>export function registerDocumentRangeFormattingEditProvider(selector: DocumentSelector, provider: DocumentRangeFormattingEditProvider): Disposable;</code></summary>

##### 描述
Register a formatting provider for a document range.

*Note:* A document range provider is also a <a href="#documentformattingeditprovider">document formatter</a>
which means there is no need to <a href="#languages-registerdocumentformattingeditprovider">register</a> a document
formatter when also registering a range provider.

Multiple providers can be registered for a language. In that case providers are sorted
by their score and the best-matching provider is used. Failure
of the selected provider will cause a failure of the whole operation.

##### 参数
- **selector**: `<a href="#documentselector">DocumentSelector</a>`  
  A selector that defines the documents this provider is applicable to.

- **provider**: `<a href="#documentrangeformattingeditprovider">DocumentRangeFormattingEditProvider</a>`  
  A document range formatting edit provider.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">disposable</a> that unregisters this provider when being disposed.

</details>

<div id="languages-registercodeactionsprovider"></div>

<details>
<summary><code>export function registerCodeActionsProvider(selector: DocumentSelector, provider: CodeActionProvider, metadata?: CodeActionProviderMetadata): Disposable;</code></summary>

##### 描述
Register a code action provider.

Multiple providers can be registered for a language. In that case providers are asked in
parallel and the results are merged. A failing provider (rejected promise or exception) will
not cause a failure of the whole operation.

##### 参数
- **selector**: `<a href="#documentselector">DocumentSelector</a>`  
  A selector that defines the documents this provider is applicable to.

- **provider**: `<a href="#codeactionprovider">CodeActionProvider</a>`  
  A code action provider.

- **metadata**: `<a href="#codeactionprovidermetadata">CodeActionProviderMetadata</a>` (可选)  
  Metadata about the kind of code actions the provider providers.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">disposable</a> that unregisters this provider when being disposed.

</details>

<div id="languages-registercodelensprovider"></div>

<details>
<summary><code>export function registerCodeLensProvider(selector: DocumentSelector, provider: CodeLensProvider): Disposable;</code></summary>

##### 描述
Register a code lens provider.

Multiple providers can be registered for a language. In that case providers are asked in
parallel and the results are merged. A failing provider (rejected promise or exception) will
not cause a failure of the whole operation.

##### 参数
- **selector**: `<a href="#documentselector">DocumentSelector</a>`  
  A selector that defines the documents this provider is applicable to.

- **provider**: `<a href="#codelensprovider">CodeLensProvider</a>`  
  A code lens provider.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">disposable</a> that unregisters this provider when being disposed.

</details>

<div id="languages-registerontypeformattingeditprovider"></div>

<details>
<summary><code>export function registerOnTypeFormattingEditProvider( selector: DocumentSelector, provider: OnTypeFormattingEditProvider, firstTriggerCharacter: string, ...moreTriggerCharacter: string[] ): Disposable;</code></summary>

##### 描述
Register a formatting provider that works on type. The provider is active when the user enables the setting `editor.formatOnType`.

Multiple providers can be registered for a language. In that case providers are sorted
by their score and the best-matching provider is used. Failure
of the selected provider will cause a failure of the whole operation.

##### 参数
- **selector**: `<a href="#documentselector">DocumentSelector</a>`  
  A selector that defines the documents this provider is applicable to.

- **provider**: `<a href="#ontypeformattingeditprovider">OnTypeFormattingEditProvider</a>`  
  An on type formatting edit provider.

- **firstTriggerCharacter**: `string`  
  A character on which formatting should be triggered, like `&#125;`.

- **moreTriggerCharacter**: `string[]`  
  More trigger characters.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">disposable</a> that unregisters this provider when being disposed.

</details>

<div id="languages-registerdocumentlinkprovider"></div>

<details>
<summary><code>export function registerDocumentLinkProvider(selector: DocumentSelector, provider: DocumentLinkProvider): Disposable;</code></summary>

##### 描述
Register a document link provider.

Multiple providers can be registered for a language. In that case providers are asked in
parallel and the results are merged. A failing provider (rejected promise or exception) will
not cause a failure of the whole operation.

##### 参数
- **selector**: `<a href="#documentselector">DocumentSelector</a>`  
  A selector that defines the documents this provider is applicable to.

- **provider**: `<a href="#documentlinkprovider">DocumentLinkProvider</a>`  
  A document link provider.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">disposable</a> that unregisters this provider when being disposed.

</details>

<div id="languages-registerreferenceprovider"></div>

<details>
<summary><code>export function registerReferenceProvider(selector: DocumentSelector, provider: ReferenceProvider): Disposable;</code></summary>

##### 描述
Register a reference provider.

Multiple providers can be registered for a language. In that case providers are asked in
parallel and the results are merged. A failing provider (rejected promise or exception) will
not cause a failure of the whole operation.

##### 参数
- **selector**: `<a href="#documentselector">DocumentSelector</a>`  
  A selector that defines the documents this provider is applicable to.

- **provider**: `<a href="#referenceprovider">ReferenceProvider</a>`  
  A reference provider.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">disposable</a> that unregisters this provider when being disposed.

</details>

<div id="languages-registerdocumentsymbolprovider"></div>

<details>
<summary><code>export function registerDocumentSymbolProvider(selector: DocumentSelector, provider: DocumentSymbolProvider, metadata?: DocumentSymbolProviderMetadata): Disposable;</code></summary>

##### 描述
Register a document symbol provider.

Multiple providers can be registered for a language. In that case providers are asked in
parallel and the results are merged. A failing provider (rejected promise or exception) will
not cause a failure of the whole operation.

##### 参数
- **selector**: `<a href="#documentselector">DocumentSelector</a>`  
  A selector that defines the documents this provider is applicable to.

- **provider**: `<a href="#documentsymbolprovider">DocumentSymbolProvider</a>`  
  A document symbol provider.

- **metadata**: `<a href="#documentsymbolprovidermetadata">DocumentSymbolProviderMetadata</a>` (可选)  
  Optional metadata about the provider.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">disposable</a> that unregisters this provider when being disposed.

</details>

<div id="languages-registercolorprovider"></div>

<details>
<summary><code>export function registerColorProvider(selector: DocumentSelector, provider: DocumentColorProvider): Disposable;</code></summary>

##### 描述
Register a color provider.

Multiple providers can be registered for a language. In that case providers are asked in
parallel and the results are merged. A failing provider (rejected promise or exception) will
not cause a failure of the whole operation.

##### 参数
- **selector**: `<a href="#documentselector">DocumentSelector</a>`  
  A selector that defines the documents this provider is applicable to.

- **provider**: `<a href="#documentcolorprovider">DocumentColorProvider</a>`  
  A color provider.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">disposable</a> that unregisters this provider when being disposed.

</details>

<div id="languages-registerinlayhintsprovider"></div>

<details>
<summary><code>export function registerInlayHintsProvider(selector: DocumentSelector, provider: InlayHintsProvider): Disposable;</code></summary>

##### 描述
Register a inlay hints provider.

Multiple providers can be registered for a language. In that case providers are asked in
parallel and the results are merged. A failing provider (rejected promise or exception) will
not cause a failure of the whole operation.

##### 参数
- **selector**: `<a href="#documentselector">DocumentSelector</a>`  
  A selector that defines the documents this provider is applicable to.

- **provider**: `<a href="#inlayhintsprovider">InlayHintsProvider</a>`  
  An inlay hints provider.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">Disposable</a> that unregisters this provider when being disposed.

</details>

<div id="languages-registerfoldingrangeprovider"></div>

<details>
<summary><code>export function registerFoldingRangeProvider(selector: DocumentSelector, provider: FoldingRangeProvider): Disposable;</code></summary>

##### 描述
Register a folding range provider.

Multiple providers can be registered for a language. In that case providers are asked in
parallel and the results are merged.
If multiple folding ranges start at the same position, only the range of the first registered provider is used.
If a folding range overlaps with an other range that has a smaller position, it is also ignored.

A failing provider (rejected promise or exception) will
not cause a failure of the whole operation.

##### 参数
- **selector**: `<a href="#documentselector">DocumentSelector</a>`  
  A selector that defines the documents this provider is applicable to.

- **provider**: `<a href="#foldingrangeprovider">FoldingRangeProvider</a>`  
  A folding range provider.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">disposable</a> that unregisters this provider when being disposed.

</details>

<div id="languages-registerselectionrangeprovider"></div>

<details>
<summary><code>export function registerSelectionRangeProvider(selector: DocumentSelector, provider: SelectionRangeProvider): Disposable;</code></summary>

##### 描述
Register a selection range provider.

Multiple providers can be registered for a language. In that case providers are asked in
parallel and the results are merged. A failing provider (rejected promise or exception) will
not cause a failure of the whole operation.

##### 参数
- **selector**: `<a href="#documentselector">DocumentSelector</a>`  
  A selector that defines the documents this provider is applicable to.

- **provider**: `<a href="#selectionrangeprovider">SelectionRangeProvider</a>`  
  A selection range provider.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">disposable</a> that unregisters this provider when being disposed.

</details>

<div id="languages-registerrenameprovider"></div>

<details>
<summary><code>export function registerRenameProvider(selector: DocumentSelector, provider: RenameProvider): Disposable;</code></summary>

##### 描述
Register a reference provider.

Multiple providers can be registered for a language. In that case providers are sorted
by their score and the best-matching provider is used. Failure
of the selected provider will cause a failure of the whole operation.

##### 参数
- **selector**: `<a href="#documentselector">DocumentSelector</a>`  
  A selector that defines the documents this provider is applicable to.

- **provider**: `<a href="#renameprovider">RenameProvider</a>`  
  A rename provider.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">disposable</a> that unregisters this provider when being disposed.

</details>

<div id="languages-registerdocumentsemantictokensprovider"></div>

<details>
<summary><code>export function registerDocumentSemanticTokensProvider(selector: DocumentSelector, provider: DocumentSemanticTokensProvider, legend: SemanticTokensLegend): Disposable;</code></summary>

##### 描述
Register a semantic tokens provider for a whole document.

Multiple providers can be registered for a language. In that case providers are sorted
by their score and the best-matching provider is used. Failure
of the selected provider will cause a failure of the whole operation.

##### 参数
- **selector**: `<a href="#documentselector">DocumentSelector</a>`  
  A selector that defines the documents this provider is applicable to.

- **provider**: `<a href="#documentsemantictokensprovider">DocumentSemanticTokensProvider</a>`  
  A document semantic tokens provider.

- **legend**: `<a href="#semantictokenslegend">SemanticTokensLegend</a>`  

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">disposable</a> that unregisters this provider when being disposed.

</details>

<div id="languages-registerdocumentrangesemantictokensprovider"></div>

<details>
<summary><code>export function registerDocumentRangeSemanticTokensProvider(selector: DocumentSelector, provider: DocumentRangeSemanticTokensProvider, legend: SemanticTokensLegend): Disposable;</code></summary>

##### 描述
Register a semantic tokens provider for a document range.

*Note:* If a document has both a `DocumentSemanticTokensProvider` and a `DocumentRangeSemanticTokensProvider`,
the range provider will be invoked only initially, for the time in which the full document provider takes
to resolve the first request. Once the full document provider resolves the first request, the semantic tokens
provided via the range provider will be discarded and from that point forward, only the document provider
will be used.

Multiple providers can be registered for a language. In that case providers are sorted
by their score and the best-matching provider is used. Failure
of the selected provider will cause a failure of the whole operation.

##### 参数
- **selector**: `<a href="#documentselector">DocumentSelector</a>`  
  A selector that defines the documents this provider is applicable to.

- **provider**: `<a href="#documentrangesemantictokensprovider">DocumentRangeSemanticTokensProvider</a>`  
  A document range semantic tokens provider.

- **legend**: `<a href="#semantictokenslegend">SemanticTokensLegend</a>`  

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">disposable</a> that unregisters this provider when being disposed.

</details>

<div id="languages-registercallhierarchyprovider"></div>

<details>
<summary><code>export function registerCallHierarchyProvider(selector: DocumentSelector, provider: CallHierarchyProvider): Disposable;</code></summary>

##### 描述
Register a call hierarchy provider.

Multiple provider can be registered for a language. In that case providers are asked in
parallel and the results are merged. A failing provider (rejected promise or exception) will
not cause a failure of the whole operation.

##### 参数
- **selector**: `<a href="#documentselector">DocumentSelector</a>`  
  A selector that defines the documents this provider is applicable to.

- **provider**: `<a href="#callhierarchyprovider">CallHierarchyProvider</a>`  

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">disposable</a> that unregisters this provider when being disposed.

</details>

<div id="languages-registertypehierarchyprovider"></div>

<details>
<summary><code>export function registerTypeHierarchyProvider(selector: DocumentSelector, provider: TypeHierarchyProvider): Disposable;</code></summary>

##### 描述
Register a type hierarchy provider.

##### 参数
- **selector**: `<a href="#documentselector">DocumentSelector</a>`  
  A selector that defines the documents this provider is applicable to.

- **provider**: `<a href="#typehierarchyprovider">TypeHierarchyProvider</a>`  
  A type hierarchy provider.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">Disposable</a> that unregisters this provider when being disposed.

</details>

<div id="languages-registerlinkededitingrangeprovider"></div>

<details>
<summary><code>export function registerLinkedEditingRangeProvider(selector: DocumentSelector, provider: LinkedEditingRangeProvider): Disposable;</code></summary>

##### 描述
Register a linked editing range provider.

Multiple providers can be registered for a language. In that case providers are sorted
by their score and the best-matching provider that has a result is used. Failure
of the selected provider will cause a failure of the whole operation.

##### 参数
- **selector**: `<a href="#documentselector">DocumentSelector</a>`  
  A selector that defines the documents this provider is applicable to.

- **provider**: `<a href="#linkededitingrangeprovider">LinkedEditingRangeProvider</a>`  
  A linked editing range provider.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">Disposable</a> that unregisters this provider when being disposed.

</details>

<div id="languages-createlanguagestatusitem"></div>

<details>
<summary><code>export function createLanguageStatusItem(id: string, selector: DocumentSelector): LanguageStatusItem;</code></summary>

##### 描述
Creates a new <a href="#languagestatusitem">language status item</a>.

##### 参数
- **id**: `string`  
  The identifier of the item.

- **selector**: `<a href="#documentselector">DocumentSelector</a>`  
  The document selector that defines for what editors the item shows.

##### 返回值
- `<a href="#languagestatusitem">LanguageStatusItem</a>`

</details>

<div id="languages-registerdocumentpasteeditprovider"></div>

<details>
<summary><code>export function registerDocumentPasteEditProvider(selector: DocumentSelector, provider: DocumentPasteEditProvider, metadata: DocumentPasteProviderMetadata): Disposable;</code></summary>

##### 描述
Registers a new DocumentPasteEditProvider.

##### 参数
- **selector**: `<a href="#documentselector">DocumentSelector</a>`  
  A selector that defines the documents this provider applies to.

- **provider**: `DocumentPasteEditProvider`  
  A paste editor provider.

- **metadata**: `DocumentPasteProviderMetadata`  
  Additional metadata about the provider.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">Disposable</a> that unregisters this provider when disposed of.

</details>

<div id="languages-registerdocumentdropeditprovider"></div>

<details>
<summary><code>export function registerDocumentDropEditProvider(selector: DocumentSelector, provider: DocumentDropEditProvider, metadata?: DocumentDropEditProviderMetadata): Disposable;</code></summary>

##### 描述
Overload which adds extra metadata. Will be removed on finalization.

##### 参数
- **selector**: `<a href="#documentselector">DocumentSelector</a>`  

- **provider**: `<a href="#documentdropeditprovider">DocumentDropEditProvider</a>`  

- **metadata**: `<a href="#documentdropeditprovidermetadata">DocumentDropEditProviderMetadata</a>` (可选)  

##### 返回值
- `<a href="#disposable">Disposable</a>`

</details>

<div id="languages-registermultidocumenthighlightprovider"></div>

<details>
<summary><code>export function registerMultiDocumentHighlightProvider(selector: DocumentSelector, provider: MultiDocumentHighlightProvider): Disposable;</code></summary>

##### 描述
Register a multi document highlight provider.

Multiple providers can be registered for a language. In that case providers are sorted
by their score and groups sequentially asked for document highlights.
The process stops when a provider returns a `non-falsy` or `non-failure` result.

##### 参数
- **selector**: `<a href="#documentselector">DocumentSelector</a>`  
  A selector that defines the documents this provider is applicable to.

- **provider**: `<a href="#multidocumenthighlightprovider">MultiDocumentHighlightProvider</a>`  
  A multi-document highlight provider.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">Disposable</a> that unregisters this provider when being disposed.

</details>

#### Events

<div id="languages-ondidchangediagnostics"></div>

<details>
<summary><code>onDidChangeDiagnostics: <a href="#event">Event</a>&lt;<a href="#diagnosticchangeevent">DiagnosticChangeEvent</a>&gt;</code></summary>

##### 描述
An <a href="#event">event</a> which fires when the global set of diagnostics changes. This is
newly added and removed diagnostics.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#diagnosticchangeevent">DiagnosticChangeEvent</a>&gt;`

</details>

#### Variables

_此 namespace 暂无变量_

---

## lm

#### Functions

<div id="lm-selectchatmodels"></div>

<details>
<summary><code>export function selectChatModels(selector?: LanguageModelChatSelector): Thenable&lt;LanguageModelChat[]&gt;;</code></summary>

##### 描述
Select chat models by a <a href="#languagemodelchatselector">selector</a>. This can yield multiple or no chat models and
extensions must handle these cases, esp. when no chat model exists, gracefully.

```ts
const models = await vscode.lm.selectChatModels(&#123; family: 'gpt-3.5-turbo' &#125;);
if (models.length &gt; 0) &#123;
 const [first] = models;
 const response = await first.sendRequest(...)
 // ...
&#125; else &#123;
 // NO chat models available
&#125;
```

A selector can be written to broadly match all models of a given vendor or family, or it can narrowly select one model by ID.
Keep in mind that the available set of models will change over time, but also that prompts may perform differently in
different models.

*Note* that extensions can hold on to the results returned by this function and use them later. However, when the
`onDidChangeChatModels`-event is fired the list of chat models might have changed and extensions should re-query.

##### 参数
- **selector**: `<a href="#languagemodelchatselector">LanguageModelChatSelector</a>` (可选)  
  A chat model selector. When omitted all chat models are returned.

##### 返回值
- `Thenable&lt;<a href="#languagemodelchat">LanguageModelChat</a>[]&gt;` - An array of chat models, can be empty!

</details>

<div id="lm-registertool"></div>

<details>
<summary><code>export function registerTool&lt;T&gt;(name: string, tool: LanguageModelTool&lt;T&gt;): Disposable;</code></summary>

##### 描述
Register a LanguageModelTool. The tool must also be registered in the package.json `languageModelTools` contribution
point. A registered tool is available in the <a href="#lm-tools">tools</a> list for any extension to see. But in order for it to
be seen by a language model, it must be passed in the list of available tools in <a href="#lm-tools">tools</a>.

##### 参数
- **name**: `string`  

- **tool**: `<a href="#languagemodeltool">LanguageModelTool</a>&lt;T&gt;`  

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">Disposable</a> that unregisters the tool when disposed.

</details>

<div id="lm-invoketool"></div>

<details>
<summary><code>export function invokeTool(name: string, options: LanguageModelToolInvocationOptions&lt;object&gt;, token?: CancellationToken): Thenable&lt;LanguageModelToolResult&gt;;</code></summary>

##### 描述
Invoke a tool listed in <a href="#lm-tools">tools</a> by name with the given input. The input will be validated against
the schema declared by the tool

A tool can be invoked by a chat participant, in the context of handling a chat request, or globally by any extension in
any custom flow.

In the former case, the caller shall pass the
toolInvocationToken, which comes with the a
chat request. This makes sure the chat UI shows the tool invocation for the
correct conversation.

A tool <a href="#languagemodeltoolresult">result</a> is an array of <a href="#languagemodeltextpart">text-</a> and
<a href="#languagemodelprompttsxpart">prompt-tsx</a>-parts. If the tool caller is using `@vscode/prompt-tsx`, it can
incorporate the response parts into its prompt using a `ToolResult`. If not, the parts can be passed along to the
<a href="#languagemodelchat">LanguageModelChat</a> via a user message with a <a href="#languagemodeltoolresultpart">LanguageModelToolResultPart</a>.

If a chat participant wants to preserve tool results for requests across multiple turns, it can store tool results in
the metadata returned from the handler and retrieve them on the next turn from
result.

##### 参数
- **name**: `string`  
  The name of the tool to call.

- **options**: `<a href="#languagemodeltoolinvocationoptions">LanguageModelToolInvocationOptions</a>&lt;object&gt;`  
  The options to use when invoking the tool.

- **token**: `<a href="#cancellationtoken">CancellationToken</a>` (可选)  
  A cancellation token. See <a href="#cancellationtokensource">CancellationTokenSource</a> for how to create one.

##### 返回值
- `Thenable&lt;<a href="#languagemodeltoolresult">LanguageModelToolResult</a>&gt;` - The result of the tool invocation.

</details>

#### Events

<div id="lm-ondidchangechatmodels"></div>

<details>
<summary><code>onDidChangeChatModels: <a href="#event">Event</a>&lt;void&gt;</code></summary>

##### 描述
An event that is fired when the set of available chat models changes.

##### 类型
- `<a href="#event">Event</a>&lt;void&gt;`

</details>

#### Variables

<div id="lm-tools"></div>

<details>
<summary><code>tools: readonly <a href="#languagemodeltoolinformation">LanguageModelToolInformation</a>[]</code></summary>

##### 描述
A list of all available tools that were registered by all extensions using <a href="#lm-registertool">registerTool</a>. They can be called
with <a href="#lm-invoketool">invokeTool</a> with input that match their declared `inputSchema`.

##### 类型
```typescript
readonly LanguageModelToolInformation[]
```

##### 只读
- 是

</details>

---

## notebooks

#### Functions

<div id="notebooks-createnotebookcontroller"></div>

<details>
<summary><code>export function createNotebookController( id: string, notebookType: string, label: string, handler?: (cells: NotebookCell[], notebook: NotebookDocument, controller: NotebookController) =&gt; void | Thenable&lt;void&gt;): NotebookController;</code></summary>

##### 描述
Creates a new notebook controller.

##### 参数
- **id**: `string`  
  Identifier of the controller. Must be unique per extension.

- **notebookType**: `string`  
  A notebook type for which this controller is for.

- **label**: `string`  
  The label of the controller.

- **handler**: `(cells: <a href="#notebookcell">NotebookCell</a>[], notebook: <a href="#notebookdocument">NotebookDocument</a>, controller: <a href="#notebookcontroller">NotebookController</a>) =&gt; void | Thenable&lt;void&gt;` (可选)  
  The execute-handler of the controller.

##### 返回值
- `<a href="#notebookcontroller">NotebookController</a>` - a new instance of <a href="#notebookcontroller">NotebookController</a>

</details>

<div id="notebooks-createrenderermessaging"></div>

<details>
<summary><code>export function createRendererMessaging(rendererId: string): NotebookRendererMessaging;</code></summary>

##### 描述
Creates a new messaging instance used to communicate with a specific renderer.
- Note 1: Extensions can only create renderer that they have defined in their package.json - file
- Note 2: A renderer only has access to messaging if requiresMessaging is set to always or optional in its notebookRenderer contribution.

##### 参数
- **rendererId**: `string`  
  The renderer ID to communicate with

##### 返回值
- `<a href="#notebookrenderermessaging">NotebookRendererMessaging</a>` - A new notebook renderer messaging object.

</details>

<div id="notebooks-registernotebookcellstatusbaritemprovider"></div>

<details>
<summary><code>export function registerNotebookCellStatusBarItemProvider(notebookType: string, provider: NotebookCellStatusBarItemProvider): Disposable;</code></summary>

##### 描述
Register a cell statusbar item provider for the given notebook type.

##### 参数
- **notebookType**: `string`  
  The notebook type to register for.

- **provider**: `<a href="#notebookcellstatusbaritemprovider">NotebookCellStatusBarItemProvider</a>`  
  A cell status bar provider.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A Disposable that unregisters this provider when being disposed.

</details>

<div id="notebooks-createnotebookcontrollerdetectiontask"></div>

<details>
<summary><code>export function createNotebookControllerDetectionTask(notebookType: string): NotebookControllerDetectionTask;</code></summary>

##### 描述
Create notebook controller detection task

##### 参数
- **notebookType**: `string`  

##### 返回值
- `<a href="#notebookcontrollerdetectiontask">NotebookControllerDetectionTask</a>`

</details>

<div id="notebooks-registerkernelsourceactionprovider"></div>

<details>
<summary><code>export function registerKernelSourceActionProvider(notebookType: string, provider: NotebookKernelSourceActionProvider): Disposable;</code></summary>

##### 描述
Register a notebook kernel source action provider

##### 参数
- **notebookType**: `string`  

- **provider**: `<a href="#notebookkernelsourceactionprovider">NotebookKernelSourceActionProvider</a>`  

##### 返回值
- `<a href="#disposable">Disposable</a>`

</details>

<div id="notebooks-createnotebookcontroller"></div>

<details>
<summary><code>export function createNotebookController(id: string, viewType: string, label: string, handler?: (cells: NotebookCell[], notebook: NotebookDocument, controller: NotebookController) =&gt; void | Thenable&lt;void&gt;, rendererScripts?: NotebookRendererScript[]): NotebookController;</code></summary>

##### 参数
- **id**: `string`  

- **viewType**: `string`  

- **label**: `string`  

- **handler**: `(cells: <a href="#notebookcell">NotebookCell</a>[], notebook: <a href="#notebookdocument">NotebookDocument</a>, controller: <a href="#notebookcontroller">NotebookController</a>) =&gt; void | Thenable&lt;void&gt;` (可选)  

- **rendererScripts**: `<a href="#notebookrendererscript">NotebookRendererScript</a>[]` (可选)  

##### 返回值
- `<a href="#notebookcontroller">NotebookController</a>`

</details>

#### Events

<div id="notebooks-ondidchangenotebookcellexecutionstate"></div>

<details>
<summary><code>onDidChangeNotebookCellExecutionState: <a href="#event">Event</a>&lt;<a href="#notebookcellexecutionstatechangeevent">NotebookCellExecutionStateChangeEvent</a>&gt;</code></summary>

##### 描述
An <a href="#event">Event</a> which fires when the execution state of a cell has changed.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#notebookcellexecutionstatechangeevent">NotebookCellExecutionStateChangeEvent</a>&gt;`

</details>

#### Variables

_此 namespace 暂无变量_

---

## platform

#### Functions

<div id="platform-importplcopen"></div>

<details>
<summary><code>export function importPLCopen(targetUri: Uri, props: ImportProps);</code></summary>

##### 参数
- **targetUri**: `<a href="#uri">Uri</a>`  

- **props**: `<a href="#importprops">ImportProps</a>`  

##### 返回值
- `void`

</details>

<div id="platform-getselection"></div>

<details>
<summary><code>export function getSelection(): Promise&lt;any&gt;;</code></summary>

##### 返回值
- `Promise&lt;any&gt;`

</details>

<div id="platform-gotoproblem"></div>

<details>
<summary><code>export function gotoProblem(problem: ProblemLocation): Promise&lt;void&gt;;</code></summary>

##### 参数
- **problem**: `<a href="#problemlocation">ProblemLocation</a>`  

##### 返回值
- `Promise&lt;void&gt;`

</details>

<div id="platform-getproblems"></div>

<details>
<summary><code>export function getProblems(): Promise&lt;[string, baosky.Diagnostic[]][]&gt;;</code></summary>

##### 返回值
- `Promise&lt;[string, baosky.<a href="#diagnostic">Diagnostic</a>[]][]&gt;`

</details>

<div id="platform-getproblems"></div>

<details>
<summary><code>export function getProblems(resource: Uri): Promise&lt;baosky.Diagnostic[]&gt;;</code></summary>

##### 参数
- **resource**: `<a href="#uri">Uri</a>`  

##### 返回值
- `Promise&lt;baosky.<a href="#diagnostic">Diagnostic</a>[]&gt;`

</details>

<div id="platform-getproblems"></div>

<details>
<summary><code>export function getProblems(resource?: Uri): Promise&lt;baosky.Diagnostic[] | [string, baosky.Diagnostic[]][]&gt;;</code></summary>

##### 参数
- **resource**: `<a href="#uri">Uri</a>` (可选)  

##### 返回值
- `Promise&lt;baosky.<a href="#diagnostic">Diagnostic</a>[] | [string, baosky.<a href="#diagnostic">Diagnostic</a>[]][]&gt;`

</details>

<div id="platform-registerpreferencesettings"></div>

<details>
<summary><code>export function registerPreferenceSettings&lt;T extends BasePreferenceSchema&gt;(schema: T): void;</code></summary>

##### 参数
- **schema**: `T`  

##### 返回值
- `void`

</details>

<div id="platform-getpreferencevalue"></div>

<details>
<summary><code>export function getPreferenceValue(settingKey: string, contentKey?: string): Promise&lt;JSON | undefined&gt;;</code></summary>

##### 参数
- **settingKey**: `string`  

- **contentKey**: `string` (可选)  

##### 返回值
- `Promise&lt;JSON | undefined&gt;`

</details>

<div id="platform-getpreferencechecked"></div>

<details>
<summary><code>export function getPreferenceChecked(settingKey: string): Promise&lt;boolean | undefined&gt;;</code></summary>

##### 参数
- **settingKey**: `string`  

##### 返回值
- `Promise&lt;boolean | undefined&gt;`

</details>

<div id="platform-executecrossreference"></div>

<details>
<summary><code>export function executeCrossReference(params: CrossReferenceParam): Promise&lt;CrossReferenceResponse | CrossRefTableDataType&gt;;</code></summary>

##### 参数
- **params**: `<a href="#crossreferenceparam">CrossReferenceParam</a>`  

##### 返回值
- `Promise&lt;<a href="#crossreferenceresponse">CrossReferenceResponse</a> | <a href="#crossreftabledatatype">CrossRefTableDataType</a>&gt;`

</details>

<div id="platform-getuserinfo"></div>

<details>
<summary><code>export function getUserInfo(): Promise&lt;UserInfo | undefined&gt;;</code></summary>

##### 返回值
- `Promise&lt;<a href="#userinfo">UserInfo</a> | undefined&gt;`

</details>

<div id="platform-isadminuser"></div>

<details>
<summary><code>export function isAdminUser(): boolean;</code></summary>

##### 返回值
- `boolean`

</details>

<div id="platform-decorateinteractivetarget"></div>

<details>
<summary><code>export function decorateInteractiveTarget(target: InteractiveTarget): Promise&lt;void&gt;;</code></summary>

##### 参数
- **target**: `<a href="#interactivetarget">InteractiveTarget</a>`  

##### 返回值
- `Promise&lt;void&gt;`

</details>

<div id="platform-sendroutineinfo"></div>

<details>
<summary><code>export function sendRoutineInfo(routineInfo: RoutineInfo): void;</code></summary>

##### 参数
- **routineInfo**: `<a href="#routineinfo">RoutineInfo</a>`  

##### 返回值
- `void`

</details>

<div id="platform-registertoolbar"></div>

<details>
<summary><code>export function registerToolbar(toolbarItems: ToolbarItem[]): Promise&lt;Disposable[]&gt;;</code></summary>

##### 参数
- **toolbarItems**: `<a href="#toolbaritem">ToolbarItem</a>[]`  

##### 返回值
- `Promise&lt;<a href="#disposable">Disposable</a>[]&gt;`

</details>

<div id="platform-gotoservice"></div>

<details>
<summary><code>export function gotoService(gotoOptions: GotoOptions): Promise&lt;void&gt;;</code></summary>

##### 描述
goto dataType

##### 参数
- **gotoOptions**: `<a href="#gotooptions">GotoOptions</a>`  

##### 返回值
- `Promise&lt;void&gt;`

</details>

<div id="platform-gotohelp"></div>

<details>
<summary><code>export function gotoHelp(route: string): Promise&lt;void&gt;;</code></summary>

##### 描述
跳转到指定route页面

##### 参数
- **route**: `string`  

##### 返回值
- `Promise&lt;void&gt;`

</details>

<div id="platform-opendialog"></div>

<details>
<summary><code>export async function openDialog(dialogProps: DialogProps): Promise&lt;void&gt;;</code></summary>

##### 参数
- **dialogProps**: `<a href="#dialogprops">DialogProps</a>`  

##### 返回值
- `Promise&lt;void&gt;`

</details>

#### Events

_此 namespace 暂无事件_

#### Variables

_此 namespace 暂无变量_

---

## plugins

#### Functions

<div id="plugins-getplugin"></div>

<details>
<summary><code>export function getPlugin(pluginId: string): Plugin&lt;any&gt; | undefined;</code></summary>

##### 描述
Get an plug-in by its full identifier in the form of: `publisher.name`.

##### 参数
- **pluginId**: `string`  
  An plug-in identifier.

##### 返回值
- `<a href="#plugin">Plugin</a>&lt;any&gt; | undefined` - An plug-in or `undefined`.

</details>

<div id="plugins-getplugin"></div>

<details>
<summary><code>export function getPlugin&lt;T&gt;(pluginId: string): Plugin&lt;T&gt; | undefined;</code></summary>

##### 描述
Get an plug-in its full identifier in the form of: `publisher.name`.

##### 参数
- **pluginId**: `string`  
  An plug-in identifier.

##### 返回值
- `<a href="#plugin">Plugin</a>&lt;T&gt; | undefined` - An plug-in or `undefined`.

</details>

#### Events

<div id="plugins-ondidchange"></div>

<details>
<summary><code>onDidChange: <a href="#event">Event</a>&lt;void&gt;</code></summary>

##### 描述
An event which fires when `plugins.all` changes. This can happen when extensions are
installed, uninstalled, enabled or disabled.

##### 类型
- `<a href="#event">Event</a>&lt;void&gt;`

</details>

#### Variables

<div id="plugins-all"></div>

<details>
<summary><code>all: <a href="#plugin">Plugin</a>&lt;any&gt;[]</code></summary>

##### 描述
All plug-ins currently known to the system.

##### 类型
```typescript
Plugin<any>[]
```

</details>

<div id="plugins-me"></div>

<details>
<summary><code>me: &#123; checkUpdates(): Promise&lt;void&gt;, openReadme(): Promise&lt;void&gt; &#125;</code></summary>

##### 类型
```typescript
{ checkUpdates(): Promise<void>, openReadme(): Promise<void> }
```

##### 只读
- 是

</details>

---

## projects

#### Functions

<div id="projects-countnode"></div>

<details>
<summary><code>export function countNode(queryOptions: NodeObjectType[]): Promis&lt;ProjectNodeCount[]&gt;</code></summary>

##### 参数
- **queryOptions**: `<a href="#nodeobjecttype">NodeObjectType</a>[]`  

##### 返回值
- `Promis&lt;<a href="#projectnodecount">ProjectNodeCount</a>[]&gt;`

</details>

<div id="projects-getcurrent"></div>

<details>
<summary><code>export function getCurrent(): Promise&lt;Project | undefined&gt;;</code></summary>

##### 描述
get current open project

##### 返回值
- `Promise&lt;<a href="#project">Project</a> | undefined&gt;`

</details>

<div id="projects-registertreenodeprovider"></div>

<details>
<summary><code>export function registerTreeNodeProvider(provider: TreeNodeProvider): TreeNodeController;</code></summary>

##### 参数
- **provider**: `<a href="#treenodeprovider">TreeNodeProvider</a>`  

##### 返回值
- `<a href="#treenodecontroller">TreeNodeController</a>`

</details>

<div id="projects-focusnode"></div>

<details>
<summary><code>export function focusNode(path: string): Promise&lt;void&gt;;</code></summary>

##### 描述
open view according to widgetId

##### 参数
- **path**: `string`  

##### 返回值
- `Promise&lt;void&gt;`

</details>

<div id="projects-dorefactor"></div>

<details>
<summary><code>export function doRefactor(refactorOptions: RefactorOptions): void;</code></summary>

##### 描述
code refactor

##### 参数
- **refactorOptions**: `<a href="#refactoroptions">RefactorOptions</a>`  

##### 返回值
- `void`

</details>

<div id="projects-saveproject"></div>

<details>
<summary><code>export function saveProject(): void;</code></summary>

##### 描述
save project

##### 返回值
- `void`

</details>

#### Events

_此 namespace 暂无事件_

#### Variables

_此 namespace 暂无变量_

---

## scm

#### Functions

<div id="scm-createsourcecontrol"></div>

<details>
<summary><code>export function createSourceControl(id: string, label: string, rootUri?: Uri): SourceControl;</code></summary>

##### 描述
Creates a new <a href="#sourcecontrol">source control</a> instance.

##### 参数
- **id**: `string`  
  An `id` for the source control. Something short, eg: `git`.

- **label**: `string`  
  A human-readable string for the source control. Eg: `Git`.

- **rootUri**: `<a href="#uri">Uri</a>` (可选)  
  An optional Uri of the root of the source control. Eg: `Uri.parse(workspaceRoot)`.

##### 返回值
- `<a href="#sourcecontrol">SourceControl</a>` - An instance of <a href="#sourcecontrol">source control</a>.

</details>

#### Events

_此 namespace 暂无事件_

#### Variables

<div id="scm-inputbox"></div>

<details>
<summary><code>inputBox: <a href="#sourcecontrolinputbox">SourceControlInputBox</a></code></summary>

##### 描述
~~The <a href="#sourcecontrolinputbox">input box</a> for the last source control
created by the extension.~~

##### 类型
```typescript
SourceControlInputBox
```

##### 只读
- 是

</details>

---

## tasks

#### Functions

<div id="tasks-registertaskprovider"></div>

<details>
<summary><code>export function registerTaskProvider(type: string, provider: TaskProvider): Disposable;</code></summary>

##### 描述
Register a task provider.

##### 参数
- **type**: `string`  
  The task kind type this provider is registered for.

- **provider**: `<a href="#taskprovider">TaskProvider</a>`  
  A task provider.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">disposable</a> that unregisters this provider when being disposed.

</details>

<div id="tasks-fetchtasks"></div>

<details>
<summary><code>export function fetchTasks(filter?: TaskFilter): Thenable&lt;Task[]&gt;;</code></summary>

##### 描述
Fetches all tasks available in the systems. This includes tasks
from `tasks.json` files as well as tasks from task providers
contributed through extensions.

##### 参数
- **filter**: `<a href="#taskfilter">TaskFilter</a>` (可选)  
  a filter to filter the return tasks.

##### 返回值
- `Thenable&lt;<a href="#task">Task</a>[]&gt;`

</details>

<div id="tasks-executetask"></div>

<details>
<summary><code>export function executeTask(task: Task): Thenable&lt;TaskExecution&gt;;</code></summary>

##### 描述
Executes a task that is managed by VS Code. The returned
task execution can be used to terminate the task.

##### 参数
- **task**: `<a href="#task">Task</a>`  
  the task to execute

##### 返回值
- `Thenable&lt;<a href="#taskexecution">TaskExecution</a>&gt;`

</details>

#### Events

<div id="tasks-ondidstarttask"></div>

<details>
<summary><code>onDidStartTask: <a href="#event">Event</a>&lt;TaskStartEvent&gt;</code></summary>

##### 描述
Fires when a task starts.

##### 类型
- `<a href="#event">Event</a>&lt;TaskStartEvent&gt;`

</details>

<div id="tasks-ondidendtask"></div>

<details>
<summary><code>onDidEndTask: <a href="#event">Event</a>&lt;TaskEndEvent&gt;</code></summary>

##### 描述
Fires when a task ends.

##### 类型
- `<a href="#event">Event</a>&lt;TaskEndEvent&gt;`

</details>

<div id="tasks-ondidstarttaskprocess"></div>

<details>
<summary><code>onDidStartTaskProcess: <a href="#event">Event</a>&lt;<a href="#taskprocessstartevent">TaskProcessStartEvent</a>&gt;</code></summary>

##### 描述
Fires when the underlying process has been started.
This event will not fire for tasks that don't
execute an underlying process.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#taskprocessstartevent">TaskProcessStartEvent</a>&gt;`

</details>

<div id="tasks-ondidendtaskprocess"></div>

<details>
<summary><code>onDidEndTaskProcess: <a href="#event">Event</a>&lt;<a href="#taskprocessendevent">TaskProcessEndEvent</a>&gt;</code></summary>

##### 描述
Fires when the underlying process has ended.
This event will not fire for tasks that don't
execute an underlying process.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#taskprocessendevent">TaskProcessEndEvent</a>&gt;`

</details>

#### Variables

<div id="tasks-taskexecutions"></div>

<details>
<summary><code>taskExecutions: readonly <a href="#taskexecution">TaskExecution</a>[]</code></summary>

##### 描述
The currently active task executions or an empty array.

##### 类型
```typescript
readonly TaskExecution[]
```

##### 只读
- 是

</details>

---

## tests

#### Functions

<div id="tests-createtestcontroller"></div>

<details>
<summary><code>export function createTestController(id: string, label: string): TestController;</code></summary>

##### 描述
Creates a new test controller.

##### 参数
- **id**: `string`  
  Identifier for the controller, must be globally unique.

- **label**: `string`  
  A human-readable label for the controller.

##### 返回值
- `<a href="#testcontroller">TestController</a>` - An instance of the <a href="#testcontroller">TestController</a>.

</details>

#### Events

_此 namespace 暂无事件_

#### Variables

_此 namespace 暂无变量_

---

## window

#### Functions

<div id="window-registerterminalobserver"></div>

<details>
<summary><code>export function registerTerminalObserver(observer: TerminalObserver): Disposable;</code></summary>

##### 参数
- **observer**: `<a href="#terminalobserver">TerminalObserver</a>`  

##### 返回值
- `<a href="#disposable">Disposable</a>`

</details>

<div id="window-selection"></div>

<details>
<summary><code>export function selection(): Promise&lt;GlobalSelection[]&gt;;</code></summary>

##### 返回值
- `Promise&lt;<a href="#globalselection">GlobalSelection</a>[]&gt;`

</details>

<div id="window-showtextdocument"></div>

<details>
<summary><code>export function showTextDocument(document: TextDocument, column?: ViewColumn, preserveFocus?: boolean): Thenable&lt;TextEditor&gt;;</code></summary>

##### 描述
Show the given document in a text editor. A <a href="#viewcolumn">column</a> can be provided
to control where the editor is being shown. Might change the active editor.

##### 参数
- **document**: `<a href="#textdocument">TextDocument</a>`  
  A text document to be shown.

- **column**: `<a href="#viewcolumn">ViewColumn</a>` (可选)  
  A view column in which the <a href="#texteditor">editor</a> should be shown. The default is the active, other values
are adjusted to be `Min(column, columnCount + 1)`, the active-column is not adjusted. Use [`ViewColumn.Beside`](#ViewColumn.Beside)
to open the editor to the side of the currently active one.

- **preserveFocus**: `boolean` (可选)  
  When `true` the editor will not take focus.

##### 返回值
- `Thenable&lt;<a href="#texteditor">TextEditor</a>&gt;` - A promise that resolves to an <a href="#texteditor">editor</a>.

</details>

<div id="window-showtextdocument"></div>

<details>
<summary><code>export function showTextDocument(document: TextDocument, options?: TextDocumentShowOptions): Thenable&lt;TextEditor&gt;;</code></summary>

##### 描述
Show the given document in a text editor. <a href="#textdocumentshowoptions">Options</a> can be provided
to control options of the editor is being shown. Might change the active editor.

##### 参数
- **document**: `<a href="#textdocument">TextDocument</a>`  
  A text document to be shown.

- **options**: `<a href="#textdocumentshowoptions">TextDocumentShowOptions</a>` (可选)  
  <a href="#textdocumentshowoptions">Editor options</a> to configure the behavior of showing the <a href="#texteditor">editor</a>.

##### 返回值
- `Thenable&lt;<a href="#texteditor">TextEditor</a>&gt;` - A promise that resolves to an <a href="#texteditor">editor</a>.

</details>

<div id="window-showtextdocument"></div>

<details>
<summary><code>export function showTextDocument(uri: Uri, options?: TextDocumentShowOptions): Thenable&lt;TextEditor&gt;;</code></summary>

##### 描述
A short-hand for `openTextDocument(uri).then(document =&gt; showTextDocument(document, options))`.

##### 参数
- **uri**: `<a href="#uri">Uri</a>`  
  A resource identifier.

- **options**: `<a href="#textdocumentshowoptions">TextDocumentShowOptions</a>` (可选)  
  <a href="#textdocumentshowoptions">Editor options</a> to configure the behavior of showing the <a href="#texteditor">editor</a>.

##### 返回值
- `Thenable&lt;<a href="#texteditor">TextEditor</a>&gt;` - A promise that resolves to an <a href="#texteditor">editor</a>.

##### 相关
- <a href="#workspace-opentextdocument">openTextDocument</a>

</details>

<div id="window-shownotebookdocument"></div>

<details>
<summary><code>export function showNotebookDocument(document: NotebookDocument, options?: NotebookDocumentShowOptions): Thenable&lt;NotebookEditor&gt;;</code></summary>

##### 描述
Show the given <a href="#notebookdocument">NotebookDocument</a> in a <a href="#notebookeditor">notebook editor</a>.

##### 参数
- **document**: `<a href="#notebookdocument">NotebookDocument</a>`  
  A text document to be shown.

- **options**: `<a href="#notebookdocumentshowoptions">NotebookDocumentShowOptions</a>` (可选)  
  <a href="#notebookdocumentshowoptions">Editor options</a> to configure the behavior of showing the <a href="#notebookeditor">notebook editor</a>.

##### 返回值
- `Thenable&lt;<a href="#notebookeditor">NotebookEditor</a>&gt;` - A promise that resolves to an <a href="#notebookeditor">notebook editor</a>.

</details>

<div id="window-showquickpick"></div>

<details>
<summary><code>export function showQuickPick(items: readonly string[] | Thenable&lt;readonly string[]&gt;, options?: QuickPickOptions, token?: CancellationToken): Thenable&lt;string | undefined&gt;;</code></summary>

##### 描述
Shows a selection list.

##### 参数
- **items**: `readonly string[] | Thenable&lt;readonly string[]&gt;`  
  An array of strings, or a promise that resolves to an array of strings.

- **options**: `<a href="#quickpickoptions">QuickPickOptions</a>` (可选)  
  Configures the behavior of the selection list.

- **token**: `<a href="#cancellationtoken">CancellationToken</a>` (可选)  
  A token that can be used to signal cancellation.

##### 返回值
- `Thenable&lt;string | undefined&gt;` - A promise that resolves to the selection or `undefined`.

</details>

<div id="window-showquickpick"></div>

<details>
<summary><code>export function showQuickPick(items: readonly string[] | Thenable&lt;readonly string[]&gt;, options: QuickPickOptions & &#123; canPickMany: true &#125;, token?: CancellationToken): Thenable&lt;string[] | undefined&gt;;</code></summary>

##### 描述
Shows a selection list allowing multiple selections.

##### 参数
- **items**: `readonly string[] | Thenable&lt;readonly string[]&gt;`  
  An array of strings, or a promise that resolves to an array of strings.

- **options**: `<a href="#quickpickoptions">QuickPickOptions</a> & &#123; canPickMany: true &#125;`  
  Configures the behavior of the selection list.

- **token**: `<a href="#cancellationtoken">CancellationToken</a>` (可选)  
  A token that can be used to signal cancellation.

##### 返回值
- `Thenable&lt;string[] | undefined&gt;` - A promise that resolves to the selected items or `undefined`.

</details>

<div id="window-showquickpick"></div>

<details>
<summary><code>export function showQuickPick&lt;T extends QuickPickItem&gt;(items: readonly T[] | Thenable&lt;readonly T[]&gt;, options?: QuickPickOptions, token?: CancellationToken): Thenable&lt;T | undefined&gt;;</code></summary>

##### 描述
Shows a selection list.

##### 参数
- **items**: `readonly T[] | Thenable&lt;readonly T[]&gt;`  
  An array of items, or a promise that resolves to an array of items.

- **options**: `<a href="#quickpickoptions">QuickPickOptions</a>` (可选)  
  Configures the behavior of the selection list.

- **token**: `<a href="#cancellationtoken">CancellationToken</a>` (可选)  
  A token that can be used to signal cancellation.

##### 返回值
- `Thenable&lt;T | undefined&gt;` - A promise that resolves to the selected item or `undefined`.

</details>

<div id="window-showquickpick"></div>

<details>
<summary><code>export function showQuickPick&lt;T extends QuickPickItem&gt;(items: readonly T[] | Thenable&lt;readonly T[]&gt;, options: QuickPickOptions & &#123; canPickMany: true &#125;, token?: CancellationToken): Thenable&lt;T[] | undefined&gt;;</code></summary>

##### 描述
Shows a selection list allowing multiple selections.

##### 参数
- **items**: `readonly T[] | Thenable&lt;readonly T[]&gt;`  
  An array of items, or a promise that resolves to an array of items.

- **options**: `<a href="#quickpickoptions">QuickPickOptions</a> & &#123; canPickMany: true &#125;`  
  Configures the behavior of the selection list.

- **token**: `<a href="#cancellationtoken">CancellationToken</a>` (可选)  
  A token that can be used to signal cancellation.

##### 返回值
- `Thenable&lt;T[] | undefined&gt;` - A promise that resolves to the selected items or `undefined`.

</details>

<div id="window-createquickpick"></div>

<details>
<summary><code>export function createQuickPick&lt;T extends QuickPickItem&gt;(): QuickPick&lt;T&gt;;</code></summary>

##### 描述
Creates a <a href="#quickpick">QuickPick</a> to let the user pick an item from a list
of items of type T.

Note that in many cases the more convenient [window.showQuickPick](#window.showQuickPick)
is easier to use. [window.createQuickPick](#window.createQuickPick) should be used
when [window.showQuickPick](#window.showQuickPick) does not offer the required flexibility.

##### 返回值
- `<a href="#quickpick">QuickPick</a>&lt;T&gt;` - A new <a href="#quickpick">QuickPick</a>.

</details>

<div id="window-showworkspacefolderpick"></div>

<details>
<summary><code>export function showWorkspaceFolderPick(options?: WorkspaceFolderPickOptions): Thenable&lt;WorkspaceFolder | undefined&gt;;</code></summary>

##### 描述
Shows a selection list of workspace folders to pick from.
Returns `undefined` if no folder is open.

##### 参数
- **options**: `<a href="#workspacefolderpickoptions">WorkspaceFolderPickOptions</a>` (可选)  
  Configures the behavior of the workspace folder list.

##### 返回值
- `Thenable&lt;<a href="#workspacefolder">WorkspaceFolder</a> | undefined&gt;` - A promise that resolves to the workspace folder or `undefined`.

</details>

<div id="window-showinformationmessage"></div>

<details>
<summary><code>export function showInformationMessage&lt;T extends string&gt;(message: string, ...items: T[]): Thenable&lt;T | undefined&gt;;</code></summary>

##### 描述
Show an information message.

##### 参数
- **message**: `string`  
  a message to show.

- **items**: `T[]`  
  A set of items that will be rendered as actions in the message.

##### 返回值
- `Thenable&lt;T | undefined&gt;` - A promise that resolves to the selected item or `undefined` when being dismissed.

</details>

<div id="window-showinformationmessage"></div>

<details>
<summary><code>export function showInformationMessage&lt;T extends string&gt;(message: string, options: MessageOptions, ...items: T[]): Thenable&lt;T | undefined&gt;;</code></summary>

##### 描述
Show an information message.

##### 参数
- **message**: `string`  
  a message to show.

- **options**: `<a href="#messageoptions">MessageOptions</a>`  
  Configures the behaviour of the message.

- **items**: `T[]`  
  A set of items that will be rendered as actions in the message.

##### 返回值
- `Thenable&lt;T | undefined&gt;` - A promise that resolves to the selected item or `undefined` when being dismissed.

</details>

<div id="window-showinformationmessage"></div>

<details>
<summary><code>export function showInformationMessage&lt;T extends MessageItem&gt;(message: string, ...items: T[]): Thenable&lt;T | undefined&gt;;</code></summary>

##### 描述
Show an information message.

##### 参数
- **message**: `string`  
  a message to show.

- **items**: `T[]`  
  A set of items that will be rendered as actions in the message.

##### 返回值
- `Thenable&lt;T | undefined&gt;` - A promise that resolves to the selected item or `undefined` when being dismissed.

</details>

<div id="window-showinformationmessage"></div>

<details>
<summary><code>export function showInformationMessage&lt;T extends MessageItem&gt;(message: string, options: MessageOptions, ...items: T[]): Thenable&lt;T | undefined&gt;;</code></summary>

##### 描述
Show an information message.

##### 参数
- **message**: `string`  
  a message to show.

- **options**: `<a href="#messageoptions">MessageOptions</a>`  
  Configures the behaviour of the message.

- **items**: `T[]`  
  A set of items that will be rendered as actions in the message.

##### 返回值
- `Thenable&lt;T | undefined&gt;` - A promise that resolves to the selected item or `undefined` when being dismissed.

</details>

<div id="window-showwarningmessage"></div>

<details>
<summary><code>export function showWarningMessage&lt;T extends string&gt;(message: string, ...items: T[]): Thenable&lt;T | undefined&gt;;</code></summary>

##### 描述
Show a warning message.

##### 参数
- **message**: `string`  
  a message to show.

- **items**: `T[]`  
  A set of items that will be rendered as actions in the message.

##### 返回值
- `Thenable&lt;T | undefined&gt;` - A promise that resolves to the selected item or `undefined` when being dismissed.

</details>

<div id="window-showwarningmessage"></div>

<details>
<summary><code>export function showWarningMessage&lt;T extends string&gt;(message: string, options: MessageOptions, ...items: T[]): Thenable&lt;T | undefined&gt;;</code></summary>

##### 描述
Show a warning message.

##### 参数
- **message**: `string`  
  a message to show.

- **options**: `<a href="#messageoptions">MessageOptions</a>`  
  Configures the behaviour of the message.

- **items**: `T[]`  
  A set of items that will be rendered as actions in the message.

##### 返回值
- `Thenable&lt;T | undefined&gt;` - A promise that resolves to the selected item or `undefined` when being dismissed.

</details>

<div id="window-showwarningmessage"></div>

<details>
<summary><code>export function showWarningMessage&lt;T extends MessageItem&gt;(message: string, ...items: T[]): Thenable&lt;T | undefined&gt;;</code></summary>

##### 描述
Show a warning message.

##### 参数
- **message**: `string`  
  a message to show.

- **items**: `T[]`  
  A set of items that will be rendered as actions in the message.

##### 返回值
- `Thenable&lt;T | undefined&gt;` - A promise that resolves to the selected item or `undefined` when being dismissed.

</details>

<div id="window-showwarningmessage"></div>

<details>
<summary><code>export function showWarningMessage&lt;T extends MessageItem&gt;(message: string, options: MessageOptions, ...items: T[]): Thenable&lt;T | undefined&gt;;</code></summary>

##### 描述
Show a warning message.

##### 参数
- **message**: `string`  
  a message to show.

- **options**: `<a href="#messageoptions">MessageOptions</a>`  
  Configures the behaviour of the message.

- **items**: `T[]`  
  A set of items that will be rendered as actions in the message.

##### 返回值
- `Thenable&lt;T | undefined&gt;` - A promise that resolves to the selected item or `undefined` when being dismissed.

</details>

<div id="window-showerrormessage"></div>

<details>
<summary><code>export function showErrorMessage&lt;T extends string&gt;(message: string, ...items: T[]): Thenable&lt;T | undefined&gt;;</code></summary>

##### 描述
Show an error message.

##### 参数
- **message**: `string`  
  a message to show.

- **items**: `T[]`  
  A set of items that will be rendered as actions in the message.

##### 返回值
- `Thenable&lt;T | undefined&gt;` - A promise that resolves to the selected item or `undefined` when being dismissed.

</details>

<div id="window-showerrormessage"></div>

<details>
<summary><code>export function showErrorMessage&lt;T extends string&gt;(message: string, options: MessageOptions, ...items: T[]): Thenable&lt;T | undefined&gt;;</code></summary>

##### 描述
Show an error message.

##### 参数
- **message**: `string`  
  a message to show.

- **options**: `<a href="#messageoptions">MessageOptions</a>`  
  Configures the behaviour of the message.

- **items**: `T[]`  
  A set of items that will be rendered as actions in the message.

##### 返回值
- `Thenable&lt;T | undefined&gt;` - A promise that resolves to the selected item or `undefined` when being dismissed.

</details>

<div id="window-showerrormessage"></div>

<details>
<summary><code>export function showErrorMessage&lt;T extends MessageItem&gt;(message: string, ...items: T[]): Thenable&lt;T | undefined&gt;;</code></summary>

##### 描述
Show an error message.

##### 参数
- **message**: `string`  
  a message to show.

- **items**: `T[]`  
  A set of items that will be rendered as actions in the message.

##### 返回值
- `Thenable&lt;T | undefined&gt;` - A promise that resolves to the selected item or `undefined` when being dismissed.

</details>

<div id="window-showerrormessage"></div>

<details>
<summary><code>export function showErrorMessage&lt;T extends MessageItem&gt;(message: string, options: MessageOptions, ...items: T[]): Thenable&lt;T | undefined&gt;;</code></summary>

##### 描述
Show an error message.

##### 参数
- **message**: `string`  
  a message to show.

- **options**: `<a href="#messageoptions">MessageOptions</a>`  
  Configures the behaviour of the message.

- **items**: `T[]`  
  A set of items that will be rendered as actions in the message.

##### 返回值
- `Thenable&lt;T | undefined&gt;` - A promise that resolves to the selected item or `undefined` when being dismissed.

</details>

<div id="window-showinputbox"></div>

<details>
<summary><code>export function showInputBox(options?: InputBoxOptions, token?: CancellationToken): Thenable&lt;string | undefined&gt;;</code></summary>

##### 描述
Opens an input box to ask the user for input.

The returned value will be `undefined` if the input box was canceled (e.g. pressing ESC). Otherwise the
returned value will be the string typed by the user or an empty string if the user did not type
anything but dismissed the input box with OK.

##### 参数
- **options**: `<a href="#inputboxoptions">InputBoxOptions</a>` (可选)  
  Configures the behavior of the input box.

- **token**: `<a href="#cancellationtoken">CancellationToken</a>` (可选)  
  A token that can be used to signal cancellation.

##### 返回值
- `Thenable&lt;string | undefined&gt;` - A promise that resolves to a string the user provided or to `undefined` in case of dismissal.

</details>

<div id="window-showopendialog"></div>

<details>
<summary><code>export function showOpenDialog(options: OpenDialogOptions): Thenable&lt;Uri[] | undefined&gt;;</code></summary>

##### 描述
Shows a file open dialog to the user which allows to select a file
for opening-purposes.

##### 参数
- **options**: `<a href="#opendialogoptions">OpenDialogOptions</a>`  
  Options that control the dialog.

##### 返回值
- `Thenable&lt;<a href="#uri">Uri</a>[] | undefined&gt;` - A promise that resolves to the selected resources or `undefined`.

</details>

<div id="window-showsavedialog"></div>

<details>
<summary><code>export function showSaveDialog(options: SaveDialogOptions): Thenable&lt;Uri | undefined&gt;;</code></summary>

##### 描述
Shows a file save dialog to the user which allows to select a file
for saving-purposes.

##### 参数
- **options**: `<a href="#savedialogoptions">SaveDialogOptions</a>`  
  Options that control the dialog.

##### 返回值
- `Thenable&lt;<a href="#uri">Uri</a> | undefined&gt;` - A promise that resolves to the selected resource or `undefined`.

</details>

<div id="window-showuploaddialog"></div>

<details>
<summary><code>export function showUploadDialog(options: UploadDialogOptions): Thenable&lt;Uri[] | undefined&gt;;</code></summary>

##### 描述
Shows a file upload dialog to the user which allows to upload files
for various purposes.

##### 参数
- **options**: `<a href="#uploaddialogoptions">UploadDialogOptions</a>`  
  Options, that control the dialog.

##### 返回值
- `Thenable&lt;<a href="#uri">Uri</a>[] | undefined&gt;` - A promise that resolves the paths of uploaded files or `undefined`.

</details>

<div id="window-createwebviewpanel"></div>

<details>
<summary><code>export function createWebviewPanel(viewType: string, title: string, showOptions: WebviewPanelShowOptions, options?: WebviewPanelOptions & WebviewOptions): WebviewPanel;</code></summary>

##### 描述
Create and show a new webview panel.

##### 参数
- **viewType**: `string`  
  Identifies the type of the webview panel.

- **title**: `string`  
  Title of the panel.

- **showOptions**: `<a href="#webviewpanelshowoptions">WebviewPanelShowOptions</a>`  
  where webview panel will be reside. If preserveFocus is set, the new webview will not take focus.

- **options**: `<a href="#webviewpaneloptions">WebviewPanelOptions</a> & <a href="#webviewoptions">WebviewOptions</a>` (可选)  
  Settings for the new panel.

##### 返回值
- `<a href="#webviewpanel">WebviewPanel</a>` - New webview panel.

</details>

<div id="window-registerwebviewviewprovider"></div>

<details>
<summary><code>export function registerWebviewViewProvider(viewId: string, provider: WebviewViewProvider, options?: &#123; readonly webviewOptions?: &#123; readonly retainContextWhenHidden?: boolean; &#125;; &#125;): Disposable;</code></summary>

##### 描述
Registers a webview panel serializer.

Extensions that support reviving should have an `"onWebviewPanel:viewType"` activation event and
make sure that <a href="#window-registerwebviewpanelserializer">registerWebviewPanelSerializer</a> is called during activation.

Only a single serializer may be registered at a time for a given `viewType`.

##### 参数
- **viewId**: `string`  

- **provider**: `<a href="#webviewviewprovider">WebviewViewProvider</a>`  

- **options**: `&#123; readonly webviewOptions?: &#123; readonly retainContextWhenHidden?: boolean; &#125;; &#125;` (可选)  

##### 返回值
- `<a href="#disposable">Disposable</a>`

</details>

<div id="window-registerwebviewpanelserializer"></div>

<details>
<summary><code>export function registerWebviewPanelSerializer(viewType: string, serializer: WebviewPanelSerializer): Disposable;</code></summary>

##### 参数
- **viewType**: `string`  

- **serializer**: `WebviewPanelSerializer`  

##### 返回值
- `<a href="#disposable">Disposable</a>`

</details>

<div id="window-registercustomeditorprovider"></div>

<details>
<summary><code>export function registerCustomEditorProvider(viewType: string, provider: CustomTextEditorProvider | CustomReadonlyEditorProvider | CustomEditorProvider, options?: &#123; readonly webviewOptions?: WebviewPanelOptions; readonly supportsMultipleEditorsPerDocument?: boolean; &#125;): Disposable;</code></summary>

##### 描述
Register a provider for custom editors for the `viewType` contributed by the `customEditors` extension point.

When a custom editor is opened, Theia fires an `onCustomEditor:viewType` activation event. Your extension
must register a [`CustomTextEditorProvider`](#CustomTextEditorProvider), [`CustomReadonlyEditorProvider`](#CustomReadonlyEditorProvider),
[`CustomEditorProvider`](#CustomEditorProvider)for `viewType` as part of activation.

##### 参数
- **viewType**: `string`  
  Unique identifier for the custom editor provider. This should match the `viewType` from the
`customEditors` contribution point.

- **provider**: `<a href="#customtexteditorprovider">CustomTextEditorProvider</a> | <a href="#customreadonlyeditorprovider">CustomReadonlyEditorProvider</a> | <a href="#customeditorprovider">CustomEditorProvider</a>`  
  Provider that resolves custom editors.

- **options**: `&#123; readonly webviewOptions?: <a href="#webviewpaneloptions">WebviewPanelOptions</a>; readonly supportsMultipleEditorsPerDocument?: boolean; &#125;` (可选)  
  Options for the provider.

##### 返回值
- `<a href="#disposable">Disposable</a>` - Disposable that unregisters the provider.

</details>

<div id="window-createtexteditordecorationtype"></div>

<details>
<summary><code>export function createTextEditorDecorationType(options: DecorationRenderOptions): TextEditorDecorationType;</code></summary>

##### 描述
Create a TextEditorDecorationType that can be used to add decorations to text editors.

##### 参数
- **options**: `<a href="#decorationrenderoptions">DecorationRenderOptions</a>`  
  Rendering options for the decoration type.

##### 返回值
- `<a href="#texteditordecorationtype">TextEditorDecorationType</a>` - A new decoration type instance.

</details>

<div id="window-setstatusbarmessage"></div>

<details>
<summary><code>export function setStatusBarMessage(text: string): Disposable;</code></summary>

##### 描述
Set a message to the status bar.

##### 参数
- **text**: `string`  
  The message to show, supports icon substitution as in status bar.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A disposable which hides the status bar message.

</details>

<div id="window-setstatusbarmessage"></div>

<details>
<summary><code>export function setStatusBarMessage(text: string, hideAfterTimeout: number): Disposable;</code></summary>

##### 描述
Set a message to the status bar.

##### 参数
- **text**: `string`  
  The message to show, supports icon substitution as in status bar.

- **hideAfterTimeout**: `number`  
  Timeout in milliseconds after which the message will be disposed.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A disposable which hides the status bar message.

</details>

<div id="window-setstatusbarmessage"></div>

<details>
<summary><code>export function setStatusBarMessage(text: string, hideWhenDone: Thenable&lt;any&gt;): Disposable;</code></summary>

##### 描述
Set a message to the status bar.

##### 参数
- **text**: `string`  
  The message to show, supports icon substitution as in status bar.

- **hideWhenDone**: `Thenable&lt;any&gt;`  
  Thenable on which completion (resolve or reject) the message will be disposed.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A disposable which hides the status bar message.

</details>

<div id="window-createstatusbaritem"></div>

<details>
<summary><code>export function createStatusBarItem(alignment?: StatusBarAlignment, priority?: number): StatusBarItem;</code></summary>

##### 描述
Creates a status bar <a href="#statusbaritem">item</a>.

##### 参数
- **alignment**: `<a href="#statusbaralignment">StatusBarAlignment</a>` (可选)  
  The alignment of the item.

- **priority**: `number` (可选)  
  The priority of the item. Higher values mean the item should be shown more to the left.

##### 返回值
- `<a href="#statusbaritem">StatusBarItem</a>` - A new status bar item.

</details>

<div id="window-createstatusbaritem"></div>

<details>
<summary><code>export function createStatusBarItem(id: string, alignment?: StatusBarAlignment, priority?: number): StatusBarItem;</code></summary>

##### 描述
Creates a status bar <a href="#statusbaritem">item</a>.

##### 参数
- **id**: `string`  
  The unique identifier of the item.

- **alignment**: `<a href="#statusbaralignment">StatusBarAlignment</a>` (可选)  
  The alignment of the item.

- **priority**: `number` (可选)  
  The priority of the item. Higher values mean the item should be shown more to the left.

##### 返回值
- `<a href="#statusbaritem">StatusBarItem</a>` - A new status bar item.

</details>

<div id="window-createoutputchannel"></div>

<details>
<summary><code>export function createOutputChannel(name: string): OutputChannel;</code></summary>

##### 描述
Create a new <a href="#outputchannel">output channel</a> with the given name.

##### 参数
- **name**: `string`  
  String which will be used to represent the channel in the UI.

##### 返回值
- `<a href="#outputchannel">OutputChannel</a>`

</details>

<div id="window-createoutputchannel"></div>

<details>
<summary><code>export function createOutputChannel(name: string, options: &#123; log: true &#125;): LogOutputChannel;</code></summary>

##### 描述
Creates a new <a href="#logoutputchannel">log output channel</a> with the given name.

##### 参数
- **name**: `string`  
  Human-readable string which will be used to represent the channel in the UI.

- **options**: `&#123; log: true &#125;`  
  Options for the log output channel.

##### 返回值
- `<a href="#logoutputchannel">LogOutputChannel</a>`

</details>

<div id="window-createterminal"></div>

<details>
<summary><code>export function createTerminal(name?: string, shellPath?: string, shellArgs?: string[] | string): Terminal;</code></summary>

##### 描述
Create new terminal.

##### 参数
- **name**: `string` (可选)  
  - terminal name to display on the UI.

- **shellPath**: `string` (可选)  
  - path to the executable shell. For example "/bin/bash", "bash", "sh".

- **shellArgs**: `string[] | string` (可选)  
  - arguments to configure executable shell. For example ["-l"] - run shell without login.

##### 返回值
- `<a href="#terminal">Terminal</a>`

</details>

<div id="window-createterminal"></div>

<details>
<summary><code>export function createTerminal(options: TerminalOptions): Terminal;</code></summary>

##### 描述
Create new terminal with predefined options.

##### 参数
- **options**: `<a href="#terminaloptions">TerminalOptions</a>`  

##### 返回值
- `<a href="#terminal">Terminal</a>`

</details>

<div id="window-createterminal"></div>

<details>
<summary><code>export function createTerminal(options: PseudoTerminalOptions): Terminal;</code></summary>

##### 描述
Creates a pseudo where an extension controls its input and output.

##### 参数
- **options**: `<a href="#pseudoterminaloptions">PseudoTerminalOptions</a>`  
  PseudoTerminalOptions.

##### 返回值
- `<a href="#terminal">Terminal</a>` - A new Terminal.

</details>

<div id="window-createterminal"></div>

<details>
<summary><code>export function createTerminal(options: ExtensionTerminalOptions): Terminal;</code></summary>

##### 描述
Creates a pseudo where an extension controls its input and output.

##### 参数
- **options**: `<a href="#extensionterminaloptions">ExtensionTerminalOptions</a>`  
  ExtensionTerminalOptions.

##### 返回值
- `<a href="#terminal">Terminal</a>` - A new Terminal.

</details>

<div id="window-registertreedataprovider"></div>

<details>
<summary><code>export function registerTreeDataProvider&lt;T&gt;(viewId: string, treeDataProvider: TreeDataProvider&lt;T&gt;): Disposable;</code></summary>

##### 描述
Register a <a href="#treedataprovider">TreeDataProvider</a> for the view contributed using the extension point `views`.
This will allow you to contribute data to the <a href="#treeview">TreeView</a> and update if the data changes.

**Note:** To get access to the <a href="#treeview">TreeView</a> and perform operations on it, use createTreeView.

##### 参数
- **viewId**: `string`  
  Id of the view contributed using the extension point `views`.

- **treeDataProvider**: `<a href="#treedataprovider">TreeDataProvider</a>&lt;T&gt;`  
  A <a href="#treedataprovider">TreeDataProvider</a> that provides tree data for the view

##### 返回值
- `<a href="#disposable">Disposable</a>`

</details>

<div id="window-createtreeview"></div>

<details>
<summary><code>export function createTreeView&lt;T&gt;(viewId: string, options: TreeViewOptions&lt;T&gt;): TreeView&lt;T&gt;;</code></summary>

##### 描述
Create a <a href="#treeview">TreeView</a> for the view contributed using the extension point `views`.

##### 参数
- **viewId**: `string`  
  Id of the view contributed using the extension point `views`.

- **options**: `<a href="#treeviewoptions">TreeViewOptions</a>&lt;T&gt;`  
  Options object to provide <a href="#treedataprovider">TreeDataProvider</a> for the view.

##### 返回值
- `<a href="#treeview">TreeView</a>&lt;T&gt;` - a <a href="#treeview">TreeView</a>.

</details>

<div id="window-registerurihandler"></div>

<details>
<summary><code>export function registerUriHandler(handler: UriHandler): Disposable;</code></summary>

##### 描述
Registers a <a href="#urihandler">uri handler</a> capable of handling system-wide <a href="#uri">uris</a>.
In case there are multiple windows open, the topmost window will handle the uri.
A uri handler is scoped to the extension it is contributed from; it will only
be able to handle uris which are directed to the extension itself. A uri must respect
the following rules:

- The uri-scheme must be the product name;
- The uri-authority must be the extension id (eg. `my.extension`);
- The uri-path, -query and -fragment parts are arbitrary.

For example, if the `my.extension` extension registers a uri handler, it will only
be allowed to handle uris with the prefix `product-name://my.extension`.

An extension can only register a single uri handler in its entire activation lifetime.

* *Note:* There is an activation event `onUri` that fires when a uri directed for
the current extension is about to be handled.

##### 参数
- **handler**: `<a href="#urihandler">UriHandler</a>`  
  The uri handler to register for this extension.

##### 返回值
- `<a href="#disposable">Disposable</a>`

</details>

<div id="window-withscmprogress"></div>

<details>
<summary><code>export function withScmProgress&lt;R&gt;(task: (progress: Progress&lt;number&gt;) =&gt; Thenable&lt;R&gt;): Thenable&lt;R&gt;;</code></summary>

##### 描述
Show progress in the Source Control viewlet while running the given callback and while
its returned promise isn't resolve or rejected.

##### 参数
- **task**: `(progress: <a href="#progress">Progress</a>&lt;number&gt;) =&gt; Thenable&lt;R&gt;`  
  A callback returning a promise. Progress increments can be reported with
the provided <a href="#progress">Progress</a>-object.

##### 返回值
- `Thenable&lt;R&gt;` - The thenable the task did return.

</details>

<div id="window-withprogress"></div>

<details>
<summary><code>export function withProgress&lt;R&gt;(options: ProgressOptions, task: (progress: Progress&lt;&#123; message?: string; increment?: number &#125;&gt;, token: CancellationToken) =&gt; Thenable&lt;R&gt;): Thenable&lt;R&gt;;</code></summary>

##### 描述
Show progress in the editor. Progress is shown while running the given callback
and while the promise it returned isn't resolved nor rejected. The location at which
progress should show (and other details) is defined via the passed [`ProgressOptions`](#ProgressOptions).

##### 参数
- **options**: `<a href="#progressoptions">ProgressOptions</a>`  

- **task**: `(progress: <a href="#progress">Progress</a>&lt;&#123; message?: string; increment?: number &#125;&gt;, token: <a href="#cancellationtoken">CancellationToken</a>) =&gt; Thenable&lt;R&gt;`  
  A callback returning a promise. Progress state can be reported with
the provided <a href="#progress">progress</a>-object.

To report discrete progress, use `increment` to indicate how much work has been completed. Each call with
a `increment` value will be summed up and reflected as overall progress until 100% is reached (a value of
e.g. `10` accounts for `10%` of work done).
Note that currently only `ProgressLocation.Notification` is capable of showing discrete progress.

To monitor if the operation has been cancelled by the user, use the provided [`CancellationToken`](#CancellationToken).
Note that currently only `ProgressLocation.Notification` is supporting to show a cancel button to cancel the
long running operation.

##### 返回值
- `Thenable&lt;R&gt;` - The thenable the task-callback returned.

</details>

<div id="window-createinputbox"></div>

<details>
<summary><code>export function createInputBox(): InputBox;</code></summary>

##### 描述
Creates a <a href="#inputbox">InputBox</a> to let the user enter some text input.

Note that in many cases the more convenient [window.showInputBox](#window.showInputBox)
is easier to use. [window.createInputBox](#window.createInputBox) should be used
when [window.showInputBox](#window.showInputBox) does not offer the required flexibility.

##### 返回值
- `<a href="#inputbox">InputBox</a>` - A new <a href="#inputbox">InputBox</a>.

</details>

<div id="window-registerterminallinkprovider"></div>

<details>
<summary><code>export function registerTerminalLinkProvider(provider: TerminalLinkProvider): Disposable;</code></summary>

##### 描述
Register provider that enables the detection and handling of links within the terminal.

##### 参数
- **provider**: `<a href="#terminallinkprovider">TerminalLinkProvider</a>`  
  The provider that provides the terminal links.

##### 返回值
- `<a href="#disposable">Disposable</a>` - Disposable that unregisters the provider.

</details>

<div id="window-registerterminalprofileprovider"></div>

<details>
<summary><code>export function registerTerminalProfileProvider(id: string, provider: TerminalProfileProvider): Disposable;</code></summary>

##### 描述
Registers a provider for a contributed terminal profile.

##### 参数
- **id**: `string`  
  The ID of the contributed terminal profile.

- **provider**: `<a href="#terminalprofileprovider">TerminalProfileProvider</a>`  
  The terminal profile provider.

##### 返回值
- `<a href="#disposable">Disposable</a>`

</details>

<div id="window-registerfiledecorationprovider"></div>

<details>
<summary><code>export function registerFileDecorationProvider(provider: FileDecorationProvider): Disposable;</code></summary>

##### 描述
Register a file decoration provider.

##### 参数
- **provider**: `<a href="#filedecorationprovider">FileDecorationProvider</a>`  
  A <a href="#filedecorationprovider">FileDecorationProvider</a>.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">disposable</a> that unregisters the provider.

</details>

<div id="window-registerexternaluriopener"></div>

<details>
<summary><code>export function registerExternalUriOpener(id: string, opener: ExternalUriOpener, metadata: ExternalUriOpenerMetadata): Disposable;</code></summary>

##### 描述
Register a new `ExternalUriOpener`.

When a uri is about to be opened, an `onOpenExternalUri:SCHEME` activation event is fired.

##### 参数
- **id**: `string`  
  Unique id of the opener, such as `myExtension.browserPreview`. This is used in settings
and commands to identify the opener.

- **opener**: `<a href="#externaluriopener">ExternalUriOpener</a>`  
  Opener to register.

- **metadata**: `ExternalUriOpenerMetadata`  
  Additional information about the opener.

##### 返回值
- `<a href="#disposable">Disposable</a>` - Disposable that unregisters the opener.

</details>

<div id="window-registerprofilecontenthandler"></div>

<details>
<summary><code>export function registerProfileContentHandler(id: string, profileContentHandler: ProfileContentHandler): Disposable;</code></summary>

##### 参数
- **id**: `string`  

- **profileContentHandler**: `<a href="#profilecontenthandler">ProfileContentHandler</a>`  

##### 返回值
- `<a href="#disposable">Disposable</a>`

</details>

<div id="window-registershareprovider"></div>

<details>
<summary><code>export function registerShareProvider(selector: DocumentSelector, provider: ShareProvider): Disposable;</code></summary>

##### 描述
Register a share provider. An extension may register multiple share providers.
There may be multiple share providers for the same <a href="#shareableitem">ShareableItem</a>.

##### 参数
- **selector**: `<a href="#documentselector">DocumentSelector</a>`  
  A document selector to filter whether the provider should be shown for a <a href="#shareableitem">ShareableItem</a>.

- **provider**: `<a href="#shareprovider">ShareProvider</a>`  
  A share provider.

##### 返回值
- `<a href="#disposable">Disposable</a>`

</details>

<div id="window-registerterminalquickfixprovider"></div>

<details>
<summary><code>export function registerTerminalQuickFixProvider(id: string, provider: TerminalQuickFixProvider): Disposable;</code></summary>

##### 参数
- **id**: `string`  

- **provider**: `<a href="#terminalquickfixprovider">TerminalQuickFixProvider</a>`  
  A terminal quick fix provider

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">Disposable</a> that un-registers the provider when being disposed

</details>

#### Events

<div id="window-ondidchangeactiveterminal"></div>

<details>
<summary><code>onDidChangeActiveTerminal: <a href="#event">Event</a>&lt;<a href="#terminal">Terminal</a> | undefined&gt;</code></summary>

##### 描述
An <a href="#event">event</a> which fires when the active terminal has changed.
*Note* that the event also fires when the active terminal changes to `undefined`.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#terminal">Terminal</a> | undefined&gt;`

</details>

<div id="window-ondidchangeactivetexteditor"></div>

<details>
<summary><code>onDidChangeActiveTextEditor: <a href="#event">Event</a>&lt;<a href="#texteditor">TextEditor</a> | undefined&gt;</code></summary>

##### 描述
An <a href="#event">event</a> which fires when the active editor
has changed. *Note* that the event also fires when the active editor changes
to `undefined`.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#texteditor">TextEditor</a> | undefined&gt;`

</details>

<div id="window-ondidchangevisibletexteditors"></div>

<details>
<summary><code>onDidChangeVisibleTextEditors: <a href="#event">Event</a>&lt;readonly <a href="#texteditor">TextEditor</a>[]&gt;</code></summary>

##### 描述
An <a href="#event">event</a> which fires when the array of visible editors
has changed.

##### 类型
- `<a href="#event">Event</a>&lt;readonly <a href="#texteditor">TextEditor</a>[]&gt;`

</details>

<div id="window-ondidchangetexteditorselection"></div>

<details>
<summary><code>onDidChangeTextEditorSelection: <a href="#event">Event</a>&lt;<a href="#texteditorselectionchangeevent">TextEditorSelectionChangeEvent</a>&gt;</code></summary>

##### 描述
An <a href="#event">event</a> which fires when the selection in an editor has changed.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#texteditorselectionchangeevent">TextEditorSelectionChangeEvent</a>&gt;`

</details>

<div id="window-ondidchangetexteditorvisibleranges"></div>

<details>
<summary><code>onDidChangeTextEditorVisibleRanges: <a href="#event">Event</a>&lt;<a href="#texteditorvisiblerangeschangeevent">TextEditorVisibleRangesChangeEvent</a>&gt;</code></summary>

##### 描述
An <a href="#event">event</a> which fires when the selection in an editor has changed.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#texteditorvisiblerangeschangeevent">TextEditorVisibleRangesChangeEvent</a>&gt;`

</details>

<div id="window-ondidchangetexteditoroptions"></div>

<details>
<summary><code>onDidChangeTextEditorOptions: <a href="#event">Event</a>&lt;<a href="#texteditoroptionschangeevent">TextEditorOptionsChangeEvent</a>&gt;</code></summary>

##### 描述
An <a href="#event">event</a> which fires when the options of an editor have changed.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#texteditoroptionschangeevent">TextEditorOptionsChangeEvent</a>&gt;`

</details>

<div id="window-ondidchangetexteditorviewcolumn"></div>

<details>
<summary><code>onDidChangeTextEditorViewColumn: <a href="#event">Event</a>&lt;<a href="#texteditorviewcolumnchangeevent">TextEditorViewColumnChangeEvent</a>&gt;</code></summary>

##### 描述
An <a href="#event">event</a> which fires when the view column of an editor has changed.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#texteditorviewcolumnchangeevent">TextEditorViewColumnChangeEvent</a>&gt;`

</details>

<div id="window-ondidchangevisiblenotebookeditors"></div>

<details>
<summary><code>onDidChangeVisibleNotebookEditors: <a href="#event">Event</a>&lt;readonly <a href="#notebookeditor">NotebookEditor</a>[]&gt;</code></summary>

##### 描述
An <a href="#event">Event</a> which fires when the visible notebook editors
has changed.

##### 类型
- `<a href="#event">Event</a>&lt;readonly <a href="#notebookeditor">NotebookEditor</a>[]&gt;`

</details>

<div id="window-ondidchangeactivenotebookeditor"></div>

<details>
<summary><code>onDidChangeActiveNotebookEditor: <a href="#event">Event</a>&lt;<a href="#notebookeditor">NotebookEditor</a> | undefined&gt;</code></summary>

##### 描述
An <a href="#event">Event</a> which fires when the active notebook editor
has changed. *Note* that the event also fires when the active editor changes
to `undefined`.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#notebookeditor">NotebookEditor</a> | undefined&gt;`

</details>

<div id="window-ondidchangenotebookeditorselection"></div>

<details>
<summary><code>onDidChangeNotebookEditorSelection: <a href="#event">Event</a>&lt;<a href="#notebookeditorselectionchangeevent">NotebookEditorSelectionChangeEvent</a>&gt;</code></summary>

##### 描述
An <a href="#event">Event</a> which fires when the notebook editor selections
have changed.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#notebookeditorselectionchangeevent">NotebookEditorSelectionChangeEvent</a>&gt;`

</details>

<div id="window-ondidchangenotebookeditorvisibleranges"></div>

<details>
<summary><code>onDidChangeNotebookEditorVisibleRanges: <a href="#event">Event</a>&lt;<a href="#notebookeditorvisiblerangeschangeevent">NotebookEditorVisibleRangesChangeEvent</a>&gt;</code></summary>

##### 描述
An <a href="#event">Event</a> which fires when the notebook editor visible ranges
have changed.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#notebookeditorvisiblerangeschangeevent">NotebookEditorVisibleRangesChangeEvent</a>&gt;`

</details>

<div id="window-ondidchangewindowstate"></div>

<details>
<summary><code>onDidChangeWindowState: <a href="#event">Event</a>&lt;<a href="#windowstate">WindowState</a>&gt;</code></summary>

##### 描述
An event which fires when the focus state of the current window changes.
The value of the event represents whether the window is focused.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#windowstate">WindowState</a>&gt;`

</details>

<div id="window-ondidcloseterminal"></div>

<details>
<summary><code>onDidCloseTerminal: <a href="#event">Event</a>&lt;<a href="#terminal">Terminal</a>&gt;</code></summary>

##### 描述
Event which fires when terminal did closed. Event value contains closed terminal definition.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#terminal">Terminal</a>&gt;`

</details>

<div id="window-ondidopenterminal"></div>

<details>
<summary><code>onDidOpenTerminal: <a href="#event">Event</a>&lt;<a href="#terminal">Terminal</a>&gt;</code></summary>

##### 描述
An <a href="#event">event</a> which fires when a terminal has been created,
either through the createTerminal API or commands.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#terminal">Terminal</a>&gt;`

</details>

<div id="window-ondidchangeterminalstate"></div>

<details>
<summary><code>onDidChangeTerminalState: <a href="#event">Event</a>&lt;<a href="#terminal">Terminal</a>&gt;</code></summary>

##### 描述
An <a href="#event">Event</a> which fires when a terminal's state has changed.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#terminal">Terminal</a>&gt;`

</details>

<div id="window-ondidchangeterminalshellintegration"></div>

<details>
<summary><code>onDidChangeTerminalShellIntegration: <a href="#event">Event</a>&lt;<a href="#terminalshellintegrationchangeevent">TerminalShellIntegrationChangeEvent</a>&gt;</code></summary>

##### 描述
Fires when shell integration activates or one of its properties changes in a terminal.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#terminalshellintegrationchangeevent">TerminalShellIntegrationChangeEvent</a>&gt;`

</details>

<div id="window-ondidstartterminalshellexecution"></div>

<details>
<summary><code>onDidStartTerminalShellExecution: <a href="#event">Event</a>&lt;<a href="#terminalshellexecutionstartevent">TerminalShellExecutionStartEvent</a>&gt;</code></summary>

##### 描述
This will be fired when a terminal command is started. This event will fire only when
[shell integration](https://code.visualstudio.com/docs/terminal/shell-integration) is
activated for the terminal.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#terminalshellexecutionstartevent">TerminalShellExecutionStartEvent</a>&gt;`

</details>

<div id="window-ondidendterminalshellexecution"></div>

<details>
<summary><code>onDidEndTerminalShellExecution: <a href="#event">Event</a>&lt;<a href="#terminalshellexecutionendevent">TerminalShellExecutionEndEvent</a>&gt;</code></summary>

##### 描述
This will be fired when a terminal command is ended. This event will fire only when
[shell integration](https://code.visualstudio.com/docs/terminal/shell-integration) is
activated for the terminal.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#terminalshellexecutionendevent">TerminalShellExecutionEndEvent</a>&gt;`

</details>

<div id="window-ondidchangeactivecolortheme"></div>

<details>
<summary><code>onDidChangeActiveColorTheme: <a href="#event">Event</a>&lt;<a href="#colortheme">ColorTheme</a>&gt;</code></summary>

##### 描述
An <a href="#event">event</a> which fires when the active color theme is changed or has changes.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#colortheme">ColorTheme</a>&gt;`

</details>

#### Variables

<div id="window-tabgroups"></div>

<details>
<summary><code>tabGroups: <a href="#tabgroups">TabGroups</a></code></summary>

##### 描述
Represents the grid widget within the main editor area

##### 类型
```typescript
TabGroups
```

##### 只读
- 是

</details>

<div id="window-activeterminal"></div>

<details>
<summary><code>activeTerminal: <a href="#terminal">Terminal</a> | undefined</code></summary>

##### 描述
The currently active terminal or undefined. The active terminal is the one
that currently has focus or most recently had focus.

##### 类型
```typescript
Terminal | undefined
```

</details>

<div id="window-activetexteditor"></div>

<details>
<summary><code>activeTextEditor: <a href="#texteditor">TextEditor</a> | undefined</code></summary>

##### 描述
The currently active editor or `undefined`. The active editor is the one
that currently has focus or, when none has focus, the one that has changed
input most recently.

##### 类型
```typescript
TextEditor | undefined
```

</details>

<div id="window-terminals"></div>

<details>
<summary><code>terminals: readonly <a href="#terminal">Terminal</a>[]</code></summary>

##### 描述
The currently opened terminals or an empty array.

##### 类型
```typescript
readonly Terminal[]
```

</details>

<div id="window-visibletexteditors"></div>

<details>
<summary><code>visibleTextEditors: readonly <a href="#texteditor">TextEditor</a>[]</code></summary>

##### 描述
The currently visible editors or an empty array.

##### 类型
```typescript
readonly TextEditor[]
```

</details>

<div id="window-visiblenotebookeditors"></div>

<details>
<summary><code>visibleNotebookEditors: readonly <a href="#notebookeditor">NotebookEditor</a>[]</code></summary>

##### 描述
The currently visible <a href="#notebookeditor">notebook editors</a> or an empty array.

##### 类型
```typescript
readonly NotebookEditor[]
```

##### 只读
- 是

</details>

<div id="window-activenotebookeditor"></div>

<details>
<summary><code>activeNotebookEditor: <a href="#notebookeditor">NotebookEditor</a> | undefined</code></summary>

##### 描述
The currently active <a href="#notebookeditor">notebook editor</a> or `undefined`. The active editor is the one
that currently has focus or, when none has focus, the one that has changed
input most recently.

##### 类型
```typescript
NotebookEditor | undefined
```

##### 只读
- 是

</details>

<div id="window-state"></div>

<details>
<summary><code>state: <a href="#windowstate">WindowState</a></code></summary>

##### 描述
Represents the current window's state.

##### 类型
```typescript
WindowState
```

</details>

<div id="window-activecolortheme"></div>

<details>
<summary><code>activeColorTheme: <a href="#colortheme">ColorTheme</a></code></summary>

##### 描述
The currently active color theme as configured in the settings. The active
theme can be changed via the `workbench.colorTheme` setting.

##### 类型
```typescript
ColorTheme
```

</details>

---

## workspace

#### Functions

<div id="workspace-registertextdocumentcontentprovider"></div>

<details>
<summary><code>export function registerTextDocumentContentProvider(scheme: string, provider: TextDocumentContentProvider): Disposable;</code></summary>

##### 描述
Register a text document content provider.

Only one provider can be registered per scheme.

##### 参数
- **scheme**: `string`  
  The uri-scheme to register for.

- **provider**: `<a href="#textdocumentcontentprovider">TextDocumentContentProvider</a>`  
  A content provider.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">disposable</a> that unregisters this provider when being disposed.

</details>

<div id="workspace-registernotebookserializer"></div>

<details>
<summary><code>export function registerNotebookSerializer(notebookType: string, serializer: NotebookSerializer, options?: NotebookDocumentContentOptions): Disposable;</code></summary>

##### 描述
Register a notebook serializer.

A notebook serializer must be contributed through the notebooks extension point. When opening a notebook file, the editor will send the onNotebook:&lt;notebookType&gt; activation event, and extensions must register their serializer in return.

##### 参数
- **notebookType**: `string`  
  a notebook.

- **serializer**: `<a href="#notebookserializer">NotebookSerializer</a>`  
  a notebook serializer.

- **options**: `<a href="#notebookdocumentcontentoptions">NotebookDocumentContentOptions</a>` (可选)  
  Optional context options that define what parts of a notebook should be persisted

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">disposable</a> that unregisters this serializer when being disposed.

</details>

<div id="workspace-opentextdocument"></div>

<details>
<summary><code>export function openTextDocument(uri: Uri): Thenable&lt;TextDocument | undefined&gt;;</code></summary>

##### 描述
Opens a document. Will return early if this document is already open. Otherwise
the document is loaded and the didOpen-event fires.

The document is denoted by an <a href="#uri">uri</a>. Depending on the scheme the
following rules apply:
* `file`-scheme: Open a file on disk, will be rejected if the file does not exist or cannot be loaded.
* `untitled`-scheme: A new file that should be saved on disk, e.g. `untitled:c:\frodo\new.js`. The language
will be derived from the file name.
* For all other schemes the registered text document content <a href="#textdocumentcontentprovider">providers</a> are consulted.

*Note* that the lifecycle of the returned document is owned by the editor and not by the extension. That means an
[`onDidClose`](#workspace.onDidCloseTextDocument)-event can occur at any time after opening it.

##### 参数
- **uri**: `<a href="#uri">Uri</a>`  
  Identifies the resource to open.

##### 返回值
- `Thenable&lt;<a href="#textdocument">TextDocument</a> | undefined&gt;` - A promise that resolves to a <a href="#textdocument">document</a>.

</details>

<div id="workspace-opentextdocument"></div>

<details>
<summary><code>export function openTextDocument(fileName: string): Thenable&lt;TextDocument | undefined&gt;;</code></summary>

##### 描述
A short-hand for `openTextDocument(Uri.file(fileName))`.

##### 参数
- **fileName**: `string`  
  A name of a file on disk.

##### 返回值
- `Thenable&lt;<a href="#textdocument">TextDocument</a> | undefined&gt;` - A promise that resolves to a <a href="#textdocument">document</a>.

##### 相关
- <a href="#workspace-opentextdocument">openTextDocument</a>

</details>

<div id="workspace-opentextdocument"></div>

<details>
<summary><code>export function openTextDocument(options?: &#123; language?: string; content?: string; &#125;): Thenable&lt;TextDocument | undefined&gt;;</code></summary>

##### 描述
Opens an untitled text document. The editor will prompt the user for a file
path when the document is to be saved. The `options` parameter allows to
specify the *language* and/or the *content* of the document.

##### 参数
- **options**: `&#123; language?: string; content?: string; &#125;` (可选)  
  Options to control how the document will be created.

##### 返回值
- `Thenable&lt;<a href="#textdocument">TextDocument</a> | undefined&gt;` - A promise that resolves to a <a href="#textdocument">document</a>.

</details>

<div id="workspace-opennotebookdocument"></div>

<details>
<summary><code>export function openNotebookDocument(uri: Uri): Thenable&lt;NotebookDocument&gt; | undefined;</code></summary>

##### 描述
Open a notebook. Will return early if this notebook is already <a href="#notebookdocument">loaded</a>.
Otherwise the notebook is loaded and the <a href="#workspace-ondidopennotebookdocument">onDidOpenNotebookDocument</a>-event fires.

Note that the lifecycle of the returned notebook is owned by the editor and not by the extension.
That means an  <a href="#workspace-ondidclosenotebookdocument">onDidCloseNotebookDocument</a>-event can occur at any time after.
Note that opening a notebook does not show a notebook editor. This function only returns a notebook document
which can be shown in a notebook editor but it can also be used for other things.

##### 参数
- **uri**: `<a href="#uri">Uri</a>`  
  The resource to open.

##### 返回值
- `Thenable&lt;<a href="#notebookdocument">NotebookDocument</a>&gt; | undefined` - A promise that resolves to a <a href="#notebookdocument">notebook</a>.

</details>

<div id="workspace-opennotebookdocument"></div>

<details>
<summary><code>export function openNotebookDocument(notebookType: string, content?: NotebookData): Thenable&lt;NotebookDocument&gt; | undefined;</code></summary>

##### 描述
Open an untitled notebook. The editor will prompt the user for a file path when the document is to be saved.

##### 参数
- **notebookType**: `string`  
  The notebook type that should be used.

- **content**: `<a href="#notebookdata">NotebookData</a>` (可选)  
  The initial contents of the notebook.

##### 返回值
- `Thenable&lt;<a href="#notebookdocument">NotebookDocument</a>&gt; | undefined` - A promise that resolves to a <a href="#notebookdocument">notebook</a>.

</details>

<div id="workspace-getconfiguration"></div>

<details>
<summary><code>export function getConfiguration(section?: string, scope?: ConfigurationScope | null): WorkspaceConfiguration;</code></summary>

##### 描述
Get a workspace configuration object.

When a section-identifier is provided only that part of the configuration
is returned. Dots in the section-identifier are interpreted as child-access,
like `&#123; myExt: &#123; setting: &#123; doIt: true &#125;&#125;&#125;` and `getConfiguration('myExt.setting').get('doIt') === true`.

When a scope is provided configuration confined to that scope is returned. Scope can be a resource or a language identifier or both.

##### 参数
- **section**: `string` (可选)  
  A dot-separated identifier.

- **scope**: `<a href="#configurationscope">ConfigurationScope</a> | null` (可选)  
  A scope for which the configuration is asked for.

##### 返回值
- `<a href="#workspaceconfiguration">WorkspaceConfiguration</a>` - The full configuration or a subset.

</details>

<div id="workspace-createfilesystemwatcher"></div>

<details>
<summary><code>export function createFileSystemWatcher( globPattern: GlobPattern, ignoreCreateEvents?: boolean, ignoreChangeEvents?: boolean, ignoreDeleteEvents?: boolean ): FileSystemWatcher;</code></summary>

##### 参数
- **globPattern**: `<a href="#globpattern">GlobPattern</a>`  

- **ignoreCreateEvents**: `boolean` (可选)  

- **ignoreChangeEvents**: `boolean` (可选)  

- **ignoreDeleteEvents**: `boolean` (可选)  

##### 返回值
- `<a href="#filesystemwatcher">FileSystemWatcher</a>`

</details>

<div id="workspace-findfiles"></div>

<details>
<summary><code>export function findFiles(include: GlobPattern, exclude?: GlobPattern | null, maxResults?: number, token?: CancellationToken): Thenable&lt;Uri[]&gt;;</code></summary>

##### 描述
Find files across all workspace folders in the workspace.

##### 参数
- **include**: `<a href="#globpattern">GlobPattern</a>`  
  A <a href="#globpattern">glob pattern</a> that defines the files to search for. The glob pattern
will be matched against the file paths of resulting matches relative to their workspace. Use a <a href="#relativepattern">relative pattern</a>
to restrict the search results to a <a href="#workspacefolder">workspace folder</a>.

- **exclude**: `<a href="#globpattern">GlobPattern</a> | null` (可选)  
  A <a href="#globpattern">glob pattern</a> that defines files and folders to exclude. The glob pattern
will be matched against the file paths of resulting matches relative to their workspace. When `undefined` only default excludes will
apply, when `null` no excludes will apply.

- **maxResults**: `number` (可选)  
  An upper-bound for the result.

- **token**: `<a href="#cancellationtoken">CancellationToken</a>` (可选)  
  A token that can be used to signal cancellation to the underlying search engine.

##### 返回值
- `Thenable&lt;<a href="#uri">Uri</a>[]&gt;` - A thenable that resolves to an array of resource identifiers. Will return no results if no
workspace folders are opened.

</details>

<div id="workspace-save"></div>

<details>
<summary><code>export function save(uri: Uri): Thenable&lt;Uri | undefined&gt;;</code></summary>

##### 描述
Saves the editor identified by the given resource and returns the resulting resource or `undefined`
if save was not successful or no editor with the given resource was found.

**Note** that an editor with the provided resource must be opened in order to be saved.

##### 参数
- **uri**: `<a href="#uri">Uri</a>`  
  the associated uri for the opened editor to save.

##### 返回值
- `Thenable&lt;<a href="#uri">Uri</a> | undefined&gt;` - A thenable that resolves when the save operation has finished.

</details>

<div id="workspace-saveas"></div>

<details>
<summary><code>export function saveAs(uri: Uri): Thenable&lt;Uri | undefined&gt;;</code></summary>

##### 描述
Saves the editor identified by the given resource to a new file name as provided by the user and
returns the resulting resource or `undefined` if save was not successful or cancelled or no editor
with the given resource was found.

**Note** that an editor with the provided resource must be opened in order to be saved as.

##### 参数
- **uri**: `<a href="#uri">Uri</a>`  
  the associated uri for the opened editor to save as.

##### 返回值
- `Thenable&lt;<a href="#uri">Uri</a> | undefined&gt;` - A thenable that resolves when the save-as operation has finished.

</details>

<div id="workspace-saveall"></div>

<details>
<summary><code>export function saveAll(includeUntitled?: boolean): Thenable&lt;boolean&gt;;</code></summary>

##### 描述
Save all dirty files.

##### 参数
- **includeUntitled**: `boolean` (可选)  
  Also save files that have been created during this session.

##### 返回值
- `Thenable&lt;boolean&gt;` - A thenable that resolves when the files have been saved.

</details>

<div id="workspace-applyedit"></div>

<details>
<summary><code>export function applyEdit(edit: WorkspaceEdit, metadata?: WorkspaceEditMetadata): Thenable&lt;boolean&gt;;</code></summary>

##### 描述
Make changes to one or many resources or create, delete, and rename resources as defined by the given
<a href="#workspaceedit">workspace edit</a>.

All changes of a workspace edit are applied in the same order in which they have been added. If
multiple textual inserts are made at the same position, these strings appear in the resulting text
in the order the 'inserts' were made. Invalid sequences like 'delete file a' -&gt; 'insert text in file a'
cause failure of the operation.

When applying a workspace edit that consists only of text edits an 'all-or-nothing'-strategy is used.
A workspace edit with resource creations or deletions aborts the operation, e.g. consecutive edits will
not be attempted, when a single edit fails.

##### 参数
- **edit**: `<a href="#workspaceedit">WorkspaceEdit</a>`  
  A workspace edit.

- **metadata**: `<a href="#workspaceeditmetadata">WorkspaceEditMetadata</a>` (可选)  
  Optional <a href="#workspaceeditmetadata">metadata</a> for the edit.

##### 返回值
- `Thenable&lt;boolean&gt;` - A thenable that resolves when the edit could be applied.

</details>

<div id="workspace-registerfilesystemprovider"></div>

<details>
<summary><code>export function registerFileSystemProvider(scheme: string, provider: FileSystemProvider, options?: &#123; readonly isCaseSensitive?: boolean, readonly isReadonly?: boolean | MarkdownString &#125;): Disposable;</code></summary>

##### 描述
Register a filesystem provider for a given scheme, e.g. `ftp`.

There can only be one provider per scheme and an error is being thrown when a scheme
has been claimed by another provider or when it is reserved.

##### 参数
- **scheme**: `string`  
  The uri-scheme the provider registers for.

- **provider**: `<a href="#filesystemprovider">FileSystemProvider</a>`  
  The filesystem provider.

- **options**: `&#123; readonly isCaseSensitive?: boolean, readonly isReadonly?: boolean | <a href="#markdownstring">MarkdownString</a> &#125;` (可选)  
  Immutable metadata about the provider.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">disposable</a> that unregisters this provider when being disposed.

</details>

<div id="workspace-getworkspacefolder"></div>

<details>
<summary><code>export function getWorkspaceFolder(uri: Uri): WorkspaceFolder | undefined;</code></summary>

##### 描述
Returns the <a href="#workspacefolder">workspace folder</a> that contains a given uri.
* returns `undefined` when the given uri doesn't match any workspace folder

##### 参数
- **uri**: `<a href="#uri">Uri</a>`  
  An uri.

##### 返回值
- `<a href="#workspacefolder">WorkspaceFolder</a> | undefined` - A workspace folder or `undefined`

</details>

<div id="workspace-asrelativepath"></div>

<details>
<summary><code>export function asRelativePath(pathOrUri: string | Uri, includeWorkspaceFolder?: boolean): string | undefined;</code></summary>

##### 描述
Returns a path that is relative to the workspace folder or folders.

When there are no workspace folders or when the path
is not contained in them, the input is returned.

##### 参数
- **pathOrUri**: `string | <a href="#uri">Uri</a>`  
  A path or uri. When a uri is given its fsPath is used.

- **includeWorkspaceFolder**: `boolean` (可选)  
  When `true` and when the given path is contained inside a
workspace folder the name of the workspace is prepended. Defaults to `true` when there are
multiple workspace folders and `false` otherwise.

##### 返回值
- `string | undefined` - A path relative to the root or the input.

</details>

<div id="workspace-updateworkspacefolders"></div>

<details>
<summary><code>export function updateWorkspaceFolders(start: number, deleteCount: number | undefined | null, ...workspaceFoldersToAdd: &#123; readonly uri: Uri, readonly name?: string &#125;[]): boolean;</code></summary>

##### 描述
This method replaces `deleteCount` workspace folders starting at index `start`
by an optional set of `workspaceFoldersToAdd` on the `theia.workspace.workspaceFolders` array. This "splice"
behavior can be used to add, remove and change workspace folders in a single operation.

If the first workspace folder is added, removed or changed, the currently executing extensions (including the
one that called this method) will be terminated and restarted so that the (deprecated) `rootPath` property is
updated to point to the first workspace folder.

Use the [`onDidChangeWorkspaceFolders()`](#onDidChangeWorkspaceFolders) event to get notified when the
workspace folders have been updated.

**Example:** adding a new workspace folder at the end of workspace folders
```typescript
workspace.updateWorkspaceFolders(workspace.workspaceFolders ? workspace.workspaceFolders.length : 0, null, &#123; uri: ...&#125;);
```

**Example:** removing the first workspace folder
```typescript
workspace.updateWorkspaceFolders(0, 1);
```

**Example:** replacing an existing workspace folder with a new one
```typescript
workspace.updateWorkspaceFolders(0, 1, &#123; uri: ...&#125;);
```

It is valid to remove an existing workspace folder and add it again with a different name
to rename that folder.

**Note:** it is not valid to call [updateWorkspaceFolders()](#updateWorkspaceFolders) multiple times
without waiting for the [`onDidChangeWorkspaceFolders()`](#onDidChangeWorkspaceFolders) to fire.

##### 参数
- **start**: `number`  
  the zero-based location in the list of currently opened <a href="#workspacefolder">workspace folders</a>from which to start deleting workspace folders.

- **deleteCount**: `number | undefined | null`  
  the optional number of workspace folders to remove.

- **workspaceFoldersToAdd**: `&#123; readonly uri: <a href="#uri">Uri</a>, readonly name?: string &#125;[]`  
  the optional variable set of workspace folders to add in place of the deleted ones.
Each workspace is identified with a mandatory URI and an optional name.

##### 返回值
- `boolean` - true if the operation was successfully started and false otherwise if arguments were used that would result
in invalid workspace folder state (e.g. 2 folders with the same URI).

</details>

<div id="workspace-registertaskprovider"></div>

<details>
<summary><code>export function registerTaskProvider(type: string, provider: TaskProvider): Disposable;</code></summary>

##### 描述
~~Register a task provider.~~

##### 参数
- **type**: `string`  
  The task kind type this provider is registered for.

- **provider**: `<a href="#taskprovider">TaskProvider</a>`  
  A task provider.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A <a href="#disposable">disposable</a> that unregisters this provider when being disposed.

</details>

<div id="workspace-requestworkspacetrust"></div>

<details>
<summary><code>export function requestWorkspaceTrust(options?: WorkspaceTrustRequestOptions): Promise&lt;boolean | undefined&gt;;</code></summary>

##### 参数
- **options**: `<a href="#workspacetrustrequestoptions">WorkspaceTrustRequestOptions</a>` (可选)  

##### 返回值
- `Promise&lt;boolean | undefined&gt;`

</details>

<div id="workspace-registercanonicaluriprovider"></div>

<details>
<summary><code>export function registerCanonicalUriProvider(scheme: string, provider: CanonicalUriProvider): Disposable;</code></summary>

##### 参数
- **scheme**: `string`  
  The URI scheme that this provider can provide canonical URIs for.
A canonical URI represents the conversion of a resource's alias into a source of truth URI.
Multiple aliases may convert to the same source of truth URI.

- **provider**: `<a href="#canonicaluriprovider">CanonicalUriProvider</a>`  
  A provider which can convert URIs of scheme

##### 返回值
- `<a href="#disposable">Disposable</a>`

</details>

<div id="workspace-getcanonicaluri"></div>

<details>
<summary><code>export function getCanonicalUri(uri: Uri, options: CanonicalUriRequestOptions, token: CancellationToken): ProviderResult&lt;Uri&gt;;</code></summary>

##### 参数
- **uri**: `<a href="#uri">Uri</a>`  
  The URI to provide a canonical URI for.

- **options**: `<a href="#canonicalurirequestoptions">CanonicalUriRequestOptions</a>`  

- **token**: `<a href="#cancellationtoken">CancellationToken</a>`  
  A cancellation token for the request.

##### 返回值
- `<a href="#providerresult">ProviderResult</a>&lt;<a href="#uri">Uri</a>&gt;`

</details>

<div id="workspace-createfilesystemwatcher"></div>

<details>
<summary><code>export function createFileSystemWatcher(pattern: RelativePattern, options?: FileSystemWatcherOptions): FileSystemWatcher;</code></summary>

##### 描述
A variant of <a href="#workspace-createfilesystemwatcher">createFileSystemWatcher</a> that optionally allows to specify
a set of glob patterns to exclude from watching.

It provides the following advantages over the other <a href="#workspace-createfilesystemwatcher">createFileSystemWatcher</a>
method:
- the configured excludes from `files.watcherExclude` setting are NOT applied
- requests for recursive file watchers inside the opened workspace are NOT ignored
- the watcher is ONLY notified for events from this request and not from any other watcher

As such, this method is prefered in cases where you want full control over the watcher behavior
without being impacted by settings or other watchers that are installed.

##### 参数
- **pattern**: `<a href="#relativepattern">RelativePattern</a>`  

- **options**: `<a href="#filesystemwatcheroptions">FileSystemWatcherOptions</a>` (可选)  

##### 返回值
- `<a href="#filesystemwatcher">FileSystemWatcher</a>`

</details>

<div id="workspace-registereditsessionidentityprovider"></div>

<details>
<summary><code>export function registerEditSessionIdentityProvider(scheme: string, provider: EditSessionIdentityProvider): Disposable;</code></summary>

##### 参数
- **scheme**: `string`  
  The URI scheme that this provider can provide edit session identities for.

- **provider**: `<a href="#editsessionidentityprovider">EditSessionIdentityProvider</a>`  
  A provider which can convert URIs for workspace folders of scheme

##### 返回值
- `<a href="#disposable">Disposable</a>`

</details>

<div id="workspace-findtextinfiles"></div>

<details>
<summary><code>export function findTextInFiles(query: TextSearchQuery, optionsOrCallback: FindTextInFilesOptions | ((result: TextSearchResult) =&gt; void), callbackOrToken?: CancellationToken | ((result: TextSearchResult) =&gt; void), token?: CancellationToken): Promise&lt;TextSearchComplete&gt;;</code></summary>

##### 描述
Find text in files across all [workspace folders] in the workspace

##### 参数
- **query**: `<a href="#textsearchquery">TextSearchQuery</a>`  
  What to search

- **optionsOrCallback**: `<a href="#findtextinfilesoptions">FindTextInFilesOptions</a> | ((result: <a href="#textsearchresult">TextSearchResult</a>) =&gt; void)`  

- **callbackOrToken**: `<a href="#cancellationtoken">CancellationToken</a> | ((result: <a href="#textsearchresult">TextSearchResult</a>) =&gt; void)` (可选)  

- **token**: `<a href="#cancellationtoken">CancellationToken</a>` (可选)  

##### 返回值
- `Promise&lt;<a href="#textsearchcomplete">TextSearchComplete</a>&gt;`

</details>

<div id="workspace-registerportattributesprovider"></div>

<details>
<summary><code>export function registerPortAttributesProvider(portSelector: PortAttributesSelector, provider: PortAttributesProvider): Disposable;</code></summary>

##### 描述
If your extension listens on ports, consider registering a PortAttributesProvider to provide information
about the ports. For example, a debug extension may know about debug ports in it's debuggee. By providing
this information with a PortAttributesProvider the extension can tell the editor that these ports should be
ignored, since they don't need to be user facing.

The results of the PortAttributesProvider are merged with the user setting `remote.portsAttributes`. If the values conflict, the user setting takes precedence.

##### 参数
- **portSelector**: `<a href="#portattributesselector">PortAttributesSelector</a>`  
  It is best practice to specify a port selector to avoid unnecessary calls to your provider.
If you don't specify a port selector your provider will be called for every port, which will result in slower port forwarding for the user.

- **provider**: `<a href="#portattributesprovider">PortAttributesProvider</a>`  
  The <a href="#portattributesprovider">PortAttributesProvider</a>.

##### 返回值
- `<a href="#disposable">Disposable</a>`

</details>

<div id="workspace-registerresourcelabelformatter"></div>

<details>
<summary><code>export function registerResourceLabelFormatter(formatter: ResourceLabelFormatter): Disposable;</code></summary>

##### 参数
- **formatter**: `<a href="#resourcelabelformatter">ResourceLabelFormatter</a>`  

##### 返回值
- `<a href="#disposable">Disposable</a>`

</details>

<div id="workspace-registertimelineprovider"></div>

<details>
<summary><code>export function registerTimelineProvider(scheme: string | string[], provider: TimelineProvider): Disposable;</code></summary>

##### 描述
Register a timeline provider.

Multiple providers can be registered. In that case, providers are asked in
parallel and the results are merged. A failing provider (rejected promise or exception) will
not cause a failure of the whole operation.

##### 参数
- **scheme**: `string | string[]`  
  A scheme or schemes that defines which documents this provider is applicable to. Can be `*` to target all documents.

- **provider**: `<a href="#timelineprovider">TimelineProvider</a>`  
  A timeline provider.

##### 返回值
- `<a href="#disposable">Disposable</a>` - A [disposable](#Disposable) that unregisters this provider when being disposed.

</details>

#### Events

<div id="workspace-ondidchangeworkspacefolders"></div>

<details>
<summary><code>onDidChangeWorkspaceFolders: <a href="#event">Event</a>&lt;<a href="#workspacefolderschangeevent">WorkspaceFoldersChangeEvent</a>&gt;</code></summary>

##### 描述
An event that is emitted when a workspace folder is added or removed.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#workspacefolderschangeevent">WorkspaceFoldersChangeEvent</a>&gt;`

</details>

<div id="workspace-ondidopennotebookdocument"></div>

<details>
<summary><code>onDidOpenNotebookDocument: <a href="#event">Event</a>&lt;<a href="#notebookdocument">NotebookDocument</a>&gt;</code></summary>

##### 描述
An event that is emitted when a <a href="#notebookdocument">notebook</a> is opened.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#notebookdocument">NotebookDocument</a>&gt;`

</details>

<div id="workspace-ondidclosenotebookdocument"></div>

<details>
<summary><code>onDidCloseNotebookDocument: <a href="#event">Event</a>&lt;<a href="#notebookdocument">NotebookDocument</a>&gt;</code></summary>

##### 描述
An event that is emitted when a notebook is disposed.

Note 1: There is no guarantee that this event fires when an editor tab is closed.

Note 2: A notebook can be open but not shown in an editor which means this event can fire for a notebook that has not been shown in an editor.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#notebookdocument">NotebookDocument</a>&gt;`

</details>

<div id="workspace-ondidsavenotebookdocument"></div>

<details>
<summary><code>onDidSaveNotebookDocument: <a href="#event">Event</a>&lt;<a href="#notebookdocument">NotebookDocument</a>&gt;</code></summary>

##### 描述
An event that is emitted when a <a href="#notebookdocument">notebook</a> is saved.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#notebookdocument">NotebookDocument</a>&gt;`

</details>

<div id="workspace-ondidopentextdocument"></div>

<details>
<summary><code>onDidOpenTextDocument: <a href="#event">Event</a>&lt;<a href="#textdocument">TextDocument</a>&gt;</code></summary>

##### 描述
An event that is emitted when a <a href="#textdocument">text document</a> is opened.

To add an event listener when a visible text document is opened, use the <a href="#texteditor">TextEditor</a> events in the
window namespace. Note that:

- The event is emitted before the <a href="#textdocument">document</a> is updated in the
active text editor
- When a <a href="#textdocument">text document</a> is already open (e.g.: open in another visible text editor) this event is not emitted

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#textdocument">TextDocument</a>&gt;`

</details>

<div id="workspace-ondidsavetextdocument"></div>

<details>
<summary><code>onDidSaveTextDocument: <a href="#event">Event</a>&lt;<a href="#textdocument">TextDocument</a>&gt;</code></summary>

##### 描述
An event that is emitted when a <a href="#textdocument">text document</a> is saved to disk.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#textdocument">TextDocument</a>&gt;`

</details>

<div id="workspace-ondidclosetextdocument"></div>

<details>
<summary><code>onDidCloseTextDocument: <a href="#event">Event</a>&lt;<a href="#textdocument">TextDocument</a>&gt;</code></summary>

##### 描述
An event that is emitted when a <a href="#textdocument">text document</a> is disposed.

To add an event listener when a visible text document is closed, use the <a href="#texteditor">TextEditor</a> events in the
window namespace. Note that this event is not emitted when a <a href="#texteditor">TextEditor</a> is closed
but the document remains open in another visible text editor.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#textdocument">TextDocument</a>&gt;`

</details>

<div id="workspace-ondidchangetextdocument"></div>

<details>
<summary><code>onDidChangeTextDocument: <a href="#event">Event</a>&lt;<a href="#textdocumentchangeevent">TextDocumentChangeEvent</a>&gt;</code></summary>

##### 描述
An event that is emitted when a <a href="#textdocument">text document</a> is changed. This usually happens
when the contents changes but also when other things like the
dirty-state changes.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#textdocumentchangeevent">TextDocumentChangeEvent</a>&gt;`

</details>

<div id="workspace-onwillsavetextdocument"></div>

<details>
<summary><code>onWillSaveTextDocument: <a href="#event">Event</a>&lt;<a href="#textdocumentwillsaveevent">TextDocumentWillSaveEvent</a>&gt;</code></summary>

##### 描述
An event that is emitted when a <a href="#textdocument">text document</a> will be saved to disk.

*Note 1:* Subscribers can delay saving by registering asynchronous work. For the sake of data integrity the editor
might save without firing this event. For instance when shutting down with dirty files.

*Note 2:* Subscribers are called sequentially and they can delay saving
by registering asynchronous work. Protection against misbehaving listeners is implemented as such:
 * there is an overall time budget that all listeners share and if that is exhausted no further listener is called
 * listeners that take a long time or produce errors frequently will not be called anymore

The current thresholds are 1.5 seconds as overall time budget and a listener can misbehave 3 times before being ignored.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#textdocumentwillsaveevent">TextDocumentWillSaveEvent</a>&gt;`

</details>

<div id="workspace-ondidchangenotebookdocument"></div>

<details>
<summary><code>onDidChangeNotebookDocument: <a href="#event">Event</a>&lt;<a href="#notebookdocumentchangeevent">NotebookDocumentChangeEvent</a>&gt;</code></summary>

##### 描述
An event that is emitted when a notebook has changed.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#notebookdocumentchangeevent">NotebookDocumentChangeEvent</a>&gt;`

</details>

<div id="workspace-onwillsavenotebookdocument"></div>

<details>
<summary><code>onWillSaveNotebookDocument: <a href="#event">Event</a>&lt;<a href="#notebookdocumentwillsaveevent">NotebookDocumentWillSaveEvent</a>&gt;</code></summary>

##### 描述
An event that is emitted when a <a href="#notebookdocument">notebook document</a> will be saved to disk.

*Note 1:* Subscribers can delay saving by registering asynchronous work. For the sake of data integrity the editor
might save without firing this event. For instance when shutting down with dirty files.

*Note 2:* Subscribers are called sequentially and they can delay saving
by registering asynchronous work. Protection against misbehaving listeners is implemented as such:
 * there is an overall time budget that all listeners share and if that is exhausted no further listener is called
 * listeners that take a long time or produce errors frequently will not be called anymore

The current thresholds are 1.5 seconds as overall time budget and a listener can misbehave 3 times before being ignored.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#notebookdocumentwillsaveevent">NotebookDocumentWillSaveEvent</a>&gt;`

</details>

<div id="workspace-onwillcreatefiles"></div>

<details>
<summary><code>onWillCreateFiles: <a href="#event">Event</a>&lt;<a href="#filewillcreateevent">FileWillCreateEvent</a>&gt;</code></summary>

##### 描述
An event that is emitted when files are being created.

*Note 1:* This event is triggered by user gestures, like creating a file from the
explorer, or from the [`workspace.applyEdit`](#workspace.applyEdit)-api. This event is *not* fired when
files change on disk, e.g triggered by another application, or when using the
[`workspace.fs`](#FileSystem)-api.

*Note 2:* When this event is fired, edits to files that are being created cannot be applied.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#filewillcreateevent">FileWillCreateEvent</a>&gt;`

</details>

<div id="workspace-ondidcreatefiles"></div>

<details>
<summary><code>onDidCreateFiles: <a href="#event">Event</a>&lt;<a href="#filecreateevent">FileCreateEvent</a>&gt;</code></summary>

##### 描述
An event that is emitted when files have been created.

*Note:* This event is triggered by user gestures, like creating a file from the
explorer, or from the [`workspace.applyEdit`](#workspace.applyEdit)-api, but this event is *not* fired when
files change on disk, e.g triggered by another application, or when using the
[`workspace.fs`](#FileSystem)-api.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#filecreateevent">FileCreateEvent</a>&gt;`

</details>

<div id="workspace-onwilldeletefiles"></div>

<details>
<summary><code>onWillDeleteFiles: <a href="#event">Event</a>&lt;<a href="#filewilldeleteevent">FileWillDeleteEvent</a>&gt;</code></summary>

##### 描述
An event that is emitted when files are being deleted.

*Note 1:* This event is triggered by user gestures, like deleting a file from the
explorer, or from the [`workspace.applyEdit`](#workspace.applyEdit)-api, but this event is *not* fired when
files change on disk, e.g triggered by another application, or when using the
[`workspace.fs`](#FileSystem)-api.

*Note 2:* When deleting a folder with children only one event is fired.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#filewilldeleteevent">FileWillDeleteEvent</a>&gt;`

</details>

<div id="workspace-ondiddeletefiles"></div>

<details>
<summary><code>onDidDeleteFiles: <a href="#event">Event</a>&lt;<a href="#filedeleteevent">FileDeleteEvent</a>&gt;</code></summary>

##### 描述
An event that is emitted when files have been deleted.

*Note 1:* This event is triggered by user gestures, like deleting a file from the
explorer, or from the [`workspace.applyEdit`](#workspace.applyEdit)-api, but this event is *not* fired when
files change on disk, e.g triggered by another application, or when using the
[`workspace.fs`](#FileSystem)-api.

*Note 2:* When deleting a folder with children only one event is fired.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#filedeleteevent">FileDeleteEvent</a>&gt;`

</details>

<div id="workspace-onwillrenamefiles"></div>

<details>
<summary><code>onWillRenameFiles: <a href="#event">Event</a>&lt;<a href="#filewillrenameevent">FileWillRenameEvent</a>&gt;</code></summary>

##### 描述
An event that is emitted when files are being renamed.

*Note 1:* This event is triggered by user gestures, like renaming a file from the
explorer, and from the [`workspace.applyEdit`](#workspace.applyEdit)-api, but this event is *not* fired when
files change on disk, e.g triggered by another application, or when using the
[`workspace.fs`](#FileSystem)-api.

*Note 2:* When renaming a folder with children only one event is fired.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#filewillrenameevent">FileWillRenameEvent</a>&gt;`

</details>

<div id="workspace-ondidrenamefiles"></div>

<details>
<summary><code>onDidRenameFiles: <a href="#event">Event</a>&lt;<a href="#filerenameevent">FileRenameEvent</a>&gt;</code></summary>

##### 描述
An event that is emitted when files have been renamed.

*Note 1:* This event is triggered by user gestures, like renaming a file from the
explorer, and from the [`workspace.applyEdit`](#workspace.applyEdit)-api, but this event is *not* fired when
files change on disk, e.g triggered by another application, or when using the
[`workspace.fs`](#FileSystem)-api.

*Note 2:* When renaming a folder with children only one event is fired.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#filerenameevent">FileRenameEvent</a>&gt;`

</details>

<div id="workspace-ondidchangeconfiguration"></div>

<details>
<summary><code>onDidChangeConfiguration: <a href="#event">Event</a>&lt;<a href="#configurationchangeevent">ConfigurationChangeEvent</a>&gt;</code></summary>

##### 描述
An event that is emitted when the <a href="#workspaceconfiguration">configuration</a> changed.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#configurationchangeevent">ConfigurationChangeEvent</a>&gt;`

</details>

<div id="workspace-ondidgrantworkspacetrust"></div>

<details>
<summary><code>onDidGrantWorkspaceTrust: <a href="#event">Event</a>&lt;void&gt;</code></summary>

##### 描述
Event that fires when the current workspace has been trusted.

##### 类型
- `<a href="#event">Event</a>&lt;void&gt;`

</details>

<div id="workspace-onwillcreateeditsessionidentity"></div>

<details>
<summary><code>onWillCreateEditSessionIdentity: <a href="#event">Event</a>&lt;<a href="#editsessionidentitywillcreateevent">EditSessionIdentityWillCreateEvent</a>&gt;</code></summary>

##### 描述
An event that is emitted when an edit session identity is about to be requested.

##### 类型
- `<a href="#event">Event</a>&lt;<a href="#editsessionidentitywillcreateevent">EditSessionIdentityWillCreateEvent</a>&gt;`

</details>

#### Variables

<div id="workspace-fs"></div>

<details>
<summary><code>fs: <a href="#filesystem">FileSystem</a></code></summary>

##### 描述
A <a href="#filesystem">file system</a> instance that allows to interact with local and remote
files, e.g. `workspace.fs.readDirectory(someUri)` allows to retrieve all entries
of a directory or `workspace.fs.stat(anotherUri)` returns the meta data for a
file.

##### 类型
```typescript
FileSystem
```

##### 只读
- 是

</details>

<div id="workspace-rootpath"></div>

<details>
<summary><code>rootPath: string | undefined</code></summary>

##### 描述
~~The folder that is open in the editor. `undefined` when no folder
has been opened.~~

##### 类型
```typescript
string | undefined
```

##### 只读
- 是

</details>

<div id="workspace-workspacefolders"></div>

<details>
<summary><code>workspaceFolders: readonly <a href="#workspacefolder">WorkspaceFolder</a>[] | undefined</code></summary>

##### 描述
List of workspace folders or `undefined` when no folder is open.
*Note* that the first entry corresponds to the value of `rootPath`.

##### 类型
```typescript
readonly WorkspaceFolder[] | undefined
```

##### 只读
- 是

</details>

<div id="workspace-workspacefile"></div>

<details>
<summary><code>workspaceFile: <a href="#uri">Uri</a> | undefined</code></summary>

##### 描述
The location of the workspace file, for example:

`file:///Users/name/Development/myProject.code-workspace`

Depending on the workspace that is opened, the value will be:
 * `undefined` when no workspace or a single folder is opened
 * the path of the workspace file as `Uri` otherwise.

**Note:** it is not advised to use `workspace.workspaceFile` to write
configuration data into the file.

##### 类型
```typescript
Uri | undefined
```

##### 只读
- 是

</details>

<div id="workspace-name"></div>

<details>
<summary><code>name: string | undefined</code></summary>

##### 描述
The name of the workspace. `undefined` when no folder
has been opened.

##### 类型
```typescript
string | undefined
```

</details>

<div id="workspace-textdocuments"></div>

<details>
<summary><code>textDocuments: readonly <a href="#textdocument">TextDocument</a>[]</code></summary>

##### 描述
All text documents currently known to the system.

##### 类型
```typescript
readonly TextDocument[]
```

</details>

<div id="workspace-notebookdocuments"></div>

<details>
<summary><code>notebookDocuments: readonly <a href="#notebookdocument">NotebookDocument</a>[]</code></summary>

##### 描述
All notebook documents currently known to the editor.

##### 类型
```typescript
readonly NotebookDocument[]
```

</details>

<div id="workspace-istrusted"></div>

<details>
<summary><code>isTrusted: boolean</code></summary>

##### 描述
When true, the user has explicitly trusted the contents of the workspace.

##### 类型
```typescript
boolean
```

##### 只读
- 是

</details>

---

## Types

> 以下是顶层的类、接口、类型定义和枚举

#### ArrayCommentMap {#arraycommentmap}

##### Methods

<div id="arraycommentmap-tojson"></div>

<details>
<summary><code>toJSON():ArrayComment[]&#123; return [...this.entries()].sort((a,b)=&gt;a[0]-b[0]); &#125;</code></summary>

</details>

---

#### BranchCoverage {#branchcoverage}

Contains coverage information for a branch of a <a href="#statementcoverage">StatementCoverage</a>.

##### Constructors

<details>
<summary><code>constructor(executed: number | boolean, location?: Position | Range, label?: string);</code></summary>

</details>

##### Properties

<div id="branchcoverage-executed"></div>

<details>
<summary><code>executed: number | boolean</code></summary>

The number of times this branch was executed, or a boolean indicating
whether it was executed if the exact count is unknown. If zero or false,
the branch will be marked as un-covered.

</details>

<div id="branchcoverage-location"></div>

<details>
<summary><code>location: <a href="#position">Position</a> | <a href="#range">Range</a></code></summary>

Branch location.

</details>

<div id="branchcoverage-label"></div>

<details>
<summary><code>label: string</code></summary>

Label for the branch, used in the context of "the $&#123;label&#125; branch was
not taken," for example.

</details>

---

#### Breakpoint {#breakpoint}

The base class of all breakpoint types.

##### Constructors

<details>
<summary><code>protected constructor(enabled?: boolean, condition?: string, hitCondition?: string, logMessage?: string);</code></summary>

</details>

##### Properties

<div id="breakpoint-id"></div>

<details>
<summary><code>id: string</code></summary>

The unique ID of the breakpoint.

**只读**: 是

</details>

<div id="breakpoint-enabled"></div>

<details>
<summary><code>enabled: boolean</code></summary>

Is breakpoint enabled.

**只读**: 是

</details>

<div id="breakpoint-condition"></div>

<details>
<summary><code>condition: string</code></summary>

An optional expression for conditional breakpoints.

**只读**: 是

</details>

<div id="breakpoint-hitcondition"></div>

<details>
<summary><code>hitCondition: string</code></summary>

An optional expression that controls how many hits of the breakpoint are ignored.

**只读**: 是

</details>

<div id="breakpoint-logmessage"></div>

<details>
<summary><code>logMessage: string</code></summary>

An optional message that gets logged when this breakpoint is hit. Embedded expressions within &#123;&#125; are interpolated by the debug adapter.

**只读**: 是

</details>

---

#### CallHierarchyIncomingCall {#callhierarchyincomingcall}

Represents an incoming call, e.g. a caller of a method or constructor.

##### Constructors

<details>
<summary><code>constructor(item: CallHierarchyItem, fromRanges: Range[]);</code></summary>

Create a new call object.

</details>

##### Properties

<div id="callhierarchyincomingcall-from"></div>

<details>
<summary><code>from: <a href="#callhierarchyitem">CallHierarchyItem</a></code></summary>

The item that makes the call.

</details>

<div id="callhierarchyincomingcall-fromranges"></div>

<details>
<summary><code>fromRanges: <a href="#range">Range</a>[]</code></summary>

The range at which at which the calls appears. This is relative to the caller
denoted by [`this.from`](#CallHierarchyIncomingCall.from).

</details>

---

#### CallHierarchyItem {#callhierarchyitem}

Represents programming constructs like functions or constructors in the context
of call hierarchy.

##### Constructors

<details>
<summary><code>constructor(kind: SymbolKind, name: string, detail: string, uri: Uri, range: Range, selectionRange: Range);</code></summary>

Creates a new call hierarchy item.

</details>

##### Properties

<div id="callhierarchyitem-name"></div>

<details>
<summary><code>name: string</code></summary>

The name of this item.

</details>

<div id="callhierarchyitem-kind"></div>

<details>
<summary><code>kind: <a href="#symbolkind">SymbolKind</a></code></summary>

The kind of this item.

</details>

<div id="callhierarchyitem-detail"></div>

<details>
<summary><code>detail: string</code></summary>

More detail for this item, e.g. the signature of a function.

</details>

<div id="callhierarchyitem-uri"></div>

<details>
<summary><code>uri: <a href="#uri">Uri</a></code></summary>

The resource identifier of this item.

</details>

<div id="callhierarchyitem-range"></div>

<details>
<summary><code>range: <a href="#range">Range</a></code></summary>

The range enclosing this symbol not including leading/trailing whitespace but everything else, e.g. comments and code.

</details>

<div id="callhierarchyitem-selectionrange"></div>

<details>
<summary><code>selectionRange: <a href="#range">Range</a></code></summary>

The range that should be selected and revealed when this symbol is being picked, e.g. the name of a function.
Must be contained by the [`range`](#CallHierarchyItem.range).

</details>

<div id="callhierarchyitem-tags"></div>

<details>
<summary><code>tags: readonly <a href="#symboltag">SymbolTag</a>[]</code></summary>

Tags for this item.

</details>

<div id="callhierarchyitem-data"></div>

<details>
<summary><code>data: unknown</code></summary>

A data entry field that is preserved between a call hierarchy prepare and
incoming calls or outgoing calls requests.

</details>

---

#### CallHierarchyOutgoingCall {#callhierarchyoutgoingcall}

Represents an outgoing call, e.g. calling a getter from a method or a method from a constructor etc.

##### Constructors

<details>
<summary><code>constructor(item: CallHierarchyItem, fromRanges: Range[]);</code></summary>

Create a new call object.

</details>

##### Properties

<div id="callhierarchyoutgoingcall-to"></div>

<details>
<summary><code>to: <a href="#callhierarchyitem">CallHierarchyItem</a></code></summary>

The item that is called.

</details>

<div id="callhierarchyoutgoingcall-fromranges"></div>

<details>
<summary><code>fromRanges: <a href="#range">Range</a>[]</code></summary>

The range at which this item is called. This is the range relative to the caller, e.g the item
passed to [`provideCallHierarchyOutgoingCalls`](#CallHierarchyItemProvider.provideCallHierarchyOutgoingCalls)
and not [`this.to`](#CallHierarchyOutgoingCall.to).

</details>

---

#### CancellationError {#cancellationerror}

##### Constructors

<details>
<summary><code>constructor();</code></summary>

</details>

---

#### CancellationTokenSource {#cancellationtokensource}

A cancellation token source create and manage a <a href="#cancellationtoken">cancellation token</a>

##### Properties

<div id="cancellationtokensource-token"></div>

<details>
<summary><code>token: <a href="#cancellationtoken">CancellationToken</a></code></summary>

</details>

##### Methods

<div id="cancellationtokensource-cancel"></div>

<details>
<summary><code>cancel(): void;</code></summary>

</details>

<div id="cancellationtokensource-dispose"></div>

<details>
<summary><code>dispose(): void;</code></summary>

</details>

---

#### ChatRequestTurn {#chatrequestturn}

Represents a user request in chat history.

##### Constructors

<details>
<summary><code>private constructor(prompt: string, command: string | undefined, references: ChatPromptReference[], participant: string, toolReferences: ChatLanguageModelToolReference[]);</code></summary>

</details>

##### Properties

<div id="chatrequestturn-prompt"></div>

<details>
<summary><code>prompt: string</code></summary>

The prompt as entered by the user.

Information about references used in this request is stored in references.

*Note* that the name of the participant and the command
are not part of the prompt.

**只读**: 是

</details>

<div id="chatrequestturn-participant"></div>

<details>
<summary><code>participant: string</code></summary>

The id of the chat participant to which this request was directed.

**只读**: 是

</details>

<div id="chatrequestturn-command"></div>

<details>
<summary><code>command: string</code></summary>

The name of the command that was selected for this request.

**只读**: 是

</details>

<div id="chatrequestturn-references"></div>

<details>
<summary><code>references: <a href="#chatpromptreference">ChatPromptReference</a>[]</code></summary>

The references that were used in this message.

**只读**: 是

</details>

<div id="chatrequestturn-toolreferences"></div>

<details>
<summary><code>toolReferences: readonly <a href="#chatlanguagemodeltoolreference">ChatLanguageModelToolReference</a>[]</code></summary>

The list of tools were attached to this request.

**只读**: 是

</details>

---

#### ChatResponseAnchorPart {#chatresponseanchorpart}

Represents a part of a chat response that is an anchor, that is rendered as a link to a target.

##### Constructors

<details>
<summary><code>constructor(value: Uri | Location, title?: string);</code></summary>

Create a new ChatResponseAnchorPart.

</details>

##### Properties

<div id="chatresponseanchorpart-value"></div>

<details>
<summary><code>value: <a href="#uri">Uri</a> | <a href="#location">Location</a></code></summary>

The target of this anchor.

</details>

<div id="chatresponseanchorpart-title"></div>

<details>
<summary><code>title: string</code></summary>

An optional title that is rendered with value.

</details>

---

#### ChatResponseCommandButtonPart {#chatresponsecommandbuttonpart}

Represents a part of a chat response that is a button that executes a command.

##### Constructors

<details>
<summary><code>constructor(value: Command);</code></summary>

Create a new ChatResponseCommandButtonPart.

</details>

##### Properties

<div id="chatresponsecommandbuttonpart-value"></div>

<details>
<summary><code>value: <a href="#command">Command</a></code></summary>

The command that will be executed when the button is clicked.

</details>

---

#### ChatResponseFileTreePart {#chatresponsefiletreepart}

Represents a part of a chat response that is a file tree.

##### Constructors

<details>
<summary><code>constructor(value: ChatResponseFileTree[], baseUri: Uri);</code></summary>

Create a new ChatResponseFileTreePart.

</details>

##### Properties

<div id="chatresponsefiletreepart-value"></div>

<details>
<summary><code>value: <a href="#chatresponsefiletree">ChatResponseFileTree</a>[]</code></summary>

File tree data.

</details>

<div id="chatresponsefiletreepart-baseuri"></div>

<details>
<summary><code>baseUri: <a href="#uri">Uri</a></code></summary>

The base uri to which this file tree is relative

</details>

---

#### ChatResponseMarkdownPart {#chatresponsemarkdownpart}

Represents a part of a chat response that is formatted as Markdown.

##### Constructors

<details>
<summary><code>constructor(value: string | MarkdownString);</code></summary>

Create a new ChatResponseMarkdownPart.

</details>

##### Properties

<div id="chatresponsemarkdownpart-value"></div>

<details>
<summary><code>value: <a href="#markdownstring">MarkdownString</a></code></summary>

A markdown string or a string that should be interpreted as markdown.

</details>

---

#### ChatResponseProgressPart {#chatresponseprogresspart}

Represents a part of a chat response that is a progress message.

##### Constructors

<details>
<summary><code>constructor(value: string);</code></summary>

Create a new ChatResponseProgressPart.

</details>

##### Properties

<div id="chatresponseprogresspart-value"></div>

<details>
<summary><code>value: string</code></summary>

The progress message

</details>

---

#### ChatResponseReferencePart {#chatresponsereferencepart}

Represents a part of a chat response that is a reference, rendered separately from the content.

##### Constructors

<details>
<summary><code>constructor(value: Uri | Location, iconPath?: IconPath);</code></summary>

Create a new ChatResponseReferencePart.

</details>

##### Properties

<div id="chatresponsereferencepart-value"></div>

<details>
<summary><code>value: <a href="#uri">Uri</a> | <a href="#location">Location</a></code></summary>

The reference target.

</details>

<div id="chatresponsereferencepart-iconpath"></div>

<details>
<summary><code>iconPath: <a href="#iconpath">IconPath</a></code></summary>

The icon for the reference.

</details>

---

#### ChatResponseTurn {#chatresponseturn}

Represents a chat participant's response in chat history.

##### Constructors

<details>
<summary><code>private constructor(response: ReadonlyArray&lt;ChatResponseMarkdownPart | ChatResponseFileTreePart | ChatResponseAnchorPart | ChatResponseCommandButtonPart&gt;, result: ChatResult, participant: string);</code></summary>

</details>

##### Properties

<div id="chatresponseturn-response"></div>

<details>
<summary><code>response: ReadonlyArray&lt;<a href="#chatresponsemarkdownpart">ChatResponseMarkdownPart</a> | <a href="#chatresponsefiletreepart">ChatResponseFileTreePart</a> | <a href="#chatresponseanchorpart">ChatResponseAnchorPart</a> | <a href="#chatresponsecommandbuttonpart">ChatResponseCommandButtonPart</a>&gt;</code></summary>

The content that was received from the chat participant. Only the stream parts that represent actual content (not metadata) are represented.

**只读**: 是

</details>

<div id="chatresponseturn-result"></div>

<details>
<summary><code>result: <a href="#chatresult">ChatResult</a></code></summary>

The result that was received from the chat participant.

**只读**: 是

</details>

<div id="chatresponseturn-participant"></div>

<details>
<summary><code>participant: string</code></summary>

The id of the chat participant that this response came from.

**只读**: 是

</details>

<div id="chatresponseturn-command"></div>

<details>
<summary><code>command: string</code></summary>

The name of the command that this response came from.

**只读**: 是

</details>

---

#### CodeAction {#codeaction}

A code action represents a change that can be performed in code, e.g. to fix a problem or
to refactor code.

A CodeAction must set either [`edit`](#edit) and/or a [`command`](#command).
If both are supplied, the `edit` is applied first, then the command is executed.

##### Constructors

<details>
<summary><code>constructor(title: string, kind?: CodeActionKind);</code></summary>

Creates a new code action.

A code action must have at least a title and edits
and/or a command.

</details>

##### Properties

<div id="codeaction-title"></div>

<details>
<summary><code>title: string</code></summary>

A short, human-readable, title for this code action.

</details>

<div id="codeaction-diagnostics"></div>

<details>
<summary><code>diagnostics: <a href="#diagnostic">Diagnostic</a>[]</code></summary>

<a href="#diagnostic">Diagnostics</a> that this code action resolves.

</details>

<div id="codeaction-edit"></div>

<details>
<summary><code>edit: <a href="#workspaceedit">WorkspaceEdit</a></code></summary>

A <a href="#workspaceedit">workspace edit</a> this code action performs.

</details>

<div id="codeaction-command"></div>

<details>
<summary><code>command: <a href="#command">Command</a></code></summary>

A <a href="#command">command</a> this code action executes.

</details>

<div id="codeaction-kind"></div>

<details>
<summary><code>kind: <a href="#codeactionkind">CodeActionKind</a></code></summary>

<a href="#codeactionkind">Kind</a> of the code action.

Used to filter code actions.

</details>

<div id="codeaction-disabled"></div>

<details>
<summary><code>disabled: &#123; reason: string &#125;</code></summary>

Marks that the code action cannot currently be applied.

</details>

<div id="codeaction-ispreferred"></div>

<details>
<summary><code>isPreferred: boolean</code></summary>

Marks this as a preferred action.

</details>

---

#### CodeActionKind {#codeactionkind}

Kind of a code action.

Kinds are a hierarchical list of identifiers separated by `.`, e.g. `"refactor.extract.function"`.

Code action kinds are used by VS Code for UI elements such as the refactoring context menu. Users
can also trigger code actions with a specific kind with the `editor.action.codeAction` command.

##### Constructors

<details>
<summary><code>private constructor(value: string);</code></summary>

</details>

##### Properties

<div id="codeactionkind-empty"></div>

<details>
<summary><code>Empty: <a href="#codeactionkind">CodeActionKind</a></code></summary>

Empty kind.

**只读**: 是

</details>

<div id="codeactionkind-quickfix"></div>

<details>
<summary><code>QuickFix: <a href="#codeactionkind">CodeActionKind</a></code></summary>

Base kind for quickfix actions: `quickfix`.

Quick fix actions address a problem in the code and are shown in the normal code action context menu.

**只读**: 是

</details>

<div id="codeactionkind-refactor"></div>

<details>
<summary><code>Refactor: <a href="#codeactionkind">CodeActionKind</a></code></summary>

Base kind for refactoring actions: `refactor`

Refactoring actions are shown in the refactoring context menu.

**只读**: 是

</details>

<div id="codeactionkind-refactorextract"></div>

<details>
<summary><code>RefactorExtract: <a href="#codeactionkind">CodeActionKind</a></code></summary>

Base kind for refactoring extraction actions: `refactor.extract`

Example extract actions:

- Extract method
- Extract function
- Extract variable
- Extract interface from class
- ...

**只读**: 是

</details>

<div id="codeactionkind-refactorinline"></div>

<details>
<summary><code>RefactorInline: <a href="#codeactionkind">CodeActionKind</a></code></summary>

Base kind for refactoring inline actions: `refactor.inline`

Example inline actions:

- Inline function
- Inline variable
- Inline constant
- ...

**只读**: 是

</details>

<div id="codeactionkind-refactormove"></div>

<details>
<summary><code>RefactorMove: <a href="#codeactionkind">CodeActionKind</a></code></summary>

Base kind for refactoring inline actions: `refactor.move`

Example move actions:

- Move a function to a new file
- Move a property between classes
- Move method to base class

**只读**: 是

</details>

<div id="codeactionkind-refactorrewrite"></div>

<details>
<summary><code>RefactorRewrite: <a href="#codeactionkind">CodeActionKind</a></code></summary>

Base kind for refactoring rewrite actions: `refactor.rewrite`

Example rewrite actions:

- Convert JavaScript function to class
- Add or remove parameter
- Encapsulate field
- Make method static
- Move method to base class
- ...

**只读**: 是

</details>

<div id="codeactionkind-source"></div>

<details>
<summary><code>Source: <a href="#codeactionkind">CodeActionKind</a></code></summary>

Base kind for source actions: `source`

Source code actions apply to the entire file and can be run on save
using `editor.codeActionsOnSave`. They also are shown in `source` context menu.

**只读**: 是

</details>

<div id="codeactionkind-sourceorganizeimports"></div>

<details>
<summary><code>SourceOrganizeImports: <a href="#codeactionkind">CodeActionKind</a></code></summary>

Base kind for an organize imports source action: `source.organizeImports`.

**只读**: 是

</details>

<div id="codeactionkind-sourcefixall"></div>

<details>
<summary><code>SourceFixAll: <a href="#codeactionkind">CodeActionKind</a></code></summary>

Base kind for auto-fix source actions: `source.fixAll`.

Fix all actions automatically fix errors that have a clear fix that do not require user input.
They should not suppress errors or perform unsafe fixes such as generating new types or classes.

**只读**: 是

</details>

<div id="codeactionkind-notebook"></div>

<details>
<summary><code>Notebook: <a href="#codeactionkind">CodeActionKind</a></code></summary>

Base kind for all code actions applying to the entire notebook's scope. CodeActionKinds using
this should always begin with `notebook.`

This requires that new CodeActions be created for it and contributed via extensions.
Pre-existing kinds can not just have the new `notebook.` prefix added to them, as the functionality
is unique to the full-notebook scope.

Notebook CodeActionKinds can be initialized as either of the following (both resulting in `notebook.source.xyz`):
- `const newKind =  CodeActionKind.Notebook.append(CodeActionKind.Source.append('xyz').value)`
- `const newKind =  CodeActionKind.Notebook.append('source.xyz')`

Example Kinds/Actions:
- `notebook.source.organizeImports` (might move all imports to a new top cell)
- `notebook.source.normalizeVariableNames` (might rename all variables to a standardized casing format)

**只读**: 是

</details>

<div id="codeactionkind-value"></div>

<details>
<summary><code>value: string</code></summary>

String value of the kind, e.g. `"refactor.extract.function"`.

**只读**: 是

</details>

##### Methods

<div id="codeactionkind-append"></div>

<details>
<summary><code>append(parts: string): CodeActionKind;</code></summary>

Create a new kind by appending a more specific selector to the current kind.

Does not modify the current kind.

</details>

<div id="codeactionkind-contains"></div>

<details>
<summary><code>contains(other: CodeActionKind): boolean;</code></summary>

Does this kind contain `other`?

The kind `"refactor"` for example contains `"refactor.extract"` and ``"refactor.extract.function"`, but not `"unicorn.refactor.extract"` or `"refactory.extract"`

</details>

<div id="codeactionkind-intersects"></div>

<details>
<summary><code>intersects(other: CodeActionKind): boolean;</code></summary>

Check if this code action kind intersects `other`.
The kind "refactor.extract" for example intersects refactor, "refactor.extract" and
`"refactor.extract.function", but not "unicorn.refactor.extract", or "refactor.extractAll".

</details>

---

#### CodeLens {#codelens}

A code lens represents a <a href="#command">command</a> that should be shown along with
source text, like the number of references, a way to run tests, etc.

A code lens is _unresolved_ when no command is associated to it. For performance
reasons the creation of a code lens and resolving should be done to two stages.

##### Constructors

<details>
<summary><code>constructor(range: Range, command?: Command);</code></summary>

Creates a new code lens object.

</details>

##### Properties

<div id="codelens-range"></div>

<details>
<summary><code>range: <a href="#range">Range</a></code></summary>

The range in which this code lens is valid. Should only span a single line.

</details>

<div id="codelens-command"></div>

<details>
<summary><code>command: <a href="#command">Command</a></code></summary>

The command this code lens represents.

</details>

<div id="codelens-isresolved"></div>

<details>
<summary><code>isResolved: boolean</code></summary>

`true` when there is a command associated.

**只读**: 是

</details>

---

#### Color {#color}

Represents a color in RGBA space.

##### Constructors

<details>
<summary><code>constructor(red: number, green: number, blue: number, alpha: number);</code></summary>

Creates a new color instance.

</details>

##### Properties

<div id="color-red"></div>

<details>
<summary><code>red: number</code></summary>

The red component of this color in the range [0-1].

**只读**: 是

</details>

<div id="color-green"></div>

<details>
<summary><code>green: number</code></summary>

The green component of this color in the range [0-1].

**只读**: 是

</details>

<div id="color-blue"></div>

<details>
<summary><code>blue: number</code></summary>

The blue component of this color in the range [0-1].

**只读**: 是

</details>

<div id="color-alpha"></div>

<details>
<summary><code>alpha: number</code></summary>

The alpha component of this color in the range [0-1].

**只读**: 是

</details>

---

#### ColorInformation {#colorinformation}

Represents a color range from a document.

##### Constructors

<details>
<summary><code>constructor(range: Range, color: Color);</code></summary>

Creates a new color range.

</details>

##### Properties

<div id="colorinformation-range"></div>

<details>
<summary><code>range: <a href="#range">Range</a></code></summary>

The range in the document where this color appears.

</details>

<div id="colorinformation-color"></div>

<details>
<summary><code>color: <a href="#color">Color</a></code></summary>

The actual color value for this color range.

</details>

---

#### ColorPresentation {#colorpresentation}

A color presentation object describes how a [`color`](#Color) should be represented as text and what
edits are required to refer to it from source code.

For some languages one color can have multiple presentations, e.g. css can represent the color red with
the constant `Red`, the hex-value `#ff0000`, or in rgba and hsla forms. In csharp other representations
apply, e.g `System.Drawing.Color.Red`.

##### Constructors

<details>
<summary><code>constructor(label: string);</code></summary>

Creates a new color presentation.

</details>

##### Properties

<div id="colorpresentation-label"></div>

<details>
<summary><code>label: string</code></summary>

The label of this color presentation. It will be shown on the color
picker header. By default this is also the text that is inserted when selecting
this color presentation.

</details>

<div id="colorpresentation-textedit"></div>

<details>
<summary><code>textEdit: <a href="#textedit">TextEdit</a></code></summary>

An <a href="#textedit">edit</a> which is applied to a document when selecting
this presentation for the color.  When `falsy` the label
is used.

</details>

<div id="colorpresentation-additionaltextedits"></div>

<details>
<summary><code>additionalTextEdits: <a href="#textedit">TextEdit</a>[]</code></summary>

An optional array of additional <a href="#textedit">text edits</a> that are applied when
selecting this color presentation. Edits must not overlap with the main edit nor with themselves.

</details>

---

#### CompletionItem {#completionitem}

A completion item represents a text snippet that is proposed to complete text that is being typed.

It is sufficient to create a completion item from just a label. In that
case the completion item will replace the word
until the cursor with the given label or insertText. Otherwise the
the given edit is used.

When selecting a completion item in the editor its defined or synthesized text edit will be applied
to *all* cursors/selections whereas additionalTextEdits will be
applied as provided.

##### Constructors

<details>
<summary><code>constructor(label: string | CompletionItemLabel, kind?: CompletionItemKind);</code></summary>

Creates a new completion item.

Completion items must have at least a label which then
will be used as insert text as well as for sorting and filtering.

</details>

##### Properties

<div id="completionitem-label"></div>

<details>
<summary><code>label: string | <a href="#completionitemlabel">CompletionItemLabel</a></code></summary>

The label of this completion item. By default
this is also the text that is inserted when selecting
this completion.

</details>

<div id="completionitem-kind"></div>

<details>
<summary><code>kind: <a href="#completionitemkind">CompletionItemKind</a></code></summary>

The kind of this completion item. Based on the kind
an icon is chosen by the editor.

</details>

<div id="completionitem-detail"></div>

<details>
<summary><code>detail: string</code></summary>

A human-readable string with additional information
about this item, like type or symbol information.

</details>

<div id="completionitem-tags"></div>

<details>
<summary><code>tags: ReadonlyArray&lt;<a href="#completionitemtag">CompletionItemTag</a>&gt;</code></summary>

Tags for this completion item.

</details>

<div id="completionitem-documentation"></div>

<details>
<summary><code>documentation: string | <a href="#markdownstring">MarkdownString</a></code></summary>

A human-readable string that represents a doc-comment.

</details>

<div id="completionitem-sorttext"></div>

<details>
<summary><code>sortText: string</code></summary>

A string that should be used when comparing this item
with other items. When `falsy` the label
is used.

</details>

<div id="completionitem-filtertext"></div>

<details>
<summary><code>filterText: string</code></summary>

A string that should be used when filtering a set of
completion items. When `falsy` the label
is used.

</details>

<div id="completionitem-preselect"></div>

<details>
<summary><code>preselect: boolean</code></summary>

Select this item when showing. *Note* that only one completion item can be selected and
that the editor decides which item that is. The rule is that the *first* item of those
that match best is selected.

</details>

<div id="completionitem-inserttext"></div>

<details>
<summary><code>insertText: string | <a href="#snippetstring">SnippetString</a></code></summary>

A string or snippet that should be inserted in a document when selecting
this completion. When `falsy` the label
is used.

</details>

<div id="completionitem-range"></div>

<details>
<summary><code>range: <a href="#range">Range</a> | &#123; inserting: <a href="#range">Range</a>; replacing: <a href="#range">Range</a>; &#125;</code></summary>

A range or a insert and replace range selecting the text that should be replaced by this completion item.

When omitted, the range of the current word is used as replace-range
and as insert-range the start of the current word to the
current position is used.

*Note 1:* A range must be a single line and it must
contain the position at which completion has been requested.
*Note 2:* A insert range must be a prefix of a replace range, that means it must be contained and starting at the same position.

</details>

<div id="completionitem-commitcharacters"></div>

<details>
<summary><code>commitCharacters: string[]</code></summary>

An optional set of characters that when pressed while this completion is active will accept it first and
then type that character. *Note* that all commit characters should have `length=1` and that superfluous
characters will be ignored.

</details>

<div id="completionitem-keepwhitespace"></div>

<details>
<summary><code>keepWhitespace: boolean</code></summary>

Keep whitespace of the insertText as is. By default, the editor adjusts leading
whitespace of new lines so that they match the indentation of the line for which the item is accepted - setting
this to `true` will prevent that.

</details>

<div id="completionitem-additionaltextedits"></div>

<details>
<summary><code>additionalTextEdits: <a href="#textedit">TextEdit</a>[]</code></summary>

An optional array of additional <a href="#textedit">text edits</a> that are applied when
selecting this completion. Edits must not overlap with the main edit
nor with themselves.

</details>

<div id="completionitem-command"></div>

<details>
<summary><code>command: <a href="#command">Command</a></code></summary>

An optional <a href="#command">command</a> that is executed *after* inserting this completion. *Note* that
additional modifications to the current document should be described with the
additionalTextEdits-property.

</details>

<div id="completionitem-textedit"></div>

<details>
<summary><code>textEdit: <a href="#textedit">TextEdit</a></code></summary>

</details>

<div id="completionitem-deprecated"></div>

<details>
<summary><code>deprecated: boolean</code></summary>

</details>

---

#### CompletionList {#completionlist}

Represents a collection of <a href="#completionitem">completion items</a> to be presented
in the editor.

##### Constructors

<details>
<summary><code>constructor(items?: T[], isIncomplete?: boolean);</code></summary>

Creates a new completion list.

</details>

##### Properties

<div id="completionlist-isincomplete"></div>

<details>
<summary><code>isIncomplete: boolean</code></summary>

This list is not complete. Further typing should result in recomputing
this list.

</details>

<div id="completionlist-items"></div>

<details>
<summary><code>items: T[]</code></summary>

The completion items.

</details>

---

#### CustomExecution {#customexecution}

Class used to execute an extension callback as a task.

##### Constructors

<details>
<summary><code>constructor(callback: (resolvedDefinition: TaskDefinition) =&gt; Thenable&lt;Pseudoterminal&gt;);</code></summary>

Constructs a CustomExecution task object. The callback will be executed when the task is run, at which point the
extension should return the Pseudoterminal it will "run in". The task should wait to do further execution until
[Pseudoterminal.open](#Pseudoterminal.open) is called. Task cancellation should be handled using
[Pseudoterminal.close](#Pseudoterminal.close). When the task is complete fire
[Pseudoterminal.onDidClose](#Pseudoterminal.onDidClose).

</details>

---

#### DataTransfer {#datatransfer}

A map containing a mapping of the mime type of the corresponding transferred data.

Drag and drop controllers that implement `handleDrag` can add additional mime types to the
data transfer. These additional mime types will only be included in the `handleDrop` when the the drag was initiated from
an element in the same drag and drop controller.

##### Methods

<div id="datatransfer-get"></div>

<details>
<summary><code>get(mimeType: string): DataTransferItem | undefined;</code></summary>

Retrieves the data transfer item for a given mime type.

</details>

<div id="datatransfer-set"></div>

<details>
<summary><code>set(mimeType: string, value: DataTransferItem): void;</code></summary>

Sets a mime type to data transfer item mapping.

</details>

<div id="datatransfer-foreach"></div>

<details>
<summary><code>forEach(callbackfn: (item: DataTransferItem, mimeType: string, dataTransfer: DataTransfer) =&gt; void, thisArg?: any): void;</code></summary>

Allows iteration through the data transfer items.

</details>

<div id="datatransfer-[symbol.iterator]"></div>

<details>
<summary><code>[Symbol.iterator](): IterableIterator&lt;[mimeType: string, item: DataTransferItem]&gt;;</code></summary>

Get a new iterator with the `[mime, item]` pairs for each element in this data transfer.

</details>

---

#### DataTransfer {#datatransfer}

A map containing a mapping of the mime type of the corresponding transferred data.

Drag and drop controllers that implement `handleDrag` can add additional mime types to the
data transfer. These additional mime types will only be included in the `handleDrop` when the the drag was initiated from
an element in the same drag and drop controller.

##### Methods

<div id="datatransfer-get"></div>

<details>
<summary><code>get(mimeType: string): DataTransferItem | undefined;</code></summary>

Retrieves the data transfer item for a given mime type.

</details>

<div id="datatransfer-set"></div>

<details>
<summary><code>set(mimeType: string, value: DataTransferItem): void;</code></summary>

Sets a mime type to data transfer item mapping.

</details>

<div id="datatransfer-foreach"></div>

<details>
<summary><code>forEach(callbackfn: (item: DataTransferItem, mimeType: string, dataTransfer: DataTransfer) =&gt; void, thisArg?: any): void;</code></summary>

Allows iteration through the data transfer items.

</details>

<div id="datatransfer-[symbol.iterator]"></div>

<details>
<summary><code>[Symbol.iterator](): IterableIterator&lt;[mimeType: string, item: DataTransferItem]&gt;;</code></summary>

Get a new iterator with the `[mime, item]` pairs for each element in this data transfer.

</details>

---

#### DataTransferItem {#datatransferitem}

Encapsulates data transferred during drag and drop operations.

##### Constructors

<details>
<summary><code>constructor(value: any);</code></summary>

</details>

##### Properties

<div id="datatransferitem-value"></div>

<details>
<summary><code>value: any</code></summary>

Custom data stored on this item.

You can use `value` to share data across operations. The original object can be retrieved so long as the extension that
created the `DataTransferItem` runs in the same extension host.

**只读**: 是

</details>

##### Methods

<div id="datatransferitem-asstring"></div>

<details>
<summary><code>asString(): Thenable&lt;string&gt;;</code></summary>

Get a string representation of this item.

If value is an object, this returns the result of json stringifying value value.

</details>

<div id="datatransferitem-asfile"></div>

<details>
<summary><code>asFile(): DataTransferFile | undefined;</code></summary>

Try getting the <a href="#datatransferfile">file</a> associated with this data transfer item.

Note that the file object is only valid for the scope of the drag and drop operation.

</details>

---

#### DataTransferItem {#datatransferitem}

Encapsulates data transferred during drag and drop operations.

##### Constructors

<details>
<summary><code>constructor(value: any);</code></summary>

</details>

##### Properties

<div id="datatransferitem-value"></div>

<details>
<summary><code>value: any</code></summary>

Custom data stored on this item.

You can use `value` to share data across operations. The original object can be retrieved so long as the extension that
created the `DataTransferItem` runs in the same extension host.

**只读**: 是

</details>

##### Methods

<div id="datatransferitem-asstring"></div>

<details>
<summary><code>asString(): Thenable&lt;string&gt;;</code></summary>

Get a string representation of this item.

If value is an object, this returns the result of json stringifying value value.

</details>

<div id="datatransferitem-asfile"></div>

<details>
<summary><code>asFile(): DataTransferFile | undefined;</code></summary>

Try getting the <a href="#datatransferfile">file</a> associated with this data transfer item.

Note that the file object is only valid for the scope of the drag and drop operation.

</details>

---

#### DebugAdapterExecutable {#debugadapterexecutable}

Represents a debug adapter executable and optional arguments and runtime options passed to it.

##### Constructors

<details>
<summary><code>constructor(command: string, args?: string[], options?: DebugAdapterExecutableOptions);</code></summary>

Creates a description for a debug adapter based on an executable program.

</details>

##### Properties

<div id="debugadapterexecutable-command"></div>

<details>
<summary><code>command: string</code></summary>

The command or path of the debug adapter executable.
A command must be either an absolute path of an executable or the name of an command to be looked up via the PATH environment variable.
The special value 'node' will be mapped to VS Code's built-in Node.js runtime.

**只读**: 是

</details>

<div id="debugadapterexecutable-args"></div>

<details>
<summary><code>args: string[]</code></summary>

The arguments passed to the debug adapter executable. Defaults to an empty array.

**只读**: 是

</details>

<div id="debugadapterexecutable-options"></div>

<details>
<summary><code>options: <a href="#debugadapterexecutableoptions">DebugAdapterExecutableOptions</a></code></summary>

Optional options to be used when the debug adapter is started.
Defaults to undefined.

**只读**: 是

</details>

---

#### DebugAdapterInlineImplementation {#debugadapterinlineimplementation}

A debug adapter descriptor for an inline implementation.

##### Constructors

<details>
<summary><code>constructor(implementation: DebugAdapter);</code></summary>

Create a descriptor for an inline implementation of a debug adapter.

</details>

---

#### DebugAdapterNamedPipeServer {#debugadapternamedpipeserver}

Represents a debug adapter running as a Named Pipe (on Windows)/UNIX Domain Socket (on non-Windows) based server.

##### Constructors

<details>
<summary><code>constructor(path: string);</code></summary>

Create a description for a debug adapter running as a Named Pipe (on Windows)/UNIX Domain Socket (on non-Windows) based server.

</details>

##### Properties

<div id="debugadapternamedpipeserver-path"></div>

<details>
<summary><code>path: string</code></summary>

The path to the NamedPipe/UNIX Domain Socket.

**只读**: 是

</details>

---

#### DebugAdapterServer {#debugadapterserver}

Represents a debug adapter running as a socket based server.

##### Constructors

<details>
<summary><code>constructor(port: number, host?: string);</code></summary>

Create a description for a debug adapter running as a socket based server.

</details>

##### Properties

<div id="debugadapterserver-port"></div>

<details>
<summary><code>port: number</code></summary>

The port.

**只读**: 是

</details>

<div id="debugadapterserver-host"></div>

<details>
<summary><code>host: string</code></summary>

The host.

**只读**: 是

</details>

---

#### DebugStackFrame {#debugstackframe}

Represents a stack frame in a debug session.

##### Constructors

<details>
<summary><code>private constructor(session: DebugSession, threadId: number, frameId: number);</code></summary>

</details>

##### Properties

<div id="debugstackframe-session"></div>

<details>
<summary><code>session: <a href="#debugsession">DebugSession</a></code></summary>

Debug session for thread.

**只读**: 是

</details>

<div id="debugstackframe-threadid"></div>

<details>
<summary><code>threadId: number</code></summary>

ID of the associated thread in the debug protocol.

**只读**: 是

</details>

<div id="debugstackframe-frameid"></div>

<details>
<summary><code>frameId: number</code></summary>

ID of the stack frame in the debug protocol.

**只读**: 是

</details>

---

#### DebugThread {#debugthread}

Represents a thread in a debug session.

##### Constructors

<details>
<summary><code>private constructor(session: DebugSession, threadId: number);</code></summary>

</details>

##### Properties

<div id="debugthread-session"></div>

<details>
<summary><code>session: <a href="#debugsession">DebugSession</a></code></summary>

Debug session for thread.

**只读**: 是

</details>

<div id="debugthread-threadid"></div>

<details>
<summary><code>threadId: number</code></summary>

ID of the associated thread in the debug protocol.

**只读**: 是

</details>

---

#### DebugVisualization {#debugvisualization}

##### Constructors

<details>
<summary><code>constructor(name: string);</code></summary>

Creates a new debug visualization object.

</details>

##### Properties

<div id="debugvisualization-name"></div>

<details>
<summary><code>name: string</code></summary>

The name of the visualization to show to the user.

</details>

<div id="debugvisualization-iconpath"></div>

<details>
<summary><code>iconPath: <a href="#uri">Uri</a> | &#123; light: <a href="#uri">Uri</a>; dark: <a href="#uri">Uri</a> &#125; | <a href="#themeicon">ThemeIcon</a></code></summary>

An icon for the view when it's show in inline actions.

</details>

<div id="debugvisualization-visualization"></div>

<details>
<summary><code>visualization: <a href="#command">Command</a> | &#123; treeId: string &#125;</code></summary>

Visualization to use for the variable. This may be either:
- A command to run when the visualization is selected for a variable.
- A reference to a previously-registered <a href="#debugvisualizationtree">DebugVisualizationTree</a>

</details>

---

#### DeclarationCoverage {#declarationcoverage}

Contains coverage information for a declaration. Depending on the reporter
and language, this may be types such as functions, methods, or namespaces.

##### Constructors

<details>
<summary><code>constructor(name: string, executed: number | boolean, location: Position | Range);</code></summary>

</details>

##### Properties

<div id="declarationcoverage-name"></div>

<details>
<summary><code>name: string</code></summary>

Name of the declaration.

</details>

<div id="declarationcoverage-executed"></div>

<details>
<summary><code>executed: number | boolean</code></summary>

The number of times this declaration was executed, or a boolean
indicating whether it was executed if the exact count is unknown. If
zero or false, the declaration will be marked as un-covered.

</details>

<div id="declarationcoverage-location"></div>

<details>
<summary><code>location: <a href="#position">Position</a> | <a href="#range">Range</a></code></summary>

Declaration location.

</details>

---

#### Diagnostic {#diagnostic}

Represents a diagnostic, such as a compiler error or warning. Diagnostic objects
are only valid in the scope of a file.

##### Constructors

<details>
<summary><code>constructor(range: Range, message: string, severity?: DiagnosticSeverity);</code></summary>

Creates a new diagnostic object.

</details>

##### Properties

<div id="diagnostic-range"></div>

<details>
<summary><code>range: <a href="#range">Range</a></code></summary>

The range to which this diagnostic applies.

</details>

<div id="diagnostic-message"></div>

<details>
<summary><code>message: string</code></summary>

The human-readable message.

</details>

<div id="diagnostic-severity"></div>

<details>
<summary><code>severity: <a href="#diagnosticseverity">DiagnosticSeverity</a></code></summary>

The severity, default is error.

</details>

<div id="diagnostic-source"></div>

<details>
<summary><code>source: string</code></summary>

A human-readable string describing the source of this
diagnostic, e.g. 'typescript' or 'super lint'.

</details>

<div id="diagnostic-code"></div>

<details>
<summary><code>code: string | number | &#123; value: string | number; target: <a href="#uri">Uri</a>; &#125;</code></summary>

A code or identifier for this diagnostic.
Should be used for later processing, e.g. when providing <a href="#codeactioncontext">code actions</a>.

</details>

<div id="diagnostic-relatedinformation"></div>

<details>
<summary><code>relatedInformation: <a href="#diagnosticrelatedinformation">DiagnosticRelatedInformation</a>[]</code></summary>

An array of related diagnostic information, e.g. when symbol-names within
a scope collide all definitions can be marked via this property.

</details>

<div id="diagnostic-tags"></div>

<details>
<summary><code>tags: <a href="#diagnostictag">DiagnosticTag</a>[]</code></summary>

Additional metadata about the diagnostic.

</details>

<div id="diagnostic-id"></div>

<details>
<summary><code>id: string</code></summary>

</details>

<div id="diagnostic-graphtitle"></div>

<details>
<summary><code>graphTitle: string</code></summary>

</details>

---

#### DiagnosticRelatedInformation {#diagnosticrelatedinformation}

Represents a related message and source code location for a diagnostic. This should be
used to point to code locations that cause or related to a diagnostics, e.g when duplicating
a symbol in a scope.

##### Constructors

<details>
<summary><code>constructor(location: Location, message: string);</code></summary>

Creates a new related diagnostic information object.

</details>

##### Properties

<div id="diagnosticrelatedinformation-location"></div>

<details>
<summary><code>location: <a href="#location">Location</a></code></summary>

The location of this related diagnostic information.

</details>

<div id="diagnosticrelatedinformation-message"></div>

<details>
<summary><code>message: string</code></summary>

The message of this related diagnostic information.

</details>

---

#### Disposable {#disposable}

##### Constructors

<details>
<summary><code>constructor(func: () =&gt; void);</code></summary>

</details>

<details>
<summary><code>constructor(callOnDispose: Function);</code></summary>

Creates a new Disposable calling the provided function
on dispose.

</details>

##### Methods

<div id="disposable-dispose"></div>

<details>
<summary><code>dispose(): void;</code></summary>

Dispose this object.

</details>

<div id="disposable-create"></div>

<details>
<summary><code>static create(func: () =&gt; void): Disposable;</code></summary>

</details>

<div id="disposable-from"></div>

<details>
<summary><code>static from(...disposableLikes: &#123; dispose: () =&gt; any &#125;[]): Disposable;</code></summary>

Combine many disposable-likes into one. Use this method
when having objects with a dispose function which are not
instances of Disposable.

</details>

---

#### DocumentDropEdit {#documentdropedit}

An edit operation applied <a href="#documentdropeditprovider">on drop</a>.

##### Constructors

<details>
<summary><code>constructor(insertText: string | SnippetString);</code></summary>

</details>

##### Properties

<div id="documentdropedit-inserttext"></div>

<details>
<summary><code>insertText: string | <a href="#snippetstring">SnippetString</a></code></summary>

The text or snippet to insert at the drop location.

</details>

<div id="documentdropedit-additionaledit"></div>

<details>
<summary><code>additionalEdit: <a href="#workspaceedit">WorkspaceEdit</a></code></summary>

An optional additional edit to apply on drop.

</details>

---

#### DocumentHighlight {#documenthighlight}

A document highlight is a range inside a text document which deserves
special attention. Usually a document highlight is visualized by changing
the background color of its range.

##### Constructors

<details>
<summary><code>constructor(range: Range, kind?: DocumentHighlightKind);</code></summary>

Creates a new document highlight object.

</details>

##### Properties

<div id="documenthighlight-range"></div>

<details>
<summary><code>range: <a href="#range">Range</a></code></summary>

The range this highlight applies to.

</details>

<div id="documenthighlight-kind"></div>

<details>
<summary><code>kind: <a href="#documenthighlightkind">DocumentHighlightKind</a></code></summary>

The highlight kind, default is text.

</details>

---

#### DocumentLink {#documentlink}

A document link is a range in a text document that links to an internal or external resource, like another
text document or a web site.

##### Constructors

<details>
<summary><code>constructor(range: Range, target?: Uri);</code></summary>

Creates a new document link.

</details>

##### Properties

<div id="documentlink-range"></div>

<details>
<summary><code>range: <a href="#range">Range</a></code></summary>

The range this link applies to.

</details>

<div id="documentlink-target"></div>

<details>
<summary><code>target: <a href="#uri">Uri</a></code></summary>

The uri this link points to.

</details>

<div id="documentlink-tooltip"></div>

<details>
<summary><code>tooltip: string</code></summary>

The tooltip text when you hover over this link.

If a tooltip is provided, is will be displayed in a string that includes instructions on how to
trigger the link, such as `&#123;0&#125; (ctrl + click)`. The specific instructions vary depending on OS,
user settings, and localization.

</details>

---

#### DocumentSymbol {#documentsymbol}

Represents programming constructs like variables, classes, interfaces etc. that appear in a document. Document
symbols can be hierarchical and they have two ranges: one that encloses its definition and one that points to
its most interesting range, e.g. the range of an identifier.

##### Constructors

<details>
<summary><code>constructor(name: string, detail: string, kind: SymbolKind, range: Range, selectionRange: Range);</code></summary>

Creates a new document symbol.

</details>

##### Properties

<div id="documentsymbol-name"></div>

<details>
<summary><code>name: string</code></summary>

The name of this symbol.

</details>

<div id="documentsymbol-detail"></div>

<details>
<summary><code>detail: string</code></summary>

More detail for this symbol, e.g the signature of a function.

</details>

<div id="documentsymbol-kind"></div>

<details>
<summary><code>kind: <a href="#symbolkind">SymbolKind</a></code></summary>

The kind of this symbol.

</details>

<div id="documentsymbol-tags"></div>

<details>
<summary><code>tags: ReadonlyArray&lt;<a href="#symboltag">SymbolTag</a>&gt;</code></summary>

</details>

<div id="documentsymbol-range"></div>

<details>
<summary><code>range: <a href="#range">Range</a></code></summary>

The range enclosing this symbol not including leading/trailing whitespace but everything else, e.g comments and code.

</details>

<div id="documentsymbol-selectionrange"></div>

<details>
<summary><code>selectionRange: <a href="#range">Range</a></code></summary>

The range that should be selected and reveal when this symbol is being picked, e.g the name of a function.
Must be contained by the [`range`](#DocumentSymbol.range).

</details>

<div id="documentsymbol-children"></div>

<details>
<summary><code>children: <a href="#documentsymbol">DocumentSymbol</a>[]</code></summary>

Children of this symbol, e.g. properties of a class.

</details>

---

#### EvaluatableExpression {#evaluatableexpression}

An EvaluatableExpression represents an expression in a document that can be evaluated by an active debugger or runtime.
The result of this evaluation is shown in a tooltip-like widget.
If only a range is specified, the expression will be extracted from the underlying document.
An optional expression can be used to override the extracted expression.
In this case the range is still used to highlight the range in the document.

##### Constructors

<details>
<summary><code>constructor(range: Range, expression?: string);</code></summary>

Creates a new evaluatable expression object.

</details>

##### Properties

<div id="evaluatableexpression-range"></div>

<details>
<summary><code>range: <a href="#range">Range</a></code></summary>

**只读**: 是

</details>

<div id="evaluatableexpression-expression"></div>

<details>
<summary><code>expression: string | undefined</code></summary>

**只读**: 是

</details>

---

#### EventEmitter {#eventemitter}

An event emitter used to create and fire an <a href="#event">event</a> or to subscribe to.

##### Properties

<div id="eventemitter-event"></div>

<details>
<summary><code>event: <a href="#event">Event</a>&lt;T&gt;</code></summary>

The event listeners can subscribe to

</details>

##### Methods

<div id="eventemitter-fire"></div>

<details>
<summary><code>fire(data: T): void;</code></summary>

Fire the event and pass data object

</details>

<div id="eventemitter-dispose"></div>

<details>
<summary><code>dispose(): void;</code></summary>

Dispose this object

</details>

---

#### FileCoverage {#filecoverage}

Contains coverage metadata for a file.

##### Constructors

<details>
<summary><code>constructor( uri: Uri, statementCoverage: TestCoverageCount, branchCoverage?: TestCoverageCount, declarationCoverage?: TestCoverageCount, includesTests?: TestItem[], );</code></summary>

</details>

##### Properties

<div id="filecoverage-uri"></div>

<details>
<summary><code>uri: <a href="#uri">Uri</a></code></summary>

File URI.

**只读**: 是

</details>

<div id="filecoverage-statementcoverage"></div>

<details>
<summary><code>statementCoverage: <a href="#testcoveragecount">TestCoverageCount</a></code></summary>

Statement coverage information. If the reporter does not provide statement
coverage information, this can instead be used to represent line coverage.

</details>

<div id="filecoverage-branchcoverage"></div>

<details>
<summary><code>branchCoverage: <a href="#testcoveragecount">TestCoverageCount</a></code></summary>

Branch coverage information.

</details>

<div id="filecoverage-declarationcoverage"></div>

<details>
<summary><code>declarationCoverage: <a href="#testcoveragecount">TestCoverageCount</a></code></summary>

Declaration coverage information. Depending on the reporter and
language, this may be types such as functions, methods, or namespaces.

</details>

<div id="filecoverage-includestests"></div>

<details>
<summary><code>includesTests: <a href="#testitem">TestItem</a>[]</code></summary>

A list of <a href="#testitem">test cases</a> that generated coverage in this
file. If set, then loadDetailedCoverageForTest
should also be defined in order to retrieve detailed coverage information.

</details>

##### Methods

<div id="filecoverage-fromdetails"></div>

<details>
<summary><code>static fromDetails(uri: Uri, details: readonly FileCoverageDetail[]): FileCoverage;</code></summary>

Creates a <a href="#filecoverage">FileCoverage</a> instance with counts filled in from
the coverage details.

</details>

---

#### FileDecoration {#filedecoration}

A file decoration represents metadata that can be rendered with a file.

##### Constructors

<details>
<summary><code>constructor(badge?: string, tooltip?: string, color?: ThemeColor);</code></summary>

Creates a new decoration.

</details>

##### Properties

<div id="filedecoration-badge"></div>

<details>
<summary><code>badge: string</code></summary>

A very short string that represents this decoration.

</details>

<div id="filedecoration-tooltip"></div>

<details>
<summary><code>tooltip: string</code></summary>

A human-readable tooltip for this decoration.

</details>

<div id="filedecoration-color"></div>

<details>
<summary><code>color: <a href="#themecolor">ThemeColor</a></code></summary>

The color of this decoration.

</details>

<div id="filedecoration-propagate"></div>

<details>
<summary><code>propagate: boolean</code></summary>

A flag expressing that this decoration should be
propagated to its parents.

</details>

---

#### FileSystemError {#filesystemerror}

A type that filesystem providers should use to signal errors.

This class has factory methods for common error-cases, like `FileNotFound` when
a file or folder doesn't exist, use them like so: `throw vscode.FileSystemError.FileNotFound(someUri);`

##### Constructors

<details>
<summary><code>constructor(messageOrUri?: string | Uri);</code></summary>

Creates a new filesystem error.

</details>

##### Properties

<div id="filesystemerror-code"></div>

<details>
<summary><code>code: string</code></summary>

A code that identifies this error.

Possible values are names of errors, like [`FileNotFound`](#FileSystemError.FileNotFound),
or `Unknown` for unspecified errors.

**只读**: 是

</details>

##### Methods

<div id="filesystemerror-filenotfound"></div>

<details>
<summary><code>static FileNotFound(messageOrUri?: string | Uri): FileSystemError;</code></summary>

Create an error to signal that a file or folder wasn't found.

</details>

<div id="filesystemerror-fileexists"></div>

<details>
<summary><code>static FileExists(messageOrUri?: string | Uri): FileSystemError;</code></summary>

Create an error to signal that a file or folder already exists, e.g. when
creating but not overwriting a file.

</details>

<div id="filesystemerror-filenotadirectory"></div>

<details>
<summary><code>static FileNotADirectory(messageOrUri?: string | Uri): FileSystemError;</code></summary>

Create an error to signal that a file is not a folder.

</details>

<div id="filesystemerror-fileisadirectory"></div>

<details>
<summary><code>static FileIsADirectory(messageOrUri?: string | Uri): FileSystemError;</code></summary>

Create an error to signal that a file is a folder.

</details>

<div id="filesystemerror-nopermissions"></div>

<details>
<summary><code>static NoPermissions(messageOrUri?: string | Uri): FileSystemError;</code></summary>

Create an error to signal that an operation lacks required permissions.

</details>

<div id="filesystemerror-unavailable"></div>

<details>
<summary><code>static Unavailable(messageOrUri?: string | Uri): FileSystemError;</code></summary>

Create an error to signal that the file system is unavailable or too busy to
complete a request.

</details>

---

#### FoldingRange {#foldingrange}

A line based folding range. To be valid, start and end line must a zero or larger and smaller than the number of lines in the document.
Invalid ranges will be ignored.

##### Constructors

<details>
<summary><code>constructor(start: number, end: number, kind?: FoldingRangeKind);</code></summary>

Creates a new folding range.

</details>

##### Properties

<div id="foldingrange-start"></div>

<details>
<summary><code>start: number</code></summary>

The zero-based start line of the range to fold. The folded area starts after the line's last character.
To be valid, the end must be zero or larger and smaller than the number of lines in the document.

</details>

<div id="foldingrange-end"></div>

<details>
<summary><code>end: number</code></summary>

The zero-based end line of the range to fold. The folded area ends with the line's last character.
To be valid, the end must be zero or larger and smaller than the number of lines in the document.

</details>

<div id="foldingrange-kind"></div>

<details>
<summary><code>kind: <a href="#foldingrangekind">FoldingRangeKind</a></code></summary>

Describes the <a href="#foldingrangekind">Kind</a> of the folding range such as Comment or
Region. The kind is used to categorize folding ranges and used by commands
like 'Fold all comments'. See
<a href="#foldingrangekind">FoldingRangeKind</a> for an enumeration of all kinds.
If not set, the range is originated from a syntax element.

</details>

---

#### FunctionBreakpoint {#functionbreakpoint}

A breakpoint specified by a function name.

##### Constructors

<details>
<summary><code>constructor(functionName: string, enabled?: boolean, condition?: string, hitCondition?: string, logMessage?: string);</code></summary>

Create a new function breakpoint.

</details>

##### Properties

<div id="functionbreakpoint-functionname"></div>

<details>
<summary><code>functionName: string</code></summary>

The name of the function to which this breakpoint is attached.

**只读**: 是

</details>

---

#### GlobalSelection {#globalselection}

##### Properties

<div id="globalselection-data"></div>

<details>
<summary><code>data: Object</code></summary>

</details>

<div id="globalselection-type"></div>

<details>
<summary><code>type: <a href="#selectiontype">SelectionType</a></code></summary>

</details>

<div id="globalselection-position"></div>

<details>
<summary><code>position: any</code></summary>

</details>

<div id="globalselection-probleminfo"></div>

<details>
<summary><code>problemInfo: <a href="#problem">Problem</a>[]</code></summary>

</details>

---

#### Hover {#hover}

A hover represents additional information for a symbol or word. Hovers are
rendered in a tooltip-like widget.

##### Constructors

<details>
<summary><code>constructor(contents: MarkedString | MarkedString[], range?: Range);</code></summary>

Creates a new hover object.

</details>

##### Properties

<div id="hover-contents"></div>

<details>
<summary><code>contents: Array&lt;<a href="#markdownstring">MarkdownString</a> | <a href="#markedstring">MarkedString</a>&gt;</code></summary>

The contents of this hover.

</details>

<div id="hover-range"></div>

<details>
<summary><code>range: <a href="#range">Range</a></code></summary>

The range to which this hover applies. When missing, the
editor will use the range at the current position or the
current position itself.

</details>

---

#### InlayHint {#inlayhint}

Inlay hint information.

##### Constructors

<details>
<summary><code>constructor(position: Position, label: string | InlayHintLabelPart[], kind?: InlayHintKind);</code></summary>

Creates a new inlay hint.

</details>

##### Properties

<div id="inlayhint-position"></div>

<details>
<summary><code>position: <a href="#position">Position</a></code></summary>

The position of this hint.

</details>

<div id="inlayhint-label"></div>

<details>
<summary><code>label: string | <a href="#inlayhintlabelpart">InlayHintLabelPart</a>[]</code></summary>

The label of this hint. A human readable string or an array of <a href="#inlayhintlabelpart">label parts</a>.

*Note* that neither the string nor the label part can be empty.

</details>

<div id="inlayhint-tooltip"></div>

<details>
<summary><code>tooltip: string | <a href="#markdownstring">MarkdownString</a> | undefined</code></summary>

The tooltip text when you hover over this item.

*Note* that this property can be set late during
resolving of inlay hints.

</details>

<div id="inlayhint-kind"></div>

<details>
<summary><code>kind: <a href="#inlayhintkind">InlayHintKind</a></code></summary>

The kind of this hint. The inlay hint kind defines the appearance of this inlay hint.

</details>

<div id="inlayhint-textedits"></div>

<details>
<summary><code>textEdits: <a href="#textedit">TextEdit</a>[]</code></summary>

Optional <a href="#textedit">text edits</a> that are performed when accepting this inlay hint. The default
gesture for accepting an inlay hint is the double click.

*Note* that edits are expected to change the document so that the inlay hint (or its nearest variant) is
now part of the document and the inlay hint itself is now obsolete.

*Note* that this property can be set late during
resolving of inlay hints.

</details>

<div id="inlayhint-paddingleft"></div>

<details>
<summary><code>paddingLeft: boolean</code></summary>

Render padding before the hint. Padding will use the editor's background color,
not the background color of the hint itself. That means padding can be used to visually
align/separate an inlay hint.

</details>

<div id="inlayhint-paddingright"></div>

<details>
<summary><code>paddingRight: boolean</code></summary>

Render padding after the hint. Padding will use the editor's background color,
not the background color of the hint itself. That means padding can be used to visually
align/separate an inlay hint.

</details>

---

#### InlayHintLabelPart {#inlayhintlabelpart}

An inlay hint label part allows for interactive and composite labels of inlay hints.

##### Constructors

<details>
<summary><code>constructor(value: string);</code></summary>

Creates a new inlay hint label part.

</details>

##### Properties

<div id="inlayhintlabelpart-value"></div>

<details>
<summary><code>value: string</code></summary>

The value of this label part.

</details>

<div id="inlayhintlabelpart-tooltip"></div>

<details>
<summary><code>tooltip: string | <a href="#markdownstring">MarkdownString</a> | undefined</code></summary>

The tooltip text when you hover over this label part.

*Note* that this property can be set late during
resolving of inlay hints.

</details>

<div id="inlayhintlabelpart-location"></div>

<details>
<summary><code>location: <a href="#location">Location</a> | undefined</code></summary>

An optional <a href="#location">source code location</a> that represents this label
part.

The editor will use this location for the hover and for code navigation features: This
part will become a clickable link that resolves to the definition of the symbol at the
given location (not necessarily the location itself), it shows the hover that shows at
the given location, and it shows a context menu with further code navigation commands.

*Note* that this property can be set late during
resolving of inlay hints.

</details>

<div id="inlayhintlabelpart-command"></div>

<details>
<summary><code>command: <a href="#command">Command</a> | undefined</code></summary>

An optional command for this label part.

The editor renders parts with commands as clickable links. The command is added to the context menu
when a label part defines location and command .

*Note* that this property can be set late during
resolving of inlay hints.

</details>

---

#### InlineCompletionItem {#inlinecompletionitem}

An inline completion item represents a text snippet that is proposed inline to complete text that is being typed.

##### Constructors

<details>
<summary><code>constructor(insertText: string | SnippetString, range?: Range, command?: Command);</code></summary>

Creates a new inline completion item.

</details>

##### Properties

<div id="inlinecompletionitem-inserttext"></div>

<details>
<summary><code>insertText: string | <a href="#snippetstring">SnippetString</a></code></summary>

The text to replace the range with. Must be set.
Is used both for the preview and the accept operation.

</details>

<div id="inlinecompletionitem-filtertext"></div>

<details>
<summary><code>filterText: string</code></summary>

A text that is used to decide if this inline completion should be shown. When `falsy`
the insertText is used.

An inline completion is shown if the text to replace is a prefix of the filter text.

</details>

<div id="inlinecompletionitem-range"></div>

<details>
<summary><code>range: <a href="#range">Range</a></code></summary>

The range to replace.
Must begin and end on the same line.

Prefer replacements over insertions to provide a better experience when the user deletes typed text.

</details>

<div id="inlinecompletionitem-command"></div>

<details>
<summary><code>command: <a href="#command">Command</a></code></summary>

An optional <a href="#command">Command</a> that is executed *after* inserting this completion.

</details>

---

#### InlineCompletionList {#inlinecompletionlist}

Represents a collection of <a href="#inlinecompletionitem">inline completion items</a> to be presented
in the editor.

##### Constructors

<details>
<summary><code>constructor(items: InlineCompletionItem[]);</code></summary>

Creates a new list of inline completion items.

</details>

##### Properties

<div id="inlinecompletionlist-items"></div>

<details>
<summary><code>items: <a href="#inlinecompletionitem">InlineCompletionItem</a>[]</code></summary>

The inline completion items.

</details>

---

#### InlineValueEvaluatableExpression {#inlinevalueevaluatableexpression}

Provide an inline value through an expression evaluation.
If only a range is specified, the expression will be extracted from the underlying document.
An optional expression can be used to override the extracted expression.

##### Constructors

<details>
<summary><code>constructor(range: Range, expression?: string);</code></summary>

Creates a new InlineValueEvaluatableExpression object.

</details>

##### Properties

<div id="inlinevalueevaluatableexpression-range"></div>

<details>
<summary><code>range: <a href="#range">Range</a></code></summary>

The document range for which the inline value applies.
The range is used to extract the evaluatable expression from the underlying document.

**只读**: 是

</details>

<div id="inlinevalueevaluatableexpression-expression"></div>

<details>
<summary><code>expression: string | undefined</code></summary>

If specified the expression overrides the extracted expression.

**只读**: 是

</details>

---

#### InlineValueText {#inlinevaluetext}

Provide inline value as text.

##### Constructors

<details>
<summary><code>constructor(range: Range, text: string);</code></summary>

Creates a new InlineValueText object.

</details>

##### Properties

<div id="inlinevaluetext-range"></div>

<details>
<summary><code>range: <a href="#range">Range</a></code></summary>

The document range for which the inline value applies.

**只读**: 是

</details>

<div id="inlinevaluetext-text"></div>

<details>
<summary><code>text: string</code></summary>

The text of the inline value.

**只读**: 是

</details>

---

#### InlineValueVariableLookup {#inlinevaluevariablelookup}

Provide inline value through a variable lookup.
If only a range is specified, the variable name will be extracted from the underlying document.
An optional variable name can be used to override the extracted name.

##### Constructors

<details>
<summary><code>constructor(range: Range, variableName?: string, caseSensitiveLookup?: boolean);</code></summary>

Creates a new InlineValueVariableLookup object.

</details>

##### Properties

<div id="inlinevaluevariablelookup-range"></div>

<details>
<summary><code>range: <a href="#range">Range</a></code></summary>

The document range for which the inline value applies.
The range is used to extract the variable name from the underlying document.

**只读**: 是

</details>

<div id="inlinevaluevariablelookup-variablename"></div>

<details>
<summary><code>variableName: string | undefined</code></summary>

If specified the name of the variable to look up.

**只读**: 是

</details>

<div id="inlinevaluevariablelookup-casesensitivelookup"></div>

<details>
<summary><code>caseSensitiveLookup: boolean</code></summary>

How to perform the lookup.

**只读**: 是

</details>

---

#### LanguageModelChatMessage {#languagemodelchatmessage}

Represents a message in a chat. Can assume different roles, like user or assistant.

##### Constructors

<details>
<summary><code>constructor(role: LanguageModelChatMessageRole, content: string | Array&lt;LanguageModelTextPart | LanguageModelToolResultPart | LanguageModelToolCallPart&gt;, name?: string);</code></summary>

Create a new user message.

</details>

##### Properties

<div id="languagemodelchatmessage-role"></div>

<details>
<summary><code>role: <a href="#languagemodelchatmessagerole">LanguageModelChatMessageRole</a></code></summary>

The role of this message.

</details>

<div id="languagemodelchatmessage-content"></div>

<details>
<summary><code>content: Array&lt;(<a href="#languagemodeltextpart">LanguageModelTextPart</a> | <a href="#languagemodeltoolresultpart">LanguageModelToolResultPart</a> | <a href="#languagemodeltoolcallpart">LanguageModelToolCallPart</a>)&gt;</code></summary>

A string or heterogeneous array of things that a message can contain as content. Some parts may be message-type
specific for some models.

</details>

<div id="languagemodelchatmessage-name"></div>

<details>
<summary><code>name: string | undefined</code></summary>

The optional name of a user for this message.

</details>

##### Methods

<div id="languagemodelchatmessage-user"></div>

<details>
<summary><code>static User(content: string | Array&lt;LanguageModelTextPart | LanguageModelToolResultPart&gt;, name?: string): LanguageModelChatMessage;</code></summary>

Utility to create a new user message.

</details>

<div id="languagemodelchatmessage-assistant"></div>

<details>
<summary><code>static Assistant(content: string | Array&lt;(LanguageModelTextPart | LanguageModelToolCallPart)&gt;, name?: string): LanguageModelChatMessage;</code></summary>

Utility to create a new assistant message.

</details>

---

#### LanguageModelError {#languagemodelerror}

An error type for language model specific errors.

Consumers of language models should check the code property to determine specific
failure causes, like `if(someError.code === vscode.LanguageModelError.NotFound.name) &#123;...&#125;`
for the case of referring to an unknown language model. For unspecified errors the `cause`-property
will contain the actual error.

##### Properties

<div id="languagemodelerror-code"></div>

<details>
<summary><code>code: string</code></summary>

A code that identifies this error.

Possible values are names of errors, like NotFound,
or `Unknown` for unspecified errors from the language model itself. In the latter case the
`cause`-property will contain the actual error.

**只读**: 是

</details>

##### Methods

<div id="languagemodelerror-nopermissions"></div>

<details>
<summary><code>static NoPermissions(message?: string): LanguageModelError;</code></summary>

The requestor does not have permissions to use this
language model

</details>

<div id="languagemodelerror-blocked"></div>

<details>
<summary><code>static Blocked(message?: string): LanguageModelError;</code></summary>

The requestor is blocked from using this language model.

</details>

<div id="languagemodelerror-notfound"></div>

<details>
<summary><code>static NotFound(message?: string): LanguageModelError;</code></summary>

The language model does not exist.

</details>

---

#### LanguageModelPromptTsxPart {#languagemodelprompttsxpart}

A language model response part containing a PromptElementJSON from `@vscode/prompt-tsx`.

##### Constructors

<details>
<summary><code>constructor(value: unknown);</code></summary>

Construct a prompt-tsx part with the given content.

</details>

##### Properties

<div id="languagemodelprompttsxpart-value"></div>

<details>
<summary><code>value: unknown</code></summary>

The value of the part.

</details>

---

#### LanguageModelTextPart {#languagemodeltextpart}

A language model response part containing a piece of text, returned from a <a href="#languagemodelchatresponse">LanguageModelChatResponse</a>.

##### Constructors

<details>
<summary><code>constructor(value: string);</code></summary>

Construct a text part with the given content.

</details>

##### Properties

<div id="languagemodeltextpart-value"></div>

<details>
<summary><code>value: string</code></summary>

The text content of the part.

</details>

---

#### LanguageModelToolCallPart {#languagemodeltoolcallpart}

A language model response part indicating a tool call, returned from a <a href="#languagemodelchatresponse">LanguageModelChatResponse</a>, and also can be
included as a content part on a <a href="#languagemodelchatmessage">LanguageModelChatMessage</a>, to represent a previous tool call in a chat request.

##### Constructors

<details>
<summary><code>constructor(callId: string, name: string, input: object);</code></summary>

Create a new LanguageModelToolCallPart.

</details>

##### Properties

<div id="languagemodeltoolcallpart-callid"></div>

<details>
<summary><code>callId: string</code></summary>

The ID of the tool call. This is a unique identifier for the tool call within the chat request.

</details>

<div id="languagemodeltoolcallpart-name"></div>

<details>
<summary><code>name: string</code></summary>

The name of the tool to call.

</details>

<div id="languagemodeltoolcallpart-input"></div>

<details>
<summary><code>input: object</code></summary>

The input with which to call the tool.

</details>

---

#### LanguageModelToolResult {#languagemodeltoolresult}

A result returned from a tool invocation. If using `@vscode/prompt-tsx`, this result may be rendered using a `ToolResult`.

##### Constructors

<details>
<summary><code>constructor(content: Array&lt;(LanguageModelTextPart | LanguageModelPromptTsxPart)&gt;);</code></summary>

Create a LanguageModelToolResult

</details>

##### Properties

<div id="languagemodeltoolresult-content"></div>

<details>
<summary><code>content: Array&lt;(<a href="#languagemodeltextpart">LanguageModelTextPart</a> | <a href="#languagemodelprompttsxpart">LanguageModelPromptTsxPart</a> | unknown)&gt;</code></summary>

A list of tool result content parts. Includes `unknown` becauses this list may be extended with new content types in
the future.

</details>

---

#### LanguageModelToolResultPart {#languagemodeltoolresultpart}

The result of a tool call. This is the counterpart of a <a href="#languagemodeltoolcallpart">tool call</a> and
it can only be included in the content of a User message

##### Constructors

<details>
<summary><code>constructor(callId: string, content: Array&lt;(LanguageModelTextPart | LanguageModelPromptTsxPart | unknown)&gt;);</code></summary>

</details>

##### Properties

<div id="languagemodeltoolresultpart-callid"></div>

<details>
<summary><code>callId: string</code></summary>

The ID of the tool call.

*Note* that this should match the callId of a tool call part.

</details>

<div id="languagemodeltoolresultpart-content"></div>

<details>
<summary><code>content: Array&lt;<a href="#languagemodeltextpart">LanguageModelTextPart</a> | <a href="#languagemodelprompttsxpart">LanguageModelPromptTsxPart</a> | unknown&gt;</code></summary>

The value of the tool result.

</details>

---

#### LinkedEditingRanges {#linkededitingranges}

Represents a list of ranges that can be edited together along with a word pattern to describe valid range contents.

##### Constructors

<details>
<summary><code>constructor(ranges: Range[], wordPattern?: RegExp);</code></summary>

Create a new linked editing ranges object.

</details>

##### Properties

<div id="linkededitingranges-ranges"></div>

<details>
<summary><code>ranges: <a href="#range">Range</a>[]</code></summary>

A list of ranges that can be edited together. The ranges must have
identical length and text content. The ranges cannot overlap.

**只读**: 是

</details>

<div id="linkededitingranges-wordpattern"></div>

<details>
<summary><code>wordPattern: RegExp | undefined</code></summary>

An optional word pattern that describes valid contents for the given ranges.
If no pattern is provided, the language configuration's word pattern will be used.

**只读**: 是

</details>

---

#### Location {#location}

Represents a location inside a resource, such as a line
inside a text file.

##### Constructors

<details>
<summary><code>constructor(uri: Uri, rangeOrPosition: Range | Position);</code></summary>

Creates a new location object.

</details>

##### Properties

<div id="location-uri"></div>

<details>
<summary><code>uri: <a href="#uri">Uri</a></code></summary>

The resource identifier of this location.

</details>

<div id="location-range"></div>

<details>
<summary><code>range: <a href="#range">Range</a></code></summary>

The document range of this location.

</details>

---

#### MarkdownString {#markdownstring}

The MarkdownString represents human readable text that supports formatting via the
markdown syntax. Standard markdown is supported, also tables, but no embedded html.

##### Constructors

<details>
<summary><code>constructor(value?: string, supportThemeIcons?: boolean);</code></summary>

Creates a new markdown string with the given value.

</details>

##### Properties

<div id="markdownstring-value"></div>

<details>
<summary><code>value: string</code></summary>

The markdown string.

</details>

<div id="markdownstring-istrusted"></div>

<details>
<summary><code>isTrusted: boolean | &#123; readonly enabledCommands: readonly string[] &#125;</code></summary>

Indicates that this markdown string is from a trusted source. Only *trusted*
markdown supports links that execute commands, e.g. `[Run it](command:myCommandId)`.

Defaults to `false` (commands are disabled).

If this is an object, only the set of commands listed in `enabledCommands` are allowed.

</details>

<div id="markdownstring-supportthemeicons"></div>

<details>
<summary><code>supportThemeIcons: boolean</code></summary>

Indicates that this markdown string can contain <a href="#themeicon">ThemeIcons</a>, e.g. `$(zap)`.

</details>

<div id="markdownstring-supporthtml"></div>

<details>
<summary><code>supportHtml: boolean</code></summary>

Indicates that this markdown string can contain raw html tags. Defaults to `false`.

When `supportHtml` is false, the markdown renderer will strip out any raw html tags
that appear in the markdown text. This means you can only use markdown syntax for rendering.

When `supportHtml` is true, the markdown render will also allow a safe subset of html tags
and attributes to be rendered. See https://github.com/microsoft/vscode/blob/6d2920473c6f13759c978dd89104c4270a83422d/src/vs/base/browser/markdownRenderer.ts#L296
for a list of all supported tags and attributes.

</details>

<div id="markdownstring-baseuri"></div>

<details>
<summary><code>baseUri: <a href="#uri">Uri</a></code></summary>

Uri that relative paths are resolved relative to.

If the `baseUri` ends with `/`, it is considered a directory and relative paths in the markdown are resolved relative to that directory:

```ts
const md = new vscode.MarkdownString(`[link](./file.js)`);
md.baseUri = vscode.Uri.file('/path/to/dir/');
// Here 'link' in the rendered markdown resolves to '/path/to/dir/file.js'
```

If the `baseUri` is a file, relative paths in the markdown are resolved relative to the parent dir of that file:

```ts
const md = new vscode.MarkdownString(`[link](./file.js)`);
md.baseUri = vscode.Uri.file('/path/to/otherFile.js');
// Here 'link' in the rendered markdown resolves to '/path/to/file.js'
```

</details>

##### Methods

<div id="markdownstring-appendtext"></div>

<details>
<summary><code>appendText(value: string): MarkdownString;</code></summary>

Appends and escapes the given string to this markdown string.

</details>

<div id="markdownstring-appendmarkdown"></div>

<details>
<summary><code>appendMarkdown(value: string): MarkdownString;</code></summary>

Appends the given string 'as is' to this markdown string.

</details>

<div id="markdownstring-appendcodeblock"></div>

<details>
<summary><code>appendCodeblock(value: string, language?: string): MarkdownString;</code></summary>

Appends the given string as codeblock using the provided language.

</details>

---

#### MultiDocumentHighlight {#multidocumenthighlight}

Represents a collection of document highlights from multiple documents.

##### Constructors

<details>
<summary><code>constructor(uri: Uri, highlights: DocumentHighlight[]);</code></summary>

Creates a new instance of MultiDocumentHighlight.

</details>

##### Properties

<div id="multidocumenthighlight-uri"></div>

<details>
<summary><code>uri: <a href="#uri">Uri</a></code></summary>

The URI of the document containing the highlights.

</details>

<div id="multidocumenthighlight-highlights"></div>

<details>
<summary><code>highlights: <a href="#documenthighlight">DocumentHighlight</a>[]</code></summary>

The highlights for the document.

</details>

---

#### NotebookCellData {#notebookcelldata}

NotebookCellData is the raw representation of notebook cells. Its is part of <a href="#notebookdata">NotebookData</a>.

##### Constructors

<details>
<summary><code>constructor(kind: NotebookCellKind, value: string, languageId: string);</code></summary>

Create new cell data. Minimal cell data specifies its kind, its source value, and the
language identifier of its source.

</details>

##### Properties

<div id="notebookcelldata-kind"></div>

<details>
<summary><code>kind: <a href="#notebookcellkind">NotebookCellKind</a></code></summary>

The <a href="#notebookcellkind">kind</a> of this cell data.

</details>

<div id="notebookcelldata-value"></div>

<details>
<summary><code>value: string</code></summary>

The source value of this cell data - either source code or formatted text.

</details>

<div id="notebookcelldata-languageid"></div>

<details>
<summary><code>languageId: string</code></summary>

The language identifier of the source value of this cell data. Any value from
getLanguages is possible.

</details>

<div id="notebookcelldata-outputs"></div>

<details>
<summary><code>outputs: <a href="#notebookcelloutput">NotebookCellOutput</a>[]</code></summary>

The outputs of this cell data.

</details>

<div id="notebookcelldata-metadata"></div>

<details>
<summary><code>metadata: &#123; [key: string]: any &#125;</code></summary>

Arbitrary metadata of this cell data. Can be anything but must be JSON-stringifyable.

</details>

<div id="notebookcelldata-executionsummary"></div>

<details>
<summary><code>executionSummary: <a href="#notebookcellexecutionsummary">NotebookCellExecutionSummary</a></code></summary>

The execution summary of this cell data.

</details>

---

#### NotebookCellOutput {#notebookcelloutput}

Notebook cell output represents a result of executing a cell. It is a container type for multiple
<a href="#notebookcelloutputitem">output items</a> where contained items represent the same result but
use different MIME types.

##### Constructors

<details>
<summary><code>constructor(items: NotebookCellOutputItem[], metadata?: &#123; [key: string]: any &#125;);</code></summary>

Create new notebook output.

</details>

##### Properties

<div id="notebookcelloutput-items"></div>

<details>
<summary><code>items: <a href="#notebookcelloutputitem">NotebookCellOutputItem</a>[]</code></summary>

The output items of this output. Each item must represent the same result. _Note_ that repeated
MIME types per output is invalid and that the editor will just pick one of them.

```ts
new vscode.NotebookCellOutput([
 vscode.NotebookCellOutputItem.text('Hello', 'text/plain'),
 vscode.NotebookCellOutputItem.text('&lt;i&gt;Hello&lt;/i&gt;', 'text/html'),
 vscode.NotebookCellOutputItem.text('_Hello_', 'text/markdown'),
 vscode.NotebookCellOutputItem.text('Hey', 'text/plain'), // INVALID: repeated type, editor will pick just one
])
```

</details>

<div id="notebookcelloutput-metadata"></div>

<details>
<summary><code>metadata: &#123; [key: string]: any &#125;</code></summary>

Arbitrary metadata for this cell output. Can be anything but must be JSON-stringifyable.

</details>

---

#### NotebookCellOutputItem {#notebookcelloutputitem}

One representation of a <a href="#notebookcelloutput">notebook output</a>, defined by MIME type and data.

##### Constructors

<details>
<summary><code>constructor(data: Uint8Array, mime: string);</code></summary>

Create a new notebook cell output item.

</details>

##### Properties

<div id="notebookcelloutputitem-mime"></div>

<details>
<summary><code>mime: string</code></summary>

The mime type which determines how the data-property
is interpreted.

Notebooks have built-in support for certain mime-types, extensions can add support for new
types and override existing types.

</details>

<div id="notebookcelloutputitem-data"></div>

<details>
<summary><code>data: Uint8Array</code></summary>

The data of this output item. Must always be an array of unsigned 8-bit integers.

</details>

##### Methods

<div id="notebookcelloutputitem-text"></div>

<details>
<summary><code>static text(value: string, mime?: string): NotebookCellOutputItem;</code></summary>

Factory function to create a `NotebookCellOutputItem` from a string.

*Note* that an UTF-8 encoder is used to create bytes for the string.

</details>

<div id="notebookcelloutputitem-json"></div>

<details>
<summary><code>static json(value: any, mime?: string): NotebookCellOutputItem;</code></summary>

Factory function to create a `NotebookCellOutputItem` from
a JSON object.

*Note* that this function is not expecting "stringified JSON" but
an object that can be stringified. This function will throw an error
when the passed value cannot be JSON-stringified.

</details>

<div id="notebookcelloutputitem-stdout"></div>

<details>
<summary><code>static stdout(value: string): NotebookCellOutputItem;</code></summary>

Factory function to create a `NotebookCellOutputItem` that uses
uses the `application/vnd.code.notebook.stdout` mime type.

</details>

<div id="notebookcelloutputitem-stderr"></div>

<details>
<summary><code>static stderr(value: string): NotebookCellOutputItem;</code></summary>

Factory function to create a `NotebookCellOutputItem` that uses
uses the `application/vnd.code.notebook.stderr` mime type.

</details>

<div id="notebookcelloutputitem-error"></div>

<details>
<summary><code>static error(value: Error): NotebookCellOutputItem;</code></summary>

Factory function to create a `NotebookCellOutputItem` that uses
uses the `application/vnd.code.notebook.error` mime type.

</details>

---

#### NotebookCellStatusBarItem {#notebookcellstatusbaritem}

A contribution to a cell's status bar

##### Constructors

<details>
<summary><code>constructor(text: string, alignment: NotebookCellStatusBarAlignment);</code></summary>

Creates a new NotebookCellStatusBarItem.

</details>

##### Properties

<div id="notebookcellstatusbaritem-text"></div>

<details>
<summary><code>text: string</code></summary>

The text to show for the item.

</details>

<div id="notebookcellstatusbaritem-alignment"></div>

<details>
<summary><code>alignment: <a href="#notebookcellstatusbaralignment">NotebookCellStatusBarAlignment</a></code></summary>

Whether the item is aligned to the left or right.

</details>

<div id="notebookcellstatusbaritem-command"></div>

<details>
<summary><code>command: string | <a href="#command">Command</a></code></summary>

An optional <a href="#command">Command</a> or identifier of a command to run on click.

The command must be known.

Note that if this is a <a href="#command">Command</a> object, only the command and arguments
are used by the editor.

</details>

<div id="notebookcellstatusbaritem-tooltip"></div>

<details>
<summary><code>tooltip: string</code></summary>

A tooltip to show when the item is hovered.

</details>

<div id="notebookcellstatusbaritem-priority"></div>

<details>
<summary><code>priority: number</code></summary>

The priority of the item. A higher value item will be shown more to the left.

</details>

<div id="notebookcellstatusbaritem-accessibilityinformation"></div>

<details>
<summary><code>accessibilityInformation: <a href="#accessibilityinformation">AccessibilityInformation</a></code></summary>

Accessibility information used when a screen reader interacts with this item.

</details>

---

#### NotebookData {#notebookdata}

Raw representation of a notebook.

Extensions are responsible for creating <a href="#notebookdata">NotebookData</a> so that the editor
can create a <a href="#notebookdocument">NotebookDocument</a>.

##### Constructors

<details>
<summary><code>constructor(cells: NotebookCellData[]);</code></summary>

Create new notebook data.

</details>

##### Properties

<div id="notebookdata-cells"></div>

<details>
<summary><code>cells: <a href="#notebookcelldata">NotebookCellData</a>[]</code></summary>

The cell data of this notebook data.

</details>

<div id="notebookdata-metadata"></div>

<details>
<summary><code>metadata: &#123; [key: string]: any &#125;</code></summary>

Arbitrary metadata of notebook data.

</details>

---

#### NotebookEdit {#notebookedit}

A notebook edit represents edits that should be applied to the contents of a notebook.

##### Constructors

<details>
<summary><code>constructor(range: NotebookRange, newCells: NotebookCellData[]);</code></summary>

</details>

##### Properties

<div id="notebookedit-range"></div>

<details>
<summary><code>range: <a href="#notebookrange">NotebookRange</a></code></summary>

Range of the cells being edited. May be empty.

</details>

<div id="notebookedit-newcells"></div>

<details>
<summary><code>newCells: <a href="#notebookcelldata">NotebookCellData</a>[]</code></summary>

New cells being inserted. May be empty.

</details>

<div id="notebookedit-newcellmetadata"></div>

<details>
<summary><code>newCellMetadata: &#123; [key: string]: any &#125;</code></summary>

Optional new metadata for the cells.

</details>

<div id="notebookedit-newnotebookmetadata"></div>

<details>
<summary><code>newNotebookMetadata: &#123; [key: string]: any &#125;</code></summary>

Optional new metadata for the notebook.

</details>

##### Methods

<div id="notebookedit-replacecells"></div>

<details>
<summary><code>static replaceCells(range: NotebookRange, newCells: NotebookCellData[]): NotebookEdit;</code></summary>

Utility to create a edit that replaces cells in a notebook.

</details>

<div id="notebookedit-insertcells"></div>

<details>
<summary><code>static insertCells(index: number, newCells: NotebookCellData[]): NotebookEdit;</code></summary>

Utility to create an edit that replaces cells in a notebook.

</details>

<div id="notebookedit-deletecells"></div>

<details>
<summary><code>static deleteCells(range: NotebookRange): NotebookEdit;</code></summary>

Utility to create an edit that deletes cells in a notebook.

</details>

<div id="notebookedit-updatecellmetadata"></div>

<details>
<summary><code>static updateCellMetadata(index: number, newCellMetadata: &#123; [key: string]: any &#125;): NotebookEdit;</code></summary>

Utility to create an edit that update a cell's metadata.

</details>

<div id="notebookedit-updatenotebookmetadata"></div>

<details>
<summary><code>static updateNotebookMetadata(newNotebookMetadata: &#123; [key: string]: any &#125;): NotebookEdit;</code></summary>

Utility to create an edit that updates the notebook's metadata.

</details>

---

#### NotebookKernelSourceAction {#notebookkernelsourceaction}

##### Constructors

<details>
<summary><code>constructor(label: string);</code></summary>

</details>

##### Properties

<div id="notebookkernelsourceaction-label"></div>

<details>
<summary><code>label: string</code></summary>

**只读**: 是

</details>

<div id="notebookkernelsourceaction-description"></div>

<details>
<summary><code>description: string</code></summary>

**只读**: 是

</details>

<div id="notebookkernelsourceaction-detail"></div>

<details>
<summary><code>detail: string</code></summary>

**只读**: 是

</details>

<div id="notebookkernelsourceaction-command"></div>

<details>
<summary><code>command: string | <a href="#command">Command</a></code></summary>

**只读**: 是

</details>

<div id="notebookkernelsourceaction-documentation"></div>

<details>
<summary><code>documentation: <a href="#uri">Uri</a></code></summary>

**只读**: 是

</details>

---

#### NotebookRange {#notebookrange}

A notebook range represents an ordered pair of two cell indices.
It is guaranteed that start is less than or equal to end.

##### Constructors

<details>
<summary><code>constructor(start: number, end: number);</code></summary>

Create a new notebook range. If `start` is not
before or equal to `end`, the values will be swapped.

</details>

##### Properties

<div id="notebookrange-start"></div>

<details>
<summary><code>start: number</code></summary>

The zero-based start index of this range.

**只读**: 是

</details>

<div id="notebookrange-end"></div>

<details>
<summary><code>end: number</code></summary>

The exclusive end index of this range (zero-based).

**只读**: 是

</details>

<div id="notebookrange-isempty"></div>

<details>
<summary><code>isEmpty: boolean</code></summary>

`true` if `start` and `end` are equal.

**只读**: 是

</details>

##### Methods

<div id="notebookrange-with"></div>

<details>
<summary><code>with(change: &#123; start?: number; end?: number &#125;): NotebookRange;</code></summary>

Derive a new range for this range.

</details>

---

#### NotebookRendererScript {#notebookrendererscript}

Represents a script that is loaded into the notebook renderer before rendering output. This allows
to provide and share functionality for notebook markup and notebook output renderers.

##### Constructors

<details>
<summary><code>constructor(uri: Uri, provides?: string | readonly string[]);</code></summary>

</details>

##### Properties

<div id="notebookrendererscript-provides"></div>

<details>
<summary><code>provides: readonly string[]</code></summary>

APIs that the preload provides to the renderer. These are matched
against the `dependencies` and `optionalDependencies` arrays in the
notebook renderer contribution point.

</details>

<div id="notebookrendererscript-uri"></div>

<details>
<summary><code>uri: <a href="#uri">Uri</a></code></summary>

URI of the JavaScript module to preload.

This module must export an `activate` function that takes a context object that contains the notebook API.

</details>

---

#### ParameterInformation {#parameterinformation}

Represents a parameter of a callable-signature. A parameter can
have a label and a doc-comment.

##### Constructors

<details>
<summary><code>constructor(label: string | [number, number], documentation?: string | MarkdownString);</code></summary>

Creates a new parameter information object.

</details>

##### Properties

<div id="parameterinformation-label"></div>

<details>
<summary><code>label: string | [number, number]</code></summary>

The label of this signature. Will be shown in
the UI.

</details>

<div id="parameterinformation-documentation"></div>

<details>
<summary><code>documentation: string | <a href="#markdownstring">MarkdownString</a></code></summary>

The human-readable doc-comment of this signature. Will be shown
in the UI but can be omitted.

</details>

---

#### PortAttributes {#portattributes}

The attributes that a forwarded port can have.

##### Constructors

<details>
<summary><code>constructor(autoForwardAction: PortAutoForwardAction);</code></summary>

Creates a new PortAttributes object

</details>

##### Properties

<div id="portattributes-autoforwardaction"></div>

<details>
<summary><code>autoForwardAction: <a href="#portautoforwardaction">PortAutoForwardAction</a></code></summary>

The action to be taken when this port is detected for auto forwarding.

</details>

---

#### Position {#position}

Represents a line and character position, such as
the position of the cursor.

Position objects are __immutable__. Use the with or
translate methods to derive new positions
from an existing position.

##### Constructors

<details>
<summary><code>constructor(line: number, character: number);</code></summary>

</details>

##### Properties

<div id="position-line"></div>

<details>
<summary><code>line: number</code></summary>

The zero-based line value.

**只读**: 是

</details>

<div id="position-character"></div>

<details>
<summary><code>character: number</code></summary>

The zero-based character value.

**只读**: 是

</details>

##### Methods

<div id="position-isbefore"></div>

<details>
<summary><code>isBefore(other: Position): boolean;</code></summary>

Check if this position is before `other`.

</details>

<div id="position-isbeforeorequal"></div>

<details>
<summary><code>isBeforeOrEqual(other: Position): boolean;</code></summary>

Check if this position is before or equal to `other`.

</details>

<div id="position-isafter"></div>

<details>
<summary><code>isAfter(other: Position): boolean;</code></summary>

Check if this position is after `other`.

</details>

<div id="position-isafterorequal"></div>

<details>
<summary><code>isAfterOrEqual(other: Position): boolean;</code></summary>

Check if this position is after or equal to `other`.

</details>

<div id="position-isequal"></div>

<details>
<summary><code>isEqual(other: Position): boolean;</code></summary>

Check if this position is equal to `other`.

</details>

<div id="position-compareto"></div>

<details>
<summary><code>compareTo(other: Position): number;</code></summary>

Compare this to `other`.

</details>

<div id="position-translate"></div>

<details>
<summary><code>translate(lineDelta?: number, characterDelta?: number): Position;</code></summary>

Create a new position relative to this position.

</details>

<div id="position-translate"></div>

<details>
<summary><code>translate(change: &#123; lineDelta?: number; characterDelta?: number &#125;): Position;</code></summary>

Derived a new position relative to this position.

</details>

<div id="position-with"></div>

<details>
<summary><code>with(line?: number, character?: number): Position;</code></summary>

Create a new position derived from this position.

</details>

<div id="position-with"></div>

<details>
<summary><code>with(change: &#123; line?: number; character?: number &#125;): Position;</code></summary>

Derived a new position from this position.

</details>

---

#### ProcessExecution {#processexecution}

##### Constructors

<details>
<summary><code>constructor(process: string, options?: ProcessExecutionOptions);</code></summary>

Creates a process execution.

</details>

<details>
<summary><code>constructor(process: string, args: string[], options?: ProcessExecutionOptions);</code></summary>

Creates a process execution.

</details>

##### Properties

<div id="processexecution-process"></div>

<details>
<summary><code>process: string</code></summary>

The process to be executed.

</details>

<div id="processexecution-args"></div>

<details>
<summary><code>args: string[]</code></summary>

The arguments passed to the process. Defaults to an empty array.

</details>

<div id="processexecution-options"></div>

<details>
<summary><code>options: <a href="#processexecutionoptions">ProcessExecutionOptions</a></code></summary>

The process options used when the process is executed.
Defaults to undefined.

</details>

---

#### QuickInputButtons {#quickinputbuttons}

Predefined buttons for <a href="#quickpick">QuickPick</a> and <a href="#inputbox">InputBox</a>.

##### Constructors

<details>
<summary><code>private constructor();</code></summary>

</details>

##### Properties

<div id="quickinputbuttons-back"></div>

<details>
<summary><code>Back: <a href="#quickinputbutton">QuickInputButton</a></code></summary>

A back button for <a href="#quickpick">QuickPick</a> and <a href="#inputbox">InputBox</a>.

When a navigation 'back' button is needed this one should be used for consistency.
It comes with a predefined icon, tooltip and location.

**只读**: 是

</details>

---

#### Range {#range}

Pair of two positions.

##### Constructors

<details>
<summary><code>constructor(start: Position, end: Position);</code></summary>

Create a new range from two positions.
If `start` is not before or equal to `end`, the values will be swapped.

</details>

<details>
<summary><code>constructor(startLine: number, startCharacter: number, endLine: number, endCharacter: number);</code></summary>

Create a new position from coordinates.

</details>

##### Properties

<div id="range-start"></div>

<details>
<summary><code>start: <a href="#position">Position</a></code></summary>

Start position.

**只读**: 是

</details>

<div id="range-end"></div>

<details>
<summary><code>end: <a href="#position">Position</a></code></summary>

End position.

**只读**: 是

</details>

<div id="range-isempty"></div>

<details>
<summary><code>isEmpty: boolean</code></summary>

`true` if start and end are equal

</details>

<div id="range-issingleline"></div>

<details>
<summary><code>isSingleLine: boolean</code></summary>

`true` if `start.line` and `end.line` are equal

</details>

##### Methods

<div id="range-contains"></div>

<details>
<summary><code>contains(positionOrRange: Position | Range): boolean;</code></summary>

Check if a position or a range is in this range.

</details>

<div id="range-isequal"></div>

<details>
<summary><code>isEqual(other: Range): boolean;</code></summary>

Check `other` equals this range.

</details>

<div id="range-intersection"></div>

<details>
<summary><code>intersection(range: Range): Range | undefined;</code></summary>

Intersect `range` with this range and returns new range or `undefined`

</details>

<div id="range-union"></div>

<details>
<summary><code>union(other: Range): Range;</code></summary>

Compute the union of `other` with this range.

</details>

<div id="range-with"></div>

<details>
<summary><code>with(start?: Position, end?: Position): Range;</code></summary>

Derived a new range from this range.

</details>

<div id="range-with"></div>

<details>
<summary><code>with(change: &#123; start?: Position; end?: Position &#125;): Range;</code></summary>

Derived a new range from this range.

</details>

---

#### RelativePattern {#relativepattern}

A relative pattern is a helper to construct glob patterns that are matched
relatively to a base path. The base path can either be an absolute file path
or a <a href="#workspacefolder">workspace folder</a>.

##### Constructors

<details>
<summary><code>constructor(base: WorkspaceFolder | Uri | string, pattern: string);</code></summary>

Creates a new relative pattern object with a base path and pattern to match. This pattern
will be matched on file paths relative to the base path.

</details>

##### Properties

<div id="relativepattern-baseuri"></div>

<details>
<summary><code>baseUri: <a href="#uri">Uri</a></code></summary>

A base file path to which this pattern will be matched against relatively.

</details>

<div id="relativepattern-base"></div>

<details>
<summary><code>base: string</code></summary>

A base file path against which this pattern will be matched relatively.

This matches the `fsPath` value of baseUri.

*Note:* updating this value will update baseUri to
be a uri with `file` scheme.

</details>

<div id="relativepattern-pattern"></div>

<details>
<summary><code>pattern: string</code></summary>

A file glob pattern like `*.&#123;ts,js&#125;` that will be matched on file paths
relative to the base path.

Example: Given a base of `/home/work/folder` and a file path of `/home/work/folder/index.js`,
the file glob pattern will match on `index.js`.

</details>

---

#### Selection {#selection}

Represents a text selection in an editor.

##### Constructors

<details>
<summary><code>constructor(anchor: Position, active: Position);</code></summary>

Create a selection from two positions.

</details>

<details>
<summary><code>constructor(anchorLine: number, anchorCharacter: number, activeLine: number, activeCharacter: number);</code></summary>

Create a selection from coordinates.

</details>

##### Properties

<div id="selection-anchor"></div>

<details>
<summary><code>anchor: <a href="#position">Position</a></code></summary>

Position where selection starts.

</details>

<div id="selection-active"></div>

<details>
<summary><code>active: <a href="#position">Position</a></code></summary>

Position of the cursor

</details>

<div id="selection-isreversed"></div>

<details>
<summary><code>isReversed: boolean</code></summary>

A selection is reversed if `active.isBefore(anchor)`

</details>

---

#### SelectionRange {#selectionrange}

A selection range represents a part of a selection hierarchy. A selection range
may have a parent selection range that contains it.

##### Constructors

<details>
<summary><code>constructor(range: Range, parent?: SelectionRange);</code></summary>

Creates a new selection range.

</details>

##### Properties

<div id="selectionrange-range"></div>

<details>
<summary><code>range: <a href="#range">Range</a></code></summary>

The <a href="#range">range</a> of this selection range.

</details>

<div id="selectionrange-parent"></div>

<details>
<summary><code>parent: <a href="#selectionrange">SelectionRange</a></code></summary>

The parent selection range containing this range.

</details>

---

#### SemanticTokens {#semantictokens}

Represents semantic tokens, either in a range or in an entire document.

##### Constructors

<details>
<summary><code>constructor(data: Uint32Array, resultId?: string);</code></summary>

</details>

##### Properties

<div id="semantictokens-resultid"></div>

<details>
<summary><code>resultId: string | undefined</code></summary>

The result id of the tokens.

This is the id that will be passed to `DocumentSemanticTokensProvider.provideDocumentSemanticTokensEdits` (if implemented).

**只读**: 是

</details>

<div id="semantictokens-data"></div>

<details>
<summary><code>data: Uint32Array</code></summary>

The actual tokens data.

**只读**: 是

</details>

---

#### SemanticTokensBuilder {#semantictokensbuilder}

A semantic tokens builder can help with creating a `SemanticTokens` instance
which contains delta encoded semantic tokens.

##### Constructors

<details>
<summary><code>constructor(legend?: SemanticTokensLegend);</code></summary>

</details>

##### Methods

<div id="semantictokensbuilder-push"></div>

<details>
<summary><code>push(line: number, char: number, length: number, tokenType: number, tokenModifiers?: number): void;</code></summary>

Add another token.

</details>

<div id="semantictokensbuilder-push"></div>

<details>
<summary><code>push(range: Range, tokenType: string, tokenModifiers?: readonly string[]): void;</code></summary>

Add another token. Use only when providing a legend.

</details>

<div id="semantictokensbuilder-build"></div>

<details>
<summary><code>build(resultId?: string): SemanticTokens;</code></summary>

Finish and create a `SemanticTokens` instance.

</details>

---

#### SemanticTokensEdit {#semantictokensedit}

Represents an edit to semantic tokens.

##### Constructors

<details>
<summary><code>constructor(start: number, deleteCount: number, data?: Uint32Array);</code></summary>

</details>

##### Properties

<div id="semantictokensedit-start"></div>

<details>
<summary><code>start: number</code></summary>

The start offset of the edit.

**只读**: 是

</details>

<div id="semantictokensedit-deletecount"></div>

<details>
<summary><code>deleteCount: number</code></summary>

The count of elements to remove.

**只读**: 是

</details>

<div id="semantictokensedit-data"></div>

<details>
<summary><code>data: Uint32Array | undefined</code></summary>

The elements to insert.

**只读**: 是

</details>

---

#### SemanticTokensEdits {#semantictokensedits}

Represents edits to semantic tokens.

##### Constructors

<details>
<summary><code>constructor(edits: SemanticTokensEdit[], resultId?: string);</code></summary>

</details>

##### Properties

<div id="semantictokensedits-resultid"></div>

<details>
<summary><code>resultId: string | undefined</code></summary>

The result id of the tokens.

This is the id that will be passed to `DocumentSemanticTokensProvider.provideDocumentSemanticTokensEdits` (if implemented).

**只读**: 是

</details>

<div id="semantictokensedits-edits"></div>

<details>
<summary><code>edits: <a href="#semantictokensedit">SemanticTokensEdit</a>[]</code></summary>

The edits to the tokens data.
All edits refer to the initial data state.

**只读**: 是

</details>

---

#### SemanticTokensLegend {#semantictokenslegend}

A semantic tokens legend contains the needed information to decipher
the integer encoded representation of semantic tokens.

##### Constructors

<details>
<summary><code>constructor(tokenTypes: string[], tokenModifiers?: string[]);</code></summary>

</details>

##### Properties

<div id="semantictokenslegend-tokentypes"></div>

<details>
<summary><code>tokenTypes: string[]</code></summary>

The possible token types.

**只读**: 是

</details>

<div id="semantictokenslegend-tokenmodifiers"></div>

<details>
<summary><code>tokenModifiers: string[]</code></summary>

The possible token modifiers.

**只读**: 是

</details>

---

#### ShellExecution {#shellexecution}

##### Constructors

<details>
<summary><code>constructor(commandLine: string, options?: ShellExecutionOptions);</code></summary>

Creates a shell execution with a full command line.

</details>

<details>
<summary><code>constructor(command: string | ShellQuotedString, args: Array&lt;string | ShellQuotedString&gt;, options?: ShellExecutionOptions);</code></summary>

Creates a shell execution with a command and arguments. For the real execution VS Code will
construct a command line from the command and the arguments. This is subject to interpretation
especially when it comes to quoting. If full control over the command line is needed please
use the constructor that creates a `ShellExecution` with the full command line.

</details>

##### Properties

<div id="shellexecution-commandline"></div>

<details>
<summary><code>commandLine: string</code></summary>

The shell command line. Is `undefined` if created with a command and arguments.

</details>

<div id="shellexecution-options"></div>

<details>
<summary><code>options: <a href="#shellexecutionoptions">ShellExecutionOptions</a></code></summary>

The shell options used when the command line is executed in a shell.
Defaults to undefined.

</details>

<div id="shellexecution-command"></div>

<details>
<summary><code>command: string | <a href="#shellquotedstring">ShellQuotedString</a></code></summary>

The shell command. Is `undefined` if created with a full command line.

</details>

<div id="shellexecution-args"></div>

<details>
<summary><code>args: (string | <a href="#shellquotedstring">ShellQuotedString</a>)[]</code></summary>

The shell args. Is `undefined` if created with a full command line.

</details>

---

#### SignatureHelp {#signaturehelp}

Signature help represents the signature of something
callable. There can be multiple signatures but only one
active and only one active parameter.

##### Properties

<div id="signaturehelp-signatures"></div>

<details>
<summary><code>signatures: <a href="#signatureinformation">SignatureInformation</a>[]</code></summary>

One or more signatures.

</details>

<div id="signaturehelp-activesignature"></div>

<details>
<summary><code>activeSignature: number</code></summary>

The active signature.

</details>

<div id="signaturehelp-activeparameter"></div>

<details>
<summary><code>activeParameter: number</code></summary>

The active parameter of the active signature.

</details>

---

#### SignatureInformation {#signatureinformation}

Represents the signature of something callable. A signature
can have a label, like a function-name, a doc-comment, and
a set of parameters.

##### Constructors

<details>
<summary><code>constructor(label: string, documentation?: string | MarkdownString);</code></summary>

Creates a new signature information object.

</details>

##### Properties

<div id="signatureinformation-label"></div>

<details>
<summary><code>label: string</code></summary>

The label of this signature. Will be shown in
the UI.

</details>

<div id="signatureinformation-documentation"></div>

<details>
<summary><code>documentation: string | <a href="#markdownstring">MarkdownString</a></code></summary>

The human-readable doc-comment of this signature. Will be shown
in the UI but can be omitted.

</details>

<div id="signatureinformation-parameters"></div>

<details>
<summary><code>parameters: <a href="#parameterinformation">ParameterInformation</a>[]</code></summary>

The parameters of this signature.

</details>

<div id="signatureinformation-activeparameter"></div>

<details>
<summary><code>activeParameter: number</code></summary>

The index of the active parameter.

If provided, this is used in place of SignatureHelp.activeParameter.

</details>

---

#### SnippetString {#snippetstring}

A snippet string is a template which allows to insert text
and to control the editor cursor when insertion happens.

##### Constructors

<details>
<summary><code>constructor(value?: string);</code></summary>

</details>

##### Properties

<div id="snippetstring-value"></div>

<details>
<summary><code>value: string</code></summary>

The snippet string.

</details>

##### Methods

<div id="snippetstring-appendtext"></div>

<details>
<summary><code>appendText(string: string): SnippetString;</code></summary>

Builder-function that appends the given string to
the [`value`](#SnippetString.value) of this snippet string.

</details>

<div id="snippetstring-appendtabstop"></div>

<details>
<summary><code>appendTabstop(number?: number): SnippetString;</code></summary>

Builder-function that appends a tabstop (`$1`, `$2` etc) to
the [`value`](#SnippetString.value) of this snippet string.

</details>

<div id="snippetstring-appendplaceholder"></div>

<details>
<summary><code>appendPlaceholder(value: string | ((snippet: SnippetString) =&gt; any), number?: number): SnippetString;</code></summary>

Builder-function that appends a placeholder (`$&#123;1:value&#125;`) to
the [`value`](#SnippetString.value) of this snippet string.

</details>

<div id="snippetstring-appendchoice"></div>

<details>
<summary><code>appendChoice(values: string[], number?: number): SnippetString;</code></summary>

Builder-function that appends a choice (`$&#123;1|a,b,c|&#125;`) to
the value of this snippet string.

</details>

<div id="snippetstring-appendvariable"></div>

<details>
<summary><code>appendVariable(name: string, defaultValue: string | ((snippet: SnippetString) =&gt; any)): SnippetString;</code></summary>

Builder-function that appends a variable (`$&#123;VAR&#125;`) to
the [`value`](#SnippetString.value) of this snippet string.

</details>

---

#### SnippetTextEdit {#snippettextedit}

A snippet edit represents an interactive edit that is performed by
the editor.

*Note* that a snippet edit can always be performed as a normal <a href="#textedit">text edit</a>.
This will happen when no matching editor is open or when a <a href="#workspaceedit">workspace edit</a>
contains snippet edits for multiple files. In that case only those that match the active editor
will be performed as snippet edits and the others as normal text edits.

##### Constructors

<details>
<summary><code>constructor(range: Range, snippet: SnippetString);</code></summary>

Create a new snippet edit.

</details>

##### Properties

<div id="snippettextedit-range"></div>

<details>
<summary><code>range: <a href="#range">Range</a></code></summary>

The range this edit applies to.

</details>

<div id="snippettextedit-snippet"></div>

<details>
<summary><code>snippet: <a href="#snippetstring">SnippetString</a></code></summary>

The <a href="#snippetstring">snippet</a> this edit will perform.

</details>

##### Methods

<div id="snippettextedit-replace"></div>

<details>
<summary><code>static replace(range: Range, snippet: SnippetString): SnippetTextEdit;</code></summary>

Utility to create a replace snippet edit.

</details>

<div id="snippettextedit-insert"></div>

<details>
<summary><code>static insert(position: Position, snippet: SnippetString): SnippetTextEdit;</code></summary>

Utility to create an insert snippet edit.

</details>

---

#### SourceBreakpoint {#sourcebreakpoint}

A breakpoint specified by a source location.

##### Constructors

<details>
<summary><code>constructor(location: Location, enabled?: boolean, condition?: string, hitCondition?: string, logMessage?: string);</code></summary>

Create a new breakpoint for a source location.

</details>

##### Properties

<div id="sourcebreakpoint-location"></div>

<details>
<summary><code>location: <a href="#location">Location</a></code></summary>

The source and line position of this breakpoint.

**只读**: 是

</details>

---

#### StatementCoverage {#statementcoverage}

Contains coverage information for a single statement or line.

##### Constructors

<details>
<summary><code>constructor(executed: number | boolean, location: Position | Range, branches?: BranchCoverage[]);</code></summary>

</details>

##### Properties

<div id="statementcoverage-executed"></div>

<details>
<summary><code>executed: number | boolean</code></summary>

The number of times this statement was executed, or a boolean indicating
whether it was executed if the exact count is unknown. If zero or false,
the statement will be marked as un-covered.

</details>

<div id="statementcoverage-location"></div>

<details>
<summary><code>location: <a href="#position">Position</a> | <a href="#range">Range</a></code></summary>

Statement location.

</details>

<div id="statementcoverage-branches"></div>

<details>
<summary><code>branches: <a href="#branchcoverage">BranchCoverage</a>[]</code></summary>

Coverage from branches of this line or statement. If it's not a
conditional, this will be empty.

</details>

---

#### SymbolInformation {#symbolinformation}

Represents information about programming constructs like variables, classes,
interfaces etc.

##### Constructors

<details>
<summary><code>constructor(name: string, kind: SymbolKind, containerName: string, location: Location);</code></summary>

Creates a new symbol information object.

</details>

<details>
<summary><code>constructor(name: string, kind: SymbolKind, range: Range, uri?: Uri, containerName?: string);</code></summary>

~~Creates a new symbol information object.~~

</details>

##### Properties

<div id="symbolinformation-name"></div>

<details>
<summary><code>name: string</code></summary>

The name of this symbol.

</details>

<div id="symbolinformation-containername"></div>

<details>
<summary><code>containerName: string</code></summary>

The name of the symbol containing this symbol.

</details>

<div id="symbolinformation-kind"></div>

<details>
<summary><code>kind: <a href="#symbolkind">SymbolKind</a></code></summary>

The kind of this symbol.

</details>

<div id="symbolinformation-tags"></div>

<details>
<summary><code>tags: ReadonlyArray&lt;<a href="#symboltag">SymbolTag</a>&gt;</code></summary>

</details>

<div id="symbolinformation-location"></div>

<details>
<summary><code>location: <a href="#location">Location</a></code></summary>

The location of this symbol.

</details>

---

#### TabInputCustom {#tabinputcustom}

The tab represents a custom editor.

##### Constructors

<details>
<summary><code>constructor(uri: Uri, viewType: string);</code></summary>

Constructs a custom editor tab input.

</details>

##### Properties

<div id="tabinputcustom-uri"></div>

<details>
<summary><code>uri: <a href="#uri">Uri</a></code></summary>

The uri that the tab is representing.

**只读**: 是

</details>

<div id="tabinputcustom-viewtype"></div>

<details>
<summary><code>viewType: string</code></summary>

The type of custom editor.

**只读**: 是

</details>

---

#### TabInputNotebook {#tabinputnotebook}

The tab represents a notebook.

##### Constructors

<details>
<summary><code>constructor(uri: Uri, notebookType: string);</code></summary>

Constructs a new tab input for a notebook.

</details>

##### Properties

<div id="tabinputnotebook-uri"></div>

<details>
<summary><code>uri: <a href="#uri">Uri</a></code></summary>

The uri that the tab is representing.

**只读**: 是

</details>

<div id="tabinputnotebook-notebooktype"></div>

<details>
<summary><code>notebookType: string</code></summary>

The type of notebook. Maps to NotebookDocuments's notebookType

**只读**: 是

</details>

---

#### TabInputNotebookDiff {#tabinputnotebookdiff}

The tabs represents two notebooks in a diff configuration.

##### Constructors

<details>
<summary><code>constructor(original: Uri, modified: Uri, notebookType: string);</code></summary>

Constructs a notebook diff tab input.

</details>

##### Properties

<div id="tabinputnotebookdiff-original"></div>

<details>
<summary><code>original: <a href="#uri">Uri</a></code></summary>

The uri of the original notebook.

**只读**: 是

</details>

<div id="tabinputnotebookdiff-modified"></div>

<details>
<summary><code>modified: <a href="#uri">Uri</a></code></summary>

The uri of the modified notebook.

**只读**: 是

</details>

<div id="tabinputnotebookdiff-notebooktype"></div>

<details>
<summary><code>notebookType: string</code></summary>

The type of notebook. Maps to NotebookDocuments's notebookType

**只读**: 是

</details>

---

#### TabInputTerminal {#tabinputterminal}

The tab represents a terminal in the editor area.

##### Constructors

<details>
<summary><code>constructor();</code></summary>

Constructs a terminal tab input.

</details>

---

#### TabInputText {#tabinputtext}

The tab represents a single text based resource.

##### Constructors

<details>
<summary><code>constructor(uri: Uri);</code></summary>

Constructs a text tab input with the given URI.

</details>

##### Properties

<div id="tabinputtext-uri"></div>

<details>
<summary><code>uri: <a href="#uri">Uri</a></code></summary>

The uri represented by the tab.

**只读**: 是

</details>

---

#### TabInputTextDiff {#tabinputtextdiff}

The tab represents two text based resources
being rendered as a diff.

##### Constructors

<details>
<summary><code>constructor(original: Uri, modified: Uri);</code></summary>

Constructs a new text diff tab input with the given URIs.

</details>

##### Properties

<div id="tabinputtextdiff-original"></div>

<details>
<summary><code>original: <a href="#uri">Uri</a></code></summary>

The uri of the original text resource.

**只读**: 是

</details>

<div id="tabinputtextdiff-modified"></div>

<details>
<summary><code>modified: <a href="#uri">Uri</a></code></summary>

The uri of the modified text resource.

**只读**: 是

</details>

---

#### TabInputWebview {#tabinputwebview}

The tab represents a webview.

##### Constructors

<details>
<summary><code>constructor(viewType: string);</code></summary>

Constructs a webview tab input with the given view type.

</details>

##### Properties

<div id="tabinputwebview-viewtype"></div>

<details>
<summary><code>viewType: string</code></summary>

The type of webview. Maps to WebviewPanel's viewType

**只读**: 是

</details>

---

#### Task {#task}

##### Constructors

<details>
<summary><code>constructor( taskDefinition: TaskDefinition, scope: WorkspaceFolder | TaskScope.Global | TaskScope.Workspace, name: string, source?: string, execution?: ProcessExecution | ShellExecution | CustomExecution, problemMatchers?: string | string[]);</code></summary>

Creates a new task.

</details>

<details>
<summary><code>constructor( taskDefinition: TaskDefinition, name: string, source: string, execution?: ProcessExecution | ShellExecution | CustomExecution, problemMatchers?: string | string[]);</code></summary>

~~Creates a new task.~~

</details>

##### Properties

<div id="task-name"></div>

<details>
<summary><code>name: string</code></summary>

The task's name

</details>

<div id="task-definition"></div>

<details>
<summary><code>definition: <a href="#taskdefinition">TaskDefinition</a></code></summary>

The task's definition.

</details>

<div id="task-scope"></div>

<details>
<summary><code>scope: <a href="#taskscope">TaskScope</a>.Global | <a href="#taskscope">TaskScope</a>.Workspace | <a href="#workspacefolder">WorkspaceFolder</a></code></summary>

The task's scope.

</details>

<div id="task-execution"></div>

<details>
<summary><code>execution: <a href="#processexecution">ProcessExecution</a> | <a href="#shellexecution">ShellExecution</a> | <a href="#customexecution">CustomExecution</a></code></summary>

The task's execution engine

</details>

<div id="task-isbackground"></div>

<details>
<summary><code>isBackground: boolean</code></summary>

Whether the task is a background task or not.

</details>

<div id="task-source"></div>

<details>
<summary><code>source: string</code></summary>

A human-readable string describing the source of this
shell task, e.g. 'gulp' or 'npm'.

</details>

<div id="task-detail"></div>

<details>
<summary><code>detail: string</code></summary>

A human-readable string which is rendered less prominently on a separate line in places
where the task's name is displayed. Supports rendering of <a href="#themeicon">theme icons</a>
via the `$(&lt;name&gt;)`-syntax.

</details>

<div id="task-group"></div>

<details>
<summary><code>group: <a href="#taskgroup">TaskGroup</a></code></summary>

The task group this tasks belongs to. See TaskGroup
for a predefined set of available groups.
Defaults to undefined meaning that the task doesn't
belong to any special group.

</details>

<div id="task-presentationoptions"></div>

<details>
<summary><code>presentationOptions: <a href="#taskpresentationoptions">TaskPresentationOptions</a></code></summary>

The presentation options. Defaults to an empty literal.

</details>

<div id="task-problemmatchers"></div>

<details>
<summary><code>problemMatchers: string[]</code></summary>

The problem matchers attached to the task. Defaults to an empty
array.

</details>

<div id="task-runoptions"></div>

<details>
<summary><code>runOptions: <a href="#runoptions">RunOptions</a></code></summary>

Run options for the task

</details>

---

#### Task2 {#task2}

Task2 is kept for compatibility reasons.

---

#### TaskGroup {#taskgroup}

##### Constructors

<details>
<summary><code>private constructor(id: string, label: string);</code></summary>

</details>

##### Properties

<div id="taskgroup-clean"></div>

<details>
<summary><code>Clean: <a href="#taskgroup">TaskGroup</a></code></summary>

The clean task group

</details>

<div id="taskgroup-build"></div>

<details>
<summary><code>Build: <a href="#taskgroup">TaskGroup</a></code></summary>

The build task group

</details>

<div id="taskgroup-rebuild"></div>

<details>
<summary><code>Rebuild: <a href="#taskgroup">TaskGroup</a></code></summary>

The rebuild all task group

</details>

<div id="taskgroup-test"></div>

<details>
<summary><code>Test: <a href="#taskgroup">TaskGroup</a></code></summary>

The test all task group

</details>

<div id="taskgroup-isdefault"></div>

<details>
<summary><code>isDefault: boolean | undefined</code></summary>

Whether the task that is part of this group is the default for the group.
This property cannot be set through API, and is controlled by a user's task configurations.

**只读**: 是

</details>

<div id="taskgroup-id"></div>

<details>
<summary><code>id: string</code></summary>

The ID of the task group. Is one of TaskGroup.Clean.id, TaskGroup.Build.id, TaskGroup.Rebuild.id, or TaskGroup.Test.id.

**只读**: 是

</details>

---

#### TelemetryTrustedValue {#telemetrytrustedvalue}

A special value wrapper denoting a value that is safe to not clean.
This is to be used when you can guarantee no identifiable information is contained in the value and the cleaning is improperly redacting it.

##### Constructors

<details>
<summary><code>constructor(value: T);</code></summary>

</details>

##### Properties

<div id="telemetrytrustedvalue-value"></div>

<details>
<summary><code>value: T</code></summary>

**只读**: 是

</details>

---

#### TerminalLink {#terminallink}

A link on a terminal line.

##### Constructors

<details>
<summary><code>constructor(startIndex: number, length: number, tooltip?: string);</code></summary>

Creates a new terminal link.

</details>

##### Properties

<div id="terminallink-startindex"></div>

<details>
<summary><code>startIndex: number</code></summary>

The start index of the link on [TerminalLinkContext.line](#TerminalLinkContext.line].

</details>

<div id="terminallink-length"></div>

<details>
<summary><code>length: number</code></summary>

The length of the link on [TerminalLinkContext.line](#TerminalLinkContext.line]

</details>

<div id="terminallink-tooltip"></div>

<details>
<summary><code>tooltip: string</code></summary>

The tooltip text when you hover over this link.

If a tooltip is provided, is will be displayed in a string that includes instructions on
how to trigger the link, such as `&#123;0&#125; (ctrl + click)`. The specific instructions vary
depending on OS, user settings, and localization.

</details>

---

#### TerminalProfile {#terminalprofile}

A terminal profile defines how a terminal will be launched.

##### Constructors

<details>
<summary><code>constructor(options: TerminalOptions | ExtensionTerminalOptions);</code></summary>

Creates a new terminal profile.

</details>

##### Properties

<div id="terminalprofile-options"></div>

<details>
<summary><code>options: <a href="#terminaloptions">TerminalOptions</a> | <a href="#extensionterminaloptions">ExtensionTerminalOptions</a></code></summary>

The options that the terminal will launch with.

</details>

---

#### TerminalQuickFixOpener {#terminalquickfixopener}

##### Constructors

<details>
<summary><code>constructor(uri: Uri);</code></summary>

</details>

##### Properties

<div id="terminalquickfixopener-uri"></div>

<details>
<summary><code>uri: <a href="#uri">Uri</a></code></summary>

The uri to open

</details>

---

#### TerminalQuickFixTerminalCommand {#terminalquickfixterminalcommand}

##### Constructors

<details>
<summary><code>constructor(terminalCommand: string, shouldExecute?: boolean);</code></summary>

</details>

##### Properties

<div id="terminalquickfixterminalcommand-terminalcommand"></div>

<details>
<summary><code>terminalCommand: string</code></summary>

The terminal command to insert or run

</details>

<div id="terminalquickfixterminalcommand-shouldexecute"></div>

<details>
<summary><code>shouldExecute: boolean</code></summary>

Whether the command should be executed or just inserted (default)

</details>

---

#### TestCoverageCount {#testcoveragecount}

A class that contains information about a covered resource. A count can
be give for lines, branches, and declarations in a file.

##### Constructors

<details>
<summary><code>constructor(covered: number, total: number);</code></summary>

</details>

##### Properties

<div id="testcoveragecount-covered"></div>

<details>
<summary><code>covered: number</code></summary>

Number of items covered in the file.

</details>

<div id="testcoveragecount-total"></div>

<details>
<summary><code>total: number</code></summary>

Total number of covered items in the file.

</details>

---

#### TestMessage {#testmessage}

Message associated with the test state. Can be linked to a specific
source range -- useful for assertion failures, for example.

##### Constructors

<details>
<summary><code>constructor(message: string | MarkdownString);</code></summary>

Creates a new TestMessage instance.

</details>

##### Properties

<div id="testmessage-message"></div>

<details>
<summary><code>message: string | <a href="#markdownstring">MarkdownString</a></code></summary>

Human-readable message text to display.

</details>

<div id="testmessage-expectedoutput"></div>

<details>
<summary><code>expectedOutput: string</code></summary>

Expected test output. If given with actualOutput , a diff view will be shown.

</details>

<div id="testmessage-actualoutput"></div>

<details>
<summary><code>actualOutput: string</code></summary>

Actual test output. If given with expectedOutput , a diff view will be shown.

</details>

<div id="testmessage-location"></div>

<details>
<summary><code>location: <a href="#location">Location</a></code></summary>

Associated file location.

</details>

<div id="testmessage-contextvalue"></div>

<details>
<summary><code>contextValue: string</code></summary>

Context value of the test item. This can be used to contribute message-
specific actions to the test peek view. The value set here can be found
in the `testMessage` property of the following `menus` contribution points:

- `testing/message/context` - context menu for the message in the results tree
- `testing/message/content` - a prominent button overlaying editor content where
   the message is displayed.

For example:

```json
"contributes": &#123;
  "menus": &#123;
    "testing/message/content": [
      &#123;
        "command": "extension.deleteCommentThread",
        "when": "testMessage == canApplyRichDiff"
      &#125;
    ]
  &#125;
&#125;
```

The command will be called with an object containing:
- `test`: the <a href="#testitem">TestItem</a> the message is associated with, *if* it
   is still present in the items collection.
- `message`: the <a href="#testmessage">TestMessage</a> instance.

</details>

<div id="testmessage-stacktrace"></div>

<details>
<summary><code>stackTrace: <a href="#testmessagestackframe">TestMessageStackFrame</a>[]</code></summary>

The stack trace associated with the message or failure.

</details>

##### Methods

<div id="testmessage-diff"></div>

<details>
<summary><code>static diff(message: string | MarkdownString, expected: string, actual: string): TestMessage;</code></summary>

Creates a new TestMessage that will present as a diff in the editor.

</details>

---

#### TestMessageStackFrame {#testmessagestackframe}

A stack frame found in the stackTrace.

##### Constructors

<details>
<summary><code>constructor(label: string, uri?: Uri, position?: Position);</code></summary>

</details>

##### Properties

<div id="testmessagestackframe-uri"></div>

<details>
<summary><code>uri: <a href="#uri">Uri</a></code></summary>

The location of this stack frame. This should be provided as a URI if the
location of the call frame can be accessed by the editor.

</details>

<div id="testmessagestackframe-position"></div>

<details>
<summary><code>position: <a href="#position">Position</a></code></summary>

Position of the stack frame within the file.

</details>

<div id="testmessagestackframe-label"></div>

<details>
<summary><code>label: string</code></summary>

The name of the stack frame, typically a method or function name.

</details>

---

#### TestRunRequest {#testrunrequest}

A TestRunRequest is a precursor to a <a href="#testrun">TestRun</a>, which in turn is
created by passing a request to createTestRun. The
TestRunRequest contains information about which tests should be run, which
should not be run, and how they are run (via the profile).

In general, TestRunRequests are created by the editor and pass to
runHandler, however you can also create test
requests and runs outside of the `runHandler`.

##### Constructors

<details>
<summary><code>constructor(include?: readonly TestItem[], exclude?: readonly TestItem[], profile?: TestRunProfile, continuous?: boolean, preserveFocus?: boolean);</code></summary>

</details>

##### Properties

<div id="testrunrequest-include"></div>

<details>
<summary><code>include: readonly <a href="#testitem">TestItem</a>[] | undefined</code></summary>

A filter for specific tests to run. If given, the extension should run
all of the included tests and all their children, excluding any tests
that appear in exclude. If this property is
undefined, then the extension should simply run all tests.

The process of running tests should resolve the children of any test
items who have not yet been resolved.

**只读**: 是

</details>

<div id="testrunrequest-exclude"></div>

<details>
<summary><code>exclude: readonly <a href="#testitem">TestItem</a>[] | undefined</code></summary>

An array of tests the user has marked as excluded from the test included
in this run; exclusions should apply after inclusions.

May be omitted if no exclusions were requested. Test controllers should
not run excluded tests or any children of excluded tests.

**只读**: 是

</details>

<div id="testrunrequest-profile"></div>

<details>
<summary><code>profile: <a href="#testrunprofile">TestRunProfile</a> | undefined</code></summary>

The profile used for this request. This will always be defined
for requests issued from the editor UI, though extensions may
programmatically create requests not associated with any profile.

**只读**: 是

</details>

<div id="testrunrequest-continuous"></div>

<details>
<summary><code>continuous: boolean</code></summary>

Whether the profile should run continuously as source code changes. Only
relevant for profiles that set supportsContinuousRun.

**只读**: 是

</details>

<div id="testrunrequest-preservefocus"></div>

<details>
<summary><code>preserveFocus: boolean</code></summary>

Controls how test Test Results view is focused.  If true, the editor
will keep the maintain the user's focus. If false, the editor will
prefer to move focus into the Test Results view, although
this may be configured by users.

**只读**: 是

</details>

---

#### TestTag {#testtag}

Tags can be associated with <a href="#testitem">TestItems</a> and
<a href="#testrunprofile">TestRunProfiles</a>. A profile with a tag can only
execute tests that include that tag in their tags array.

##### Constructors

<details>
<summary><code>constructor(id: string);</code></summary>

Creates a new TestTag instance.

</details>

##### Properties

<div id="testtag-id"></div>

<details>
<summary><code>id: string</code></summary>

ID of the test tag. `TestTag` instances with the same ID are considered
to be identical.

**只读**: 是

</details>

---

#### TextEdit {#textedit}

A text edit represents edits that should be applied
to a document.

##### Constructors

<details>
<summary><code>constructor(range: Range, newText: string);</code></summary>

Create a new TextEdit.

</details>

##### Properties

<div id="textedit-range"></div>

<details>
<summary><code>range: <a href="#range">Range</a></code></summary>

The range this edit applies to.

</details>

<div id="textedit-newtext"></div>

<details>
<summary><code>newText: string</code></summary>

The string this edit will insert.

</details>

<div id="textedit-neweol"></div>

<details>
<summary><code>newEol: <a href="#endofline">EndOfLine</a></code></summary>

The eol-sequence used in the document.

*Note* that the eol-sequence will be applied to the
whole document.

</details>

##### Methods

<div id="textedit-replace"></div>

<details>
<summary><code>static replace(range: Range, newText: string): TextEdit;</code></summary>

Utility to create a replace edit.

</details>

<div id="textedit-insert"></div>

<details>
<summary><code>static insert(position: Position, newText: string): TextEdit;</code></summary>

Utility to create an insert edit.

</details>

<div id="textedit-delete"></div>

<details>
<summary><code>static delete(range: Range): TextEdit;</code></summary>

Utility to create a delete edit.

</details>

<div id="textedit-setendofline"></div>

<details>
<summary><code>static setEndOfLine(eol: EndOfLine): TextEdit;</code></summary>

Utility to create an eol-edit.

</details>

---

#### ThemeColor {#themecolor}

A reference to one of the workbench colors.
Using a theme color is preferred over a custom color as it gives theme authors and users the possibility to change the color.

##### Constructors

<details>
<summary><code>constructor(id: string);</code></summary>

Creates a reference to a theme color.

</details>

##### Properties

<div id="themecolor-id"></div>

<details>
<summary><code>id: string</code></summary>

The id of this color.

**只读**: 是

</details>

---

#### ThemeIcon {#themeicon}

A reference to a named icon. Currently only File and Folder are supported.
Using a theme icon is preferred over a custom icon as it gives theme authors the possibility to change the icons.

##### Constructors

<details>
<summary><code>private constructor(id: string, color?: ThemeColor);</code></summary>

Creates a reference to a theme icon.

</details>

##### Properties

<div id="themeicon-file"></div>

<details>
<summary><code>File: <a href="#themeicon">ThemeIcon</a></code></summary>

Reference to a icon representing a file. The icon is taken from the current file icon theme or a placeholder icon.

**只读**: 是

</details>

<div id="themeicon-folder"></div>

<details>
<summary><code>Folder: <a href="#themeicon">ThemeIcon</a></code></summary>

Reference to a icon representing a folder. The icon is taken from the current file icon theme or a placeholder icon.

**只读**: 是

</details>

<div id="themeicon-id"></div>

<details>
<summary><code>id: string</code></summary>

The id of the icon. The available icons are listed in https://code.visualstudio.com/api/references/icons-in-labels#icon-listing.

**只读**: 是

</details>

<div id="themeicon-color"></div>

<details>
<summary><code>color: <a href="#themecolor">ThemeColor</a> | undefined</code></summary>

The optional ThemeColor of the icon. The color is currently only used in <a href="#treeitem">TreeItem</a>.

**只读**: 是

</details>

---

#### TimelineItem {#timelineitem}

##### Constructors

<details>
<summary><code>constructor(label: string, timestamp: number);</code></summary>

</details>

##### Properties

<div id="timelineitem-timestamp"></div>

<details>
<summary><code>timestamp: number</code></summary>

A timestamp (in milliseconds since 1 January 1970 00:00:00) for when the timeline item occurred.

</details>

<div id="timelineitem-label"></div>

<details>
<summary><code>label: string</code></summary>

A human-readable string describing the timeline item.

</details>

<div id="timelineitem-id"></div>

<details>
<summary><code>id: string</code></summary>

Optional id for the timeline item. It must be unique across all the timeline items provided by this source.

If not provided, an id is generated using the timeline item's timestamp.

</details>

<div id="timelineitem-iconpath"></div>

<details>
<summary><code>iconPath: <a href="#uri">Uri</a> | &#123; light: <a href="#uri">Uri</a>; dark: <a href="#uri">Uri</a> &#125; | <a href="#themeicon">ThemeIcon</a></code></summary>

The icon path or [ThemeIcon](#ThemeIcon) for the timeline item.

</details>

<div id="timelineitem-description"></div>

<details>
<summary><code>description: string</code></summary>

A human readable string describing less prominent details of the timeline item.

</details>

<div id="timelineitem-detail"></div>

<details>
<summary><code>detail: string</code></summary>

The tooltip text when you hover over the timeline item.

</details>

<div id="timelineitem-command"></div>

<details>
<summary><code>command: <a href="#command">Command</a></code></summary>

The [command](#Command) that should be executed when the timeline item is selected.

</details>

<div id="timelineitem-contextvalue"></div>

<details>
<summary><code>contextValue: string</code></summary>

Context value of the timeline item. This can be used to contribute specific actions to the item.
For example, a timeline item is given a context value as `commit`. When contributing actions to `timeline/item/context`
using `menus` extension point, you can specify context value for key `timelineItem` in `when` expression like `timelineItem == commit`.
```
"contributes": &#123;
  "menus": &#123;
    "timeline/item/context": [&#123;
      "command": "extension.copyCommitId",
      "when": "timelineItem == commit"
     &#125;]
  &#125;
&#125;
```
This will show the `extension.copyCommitId` action only for items where `contextValue` is `commit`.

</details>

<div id="timelineitem-accessibilityinformation"></div>

<details>
<summary><code>accessibilityInformation: <a href="#accessibilityinformation">AccessibilityInformation</a></code></summary>

Accessibility information used when screen reader interacts with this timeline item.

</details>

---

#### TreeItem {#treeitem}

##### Constructors

<details>
<summary><code>constructor(label: string | TreeItemLabel, collapsibleState?: TreeItemCollapsibleState);</code></summary>

</details>

<details>
<summary><code>constructor(resourceUri: Uri, collapsibleState?: TreeItemCollapsibleState);</code></summary>

</details>

##### Properties

<div id="treeitem-label"></div>

<details>
<summary><code>label: string | <a href="#treeitemlabel">TreeItemLabel</a></code></summary>

A human-readable string describing this item. When `falsy`, it is derived from resourceUri.

</details>

<div id="treeitem-id"></div>

<details>
<summary><code>id: string</code></summary>

Optional id for the tree item that has to be unique across tree. The id is used to preserve the selection and expansion state of the tree item.

If not provided, an id is generated using the tree item's label. **Note** that when labels change, ids will change and that selection and expansion state cannot be kept stable anymore.

</details>

<div id="treeitem-iconpath"></div>

<details>
<summary><code>iconPath: string | <a href="#iconpath">IconPath</a></code></summary>

The icon path or <a href="#themeicon">ThemeIcon</a> for the tree item.
When `falsy`, Folder Theme Icon is assigned, if item is collapsible otherwise File Theme Icon.
When a <a href="#themeicon">ThemeIcon</a> is specified, icon is derived from the current file icon theme for the specified theme icon using resourceUri (if provided).

</details>

<div id="treeitem-description"></div>

<details>
<summary><code>description: string | boolean</code></summary>

A human readable string which is rendered less prominent.
When `true`, it is derived from resourceUri and when `falsy`, it is not shown.

</details>

<div id="treeitem-resourceuri"></div>

<details>
<summary><code>resourceUri: <a href="#uri">Uri</a></code></summary>

The <a href="#uri">uri</a> of the resource representing this item.

Will be used to derive the label, when it is not provided.
Will be used to derive the icon from current icon theme, when iconPath has <a href="#themeicon">ThemeIcon</a> value.

</details>

<div id="treeitem-tooltip"></div>

<details>
<summary><code>tooltip: string | <a href="#markdownstring">MarkdownString</a> | undefined</code></summary>

The tooltip text when you hover over this item.

</details>

<div id="treeitem-command"></div>

<details>
<summary><code>command: <a href="#command">Command</a></code></summary>

The <a href="#command">command</a> which should be run when the tree item is selected.

</details>

<div id="treeitem-collapsiblestate"></div>

<details>
<summary><code>collapsibleState: <a href="#treeitemcollapsiblestate">TreeItemCollapsibleState</a></code></summary>

<a href="#treeitemcollapsiblestate">TreeItemCollapsibleState</a> of the tree item.

</details>

<div id="treeitem-contextvalue"></div>

<details>
<summary><code>contextValue: string</code></summary>

Context value of the tree item. This can be used to contribute item specific actions in the tree.
For example, a tree item is given a context value as `folder`. When contributing actions to `view/item/context`
using `menus` extension point, you can specify context value for key `viewItem` in `when` expression like `viewItem == folder`.
```
   "contributes": &#123;
       "menus": &#123;
           "view/item/context": [
               &#123;
                   "command": "extension.deleteFolder",
                   "when": "viewItem == folder"
               &#125;
           ]
       &#125;
   &#125;
```
This will show action `extension.deleteFolder` only for items with `contextValue` is `folder`.

</details>

<div id="treeitem-accessibilityinformation"></div>

<details>
<summary><code>accessibilityInformation: <a href="#accessibilityinformation">AccessibilityInformation</a></code></summary>

Accessibility information used when screen reader interacts with this tree item.
Generally, a TreeItem has no need to set the `role` of the accessibilityInformation;
however, there are cases where a TreeItem is not displayed in a tree-like way where setting the `role` may make sense.

</details>

<div id="treeitem-checkboxstate"></div>

<details>
<summary><code>checkboxState: <a href="#treeitemcheckboxstate">TreeItemCheckboxState</a> | &#123; readonly state: <a href="#treeitemcheckboxstate">TreeItemCheckboxState</a>; readonly tooltip?: string; readonly accessibilityInformation?: <a href="#accessibilityinformation">AccessibilityInformation</a> &#125;</code></summary>

<a href="#treeitemcheckboxstate">TreeItemCheckboxState</a> of the tree item.
onDidChangeTreeData should be fired when checkboxState changes.

</details>

---

#### TypeHierarchyItem {#typehierarchyitem}

Represents an item of a type hierarchy, like a class or an interface.

##### Constructors

<details>
<summary><code>constructor(kind: SymbolKind, name: string, detail: string, uri: Uri, range: Range, selectionRange: Range);</code></summary>

Creates a new type hierarchy item.

</details>

##### Properties

<div id="typehierarchyitem-name"></div>

<details>
<summary><code>name: string</code></summary>

The name of this item.

</details>

<div id="typehierarchyitem-kind"></div>

<details>
<summary><code>kind: <a href="#symbolkind">SymbolKind</a></code></summary>

The kind of this item.

</details>

<div id="typehierarchyitem-tags"></div>

<details>
<summary><code>tags: ReadonlyArray&lt;<a href="#symboltag">SymbolTag</a>&gt;</code></summary>

Tags for this item.

</details>

<div id="typehierarchyitem-detail"></div>

<details>
<summary><code>detail: string</code></summary>

More detail for this item, e.g. the signature of a function.

</details>

<div id="typehierarchyitem-uri"></div>

<details>
<summary><code>uri: <a href="#uri">Uri</a></code></summary>

The resource identifier of this item.

</details>

<div id="typehierarchyitem-range"></div>

<details>
<summary><code>range: <a href="#range">Range</a></code></summary>

The range enclosing this symbol not including leading/trailing whitespace
but everything else, e.g. comments and code.

</details>

<div id="typehierarchyitem-selectionrange"></div>

<details>
<summary><code>selectionRange: <a href="#range">Range</a></code></summary>

The range that should be selected and revealed when this symbol is being
picked, e.g. the name of a class. Must be contained by the range-property.

</details>

---

#### Uri {#uri}

A universal resource identifier representing either a file on disk
or another resource, like untitled resources.

##### Constructors

<details>
<summary><code>private constructor(scheme: string, authority: string, path: string, query: string, fragment: string);</code></summary>

Use the `file` and `parse` factory functions to create new `Uri` objects.

</details>

##### Properties

<div id="uri-scheme"></div>

<details>
<summary><code>scheme: string</code></summary>

Scheme is the `http` part of `http://www.msft.com/some/path?query#fragment`.
The part before the first colon.

**只读**: 是

</details>

<div id="uri-authority"></div>

<details>
<summary><code>authority: string</code></summary>

Authority is the `www.msft.com` part of `http://www.msft.com/some/path?query#fragment`.
The part between the first double slashes and the next slash.

**只读**: 是

</details>

<div id="uri-path"></div>

<details>
<summary><code>path: string</code></summary>

Path is the `/some/path` part of `http://www.msft.com/some/path?query#fragment`.

**只读**: 是

</details>

<div id="uri-query"></div>

<details>
<summary><code>query: string</code></summary>

Query is the `query` part of `http://www.msft.com/some/path?query#fragment`.

**只读**: 是

</details>

<div id="uri-fragment"></div>

<details>
<summary><code>fragment: string</code></summary>

Fragment is the `fragment` part of `http://www.msft.com/some/path?query#fragment`.

**只读**: 是

</details>

<div id="uri-fspath"></div>

<details>
<summary><code>fsPath: string</code></summary>

The string representing the corresponding file system path of this Uri.

Will handle UNC paths and normalize windows drive letters to lower-case. Also
uses the platform specific path separator. Will *not* validate the path for
invalid characters and semantics. Will *not* look at the scheme of this Uri.

**只读**: 是

</details>

##### Methods

<div id="uri-file"></div>

<details>
<summary><code>static file(path: string): Uri;</code></summary>

Create an URI from a file system path. The scheme
will be `file`.

</details>

<div id="uri-joinpath"></div>

<details>
<summary><code>static joinPath(uri: Uri, ...pathSegments: string[]): Uri;</code></summary>

Create a new uri which path is the result of joining
the path of the base uri with the provided path segments.

- Note 1: `joinPath` only affects the path component
and all other components (scheme, authority, query, and fragment) are
left as they are.
- Note 2: The base uri must have a path; an error is thrown otherwise.

The path segments are normalized in the following ways:
- sequences of path separators (`/` or `\`) are replaced with a single separator
- for `file`-uris on windows, the backslash-character (`\`) is considered a path-separator
- the `..`-segment denotes the parent segment, the `.` denotes the current segment
- paths have a root which always remains, for instance on windows drive-letters are roots
so that is true: `joinPath(Uri.file('file:///c:/root'), '../../other').fsPath === 'c:/other'`

</details>

<div id="uri-parse"></div>

<details>
<summary><code>static parse(value: string): Uri;</code></summary>

Create an URI from a string. Will throw if the given value is not
valid.

</details>

<div id="uri-from"></div>

<details>
<summary><code>static from(components: &#123; readonly scheme: string; readonly authority?: string; readonly path?: string; readonly query?: string; readonly fragment?: string &#125;): Uri;</code></summary>

Create an URI from its component parts

</details>

<div id="uri-with"></div>

<details>
<summary><code>with(change: &#123; scheme?: string; authority?: string; path?: string; query?: string; fragment?: string &#125;): Uri;</code></summary>

Derive a new Uri from this Uri.

```ts
let file = Uri.parse('before:some/file/path');
let other = file.with(&#123; scheme: 'after' &#125;);
assert.ok(other.toString() === 'after:some/file/path');
```

</details>

<div id="uri-tostring"></div>

<details>
<summary><code>toString(skipEncoding?: boolean): string;</code></summary>

Returns a string representation of this Uri. The representation and normalization
of a URI depends on the scheme. The resulting string can be safely used with
[Uri.parse](#Uri.parse).

</details>

<div id="uri-tojson"></div>

<details>
<summary><code>toJSON(): any;</code></summary>

Returns a JSON representation of this Uri.

</details>

---

#### WorkspaceEdit {#workspaceedit}

A workspace edit is a collection of textual and files changes for
multiple resources and documents.

Use the applyEdit-function to apply a workspace edit.

##### Properties

<div id="workspaceedit-size"></div>

<details>
<summary><code>size: number</code></summary>

The number of affected resources of textual or resource changes.

**只读**: 是

</details>

##### Methods

<div id="workspaceedit-replace"></div>

<details>
<summary><code>replace(uri: Uri, range: Range, newText: string, metadata?: WorkspaceEditEntryMetadata): void;</code></summary>

Replace the given range with given text for the given resource.

</details>

<div id="workspaceedit-insert"></div>

<details>
<summary><code>insert(uri: Uri, position: Position, newText: string, metadata?: WorkspaceEditEntryMetadata): void;</code></summary>

Insert the given text at the given position.

</details>

<div id="workspaceedit-delete"></div>

<details>
<summary><code>delete(uri: Uri, range: Range, metadata?: WorkspaceEditEntryMetadata): void;</code></summary>

Delete the text at the given range.

</details>

<div id="workspaceedit-has"></div>

<details>
<summary><code>has(uri: Uri): boolean;</code></summary>

Check if a text edit for a resource exists.

</details>

<div id="workspaceedit-set"></div>

<details>
<summary><code>set(uri: Uri, edits: ReadonlyArray&lt;TextEdit | SnippetTextEdit&gt;): void;</code></summary>

Set (and replace) text edits for a resource.

</details>

<div id="workspaceedit-set"></div>

<details>
<summary><code>set(uri: Uri, edits: ReadonlyArray&lt;[TextEdit | SnippetTextEdit, WorkspaceEditEntryMetadata | undefined]&gt;): void;</code></summary>

Set (and replace) text edits or snippet edits with metadata for a resource.

</details>

<div id="workspaceedit-set"></div>

<details>
<summary><code>set(uri: Uri, edits: readonly NotebookEdit[]): void;</code></summary>

Set (and replace) notebook edits for a resource.

</details>

<div id="workspaceedit-set"></div>

<details>
<summary><code>set(uri: Uri, edits: ReadonlyArray&lt;[NotebookEdit, WorkspaceEditEntryMetadata | undefined]&gt;): void;</code></summary>

Set (and replace) notebook edits with metadata for a resource.

</details>

<div id="workspaceedit-get"></div>

<details>
<summary><code>get(uri: Uri): TextEdit[];</code></summary>

Get the text edits for a resource.

</details>

<div id="workspaceedit-createfile"></div>

<details>
<summary><code>createFile(uri: Uri, options?: &#123; overwrite?: boolean, ignoreIfExists?: boolean &#125;, metadata?: WorkspaceEditEntryMetadata): void;</code></summary>

Create a regular file.

</details>

<div id="workspaceedit-deletefile"></div>

<details>
<summary><code>deleteFile(uri: Uri, options?: &#123; recursive?: boolean, ignoreIfNotExists?: boolean &#125;, metadata?: WorkspaceEditEntryMetadata): void;</code></summary>

Delete a file or folder.

</details>

<div id="workspaceedit-renamefile"></div>

<details>
<summary><code>renameFile(oldUri: Uri, newUri: Uri, options?: &#123; overwrite?: boolean, ignoreIfExists?: boolean &#125;, metadata?: WorkspaceEditEntryMetadata): void;</code></summary>

Rename a file or folder.

</details>

<div id="workspaceedit-entries"></div>

<details>
<summary><code>entries(): [Uri, TextEdit[]][];</code></summary>

Get all text edits grouped by resource.

</details>

---

#### AccessibilityInformation {#accessibilityinformation}

Accessibility information which controls screen reader behavior.

##### Properties

<div id="accessibilityinformation-label"></div>

<details>
<summary><code>label: string</code></summary>

Label to be read out by a screen reader once the item has focus.

**只读**: 是

</details>

<div id="accessibilityinformation-role"></div>

<details>
<summary><code>role: string</code></summary>

Role of the widget which defines how a screen reader interacts with it.
The role should be set in special cases when for example a tree-like element behaves like a checkbox.
If role is not specified the editor will pick the appropriate role automatically.
More about aria roles can be found here https://w3c.github.io/aria/#widget_roles

**只读**: 是

</details>

---

#### AuthenticationForceNewSessionOptions {#authenticationforcenewsessionoptions}

Optional options to be used when calling <a href="#authentication-getsession">getSession</a> with the flag `forceNewSession`.

##### Properties

<div id="authenticationforcenewsessionoptions-detail"></div>

<details>
<summary><code>detail: string</code></summary>

An optional message that will be displayed to the user when we ask to re-authenticate. Providing additional context
as to why you are asking a user to re-authenticate can help increase the odds that they will accept.

</details>

---

#### AuthenticationGetSessionOptions {#authenticationgetsessionoptions}

Options to be used when getting an <a href="#authenticationsession">AuthenticationSession</a> from an <a href="#authenticationprovider">AuthenticationProvider</a>.

##### Properties

<div id="authenticationgetsessionoptions-createifnone"></div>

<details>
<summary><code>createIfNone: boolean</code></summary>

Whether login should be performed if there is no matching session.

If true, a modal dialog will be shown asking the user to sign in. If false, a numbered badge will be shown
on the accounts activity bar icon. An entry for the extension will be added under the menu to sign in. This
allows quietly prompting the user to sign in.

Defaults to false.

</details>

<div id="authenticationgetsessionoptions-clearsessionpreference"></div>

<details>
<summary><code>clearSessionPreference: boolean</code></summary>

Whether the existing user session preference should be cleared.

For authentication providers that support being signed into multiple accounts at once, the user will be
prompted to select an account to use when getSession is called. This preference
is remembered until getSession is called with this flag.

Defaults to false.

</details>

<div id="authenticationgetsessionoptions-forcenewsession"></div>

<details>
<summary><code>forceNewSession: boolean | <a href="#authenticationforcenewsessionoptions">AuthenticationForceNewSessionOptions</a></code></summary>

Whether we should attempt to reauthenticate even if there is already a session available.

If true, a modal dialog will be shown asking the user to sign in again. This is mostly used for scenarios
where the token needs to be re minted because it has lost some authorization.

Defaults to false.

</details>

<div id="authenticationgetsessionoptions-silent"></div>

<details>
<summary><code>silent: boolean</code></summary>

Whether we should show the indication to sign in in the Accounts menu.

If false, the user will be shown a badge on the Accounts menu with an option to sign in for the extension.
If true, no indication will be shown.

Defaults to false.

Note: you cannot use this option with any other options that prompt the user like `createIfNone`.

</details>

<div id="authenticationgetsessionoptions-account"></div>

<details>
<summary><code>account: <a href="#authenticationsessionaccountinformation">AuthenticationSessionAccountInformation</a></code></summary>

The account that you would like to get a session for. This is passed down to the Authentication Provider to be used for creating the correct session.

</details>

---

#### AuthenticationProvider {#authenticationprovider}

A provider for performing authentication to a service.

##### Properties

<div id="authenticationprovider-ondidchangesessions"></div>

<details>
<summary><code>onDidChangeSessions: <a href="#event">Event</a>&lt;<a href="#authenticationproviderauthenticationsessionschangeevent">AuthenticationProviderAuthenticationSessionsChangeEvent</a>&gt;</code></summary>

An <a href="#event">Event</a> which fires when the array of sessions has changed, or data
within a session has changed.

**只读**: 是

</details>

##### Methods

<div id="authenticationprovider-getsessions"></div>

<details>
<summary><code>getSessions(scopes: readonly string[] | undefined, options: AuthenticationProviderSessionOptions): Thenable&lt;AuthenticationSession[]&gt;;</code></summary>

Get a list of sessions.

</details>

<div id="authenticationprovider-createsession"></div>

<details>
<summary><code>createSession(scopes: readonly string[], options: AuthenticationProviderSessionOptions): Thenable&lt;AuthenticationSession&gt;;</code></summary>

Prompts a user to login.

If login is successful, the onDidChangeSessions event should be fired.

If login fails, a rejected promise should be returned.

If the provider has specified that it does not support multiple accounts,
then this should never be called if there is already an existing session matching these
scopes.

</details>

<div id="authenticationprovider-removesession"></div>

<details>
<summary><code>removeSession(sessionId: string): Thenable&lt;void&gt;;</code></summary>

Removes the session corresponding to session id.

If the removal is successful, the onDidChangeSessions event should be fired.

If a session cannot be removed, the provider should reject with an error message.

</details>

---

#### AuthenticationProviderAuthenticationSessionsChangeEvent {#authenticationproviderauthenticationsessionschangeevent}

An <a href="#event">Event</a> which fires when an <a href="#authenticationsession">AuthenticationSession</a> is added, removed, or changed.

##### Properties

<div id="authenticationproviderauthenticationsessionschangeevent-added"></div>

<details>
<summary><code>added: readonly <a href="#authenticationsession">AuthenticationSession</a>[] | undefined</code></summary>

The <a href="#authenticationsession">AuthenticationSessions</a> of the <a href="#authenticationprovider">AuthenticationProvider</a> that have been added.

**只读**: 是

</details>

<div id="authenticationproviderauthenticationsessionschangeevent-removed"></div>

<details>
<summary><code>removed: readonly <a href="#authenticationsession">AuthenticationSession</a>[] | undefined</code></summary>

The <a href="#authenticationsession">AuthenticationSessions</a> of the <a href="#authenticationprovider">AuthenticationProvider</a> that have been removed.

**只读**: 是

</details>

<div id="authenticationproviderauthenticationsessionschangeevent-changed"></div>

<details>
<summary><code>changed: readonly <a href="#authenticationsession">AuthenticationSession</a>[] | undefined</code></summary>

The <a href="#authenticationsession">AuthenticationSessions</a> of the <a href="#authenticationprovider">AuthenticationProvider</a> that have been changed.
A session changes when its data excluding the id are updated. An example of this is a session refresh that results in a new
access token being set for the session.

**只读**: 是

</details>

---

#### AuthenticationProviderInformation {#authenticationproviderinformation}

Basic information about an <a href="#authenticationprovider">authenticationProvider</a>

##### Properties

<div id="authenticationproviderinformation-id"></div>

<details>
<summary><code>id: string</code></summary>

The unique identifier of the authentication provider.

**只读**: 是

</details>

<div id="authenticationproviderinformation-label"></div>

<details>
<summary><code>label: string</code></summary>

The human-readable name of the authentication provider.

**只读**: 是

</details>

---

#### AuthenticationProviderOptions {#authenticationprovideroptions}

Options for creating an <a href="#authenticationprovider">AuthenticationProvider</a>.

##### Properties

<div id="authenticationprovideroptions-supportsmultipleaccounts"></div>

<details>
<summary><code>supportsMultipleAccounts: boolean</code></summary>

Whether it is possible to be signed into multiple accounts at once with this provider.
If not specified, will default to false.

**只读**: 是

</details>

---

#### AuthenticationProviderSessionOptions {#authenticationprovidersessionoptions}

The options passed in to the getSessions and
createSession call.

##### Properties

<div id="authenticationprovidersessionoptions-account"></div>

<details>
<summary><code>account: <a href="#authenticationsessionaccountinformation">AuthenticationSessionAccountInformation</a></code></summary>

The account that is being asked about. If this is passed in, the provider should
attempt to return the sessions that are only related to this account.

</details>

---

#### AuthenticationSession {#authenticationsession}

Represents a session of a currently logged in user.

##### Properties

<div id="authenticationsession-id"></div>

<details>
<summary><code>id: string</code></summary>

The identifier of the authentication session.

**只读**: 是

</details>

<div id="authenticationsession-accesstoken"></div>

<details>
<summary><code>accessToken: string</code></summary>

The access token.

**只读**: 是

</details>

<div id="authenticationsession-account"></div>

<details>
<summary><code>account: <a href="#authenticationsessionaccountinformation">AuthenticationSessionAccountInformation</a></code></summary>

The account associated with the session.

**只读**: 是

</details>

<div id="authenticationsession-scopes"></div>

<details>
<summary><code>scopes: readonly string[]</code></summary>

The permissions granted by the session's access token. Available scopes
are defined by the <a href="#authenticationprovider">AuthenticationProvider</a>.

**只读**: 是

</details>

---

#### AuthenticationSessionAccountInformation {#authenticationsessionaccountinformation}

The information of an account associated with an <a href="#authenticationsession">AuthenticationSession</a>.

##### Properties

<div id="authenticationsessionaccountinformation-id"></div>

<details>
<summary><code>id: string</code></summary>

The unique identifier of the account.

**只读**: 是

</details>

<div id="authenticationsessionaccountinformation-label"></div>

<details>
<summary><code>label: string</code></summary>

The human-readable name of the account.

**只读**: 是

</details>

---

#### AuthenticationSessionsChangeEvent {#authenticationsessionschangeevent}

An <a href="#event">event</a> which fires when an <a href="#authenticationsession">AuthenticationSession</a> is added, removed, or changed.

##### Properties

<div id="authenticationsessionschangeevent-provider"></div>

<details>
<summary><code>provider: <a href="#authenticationproviderinformation">AuthenticationProviderInformation</a></code></summary>

The <a href="#authenticationprovider">authenticationProvider</a> that has had its sessions change.

**只读**: 是

</details>

---

#### AutoClosingPair {#autoclosingpair}

Describes pairs of strings where the close string will be automatically inserted when typing the opening string.

##### Properties

<div id="autoclosingpair-open"></div>

<details>
<summary><code>open: string</code></summary>

The string that will trigger the automatic insertion of the closing string.

</details>

<div id="autoclosingpair-close"></div>

<details>
<summary><code>close: string</code></summary>

The closing string that will be automatically inserted when typing the opening string.

</details>

<div id="autoclosingpair-notin"></div>

<details>
<summary><code>notIn: <a href="#syntaxtokentype">SyntaxTokenType</a>[]</code></summary>

A set of tokens where the pair should not be auto closed.

</details>

---

#### BreakpointsChangeEvent {#breakpointschangeevent}

An event describing the changes to the set of <a href="#breakpoint">breakpoints</a>.

##### Properties

<div id="breakpointschangeevent-added"></div>

<details>
<summary><code>added: readonly <a href="#breakpoint">Breakpoint</a>[]</code></summary>

Added breakpoints.

**只读**: 是

</details>

<div id="breakpointschangeevent-removed"></div>

<details>
<summary><code>removed: readonly <a href="#breakpoint">Breakpoint</a>[]</code></summary>

Removed breakpoints.

**只读**: 是

</details>

<div id="breakpointschangeevent-changed"></div>

<details>
<summary><code>changed: readonly <a href="#breakpoint">Breakpoint</a>[]</code></summary>

Changed breakpoints.

**只读**: 是

</details>

---

#### CallHierarchyProvider {#callhierarchyprovider}

The call hierarchy provider interface describes the contract between extensions
and the call hierarchy feature which allows to browse calls and caller of function,
methods, constructor etc.

##### Methods

<div id="callhierarchyprovider-preparecallhierarchy"></div>

<details>
<summary><code>prepareCallHierarchy(document: TextDocument, position: Position, token: CancellationToken): ProviderResult&lt;CallHierarchyItem | CallHierarchyItem[]&gt;;</code></summary>

Bootstraps call hierarchy by returning the item that is denoted by the given document
and position. This item will be used as entry into the call graph. Providers should
return `undefined` or `null` when there is no item at the given location.

</details>

<div id="callhierarchyprovider-providecallhierarchyincomingcalls"></div>

<details>
<summary><code>provideCallHierarchyIncomingCalls(item: CallHierarchyItem, token: CancellationToken): ProviderResult&lt;CallHierarchyIncomingCall[]&gt;;</code></summary>

Provide all incoming calls for an item, e.g all callers for a method. In graph terms this describes directed
and annotated edges inside the call graph, e.g the given item is the starting node and the result is the nodes
that can be reached.

</details>

<div id="callhierarchyprovider-providecallhierarchyoutgoingcalls"></div>

<details>
<summary><code>provideCallHierarchyOutgoingCalls(item: CallHierarchyItem, token: CancellationToken): ProviderResult&lt;CallHierarchyOutgoingCall[]&gt;;</code></summary>

Provide all outgoing calls for an item, e.g call calls to functions, methods, or constructors from the given item. In
graph terms this describes directed and annotated edges inside the call graph, e.g the given item is the starting
node and the result is the nodes that can be reached.

</details>

---

#### CancellationToken {#cancellationtoken}

A cancellation token used to request cancellation on long running
or asynchronous task.

##### Properties

<div id="cancellationtoken-iscancellationrequested"></div>

<details>
<summary><code>isCancellationRequested: boolean</code></summary>

**只读**: 是

</details>

<div id="cancellationtoken-oncancellationrequested"></div>

<details>
<summary><code>onCancellationRequested: <a href="#event">Event</a>&lt;any&gt;</code></summary>

**只读**: 是

</details>

---

#### CanonicalUriProvider {#canonicaluriprovider}

##### Methods

<div id="canonicaluriprovider-providecanonicaluri"></div>

<details>
<summary><code>provideCanonicalUri(uri: Uri, options: CanonicalUriRequestOptions, token: CancellationToken): ProviderResult&lt;Uri&gt;;</code></summary>

</details>

---

#### CanonicalUriRequestOptions {#canonicalurirequestoptions}

##### Properties

<div id="canonicalurirequestoptions-targetscheme"></div>

<details>
<summary><code>targetScheme: string</code></summary>


The desired scheme of the canonical URI.

</details>

---

#### ChatContext {#chatcontext}

Extra context passed to a participant.

##### Properties

<div id="chatcontext-history"></div>

<details>
<summary><code>history: ReadonlyArray&lt;<a href="#chatrequestturn">ChatRequestTurn</a> | <a href="#chatresponseturn">ChatResponseTurn</a>&gt;</code></summary>

All of the chat messages so far in the current chat session. Currently, only chat messages for the current participant are included.

**只读**: 是

</details>

---

#### ChatErrorDetails {#chaterrordetails}

Represents an error result from a chat request.

##### Properties

<div id="chaterrordetails-message"></div>

<details>
<summary><code>message: string</code></summary>

An error message that is shown to the user.

</details>

<div id="chaterrordetails-responseisfiltered"></div>

<details>
<summary><code>responseIsFiltered: boolean</code></summary>

If set to true, the response will be partly blurred out.

</details>

---

#### ChatFollowup {#chatfollowup}

A followup question suggested by the participant.

##### Properties

<div id="chatfollowup-prompt"></div>

<details>
<summary><code>prompt: string</code></summary>

The message to send to the chat.

</details>

<div id="chatfollowup-label"></div>

<details>
<summary><code>label: string</code></summary>

A title to show the user. The prompt will be shown by default, when this is unspecified.

</details>

<div id="chatfollowup-participant"></div>

<details>
<summary><code>participant: string</code></summary>

By default, the followup goes to the same participant/command. But this property can be set to invoke a different participant by ID.
Followups can only invoke a participant that was contributed by the same extension.

</details>

<div id="chatfollowup-command"></div>

<details>
<summary><code>command: string</code></summary>

By default, the followup goes to the same participant/command. But this property can be set to invoke a different command.

</details>

---

#### ChatFollowupProvider {#chatfollowupprovider}

Will be invoked once after each request to get suggested followup questions to show the user. The user can click the followup to send it to the chat.

##### Methods

<div id="chatfollowupprovider-providefollowups"></div>

<details>
<summary><code>provideFollowups(result: ChatResult, context: ChatContext, token: CancellationToken): ProviderResult&lt;ChatFollowup[]&gt;;</code></summary>

Provide followups for the given result.

</details>

---

#### ChatLanguageModelToolReference {#chatlanguagemodeltoolreference}

A reference to a tool that the user manually attached to their request, either using the `#`-syntax inline, or as an
attachment via the paperclip button.

##### Properties

<div id="chatlanguagemodeltoolreference-name"></div>

<details>
<summary><code>name: string</code></summary>

The tool name. Refers to a tool listed in <a href="#lm-tools">tools</a>.

**只读**: 是

</details>

<div id="chatlanguagemodeltoolreference-range"></div>

<details>
<summary><code>range: [start: number, end: number]</code></summary>

The start and end index of the reference in the prompt. When undefined, the reference was
not part of the prompt text.

*Note* that the indices take the leading `#`-character into account which means they can be used to modify the prompt
as-is.

**只读**: 是

</details>

---

#### ChatParticipant {#chatparticipant}

A chat participant can be invoked by the user in a chat session, using the `@` prefix. When it is invoked, it handles the chat request and is solely
responsible for providing a response to the user. A ChatParticipant is created using <a href="#chat-createchatparticipant">createChatParticipant</a>.

##### Properties

<div id="chatparticipant-id"></div>

<details>
<summary><code>id: string</code></summary>

A unique ID for this participant.

**只读**: 是

</details>

<div id="chatparticipant-iconpath"></div>

<details>
<summary><code>iconPath: <a href="#iconpath">IconPath</a></code></summary>

An icon for the participant shown in UI.

</details>

<div id="chatparticipant-requesthandler"></div>

<details>
<summary><code>requestHandler: <a href="#chatrequesthandler">ChatRequestHandler</a></code></summary>

The handler for requests to this participant.

</details>

<div id="chatparticipant-followupprovider"></div>

<details>
<summary><code>followupProvider: <a href="#chatfollowupprovider">ChatFollowupProvider</a></code></summary>

This provider will be called once after each request to retrieve suggested followup questions.

</details>

<div id="chatparticipant-ondidreceivefeedback"></div>

<details>
<summary><code>onDidReceiveFeedback: <a href="#event">Event</a>&lt;<a href="#chatresultfeedback">ChatResultFeedback</a>&gt;</code></summary>

An event that fires whenever feedback for a result is received, e.g. when a user up- or down-votes
a result.

The passed result is guaranteed to be the same instance that was
previously returned from this chat participant.

</details>

##### Methods

<div id="chatparticipant-dispose"></div>

<details>
<summary><code>dispose(): void;</code></summary>

Dispose this participant and free resources.

</details>

---

#### ChatPromptReference {#chatpromptreference}

A reference to a value that the user added to their chat request.

##### Properties

<div id="chatpromptreference-id"></div>

<details>
<summary><code>id: string</code></summary>

A unique identifier for this kind of reference.

**只读**: 是

</details>

<div id="chatpromptreference-range"></div>

<details>
<summary><code>range: [start: number, end: number]</code></summary>

The start and end index of the reference in the prompt. When undefined, the reference was not part of the prompt text.

*Note* that the indices take the leading `#`-character into account which means they can
used to modify the prompt as-is.

**只读**: 是

</details>

<div id="chatpromptreference-modeldescription"></div>

<details>
<summary><code>modelDescription: string</code></summary>

A description of this value that could be used in an LLM prompt.

**只读**: 是

</details>

<div id="chatpromptreference-value"></div>

<details>
<summary><code>value: string | <a href="#uri">Uri</a> | <a href="#location">Location</a> | unknown</code></summary>

The value of this reference. The `string | Uri | Location` types are used today, but this could expand in the future.

**只读**: 是

</details>

---

#### ChatRequest {#chatrequest}

A request to a chat participant.

##### Properties

<div id="chatrequest-prompt"></div>

<details>
<summary><code>prompt: string</code></summary>

The prompt as entered by the user.

Information about references used in this request is stored in references.

*Note* that the name of the participant and the command
are not part of the prompt.

**只读**: 是

</details>

<div id="chatrequest-command"></div>

<details>
<summary><code>command: string | undefined</code></summary>

The name of the command that was selected for this request.

**只读**: 是

</details>

<div id="chatrequest-references"></div>

<details>
<summary><code>references: readonly <a href="#chatpromptreference">ChatPromptReference</a>[]</code></summary>

The list of references and their values that are referenced in the prompt.

*Note* that the prompt contains references as authored and that it is up to the participant
to further modify the prompt, for instance by inlining reference values or creating links to
headings which contain the resolved values. References are sorted in reverse by their range
in the prompt. That means the last reference in the prompt is the first in this list. This simplifies
string-manipulation of the prompt.

**只读**: 是

</details>

<div id="chatrequest-toolreferences"></div>

<details>
<summary><code>toolReferences: readonly <a href="#chatlanguagemodeltoolreference">ChatLanguageModelToolReference</a>[]</code></summary>

The list of tools that the user attached to their request.

When a tool reference is present, the chat participant should make a chat request using
Required to force the language model to generate input for the tool. Then, the
participant can use <a href="#lm-invoketool">invokeTool</a> to use the tool attach the result to its request for the user's prompt. The
tool may contribute useful extra context for the user's request.

**只读**: 是

</details>

<div id="chatrequest-toolinvocationtoken"></div>

<details>
<summary><code>toolInvocationToken: <a href="#chatparticipanttooltoken">ChatParticipantToolToken</a></code></summary>

A token that can be passed to <a href="#lm-invoketool">invokeTool</a> when invoking a tool inside the context of handling a chat request.
This associates the tool invocation to a chat session.

**只读**: 是

</details>

<div id="chatrequest-model"></div>

<details>
<summary><code>model: <a href="#languagemodelchat">LanguageModelChat</a></code></summary>

This is the model that is currently selected in the UI. Extensions can use this or use <a href="#lm-selectchatmodels">selectChatModels</a> to
pick another model. Don't hold onto this past the lifetime of the request.

**只读**: 是

</details>

---

#### ChatResponseFileTree {#chatresponsefiletree}

Represents a file tree structure in a chat response.

##### Properties

<div id="chatresponsefiletree-name"></div>

<details>
<summary><code>name: string</code></summary>

The name of the file or directory.

</details>

<div id="chatresponsefiletree-children"></div>

<details>
<summary><code>children: <a href="#chatresponsefiletree">ChatResponseFileTree</a>[]</code></summary>

An array of child file trees, if the current file tree is a directory.

</details>

---

#### ChatResponseStream {#chatresponsestream}

The ChatResponseStream is how a participant is able to return content to the chat view. It provides several methods for streaming different types of content
which will be rendered in an appropriate way in the chat view. A participant can use the helper method for the type of content it wants to return, or it
can instantiate a <a href="#chatresponsepart">ChatResponsePart</a> and use the generic push method to return it.

##### Methods

<div id="chatresponsestream-markdown"></div>

<details>
<summary><code>markdown(value: string | MarkdownString): void;</code></summary>

Push a markdown part to this stream. Short-hand for
`push(new ChatResponseMarkdownPart(value))`.

</details>

<div id="chatresponsestream-anchor"></div>

<details>
<summary><code>anchor(value: Uri | Location, title?: string): void;</code></summary>

Push an anchor part to this stream. Short-hand for
`push(new ChatResponseAnchorPart(value, title))`.
An anchor is an inline reference to some type of resource.

</details>

<div id="chatresponsestream-button"></div>

<details>
<summary><code>button(command: Command): void;</code></summary>

Push a command button part to this stream. Short-hand for
`push(new ChatResponseCommandButtonPart(value, title))`.

</details>

<div id="chatresponsestream-filetree"></div>

<details>
<summary><code>filetree(value: ChatResponseFileTree[], baseUri: Uri): void;</code></summary>

Push a filetree part to this stream. Short-hand for
`push(new ChatResponseFileTreePart(value))`.

</details>

<div id="chatresponsestream-progress"></div>

<details>
<summary><code>progress(value: string): void;</code></summary>

Push a progress part to this stream. Short-hand for
`push(new ChatResponseProgressPart(value))`.

</details>

<div id="chatresponsestream-reference"></div>

<details>
<summary><code>reference(value: Uri | Location, iconPath?: IconPath): void;</code></summary>

Push a reference to this stream. Short-hand for
`push(new ChatResponseReferencePart(value))`.

*Note* that the reference is not rendered inline with the response.

</details>

<div id="chatresponsestream-push"></div>

<details>
<summary><code>push(part: ChatResponsePart): void;</code></summary>

Pushes a part to this stream.

</details>

---

#### ChatResult {#chatresult}

The result of a chat request.

##### Properties

<div id="chatresult-errordetails"></div>

<details>
<summary><code>errorDetails: <a href="#chaterrordetails">ChatErrorDetails</a></code></summary>

If the request resulted in an error, this property defines the error details.

</details>

<div id="chatresult-metadata"></div>

<details>
<summary><code>metadata: &#123; readonly [key: string]: any &#125;</code></summary>

Arbitrary metadata for this result. Can be anything, but must be JSON-stringifyable.

**只读**: 是

</details>

---

#### ChatResultFeedback {#chatresultfeedback}

Represents user feedback for a result.

##### Properties

<div id="chatresultfeedback-result"></div>

<details>
<summary><code>result: <a href="#chatresult">ChatResult</a></code></summary>

The ChatResult for which the user is providing feedback.
This object has the same properties as the result returned from the participant callback, including `metadata`, but is not the same instance.

**只读**: 是

</details>

<div id="chatresultfeedback-kind"></div>

<details>
<summary><code>kind: <a href="#chatresultfeedbackkind">ChatResultFeedbackKind</a></code></summary>

The kind of feedback that was received.

**只读**: 是

</details>

---

#### Clipboard {#clipboard}

The clipboard provides read and write access to the system's clipboard.

##### Methods

<div id="clipboard-readtext"></div>

<details>
<summary><code>readText(): Thenable&lt;string&gt;;</code></summary>

Read the current clipboard contents as text.

</details>

<div id="clipboard-writetext"></div>

<details>
<summary><code>writeText(value: string): Thenable&lt;void&gt;;</code></summary>

Writes text into the clipboard.

</details>

---

#### CodeActionContext {#codeactioncontext}

Contains additional diagnostic information about the context in which
a code action is run.

##### Properties

<div id="codeactioncontext-triggerkind"></div>

<details>
<summary><code>triggerKind: <a href="#codeactiontriggerkind">CodeActionTriggerKind</a></code></summary>

The reason why code actions were requested.

**只读**: 是

</details>

<div id="codeactioncontext-diagnostics"></div>

<details>
<summary><code>diagnostics: readonly <a href="#diagnostic">Diagnostic</a>[]</code></summary>

An array of diagnostics.

**只读**: 是

</details>

<div id="codeactioncontext-only"></div>

<details>
<summary><code>only: <a href="#codeactionkind">CodeActionKind</a></code></summary>

Requested kind of actions to return.

Actions not of this kind are filtered out before being shown by the lightbulb.

**只读**: 是

</details>

---

#### CodeActionProvider {#codeactionprovider}

The code action interface defines the contract between extensions and
the [light bulb](https://code.visualstudio.com/docs/editor/editingevolved#_code-action) feature.

A code action can be any command that is known to the system.

##### Methods

<div id="codeactionprovider-providecodeactions"></div>

<details>
<summary><code>provideCodeActions(document: TextDocument, range: Range | Selection, context: CodeActionContext, token: CancellationToken): ProviderResult&lt;Array&lt;Command | T&gt;&gt;;</code></summary>

Provide commands for the given document and range.

</details>

<div id="codeactionprovider-resolvecodeaction"></div>

<details>
<summary><code>resolveCodeAction?(codeAction: T, token: CancellationToken): ProviderResult&lt;T&gt;;</code></summary>

Given a code action fill in its `edit`-property. Changes to
all other properties, like title, are ignored. A code action that has an edit
will not be resolved.

*Note* that a code action provider that returns commands, not code actions, cannot successfully
implement this function. Returning commands is deprecated and instead code actions should be
returned.

</details>

---

#### CodeActionProviderMetadata {#codeactionprovidermetadata}

Metadata about the type of code actions that a <a href="#codeactionprovider">CodeActionProvider</a> providers

##### Properties

<div id="codeactionprovidermetadata-providedcodeactionkinds"></div>

<details>
<summary><code>providedCodeActionKinds: ReadonlyArray&lt;<a href="#codeactionkind">CodeActionKind</a>&gt;</code></summary>

<a href="#codeactionkind">CodeActionKinds</a> that this provider may return.

The list of kinds may be generic, such as `CodeActionKind.Refactor`, or the provider
may list our every specific kind they provide, such as `CodeActionKind.Refactor.Extract.append('function`)`

**只读**: 是

</details>

<div id="codeactionprovidermetadata-documentation"></div>

<details>
<summary><code>documentation: ReadonlyArray&lt;&#123; command: <a href="#command">Command</a>, kind: <a href="#codeactionkind">CodeActionKind</a> &#125;&gt;</code></summary>

Documentation from the provider is shown in the code actions menu

At most one documentation entry will be shown per provider.

</details>

---

#### CodeDescription {#codedescription}

##### Properties

<div id="codedescription-href"></div>

<details>
<summary><code>href: <a href="#uri">Uri</a></code></summary>

An URI to open with more information about the diagnostic error.

</details>

---

#### CodeLensProvider {#codelensprovider}

A code lens provider adds <a href="#command">commands</a> to source text. The commands will be shown
as dedicated horizontal lines in between the source text.

##### Properties

<div id="codelensprovider-ondidchangecodelenses"></div>

<details>
<summary><code>onDidChangeCodeLenses: <a href="#event">Event</a>&lt;void&gt;</code></summary>

An optional event to signal that the code lenses from this provider have changed.

</details>

##### Methods

<div id="codelensprovider-providecodelenses"></div>

<details>
<summary><code>provideCodeLenses(document: TextDocument, token: CancellationToken): ProviderResult&lt;T[]&gt;;</code></summary>

Compute a list of <a href="#codelens">lenses</a>. This call should return as fast as possible and if
computing the commands is expensive implementors should only return code lens objects with the
range set and implement resolve.

</details>

<div id="codelensprovider-resolvecodelens"></div>

<details>
<summary><code>resolveCodeLens?(codeLens: T, token: CancellationToken): ProviderResult&lt;T&gt;;</code></summary>

This function will be called for each visible code lens, usually when scrolling and after
calls to compute-lenses.

</details>

---

#### ColorTheme {#colortheme}

Represents a color theme.

##### Properties

<div id="colortheme-kind"></div>

<details>
<summary><code>kind: <a href="#colorthemekind">ColorThemeKind</a></code></summary>

The kind of this color theme: light, dark, high contrast dark and high contrast light.

**只读**: 是

</details>

---

#### Command {#command}

Represents a reference to a command. Provides a title which
will be used to represent a command in the UI and, optionally,
an array of arguments which will be passed to the command handler
function when invoked.

##### Properties

<div id="command-title"></div>

<details>
<summary><code>title: string</code></summary>

Title of the command, like `save`.

</details>

<div id="command-command"></div>

<details>
<summary><code>command: string</code></summary>

The identifier of the actual command handler.

</details>

<div id="command-tooltip"></div>

<details>
<summary><code>tooltip: string</code></summary>

A tooltip for the command, when represented in the UI.

</details>

<div id="command-arguments"></div>

<details>
<summary><code>arguments: any[]</code></summary>

Arguments that the command handler should be
invoked with.

</details>

---

#### CommandDescription {#commanddescription}

A command is a unique identifier of a function
which can be executed by a user via a keyboard shortcut,
a menu action or directly.

##### Properties

<div id="commanddescription-id"></div>

<details>
<summary><code>id: string</code></summary>

A unique identifier of this command.

</details>

<div id="commanddescription-label"></div>

<details>
<summary><code>label: string</code></summary>

A label of this command.

</details>

<div id="commanddescription-tooltip"></div>

<details>
<summary><code>tooltip: string</code></summary>

A tooltip for for command, when represented in the UI.

</details>

<div id="commanddescription-iconclass"></div>

<details>
<summary><code>iconClass: string</code></summary>

An icon class of this command.

</details>

---

#### CommandKeyBinding {#commandkeybinding}

Key Binding of a command

##### Properties

<div id="commandkeybinding-id"></div>

<details>
<summary><code>id: string</code></summary>

Identifier of the command.

</details>

<div id="commandkeybinding-value"></div>

<details>
<summary><code>value: string</code></summary>

Value of the keyBinding

</details>

<div id="commandkeybinding-checkconflict"></div>

<details>
<summary><code>checkConflict: boolean</code></summary>

是否检查快捷键冲突

</details>

---

#### Comment {#comment}

A comment is displayed within the editor or the Comments Panel, depending on how it is provided.

##### Properties

<div id="comment-body"></div>

<details>
<summary><code>body: string | <a href="#markdownstring">MarkdownString</a></code></summary>

The human-readable comment body

</details>

<div id="comment-mode"></div>

<details>
<summary><code>mode: <a href="#commentmode">CommentMode</a></code></summary>

<a href="#commentmode">Comment mode</a> of the comment

</details>

<div id="comment-author"></div>

<details>
<summary><code>author: <a href="#commentauthorinformation">CommentAuthorInformation</a></code></summary>

The <a href="#commentauthorinformation">author information</a> of the comment

</details>

<div id="comment-contextvalue"></div>

<details>
<summary><code>contextValue: string</code></summary>

Context value of the comment. This can be used to contribute comment specific actions.
For example, a comment is given a context value as `editable`. When contributing actions to `comments/comment/title`
using `menus` extension point, you can specify context value for key `comment` in `when` expression like `comment == editable`.
```json
 "contributes": &#123;
   "menus": &#123;
     "comments/comment/title": [
       &#123;
         "command": "extension.deleteComment",
         "when": "comment == editable"
       &#125;
     ]
   &#125;
 &#125;
```
This will show action `extension.deleteComment` only for comments with `contextValue` is `editable`.

</details>

<div id="comment-reactions"></div>

<details>
<summary><code>reactions: <a href="#commentreaction">CommentReaction</a>[]</code></summary>

Optional reactions of the <a href="#comment">comment</a>

</details>

<div id="comment-label"></div>

<details>
<summary><code>label: string</code></summary>

Optional label describing the <a href="#comment">Comment</a>
Label will be rendered next to authorName if exists.

</details>

<div id="comment-timestamp"></div>

<details>
<summary><code>timestamp: Date</code></summary>

Optional timestamp.

</details>

---

#### CommentAuthorInformation {#commentauthorinformation}

Author information of a <a href="#comment">comment</a>

##### Properties

<div id="commentauthorinformation-name"></div>

<details>
<summary><code>name: string</code></summary>

The display name of the author of the comment

</details>

<div id="commentauthorinformation-iconpath"></div>

<details>
<summary><code>iconPath: <a href="#uri">Uri</a></code></summary>

The optional icon path for the author

</details>

---

#### CommentController {#commentcontroller}

A comment controller is able to provide <a href="#commentthread">comments</a> support to the editor and
provide users various ways to interact with comments.

##### Properties

<div id="commentcontroller-id"></div>

<details>
<summary><code>id: string</code></summary>

The id of this comment controller.

**只读**: 是

</details>

<div id="commentcontroller-label"></div>

<details>
<summary><code>label: string</code></summary>

The human-readable label of this comment controller.

**只读**: 是

</details>

<div id="commentcontroller-options"></div>

<details>
<summary><code>options: <a href="#commentoptions">CommentOptions</a></code></summary>

Comment controller options

</details>

<div id="commentcontroller-commentingrangeprovider"></div>

<details>
<summary><code>commentingRangeProvider: <a href="#commentingrangeprovider">CommentingRangeProvider</a></code></summary>

Optional commenting range provider. Provide a list <a href="#range">ranges</a> which support commenting to any given resource uri.

If not provided, users can leave comments in any document opened in the editor.

</details>

<div id="commentcontroller-reactionhandler"></div>

<details>
<summary><code>reactionHandler: (comment: <a href="#comment">Comment</a>, reaction: <a href="#commentreaction">CommentReaction</a>) =&gt; Thenable&lt;void&gt;</code></summary>

Optional reaction handler for creating and deleting reactions on a <a href="#comment">comment</a>.

</details>

##### Methods

<div id="commentcontroller-createcommentthread"></div>

<details>
<summary><code>createCommentThread(uri: Uri, range: Range, comments: Comment[]): CommentThread;</code></summary>

Create a <a href="#commentthread">comment thread</a>. The comment thread will be displayed in visible text editors (if the resource matches)
and Comments Panel once created.

</details>

<div id="commentcontroller-dispose"></div>

<details>
<summary><code>dispose(): void;</code></summary>

Dispose this comment controller.

Once disposed, all <a href="#commentthread">comment threads</a> created by this comment controller will also be removed from the editor
and Comments Panel.

</details>

---

#### CommentingRangeProvider {#commentingrangeprovider}

Commenting range provider for a <a href="#commentcontroller">comment controller</a>.

##### Methods

<div id="commentingrangeprovider-providecommentingranges"></div>

<details>
<summary><code>provideCommentingRanges(document: TextDocument, token: CancellationToken): ProviderResult&lt;Range[]&gt;;</code></summary>

Provide a list of ranges which allow new comment threads creation or null for a given document

</details>

---

#### CommentOptions {#commentoptions}

Represents a <a href="#commentcontroller">comment controller</a>'s options.

##### Properties

<div id="commentoptions-prompt"></div>

<details>
<summary><code>prompt: string</code></summary>

An optional string to show on the comment input box when it's collapsed.

</details>

<div id="commentoptions-placeholder"></div>

<details>
<summary><code>placeHolder: string</code></summary>

An optional string to show as placeholder in the comment input box when it's focused.

</details>

---

#### CommentReaction {#commentreaction}

Reactions of a <a href="#comment">comment</a>

##### Properties

<div id="commentreaction-label"></div>

<details>
<summary><code>label: string</code></summary>

The human-readable label for the reaction

**只读**: 是

</details>

<div id="commentreaction-iconpath"></div>

<details>
<summary><code>iconPath: string | <a href="#uri">Uri</a></code></summary>

Icon for the reaction shown in UI.

**只读**: 是

</details>

<div id="commentreaction-count"></div>

<details>
<summary><code>count: number</code></summary>

The number of users who have reacted to this reaction

**只读**: 是

</details>

<div id="commentreaction-authorhasreacted"></div>

<details>
<summary><code>authorHasReacted: boolean</code></summary>

Whether the [author](CommentAuthorInformation) of the comment has reacted to this reaction

**只读**: 是

</details>

---

#### CommentReply {#commentreply}

Command argument for actions registered in `comments/commentThread/context`.

##### Properties

<div id="commentreply-thread"></div>

<details>
<summary><code>thread: <a href="#commentthread">CommentThread</a></code></summary>

The active <a href="#commentthread">comment thread</a>

</details>

<div id="commentreply-text"></div>

<details>
<summary><code>text: string</code></summary>

The value in the comment editor

</details>

---

#### CommentRule {#commentrule}

Describes how comments for a language work.

##### Properties

<div id="commentrule-linecomment"></div>

<details>
<summary><code>lineComment: string</code></summary>

The line comment token, like `// this is a comment`

</details>

<div id="commentrule-blockcomment"></div>

<details>
<summary><code>blockComment: <a href="#characterpair">CharacterPair</a></code></summary>

The block comment character pair, like `/* block comment *&#47;`

</details>

---

#### CommentThread {#commentthread}

A collection of <a href="#comment">comments</a> representing a conversation at a particular range in a document.

##### Properties

<div id="commentthread-uri"></div>

<details>
<summary><code>uri: <a href="#uri">Uri</a></code></summary>

The uri of the document the thread has been created on.

**只读**: 是

</details>

<div id="commentthread-range"></div>

<details>
<summary><code>range: <a href="#range">Range</a></code></summary>

The range the comment thread is located within the document. The thread icon will be shown
at the first line of the range.

</details>

<div id="commentthread-comments"></div>

<details>
<summary><code>comments: ReadonlyArray&lt;<a href="#comment">Comment</a>&gt;</code></summary>

The ordered comments of the thread.

</details>

<div id="commentthread-collapsiblestate"></div>

<details>
<summary><code>collapsibleState: <a href="#commentthreadcollapsiblestate">CommentThreadCollapsibleState</a></code></summary>

Whether the thread should be collapsed or expanded when opening the document.
Defaults to Collapsed.

</details>

<div id="commentthread-contextvalue"></div>

<details>
<summary><code>contextValue: string</code></summary>

Context value of the comment thread. This can be used to contribute thread specific actions.
For example, a comment thread is given a context value as `editable`. When contributing actions to `comments/commentThread/title`
using `menus` extension point, you can specify context value for key `commentThread` in `when` expression like `commentThread == editable`.
```
 "contributes": &#123;
   "menus": &#123;
     "comments/commentThread/title": [
      &#123;
        "command": "extension.deleteCommentThread",
        "when": "commentThread == editable"
      &#125;
     ]
   &#125;
 &#125;
```
This will show action `extension.deleteCommentThread` only for comment threads with `contextValue` is `editable`.

</details>

<div id="commentthread-label"></div>

<details>
<summary><code>label: string</code></summary>

The optional human-readable label describing the <a href="#commentthread">Comment Thread</a>

</details>

<div id="commentthread-state"></div>

<details>
<summary><code>state: <a href="#commentthreadstate">CommentThreadState</a></code></summary>

The optional state of a comment thread, which may affect how the comment is displayed.

</details>

<div id="commentthread-canreply"></div>

<details>
<summary><code>canReply: boolean</code></summary>

Whether the thread supports reply. Defaults to true.

</details>

##### Methods

<div id="commentthread-dispose"></div>

<details>
<summary><code>dispose(): void;</code></summary>

Dispose this comment thread.

Once disposed, this comment thread will be removed from visible editors and Comment Panel when appropriate.

</details>

---

#### CompletionContext {#completioncontext}

Contains additional information about the context in which
completion provider is triggered.

##### Properties

<div id="completioncontext-triggerkind"></div>

<details>
<summary><code>triggerKind: <a href="#completiontriggerkind">CompletionTriggerKind</a></code></summary>

How the completion was triggered.

**只读**: 是

</details>

<div id="completioncontext-triggercharacter"></div>

<details>
<summary><code>triggerCharacter: string</code></summary>

Character that triggered the completion item provider.

`undefined` if provider was not triggered by a character.

The trigger character is already in the document when the completion provider is triggered.

**只读**: 是

</details>

---

#### CompletionItemLabel {#completionitemlabel}

A structured label for a <a href="#completionitem">completion item</a>.

##### Properties

<div id="completionitemlabel-label"></div>

<details>
<summary><code>label: string</code></summary>

The label of this completion item.

By default this is also the text that is inserted when this completion is selected.

</details>

<div id="completionitemlabel-detail"></div>

<details>
<summary><code>detail: string</code></summary>

An optional string which is rendered less prominently directly after label,
without any spacing. Should be used for function signatures or type annotations.

</details>

<div id="completionitemlabel-description"></div>

<details>
<summary><code>description: string</code></summary>

An optional string which is rendered less prominently after detail. Should be used
for fully qualified names or file path.

</details>

---

#### CompletionItemProvider {#completionitemprovider}

The completion item provider interface defines the contract between extensions and IntelliSense

Providers can delay the computation of the [`detail`](#CompletionItem.detail)
and [`documentation`](#CompletionItem.documentation) properties by implementing the
[`resolveCompletionItem`](#CompletionItemProvider.resolveCompletionItem)-function. However, properties that
are needed for the initial sorting and filtering, like `sortText`, `filterText`, `insertText`, and `range`, must
not be changed during resolve.

Providers are asked for completions either explicitly by a user gesture or -depending on the configuration-
implicitly when typing words or trigger characters.

##### Methods

<div id="completionitemprovider-providecompletionitems"></div>

<details>
<summary><code>provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken, context: CompletionContext): ProviderResult&lt;T[] | CompletionList&lt;T&gt;&gt;;</code></summary>

Provide completion items for the given position and document.

</details>

<div id="completionitemprovider-resolvecompletionitem"></div>

<details>
<summary><code>resolveCompletionItem?(item: T, token: CancellationToken): ProviderResult&lt;T&gt;;</code></summary>

Given a completion item fill in more data, like [doc-comment](#CompletionItem.documentation)
or details.

The editor will only resolve a completion item once.

</details>

---

#### ConfigurationChangeEvent {#configurationchangeevent}

An event describing the change in Configuration

##### Methods

<div id="configurationchangeevent-affectsconfiguration"></div>

<details>
<summary><code>affectsConfiguration(section: string, scope?: ConfigurationScope): boolean;</code></summary>

Returns `true` if the given section for the given resource (if provided) is affected.

</details>

---

#### ConversationRequest {#conversationrequest}

##### Properties

<div id="conversationrequest-type"></div>

<details>
<summary><code>type: 'request'</code></summary>

**只读**: 是

</details>

<div id="conversationrequest-message"></div>

<details>
<summary><code>message: string</code></summary>

**只读**: 是

</details>

---

#### ConversationResponse {#conversationresponse}

##### Properties

<div id="conversationresponse-type"></div>

<details>
<summary><code>type: 'response'</code></summary>

**只读**: 是

</details>

<div id="conversationresponse-message"></div>

<details>
<summary><code>message: string</code></summary>

**只读**: 是

</details>

<div id="conversationresponse-result"></div>

<details>
<summary><code>result: <a href="#chatresult">ChatResult</a></code></summary>

**只读**: 是

</details>

<div id="conversationresponse-references"></div>

<details>
<summary><code>references: <a href="#documentcontextitem">DocumentContextItem</a>[]</code></summary>

**只读**: 是

</details>

---

#### CustomEditorProvider {#customeditorprovider}

Provider for editable custom editors that use a custom document model.

Custom editors use [`CustomDocument`](#CustomDocument) as their document model instead of a [`TextDocument`](#TextDocument).
This gives extensions full control over actions such as edit, save, and backup.

You should use this type of custom editor when dealing with binary files or more complex scenarios. For simple
text based documents, use [`CustomTextEditorProvider`](#CustomTextEditorProvider) instead.

##### Properties

<div id="customeditorprovider-ondidchangecustomdocument"></div>

<details>
<summary><code>onDidChangeCustomDocument: <a href="#event">Event</a>&lt;CustomDocumentEditEvent&lt;T&gt;&gt; | <a href="#event">Event</a>&lt;CustomDocumentContentChangeEvent&lt;T&gt;&gt;</code></summary>

Signal that an edit has occurred inside a custom editor.

This event must be fired by your extension whenever an edit happens in a custom editor. An edit can be
anything from changing some text, to cropping an image, to reordering a list. Your extension is free to
define what an edit is and what data is stored on each edit.

Firing `onDidChange` causes Theia to mark the editors as being dirty. This is cleared when the user either
saves or reverts the file.

Editors that support undo/redo must fire a `CustomDocumentEditEvent` whenever an edit happens. This allows
users to undo and redo the edit using Theia's standard Theia keyboard shortcuts. Theia will also mark
the editor as no longer being dirty if the user undoes all edits to the last saved state.

Editors that support editing but cannot use Theia's standard undo/redo mechanism must fire a `CustomDocumentContentChangeEvent`.
The only way for a user to clear the dirty state of an editor that does not support undo/redo is to either
`save` or `revert` the file.

An editor should only ever fire `CustomDocumentEditEvent` events, or only ever fire `CustomDocumentContentChangeEvent` events.

**只读**: 是

</details>

##### Methods

<div id="customeditorprovider-savecustomdocument"></div>

<details>
<summary><code>saveCustomDocument(document: T, cancellation: CancellationToken): Thenable&lt;void&gt;;</code></summary>

Save a custom document.

This method is invoked by Theia when the user saves a custom editor. This can happen when the user
triggers save while the custom editor is active, by commands such as `save all`, or by auto save if enabled.

To implement `save`, the implementer must persist the custom editor. This usually means writing the
file data for the custom document to disk. After `save` completes, any associated editor instances will
no longer be marked as dirty.

</details>

<div id="customeditorprovider-savecustomdocumentas"></div>

<details>
<summary><code>saveCustomDocumentAs(document: T, destination: Uri, cancellation: CancellationToken): Thenable&lt;void&gt;;</code></summary>

Save a custom document to a different location.

This method is invoked by Theia when the user triggers 'save as' on a custom editor. The implementer must
persist the custom editor to `destination`.

When the user accepts save as, the current editor is be replaced by an non-dirty editor for the newly saved file.

</details>

<div id="customeditorprovider-revertcustomdocument"></div>

<details>
<summary><code>revertCustomDocument(document: T, cancellation: CancellationToken): Thenable&lt;void&gt;;</code></summary>

Revert a custom document to its last saved state.

This method is invoked by Theia when the user triggers `File: Revert File` in a custom editor. (Note that
this is only used using Theia's `File: Revert File` command and not on a `git revert` of the file).

To implement `revert`, the implementer must make sure all editor instances (webviews) for `document`
are displaying the document in the same state is saved in. This usually means reloading the file from the
workspace.

</details>

<div id="customeditorprovider-backupcustomdocument"></div>

<details>
<summary><code>backupCustomDocument(document: T, context: CustomDocumentBackupContext, cancellation: CancellationToken): Thenable&lt;CustomDocumentBackup&gt;;</code></summary>

Back up a dirty custom document.

Backups are used for hot exit and to prevent data loss. Your `backup` method should persist the resource in
its current state, i.e. with the edits applied. Most commonly this means saving the resource to disk in
the `ExtensionContext.storagePath`. When VS Code reloads and your custom editor is opened for a resource,
your extension should first check to see if any backups exist for the resource. If there is a backup, your
extension should load the file contents from there instead of from the resource in the workspace.

`backup` is triggered approximately one second after the user stops editing the document. If the user
rapidly edits the document, `backup` will not be invoked until the editing stops.

`backup` is not invoked when `auto save` is enabled (since auto save already persists the resource).

</details>

---

#### CustomReadonlyEditorProvider {#customreadonlyeditorprovider}

Provider for readonly custom editors that use a custom document model.

Custom editors use [`CustomDocument`](#CustomDocument) as their document model instead of a [`TextDocument`](#TextDocument).

You should use this type of custom editor when dealing with binary files or more complex scenarios. For simple
text based documents, use [`CustomTextEditorProvider`](#CustomTextEditorProvider) instead.

##### Methods

<div id="customreadonlyeditorprovider-opencustomdocument"></div>

<details>
<summary><code>openCustomDocument(uri: Uri, openContext: CustomDocumentOpenContext, token: CancellationToken): Thenable&lt;T&gt; | T;</code></summary>

Create a new document for a given resource.

`openCustomDocument` is called when the first time an editor for a given resource is opened. The opened
document is then passed to `resolveCustomEditor` so that the editor can be shown to the user.

Already opened `CustomDocument` are re-used if the user opened additional editors. When all editors for a
given resource are closed, the `CustomDocument` is disposed of. Opening an editor at this point will
trigger another call to `openCustomDocument`.

</details>

<div id="customreadonlyeditorprovider-resolvecustomeditor"></div>

<details>
<summary><code>resolveCustomEditor(document: T, webviewPanel: WebviewPanel, token: CancellationToken): Thenable&lt;void&gt; | void;</code></summary>

Resolve a custom editor for a given resource.

This is called whenever the user opens a new editor for this `CustomEditorProvider`.

</details>

---

#### CustomTextEditorProvider {#customtexteditorprovider}

Provider for text based custom editors.

Text based custom editors use a [`TextDocument`](#TextDocument) as their data model. This considerably simplifies
implementing a custom editor as it allows Theia to handle many common operations such as
undo and backup. The provider is responsible for synchronizing text changes between the webview and the `TextDocument`.

##### Methods

<div id="customtexteditorprovider-resolvecustomtexteditor"></div>

<details>
<summary><code>resolveCustomTextEditor(document: TextDocument, webviewPanel: WebviewPanel, token: CancellationToken): Thenable&lt;void&gt; | void;</code></summary>

Resolve a custom editor for a given text resource.

This is called when a user first opens a resource for a `CustomTextEditorProvider`, or if they reopen an
existing editor using this `CustomTextEditorProvider`.

</details>

---

#### CustomTextEditorProvider {#customtexteditorprovider}

##### Methods

<div id="customtexteditorprovider-movecustomtexteditor"></div>

<details>
<summary><code>moveCustomTextEditor?(newDocument: TextDocument, existingWebviewPanel: WebviewPanel, token: CancellationToken): Thenable&lt;void&gt;;</code></summary>

Handle when the underlying resource for a custom editor is renamed.

This allows the webview for the editor be preserved throughout the rename. If this method is not implemented,
the editor will destroy the previous custom editor and create a replacement one.

</details>

---

#### DataTransferFile {#datatransferfile}

A file associated with a <a href="#datatransferitem">DataTransferItem</a>.

##### Properties

<div id="datatransferfile-name"></div>

<details>
<summary><code>name: string</code></summary>

The name of the file.

**只读**: 是

</details>

<div id="datatransferfile-uri"></div>

<details>
<summary><code>uri: <a href="#uri">Uri</a></code></summary>

The full file path of the file.

May be `undefined` on web.

**只读**: 是

</details>

##### Methods

<div id="datatransferfile-data"></div>

<details>
<summary><code>data(): Thenable&lt;Uint8Array&gt;;</code></summary>

The full file contents of the file.

</details>

---

#### DataTransferFile {#datatransferfile}

A file associated with a <a href="#datatransferitem">DataTransferItem</a>.

##### Properties

<div id="datatransferfile-name"></div>

<details>
<summary><code>name: string</code></summary>

The name of the file.

**只读**: 是

</details>

<div id="datatransferfile-uri"></div>

<details>
<summary><code>uri: <a href="#uri">Uri</a></code></summary>

The full file path of the file.

May be `undefined` on web.

**只读**: 是

</details>

##### Methods

<div id="datatransferfile-data"></div>

<details>
<summary><code>data(): Thenable&lt;Uint8Array&gt;;</code></summary>

The full file contents of the file.

</details>

---

#### DebugAdapter {#debugadapter}

A debug adapter that implements the Debug Adapter Protocol can be registered with the editor if it implements the DebugAdapter interface.

##### Properties

<div id="debugadapter-ondidsendmessage"></div>

<details>
<summary><code>onDidSendMessage: <a href="#event">Event</a>&lt;<a href="#debugprotocolmessage">DebugProtocolMessage</a>&gt;</code></summary>

An event which fires after the debug adapter has sent a Debug Adapter Protocol message to the editor.
Messages can be requests, responses, or events.

**只读**: 是

</details>

##### Methods

<div id="debugadapter-handlemessage"></div>

<details>
<summary><code>handleMessage(message: DebugProtocolMessage): void;</code></summary>

Handle a Debug Adapter Protocol message.
Messages can be requests, responses, or events.
Results or errors are returned via onSendMessage events.

</details>

---

#### DebugAdapterDescriptorFactory {#debugadapterdescriptorfactory}

##### Methods

<div id="debugadapterdescriptorfactory-createdebugadapterdescriptor"></div>

<details>
<summary><code>createDebugAdapterDescriptor(session: DebugSession, executable: DebugAdapterExecutable | undefined): ProviderResult&lt;DebugAdapterDescriptor&gt;;</code></summary>

'createDebugAdapterDescriptor' is called at the start of a debug session to provide details about the debug adapter to use.
These details must be returned as objects of type <a href="#debugadapterdescriptor">DebugAdapterDescriptor</a>.
Currently two types of debug adapters are supported:
- a debug adapter executable is specified as a command path and arguments (see <a href="#debugadapterexecutable">DebugAdapterExecutable</a>),
- a debug adapter server reachable via a communication port (see <a href="#debugadapterserver">DebugAdapterServer</a>).
If the method is not implemented the default behavior is this:
  createDebugAdapter(session: DebugSession, executable: DebugAdapterExecutable) &#123;
     if (typeof session.configuration.debugServer === 'number') &#123;
        return new DebugAdapterServer(session.configuration.debugServer);
     &#125;
     return executable;
  &#125;

</details>

---

#### DebugAdapterExecutableOptions {#debugadapterexecutableoptions}

Options for a debug adapter executable.

##### Properties

<div id="debugadapterexecutableoptions-env"></div>

<details>
<summary><code>env: &#123; [key: string]: string &#125;</code></summary>

The additional environment of the executed program or shell. If omitted
the parent process' environment is used. If provided it is merged with
the parent process' environment.

</details>

<div id="debugadapterexecutableoptions-cwd"></div>

<details>
<summary><code>cwd: string</code></summary>

The current working directory for the executed debug adapter.

</details>

---

#### DebugAdapterTracker {#debugadaptertracker}

A Debug Adapter Tracker is a means to track the communication between VS Code and a Debug Adapter.

##### Methods

<div id="debugadaptertracker-onwillstartsession"></div>

<details>
<summary><code>onWillStartSession?(): void;</code></summary>

A session with the debug adapter is about to be started.

</details>

<div id="debugadaptertracker-onwillreceivemessage"></div>

<details>
<summary><code>onWillReceiveMessage?(message: any): void;</code></summary>

The debug adapter is about to receive a Debug Adapter Protocol message from VS Code.

</details>

<div id="debugadaptertracker-ondidsendmessage"></div>

<details>
<summary><code>onDidSendMessage?(message: any): void;</code></summary>

The debug adapter has sent a Debug Adapter Protocol message to VS Code.

</details>

<div id="debugadaptertracker-onwillstopsession"></div>

<details>
<summary><code>onWillStopSession?(): void;</code></summary>

The debug adapter session is about to be stopped.

</details>

<div id="debugadaptertracker-onerror"></div>

<details>
<summary><code>onError?(error: Error): void;</code></summary>

An error with the debug adapter has occurred.

</details>

<div id="debugadaptertracker-onexit"></div>

<details>
<summary><code>onExit?(code: number | undefined, signal: string | undefined): void;</code></summary>

The debug adapter has exited with the given exit code or signal.

</details>

---

#### DebugAdapterTrackerFactory {#debugadaptertrackerfactory}

##### Methods

<div id="debugadaptertrackerfactory-createdebugadaptertracker"></div>

<details>
<summary><code>createDebugAdapterTracker(session: DebugSession): ProviderResult&lt;DebugAdapterTracker&gt;;</code></summary>

The method 'createDebugAdapterTracker' is called at the start of a debug session in order
to return a "tracker" object that provides read-access to the communication between VS Code and a debug adapter.

</details>

---

#### DebugConfiguration {#debugconfiguration}

Configuration for a debug session.

##### Properties

<div id="debugconfiguration-type"></div>

<details>
<summary><code>type: string</code></summary>

The type of the debug session.

</details>

<div id="debugconfiguration-name"></div>

<details>
<summary><code>name: string</code></summary>

The name of the debug session.

</details>

<div id="debugconfiguration-request"></div>

<details>
<summary><code>request: string</code></summary>

The request type of the debug session.

</details>

---

#### DebugConfigurationProvider {#debugconfigurationprovider}

A debug configuration provider allows to add the initial debug configurations to a newly created launch.json
and to resolve a launch configuration before it is used to start a new debug session.
A debug configuration provider is registered via #debug.registerDebugConfigurationProvider.

##### Methods

<div id="debugconfigurationprovider-providedebugconfigurations"></div>

<details>
<summary><code>provideDebugConfigurations?(folder: WorkspaceFolder | undefined, token?: CancellationToken): ProviderResult&lt;DebugConfiguration[]&gt;;</code></summary>

Provides initial <a href="#debugconfiguration">debug configuration</a>. If more than one debug configuration provider is
registered for the same type, debug configurations are concatenated in arbitrary order.

</details>

<div id="debugconfigurationprovider-resolvedebugconfiguration"></div>

<details>
<summary><code>resolveDebugConfiguration?(folder: WorkspaceFolder | undefined, debugConfiguration: DebugConfiguration, token?: CancellationToken): ProviderResult&lt;DebugConfiguration&gt;;</code></summary>

Resolves a <a href="#debugconfiguration">debug configuration</a> by filling in missing values or by adding/changing/removing attributes.
If more than one debug configuration provider is registered for the same type, the resolveDebugConfiguration calls are chained
in arbitrary order and the initial debug configuration is piped through the chain.
Returning the value 'undefined' prevents the debug session from starting.
Returning the value 'null' prevents the debug session from starting and opens the underlying debug configuration instead.

</details>

<div id="debugconfigurationprovider-resolvedebugconfigurationwithsubstitutedvariables"></div>

<details>
<summary><code>resolveDebugConfigurationWithSubstitutedVariables?(folder: WorkspaceFolder | undefined, debugConfiguration: DebugConfiguration, token?: CancellationToken): ProviderResult&lt;DebugConfiguration&gt;;</code></summary>

This hook is directly called after 'resolveDebugConfiguration' but with all variables substituted.
It can be used to resolve or verify a <a href="#debugconfiguration">debug configuration</a> by filling in missing values or by adding/changing/removing attributes.
If more than one debug configuration provider is registered for the same type, the 'resolveDebugConfigurationWithSubstitutedVariables' calls are chained
in arbitrary order and the initial debug configuration is piped through the chain.
Returning the value 'undefined' prevents the debug session from starting.
Returning the value 'null' prevents the debug session from starting and opens the underlying debug configuration instead.

</details>

---

#### DebugConsole {#debugconsole}

Represents the debug console.

##### Methods

<div id="debugconsole-append"></div>

<details>
<summary><code>append(value: string): void;</code></summary>

Append the given value to the debug console.

</details>

<div id="debugconsole-appendline"></div>

<details>
<summary><code>appendLine(value: string): void;</code></summary>

Append the given value and a line feed character
to the debug console.

</details>

---

#### DebugProtocolBreakpoint {#debugprotocolbreakpoint}

A DebugProtocolBreakpoint is an opaque stand-in type for the [Breakpoint](https://microsoft.github.io/debug-adapter-protocol/specification#Types_Breakpoint) type defined in the Debug Adapter Protocol.

---

#### DebugProtocolMessage {#debugprotocolmessage}

A DebugProtocolMessage is an opaque stand-in type for the [ProtocolMessage](https://microsoft.github.io/debug-adapter-protocol/specification#Base_Protocol_ProtocolMessage) type defined in the Debug Adapter Protocol.

---

#### DebugProtocolSource {#debugprotocolsource}

A DebugProtocolSource is an opaque stand-in type for the [Source](https://microsoft.github.io/debug-adapter-protocol/specification#Types_Source) type defined in the Debug Adapter Protocol.

---

#### DebugSession {#debugsession}

A debug session.

##### Properties

<div id="debugsession-id"></div>

<details>
<summary><code>id: string</code></summary>

The unique ID of this debug session.

**只读**: 是

</details>

<div id="debugsession-type"></div>

<details>
<summary><code>type: string</code></summary>

The debug session's type from the <a href="#debugconfiguration">debug configuration</a>.

**只读**: 是

</details>

<div id="debugsession-name"></div>

<details>
<summary><code>name: string</code></summary>

The debug session's name from the <a href="#debugconfiguration">debug configuration</a>.

**只读**: 是

</details>

<div id="debugsession-parentsession"></div>

<details>
<summary><code>parentSession: <a href="#debugsession">DebugSession</a></code></summary>

The parent session of this debug session, if it was created as a child.

**只读**: 是

</details>

<div id="debugsession-workspacefolder"></div>

<details>
<summary><code>workspaceFolder: <a href="#workspacefolder">WorkspaceFolder</a> | undefined</code></summary>

The workspace folder of this session or `undefined` for a folderless setup.

**只读**: 是

</details>

<div id="debugsession-configuration"></div>

<details>
<summary><code>configuration: <a href="#debugconfiguration">DebugConfiguration</a></code></summary>

The "resolved" <a href="#debugconfiguration">debug configuration</a> of this session.

**只读**: 是

</details>

##### Methods

<div id="debugsession-customrequest"></div>

<details>
<summary><code>customRequest(command: string, args?: any): Thenable&lt;any&gt;;</code></summary>

Send a custom request to the debug adapter.

</details>

<div id="debugsession-getdebugprotocolbreakpoint"></div>

<details>
<summary><code>getDebugProtocolBreakpoint(breakpoint: Breakpoint): PromiseLike&lt;DebugProtocolBreakpoint | undefined&gt;</code></summary>

Maps a breakpoint in the editor to the corresponding Debug Adapter Protocol (DAP) breakpoint that
is managed by the debug adapter of the debug session. If no DAP breakpoint exists (either because
the editor breakpoint was not yet registered or because the debug adapter is not interested in the
breakpoint), the value undefined is returned.

</details>

---

#### DebugSessionCustomEvent {#debugsessioncustomevent}

A custom Debug Adapter Protocol event received from a <a href="#debugsession">debug session</a>.

##### Properties

<div id="debugsessioncustomevent-session"></div>

<details>
<summary><code>session: <a href="#debugsession">DebugSession</a></code></summary>

The <a href="#debugsession">debug session</a> for which the custom event was received.

**只读**: 是

</details>

<div id="debugsessioncustomevent-event"></div>

<details>
<summary><code>event: string</code></summary>

Type of event.

**只读**: 是

</details>

<div id="debugsessioncustomevent-body"></div>

<details>
<summary><code>body: any</code></summary>

Event specific information.

**只读**: 是

</details>

---

#### DebugSessionOptions {#debugsessionoptions}

Options for starting a debug session.

##### Properties

<div id="debugsessionoptions-parentsession"></div>

<details>
<summary><code>parentSession: <a href="#debugsession">DebugSession</a></code></summary>

When specified the newly created debug session is registered as a "child" session of this
"parent" debug session.

</details>

<div id="debugsessionoptions-lifecyclemanagedbyparent"></div>

<details>
<summary><code>lifecycleManagedByParent: boolean</code></summary>

Controls whether lifecycle requests like 'restart' are sent to the newly created session or its parent session.
By default (if the property is false or missing), lifecycle requests are sent to the new session.
This property is ignored if the session has no parent session.

</details>

<div id="debugsessionoptions-consolemode"></div>

<details>
<summary><code>consoleMode: <a href="#debugconsolemode">DebugConsoleMode</a></code></summary>

Controls whether this session should have a separate debug console or share it
with the parent session. Has no effect for sessions which do not have a parent session.
Defaults to Separate.

</details>

<div id="debugsessionoptions-nodebug"></div>

<details>
<summary><code>noDebug: boolean</code></summary>

Controls whether this session should run without debugging, thus ignoring breakpoints.
When this property is not specified, the value from the parent session (if there is one) is used.

</details>

<div id="debugsessionoptions-compact"></div>

<details>
<summary><code>compact: boolean</code></summary>

Controls if the debug session's parent session is shown in the CALL STACK view even if it has only a single child.
By default, the debug session will never hide its parent.
If compact is true, debug sessions with a single child are hidden in the CALL STACK view to make the tree more compact.

</details>

<div id="debugsessionoptions-suppresssavebeforestart"></div>

<details>
<summary><code>suppressSaveBeforeStart: boolean</code></summary>

When true, a save will not be triggered for open editors when starting a debug session,
regardless of the value of the `debug.saveBeforeStart` setting.

</details>

<div id="debugsessionoptions-suppressdebugtoolbar"></div>

<details>
<summary><code>suppressDebugToolbar: boolean</code></summary>

When true, the debug toolbar will not be shown for this session.

</details>

<div id="debugsessionoptions-suppressdebugstatusbar"></div>

<details>
<summary><code>suppressDebugStatusbar: boolean</code></summary>

When true, the window statusbar color will not be changed for this session.

</details>

<div id="debugsessionoptions-suppressdebugview"></div>

<details>
<summary><code>suppressDebugView: boolean</code></summary>

When true, the debug viewlet will not be automatically revealed for this session.

</details>

<div id="debugsessionoptions-testrun"></div>

<details>
<summary><code>testRun: <a href="#testrun">TestRun</a></code></summary>

Signals to the editor that the debug session was started from a test run
request. This is used to link the lifecycle of the debug session and
test run in UI actions.

</details>

---

#### DebugTreeItem {#debugtreeitem}

An item from the <a href="#debugvisualizationtree">DebugVisualizationTree</a>

##### Properties

<div id="debugtreeitem-label"></div>

<details>
<summary><code>label: string</code></summary>

A human-readable string describing this item.

</details>

<div id="debugtreeitem-description"></div>

<details>
<summary><code>description: string</code></summary>

A human-readable string which is rendered less prominent.

</details>

<div id="debugtreeitem-collapsiblestate"></div>

<details>
<summary><code>collapsibleState: <a href="#treeitemcollapsiblestate">TreeItemCollapsibleState</a></code></summary>

<a href="#treeitemcollapsiblestate">TreeItemCollapsibleState</a> of the tree item.

</details>

<div id="debugtreeitem-contextvalue"></div>

<details>
<summary><code>contextValue: string</code></summary>

Context value of the tree item. This can be used to contribute item specific actions in the tree.
For example, a tree item is given a context value as `folder`. When contributing actions to `view/item/context`
using `menus` extension point, you can specify context value for key `viewItem` in `when` expression like `viewItem == folder`.
```json
"contributes": &#123;
  "menus": &#123;
    "view/item/context": [
      &#123;
        "command": "extension.deleteFolder",
        "when": "viewItem == folder"
      &#125;
    ]
  &#125;
&#125;
```
This will show action `extension.deleteFolder` only for items with `contextValue` is `folder`.

</details>

<div id="debugtreeitem-canedit"></div>

<details>
<summary><code>canEdit: boolean</code></summary>

Whether this item can be edited by the user.

</details>

---

#### DebugVisualizationContext {#debugvisualizationcontext}

##### Properties

<div id="debugvisualizationcontext-variable"></div>

<details>
<summary><code>variable: any</code></summary>

The Debug Adapter Protocol Variable to be visualized.

</details>

<div id="debugvisualizationcontext-containerid"></div>

<details>
<summary><code>containerId: number</code></summary>

The Debug Adapter Protocol variable reference the type (such as a scope
or another variable) that contained this one. Empty for variables
that came from user evaluations in the Debug Console.

</details>

<div id="debugvisualizationcontext-frameid"></div>

<details>
<summary><code>frameId: number</code></summary>

The ID of the Debug Adapter Protocol StackFrame in which the variable was found,
for variables that came from scopes in a stack frame.

</details>

<div id="debugvisualizationcontext-threadid"></div>

<details>
<summary><code>threadId: number</code></summary>

The ID of the Debug Adapter Protocol Thread in which the variable was found.

</details>

<div id="debugvisualizationcontext-session"></div>

<details>
<summary><code>session: <a href="#debugsession">DebugSession</a></code></summary>

The debug session the variable belongs to.

</details>

---

#### DebugVisualizationProvider {#debugvisualizationprovider}

##### Methods

<div id="debugvisualizationprovider-providedebugvisualization"></div>

<details>
<summary><code>provideDebugVisualization(context: DebugVisualizationContext, token: CancellationToken): ProviderResult&lt;T[]&gt;;</code></summary>

Called for each variable when the debug session stops. It should return
any visualizations the extension wishes to show to the user.

Note that this is only called when its `when` clause defined under the
`debugVisualizers` contribution point in the `package.json` evaluates
to true.

</details>

<div id="debugvisualizationprovider-resolvedebugvisualization"></div>

<details>
<summary><code>resolveDebugVisualization?(visualization: T, token: CancellationToken): ProviderResult&lt;T&gt;;</code></summary>

Invoked for a variable when a user picks the visualizer.

It may return a <a href="#treeview">TreeView</a> that's shown in the Debug Console or
inline in a hover. A visualizer may choose to return `undefined` from
this function and instead trigger other actions in the UI, such as opening
a custom <a href="#webviewview">WebviewView</a>.

</details>

---

#### DebugVisualizationTree {#debugvisualizationtree}

Provides a tree that can be referenced in debug visualizations.

##### Methods

<div id="debugvisualizationtree-gettreeitem"></div>

<details>
<summary><code>getTreeItem(context: DebugVisualizationContext): ProviderResult&lt;T&gt;;</code></summary>

Gets the tree item for an element or the base context item.

</details>

<div id="debugvisualizationtree-getchildren"></div>

<details>
<summary><code>getChildren(element: T): ProviderResult&lt;T[]&gt;;</code></summary>

Gets children for the tree item or the best context item.

</details>

<div id="debugvisualizationtree-edititem"></div>

<details>
<summary><code>editItem?(item: T, value: string): ProviderResult&lt;T&gt;;</code></summary>

Handles the user editing an item.

</details>

---

#### DeclarationProvider {#declarationprovider}

The declaration provider interface defines the contract between extensions and
the [go to declaration](https://code.visualstudio.com/api/references/vscode-api#DeclarationProvider)
feature.

##### Methods

<div id="declarationprovider-providedeclaration"></div>

<details>
<summary><code>provideDeclaration(document: TextDocument, position: Position, token: CancellationToken | undefined): ProviderResult&lt;Definition | DefinitionLink[]&gt;;</code></summary>

Provide the declaration of the symbol at the given position and document.

</details>

---

#### DecorationData {#decorationdata}

##### Properties

<div id="decorationdata-letter"></div>

<details>
<summary><code>letter: string</code></summary>

</details>

<div id="decorationdata-title"></div>

<details>
<summary><code>title: string</code></summary>

</details>

<div id="decorationdata-color"></div>

<details>
<summary><code>color: <a href="#themecolor">ThemeColor</a></code></summary>

</details>

<div id="decorationdata-priority"></div>

<details>
<summary><code>priority: number</code></summary>

</details>

<div id="decorationdata-bubble"></div>

<details>
<summary><code>bubble: boolean</code></summary>

</details>

<div id="decorationdata-source"></div>

<details>
<summary><code>source: string</code></summary>

</details>

---

#### DecorationInstanceRenderOptions {#decorationinstancerenderoptions}

##### Properties

<div id="decorationinstancerenderoptions-light"></div>

<details>
<summary><code>light: <a href="#themabledecorationinstancerenderoptions">ThemableDecorationInstanceRenderOptions</a></code></summary>

Overwrite options for light themes.

</details>

<div id="decorationinstancerenderoptions-dark"></div>

<details>
<summary><code>dark: <a href="#themabledecorationinstancerenderoptions">ThemableDecorationInstanceRenderOptions</a></code></summary>

Overwrite options for dark themes.

</details>

---

#### DecorationOptions {#decorationoptions}

Represents options for a specific decoration in a <a href="#texteditordecorationtype">decoration set</a>.

##### Properties

<div id="decorationoptions-range"></div>

<details>
<summary><code>range: <a href="#range">Range</a></code></summary>

Range to which this decoration is applied. The range must not be empty.

</details>

<div id="decorationoptions-hovermessage"></div>

<details>
<summary><code>hoverMessage: <a href="#markdownstring">MarkdownString</a> | <a href="#markedstring">MarkedString</a> | Array&lt;<a href="#markdownstring">MarkdownString</a> | <a href="#markedstring">MarkedString</a>&gt;</code></summary>

A message that should be rendered when hovering over the decoration.

</details>

<div id="decorationoptions-renderoptions"></div>

<details>
<summary><code>renderOptions: <a href="#decorationinstancerenderoptions">DecorationInstanceRenderOptions</a></code></summary>

Render options applied to the current decoration. For performance reasons, keep the
number of decoration specific options small, and use decoration types wherever possible.

</details>

---

#### DecorationRenderOptions {#decorationrenderoptions}

Represents rendering styles for a <a href="#texteditordecorationtype">text editor decoration</a>.

##### Properties

<div id="decorationrenderoptions-iswholeline"></div>

<details>
<summary><code>isWholeLine: boolean</code></summary>

Should the decoration be rendered also on the whitespace after the line text.
Defaults to `false`.

</details>

<div id="decorationrenderoptions-rangebehavior"></div>

<details>
<summary><code>rangeBehavior: <a href="#decorationrangebehavior">DecorationRangeBehavior</a></code></summary>

Customize the growing behavior of the decoration when edits occur at the edges of the decoration's range.
Defaults to `DecorationRangeBehavior.OpenOpen`.

</details>

<div id="decorationrenderoptions-overviewrulerlane"></div>

<details>
<summary><code>overviewRulerLane: <a href="#overviewrulerlane">OverviewRulerLane</a></code></summary>

The position in the overview ruler where the decoration should be rendered.

</details>

<div id="decorationrenderoptions-light"></div>

<details>
<summary><code>light: <a href="#themabledecorationrenderoptions">ThemableDecorationRenderOptions</a></code></summary>

Overwrite options for light themes.

</details>

<div id="decorationrenderoptions-dark"></div>

<details>
<summary><code>dark: <a href="#themabledecorationrenderoptions">ThemableDecorationRenderOptions</a></code></summary>

Overwrite options for dark themes.

</details>

---

#### DefinitionProvider {#definitionprovider}

The definition provider interface defines the contract between extensions and
the [go to definition](https://code.visualstudio.com/docs/editor/editingevolved#_go-to-definition)
and peek definition features.

##### Methods

<div id="definitionprovider-providedefinition"></div>

<details>
<summary><code>provideDefinition(document: TextDocument, position: Position, token: CancellationToken | undefined): ProviderResult&lt;Definition | DefinitionLink[]&gt;;</code></summary>

Provide the definition of the symbol at the given position and document.

</details>

---

#### DiagnosticChangeEvent {#diagnosticchangeevent}

The event that is fired when diagnostics change.

##### Properties

<div id="diagnosticchangeevent-uris"></div>

<details>
<summary><code>uris: readonly <a href="#uri">Uri</a>[]</code></summary>

An array of resources for which diagnostics have changed.

**只读**: 是

</details>

---

#### DiagnosticCollection {#diagnosticcollection}

##### Properties

<div id="diagnosticcollection-name"></div>

<details>
<summary><code>name: string</code></summary>

The name of this diagnostic collection, for instance `typescript`. Every diagnostic
from this collection will be associated with this name. Also, the task framework uses this
name when defining [problem matchers](https://code.visualstudio.com/docs/editor/tasks#_defining-a-problem-matcher).

**只读**: 是

</details>

##### Methods

<div id="diagnosticcollection-set"></div>

<details>
<summary><code>set(uri: Uri, diagnostics: Diagnostic[] | undefined): void;</code></summary>

Assign diagnostics for given resource. Will replace
existing diagnostics for that resource.

</details>

<div id="diagnosticcollection-set"></div>

<details>
<summary><code>set(entries: [Uri, Diagnostic[] | undefined][] | undefined): void;</code></summary>

Replace all entries in this collection for given uris.

Diagnostics of multiple tuples of the same uri will be merged, e.g
`[[file1, [d1]], [file1, [d2]]]` is equivalent to `[[file1, [d1, d2]]]`.
If a diagnostics item is `undefined` as in `[file1, undefined]`
all previous but not subsequent diagnostics are removed.

</details>

<div id="diagnosticcollection-delete"></div>

<details>
<summary><code>delete(uri: Uri): void;</code></summary>

Remove all diagnostics from this collection that belong
to the provided `uri`. The same as `#set(uri, undefined)`.

</details>

<div id="diagnosticcollection-clear"></div>

<details>
<summary><code>clear(): void;</code></summary>

Remove all diagnostics from this collection. The same
as calling `#set(undefined)`;

</details>

<div id="diagnosticcollection-foreach"></div>

<details>
<summary><code>forEach(callback: (uri: Uri, diagnostics: readonly Diagnostic[], collection: DiagnosticCollection) =&gt; any, thisArg?: any): void;</code></summary>

Iterate over each entry in this collection.

</details>

<div id="diagnosticcollection-get"></div>

<details>
<summary><code>get(uri: Uri): readonly Diagnostic[] | undefined;</code></summary>

Get the diagnostics for a given resource. *Note* that you cannot
modify the diagnostics-array returned from this call.

</details>

<div id="diagnosticcollection-has"></div>

<details>
<summary><code>has(uri: Uri): boolean;</code></summary>

Check if this collection contains diagnostics for a
given resource.

</details>

<div id="diagnosticcollection-dispose"></div>

<details>
<summary><code>dispose(): void;</code></summary>

Dispose and free associated resources. Calls
clear.

</details>

---

#### DialogControlElement {#dialogcontrolelement}

##### Properties

<div id="dialogcontrolelement-id"></div>

<details>
<summary><code>id: string</code></summary>

**只读**: 是

</details>

<div id="dialogcontrolelement-type"></div>

<details>
<summary><code>type: string</code></summary>

**只读**: 是

</details>

<div id="dialogcontrolelement-style"></div>

<details>
<summary><code>style: Partial&lt;CSSStyleDeclaration&gt;</code></summary>

**只读**: 是

</details>

<div id="dialogcontrolelement-attributes"></div>

<details>
<summary><code>attributes: &#123; readonly textContent?: string, readonly checked?: boolean, readonly type?: string &#125;</code></summary>

**只读**: 是

</details>

<div id="dialogcontrolelement-listentype"></div>

<details>
<summary><code>listenType: string</code></summary>

**只读**: 是

</details>

<div id="dialogcontrolelement-onclose"></div>

<details>
<summary><code>onClose: () =&gt; Promise&lt;void&gt;</code></summary>

**只读**: 是

</details>

<div id="dialogcontrolelement-classname"></div>

<details>
<summary><code>className: string[]</code></summary>

**只读**: 是

</details>

<div id="dialogcontrolelement-parentid"></div>

<details>
<summary><code>parentId: string</code></summary>

**只读**: 是

</details>

---

#### DocumentColorProvider {#documentcolorprovider}

The document color provider defines the contract between extensions and feature of
picking and modifying colors in the editor.

##### Methods

<div id="documentcolorprovider-providedocumentcolors"></div>

<details>
<summary><code>provideDocumentColors(document: TextDocument, token: CancellationToken): ProviderResult&lt;ColorInformation[]&gt;;</code></summary>

Provide colors for the given document.

</details>

<div id="documentcolorprovider-providecolorpresentations"></div>

<details>
<summary><code>provideColorPresentations(color: Color, context: &#123; document: TextDocument, range: Range &#125;, token: CancellationToken): ProviderResult&lt;ColorPresentation[]&gt;;</code></summary>

Provide <a href="#colorpresentation">representations</a> for a color.

</details>

---

#### DocumentContextItem {#documentcontextitem}

##### Properties

<div id="documentcontextitem-uri"></div>

<details>
<summary><code>uri: <a href="#uri">Uri</a></code></summary>

**只读**: 是

</details>

<div id="documentcontextitem-version"></div>

<details>
<summary><code>version: number</code></summary>

**只读**: 是

</details>

<div id="documentcontextitem-ranges"></div>

<details>
<summary><code>ranges: <a href="#range">Range</a>[]</code></summary>

**只读**: 是

</details>

---

#### DocumentDropEdit {#documentdropedit}

TODO on finalization:
- Add ctor(insertText: string | SnippetString, title?: string, kind?: DocumentDropOrPasteEditKind); Can't be done as this is an extension to an existing class

##### Properties

<div id="documentdropedit-title"></div>

<details>
<summary><code>title: string</code></summary>

Human readable label that describes the edit.

</details>

<div id="documentdropedit-kind"></div>

<details>
<summary><code>kind: DocumentDropOrPasteEditKind</code></summary>

Kind of the edit.

</details>

<div id="documentdropedit-yieldto"></div>

<details>
<summary><code>yieldTo: readonly DocumentDropOrPasteEditKind[]</code></summary>

Controls the ordering or multiple edits. If this provider yield to edits, it will be shown lower in the list.

</details>

---

#### DocumentDropEditProvider {#documentdropeditprovider}

Provider which handles dropping of resources into a text editor.

This allows users to drag and drop resources (including resources from external apps) into the editor. While dragging
and dropping files, users can hold down `shift` to drop the file into the editor instead of opening it.
Requires `editor.dropIntoEditor.enabled` to be on.

##### Methods

<div id="documentdropeditprovider-providedocumentdropedits"></div>

<details>
<summary><code>provideDocumentDropEdits(document: TextDocument, position: Position, dataTransfer: DataTransfer, token: CancellationToken): ProviderResult&lt;DocumentDropEdit&gt;;</code></summary>

Provide edits which inserts the content being dragged and dropped into the document.

</details>

---

#### DocumentDropEditProvider {#documentdropeditprovider}

##### Methods

<div id="documentdropeditprovider-providedocumentdropedits"></div>

<details>
<summary><code>provideDocumentDropEdits(document: TextDocument, position: Position, dataTransfer: DataTransfer, token: CancellationToken): ProviderResult&lt;DocumentDropEdit | DocumentDropEdit[]&gt;;</code></summary>

</details>

<div id="documentdropeditprovider-resolvedocumentdropedit"></div>

<details>
<summary><code>resolveDocumentDropEdit?(edit: T, token: CancellationToken): ProviderResult&lt;T&gt;;</code></summary>

Optional method which fills in the additionalEdit before the edit is applied.

This is called once per edit and should be used if generating the complete edit may take a long time.
Resolve can only be used to change additionalEdit.

</details>

---

#### DocumentDropEditProviderMetadata {#documentdropeditprovidermetadata}

Provides additional metadata about how a <a href="#documentdropeditprovider">DocumentDropEditProvider</a> works.

##### Properties

<div id="documentdropeditprovidermetadata-provideddropeditkinds"></div>

<details>
<summary><code>providedDropEditKinds: readonly DocumentDropOrPasteEditKind[]</code></summary>

List of kinds that the provider may return in provideDocumentDropEdits.

This is used to filter out providers when a specific kind of edit is requested.

**只读**: 是

</details>

<div id="documentdropeditprovidermetadata-dropmimetypes"></div>

<details>
<summary><code>dropMimeTypes: readonly string[]</code></summary>

List of <a href="#datatransfer">DataTransfer</a> mime types that the provider can handle.

This can either be an exact mime type such as `image/png`, or a wildcard pattern such as `image/*`.

Use `text/uri-list` for resources dropped from the explorer or other tree views in the workbench.

Use `files` to indicate that the provider should be invoked if any <a href="#datatransferfile">files</a> are present in the <a href="#datatransfer">DataTransfer</a>.
Note that <a href="#datatransferfile">DataTransferFile</a> entries are only created when dropping content from outside the editor, such as
from the operating system.

**只读**: 是

</details>

---

#### DocumentFilter {#documentfilter}

A document filter denotes a document by different properties like
the language, the scheme of
its resource, or a glob-pattern that is applied to the path.

##### Properties

<div id="documentfilter-language"></div>

<details>
<summary><code>language: string</code></summary>

A language id, like `typescript`.

**只读**: 是

</details>

<div id="documentfilter-scheme"></div>

<details>
<summary><code>scheme: string</code></summary>

A Uri scheme, like `file` or `untitled`.

**只读**: 是

</details>

<div id="documentfilter-pattern"></div>

<details>
<summary><code>pattern: <a href="#globpattern">GlobPattern</a></code></summary>

A <a href="#globpattern">glob pattern</a> that is matched on the absolute path of the document. Use a <a href="#relativepattern">relative pattern</a>
to filter documents to a <a href="#workspacefolder">workspace folder</a>.

**只读**: 是

</details>

<div id="documentfilter-notebooktype"></div>

<details>
<summary><code>notebookType: string</code></summary>

The type of a notebook, like `jupyter-notebook`. This allows
to narrow down on the type of a notebook that a cell document belongs to.

*Note* that setting the `notebookType`-property changes how `scheme` and `pattern` are interpreted. When set
they are evaluated against the notebook uri, not the document uri.

**只读**: 是

</details>

---

#### DocumentFormattingEditProvider {#documentformattingeditprovider}

The document formatting provider interface defines the contract between extensions and
the formatting-feature.

##### Methods

<div id="documentformattingeditprovider-providedocumentformattingedits"></div>

<details>
<summary><code>provideDocumentFormattingEdits( document: TextDocument, options: FormattingOptions, token: CancellationToken | undefined ): ProviderResult&lt;TextEdit[] | undefined&gt;;</code></summary>

Provide formatting edits for a whole document.

</details>

---

#### DocumentHighlightProvider {#documenthighlightprovider}

The document highlight provider interface defines the contract between extensions and
the word-highlight-feature.

##### Methods

<div id="documenthighlightprovider-providedocumenthighlights"></div>

<details>
<summary><code>provideDocumentHighlights(document: TextDocument, position: Position, token: CancellationToken | undefined): ProviderResult&lt;DocumentHighlight[]&gt;;</code></summary>

Provide a set of document highlights, like all occurrences of a variable or
all exit-points of a function.

</details>

---

#### DocumentLinkProvider {#documentlinkprovider}

The document link provider defines the contract between extensions and feature of showing
links in the editor.

##### Methods

<div id="documentlinkprovider-providedocumentlinks"></div>

<details>
<summary><code>provideDocumentLinks(document: TextDocument, token: CancellationToken): ProviderResult&lt;T[]&gt;;</code></summary>

Provide links for the given document. Note that the editor ships with a default provider that detects
`http(s)` and `file` links.

</details>

<div id="documentlinkprovider-resolvedocumentlink"></div>

<details>
<summary><code>resolveDocumentLink?(link: T, token: CancellationToken): ProviderResult&lt;T&gt;;</code></summary>

Given a link fill in its target. This method is called when an incomplete
link is selected in the UI. Providers can implement this method and return incomplete links
(without target) from the [`provideDocumentLinks`](#DocumentLinkProvider.provideDocumentLinks) method which
often helps to improve performance.

</details>

---

#### DocumentPasteEditContext {#documentpasteeditcontext}

Additional information about the paste operation.

##### Properties

<div id="documentpasteeditcontext-only"></div>

<details>
<summary><code>only: DocumentDropOrPasteEditKind | undefined</code></summary>

Requested kind of paste edits to return.

**只读**: 是

</details>

<div id="documentpasteeditcontext-triggerkind"></div>

<details>
<summary><code>triggerKind: <a href="#documentpastetriggerkind">DocumentPasteTriggerKind</a></code></summary>

The reason why paste edits were requested.

**只读**: 是

</details>

---

#### DocumentRangeFormattingEditProvider {#documentrangeformattingeditprovider}

The document formatting provider interface defines the contract between extensions and
the formatting-feature.

##### Methods

<div id="documentrangeformattingeditprovider-providedocumentrangeformattingedits"></div>

<details>
<summary><code>provideDocumentRangeFormattingEdits( document: TextDocument, range: Range, options: FormattingOptions, token: CancellationToken | undefined ): ProviderResult&lt;TextEdit[] | undefined&gt;;</code></summary>

Provide formatting edits for a range in a document.

The given range is a hint and providers can decide to format a smaller
or larger range. Often this is done by adjusting the start and end
of the range to full syntax nodes.

</details>

<div id="documentrangeformattingeditprovider-providedocumentrangesformattingedits"></div>

<details>
<summary><code>provideDocumentRangesFormattingEdits?(document: TextDocument, ranges: Range[], options: FormattingOptions, token: CancellationToken): ProviderResult&lt;TextEdit[]&gt;;</code></summary>

Provide formatting edits for multiple ranges in a document.

This function is optional but allows a formatter to perform faster when formatting only modified ranges or when
formatting a large number of selections.

The given ranges are hints and providers can decide to format a smaller
or larger range. Often this is done by adjusting the start and end
of the range to full syntax nodes.

</details>

---

#### DocumentRangeSemanticTokensProvider {#documentrangesemantictokensprovider}

The document range semantic tokens provider interface defines the contract between extensions and
semantic tokens.

##### Methods

<div id="documentrangesemantictokensprovider-providedocumentrangesemantictokens"></div>

<details>
<summary><code>provideDocumentRangeSemanticTokens(document: TextDocument, range: Range, token: CancellationToken): ProviderResult&lt;SemanticTokens&gt;;</code></summary>

</details>

---

#### DocumentSemanticTokensProvider {#documentsemantictokensprovider}

The document semantic tokens provider interface defines the contract between extensions and
semantic tokens.

##### Properties

<div id="documentsemantictokensprovider-ondidchangesemantictokens"></div>

<details>
<summary><code>onDidChangeSemanticTokens: <a href="#event">Event</a>&lt;void&gt;</code></summary>

An optional event to signal that the semantic tokens from this provider have changed.

</details>

##### Methods

<div id="documentsemantictokensprovider-providedocumentsemantictokens"></div>

<details>
<summary><code>provideDocumentSemanticTokens(document: TextDocument, token: CancellationToken): ProviderResult&lt;SemanticTokens&gt;;</code></summary>

Tokens in a file are represented as an array of integers. The position of each token is expressed relative to
the token before it, because most tokens remain stable relative to each other when edits are made in a file.

---
In short, each token takes 5 integers to represent, so a specific token `i` in the file consists of the following array indices:
 - at index `5*i`   - `deltaLine`: token line number, relative to the previous token
 - at index `5*i+1` - `deltaStart`: token start character, relative to the previous token (relative to 0 or the previous token's start if they are on the same line)
 - at index `5*i+2` - `length`: the length of the token. A token cannot be multiline.
 - at index `5*i+3` - `tokenType`: will be looked up in `SemanticTokensLegend.tokenTypes`. We currently ask that `tokenType` &lt; 65536.
 - at index `5*i+4` - `tokenModifiers`: each set bit will be looked up in `SemanticTokensLegend.tokenModifiers`

---
### How to encode tokens

Here is an example for encoding a file with 3 tokens in a uint32 array:
```
   &#123; line: 2, startChar:  5, length: 3, tokenType: "property",  tokenModifiers: ["private", "static"] &#125;,
   &#123; line: 2, startChar: 10, length: 4, tokenType: "type",      tokenModifiers: [] &#125;,
   &#123; line: 5, startChar:  2, length: 7, tokenType: "class",     tokenModifiers: [] &#125;
```

1. First of all, a legend must be devised. This legend must be provided up-front and capture all possible token types.
For this example, we will choose the following legend which must be passed in when registering the provider:
```
   tokenTypes: ['property', 'type', 'class'],
   tokenModifiers: ['private', 'static']
```

2. The first transformation step is to encode `tokenType` and `tokenModifiers` as integers using the legend. Token types are looked
up by index, so a `tokenType` value of `1` means `tokenTypes[1]`. Multiple token modifiers can be set by using bit flags,
so a `tokenModifier` value of `3` is first viewed as binary `0b00000011`, which means `[tokenModifiers[0], tokenModifiers[1]]` because
bits 0 and 1 are set. Using this legend, the tokens now are:
```
   &#123; line: 2, startChar:  5, length: 3, tokenType: 0, tokenModifiers: 3 &#125;,
   &#123; line: 2, startChar: 10, length: 4, tokenType: 1, tokenModifiers: 0 &#125;,
   &#123; line: 5, startChar:  2, length: 7, tokenType: 2, tokenModifiers: 0 &#125;
```

3. The next step is to represent each token relative to the previous token in the file. In this case, the second token
is on the same line as the first token, so the `startChar` of the second token is made relative to the `startChar`
of the first token, so it will be `10 - 5`. The third token is on a different line than the second token, so the
`startChar` of the third token will not be altered:
```
   &#123; deltaLine: 2, deltaStartChar: 5, length: 3, tokenType: 0, tokenModifiers: 3 &#125;,
   &#123; deltaLine: 0, deltaStartChar: 5, length: 4, tokenType: 1, tokenModifiers: 0 &#125;,
   &#123; deltaLine: 3, deltaStartChar: 2, length: 7, tokenType: 2, tokenModifiers: 0 &#125;
```

4. Finally, the last step is to inline each of the 5 fields for a token in a single array, which is a memory friendly representation:
```
   // 1st token,  2nd token,  3rd token
   [  2,5,3,0,3,  0,5,4,1,0,  3,2,7,2,0 ]
```

</details>

<div id="documentsemantictokensprovider-providedocumentsemantictokensedits"></div>

<details>
<summary><code>provideDocumentSemanticTokensEdits?(document: TextDocument, previousResultId: string, token: CancellationToken): ProviderResult&lt;SemanticTokens | SemanticTokensEdits&gt;;</code></summary>

Instead of always returning all the tokens in a file, it is possible for a `DocumentSemanticTokensProvider` to implement
this method (`provideDocumentSemanticTokensEdits`) and then return incremental updates to the previously provided semantic tokens.

---
### How tokens change when the document changes

Suppose that `provideDocumentSemanticTokens` has previously returned the following semantic tokens:
```
   // 1st token,  2nd token,  3rd token
   [  2,5,3,0,3,  0,5,4,1,0,  3,2,7,2,0 ]
```

Also suppose that after some edits, the new semantic tokens in a file are:
```
   // 1st token,  2nd token,  3rd token
   [  3,5,3,0,3,  0,5,4,1,0,  3,2,7,2,0 ]
```
It is possible to express these new tokens in terms of an edit applied to the previous tokens:
```
   [  2,5,3,0,3,  0,5,4,1,0,  3,2,7,2,0 ] // old tokens
   [  3,5,3,0,3,  0,5,4,1,0,  3,2,7,2,0 ] // new tokens

   edit: &#123; start:  0, deleteCount: 1, data: [3] &#125; // replace integer at offset 0 with 3
```

*NOTE*: If the provider cannot compute `SemanticTokensEdits`, it can "give up" and return all the tokens in the document again.
*NOTE*: All edits in `SemanticTokensEdits` contain indices in the old integers array, so they all refer to the previous result state.

</details>

---

#### DocumentSymbolProvider {#documentsymbolprovider}

The document symbol provider interface defines the contract between extensions and
the [go to symbol](https://code.visualstudio.com/docs/editor/editingevolved#_go-to-symbol)-feature.

##### Methods

<div id="documentsymbolprovider-providedocumentsymbols"></div>

<details>
<summary><code>provideDocumentSymbols(document: TextDocument, token: CancellationToken): ProviderResult&lt;SymbolInformation[] | DocumentSymbol[]&gt;;</code></summary>

Provide symbol information for the given document.

</details>

---

#### DocumentSymbolProviderMetadata {#documentsymbolprovidermetadata}

Metadata about a <a href="#documentsymbolprovider">DocumentSymbolProvider</a>.

##### Properties

<div id="documentsymbolprovidermetadata-label"></div>

<details>
<summary><code>label: string</code></summary>

A human-readable string that is shown when multiple outline trees show for one document.

</details>

---

#### EditSessionIdentityProvider {#editsessionidentityprovider}

##### Methods

<div id="editsessionidentityprovider-provideeditsessionidentity"></div>

<details>
<summary><code>provideEditSessionIdentity(workspaceFolder: WorkspaceFolder, token: CancellationToken): ProviderResult&lt;string&gt;;</code></summary>

</details>

<div id="editsessionidentityprovider-provideeditsessionidentitymatch"></div>

<details>
<summary><code>provideEditSessionIdentityMatch(identity1: string, identity2: string, token: CancellationToken): ProviderResult&lt;EditSessionIdentityMatch&gt;;</code></summary>

</details>

---

#### EditSessionIdentityWillCreateEvent {#editsessionidentitywillcreateevent}

##### Properties

<div id="editsessionidentitywillcreateevent-token"></div>

<details>
<summary><code>token: <a href="#cancellationtoken">CancellationToken</a></code></summary>

A cancellation token.

**只读**: 是

</details>

<div id="editsessionidentitywillcreateevent-workspacefolder"></div>

<details>
<summary><code>workspaceFolder: <a href="#workspacefolder">WorkspaceFolder</a></code></summary>

The workspace folder to create an edit session identity for.

**只读**: 是

</details>

##### Methods

<div id="editsessionidentitywillcreateevent-waituntil"></div>

<details>
<summary><code>waitUntil(thenable: Thenable&lt;any&gt;): void;</code></summary>

Allows to pause the event until the provided thenable resolves.

*Note:* This function can only be called during event dispatch.

</details>

---

#### EnterAction {#enteraction}

Describes what to do when pressing Enter.

##### Properties

<div id="enteraction-indentaction"></div>

<details>
<summary><code>indentAction: <a href="#indentaction">IndentAction</a></code></summary>

Describe what to do with the indentation.

</details>

<div id="enteraction-appendtext"></div>

<details>
<summary><code>appendText: string</code></summary>

Describes text to be appended after the new line and after the indentation.

</details>

<div id="enteraction-removetext"></div>

<details>
<summary><code>removeText: number</code></summary>

Describes the number of characters to remove from the new line's indentation.

</details>

---

#### EnvironmentVariableCollection {#environmentvariablecollection}

A collection of mutations that an extension can apply to a process environment.

##### Properties

<div id="environmentvariablecollection-description"></div>

<details>
<summary><code>description: string | <a href="#markdownstring">MarkdownString</a> | undefined</code></summary>

A description for the environment variable collection, this will be used to describe the changes in the UI.

</details>

<div id="environmentvariablecollection-persistent"></div>

<details>
<summary><code>persistent: boolean</code></summary>

Whether the collection should be cached for the workspace and applied to the terminal
across window reloads. When true the collection will be active immediately such when the
window reloads. Additionally, this API will return the cached version if it exists. The
collection will be invalidated when the extension is uninstalled or when the collection
is cleared. Defaults to true.

</details>

##### Methods

<div id="environmentvariablecollection-replace"></div>

<details>
<summary><code>replace(variable: string, value: string, options?: EnvironmentVariableMutatorOptions): void;</code></summary>

Replace an environment variable with a value.

Note that an extension can only make a single change to any one variable, so this will
overwrite any previous calls to replace, append or prepend.

</details>

<div id="environmentvariablecollection-append"></div>

<details>
<summary><code>append(variable: string, value: string, options?: EnvironmentVariableMutatorOptions): void;</code></summary>

Append a value to an environment variable.

Note that an extension can only make a single change to any one variable, so this will
overwrite any previous calls to replace, append or prepend.

</details>

<div id="environmentvariablecollection-prepend"></div>

<details>
<summary><code>prepend(variable: string, value: string, options?: EnvironmentVariableMutatorOptions): void;</code></summary>

Prepend a value to an environment variable.

Note that an extension can only make a single change to any one variable, so this will
overwrite any previous calls to replace, append or prepend.

</details>

<div id="environmentvariablecollection-get"></div>

<details>
<summary><code>get(variable: string): EnvironmentVariableMutator | undefined;</code></summary>

Gets the mutator that this collection applies to a variable, if any.

</details>

<div id="environmentvariablecollection-foreach"></div>

<details>
<summary><code>forEach(callback: (variable: string, mutator: EnvironmentVariableMutator, collection: EnvironmentVariableCollection) =&gt; any, thisArg?: any): void;</code></summary>

Iterate over each mutator in this collection.

</details>

<div id="environmentvariablecollection-delete"></div>

<details>
<summary><code>delete(variable: string): void;</code></summary>

Deletes this collection's mutator for a variable.

</details>

<div id="environmentvariablecollection-clear"></div>

<details>
<summary><code>clear(): void;</code></summary>

Clears all mutators from this collection.

</details>

---

#### EnvironmentVariableMutator {#environmentvariablemutator}

A type of mutation and its value to be applied to an environment variable.

##### Properties

<div id="environmentvariablemutator-type"></div>

<details>
<summary><code>type: <a href="#environmentvariablemutatortype">EnvironmentVariableMutatorType</a></code></summary>

The type of mutation that will occur to the variable.

**只读**: 是

</details>

<div id="environmentvariablemutator-value"></div>

<details>
<summary><code>value: string</code></summary>

The value to use for the variable.

**只读**: 是

</details>

<div id="environmentvariablemutator-options"></div>

<details>
<summary><code>options: <a href="#environmentvariablemutatoroptions">EnvironmentVariableMutatorOptions</a></code></summary>

Options applied to the mutator.

**只读**: 是

</details>

---

#### EnvironmentVariableMutatorOptions {#environmentvariablemutatoroptions}

Options applied to the mutator.

##### Properties

<div id="environmentvariablemutatoroptions-applyatprocesscreation"></div>

<details>
<summary><code>applyAtProcessCreation: boolean</code></summary>

Apply to the environment just before the process is created. Defaults to true

</details>

<div id="environmentvariablemutatoroptions-applyatshellintegration"></div>

<details>
<summary><code>applyAtShellIntegration: boolean</code></summary>

Apply to the environment in the shell integration script. Note that this _will not_ apply
the mutator if shell integration is disabled or not working for some reason. Defaults to
false.

</details>

---

#### EnvironmentVariableScope {#environmentvariablescope}

The scope object to which the environment variable collection applies.

##### Properties

<div id="environmentvariablescope-workspacefolder"></div>

<details>
<summary><code>workspaceFolder: <a href="#workspacefolder">WorkspaceFolder</a></code></summary>

Any specific workspace folder to get collection for.

</details>

---

#### EvaluatableExpressionProvider {#evaluatableexpressionprovider}

The evaluatable expression provider interface defines the contract between extensions and
the debug hover. In this contract the provider returns an evaluatable expression for a given position
in a document and the editor evaluates this expression in the active debug session and shows the result in a debug hover.

##### Methods

<div id="evaluatableexpressionprovider-provideevaluatableexpression"></div>

<details>
<summary><code>provideEvaluatableExpression(document: TextDocument, position: Position, token: CancellationToken | undefined): ProviderResult&lt;EvaluatableExpression&gt;;</code></summary>

Provide an evaluatable expression for the given document and position.
The editor will evaluate this expression in the active debug session and will show the result in the debug hover.
The expression can be implicitly specified by the range in the underlying document or by explicitly returning an expression.

</details>

---

#### Event {#event}

Represents a typed event.

---

#### Extension {#extension}

Represents an extension.

To get an instance of an `Extension` use getExtension.

##### Properties

<div id="extension-id"></div>

<details>
<summary><code>id: string</code></summary>

The canonical extension identifier in the form of: `publisher.name`.

**只读**: 是

</details>

<div id="extension-extensionuri"></div>

<details>
<summary><code>extensionUri: <a href="#uri">Uri</a></code></summary>

The uri of the directory containing the extension.

**只读**: 是

</details>

<div id="extension-extensionpath"></div>

<details>
<summary><code>extensionPath: string</code></summary>

The absolute file path of the directory containing this extension. Shorthand
notation for Extension.extensionUri.fsPath (independent of the uri scheme).

**只读**: 是

</details>

<div id="extension-isactive"></div>

<details>
<summary><code>isActive: boolean</code></summary>

`true` if the extension has been activated.

**只读**: 是

</details>

<div id="extension-packagejson"></div>

<details>
<summary><code>packageJSON: any</code></summary>

The parsed contents of the extension's package.json.

**只读**: 是

</details>

<div id="extension-extensionkind"></div>

<details>
<summary><code>extensionKind: <a href="#extensionkind">ExtensionKind</a></code></summary>

The extension kind describes if an extension runs where the UI runs
or if an extension runs where the remote extension host runs. The extension kind
is defined in the `package.json`-file of extensions but can also be refined
via the `remote.extensionKind`-setting. When no remote extension host exists,
the value is UI.

</details>

<div id="extension-exports"></div>

<details>
<summary><code>exports: T</code></summary>

The public API exported by this extension (return value of `activate`).
It is an invalid action to access this field before this extension has been activated.

**只读**: 是

</details>

##### Methods

<div id="extension-activate"></div>

<details>
<summary><code>activate(): Thenable&lt;T&gt;;</code></summary>

Activates this extension and returns its public API.

</details>

---

#### Extension {#extension}

##### Properties

<div id="extension-isfromdifferentextensionhost"></div>

<details>
<summary><code>isFromDifferentExtensionHost: boolean</code></summary>

`true` when the extension is associated to another extension host.

*Note* that an extension from another extension host cannot export
API, e.g its exports are always `undefined`.

**只读**: 是

</details>

---

#### ExtensionContext {#extensioncontext}

An extension context is a collection of utilities private to an
extension.

An instance of an `ExtensionContext` is provided as the first
parameter to the `activate`-call of an extension.

##### Properties

<div id="extensioncontext-subscriptions"></div>

<details>
<summary><code>subscriptions: &#123; dispose(): any &#125;[]</code></summary>

An array to which disposables can be added. When this
extension is deactivated the disposables will be disposed.

*Note* that asynchronous dispose-functions aren't awaited.

**只读**: 是

</details>

<div id="extensioncontext-workspacestate"></div>

<details>
<summary><code>workspaceState: <a href="#memento">Memento</a></code></summary>

A memento object that stores state in the context
of the currently opened workspace.

**只读**: 是

</details>

<div id="extensioncontext-globalstate"></div>

<details>
<summary><code>globalState: <a href="#memento">Memento</a> & &#123; setKeysForSync(keys: readonly string[]): void; &#125;</code></summary>

A memento object that stores state independent
of the current opened workspace.

**只读**: 是

</details>

<div id="extensioncontext-secrets"></div>

<details>
<summary><code>secrets: <a href="#secretstorage">SecretStorage</a></code></summary>

A storage utility for secrets. Secrets are persisted across reloads and are independent of the
current opened workspace.

**只读**: 是

</details>

<div id="extensioncontext-extensionuri"></div>

<details>
<summary><code>extensionUri: <a href="#uri">Uri</a></code></summary>

The uri of the directory containing the extension.

**只读**: 是

</details>

<div id="extensioncontext-extensionpath"></div>

<details>
<summary><code>extensionPath: string</code></summary>

The absolute file path of the directory containing the extension. Shorthand
notation for ExtensionContext.extensionUri.fsPath (independent of the uri scheme).

**只读**: 是

</details>

<div id="extensioncontext-environmentvariablecollection"></div>

<details>
<summary><code>environmentVariableCollection: <a href="#globalenvironmentvariablecollection">GlobalEnvironmentVariableCollection</a></code></summary>

Gets the extension's environment variable collection for this workspace, enabling changes
to be applied to terminal environment variables.

**只读**: 是

</details>

<div id="extensioncontext-storageuri"></div>

<details>
<summary><code>storageUri: <a href="#uri">Uri</a> | undefined</code></summary>

The uri of a workspace specific directory in which the extension
can store private state. The directory might not exist and creation is
up to the extension. However, the parent directory is guaranteed to be existent.
The value is `undefined` when no workspace nor folder has been opened.

Use workspaceState or
globalState to store key value data.

**只读**: 是

</details>

<div id="extensioncontext-storagepath"></div>

<details>
<summary><code>storagePath: string | undefined</code></summary>

An absolute file path of a workspace specific directory in which the extension
can store private state. The directory might not exist on disk and creation is
up to the extension. However, the parent directory is guaranteed to be existent.

Use workspaceState or
globalState to store key value data.

**只读**: 是

</details>

<div id="extensioncontext-globalstorageuri"></div>

<details>
<summary><code>globalStorageUri: <a href="#uri">Uri</a></code></summary>

The uri of a directory in which the extension can store global state.
The directory might not exist on disk and creation is
up to the extension. However, the parent directory is guaranteed to be existent.

Use globalState to store key value data.

**只读**: 是

</details>

<div id="extensioncontext-globalstoragepath"></div>

<details>
<summary><code>globalStoragePath: string</code></summary>

An absolute file path in which the extension can store global state.
The directory might not exist on disk and creation is
up to the extension. However, the parent directory is guaranteed to be existent.

Use globalState to store key value data.

**只读**: 是

</details>

<div id="extensioncontext-loguri"></div>

<details>
<summary><code>logUri: <a href="#uri">Uri</a></code></summary>

The uri of a directory in which the extension can create log files.
The directory might not exist on disk and creation is up to the extension. However,
the parent directory is guaranteed to be existent.

**只读**: 是

</details>

<div id="extensioncontext-logpath"></div>

<details>
<summary><code>logPath: string</code></summary>

An absolute file path of a directory in which the extension can create log files.
The directory might not exist on disk and creation is up to the extension. However,
the parent directory is guaranteed to be existent.

**只读**: 是

</details>

<div id="extensioncontext-extensionmode"></div>

<details>
<summary><code>extensionMode: <a href="#extensionmode">ExtensionMode</a></code></summary>

The mode the extension is running in. This is specific to the current
extension. One extension may be in `ExtensionMode.Development` while
other extensions in the host run in `ExtensionMode.Release`.

**只读**: 是

</details>

<div id="extensioncontext-extension"></div>

<details>
<summary><code>extension: <a href="#extension">Extension</a>&lt;any&gt;</code></summary>

The current `Extension` instance.

**只读**: 是

</details>

<div id="extensioncontext-languagemodelaccessinformation"></div>

<details>
<summary><code>languageModelAccessInformation: <a href="#languagemodelaccessinformation">LanguageModelAccessInformation</a></code></summary>

An object that keeps information about how this extension can use language models.

**只读**: 是

</details>

##### Methods

<div id="extensioncontext-asabsolutepath"></div>

<details>
<summary><code>asAbsolutePath(relativePath: string): string;</code></summary>

Get the absolute path of a resource contained in the extension.

*Note* that an absolute uri can be constructed via joinPath and
extensionUri, e.g. `vscode.Uri.joinPath(context.extensionUri, relativePath);`

</details>

---

#### ExtensionTerminalOptions {#extensionterminaloptions}

Options a virtual process terminal.

##### Properties

<div id="extensionterminaloptions-name"></div>

<details>
<summary><code>name: string</code></summary>

The name of the terminal.

</details>

<div id="extensionterminaloptions-pty"></div>

<details>
<summary><code>pty: Pseudoterminal</code></summary>

An implementation of Pseudoterminal where an extension can
control it.

</details>

<div id="extensionterminaloptions-location"></div>

<details>
<summary><code>location: <a href="#terminallocation">TerminalLocation</a> | <a href="#terminaleditorlocationoptions">TerminalEditorLocationOptions</a> | <a href="#terminalsplitlocationoptions">TerminalSplitLocationOptions</a></code></summary>

The <a href="#terminallocation">TerminalLocation</a> or <a href="#terminaleditorlocationoptions">TerminalEditorLocationOptions</a> or <a href="#terminalsplitlocationoptions">TerminalSplitLocationOptions</a> for the terminal.

</details>

<div id="extensionterminaloptions-istransient"></div>

<details>
<summary><code>isTransient: boolean</code></summary>

Opt-out of the default terminal persistence on restart and reload.
This will only take effect when `terminal.integrated.enablePersistentSessions` is enabled.

</details>

<div id="extensionterminaloptions-iconpath"></div>

<details>
<summary><code>iconPath: <a href="#iconpath">IconPath</a></code></summary>

The icon path or <a href="#themeicon">ThemeIcon</a> for the terminal.

</details>

<div id="extensionterminaloptions-color"></div>

<details>
<summary><code>color: <a href="#themecolor">ThemeColor</a></code></summary>

The icon <a href="#themecolor">ThemeColor</a> for the terminal.
The standard `terminal.ansi*` theme keys are
recommended for the best contrast and consistency across themes.

</details>

---

#### ExternalUriOpener {#externaluriopener}

Handles opening uris to external resources, such as http(s) links.

Extensions can implement an `ExternalUriOpener` to open `http` links to a webserver
inside of the editor instead of having the link be opened by the web browser.

Currently openers may only be registered for `http` and `https` uris.

##### Methods

<div id="externaluriopener-canopenexternaluri"></div>

<details>
<summary><code>canOpenExternalUri(uri: Uri, token: CancellationToken): ExternalUriOpenerPriority | Thenable&lt;ExternalUriOpenerPriority&gt;;</code></summary>

Check if the opener can open a uri.

</details>

<div id="externaluriopener-openexternaluri"></div>

<details>
<summary><code>openExternalUri(resolvedUri: Uri, ctx: OpenExternalUriContext, token: CancellationToken): Thenable&lt;void&gt; | void;</code></summary>

Open a uri.

This is invoked when:

- The user clicks a link which does not have an assigned opener. In this case, first `canOpenExternalUri`
  is called and if the user selects this opener, then `openExternalUri` is called.
- The user sets the default opener for a link in their settings and then visits a link.

</details>

---

#### FileChangeEvent {#filechangeevent}

The event filesystem providers must use to signal a file change.

##### Properties

<div id="filechangeevent-type"></div>

<details>
<summary><code>type: <a href="#filechangetype">FileChangeType</a></code></summary>

The type of change.

**只读**: 是

</details>

<div id="filechangeevent-uri"></div>

<details>
<summary><code>uri: <a href="#uri">Uri</a></code></summary>

The uri of the file that has changed.

**只读**: 是

</details>

---

#### FileCreateEvent {#filecreateevent}

An event that is fired after files are created.

##### Properties

<div id="filecreateevent-files"></div>

<details>
<summary><code>files: ReadonlyArray&lt;<a href="#uri">Uri</a>&gt;</code></summary>

The files that got created.

**只读**: 是

</details>

---

#### FileDecorationProvider {#filedecorationprovider}

The decoration provider interfaces defines the contract between extensions and
file decorations.

##### Properties

<div id="filedecorationprovider-ondidchangefiledecorations"></div>

<details>
<summary><code>onDidChangeFileDecorations: <a href="#event">Event</a>&lt;undefined | <a href="#uri">Uri</a> | <a href="#uri">Uri</a>[]&gt;</code></summary>

An optional event to signal that decorations for one or many files have changed.

*Note* that this event should be used to propagate information about children.

</details>

##### Methods

<div id="filedecorationprovider-providefiledecoration"></div>

<details>
<summary><code>provideFileDecoration(uri: Uri, token: CancellationToken): ProviderResult&lt;FileDecoration&gt;;</code></summary>

Provide decorations for a given uri.

*Note* that this function is only called when a file gets rendered in the UI.
This means a decoration from a descendent that propagates upwards must be signaled
to the editor via the onDidChangeFileDecorations-event.

</details>

---

#### FileDeleteEvent {#filedeleteevent}

An event that is fired after files are deleted.

##### Properties

<div id="filedeleteevent-files"></div>

<details>
<summary><code>files: ReadonlyArray&lt;<a href="#uri">Uri</a>&gt;</code></summary>

The files that got deleted.

**只读**: 是

</details>

---

#### FileRenameEvent {#filerenameevent}

An event that is fired after files are renamed.

##### Properties

<div id="filerenameevent-files"></div>

<details>
<summary><code>files: ReadonlyArray&lt;&#123; oldUri: <a href="#uri">Uri</a>, newUri: <a href="#uri">Uri</a> &#125;&gt;</code></summary>

The files that got renamed.

**只读**: 是

</details>

---

#### FileStat {#filestat}

The `FileStat`-type represents metadata about a file

##### Properties

<div id="filestat-type"></div>

<details>
<summary><code>type: <a href="#filetype">FileType</a></code></summary>

The type of the file, e.g. is a regular file, a directory, or symbolic link
to a file.

*Note:* This value might be a bitmask, e.g. `FileType.File | FileType.SymbolicLink`.

</details>

<div id="filestat-ctime"></div>

<details>
<summary><code>ctime: number</code></summary>

The creation timestamp in milliseconds elapsed since January 1, 1970 00:00:00 UTC.

</details>

<div id="filestat-mtime"></div>

<details>
<summary><code>mtime: number</code></summary>

The modification timestamp in milliseconds elapsed since January 1, 1970 00:00:00 UTC.

*Note:* If the file changed, it is important to provide an updated `mtime` that advanced
from the previous value. Otherwise there may be optimizations in place that will not show
the updated file contents in an editor for example.

</details>

<div id="filestat-size"></div>

<details>
<summary><code>size: number</code></summary>

The size in bytes.

*Note:* If the file changed, it is important to provide an updated `size`. Otherwise there
may be optimizations in place that will not show the updated file contents in an editor for
example.

</details>

<div id="filestat-permissions"></div>

<details>
<summary><code>permissions: <a href="#filepermission">FilePermission</a></code></summary>

The permissions of the file, e.g. whether the file is readonly.

*Note:* This value might be a bitmask, e.g. `FilePermission.Readonly | FilePermission.Other`.

</details>

---

#### FileSystem {#filesystem}

The file system interface exposes the editor's built-in and contributed
<a href="#filesystemprovider">file system providers</a>. It allows extensions to work
with files from the local disk as well as files from remote places, like the
remote extension host or ftp-servers.

*Note* that an instance of this interface is available as [`workspace.fs`](#workspace.fs).

##### Methods

<div id="filesystem-stat"></div>

<details>
<summary><code>stat(uri: Uri): Thenable&lt;FileStat&gt;;</code></summary>

Retrieve metadata about a file.

</details>

<div id="filesystem-readdirectory"></div>

<details>
<summary><code>readDirectory(uri: Uri): Thenable&lt;[string, FileType][]&gt;;</code></summary>

Retrieve all entries of a directory.

</details>

<div id="filesystem-createdirectory"></div>

<details>
<summary><code>createDirectory(uri: Uri): Thenable&lt;void&gt;;</code></summary>

Create a new directory (Note, that new files are created via `write`-calls).

*Note* that missing directories are created automatically, e.g this call has
`mkdirp` semantics.

</details>

<div id="filesystem-readfile"></div>

<details>
<summary><code>readFile(uri: Uri): Thenable&lt;Uint8Array&gt;;</code></summary>

Read the entire contents of a file.

</details>

<div id="filesystem-writefile"></div>

<details>
<summary><code>writeFile(uri: Uri, content: Uint8Array): Thenable&lt;void&gt;;</code></summary>

Write data to a file, replacing its entire contents.

</details>

<div id="filesystem-delete"></div>

<details>
<summary><code>delete(uri: Uri, options?: &#123; recursive?: boolean, useTrash?: boolean &#125;): Thenable&lt;void&gt;;</code></summary>

Delete a file.

</details>

<div id="filesystem-rename"></div>

<details>
<summary><code>rename(source: Uri, target: Uri, options?: &#123; overwrite?: boolean &#125;): Thenable&lt;void&gt;;</code></summary>

Rename a file or folder.

</details>

<div id="filesystem-copy"></div>

<details>
<summary><code>copy(source: Uri, target: Uri, options?: &#123; overwrite?: boolean &#125;): Thenable&lt;void&gt;;</code></summary>

Copy files or folders.

</details>

<div id="filesystem-iswritablefilesystem"></div>

<details>
<summary><code>isWritableFileSystem(scheme: string): boolean | undefined;</code></summary>

Check if a given file system supports writing files.

Keep in mind that just because a file system supports writing, that does
not mean that writes will always succeed. There may be permissions issues
or other errors that prevent writing a file.

</details>

---

#### FileSystemProvider {#filesystemprovider}

The filesystem provider defines what the editor needs to read, write, discover,
and to manage files and folders. It allows extensions to serve files from remote places,
like ftp-servers, and to seamlessly integrate those into the editor.

* *Note 1:* The filesystem provider API works with <a href="#uri">uris</a> and assumes hierarchical
paths, e.g. `foo:/my/path` is a child of `foo:/my/` and a parent of `foo:/my/path/deeper`.
* *Note 2:* There is an activation event `onFileSystem:&lt;scheme&gt;` that fires when a file
or folder is being accessed.
* *Note 3:* The word 'file' is often used to denote all <a href="#filetype">kinds</a> of files, e.g.
folders, symbolic links, and regular files.

##### Properties

<div id="filesystemprovider-ondidchangefile"></div>

<details>
<summary><code>onDidChangeFile: <a href="#event">Event</a>&lt;<a href="#filechangeevent">FileChangeEvent</a>[]&gt;</code></summary>

An event to signal that a resource has been created, changed, or deleted. This
event should fire for resources that are being watched
by clients of this provider.

*Note:* It is important that the metadata of the file that changed provides an
updated `mtime` that advanced from the previous value in the <a href="#filestat">stat</a> and a
correct `size` value. Otherwise there may be optimizations in place that will not show
the change in an editor for example.

**只读**: 是

</details>

##### Methods

<div id="filesystemprovider-watch"></div>

<details>
<summary><code>watch(uri: Uri, options: &#123; recursive: boolean; excludes: string[] &#125;): Disposable;</code></summary>

Subscribe to events in the file or folder denoted by `uri`.

The editor will call this function for files and folders. In the latter case, the
options differ from defaults, e.g. what files/folders to exclude from watching
and if subfolders, sub-subfolder, etc. should be watched (`recursive`).

</details>

<div id="filesystemprovider-stat"></div>

<details>
<summary><code>stat(uri: Uri): FileStat | Thenable&lt;FileStat&gt;;</code></summary>

Retrieve metadata about a file.

Note that the metadata for symbolic links should be the metadata of the file they refer to.
Still, the SymbolicLink-type must be used in addition to the actual type, e.g.
`FileType.SymbolicLink | FileType.Directory`.

</details>

<div id="filesystemprovider-readdirectory"></div>

<details>
<summary><code>readDirectory(uri: Uri): [string, FileType][] | Thenable&lt;[string, FileType][]&gt;;</code></summary>

Retrieve all entries of a directory.

</details>

<div id="filesystemprovider-createdirectory"></div>

<details>
<summary><code>createDirectory(uri: Uri): void | Thenable&lt;void&gt;;</code></summary>

Create a new directory (Note, that new files are created via `write`-calls).

</details>

<div id="filesystemprovider-readfile"></div>

<details>
<summary><code>readFile(uri: Uri): Uint8Array | Thenable&lt;Uint8Array&gt;;</code></summary>

Read the entire contents of a file.

</details>

<div id="filesystemprovider-writefile"></div>

<details>
<summary><code>writeFile(uri: Uri, content: Uint8Array, options: &#123; create: boolean, overwrite: boolean &#125;): void | Thenable&lt;void&gt;;</code></summary>

Write data to a file, replacing its entire contents.

</details>

<div id="filesystemprovider-delete"></div>

<details>
<summary><code>delete(uri: Uri, options: &#123; recursive: boolean &#125;): void | Thenable&lt;void&gt;;</code></summary>

Delete a file.

</details>

<div id="filesystemprovider-rename"></div>

<details>
<summary><code>rename(oldUri: Uri, newUri: Uri, options: &#123; overwrite: boolean &#125;): void | Thenable&lt;void&gt;;</code></summary>

Rename a file or folder.

</details>

<div id="filesystemprovider-copy"></div>

<details>
<summary><code>copy?(source: Uri, destination: Uri, options: &#123; overwrite: boolean &#125;): void | Thenable&lt;void&gt;;</code></summary>

Copy files or folders. Implementing this function is optional but it will speedup
the copy operation.

</details>

---

#### FileSystemProvider {#filesystemprovider}

##### Methods

<div id="filesystemprovider-open"></div>

<details>
<summary><code>open?(resource: Uri, options: &#123; create: boolean &#125;): number | Thenable&lt;number&gt;;</code></summary>

</details>

<div id="filesystemprovider-close"></div>

<details>
<summary><code>close?(fd: number): void | Thenable&lt;void&gt;;</code></summary>

</details>

<div id="filesystemprovider-read"></div>

<details>
<summary><code>read?(fd: number, pos: number, data: Uint8Array, offset: number, length: number): number | Thenable&lt;number&gt;;</code></summary>

</details>

<div id="filesystemprovider-write"></div>

<details>
<summary><code>write?(fd: number, pos: number, data: Uint8Array, offset: number, length: number): number | Thenable&lt;number&gt;;</code></summary>

</details>

---

#### FileSystemWatcher {#filesystemwatcher}

A file system watcher notifies about changes to files and folders
on disk.

To get an instance of a `FileSystemWatcher` use
createFileSystemWatcher.

##### Properties

<div id="filesystemwatcher-ignorecreateevents"></div>

<details>
<summary><code>ignoreCreateEvents: boolean</code></summary>

true if this file system watcher has been created such that
it ignores creation file system events.

</details>

<div id="filesystemwatcher-ignorechangeevents"></div>

<details>
<summary><code>ignoreChangeEvents: boolean</code></summary>

true if this file system watcher has been created such that
it ignores change file system events.

</details>

<div id="filesystemwatcher-ignoredeleteevents"></div>

<details>
<summary><code>ignoreDeleteEvents: boolean</code></summary>

true if this file system watcher has been created such that
it ignores delete file system events.

</details>

<div id="filesystemwatcher-ondidcreate"></div>

<details>
<summary><code>onDidCreate: <a href="#event">Event</a>&lt;<a href="#uri">Uri</a>&gt;</code></summary>

An event which fires on file/folder creation.

</details>

<div id="filesystemwatcher-ondidchange"></div>

<details>
<summary><code>onDidChange: <a href="#event">Event</a>&lt;<a href="#uri">Uri</a>&gt;</code></summary>

An event which fires on file/folder change.

</details>

<div id="filesystemwatcher-ondiddelete"></div>

<details>
<summary><code>onDidDelete: <a href="#event">Event</a>&lt;<a href="#uri">Uri</a>&gt;</code></summary>

An event which fires on file/folder deletion.

</details>

---

#### FileSystemWatcherOptions {#filesystemwatcheroptions}

##### Properties

<div id="filesystemwatcheroptions-ignorecreateevents"></div>

<details>
<summary><code>ignoreCreateEvents: boolean</code></summary>

Ignore when files have been created.

**只读**: 是

</details>

<div id="filesystemwatcheroptions-ignorechangeevents"></div>

<details>
<summary><code>ignoreChangeEvents: boolean</code></summary>

Ignore when files have been changed.

**只读**: 是

</details>

<div id="filesystemwatcheroptions-ignoredeleteevents"></div>

<details>
<summary><code>ignoreDeleteEvents: boolean</code></summary>

Ignore when files have been deleted.

**只读**: 是

</details>

<div id="filesystemwatcheroptions-excludes"></div>

<details>
<summary><code>excludes: string[]</code></summary>

An optional set of glob patterns to exclude from watching.
Glob patterns are always matched relative to the watched folder.

**只读**: 是

</details>

---

#### FileWillCreateEvent {#filewillcreateevent}

An event that is fired when files are going to be created.

To make modifications to the workspace before the files are created,
call the [`waitUntil](#FileWillCreateEvent.waitUntil)-function with a
thenable that resolves to a <a href="#workspaceedit">workspace edit</a>.

##### Properties

<div id="filewillcreateevent-token"></div>

<details>
<summary><code>token: <a href="#cancellationtoken">CancellationToken</a></code></summary>

A cancellation token.

**只读**: 是

</details>

<div id="filewillcreateevent-files"></div>

<details>
<summary><code>files: ReadonlyArray&lt;<a href="#uri">Uri</a>&gt;</code></summary>

The files that are going to be created.

**只读**: 是

</details>

##### Methods

<div id="filewillcreateevent-waituntil"></div>

<details>
<summary><code>waitUntil(thenable: Thenable&lt;WorkspaceEdit&gt;): void;</code></summary>

Allows to pause the event and to apply a <a href="#workspaceedit">workspace edit</a>.

*Note:* This function can only be called during event dispatch and not
in an asynchronous manner:

```ts
workspace.onWillCreateFiles(event =&gt; &#123;
 // async, will *throw* an error
 setTimeout(() =&gt; event.waitUntil(promise));

 // sync, OK
 event.waitUntil(promise);
&#125;)
```

</details>

<div id="filewillcreateevent-waituntil"></div>

<details>
<summary><code>waitUntil(thenable: Thenable&lt;any&gt;): void;</code></summary>

Allows to pause the event until the provided thenable resolves.

*Note:* This function can only be called during event dispatch.

</details>

---

#### FileWillDeleteEvent {#filewilldeleteevent}

An event that is fired when files are going to be deleted.

To make modifications to the workspace before the files are deleted,
call the [`waitUntil](#FileWillCreateEvent.waitUntil)-function with a
thenable that resolves to a <a href="#workspaceedit">workspace edit</a>.

##### Properties

<div id="filewilldeleteevent-token"></div>

<details>
<summary><code>token: <a href="#cancellationtoken">CancellationToken</a></code></summary>

A cancellation token.

**只读**: 是

</details>

<div id="filewilldeleteevent-files"></div>

<details>
<summary><code>files: ReadonlyArray&lt;<a href="#uri">Uri</a>&gt;</code></summary>

The files that are going to be deleted.

**只读**: 是

</details>

##### Methods

<div id="filewilldeleteevent-waituntil"></div>

<details>
<summary><code>waitUntil(thenable: Thenable&lt;WorkspaceEdit&gt;): void;</code></summary>

Allows to pause the event and to apply a <a href="#workspaceedit">workspace edit</a>.

*Note:* This function can only be called during event dispatch and not
in an asynchronous manner:

```ts
workspace.onWillCreateFiles(event =&gt; &#123;
 // async, will *throw* an error
 setTimeout(() =&gt; event.waitUntil(promise));

 // sync, OK
 event.waitUntil(promise);
&#125;)
```

</details>

<div id="filewilldeleteevent-waituntil"></div>

<details>
<summary><code>waitUntil(thenable: Thenable&lt;any&gt;): void;</code></summary>

Allows to pause the event until the provided thenable resolves.

*Note:* This function can only be called during event dispatch.

</details>

---

#### FileWillRenameEvent {#filewillrenameevent}

An event that is fired when files are going to be renamed.

To make modifications to the workspace before the files are renamed,
call the [`waitUntil](#FileWillCreateEvent.waitUntil)-function with a
thenable that resolves to a <a href="#workspaceedit">workspace edit</a>.

##### Properties

<div id="filewillrenameevent-token"></div>

<details>
<summary><code>token: <a href="#cancellationtoken">CancellationToken</a></code></summary>

A cancellation token.

**只读**: 是

</details>

<div id="filewillrenameevent-files"></div>

<details>
<summary><code>files: ReadonlyArray&lt;&#123; oldUri: <a href="#uri">Uri</a>, newUri: <a href="#uri">Uri</a> &#125;&gt;</code></summary>

The files that are going to be renamed.

**只读**: 是

</details>

##### Methods

<div id="filewillrenameevent-waituntil"></div>

<details>
<summary><code>waitUntil(thenable: Thenable&lt;WorkspaceEdit&gt;): void;</code></summary>

Allows to pause the event and to apply a <a href="#workspaceedit">workspace edit</a>.

*Note:* This function can only be called during event dispatch and not
in an asynchronous manner:

```ts
workspace.onWillCreateFiles(event =&gt; &#123;
 // async, will *throw* an error
 setTimeout(() =&gt; event.waitUntil(promise));

 // sync, OK
 event.waitUntil(promise);
&#125;)
```

</details>

<div id="filewillrenameevent-waituntil"></div>

<details>
<summary><code>waitUntil(thenable: Thenable&lt;any&gt;): void;</code></summary>

Allows to pause the event until the provided thenable resolves.

*Note:* This function can only be called during event dispatch.

</details>

---

#### FindTextInFilesOptions {#findtextinfilesoptions}

Options that can be set on a findTextInFiles search.

##### Properties

<div id="findtextinfilesoptions-include"></div>

<details>
<summary><code>include: <a href="#globpattern">GlobPattern</a></code></summary>

A [glob pattern](#GlobPattern) that defines the files to search for. The glob pattern
will be matched against the file paths of files relative to their workspace. Use a [relative pattern](#RelativePattern)
to restrict the search results to a [workspace folder](#WorkspaceFolder).

</details>

<div id="findtextinfilesoptions-exclude"></div>

<details>
<summary><code>exclude: <a href="#globpattern">GlobPattern</a></code></summary>

A [glob pattern](#GlobPattern) that defines files and folders to exclude. The glob pattern
will be matched against the file paths of resulting matches relative to their workspace. When `undefined`, default excludes will
apply.

</details>

<div id="findtextinfilesoptions-usedefaultexcludes"></div>

<details>
<summary><code>useDefaultExcludes: boolean</code></summary>

Whether to use the default and user-configured excludes. Defaults to true.

</details>

<div id="findtextinfilesoptions-maxresults"></div>

<details>
<summary><code>maxResults: number</code></summary>

The maximum number of results to search for

</details>

<div id="findtextinfilesoptions-useignorefiles"></div>

<details>
<summary><code>useIgnoreFiles: boolean</code></summary>

Whether external files that exclude files, like .gitignore, should be respected.
See the vscode setting `"search.useIgnoreFiles"`.

</details>

<div id="findtextinfilesoptions-useglobalignorefiles"></div>

<details>
<summary><code>useGlobalIgnoreFiles: boolean</code></summary>

Whether global files that exclude files, like .gitignore, should be respected.
See the vscode setting `"search.useGlobalIgnoreFiles"`.

</details>

<div id="findtextinfilesoptions-followsymlinks"></div>

<details>
<summary><code>followSymlinks: boolean</code></summary>

Whether symlinks should be followed while searching.
See the vscode setting `"search.followSymlinks"`.

</details>

<div id="findtextinfilesoptions-encoding"></div>

<details>
<summary><code>encoding: string</code></summary>

Interpret files using this encoding.
See the vscode setting `"files.encoding"`

</details>

<div id="findtextinfilesoptions-previewoptions"></div>

<details>
<summary><code>previewOptions: <a href="#textsearchpreviewoptions">TextSearchPreviewOptions</a></code></summary>

Options to specify the size of the result text preview.

</details>

<div id="findtextinfilesoptions-beforecontext"></div>

<details>
<summary><code>beforeContext: number</code></summary>

Number of lines of context to include before each match.

</details>

<div id="findtextinfilesoptions-aftercontext"></div>

<details>
<summary><code>afterContext: number</code></summary>

Number of lines of context to include after each match.

</details>

---

#### FoldingContext {#foldingcontext}

Folding context (for future use)

---

#### FoldingRangeProvider {#foldingrangeprovider}

The folding range provider interface defines the contract between extensions and
[Folding](https://code.visualstudio.com/docs/editor/codebasics#_folding) in the editor.

##### Properties

<div id="foldingrangeprovider-ondidchangefoldingranges"></div>

<details>
<summary><code>onDidChangeFoldingRanges: <a href="#event">Event</a>&lt;void&gt;</code></summary>

An optional event to signal that the folding ranges from this provider have changed.

</details>

##### Methods

<div id="foldingrangeprovider-providefoldingranges"></div>

<details>
<summary><code>provideFoldingRanges(document: TextDocument, context: FoldingContext, token: CancellationToken): ProviderResult&lt;FoldingRange[]&gt;;</code></summary>

Returns a list of folding ranges or null and undefined if the provider
does not want to participate or was cancelled.

</details>

---

#### FormattingOptions {#formattingoptions}

Value-object describing what options formatting should use.

##### Properties

<div id="formattingoptions-tabsize"></div>

<details>
<summary><code>tabSize: number</code></summary>

Size of a tab in spaces.

</details>

<div id="formattingoptions-insertspaces"></div>

<details>
<summary><code>insertSpaces: boolean</code></summary>

Prefer spaces over tabs.

</details>

---

#### GlobalEnvironmentVariableCollection {#globalenvironmentvariablecollection}

A collection of mutations that an extension can apply to a process environment. Applies to all scopes.

##### Methods

<div id="globalenvironmentvariablecollection-getscoped"></div>

<details>
<summary><code>getScoped(scope: EnvironmentVariableScope): EnvironmentVariableCollection;</code></summary>

Gets scope-specific environment variable collection for the extension. This enables alterations to
terminal environment variables solely within the designated scope, and is applied in addition to (and
after) the global collection.

Each object obtained through this method is isolated and does not impact objects for other scopes,
including the global collection.

</details>

---

#### HoverProvider {#hoverprovider}

The hover provider interface defines the contract between extensions and
the [hover](https://code.visualstudio.com/docs/editor/intellisense)-feature.

##### Methods

<div id="hoverprovider-providehover"></div>

<details>
<summary><code>provideHover(document: TextDocument, position: Position, token: CancellationToken): ProviderResult&lt;Hover&gt;;</code></summary>

Provide a hover for the given position and document. Multiple hovers at the same
position will be merged by the editor. A hover can have a range which defaults
to the word range at the position when omitted.

</details>

---

#### ImplementationProvider {#implementationprovider}

The implementation provider interface defines the contract between extensions and
the go to implementation feature.

##### Methods

<div id="implementationprovider-provideimplementation"></div>

<details>
<summary><code>provideImplementation(document: TextDocument, position: Position, token: CancellationToken): ProviderResult&lt;Definition | DefinitionLink[]&gt;;</code></summary>

Provide the implementations of the symbol at the given position and document.

</details>

---

#### IndentationRule {#indentationrule}

Describes indentation rules for a language.

##### Properties

<div id="indentationrule-decreaseindentpattern"></div>

<details>
<summary><code>decreaseIndentPattern: RegExp</code></summary>

If a line matches this pattern, then all the lines after it should be unindented once (until another rule matches).

</details>

<div id="indentationrule-increaseindentpattern"></div>

<details>
<summary><code>increaseIndentPattern: RegExp</code></summary>

If a line matches this pattern, then all the lines after it should be indented once (until another rule matches).

</details>

<div id="indentationrule-indentnextlinepattern"></div>

<details>
<summary><code>indentNextLinePattern: RegExp</code></summary>

If a line matches this pattern, then **only the next line** after it should be indented once.

</details>

<div id="indentationrule-unindentedlinepattern"></div>

<details>
<summary><code>unIndentedLinePattern: RegExp</code></summary>

If a line matches this pattern, then its indentation should not be changed and it should not be evaluated against the other rules.

</details>

---

#### InlayHintsProvider {#inlayhintsprovider}

The inlay hints provider interface defines the contract between extensions and
the inlay hints feature.

##### Properties

<div id="inlayhintsprovider-ondidchangeinlayhints"></div>

<details>
<summary><code>onDidChangeInlayHints: <a href="#event">Event</a>&lt;void&gt;</code></summary>

An optional event to signal that inlay hints from this provider have changed.

</details>

##### Methods

<div id="inlayhintsprovider-provideinlayhints"></div>

<details>
<summary><code>provideInlayHints(document: TextDocument, range: Range, token: CancellationToken): ProviderResult&lt;T[]&gt;;</code></summary>

Provide inlay hints for the given range and document.

*Note* that inlay hints that are not contained by the given range are ignored.

</details>

<div id="inlayhintsprovider-resolveinlayhint"></div>

<details>
<summary><code>resolveInlayHint?(hint: T, token: CancellationToken): ProviderResult&lt;T&gt;;</code></summary>

Given an inlay hint fill in tooltip, text edits,
or complete label <a href="#inlayhintlabelpart">parts</a>.

*Note* that the editor will resolve an inlay hint at most once.

</details>

---

#### InlineCompletionContext {#inlinecompletioncontext}

Provides information about the context in which an inline completion was requested.

##### Properties

<div id="inlinecompletioncontext-triggerkind"></div>

<details>
<summary><code>triggerKind: <a href="#inlinecompletiontriggerkind">InlineCompletionTriggerKind</a></code></summary>

Describes how the inline completion was triggered.

**只读**: 是

</details>

<div id="inlinecompletioncontext-selectedcompletioninfo"></div>

<details>
<summary><code>selectedCompletionInfo: <a href="#selectedcompletioninfo">SelectedCompletionInfo</a> | undefined</code></summary>

Provides information about the currently selected item in the autocomplete widget if it is visible.

If set, provided inline completions must extend the text of the selected item
and use the same range, otherwise they are not shown as preview.
As an example, if the document text is `console.` and the selected item is `.log` replacing the `.` in the document,
the inline completion must also replace `.` and start with `.log`, for example `.log()`.

Inline completion providers are requested again whenever the selected item changes.

**只读**: 是

</details>

---

#### InlineCompletionItemProvider {#inlinecompletionitemprovider}

The inline completion item provider interface defines the contract between extensions and
the inline completion feature.

Providers are asked for completions either explicitly by a user gesture or implicitly when typing.

##### Methods

<div id="inlinecompletionitemprovider-provideinlinecompletionitems"></div>

<details>
<summary><code>provideInlineCompletionItems(document: TextDocument, position: Position, context: InlineCompletionContext, token: CancellationToken): ProviderResult&lt;InlineCompletionItem[] | InlineCompletionList&gt;;</code></summary>

Provides inline completion items for the given position and document.
If inline completions are enabled, this method will be called whenever the user stopped typing.
It will also be called when the user explicitly triggers inline completions or explicitly asks for the next or previous inline completion.
In that case, all available inline completions should be returned.
`context.triggerKind` can be used to distinguish between these scenarios.

</details>

---

#### InlineValueContext {#inlinevaluecontext}

A value-object that contains contextual information when requesting inline values from a InlineValuesProvider.

##### Properties

<div id="inlinevaluecontext-frameid"></div>

<details>
<summary><code>frameId: number</code></summary>

The stack frame (as a DAP Id) where the execution has stopped.

**只读**: 是

</details>

<div id="inlinevaluecontext-stoppedlocation"></div>

<details>
<summary><code>stoppedLocation: <a href="#range">Range</a></code></summary>

The document range where execution has stopped.
Typically the end position of the range denotes the line where the inline values are shown.

**只读**: 是

</details>

---

#### InlineValuesProvider {#inlinevaluesprovider}

The inline values provider interface defines the contract between extensions and the editor's debugger inline values feature.
In this contract the provider returns inline value information for a given document range
and the editor shows this information in the editor at the end of lines.

##### Properties

<div id="inlinevaluesprovider-ondidchangeinlinevalues"></div>

<details>
<summary><code>onDidChangeInlineValues: <a href="#event">Event</a>&lt;void&gt; | undefined</code></summary>

An optional event to signal that inline values have changed.

</details>

##### Methods

<div id="inlinevaluesprovider-provideinlinevalues"></div>

<details>
<summary><code>provideInlineValues(document: TextDocument, viewPort: Range, context: InlineValueContext, token: CancellationToken): ProviderResult&lt;InlineValue[]&gt;;</code></summary>

Provide "inline value" information for a given document and range.
The editor calls this method whenever debugging stops in the given document.
The returned inline values information is rendered in the editor at the end of lines.

</details>

---

#### InputBox {#inputbox}

A concrete <a href="#quickinput">QuickInput</a> to let the user input a text value.

Note that in many cases the more convenient [window.showInputBox](#window.showInputBox)
is easier to use. [window.createInputBox](#window.createInputBox) should be used
when [window.showInputBox](#window.showInputBox) does not offer the required flexibility.

##### Properties

<div id="inputbox-value"></div>

<details>
<summary><code>value: string</code></summary>

Current input value.

</details>

<div id="inputbox-placeholder"></div>

<details>
<summary><code>placeholder: string | undefined</code></summary>

Optional placeholder in the filter text.

</details>

<div id="inputbox-password"></div>

<details>
<summary><code>password: boolean</code></summary>

If the input value should be hidden. Defaults to false.

</details>

<div id="inputbox-valueselection"></div>

<details>
<summary><code>valueSelection: readonly [number, number] | undefined</code></summary>

Selection range in the input value. Defined as tuple of two number where the
first is the inclusive start index and the second the exclusive end index. When `undefined` the whole
pre-filled value will be selected, when empty (start equals end) only the cursor will be set,
otherwise the defined range will be selected.

This property does not get updated when the user types or makes a selection,
but it can be updated by the extension.

</details>

<div id="inputbox-ondidchangevalue"></div>

<details>
<summary><code>onDidChangeValue: <a href="#event">Event</a>&lt;string&gt;</code></summary>

An event signaling when the value has changed.

**只读**: 是

</details>

<div id="inputbox-ondidaccept"></div>

<details>
<summary><code>onDidAccept: <a href="#event">Event</a>&lt;void&gt;</code></summary>

An event signaling when the user indicated acceptance of the input value.

**只读**: 是

</details>

<div id="inputbox-buttons"></div>

<details>
<summary><code>buttons: readonly <a href="#quickinputbutton">QuickInputButton</a>[]</code></summary>

Buttons for actions in the UI.

</details>

<div id="inputbox-ondidtriggerbutton"></div>

<details>
<summary><code>onDidTriggerButton: <a href="#event">Event</a>&lt;<a href="#quickinputbutton">QuickInputButton</a>&gt;</code></summary>

An event signaling when a button was triggered.

**只读**: 是

</details>

<div id="inputbox-prompt"></div>

<details>
<summary><code>prompt: string | undefined</code></summary>

An optional prompt text providing some ask or explanation to the user.

</details>

<div id="inputbox-validationmessage"></div>

<details>
<summary><code>validationMessage: string | <a href="#inputboxvalidationmessage">InputBoxValidationMessage</a> | undefined</code></summary>

An optional validation message indicating a problem with the current input value.
By returning a string, the InputBox will use a default <a href="#inputboxvalidationseverity">InputBoxValidationSeverity</a> of Error.
Returning undefined clears the validation message.

</details>

---

#### InputBoxOptions {#inputboxoptions}

Options to configure the behavior of the input box UI.

##### Properties

<div id="inputboxoptions-title"></div>

<details>
<summary><code>title: string</code></summary>

An optional string that represents the title of the input box.

</details>

<div id="inputboxoptions-value"></div>

<details>
<summary><code>value: string</code></summary>

The value to prefill in the input box.

</details>

<div id="inputboxoptions-valueselection"></div>

<details>
<summary><code>valueSelection: [number, number]</code></summary>

Selection of the prefilled [`value`](#InputBoxOptions.value). Defined as tuple of two number where the
first is the inclusive start index and the second the exclusive end index. When `undefined` the whole
word will be selected, when empty (start equals end) only the cursor will be set,
otherwise the defined range will be selected.

</details>

<div id="inputboxoptions-prompt"></div>

<details>
<summary><code>prompt: string</code></summary>

The text to display underneath the input box.

</details>

<div id="inputboxoptions-placeholder"></div>

<details>
<summary><code>placeHolder: string</code></summary>

An optional string to show as place holder in the input box to guide the user what to type.

</details>

<div id="inputboxoptions-password"></div>

<details>
<summary><code>password: boolean</code></summary>

Set to `true` to show a password prompt that will not show the typed value.

</details>

<div id="inputboxoptions-ignorefocusout"></div>

<details>
<summary><code>ignoreFocusOut: boolean</code></summary>

Set to `true` to keep the input box open when focus moves to another part of the editor or to another window.

</details>

##### Methods

<div id="inputboxoptions-validateinput"></div>

<details>
<summary><code>validateInput?(value: string): string | InputBoxValidationMessage | undefined | null | Thenable&lt;string | InputBoxValidationMessage | undefined | null&gt;;</code></summary>

An optional function that will be called to validate input and to give a hint
to the user.

</details>

<div id="inputboxoptions-onaccept"></div>

<details>
<summary><code>onAccept?(): void;</code></summary>

An optional function that will be called on Enter key.

</details>

---

#### InputBoxValidationMessage {#inputboxvalidationmessage}

Object to configure the behavior of the validation message.

##### Properties

<div id="inputboxvalidationmessage-message"></div>

<details>
<summary><code>message: string</code></summary>

The validation message to display.

**只读**: 是

</details>

<div id="inputboxvalidationmessage-severity"></div>

<details>
<summary><code>severity: <a href="#inputboxvalidationseverity">InputBoxValidationSeverity</a></code></summary>

The severity of the validation message.
NOTE: When using `InputBoxValidationSeverity.Error`, the user will not be allowed to accept (hit ENTER) the input.
`Info` and `Warning` will still allow the InputBox to accept the input.

**只读**: 是

</details>

---

#### InteractiveIconPath {#interactiveiconpath}

不同类型交互状态的icon path.
支持默认、悬浮、激活状态及对应主题icon设置.

##### Properties

<div id="interactiveiconpath-default"></div>

<details>
<summary><code>default: <a href="#uri">Uri</a> | <a href="#themeiconpath">ThemeIconPath</a></code></summary>

默认icon.

</details>

<div id="interactiveiconpath-hover"></div>

<details>
<summary><code>hover: <a href="#uri">Uri</a> | <a href="#themeiconpath">ThemeIconPath</a></code></summary>

悬浮态icon (当鼠标悬浮在元素上面).
未提供则用默认icon.

</details>

<div id="interactiveiconpath-active"></div>

<details>
<summary><code>active: <a href="#uri">Uri</a> | <a href="#themeiconpath">ThemeIconPath</a></code></summary>

激活态icon (当元素激活或被点击).
未提供则用默认icon.

</details>

---

#### IOMappingVars {#iomappingvars}

##### Properties

<div id="iomappingvars-address"></div>

<details>
<summary><code>address: string</code></summary>

</details>

<div id="iomappingvars-remark"></div>

<details>
<summary><code>remark: string</code></summary>

</details>

<div id="iomappingvars-namespace"></div>

<details>
<summary><code>namespace: string</code></summary>

</details>

---

#### LanguageConfiguration {#languageconfiguration}

The language configuration interfaces defines the contract between extensions
and various editor features, like automatic bracket insertion, automatic indentation etc.

##### Properties

<div id="languageconfiguration-__characterpairsupport"></div>

<details>
<summary><code>__characterPairSupport: &#123; autoClosingPairs: &#123; open: string; close: string; notIn?: string[]; &#125;[]; &#125;</code></summary>

</details>

<div id="languageconfiguration-__electriccharactersupport"></div>

<details>
<summary><code>__electricCharacterSupport: &#123; brackets?: any, docComment?: &#123; scope: string; open: string; lineStart: string; close?: string; &#125;; &#125;</code></summary>

</details>

<div id="languageconfiguration-comments"></div>

<details>
<summary><code>comments: <a href="#commentrule">CommentRule</a></code></summary>

The language's comment settings.

</details>

<div id="languageconfiguration-brackets"></div>

<details>
<summary><code>brackets: <a href="#characterpair">CharacterPair</a>[]</code></summary>

The language's brackets.
This configuration implicitly affects pressing Enter around these brackets.

</details>

<div id="languageconfiguration-wordpattern"></div>

<details>
<summary><code>wordPattern: RegExp</code></summary>

The language's word definition.
If the language supports Unicode identifiers (e.g. JavaScript), it is preferable
to provide a word definition that uses exclusion of known separators.
e.g.: A regex that matches anything except known separators (and dot is allowed to occur in a floating point number):
  /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\&#123;\]\&#125;\\\|\;\:\'\"\,\.\&lt;\&gt;\/\?\s]+)/g

</details>

<div id="languageconfiguration-indentationrules"></div>

<details>
<summary><code>indentationRules: <a href="#indentationrule">IndentationRule</a></code></summary>

The language's indentation settings.

</details>

<div id="languageconfiguration-onenterrules"></div>

<details>
<summary><code>onEnterRules: <a href="#onenterrule">OnEnterRule</a>[]</code></summary>

The language's rules to be evaluated when pressing Enter.

</details>

<div id="languageconfiguration-autoclosingpairs"></div>

<details>
<summary><code>autoClosingPairs: <a href="#autoclosingpair">AutoClosingPair</a>[]</code></summary>

The language's auto closing pairs.

</details>

---

#### LanguageModelAccessInformation {#languagemodelaccessinformation}

Represents extension specific information about the access to language models.

##### Properties

<div id="languagemodelaccessinformation-ondidchange"></div>

<details>
<summary><code>onDidChange: <a href="#event">Event</a>&lt;void&gt;</code></summary>

An event that fires when access information changes.

</details>

##### Methods

<div id="languagemodelaccessinformation-cansendrequest"></div>

<details>
<summary><code>canSendRequest(chat: LanguageModelChat): boolean | undefined;</code></summary>

Checks if a request can be made to a language model.

*Note* that calling this function will not trigger a consent UI but just checks for a persisted state.

</details>

---

#### LanguageModelChat {#languagemodelchat}

Represents a language model for making chat requests.

##### Properties

<div id="languagemodelchat-name"></div>

<details>
<summary><code>name: string</code></summary>

Human-readable name of the language model.

**只读**: 是

</details>

<div id="languagemodelchat-id"></div>

<details>
<summary><code>id: string</code></summary>

Opaque identifier of the language model.

**只读**: 是

</details>

<div id="languagemodelchat-vendor"></div>

<details>
<summary><code>vendor: string</code></summary>

A well-known identifier of the vendor of the language model. An example is `copilot`, but
values are defined by extensions contributing chat models and need to be looked up with them.

**只读**: 是

</details>

<div id="languagemodelchat-family"></div>

<details>
<summary><code>family: string</code></summary>

Opaque family-name of the language model. Values might be `gpt-3.5-turbo`, `gpt4`, `phi2`, or `llama`
but they are defined by extensions contributing languages and subject to change.

**只读**: 是

</details>

<div id="languagemodelchat-version"></div>

<details>
<summary><code>version: string</code></summary>

Opaque version string of the model. This is defined by the extension contributing the language model
and subject to change.

**只读**: 是

</details>

<div id="languagemodelchat-maxinputtokens"></div>

<details>
<summary><code>maxInputTokens: number</code></summary>

The maximum number of tokens that can be sent to the model in a single request.

**只读**: 是

</details>

##### Methods

<div id="languagemodelchat-sendrequest"></div>

<details>
<summary><code>sendRequest(messages: LanguageModelChatMessage[], options?: LanguageModelChatRequestOptions, token?: CancellationToken): Thenable&lt;LanguageModelChatResponse&gt;;</code></summary>

Make a chat request using a language model.

*Note* that language model use may be subject to access restrictions and user consent. Calling this function
for the first time (for an extension) will show a consent dialog to the user and because of that this function
must _only be called in response to a user action!_ Extensions can use canSendRequest
to check if they have the necessary permissions to make a request.

This function will return a rejected promise if making a request to the language model is not
possible. Reasons for this can be:

- user consent not given, see `NoPermissions`
- model does not exist anymore, see `NotFound`
- quota limits exceeded, see `Blocked`
- other issues in which case extension must check `LanguageModelError.cause`

An extension can make use of language model tool calling by passing a set of tools to
<a href="#lm-tools">tools</a>. The language model will return a <a href="#languagemodeltoolcallpart">LanguageModelToolCallPart</a> and
the extension can invoke the tool and make another request with the result.

</details>

<div id="languagemodelchat-counttokens"></div>

<details>
<summary><code>countTokens(text: string | LanguageModelChatMessage, token?: CancellationToken): Thenable&lt;number&gt;;</code></summary>

Count the number of tokens in a message using the model specific tokenizer-logic.

</details>

---

#### LanguageModelChatRequestOptions {#languagemodelchatrequestoptions}

Options for making a chat request using a language model.

##### Properties

<div id="languagemodelchatrequestoptions-justification"></div>

<details>
<summary><code>justification: string</code></summary>

A human-readable message that explains why access to a language model is needed and what feature is enabled by it.

</details>

<div id="languagemodelchatrequestoptions-modeloptions"></div>

<details>
<summary><code>modelOptions: &#123; [name: string]: any &#125;</code></summary>

A set of options that control the behavior of the language model. These options are specific to the language model
and need to be lookup in the respective documentation.

</details>

<div id="languagemodelchatrequestoptions-tools"></div>

<details>
<summary><code>tools: <a href="#languagemodelchattool">LanguageModelChatTool</a>[]</code></summary>

An optional list of tools that are available to the language model. These could be registered tools available via
<a href="#lm-tools">tools</a>, or private tools that are just implemented within the calling extension.

If the LLM requests to call one of these tools, it will return a <a href="#languagemodeltoolcallpart">LanguageModelToolCallPart</a> in
stream. It's the caller's responsibility to invoke the tool. If it's a tool
registered in <a href="#lm-tools">tools</a>, that means calling <a href="#lm-invoketool">invokeTool</a>.

Then, the tool result can be provided to the LLM by creating an Assistant-type <a href="#languagemodelchatmessage">LanguageModelChatMessage</a> with a
<a href="#languagemodeltoolcallpart">LanguageModelToolCallPart</a>, followed by a User-type message with a <a href="#languagemodeltoolresultpart">LanguageModelToolResultPart</a>.

</details>

<div id="languagemodelchatrequestoptions-toolmode"></div>

<details>
<summary><code>toolMode: <a href="#languagemodelchattoolmode">LanguageModelChatToolMode</a></code></summary>

The tool-selecting mode to use. Auto by default.

</details>

---

#### LanguageModelChatResponse {#languagemodelchatresponse}

Represents a language model response.

##### Properties

<div id="languagemodelchatresponse-stream"></div>

<details>
<summary><code>stream: AsyncIterable&lt;<a href="#languagemodeltextpart">LanguageModelTextPart</a> | <a href="#languagemodeltoolcallpart">LanguageModelToolCallPart</a> | unknown&gt;</code></summary>

An async iterable that is a stream of text and tool-call parts forming the overall response. A
<a href="#languagemodeltextpart">LanguageModelTextPart</a> is part of the assistant's response to be shown to the user. A
<a href="#languagemodeltoolcallpart">LanguageModelToolCallPart</a> is a request from the language model to call a tool. The latter will
only be returned if tools were passed in the request via <a href="#lm-tools">tools</a>. The
`unknown`-type is used as a placeholder for future parts, like image data parts.

*Note* that this stream will error when during data receiving an error occurs. Consumers of the stream should handle
the errors accordingly.

To cancel the stream, the consumer can cancel the token that was used to make
the request or break from the for-loop.

</details>

<div id="languagemodelchatresponse-text"></div>

<details>
<summary><code>text: AsyncIterable&lt;string&gt;</code></summary>

This is equivalent to filtering everything except for text parts from a stream.

</details>

---

#### LanguageModelChatSelector {#languagemodelchatselector}

Describes how to select language models for chat requests.

##### Properties

<div id="languagemodelchatselector-vendor"></div>

<details>
<summary><code>vendor: string</code></summary>

A vendor of language models.

</details>

<div id="languagemodelchatselector-family"></div>

<details>
<summary><code>family: string</code></summary>

A family of language models.

</details>

<div id="languagemodelchatselector-version"></div>

<details>
<summary><code>version: string</code></summary>

The version of a language model.

</details>

<div id="languagemodelchatselector-id"></div>

<details>
<summary><code>id: string</code></summary>

The identifier of a language model.

</details>

---

#### LanguageModelChatTool {#languagemodelchattool}

A tool that is available to the language model via <a href="#languagemodelchatrequestoptions">LanguageModelChatRequestOptions</a>. A language model uses all the
properties of this interface to decide which tool to call, and how to call it.

##### Properties

<div id="languagemodelchattool-name"></div>

<details>
<summary><code>name: string</code></summary>

The name of the tool.

</details>

<div id="languagemodelchattool-description"></div>

<details>
<summary><code>description: string</code></summary>

The description of the tool.

</details>

<div id="languagemodelchattool-inputschema"></div>

<details>
<summary><code>inputSchema: object</code></summary>

A JSON schema for the input this tool accepts.

</details>

---

#### LanguageModelTool {#languagemodeltool}

A tool that can be invoked by a call to a <a href="#languagemodelchat">LanguageModelChat</a>.

##### Methods

<div id="languagemodeltool-invoke"></div>

<details>
<summary><code>invoke(options: LanguageModelToolInvocationOptions&lt;T&gt;, token: CancellationToken): ProviderResult&lt;LanguageModelToolResult&gt;;</code></summary>

Invoke the tool with the given input and return a result.

The provided input has been validated against the declared schema.

</details>

<div id="languagemodeltool-prepareinvocation"></div>

<details>
<summary><code>prepareInvocation?(options: LanguageModelToolInvocationPrepareOptions&lt;T&gt;, token: CancellationToken): ProviderResult&lt;PreparedToolInvocation&gt;;</code></summary>

Called once before a tool is invoked. It's recommended to implement this to customize the progress message that appears
while the tool is running, and to provide a more useful message with context from the invocation input. Can also
signal that a tool needs user confirmation before running, if appropriate.

* *Note 1:* Must be free of side-effects.
* *Note 2:* A call to `prepareInvocation` is not necessarily followed by a call to `invoke`.

</details>

---

#### LanguageModelToolConfirmationMessages {#languagemodeltoolconfirmationmessages}

When this is returned in <a href="#preparedtoolinvocation">PreparedToolInvocation</a>, the user will be asked to confirm before running the tool. These
messages will be shown with buttons that say "Continue" and "Cancel".

##### Properties

<div id="languagemodeltoolconfirmationmessages-title"></div>

<details>
<summary><code>title: string</code></summary>

The title of the confirmation message.

</details>

<div id="languagemodeltoolconfirmationmessages-message"></div>

<details>
<summary><code>message: string | <a href="#markdownstring">MarkdownString</a></code></summary>

The body of the confirmation message.

</details>

---

#### LanguageModelToolInformation {#languagemodeltoolinformation}

Information about a registered tool available in <a href="#lm-tools">tools</a>.

##### Properties

<div id="languagemodeltoolinformation-name"></div>

<details>
<summary><code>name: string</code></summary>

A unique name for the tool.

**只读**: 是

</details>

<div id="languagemodeltoolinformation-description"></div>

<details>
<summary><code>description: string</code></summary>

A description of this tool that may be passed to a language model.

**只读**: 是

</details>

<div id="languagemodeltoolinformation-inputschema"></div>

<details>
<summary><code>inputSchema: object | undefined</code></summary>

A JSON schema for the input this tool accepts.

**只读**: 是

</details>

<div id="languagemodeltoolinformation-tags"></div>

<details>
<summary><code>tags: readonly string[]</code></summary>

A set of tags, declared by the tool, that roughly describe the tool's capabilities. A tool user may use these to filter
the set of tools to just ones that are relevant for the task at hand.

**只读**: 是

</details>

---

#### LanguageModelToolInvocationOptions {#languagemodeltoolinvocationoptions}

Options provided for tool invocation.

##### Properties

<div id="languagemodeltoolinvocationoptions-toolinvocationtoken"></div>

<details>
<summary><code>toolInvocationToken: <a href="#chatparticipanttooltoken">ChatParticipantToolToken</a> | undefined</code></summary>

An opaque object that ties a tool invocation to a chat request from a <a href="#chatparticipant">chat participant</a>.

The _only_ way to get a valid tool invocation token is using the provided toolInvocationToken
from a chat request. In that case, a progress bar will be automatically shown for the tool invocation in the chat response view, and if
the tool requires user confirmation, it will show up inline in the chat view.

If the tool is being invoked outside of a chat request, `undefined` should be passed instead, and no special UI except for
confirmations will be shown.

*Note* that a tool that invokes another tool during its invocation, can pass along the `toolInvocationToken` that it received.

</details>

<div id="languagemodeltoolinvocationoptions-input"></div>

<details>
<summary><code>input: T</code></summary>

The input with which to invoke the tool. The input must match the schema defined in
inputSchema

</details>

<div id="languagemodeltoolinvocationoptions-tokenizationoptions"></div>

<details>
<summary><code>tokenizationOptions: <a href="#languagemodeltooltokenizationoptions">LanguageModelToolTokenizationOptions</a></code></summary>

Options to hint at how many tokens the tool should return in its response, and enable the tool to count tokens
accurately.

</details>

---

#### LanguageModelToolInvocationPrepareOptions {#languagemodeltoolinvocationprepareoptions}

Options for prepareInvocation.

##### Properties

<div id="languagemodeltoolinvocationprepareoptions-input"></div>

<details>
<summary><code>input: T</code></summary>

The input that the tool is being invoked with.

</details>

---

#### LanguageModelToolTokenizationOptions {#languagemodeltooltokenizationoptions}

Options related to tokenization for a tool invocation.

##### Properties

<div id="languagemodeltooltokenizationoptions-tokenbudget"></div>

<details>
<summary><code>tokenBudget: number</code></summary>

If known, the maximum number of tokens the tool should emit in its result.

</details>

##### Methods

<div id="languagemodeltooltokenizationoptions-counttokens"></div>

<details>
<summary><code>countTokens(text: string, token?: CancellationToken): Thenable&lt;number&gt;;</code></summary>

Count the number of tokens in a message using the model specific tokenizer-logic.

</details>

---

#### LanguageStatusItem {#languagestatusitem}

A language status item is the preferred way to present language status reports for the active text editors,
such as selected linter or notifying about a configuration problem.

##### Properties

<div id="languagestatusitem-id"></div>

<details>
<summary><code>id: string</code></summary>

The identifier of this item.

**只读**: 是

</details>

<div id="languagestatusitem-name"></div>

<details>
<summary><code>name: string | undefined</code></summary>

The short name of this item, like 'Java Language Status', etc.

</details>

<div id="languagestatusitem-selector"></div>

<details>
<summary><code>selector: <a href="#documentselector">DocumentSelector</a></code></summary>

A <a href="#documentselector">selector</a> that defines for what editors
this item shows.

</details>

<div id="languagestatusitem-severity"></div>

<details>
<summary><code>severity: <a href="#languagestatusseverity">LanguageStatusSeverity</a></code></summary>

The severity of this item.

Defaults to information. You can use this property to
signal to users that there is a problem that needs attention, like a missing executable or an
invalid configuration.

</details>

<div id="languagestatusitem-text"></div>

<details>
<summary><code>text: string</code></summary>

The text to show for the entry. You can embed icons in the text by leveraging the syntax:

`My text $(icon-name) contains icons like $(icon-name) this one.`

Where the icon-name is taken from the ThemeIcon [icon set](https://code.visualstudio.com/api/references/icons-in-labels#icon-listing), e.g.
`light-bulb`, `thumbsup`, `zap` etc.

</details>

<div id="languagestatusitem-detail"></div>

<details>
<summary><code>detail: string</code></summary>

Optional, human-readable details for this item.

</details>

<div id="languagestatusitem-busy"></div>

<details>
<summary><code>busy: boolean</code></summary>

Controls whether the item is shown as "busy". Defaults to `false`.

</details>

<div id="languagestatusitem-command"></div>

<details>
<summary><code>command: <a href="#command">Command</a> | undefined</code></summary>

A <a href="#command">command</a> for this item.

</details>

<div id="languagestatusitem-accessibilityinformation"></div>

<details>
<summary><code>accessibilityInformation: <a href="#accessibilityinformation">AccessibilityInformation</a></code></summary>

Accessibility information used when a screen reader interacts with this item

</details>

##### Methods

<div id="languagestatusitem-dispose"></div>

<details>
<summary><code>dispose(): void;</code></summary>

Dispose and free associated resources.

</details>

---

#### LineChange {#linechange}

The contiguous set of modified lines in a diff.

##### Properties

<div id="linechange-originalstartlinenumber"></div>

<details>
<summary><code>originalStartLineNumber: number</code></summary>

**只读**: 是

</details>

<div id="linechange-originalendlinenumber"></div>

<details>
<summary><code>originalEndLineNumber: number</code></summary>

**只读**: 是

</details>

<div id="linechange-modifiedstartlinenumber"></div>

<details>
<summary><code>modifiedStartLineNumber: number</code></summary>

**只读**: 是

</details>

<div id="linechange-modifiedendlinenumber"></div>

<details>
<summary><code>modifiedEndLineNumber: number</code></summary>

**只读**: 是

</details>

---

#### LinkedEditingRangeProvider {#linkededitingrangeprovider}

The linked editing range provider interface defines the contract between extensions and
the linked editing feature.

##### Methods

<div id="linkededitingrangeprovider-providelinkededitingranges"></div>

<details>
<summary><code>provideLinkedEditingRanges(document: TextDocument, position: Position, token: CancellationToken): ProviderResult&lt;LinkedEditingRanges&gt;;</code></summary>

For a given position in a document, returns the range of the symbol at the position and all ranges
that have the same content. A change to one of the ranges can be applied to all other ranges if the new content
is valid. An optional word pattern can be returned with the result to describe valid contents.
If no result-specific word pattern is provided, the word pattern from the language configuration is used.

</details>

---

#### LocationLink {#locationlink}

Information about where a symbol is defined.

Provides additional metadata over normal <a href="#location">location</a> definitions, including the range of
the defining symbol

##### Properties

<div id="locationlink-originselectionrange"></div>

<details>
<summary><code>originSelectionRange: <a href="#range">Range</a></code></summary>

Span of the symbol being defined in the source file.

Used as the underlined span for mouse definition hover. Defaults to the word range at
the definition position.

</details>

<div id="locationlink-targeturi"></div>

<details>
<summary><code>targetUri: <a href="#uri">Uri</a></code></summary>

The resource identifier of the definition.

</details>

<div id="locationlink-targetrange"></div>

<details>
<summary><code>targetRange: <a href="#range">Range</a></code></summary>

The full range of the definition.

For a class definition for example, this would be the entire body of the class definition.

</details>

<div id="locationlink-targetselectionrange"></div>

<details>
<summary><code>targetSelectionRange: <a href="#range">Range</a></code></summary>

The span of the symbol definition.

For a class definition, this would be the class name itself in the class definition.

</details>

---

#### LogOutputChannel {#logoutputchannel}

A channel for containing log output.

To get an instance of a `LogOutputChannel` use
createOutputChannel.

##### Properties

<div id="logoutputchannel-loglevel"></div>

<details>
<summary><code>logLevel: <a href="#loglevel">LogLevel</a></code></summary>

The current log level of the channel. Defaults to editor log level.

**只读**: 是

</details>

<div id="logoutputchannel-ondidchangeloglevel"></div>

<details>
<summary><code>onDidChangeLogLevel: <a href="#event">Event</a>&lt;<a href="#loglevel">LogLevel</a>&gt;</code></summary>

An <a href="#event">Event</a> which fires when the log level of the channel changes.

**只读**: 是

</details>

##### Methods

<div id="logoutputchannel-trace"></div>

<details>
<summary><code>trace(message: string, ...args: any[]): void;</code></summary>

Outputs the given trace message to the channel. Use this method to log verbose information.

The message is only logged if the channel is configured to display trace log level.

</details>

<div id="logoutputchannel-debug"></div>

<details>
<summary><code>debug(message: string, ...args: any[]): void;</code></summary>

Outputs the given debug message to the channel.

The message is only logged if the channel is configured to display debug log level or lower.

</details>

<div id="logoutputchannel-info"></div>

<details>
<summary><code>info(message: string, ...args: any[]): void;</code></summary>

Outputs the given information message to the channel.

The message is only logged if the channel is configured to display info log level or lower.

</details>

<div id="logoutputchannel-warn"></div>

<details>
<summary><code>warn(message: string, ...args: any[]): void;</code></summary>

Outputs the given warning message to the channel.

The message is only logged if the channel is configured to display warning log level or lower.

</details>

<div id="logoutputchannel-error"></div>

<details>
<summary><code>error(error: string | Error, ...args: any[]): void;</code></summary>

Outputs the given error or error message to the channel.

The message is only logged if the channel is configured to display error log level or lower.

</details>

---

#### MappedEditsContext {#mappededitscontext}

##### Properties

<div id="mappededitscontext-documents"></div>

<details>
<summary><code>documents: <a href="#documentcontextitem">DocumentContextItem</a>[][]</code></summary>

**只读**: 是

</details>

<div id="mappededitscontext-conversation"></div>

<details>
<summary><code>conversation: Array&lt;<a href="#conversationrequest">ConversationRequest</a> | <a href="#conversationresponse">ConversationResponse</a>&gt;</code></summary>

The conversation that led to the current code block(s).
The last conversation part contains the code block(s) for which the code mapper should provide edits.

**只读**: 是

</details>

---

#### MappedEditsProvider {#mappededitsprovider}

Interface for providing mapped edits for a given document.

##### Methods

<div id="mappededitsprovider-providemappededits"></div>

<details>
<summary><code>provideMappedEdits( document: TextDocument, codeBlocks: string[], context: MappedEditsContext, token: CancellationToken ): ProviderResult&lt;WorkspaceEdit | null&gt;;</code></summary>

Provide mapped edits for a given document.

</details>

---

#### MappedEditsProvider2 {#mappededitsprovider2}

Interface for providing mapped edits for a given document.

##### Methods

<div id="mappededitsprovider2-providemappededits"></div>

<details>
<summary><code>provideMappedEdits( request: MappedEditsRequest, result: MappedEditsResponseStream, token: CancellationToken ): ProviderResult&lt;MappedEditsResult&gt;;</code></summary>

</details>

---

#### MappedEditsRequest {#mappededitsrequest}

##### Properties

<div id="mappededitsrequest-codeblocks"></div>

<details>
<summary><code>codeBlocks: &#123; code: string; resource: <a href="#uri">Uri</a>; markdownBeforeBlock?: string &#125;[]</code></summary>

**只读**: 是

</details>

<div id="mappededitsrequest-conversation"></div>

<details>
<summary><code>conversation: Array&lt;<a href="#conversationrequest">ConversationRequest</a> | <a href="#conversationresponse">ConversationResponse</a>&gt;</code></summary>

**只读**: 是

</details>

---

#### MappedEditsResponseStream {#mappededitsresponsestream}

##### Methods

<div id="mappededitsresponsestream-textedit"></div>

<details>
<summary><code>textEdit(target: Uri, edits: TextEdit | TextEdit[]): void;</code></summary>

</details>

---

#### MappedEditsResult {#mappededitsresult}

##### Properties

<div id="mappededitsresult-errormessage"></div>

<details>
<summary><code>errorMessage: string</code></summary>

**只读**: 是

</details>

---

#### Memento {#memento}

A memento represents a storage utility. It can store and retrieve
values.

##### Methods

<div id="memento-keys"></div>

<details>
<summary><code>keys(): readonly string[];</code></summary>

Returns the stored keys.

</details>

<div id="memento-get"></div>

<details>
<summary><code>get&lt;T&gt;(key: string): T | undefined;</code></summary>

Return a value.

</details>

<div id="memento-get"></div>

<details>
<summary><code>get&lt;T&gt;(key: string, defaultValue: T): T;</code></summary>

Return a value.

</details>

<div id="memento-update"></div>

<details>
<summary><code>update(key: string, value: any): Thenable&lt;void&gt;;</code></summary>

Store a value. The value must be JSON-stringifyable.

</details>

---

#### MessageItem {#messageitem}

Represents an action that is shown with a message.

##### Properties

<div id="messageitem-title"></div>

<details>
<summary><code>title: string</code></summary>

A message title.

</details>

<div id="messageitem-iscloseaffordance"></div>

<details>
<summary><code>isCloseAffordance: boolean</code></summary>

Indicates that the item should be triggered
when the user cancels the dialog.

Note: this option is ignored for non-modal messages.

</details>

---

#### MessageOptions {#messageoptions}

Options to configure the message behavior.

##### Properties

<div id="messageoptions-detail"></div>

<details>
<summary><code>detail: string</code></summary>

</details>

<div id="messageoptions-modal"></div>

<details>
<summary><code>modal: boolean</code></summary>

Indicates that this message should be modal.

</details>

---

#### MultiDocumentHighlightProvider {#multidocumenthighlightprovider}

##### Methods

<div id="multidocumenthighlightprovider-providemultidocumenthighlights"></div>

<details>
<summary><code>provideMultiDocumentHighlights(document: TextDocument, position: Position, otherDocuments: TextDocument[], token: CancellationToken): ProviderResult&lt;MultiDocumentHighlight[]&gt;;</code></summary>

Provide a set of document highlights, like all occurrences of a variable or
all exit-points of a function.

</details>

---

#### NotebookCell {#notebookcell}

Represents a cell of a <a href="#notebookdocument">notebook</a>, either a code-cell
or markup-cell.

NotebookCell instances are immutable and are kept in sync for as long as they are part of their notebook.

##### Properties

<div id="notebookcell-index"></div>

<details>
<summary><code>index: number</code></summary>

The index of this cell in its containing notebook. The
index is updated when a cell is moved within its notebook. The index is `-1`
when the cell has been removed from its notebook.

**只读**: 是

</details>

<div id="notebookcell-notebook"></div>

<details>
<summary><code>notebook: <a href="#notebookdocument">NotebookDocument</a></code></summary>

The <a href="#notebookdocument">notebook</a> that contains this cell.

**只读**: 是

</details>

<div id="notebookcell-kind"></div>

<details>
<summary><code>kind: <a href="#notebookcellkind">NotebookCellKind</a></code></summary>

The kind of this cell.

**只读**: 是

</details>

<div id="notebookcell-document"></div>

<details>
<summary><code>document: <a href="#textdocument">TextDocument</a></code></summary>

The <a href="#textdocument">text</a> of this cell, represented as text document.

**只读**: 是

</details>

<div id="notebookcell-metadata"></div>

<details>
<summary><code>metadata: &#123; readonly [key: string]: any &#125;</code></summary>

The metadata of this cell. Can be anything but must be JSON-stringifyable.

**只读**: 是

</details>

<div id="notebookcell-outputs"></div>

<details>
<summary><code>outputs: readonly <a href="#notebookcelloutput">NotebookCellOutput</a>[]</code></summary>

The outputs of this cell.

**只读**: 是

</details>

<div id="notebookcell-executionsummary"></div>

<details>
<summary><code>executionSummary: <a href="#notebookcellexecutionsummary">NotebookCellExecutionSummary</a> | undefined</code></summary>

The most recent <a href="#notebookcellexecutionsummary">execution summary</a> for this cell.

**只读**: 是

</details>

---

#### NotebookCellExecution {#notebookcellexecution}

A NotebookCellExecution is how <a href="#notebookcontroller">notebook controller</a> modify a notebook cell as
it is executing.

When a cell execution object is created, the cell enters the Pending state.
When start(...) is called on the execution task, it enters the Executing state. When
end(...) is called, it enters the Idle state.

##### Properties

<div id="notebookcellexecution-cell"></div>

<details>
<summary><code>cell: <a href="#notebookcell">NotebookCell</a></code></summary>

The <a href="#notebookcell">cell</a> for which this execution has been created.

**只读**: 是

</details>

<div id="notebookcellexecution-token"></div>

<details>
<summary><code>token: <a href="#cancellationtoken">CancellationToken</a></code></summary>

A cancellation token which will be triggered when the cell execution is canceled
from the UI.

_Note_ that the cancellation token will not be triggered when the <a href="#notebookcontroller">controller</a>
that created this execution uses an interrupt-handler.

**只读**: 是

</details>

<div id="notebookcellexecution-executionorder"></div>

<details>
<summary><code>executionOrder: number | undefined</code></summary>

Set and unset the order of this cell execution.

</details>

##### Methods

<div id="notebookcellexecution-start"></div>

<details>
<summary><code>start(startTime?: number): void;</code></summary>

Signal that the execution has begun.

</details>

<div id="notebookcellexecution-end"></div>

<details>
<summary><code>end(success: boolean | undefined, endTime?: number): void;</code></summary>

Signal that execution has ended.

</details>

<div id="notebookcellexecution-clearoutput"></div>

<details>
<summary><code>clearOutput(cell?: NotebookCell): Thenable&lt;void&gt;;</code></summary>

Clears the output of the cell that is executing or of another cell that is affected by this execution.

</details>

<div id="notebookcellexecution-replaceoutput"></div>

<details>
<summary><code>replaceOutput(out: NotebookCellOutput | readonly NotebookCellOutput[], cell?: NotebookCell): Thenable&lt;void&gt;;</code></summary>

Replace the output of the cell that is executing or of another cell that is affected by this execution.

</details>

<div id="notebookcellexecution-appendoutput"></div>

<details>
<summary><code>appendOutput(out: NotebookCellOutput | readonly NotebookCellOutput[], cell?: NotebookCell): Thenable&lt;void&gt;;</code></summary>

Append to the output of the cell that is executing or to another cell that is affected by this execution.

</details>

<div id="notebookcellexecution-replaceoutputitems"></div>

<details>
<summary><code>replaceOutputItems(items: NotebookCellOutputItem | readonly NotebookCellOutputItem[], output: NotebookCellOutput): Thenable&lt;void&gt;;</code></summary>

Replace all output items of existing cell output.

</details>

<div id="notebookcellexecution-appendoutputitems"></div>

<details>
<summary><code>appendOutputItems(items: NotebookCellOutputItem | readonly NotebookCellOutputItem[], output: NotebookCellOutput): Thenable&lt;void&gt;;</code></summary>

Append output items to existing cell output.

</details>

---

#### NotebookCellExecutionStateChangeEvent {#notebookcellexecutionstatechangeevent}

An event describing a cell execution state change.

##### Properties

<div id="notebookcellexecutionstatechangeevent-cell"></div>

<details>
<summary><code>cell: <a href="#notebookcell">NotebookCell</a></code></summary>

The <a href="#notebookcell">cell</a> for which the execution state has changed.

**只读**: 是

</details>

<div id="notebookcellexecutionstatechangeevent-state"></div>

<details>
<summary><code>state: <a href="#notebookcellexecutionstate">NotebookCellExecutionState</a></code></summary>

The new execution state of the cell.

**只读**: 是

</details>

---

#### NotebookCellExecutionSummary {#notebookcellexecutionsummary}

The summary of a notebook cell execution.

##### Properties

<div id="notebookcellexecutionsummary-executionorder"></div>

<details>
<summary><code>executionOrder: number</code></summary>

The order in which the execution happened.

**只读**: 是

</details>

<div id="notebookcellexecutionsummary-success"></div>

<details>
<summary><code>success: boolean</code></summary>

If the execution finished successfully.

**只读**: 是

</details>

<div id="notebookcellexecutionsummary-timing"></div>

<details>
<summary><code>timing: &#123; readonly startTime: number; readonly endTime: number &#125;</code></summary>

The times at which execution started and ended, as unix timestamps

**只读**: 是

</details>

---

#### NotebookCellStatusBarItemProvider {#notebookcellstatusbaritemprovider}

A provider that can contribute items to the status bar that appears below a cell's editor.

##### Properties

<div id="notebookcellstatusbaritemprovider-ondidchangecellstatusbaritems"></div>

<details>
<summary><code>onDidChangeCellStatusBarItems: <a href="#event">Event</a>&lt;void&gt;</code></summary>

An optional event to signal that statusbar items have changed. The provide method will be called again.

</details>

##### Methods

<div id="notebookcellstatusbaritemprovider-providecellstatusbaritems"></div>

<details>
<summary><code>provideCellStatusBarItems(cell: NotebookCell, token: CancellationToken): ProviderResult&lt;NotebookCellStatusBarItem | NotebookCellStatusBarItem[]&gt;;</code></summary>

The provider will be called when the cell scrolls into view, when its content, outputs, language, or metadata change, and when it changes execution state.

</details>

---

#### NotebookController {#notebookcontroller}

A notebook controller represents an entity that can execute notebook cells. This is often referred to as a kernel.

There can be multiple controllers and the editor will let users choose which controller to use for a certain notebook. The
notebookType-property defines for what kind of notebooks a controller is for and
the updateNotebookAffinity-function allows controllers to set a preference
for specific notebook documents. When a controller has been selected its
onDidChangeSelectedNotebooks-event fires.

When a cell is being run the editor will invoke the executeHandler and a controller
is expected to create and finalize a <a href="#notebookcellexecution">notebook cell execution</a>. However, controllers are also free
to create executions by themselves.

##### Properties

<div id="notebookcontroller-id"></div>

<details>
<summary><code>id: string</code></summary>

The identifier of this notebook controller.

_Note_ that controllers are remembered by their identifier and that extensions should use
stable identifiers across sessions.

**只读**: 是

</details>

<div id="notebookcontroller-notebooktype"></div>

<details>
<summary><code>notebookType: string</code></summary>

The notebook type this controller is for.

**只读**: 是

</details>

<div id="notebookcontroller-supportedlanguages"></div>

<details>
<summary><code>supportedLanguages: string[]</code></summary>

An array of language identifiers that are supported by this
controller. Any language identifier from getLanguages
is possible. When falsy all languages are supported.

Samples:
```js
// support JavaScript and TypeScript
myController.supportedLanguages = ['javascript', 'typescript']

// support all languages
myController.supportedLanguages = undefined; // falsy
myController.supportedLanguages = []; // falsy
```

</details>

<div id="notebookcontroller-label"></div>

<details>
<summary><code>label: string</code></summary>

The human-readable label of this notebook controller.

</details>

<div id="notebookcontroller-description"></div>

<details>
<summary><code>description: string</code></summary>

The human-readable description which is rendered less prominent.

</details>

<div id="notebookcontroller-detail"></div>

<details>
<summary><code>detail: string</code></summary>

The human-readable detail which is rendered less prominent.

</details>

<div id="notebookcontroller-supportsexecutionorder"></div>

<details>
<summary><code>supportsExecutionOrder: boolean</code></summary>

Whether this controller supports execution order so that the
editor can render placeholders for them.

</details>

<div id="notebookcontroller-executehandler"></div>

<details>
<summary><code>executeHandler: (cells: <a href="#notebookcell">NotebookCell</a>[], notebook: <a href="#notebookdocument">NotebookDocument</a>, controller: <a href="#notebookcontroller">NotebookController</a>) =&gt; void | Thenable&lt;void&gt;</code></summary>

The execute handler is invoked when the run gestures in the UI are selected, e.g Run Cell, Run All,
Run Selection etc. The execute handler is responsible for creating and managing <a href="#notebookcellexecution">execution</a>-objects.

</details>

<div id="notebookcontroller-interrupthandler"></div>

<details>
<summary><code>interruptHandler: (notebook: <a href="#notebookdocument">NotebookDocument</a>) =&gt; void | Thenable&lt;void&gt;</code></summary>

Optional interrupt handler.

By default cell execution is canceled via tokens. Cancellation
tokens require that a controller can keep track of its execution so that it can cancel a specific execution at a later
point. Not all scenarios allow for that, eg. REPL-style controllers often work by interrupting whatever is currently
running. For those cases the interrupt handler exists - it can be thought of as the equivalent of `SIGINT`
or `Control+C` in terminals.

_Note_ that supporting cancellation tokens is preferred and that interrupt handlers should
only be used when tokens cannot be supported.

</details>

<div id="notebookcontroller-ondidchangeselectednotebooks"></div>

<details>
<summary><code>onDidChangeSelectedNotebooks: <a href="#event">Event</a>&lt;&#123; readonly notebook: <a href="#notebookdocument">NotebookDocument</a>; readonly selected: boolean &#125;&gt;</code></summary>

An event that fires whenever a controller has been selected or un-selected for a notebook document.

There can be multiple controllers for a notebook and in that case a controllers needs to be _selected_. This is a user gesture
and happens either explicitly or implicitly when interacting with a notebook for which a controller was _suggested_. When possible,
the editor _suggests_ a controller that is most likely to be _selected_.

_Note_ that controller selection is persisted (by the controllers id) and restored as soon as a
controller is re-created or as a notebook is opened.

**只读**: 是

</details>

##### Methods

<div id="notebookcontroller-createnotebookcellexecution"></div>

<details>
<summary><code>createNotebookCellExecution(cell: NotebookCell): NotebookCellExecution;</code></summary>

Create a cell execution task.

_Note_ that there can only be one execution per cell at a time and that an error is thrown if
a cell execution is created while another is still active.

This should be used in response to the execution handler
being called or when cell execution has been started else, e.g when a cell was already
executing or when cell execution was triggered from another source.

</details>

<div id="notebookcontroller-updatenotebookaffinity"></div>

<details>
<summary><code>updateNotebookAffinity(notebook: NotebookDocument, affinity: NotebookControllerAffinity): void;</code></summary>

A controller can set affinities for specific notebook documents. This allows a controller
to be presented more prominent for some notebooks.

</details>

<div id="notebookcontroller-dispose"></div>

<details>
<summary><code>dispose(): void;</code></summary>

Dispose and free associated resources.

</details>

---

#### NotebookController {#notebookcontroller}

##### Properties

<div id="notebookcontroller-rendererscripts"></div>

<details>
<summary><code>rendererScripts: <a href="#notebookrendererscript">NotebookRendererScript</a>[]</code></summary>

**只读**: 是

</details>

<div id="notebookcontroller-ondidreceivemessage"></div>

<details>
<summary><code>onDidReceiveMessage: <a href="#event">Event</a>&lt;&#123; readonly editor: <a href="#notebookeditor">NotebookEditor</a>; readonly message: unknown &#125;&gt;</code></summary>

An event that fires when a renderer script has send a message to
the controller.

**只读**: 是

</details>

##### Methods

<div id="notebookcontroller-postmessage"></div>

<details>
<summary><code>postMessage(message: unknown, editor?: NotebookEditor): Thenable&lt;boolean&gt;;</code></summary>

Send a message to the renderer of notebook editors.

Note that only editors showing documents that are bound to this controller
are receiving the message.

</details>

<div id="notebookcontroller-aswebviewuri"></div>

<details>
<summary><code>asWebviewUri(localResource: Uri): Uri;</code></summary>

</details>

---

#### NotebookControllerDetectionTask {#notebookcontrollerdetectiontask}

##### Methods

<div id="notebookcontrollerdetectiontask-dispose"></div>

<details>
<summary><code>dispose(): void;</code></summary>

Dispose and remove the detection task.

</details>

---

#### NotebookDocument {#notebookdocument}

Represents a notebook which itself is a sequence of <a href="#notebookcell">code or markup cells</a>. Notebook documents are
created from <a href="#notebookdata">notebook data</a>.

##### Properties

<div id="notebookdocument-uri"></div>

<details>
<summary><code>uri: <a href="#uri">Uri</a></code></summary>

The associated uri for this notebook.

*Note* that most notebooks use the `file`-scheme, which means they are files on disk. However, **not** all notebooks are
saved on disk and therefore the `scheme` must be checked before trying to access the underlying file or siblings on disk.

**只读**: 是

</details>

<div id="notebookdocument-notebooktype"></div>

<details>
<summary><code>notebookType: string</code></summary>

The type of notebook.

**只读**: 是

</details>

<div id="notebookdocument-version"></div>

<details>
<summary><code>version: number</code></summary>

The version number of this notebook (it will strictly increase after each
change, including undo/redo).

**只读**: 是

</details>

<div id="notebookdocument-isdirty"></div>

<details>
<summary><code>isDirty: boolean</code></summary>

`true` if there are unpersisted changes.

**只读**: 是

</details>

<div id="notebookdocument-isuntitled"></div>

<details>
<summary><code>isUntitled: boolean</code></summary>

Is this notebook representing an untitled file which has not been saved yet.

**只读**: 是

</details>

<div id="notebookdocument-isclosed"></div>

<details>
<summary><code>isClosed: boolean</code></summary>

`true` if the notebook has been closed. A closed notebook isn't synchronized anymore
and won't be re-used when the same resource is opened again.

**只读**: 是

</details>

<div id="notebookdocument-metadata"></div>

<details>
<summary><code>metadata: &#123; [key: string]: any &#125;</code></summary>

Arbitrary metadata for this notebook. Can be anything but must be JSON-stringifyable.

**只读**: 是

</details>

<div id="notebookdocument-cellcount"></div>

<details>
<summary><code>cellCount: number</code></summary>

The number of cells in the notebook.

**只读**: 是

</details>

##### Methods

<div id="notebookdocument-cellat"></div>

<details>
<summary><code>cellAt(index: number): NotebookCell;</code></summary>

Return the cell at the specified index. The index will be adjusted to the notebook.

</details>

<div id="notebookdocument-getcells"></div>

<details>
<summary><code>getCells(range?: NotebookRange): NotebookCell[];</code></summary>

Get the cells of this notebook. A subset can be retrieved by providing
a range. The range will be adjusted to the notebook.

</details>

<div id="notebookdocument-save"></div>

<details>
<summary><code>save(): Thenable&lt;boolean&gt;;</code></summary>

Save the document. The saving will be handled by the corresponding <a href="#notebookserializer">serializer</a>.

</details>

---

#### NotebookDocumentCellChange {#notebookdocumentcellchange}

Describes a change to a notebook cell.

##### Properties

<div id="notebookdocumentcellchange-cell"></div>

<details>
<summary><code>cell: <a href="#notebookcell">NotebookCell</a></code></summary>

The affected cell.

**只读**: 是

</details>

<div id="notebookdocumentcellchange-document"></div>

<details>
<summary><code>document: <a href="#textdocument">TextDocument</a> | undefined</code></summary>

The document of the cell or `undefined` when it did not change.

*Note* that you should use the onDidChangeTextDocument-event
for detailed change information, like what edits have been performed.

**只读**: 是

</details>

<div id="notebookdocumentcellchange-metadata"></div>

<details>
<summary><code>metadata: &#123; [key: string]: any &#125; | undefined</code></summary>

The new metadata of the cell or `undefined` when it did not change.

**只读**: 是

</details>

<div id="notebookdocumentcellchange-outputs"></div>

<details>
<summary><code>outputs: readonly <a href="#notebookcelloutput">NotebookCellOutput</a>[] | undefined</code></summary>

The new outputs of the cell or `undefined` when they did not change.

**只读**: 是

</details>

<div id="notebookdocumentcellchange-executionsummary"></div>

<details>
<summary><code>executionSummary: <a href="#notebookcellexecutionsummary">NotebookCellExecutionSummary</a> | undefined</code></summary>

The new execution summary of the cell or `undefined` when it did not change.

**只读**: 是

</details>

---

#### NotebookDocumentChangeEvent {#notebookdocumentchangeevent}

An event describing a transactional <a href="#notebookdocument">notebook</a> change.

##### Properties

<div id="notebookdocumentchangeevent-notebook"></div>

<details>
<summary><code>notebook: <a href="#notebookdocument">NotebookDocument</a></code></summary>

The affected notebook.

**只读**: 是

</details>

<div id="notebookdocumentchangeevent-metadata"></div>

<details>
<summary><code>metadata: &#123; [key: string]: any &#125; | undefined</code></summary>

The new metadata of the notebook or `undefined` when it did not change.

**只读**: 是

</details>

<div id="notebookdocumentchangeevent-contentchanges"></div>

<details>
<summary><code>contentChanges: readonly <a href="#notebookdocumentcontentchange">NotebookDocumentContentChange</a>[]</code></summary>

An array of content changes describing added or removed <a href="#notebookcell">cells</a>.

**只读**: 是

</details>

<div id="notebookdocumentchangeevent-cellchanges"></div>

<details>
<summary><code>cellChanges: readonly <a href="#notebookdocumentcellchange">NotebookDocumentCellChange</a>[]</code></summary>

An array of <a href="#notebookdocumentcellchange">cell changes</a>.

**只读**: 是

</details>

---

#### NotebookDocumentContentChange {#notebookdocumentcontentchange}

Describes a structural change to a notebook document, e.g newly added and removed cells.

##### Properties

<div id="notebookdocumentcontentchange-range"></div>

<details>
<summary><code>range: <a href="#notebookrange">NotebookRange</a></code></summary>

The range at which cells have been either added or removed.

Note that no cells have been removed
when this range is empty.

**只读**: 是

</details>

<div id="notebookdocumentcontentchange-addedcells"></div>

<details>
<summary><code>addedCells: readonly <a href="#notebookcell">NotebookCell</a>[]</code></summary>

Cells that have been added to the document.

**只读**: 是

</details>

<div id="notebookdocumentcontentchange-removedcells"></div>

<details>
<summary><code>removedCells: readonly <a href="#notebookcell">NotebookCell</a>[]</code></summary>

Cells that have been removed from the document.

**只读**: 是

</details>

---

#### NotebookDocumentContentOptions {#notebookdocumentcontentoptions}

Notebook content options define what parts of a notebook are persisted. Note

For instance, a notebook serializer can opt-out of saving outputs and in that case the editor doesn't mark a
notebooks as dirty when its output has changed.

##### Properties

<div id="notebookdocumentcontentoptions-transientoutputs"></div>

<details>
<summary><code>transientOutputs: boolean</code></summary>

Controls if output change events will trigger notebook document content change events and
if it will be used in the diff editor, defaults to false. If the content provider doesn't
persist the outputs in the file document, this should be set to true.

</details>

<div id="notebookdocumentcontentoptions-transientcellmetadata"></div>

<details>
<summary><code>transientCellMetadata: &#123; [key: string]: boolean | undefined &#125;</code></summary>

Controls if a cell metadata property change event will trigger notebook document content
change events and if it will be used in the diff editor, defaults to false. If the
content provider doesn't persist a metadata property in the file document, it should be
set to true.

</details>

<div id="notebookdocumentcontentoptions-transientdocumentmetadata"></div>

<details>
<summary><code>transientDocumentMetadata: &#123; [key: string]: boolean | undefined &#125;</code></summary>

Controls if a document metadata property change event will trigger notebook document
content change event and if it will be used in the diff editor, defaults to false. If the
content provider doesn't persist a metadata property in the file document, it should be
set to true.

</details>

---

#### NotebookDocumentShowOptions {#notebookdocumentshowoptions}

Represents options to configure the behavior of showing a <a href="#notebookdocument">notebook document</a> in an <a href="#notebookeditor">notebook editor</a>.

##### Properties

<div id="notebookdocumentshowoptions-viewcolumn"></div>

<details>
<summary><code>viewColumn: <a href="#viewcolumn">ViewColumn</a></code></summary>

An optional view column in which the <a href="#notebookeditor">notebook editor</a> should be shown.
The default is the active. Columns that do not exist
will be created as needed up to the maximum of Nine.
Use Beside to open the editor to the side of the currently
active one.

**只读**: 是

</details>

<div id="notebookdocumentshowoptions-preservefocus"></div>

<details>
<summary><code>preserveFocus: boolean</code></summary>

An optional flag that when `true` will stop the <a href="#notebookeditor">notebook editor</a> from taking focus.

**只读**: 是

</details>

<div id="notebookdocumentshowoptions-preview"></div>

<details>
<summary><code>preview: boolean</code></summary>

An optional flag that controls if an <a href="#notebookeditor">notebook editor</a>-tab shows as preview. Preview tabs will
be replaced and reused until set to stay - either explicitly or through editing. The default behaviour depends
on the `workbench.editor.enablePreview`-setting.

**只读**: 是

</details>

<div id="notebookdocumentshowoptions-selections"></div>

<details>
<summary><code>selections: readonly <a href="#notebookrange">NotebookRange</a>[]</code></summary>

An optional selection to apply for the document in the <a href="#notebookeditor">notebook editor</a>.

**只读**: 是

</details>

---

#### NotebookDocumentWillSaveEvent {#notebookdocumentwillsaveevent}

An event that is fired when a <a href="#notebookdocument">notebook document</a> will be saved.

To make modifications to the document before it is being saved, call the
waitUntil-function with a thenable
that resolves to a <a href="#workspaceedit">workspace edit</a>.

##### Properties

<div id="notebookdocumentwillsaveevent-token"></div>

<details>
<summary><code>token: <a href="#cancellationtoken">CancellationToken</a></code></summary>

A cancellation token.

**只读**: 是

</details>

<div id="notebookdocumentwillsaveevent-notebook"></div>

<details>
<summary><code>notebook: <a href="#notebookdocument">NotebookDocument</a></code></summary>

The <a href="#notebookdocument">notebook document</a> that will be saved.

**只读**: 是

</details>

<div id="notebookdocumentwillsaveevent-reason"></div>

<details>
<summary><code>reason: <a href="#textdocumentsavereason">TextDocumentSaveReason</a></code></summary>

The reason why save was triggered.

**只读**: 是

</details>

##### Methods

<div id="notebookdocumentwillsaveevent-waituntil"></div>

<details>
<summary><code>waitUntil(thenable: Thenable&lt;WorkspaceEdit&gt;): void;</code></summary>

Allows to pause the event loop and to apply <a href="#workspaceedit">workspace edit</a>.
Edits of subsequent calls to this function will be applied in order. The
edits will be *ignored* if concurrent modifications of the notebook document happened.

*Note:* This function can only be called during event dispatch and not
in an asynchronous manner:

```ts
workspace.onWillSaveNotebookDocument(event =&gt; &#123;
// async, will *throw* an error
setTimeout(() =&gt; event.waitUntil(promise));

// sync, OK
event.waitUntil(promise);
&#125;)
```

</details>

<div id="notebookdocumentwillsaveevent-waituntil"></div>

<details>
<summary><code>waitUntil(thenable: Thenable&lt;any&gt;): void;</code></summary>

Allows to pause the event loop until the provided thenable resolved.

*Note:* This function can only be called during event dispatch.

</details>

---

#### NotebookEditor {#notebookeditor}

Represents a notebook editor that is attached to a <a href="#notebookdocument">notebook</a>.
Additional properties of the NotebookEditor are available in the proposed
API, which will be finalized later.

##### Properties

<div id="notebookeditor-notebook"></div>

<details>
<summary><code>notebook: <a href="#notebookdocument">NotebookDocument</a></code></summary>

The <a href="#notebookdocument">notebook document</a> associated with this notebook editor.

**只读**: 是

</details>

<div id="notebookeditor-selection"></div>

<details>
<summary><code>selection: <a href="#notebookrange">NotebookRange</a></code></summary>

The primary selection in this notebook editor.

</details>

<div id="notebookeditor-selections"></div>

<details>
<summary><code>selections: readonly <a href="#notebookrange">NotebookRange</a>[]</code></summary>

All selections in this notebook editor.

The primary selection (or focused range) is `selections[0]`. When the document has no cells, the primary selection is empty `&#123; start: 0, end: 0 &#125;`;

</details>

<div id="notebookeditor-visibleranges"></div>

<details>
<summary><code>visibleRanges: readonly <a href="#notebookrange">NotebookRange</a>[]</code></summary>

The current visible ranges in the editor (vertically).

**只读**: 是

</details>

<div id="notebookeditor-viewcolumn"></div>

<details>
<summary><code>viewColumn: <a href="#viewcolumn">ViewColumn</a></code></summary>

The column in which this editor shows.

**只读**: 是

</details>

##### Methods

<div id="notebookeditor-revealrange"></div>

<details>
<summary><code>revealRange(range: NotebookRange, revealType?: NotebookEditorRevealType): void;</code></summary>

Scroll as indicated by `revealType` in order to reveal the given range.

</details>

---

#### NotebookEditorSelectionChangeEvent {#notebookeditorselectionchangeevent}

Represents an event describing the change in a notebook editor's selections.

##### Properties

<div id="notebookeditorselectionchangeevent-notebookeditor"></div>

<details>
<summary><code>notebookEditor: <a href="#notebookeditor">NotebookEditor</a></code></summary>

The <a href="#notebookeditor">notebook editor</a> for which the selections have changed.

**只读**: 是

</details>

<div id="notebookeditorselectionchangeevent-selections"></div>

<details>
<summary><code>selections: readonly <a href="#notebookrange">NotebookRange</a>[]</code></summary>

The new value for the notebook editor's selections.

**只读**: 是

</details>

---

#### NotebookEditorVisibleRangesChangeEvent {#notebookeditorvisiblerangeschangeevent}

Represents an event describing the change in a notebook editor's visibleRanges.

##### Properties

<div id="notebookeditorvisiblerangeschangeevent-notebookeditor"></div>

<details>
<summary><code>notebookEditor: <a href="#notebookeditor">NotebookEditor</a></code></summary>

The <a href="#notebookeditor">notebook editor</a> for which the visible ranges have changed.

**只读**: 是

</details>

<div id="notebookeditorvisiblerangeschangeevent-visibleranges"></div>

<details>
<summary><code>visibleRanges: readonly <a href="#notebookrange">NotebookRange</a>[]</code></summary>

The new value for the notebook editor's visibleRanges.

**只读**: 是

</details>

---

#### NotebookKernelSourceActionProvider {#notebookkernelsourceactionprovider}

##### Properties

<div id="notebookkernelsourceactionprovider-ondidchangenotebookkernelsourceactions"></div>

<details>
<summary><code>onDidChangeNotebookKernelSourceActions: <a href="#event">Event</a>&lt;void&gt;</code></summary>

An optional event to signal that the kernel source actions have changed.

</details>

##### Methods

<div id="notebookkernelsourceactionprovider-providenotebookkernelsourceactions"></div>

<details>
<summary><code>provideNotebookKernelSourceActions(token: CancellationToken): ProviderResult&lt;NotebookKernelSourceAction[]&gt;;</code></summary>

Provide kernel source actions

</details>

---

#### NotebookRendererMessaging {#notebookrenderermessaging}

Renderer messaging is used to communicate with a single renderer. It's returned from <a href="#notebooks-createrenderermessaging">createRendererMessaging</a>.

##### Properties

<div id="notebookrenderermessaging-ondidreceivemessage"></div>

<details>
<summary><code>onDidReceiveMessage: <a href="#event">Event</a>&lt;&#123; readonly editor: <a href="#notebookeditor">NotebookEditor</a>; readonly message: any; &#125;&gt;</code></summary>

An event that fires when a message is received from a renderer.

**只读**: 是

</details>

##### Methods

<div id="notebookrenderermessaging-postmessage"></div>

<details>
<summary><code>postMessage(message: any, editor?: NotebookEditor): Thenable&lt;boolean&gt;;</code></summary>

Send a message to one or all renderer.

</details>

---

#### NotebookSerializer {#notebookserializer}

The notebook serializer enables the editor to open notebook files.

At its core the editor only knows a <a href="#notebookdata">notebook data structure</a> but not
how that data structure is written to a file, nor how it is read from a file. The
notebook serializer bridges this gap by deserializing bytes into notebook data and
vice versa.

##### Methods

<div id="notebookserializer-deserializenotebook"></div>

<details>
<summary><code>deserializeNotebook(content: Uint8Array, token: CancellationToken): NotebookData | Thenable&lt;NotebookData&gt;;</code></summary>

Deserialize contents of a notebook file into the notebook data structure.

</details>

<div id="notebookserializer-serializenotebook"></div>

<details>
<summary><code>serializeNotebook(data: NotebookData, token: CancellationToken): Uint8Array | Thenable&lt;Uint8Array&gt;;</code></summary>

Serialize notebook data into file contents.

</details>

---

#### OnEnterRule {#onenterrule}

Describes a rule to be evaluated when pressing Enter.

##### Properties

<div id="onenterrule-beforetext"></div>

<details>
<summary><code>beforeText: RegExp</code></summary>

This rule will only execute if the text before the cursor matches this regular expression.

</details>

<div id="onenterrule-aftertext"></div>

<details>
<summary><code>afterText: RegExp</code></summary>

This rule will only execute if the text after the cursor matches this regular expression.

</details>

<div id="onenterrule-previouslinetext"></div>

<details>
<summary><code>previousLineText: RegExp</code></summary>

This rule will only execute if the text above the current line matches this regular expression.

</details>

<div id="onenterrule-action"></div>

<details>
<summary><code>action: <a href="#enteraction">EnterAction</a></code></summary>

The action to execute.

</details>

---

#### OnTypeFormattingEditProvider {#ontypeformattingeditprovider}

The document formatting provider interface defines the contract between extensions and
the formatting-feature.

##### Methods

<div id="ontypeformattingeditprovider-provideontypeformattingedits"></div>

<details>
<summary><code>provideOnTypeFormattingEdits(document: TextDocument, position: Position, ch: string, options: FormattingOptions, token: CancellationToken | undefined ): ProviderResult&lt;TextEdit[] | undefined&gt;;</code></summary>

Provide formatting edits after a character has been typed.

The given position and character should hint to the provider
what range the position to expand to, like find the matching `&#123;`
when `&#125;` has been entered.

</details>

---

#### OpenDialogOptions {#opendialogoptions}

Options to configure the behaviour of a file open dialog.

* Note 1: A dialog can select files, folders, or both. This is not true for Windows
which enforces to open either files or folder, but *not both*.
* Note 2: Explicitly setting `canSelectFiles` and `canSelectFolders` to `false` is futile
and the editor then silently adjusts the options to select files.

##### Properties

<div id="opendialogoptions-title"></div>

<details>
<summary><code>title: string</code></summary>

Dialog title.
This parameter might be ignored, as not all operating systems display a title on open dialogs.

</details>

<div id="opendialogoptions-defaulturi"></div>

<details>
<summary><code>defaultUri: <a href="#uri">Uri</a></code></summary>

The resource the dialog shows when opened.

</details>

<div id="opendialogoptions-openlabel"></div>

<details>
<summary><code>openLabel: string</code></summary>

A human-readable string for the open button.

</details>

<div id="opendialogoptions-canselectfiles"></div>

<details>
<summary><code>canSelectFiles: boolean</code></summary>

Allow to select files, defaults to `true`.

</details>

<div id="opendialogoptions-canselectfolders"></div>

<details>
<summary><code>canSelectFolders: boolean</code></summary>

Allow to select folders, defaults to `false`.

</details>

<div id="opendialogoptions-canselectmany"></div>

<details>
<summary><code>canSelectMany: boolean</code></summary>

Allow to select many files or folders.

</details>

<div id="opendialogoptions-filters"></div>

<details>
<summary><code>filters: &#123; [name: string]: string[] &#125;</code></summary>

A set of file filters that are used by the dialog. Each entry is a human readable label,
like "TypeScript", and an array of extensions, e.g.
```ts
&#123;
    'Images': ['png', 'jpg']
    'TypeScript': ['ts', 'tsx']
&#125;
```

</details>

---

#### OpenExternalUriContext {#openexternaluricontext}

Additional information about the uri being opened.

##### Properties

<div id="openexternaluricontext-sourceuri"></div>

<details>
<summary><code>sourceUri: <a href="#uri">Uri</a></code></summary>

The uri that triggered the open.

This is the original uri that the user clicked on or that was passed to `openExternal.`
Due to port forwarding, this may not match the `resolvedUri` passed to `openExternalUri`.

**只读**: 是

</details>

---

#### OutputChannel {#outputchannel}

An output channel is a container for readonly textual information.

To get an instance of an `OutputChannel` use
createOutputChannel.

##### Properties

<div id="outputchannel-name"></div>

<details>
<summary><code>name: string</code></summary>

The name of this output channel.

**只读**: 是

</details>

##### Methods

<div id="outputchannel-append"></div>

<details>
<summary><code>append(value: string): void;</code></summary>

Append the given value to the channel.

</details>

<div id="outputchannel-appendline"></div>

<details>
<summary><code>appendLine(value: string): void;</code></summary>

Append the given value and a line feed character
to the channel.

</details>

<div id="outputchannel-replace"></div>

<details>
<summary><code>replace(value: string): void;</code></summary>

Replaces all output from the channel with the given value.

</details>

<div id="outputchannel-clear"></div>

<details>
<summary><code>clear(): void;</code></summary>

Removes all output from the channel.

</details>

<div id="outputchannel-show"></div>

<details>
<summary><code>show(column?: ViewColumn, preserveFocus?: boolean): void;</code></summary>

Reveal this channel in the UI.

</details>

<div id="outputchannel-show"></div>

<details>
<summary><code>show(preserveFocus?: boolean): void;</code></summary>

Reveal this channel in the UI.

</details>

<div id="outputchannel-hide"></div>

<details>
<summary><code>hide(): void;</code></summary>

Hide this channel from the UI.

</details>

<div id="outputchannel-dispose"></div>

<details>
<summary><code>dispose(): void;</code></summary>

Dispose and free associated resources.

</details>

---

#### Plugin {#plugin}

Represents an plugin.

To get an instance of an `Plugin` use getPlugin.

##### Properties

<div id="plugin-id"></div>

<details>
<summary><code>id: string</code></summary>

The canonical plug-in identifier in the form of: `publisher.name`.

**只读**: 是

</details>

<div id="plugin-pluginpath"></div>

<details>
<summary><code>pluginPath: string</code></summary>

The absolute file path of the directory containing this plug-in.

**只读**: 是

</details>

<div id="plugin-pluginuri"></div>

<details>
<summary><code>pluginUri: <a href="#uri">Uri</a></code></summary>

The uri of the directory containing this plug-in.

**只读**: 是

</details>

<div id="plugin-isactive"></div>

<details>
<summary><code>isActive: boolean</code></summary>

`true` if the plug-in has been activated.

**只读**: 是

</details>

<div id="plugin-packagejson"></div>

<details>
<summary><code>packageJSON: any</code></summary>

The parsed contents of the plug-in's package.json.

**只读**: 是

</details>

<div id="plugin-plugintype"></div>

<details>
<summary><code>pluginType: <a href="#plugintype">PluginType</a></code></summary>

**只读**: 是

</details>

<div id="plugin-exports"></div>

<details>
<summary><code>exports: T</code></summary>

The public API exported by this plug-in. It is an invalid action
to access this field before this plug-in has been activated.

**只读**: 是

</details>

##### Methods

<div id="plugin-activate"></div>

<details>
<summary><code>activate(): Thenable&lt;T&gt;;</code></summary>

Activates this plug-in and returns its public API.

</details>

---

#### PluginContext {#plugincontext}

A plug-in context is a collection of utilities private to a
plug-in.

An instance of a `PluginContext` is provided as the first
parameter to the `start` of a plug-in.

##### Properties

<div id="plugincontext-subscriptions"></div>

<details>
<summary><code>subscriptions: &#123; dispose(): any &#125;[]</code></summary>

An array to which disposables can be added. When this
extension is deactivated the disposables will be disposed.

</details>

<div id="plugincontext-workspacestate"></div>

<details>
<summary><code>workspaceState: <a href="#memento">Memento</a></code></summary>

A memento object that stores state in the context
of the currently opened workspace.

</details>

<div id="plugincontext-globalstate"></div>

<details>
<summary><code>globalState: <a href="#memento">Memento</a> & &#123; setKeysForSync(keys: readonly string[]): void; &#125;</code></summary>

A memento object that stores state independent
of the current opened workspace.

</details>

<div id="plugincontext-secrets"></div>

<details>
<summary><code>secrets: <a href="#secretstorage">SecretStorage</a></code></summary>

A storage utility for secrets.

**只读**: 是

</details>

<div id="plugincontext-extensionpath"></div>

<details>
<summary><code>extensionPath: string</code></summary>

The absolute file path of the directory containing the extension.

</details>

<div id="plugincontext-extensionuri"></div>

<details>
<summary><code>extensionUri: <a href="#uri">Uri</a></code></summary>

The uri of the directory containing the extension.

**只读**: 是

</details>

<div id="plugincontext-environmentvariablecollection"></div>

<details>
<summary><code>environmentVariableCollection: <a href="#environmentvariablecollection">EnvironmentVariableCollection</a></code></summary>

Gets the extension's environment variable collection for this workspace, enabling changes
to be applied to terminal environment variables.

**只读**: 是

</details>

<div id="plugincontext-storagepath"></div>

<details>
<summary><code>storagePath: string | undefined</code></summary>

An absolute file path of a workspace specific directory in which the extension
can store private state. The directory might not exist on disk and creation is
up to the extension. However, the parent directory is guaranteed to be existent.

Use [`workspaceState`](#PluginContext.workspaceState) or
[`globalState`](#PluginContext.globalState) to store key value data.

</details>

<div id="plugincontext-storageuri"></div>

<details>
<summary><code>storageUri: <a href="#uri">Uri</a> | undefined</code></summary>

The uri of a workspace specific directory in which the extension
can store private state. The directory might not exist and creation is
up to the extension. However, the parent directory is guaranteed to be existent.
The value is `undefined` when no workspace nor folder has been opened.

Use [`workspaceState`](#PluginContext.workspaceState) or
[`globalState`](#PluginContext.globalState) to store key value data.

**只读**: 是

</details>

<div id="plugincontext-globalstoragepath"></div>

<details>
<summary><code>globalStoragePath: string</code></summary>

An absolute file path in which the extension can store global state.
The directory might not exist on disk and creation is
up to the extension. However, the parent directory is guaranteed to be existent.

Use [`globalState`](#PluginContext.globalState) to store key value data.

**只读**: 是

</details>

<div id="plugincontext-globalstorageuri"></div>

<details>
<summary><code>globalStorageUri: <a href="#uri">Uri</a></code></summary>

The uri of a directory in which the extension can store global state.
The directory might not exist on disk and creation is
up to the extension. However, the parent directory is guaranteed to be existent.

Use [`globalState`](#PluginContext.globalState) to store key value data.

**只读**: 是

</details>

<div id="plugincontext-logpath"></div>

<details>
<summary><code>logPath: string</code></summary>

An absolute file path of a directory in which the extension can create log files.
The directory might not exist on disk and creation is up to the extension. However,
the parent directory is guaranteed to be existent.

**只读**: 是

</details>

<div id="plugincontext-extensionmode"></div>

<details>
<summary><code>extensionMode: <a href="#extensionmode">ExtensionMode</a></code></summary>

The mode the extension is running in. This is specific to the current
extension. One extension may be in `ExtensionMode.Development` while
other extensions in the host run in `ExtensionMode.Release`.

**只读**: 是

</details>

<div id="plugincontext-extension"></div>

<details>
<summary><code>extension: <a href="#plugin">Plugin</a>&lt;any&gt; | undefined</code></summary>

The current extension instance.

**只读**: 是

</details>

<div id="plugincontext-loguri"></div>

<details>
<summary><code>logUri: <a href="#uri">Uri</a></code></summary>

The uri of a directory in which the extension can create log files. The directory might
not exist on disk and creation is up to the extension. However, the parent directory is
guaranteed to be existent.
see - workspace.fs for how to read and write files and folders from an uri.

**只读**: 是

</details>

<div id="plugincontext-languagemodelaccessinformation"></div>

<details>
<summary><code>languageModelAccessInformation: <a href="#languagemodelaccessinformation">LanguageModelAccessInformation</a></code></summary>

An object that keeps information about how this extension can use language models.

**只读**: 是

</details>

##### Methods

<div id="plugincontext-asabsolutepath"></div>

<details>
<summary><code>asAbsolutePath(relativePath: string): string;</code></summary>

Get the absolute path of a resource contained in the extension.

</details>

---

#### PortAttributesProvider {#portattributesprovider}

A provider of port attributes. Port attributes are used to determine what action should be taken when a port is discovered.

##### Methods

<div id="portattributesprovider-provideportattributes"></div>

<details>
<summary><code>providePortAttributes(attributes: &#123; port: number; pid?: number; commandLine?: string &#125;, token: CancellationToken): ProviderResult&lt;PortAttributes&gt;;</code></summary>

Provides attributes for the given port. For ports that your extension doesn't know about, simply
return undefined. For example, if `providePortAttributes` is called with ports 3000 but your
extension doesn't know anything about 3000 you should return undefined.

</details>

---

#### PortAttributesSelector {#portattributesselector}

A selector that will be used to filter which <a href="#portattributesprovider">PortAttributesProvider</a> should be called for each port.

##### Properties

<div id="portattributesselector-portrange"></div>

<details>
<summary><code>portRange: [number, number] | number</code></summary>

Specifying a port range will cause your provider to only be called for ports within the range.
The start is inclusive and the end is exclusive.

</details>

<div id="portattributesselector-commandpattern"></div>

<details>
<summary><code>commandPattern: RegExp</code></summary>

Specifying a command pattern will cause your provider to only be called for processes whose command line matches the pattern.

</details>

---

#### PreparedToolInvocation {#preparedtoolinvocation}

The result of a call to prepareInvocation.

##### Properties

<div id="preparedtoolinvocation-invocationmessage"></div>

<details>
<summary><code>invocationMessage: string | <a href="#markdownstring">MarkdownString</a></code></summary>

A customized progress message to show while the tool runs.

</details>

<div id="preparedtoolinvocation-confirmationmessages"></div>

<details>
<summary><code>confirmationMessages: <a href="#languagemodeltoolconfirmationmessages">LanguageModelToolConfirmationMessages</a></code></summary>

The presence of this property indicates that the user should be asked to confirm before running the tool. The user
should be asked for confirmation for any tool that has a side-effect or may potentially be dangerous.

</details>

---

#### Problem {#problem}

##### Properties

<div id="problem-name"></div>

<details>
<summary><code>name: string</code></summary>

显示在问题表格内的名称

</details>

<div id="problem-position"></div>

<details>
<summary><code>position: string</code></summary>

位置字段

</details>

<div id="problem-message"></div>

<details>
<summary><code>message: string</code></summary>

The diagnostic's message. It usually appears in the user interface

</details>

<div id="problem-range"></div>

<details>
<summary><code>range: string</code></summary>

</details>

<div id="problem-id"></div>

<details>
<summary><code>id: string</code></summary>

跳转位置的id

</details>

<div id="problem-severity"></div>

<details>
<summary><code>severity: <a href="#diagnosticseverity">DiagnosticSeverity</a></code></summary>

The diagnostic's severity. Can be omitted. If omitted it is up to the
client to interpret diagnostics as error, warning, info or hint.

</details>

<div id="problem-code"></div>

<details>
<summary><code>code: number | string</code></summary>

The diagnostic's code, which usually appear in the user interface.

</details>

<div id="problem-codedescription"></div>

<details>
<summary><code>codeDescription: <a href="#codedescription">CodeDescription</a></code></summary>

An optional property to describe the error code.
Requires the code field (above) to be present/not null.

</details>

<div id="problem-source"></div>

<details>
<summary><code>source: string</code></summary>

A human-readable string describing the source of this
diagnostic, e.g. 'typescript' or 'super lint'. It usually
appears in the user interface.

</details>

<div id="problem-tags"></div>

<details>
<summary><code>tags: <a href="#diagnostictag">DiagnosticTag</a>[]</code></summary>

Additional metadata about the diagnostic.

</details>

<div id="problem-relatedinformation"></div>

<details>
<summary><code>relatedInformation: <a href="#diagnosticrelatedinformation">DiagnosticRelatedInformation</a>[]</code></summary>

An array of related diagnostic information, e.g. when symbol-names within
a scope collide all definitions can be marked via this property.

</details>

<div id="problem-data"></div>

<details>
<summary><code>data: any</code></summary>

A data entry field that is preserved between a `textDocument/publishDiagnostics`
notification and `textDocument/codeAction` request.

</details>

<div id="problem-decoratoruri"></div>

<details>
<summary><code>decoratorUri: string</code></summary>

</details>

---

#### ProblemLocation {#problemlocation}

##### Properties

<div id="problemlocation-desc"></div>

<details>
<summary><code>desc: string</code></summary>

</details>

<div id="problemlocation-uri"></div>

<details>
<summary><code>uri: string</code></summary>

</details>

<div id="problemlocation-position"></div>

<details>
<summary><code>position: <a href="#range">Range</a></code></summary>

</details>

---

#### ProcessExecutionOptions {#processexecutionoptions}

##### Properties

<div id="processexecutionoptions-cwd"></div>

<details>
<summary><code>cwd: string</code></summary>

The current working directory of the executed program or shell.
If omitted the tools current workspace root is used.

</details>

<div id="processexecutionoptions-env"></div>

<details>
<summary><code>env: &#123; [key: string]: string &#125;</code></summary>

The additional environment of the executed program or shell. If omitted
the parent process' environment is used. If provided it is merged with
the parent process' environment.

</details>

---

#### ProfileContentHandler {#profilecontenthandler}

##### Properties

<div id="profilecontenthandler-name"></div>

<details>
<summary><code>name: string</code></summary>

**只读**: 是

</details>

##### Methods

<div id="profilecontenthandler-saveprofile"></div>

<details>
<summary><code>saveProfile(name: string, content: string, token: CancellationToken): Thenable&lt;Uri | null&gt;;</code></summary>

</details>

<div id="profilecontenthandler-readprofile"></div>

<details>
<summary><code>readProfile(uri: Uri, token: CancellationToken): Thenable&lt;string | null&gt;;</code></summary>

</details>

---

#### Progress {#progress}

Defines a generalized way of reporting progress updates.

##### Methods

<div id="progress-report"></div>

<details>
<summary><code>report(value: T): void;</code></summary>

Report a progress update.

</details>

---

#### ProgressOptions {#progressoptions}

Value-object describing where and how progress should show.

##### Properties

<div id="progressoptions-location"></div>

<details>
<summary><code>location: <a href="#progresslocation">ProgressLocation</a> | &#123; viewId: string &#125;</code></summary>

The location at which progress should show.

</details>

<div id="progressoptions-title"></div>

<details>
<summary><code>title: string</code></summary>

A human-readable string which will be used to describe the
operation.

</details>

<div id="progressoptions-cancellable"></div>

<details>
<summary><code>cancellable: boolean</code></summary>

Controls if a cancel button should show to allow the user to
cancel the long running operation.  Note that currently only
`ProgressLocation.Notification` is supporting to show a cancel
button.

</details>

---

#### PseudoTerminalOptions {#pseudoterminaloptions}

Options a virtual process terminal.

##### Properties

<div id="pseudoterminaloptions-name"></div>

<details>
<summary><code>name: string</code></summary>

The name of the terminal.

</details>

<div id="pseudoterminaloptions-pty"></div>

<details>
<summary><code>pty: Pseudoterminal</code></summary>

An implementation of Pseudoterminal where an extension can
control it.

</details>

---

#### QuickInput {#quickinput}

A light-weight user input UI that is initially not visible. After
configuring it through its properties the extension can make it
visible by calling [QuickInput.show](#QuickInput.show).

There are several reasons why this UI might have to be hidden and
the extension will be notified through [QuickInput.onDidHide](#QuickInput.onDidHide).
(Examples include: an explicit call to [QuickInput.hide](#QuickInput.hide),
the user pressing Esc, some other input UI opening, etc.)

A user pressing Enter or some other gesture implying acceptance
of the current state does not automatically hide this UI component.
It is up to the extension to decide whether to accept the user's input
and if the UI should indeed be hidden through a call to [QuickInput.hide](#QuickInput.hide).

When the extension no longer needs this input UI, it should
[QuickInput.dispose](#QuickInput.dispose) it to allow for freeing up
any resources associated with it.

See <a href="#quickpick">QuickPick</a> and <a href="#inputbox">InputBox</a> for concrete UIs.

##### Properties

<div id="quickinput-title"></div>

<details>
<summary><code>title: string | undefined</code></summary>

An optional title.

</details>

<div id="quickinput-step"></div>

<details>
<summary><code>step: number | undefined</code></summary>

An optional current step count.

</details>

<div id="quickinput-totalsteps"></div>

<details>
<summary><code>totalSteps: number | undefined</code></summary>

An optional total step count.

</details>

<div id="quickinput-enabled"></div>

<details>
<summary><code>enabled: boolean</code></summary>

If the UI should allow for user input. Defaults to true.

Change this to false, e.g., while validating user input or
loading data for the next step in user input.

</details>

<div id="quickinput-busy"></div>

<details>
<summary><code>busy: boolean</code></summary>

If the UI should show a progress indicator. Defaults to false.

Change this to true, e.g., while loading more data or validating
user input.

</details>

<div id="quickinput-ignorefocusout"></div>

<details>
<summary><code>ignoreFocusOut: boolean</code></summary>

If the UI should stay open even when loosing UI focus. Defaults to false.

</details>

<div id="quickinput-ondidhide"></div>

<details>
<summary><code>onDidHide: <a href="#event">Event</a>&lt;void&gt;</code></summary>

An event signaling when this input UI is hidden.

There are several reasons why this UI might have to be hidden and
the extension will be notified through [QuickInput.onDidHide](#QuickInput.onDidHide).
(Examples include: an explicit call to [QuickInput.hide](#QuickInput.hide),
the user pressing Esc, some other input UI opening, etc.)

</details>

##### Methods

<div id="quickinput-show"></div>

<details>
<summary><code>show(): void;</code></summary>

Makes the input UI visible in its current configuration. Any other input
UI will first fire an [QuickInput.onDidHide](#QuickInput.onDidHide) event.

</details>

<div id="quickinput-hide"></div>

<details>
<summary><code>hide(): void;</code></summary>

Hides this input UI. This will also fire an [QuickInput.onDidHide](#QuickInput.onDidHide)
event.

</details>

<div id="quickinput-dispose"></div>

<details>
<summary><code>dispose(): void;</code></summary>

Dispose of this input UI and any associated resources. If it is still
visible, it is first hidden. After this call the input UI is no longer
functional and no additional methods or properties on it should be
accessed. Instead a new input UI should be created.

</details>

---

#### QuickInputButton {#quickinputbutton}

Button for an action in a <a href="#quickpick">QuickPick</a> or <a href="#inputbox">InputBox</a>.

##### Properties

<div id="quickinputbutton-iconpath"></div>

<details>
<summary><code>iconPath: <a href="#iconpath">IconPath</a></code></summary>

Icon for the button.

**只读**: 是

</details>

<div id="quickinputbutton-tooltip"></div>

<details>
<summary><code>tooltip: string | undefined</code></summary>

An optional tooltip.

**只读**: 是

</details>

---

#### QuickPick {#quickpick}

A concrete <a href="#quickinput">QuickInput</a> to let the user pick an item from a
list of items of type T. The items can be filtered through a filter text field and
there is an option canSelectMany to allow for
selecting multiple items.

Note that in many cases the more convenient [window.showQuickPick](#window.showQuickPick)
is easier to use. [window.createQuickPick](#window.createQuickPick) should be used
when [window.showQuickPick](#window.showQuickPick) does not offer the required flexibility.

##### Properties

<div id="quickpick-value"></div>

<details>
<summary><code>value: string</code></summary>

Current value of the filter text.

</details>

<div id="quickpick-placeholder"></div>

<details>
<summary><code>placeholder: string | undefined</code></summary>

Optional placeholder in the filter text.

</details>

<div id="quickpick-ondidchangevalue"></div>

<details>
<summary><code>onDidChangeValue: <a href="#event">Event</a>&lt;string&gt;</code></summary>

An event signaling when the value of the filter text has changed.

**只读**: 是

</details>

<div id="quickpick-ondidaccept"></div>

<details>
<summary><code>onDidAccept: <a href="#event">Event</a>&lt;void&gt;</code></summary>

An event signaling when the user indicated acceptance of the selected item(s).

**只读**: 是

</details>

<div id="quickpick-buttons"></div>

<details>
<summary><code>buttons: ReadonlyArray&lt;<a href="#quickinputbutton">QuickInputButton</a>&gt;</code></summary>

Buttons for actions in the UI.

</details>

<div id="quickpick-ondidtriggerbutton"></div>

<details>
<summary><code>onDidTriggerButton: <a href="#event">Event</a>&lt;<a href="#quickinputbutton">QuickInputButton</a>&gt;</code></summary>

An event signaling when a button was triggered.

**只读**: 是

</details>

<div id="quickpick-ondidtriggeritembutton"></div>

<details>
<summary><code>onDidTriggerItemButton: <a href="#event">Event</a>&lt;<a href="#quickpickitembuttonevent">QuickPickItemButtonEvent</a>&lt;T&gt;&gt;</code></summary>

An event signaling when a button in a particular <a href="#quickpickitem">QuickPickItem</a> was triggered.
This event does not fire for buttons in the title bar.

**只读**: 是

</details>

<div id="quickpick-items"></div>

<details>
<summary><code>items: readonly T[]</code></summary>

Items to pick from.

</details>

<div id="quickpick-canselectmany"></div>

<details>
<summary><code>canSelectMany: boolean</code></summary>

If multiple items can be selected at the same time. Defaults to false.

</details>

<div id="quickpick-matchondescription"></div>

<details>
<summary><code>matchOnDescription: boolean</code></summary>

If the filter text should also be matched against the description of the items. Defaults to false.

</details>

<div id="quickpick-matchondetail"></div>

<details>
<summary><code>matchOnDetail: boolean</code></summary>

If the filter text should also be matched against the detail of the items. Defaults to false.

</details>

<div id="quickpick-keepscrollposition"></div>

<details>
<summary><code>keepScrollPosition: boolean</code></summary>

</details>

<div id="quickpick-activeitems"></div>

<details>
<summary><code>activeItems: readonly T[]</code></summary>

Active items. This can be read and updated by the extension.

</details>

<div id="quickpick-ondidchangeactive"></div>

<details>
<summary><code>onDidChangeActive: <a href="#event">Event</a>&lt;readonly T[]&gt;</code></summary>

An event signaling when the active items have changed.

**只读**: 是

</details>

<div id="quickpick-selecteditems"></div>

<details>
<summary><code>selectedItems: readonly T[]</code></summary>

Selected items. This can be read and updated by the extension.

</details>

<div id="quickpick-ondidchangeselection"></div>

<details>
<summary><code>onDidChangeSelection: <a href="#event">Event</a>&lt;readonly T[]&gt;</code></summary>

An event signaling when the selected items have changed.

**只读**: 是

</details>

---

#### QuickPickItem {#quickpickitem}

Represents an item that can be selected from a list of items.

##### Properties

<div id="quickpickitem-label"></div>

<details>
<summary><code>label: string</code></summary>

A human-readable string which is rendered prominent. Supports rendering of <a href="#themeicon">theme icons</a> via
the `$(&lt;name&gt;)`-syntax.

</details>

<div id="quickpickitem-kind"></div>

<details>
<summary><code>kind: <a href="#quickpickitemkind">QuickPickItemKind</a></code></summary>

Defaults to Default. If set to Separator, the item will not be displayed as a row but only as a separator,
and all fields other than label will be ignored.

</details>

<div id="quickpickitem-iconpath"></div>

<details>
<summary><code>iconPath: <a href="#iconpath">IconPath</a></code></summary>

The icon path or <a href="#themeicon">ThemeIcon</a> for the QuickPickItem.

</details>

<div id="quickpickitem-description"></div>

<details>
<summary><code>description: string</code></summary>

A human-readable string which is rendered less prominent in the same line. Supports rendering of
<a href="#themeicon">theme icons</a> via the `$(&lt;name&gt;)`-syntax.

Note: this property is ignored when kind is set to Separator

</details>

<div id="quickpickitem-detail"></div>

<details>
<summary><code>detail: string</code></summary>

A human-readable string which is rendered less prominent in a separate line. Supports rendering of
<a href="#themeicon">theme icons</a> via the `$(&lt;name&gt;)`-syntax.

Note: this property is ignored when kind is set to Separator

</details>

<div id="quickpickitem-picked"></div>

<details>
<summary><code>picked: boolean</code></summary>

Optional flag indicating if this item is picked initially. This is only honored when using
the () API. To do the same thing with the () API,
simply set the selectedItems to the items you want picked initially.
(*Note:* This is only honored when the picker allows multiple selections.)

</details>

<div id="quickpickitem-alwaysshow"></div>

<details>
<summary><code>alwaysShow: boolean</code></summary>

Always show this item.

Note: this property is ignored when kind is set to Separator

</details>

<div id="quickpickitem-buttons"></div>

<details>
<summary><code>buttons: readonly <a href="#quickinputbutton">QuickInputButton</a>[]</code></summary>

Optional buttons that will be rendered on this particular item. These buttons will trigger
an <a href="#quickpickitembuttonevent">QuickPickItemButtonEvent</a> when clicked. Buttons are only rendered when using a quickpick
created by the () API. Buttons are not rendered when using
the () API.

Note: this property is ignored when kind is set to Separator

</details>

---

#### QuickPickItemButtonEvent {#quickpickitembuttonevent}

An event signaling when a button in a particular <a href="#quickpickitem">QuickPickItem</a> was triggered.
This event does not fire for buttons in the title bar.

##### Properties

<div id="quickpickitembuttonevent-button"></div>

<details>
<summary><code>button: <a href="#quickinputbutton">QuickInputButton</a></code></summary>

The button that was clicked.

**只读**: 是

</details>

<div id="quickpickitembuttonevent-item"></div>

<details>
<summary><code>item: T</code></summary>

The item that the button belongs to.

**只读**: 是

</details>

---

#### QuickPickOptions {#quickpickoptions}

Options for configuration behavior of the quick pick

##### Properties

<div id="quickpickoptions-title"></div>

<details>
<summary><code>title: string</code></summary>

An optional string that represents the title of the quick pick.

</details>

<div id="quickpickoptions-matchondescription"></div>

<details>
<summary><code>matchOnDescription: boolean</code></summary>

A flag to include the description when filtering

</details>

<div id="quickpickoptions-matchondetail"></div>

<details>
<summary><code>matchOnDetail: boolean</code></summary>

A flag to include the detail when filtering

</details>

<div id="quickpickoptions-placeholder"></div>

<details>
<summary><code>placeHolder: string</code></summary>

The place holder in input box

</details>

<div id="quickpickoptions-ignorefocusout"></div>

<details>
<summary><code>ignoreFocusOut: boolean</code></summary>

If `true` prevent picker closing when it's loses focus

</details>

<div id="quickpickoptions-canpickmany"></div>

<details>
<summary><code>canPickMany: boolean</code></summary>

If `true` make picker accept multiple selections.
Not implemented yet

</details>

##### Methods

<div id="quickpickoptions-ondidselectitem"></div>

<details>
<summary><code>onDidSelectItem?(item: QuickPickItem | string): any;</code></summary>

Function that is invoked when item selected

</details>

---

#### ReferenceContext {#referencecontext}

Value-object that contains additional information when
requesting references.

##### Properties

<div id="referencecontext-includedeclaration"></div>

<details>
<summary><code>includeDeclaration: boolean</code></summary>

Include the declaration of the current symbol.

</details>

---

#### ReferenceProvider {#referenceprovider}

The reference provider interface defines the contract between extensions and
the [find references](https://code.visualstudio.com/docs/editor/editingevolved#_peek)-feature.

##### Methods

<div id="referenceprovider-providereferences"></div>

<details>
<summary><code>provideReferences(document: TextDocument, position: Position, context: ReferenceContext, token: CancellationToken): ProviderResult&lt;Location[]&gt;;</code></summary>

Provide a set of project-wide references for the given position and document.

</details>

---

#### RenameProvider {#renameprovider}

The rename provider interface defines the contract between extensions and
the [rename](https://code.visualstudio.com/docs/editor/editingevolved#_rename-symbol)-feature.

##### Methods

<div id="renameprovider-providerenameedits"></div>

<details>
<summary><code>provideRenameEdits(document: TextDocument, position: Position, newName: string, token: CancellationToken): ProviderResult&lt;WorkspaceEdit&gt;;</code></summary>

Provide an edit that describes changes that have to be made to one
or many resources to rename a symbol to a different name.

</details>

<div id="renameprovider-preparerename"></div>

<details>
<summary><code>prepareRename?(document: TextDocument, position: Position, token: CancellationToken): ProviderResult&lt;Range | &#123; range: Range, placeholder: string &#125;&gt;;</code></summary>

Optional function for resolving and validating a position *before* running rename. The result can
be a range or a range and a placeholder text. The placeholder text should be the identifier of the symbol
which is being renamed - when omitted the text in the returned range is used.

</details>

---

#### ResourceLabelFormatter {#resourcelabelformatter}

##### Properties

<div id="resourcelabelformatter-scheme"></div>

<details>
<summary><code>scheme: string</code></summary>

</details>

<div id="resourcelabelformatter-authority"></div>

<details>
<summary><code>authority: string</code></summary>

</details>

<div id="resourcelabelformatter-formatting"></div>

<details>
<summary><code>formatting: <a href="#resourcelabelformatting">ResourceLabelFormatting</a></code></summary>

</details>

---

#### ResourceLabelFormatting {#resourcelabelformatting}

##### Properties

<div id="resourcelabelformatting-label"></div>

<details>
<summary><code>label: string</code></summary>

</details>

<div id="resourcelabelformatting-separator"></div>

<details>
<summary><code>separator: '/' | '\\' | ''</code></summary>

</details>

<div id="resourcelabelformatting-tildify"></div>

<details>
<summary><code>tildify: boolean</code></summary>

</details>

<div id="resourcelabelformatting-normalizedriveletter"></div>

<details>
<summary><code>normalizeDriveLetter: boolean</code></summary>

</details>

<div id="resourcelabelformatting-workspacesuffix"></div>

<details>
<summary><code>workspaceSuffix: string</code></summary>

</details>

<div id="resourcelabelformatting-authorityprefix"></div>

<details>
<summary><code>authorityPrefix: string</code></summary>

</details>

---

#### RunOptions {#runoptions}

Run options for a task.

##### Properties

<div id="runoptions-reevaluateonrerun"></div>

<details>
<summary><code>reevaluateOnRerun: boolean</code></summary>

Controls whether task variables are re-evaluated on rerun.

</details>

---

#### SaveDialogOptions {#savedialogoptions}

Options to configure the behaviour of a file save dialog.

##### Properties

<div id="savedialogoptions-title"></div>

<details>
<summary><code>title: string</code></summary>

Dialog title.
This parameter might be ignored, as not all operating systems display a title on save dialogs.

</details>

<div id="savedialogoptions-defaulturi"></div>

<details>
<summary><code>defaultUri: <a href="#uri">Uri</a></code></summary>

The resource the dialog shows when opened.

</details>

<div id="savedialogoptions-savelabel"></div>

<details>
<summary><code>saveLabel: string</code></summary>

A human-readable string for the save button.

</details>

<div id="savedialogoptions-filters"></div>

<details>
<summary><code>filters: &#123; [name: string]: string[] &#125;</code></summary>

A set of file filters that are used by the dialog. Each entry is a human readable label,
like "TypeScript", and an array of extensions, e.g.
```ts
&#123;
 'Images': ['png', 'jpg']
 'TypeScript': ['ts', 'tsx']
&#125;
```

</details>

---

#### SecretStorage {#secretstorage}

Represents a storage utility for secrets, information that is
sensitive.

##### Properties

<div id="secretstorage-ondidchange"></div>

<details>
<summary><code>onDidChange: <a href="#event">Event</a>&lt;<a href="#secretstoragechangeevent">SecretStorageChangeEvent</a>&gt;</code></summary>

Fires when a secret is stored or deleted.

</details>

##### Methods

<div id="secretstorage-get"></div>

<details>
<summary><code>get(key: string): Thenable&lt;string | undefined&gt;;</code></summary>

Retrieve a secret that was stored with key. Returns undefined if there
is no password matching that key.

</details>

<div id="secretstorage-store"></div>

<details>
<summary><code>store(key: string, value: string): Thenable&lt;void&gt;;</code></summary>

Store a secret under a given key.

</details>

<div id="secretstorage-delete"></div>

<details>
<summary><code>delete(key: string): Thenable&lt;void&gt;;</code></summary>

Remove a secret from storage.

</details>

---

#### SecretStorageChangeEvent {#secretstoragechangeevent}

The event data that is fired when a secret is added or removed.

##### Properties

<div id="secretstoragechangeevent-key"></div>

<details>
<summary><code>key: string</code></summary>

The key of the secret that has changed.

**只读**: 是

</details>

---

#### SelectedCompletionInfo {#selectedcompletioninfo}

Describes the currently selected completion item.

##### Properties

<div id="selectedcompletioninfo-range"></div>

<details>
<summary><code>range: <a href="#range">Range</a></code></summary>

The range that will be replaced if this completion item is accepted.

**只读**: 是

</details>

<div id="selectedcompletioninfo-text"></div>

<details>
<summary><code>text: string</code></summary>

The text the range will be replaced with if this completion is accepted.

**只读**: 是

</details>

---

#### SelectionRangeProvider {#selectionrangeprovider}

##### Methods

<div id="selectionrangeprovider-provideselectionranges"></div>

<details>
<summary><code>provideSelectionRanges(document: TextDocument, positions: Position[], token: CancellationToken): ProviderResult&lt;SelectionRange[]&gt;;</code></summary>

Provide selection ranges for the given positions.

Selection ranges should be computed individually and independent for each position. The editor will merge
and deduplicate ranges but providers must return hierarchies of selection ranges so that a range
is contained by its parent.

</details>

---

#### ShareableItem {#shareableitem}

Data about an item which can be shared.

##### Properties

<div id="shareableitem-resourceuri"></div>

<details>
<summary><code>resourceUri: <a href="#uri">Uri</a></code></summary>

A resource in the workspace that can be shared.

</details>

<div id="shareableitem-selection"></div>

<details>
<summary><code>selection: <a href="#range">Range</a></code></summary>

If present, a selection within the `resourceUri`.

</details>

---

#### ShareProvider {#shareprovider}

A provider which generates share links for resources in the editor.

##### Properties

<div id="shareprovider-id"></div>

<details>
<summary><code>id: string</code></summary>

A unique ID for the provider.
This will be used to activate specific extensions contributing share providers if necessary.

**只读**: 是

</details>

<div id="shareprovider-label"></div>

<details>
<summary><code>label: string</code></summary>

A label which will be used to present this provider's options in the UI.

**只读**: 是

</details>

<div id="shareprovider-priority"></div>

<details>
<summary><code>priority: number</code></summary>

The order in which the provider should be listed in the UI when there are multiple providers.

**只读**: 是

</details>

##### Methods

<div id="shareprovider-provideshare"></div>

<details>
<summary><code>provideShare(item: ShareableItem, token: CancellationToken): ProviderResult&lt;Uri | string&gt;;</code></summary>

</details>

---

#### ShellExecutionOptions {#shellexecutionoptions}

##### Properties

<div id="shellexecutionoptions-executable"></div>

<details>
<summary><code>executable: string</code></summary>

The shell executable

</details>

<div id="shellexecutionoptions-shellargs"></div>

<details>
<summary><code>shellArgs: string[]</code></summary>

The arguments to be passed to the shell executable used to run the task. Most shells
require special arguments to execute a command. For  example `bash` requires the `-c`
argument to execute a command, `PowerShell` requires `-Command` and `cmd` requires both
`/d` and `/c`.

</details>

<div id="shellexecutionoptions-shellquoting"></div>

<details>
<summary><code>shellQuoting: <a href="#shellquotingoptions">ShellQuotingOptions</a></code></summary>

The shell quotes supported by this shell

</details>

<div id="shellexecutionoptions-cwd"></div>

<details>
<summary><code>cwd: string</code></summary>

The current working directory of the executed shell.
If omitted the tools current workspace root is used.

</details>

<div id="shellexecutionoptions-env"></div>

<details>
<summary><code>env: &#123; [key: string]: string &#125;</code></summary>

The additional environment of the executed shell. If omitted
the parent process' environment is used. If provided it is merged with
the parent process' environment.

</details>

---

#### ShellQuotedString {#shellquotedstring}

A string that will be quoted depending on the used shell.

##### Properties

<div id="shellquotedstring-value"></div>

<details>
<summary><code>value: string</code></summary>

The actual string value

</details>

<div id="shellquotedstring-quoting"></div>

<details>
<summary><code>quoting: <a href="#shellquoting">ShellQuoting</a></code></summary>

The quoting style to use

</details>

---

#### ShellQuotingOptions {#shellquotingoptions}

##### Properties

<div id="shellquotingoptions-escape"></div>

<details>
<summary><code>escape: string | &#123; escapeChar: string; charsToEscape: string; &#125;</code></summary>

The character used to do character escaping. If a string is provided only spaces
are escaped. If a `&#123; escapeChar, charsToEscape &#125;` literal is provide all characters
in `charsToEscape` are escaped using the `escapeChar`.

</details>

<div id="shellquotingoptions-strong"></div>

<details>
<summary><code>strong: string</code></summary>

The character used for strong quoting. The string's length must be 1

</details>

<div id="shellquotingoptions-weak"></div>

<details>
<summary><code>weak: string</code></summary>

The character used for weak quoting. The string's length must be 1

</details>

---

#### SignatureHelpContext {#signaturehelpcontext}

Additional information about the context in which a
[`SignatureHelpProvider`](#SignatureHelpProvider.provideSignatureHelp) was triggered.

##### Properties

<div id="signaturehelpcontext-triggerkind"></div>

<details>
<summary><code>triggerKind: <a href="#signaturehelptriggerkind">SignatureHelpTriggerKind</a></code></summary>

Action that caused signature help to be triggered.

**只读**: 是

</details>

<div id="signaturehelpcontext-triggercharacter"></div>

<details>
<summary><code>triggerCharacter: string</code></summary>

Character that caused signature help to be triggered.

This is `undefined` when signature help is not triggered by typing, such as when manually invoking
signature help or when moving the cursor.

**只读**: 是

</details>

<div id="signaturehelpcontext-isretrigger"></div>

<details>
<summary><code>isRetrigger: boolean</code></summary>

`true` if signature help was already showing when it was triggered.

Retriggers occur when the signature help is already active and can be caused by actions such as
typing a trigger character, a cursor move, or document content changes.

**只读**: 是

</details>

<div id="signaturehelpcontext-activesignaturehelp"></div>

<details>
<summary><code>activeSignatureHelp: <a href="#signaturehelp">SignatureHelp</a> | undefined</code></summary>

The currently active [`SignatureHelp`](#SignatureHelp).

The `activeSignatureHelp` has its [`SignatureHelp.activeSignature`] field updated based on
the user arrowing through available signatures.

**只读**: 是

</details>

---

#### SignatureHelpProvider {#signaturehelpprovider}

The signature help provider interface defines the contract between extensions and
the [parameter hints](https://code.visualstudio.com/docs/editor/intellisense)-feature.

##### Methods

<div id="signaturehelpprovider-providesignaturehelp"></div>

<details>
<summary><code>provideSignatureHelp(document: TextDocument, position: Position, token: CancellationToken, context: SignatureHelpContext): ProviderResult&lt;SignatureHelp&gt;;</code></summary>

Provide help for the signature at the given position and document.

</details>

---

#### SignatureHelpProviderMetadata {#signaturehelpprovidermetadata}

Metadata about a registered [`SignatureHelpProvider`](#SignatureHelpProvider).

##### Properties

<div id="signaturehelpprovidermetadata-triggercharacters"></div>

<details>
<summary><code>triggerCharacters: ReadonlyArray&lt;string&gt;</code></summary>

List of characters that trigger signature help.

**只读**: 是

</details>

<div id="signaturehelpprovidermetadata-retriggercharacters"></div>

<details>
<summary><code>retriggerCharacters: ReadonlyArray&lt;string&gt;</code></summary>

List of characters that re-trigger signature help.

These trigger characters are only active when signature help is already showing. All trigger characters
are also counted as re-trigger characters.

**只读**: 是

</details>

---

#### SourceControl {#sourcecontrol}

##### Properties

<div id="sourcecontrol-selected"></div>

<details>
<summary><code>selected: boolean</code></summary>

Whether the source control is selected.

**只读**: 是

</details>

<div id="sourcecontrol-ondidchangeselection"></div>

<details>
<summary><code>onDidChangeSelection: <a href="#event">Event</a>&lt;boolean&gt;</code></summary>

An event signaling when the selection state changes.

**只读**: 是

</details>

---

#### SourceControl {#sourcecontrol}

An source control is able to provide <a href="#sourcecontrolresourcestate">resource states</a>
to the editor and interact with the editor in several source control related ways.

##### Properties

<div id="sourcecontrol-id"></div>

<details>
<summary><code>id: string</code></summary>

The id of this source control.

**只读**: 是

</details>

<div id="sourcecontrol-label"></div>

<details>
<summary><code>label: string</code></summary>

The human-readable label of this source control.

**只读**: 是

</details>

<div id="sourcecontrol-rooturi"></div>

<details>
<summary><code>rootUri: <a href="#uri">Uri</a> | undefined</code></summary>

The (optional) Uri of the root of this source control.

**只读**: 是

</details>

<div id="sourcecontrol-inputbox"></div>

<details>
<summary><code>inputBox: <a href="#sourcecontrolinputbox">SourceControlInputBox</a></code></summary>

The <a href="#sourcecontrolinputbox">input box</a> for this source control.

**只读**: 是

</details>

<div id="sourcecontrol-count"></div>

<details>
<summary><code>count: number</code></summary>

The UI-visible count of <a href="#sourcecontrolresourcestate">resource states</a> of
this source control.

Equals to the total number of <a href="#sourcecontrolresourcestate">resource state</a>
of this source control, if undefined.

</details>

<div id="sourcecontrol-quickdiffprovider"></div>

<details>
<summary><code>quickDiffProvider: QuickDiffProvider</code></summary>

An optional quick diff provider.

</details>

<div id="sourcecontrol-committemplate"></div>

<details>
<summary><code>commitTemplate: string</code></summary>

Optional commit template string.

The Source Control viewlet will populate the Source Control
input with this value when appropriate.

</details>

<div id="sourcecontrol-acceptinputcommand"></div>

<details>
<summary><code>acceptInputCommand: <a href="#command">Command</a></code></summary>

Optional accept input command.

This command will be invoked when the user accepts the value
in the Source Control input.

</details>

<div id="sourcecontrol-statusbarcommands"></div>

<details>
<summary><code>statusBarCommands: <a href="#command">Command</a>[]</code></summary>

Optional status bar commands.

These commands will be displayed in the editor's status bar.

</details>

##### Methods

<div id="sourcecontrol-createresourcegroup"></div>

<details>
<summary><code>createResourceGroup(id: string, label: string): SourceControlResourceGroup;</code></summary>

Create a new <a href="#sourcecontrolresourcegroup">resource group</a>.

</details>

<div id="sourcecontrol-dispose"></div>

<details>
<summary><code>dispose(): void;</code></summary>

Dispose this source control.

</details>

---

#### SourceControlInputBox {#sourcecontrolinputbox}

Represents the input box in the Source Control viewlet.

##### Properties

<div id="sourcecontrolinputbox-value"></div>

<details>
<summary><code>value: string</code></summary>

Setter and getter for the contents of the input box.

</details>

<div id="sourcecontrolinputbox-placeholder"></div>

<details>
<summary><code>placeholder: string</code></summary>

A string to show as place holder in the input box to guide the user.

</details>

<div id="sourcecontrolinputbox-visible"></div>

<details>
<summary><code>visible: boolean</code></summary>

Controls whether the input box is visible (default is true).

</details>

<div id="sourcecontrolinputbox-enabled"></div>

<details>
<summary><code>enabled: boolean</code></summary>

Controls whether the input box is enabled (default is `true`).

</details>

---

#### SourceControlInputBox {#sourcecontrolinputbox}

Represents the input box in the Source Control viewlet.

##### Methods

<div id="sourcecontrolinputbox-validateinput"></div>

<details>
<summary><code>validateInput?(value: string, cursorPosition: number): ProviderResult&lt;SourceControlInputBoxValidation | undefined | null&gt;;</code></summary>

A validation function for the input box. It's possible to change
the validation provider simply by setting this property to a different function.

</details>

---

#### SourceControlInputBoxValidation {#sourcecontrolinputboxvalidation}

##### Properties

<div id="sourcecontrolinputboxvalidation-message"></div>

<details>
<summary><code>message: string</code></summary>

The validation message to display.

**只读**: 是

</details>

<div id="sourcecontrolinputboxvalidation-type"></div>

<details>
<summary><code>type: <a href="#sourcecontrolinputboxvalidationtype">SourceControlInputBoxValidationType</a></code></summary>

The validation type.

**只读**: 是

</details>

---

#### SourceControlResourceDecorations {#sourcecontrolresourcedecorations}

##### Properties

<div id="sourcecontrolresourcedecorations-source"></div>

<details>
<summary><code>source: string</code></summary>

</details>

<div id="sourcecontrolresourcedecorations-letter"></div>

<details>
<summary><code>letter: string</code></summary>

</details>

<div id="sourcecontrolresourcedecorations-color"></div>

<details>
<summary><code>color: <a href="#themecolor">ThemeColor</a></code></summary>

</details>

---

#### SourceControlResourceDecorations {#sourcecontrolresourcedecorations}

The decorations for a <a href="#sourcecontrolresourcestate">source control resource state</a>.
Can be independently specified for light and dark themes.

##### Properties

<div id="sourcecontrolresourcedecorations-strikethrough"></div>

<details>
<summary><code>strikeThrough: boolean</code></summary>

Whether the <a href="#sourcecontrolresourcestate">source control resource state</a> should
be striked-through in the UI.

**只读**: 是

</details>

<div id="sourcecontrolresourcedecorations-faded"></div>

<details>
<summary><code>faded: boolean</code></summary>

Whether the <a href="#sourcecontrolresourcestate">source control resource state</a> should
be faded in the UI.

**只读**: 是

</details>

<div id="sourcecontrolresourcedecorations-tooltip"></div>

<details>
<summary><code>tooltip: string</code></summary>

The title for a specific
<a href="#sourcecontrolresourcestate">source control resource state</a>.

**只读**: 是

</details>

<div id="sourcecontrolresourcedecorations-light"></div>

<details>
<summary><code>light: <a href="#sourcecontrolresourcethemabledecorations">SourceControlResourceThemableDecorations</a></code></summary>

The light theme decorations.

**只读**: 是

</details>

<div id="sourcecontrolresourcedecorations-dark"></div>

<details>
<summary><code>dark: <a href="#sourcecontrolresourcethemabledecorations">SourceControlResourceThemableDecorations</a></code></summary>

The dark theme decorations.

**只读**: 是

</details>

---

#### SourceControlResourceGroup {#sourcecontrolresourcegroup}

A source control resource group is a collection of
<a href="#sourcecontrolresourcestate">source control resource states</a>.

##### Properties

<div id="sourcecontrolresourcegroup-id"></div>

<details>
<summary><code>id: string</code></summary>

The id of this source control resource group.

**只读**: 是

</details>

<div id="sourcecontrolresourcegroup-label"></div>

<details>
<summary><code>label: string</code></summary>

The label of this source control resource group.

</details>

<div id="sourcecontrolresourcegroup-hidewhenempty"></div>

<details>
<summary><code>hideWhenEmpty: boolean</code></summary>

Whether this source control resource group is hidden when it contains
no <a href="#sourcecontrolresourcestate">source control resource states</a>.

</details>

<div id="sourcecontrolresourcegroup-resourcestates"></div>

<details>
<summary><code>resourceStates: <a href="#sourcecontrolresourcestate">SourceControlResourceState</a>[]</code></summary>

This group's collection of
<a href="#sourcecontrolresourcestate">source control resource states</a>.

</details>

##### Methods

<div id="sourcecontrolresourcegroup-dispose"></div>

<details>
<summary><code>dispose(): void;</code></summary>

Dispose this source control resource group.

</details>

---

#### SourceControlResourceState {#sourcecontrolresourcestate}

An source control resource state represents the state of an underlying workspace
resource within a certain <a href="#sourcecontrolresourcegroup">source control group</a>.

##### Properties

<div id="sourcecontrolresourcestate-resourceuri"></div>

<details>
<summary><code>resourceUri: <a href="#uri">Uri</a></code></summary>

The <a href="#uri">uri</a> of the underlying resource inside the workspace.

**只读**: 是

</details>

<div id="sourcecontrolresourcestate-command"></div>

<details>
<summary><code>command: <a href="#command">Command</a></code></summary>

The <a href="#command">command</a> which should be run when the resource
state is open in the Source Control viewlet.

**只读**: 是

</details>

<div id="sourcecontrolresourcestate-decorations"></div>

<details>
<summary><code>decorations: <a href="#sourcecontrolresourcedecorations">SourceControlResourceDecorations</a></code></summary>

The <a href="#sourcecontrolresourcedecorations">decorations</a> for this source control
resource state.

**只读**: 是

</details>

<div id="sourcecontrolresourcestate-contextvalue"></div>

<details>
<summary><code>contextValue: string</code></summary>

Context value of the resource state. This can be used to contribute resource specific actions.
For example, if a resource is given a context value as `diffable`. When contributing actions to `scm/resourceState/context`
using `menus` extension point, you can specify context value for key `scmResourceState` in `when` expressions, like `scmResourceState == diffable`.
```
 "contributes": &#123;
   "menus": &#123;
     "scm/resourceState/context": [
       &#123;
         "command": "extension.diff",
         "when": "scmResourceState == diffable"
       &#125;
     ]
   &#125;
 &#125;
```
This will show action `extension.diff` only for resources with `contextValue` is `diffable`.

**只读**: 是

</details>

---

#### SourceControlResourceThemableDecorations {#sourcecontrolresourcethemabledecorations}

The theme-aware decorations for a
<a href="#sourcecontrolresourcestate">source control resource state</a>.

##### Properties

<div id="sourcecontrolresourcethemabledecorations-iconpath"></div>

<details>
<summary><code>iconPath: string | <a href="#uri">Uri</a> | <a href="#themeicon">ThemeIcon</a></code></summary>

The icon path for a specific
<a href="#sourcecontrolresourcestate">source control resource state</a>.

**只读**: 是

</details>

---

#### StatusBarItem {#statusbaritem}

A status bar item is a status bar contribution that can
show text and icons and run a command on click.

##### Properties

<div id="statusbaritem-id"></div>

<details>
<summary><code>id: string</code></summary>

The identifier of this item.

*Note*: if no identifier was provided by the <a href="#window-createstatusbaritem">createStatusBarItem</a>
method, the identifier will match the extension identifier.

**只读**: 是

</details>

<div id="statusbaritem-alignment"></div>

<details>
<summary><code>alignment: <a href="#statusbaralignment">StatusBarAlignment</a></code></summary>

The alignment of this item.

**只读**: 是

</details>

<div id="statusbaritem-priority"></div>

<details>
<summary><code>priority: number</code></summary>

The priority of this item. Higher value means the item should
be shown more to the left.

**只读**: 是

</details>

<div id="statusbaritem-name"></div>

<details>
<summary><code>name: string | undefined</code></summary>

The name of the entry, like 'Python Language Indicator', 'Git Status' etc.
Try to keep the length of the name short, yet descriptive enough that
users can understand what the status bar item is about.

</details>

<div id="statusbaritem-text"></div>

<details>
<summary><code>text: string</code></summary>

The text to show for the entry. To set a text with icon use the following pattern in text string:
$(fontawesomeClassName)

</details>

<div id="statusbaritem-tooltip"></div>

<details>
<summary><code>tooltip: string | <a href="#markdownstring">MarkdownString</a> | undefined</code></summary>

The tooltip text when you hover over this entry.

</details>

<div id="statusbaritem-color"></div>

<details>
<summary><code>color: string | <a href="#themecolor">ThemeColor</a> | undefined</code></summary>

The foreground color for this entry.

</details>

<div id="statusbaritem-backgroundcolor"></div>

<details>
<summary><code>backgroundColor: <a href="#themecolor">ThemeColor</a> | undefined</code></summary>

The background color for this entry.

*Note*: only the following colors are supported:
* `new ThemeColor('statusBarItem.errorBackground')`
* `new ThemeColor('statusBarItem.warningBackground')`

More background colors may be supported in the future.

*Note*: when a background color is set, the statusbar may override
the `color` choice to ensure the entry is readable in all themes.

</details>

<div id="statusbaritem-command"></div>

<details>
<summary><code>command: string | <a href="#command">Command</a> | undefined</code></summary>

The identifier of a command to run on click.

</details>

<div id="statusbaritem-accessibilityinformation"></div>

<details>
<summary><code>accessibilityInformation: <a href="#accessibilityinformation">AccessibilityInformation</a> | undefined</code></summary>

Accessibility information used when a screen reader interacts with this StatusBar item.

</details>

##### Methods

<div id="statusbaritem-show"></div>

<details>
<summary><code>show(): void;</code></summary>

Shows the entry in the status bar.

</details>

<div id="statusbaritem-hide"></div>

<details>
<summary><code>hide(): void;</code></summary>

Hide the entry in the status bar.

</details>

<div id="statusbaritem-dispose"></div>

<details>
<summary><code>dispose(): void;</code></summary>

Dispose and free associated resources. Hide the entry in the status bar.

</details>

---

#### Tab {#tab}

Represents a tab within a <a href="#tabgroup">group of tabs</a>.
Tabs are merely the graphical representation within the editor area.
A backing editor is not a guarantee.

##### Properties

<div id="tab-label"></div>

<details>
<summary><code>label: string</code></summary>

The text displayed on the tab.

**只读**: 是

</details>

<div id="tab-group"></div>

<details>
<summary><code>group: <a href="#tabgroup">TabGroup</a></code></summary>

The group which the tab belongs to.

**只读**: 是

</details>

<div id="tab-input"></div>

<details>
<summary><code>input: <a href="#tabinputtext">TabInputText</a> | <a href="#tabinputtextdiff">TabInputTextDiff</a> | <a href="#tabinputcustom">TabInputCustom</a> | <a href="#tabinputwebview">TabInputWebview</a> | <a href="#tabinputnotebook">TabInputNotebook</a> | <a href="#tabinputnotebookdiff">TabInputNotebookDiff</a> | <a href="#tabinputterminal">TabInputTerminal</a> | unknown</code></summary>

Defines the structure of the tab i.e. text, notebook, custom, etc.
Resource and other useful properties are defined on the tab kind.

**只读**: 是

</details>

<div id="tab-isactive"></div>

<details>
<summary><code>isActive: boolean</code></summary>

Whether or not the tab is currently active.
This is dictated by being the selected tab in the group.

**只读**: 是

</details>

<div id="tab-isdirty"></div>

<details>
<summary><code>isDirty: boolean</code></summary>

Whether or not the dirty indicator is present on the tab.

**只读**: 是

</details>

<div id="tab-ispinned"></div>

<details>
<summary><code>isPinned: boolean</code></summary>

Whether or not the tab is pinned (pin icon is present).

**只读**: 是

</details>

<div id="tab-ispreview"></div>

<details>
<summary><code>isPreview: boolean</code></summary>

Whether or not the tab is in preview mode.

**只读**: 是

</details>

---

#### TabChangeEvent {#tabchangeevent}

An event describing change to tabs.

##### Properties

<div id="tabchangeevent-opened"></div>

<details>
<summary><code>opened: readonly <a href="#tab">Tab</a>[]</code></summary>

The tabs that have been opened.

**只读**: 是

</details>

<div id="tabchangeevent-closed"></div>

<details>
<summary><code>closed: readonly <a href="#tab">Tab</a>[]</code></summary>

The tabs that have been closed.

**只读**: 是

</details>

<div id="tabchangeevent-changed"></div>

<details>
<summary><code>changed: readonly <a href="#tab">Tab</a>[]</code></summary>

Tabs that have changed, e.g have changed
their active state.

**只读**: 是

</details>

---

#### TabGroup {#tabgroup}

Represents a group of tabs. A tab group itself consists of multiple tabs.

##### Properties

<div id="tabgroup-isactive"></div>

<details>
<summary><code>isActive: boolean</code></summary>

Whether or not the group is currently active.

*Note* that only one tab group is active at a time, but that multiple tab
groups can have an active tab.

**只读**: 是

</details>

<div id="tabgroup-viewcolumn"></div>

<details>
<summary><code>viewColumn: <a href="#viewcolumn">ViewColumn</a></code></summary>

The view column of the group.

**只读**: 是

</details>

<div id="tabgroup-activetab"></div>

<details>
<summary><code>activeTab: <a href="#tab">Tab</a> | undefined</code></summary>

The active <a href="#tab">tab</a> in the group. This is the tab whose contents are currently
being rendered.

*Note* that there can be one active tab per group but there can only be one active group.

**只读**: 是

</details>

<div id="tabgroup-tabs"></div>

<details>
<summary><code>tabs: readonly <a href="#tab">Tab</a>[]</code></summary>

The list of tabs contained within the group.
This can be empty if the group has no tabs open.

**只读**: 是

</details>

---

#### TabGroupChangeEvent {#tabgroupchangeevent}

An event describing changes to tab groups.

##### Properties

<div id="tabgroupchangeevent-opened"></div>

<details>
<summary><code>opened: readonly <a href="#tabgroup">TabGroup</a>[]</code></summary>

Tab groups that have been opened.

**只读**: 是

</details>

<div id="tabgroupchangeevent-closed"></div>

<details>
<summary><code>closed: readonly <a href="#tabgroup">TabGroup</a>[]</code></summary>

Tab groups that have been closed.

**只读**: 是

</details>

<div id="tabgroupchangeevent-changed"></div>

<details>
<summary><code>changed: readonly <a href="#tabgroup">TabGroup</a>[]</code></summary>

Tab groups that have changed, e.g have changed
their active state.

**只读**: 是

</details>

---

#### TabGroups {#tabgroups}

Represents the main editor area which consists of multiple groups which contain tabs.

##### Properties

<div id="tabgroups-all"></div>

<details>
<summary><code>all: readonly <a href="#tabgroup">TabGroup</a>[]</code></summary>

All the groups within the group container.

**只读**: 是

</details>

<div id="tabgroups-activetabgroup"></div>

<details>
<summary><code>activeTabGroup: <a href="#tabgroup">TabGroup</a></code></summary>

The currently active group.

**只读**: 是

</details>

<div id="tabgroups-ondidchangetabgroups"></div>

<details>
<summary><code>onDidChangeTabGroups: <a href="#event">Event</a>&lt;<a href="#tabgroupchangeevent">TabGroupChangeEvent</a>&gt;</code></summary>

An <a href="#event">event</a> which fires when <a href="#tabgroup">tab groups</a> have changed.

**只读**: 是

</details>

<div id="tabgroups-ondidchangetabs"></div>

<details>
<summary><code>onDidChangeTabs: <a href="#event">Event</a>&lt;<a href="#tabchangeevent">TabChangeEvent</a>&gt;</code></summary>

An <a href="#event">event</a> which fires when <a href="#tab">tabs</a> have changed.

**只读**: 是

</details>

##### Methods

<div id="tabgroups-close"></div>

<details>
<summary><code>close(tab: Tab | readonly Tab[], preserveFocus?: boolean): Thenable&lt;boolean&gt;;</code></summary>

Closes the tab. This makes the tab object invalid and the tab
should no longer be used for further actions.
Note: In the case of a dirty tab, a confirmation dialog will be shown which may be cancelled. If cancelled the tab is still valid

</details>

<div id="tabgroups-close"></div>

<details>
<summary><code>close(tabGroup: TabGroup | readonly TabGroup[], preserveFocus?: boolean): Thenable&lt;boolean&gt;;</code></summary>

Closes the tab group. This makes the tab group object invalid and the tab group
should no longer be used for further actions.

</details>

---

#### TaskDefinition {#taskdefinition}

##### Properties

<div id="taskdefinition-type"></div>

<details>
<summary><code>type: string</code></summary>

The task definition describing the task provided by an extension.
Usually a task provider defines more properties to identify
a task. They need to be defined in the package.json of the
extension under the 'taskDefinitions' extension point. The npm
task definition for example looks like this
```typescript
interface NpmTaskDefinition extends TaskDefinition &#123;
    script: string;
&#125;
```

Note that type identifier starting with a '$' are reserved for internal
usages and shouldn't be used by extensions.

**只读**: 是

</details>

---

#### TaskExecution {#taskexecution}

An object representing an executed Task. It can be used
to terminate a task.

This interface is not intended to be implemented.

##### Properties

<div id="taskexecution-task"></div>

<details>
<summary><code>task: <a href="#task">Task</a></code></summary>

The task that got started.

</details>

##### Methods

<div id="taskexecution-terminate"></div>

<details>
<summary><code>terminate(): void;</code></summary>

Terminates the task execution.

</details>

---

#### TaskFilter {#taskfilter}

##### Properties

<div id="taskfilter-version"></div>

<details>
<summary><code>version: string</code></summary>

The task version as used in the tasks.json file.
The string support the package.json semver notation.

</details>

<div id="taskfilter-type"></div>

<details>
<summary><code>type: string</code></summary>

The type of tasks to return.

</details>

---

#### TaskPresentationOptions {#taskpresentationoptions}

##### Properties

<div id="taskpresentationoptions-reveal"></div>

<details>
<summary><code>reveal: <a href="#taskrevealkind">TaskRevealKind</a></code></summary>

Controls whether the task output is reveal in the user interface.
Defaults to `RevealKind.Always`.

</details>

<div id="taskpresentationoptions-echo"></div>

<details>
<summary><code>echo: boolean</code></summary>

Controls whether the command associated with the task is echoed
in the user interface.

</details>

<div id="taskpresentationoptions-focus"></div>

<details>
<summary><code>focus: boolean</code></summary>

Controls whether the panel showing the task output is taking focus.

</details>

<div id="taskpresentationoptions-panel"></div>

<details>
<summary><code>panel: <a href="#taskpanelkind">TaskPanelKind</a></code></summary>

Controls if the task panel is used for this task only (dedicated),
shared between tasks (shared) or if a new panel is created on
every task execution (new). Defaults to `TaskInstanceKind.Shared`

</details>

<div id="taskpresentationoptions-showreusemessage"></div>

<details>
<summary><code>showReuseMessage: boolean</code></summary>

Controls whether to show the "Terminal will be reused by tasks, press any key to close it" message.

</details>

<div id="taskpresentationoptions-clear"></div>

<details>
<summary><code>clear: boolean</code></summary>

Controls whether the terminal is cleared before executing the task.

</details>

<div id="taskpresentationoptions-close"></div>

<details>
<summary><code>close: boolean</code></summary>

Controls whether the terminal is closed after executing the task.

</details>

---

#### TaskProcessEndEvent {#taskprocessendevent}

An event signaling the end of a process execution
triggered through a task

##### Properties

<div id="taskprocessendevent-execution"></div>

<details>
<summary><code>execution: <a href="#taskexecution">TaskExecution</a></code></summary>

The task execution for which the process got started.

**只读**: 是

</details>

<div id="taskprocessendevent-exitcode"></div>

<details>
<summary><code>exitCode: number</code></summary>

The process's exit code.

</details>

---

#### TaskProcessStartEvent {#taskprocessstartevent}

An event signaling the start of a process execution
triggered through a task

##### Properties

<div id="taskprocessstartevent-execution"></div>

<details>
<summary><code>execution: <a href="#taskexecution">TaskExecution</a></code></summary>

The task execution for which the process got started.

**只读**: 是

</details>

<div id="taskprocessstartevent-processid"></div>

<details>
<summary><code>processId: number</code></summary>

The underlying process id.

</details>

---

#### TaskProvider {#taskprovider}

##### Methods

<div id="taskprovider-providetasks"></div>

<details>
<summary><code>provideTasks(token: CancellationToken): ProviderResult&lt;T[]&gt;;</code></summary>

Provides tasks.

</details>

<div id="taskprovider-resolvetask"></div>

<details>
<summary><code>resolveTask(task: T, token: CancellationToken): ProviderResult&lt;T&gt;;</code></summary>

Resolves a task that has no [`execution`](#Task.execution) set. Tasks are
often created from information found in the `tasks.json`-file. Such tasks miss
the information on how to execute them and a task provider must fill in
the missing information in the `resolveTask`-method.

</details>

---

#### TelemetryLogger {#telemetrylogger}

A telemetry logger which can be used by extensions to log usage and error telemetry.

A logger wraps around a <a href="#telemetrysender">sender</a> but it guarantees that
- user settings to disable or tweak telemetry are respected, and that
- potential sensitive data is removed

It also enables an "echo UI" that prints whatever data is send and it allows the editor
to forward unhandled errors to the respective extensions.

To get an instance of a `TelemetryLogger`, use
`createTelemetryLogger`.

##### Properties

<div id="telemetrylogger-ondidchangeenablestates"></div>

<details>
<summary><code>onDidChangeEnableStates: <a href="#event">Event</a>&lt;<a href="#telemetrylogger">TelemetryLogger</a>&gt;</code></summary>

An <a href="#event">Event</a> which fires when the enablement state of usage or error telemetry changes.

**只读**: 是

</details>

<div id="telemetrylogger-isusageenabled"></div>

<details>
<summary><code>isUsageEnabled: boolean</code></summary>

Whether or not usage telemetry is enabled for this logger.

**只读**: 是

</details>

<div id="telemetrylogger-iserrorsenabled"></div>

<details>
<summary><code>isErrorsEnabled: boolean</code></summary>

Whether or not error telemetry is enabled for this logger.

**只读**: 是

</details>

##### Methods

<div id="telemetrylogger-logusage"></div>

<details>
<summary><code>logUsage(eventName: string, data?: Record&lt;string, any | TelemetryTrustedValue&gt;): void;</code></summary>

Log a usage event.

After completing cleaning, telemetry setting checks, and data mix-in calls `TelemetrySender.sendEventData` to log the event.
Automatically supports echoing to extension telemetry output channel.

</details>

<div id="telemetrylogger-logerror"></div>

<details>
<summary><code>logError(eventName: string, data?: Record&lt;string, any | TelemetryTrustedValue&gt;): void;</code></summary>

Log an error event.

After completing cleaning, telemetry setting checks, and data mix-in calls `TelemetrySender.sendEventData` to log the event. Differs from `logUsage` in that it will log the event if the telemetry setting is Error+.
Automatically supports echoing to extension telemetry output channel.

</details>

<div id="telemetrylogger-logerror"></div>

<details>
<summary><code>logError(error: Error, data?: Record&lt;string, any | TelemetryTrustedValue&gt;): void;</code></summary>

Log an error event.

Calls `TelemetrySender.sendErrorData`. Does cleaning, telemetry checks, and data mix-in.
Automatically supports echoing to extension telemetry output channel.
Will also automatically log any exceptions thrown within the extension host process.

</details>

<div id="telemetrylogger-dispose"></div>

<details>
<summary><code>dispose(): void;</code></summary>

Dispose this object and free resources.

</details>

---

#### TelemetryLoggerOptions {#telemetryloggeroptions}

Options for creating a <a href="#telemetrylogger">TelemetryLogger</a>

##### Properties

<div id="telemetryloggeroptions-ignorebuiltincommonproperties"></div>

<details>
<summary><code>ignoreBuiltInCommonProperties: boolean</code></summary>

Whether or not you want to avoid having the built-in common properties such as os, extension name, etc injected into the data object.
Defaults to `false` if not defined.

**只读**: 是

</details>

<div id="telemetryloggeroptions-ignoreunhandlederrors"></div>

<details>
<summary><code>ignoreUnhandledErrors: boolean</code></summary>

Whether or not unhandled errors on the extension host caused by your extension should be logged to your sender.
Defaults to `false` if not defined.

**只读**: 是

</details>

<div id="telemetryloggeroptions-additionalcommonproperties"></div>

<details>
<summary><code>additionalCommonProperties: Record&lt;string, any&gt;</code></summary>

Any additional common properties which should be injected into the data object.

**只读**: 是

</details>

---

#### TelemetrySender {#telemetrysender}

The telemetry sender is the contract between a telemetry logger and some telemetry service. **Note** that extensions must NOT
call the methods of their sender directly as the logger provides extra guards and cleaning.

```js
const sender: vscode.TelemetrySender = &#123;...&#125;;
const logger = vscode.env.createTelemetryLogger(sender);

// GOOD - uses the logger
logger.logUsage('myEvent', &#123; myData: 'myValue' &#125;);

// BAD - uses the sender directly: no data cleansing, ignores user settings, no echoing to the telemetry output channel etc
sender.logEvent('myEvent', &#123; myData: 'myValue' &#125;);
```

##### Methods

<div id="telemetrysender-sendeventdata"></div>

<details>
<summary><code>sendEventData(eventName: string, data?: Record&lt;string, any&gt;): void;</code></summary>

Function to send event data without a stacktrace. Used within a <a href="#telemetrylogger">TelemetryLogger</a>

</details>

<div id="telemetrysender-senderrordata"></div>

<details>
<summary><code>sendErrorData(error: Error, data?: Record&lt;string, any&gt;): void;</code></summary>

Function to send an error. Used within a <a href="#telemetrylogger">TelemetryLogger</a>

</details>

<div id="telemetrysender-flush"></div>

<details>
<summary><code>flush?(): void | Thenable&lt;void&gt;;</code></summary>

Optional flush function which will give this sender a chance to send any remaining events
as its <a href="#telemetrylogger">TelemetryLogger</a> is being disposed

</details>

---

#### Terminal {#terminal}

Definition of the terminal emulator.

##### Properties

<div id="terminal-name"></div>

<details>
<summary><code>name: string</code></summary>

Human readable representation of the terminal in the UI.

**只读**: 是

</details>

<div id="terminal-processid"></div>

<details>
<summary><code>processId: Thenable&lt;number&gt;</code></summary>

Terminal id.

**只读**: 是

</details>

<div id="terminal-exitstatus"></div>

<details>
<summary><code>exitStatus: <a href="#terminalexitstatus">TerminalExitStatus</a> | undefined</code></summary>

The exit status of the terminal, this will be undefined while the terminal is active.

**Example:** Show a notification with the exit code when the terminal exits with a
non-zero exit code.
```typescript
window.onDidCloseTerminal(t =&gt; &#123;
  if (t.exitStatus && t.exitStatus.code) &#123;
    vscode.window.showInformationMessage(`Exit code: $&#123;t.exitStatus.code&#125;`);
  &#125;
&#125;);
```

**只读**: 是

</details>

<div id="terminal-creationoptions"></div>

<details>
<summary><code>creationOptions: Readonly&lt;<a href="#terminaloptions">TerminalOptions</a> | <a href="#extensionterminaloptions">ExtensionTerminalOptions</a>&gt;</code></summary>

The object used to initialize the terminal, this is useful for example to detecting the shell type of when the terminal was not launched by this extension or for
detecting what folder the shell was launched in.

**只读**: 是

</details>

<div id="terminal-state"></div>

<details>
<summary><code>state: <a href="#terminalstate">TerminalState</a></code></summary>

The current state of the <a href="#terminal">Terminal</a>.

**只读**: 是

</details>

<div id="terminal-shellintegration"></div>

<details>
<summary><code>shellIntegration: <a href="#terminalshellintegration">TerminalShellIntegration</a> | undefined</code></summary>

An object that contains [shell integration](https://code.visualstudio.com/docs/terminal/shell-integration)-powered
features for the terminal. This will always be `undefined` immediately after the terminal
is created. Listen to <a href="#window-ondidchangeterminalshellintegration">onDidChangeTerminalShellIntegration</a> to be notified
when shell integration is activated for a terminal.

Note that this object may remain undefined if shell integation never activates. For
example Command Prompt does not support shell integration and a user's shell setup could
conflict with the automatic shell integration activation.

**只读**: 是

</details>

##### Methods

<div id="terminal-sendtext"></div>

<details>
<summary><code>sendText(text: string, shouldExecute?: boolean): void;</code></summary>

Send text to the terminal.

</details>

<div id="terminal-show"></div>

<details>
<summary><code>show(preserveFocus?: boolean): void;</code></summary>

Show created terminal on the UI.

</details>

<div id="terminal-hide"></div>

<details>
<summary><code>hide(): void;</code></summary>

Hide terminal panel.

</details>

<div id="terminal-dispose"></div>

<details>
<summary><code>dispose(): void;</code></summary>

Destroy terminal.

</details>

---

#### TerminalCommandMatchResult {#terminalcommandmatchresult}

##### Properties

<div id="terminalcommandmatchresult-commandline"></div>

<details>
<summary><code>commandLine: string</code></summary>

</details>

<div id="terminalcommandmatchresult-commandlinematch"></div>

<details>
<summary><code>commandLineMatch: RegExpMatchArray</code></summary>

</details>

<div id="terminalcommandmatchresult-outputmatch"></div>

<details>
<summary><code>outputMatch: &#123; regexMatch: RegExpMatchArray; outputLines?: string[]; &#125;</code></summary>

</details>

---

#### TerminalDimensions {#terminaldimensions}

The dimensions of a terminal.

##### Properties

<div id="terminaldimensions-columns"></div>

<details>
<summary><code>columns: number</code></summary>

The number of columns of the terminal.

**只读**: 是

</details>

<div id="terminaldimensions-rows"></div>

<details>
<summary><code>rows: number</code></summary>

The number of rows of the terminal.

**只读**: 是

</details>

---

#### TerminalEditorLocationOptions {#terminaleditorlocationoptions}

Assumes a <a href="#terminallocation">TerminalLocation</a> of editor and allows specifying a <a href="#viewcolumn">ViewColumn</a> and
preserveFocus  property

##### Properties

<div id="terminaleditorlocationoptions-viewcolumn"></div>

<details>
<summary><code>viewColumn: <a href="#viewcolumn">ViewColumn</a></code></summary>

A view column in which the <a href="#terminal">terminal</a> should be shown in the editor area.
Use active to open in the active editor group, other values are
adjusted to be `Min(column, columnCount + 1)`, the
active-column is not adjusted. Use
Beside to open the editor to the side of the currently active one.

</details>

<div id="terminaleditorlocationoptions-preservefocus"></div>

<details>
<summary><code>preserveFocus: boolean</code></summary>

An optional flag that when `true` will stop the <a href="#terminal">Terminal</a> from taking focus.

</details>

---

#### TerminalExitStatus {#terminalexitstatus}

Represents how a terminal exited.

##### Properties

<div id="terminalexitstatus-code"></div>

<details>
<summary><code>code: number | undefined</code></summary>

The exit code that a terminal exited with, it can have the following values:
- Zero: the terminal process or custom execution succeeded.
- Non-zero: the terminal process or custom execution failed.
- `undefined`: the user forcibly closed the terminal or a custom execution exited
  without providing an exit code.

**只读**: 是

</details>

<div id="terminalexitstatus-reason"></div>

<details>
<summary><code>reason: <a href="#terminalexitreason">TerminalExitReason</a></code></summary>

The reason that triggered the exit of a terminal.

**只读**: 是

</details>

---

#### TerminalLinkContext {#terminallinkcontext}

Provides information on a line in a terminal in order to provide links for it.

##### Properties

<div id="terminallinkcontext-line"></div>

<details>
<summary><code>line: string</code></summary>

This is the text from the unwrapped line in the terminal.

</details>

<div id="terminallinkcontext-terminal"></div>

<details>
<summary><code>terminal: <a href="#terminal">Terminal</a></code></summary>

The terminal the link belongs to.

</details>

---

#### TerminalLinkProvider {#terminallinkprovider}

A provider that enables detection and handling of links within terminals.

##### Methods

<div id="terminallinkprovider-provideterminallinks"></div>

<details>
<summary><code>provideTerminalLinks(context: TerminalLinkContext, token: CancellationToken): ProviderResult&lt;T[]&gt;;</code></summary>

Provide terminal links for the given context. Note that this can be called multiple times
even before previous calls resolve, make sure to not share global objects (eg. `RegExp`)
that could have problems when asynchronous usage may overlap.

</details>

<div id="terminallinkprovider-handleterminallink"></div>

<details>
<summary><code>handleTerminalLink(link: T): ProviderResult&lt;void&gt;;</code></summary>

Handle an activated terminal link.

</details>

---

#### TerminalObserver {#terminalobserver}

##### Properties

<div id="terminalobserver-outputmatcherregex"></div>

<details>
<summary><code>outputMatcherRegex: string</code></summary>

A regex to match against the latest terminal output.

**只读**: 是

</details>

<div id="terminalobserver-nroflinestomatch"></div>

<details>
<summary><code>nrOfLinesToMatch: number</code></summary>

The maximum number of lines to match the regex against. Maximum is 40 lines.

**只读**: 是

</details>

##### Methods

<div id="terminalobserver-matchoccurred"></div>

<details>
<summary><code>matchOccurred(groups: string[]): void;</code></summary>

Invoked when the regex matched against the terminal contents.

</details>

---

#### TerminalOptions {#terminaloptions}

Options to create terminal widget.

##### Properties

<div id="terminaloptions-name"></div>

<details>
<summary><code>name: string</code></summary>

Human readable representation of the terminal in the UI.

</details>

<div id="terminaloptions-shellpath"></div>

<details>
<summary><code>shellPath: string</code></summary>

Path to the executable shell. For example "/bin/bash", "bash", "sh".

</details>

<div id="terminaloptions-shellargs"></div>

<details>
<summary><code>shellArgs: string[] | string</code></summary>

Args for the custom shell executable. A string can be used on Windows only which allows
specifying shell args in [command-line format](https://msdn.microsoft.com/en-au/08dfcab2-eb6e-49a4-80eb-87d4076c98c6).

</details>

<div id="terminaloptions-cwd"></div>

<details>
<summary><code>cwd: string | <a href="#uri">Uri</a></code></summary>

Current working directory.

</details>

<div id="terminaloptions-env"></div>

<details>
<summary><code>env: &#123; [key: string]: string | null &#125;</code></summary>

Environment variables for terminal in format key - value.

</details>

<div id="terminaloptions-strictenv"></div>

<details>
<summary><code>strictEnv: boolean</code></summary>

Whether the terminal process environment should be exactly as provided in
`TerminalOptions.env`. When this is false (default), the environment will be based on the
window's environment and also apply configured platform settings like
`terminal.integrated.windows.env` on top. When this is true, the complete environment
must be provided as nothing will be inherited from the process or any configuration.

</details>

<div id="terminaloptions-hidefromuser"></div>

<details>
<summary><code>hideFromUser: boolean</code></summary>

When enabled the terminal will run the process as normal but not be surfaced to the user
until `Terminal.show` is called. The typical usage for this is when you need to run
something that may need interactivity but only want to tell the user about it when
interaction is needed. Note that the terminals will still be exposed to all extensions
as normal.

</details>

<div id="terminaloptions-message"></div>

<details>
<summary><code>message: string</code></summary>

A message to write to the terminal on first launch. Note that this is not sent to the
process, but rather written directly to the terminal. This supports escape sequences such
as setting text style.

</details>

<div id="terminaloptions-location"></div>

<details>
<summary><code>location: <a href="#terminallocation">TerminalLocation</a> | <a href="#terminaleditorlocationoptions">TerminalEditorLocationOptions</a> | <a href="#terminalsplitlocationoptions">TerminalSplitLocationOptions</a></code></summary>

The <a href="#terminallocation">TerminalLocation</a> or <a href="#terminaleditorlocationoptions">TerminalEditorLocationOptions</a> or <a href="#terminalsplitlocationoptions">TerminalSplitLocationOptions</a> for the terminal.

</details>

<div id="terminaloptions-istransient"></div>

<details>
<summary><code>isTransient: boolean</code></summary>

Opt-out of the default terminal persistence on restart and reload.
This will only take effect when `terminal.integrated.enablePersistentSessions` is enabled.

</details>

<div id="terminaloptions-attributes"></div>

<details>
<summary><code>attributes: &#123; [key: string]: string | null &#125;</code></summary>

Terminal attributes. Can be useful to apply some implementation specific information.

</details>

<div id="terminaloptions-iconpath"></div>

<details>
<summary><code>iconPath: <a href="#iconpath">IconPath</a></code></summary>

The icon path or <a href="#themeicon">ThemeIcon</a> for the terminal.

</details>

<div id="terminaloptions-color"></div>

<details>
<summary><code>color: <a href="#themecolor">ThemeColor</a></code></summary>

The icon <a href="#themecolor">ThemeColor</a> for the terminal.
The `terminal.ansi*` theme keys are
recommended for the best contrast and consistency across themes.

</details>

---

#### TerminalProfileProvider {#terminalprofileprovider}

##### Methods

<div id="terminalprofileprovider-provideterminalprofile"></div>

<details>
<summary><code>provideTerminalProfile(token: CancellationToken): ProviderResult&lt;TerminalProfile&gt;;</code></summary>

Provide the terminal profile.

</details>

---

#### TerminalQuickFixProvider {#terminalquickfixprovider}

##### Methods

<div id="terminalquickfixprovider-provideterminalquickfixes"></div>

<details>
<summary><code>provideTerminalQuickFixes(commandMatchResult: TerminalCommandMatchResult, token: CancellationToken): ProviderResult&lt;SingleOrMany&lt;TerminalQuickFixTerminalCommand | TerminalQuickFixOpener | Command&gt;&gt;;</code></summary>

Provides terminal quick fixes

</details>

---

#### TerminalShellExecution {#terminalshellexecution}

A command that was executed in a terminal.

##### Properties

<div id="terminalshellexecution-commandline"></div>

<details>
<summary><code>commandLine: <a href="#terminalshellexecutioncommandline">TerminalShellExecutionCommandLine</a></code></summary>

The command line that was executed. The confidence
of this value depends on the specific shell's shell integration implementation. This
value may become more accurate after <a href="#window-ondidendterminalshellexecution">onDidEndTerminalShellExecution</a> is
fired.

**只读**: 是

</details>

<div id="terminalshellexecution-cwd"></div>

<details>
<summary><code>cwd: <a href="#uri">Uri</a> | undefined</code></summary>

The working directory that was reported by the shell when this command executed. This
<a href="#uri">Uri</a> may represent a file on another machine (eg. ssh into another machine). This
requires the shell integration to support working directory reporting.

**只读**: 是

</details>

##### Methods

<div id="terminalshellexecution-read"></div>

<details>
<summary><code>read(): AsyncIterable&lt;string&gt;;</code></summary>

Creates a stream of raw data (including escape sequences) that is written to the
terminal. This will only include data that was written after `read` was called for
the first time, ie. you must call `read` immediately after the command is executed via
<a href="#commands-executecommand">executeCommand</a> or
<a href="#window-ondidstartterminalshellexecution">onDidStartTerminalShellExecution</a> to not miss any data.

</details>

---

#### TerminalShellExecutionCommandLine {#terminalshellexecutioncommandline}

A command line that was executed in a terminal.

##### Properties

<div id="terminalshellexecutioncommandline-value"></div>

<details>
<summary><code>value: string</code></summary>

The full command line that was executed, including both the command and its arguments.

**只读**: 是

</details>

<div id="terminalshellexecutioncommandline-istrusted"></div>

<details>
<summary><code>isTrusted: boolean</code></summary>

Whether the command line value came from a trusted source and is therefore safe to
execute without user additional confirmation, such as a notification that asks "Do you
want to execute (command)?". This verification is likely only needed if you are going to
execute the command again.

This is `true` only when the command line was reported explicitly by the shell
integration script (ie. high confidence)
and it used a nonce for verification.

**只读**: 是

</details>

<div id="terminalshellexecutioncommandline-confidence"></div>

<details>
<summary><code>confidence: TerminalShellExecutionCommandLineConfidence</code></summary>

The confidence of the command line value which is determined by how the value was
obtained. This depends upon the implementation of the shell integration script.

**只读**: 是

</details>

---

#### TerminalShellExecutionEndEvent {#terminalshellexecutionendevent}

An event signalling that an execution has ended in a terminal.

##### Properties

<div id="terminalshellexecutionendevent-terminal"></div>

<details>
<summary><code>terminal: <a href="#terminal">Terminal</a></code></summary>

The terminal that shell integration has been activated in.

**只读**: 是

</details>

<div id="terminalshellexecutionendevent-shellintegration"></div>

<details>
<summary><code>shellIntegration: <a href="#terminalshellintegration">TerminalShellIntegration</a></code></summary>

The shell integration object.

**只读**: 是

</details>

<div id="terminalshellexecutionendevent-execution"></div>

<details>
<summary><code>execution: <a href="#terminalshellexecution">TerminalShellExecution</a></code></summary>

The terminal shell execution that has ended.

**只读**: 是

</details>

<div id="terminalshellexecutionendevent-exitcode"></div>

<details>
<summary><code>exitCode: number | undefined</code></summary>

The exit code reported by the shell.

Note that `undefined` means the shell either did not report an exit  code (ie. the shell
integration script is misbehaving) or the shell reported a command started before the command
finished (eg. a sub-shell was opened). Generally this should not happen, depending on the use
case, it may be best to treat this as a failure.

**只读**: 是

</details>

---

#### TerminalShellExecutionStartEvent {#terminalshellexecutionstartevent}

An event signalling that an execution has started in a terminal.

##### Properties

<div id="terminalshellexecutionstartevent-terminal"></div>

<details>
<summary><code>terminal: <a href="#terminal">Terminal</a></code></summary>

The terminal that shell integration has been activated in.

**只读**: 是

</details>

<div id="terminalshellexecutionstartevent-shellintegration"></div>

<details>
<summary><code>shellIntegration: <a href="#terminalshellintegration">TerminalShellIntegration</a></code></summary>

The shell integration object.

**只读**: 是

</details>

<div id="terminalshellexecutionstartevent-execution"></div>

<details>
<summary><code>execution: <a href="#terminalshellexecution">TerminalShellExecution</a></code></summary>

The terminal shell execution that has ended.

**只读**: 是

</details>

---

#### TerminalShellIntegration {#terminalshellintegration}

[Shell integration](https://code.visualstudio.com/docs/terminal/shell-integration)-powered capabilities owned by a terminal.

##### Properties

<div id="terminalshellintegration-cwd"></div>

<details>
<summary><code>cwd: <a href="#uri">Uri</a> | undefined</code></summary>

The current working directory of the terminal. This <a href="#uri">Uri</a> may represent a file on
another machine (eg. ssh into another machine). This requires the shell integration to
support working directory reporting.

**只读**: 是

</details>

##### Methods

<div id="terminalshellintegration-executecommand"></div>

<details>
<summary><code>executeCommand(commandLine: string): TerminalShellExecution;</code></summary>

Execute a command, sending ^C as necessary to interrupt any running command if needed.

</details>

<div id="terminalshellintegration-executecommand"></div>

<details>
<summary><code>executeCommand(executable: string, args: string[]): TerminalShellExecution;</code></summary>

Execute a command, sending ^C as necessary to interrupt any running command if needed.

*Note* This is not guaranteed to work as [shell integration](https://code.visualstudio.com/docs/terminal/shell-integration)
must be activated. Check whether exitCode is rejected to
verify whether it was successful.

</details>

---

#### TerminalShellIntegrationChangeEvent {#terminalshellintegrationchangeevent}

An event signalling that a terminal's shell integration has changed.

##### Properties

<div id="terminalshellintegrationchangeevent-terminal"></div>

<details>
<summary><code>terminal: <a href="#terminal">Terminal</a></code></summary>

The terminal that shell integration has been activated in.

**只读**: 是

</details>

<div id="terminalshellintegrationchangeevent-shellintegration"></div>

<details>
<summary><code>shellIntegration: <a href="#terminalshellintegration">TerminalShellIntegration</a></code></summary>

The shell integration object.

**只读**: 是

</details>

---

#### TerminalSplitLocationOptions {#terminalsplitlocationoptions}

Uses the parent <a href="#terminal">Terminal</a>'s location for the terminal

##### Properties

<div id="terminalsplitlocationoptions-parentterminal"></div>

<details>
<summary><code>parentTerminal: <a href="#terminal">Terminal</a></code></summary>

The parent terminal to split this terminal beside. This works whether the parent terminal
is in the panel or the editor area.

</details>

---

#### TerminalState {#terminalstate}

##### Properties

<div id="terminalstate-isinteractedwith"></div>

<details>
<summary><code>isInteractedWith: boolean</code></summary>

Whether the <a href="#terminal">Terminal</a> has been interacted with. Interaction means that the
terminal has sent data to the process which depending on the terminal's _mode_. By
default input is sent when a key is pressed or when a command or extension sends text,
but based on the terminal's mode it can also happen on:

- a pointer click event
- a pointer scroll event
- a pointer move event
- terminal focus in/out

For more information on events that can send data see "DEC Private Mode Set (DECSET)" on
https://invisible-island.net/xterm/ctlseqs/ctlseqs.html

**只读**: 是

</details>

---

#### TestController {#testcontroller}

Entry point to discover and execute tests. It contains items which
are used to populate the editor UI, and is associated with
run profiles to allow
for tests to be executed.

##### Properties

<div id="testcontroller-id"></div>

<details>
<summary><code>id: string</code></summary>

The id of the controller passed in <a href="#tests-createtestcontroller">createTestController</a>.
This must be globally unique.

**只读**: 是

</details>

<div id="testcontroller-label"></div>

<details>
<summary><code>label: string</code></summary>

Human-readable label for the test controller.

</details>

<div id="testcontroller-items"></div>

<details>
<summary><code>items: <a href="#testitemcollection">TestItemCollection</a></code></summary>

A collection of "top-level" <a href="#testitem">TestItem</a> instances, which can in
turn have their own children to form the
"test tree."

The extension controls when to add tests. For example, extensions should
add tests for a file when <a href="#workspace-ondidopentextdocument">onDidOpenTextDocument</a>
fires in order for decorations for tests within a file to be visible.

However, the editor may sometimes explicitly request children using the
`resolveHandler` See the documentation on that method for more details.

**只读**: 是

</details>

<div id="testcontroller-resolvehandler"></div>

<details>
<summary><code>resolveHandler: (item: <a href="#testitem">TestItem</a> | undefined) =&gt; Thenable&lt;void&gt; | void</code></summary>

A function provided by the extension that the editor may call to request
children of a test item, if the canResolveChildren is
`true`. When called, the item should discover children and call
createTestItem as children are discovered.

Generally the extension manages the lifecycle of test items, but under
certain conditions the editor may request the children of a specific
item to be loaded. For example, if the user requests to re-run tests
after reloading the editor, the editor may need to call this method
to resolve the previously-run tests.

The item in the explorer will automatically be marked as "busy" until
the function returns or the returned thenable resolves.

</details>

<div id="testcontroller-refreshhandler"></div>

<details>
<summary><code>refreshHandler: ((token: <a href="#cancellationtoken">CancellationToken</a>) =&gt; Thenable&lt;void&gt; | void) | undefined</code></summary>

If this method is present, a refresh button will be present in the
UI, and this method will be invoked when it's clicked. When called,
the extension should scan the workspace for any new, changed, or
removed tests.

It's recommended that extensions try to update tests in realtime, using
a <a href="#filesystemwatcher">FileSystemWatcher</a> for example, and use this method as a fallback.

</details>

##### Methods

<div id="testcontroller-createrunprofile"></div>

<details>
<summary><code>createRunProfile(label: string, kind: TestRunProfileKind, runHandler: (request: TestRunRequest, token: CancellationToken) =&gt; Thenable&lt;void&gt; | void, isDefault?: boolean, tag?: TestTag, supportsContinuousRun?: boolean): TestRunProfile;</code></summary>

Creates a profile used for running tests. Extensions must create
at least one profile in order for tests to be run.

</details>

<div id="testcontroller-createtestrun"></div>

<details>
<summary><code>createTestRun(request: TestRunRequest, name?: string, persist?: boolean): TestRun;</code></summary>

Creates a <a href="#testrun">TestRun</a>. This should be called by the
<a href="#testrunprofile">TestRunProfile</a> when a request is made to execute tests, and may
also be called if a test run is detected externally. Once created, tests
that are included in the request will be moved into the queued state.

All runs created using the same `request` instance will be grouped
together. This is useful if, for example, a single suite of tests is
run on multiple platforms.

</details>

<div id="testcontroller-createtestitem"></div>

<details>
<summary><code>createTestItem(id: string, label: string, uri?: Uri): TestItem;</code></summary>

Creates a new managed <a href="#testitem">TestItem</a> instance. It can be added into
the children of an existing item, or into the
items.

</details>

<div id="testcontroller-invalidatetestresults"></div>

<details>
<summary><code>invalidateTestResults(items?: TestItem | readonly TestItem[]): void;</code></summary>

Marks an item's results as being outdated. This is commonly called when
code or configuration changes and previous results should no longer
be considered relevant. The same logic used to mark results as outdated
may be used to drive continuous test runs.

If an item is passed to this method, test results for the item and all of
its children will be marked as outdated. If no item is passed, then all
test owned by the TestController will be marked as outdated.

Any test runs started before the moment this method is called, including
runs which may still be ongoing, will be marked as outdated and deprioritized
in the editor's UI.

</details>

<div id="testcontroller-dispose"></div>

<details>
<summary><code>dispose(): void;</code></summary>

Unregisters the test controller, disposing of its associated tests
and unpersisted results.

</details>

---

#### TestItem {#testitem}

An item shown in the "test explorer" view.

A `TestItem` can represent either a test suite or a test itself, since
they both have similar capabilities.

##### Properties

<div id="testitem-id"></div>

<details>
<summary><code>id: string</code></summary>

Identifier for the `TestItem`. This is used to correlate
test results and tests in the document with those in the workspace
(test explorer). This cannot change for the lifetime of the `TestItem`,
and must be unique among its parent's direct children.

**只读**: 是

</details>

<div id="testitem-uri"></div>

<details>
<summary><code>uri: <a href="#uri">Uri</a> | undefined</code></summary>

URI this `TestItem` is associated with. May be a file or directory.

**只读**: 是

</details>

<div id="testitem-children"></div>

<details>
<summary><code>children: <a href="#testitemcollection">TestItemCollection</a></code></summary>

The children of this test item. For a test suite, this may contain the
individual test cases or nested suites.

**只读**: 是

</details>

<div id="testitem-parent"></div>

<details>
<summary><code>parent: <a href="#testitem">TestItem</a> | undefined</code></summary>

The parent of this item. It's set automatically, and is undefined
top-level items in the items and for items that
aren't yet included in another item's children.

**只读**: 是

</details>

<div id="testitem-tags"></div>

<details>
<summary><code>tags: readonly <a href="#testtag">TestTag</a>[]</code></summary>

Tags associated with this test item. May be used in combination with
tags, or simply as an organizational feature.

</details>

<div id="testitem-canresolvechildren"></div>

<details>
<summary><code>canResolveChildren: boolean</code></summary>

Indicates whether this test item may have children discovered by resolving.

If true, this item is shown as expandable in the Test Explorer view and
expanding the item will cause resolveHandler
to be invoked with the item.

Default to `false`.

</details>

<div id="testitem-busy"></div>

<details>
<summary><code>busy: boolean</code></summary>

Controls whether the item is shown as "busy" in the Test Explorer view.
This is useful for showing status while discovering children.

Defaults to `false`.

</details>

<div id="testitem-label"></div>

<details>
<summary><code>label: string</code></summary>

Display name describing the test case.

</details>

<div id="testitem-description"></div>

<details>
<summary><code>description: string</code></summary>

Optional description that appears next to the label.

</details>

<div id="testitem-sorttext"></div>

<details>
<summary><code>sortText: string | undefined</code></summary>

A string that should be used when comparing this item
with other items. When `falsy` the label
is used.

</details>

<div id="testitem-range"></div>

<details>
<summary><code>range: <a href="#range">Range</a> | undefined</code></summary>

Location of the test item in its uri.

This is only meaningful if the `uri` points to a file.

</details>

<div id="testitem-error"></div>

<details>
<summary><code>error: string | <a href="#markdownstring">MarkdownString</a> | undefined</code></summary>

Optional error encountered while loading the test.

Note that this is not a test result and should only be used to represent errors in
test discovery, such as syntax errors.

</details>

---

#### TestItemCollection {#testitemcollection}

Collection of test items, found in children and
items.

##### Properties

<div id="testitemcollection-size"></div>

<details>
<summary><code>size: number</code></summary>

Gets the number of items in the collection.

**只读**: 是

</details>

##### Methods

<div id="testitemcollection-replace"></div>

<details>
<summary><code>replace(items: readonly TestItem[]): void;</code></summary>

Replaces the items stored by the collection.

</details>

<div id="testitemcollection-foreach"></div>

<details>
<summary><code>forEach(callback: (item: TestItem, collection: TestItemCollection) =&gt; unknown, thisArg?: any): void;</code></summary>

Iterate over each entry in this collection.

</details>

<div id="testitemcollection-add"></div>

<details>
<summary><code>add(item: TestItem): void;</code></summary>

Adds the test item to the children. If an item with the same ID already
exists, it'll be replaced.

</details>

<div id="testitemcollection-delete"></div>

<details>
<summary><code>delete(itemId: string): void;</code></summary>

Removes a single test item from the collection.

</details>

<div id="testitemcollection-get"></div>

<details>
<summary><code>get(itemId: string): TestItem | undefined;</code></summary>

Efficiently gets a test item by ID, if it exists, in the children.

</details>

---

#### TestRun {#testrun}

A TestRun represents an in-progress or completed test run and
provides methods to report the state of individual tests in the run.

##### Properties

<div id="testrun-name"></div>

<details>
<summary><code>name: string | undefined</code></summary>

The human-readable name of the run. This can be used to
disambiguate multiple sets of results in a test run. It is useful if
tests are run across multiple platforms, for example.

**只读**: 是

</details>

<div id="testrun-token"></div>

<details>
<summary><code>token: <a href="#cancellationtoken">CancellationToken</a></code></summary>

A cancellation token which will be triggered when the test run is
canceled from the UI.

**只读**: 是

</details>

<div id="testrun-ispersisted"></div>

<details>
<summary><code>isPersisted: boolean</code></summary>

Whether the test run will be persisted across reloads by the editor.

**只读**: 是

</details>

<div id="testrun-ondiddispose"></div>

<details>
<summary><code>onDidDispose: <a href="#event">Event</a>&lt;void&gt;</code></summary>

An event fired when the editor is no longer interested in data
associated with the test run.

</details>

##### Methods

<div id="testrun-enqueued"></div>

<details>
<summary><code>enqueued(test: TestItem): void;</code></summary>

Indicates a test is queued for later execution.

</details>

<div id="testrun-started"></div>

<details>
<summary><code>started(test: TestItem): void;</code></summary>

Indicates a test has started running.

</details>

<div id="testrun-skipped"></div>

<details>
<summary><code>skipped(test: TestItem): void;</code></summary>

Indicates a test has been skipped.

</details>

<div id="testrun-failed"></div>

<details>
<summary><code>failed(test: TestItem, message: TestMessage | readonly TestMessage[], duration?: number): void;</code></summary>

Indicates a test has failed. You should pass one or more
<a href="#testmessage">TestMessages</a> to describe the failure.

</details>

<div id="testrun-errored"></div>

<details>
<summary><code>errored(test: TestItem, message: TestMessage | readonly TestMessage[], duration?: number): void;</code></summary>

Indicates a test has errored. You should pass one or more
<a href="#testmessage">TestMessages</a> to describe the failure. This differs
from the "failed" state in that it indicates a test that couldn't be
executed at all, from a compilation error for example.

</details>

<div id="testrun-passed"></div>

<details>
<summary><code>passed(test: TestItem, duration?: number): void;</code></summary>

Indicates a test has passed.

</details>

<div id="testrun-appendoutput"></div>

<details>
<summary><code>appendOutput(output: string, location?: Location, test?: TestItem): void;</code></summary>

Appends raw output from the test runner. On the user's request, the
output will be displayed in a terminal. ANSI escape sequences,
such as colors and text styles, are supported. New lines must be given
as CRLF (`\r\n`) rather than LF (`\n`).

</details>

<div id="testrun-addcoverage"></div>

<details>
<summary><code>addCoverage(fileCoverage: FileCoverage): void;</code></summary>

Adds coverage for a file in the run.

</details>

<div id="testrun-end"></div>

<details>
<summary><code>end(): void;</code></summary>

Signals the end of the test run. Any tests included in the run whose
states have not been updated will have their state reset.

</details>

---

#### TestRunProfile {#testrunprofile}

A TestRunProfile describes one way to execute tests in a <a href="#testcontroller">TestController</a>.

##### Properties

<div id="testrunprofile-label"></div>

<details>
<summary><code>label: string</code></summary>

Label shown to the user in the UI.

Note that the label has some significance if the user requests that
tests be re-run in a certain way. For example, if tests were run
normally and the user requests to re-run them in debug mode, the editor
will attempt use a configuration with the same label of the `Debug`
kind. If there is no such configuration, the default will be used.

</details>

<div id="testrunprofile-kind"></div>

<details>
<summary><code>kind: <a href="#testrunprofilekind">TestRunProfileKind</a></code></summary>

Configures what kind of execution this profile controls. If there
are no profiles for a kind, it will not be available in the UI.

**只读**: 是

</details>

<div id="testrunprofile-isdefault"></div>

<details>
<summary><code>isDefault: boolean</code></summary>

Controls whether this profile is the default action that will
be taken when its kind is actioned. For example, if the user clicks
the generic "run all" button, then the default profile for
Run will be executed, although the
user can configure this.

Changes the user makes in their default profiles will be reflected
in this property after a `onDidChangeDefault` event.

</details>

<div id="testrunprofile-ondidchangedefault"></div>

<details>
<summary><code>onDidChangeDefault: <a href="#event">Event</a>&lt;boolean&gt;</code></summary>

Fired when a user has changed whether this is a default profile. The
event contains the new value of `isDefault`

</details>

<div id="testrunprofile-supportscontinuousrun"></div>

<details>
<summary><code>supportsContinuousRun: boolean</code></summary>

Whether this profile supports continuous running of requests. If so,
then continuous may be set to `true`. Defaults
to false.

</details>

<div id="testrunprofile-tag"></div>

<details>
<summary><code>tag: <a href="#testtag">TestTag</a> | undefined</code></summary>

Associated tag for the profile. If this is set, only <a href="#testitem">TestItem</a>
instances with the same tag will be eligible to execute in this profile.

</details>

<div id="testrunprofile-configurehandler"></div>

<details>
<summary><code>configureHandler: (() =&gt; void) | undefined</code></summary>

If this method is present, a configuration gear will be present in the
UI, and this method will be invoked when it's clicked. When called,
you can take other editor actions, such as showing a quick pick or
opening a configuration file.

</details>

<div id="testrunprofile-runhandler"></div>

<details>
<summary><code>runHandler: (request: <a href="#testrunrequest">TestRunRequest</a>, token: <a href="#cancellationtoken">CancellationToken</a>) =&gt; Thenable&lt;void&gt; | void</code></summary>

Handler called to start a test run. When invoked, the function should call
createTestRun at least once, and all test runs
associated with the request should be created before the function returns
or the returned promise is resolved.

If `supportsContinuousRun` is set, then continuous
may be `true`. In this case, the profile should observe changes to
source code and create new test runs by calling createTestRun,
until the cancellation is requested on the `token`.

</details>

<div id="testrunprofile-loaddetailedcoverage"></div>

<details>
<summary><code>loadDetailedCoverage: (testRun: <a href="#testrun">TestRun</a>, fileCoverage: <a href="#filecoverage">FileCoverage</a>, token: <a href="#cancellationtoken">CancellationToken</a>) =&gt; Thenable&lt;<a href="#filecoveragedetail">FileCoverageDetail</a>[]&gt;</code></summary>

An extension-provided function that provides detailed statement and
function-level coverage for a file. The editor will call this when more
detail is needed for a file, such as when it's opened in an editor or
expanded in the **Test Coverage** view.

The <a href="#filecoverage">FileCoverage</a> object passed to this function is the same instance
emitted on addCoverage calls associated with this profile.

</details>

<div id="testrunprofile-loaddetailedcoveragefortest"></div>

<details>
<summary><code>loadDetailedCoverageForTest: (testRun: <a href="#testrun">TestRun</a>, fileCoverage: <a href="#filecoverage">FileCoverage</a>, fromTestItem: <a href="#testitem">TestItem</a>, token: <a href="#cancellationtoken">CancellationToken</a>) =&gt; Thenable&lt;<a href="#filecoveragedetail">FileCoverageDetail</a>[]&gt;</code></summary>

An extension-provided function that provides detailed statement and
function-level coverage for a single test in a file. This is the per-test
sibling of loadDetailedCoverage, called only if
a test item is provided in includesTests and only
for files where such data is reported.

Often loadDetailedCoverage will be called first
when a user opens a file, and then this method will be called if they
drill down into specific per-test coverage information. This method
should then return coverage data only for constructs the given test item
executed during the test run.

The <a href="#filecoverage">FileCoverage</a> object passed to this function is the same
instance emitted on addCoverage calls associated with this profile.

</details>

##### Methods

<div id="testrunprofile-dispose"></div>

<details>
<summary><code>dispose(): void;</code></summary>

Deletes the run profile.

</details>

---

#### TextDocument {#textdocument}

Represents a text document, such as a source file. Text documents have
<a href="#textline">lines</a> and knowledge about an underlying resource like a file.

##### Properties

<div id="textdocument-uri"></div>

<details>
<summary><code>uri: <a href="#uri">Uri</a></code></summary>

The associated uri for this document.

*Note* that most documents use the `file`-scheme, which means they are files on disk. However, **not** all documents are
saved on disk and therefore the `scheme` must be checked before trying to access the underlying file or siblings on disk.

**只读**: 是

</details>

<div id="textdocument-filename"></div>

<details>
<summary><code>fileName: string</code></summary>

The file system path of the associated resource. Shorthand
notation for [TextDocument.uri.fsPath](#TextDocument.uri). Independent of the uri scheme.

**只读**: 是

</details>

<div id="textdocument-isuntitled"></div>

<details>
<summary><code>isUntitled: boolean</code></summary>

Is this document representing an untitled file which has never been saved yet. *Note* that
this does not mean the document will be saved to disk, use [`uri.scheme`](#Uri.scheme)
to figure out where a document will be <a href="#filesystemprovider">saved</a>, e.g. `file`, `ftp` etc.

**只读**: 是

</details>

<div id="textdocument-languageid"></div>

<details>
<summary><code>languageId: string</code></summary>

The identifier of the language associated with this document.

**只读**: 是

</details>

<div id="textdocument-version"></div>

<details>
<summary><code>version: number</code></summary>

The version number of this document (it will strictly increase after each
change, including undo/redo).

**只读**: 是

</details>

<div id="textdocument-isdirty"></div>

<details>
<summary><code>isDirty: boolean</code></summary>

`true` if there are unpersisted changes.

**只读**: 是

</details>

<div id="textdocument-isclosed"></div>

<details>
<summary><code>isClosed: boolean</code></summary>

`true` if the document have been closed. A closed document isn't synchronized anymore
and won't be re-used when the same resource is opened again.

**只读**: 是

</details>

<div id="textdocument-eol"></div>

<details>
<summary><code>eol: <a href="#endofline">EndOfLine</a></code></summary>

The <a href="#endofline">end of line</a> sequence that is predominately
used in this document.

**只读**: 是

</details>

<div id="textdocument-linecount"></div>

<details>
<summary><code>lineCount: number</code></summary>

The number of lines in this document.

**只读**: 是

</details>

##### Methods

<div id="textdocument-save"></div>

<details>
<summary><code>save(): Thenable&lt;boolean&gt;;</code></summary>

Save the underlying file.

</details>

<div id="textdocument-lineat"></div>

<details>
<summary><code>lineAt(line: number): TextLine;</code></summary>

Returns a text line denoted by the line number. Note
that the returned object is *not* live and changes to the
document are not reflected.

</details>

<div id="textdocument-lineat"></div>

<details>
<summary><code>lineAt(position: Position): TextLine;</code></summary>

Returns a text line denoted by the position. Note
that the returned object is *not* live and changes to the
document are not reflected.

The position will be adjusted.

</details>

<div id="textdocument-offsetat"></div>

<details>
<summary><code>offsetAt(position: Position): number;</code></summary>

Converts the position to a zero-based offset.

The position will be adjusted.

</details>

<div id="textdocument-positionat"></div>

<details>
<summary><code>positionAt(offset: number): Position;</code></summary>

Converts a zero-based offset to a position.

</details>

<div id="textdocument-gettext"></div>

<details>
<summary><code>getText(range?: Range): string;</code></summary>

Get the text of this document. A substring can be retrieved by providing
a range. The range will be adjusted.

</details>

<div id="textdocument-getwordrangeatposition"></div>

<details>
<summary><code>getWordRangeAtPosition(position: Position, regex?: RegExp): Range | undefined;</code></summary>

Get a word-range at the given position. By default words are defined by
common separators, like space, -, _, etc. In addition, per language custom
word definitions can be defined. It
is also possible to provide a custom regular expression.

* *Note 1:* A custom regular expression must not match the empty string and
if it does, it will be ignored.
* *Note 2:* A custom regular expression will fail to match multiline strings
and in the name of speed regular expressions should not match words with
spaces. Use [`TextLine.text`](#TextLine.text) for more complex, non-wordy, scenarios.

The position will be adjusted.

</details>

<div id="textdocument-validaterange"></div>

<details>
<summary><code>validateRange(range: Range): Range;</code></summary>

Ensure a range is completely contained in this document.

</details>

<div id="textdocument-validateposition"></div>

<details>
<summary><code>validatePosition(position: Position): Position;</code></summary>

Ensure a position is contained in the range of this document.

</details>

---

#### TextDocumentChangeEvent {#textdocumentchangeevent}

An event describing a transactional <a href="#textdocument">document</a> change.

##### Properties

<div id="textdocumentchangeevent-document"></div>

<details>
<summary><code>document: <a href="#textdocument">TextDocument</a></code></summary>

The affected document.

**只读**: 是

</details>

<div id="textdocumentchangeevent-contentchanges"></div>

<details>
<summary><code>contentChanges: readonly <a href="#textdocumentcontentchangeevent">TextDocumentContentChangeEvent</a>[]</code></summary>

An array of content changes.

**只读**: 是

</details>

<div id="textdocumentchangeevent-reason"></div>

<details>
<summary><code>reason: <a href="#textdocumentchangereason">TextDocumentChangeReason</a> | undefined</code></summary>

The reason why the document was changed.
Is `undefined` if the reason is not known.

**只读**: 是

</details>

---

#### TextDocumentContentChangeEvent {#textdocumentcontentchangeevent}

##### Properties

<div id="textdocumentcontentchangeevent-range"></div>

<details>
<summary><code>range: <a href="#range">Range</a></code></summary>

</details>

<div id="textdocumentcontentchangeevent-rangeoffset"></div>

<details>
<summary><code>rangeOffset: number</code></summary>

The offset of the range that got replaced.

</details>

<div id="textdocumentcontentchangeevent-rangelength"></div>

<details>
<summary><code>rangeLength: number</code></summary>

The length of the range that got replaced.

</details>

<div id="textdocumentcontentchangeevent-text"></div>

<details>
<summary><code>text: string</code></summary>

The new text for the range.

</details>

---

#### TextDocumentContentProvider {#textdocumentcontentprovider}

A text document content provider allows to add readonly documents
to the editor, such as source from a dll or generated html from md.

Content providers are registered
for a [uri-scheme](#Uri.scheme). When a uri with that scheme is to
be loaded the content provider is
asked.

##### Properties

<div id="textdocumentcontentprovider-ondidchange"></div>

<details>
<summary><code>onDidChange: <a href="#event">Event</a>&lt;<a href="#uri">Uri</a>&gt;</code></summary>

An event to signal a resource has changed.

</details>

##### Methods

<div id="textdocumentcontentprovider-providetextdocumentcontent"></div>

<details>
<summary><code>provideTextDocumentContent(uri: Uri, token: CancellationToken): ProviderResult&lt;string&gt;;</code></summary>

Provide textual content for a given uri.

The editor will use the returned string-content to create a readonly
<a href="#textdocument">document</a>. Resources allocated should be released when
the corresponding document has been closed.

</details>

---

#### TextDocumentShowOptions {#textdocumentshowoptions}

Represents options to configure the behavior of showing a <a href="#textdocument">document</a> in an <a href="#texteditor">editor</a>.

##### Properties

<div id="textdocumentshowoptions-viewcolumn"></div>

<details>
<summary><code>viewColumn: <a href="#viewcolumn">ViewColumn</a></code></summary>

An optional view column in which the <a href="#texteditor">editor</a> should be shown.
The default is the active, other values are adjusted to
be `Min(column, columnCount + 1)`, the active-column is
not adjusted. Use [`ViewColumn.Beside`](#ViewColumn.Beside) to open the
editor to the side of the currently active one.

</details>

<div id="textdocumentshowoptions-preservefocus"></div>

<details>
<summary><code>preserveFocus: boolean</code></summary>

An optional flag that when `true` will stop the <a href="#texteditor">editor</a> from taking focus.

</details>

<div id="textdocumentshowoptions-preview"></div>

<details>
<summary><code>preview: boolean</code></summary>

An optional flag that controls if an <a href="#texteditor">editor</a>-tab will be replaced
with the next editor or if it will be kept.

</details>

<div id="textdocumentshowoptions-selection"></div>

<details>
<summary><code>selection: <a href="#range">Range</a></code></summary>

An optional selection to apply for the document in the <a href="#texteditor">editor</a>.

</details>

---

#### TextDocumentWillSaveEvent {#textdocumentwillsaveevent}

An event that is fired when a <a href="#textdocument">document</a> will be saved.

To make modifications to the document before it is being saved, call the
[`waitUntil`](#TextDocumentWillSaveEvent.waitUntil)-function with a thenable
that resolves to an array of <a href="#textedit">text edits</a>.

##### Properties

<div id="textdocumentwillsaveevent-document"></div>

<details>
<summary><code>document: <a href="#textdocument">TextDocument</a></code></summary>

The document that will be saved.

</details>

<div id="textdocumentwillsaveevent-reason"></div>

<details>
<summary><code>reason: <a href="#textdocumentsavereason">TextDocumentSaveReason</a></code></summary>

The reason why save was triggered.

</details>

##### Methods

<div id="textdocumentwillsaveevent-waituntil"></div>

<details>
<summary><code>waitUntil(thenable: Thenable&lt;TextEdit[]&gt;): void;</code></summary>

Allows to pause the event loop and to apply [pre-save-edits](#TextEdit).
Edits of subsequent calls to this function will be applied in order. The
edits will be *ignored* if concurrent modifications of the document happened.

*Note:* This function can only be called during event dispatch and not
in an asynchronous manner:

```ts
workspace.onWillSaveTextDocument(event =&gt; &#123;
 // async, will *throw* an error
 setTimeout(() =&gt; event.waitUntil(promise));

 // sync, OK
 event.waitUntil(promise);
&#125;)
```

</details>

<div id="textdocumentwillsaveevent-waituntil"></div>

<details>
<summary><code>waitUntil(thenable: Thenable&lt;any&gt;): void;</code></summary>

Allows to pause the event loop until the provided thenable resolved.

*Note:* This function can only be called during event dispatch.

</details>

---

#### TextEditor {#texteditor}

Represents a text editor.
To close editor use 'workbench.action.closeActiveEditor' command.

##### Properties

<div id="texteditor-document"></div>

<details>
<summary><code>document: <a href="#textdocument">TextDocument</a></code></summary>

The document associated with this text editor. The document will be the same for the entire lifetime of this text editor.

**只读**: 是

</details>

<div id="texteditor-selection"></div>

<details>
<summary><code>selection: <a href="#selection">Selection</a></code></summary>

The primary selection on this text editor. Shorthand for `TextEditor.selections[0]`.

</details>

<div id="texteditor-selections"></div>

<details>
<summary><code>selections: readonly <a href="#selection">Selection</a>[]</code></summary>

The selections in this text editor. The primary selection is always at index 0.

</details>

<div id="texteditor-visibleranges"></div>

<details>
<summary><code>visibleRanges: readonly <a href="#range">Range</a>[]</code></summary>

The current visible ranges in the editor (vertically).
This accounts only for vertical scrolling, and not for horizontal scrolling.

**只读**: 是

</details>

<div id="texteditor-options"></div>

<details>
<summary><code>options: <a href="#texteditoroptions">TextEditorOptions</a></code></summary>

Text editor options.

</details>

<div id="texteditor-viewcolumn"></div>

<details>
<summary><code>viewColumn: <a href="#viewcolumn">ViewColumn</a> | undefined</code></summary>

The column in which this editor shows. Will be `undefined` in case this
isn't one of the main editors, e.g. an embedded editor, or when the editor
column is larger than three.

**只读**: 是

</details>

##### Methods

<div id="texteditor-edit"></div>

<details>
<summary><code>edit(callback: (editBuilder: TextEditorEdit) =&gt; void, options?: &#123; undoStopBefore: boolean; undoStopAfter: boolean; &#125;): Thenable&lt;boolean&gt;;</code></summary>

Perform an edit on the document associated with this text editor.

The given callback-function is invoked with an [edit-builder](#TextEditorEdit) which must
be used to make edits. Note that the edit-builder is only valid while the
callback executes.

</details>

<div id="texteditor-insertsnippet"></div>

<details>
<summary><code>insertSnippet(snippet: SnippetString, location?: Position | Range | Position[] | Range[], options?: &#123; undoStopBefore: boolean; undoStopAfter: boolean; &#125;): Thenable&lt;boolean&gt;;</code></summary>

Insert a <a href="#snippetstring">snippet</a> and put the editor into snippet mode. "Snippet mode"
means the editor adds placeholders and additional cursors so that the user can complete
or accept the snippet.

</details>

<div id="texteditor-setdecorations"></div>

<details>
<summary><code>setDecorations(decorationType: TextEditorDecorationType, rangesOrOptions: Range[] | DecorationOptions[]): void;</code></summary>

Adds a set of decorations to the text editor. If a set of decorations already exists with
the given <a href="#texteditordecorationtype">decoration type</a>, they will be replaced.

</details>

<div id="texteditor-revealrange"></div>

<details>
<summary><code>revealRange(range: Range, revealType?: TextEditorRevealType): void;</code></summary>

Scroll as indicated by `revealType` in order to reveal the given range.

</details>

<div id="texteditor-show"></div>

<details>
<summary><code>show(column?: ViewColumn): void;</code></summary>

Shows this text editor. A <a href="#viewcolumn">column</a> can be provided to control where the editor is being shown. Might change the active editor.

</details>

<div id="texteditor-hide"></div>

<details>
<summary><code>hide(): void;</code></summary>

Hides this text editor.

</details>

---

#### TextEditorDecorationType {#texteditordecorationtype}

Represents a handle to a set of decorations
sharing the same <a href="#decorationrenderoptions">styling options</a> in a <a href="#texteditor">text editor</a>.

To get an instance of a `TextEditorDecorationType` use
createTextEditorDecorationType.

##### Properties

<div id="texteditordecorationtype-key"></div>

<details>
<summary><code>key: string</code></summary>

Internal representation of the handle.

**只读**: 是

</details>

##### Methods

<div id="texteditordecorationtype-dispose"></div>

<details>
<summary><code>dispose(): void;</code></summary>

Remove this decoration type and all decorations on all text editors using it.

</details>

---

#### TextEditorEdit {#texteditoredit}

##### Methods

<div id="texteditoredit-replace"></div>

<details>
<summary><code>replace(location: Position | Range | Selection, value: string): void;</code></summary>

Replace a certain text region with a new value.
You can use \r\n or \n in `value` and they will be normalized to the current <a href="#textdocument">document</a>.

</details>

<div id="texteditoredit-insert"></div>

<details>
<summary><code>insert(location: Position, value: string): void;</code></summary>

Insert text at a location.
You can use \r\n or \n in `value` and they will be normalized to the current <a href="#textdocument">document</a>.
Although the equivalent text edit can be made with replace, `insert` will produce a different resulting selection (it will get moved).

</details>

<div id="texteditoredit-delete"></div>

<details>
<summary><code>delete(location: Range | Selection): void;</code></summary>

Delete a certain text region.

</details>

<div id="texteditoredit-setendofline"></div>

<details>
<summary><code>setEndOfLine(endOfLine: EndOfLine): void;</code></summary>

Set the end of line sequence.

</details>

---

#### TextEditorOptions {#texteditoroptions}

Represents a text editor's options

##### Properties

<div id="texteditoroptions-tabsize"></div>

<details>
<summary><code>tabSize: number | string</code></summary>

The size in spaces a tab takes. This is used for two purposes:
 - the rendering width of a tab character;
 - the number of spaces to insert when insertSpaces is true.

When getting a text editor's options, this property will always be a number (resolved).
When setting a text editor's options, this property is optional and it can be a number or `"auto"`.

</details>

<div id="texteditoroptions-indentsize"></div>

<details>
<summary><code>indentSize: number | string</code></summary>

The number of spaces to insert when insertSpaces is true.

When getting a text editor's options, this property will always be a number (resolved).
When setting a text editor's options, this property is optional and it can be a number or `"tabSize"`.

</details>

<div id="texteditoroptions-insertspaces"></div>

<details>
<summary><code>insertSpaces: boolean | string</code></summary>

When pressing Tab insert n spaces.
When getting a text editor's options, this property will always be a boolean (resolved).
When setting a text editor's options, this property is optional and it can be a boolean or `"auto"`.

</details>

<div id="texteditoroptions-cursorstyle"></div>

<details>
<summary><code>cursorStyle: <a href="#texteditorcursorstyle">TextEditorCursorStyle</a></code></summary>

The rendering style of the cursor in this editor.
When getting a text editor's options, this property will always be present.
When setting a text editor's options, this property is optional.

</details>

<div id="texteditoroptions-linenumbers"></div>

<details>
<summary><code>lineNumbers: <a href="#texteditorlinenumbersstyle">TextEditorLineNumbersStyle</a></code></summary>

Render relative line numbers w.r.t. the current line number.
When getting a text editor's options, this property will always be present.
When setting a text editor's options, this property is optional.

</details>

---

#### TextEditorOptionsChangeEvent {#texteditoroptionschangeevent}

Represents an event describing the change in a text editor's options.

##### Properties

<div id="texteditoroptionschangeevent-texteditor"></div>

<details>
<summary><code>textEditor: <a href="#texteditor">TextEditor</a></code></summary>

The <a href="#texteditor">text editor</a> for which the options have changed.

**只读**: 是

</details>

<div id="texteditoroptionschangeevent-options"></div>

<details>
<summary><code>options: <a href="#texteditoroptions">TextEditorOptions</a></code></summary>

The new value for the text editor's options.

**只读**: 是

</details>

---

#### TextEditorSelectionChangeEvent {#texteditorselectionchangeevent}

Represents an event describing the change in a text editor's selections.

##### Properties

<div id="texteditorselectionchangeevent-texteditor"></div>

<details>
<summary><code>textEditor: <a href="#texteditor">TextEditor</a></code></summary>

The <a href="#texteditor">text editor</a> for which the selections have changed.

**只读**: 是

</details>

<div id="texteditorselectionchangeevent-selections"></div>

<details>
<summary><code>selections: readonly <a href="#selection">Selection</a>[]</code></summary>

The new value for the text editor's selections.

**只读**: 是

</details>

<div id="texteditorselectionchangeevent-kind"></div>

<details>
<summary><code>kind: <a href="#texteditorselectionchangekind">TextEditorSelectionChangeKind</a> | undefined</code></summary>

The <a href="#texteditorselectionchangekind">change kind</a> which has triggered this
event. Can be `undefined`.

**只读**: 是

</details>

---

#### TextEditorViewColumnChangeEvent {#texteditorviewcolumnchangeevent}

Represents an event describing the change of a text editor's view column.

##### Properties

<div id="texteditorviewcolumnchangeevent-texteditor"></div>

<details>
<summary><code>textEditor: <a href="#texteditor">TextEditor</a></code></summary>

The <a href="#texteditor">text editor</a> for which the view column has changed.

**只读**: 是

</details>

<div id="texteditorviewcolumnchangeevent-viewcolumn"></div>

<details>
<summary><code>viewColumn: <a href="#viewcolumn">ViewColumn</a></code></summary>

The new value for the text editor's view column.

**只读**: 是

</details>

---

#### TextEditorVisibleRangesChangeEvent {#texteditorvisiblerangeschangeevent}

Represents an event describing the change in a text editor's visible ranges.

##### Properties

<div id="texteditorvisiblerangeschangeevent-texteditor"></div>

<details>
<summary><code>textEditor: <a href="#texteditor">TextEditor</a></code></summary>

The <a href="#texteditor">text editor</a> for which the visible ranges have changed.

**只读**: 是

</details>

<div id="texteditorvisiblerangeschangeevent-visibleranges"></div>

<details>
<summary><code>visibleRanges: readonly <a href="#range">Range</a>[]</code></summary>

The new value for the text editor's visible ranges.

**只读**: 是

</details>

---

#### TextLine {#textline}

Represents a line of text, such as a line of source code.

TextLine objects are __immutable__. When a <a href="#textdocument">document</a> changes,
previously retrieved lines will not represent the latest state.

##### Properties

<div id="textline-linenumber"></div>

<details>
<summary><code>lineNumber: number</code></summary>

The zero-based line number.

**只读**: 是

</details>

<div id="textline-text"></div>

<details>
<summary><code>text: string</code></summary>

The text of this line without the line separator characters.

**只读**: 是

</details>

<div id="textline-range"></div>

<details>
<summary><code>range: <a href="#range">Range</a></code></summary>

The range this line covers without the line separator characters.

**只读**: 是

</details>

<div id="textline-rangeincludinglinebreak"></div>

<details>
<summary><code>rangeIncludingLineBreak: <a href="#range">Range</a></code></summary>

The range this line covers with the line separator characters.

**只读**: 是

</details>

<div id="textline-firstnonwhitespacecharacterindex"></div>

<details>
<summary><code>firstNonWhitespaceCharacterIndex: number</code></summary>

The offset of the first character which is not a whitespace character as defined
by `/\s/`. **Note** that if a line is all whitespaces the length of the line is returned.

**只读**: 是

</details>

<div id="textline-isemptyorwhitespace"></div>

<details>
<summary><code>isEmptyOrWhitespace: boolean</code></summary>

Whether this line is whitespace only, shorthand
for [TextLine.firstNonWhitespaceCharacterIndex](#TextLine.firstNonWhitespaceCharacterIndex) === [TextLine.text.length](#TextLine.text).

**只读**: 是

</details>

---

#### TextSearchComplete {#textsearchcomplete}

Information collected when text search is complete.

##### Properties

<div id="textsearchcomplete-limithit"></div>

<details>
<summary><code>limitHit: boolean</code></summary>

Whether the search hit the limit on the maximum number of search results.
`maxResults` on [`TextSearchOptions`](#TextSearchOptions) specifies the max number of results.
- If exactly that number of matches exist, this should be false.
- If `maxResults` matches are returned and more exist, this should be true.
- If search hits an internal limit which is less than `maxResults`, this should be true.

</details>

---

#### TextSearchComplete {#textsearchcomplete}

Information collected when text search is complete.

##### Properties

<div id="textsearchcomplete-limithit"></div>

<details>
<summary><code>limitHit: boolean</code></summary>

Whether the search hit the limit on the maximum number of search results.
`maxResults` on [`TextSearchOptions`](#TextSearchOptions) specifies the max number of results.
- If exactly that number of matches exist, this should be false.
- If `maxResults` matches are returned and more exist, this should be true.
- If search hits an internal limit which is less than `maxResults`, this should be true.

</details>

---

#### TextSearchContext {#textsearchcontext}

A line of context surrounding a TextSearchMatch.

##### Properties

<div id="textsearchcontext-uri"></div>

<details>
<summary><code>uri: <a href="#uri">Uri</a></code></summary>

The uri for the matching document.

</details>

<div id="textsearchcontext-text"></div>

<details>
<summary><code>text: string</code></summary>

One line of text.
previewOptions.charsPerLine applies to this

</details>

<div id="textsearchcontext-linenumber"></div>

<details>
<summary><code>lineNumber: number</code></summary>

The line number of this line of context.

</details>

---

#### TextSearchContext {#textsearchcontext}

A line of context surrounding a TextSearchMatch.

##### Properties

<div id="textsearchcontext-uri"></div>

<details>
<summary><code>uri: <a href="#uri">Uri</a></code></summary>

The uri for the matching document.

</details>

<div id="textsearchcontext-text"></div>

<details>
<summary><code>text: string</code></summary>

One line of text.
previewOptions.charsPerLine applies to this

</details>

<div id="textsearchcontext-linenumber"></div>

<details>
<summary><code>lineNumber: number</code></summary>

The line number of this line of context.

</details>

---

#### TextSearchMatch {#textsearchmatch}

A match from a text search

##### Properties

<div id="textsearchmatch-uri"></div>

<details>
<summary><code>uri: <a href="#uri">Uri</a></code></summary>

The uri for the matching document.

</details>

<div id="textsearchmatch-ranges"></div>

<details>
<summary><code>ranges: <a href="#range">Range</a> | <a href="#range">Range</a>[]</code></summary>

The range of the match within the document, or multiple ranges for multiple matches.

</details>

<div id="textsearchmatch-preview"></div>

<details>
<summary><code>preview: <a href="#textsearchmatchpreview">TextSearchMatchPreview</a></code></summary>

A preview of the text match.

</details>

---

#### TextSearchMatch {#textsearchmatch}

A match from a text search

##### Properties

<div id="textsearchmatch-uri"></div>

<details>
<summary><code>uri: <a href="#uri">Uri</a></code></summary>

The uri for the matching document.

</details>

<div id="textsearchmatch-ranges"></div>

<details>
<summary><code>ranges: <a href="#range">Range</a> | <a href="#range">Range</a>[]</code></summary>

The range of the match within the document, or multiple ranges for multiple matches.

</details>

<div id="textsearchmatch-preview"></div>

<details>
<summary><code>preview: <a href="#textsearchmatchpreview">TextSearchMatchPreview</a></code></summary>

A preview of the text match.

</details>

---

#### TextSearchMatchPreview {#textsearchmatchpreview}

A preview of the text result.

##### Properties

<div id="textsearchmatchpreview-text"></div>

<details>
<summary><code>text: string</code></summary>

The matching lines of text, or a portion of the matching line that contains the match.

</details>

<div id="textsearchmatchpreview-matches"></div>

<details>
<summary><code>matches: <a href="#range">Range</a> | <a href="#range">Range</a>[]</code></summary>

The Range within `text` corresponding to the text of the match.
The number of matches must match the TextSearchMatch's range property.

</details>

---

#### TextSearchMatchPreview {#textsearchmatchpreview}

A preview of the text result.

##### Properties

<div id="textsearchmatchpreview-text"></div>

<details>
<summary><code>text: string</code></summary>

The matching lines of text, or a portion of the matching line that contains the match.

</details>

<div id="textsearchmatchpreview-matches"></div>

<details>
<summary><code>matches: <a href="#range">Range</a> | <a href="#range">Range</a>[]</code></summary>

The Range within `text` corresponding to the text of the match.
The number of matches must match the TextSearchMatch's range property.

</details>

---

#### TextSearchPreviewOptions {#textsearchpreviewoptions}

Options to specify the size of the result text preview.
These options don't affect the size of the match itself, just the amount of preview text.

##### Properties

<div id="textsearchpreviewoptions-matchlines"></div>

<details>
<summary><code>matchLines: number</code></summary>

The maximum number of lines in the preview.
Only search providers that support multiline search will ever return more than one line in the match.

</details>

<div id="textsearchpreviewoptions-charsperline"></div>

<details>
<summary><code>charsPerLine: number</code></summary>

The maximum number of characters included per line.

</details>

---

#### TextSearchQuery {#textsearchquery}

The parameters of a query for text search.

##### Properties

<div id="textsearchquery-pattern"></div>

<details>
<summary><code>pattern: string</code></summary>

The text pattern to search for.

</details>

<div id="textsearchquery-ismultiline"></div>

<details>
<summary><code>isMultiline: boolean</code></summary>

Whether or not `pattern` should match multiple lines of text.

</details>

<div id="textsearchquery-isregexp"></div>

<details>
<summary><code>isRegExp: boolean</code></summary>

Whether or not `pattern` should be interpreted as a regular expression.

</details>

<div id="textsearchquery-iscasesensitive"></div>

<details>
<summary><code>isCaseSensitive: boolean</code></summary>

Whether or not the search should be case-sensitive.

</details>

<div id="textsearchquery-iswordmatch"></div>

<details>
<summary><code>isWordMatch: boolean</code></summary>

Whether or not to search for whole word matches only.

</details>

---

#### ThemableDecorationAttachmentRenderOptions {#themabledecorationattachmentrenderoptions}

##### Properties

<div id="themabledecorationattachmentrenderoptions-contenttext"></div>

<details>
<summary><code>contentText: string</code></summary>

Defines a text content that is shown in the attachment. Either an icon or a text can be shown, but not both.

</details>

<div id="themabledecorationattachmentrenderoptions-contenticonpath"></div>

<details>
<summary><code>contentIconPath: string | <a href="#uri">Uri</a></code></summary>

An **absolute path** or an URI to an image to be rendered in the attachment. Either an icon
or a text can be shown, but not both.

</details>

<div id="themabledecorationattachmentrenderoptions-border"></div>

<details>
<summary><code>border: string</code></summary>

CSS styling property that will be applied to the decoration attachment.

</details>

<div id="themabledecorationattachmentrenderoptions-bordercolor"></div>

<details>
<summary><code>borderColor: string | <a href="#themecolor">ThemeColor</a></code></summary>

CSS styling property that will be applied to text enclosed by a decoration.

</details>

<div id="themabledecorationattachmentrenderoptions-fontstyle"></div>

<details>
<summary><code>fontStyle: string</code></summary>

CSS styling property that will be applied to the decoration attachment.

</details>

<div id="themabledecorationattachmentrenderoptions-fontweight"></div>

<details>
<summary><code>fontWeight: string</code></summary>

CSS styling property that will be applied to the decoration attachment.

</details>

<div id="themabledecorationattachmentrenderoptions-textdecoration"></div>

<details>
<summary><code>textDecoration: string</code></summary>

CSS styling property that will be applied to the decoration attachment.

</details>

<div id="themabledecorationattachmentrenderoptions-color"></div>

<details>
<summary><code>color: string | <a href="#themecolor">ThemeColor</a></code></summary>

CSS styling property that will be applied to the decoration attachment.

</details>

<div id="themabledecorationattachmentrenderoptions-backgroundcolor"></div>

<details>
<summary><code>backgroundColor: string | <a href="#themecolor">ThemeColor</a></code></summary>

CSS styling property that will be applied to the decoration attachment.

</details>

<div id="themabledecorationattachmentrenderoptions-margin"></div>

<details>
<summary><code>margin: string</code></summary>

CSS styling property that will be applied to the decoration attachment.

</details>

<div id="themabledecorationattachmentrenderoptions-width"></div>

<details>
<summary><code>width: string</code></summary>

CSS styling property that will be applied to the decoration attachment.

</details>

<div id="themabledecorationattachmentrenderoptions-height"></div>

<details>
<summary><code>height: string</code></summary>

CSS styling property that will be applied to the decoration attachment.

</details>

---

#### ThemableDecorationInstanceRenderOptions {#themabledecorationinstancerenderoptions}

##### Properties

<div id="themabledecorationinstancerenderoptions-before"></div>

<details>
<summary><code>before: <a href="#themabledecorationattachmentrenderoptions">ThemableDecorationAttachmentRenderOptions</a></code></summary>

Defines the rendering options of the attachment that is inserted before the decorated text

</details>

<div id="themabledecorationinstancerenderoptions-after"></div>

<details>
<summary><code>after: <a href="#themabledecorationattachmentrenderoptions">ThemableDecorationAttachmentRenderOptions</a></code></summary>

Defines the rendering options of the attachment that is inserted after the decorated text

</details>

---

#### ThemableDecorationRenderOptions {#themabledecorationrenderoptions}

Represents theme specific rendering styles for a <a href="#texteditordecorationtype">text editor decoration</a>.

##### Properties

<div id="themabledecorationrenderoptions-backgroundcolor"></div>

<details>
<summary><code>backgroundColor: string | <a href="#themecolor">ThemeColor</a></code></summary>

Background color of the decoration. Use rgba() and define transparent background colors to play well with other decorations.
Alternatively a color from the color registry can be <a href="#themecolor">referenced</a>.

</details>

<div id="themabledecorationrenderoptions-outline"></div>

<details>
<summary><code>outline: string</code></summary>

CSS styling property that will be applied to text enclosed by a decoration.

</details>

<div id="themabledecorationrenderoptions-outlinecolor"></div>

<details>
<summary><code>outlineColor: string | <a href="#themecolor">ThemeColor</a></code></summary>

CSS styling property that will be applied to text enclosed by a decoration.
Better use 'outline' for setting one or more of the individual outline properties.

</details>

<div id="themabledecorationrenderoptions-outlinestyle"></div>

<details>
<summary><code>outlineStyle: string</code></summary>

CSS styling property that will be applied to text enclosed by a decoration.
Better use 'outline' for setting one or more of the individual outline properties.

</details>

<div id="themabledecorationrenderoptions-outlinewidth"></div>

<details>
<summary><code>outlineWidth: string</code></summary>

CSS styling property that will be applied to text enclosed by a decoration.
Better use 'outline' for setting one or more of the individual outline properties.

</details>

<div id="themabledecorationrenderoptions-border"></div>

<details>
<summary><code>border: string</code></summary>

CSS styling property that will be applied to text enclosed by a decoration.

</details>

<div id="themabledecorationrenderoptions-bordercolor"></div>

<details>
<summary><code>borderColor: string | <a href="#themecolor">ThemeColor</a></code></summary>

CSS styling property that will be applied to text enclosed by a decoration.
Better use 'border' for setting one or more of the individual border properties.

</details>

<div id="themabledecorationrenderoptions-borderradius"></div>

<details>
<summary><code>borderRadius: string</code></summary>

CSS styling property that will be applied to text enclosed by a decoration.
Better use 'border' for setting one or more of the individual border properties.

</details>

<div id="themabledecorationrenderoptions-borderspacing"></div>

<details>
<summary><code>borderSpacing: string</code></summary>

CSS styling property that will be applied to text enclosed by a decoration.
Better use 'border' for setting one or more of the individual border properties.

</details>

<div id="themabledecorationrenderoptions-borderstyle"></div>

<details>
<summary><code>borderStyle: string</code></summary>

CSS styling property that will be applied to text enclosed by a decoration.
Better use 'border' for setting one or more of the individual border properties.

</details>

<div id="themabledecorationrenderoptions-borderwidth"></div>

<details>
<summary><code>borderWidth: string</code></summary>

CSS styling property that will be applied to text enclosed by a decoration.
Better use 'border' for setting one or more of the individual border properties.

</details>

<div id="themabledecorationrenderoptions-fontstyle"></div>

<details>
<summary><code>fontStyle: string</code></summary>

CSS styling property that will be applied to text enclosed by a decoration.

</details>

<div id="themabledecorationrenderoptions-fontweight"></div>

<details>
<summary><code>fontWeight: string</code></summary>

CSS styling property that will be applied to text enclosed by a decoration.

</details>

<div id="themabledecorationrenderoptions-textdecoration"></div>

<details>
<summary><code>textDecoration: string</code></summary>

CSS styling property that will be applied to text enclosed by a decoration.

</details>

<div id="themabledecorationrenderoptions-cursor"></div>

<details>
<summary><code>cursor: string</code></summary>

CSS styling property that will be applied to text enclosed by a decoration.

</details>

<div id="themabledecorationrenderoptions-color"></div>

<details>
<summary><code>color: string | <a href="#themecolor">ThemeColor</a></code></summary>

CSS styling property that will be applied to text enclosed by a decoration.

</details>

<div id="themabledecorationrenderoptions-opacity"></div>

<details>
<summary><code>opacity: string</code></summary>

CSS styling property that will be applied to text enclosed by a decoration.

</details>

<div id="themabledecorationrenderoptions-letterspacing"></div>

<details>
<summary><code>letterSpacing: string</code></summary>

CSS styling property that will be applied to text enclosed by a decoration.

</details>

<div id="themabledecorationrenderoptions-guttericonpath"></div>

<details>
<summary><code>gutterIconPath: string | <a href="#uri">Uri</a></code></summary>

An **absolute path** or an URI to an image to be rendered in the gutter.

</details>

<div id="themabledecorationrenderoptions-guttericonsize"></div>

<details>
<summary><code>gutterIconSize: string</code></summary>

Specifies the size of the gutter icon.
Available values are 'auto', 'contain', 'cover' and any percentage value.
For further information: https://msdn.microsoft.com/en-us/library/jj127316(v=vs.85).aspx

</details>

<div id="themabledecorationrenderoptions-overviewrulercolor"></div>

<details>
<summary><code>overviewRulerColor: string | <a href="#themecolor">ThemeColor</a></code></summary>

The color of the decoration in the overview ruler. Use rgba() and define transparent colors to play well with other decorations.

</details>

<div id="themabledecorationrenderoptions-before"></div>

<details>
<summary><code>before: <a href="#themabledecorationattachmentrenderoptions">ThemableDecorationAttachmentRenderOptions</a></code></summary>

Defines the rendering options of the attachment that is inserted before the decorated text

</details>

<div id="themabledecorationrenderoptions-after"></div>

<details>
<summary><code>after: <a href="#themabledecorationattachmentrenderoptions">ThemableDecorationAttachmentRenderOptions</a></code></summary>

Defines the rendering options of the attachment that is inserted after the decorated text

</details>

---

#### ThemeIconPath {#themeiconpath}

Represents theme-aware icon paths for light and dark themes.

##### Properties

<div id="themeiconpath-light"></div>

<details>
<summary><code>light: <a href="#uri">Uri</a></code></summary>

The icon path for the light theme.

</details>

<div id="themeiconpath-dark"></div>

<details>
<summary><code>dark: <a href="#uri">Uri</a></code></summary>

The icon path for the dark theme.

</details>

---

#### Timeline {#timeline}

##### Properties

<div id="timeline-paging"></div>

<details>
<summary><code>paging: &#123; readonly cursor: string | undefined; &#125;</code></summary>

**只读**: 是

</details>

<div id="timeline-items"></div>

<details>
<summary><code>items: readonly <a href="#timelineitem">TimelineItem</a>[]</code></summary>

An array of [timeline items](#TimelineItem).

**只读**: 是

</details>

---

#### TimelineChangeEvent {#timelinechangeevent}

##### Properties

<div id="timelinechangeevent-uri"></div>

<details>
<summary><code>uri: <a href="#uri">Uri</a></code></summary>

The [uri](#Uri) of the resource for which the timeline changed.

</details>

<div id="timelinechangeevent-reset"></div>

<details>
<summary><code>reset: boolean</code></summary>

A flag which indicates whether the entire timeline should be reset.

</details>

---

#### TimelineOptions {#timelineoptions}

##### Properties

<div id="timelineoptions-cursor"></div>

<details>
<summary><code>cursor: string</code></summary>

A provider-defined cursor specifying the starting point of the timeline items that should be returned.

</details>

<div id="timelineoptions-limit"></div>

<details>
<summary><code>limit: number | &#123; timestamp: number; id?: string &#125;</code></summary>

An optional maximum number timeline items or the all timeline items newer (inclusive) than the timestamp or id that should be returned.
If `undefined` all timeline items should be returned.

</details>

---

#### TimelineProvider {#timelineprovider}

##### Properties

<div id="timelineprovider-ondidchange"></div>

<details>
<summary><code>onDidChange: <a href="#event">Event</a>&lt;<a href="#timelinechangeevent">TimelineChangeEvent</a> | undefined&gt;</code></summary>

An optional event to signal that the timeline for a source has changed.
To signal that the timeline for all resources (uris) has changed, do not pass any argument or pass `undefined`.

</details>

<div id="timelineprovider-id"></div>

<details>
<summary><code>id: string</code></summary>

An identifier of the source of the timeline items. This can be used to filter sources.

**只读**: 是

</details>

<div id="timelineprovider-label"></div>

<details>
<summary><code>label: string</code></summary>

A human-readable string describing the source of the timeline items. This can be used as the display label when filtering sources.

**只读**: 是

</details>

##### Methods

<div id="timelineprovider-providetimeline"></div>

<details>
<summary><code>provideTimeline(uri: Uri, options: TimelineOptions, token: CancellationToken): ProviderResult&lt;Timeline&gt;;</code></summary>

Provide [timeline items](#TimelineItem) for a [Uri](#Uri).

</details>

---

#### TreeCheckboxChangeEvent {#treecheckboxchangeevent}

An event describing the change in a tree item's checkbox state.

##### Properties

<div id="treecheckboxchangeevent-items"></div>

<details>
<summary><code>items: ReadonlyArray&lt;[T, <a href="#treeitemcheckboxstate">TreeItemCheckboxState</a>]&gt;</code></summary>

The items that were checked or unchecked.

**只读**: 是

</details>

---

#### TreeDataProvider {#treedataprovider}

A data provider that provides tree data

##### Properties

<div id="treedataprovider-ondidchangetreedata"></div>

<details>
<summary><code>onDidChangeTreeData: <a href="#event">Event</a>&lt;T | T[] | undefined | null | void&gt;</code></summary>

An optional event to signal that an element or root has changed.
This will trigger the view to update the changed element/root and its children recursively (if shown).
To signal that root has changed, do not pass any argument or pass `undefined` or `null`.

</details>

##### Methods

<div id="treedataprovider-gettreeitem"></div>

<details>
<summary><code>getTreeItem(element: T): TreeItem | Thenable&lt;TreeItem&gt;;</code></summary>

Get <a href="#treeitem">TreeItem</a> representation of the `element`

</details>

<div id="treedataprovider-getchildren"></div>

<details>
<summary><code>getChildren(element?: T): ProviderResult&lt;T[]&gt;;</code></summary>

Get the children of `element` or root if no element is passed.

</details>

<div id="treedataprovider-getparent"></div>

<details>
<summary><code>getParent?(element: T): ProviderResult&lt;T&gt;;</code></summary>

Optional method to return the parent of `element`.
Return `null` or `undefined` if `element` is a child of root.

**NOTE:** This method should be implemented in order to access reveal API.

</details>

<div id="treedataprovider-resolvetreeitem"></div>

<details>
<summary><code>resolveTreeItem?(item: TreeItem, element: T, token: CancellationToken): ProviderResult&lt;TreeItem&gt;;</code></summary>

Called on hover to resolve the TreeItem property if it is undefined.
Called on tree item click/open to resolve the TreeItem property if it is undefined.
Only properties that were undefined can be resolved in `resolveTreeItem`.
Functionality may be expanded later to include being called to resolve other missing
properties on selection and/or on open.

Will only ever be called once per TreeItem.

onDidChangeTreeData should not be triggered from within resolveTreeItem.

*Note* that this function is called when tree items are already showing in the UI.
Because of that, no property that changes the presentation (label, description, etc.)
can be changed.

</details>

---

#### TreeDragAndDropController {#treedraganddropcontroller}

Provides support for drag and drop in `TreeView`.

##### Properties

<div id="treedraganddropcontroller-dropmimetypes"></div>

<details>
<summary><code>dropMimeTypes: readonly string[]</code></summary>

The mime types that the `handleDrop` method of this `DragAndDropController` supports.
This could be well-defined, existing, mime types, and also mime types defined by the extension.

To support drops from trees, you will need to add the mime type of that tree.
This includes drops from within the same tree.
The mime type of a tree is recommended to be of the format `application/vnd.code.tree.&lt;treeidlowercase&gt;`.

Use the special `files` mime type to support all types of dropped files <a href="#datatransferfile">files</a>, regardless of the file's actual mime type.

To learn the mime type of a dragged item:
1. Set up your `DragAndDropController`
2. Use the Developer: Set Log Level... command to set the level to "Debug"
3. Open the developer tools and drag the item with unknown mime type over your tree. The mime types will be logged to the developer console

Note that mime types that cannot be sent to the extension will be omitted.

**只读**: 是

</details>

<div id="treedraganddropcontroller-dragmimetypes"></div>

<details>
<summary><code>dragMimeTypes: readonly string[]</code></summary>

The mime types that the `handleDrag` method of this `TreeDragAndDropController` may add to the tree data transfer.
This could be well-defined, existing, mime types, and also mime types defined by the extension.

The recommended mime type of the tree (`application/vnd.code.tree.&lt;treeidlowercase&gt;`) will be automatically added.

**只读**: 是

</details>

##### Methods

<div id="treedraganddropcontroller-handledrag"></div>

<details>
<summary><code>handleDrag?(source: readonly T[], dataTransfer: DataTransfer, token: CancellationToken): Thenable&lt;void&gt; | void;</code></summary>

When the user starts dragging items from this `DragAndDropController`, `handleDrag` will be called.
Extensions can use `handleDrag` to add their <a href="#datatransferitem">`DataTransferItem`</a> items to the drag and drop.

When the items are dropped on **another tree item** in **the same tree**, your `DataTransferItem` objects
will be preserved. Use the recommended mime type for the tree (`application/vnd.code.tree.&lt;treeidlowercase&gt;`) to add
tree objects in a data transfer. See the documentation for `DataTransferItem` for how best to take advantage of this.

To add a data transfer item that can be dragged into the editor, use the application specific mime type "text/uri-list".
The data for "text/uri-list" should be a string with `toString()`ed Uris separated by newlines. To specify a cursor position in the file,
set the Uri's fragment to `L3,5`, where 3 is the line number and 5 is the column number.

</details>

<div id="treedraganddropcontroller-handledrop"></div>

<details>
<summary><code>handleDrop?(target: T | undefined, dataTransfer: DataTransfer, token: CancellationToken): Thenable&lt;void&gt; | void;</code></summary>

Called when a drag and drop action results in a drop on the tree that this `DragAndDropController` belongs to.

Extensions should fire onDidChangeTreeData for any elements that need to be refreshed.

</details>

---

#### TreeItem {#treeitem}

##### Properties

<div id="treeitem-shareableitem"></div>

<details>
<summary><code>shareableItem: <a href="#shareableitem">ShareableItem</a></code></summary>

An optional property which, when set, inlines a `Share` option in the context menu for this tree item.

</details>

---

#### TreeItemLabel {#treeitemlabel}

Label describing the <a href="#treeitem">Tree item</a>

##### Properties

<div id="treeitemlabel-label"></div>

<details>
<summary><code>label: string</code></summary>

A human-readable string describing the <a href="#treeitem">Tree item</a>.

</details>

<div id="treeitemlabel-highlights"></div>

<details>
<summary><code>highlights: [number, number][]</code></summary>

Ranges in the label to highlight. A range is defined as a tuple of two numbers where the
first is the inclusive start index and the second the exclusive end index

</details>

---

#### TreeView {#treeview}

Represents a Tree view

##### Properties

<div id="treeview-ondidexpandelement"></div>

<details>
<summary><code>onDidExpandElement: <a href="#event">Event</a>&lt;<a href="#treeviewexpansionevent">TreeViewExpansionEvent</a>&lt;T&gt;&gt;</code></summary>

Event that is fired when an element is expanded

**只读**: 是

</details>

<div id="treeview-ondidcollapseelement"></div>

<details>
<summary><code>onDidCollapseElement: <a href="#event">Event</a>&lt;<a href="#treeviewexpansionevent">TreeViewExpansionEvent</a>&lt;T&gt;&gt;</code></summary>

Event that is fired when an element is collapsed

**只读**: 是

</details>

<div id="treeview-selection"></div>

<details>
<summary><code>selection: readonly T[]</code></summary>

Currently selected elements.

**只读**: 是

</details>

<div id="treeview-ondidchangeselection"></div>

<details>
<summary><code>onDidChangeSelection: <a href="#event">Event</a>&lt;<a href="#treeviewselectionchangeevent">TreeViewSelectionChangeEvent</a>&lt;T&gt;&gt;</code></summary>

Event that is fired when the selection has changed

**只读**: 是

</details>

<div id="treeview-visible"></div>

<details>
<summary><code>visible: boolean</code></summary>

`true` if the <a href="#treeview">tree view</a> is visible otherwise `false`.

**只读**: 是

</details>

<div id="treeview-ondidchangevisibility"></div>

<details>
<summary><code>onDidChangeVisibility: <a href="#event">Event</a>&lt;<a href="#treeviewvisibilitychangeevent">TreeViewVisibilityChangeEvent</a>&gt;</code></summary>

Event that is fired when visibility has changed

**只读**: 是

</details>

<div id="treeview-ondidchangecheckboxstate"></div>

<details>
<summary><code>onDidChangeCheckboxState: <a href="#event">Event</a>&lt;<a href="#treecheckboxchangeevent">TreeCheckboxChangeEvent</a>&lt;T&gt;&gt;</code></summary>

An event to signal that an element or root has either been checked or unchecked.

**只读**: 是

</details>

<div id="treeview-message"></div>

<details>
<summary><code>message: string</code></summary>

An optional human-readable message that will be rendered in the view.
Setting the message to null, undefined, or empty string will remove the message from the view.

</details>

<div id="treeview-title"></div>

<details>
<summary><code>title: string</code></summary>

The tree view title is initially taken from the extension package.json
Changes to the title property will be properly reflected in the UI in the title of the view.

</details>

<div id="treeview-description"></div>

<details>
<summary><code>description: string</code></summary>

An optional human-readable subheading that will be rendered next to the main title.
Setting the description to null, undefined, or empty string will remove the message from the view.

</details>

<div id="treeview-badge"></div>

<details>
<summary><code>badge: <a href="#viewbadge">ViewBadge</a> | undefined</code></summary>

The badge to display for this TreeView.
To remove the badge, set to undefined.

</details>

##### Methods

<div id="treeview-reveal"></div>

<details>
<summary><code>reveal(element: T, options?: &#123; readonly select?: boolean; readonly focus?: boolean; readonly expand?: boolean | number; &#125;): Thenable&lt;void&gt;;</code></summary>

Reveals the given element in the tree view.
If the tree view is not visible then the tree view is shown and element is revealed.

By default revealed element is selected.
In order to not to select, set the option `select` to `false`.
In order to focus, set the option `focus` to `true`.
In order to expand the revealed element, set the option `expand` to `true`. To expand recursively set `expand` to the number of levels to expand.

* *NOTE:* In VS Code, you can expand only to 3 levels maximum. This is not the case in Theia, there are no limits to expansion level.
* *NOTE:* The <a href="#treedataprovider">TreeDataProvider</a> that the `TreeView` is registered with with must implement getParent method to access this API.

</details>

---

#### TreeViewExpansionEvent {#treeviewexpansionevent}

The event that is fired when an element in the <a href="#treeview">TreeView</a> is expanded or collapsed

##### Properties

<div id="treeviewexpansionevent-element"></div>

<details>
<summary><code>element: T</code></summary>

Element that is expanded or collapsed.

**只读**: 是

</details>

---

#### TreeViewOptions {#treeviewoptions}

Options for creating a <a href="#treeview">TreeView</a>

##### Properties

<div id="treeviewoptions-treedataprovider"></div>

<details>
<summary><code>treeDataProvider: <a href="#treedataprovider">TreeDataProvider</a>&lt;T&gt;</code></summary>

A data provider that provides tree data.

</details>

<div id="treeviewoptions-showcollapseall"></div>

<details>
<summary><code>showCollapseAll: boolean</code></summary>

Whether to show collapse all action or not.

</details>

<div id="treeviewoptions-draganddropcontroller"></div>

<details>
<summary><code>dragAndDropController: <a href="#treedraganddropcontroller">TreeDragAndDropController</a>&lt;T&gt;</code></summary>

An optional interface to implement drag and drop in the tree view.

</details>

<div id="treeviewoptions-canselectmany"></div>

<details>
<summary><code>canSelectMany: boolean</code></summary>

Whether the tree supports multi-select. When the tree supports multi-select and a command is executed from the tree,
the first argument to the command is the tree item that the command was executed on and the second argument is an
array containing all selected tree items.

</details>

<div id="treeviewoptions-managecheckboxstatemanually"></div>

<details>
<summary><code>manageCheckboxStateManually: boolean</code></summary>

By default, when the children of a tree item have already been fetched, child checkboxes are automatically managed based on the checked state of the parent tree item.
If the tree item is collapsed by default (meaning that the children haven't yet been fetched) then child checkboxes will not be updated.
To override this behavior and manage child and parent checkbox state in the extension, set this to `true`.

Examples where manageCheckboxStateManually is false, the default behavior:

1. A tree item is checked, then its children are fetched. The children will be checked.

2. A tree item's parent is checked. The tree item and all of it's siblings will be checked.
  - [ ] Parent
    - [ ] Child 1
    - [ ] Child 2
  When the user checks Parent, the tree will look like this:
  - [x] Parent
    - [x] Child 1
    - [x] Child 2

3. A tree item and all of it's siblings are checked. The parent will be checked.
  - [ ] Parent
    - [ ] Child 1
    - [ ] Child 2
  When the user checks Child 1 and Child 2, the tree will look like this:
  - [x] Parent
    - [x] Child 1
    - [x] Child 2

4. A tree item is unchecked. The parent will be unchecked.
  - [x] Parent
    - [x] Child 1
    - [x] Child 2
  When the user unchecks Child 1, the tree will look like this:
  - [ ] Parent
    - [ ] Child 1
    - [x] Child 2

</details>

---

#### TreeViewSelectionChangeEvent {#treeviewselectionchangeevent}

The event that is fired when there is a change in [tree view's selection](#TreeView.selection)

##### Properties

<div id="treeviewselectionchangeevent-selection"></div>

<details>
<summary><code>selection: readonly T[]</code></summary>

Selected elements.

**只读**: 是

</details>

---

#### TreeViewVisibilityChangeEvent {#treeviewvisibilitychangeevent}

The event that is fired when there is a change in [tree view's visibility](#TreeView.visible)

##### Properties

<div id="treeviewvisibilitychangeevent-visible"></div>

<details>
<summary><code>visible: boolean</code></summary>

`true` if the <a href="#treeview">tree view</a> is visible otherwise `false`.

**只读**: 是

</details>

---

#### TypeDefinitionProvider {#typedefinitionprovider}

The type definition provider defines the contract between extensions and
the go to type definition feature.

##### Methods

<div id="typedefinitionprovider-providetypedefinition"></div>

<details>
<summary><code>provideTypeDefinition(document: TextDocument, position: Position, token: CancellationToken): ProviderResult&lt;Definition | DefinitionLink[]&gt;;</code></summary>

Provide the type definition of the symbol at the given position and document.

</details>

---

#### TypeHierarchyProvider {#typehierarchyprovider}

The type hierarchy provider interface describes the contract between extensions
and the type hierarchy feature.

##### Methods

<div id="typehierarchyprovider-preparetypehierarchy"></div>

<details>
<summary><code>prepareTypeHierarchy(document: TextDocument, position: Position, token: CancellationToken): ProviderResult&lt;TypeHierarchyItem | TypeHierarchyItem[]&gt;;</code></summary>

Bootstraps type hierarchy by returning the item that is denoted by the given document
and position. This item will be used as entry into the type graph. Providers should
return `undefined` or `null` when there is no item at the given location.

</details>

<div id="typehierarchyprovider-providetypehierarchysupertypes"></div>

<details>
<summary><code>provideTypeHierarchySupertypes(item: TypeHierarchyItem, token: CancellationToken): ProviderResult&lt;TypeHierarchyItem[]&gt;;</code></summary>

Provide all supertypes for an item, e.g all types from which a type is derived/inherited. In graph terms this describes directed
and annotated edges inside the type graph, e.g the given item is the starting node and the result is the nodes
that can be reached.

</details>

<div id="typehierarchyprovider-providetypehierarchysubtypes"></div>

<details>
<summary><code>provideTypeHierarchySubtypes(item: TypeHierarchyItem, token: CancellationToken): ProviderResult&lt;TypeHierarchyItem[]&gt;;</code></summary>

Provide all subtypes for an item, e.g all types which are derived/inherited from the given item. In
graph terms this describes directed and annotated edges inside the type graph, e.g the given item is the starting
node and the result is the nodes that can be reached.

</details>

---

#### UploadDialogOptions {#uploaddialogoptions}

Options to configure the behaviour of a file upload dialog.

##### Properties

<div id="uploaddialogoptions-defaulturi"></div>

<details>
<summary><code>defaultUri: <a href="#uri">Uri</a></code></summary>

The resource, where files should be uploaded.

</details>

---

#### UriHandler {#urihandler}

A uri handler is responsible for handling system-wide <a href="#uri">uris</a>.

##### Methods

<div id="urihandler-handleuri"></div>

<details>
<summary><code>handleUri(uri: Uri): ProviderResult&lt;void&gt;;</code></summary>

Handle the provided system-wide <a href="#uri">uri</a>.

</details>

---

#### ViewBadge {#viewbadge}

A badge presenting a value for a view

##### Properties

<div id="viewbadge-tooltip"></div>

<details>
<summary><code>tooltip: string</code></summary>

A label to present in tooltip for the badge.

**只读**: 是

</details>

<div id="viewbadge-value"></div>

<details>
<summary><code>value: number</code></summary>

The value to present in the badge.

**只读**: 是

</details>

---

#### Webview {#webview}

A webview displays html content, like an iframe.

##### Properties

<div id="webview-options"></div>

<details>
<summary><code>options: <a href="#webviewoptions">WebviewOptions</a></code></summary>

Content settings for the webview.

</details>

<div id="webview-html"></div>

<details>
<summary><code>html: string</code></summary>

Contents of the webview.

Should be a complete html document.

</details>

<div id="webview-ondidreceivemessage"></div>

<details>
<summary><code>onDidReceiveMessage: <a href="#event">Event</a>&lt;any&gt;</code></summary>

Fired when the webview content posts a message.

**只读**: 是

</details>

<div id="webview-cspsource"></div>

<details>
<summary><code>cspSource: string</code></summary>

Content security policy source for webview resources.

This is the origin that should be used in a content security policy rule:

```
img-src https: $&#123;webview.cspSource&#125; ...;
```

**只读**: 是

</details>

##### Methods

<div id="webview-postmessage"></div>

<details>
<summary><code>postMessage(message: any): Thenable&lt;boolean&gt;;</code></summary>

Post a message to the webview content.

Messages are only delivered if the webview is visible.

</details>

<div id="webview-aswebviewuri"></div>

<details>
<summary><code>asWebviewUri(localResource: Uri): Uri;</code></summary>

Convert a uri for the local file system to one that can be used inside webviews.

Webviews cannot directly load resources from the workspace or local file system using `file:` uris. The
`asWebviewUri` function takes a local `file:` uri and converts it into a uri that can be used inside of
a webview to load the same resource:

```ts
webview.html = `&lt;img src="$&#123;webview.asWebviewUri(vscode.Uri.file('/Users/codey/workspace/cat.gif'))&#125;"&gt;`
```

</details>

---

#### WebviewOptions {#webviewoptions}

Content settings for a webview.

##### Properties

<div id="webviewoptions-closeable"></div>

<details>
<summary><code>closeable: boolean</code></summary>

Determine the dialog can be closed
Defaults to true

**只读**: 是

</details>

<div id="webviewoptions-controloptions"></div>

<details>
<summary><code>controlOptions: <a href="#dialogcontrolelement">DialogControlElement</a>[]</code></summary>

**只读**: 是

</details>

<div id="webviewoptions-enablescripts"></div>

<details>
<summary><code>enableScripts: boolean</code></summary>

Controls whether scripts are enabled in the webview content or not.

Defaults to false (scripts-disabled).

**只读**: 是

</details>

<div id="webviewoptions-enableforms"></div>

<details>
<summary><code>enableForms: boolean</code></summary>

Controls whether forms are enabled in the webview content or not.

Defaults to true if scripts are enabled. Otherwise defaults to false.
Explicitly setting this property to either true or false overrides the default.

**只读**: 是

</details>

<div id="webviewoptions-enablecommanduris"></div>

<details>
<summary><code>enableCommandUris: boolean | readonly string[]</code></summary>

Controls whether command uris are enabled in webview content or not.

Defaults to `false` (command uris are disabled).

If you pass in an array, only the commands in the array are allowed.

**只读**: 是

</details>

<div id="webviewoptions-localresourceroots"></div>

<details>
<summary><code>localResourceRoots: ReadonlyArray&lt;<a href="#uri">Uri</a>&gt;</code></summary>

Root paths from which the webview can load local (filesystem) resources using the `theia-resource:` scheme.

Default to the root folders of the current workspace plus the extension's install directory.

Pass in an empty array to disallow access to any local resources.

**只读**: 是

</details>

<div id="webviewoptions-portmapping"></div>

<details>
<summary><code>portMapping: ReadonlyArray&lt;<a href="#webviewportmapping">WebviewPortMapping</a>&gt;</code></summary>

Mappings of localhost ports used inside the webview.

Port mapping allow webviews to transparently define how localhost ports are resolved. This can be used
to allow using a static localhost port inside the webview that is resolved to random port that a service is
running on.

If a webview accesses localhost content, we recommend that you specify port mappings even if
the `webviewPort` and `extensionHostPort` ports are the same.

*Note* that port mappings only work for `http` or `https` urls. Websocket urls (e.g. `ws://localhost:3000`)
cannot be mapped to another port.

**只读**: 是

</details>

---

#### WebviewPanel {#webviewpanel}

##### Methods

<div id="webviewpanel-reveal"></div>

<details>
<summary><code>reveal(showOptions?: theia.WebviewPanelShowOptions, options?: theia.WebviewPanelOptions & theia.WebviewOptions): void;</code></summary>

Show the webview panel according to a given options.

A webview panel may only show in a single column at a time. If it is already showing, this
method moves it to a new column.

</details>

---

#### WebviewPanelOnDidChangeViewStateEvent {#webviewpanelondidchangeviewstateevent}

Event fired when a webview panel's view state changes.

##### Properties

<div id="webviewpanelondidchangeviewstateevent-webviewpanel"></div>

<details>
<summary><code>webviewPanel: <a href="#webviewpanel">WebviewPanel</a></code></summary>

Webview panel whose view state changed.

**只读**: 是

</details>

---

#### WebviewPanelOptions {#webviewpaneloptions}

Content settings for a webview panel.

##### Properties

<div id="webviewpaneloptions-enablefindwidget"></div>

<details>
<summary><code>enableFindWidget: boolean</code></summary>

Controls if the find widget is enabled in the panel.

Defaults to false.

**只读**: 是

</details>

<div id="webviewpaneloptions-retaincontextwhenhidden"></div>

<details>
<summary><code>retainContextWhenHidden: boolean</code></summary>

Controls if the webview panel's content (iframe) is kept around even when the panel
is no longer visible.

Normally the webview panel's html context is created when the panel becomes visible
and destroyed when it is is hidden. Extensions that have complex state
or UI can set the `retainContextWhenHidden` to make Theia keep the webview
context around, even when the webview moves to a background tab. When a webview using
`retainContextWhenHidden` becomes hidden, its scripts and other dynamic content are suspended.
When the panel becomes visible again, the context is automatically restored
in the exact same state it was in originally. You cannot send messages to a
hidden webview, even with `retainContextWhenHidden` enabled.

`retainContextWhenHidden` has a high memory overhead and should only be used if
your panel's context cannot be quickly saved and restored.

**只读**: 是

</details>

---

#### WebviewPanelShowOptions {#webviewpanelshowoptions}

Settings to determine where webview panel will be reside

##### Properties

<div id="webviewpanelshowoptions-area"></div>

<details>
<summary><code>area: <a href="#webviewpaneltargetarea">WebviewPanelTargetArea</a></code></summary>

Target area where webview panel will be resided. Shows in the 'WebviewPanelTargetArea.Main' area if undefined.

</details>

<div id="webviewpanelshowoptions-viewcolumn"></div>

<details>
<summary><code>viewColumn: number</code></summary>

Editor View column to show the panel in. Shows in the current `viewColumn` if undefined.

</details>

<div id="webviewpanelshowoptions-preservefocus"></div>

<details>
<summary><code>preserveFocus: boolean</code></summary>

When `true`, the webview will not take focus.

</details>

<div id="webviewpanelshowoptions-preservedata"></div>

<details>
<summary><code>preserveData: boolean</code></summary>

When 'false', the webview data will be cleaned up after close.

</details>

<div id="webviewpanelshowoptions-size"></div>

<details>
<summary><code>size: &#123; width: string, height: string &#125;</code></summary>

对话框大小

</details>

---

#### WebviewPortMapping {#webviewportmapping}

Defines a port mapping used for localhost inside the webview.

##### Properties

<div id="webviewportmapping-webviewport"></div>

<details>
<summary><code>webviewPort: number</code></summary>

Localhost port to remap inside the webview.

**只读**: 是

</details>

<div id="webviewportmapping-extensionhostport"></div>

<details>
<summary><code>extensionHostPort: number</code></summary>

Destination port. The `webviewPort` is resolved to this port.

**只读**: 是

</details>

---

#### WebviewView {#webviewview}

##### Properties

<div id="webviewview-viewtype"></div>

<details>
<summary><code>viewType: string</code></summary>

Identifies the type of the webview view, such as `'hexEditor.dataView'`.

**只读**: 是

</details>

<div id="webviewview-webview"></div>

<details>
<summary><code>webview: <a href="#webview">Webview</a></code></summary>

The underlying webview for the view.

**只读**: 是

</details>

<div id="webviewview-title"></div>

<details>
<summary><code>title: string</code></summary>

View title displayed in the UI.

The view title is initially taken from the extension `package.json` contribution.

</details>

<div id="webviewview-description"></div>

<details>
<summary><code>description: string</code></summary>

Human-readable string which is rendered less prominently in the title.

</details>

<div id="webviewview-ondiddispose"></div>

<details>
<summary><code>onDidDispose: <a href="#event">Event</a>&lt;void&gt;</code></summary>

Event fired when the view is disposed.

Views are disposed when they are explicitly hidden by a user (this happens when a user
right clicks in a view and unchecks the webview view).

Trying to use the view after it has been disposed throws an exception.

**只读**: 是

</details>

<div id="webviewview-visible"></div>

<details>
<summary><code>visible: boolean</code></summary>

Tracks if the webview is currently visible.

Views are visible when they are on the screen and expanded.

**只读**: 是

</details>

<div id="webviewview-badge"></div>

<details>
<summary><code>badge: <a href="#viewbadge">ViewBadge</a> | undefined</code></summary>

The badge to display for this webview view.
To remove the badge, set to undefined.

</details>

<div id="webviewview-ondidchangevisibility"></div>

<details>
<summary><code>onDidChangeVisibility: <a href="#event">Event</a>&lt;void&gt;</code></summary>

Event fired when the visibility of the view changes.

Actions that trigger a visibility change:

- The view is collapsed or expanded.
- The user switches to a different view group in the sidebar or panel.

Note that hiding a view using the context menu instead disposes of the view and fires `onDidDispose`.

**只读**: 是

</details>

##### Methods

<div id="webviewview-show"></div>

<details>
<summary><code>show(preserveFocus?: boolean): void;</code></summary>

Reveal the view in the UI.

If the view is collapsed, this will expand it.

</details>

---

#### WebviewViewProvider {#webviewviewprovider}

Provider for creating `WebviewView` elements.

##### Methods

<div id="webviewviewprovider-resolvewebviewview"></div>

<details>
<summary><code>resolveWebviewView(webviewView: WebviewView, context: WebviewViewResolveContext, token: CancellationToken): Thenable&lt;void&gt; | void;</code></summary>

Revolves a webview view.

`resolveWebviewView` is called when a view first becomes visible. This may happen when the view is
first loaded or when the user hides and then shows a view again.

</details>

---

#### WindowState {#windowstate}

Represents the state of a window.

##### Properties

<div id="windowstate-focused"></div>

<details>
<summary><code>focused: boolean</code></summary>

Whether the current window is focused.

**只读**: 是

</details>

<div id="windowstate-active"></div>

<details>
<summary><code>active: boolean</code></summary>

Whether the window has been interacted with recently. This will change
immediately on activity, or after a short time of user inactivity.

**只读**: 是

</details>

---

#### WorkspaceConfiguration {#workspaceconfiguration}

Represents the configuration. It is a merged view of

- Default configuration
- Global configuration
- Workspace configuration (if available)
- Workspace folder configuration of the requested resource (if available)

*Global configuration* comes from User Settings and shadows Defaults.

*Workspace configuration* comes from Workspace Settings and shadows Global configuration.

*Workspace Folder configuration* comes from `.vscode` folder under one of the workspace folders.

*Note:* Workspace and Workspace Folder configurations contains `launch` and `tasks` settings. Their basename will be
part of the section identifier. The following snippets shows how to retrieve all configurations
from `launch.json`:

```ts
// launch.json configuration
const config = workspace.getConfiguration('launch', vscode.window.activeTextEditor.document.uri);

// retrieve values
const values = config.get('configurations');
```

Refer to [Settings](https://code.visualstudio.com/docs/getstarted/settings) for more information.

##### Methods

<div id="workspaceconfiguration-get"></div>

<details>
<summary><code>get&lt;T&gt;(section: string): T | undefined;</code></summary>

Return a value from this configuration.

</details>

<div id="workspaceconfiguration-get"></div>

<details>
<summary><code>get&lt;T&gt;(section: string, defaultValue: T): T;</code></summary>

Return a value from this configuration.

</details>

<div id="workspaceconfiguration-has"></div>

<details>
<summary><code>has(section: string): boolean;</code></summary>

Check if this configuration has a certain value.

</details>

<div id="workspaceconfiguration-inspect"></div>

<details>
<summary><code>inspect&lt;T&gt;(section: string): &#123; key: string; defaultValue?: T; globalValue?: T; workspaceValue?: T, workspaceFolderValue?: T &#125; | undefined;</code></summary>

Retrieve all information about a configuration setting. A configuration value
often consists of a *default* value, a global or installation-wide value,
a workspace-specific value and a folder-specific value.

The *effective* value (returned by [`get`](#WorkspaceConfiguration.get))
is computed like this: `defaultValue` overwritten by `globalValue`,
`globalValue` overwritten by `workspaceValue`. `workspaceValue` overwritten by `workspaceFolderValue`.
Refer to [Settings Inheritance](https://code.visualstudio.com/docs/getstarted/settings)
for more information.

*Note:* The configuration name must denote a leaf in the configuration tree
(`editor.fontSize` vs `editor`) otherwise no result is returned.

</details>

<div id="workspaceconfiguration-update"></div>

<details>
<summary><code>update(section: string, value: any, configurationTarget?: ConfigurationTarget | boolean): Thenable&lt;void&gt;;</code></summary>

Update a configuration value. The updated configuration values are persisted.

A value can be changed in

- Global configuration: Changes the value for all instances of the editor.
- Workspace configuration: Changes the value for current workspace, if available.
- Workspace folder configuration: Changes the value for the
Workspace folder to which the current <a href="#workspaceconfiguration">configuration</a> is scoped to.

*Note 1:* Setting a global value in the presence of a more specific workspace value
has no observable effect in that workspace, but in others. Setting a workspace value
in the presence of a more specific folder value has no observable effect for the resources
under respective folder, but in others. Refer to
[Settings Inheritence](https://code.visualstudio.com/docs/getstarted/settings) for more information.

*Note 2:* To remove a configuration value use `undefined`, like so: `config.update('somekey', undefined)`

Will throw error when
- Writing a configuration which is not registered.
- Writing a configuration to workspace or folder target when no workspace is opened
- Writing a configuration to folder target when there is no folder settings
- Writing to folder target without passing a resource when getting the configuration (`workspace.getConfiguration(section, resource)`)
- Writing a window configuration to folder target

</details>

---

#### WorkspaceEditEntryMetadata {#workspaceeditentrymetadata}

Additional data for entries of a workspace edit. Supports to label entries and marks entries
as needing confirmation by the user. The editor groups edits with equal labels into tree nodes,
for instance all edits labelled with "Changes in Strings" would be a tree node.

##### Properties

<div id="workspaceeditentrymetadata-needsconfirmation"></div>

<details>
<summary><code>needsConfirmation: boolean</code></summary>

A flag which indicates that user confirmation is needed.

</details>

<div id="workspaceeditentrymetadata-label"></div>

<details>
<summary><code>label: string</code></summary>

A human-readable string which is rendered prominent.

</details>

<div id="workspaceeditentrymetadata-description"></div>

<details>
<summary><code>description: string</code></summary>

A human-readable string which is rendered less prominent on the same line.

</details>

<div id="workspaceeditentrymetadata-iconpath"></div>

<details>
<summary><code>iconPath: <a href="#iconpath">IconPath</a></code></summary>

The icon path or <a href="#themeicon">ThemeIcon</a> for the edit.

</details>

---

#### WorkspaceEditMetadata {#workspaceeditmetadata}

Additional data about a workspace edit.

##### Properties

<div id="workspaceeditmetadata-isrefactoring"></div>

<details>
<summary><code>isRefactoring: boolean</code></summary>

Signal to the editor that this edit is a refactoring.

</details>

---

#### WorkspaceFolder {#workspacefolder}

A workspace folder is one of potentially many roots opened by the editor. All workspace folders
are equal which means there is no notion of an active or master workspace folder.

##### Properties

<div id="workspacefolder-uri"></div>

<details>
<summary><code>uri: <a href="#uri">Uri</a></code></summary>

The associated uri for this workspace folder.

*Note:* The <a href="#uri">Uri</a>-type was intentionally chosen such that future releases of the editor can support
workspace folders that are not stored on the local disk, e.g. `ftp://server/workspaces/foo`.

**只读**: 是

</details>

<div id="workspacefolder-name"></div>

<details>
<summary><code>name: string</code></summary>

The name of this workspace folder. Defaults to
the basename of its [uri-path](#Uri.path)

**只读**: 是

</details>

<div id="workspacefolder-index"></div>

<details>
<summary><code>index: number</code></summary>

The ordinal number of this workspace folder.

**只读**: 是

</details>

---

#### WorkspaceFolderPickOptions {#workspacefolderpickoptions}

Options to configure the behaviour of the <a href="#workspacefolder">workspace folder</a> pick UI.

##### Properties

<div id="workspacefolderpickoptions-placeholder"></div>

<details>
<summary><code>placeHolder: string</code></summary>

An optional string to show as place holder in the input box to guide the user what to pick on.

</details>

<div id="workspacefolderpickoptions-ignorefocusout"></div>

<details>
<summary><code>ignoreFocusOut: boolean</code></summary>

Set to `true` to keep the picker open when focus moves to another part of the editor or to another window.

</details>

---

#### WorkspaceFoldersChangeEvent {#workspacefolderschangeevent}

An event describing a change to the set of workspace folders.

##### Properties

<div id="workspacefolderschangeevent-added"></div>

<details>
<summary><code>added: readonly <a href="#workspacefolder">WorkspaceFolder</a>[]</code></summary>

Added workspace folders.

**只读**: 是

</details>

<div id="workspacefolderschangeevent-removed"></div>

<details>
<summary><code>removed: readonly <a href="#workspacefolder">WorkspaceFolder</a>[]</code></summary>

Removed workspace folders.

**只读**: 是

</details>

---

#### WorkspaceSymbolProvider {#workspacesymbolprovider}

##### Methods

<div id="workspacesymbolprovider-provideworkspacesymbols"></div>

<details>
<summary><code>provideWorkspaceSymbols(query: string, token: CancellationToken): ProviderResult&lt;T[]&gt;;</code></summary>

Project-wide search for a symbol matching the given query string.

The query-parameter should be interpreted in a relaxed way as the editor will apply its own
highlighting and scoring on the results. A good rule of thumb is to match case-insensitive and to
simply check that the characters of query appear in their order in a candidate symbol. Don't use
prefix, substring, or similar strict matching.

To improve performance implementors can implement resolveWorkspaceSymbol and then provide
symbols with partial location-objects, without a range defined. The editor will then call
resolveWorkspaceSymbol for selected symbols only, e.g. when opening a workspace symbol.

</details>

<div id="workspacesymbolprovider-resolveworkspacesymbol"></div>

<details>
<summary><code>resolveWorkspaceSymbol?(symbol: T, token: CancellationToken): ProviderResult&lt;T&gt;;</code></summary>

Given a symbol fill in its location. This method is called whenever a symbol
is selected in the UI. Providers can implement this method and return incomplete symbols from
[`provideWorkspaceSymbols`](#WorkspaceSymbolProvider.provideWorkspaceSymbols) which often helps to improve
performance.

</details>

---

#### WorkspaceTrustRequestButton {#workspacetrustrequestbutton}

##### Properties

<div id="workspacetrustrequestbutton-label"></div>

<details>
<summary><code>label: string</code></summary>

**只读**: 是

</details>

<div id="workspacetrustrequestbutton-type"></div>

<details>
<summary><code>type: 'ContinueWithTrust' | 'ContinueWithoutTrust' | 'Manage' | 'Cancel'</code></summary>

**只读**: 是

</details>

---

#### WorkspaceTrustRequestOptions {#workspacetrustrequestoptions}

##### Properties

<div id="workspacetrustrequestoptions-buttons"></div>

<details>
<summary><code>buttons: <a href="#workspacetrustrequestbutton">WorkspaceTrustRequestButton</a>[]</code></summary>

**只读**: 是

</details>

<div id="workspacetrustrequestoptions-message"></div>

<details>
<summary><code>message: string</code></summary>

**只读**: 是

</details>

---

