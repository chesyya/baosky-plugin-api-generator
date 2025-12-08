#!/bin/bash
# Baosky Plugin-Docs 翻译工作快速启动脚本

echo "========================================"
echo "  Baosky Plugin-Docs 翻译助手"
echo "========================================"
echo ""

# 函数：显示帮助
show_help() {
    echo "使用方法:"
    echo "  ./quick-start.sh [命令]"
    echo ""
    echo "可用命令:"
    echo "  status      - 显示当前翻译状态"
    echo "  analyze     - 运行分析脚本，识别需要翻译的文件"
    echo "  list        - 列出所有待翻译文件"
    echo "  priority    - 显示优先级列表"
    echo "  report      - 查看详细中文报告"
    echo "  helper      - 查看翻译助手指南"
    echo "  validate    - 验证已翻译文件（检查残留英文）"
    echo "  help        - 显示此帮助信息"
    echo ""
}

# 函数：显示状态
show_status() {
    echo "📊 翻译状态："
    echo "----------------------------------------"
    echo "总文件数: 68个"
    echo "已翻译:   26个 (38.2%)"
    echo "待翻译:   42个 (61.8%)"
    echo ""
    echo "✅ 已完成目录："
    echo "  • intro.md (1个)"
    echo "  • get-started/ (3个)"
    echo "  • advanced-topics/ (5个)"
    echo "  • extension-capabilities/ (4个)"
    echo "  • extension-guides/ 部分 (6个)"
    echo "  • ux-guidelines/ 部分 (6个)"
    echo "  • working-with-extensions/ 部分 (1个)"
    echo ""
}

# 函数：运行分析
run_analyze() {
    echo "🔍 正在分析文档..."
    echo ""
    if [ -f "translate-batch.py" ]; then
        python3 translate-batch.py
    else
        echo "❌ 错误: 找不到 translate-batch.py"
        echo "请确保在正确的目录下运行此脚本"
    fi
}

# 函数：列出待翻译文件
list_files() {
    echo "📝 待翻译文件列表 (42个):"
    echo "----------------------------------------"
    echo ""
    echo "高优先级 (6个) ⭐⭐⭐:"
    echo "  1. extension-guides/overview.md"
    echo "  2. references/activation-events.md"
    echo "  3. references/commands.md"
    echo "  4. references/contribution-points.md"
    echo "  5. references/extension-manifest.md"
    echo "  6. working-with-extensions/publishing-extension.md"
    echo ""
    echo "中优先级 (16个) ⭐⭐:"
    echo "  • extension-guides/ (13个常用指南)"
    echo "  • ux-guidelines/ (3个UI指南)"
    echo ""
    echo "普通优先级 (20个) ⭐:"
    echo "  • extension-guides/ai/ (6个AI相关)"
    echo "  • 其他进阶文档 (14个)"
    echo ""
    echo "详细列表请查看: cat TRANSLATION_STATUS.md"
    echo ""
}

# 函数：显示优先级
show_priority() {
    echo "🎯 翻译优先级建议："
    echo "----------------------------------------"
    echo ""
    echo "第1批 - 核心文档 (6个, ~3-4小时):"
    echo "  1. extension-guides/overview.md"
    echo "  2. references/activation-events.md"
    echo "  3. references/contribution-points.md"
    echo "  4. references/extension-manifest.md"
    echo "  5. references/commands.md"
    echo "  6. working-with-extensions/publishing-extension.md"
    echo ""
    echo "第2批 - 常用指南 (10个, ~5小时):"
    echo "  7. extension-guides/webview.md"
    echo "  8. extension-guides/tree-view.md"
    echo "  9. extension-guides/custom-editors.md"
    echo "  10. extension-guides/color-theme.md"
    echo "  ... 等"
    echo ""
    echo "第3批 - AI相关 (6个, ~3小时)"
    echo "第4批 - 剩余文档 (20个, ~10小时)"
    echo ""
}

# 函数：查看报告
show_report() {
    echo "📄 正在显示详细报告..."
    echo ""
    if [ -f "翻译进度报告.md" ]; then
        cat "翻译进度报告.md"
    else
        echo "❌ 错误: 找不到 翻译进度报告.md"
    fi
}

# 函数：查看助手
show_helper() {
    echo "📘 正在显示翻译助手指南..."
    echo ""
    if [ -f "translate-helper.md" ]; then
        cat "translate-helper.md"
    else
        echo "❌ 错误: 找不到 translate-helper.md"
    fi
}

# 函数：验证翻译
validate_translation() {
    echo "🔍 正在验证已翻译文件..."
    echo "检查可能遗漏的英文内容..."
    echo ""

    cd docs/plugin-docs

    # 检查常见英文句子开头
    echo "检查以下模式的英文内容:"
    echo "  - The, This, When, If, You, To, For"
    echo ""

    for file in $(find . -name "*.md"); do
        # 跳过代码块的内容
        result=$(grep -E "^(The |This |When |If |You |To |For )" "$file" 2>/dev/null | head -5)
        if [ ! -z "$result" ]; then
            echo "⚠️  $file 可能包含英文:"
            echo "$result" | sed 's/^/    /'
            echo ""
        fi
    done

    cd ../..

    echo "验证完成!"
    echo ""
}

# 主逻辑
case "${1:-help}" in
    status)
        show_status
        ;;
    analyze)
        run_analyze
        ;;
    list)
        list_files
        ;;
    priority)
        show_priority
        ;;
    report)
        show_report
        ;;
    helper)
        show_helper
        ;;
    validate)
        validate_translation
        ;;
    help|*)
        show_help
        ;;
esac

echo "========================================"
echo ""
