#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const RULES_DIR = path.join(__dirname, '../../../skills/chronicle-composer/rules')
const OUTPUT_FILE = path.join(__dirname, '../../../test-cases.json')

console.log('📋 Extracting test cases from rules...')

const testCases = []

// Read all rule files (excluding templates)
const ruleFiles = fs
  .readdirSync(RULES_DIR)
  .filter((file) => file.endsWith('.md') && !file.startsWith('_'))

ruleFiles.forEach((file) => {
  const filePath = path.join(RULES_DIR, file)
  const content = fs.readFileSync(filePath, 'utf8')

  // Extract frontmatter
  const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1]
    const titleMatch = frontmatter.match(/title:\s*(.+)/)
    const impactMatch = frontmatter.match(/impact:\s*(.+)/)

    if (titleMatch && impactMatch) {
      testCases.push({
        rule: file.replace('.md', ''),
        title: titleMatch[1].trim(),
        impact: impactMatch[1].trim(),
        file: file,
      })
    }
  }
})

// Write test cases to JSON
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(testCases, null, 2))
console.log(`✅ Extracted ${testCases.length} test cases`)
console.log(`📄 Output: ${OUTPUT_FILE}`)
