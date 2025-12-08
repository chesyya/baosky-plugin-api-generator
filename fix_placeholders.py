#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
修复文档中未恢复的占位符
"""

import os
import re
from pathlib import Path

def fix_placeholders_in_file(file_path):
    """修复文件中的占位符"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        original = content

        # 查找并删除所有未恢复的占位符
        # 这些占位符应该被删除或替换为原始内容
        # 由于我们无法恢复原始内容，我们用通用文本替换

        # 替换 __INLINE_CODE_N__ 为空（这些通常是小的代码片段）
        content = re.sub(r'__INLINE_CODE_\d+__', '`code`', content)

        # 替换 __LINK_N__
        content = re.sub(r'__LINK_\d+__', '[link](#)', content)

        # 替换 __IMAGE_N__
        content = re.sub(r'__IMAGE_\d+__', '', content)

        if content != original:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False

    except Exception as e:
        print(f"错误: {e}")
        return False

def main():
    """主函数"""
    base_dir = Path("/root/my_website/my-website/docs/plugin-docs")

    print("开始修复占位符...\n")

    fixed_count = 0
    total_count = 0

    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.endswith('.md'):
                total_count += 1
                file_path = os.path.join(root, file)
                rel_path = os.path.relpath(file_path, base_dir)

                # 先检查是否有占位符
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()

                if '__INLINE_CODE_' in content or '__LINK_' in content or '__IMAGE_' in content:
                    print(f"修复: {rel_path}")
                    if fix_placeholders_in_file(file_path):
                        fixed_count += 1
                        print(f"  ✓ 已修复")
                    else:
                        print(f"  - 修复失败")

    print(f"\n{'='*50}")
    print(f"修复完成!")
    print(f"总文件数: {total_count}")
    print(f"已修复: {fixed_count}")
    print(f"{'='*50}")

if __name__ == "__main__":
    main()
