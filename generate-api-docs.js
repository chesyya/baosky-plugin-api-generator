#!/usr/bin/env node

const ts = require('typescript');
const fs = require('fs');
const path = require('path');

// 配置
const PLUGIN_DIR = path.join(__dirname, 'node_modules/@baosky/plugin/src');
const OUTPUT_FILE = path.join(__dirname, 'docs/api-reference.md');

// 存储提取的数据
const namespaces = new Map();

// 存储顶层类型定义（不在 namespace 中的）
const topLevelTypes = {
    classes: [],
    interfaces: [],
    enums: [],
    types: []
};

// 存储所有可链接的符号（用于生成锚点）
const symbols = new Map(); // key: symbolName, value: { type: 'interface'|'type'|'class'|'enum'|'function'|'variable', anchor: string }

// 基本类型，不需要生成链接
const PRIMITIVE_TYPES = new Set([
    'string', 'number', 'boolean', 'void', 'any', 'unknown', 'never',
    'undefined', 'null', 'object', 'symbol', 'bigint',
    'String', 'Number', 'Boolean', 'Object', 'Array', 'Promise', 'Thenable',
    'Readonly', 'Partial', 'Required', 'Pick', 'Omit', 'Record',
    'T', 'U', 'V', 'K', // 常见泛型参数
]);

/**
 * 提取 JSDoc 注释
 */
function extractJSDoc(node) {
    const jsDocTags = ts.getJSDocTags(node);
    const jsDocComments = node.jsDoc || [];

    let description = '';
    const params = [];
    const returns = { description: '' };
    const examples = [];
    const seeAlso = [];
    const deprecated = null;

    // 提取注释文本
    if (jsDocComments.length > 0) {
        const comment = jsDocComments[0];
        if (comment.comment) {
            description = typeof comment.comment === 'string'
                ? comment.comment
                : ts.getTextOfJSDocComment(comment.comment);
        }
    }

    // 提取标签
    jsDocTags.forEach(tag => {
        const tagName = tag.tagName.text;
        const commentText = tag.comment
            ? (typeof tag.comment === 'string' ? tag.comment : ts.getTextOfJSDocComment(tag.comment))
            : '';

        switch (tagName) {
            case 'param':
                if (tag.name) {
                    params.push({
                        name: tag.name.text,
                        description: commentText
                    });
                }
                break;
            case 'returns':
            case 'return':
                returns.description = commentText;
                break;
            case 'example':
                examples.push(commentText);
                break;
            case 'see':
                seeAlso.push(commentText);
                break;
            case 'deprecated':
                // deprecated = commentText;
                break;
        }
    });

    return { description, params, returns, examples, seeAlso, deprecated };
}

/**
 * 获取类型的字符串表示
 */
function getTypeString(node, sourceFile) {
    if (!node) return 'any';
    let typeString = node.getText(sourceFile);
    // 清理类型字符串中的 JSDoc 注释
    typeString = cleanSignature(typeString);
    return typeString;
}

/**
 * 判断是否为 Event 类型
 */
function isEventType(typeString) {
    return typeString.startsWith('Event<') || typeString.includes('Event<');
}

/**
 * 清理函数签名中的 JSDoc 注释和花括号
 */
function cleanSignature(signature) {
    // 移除多行注释 (/** ... */)
    signature = signature.replace(/\/\*\*[\s\S]*?\*\//g, '');
    // 移除行内注释 (// ...)
    signature = signature.replace(/\/\/.*$/gm, '');
    // 移除单行注释后多余的空格
    signature = signature.replace(/\s+/g, ' ');
    // 移除任何剩余的 JSDoc 标签（作为最后的保护措施）
    signature = signature.replace(/\{@\w+\s+[^}]+\}/g, '');
    return signature.trim();
}

/**
 * 处理函数声明
 */
function processFunction(node, sourceFile, namespaceName) {
    const name = node.name ? node.name.text : 'anonymous';
    let signature = node.getText(sourceFile);
    signature = cleanSignature(signature);
    const jsdoc = extractJSDoc(node);

    // 提取参数信息
    const parameters = node.parameters.map(param => {
        const paramName = param.name.text;
        const paramType = param.type ? getTypeString(param.type, sourceFile) : 'any';
        const isOptional = !!param.questionToken;

        // 从 JSDoc 中查找参数描述
        const jsDocParam = jsdoc.params.find(p => p.name === paramName);
        const description = jsDocParam ? jsDocParam.description : '';

        return {
            name: paramName,
            type: paramType,
            optional: isOptional,
            description
        };
    });

    // 提取返回值类型
    const returnType = node.type ? getTypeString(node.type, sourceFile) : 'void';

    return {
        type: 'function',
        name,
        signature,
        description: jsdoc.description,
        parameters,
        returnType,
        returnDescription: jsdoc.returns.description,
        examples: jsdoc.examples,
        seeAlso: jsdoc.seeAlso
    };
}

