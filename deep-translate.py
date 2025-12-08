#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
深度翻译脚本 - 识别并标记需要翻译的英文内容
"""

import os
import re
from pathlib import Path

def contains_substantial_english(line):
    """检查行是否包含实质性英文内容"""
    # 移除代码块标记
    if line.strip().startswith('```'):
        return False

    # 移除内联代码
    without_code = re.sub(r'`[^`]+`', '', line)

    # 移除URLs
    without_urls = re.sub(r'https?://[^\s\)]+', '', without_code)

    # 移除Markdown链接
    without_links = re.sub(r'\[[^\]]+\]\([^\)]+\)', '', without_urls)

    # 检查是否有连续的英文单词（至少3个单词）
    english_phrases = re.findall(r'\b[A-Z][a-z]+(?:\s+[a-z]+){2,}', without_links)
    english_phrases += re.findall(r'\b[a-z]+(?:\s+[a-z]+){3,}', without_links)

    return len(english_phrases) > 0

def analyze_file(file_path):
    """分析文件，识别需要翻译的行"""
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    in_code_block = False
    in_frontmatter = False
    frontmatter_count = 0

    needs_translation = []

    for i, line in enumerate(lines, 1):
        # 检查frontmatter
        if line.strip() == '---':
            frontmatter_count += 1
            if frontmatter_count <= 2:
                in_frontmatter = not in_frontmatter
            continue

        if in_frontmatter:
            continue

        # 检查代码块
        if line.strip().startswith('```'):
            in_code_block = not in_code_block
            continue

        if in_code_block:
            continue

        # 跳过空行和HTML注释
        if not line.strip() or line.strip().startswith('<!--'):
            continue

        # 检查是否需要翻译
        if contains_substantial_english(line):
            needs_translation.append((i, line.rstrip()))

    return needs_translation

def process_directory(base_dir):
    """处理目录下的所有Markdown文件"""
    base_path = Path(base_dir)

    results = {}

    for md_file in sorted(base_path.rglob('*.md')):
        rel_path = md_file.relative_to(base_path)
        lines_to_translate = analyze_file(md_file)

        if lines_to_translate:
            results[str(rel_path)] = lines_to_translate

    return results

def main():
    base_dir = '/root/my_website/my-website/docs/plugin-docs'

    print('=' * 80)
    print('深度翻译分析')
    print('=' * 80)
    print()

    results = process_directory(base_dir)

    # 按需要翻译的行数排序
    sorted_files = sorted(results.items(), key=lambda x: len(x[1]), reverse=True)

    total_lines = sum(len(lines) for lines in results.values())

    print(f'找到 {len(results)} 个文件需要翻译')
    print(f'总共需要翻译 {total_lines} 行')
    print()

    print('需要翻译行数最多的前20个文件：')
    print()

    for i, (file_path, lines) in enumerate(sorted_files[:20], 1):
        print(f'{i:2d}. {file_path:60s} - {len(lines):4d} 行')

    print()
    print('=' * 80)

    # 输出详细信息到文件
    output_file = '/root/my_website/my-website/translation-needed.txt'
    with open(output_file, 'w', encoding='utf-8') as f:
        for file_path, lines in sorted_files:
            f.write(f'\n{"=" * 80}\n')
            f.write(f'文件: {file_path}\n')
            f.write(f'需要翻译: {len(lines)} 行\n')
            f.write("=" * 80 + '\n\n')

            for line_num, line in lines[:10]:  # 只显示前10行
                f.write(f'第 {line_num} 行:\n{line}\n\n')

            if len(lines) > 10:
                f.write(f'... 还有 {len(lines) - 10} 行需要翻译\n')

    print(f'详细信息已保存到: {output_file}')

if __name__ == '__main__':
    main()
