#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Markdown 文档翻译脚本
用于将 plugin-docs 目录下的 Markdown 文档从英文翻译成中文
"""

import os
import re
from pathlib import Path

# 定义需要翻译的目录顺序
TRANSLATION_ORDER = [
    "intro.md",  # 已完成
    "get-started",  # 已完成
    "extension-capabilities",
    "extension-guides",
    "language-extensions",
    "references",
    "ux-guidelines",
    "working-with-extensions",
    "advanced-topics"
]

# 专业术语翻译映射
TERM_MAPPING = {
    "extension": "插件",
    "Extension": "插件",
    "workspace": "工作区",
    "Workspace": "工作区",
    "debug": "调试",
    "Debug": "调试",
    "configuration": "配置",
    "Configuration": "配置",
    "command": "命令",
    "Command": "命令",
    "Activation Event": "激活事件",
    "activation event": "激活事件",
    "Contribution Point": "贡献点",
    "contribution point": "贡献点",
    "manifest": "清单",
    "Manifest": "清单",
    "entry point": "入口点",
    "workbench": "工作台",
    "Workbench": "工作台",
    "theme": "主题",
    "Theme": "主题",
    "Webview": "Webview",
    "marketplace": "市场",
    "Marketplace": "市场",
}

def is_code_block_start(line):
    """检查是否是代码块开始"""
    return line.strip().startswith("```")

def is_frontmatter(line_num, lines):
    """检查是否在 frontmatter 区域"""
    if line_num == 0 and lines[0].strip() == "---":
        for i in range(1, len(lines)):
            if lines[i].strip() == "---":
                return True, i
    return False, -1

def preserve_inline_code(text):
    """保护行内代码不被翻译"""
    # 提取所有反引号包裹的内容
    code_pattern = r'`[^`]+`'
    codes = re.findall(code_pattern, text)

    # 用占位符替换
    for i, code in enumerate(codes):
        text = text.replace(code, f"__CODE_PLACEHOLDER_{i}__", 1)

    return text, codes

def restore_inline_code(text, codes):
    """恢复行内代码"""
    for i, code in enumerate(codes):
        text = text.replace(f"__CODE_PLACEHOLDER_{i}__", code)
    return text

def get_files_to_translate(base_dir):
    """获取需要翻译的文件列表"""
    files = []

    for item in TRANSLATION_ORDER:
        path = Path(base_dir) / item
        if path.is_file() and path.suffix == ".md":
            files.append(path)
        elif path.is_dir():
            # 递归获取目录下所有 md 文件
            md_files = sorted(path.rglob("*.md"))
            files.extend(md_files)

    return files

def main():
    """主函数"""
    base_dir = Path("/root/my_website/my-website/docs/plugin-docs")

    # 获取所有需要翻译的文件
    all_files = sorted(base_dir.rglob("*.md"))

    print(f"找到 {len(all_files)} 个 Markdown 文件需要翻译")
    print("\n文件列表:")
    for f in all_files:
        rel_path = f.relative_to(base_dir)
        print(f"  - {rel_path}")

    print("\n注意:")
    print("- intro.md 已翻译完成")
    print("- get-started 目录下的 3 个文件已翻译完成")
    print(f"- 剩余 {len(all_files) - 4} 个文件需要翻译")

if __name__ == "__main__":
    main()
