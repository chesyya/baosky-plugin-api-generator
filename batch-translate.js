#!/usr/bin/env node
/**
 * 批量翻译 Markdown 文档脚本
 * 快速翻译所有剩余的英文文档
 */

const fs = require('fs');
const path = require('path');

// 定义需要翻译的文件列表（按优先级）
const FILES_TO_TRANSLATE = [
  // 第一批：高优先级
  'references/commands.md',
  'references/contribution-points.md',
  'references/extension-manifest.md',
  'working-with-extensions/publishing-extension.md',

  // 第二批：extension-guides
  'extension-guides/color-theme.md',
  'extension-guides/command.md',
  'extension-guides/custom-data-extension.md',
  'extension-guides/custom-editors.md',
  'extension-guides/debugger-extension.md',
  'extension-guides/file-icon-theme.md',
  'extension-guides/markdown-extension.md',
  'extension-guides/notebook.md',
  'extension-guides/product-icon-theme.md',
  'extension-guides/scm-provider.md',
  'extension-guides/task-provider.md',
  'extension-guides/telemetry.md',
  'extension-guides/testing.md',
  'extension-guides/tree-view.md',
  'extension-guides/virtual-documents.md',
  'extension-guides/virtual-workspaces.md',
  'extension-guides/web-extensions.md',
  'extension-guides/webview.md',
  'extension-guides/workspace-trust.md',

  // 第三批：AI 相关
  'extension-guides/ai/ai-extensibility-overview.md',
  'extension-guides/ai/chat-tutorial.md',
  'extension-guides/ai/chat.md',
  'extension-guides/ai/language-model-chat-provider.md',
  'extension-guides/ai/language-model-tutorial.md',
  'extension-guides/ai/language-model.md',
  'extension-guides/ai/mcp.md',
  'extension-guides/ai/prompt-tsx.md',
  'extension-guides/ai/tools.md',

  // 第四批：其他目录
  'references/document-selector.md',
  'references/icons-in-labels.md',
  'references/theme-color.md',
  'references/when-clause-contexts.md',
  'ux-guidelines/activity-bar.md',
  'ux-guidelines/command-palette.md',
  'ux-guidelines/context-menus.md',
  'ux-guidelines/editor-actions.md',
  'ux-guidelines/notifications.md',
  'ux-guidelines/panel.md',
  'ux-guidelines/quick-picks.md',
  'ux-guidelines/settings.md',
  'ux-guidelines/sidebars.md',
  'ux-guidelines/status-bar.md',
  'ux-guidelines/views.md',
  'ux-guidelines/walkthroughs.md',
  'ux-guidelines/webviews.md',
  'working-with-extensions/bundling-extension.md',
  'working-with-extensions/continuous-integration.md',
  'working-with-extensions/testing-extension.md',
  'language-extensions/embedded-languages.md',
  'language-extensions/language-configuration-guide.md',
  'language-extensions/language-server-extension-guide.md',
  'language-extensions/programmatic-language-features.md',
  'language-extensions/semantic-highlight-guide.md',
  'language-extensions/snippet-guide.md',
  'language-extensions/syntax-highlight-guide.md',
  'advanced-topics/extension-host.md',
  'advanced-topics/python-extension-template.md',
  'advanced-topics/remote-extensions.md',
  'advanced-topics/tslint-eslint-migration.md',
  'advanced-topics/using-proposed-api.md',
];

const BASE_DIR = '/root/my_website/my-website/docs/plugin-docs';

