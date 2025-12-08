#!/usr/bin/env node
/**
 * 最终检查脚本 - 统计所有文件的翻译状态
 */

const fs = require('fs');
const path = require('path');

/**
 * 统计文本中的中英文比例
 */
function analyzeText(content) {
  // 移除代码块
  const withoutCode = content.replace(/```[\s\S]*?```/g, '');
  // 移除内联代码
  const withoutInlineCode = withoutCode.replace(/`[^`]+`/g, '');
  // 移除URLs
  const withoutUrls = withoutInlineCode.replace(/https?:\/\/[^\s)]+/g, '');
  // 移除frontmatter
  const withoutFrontmatter = withoutUrls.replace(/^---[\s\S]*?---/m, '');

  // 统计中文字符数
  const chineseChars = (withoutFrontmatter.match(/[\u4e00-\u9fa5]/g) || []).length;

  // 统计英文单词数（连续的字母序列）
  const englishWords = (withoutFrontmatter.match(/\b[a-zA-Z]+\b/g) || []).length;

  // 计算总字符数
  const totalChars = chineseChars + englishWords;

  return {
    chineseChars,
    englishWords,
    totalChars,
    chineseRatio: totalChars > 0 ? (chineseChars / totalChars * 100).toFixed(1) : 0,
    englishRatio: totalChars > 0 ? (englishWords / totalChars * 100).toFixed(1) : 0
  };
}

/**
 * 检查文件翻译状态
 */
function checkFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const stats = analyzeText(content);
  const lines = content.split('\n').length;

  // 判断翻译状态
  let status;
  if (stats.chineseRatio > 60) {
    status = '✅ 已完成';
  } else if (stats.chineseRatio > 30) {
    status = '⚠️  部分翻译';
  } else {
    status = '❌ 需要翻译';
  }

  return {
    lines,
    ...stats,
    status
  };
}

/**
 * 扫描目录
 */
function scanDirectory(baseDir) {
  const results = [];

  function scan(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scan(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const relPath = path.relative(baseDir, fullPath);
        const stats = checkFile(fullPath);
        if (stats) {
          results.push({
            path: relPath,
            ...stats
          });
        }
      }
    }
  }

  scan(baseDir);
  return results;
}

/**
 * 主函数
 */
function main() {
  const baseDir = path.join(__dirname, 'docs/plugin-docs');

  console.log('='.repeat(100));
  console.log('最终翻译状态检查');
  console.log('='.repeat(100));
  console.log();

  const results = scanDirectory(baseDir);

  // 按翻译状态分组
  const completed = results.filter(r => r.status.includes('✅'));
  const partial = results.filter(r => r.status.includes('⚠️'));
  const needed = results.filter(r => r.status.includes('❌'));

  console.log(`总文件数: ${results.length}`);
  console.log(`✅ 已完成: ${completed.length} (${(completed.length / results.length * 100).toFixed(1)}%)`);
  console.log(`⚠️  部分翻译: ${partial.length} (${(partial.length / results.length * 100).toFixed(1)}%)`);
  console.log(`❌ 需要翻译: ${needed.length} (${(needed.length / results.length * 100).toFixed(1)}%)`);
  console.log();

  // 按中文比例排序
  const sortedByChineseRatio = [...results].sort((a, b) =>
    parseFloat(b.chineseRatio) - parseFloat(a.chineseRatio)
  );

  console.log('='.repeat(100));
  console.log('所有文件翻译状态（按中文比例排序）');
  console.log('='.repeat(100));
  console.log();
  console.log(
    ' #'.padEnd(4) +
    '状态'.padEnd(15) +
    '中文%'.padEnd(8) +
    '英文%'.padEnd(8) +
    '行数'.padEnd(7) +
    '文件路径'
  );
  console.log('-'.repeat(100));

  sortedByChineseRatio.forEach((result, index) => {
    console.log(
      `${(index + 1).toString().padStart(3)}.`.padEnd(4) +
      result.status.padEnd(15) +
      `${result.chineseRatio}%`.padEnd(8) +
      `${result.englishRatio}%`.padEnd(8) +
      result.lines.toString().padEnd(7) +
      result.path
    );
  });

  console.log();
  console.log('='.repeat(100));

  // 输出需要翻译的文件列表
  if (needed.length > 0) {
    console.log();
    console.log('需要翻译的文件（英文内容较多）：');
    console.log();
    needed.forEach((result, index) => {
      console.log(`${index + 1}. ${result.path} (中文占比: ${result.chineseRatio}%)`);
    });
  }

  // 输出部分翻译的文件列表
  if (partial.length > 0) {
    console.log();
    console.log('部分翻译的文件（需要继续完善）：');
    console.log();
    partial.forEach((result, index) => {
      console.log(`${index + 1}. ${result.path} (中文占比: ${result.chineseRatio}%)`);
    });
  }

  console.log();
  console.log('='.repeat(100));

  // 保存详细报告到文件
  const reportPath = path.join(__dirname, 'translation-report.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    summary: {
      total: results.length,
      completed: completed.length,
      partial: partial.length,
      needed: needed.length
    },
    files: sortedByChineseRatio
  }, null, 2), 'utf-8');

  console.log(`详细报告已保存到: ${reportPath}`);
}

if (require.main === module) {
  main();
}

module.exports = { checkFile, analyzeText };
