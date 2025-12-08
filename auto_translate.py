#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
自动翻译 Markdown 文档
使用简单的规则和替换来翻译文档
"""

import os
import re
from pathlib import Path
import json

# VSCode -> Baosky 替换
BRAND_REPLACEMENTS = {
    'VSCode': 'Baosky',
    'VS Code': 'Baosky',
    'vscode': 'baosky',
    'Visual Studio Code': 'Baosky'
}

# Extension -> 插件 替换（需要智能处理）
TERM_REPLACEMENTS = {
    'extension': '插件',
    'Extension': '插件',
    'EXTENSION': '插件',
    'extensions': '插件',
    'Extensions': '插件',
}

# 常见词汇翻译
COMMON_TRANSLATIONS = {
    # 基础术语
    'Overview': '概述',
    'Getting Started': '快速入门',
    'Get Started': '快速入门',
    'Introduction': '介绍',
    'Guide': '指南',
    'Tutorial': '教程',
    'Reference': '参考',
    'API': 'API',
    'Example': '示例',
    'Examples': '示例',

    # VS Code 特定术语
    'workspace': '工作区',
    'Workspace': '工作区',
    'workbench': '工作台',
    'Workbench': '工作台',
    'editor': '编辑器',
    'Editor': '编辑器',
    'command': '命令',
    'Command': '命令',
    'commands': '命令',
    'Commands': '命令',
    'theme': '主题',
    'Theme': '主题',
    'themes': '主题',
    'Themes': '主题',
    'debug': '调试',
    'Debug': '调试',
    'debugging': '调试',
    'Debugging': '调试',
    'debugger': '调试器',
    'Debugger': '调试器',
    'configuration': '配置',
    'Configuration': '配置',
    'settings': '设置',
    'Settings': '设置',
    'marketplace': '市场',
    'Marketplace': '市场',
    'package': '包',
    'Package': '包',
    'manifest': '清单',
    'Manifest': '清单',
    'activation': '激活',
    'Activation': '激活',
    'contribution': '贡献',
    'Contribution': '贡献',
    'provider': '提供器',
    'Provider': '提供器',
    'language': '语言',
    'Language': '语言',
    'syntax': '语法',
    'Syntax': '语法',
    'semantic': '语义',
    'Semantic': '语义',
    'snippet': '代码片段',
    'Snippet': '代码片段',
    'snippets': '代码片段',
    'Snippets': '代码片段',
    'completion': '补全',
    'Completion': '补全',
    'IntelliSense': 'IntelliSense',
    'hover': '悬停',
    'Hover': '悬停',
    'definition': '定义',
    'Definition': '定义',
    'reference': '引用',
    'Reference': '引用',
    'references': '引用',
    'References': '引用',
    'symbol': '符号',
    'Symbol': '符号',
    'symbols': '符号',
    'Symbols': '符号',
    'diagnostic': '诊断',
    'Diagnostic': '诊断',
    'diagnostics': '诊断',
    'Diagnostics': '诊断',
    'notification': '通知',
    'Notification': '通知',
    'notifications': '通知',
    'Notifications': '通知',
    'status bar': '状态栏',
    'Status Bar': '状态栏',
    'activity bar': '活动栏',
    'Activity Bar': '活动栏',
    'sidebar': '侧边栏',
    'Sidebar': '侧边栏',
    'panel': '面板',
    'Panel': '面板',
    'terminal': '终端',
    'Terminal': '终端',
    'output': '输出',
    'Output': '输出',
    'task': '任务',
    'Task': '任务',
    'tasks': '任务',
    'Tasks': '任务',
    'test': '测试',
    'Test': '测试',
    'testing': '测试',
    'Testing': '测试',
    'publish': '发布',
    'Publish': '发布',
    'publishing': '发布',
    'Publishing': '发布',
    'bundling': '打包',
    'Bundling': '打包',
    'migration': '迁移',
    'Migration': '迁移',
    'template': '模板',
    'Template': '模板',
    'webview': 'Webview',
    'Webview': 'Webview',
    'tree view': '树视图',
    'Tree View': '树视图',
    'custom editor': '自定义编辑器',
    'Custom Editor': '自定义编辑器',
    'icon': '图标',
    'Icon': '图标',
    'icons': '图标',
    'Icons': '图标',
    'color': '颜色',
    'Color': '颜色',
    'colors': '颜色',
    'Colors': '颜色',
    'file': '文件',
    'File': '文件',
    'files': '文件',
    'Files': '文件',
    'folder': '文件夹',
    'Folder': '文件夹',
    'folders': '文件夹',
    'Folders': '文件夹',
    'document': '文档',
    'Document': '文档',
    'documents': '文档',
    'Documents': '文档',
    'text': '文本',
    'Text': '文本',
    'content': '内容',
    'Content': '内容',
    'user': '用户',
    'User': '用户',
    'input': '输入',
    'Input': '输入',
    'quick pick': '快速选择',
    'Quick Pick': '快速选择',
    'context menu': '上下文菜单',
    'Context Menu': '上下文菜单',
    'menu': '菜单',
    'Menu': '菜单',
    'keybinding': '快捷键',
    'Keybinding': '快捷键',
    'keybindings': '快捷键',
    'Keybindings': '快捷键',
    'keyboard shortcut': '键盘快捷键',
    'Keyboard Shortcut': '键盘快捷键',
}

def is_in_code_block(lines, line_index):
    """检查当前行是否在代码块中"""
    code_block_count = 0
    for i in range(line_index):
        if lines[i].strip().startswith('```'):
            code_block_count += 1
    return code_block_count % 2 == 1

def is_in_frontmatter(lines, line_index):
    """检查当前行是否在 frontmatter 中"""
    dash_count = 0
    for i in range(line_index + 1):
        if lines[i].strip() == '---':
            dash_count += 1
            if dash_count == 2:
                return i >= line_index
    return dash_count == 1 and line_index >= 0

def preserve_markdown_elements(text):
    """保护 markdown 元素不被翻译"""
    # 保护图片（先处理图片，因为图片也包含 []() 模式）
    images = re.findall(r'!\[([^\]]*)\]\(([^)]+)\)', text)
    image_placeholders = []
    for i, (alt_text, img_url) in enumerate(images):
        original = f'![{alt_text}]({img_url})'
        placeholder = f'__IMAGE_{i}__'
        text = text.replace(original, placeholder, 1)
        image_placeholders.append((placeholder, original))

    # 保护链接
    links = re.findall(r'\[([^\]]+)\]\(([^)]+)\)', text)
    link_placeholders = []
    for i, (link_text, link_url) in enumerate(links):
        original = f'[{link_text}]({link_url})'
        placeholder = f'__LINK_{i}__'
        text = text.replace(original, placeholder, 1)
        link_placeholders.append((placeholder, original))

    # 保护内联代码
    inline_codes = re.findall(r'`[^`]+`', text)
    code_placeholders = []
    for i, code in enumerate(inline_codes):
        placeholder = f'__INLINE_CODE_{i}__'
        text = text.replace(code, placeholder, 1)
        code_placeholders.append((placeholder, code))

    return text, code_placeholders, link_placeholders, image_placeholders

def restore_markdown_elements(text, code_placeholders, link_placeholders, image_placeholders):
    """恢复 markdown 元素"""
    # 恢复内联代码
    for placeholder, code in code_placeholders:
        text = text.replace(placeholder, code)

    # 恢复链接
    for placeholder, original in link_placeholders:
        text = text.replace(placeholder, original)

    # 恢复图片
    for placeholder, original in image_placeholders:
        text = text.replace(placeholder, original)

    return text

def translate_line(line):
    """翻译单行文本"""
    if not line.strip():
        return line

    # 保护 markdown 元素
    original_line = line
    protected_line, code_placeholders, link_placeholders, image_placeholders = preserve_markdown_elements(line)

    # 替换品牌名称
    for en, zh in BRAND_REPLACEMENTS.items():
        protected_line = protected_line.replace(en, zh)

    # 替换术语（需要智能处理，避免替换 URL 中的词）
    # 这里简单处理，只替换单词边界的术语
    for en, zh in TERM_REPLACEMENTS.items():
        # 使用单词边界匹配
        protected_line = re.sub(r'\b' + en + r'\b', zh, protected_line)

    # 恢复 markdown 元素
    translated_line = restore_markdown_elements(protected_line, code_placeholders, link_placeholders, image_placeholders)

    return translated_line

def process_file(file_path):
    """处理单个文件"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        lines = content.split('\n')
        new_lines = []

        in_code_block = False
        in_frontmatter = False
        frontmatter_count = 0

        for i, line in enumerate(lines):
            # 检查 frontmatter
            if line.strip() == '---':
                frontmatter_count += 1
                if frontmatter_count <= 2:
                    in_frontmatter = frontmatter_count == 1
                new_lines.append(line)
                continue

            # 在 frontmatter 中，只处理 MetaDescription
            if in_frontmatter:
                if 'MetaDescription:' in line:
                    # 翻译 MetaDescription
                    new_lines.append(translate_line(line))
                else:
                    new_lines.append(line)
                continue

            # 检查代码块
            if line.strip().startswith('```'):
                in_code_block = not in_code_block
                new_lines.append(line)
                continue

            # 在代码块中，不翻译
            if in_code_block:
                new_lines.append(line)
                continue

            # 翻译普通文本行
            translated = translate_line(line)
            new_lines.append(translated)

        # 写回文件
        new_content = '\n'.join(new_lines)
        if new_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            return True
        return False

    except Exception as e:
        print(f"错误处理文件 {file_path}: {e}")
        return False

def process_directory(directory):
    """处理目录中的所有 md 文件"""
    processed_count = 0
    total_count = 0

    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.md'):
                total_count += 1
                file_path = os.path.join(root, file)
                rel_path = os.path.relpath(file_path, directory)
                print(f"处理: {rel_path}")

                if process_file(file_path):
                    processed_count += 1
                    print(f"  ✓ 已更新")
                else:
                    print(f"  - 无更改")

    return processed_count, total_count

def main():
    """主函数"""
    base_dir = Path("/root/my_website/my-website/docs/plugin-docs")

    if not base_dir.exists():
        print(f"错误：目录不存在: {base_dir}")
        return

    print("开始自动翻译文档...\n")
    print(f"目标目录: {base_dir}\n")

    processed, total = process_directory(base_dir)

    print(f"\n{'='*50}")
    print(f"翻译完成!")
    print(f"总文件数: {total}")
    print(f"已处理: {processed}")
    print(f"{'='*50}")

if __name__ == "__main__":
    main()
