#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
批量翻译 Markdown 文档脚本
将 plugin-docs 目录下的所有 Markdown 文档中的英文内容翻译成中文
"""

import os
import re
from pathlib import Path
from typing import List, Tuple

# 需要保持原样的专有名词列表
PRESERVE_TERMS = [
    'Baosky', 'API', 'Webview', 'IntelliSense', 'TypeScript', 'JavaScript',
    'JSON', 'HTML', 'CSS', 'Node.js', 'npm', 'GitHub', 'Markdown', 'Git',
    'URI', 'URL', 'VS Code', 'VSCode', 'webpack', 'esbuild', 'rollup',
    'Docker', 'Kubernetes', 'SSH', 'WSL', 'HTTP', 'HTTPS', 'REST', 'GraphQL',
    'Python', 'Java', 'Go', 'Rust', 'C++', 'YAML', 'XML', 'SQL', 'NoSQL',
    'Linux', 'macOS', 'Windows', 'Ubuntu', 'Debian', 'CentOS',
    'Chrome', 'Firefox', 'Safari', 'Edge', 'Electron',
]

# 常见英文段落开头模式
ENGLISH_PATTERNS = [
    r'^(The |This |When |If |For |You |To |In |A |An |It |Your |We )',
    r'^(Use |See |Learn |Read |Check |Visit |Try |Install |Run |Create |Add |Update )',
    r'^(Note:|Tip:|Warning:|Important:|Example:)',
]

# 常用英文段落翻译映射（部分示例）
COMMON_TRANSLATIONS = {
    # 常用句子开头
    "The following": "以下",
    "For example": "例如",
    "For more information": "有关更多信息",
    "You can": "你可以",
    "To learn more": "要了解更多信息",
    "This guide": "本指南",
    "This topic": "本主题",
    "This section": "本节",
    "This article": "本文",
    "Note:": "注意：",
    "Tip:": "提示：",
    "Warning:": "警告：",
    "Important:": "重要提示：",

    # 常用动词短语
    "learn more": "了解更多",
    "read more": "阅读更多",
    "see also": "另请参阅",
    "for details": "详情请见",
    "click here": "点击这里",
    "refer to": "请参阅",

    # 文档相关
    "extension": "插件",
    "Extension": "插件",
    "extensions": "插件",
    "Extensions": "插件",
    "workspace": "工作区",
    "Workspace": "工作区",
    "command": "命令",
    "Command": "命令",
    "commands": "命令",
    "Commands": "命令",
    "configuration": "配置",
    "Configuration": "配置",
    "debug": "调试",
    "Debug": "调试",
    "debugger": "调试器",
    "Debugger": "调试器",
    "workbench": "工作台",
    "Workbench": "工作台",
    "theme": "主题",
    "Theme": "主题",
    "themes": "主题",
    "Themes": "主题",
    "marketplace": "市场",
    "Marketplace": "市场",
    "activation event": "激活事件",
    "Activation Event": "激活事件",
    "activation events": "激活事件",
    "Activation Events": "激活事件",
    "contribution point": "贡献点",
    "Contribution Point": "贡献点",
    "contribution points": "贡献点",
    "Contribution Points": "贡献点",
    "manifest": "清单",
    "Manifest": "清单",
    "provider": "提供器",
    "Provider": "提供器",
    "providers": "提供器",
    "Providers": "提供器",
    "hover": "悬停",
    "Hover": "悬停",
    "completion": "补全",
    "Completion": "补全",
    "completions": "补全",
    "Completions": "补全",
    "diagnostic": "诊断",
    "Diagnostic": "诊断",
    "diagnostics": "诊断",
    "Diagnostics": "诊断",
    "notification": "通知",
    "Notification": "通知",
    "notifications": "通知",
    "Notifications": "通知",
    "status bar": "状态栏",
    "Status Bar": "状态栏",
    "sidebar": "侧边栏",
    "Sidebar": "侧边栏",
    "sidebars": "侧边栏",
    "Sidebars": "侧边栏",
    "panel": "面板",
    "Panel": "面板",
    "panels": "面板",
    "Panels": "面板",
    "terminal": "终端",
    "Terminal": "终端",
    "editor": "编辑器",
    "Editor": "编辑器",
    "editors": "编辑器",
    "Editors": "编辑器",
}

def is_english_content(text: str) -> bool:
    """检测文本是否主要是英文内容"""
    if not text or len(text.strip()) < 5:
        return False

    # 检查是否包含常见英文模式
    for pattern in ENGLISH_PATTERNS:
        if re.search(pattern, text.strip()):
            return True

    # 统计英文单词和中文字符的比例
    english_words = re.findall(r'\b[a-zA-Z]+\b', text)
    chinese_chars = re.findall(r'[\u4e00-\u9fff]', text)

    # 如果英文单词数量超过10个且超过中文字符数量，认为是英文内容
    if len(english_words) > 10 and len(english_words) > len(chinese_chars):
        return True

    return False

def extract_code_blocks(content: str) -> Tuple[str, List[str]]:
    """提取代码块，用占位符替换"""
    code_blocks = []
    pattern = r'```[\s\S]*?```'

    def replacer(match):
        code_blocks.append(match.group(0))
        return f'___CODE_BLOCK_{len(code_blocks)-1}___'

    content = re.sub(pattern, replacer, content)
    return content, code_blocks

def restore_code_blocks(content: str, code_blocks: List[str]) -> str:
    """恢复代码块"""
    for i, block in enumerate(code_blocks):
        content = content.replace(f'___CODE_BLOCK_{i}___', block)
    return content

def extract_inline_code(text: str) -> Tuple[str, List[str]]:
    """提取行内代码"""
    inline_codes = []
    pattern = r'`[^`]+`'

    def replacer(match):
        inline_codes.append(match.group(0))
        return f'___INLINE_{len(inline_codes)-1}___'

    text = re.sub(pattern, replacer, text)
    return text, inline_codes

def restore_inline_code(text: str, inline_codes: List[str]) -> str:
    """恢复行内代码"""
    for i, code in enumerate(inline_codes):
        text = text.replace(f'___INLINE_{i}___', code)
    return text

def extract_urls(text: str) -> Tuple[str, List[str]]:
    """提取URL链接"""
    urls = []
    # Markdown链接格式: [text](url)
    pattern = r'\[([^\]]+)\]\(([^)]+)\)'

    def replacer(match):
        urls.append(match.group(0))
        return f'___URL_{len(urls)-1}___'

    text = re.sub(pattern, replacer, text)
    return text, urls

def restore_urls(text: str, urls: List[str]) -> str:
    """恢复URL链接"""
    for i, url in enumerate(urls):
        text = text.replace(f'___URL_{i}___', url)
    return text

def needs_translation(file_path: Path) -> bool:
    """检查文件是否需要翻译"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        lines = content.split('\n')

        # 跳过 frontmatter
        in_frontmatter = False
        start_line = 0
        for i, line in enumerate(lines):
            if i == 0 and line.strip() == '---':
                in_frontmatter = True
                continue
            if in_frontmatter and line.strip() == '---':
                in_frontmatter = False
                start_line = i + 1
                break

        # 检查正文内容
        body = '\n'.join(lines[start_line:])

        # 移除代码块
        body, _ = extract_code_blocks(body)

        # 检查是否有英文内容
        paragraphs = body.split('\n\n')
        english_count = 0

        for para in paragraphs:
            para = para.strip()
            if para and is_english_content(para):
                english_count += 1
                if english_count >= 2:  # 至少有2个英文段落
                    return True

        return False
    except Exception as e:
        print(f"  错误: 检查文件 {file_path} 时出错: {e}")
        return False

