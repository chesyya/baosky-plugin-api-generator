#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const TEMPLATE_FILE = path.join(__dirname, '../plugin-docs/references/vscode-api.template');
const OUTPUT_FILE = path.join(__dirname, '../plugin-docs/references/vscode-api.md');
const TEMP_DOCS_DIR = path.join(__dirname, '../temp-api-docs');
const CONTENT_PLACEHOLDER = '{$ Content $}';

console.log('🚀 Starting API documentation generation...\n');

// Step 1: Run TypeDoc to generate markdown documentation
console.log('📝 Step 1: Running TypeDoc to generate documentation...');
try {
  execSync('npx typedoc', {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit'
  });
  console.log('✅ TypeDoc generation completed\n');
} catch (error) {
  console.error('❌ Error running TypeDoc:', error.message);
  process.exit(1);
}

// Step 2: Merge all generated markdown files into one
console.log('📖 Step 2: Merging all documentation files...');
let apiContent = '';

try {
  // Read and merge all markdown files
  const mergeMarkdownFiles = (dir, basePath = '', level = 2) => {
    let content = '';
    const entries = fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => {
      // Directories first, then files
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;
      return a.name.localeCompare(b.name);
    });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.join(basePath, entry.name);

      if (entry.isDirectory() && !entry.name.startsWith('.')) {
        // Recursively process subdirectories
        content += mergeMarkdownFiles(fullPath, relativePath, level + 1);
      } else if (entry.name.endsWith('.md') && entry.name !== 'README.md') {
        // Read and append markdown file
        const fileContent = fs.readFileSync(fullPath, 'utf-8');

        // Remove breadcrumbs and navigation (first few lines)
        let cleanContent = fileContent
          .replace(/^\[.*?\]\(.*?\)\n+/gm, '') // Remove markdown links at start
          .replace(/^\*\*\*\n+/gm, '') // Remove separator lines
          .replace(/^# /gm, `${'#'.repeat(level)} `); // Adjust heading levels

        content += '\n\n' + cleanContent;
      }
    }

    return content;
  };

  // Start with main README
  const mainReadme = path.join(TEMP_DOCS_DIR, 'README.md');
  if (fs.existsSync(mainReadme)) {
    apiContent = fs.readFileSync(mainReadme, 'utf-8');
    // Remove title and separator
    apiContent = apiContent.replace(/^\*\*@baosky\/plugin\*\*\n\n\*\*\*\n\n/m, '');
  }

  // Merge all other documentation files
  apiContent += mergeMarkdownFiles(TEMP_DOCS_DIR);

  // Convert relative file links to anchor links
  console.log('🔗 Converting file links to anchors...');

  // Pattern: (path/to/file.md) or (path/to/file.md#anchor)
  apiContent = apiContent.replace(/\]\(([^)]*?\.md)(#[^)]+)?\)/g, (match, filePath, anchor) => {
    // Extract the base name without path and extension
    const fileName = filePath.split('/').pop().replace('.md', '');

    // Convert to lowercase anchor (GitHub/Docusaurus style)
    const anchorLink = '#' + fileName.toLowerCase();

    // If there was an existing anchor, append it
    const fullAnchor = anchor ? anchorLink + anchor.substring(1) : anchorLink;

    return `](${fullAnchor})`;
  });

  // Fix MDX compatibility issues
  console.log('🔧 Fixing MDX compatibility issues...');

  // Replace <br> with <br />
  apiContent = apiContent.replace(/<br>/g, '<br />');

  // Escape JSON-like patterns in table cells that MDX might interpret as JSX
  // Pattern: [{...}] in table cells (between | characters)
  apiContent = apiContent.replace(/(\|[^|]*?)(\[{[^\]]*?}\])([^|]*?\|)/g, (match, before, json, after) => {
    // Only wrap if not already in backticks
    if (!before.includes('`') || after.startsWith('`')) {
      return before + '`' + json + '`' + after;
    }
    return match;
  });

  console.log(`✅ Successfully merged documentation (${apiContent.length} characters)\n`);
} catch (error) {
  console.error('❌ Error merging documentation:', error.message);
  process.exit(1);
}

// Step 3: Read template file
console.log('📄 Step 3: Reading template file...');
let template = '';
try {
  template = fs.readFileSync(TEMPLATE_FILE, 'utf-8');
  console.log('✅ Template file loaded\n');
} catch (error) {
  console.error('❌ Error reading template file:', error.message);
  process.exit(1);
}

// Step 4: Replace placeholder with generated content
console.log('🔄 Step 4: Filling template with generated content...');
if (!template.includes(CONTENT_PLACEHOLDER)) {
  console.warn(`⚠️  Warning: Placeholder "${CONTENT_PLACEHOLDER}" not found in template`);
}

const finalContent = template.replace(CONTENT_PLACEHOLDER, apiContent);
console.log('✅ Content merged successfully\n');

// Step 5: Write output file
console.log('💾 Step 5: Writing output file...');
try {
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, finalContent, 'utf-8');
  console.log(`✅ Documentation written to: ${OUTPUT_FILE}\n`);
} catch (error) {
  console.error('❌ Error writing output file:', error.message);
  process.exit(1);
}

// Step 6: Cleanup temporary directory
console.log('🧹 Step 6: Cleaning up temporary files...');
try {
  fs.rmSync(TEMP_DOCS_DIR, { recursive: true, force: true });
  console.log('✅ Temporary files removed\n');
} catch (error) {
  console.warn('⚠️  Warning: Could not remove temporary directory:', error.message);
}

console.log('✨ API documentation generation completed successfully!');
console.log(`📍 Output: ${OUTPUT_FILE}`);
