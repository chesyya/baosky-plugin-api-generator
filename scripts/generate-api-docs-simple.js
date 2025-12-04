#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { parseDtsFile, convertToMarkdown } = require('./parse-dts');

// Configuration
const TEMPLATE_FILE = path.join(__dirname, '../plugin-docs/references/vscode-api.template');
const OUTPUT_FILE = path.join(__dirname, '../plugin-docs/references/vscode-api.md');
const DTS_FILE = path.join(__dirname, '../node_modules/@baosky/plugin/src/baosky.d.ts');
const CONTENT_PLACEHOLDER = '{$ Content $}';

console.log('🚀 Starting API documentation generation...\n');

// Step 1: Parse .d.ts file
console.log('📖 Step 1: Parsing .d.ts file...');
let apiContent = '';
let parsed = [];
try {
  parsed = parseDtsFile(DTS_FILE);
  console.log(`✅ Found ${parsed.length} API declarations\n`);

  // Step 2: Convert to Markdown
  console.log('📝 Step 2: Converting to Markdown...');
  apiContent = convertToMarkdown(parsed);
  console.log(`✅ Generated ${apiContent.length} characters of documentation\n`);
} catch (error) {
  console.error('❌ Error parsing .d.ts file:', error.message);
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
  // Ensure output directory exists
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

console.log('✨ API documentation generation completed successfully!');
console.log(`📍 Output: ${OUTPUT_FILE}`);
console.log(`📊 Stats: ${parsed.length} API declarations, ${apiContent.length} characters`);
