#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const SKILL_DIR = path.join(__dirname, '../../../skills/chronicle-composer')
const OUTPUT_DIR = path.join(__dirname, '../../../dist')

console.log('🔨 Building Chronicle Composer skill...')

// Create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

// Copy skill files to dist
const skillFiles = ['SKILL.md', 'metadata.json']
skillFiles.forEach((file) => {
  const src = path.join(SKILL_DIR, file)
  const dest = path.join(OUTPUT_DIR, file)
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest)
    console.log(`📄 Copied ${file}`)
  }
})

// Copy rules directory
const rulesSrc = path.join(SKILL_DIR, 'rules')
const rulesDest = path.join(OUTPUT_DIR, 'rules')
if (fs.existsSync(rulesSrc)) {
  // Simple copy for now - in real implementation would compile to AGENTS.md
  fs.cpSync(rulesSrc, rulesDest, { recursive: true })
  console.log('📚 Copied rules directory')
}

console.log('✅ Build complete!')
console.log(`📦 Output: ${OUTPUT_DIR}`)
