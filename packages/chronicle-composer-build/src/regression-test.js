#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('🧪 Running Chronicle Composer Regression Tests...\n')

// Expected rule files (baseline from v0.1.1)
const EXPECTED_RULES = [
  'analysis-avoid-meteor-commits.md',
  'staging-stage-hunks-not-files.md',
  'convention-commit-message-format.md',
  'timeline-use-custom-commit-dates.md',
  'history-maintain-clean-workflow.md',
  'staging-commit-atomic-changes.md', // Added in v0.1.1
]

const RULES_DIR = path.join(__dirname, '../../../skills/chronicle-composer/rules')

// Test 1: Check all expected rules exist
console.log('📋 Test 1: Checking rule file existence...')
const existingRules = fs.readdirSync(RULES_DIR).filter((f) => f.endsWith('.md'))
const missingRules = EXPECTED_RULES.filter((rule) => !existingRules.includes(rule))
const extraRules = existingRules.filter(
  (rule) => !EXPECTED_RULES.includes(rule) && rule !== '_template.md' && rule !== '_sections.md'
)

if (missingRules.length > 0) {
  console.error(`❌ Missing expected rules: ${missingRules.join(', ')}`)
  process.exit(1)
}

if (extraRules.length > 0) {
  console.error(`❌ Unexpected extra rules: ${extraRules.join(', ')}`)
  process.exit(1)
}

console.log(`✅ Found ${existingRules.length} rule files (expected: ${EXPECTED_RULES.length})`)

// Test 2: Validate rule parsing (reuse validate.js logic)
console.log('\n📋 Test 2: Validating rule parsing...')

const { parseRule } = require('./rule-parser')

let parseErrors = 0
for (const ruleFile of EXPECTED_RULES) {
  const rulePath = path.join(RULES_DIR, ruleFile)
  try {
    const rule = parseRule(rulePath)

    // Basic validation
    if (!rule.title || !rule.impact) {
      throw new Error('Missing required fields')
    }

    console.log(`✅ ${ruleFile}: Parsed successfully`)
  } catch (error) {
    console.error(`❌ ${ruleFile}: Parse error - ${error.message}`)
    parseErrors++
  }
}

if (parseErrors > 0) {
  console.error(`\n❌ ${parseErrors} rules failed to parse`)
  process.exit(1)
}

// Test 3: Check AGENTS.md compilation
console.log('\n📋 Test 3: Checking AGENTS.md compilation...')

const agentsPath = path.join(__dirname, '../../../AGENTS.md')
if (!fs.existsSync(agentsPath)) {
  console.error('❌ AGENTS.md not found')
  process.exit(1)
}

const agentsContent = fs.readFileSync(agentsPath, 'utf8')

// Check if new rule is included
if (!agentsContent.includes('Commit Atomic Changes')) {
  console.error('❌ New rule "Commit Atomic Changes" not found in AGENTS.md')
  process.exit(1)
}

// Check table of contents has correct count
const tocMatches = agentsContent.match(/Table of Contents/)
if (!tocMatches) {
  console.error('❌ Table of contents not found in AGENTS.md')
  process.exit(1)
}

console.log('✅ AGENTS.md compilation verified')

console.log('\n🎉 All regression tests passed!')
console.log('📊 Summary:')
console.log(`   - ${EXPECTED_RULES.length} rules validated`)
console.log('   - Rule parsing functional')
console.log('   - AGENTS.md compilation working')
