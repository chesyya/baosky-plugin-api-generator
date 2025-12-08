# 翻译助手指南

本文档提供完成剩余43个文件翻译的实用方法和工具。

## 方法1: 使用Claude Code逐个翻译（推荐）

这是当前正在使用的方法，可以保证最高质量。

### 操作步骤

1. 在Claude Code中，逐个文件执行翻译：

```
请翻译文件: /root/my_website/my-website/docs/plugin-docs/extension-guides/overview.md

翻译要求:
- 保持frontmatter不变
- 保持代码块不变
- 保持URL链接不变
- 将所有英文正文翻译成流畅的中文
- 使用专业术语翻译对照表
```

2. 每完成10个文件，用Git提交：

```bash
git add docs/plugin-docs/extension-guides/*.md
git commit -m "docs: 翻译完成 extension-guides 目录部分文件"
```

## 方法2: 使用Python脚本配合翻译API

创建一个使用Anthropic Claude API的脚本来批量翻译。

### 安装依赖

```bash
pip install anthropic
```

### 创建翻译脚本

创建文件 `translate-with-claude.py`:

```python
#!/usr/bin/env python3
import os
import anthropic
from pathlib import Path

# 设置API密钥
client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

def translate_file(file_path):
    """使用Claude API翻译单个文件"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    prompt = f"""请将以下Markdown文档从英文翻译成中文。

翻译要求:
1. 保持frontmatter (--- 之间的内容) 不变
2. 保持代码块 (``` 之间的内容) 不变
3. 保持URL链接不变
4. 保持专有名词不变: Baosky, API, Webview, TypeScript, JavaScript, JSON, HTML, CSS, Node.js, npm, GitHub, Markdown, Git
5. 使用以下术语翻译:
   - extension → 插件
   - workspace → 工作区
   - command → 命令
   - configuration → 配置
   - debug → 调试
   - workbench → 工作台
   - theme → 主题

请直接返回翻译后的完整文档内容，不要添加任何解释。

文档内容:
{content}
"""

    message = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=8000,
        messages=[{"role": "user", "content": prompt}]
    )

    translated = message.content[0].text

    # 写回文件
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(translated)

    return True

# 待翻译文件列表
files_to_translate = [
    "extension-guides/overview.md",
    # ... 添加其他文件
]

def main():
    base_dir = Path("docs/plugin-docs")

    for rel_path in files_to_translate:
        file_path = base_dir / rel_path
        print(f"正在翻译: {rel_path}")
        try:
            translate_file(file_path)
            print(f"✅ 完成: {rel_path}")
        except Exception as e:
            print(f"❌ 失败: {rel_path} - {e}")

if __name__ == "__main__":
    main()
```

### 使用方法

```bash
export ANTHROPIC_API_KEY="your-api-key-here"
python3 translate-with-claude.py
```

## 方法3: 使用在线翻译工具配合人工校对

### 推荐工具

1. **DeepL Pro** - 质量最高
   - 网址: https://www.deepl.com/translator
   - 支持批量翻译
   - 可以保留Markdown格式

2. **Google Translate API**
   - 价格便宜
   - 需要人工校对

### 操作流程

1. 提取需要翻译的文本（跳过代码块和链接）
2. 使用翻译工具翻译
3. 人工校对专业术语
4. 格式检查和修正

## 方法4: 使用VSCode插件辅助翻译

### 推荐插件

1. **Comment Translate**
   - 可以实时翻译选中的文本
   - 支持多种翻译引擎

2. **Markdown All in One**
   - 预览Markdown格式
   - 确保翻译后格式正确

### 使用流程

1. 在VSCode中打开文件
2. 选中英文段落
3. 使用翻译插件翻译
4. 复制翻译结果替换原文
5. 保存并预览

## 翻译检查清单

完成每个文件翻译后，请检查：

- [ ] Frontmatter完全未动
- [ ] 所有代码块内容未改变
- [ ] 内联代码(` `)未改变
- [ ] URL链接完整可访问
- [ ] 专有名词保持英文（Baosky, TypeScript, etc.）
- [ ] 专业术语翻译一致（extension→插件，workspace→工作区）
- [ ] 中文表达流畅自然
- [ ] Markdown格式正确（标题、列表、表格）
- [ ] 没有遗漏的英文段落

## 批量验证脚本

创建 `validate-translation.sh`:

```bash
#!/bin/bash

# 检查是否还有明显的英文段落
echo "检查未翻译的英文内容..."

for file in docs/plugin-docs/**/*.md; do
    # 检查常见英文句子开头
    if grep -E "^(The |This |When |If |You |To )" "$file" > /dev/null 2>&1; then
        echo "⚠️  $file 可能包含未翻译内容"
    fi
done

echo "验证完成!"
```

使用:
```bash
chmod +x validate-translation.sh
./validate-translation.sh
```

## 优先级翻译顺序

按照以下顺序翻译可以快速覆盖最重要的内容：

### 第1批 - 核心概览 (6个文件, ~3小时)
1. extension-guides/overview.md
2. references/activation-events.md
3. references/contribution-points.md
4. references/extension-manifest.md
5. references/commands.md
6. working-with-extensions/publishing-extension.md

### 第2批 - 常用指南 (10个文件, ~5小时)
7. extension-guides/webview.md
8. extension-guides/tree-view.md
9. extension-guides/custom-editors.md
10. extension-guides/color-theme.md
11. extension-guides/testing.md
12. extension-guides/task-provider.md
13. working-with-extensions/testing-extension.md
14. working-with-extensions/continuous-integration.md
15. ux-guidelines/views.md
16. ux-guidelines/sidebars.md

### 第3批 - AI相关 (6个文件, ~3小时)
17-22. extension-guides/ai/* (全部6个文件)

### 第4批 - 剩余文件 (21个文件, ~10小时)
23-43. 所有剩余文件

## 质量保证建议

1. **每完成一批，进行一次完整检查**
2. **使用Git保存进度，便于回滚**
3. **可以请同事review翻译质量**
4. **测试文档中的链接是否有效**

## Git工作流

```bash
# 开始翻译前
git checkout -b docs/translation

# 每完成一批
git add docs/plugin-docs/
git commit -m "docs: 翻译第X批文件"
git push origin docs/translation

# 全部完成后
git checkout main
git merge docs/translation
git push origin main
```

## 常见问题

### Q: 代码注释需要翻译吗？
A: 建议保持英文，因为这是代码的一部分。

### Q: 示例中的变量名要翻译吗？
A: 不要翻译，保持原样。

### Q: 如何处理专有名词？
A: 专有名词保持英文，如 Baosky, TypeScript, API 等。

### Q: 翻译后如何验证格式？
A: 使用Markdown预览工具，或在Baosky/VSCode中打开查看。

---

**祝翻译顺利！** 🎉
