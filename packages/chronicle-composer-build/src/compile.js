#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { parseRule, compileToAgentsMd } = require('./rule-parser');

const SKILL_DIR = path.join(__dirname, '../../../skills/chronicle-composer');
const RULES_DIR = path.join(SKILL_DIR, 'rules');
const OUTPUT_FILE = path.join(__dirname, '../../../AGENTS.md');

console.log('🔨 Compiling AGENTS.md from rules...');

// Read metadata
const metadataPath = path.join(SKILL_DIR, 'metadata.json');
const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));

// Read and parse all rules
const ruleFiles = fs.readdirSync(RULES_DIR)
  .filter(file => file.endsWith('.md') && !file.startsWith('_'))
  .sort(); // Ensure deterministic order

console.log(`📋 Processing ${ruleFiles.length} rule files...`);

const rules = [];
ruleFiles.forEach(file => {
  try {
    const filePath = path.join(RULES_DIR, file);
    const rule = parseRule(filePath);
    rules.push(rule);
    console.log(`✅ Parsed ${file}`);
  } catch (error) {
    console.error(`❌ Failed to parse ${file}: ${error.message}`);
    process.exit(1);
  }
});

// Compile to AGENTS.md
const agentsMdContent = compileToAgentsMd(rules, metadata);

// Write output
fs.writeFileSync(OUTPUT_FILE, agentsMdContent);
console.log(`✅ Compiled AGENTS.md with ${rules.length} rules`);
console.log(`📄 Output: ${OUTPUT_FILE}`);

// Update dist with compiled version
const distDir = path.join(__dirname, '../../../dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

fs.copyFileSync(OUTPUT_FILE, path.join(distDir, 'AGENTS.md'));
console.log('📦 Updated dist/AGENTS.md');