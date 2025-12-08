#!/usr/bin/env node
/**
 * 批量翻译 plugin-docs 目录下的所有 Markdown 文件
 * 将 VSCode 替换为 Baosky，extension 替换为插件，并翻译为中文
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DOCS_DIR = path.join(__dirname, 'docs/plugin-docs');

// VSCode 相关术语替换
const termReplacements = {
  'VS Code': 'Baosky',
  'VSCode': 'Baosky',
  'Visual Studio Code': 'Baosky',
  'vscode': 'baosky',
};

// 获取所有需要翻译的文件
function getAllMarkdownFiles(dir) {
  const files = [];

  function traverse(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);

      if (entry.isDirectory()) {
        traverse(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  }

  traverse(dir);
  return files.sort();
}

// 检测文件是否需要翻译（是否包含未翻译的英文）
function needsTranslation(content) {
  // 移除 frontmatter
  const withoutFrontmatter = content.replace(/^---[\s\S]*?---\n/m, '');

  // 移除代码块
  const withoutCodeBlocks = withoutFrontmatter.replace(/```[\s\S]*?```/g, '');

  // 移除行内代码
  const withoutInlineCode = withoutCodeBlocks.replace(/`[^`]+`/g, '');

  // 检查是否包含常见的英文单词（可能需要翻译）
  const englishPatterns = [
    /\b(The|This|These|Those|What|How|Why|When|Where)\b/,
    /\b(is|are|was|were|has|have|had|can|could|will|would)\b/,
    /\b(extension|Extension|plugin|Plugin)\s+(is|are|can|provides|allows)/i,
    /\b(You can|You should|You must|Users can)\b/i,
  ];

  return englishPatterns.some(pattern => pattern.test(withoutInlineCode));
}

// 主函数
function main() {
  const files = getAllMarkdownFiles(DOCS_DIR);

  console.log(`找到 ${files.length} 个 Markdown 文件\n`);

  const filesToTranslate = [];

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    if (needsTranslation(content)) {
      filesToTranslate.push(file);
    }
  }

  console.log(`需要翻译的文件：${filesToTranslate.length} 个\n`);

  // 输出文件列表
  for (let i = 0; i < filesToTranslate.length; i++) {
    const relativePath = path.relative(DOCS_DIR, filesToTranslate[i]);
    console.log(`${i + 1}. ${relativePath}`);
  }

  console.log('\n请使用 Claude Code 逐个翻译这些文件。');
}

if (require.main === module) {
  main();
}

module.exports = { getAllMarkdownFiles, needsTranslation };
