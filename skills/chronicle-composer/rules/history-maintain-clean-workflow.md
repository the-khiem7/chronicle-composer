---
title: Maintain Clean Git Workflow
impact: MEDIUM
impactDescription: Ensures consistent workflow that produces readable, meaningful commit history
tags: git, workflow, history
---

## Maintain Clean Git Workflow

Follow structured workflow to ensure commit history tells the development story.

**Recommended Workflow:**

1. **Make changes** - Implement features/fixes
2. **Check status** - `git status`
3. **Analyze diffs** - `git diff` to understand changes
4. **Identify logical groups** - Group by business flow/feature
5. **Stage selectively** - Use `git add -p` for hunks
6. **Commit with convention** - Use proper message format
7. **Set timeline** - Use `git cdate` for chronological order
8. **Verify history** - `git lga` to review timeline

**Example Workflow:**

```bash
# Analyze changes
git status
git diff

# Stage and commit logical groups
git add -p src/auth/
git cdate "2026-03-18 09:00:00" "feat(auth): implement JWT authentication"

git add -p src/parser/
git cdate "2026-03-18 10:30:00" "feat(parser): add email parsing"

git add -p tests/
git cdate "2026-03-18 11:00:00" "test(auth): add authentication tests"

# Review timeline
git lga
```

**Core Principles:**
- Small, focused commits
- Logical grouping (not by files)
- Clear commit messages
- Chronological timeline
- History tells project story

Reference: [Git Workflow Best Practices](https://sethrobertson.github.io/GitBestPractices/)