#!/usr/bin/env node
/**
 * 智能翻译脚本 - 将Markdown文档中的英文翻译成中文
 * 保持代码块、URL、文件路径等不变
 */

const fs = require('fs');
const path = require('path');

// 专业术语映射
const TERM_MAP = {
  'extension': '插件',
  'Extension': '插件',
  'extensions': '插件',
  'Extensions': '插件',
  'workspace': '工作区',
  'Workspace': '工作区',
  'command': '命令',
  'Command': '命令',
  'debug': '调试',
  'Debug': '调试',
  'Activation Event': '激活事件',
  'activation event': '激活事件',
  'Contribution Point': '贡献点',
  'contribution point': '贡献点',
  'manifest': '清单',
  'Manifest': '清单',
  'theme': '主题',
  'Theme': '主题',
  'editor': '编辑器',
  'Editor': '编辑器',
  'view': '视图',
  'View': '视图',
  'panel': '面板',
  'Panel': '面板',
  'sidebar': '侧边栏',
  'Sidebar': '侧边栏',
  'marketplace': '市场',
  'Marketplace': '市场',
};

// 常见短语翻译
const PHRASE_MAP = {
  'Overview': '概述',
  'Getting Started': '入门',
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
  'For example': '例如',
  'In this example': '在此示例中',
  'The following': '以下',
  'You can': '您可以',
  'To': '要',
};

/**
 * 检查行是否包含大量英文
 */
function containsEnglish(line) {
  // 移除内联代码
  const withoutCode = line.replace(/`[^`]+`/g, '');
  // 移除URL
  const withoutUrls = withoutCode.replace(/https?:\/\/[^\s)]+/g, '');
  // 检查是否有连续的英文单词
  const englishWords = withoutUrls.match(/\b[a-zA-Z]{3,}(\s+[a-zA-Z]{2,})+/g);
  return englishWords && englishWords.length > 0;
}

/**
 * 简单翻译函数
 */
function simpleTranslate(text) {
  let result = text;

  // 保护内联代码
  const codes = [];
  result = result.replace(/`[^`]+`/g, (match) => {
    codes.push(match);
    return `__CODE_${codes.length - 1}__`;
  });

  // 保护URLs
  const urls = [];
  result = result.replace(/(https?:\/\/[^\s)]+)/g, (match) => {
    urls.push(match);
    return `__URL_${urls.length - 1}__`;
  });

  // 翻译短语
  for (const [en, zh] of Object.entries(PHRASE_MAP)) {
    const regex = new RegExp(`\\b${en}\\b`, 'gi');
    result = result.replace(regex, (match) => {
      // 保持大小写风格
      if (match === en) return zh;
      if (match.toLowerCase() === en.toLowerCase()) return zh;
      return zh;
    });
  }

  // 恢复URLs
  urls.forEach((url, i) => {
    result = result.replace(`__URL_${i}__`, url);
  });

  // 恢复代码
  codes.forEach((code, i) => {
    result = result.replace(`__CODE_${i}__`, code);
  });

  return result;
}

/**
 * 处理单个文件
 */
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const newLines = [];

  let inCodeBlock = false;
  let inFrontmatter = false;
  let frontmatterCount = 0;
  let changed = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // 检查frontmatter
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

    // 检查代码块
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      newLines.push(line);
      continue;
    }

    if (inCodeBlock) {
      newLines.push(line);
      continue;
    }

    // 跳过空行和纯标点行
    if (!line.trim() || /^[\s\-#*>`]+$/.test(line)) {
      newLines.push(line);
      continue;
    }

    // 跳过HTML注释
    if (line.trim().startsWith('<!--')) {
      newLines.push(line);
      continue;
    }

    // 检查并翻译包含英文的行
    if (containsEnglish(line)) {
      const translated = simpleTranslate(line);
      if (translated !== line) {
        changed = true;
        newLines.push(translated);
      } else {
        newLines.push(line);
      }
    } else {
      newLines.push(line);
    }
  }

  if (changed) {
    const newContent = newLines.join('\n');
    fs.writeFileSync(filePath, newContent, 'utf-8');
    return true;
  }

  return false;
}

/**
 * 处理目录
 */
function processDirectory(dir, pattern = null) {
  let count = 0;
  const files = [];

  function scan(directory) {
    const entries = fs.readdirSync(directory, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        scan(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        if (!pattern || fullPath.includes(pattern)) {
          files.push(fullPath);
        }
      }
    }
  }

  scan(dir);

  console.log(`找到 ${files.length} 个文件需要处理\n`);

  files.forEach((file, index) => {
    const relPath = path.relative(dir, file);
    process.stdout.write(`[${index + 1}/${files.length}] ${relPath} ... `);

    try {
      if (processFile(file)) {
        console.log('✓ 已翻译');
        count++;
      } else {
        console.log('- 未改变');
      }
    } catch (err) {
      console.log(`✗ 错误: ${err.message}`);
    }
  });

  return count;
}

// 主函数
if (require.main === module) {
  const args = process.argv.slice(2);
  const targetPath = args[0] || 'docs/plugin-docs';
  const baseDir = path.join(__dirname, targetPath);

  console.log('='.repeat(80));
  console.log('智能翻译脚本');
  console.log('='.repeat(80));
  console.log(`目标目录: ${baseDir}\n`);

  const count = processDirectory(baseDir);

  console.log('\n' + '='.repeat(80));
  console.log(`完成！共翻译了 ${count} 个文件`);
  console.log('='.repeat(80));
}

module.exports = { processFile, processDirectory };
