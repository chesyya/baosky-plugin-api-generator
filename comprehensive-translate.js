#!/usr/bin/env node
/**
 * 综合翻译脚本 - 使用多种策略翻译Markdown文档
 */

const fs = require('fs');
const path = require('path');

// 需要翻译的文件列表（按优先级）
const PRIORITY_FILES = [
  // 高优先级
  'extension-guides/overview.md',
  'extension-guides/task-provider.md',
  'extension-guides/telemetry.md',
  'extension-guides/virtual-documents.md',
  'extension-guides/workspace-trust.md',
  'ux-guidelines/settings.md',
  'ux-guidelines/panel.md',
  'ux-guidelines/quick-picks.md',
  'ux-guidelines/walkthroughs.md',
  
  // 中优先级
  'extension-guides/virtual-workspaces.md',
  'extension-guides/testing.md',
  'extension-guides/tree-view.md',
  'extension-guides/notebook.md',
  'extension-guides/webview.md',
  'extension-guides/web-extensions.md',
  
  // references
  'references/document-selector.md',
  'references/extension-manifest.md',
  'references/when-clause-contexts.md',
  'references/commands.md',
  'references/contribution-points.md',
  'references/icons-in-labels.md',
  'references/theme-color.md',
  
  // working-with-extensions
  'working-with-extensions/continuous-integration.md',
  'working-with-extensions/publishing-extension.md',
  'working-with-extensions/testing-extension.md',
];

// 综合翻译映射（基于实际文档内容的常见模式）
const TRANSLATIONS = {
  // 完整句子翻译
  'The Notebook API allows Baosky 插件 要 open files as notebooks, execute notebook code cells, and render notebook outputs in a variety of rich and interactive formats.':
    'Notebook API 允许 Baosky 插件以笔记本形式打开文件、执行笔记本代码单元格，并以各种丰富的交互格式呈现笔记本输出。',
  
  'You may know of popular notebook interfaces like Jupyter Notebook or Google Colab': 
    '您可能知道流行的笔记本界面，如 Jupyter Notebook 或 Google Colab',
  
  'the Notebook API allows for similar experiences inside Baosky':
    'Notebook API 允许在 Baosky 中实现类似的体验',
  
  // 常见段落开头
  'This page': '本页',
  'This section': '本节',
  'This article': '本文',
  'This guide': '本指南',
  'This tutorial': '本教程',
  'This document': '本文档',
  'This example': '此示例',
  
  // 常见动词短语
  'allows you to': '允许您',
  'enables you to': '使您能够',
  'helps you': '帮助您',
  'shows you': '向您展示',
  'explains how to': '解释如何',
  'describes how to': '描述如何',
  'demonstrates how to': '演示如何',
  
  // 指示性短语
  'In this example': '在此示例中',
  'For example': '例如',
  'For instance': '例如',
  'As shown': '如图所示',
  'As follows': '如下所示',
  'In order to': '为了',
  'You can': '您可以',
  'You should': '您应该',
  'You need to': '您需要',
  'You must': '您必须',
  'It is': '它是',
  'There is': '有',
  'There are': '有',
  
  // 列表项开头
  'To do this': '要执行此操作',
  'To achieve this': '要实现此目标',
  'To get started': '要开始',
  'To install': '要安装',
  'To create': '要创建',
  'To use': '要使用',
  'To configure': '要配置',
};

/**
 * 翻译文本
 */
function translateText(text) {
  let result = text;
  
  // 应用完整句子翻译
  for (const [en, zh] of Object.entries(TRANSLATIONS)) {
    result = result.replace(new RegExp(en, 'g'), zh);
  }
  
  return result;
}

/**
 * 处理文件
 */
function processFile(filePath) {
  const fullPath = path.join(__dirname, 'docs/plugin-docs', filePath);
  
  if (!fs.existsSync(fullPath)) {
    return false;
  }
  
  let content = fs.readFileSync(fullPath, 'utf-8');
  const original = content;
  
  // 按行处理
  const lines = content.split('\n');
  const newLines = [];
  
  let inCodeBlock = false;
  let inFrontmatter = false;
  let frontmatterCount = 0;
  
  for (const line of lines) {
    // Frontmatter
    if (line.trim() === '---') {
      frontmatterCount++;
      if (frontmatterCount <= 2) {
        inFrontmatter = !inFrontmatter;
      }
      newLines.push(line);
      continue;
    }
    
    if (inFrontmatter) {
      newLines.push(line);
      continue;
    }
    
    // Code block
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      newLines.push(line);
      continue;
    }
    
    if (inCodeBlock) {
      newLines.push(line);
      continue;
    }
    
    // 翻译非代码行
    newLines.push(translateText(line));
  }
  
  content = newLines.join('\n');
  
  if (content !== original) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    return true;
  }
  
  return false;
}

/**
 * 主函数
 */
function main() {
  console.log('='.repeat(80));
  console.log('综合翻译脚本');
  console.log('='.repeat(80));
  console.log();
  
  let count = 0;
  
  PRIORITY_FILES.forEach((file, index) => {
    process.stdout.write(`[${index + 1}/${PRIORITY_FILES.length}] ${file} ... `);
    
    if (processFile(file)) {
      console.log('✓');
      count++;
    } else {
      console.log('-');
    }
  });
  
  console.log();
  console.log('='.repeat(80));
  console.log(`完成！共更新了 ${count} 个文件`);
  console.log('='.repeat(80));
}

if (require.main === module) {
  main();
}
