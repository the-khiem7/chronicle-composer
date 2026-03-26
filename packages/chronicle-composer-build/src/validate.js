#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { parseRule, validateRule, getSectionInfo } = require('./rule-parser');

const SKILL_DIR = path.join(__dirname, '../../../skills/chronicle-composer');
const RULES_DIR = path.join(SKILL_DIR, 'rules');

console.log('🔍 Validating Chronicle Composer skill...');

let hasErrors = false;

// Validate SKILL.md exists
if (!fs.existsSync(path.join(SKILL_DIR, 'SKILL.md'))) {
  console.error('❌ SKILL.md not found');
  hasErrors = true;
}

// Validate metadata.json exists
if (!fs.existsSync(path.join(SKILL_DIR, 'metadata.json'))) {
  console.error('❌ metadata.json not found');
  hasErrors = true;
}

// Validate _template.md exists
if (!fs.existsSync(path.join(RULES_DIR, '_template.md'))) {
  console.error('❌ _template.md not found');
  hasErrors = true;
}

// Validate _sections.md exists
if (!fs.existsSync(path.join(RULES_DIR, '_sections.md'))) {
  console.error('❌ _sections.md not found');
  hasErrors = true;
}

// Validate individual rules
const ruleFiles = fs.readdirSync(RULES_DIR)
  .filter(file => file.endsWith('.md') && !file.startsWith('_'));

console.log(`📋 Validating ${ruleFiles.length} rule files...`);

ruleFiles.forEach(file => {
  try {
    const filePath = path.join(RULES_DIR, file);
    const rule = parseRule(filePath);
    const validation = validateRule(rule);

    if (!validation.valid) {
      console.error(`❌ ${file}: ${validation.errors.join(', ')}`);
      hasErrors = true;
    } else {
      console.log(`✅ ${file}: Valid`);
    }
  } catch (error) {
    console.error(`❌ ${file}: ${error.message}`);
    hasErrors = true;
  }
});

// Check section mapping
ruleFiles.forEach(file => {
  const fileName = file.replace('.md', '');
  const sectionInfo = getSectionInfo(fileName);
  if (!sectionInfo) {
    console.error(`❌ ${file}: Filename doesn't match any section prefix`);
    hasErrors = true;
  }
});

if (hasErrors) {
  console.error('❌ Validation failed!');
  process.exit(1);
}

console.log('✅ All validations passed');
console.log('🎉 Validation complete!');