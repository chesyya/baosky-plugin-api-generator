根据这个脚本的代码，我来总结一下它提取 API 为 Markdown 的要求：

  核心要求

  1. 必须在 @baosky/plugin 模块声明中
  2. 必须有 export 关键字（第234、301行检查）
  3. 支持在 namespace 内或顶层定义
  4. 支持 JSDoc 注释用于生成文档描述

  可提取的类型及示例

  1. 函数 (Functions)

  提取逻辑在第237-243行

  declare module '@baosky/plugin' {
      export namespace commands {
          /**
           * 注册一个命令
           * @param command 命令ID
           * @param callback 回调函数
           * @returns 返回一个Disposable对象
           * @example
           * commands.registerCommand('myExtension.hello', () => {
           *     console.log('Hello!');
           * });
           */
          export function registerCommand(
              command: string,
              callback: (...args: any[]) => any
          ): Disposable;
      }
  }

  2. 事件 (Events)

  提取逻辑在第105-109、190行，检测类型是否包含 Event<

  declare module '@baosky/plugin' {
      export namespace workspace {
          /**
           * 当配置发生变化时触发
           * @example
           * workspace.onDidChangeConfiguration.event(() => {
           *     console.log('Config changed');
           * });
           */
          export const onDidChangeConfiguration: Event<ConfigurationChangeEvent>;
      }
  }

  3. 变量/常量 (Variables)

  提取逻辑在第243-254行

  declare module '@baosky/plugin' {
      export namespace env {
          /**
           * 应用程序名称
           */
          export const appName: string;

          /**
           * 语言配置
           */
          export const language: string;
      }
  }

  4. 接口 (Interfaces)

  提取逻辑在第255-260行（namespace内）和第304-343行（顶层）

  declare module '@baosky/plugin' {
      /**
       * 表示一个文本文档
       */
      export interface TextDocument {
          /**
           * 文档的 URI
           */
          readonly uri: Uri;

          /**
           * 文档的语言标识符
           */
          readonly languageId: string;

          /**
           * 获取指定行的文本
           * @param line 行号
           */
          getText(line: number): string;
      }
  }

  5. 类型别名 (Type Aliases)

  提取逻辑在第261-266行（namespace内）和第344-356行（顶层）

  declare module '@baosky/plugin' {
      /**
       * 配置目标类型
       */
      export type ConfigurationTarget = 'Global' | 'Workspace' | 'WorkspaceFolder';

      /**
       * 命令回调函数类型
       */
      export type CommandCallback = (...args: any[]) => any;
  }

  6. 类 (Classes)

  提取逻辑在第267-274行（namespace内）和第357-407行（顶层）

  declare module '@baosky/plugin' {
      /**
       * 表示一个 URI
       */
      export class Uri {
          /**
           * URI 的 scheme
           */
          readonly scheme: string;

          /**
           * URI 的路径
           */
          readonly path: string;

          /**
           * 从文件路径创建 URI
           * @param path 文件路径
           */
          static file(path: string): Uri;

          /**
           * 转换为字符串
           */
          toString(): string;
      }
  }

  7. 枚举 (Enums)

  提取逻辑在第275-280行（namespace内）和第408-419行（顶层）

  declare module '@baosky/plugin' {
      /**
       * 文本编辑器光标样式
       */
      export enum TextEditorCursorStyle {
          /**
           * 线条样式
           */
          Line = 1,

          /**
           * 块状样式
           */
          Block = 2,

          /**
           * 下划线样式
           */
          Underline = 3
      }
  }

  重要特性

  1. JSDoc 支持（第37-91行）：
    - @param - 参数描述
    - @returns / @return - 返回值描述
    - @example - 示例代码
    - @see - 相关链接
    - @deprecated - 废弃标记
  2. 类型链接：自动为类型引用生成内部链接（第939-1027行）
  3. 层级结构：
    - 支持 namespace 分组
    - 支持顶层类型定义
    - 自动生成导航锚点