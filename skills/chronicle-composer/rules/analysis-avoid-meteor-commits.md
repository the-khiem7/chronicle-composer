---
title: Avoid Meteor Commits
impact: HIGH
impactDescription: Prevents unmaintainable commit history by breaking large changes into logical units
tags: git, commits, staging
---

## Avoid Meteor Commits

Never commit all changes at once in one big "meteor" commit. Large commits make code hard to review, revert, and understand.

**Incorrect:**

```bash
git status
# Shows 20+ files changed
git add .
git commit -m "update project"
```

**Correct:**

```bash
git status
git diff
# Analyze changes and identify logical groups
git add -p src/parser/
git commit -m "feat(parser): add email parsing module"

git add -p src/auth/
git commit -m "fix(auth): handle expired token validation"

git add -p tests/
git commit -m "test: add validation test cases"
```

Reference: [Atomic Commits](https://www.aleksandrhovhannisyan.com/blog/atomic-git-commits/)