/**
 * 处理变量/常量声明
 */
function processVariable(node, sourceFile, namespaceName) {
    const name = node.name.text;
    const typeNode = node.type;
    let typeString = typeNode ? getTypeString(typeNode, sourceFile) : 'any';

    // 如果有初始化器（如对象字面量），尝试提取其内容
    let valueString = null;
    if (node.initializer) {
        const initText = node.initializer.getText(sourceFile);
        // 如果初始化器是对象字面量或数组，且不太长，使用它作为类型展示
        if ((ts.isObjectLiteralExpression(node.initializer) || ts.isArrayLiteralExpression(node.initializer))
            && initText.length < 2000) {
            valueString = initText;
        }
    }

    const jsdoc = extractJSDoc(node.parent.parent); // VariableDeclaration -> VariableDeclarationList -> VariableStatement

    const isEvent = isEventType(typeString);
    const isReadonly = node.parent.flags & ts.NodeFlags.Const ||
                      (node.parent.parent.flags & ts.NodeFlags.Const);

    return {
        type: isEvent ? 'event' : 'variable',
        name,
        typeString: valueString || typeString,  // 优先使用实际值
        originalType: typeString,
        description: jsdoc.description,
        examples: jsdoc.examples,
        readonly: isReadonly
    };
}

/**
 * 遍历 namespace 成员
 */
function processNamespace(node, sourceFile, namespaceName) {
    if (!namespaces.has(namespaceName)) {
        namespaces.set(namespaceName, {
            name: namespaceName,
            description: '',
            functions: [],
            events: [],
            variables: [],
            types: [],      // 新增：类型别名
            interfaces: [], // 新增：接口
            classes: [],    // 新增：类
            enums: []       // 新增：枚举
        });
    }

    const namespaceData = namespaces.get(namespaceName);

    // 提取 namespace 的 JSDoc
    const nsJsDoc = extractJSDoc(node);
    if (nsJsDoc.description && !namespaceData.description) {
        namespaceData.description = nsJsDoc.description;
    }

    // 遍历成员
    ts.forEachChild(node, child => {
        // 只处理 export 的成员
        const isExported = child.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword);
        if (!isExported) return;

        if (ts.isFunctionDeclaration(child)) {
            const func = processFunction(child, sourceFile, namespaceName);
            namespaceData.functions.push(func);
            // 注册函数符号
            const anchor = `${namespaceName.toLowerCase()}-${func.name.toLowerCase()}`;
            symbols.set(func.name, { type: 'function', anchor, namespace: namespaceName });
        } else if (ts.isVariableStatement(child)) {
            child.declarationList.declarations.forEach(decl => {
                const variable = processVariable(decl, sourceFile, namespaceName);
                if (variable.type === 'event') {
                    namespaceData.events.push(variable);
                } else {
                    namespaceData.variables.push(variable);
                }
                // 注册变量/事件符号
                const anchor = `${namespaceName.toLowerCase()}-${variable.name.toLowerCase()}`;
                symbols.set(variable.name, { type: variable.type, anchor, namespace: namespaceName });
            });
        } else if (ts.isInterfaceDeclaration(child)) {
            const name = child.name.text;
            const jsdoc = extractJSDoc(child);
            const anchor = name.toLowerCase();
            namespaceData.interfaces.push({ name, description: jsdoc.description, anchor });
            symbols.set(name, { type: 'interface', anchor, namespace: namespaceName });
        } else if (ts.isTypeAliasDeclaration(child)) {
            const name = child.name.text;
            const jsdoc = extractJSDoc(child);
            const anchor = name.toLowerCase();
            namespaceData.types.push({ name, description: jsdoc.description, anchor });
            symbols.set(name, { type: 'type', anchor, namespace: namespaceName });
        } else if (ts.isClassDeclaration(child)) {
            const name = child.name?.text;
            if (name) {
                const jsdoc = extractJSDoc(child);
                const anchor = name.toLowerCase();
                namespaceData.classes.push({ name, description: jsdoc.description, anchor });
                symbols.set(name, { type: 'class', anchor, namespace: namespaceName });
            }
        } else if (ts.isEnumDeclaration(child)) {
            const name = child.name.text;
            const jsdoc = extractJSDoc(child);
            const anchor = name.toLowerCase();
            namespaceData.enums.push({ name, description: jsdoc.description, anchor });
            symbols.set(name, { type: 'enum', anchor, namespace: namespaceName });
        }
    });
}

