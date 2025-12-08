#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
修复翻译后的文档问题
1. 修复未恢复的占位符
2. 修复格式问题
3. 确保docusaurus兼容性
"""

import os
import re
from pathlib import Path

def fix_file(file_path):
    """修复单个文件"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        original = content
        changed = False

        # 1. 修复常见的占位符问题
        fixes = [
            (r'__CODE_\d+\s*文件__', '`package.json`'),
            (r'__CODE_\d+__', '`code`'),
            (r'__LINK_\d+__', '[链接](#)'),
            (r'__IMG_\d+__', ''),
            (r'__TERM_(\w+)__', r'\1'),
            # 修复中文翻译导致的markdown格式问题
            (r'！\[', '!['),  # 中文感叹号
            (r'\]\(', ']('),  # 确保链接格式
            (r'\*\*(\S)', r'** \1'),  # 加粗后的空格
            (r'(\S)\*\*', r'\1 **'),  # 加粗前的空格
        ]

        for pattern, replacement in fixes:
            new_content = re.sub(pattern, replacement, content)
            if new_content != content:
                content = new_content
                changed = True

        # 2. 修复常见的翻译错误
        corrections = {
            'Baosky插件': 'Baosky 插件',
            'API接口': 'API 接口',
            'VS代码': 'Baosky',
            'code`:`': '`code`:',
            '`code :`': '`code`:',
            '` code`': '`code`',
            '`code `': '`code`',
        }

        for wrong, correct in corrections.items():
            if wrong in content:
                content = content.replace(wrong, correct)
                changed = True

        # 3. 确保标题格式正确（标题后需要空行）
        lines = content.split('\n')
        new_lines = []
        for i, line in enumerate(lines):
            new_lines.append(line)
            # 如果是标题且下一行不是空行也不是标题
            if line.startswith('#') and i + 1 < len(lines):
                next_line = lines[i + 1]
                if next_line.strip() and not next_line.startswith('#'):
                    new_lines.append('')
                    changed = True

        if changed:
            content = '\n'.join(new_lines)

        # 4. 移除多余的空行（超过2个连续空行）
        content = re.sub(r'\n{4,}', '\n\n\n', content)

        if content != original:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False

    except Exception as e:
        print(f"  ✗ 错误: {str(e)}")
        return False

def main():
    """主函数"""
    base_dir = Path("/root/my_website/my-website/docs/plugin-docs")

    print("开始修复翻译后的文档问题...\n")

    fixed_count = 0
    total_count = 0

    for file_path in sorted(base_dir.rglob('*.md')):
        total_count += 1
        rel_path = file_path.relative_to(base_dir)

        if fix_file(file_path):
            fixed_count += 1
            print(f"✓ 修复: {rel_path}")

    print(f"\n{'='*60}")
    print(f"修复完成!")
    print(f"总文件数: {total_count}")
    print(f"已修复: {fixed_count}")
    print(f"{'='*60}")

if __name__ == "__main__":
    main()