// 简单的翻译映射（常见短语）
const TRANSLATIONS = {
  // 标题和常见短语
  'Overview': '概述',
  'Getting Started': '入门',
  'Get Started': '开始',
  'Prerequisites': '前提条件',
  'Installation': '安装',
  'Usage': '使用',
  'Examples': '示例',
  'API Reference': 'API 参考',
  'Configuration': '配置',
  'Troubleshooting': '故障排除',
  'FAQ': '常见问题',
  'Next Steps': '下一步',
  'Learn More': '了解更多',
  'See Also': '另请参阅',
  'Note:': '注意：',
  'Tip:': '提示：',
  'Warning:': '警告：',
  'Important:': '重要：',

  // 专业术语
  'extension': '插件',
  'Extension': '插件',
  'extensions': '插件',
  'Extensions': '插件',
  'workspace': '工作区',
  'Workspace': '工作区',
  'workspaces': '工作区',
  'Workspaces': '工作区',
  'debug': '调试',
  'Debug': '调试',
  'debugging': '调试',
  'Debugging': '调试',
  'command': '命令',
  'Command': '命令',
  'commands': '命令',
  'Commands': '命令',
  'activation event': '激活事件',
  'Activation Event': '激活事件',
  'activation events': '激活事件',
  'Activation Events': '激活事件',
  'contribution point': '贡献点',
  'Contribution Point': '贡献点',
  'contribution points': '贡献点',
  'Contribution Points': '贡献点',
  'manifest': '清单',
  'Manifest': '清单',
  'theme': '主题',
  'Theme': '主题',
  'themes': '主题',
  'Themes': '主题',
  'editor': '编辑器',
  'Editor': '编辑器',
  'terminal': '终端',
  'Terminal': '终端',
  'view': '视图',
  'View': '视图',
  'views': '视图',
  'Views': '视图',
  'panel': '面板',
  'Panel': '面板',
  'sidebar': '侧边栏',
  'Sidebar': '侧边栏',
  'status bar': '状态栏',
  'Status Bar': '状态栏',
  'activity bar': '活动栏',
  'Activity Bar': '活动栏',
  'marketplace': '市场',
  'Marketplace': '市场',
  'repository': '仓库',
  'Repository': '仓库',
  'package': '包',
  'Package': '包',
  'dependencies': '依赖项',
  'Dependencies': '依赖项',
  'settings': '设置',
  'Settings': '设置',
  'preferences': '首选项',
  'Preferences': '首选项',
};

/**
 * 检查文件是否包含大量英文内容
 */
function containsEnglish(content) {
  // 移除代码块
  const withoutCode = content.replace(/```[\s\S]*?```/g, '');
  // 移除内联代码
  const withoutInlineCode = withoutCode.replace(/`[^`]+`/g, '');
  // 移除 URL
  const withoutUrls = withoutInlineCode.replace(/https?:\/\/[^\s]+/g, '');

  // 检查是否有英文单词
  const englishWords = withoutUrls.match(/\b[a-zA-Z]{3,}\b/g);
  return englishWords && englishWords.length > 50;
}

/**
 * 简单翻译函数（仅用于标记已翻译的文件）
 */
function simpleTranslate(content) {
  // 这里不做实际翻译，只是添加中文标记
  // 实际翻译需要使用 AI 或人工翻译
  return content;
}

/**
 * 检查并报告文件状态
 */
function checkFile(filePath) {
  const fullPath = path.join(BASE_DIR, filePath);

  if (!fs.existsSync(fullPath)) {
    return { exists: false, needsTranslation: false };
  }

  const content = fs.readFileSync(fullPath, 'utf-8');
  const needsTranslation = containsEnglish(content);

  return {
    exists: true,
    needsTranslation,
    size: content.length,
    lines: content.split('\n').length
  };
}

/**
 * 主函数
 */
function main() {
  console.log('='.repeat(80));
  console.log('批量翻译文档检查');
  console.log('='.repeat(80));
  console.log();

  const stats = {
    total: FILES_TO_TRANSLATE.length,
    exists: 0,
    needsTranslation: 0,
    alreadyTranslated: 0,
    missing: 0
  };

  const needsTranslationList = [];

  FILES_TO_TRANSLATE.forEach((file, index) => {
    const result = checkFile(file);

    if (!result.exists) {
      stats.missing++;
      console.log(`[${index + 1}/${stats.total}] ❌ 文件不存在: ${file}`);
    } else {
      stats.exists++;
      if (result.needsTranslation) {
        stats.needsTranslation++;
        needsTranslationList.push(file);
        console.log(`[${index + 1}/${stats.total}] 📝 需要翻译: ${file} (${result.lines} 行)`);
      } else {
        stats.alreadyTranslated++;
        console.log(`[${index + 1}/${stats.total}] ✅ 已翻译: ${file}`);
      }
    }
  });

  console.log();
  console.log('='.repeat(80));
  console.log('统计摘要');
  console.log('='.repeat(80));
  console.log(`总文件数: ${stats.total}`);
  console.log(`存在的文件: ${stats.exists}`);
  console.log(`需要翻译: ${stats.needsTranslation}`);
  console.log(`已翻译: ${stats.alreadyTranslated}`);
  console.log(`缺失: ${stats.missing}`);
  console.log();

  if (needsTranslationList.length > 0) {
    console.log('需要翻译的文件列表:');
    needsTranslationList.forEach((file, index) => {
      console.log(`  ${index + 1}. ${file}`);
    });
  }
}

if (require.main === module) {
  main();
}

module.exports = { checkFile, containsEnglish };
