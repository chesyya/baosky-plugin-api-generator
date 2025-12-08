const fs = require('fs');
const path = require('path');

// 递归获取所有 md 文件
function getAllMdFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllMdFiles(filePath, fileList);
    } else if (file.endsWith('.md')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const files1 = getAllMdFiles('docs/plugin-docs');
const files2 = getAllMdFiles('plugin-docs');
const files = [...files1, ...files2];

console.log(`找到 ${files.length} 个文件需要处理`);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;

  // 1. 修复 <br> 标签为 <br />
  if (content.includes('<br>')) {
    content = content.replace(/<br>/g, '<br />');
    modified = true;
  }

  // 2. 修复 <video> 标签 - 删除整个 video 块
  if (content.includes('<video')) {
    content = content.replace(/<video[^>]*>[\s\S]*?<\/video>/g, '<!-- Video removed for compatibility -->');
    modified = true;
  }

  // 3. 修复表格中的 HTML 标签问题 - 移除表格中的 <br>
  const tableRegex = /\|[^\n]*<br \/>[^\n]*\|/g;
  if (tableRegex.test(content)) {
    content = content.replace(/<br \/>/g, ' ');
    modified = true;
  }

  // 4. 替换 VS Code -> Baosky
  if (content.includes('VS Code') || content.includes('Visual Studio Code')) {
    content = content.replace(/Visual Studio Code/g, 'Baosky');
    content = content.replace(/VS Code/g, 'Baosky');
    modified = true;
  }

  // 5. 替换 extension -> 插件 (保留代码中的 extension)
  // 只替换非代码块中的 extension/Extension/extensions
  const lines = content.split('\n');
  let inCodeBlock = false;
  let inFrontmatter = false;
  let frontmatterCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // 检查是否在 frontmatter 中
    if (line.trim() === '---') {
      frontmatterCount++;
      if (frontmatterCount <= 2) {
        inFrontmatter = !inFrontmatter;
      }
      continue;
    }

    // 在 frontmatter 中也替换 MetaDescription
    if (inFrontmatter && line.includes('MetaDescription:')) {
      if (line.includes('extension')) {
        lines[i] = line
          .replace(/\bextensions\b/g, '插件')
          .replace(/\bExtensions\b/g, '插件')
          .replace(/\bextension\b/g, '插件')
          .replace(/\bExtension\b/g, '插件');
        modified = true;
      }
      continue;
    }

    // 跳过 frontmatter 和代码块
    if (inFrontmatter) continue;

    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (!inCodeBlock && !line.trim().startsWith('`')) {
      // 替换文本中的 extension 相关词汇
      if (line.includes('extension') || line.includes('Extension')) {
        lines[i] = line
          .replace(/\bextensions\b/g, '插件')
          .replace(/\bExtensions\b/g, '插件')
          .replace(/\bextension\b/g, '插件')
          .replace(/\bExtension\b/g, '插件');
        modified = true;
      }
    }
  }

  if (modified) {
    content = lines.join('\n');
  }

  // 6. 移除有问题的图片链接 (以 /assets/ 开头的)
  if (content.includes('/assets/') || content.includes('![')) {
    content = content.replace(/!\[([^\]]*)\]\([^)]*\)/g, '<!-- 图片已移除 -->');
    modified = true;
  }

  // 7. 移除外部链接到 code.visualstudio.com
  if (content.includes('code.visualstudio.com') || content.includes('marketplace.visualstudio.com')) {
    content = content.replace(/https?:\/\/code\.visualstudio\.com[^\s)"]*/g, '#');
    content = content.replace(/https?:\/\/marketplace\.visualstudio\.com[^\s)"]*/g, '#');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`已修复: ${file}`);
  }
});

console.log('所有文件处理完成！');
