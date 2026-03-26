# Contributing to Chronicle Composer

Thank you for your interest in contributing to Chronicle Composer! This guide will help you get started with adding new Git workflow rules or improving existing ones.

## 📋 Quick Start

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/YOUR_USERNAME/chronicle-composer.git`
3. **Create** a feature branch: `git checkout -b feature/add-new-rule`
4. **Make** your changes
5. **Test** locally: `npm run validate && npm run build && npm run lint`
6. **Commit** with conventional format: `git commit -m "feat(rules): add new git workflow rule"`
7. **Push** and create PR

## 🛠️ Development Setup

```bash
# Install dependencies
npm install

# Run validation
npm run validate

# Build the skill
npm run build

# Check formatting
npm run lint

# Run regression tests
npm run regression
```

## 📚 Adding a New Rule

### Step 1: Understand Rule Structure

Each rule is a markdown file with YAML frontmatter:

````markdown
---
title: 'Rule Title'
impact: HIGH|MEDIUM|LOW
tags: ['tag1', 'tag2']
---

# Rule Title

Brief description of the rule.

## Incorrect

Bad practice example:

```bash
# Bad code here
```
````

## Correct

Good practice example:

```bash
# Good code here
```

## Why This Matters

Explanation of why this rule is important.

## Reference

- [Link to additional resources](https://example.com)

````

### Step 2: Choose Rule Category

Rules are organized by priority and category:

| Priority | Category | Prefix | Examples |
|----------|----------|--------|----------|
| 1 | Commit Analysis | `analysis-` | avoid-meteor-commits |
| 2 | Staging Strategy | `staging-` | stage-hunks-not-files |
| 3 | Commit Convention | `convention-` | commit-message-format |
| 4 | Timeline Control | `timeline-` | use-custom-commit-dates |
| 5 | History Management | `history-` | maintain-clean-workflow |

### Step 3: Create Rule File

1. Use the template: `cp skills/chronicle-composer/rules/_template.md skills/chronicle-composer/rules/YOUR-RULE.md`
2. Follow filename convention: `{category}-{kebab-case-name}.md`
3. Fill in frontmatter and content
4. Ensure examples are clear and actionable

### Step 4: Test Your Rule

```bash
# Validate rule format
npm run validate

# Build to see it in AGENTS.md
npm run build

# Check formatting
npm run lint
````

### Step 5: Submit PR

- **Title**: `feat(rules): add [rule-name] rule`
- **Description**: Explain what the rule does and why it's needed
- **Checklist**: Ensure all items are checked
- **Review**: Wait for maintainer approval

## 📋 PR Checklist

Before submitting your PR, ensure:

- [ ] Rule follows the established format and naming conventions
- [ ] Frontmatter is complete (title, impact, tags)
- [ ] Examples clearly show incorrect vs correct usage
- [ ] Rule provides actionable guidance
- [ ] `npm run validate` passes
- [ ] `npm run build` completes successfully
- [ ] `npm run lint` passes
- [ ] Commit message follows conventional format
- [ ] PR description explains the rule's purpose

## 🧪 Testing

We use automated testing to ensure rule quality:

```bash
# Run all validation
npm test  # (validate + build + lint + regression)

# Check specific areas
npm run validate     # Rule format validation
npm run build        # Build system test
npm run lint         # Formatting check
npm run regression   # Rule parsing regression test
```

## 🎯 Rule Quality Guidelines

### Content Standards

- **Clear**: Rule purpose is immediately understandable
- **Actionable**: Provides specific steps to follow
- **Evidence-based**: References best practices or standards
- **Concise**: Gets to the point without unnecessary words

### Examples

- **Realistic**: Show actual code patterns developers encounter
- **Minimal**: Focus on the specific issue being addressed
- **Contrast**: Clearly differentiate good vs bad approaches

### Impact Levels

- **HIGH**: Critical for commit quality, affects reviewability
- **MEDIUM**: Important for workflow efficiency
- **LOW**: Nice-to-have improvements

## 🚨 Important Notes

- **Template Reference**: `/agent-skills/` is read-only reference - do not modify
- **Build System**: All rules are compiled into `AGENTS.md` automatically
- **Version Control**: Rules are part of the skill versioning system
- **Review Required**: All rule changes need maintainer approval

## 💬 Questions?

- Open a [GitHub Issue](https://github.com/the-khiem7/chronicle-composer/issues) for questions
- Check existing issues for similar questions
- Review the [README](README.md) for project overview

Thank you for helping improve Git workflows for developers everywhere! 🎉
