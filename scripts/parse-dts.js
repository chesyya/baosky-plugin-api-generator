#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const DTS_FILE = path.join(__dirname, '../node_modules/@baosky/plugin/src/baosky.d.ts');

/**
 * Parse a .d.ts file and extract API documentation
 */
function parseDtsFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  let result = [];
  let currentSection = null;
  let inComment = false;
  let commentBuffer = [];
  let braceLevel = 0;
  let inModuleDeclaration = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Track brace levels
    braceLevel += (line.match(/{/g) || []).length;
    braceLevel -= (line.match(/}/g) || []).length;

    // Skip imports and comments at the top
    if (trimmed.startsWith('import ') || trimmed.startsWith('//') || trimmed.startsWith('/*')) {
      if (trimmed.startsWith('/*') && !trimmed.includes('*/')) {
        inComment = true;
      }
      if (inComment && trimmed.includes('*/')) {
        inComment = false;
      }
      continue;
    }

    // Detect module declaration
    if (trimmed.startsWith('export module ')) {
      inModuleDeclaration = true;
      continue;
    }

    // Skip if not in module
    if (!inModuleDeclaration) continue;

    // Collect JSDoc comments
    if (trimmed.startsWith('/**')) {
      commentBuffer = [line];
      continue;
    }

    if (commentBuffer.length > 0 && !trimmed.startsWith('*/')) {
      commentBuffer.push(line);
      continue;
    }

    if (commentBuffer.length > 0 && trimmed.startsWith('*/')) {
      commentBuffer.push(line);
      continue;
    }

    // Detect API elements
    if (commentBuffer.length > 0 || isApiDeclaration(trimmed)) {
      const declaration = extractDeclaration(lines, i, braceLevel);

      if (declaration) {
        result.push({
          comment: commentBuffer.join('\n'),
          declaration: declaration.text,
          type: declaration.type,
          name: declaration.name
        });
      }

      commentBuffer = [];
    }
  }

  return result;
}

/**
 * Check if a line contains an API declaration
 */
function isApiDeclaration(line) {
  const patterns = [
    /^export\s+(class|interface|enum|namespace|type|const|function|var|let)\s+/,
    /^export\s+abstract\s+class\s+/,
    /^(class|interface|enum|namespace|type|const|function)\s+/
  ];

  return patterns.some(pattern => pattern.test(line));
}

/**
 * Extract the full declaration
 */
function extractDeclaration(lines, startIndex, currentBraceLevel) {
  const firstLine = lines[startIndex].trim();

  // Determine declaration type
  let type = 'unknown';
  let name = '';

  if (firstLine.includes('export class ') || firstLine.startsWith('class ')) {
    type = 'class';
    name = firstLine.match(/class\s+(\w+)/)?.[1] || '';
  } else if (firstLine.includes('export interface ') || firstLine.startsWith('interface ')) {
    type = 'interface';
    name = firstLine.match(/interface\s+(\w+)/)?.[1] || '';
  } else if (firstLine.includes('export enum ') || firstLine.startsWith('enum ')) {
    type = 'enum';
    name = firstLine.match(/enum\s+(\w+)/)?.[1] || '';
  } else if (firstLine.includes('export namespace ') || firstLine.startsWith('namespace ')) {
    type = 'namespace';
    name = firstLine.match(/namespace\s+(\w+)/)?.[1] || '';
  } else if (firstLine.includes('export type ') || firstLine.startsWith('type ')) {
    type = 'type';
    name = firstLine.match(/type\s+(\w+)/)?.[1] || '';
  } else if (firstLine.includes('export const ') || firstLine.startsWith('const ')) {
    type = 'const';
    name = firstLine.match(/const\s+(\w+)/)?.[1] || '';
  } else if (firstLine.includes('export function ') || firstLine.startsWith('function ')) {
    type = 'function';
    name = firstLine.match(/function\s+(\w+)/)?.[1] || '';
  }

  // For simple declarations (single line)
  if (firstLine.endsWith(';') || firstLine.endsWith(',')) {
    return {
      text: firstLine,
      type: type,
      name: name
    };
  }

  // For multi-line declarations, collect until closing brace
  let declarationLines = [lines[startIndex]];
  let localBraceLevel = (firstLine.match(/{/g) || []).length - (firstLine.match(/}/g) || []).length;

  if (localBraceLevel === 0 && !firstLine.includes('{')) {
    // Single line or signature
    return {
      text: firstLine,
      type: type,
      name: name
    };
  }

  for (let j = startIndex + 1; j < lines.length; j++) {
    const line = lines[j];
    declarationLines.push(line);

    localBraceLevel += (line.match(/{/g) || []).length;
    localBraceLevel -= (line.match(/}/g) || []).length;

    if (localBraceLevel === 0 && line.trim().endsWith('}')) {
      break;
    }
  }

  return {
    text: declarationLines.join('\n'),
    type: type,
    name: name
  };
}

/**
 * Convert parsed data to Markdown
 */
function convertToMarkdown(parsedData) {
  let markdown = '';

  // Group by type
  const groups = {
    class: [],
    interface: [],
    enum: [],
    namespace: [],
    type: [],
    const: [],
    function: []
  };

  parsedData.forEach(item => {
    if (groups[item.type]) {
      groups[item.type].push(item);
    }
  });

  // Generate markdown for each group
  const typeHeaders = {
    class: '## Classes',
    interface: '## Interfaces',
    enum: '## Enumerations',
    namespace: '## Namespaces',
    type: '## Type Aliases',
    const: '## Constants',
    function: '## Functions'
  };

  for (const [type, items] of Object.entries(groups)) {
    if (items.length === 0) continue;

    markdown += `\n${typeHeaders[type]}\n\n`;

    items.forEach(item => {
      if (item.name) {
        markdown += `### ${item.name}\n\n`;
      }

      if (item.comment) {
        // Convert JSDoc to markdown
        const commentText = item.comment
          .replace(/\/\*\*/g, '')
          .replace(/\*\//g, '')
          .replace(/^\s*\*\s?/gm, '')
          .trim();

        if (commentText) {
          markdown += `${commentText}\n\n`;
        }
      }

      // Add code block for declaration
      if (item.declaration) {
        // Simplify the declaration (remove implementation details)
        let decl = item.declaration
          .replace(/export\s+/g, '')
          .trim();

        markdown += '```typescript\n';
        markdown += decl + '\n';
        markdown += '```\n\n';
      }
    });
  }

  return markdown;
}

// Main execution
if (require.main === module) {
  try {
    console.log('📖 Parsing .d.ts file...');
    const parsed = parseDtsFile(DTS_FILE);
    console.log(`✅ Found ${parsed.length} API declarations\n`);

    console.log('📝 Converting to Markdown...');
    const markdown = convertToMarkdown(parsed);
    console.log(`✅ Generated ${markdown.length} characters of documentation\n`);

    // Output to stdout so it can be captured by the main script
    console.log(markdown);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

module.exports = { parseDtsFile, convertToMarkdown };
