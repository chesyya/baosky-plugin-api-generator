#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
使用翻译API批量翻译Markdown文档
保持格式符合docusaurus要求
"""

import os
import re
import time
from pathlib import Path
from deep_translator import GoogleTranslator

# 术语对照表 - 这些词不需要翻译
PROTECTED_TERMS = {
    'Baosky': 'Baosky',
    'API': 'API',
    'Webview': 'Webview',
    'IntelliSense': 'IntelliSense',
    'TypeScript': 'TypeScript',
    'JavaScript': 'JavaScript',
    'JSON': 'JSON',
    'HTML': 'HTML',
    'CSS': 'CSS',
    'Node.js': 'Node.js',
    'npm': 'npm',
    'GitHub': 'GitHub',
    'Markdown': 'Markdown',
    'Git': 'Git',
    'CodeLens': 'CodeLens',
    'TextMate': 'TextMate',
    'URI': 'URI',
    'URL': 'URL',
    'HTTP': 'HTTP',
    'HTTPS': 'HTTPS',
    'SSH': 'SSH',
    'TreeView': 'TreeView',
    'QuickPick': 'QuickPick',
}

# 专业术语翻译
TERM_TRANSLATIONS = {
    'extension': '插件',
    'Extension': '插件',
    'workspace': '工作区',
    'Workspace': '工作区',
    'command': '命令',
    'Command': '命令',
    'configuration': '配置',
    'Configuration': '配置',
    'debug': '调试',
    'Debug': '调试',
    'debugging': '调试',
    'Debugging': '调试',
    'debugger': '调试器',
    'Debugger': '调试器',
    'workbench': '工作台',
    'Workbench': '工作台',
    'theme': '主题',
    'Theme': '主题',
    'marketplace': '市场',
    'Marketplace': '市场',
    'manifest': '清单',
    'Manifest': '清单',
}

class MarkdownTranslator:
    def __init__(self):
        self.translator = GoogleTranslator(source='en', target='zh-CN')
        self.translated_count = 0
        self.failed_count = 0

    def is_chinese(self, text):
        """检查文本是否已经是中文"""
        if not text.strip():
            return True
        # 计算中文字符比例
        chinese_chars = len(re.findall(r'[\u4e00-\u9fff]', text))
        total_chars = len(re.sub(r'\s', '', text))
        if total_chars == 0:
            return True
        return chinese_chars / total_chars > 0.3

    def protect_special_content(self, text):
        """保护特殊内容不被翻译"""
        protected = []

        # 保护内联代码
        pattern = r'`[^`]+`'
        matches = list(re.finditer(pattern, text))
        for i, match in enumerate(matches):
            placeholder = f'__CODE_{i}__'
            protected.append((placeholder, match.group()))
            text = text.replace(match.group(), placeholder, 1)

        # 保护链接
        pattern = r'\[([^\]]+)\]\(([^)]+)\)'
        matches = list(re.finditer(pattern, text))
        for i, match in enumerate(matches):
            placeholder = f'__LINK_{i}__'
            protected.append((placeholder, match.group()))
            text = text.replace(match.group(), placeholder, 1)

        # 保护图片
        pattern = r'!\[([^\]]*)\]\(([^)]+)\)'
        matches = list(re.finditer(pattern, text))
        for i, match in enumerate(matches):
            placeholder = f'__IMG_{i}__'
            protected.append((placeholder, match.group()))
            text = text.replace(match.group(), placeholder, 1)

        # 保护受保护的术语
        for term in PROTECTED_TERMS.keys():
            if term in text:
                placeholder = f'__TERM_{term}__'
                protected.append((placeholder, term))
                text = text.replace(term, placeholder)

        return text, protected

    def restore_protected_content(self, text, protected):
        """恢复被保护的内容"""
        for placeholder, original in protected:
            text = text.replace(placeholder, original)
        return text

    def apply_term_translations(self, text):
        """应用专业术语翻译"""
        for en, zh in TERM_TRANSLATIONS.items():
            # 只替换独立的单词
            text = re.sub(r'\b' + re.escape(en) + r'\b', zh, text)
        return text

    def translate_text(self, text):
        """翻译文本"""
        if not text.strip() or self.is_chinese(text):
            return text

        try:
            # 保护特殊内容
            protected_text, protected = self.protect_special_content(text)

            # 如果文本太长，分段翻译
            max_length = 4000
            if len(protected_text) > max_length:
                segments = []
                current = ""
                for sentence in protected_text.split('. '):
                    if len(current) + len(sentence) < max_length:
                        current += sentence + '. '
                    else:
                        if current:
                            segments.append(current)
                        current = sentence + '. '
                if current:
                    segments.append(current)

                translated_segments = []
                for seg in segments:
                    if seg.strip():
                        try:
                            trans = self.translator.translate(seg)
                            translated_segments.append(trans)
                            time.sleep(0.5)  # 避免请求过快
                        except Exception as e:
                            print(f"    ⚠ 分段翻译失败: {str(e)[:50]}")
                            translated_segments.append(seg)
                translated = ''.join(translated_segments)
            else:
                translated = self.translator.translate(protected_text)
                time.sleep(0.5)  # 避免请求过快

            # 恢复保护的内容
            translated = self.restore_protected_content(translated, protected)

            # 应用术语翻译
            translated = self.apply_term_translations(translated)

            return translated
        except Exception as e:
            print(f"    ⚠ 翻译失败: {str(e)[:50]}")
            return text

    def translate_file(self, file_path):
        """翻译单个文件"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            lines = content.split('\n')
            new_lines = []

            in_code_block = False
            in_frontmatter = False
            frontmatter_count = 0
            changed = False

            for i, line in enumerate(lines):
                # 检查 frontmatter
                if line.strip() == '---':
                    frontmatter_count += 1
                    if frontmatter_count <= 2:
                        in_frontmatter = frontmatter_count == 1
                    new_lines.append(line)
                    continue

                # 在 frontmatter 中，只翻译 MetaDescription
                if in_frontmatter:
                    if line.startswith('MetaDescription:'):
                        parts = line.split(':', 1)
                        if len(parts) == 2:
                            key = parts[0]
                            value = parts[1].strip()
                            if not self.is_chinese(value):
                                translated_value = self.translate_text(value)
                                new_lines.append(f"{key}: {translated_value}")
                                changed = True
                                continue
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
                if line.strip() and not self.is_chinese(line):
                    translated = self.translate_text(line)
                    if translated != line:
                        changed = True
                    new_lines.append(translated)
                else:
                    new_lines.append(line)

            if changed:
                # 写回文件
                new_content = '\n'.join(new_lines)
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                return True
            return False

        except Exception as e:
            print(f"  ✗ 处理失败: {str(e)}")
            self.failed_count += 1
            return False

    def translate_directory(self, directory):
        """翻译目录中的所有文件"""
        md_files = sorted(Path(directory).rglob('*.md'))
        total = len(md_files)

        print(f"\n找到 {total} 个 Markdown 文件\n")

        for i, file_path in enumerate(md_files, 1):
            rel_path = file_path.relative_to(directory)
            print(f"[{i}/{total}] 处理: {rel_path}")

            if self.translate_file(file_path):
                self.translated_count += 1
                print(f"  ✓ 已翻译")
            else:
                print(f"  - 无需翻译或已是中文")

            # 每10个文件报告一次进度
            if i % 10 == 0:
                print(f"\n--- 进度: {i}/{total} ({i*100//total}%) ---")
                print(f"已翻译: {self.translated_count}, 失败: {self.failed_count}\n")

def main():
    """主函数"""
    base_dir = Path("/root/my_website/my-website/docs/plugin-docs")

    if not base_dir.exists():
        print(f"错误: 目录不存在 {base_dir}")
        return

    print("="*60)
    print("开始使用翻译API批量翻译文档")
    print("="*60)
    print(f"\n目标目录: {base_dir}")

    translator = MarkdownTranslator()
    translator.translate_directory(base_dir)

    print("\n" + "="*60)
    print("翻译完成!")
    print("="*60)
    print(f"成功翻译: {translator.translated_count} 个文件")
    print(f"失败: {translator.failed_count} 个文件")
    print("="*60)

if __name__ == "__main__":
    main()
