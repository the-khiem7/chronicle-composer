# AGENTS.md

This file provides guidance to AI coding agents (Claude Code, Cursor, Copilot, etc.) when working with code in this repository.

## Repository Overview

A production-grade skill repository for Chronicle Composer - a git workflow skill that transforms messy code changes into clean, structured Git history using atomic commits, commit conventions, and timeline control.

## Repository Structure

```
chronicle-composer/
├── skills/chronicle-composer/           # Main skill directory
│   ├── SKILL.md                         # Skill definition and instructions
│   ├── metadata.json                    # Skill metadata
│   └── rules/                           # Rule definitions (markdown)
│       ├── _template.md                 # Rule template
│       ├── _sections.md                 # Section definitions
│       └── *.md                         # Individual rules
├── packages/chronicle-composer-build/   # Build system
│   └── src/                             # Build scripts
├── agent-skills/                        # Reference template (DO NOT MODIFY)
└── .github/workflows/                   # CI/CD workflows
```

## Creating Rules

### Directory Structure

Rules are stored as individual markdown files in `skills/chronicle-composer/rules/`:

```
skills/chronicle-composer/rules/
├── _template.md              # Template for new rules
├── _sections.md              # Section definitions and ordering
├── analysis-identify-changes.md
├── staging-atomic-commits.md
├── convention-message-format.md
└── ...
```

### Rule Format

Each rule file follows this structure:

```markdown
---
title: Rule Title Here
impact: MEDIUM
impactDescription: brief description of impact
tags: git, commits, workflow
---

## Rule Title Here

Brief explanation of the rule and why it matters.

**Incorrect:**

```bash
# Bad example
git add .
git commit -m "update"
```

**Correct:**

```bash
# Good example
git add -p
git commit -m "feat(parser): add validation"
```

Reference: [Git Best Practices](https://example.com)
```

### Naming Conventions

- **Rule files**: `{section}-{rule-name}.md` (e.g., `analysis-identify-changes.md`)
- **Sections** are defined in `_sections.md` with prefixes like:
  - `analysis-` (Commit Analysis)
  - `staging-` (Staging Strategy)
  - `convention-` (Commit Convention)
  - `timeline-` (Timeline Control)
  - `history-` (History Management)

### Impact Levels

- **HIGH**: Critical for clean git history
- **MEDIUM**: Important for maintainability
- **LOW**: Nice-to-have improvements

## Build System

The build system in `packages/chronicle-composer-build/` compiles rules into:

- `AGENTS.md`: Complete agent documentation
- `test-cases.json`: Test cases for validation
- `chronicle-composer.zip`: Packaged skill for distribution

### Build Scripts

```bash
# Validate rules and schema
npm run validate

# Build documentation and artifacts
npm run build

# Extract test cases
npm run extract-tests
```

## Contributing Rules

1. Create rule file following template: `cp _template.md {section}-{rule-name}.md`
2. Fill in frontmatter (title, impact, tags)
3. Write rule content with bad/good examples
4. Add reference links
5. Run `npm run validate` to ensure compliance
6. Commit with conventional message: `feat(rules): add {rule-name} rule`

## Quality Standards

### Rule Requirements

- Must have clear bad/good examples
- Must include impact assessment
- Must have relevant tags
- Must follow naming conventions
- Must include references

### Code Standards

- Use conventional commits
- Atomic commits only
- English language
- Markdown formatting
- Frontmatter validation

## Agent Instructions

When working with this repository:

1. **Never modify `agent-skills/`** - it's a reference template only
2. **Source of truth is `skills/chronicle-composer/`** - this is the actual skill being built
3. **Use the build system** - don't manually edit generated files
4. **Follow rule template** - ensures consistency
5. **Validate before committing** - prevents broken builds
6. **Use atomic commits** - practice what the skill teaches
7. **Template reference only** - `agent-skills/` contains examples, not production code

## Publishing

Skills are published to Skills.sh marketplace. The build system creates properly formatted artifacts for distribution.