/**
 * 遍历模块声明，查找 namespace
 */
function visitNode(node, sourceFile) {
    if (ts.isModuleDeclaration(node) && node.name.text === '@baosky/plugin') {
        // 进入模块内部
        if (node.body && ts.isModuleBlock(node.body)) {
            ts.forEachChild(node.body, child => {
                if (ts.isModuleDeclaration(child)) {
                    // 这是一个 namespace
                    const namespaceName = child.name.text;
                    if (child.body && ts.isModuleBlock(child.body)) {
                        processNamespace(child.body, sourceFile, namespaceName);
                    }
                } else {
                    // 处理模块级别的类型声明（不在 namespace 中）
                    const isExported = child.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword);
                    if (!isExported) return;

                    if (ts.isInterfaceDeclaration(child)) {
                        const name = child.name.text;
                        const anchor = name.toLowerCase();
                        const jsdoc = extractJSDoc(child);

                        // 提取成员（简化版，只提取名称和类型）
                        const properties = [];
                        const methods = [];

                        child.members.forEach(member => {
                            if (ts.isPropertySignature(member) || ts.isPropertyDeclaration(member)) {
                                const propName = member.name?.getText(sourceFile);
                                const propType = member.type ? getTypeString(member.type, sourceFile) : 'any';
                                const propJsdoc = extractJSDoc(member);
                                properties.push({
                                    name: propName,
                                    type: propType,
                                    description: propJsdoc.description,
                                    readonly: !!member.modifiers?.some(m => m.kind === ts.SyntaxKind.ReadonlyKeyword)
                                });
                            } else if (ts.isMethodSignature(member) || ts.isMethodDeclaration(member)) {
                                const methodName = member.name?.getText(sourceFile);
                                const methodSig = cleanSignature(member.getText(sourceFile));
                                const methodJsdoc = extractJSDoc(member);
                                methods.push({
                                    name: methodName,
                                    signature: methodSig,
                                    description: methodJsdoc.description
                                });
                            }
                        });

                        symbols.set(name, { type: 'interface', anchor, namespace: null });
                        topLevelTypes.interfaces.push({
                            name,
                            description: jsdoc.description,
                            properties,
                            methods,
                            anchor
                        });
                    } else if (ts.isTypeAliasDeclaration(child)) {
                        const name = child.name.text;
                        const anchor = name.toLowerCase();
                        const jsdoc = extractJSDoc(child);
                        const typeString = child.type ? getTypeString(child.type, sourceFile) : 'any';

                        symbols.set(name, { type: 'type', anchor, namespace: null });
                        topLevelTypes.types.push({
                            name,
                            description: jsdoc.description,
                            typeString,
                            anchor
                        });
                    } else if (ts.isClassDeclaration(child)) {
                        const name = child.name?.text;
                        if (name) {
                            const anchor = name.toLowerCase();
                            const jsdoc = extractJSDoc(child);

                            // 提取类成员
                            const constructors = [];
                            const properties = [];
                            const methods = [];

                            child.members.forEach(member => {
                                if (ts.isConstructorDeclaration(member)) {
                                    const ctorSig = cleanSignature(member.getText(sourceFile));
                                    const ctorJsdoc = extractJSDoc(member);
                                    constructors.push({
                                        signature: ctorSig,
                                        description: ctorJsdoc.description
                                    });
                                } else if (ts.isPropertyDeclaration(member)) {
                                    const propName = member.name?.getText(sourceFile);
                                    const propType = member.type ? getTypeString(member.type, sourceFile) : 'any';
                                    const propJsdoc = extractJSDoc(member);
                                    properties.push({
                                        name: propName,
                                        type: propType,
                                        description: propJsdoc.description,
                                        readonly: !!member.modifiers?.some(m => m.kind === ts.SyntaxKind.ReadonlyKeyword)
                                    });
                                } else if (ts.isMethodDeclaration(member)) {
                                    const methodName = member.name?.getText(sourceFile);
                                    const methodSig = cleanSignature(member.getText(sourceFile));
                                    const methodJsdoc = extractJSDoc(member);
                                    methods.push({
                                        name: methodName,
                                        signature: methodSig,
                                        description: methodJsdoc.description
                                    });
                                }
                            });

                            symbols.set(name, { type: 'class', anchor, namespace: null });
                            topLevelTypes.classes.push({
                                name,
                                description: jsdoc.description,
                                constructors,
                                properties,
                                methods,
                                anchor
                            });
                        }
                    } else if (ts.isEnumDeclaration(child)) {
                        const name = child.name.text;
                        const anchor = name.toLowerCase();
                        const jsdoc = extractJSDoc(child);

                        symbols.set(name, { type: 'enum', anchor, namespace: null });
                        topLevelTypes.enums.push({
                            name,
                            description: jsdoc.description,
                            anchor
                        });
                    }
                }
            });
        }
    }

    ts.forEachChild(node, child => visitNode(child, sourceFile));
}

