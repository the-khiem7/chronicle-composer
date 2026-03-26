---
name: chronicle-composer
description:
  Skill for composing clean Git commits by breaking large changes into logical commit groups,
  avoiding giant mixed commits, and using cdate/adate to maintain a clear project timeline.
  Use when working with git staging, commit conventions, custom dates, or maintaining clean
  commit history. Triggers on git operations, commit messages, staging workflows, or timeline management.
license: MIT
metadata:
  author: chronicle-composer
  version: '0.1.0'
---

# Chronicle Composer

Skill for composing clean Git commits by breaking large changes into logical commit groups, avoiding giant mixed commits, and using cdate/adate to maintain a clear project timeline.

## When to Apply

Reference these guidelines when:

- Breaking large changes into logical commit groups
- Avoiding giant "meteor" commits that mix business flows
- Staging hunks instead of entire files using `git add -p`
- Writing commit messages with conventional format
- Using custom commit dates with `git cdate` and `git adate`
- Maintaining chronological development timeline
- Setting up PowerShell scripts for date control

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

- `analysis-avoid-meteor-commits` - Never commit all changes at once

### 2. Staging Strategy (HIGH)

- `staging-stage-hunks-not-files` - Use `git add -p` to stage hunks, not entire files

### 3. Commit Convention (HIGH)

- `convention-commit-message-format` - Follow type(scope): description format

### 4. Timeline Control (MEDIUM)

- `timeline-use-custom-commit-dates` - Use `git cdate` and `git adate` for timeline control

### 5. History Management (MEDIUM)

- `history-maintain-clean-workflow` - Follow structured workflow for clean history

## Implementation Guide

### Workflow Steps

1. **Check Status**: Run `git status` to see changed files
2. **Analyze Changes**: Use `git diff` to understand what changed
3. **Identify Logical Groups**: Break changes into business flow units
4. **Stage Selectively**: Use `git add -p` to stage only related hunks
5. **Commit with Convention**: Write proper commit messages
6. **Set Timeline**: Use `git cdate` to maintain chronological order
7. **Review History**: Use `git lga` to verify the timeline

### Common Patterns

**Bad Commit Examples:**
```
update project
fix bugs
many changes
update stuff
```

**Good Commit Examples:**
```
feat(auth): add JWT authentication

Implement JWT authentication flow
Add token generation and validation
Update login endpoint
```

```
fix(parser): handle null email subject

Fix null reference when parsing emails without subject
Add validation before mapping
```

## References

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Atomic Commits](https://www.aleksandrhovhannisyan.com/blog/atomic-git-commits/)
- [Git Best Practices](https://sethrobertson.github.io/GitBestPractices/)