def get_all_md_files(base_dir: Path) -> List[Path]:
    """获取所有Markdown文件"""
    return sorted(base_dir.rglob("*.md"))

def analyze_files(base_dir: Path):
    """分析文件翻译状态"""
    all_files = get_all_md_files(base_dir)
    needs_trans = []

    print(f"正在分析 {len(all_files)} 个文件...")

    for i, file_path in enumerate(all_files, 1):
        rel_path = file_path.relative_to(base_dir)
        if needs_translation(file_path):
            needs_trans.append(file_path)
            print(f"  [{i}/{len(all_files)}] 需要翻译: {rel_path}")
        else:
            print(f"  [{i}/{len(all_files)}] 已翻译: {rel_path}")

    print(f"\n总结:")
    print(f"  - 总文件数: {len(all_files)}")
    print(f"  - 需要翻译: {len(needs_trans)}")
    print(f"  - 已翻译: {len(all_files) - len(needs_trans)}")

    if needs_trans:
        print(f"\n需要翻译的文件列表:")
        for file_path in needs_trans:
            rel_path = file_path.relative_to(base_dir)
            print(f"  - {rel_path}")

    return needs_trans

def main():
    """主函数"""
    base_dir = Path("/root/my_website/my-website/docs/plugin-docs")

    if not base_dir.exists():
        print(f"错误: 目录不存在: {base_dir}")
        return

    print("=== Markdown 文档翻译状态分析 ===\n")

    needs_trans = analyze_files(base_dir)

    print("\n注意: 本脚本仅分析文件翻译状态，不执行实际翻译。")
    print("实际翻译需要调用翻译API或使用Claude等工具逐个处理。")

if __name__ == "__main__":
    main()