/**
 * 解析单个文件
 */
function parseFile(filePath) {
    const sourceCode = fs.readFileSync(filePath, 'utf-8');
    const sourceFile = ts.createSourceFile(
        filePath,
        sourceCode,
        ts.ScriptTarget.Latest,
        true
    );

    visitNode(sourceFile, sourceFile);
}

/**
 * 生成 Markdown
 */
function generateMarkdown() {
    let md = '# @baosky/plugin API 文档\n\n';
    md += '> 本文档自动生成自 TypeScript 源代码\n\n';

    // 添加性能优化 CSS 和绕过 React Router 的脚本
    md += `
import styles from '@site/src/css/api-performance.module.css';
import BrowserOnly from '@docusaurus/BrowserOnly';

<BrowserOnly>
  {() => {
    if (typeof window !== 'undefined' && !window.__apiDocsInitialized) {
      window.__apiDocsInitialized = true;

      // 快速滚动到锚点的函数
      const scrollToHash = (hash) => {
        if (hash) {
          const id = hash.startsWith('#') ? hash.slice(1) : hash;
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'instant', block: 'start' });
          }
        }
      };

      // 绕过 Docusaurus 的点击处理，使用原生锚点跳转
      const handleAnchorClick = (e) => {
        const target = e.target.closest('a[href^="#"]');
        if (target && target.hash) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation(); // 完全阻止事件传播

          const hash = target.hash;
          scrollToHash(hash);

          // 使用 pushState 支持浏览器后退
          if (window.location.hash !== hash) {
            window.history.pushState(null, '', hash);
          }
        }
      };

      // 阻止所有 popstate 事件传播
      const handlePopState = (e) => {
        e.stopPropagation();
        e.stopImmediatePropagation();
        e.preventDefault();

        // 直接处理滚动
        requestAnimationFrame(() => {
          scrollToHash(window.location.hash);
        });
      };

      // 使用 hashchange 事件处理所有 hash 变化
      const handleHashChange = (e) => {
        e.stopPropagation();
        e.stopImmediatePropagation();
        scrollToHash(window.location.hash);
      };

      // 使用最高优先级（capture + 尽早注册）
      document.addEventListener('click', handleAnchorClick, true);
      window.addEventListener('popstate', handlePopState, true);
      window.addEventListener('hashchange', handleHashChange, true);

      return () => {
        window.__apiDocsInitialized = false;
        document.removeEventListener('click', handleAnchorClick, true);
        window.removeEventListener('popstate', handlePopState, true);
        window.removeEventListener('hashchange', handleHashChange, true);
      };
    }
    return null;
  }}
</BrowserOnly>

<div className={styles.apiDocs}>

`;

    // 按 namespace 名称排序
    const sortedNamespaces = Array.from(namespaces.values()).sort((a, b) =>
        a.name.localeCompare(b.name)
    );

    // 添加快速导航目录
    md += '## 快速导航\n\n';
    sortedNamespaces.forEach(ns => {
        const funcCount = ns.functions.length;
        const eventCount = ns.events.length;
        const varCount = ns.variables.length;
        const total = funcCount + eventCount + varCount;
        md += `- [**${ns.name}**](#${ns.name.toLowerCase()}) (${total} items)\n`;
    });
    md += '\n---\n\n';

    sortedNamespaces.forEach(ns => {
        md += `## ${ns.name}\n\n`;

        if (ns.description) {
            md += `${convertJSDocLinks(ns.description)}\n\n`;
        }

        // Functions
        md += '#### Functions\n\n';
        if (ns.functions.length === 0) {
            md += '_此 namespace 暂无函数_\n\n';
        } else {
            ns.functions.forEach(func => {
                // 添加锚点
                const anchor = `${ns.name.toLowerCase()}-${func.name.toLowerCase()}`;
                md += `<div id="${anchor}"></div>\n\n`;
                md += '<details>\n';
                // summary 中直接使用带链接的签名，onclick 会阻止事件冒泡
                md += `<summary><code>${linkifyCodeTypes(func.signature)}</code></summary>\n\n`;

                if (func.description) {
                    md += '##### 描述\n';
                    md += `${convertJSDocLinks(func.description)}\n\n`;
                }

                if (func.parameters.length > 0) {
                    md += '##### 参数\n\n';
                    func.parameters.forEach(param => {
                        const optional = param.optional ? ' (可选)' : '';
                        const typeWithLinks = linkifyCodeTypes(param.type);
                        // 使用 JSX style 对象而不是字符串
                        md += `<div style={{marginLeft: '1em', marginBottom: '0.5em'}}>\n`;
                        md += `<strong>${param.name}</strong>: <span style={{fontFamily: 'var(--ifm-font-family-monospace)', background: 'var(--ifm-code-background)', padding: '2px 6px', borderRadius: '3px', fontSize: '90%'}}>${typeWithLinks}</span>${optional}<br/>\n`;
                        if (param.description) {
                            md += `<span style={{marginLeft: '1em'}}>${convertJSDocLinks(param.description)}</span>\n`;
                        }
                        md += `</div>\n\n`;
                    });
                }

                md += '##### 返回值\n\n';
                const returnTypeWithLinks = linkifyCodeTypes(func.returnType);
                md += `<div style={{marginLeft: '1em'}}><span style={{fontFamily: 'var(--ifm-font-family-monospace)', background: 'var(--ifm-code-background)', padding: '2px 6px', borderRadius: '3px', fontSize: '90%'}}>${returnTypeWithLinks}</span>`;
                if (func.returnDescription) {
                    md += ` - ${convertJSDocLinks(func.returnDescription)}`;
                }
                md += '</div>\n\n';

                if (func.examples.length > 0) {
                    md += '##### 示例\n';
                    func.examples.forEach(example => {
                        md += '```typescript\n';
                        md += example + '\n';
                        md += '```\n\n';
                    });
                }

                if (func.seeAlso.length > 0) {
                    md += '##### 相关\n';
                    func.seeAlso.forEach(see => {
                        md += `- ${linkifyTypes(see)}\n`;
                    });
                    md += '\n';
                }

                md += '</details>\n\n';
            });
        }

        // Events
        md += '#### Events\n\n';
        if (ns.events.length === 0) {
            md += '_此 namespace 暂无事件_\n\n';
        } else {
            ns.events.forEach(event => {
                // 添加锚点
                const anchor = `${ns.name.toLowerCase()}-${event.name.toLowerCase()}`;
                md += `<div id="${anchor}"></div>\n\n`;
                md += '<details>\n';
                md += `<summary><code>${event.name}: ${linkifyCodeTypes(event.typeString)}</code></summary>\n\n`;

                if (event.description) {
                    md += '##### 描述\n';
                    md += `${convertJSDocLinks(event.description)}\n\n`;
                }

                md += '##### 类型\n\n';
                const eventTypeWithLinks = linkifyCodeTypes(event.typeString);
                md += `<div style={{marginLeft: '1em'}}><span style={{fontFamily: 'var(--ifm-font-family-monospace)', background: 'var(--ifm-code-background)', padding: '2px 6px', borderRadius: '3px', fontSize: '90%'}}>${eventTypeWithLinks}</span></div>\n\n`;

                if (event.examples.length > 0) {
                    md += '##### 示例\n';
                    event.examples.forEach(example => {
                        md += '```typescript\n';
                        md += example + '\n';
                        md += '```\n\n';
                    });
                }

                md += '</details>\n\n';
            });
        }

        // Variables
        md += '#### Variables\n\n';
        if (ns.variables.length === 0) {
            md += '_此 namespace 暂无变量_\n\n';
        } else {
            ns.variables.forEach(variable => {
                // 添加锚点
                const anchor = `${ns.name.toLowerCase()}-${variable.name.toLowerCase()}`;
                md += `<div id="${anchor}"></div>\n\n`;
                md += '<details>\n';
                md += `<summary><code>${variable.name}: ${linkifyCodeTypes(variable.typeString)}</code></summary>\n\n`;

                if (variable.description) {
                    md += '##### 描述\n';
                    md += `${convertJSDocLinks(variable.description)}\n\n`;
                }

                md += '##### 类型\n';
                md += `\`\`\`typescript\n${variable.typeString}\n\`\`\`\n\n`;

                if (variable.examples.length > 0) {
                    md += '##### 示例\n';
                    variable.examples.forEach(example => {
                        md += '```typescript\n';
                        md += example + '\n';
                        md += '```\n\n';
                    });
                }

                if (variable.readonly) {
                    md += '##### 只读\n';
                    md += '- 是\n\n';
                }

                md += '</details>\n\n';
            });
        }

        md += '---\n\n';
    });

    // 添加顶层类型定义的统一标题
    const hasTopLevelTypes = topLevelTypes.classes.length > 0 ||
                            topLevelTypes.interfaces.length > 0 ||
                            topLevelTypes.enums.length > 0 ||
                            topLevelTypes.types.length > 0;

    if (hasTopLevelTypes) {
        md += '## Types\n\n';
        md += '> 以下是顶层的类、接口、类型定义和枚举\n\n';
    }

    // 生成顶层类型定义（Classes, Interfaces, Enums, Types）
    // Classes
    if (topLevelTypes.classes.length > 0) {
        topLevelTypes.classes.sort((a, b) => a.name.localeCompare(b.name)).forEach(cls => {
            // 使用 Docusaurus 的标题锚点格式
            md += `#### ${cls.name} {#${cls.anchor}}\n\n`;

            if (cls.description) {
                md += `${convertJSDocLinks(cls.description)}\n\n`;
            }

            // Constructors
            if (cls.constructors.length > 0) {
                md += '##### Constructors\n\n';
                cls.constructors.forEach(ctor => {
                    md += '<details>\n';
                    md += `<summary><code>${linkifyCodeTypes(ctor.signature)}</code></summary>\n\n`;
                    if (ctor.description) {
                        md += `${convertJSDocLinks(ctor.description)}\n\n`;
                    }
                    md += '</details>\n\n';
                });
            }

            // Properties
            if (cls.properties.length > 0) {
                md += '##### Properties\n\n';
                cls.properties.forEach(prop => {
                    const propAnchor = `${cls.anchor}-${prop.name?.toLowerCase()}`;
                    md += `<div id="${propAnchor}"></div>\n\n`;
                    md += '<details>\n';
                    md += `<summary><code>${prop.name}: ${linkifyCodeTypes(prop.type)}</code></summary>\n\n`;
                    if (prop.description) {
                        md += `${convertJSDocLinks(prop.description)}\n\n`;
                    }
                    if (prop.readonly) {
                        md += '**只读**: 是\n\n';
                    }
                    md += '</details>\n\n';
                });
            }

            // Methods
            if (cls.methods.length > 0) {
                md += '##### Methods\n\n';
                cls.methods.forEach(method => {
                    const methodAnchor = `${cls.anchor}-${method.name?.toLowerCase()}`;
                    md += `<div id="${methodAnchor}"></div>\n\n`;
                    md += '<details>\n';
                    md += `<summary><code>${linkifyCodeTypes(method.signature)}</code></summary>\n\n`;
                    if (method.description) {
                        md += `${convertJSDocLinks(method.description)}\n\n`;
                    }
                    md += '</details>\n\n';
                });
            }

            md += '---\n\n';
        });
    }

    // Interfaces
    if (topLevelTypes.interfaces.length > 0) {
        topLevelTypes.interfaces.sort((a, b) => a.name.localeCompare(b.name)).forEach(iface => {
            // 使用 Docusaurus 的标题锚点格式
            md += `#### ${iface.name} {#${iface.anchor}}\n\n`;

            if (iface.description) {
                md += `${convertJSDocLinks(iface.description)}\n\n`;
            }

            // Properties
            if (iface.properties.length > 0) {
                md += '##### Properties\n\n';
                iface.properties.forEach(prop => {
                    const propAnchor = `${iface.anchor}-${prop.name?.toLowerCase()}`;
                    md += `<div id="${propAnchor}"></div>\n\n`;
                    md += '<details>\n';
                    md += `<summary><code>${prop.name}: ${linkifyCodeTypes(prop.type)}</code></summary>\n\n`;
                    if (prop.description) {
                        md += `${convertJSDocLinks(prop.description)}\n\n`;
                    }
                    if (prop.readonly) {
                        md += '**只读**: 是\n\n';
                    }
                    md += '</details>\n\n';
                });
            }

            // Methods
            if (iface.methods.length > 0) {
                md += '##### Methods\n\n';
                iface.methods.forEach(method => {
                    const methodAnchor = `${iface.anchor}-${method.name?.toLowerCase()}`;
                    md += `<div id="${methodAnchor}"></div>\n\n`;
                    md += '<details>\n';
                    md += `<summary><code>${linkifyCodeTypes(method.signature)}</code></summary>\n\n`;
                    if (method.description) {
                        md += `${convertJSDocLinks(method.description)}\n\n`;
                    }
                    md += '</details>\n\n';
                });
            }

            md += '---\n\n';
        });
    }

    // 关闭性能优化 div
    md += '\n</div>\n';

    return md;
}

