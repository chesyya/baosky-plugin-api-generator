  # @baosky/plugin API 文档

  > 本文档自动生成自 TypeScript 源代码

  ---

  ## workspace

  工作区相关的 API，用于管理项目文件和资源

  ### Functions

  <details>
  <summary><code>registerCanonicalUriProvider(scheme: string, provider: CanonicalUriProvider):
  Disposable</code></summary>

  #### 描述
  注册一个规范化 URI 提供器

  规范化 URI 表示将资源别名转换为真实来源 URI。多个别名可能转换为同一个真实来源 URI。

  #### 参数
  - **scheme**: `string`
    此提供器可以为其提供规范化 URI 的 URI scheme

  - **provider**: `CanonicalUriProvider`
    可以将指定 scheme 的 URI 转换为跨机器稳定的规范化 URI 的提供器

  #### 返回值
  `Disposable` - 一个 Disposable 对象，调用其 dispose 方法可以取消注册此提供器

  #### 示例
  ```typescript
  const disposable = workspace.registerCanonicalUriProvider('myscheme', {
      provideCanonicalUri: (uri, options, token) => {
          // 转换逻辑
          return canonicalUri;
      }
  });
  ```

  #### 相关
  - [CanonicalUriProvider](#canonicaluriprovider)
  - [GitHub Issue #180582](https://github.com/microsoft/vscode/issues/180582)

  </details>

  <details>
  <summary><code>getCanonicalUri(uri: Uri, options: CanonicalUriRequestOptions, token: CancellationToken):
  ProviderResult&lt;Uri&gt;</code></summary>

  #### 描述
  获取给定 URI 的规范化 URI

  #### 参数
  - **uri**: `Uri`
    需要提供规范化 URI 的原始 URI

  - **options**: `CanonicalUriRequestOptions`
    请求选项，包含目标 scheme 等信息

  - **token**: `CancellationToken`
    取消令牌，用于取消请求

  #### 返回值
  `ProviderResult<Uri>` - 规范化后的 URI，如果无法提供则返回 undefined

  #### 示例
  ```typescript
  const canonical = await workspace.getCanonicalUri(
      originalUri,
      { targetScheme: 'https' },
      cancellationToken
  );
  ```

  </details>

  ### Events

  _此 namespace 暂无事件_

  ### Variables

  _此 namespace 暂无变量_

  ---

  ## system

  系统级事件和平台相关的 API

  ### Functions

  <details>
  <summary><code>onEvent(eventId: SystemEventIds, listener: (event: any) => void): Disposable</code></summary>

  #### 描述
  监听系统事件

  注册一个监听器来响应特定的系统事件，如项目创建、数据变更、浏览器断连等

  #### 参数
  - **eventId**: `SystemEventIds`
    事件 ID，必须是 `system.eventId` 中定义的值之一

  - **listener**: `(event: any) => void`
    事件监听器函数，当事件触发时被调用

  #### 返回值
  `Disposable` - 一个 Disposable 对象，调用其 dispose 方法可以取消监听

  #### 示例
  ```typescript
  // 监听项目创建事件
  const disposable = system.onEvent(system.eventId.Project.Create, (event) => {
      console.log('Project created:', event);
  });

  // 监听偏好设置变更
  system.onEvent(system.eventId.Platform.PreferenceChanged, (event) => {
      console.log('Preference changed:', event);
  });

  // 取消监听
  disposable.dispose();
  ```

  #### 相关
  - [eventId](#eventid)

  </details>

  ### Events

  _此 namespace 暂无独立事件定义_

  ### Variables

  <details>
  <summary><code>eventId: SystemEventIds</code></summary>

  #### 描述
  系统事件 ID 常量集合

  包含所有可用的系统事件 ID，按功能模块分类

  #### 类型
  ```typescript
  {
      Platform: {
          PreferenceChanged: "preferenceChanged",
      },
      Compile: {
          Before: "beforeCompile",
          DirectiveFailure: "directiveFailure",
          OutOfMemory: "outOfMemory",
      },
      Project: {
          Create: "projectCreate",
          WillOpen: "projectWillOpen",
          DidOpen: "projectDidOpen",
          DidClose: "projectDidClose",
          // ... 更多事件
      },
      Data: { /* ... */ },
      File: { /* ... */ },
      Tab: { /* ... */ },
      Browser: { /* ... */ },
      Session: { /* ... */ },
      Team: { /* ... */ }
  }
  ```

  #### 示例
  ```typescript
  // 使用事件 ID 监听项目打开事件
  system.onEvent(system.eventId.Project.DidOpen, (event) => {
      console.log('Project opened');
  });

  // 监听数据变更
  system.onEvent(system.eventId.Data.Changed, (event) => {
      console.log('Data changed:', event);
  });
  ```

  #### 只读
  是 - 此对象使用 `as const` 断言，不可修改

  </details>

  ---

  ## notebooks

  Notebook 相关的 API

  ### Functions

  <details>
  <summary><code>createNotebookController(id: string, viewType: string, label: string, handler?: (...) => void |
  Thenable&lt;void&gt;, rendererScripts?: NotebookRendererScript[]): NotebookController</code></summary>

  #### 描述
  创建一个新的 Notebook 控制器

  Notebook 控制器用于执行 notebook 单元格并管理 notebook 的渲染

  #### 参数
  - **id**: `string`
    控制器的唯一标识符

  - **viewType**: `string`
    此控制器支持的 notebook 视图类型

  - **label**: `string`
    控制器的显示名称

  - **handler**: `(cells: NotebookCell[], notebook: NotebookDocument, controller: NotebookController) => void |
  Thenable<void>` (可选)
    执行单元格的处理函数

  - **rendererScripts**: `NotebookRendererScript[]` (可选)
    预加载到渲染器中的脚本

  #### 返回值
  `NotebookController` - 新创建的 notebook 控制器实例

  #### 示例
  ```typescript
  const controller = notebooks.createNotebookController(
      'my-kernel',
      'jupyter-notebook',
      'My Kernel',
      async (cells, notebook, controller) => {
          // 执行单元格逻辑
          for (const cell of cells) {
              // ...
          }
      }
  );
  ```

  #### 相关
  - [NotebookController](#notebookcontroller)
  - [NotebookRendererScript](#notebookrendererscript)
  - [GitHub Issue #123601](https://github.com/microsoft/vscode/issues/123601)

  </details>

  ### Events

  _此 namespace 暂无事件_

  ### Variables

  _此 namespace 暂无变量_

  ---

  ## 附录

  ### 类型定义

  <details>
  <summary><code>interface CanonicalUriProvider</code></summary>

  #### 描述
  规范化 URI 提供器接口

  #### 方法
  - **provideCanonicalUri**(uri: Uri, options: CanonicalUriRequestOptions, token: CancellationToken):
  ProviderResult<Uri>
    - 提供给定 URI 的规范化 URI
    - 如果无法提供规范化 URI，返回 undefined

  </details>

  <details>
  <summary><code>interface CanonicalUriRequestOptions</code></summary>

  #### 描述
  规范化 URI 请求选项

  #### 属性
  - **targetScheme**: `string` - 规范化 URI 的目标 scheme

  </details>

  ---