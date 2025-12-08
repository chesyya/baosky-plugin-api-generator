#!/usr/bin/env node
/**
 * 批量替换文档中的术语
 * VSCode -> Baosky
 * extension -> 插件
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, 'docs/plugin-docs');

// 术语替换规则（按顺序执行）
const replacements = [
  // VSCode 相关
  { pattern: /Visual Studio Code/g, replacement: 'Baosky' },
  { pattern: /VS Code/g, replacement: 'Baosky' },
  { pattern: /VSCode/g, replacement: 'Baosky' },
  { pattern: /\bvscode\b/g, replacement: 'baosky' },

  // Extension 相关 (保护代码中的 extensionKind, extensionId 等)
  { pattern: /\bExtensions\b/g, replacement: '插件' },
  { pattern: /\bextensions\b(?!\.)(?!\s*:)/g, replacement: '插件' },
  { pattern: /\bExtension\b(?!Kind|Context|Host|Mode)/g, replacement: '插件' },
  { pattern: /\bextension\b(?!Kind|Context|Host|Mode|\.|\s*:|\s*\{)/g, replacement: '插件' },

  // 但要保护某些技术术语
  { pattern: /插件Kind/g, replacement: 'extensionKind' },
  { pattern: /插件Context/g, replacement: 'ExtensionContext' },
  { pattern: /插件Host/g, replacement: 'ExtensionHost' },
  { pattern: /插件Mode/g, replacement: 'ExtensionMode' },
];

function processContent(content, filePath) {
  const lines = content.split('\n');
  let inCodeBlock = false;
  let inFrontmatter = false;
  let frontmatterCount = 0;
  const processedLines = [];

  for (let line of lines) {
    // 检测 frontmatter
    if (line.trim() === '---') {
      frontmatterCount++;
      if (frontmatterCount <= 2) {
        inFrontmatter = frontmatterCount === 1;
      }
      processedLines.push(line);
      continue;
    }

    // 在 frontmatter 中，只替换 MetaDescription 行
    if (inFrontmatter) {
      if (line.includes('MetaDescription:')) {
        for (const { pattern, replacement } of replacements) {
          line = line.replace(pattern, replacement);
        }
      }
      processedLines.push(line);
      continue;
    }

    // 检测代码块
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      processedLines.push(line);
      continue;
    }

    // 在代码块中不替换
    if (inCodeBlock) {
      processedLines.push(line);
      continue;
    }

    // 保护行内代码
    const codeMatches = [];
    line = line.replace(/`[^`]+`/g, (match) => {
      const index = codeMatches.length;
      codeMatches.push(match);
      return `__CODE__${index}__`;
    });

    // 执行替换
    for (const { pattern, replacement } of replacements) {
      line = line.replace(pattern, replacement);
    }

    // 恢复行内代码
    for (let i = 0; i < codeMatches.length; i++) {
      line = line.replace(`__CODE__${i}__`, codeMatches[i]);
    }

    processedLines.push(line);
  }

  return processedLines.join('\n');
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const processed = processContent(content, filePath);

    if (content !== processed) {
      fs.writeFileSync(filePath, processed, 'utf-8');
      return true;
    }
    return false;
  } catch (error) {
    console.error(`错误处理文件 ${filePath}:`, error.message);
    return false;
  }
}

function processDirectory(dir) {
  let changedCount = 0;
  let totalCount = 0;

  function traverse(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);

      if (entry.isDirectory()) {
        traverse(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        totalCount++;
        const relativePath = path.relative(DOCS_DIR, fullPath);
        process.stdout.write(`处理: ${relativePath} ... `);

        if (processFile(fullPath)) {
          console.log('✓ 已更新');
          changedCount++;
        } else {
          console.log('- 无变化');
        }
      }
    }
  }

  traverse(dir);
  return { total: totalCount, changed: changedCount };
}

console.log('开始批量替换术语...\n');
const result = processDirectory(DOCS_DIR);
console.log(`\n完成！`);
console.log(`总文件数: ${result.total}`);
console.log(`已更新: ${result.changed}`);
console.log(`未变化: ${result.total - result.changed}`);