/**
 * 转义 HTML 特殊字符和 MDX 特殊字符
 */
function escapeHtml(text) {
    return text
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/{/g, '&#123;')
        .replace(/}/g, '&#125;');
}

/**
 * 转义签名中的特殊字符（转义尖括号和花括号，符合 MDX v3 要求）
 */
function escapeSignature(text) {
    return text
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/{/g, '&#123;')
        .replace(/}/g, '&#125;');
}

/**
 * 转义代码中的特殊字符（包括 MDX 的花括号）
 */
function escapeCode(text) {
    return text
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/{/g, '&#123;')
        .replace(/}/g, '&#125;');
}

/**
 * 转义 Markdown 文本中的 MDX 特殊字符
 * 用于普通文本内容（描述、注释等）
 */
function escapeMDXText(text) {
    if (!text) return text;
    return text
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/{/g, '&#123;')
        .replace(/}/g, '&#125;');
}

/**
 * 转换 JSDoc {@link ...} 和 {@linkcode ...} 标签为 HTML 链接
 * 并转义 MDX 特殊字符（<>{}）
 */
function convertJSDocLinks(text) {
    if (!text) return text;

    // 先提取所有 JSDoc 链接并用占位符替换
    const jsdocLinkPattern = /\{@link(?:code)?\s+([A-Za-z0-9_.]+)(?:\s+([^}]+))?\}/g;
    const links = [];
    let linkIndex = 0;

    text = text.replace(jsdocLinkPattern, (match, reference, description) => {
        const placeholder = `___JSDOC_LINK_${linkIndex}___`;
        links.push({ reference, description });
        linkIndex++;
        return placeholder;
    });

    // 处理换行符：将多个连续换行替换为占位符，单个换行替换为空格
    // 这样可以保持段落分隔，同时避免 MDX 解析错误
    text = text.replace(/\n\n+/g, '___LINE_BREAK___').replace(/\n/g, ' ');

    // 转义所有 MDX 特殊字符（<>{}）
    text = text
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/{/g, '&#123;')
        .replace(/}/g, '&#125;');

    // 将换行占位符替换为 <br/> 标签（在转义之后，所以不会被转义）
    text = text.replace(/___LINE_BREAK___/g, '<br/><br/>');

    // 恢复 JSDoc 链接为 HTML（不会被转义，因为已经转义完了）
    links.forEach((link, index) => {
        const placeholder = `___JSDOC_LINK_${index}___`;
        const { reference, description } = link;

        let replacement;

        // 如果有描述文本，使用描述
        if (description) {
            // 如果类型在符号表中，创建链接；否则只返回描述文本
            if (symbols.has(reference)) {
                const symbol = symbols.get(reference);
                replacement = `<a href="#${symbol.anchor}">${description}</a>`;
            } else {
                replacement = description;
            }
        }
        // 如果是命名空间引用 (如 commands.registerCommand)，提取最后一部分
        else if (reference.includes('.')) {
            const parts = reference.split('.');
            const lastName = parts[parts.length - 1];
            // 尝试用最后一部分创建链接
            if (symbols.has(lastName)) {
                const symbol = symbols.get(lastName);
                replacement = `<a href="#${symbol.anchor}">${lastName}</a>`;
            } else {
                replacement = lastName;
            }
        }
        // 如果是小写开头的参数名（如 args），直接返回
        else if (reference[0] === reference[0].toLowerCase()) {
            replacement = `\`${reference}\``;
        }
        // 否则，如果类型在符号表中，转换为 HTML 链接
        else if (symbols.has(reference)) {
            const symbol = symbols.get(reference);
            replacement = `<a href="#${symbol.anchor}">${reference}</a>`;
        } else {
            replacement = reference;
        }

        text = text.replace(placeholder, replacement);
    });

    return text;
}

