---
name: chronicle-composer
description:
  Git workflow skill for composing clean commit history. Transform messy code changes
  into atomic commits with proper conventions and timeline control. Use when working
  with git commits, staging changes, writing commit messages, or organizing development
  history. Triggers on git operations, commit conventions, or history management tasks.
license: MIT
metadata:
  author: chronicle-composer
  version: '0.1.0'
---

# Chronicle Composer

Compose history, not commits. Transform messy code changes into clean, structured Git history using atomic commits, commit conventions, and timeline control.

## When to Apply

Reference these guidelines when:

- Analyzing git diffs and identifying logical changes
- Staging hunks instead of entire files
- Writing commit messages with proper conventions
- Managing commit dates and timeline control
- Organizing development history into meaningful commits
- Following atomic commit principles

## Rule Categories by Priority

| Priority | Category         | Impact | Prefix       |
| -------- | ---------------- | ------ | ------------ |
| 1        | Commit Analysis  | HIGH   | `analysis-`  |
| 2        | Staging Strategy | HIGH   | `staging-`   |
| 3        | Commit Convention| HIGH   | `convention-`|
| 4        | Timeline Control | MEDIUM | `timeline-`  |
| 5        | History Management| MEDIUM| `history-`   |

## Quick Reference

### 1. Commit Analysis (HIGH)

- `analysis-identify-logical-changes` - Break down git diff into logical, atomic changes
- `analysis-group-by-intent` - Group changes by business logic, not file structure

### 2. Staging Strategy (HIGH)

- `staging-hunks-over-files` - Stage individual hunks instead of entire files
- `staging-atomic-commits` - Each commit represents one logical change

### 3. Commit Convention (HIGH)

- `convention-message-format` - Follow type(scope): description format
- `convention-imperative-mood` - Use imperative mood in commit messages

### 4. Timeline Control (MEDIUM)

- `timeline-chronological-order` - Maintain chronological development order
- `timeline-date-adjustment` - Adjust commit dates when necessary

### 5. History Management (MEDIUM)

- `history-clean-rebase` - Use interactive rebase for clean history
- `history-meaningful-story` - Ensure history tells the project story

## Implementation Guide

### Workflow Steps

1. **Analyze Changes**: Run `git diff` to understand what changed
2. **Identify Logical Groups**: Break changes into atomic units
3. **Stage Selectively**: Use `git add -p` to stage hunks
4. **Write Messages**: Follow convention with meaningful descriptions
5. **Verify History**: Use `git log --oneline` to review the story

### Common Patterns

**Bad Commit Example:**
```
update project
fix bugs
many changes
```

**Good Commit Examples:**
```
feat(parser): add email parsing module
fix(auth): handle expired token validation
refactor(repository): simplify user query logic
docs(readme): update setup instructions
```

## References

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Atomic Commits](https://www.aleksandrhovhannisyan.com/blog/atomic-git-commits/)
- [Git Best Practices](https://sethrobertson.github.io/GitBestPractices/)