#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
批量翻译 plugin-docs 目录下的 Markdown 文档
将 VSCode 术语替换为 Baosky，extension 替换为插件，并翻译为中文
"""

import os
import re
from pathlib import Path
import anthropic
import time

# API 密钥从环境变量获取
API_KEY = os.environ.get("ANTHROPIC_API_KEY", "")

# 专业术语映射（在翻译前应用）
TERM_REPLACEMENTS = {
    "VS Code": "Baosky",
    "VSCode": "Baosky",
    "Visual Studio Code": "Baosky",
    "vscode": "baosky",
}

def extract_frontmatter(content):
    """提取并返回 frontmatter 和剩余内容"""
    if content.startswith("---"):
        parts = content.split("---", 2)
        if len(parts) >= 3:
            return f"---{parts[1]}---", parts[2]
    return "", content

def extract_code_blocks(content):
    """提取代码块，用占位符替换"""
    code_blocks = []
    pattern = r'(```[\s\S]*?```)'

    def replacer(match):
        code_blocks.append(match.group(1))
        return f"__CODE_BLOCK_{len(code_blocks)-1}__"

    content = re.sub(pattern, replacer, content)
    return content, code_blocks

def restore_code_blocks(content, code_blocks):
    """恢复代码块"""
    for i, block in enumerate(code_blocks):
        content = content.replace(f"__CODE_BLOCK_{i}__", block)
    return content

def extract_inline_code(content):
    """提取行内代码，用占位符替换"""
    inline_codes = []
    pattern = r'(`[^`\n]+?`)'

    def replacer(match):
        inline_codes.append(match.group(1))
        return f"__INLINE_{len(inline_codes)-1}__"

    content = re.sub(pattern, replacer, content)
    return content, inline_codes

def restore_inline_code(content, inline_codes):
    """恢复行内代码"""
    for i, code in enumerate(inline_codes):
        content = content.replace(f"__INLINE_{i}__", code)
    return content

def replace_terms(content):
    """替换 VSCode 相关术语为 Baosky"""
    for old, new in TERM_REPLACEMENTS.items():
        content = content.replace(old, new)
    return content

def translate_content(content, client):
    """使用 Claude API 翻译内容"""
    if not content.strip():
        return content

    prompt = f"""请将以下Markdown文档翻译为中文。要求：

1. 将"extension"及其变体（Extension, extensions等）翻译为"插件"
2. 保持技术术语的准确性和一致性：
   - workspace -> 工作区
   - command -> 命令
   - API -> API（保持）
   - configuration -> 配置
   - debug -> 调试
   - workbench -> 工作台
   - theme -> 主题
   - marketplace -> 市场
   - activation event -> 激活事件
   - contribution point -> 贡献点
   - manifest -> 清单
   - entry point -> 入口点
   - webview -> Webview（保持）

3. 保留占位符（__CODE_BLOCK_X__、__INLINE_X__）不要翻译
4. 保持 Markdown 格式
5. 翻译要流畅自然，符合中文习惯
6. 标题也要翻译
7. 保留URL链接和文件路径不翻译

请直接输出翻译后的内容，不要添加任何解释：

{content}"""

    try:
        message = client.messages.create(
            model="claude-sonnet-4-5-20250929",
            max_tokens=16000,
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        return message.content[0].text
    except Exception as e:
        print(f"翻译出错: {e}")
        return content

def process_file(file_path, client):
    """处理单个文件"""
    print(f"\n处理文件: {file_path.relative_to('/root/my_website/my-website/docs/plugin-docs')}")

    try:
        # 读取文件
        with open(file_path, 'r', encoding='utf-8') as f:
            original_content = f.read()

        # 1. 提取 frontmatter
        frontmatter, content = extract_frontmatter(original_content)

        # 2. 替换 VSCode 术语为 Baosky
        content = replace_terms(content)

        # 3. 提取代码块
        content, code_blocks = extract_code_blocks(content)

        # 4. 提取行内代码
        content, inline_codes = extract_inline_code(content)

        # 5. 翻译内容（分段处理，避免超出token限制）
        # 按段落分割
        paragraphs = content.split('\n\n')
        translated_paragraphs = []

        for i, para in enumerate(paragraphs):
            if para.strip():
                if i % 10 == 0:
                    print(f"  翻译进度: {i}/{len(paragraphs)} 段落")
                translated = translate_content(para, client)
                translated_paragraphs.append(translated)
                time.sleep(0.5)  # 避免API限流
            else:
                translated_paragraphs.append(para)

        translated_content = '\n\n'.join(translated_paragraphs)

        # 6. 恢复行内代码
        translated_content = restore_inline_code(translated_content, inline_codes)

        # 7. 恢复代码块
        translated_content = restore_code_blocks(translated_content, code_blocks)

        # 8. 组合 frontmatter 和翻译后的内容
        final_content = frontmatter + translated_content if frontmatter else translated_content

        # 9. 写回文件
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(final_content)

        print(f"  ✓ 完成")
        return True

    except Exception as e:
        print(f"  ✗ 错误: {e}")
        return False

def main():
    """主函数"""
    if not API_KEY:
        print("错误: 未设置 ANTHROPIC_API_KEY 环境变量")
        return

    client = anthropic.Anthropic(api_key=API_KEY)

    base_dir = Path("/root/my_website/my-website/docs/plugin-docs")

    # 获取所有 .md 文件
    all_files = sorted(base_dir.rglob("*.md"))

    print(f"找到 {len(all_files)} 个 Markdown 文件需要翻译")
    print("="*60)

    success_count = 0
    fail_count = 0

    for file_path in all_files:
        if process_file(file_path, client):
            success_count += 1
        else:
            fail_count += 1

    print("\n" + "="*60)
    print(f"翻译完成!")
    print(f"成功: {success_count} 个文件")
    print(f"失败: {fail_count} 个文件")
    print(f"总计: {len(all_files)} 个文件")

if __name__ == "__main__":
    main()