/**
 * 将类型字符串中的类型引用转换为 HTML 链接
 * 例如: "CanonicalUriProvider" => "<a href='#canonicaluriprovider'>CanonicalUriProvider</a>"
 * 这个函数用于普通文本内容，会先处理 JSDoc 链接再添加类型链接
 */
function linkifyTypes(typeString) {
    if (!typeString) return typeString;

    // 先处理 JSDoc 链接（这会转义花括号）
    typeString = convertJSDocLinks(typeString);

    // 匹配类型名（包括泛型）
    // 匹配模式：单词边界 + 大写字母开头的标识符
    const typePattern = /\b([A-Z][a-zA-Z0-9]*)\b/g;

    return typeString.replace(typePattern, (match, typeName) => {
        // 跳过基本类型
        if (PRIMITIVE_TYPES.has(typeName)) {
            return match;
        }

        // 检查是否在符号表中
        if (symbols.has(typeName)) {
            const symbol = symbols.get(typeName);
            return `<a href="#${symbol.anchor}">${typeName}</a>`;
        }

        return match;
    });
}

/**
 * 为代码块中的类型添加链接（使用 HTML a 标签，因为在 code 标签内 Markdown 链接不会渲染）
 */
function linkifyCodeTypes(typeString) {
    if (!typeString) return escapeCode(typeString || '');

    // 先转义尖括号和花括号，使用占位符避免后续替换影响
    // 使用不包含单词字符的占位符，以免影响\b单词边界匹配
    let result = typeString
        .replace(/</g, '«LT»')
        .replace(/>/g, '«GT»')
        .replace(/{/g, '«LB»')
        .replace(/}/g, '«RB»');

    // 匹配类型名（使用大写字母开头的标识符）
    const typePattern = /\b([A-Z][a-zA-Z0-9]*)\b/g;

    // 收集所有需要替换的类型及其位置
    const replacements = [];
    let match;

    while ((match = typePattern.exec(result)) !== null) {
        const typeName = match[1];

        // 跳过基本类型
        if (PRIMITIVE_TYPES.has(typeName)) {
            continue;
        }

        // 检查是否在符号表中
        if (symbols.has(typeName)) {
            const symbol = symbols.get(typeName);
            replacements.push({
                start: match.index,
                end: match.index + typeName.length,
                original: typeName,
                // 使用纯 CSS pointer-events 方案，不用 onClick（避免内存泄漏）
                replacement: `<a href="#${symbol.anchor}">${typeName}</a>`
            });
        }
    }

    // 从后往前替换，避免位置偏移
    replacements.sort((a, b) => b.start - a.start);

    replacements.forEach(({ start, end, replacement }) => {
        result = result.substring(0, start) + replacement + result.substring(end);
    });

    // 将占位符替换为HTML实体
    result = result
        .replace(/«LT»/g, '&lt;')
        .replace(/«GT»/g, '&gt;')
        .replace(/«LB»/g, '&#123;')
        .replace(/«RB»/g, '&#125;');

    return result;
}

/**
 * 主函数
 */
function main() {
    console.log('开始扫描文件...');

    // 获取所有 .ts 和 .d.ts 文件
    const files = fs.readdirSync(PLUGIN_DIR)
        .filter(file => file.endsWith('.ts') || file.endsWith('.d.ts'))
        .filter(file => !file.includes('.spec.'))
        .map(file => path.join(PLUGIN_DIR, file));

    console.log(`找到 ${files.length} 个文件`);

    // 解析每个文件
    files.forEach(file => {
        console.log(`解析: ${path.basename(file)}`);
        parseFile(file);
    });

    console.log(`\n提取到 ${namespaces.size} 个 namespace`);

    // 生成 Markdown
    console.log('生成 Markdown 文档...');
    const markdown = generateMarkdown();

    // 确保输出目录存在
    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // 写入文件
    fs.writeFileSync(OUTPUT_FILE, markdown, 'utf-8');

    console.log(`\n✅ 文档已生成: ${OUTPUT_FILE}`);
    console.log(`\nNamespace 统计:`);
    namespaces.forEach(ns => {
        console.log(`  - ${ns.name}: ${ns.functions.length} 函数, ${ns.events.length} 事件, ${ns.variables.length} 变量`);
    });
}

// 运行
main();
