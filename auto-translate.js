#!/usr/bin/env node
/**
 * 自动翻译 Markdown 文档脚本
 * 使用简单的规则和映射来翻译文档
 */

const fs = require('fs');
const path = require('path');

// 需要翻译的文件列表
const filesToTranslate = [
  'extension-guides/ai/chat.md',
  'extension-guides/ai/language-model-chat-provider.md',
  'extension-guides/ai/language-model-tutorial.md',
  'extension-guides/ai/language-model.md',
  'extension-guides/ai/mcp.md',
  'extension-guides/ai/tools.md',
  'extension-guides/color-theme.md',
  'extension-guides/custom-editors.md',
  'extension-guides/markdown-extension.md',
  'extension-guides/notebook.md',
  'extension-guides/overview.md',
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
  'references/activation-events.md',
  'references/commands.md',
  'references/contribution-points.md',
  'references/document-selector.md',
  'references/extension-manifest.md',
  'references/icons-in-labels.md',
  'references/theme-color.md',
  'references/when-clause-contexts.md',
  'ux-guidelines/notifications.md',
  'ux-guidelines/panel.md',
  'ux-guidelines/quick-picks.md',
  'ux-guidelines/settings.md',
  'ux-guidelines/sidebars.md',
  'ux-guidelines/status-bar.md',
  'ux-guidelines/views.md',
  'ux-guidelines/walkthroughs.md',
  'ux-guidelines/webviews.md',
  'working-with-extensions/continuous-integration.md',
  'working-with-extensions/publishing-extension.md',
  'working-with-extensions/testing-extension.md',
];

// 常见英文短语到中文的映射
const translations = {
  // 文档结构相关
  'This guide': '本指南',
  'This topic': '本主题',
  'This section': '本节',
  'This article': '本文',
  'This page': '本页',
  'This document': '本文档',
  
  // 指示词
  'For example': '例如',
  'For instance': '例如',
  'For more information': '有关更多信息',
  'For details': '详情请见',
  'To learn more': '要了解更多',
  'Learn more': '了解更多',
  'See also': '另请参阅',
  'Refer to': '请参阅',
  'Check out': '查看',
  
  // 操作相关
  'You can': '你可以',
  'You should': '你应该',
  'You need to': '你需要',
  'You must': '你必须',
  'To do this': '要执行此操作',
  'In order to': '为了',
  
  // 提示词
  'Note:': '注意：',
  'Tip:': '提示：',
  'Warning:': '警告：',
  'Important:': '重要：',
  'Example:': '示例：',
  
  // 技术术语 (保留一些，翻译一些)
  'extension': '插件',
  'Extension': '插件',
  'extensions': '插件',
  'Extensions': '插件',
  'plugin': '插件',
  'Plugin': '插件',
  'add-on': '插件',
  'Add-on': '插件',
  
  'workspace': '工作区',
  'Workspace': '工作区',
  'workspaces': '工作区',
  'Workspaces': '工作区',
  
  'command': '命令',
  'Command': '命令',
  'commands': '命令',
  'Commands': '命令',
  
  'configuration': '配置',
  'Configuration': '配置',
  'config': '配置',
  'Config': '配置',
  'settings': '设置',
  'Settings': '设置',
  
  'debug': '调试',
  'Debug': '调试',
  'debugger': '调试器',
  'Debugger': '调试器',
  'debugging': '调试',
  'Debugging': '调试',
  
  'workbench': '工作台',
  'Workbench': '工作台',
  
  'theme': '主题',
  'Theme': '主题',
  'themes': '主题',
  'Themes': '主题',
  
  'marketplace': '市场',
  'Marketplace': '市场',
  
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
  
  'provider': '提供器',
  'Provider': '提供器',
  'providers': '提供器',
  'Providers': '提供器',
  
  'editor': '编辑器',
  'Editor': '编辑器',
  'editors': '编辑器',
  'Editors': '编辑器',
  
  'status bar': '状态栏',
  'Status Bar': '状态栏',
  'statusbar': '状态栏',
  'StatusBar': '状态栏',
  
  'sidebar': '侧边栏',
  'Sidebar': '侧边栏',
  'side bar': '侧边栏',
  'Side Bar': '侧边栏',
  
  'panel': '面板',
  'Panel': '面板',
  'panels': '面板',
  'Panels': '面板',
  
  'terminal': '终端',
  'Terminal': '终端',
  
  'notification': '通知',
  'Notification': '通知',
  'notifications': '通知',
  'Notifications': '通知',
  
  'hover': '悬停',
  'Hover': '悬停',
  
  'completion': '补全',
  'Completion': '补全',
  'completions': '补全',
  'Completions': '补全',
  'autocomplete': '自动补全',
  'AutoComplete': '自动补全',
  
  'diagnostic': '诊断',
  'Diagnostic': '诊断',
  'diagnostics': '诊断',
  'Diagnostics': '诊断',
};

function main() {
  const baseDir = path.join(__dirname, 'docs', 'plugin-docs');
  
  console.log('自动翻译 Markdown 文档');
  console.log('========================\n');
  console.log(`基础目录: ${baseDir}`);
  console.log(`需要翻译的文件数: ${filesToTranslate.length}\n`);
  
  let successCount = 0;
  let failCount = 0;
  
  for (const relPath of filesToTranslate) {
    const filePath = path.join(baseDir, relPath);
    
    try {
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  跳过: ${relPath} (文件不存在)`);
        failCount++;
        continue;
      }
      
      // 读取文件
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // 简单替换（注意：这是一个非常简化的翻译，实际需要更复杂的处理）
      let translated = content;
      
      // 在代码块外进行替换
      const lines = content.split('\n');
      let inCodeBlock = false;
      let inFrontmatter = false;
      let result = [];
      
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        
        // 检测 frontmatter
        if (i === 0 && line.trim() === '---') {
          inFrontmatter = true;
          result.push(line);
          continue;
        }
        if (inFrontmatter && line.trim() === '---') {
          inFrontmatter = false;
          result.push(line);
          continue;
        }
        
        // 在 frontmatter 中，跳过翻译
        if (inFrontmatter) {
          result.push(line);
          continue;
        }
        
        // 检测代码块
        if (line.trim().startsWith('```')) {
          inCodeBlock = !inCodeBlock;
          result.push(line);
          continue;
        }
        
        // 在代码块中，跳过翻译
        if (inCodeBlock) {
          result.push(line);
          continue;
        }
        
        // 执行简单的替换翻译
        for (const [eng, chn] of Object.entries(translations)) {
          // 使用单词边界来避免部分匹配
          const regex = new RegExp(`\\b${eng.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
          line = line.replace(regex, chn);
        }
        
        result.push(line);
      }
      
      translated = result.join('\n');
      
      // 如果内容有变化，写回文件
      if (translated !== content) {
        fs.writeFileSync(filePath, translated, 'utf-8');
        console.log(`✅ 已翻译: ${relPath}`);
        successCount++;
      } else {
        console.log(`⏭️  跳过: ${relPath} (无需翻译)`);
      }
      
    } catch (error) {
      console.log(`❌ 失败: ${relPath}`);
      console.log(`   错误: ${error.message}`);
      failCount++;
    }
  }
  
  console.log(`\n翻译完成!`);
  console.log(`✅ 成功: ${successCount}`);
  console.log(`❌ 失败: ${failCount}`);
  console.log(`⏭️  跳过: ${filesToTranslate.length - successCount - failCount}`);
}

if (require.main === module) {
  main();
}
