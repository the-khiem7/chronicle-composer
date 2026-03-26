#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const SKILL_DIR = path.join(__dirname, '../../../skills/chronicle-composer');
const RULES_DIR = path.join(SKILL_DIR, 'rules');

console.log('🔍 Validating Chronicle Composer skill...');

// Validate SKILL.md exists
if (!fs.existsSync(path.join(SKILL_DIR, 'SKILL.md'))) {
  console.error('❌ SKILL.md not found');
  process.exit(1);
}

// Validate metadata.json exists
if (!fs.existsSync(path.join(SKILL_DIR, 'metadata.json'))) {
  console.error('❌ metadata.json not found');
  process.exit(1);
}

// Validate _template.md exists
if (!fs.existsSync(path.join(RULES_DIR, '_template.md'))) {
  console.error('❌ _template.md not found');
  process.exit(1);
}

// Validate _sections.md exists
if (!fs.existsSync(path.join(RULES_DIR, '_sections.md'))) {
  console.error('❌ _sections.md not found');
  process.exit(1);
}

console.log('✅ Basic structure validation passed');
console.log('🎉 Validation complete!');