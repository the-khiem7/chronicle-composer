# Chronicle Composer

[![CI](https://github.com/the-khiem7/chronicle-composer/workflows/CI/badge.svg)](https://github.com/the-khiem7/chronicle-composer/actions)
[![Release](https://img.shields.io/github/v/release/the-khiem7/chronicle-composer)](https://github.com/the-khiem7/chronicle-composer/releases)

Compose history, not commits.

Chronicle Composer is an engineering workflow and agent skill designed to transform messy code changes into clean, structured Git history using atomic commits, commit conventions, and timeline control.

The goal of this project is not just to commit code, but to compose the chronicle of a project through meaningful commit history.

---

# 1. Project Purpose

In many projects, developers create large commits that mix multiple business flows, features, bug fixes, refactors, and configuration changes together. This makes Git history difficult to read, review, revert, and understand.

Chronicle Composer defines a workflow where commits are structured, logical, atomic, and meaningful.

Instead of treating Git commits as file snapshots, this system treats commits as documentation of engineering decisions and development progress.

Git history should tell the story of the project.

---

# 2. Core Philosophy

Traditional workflow:

```

make changes → git add . → git commit

```

Chronicle workflow:

```

make changes
↓
analyze git diff
↓
identify logical changes
↓
stage hunks
↓
atomic commits
↓
commit convention
↓
timeline control
↓
clean git history

```

Key idea:

> Commits represent logical changes, not files.

A commit should answer:

- What changed?
- Why did it change?
- Which part of the system changed?
- How does this relate to the project timeline?

---

# 3. Atomic Commit Principle

Each commit must:

- Represent a single logical change
- Be small and focused
- Be independently revertable
- Follow commit message convention
- Not mix unrelated changes
- Not commit entire files blindly
- Prefer staging hunks instead of full files

Bad commit example:

```

update project
fix bugs
many changes

```

Good commit examples:

```

feat(parser): add email parsing module
fix(auth): handle expired token validation
refactor(repository): simplify user query logic
docs(readme): update setup instructions

```

---

# 4. Commit Message Convention

All commits must follow this format:

```

type(scope): short description

long description

```

## Rules

- Short description ≤ 50 characters
- Use imperative mood (add, fix, update, refactor)
- Do not end short description with a period
- Long description explains WHY, not just WHAT

## Types

| Type     | Purpose          |
| -------- | ---------------- |
| feat     | New feature      |
| fix      | Bug fix          |
| refactor | Code refactor    |
| docs     | Documentation    |
| style    | Formatting       |
| test     | Tests            |
| chore    | Tooling / config |
| perf     | Performance      |
| build    | Build system     |
| ci       | CI/CD            |

---

# 5. Git Change Grouping Strategy

Changes must be grouped by logical change, not by file.

Logical change categories:

- Feature implementation
- Bug fix
- Refactor
- Database change
- UI change
- Configuration
- Documentation
- Logging / monitoring
- Tests
- Build / CI

If a single file contains multiple logical changes, commits must be split using staged hunks instead of committing the entire file.

---

# 6. Recommended Git Workflow

Standard workflow when committing changes:

```

1. git status
2. git diff
3. Identify logical changes
4. Stage changes by hunks
5. Write commit message using convention
6. Commit
7. Adjust commit date if necessary
8. Verify git history

```

The goal is to produce a clean, readable commit history that represents the development timeline.

---

# 7. Timeline and Project History

Git history is treated as a project timeline.

Commits should:

- Reflect development order
- Represent milestones and features
- Show bug fixes and refactors
- Document architectural changes
- Be readable like a project story

A good Git history should allow someone to understand:

- How the project evolved
- When features were added
- When bugs were fixed
- When refactors happened
- How the architecture changed

Git history is not just version control.
It is engineering documentation.

---

# 8. Chronicle Concept

This project introduces the concept of a project chronicle.

Chronicle means a record of events in chronological order.

In this context:

- Each commit is an event
- Commit history is the timeline
- Git repository is the chronicle of the project
- Development becomes a documented story

The objective is to transform messy development history into a structured engineering chronicle.

> Do not just commit code.  
> Write the chronicle of the project.

---

# 9. Core Principles Summary

Always follow these principles:

- Small commits
- Logical commits
- Atomic commits
- Clean history
- Commit convention
- One logical change per commit
- Stage hunks instead of full files
- Git history should tell a story
- Commits represent intent, not files
- History should be readable and meaningful

---

# 10. Installation

## Via Skills.sh Marketplace

Chronicle Composer is available on the Skills.sh marketplace:

```bash
npx skills add the-khiem7/chronicle-composer
```

## Manual Installation

### For Claude Code:

```bash
cp -r skills/chronicle-composer ~/.claude/skills/
```

### For Claude.ai:

Add the `SKILL.md` content to your project knowledge or conversation.

## Requirements

- Git repository with commits
- Node.js 18+ (for build tools)
- PowerShell (for `git cdate`/`git adate` on Windows)

---

# 11. Development

## Building from Source

```bash
# Install dependencies
npm install

# Validate skill structure
npm run validate

# Build skill artifacts
npm run build

# Compile AGENTS.md from rules
npm run compile

# Extract test cases
npm run extract-tests
```

## Version Management

```bash
# Validate version consistency
npm run version:validate

# Bump version (patch/minor/major)
npm run version:bump patch

# Prepare release
npm run release
```

## Project Structure

```
chronicle-composer/
├── skills/chronicle-composer/     # Skill definition
│   ├── SKILL.md                   # AI instructions
│   ├── metadata.json              # Skill metadata
│   └── rules/                     # Rule definitions
├── packages/chronicle-composer-build/  # Build system
└── dist/                          # Build artifacts
```
