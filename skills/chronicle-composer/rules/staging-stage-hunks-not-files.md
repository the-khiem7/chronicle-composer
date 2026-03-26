---
title: Stage Hunks, Not Entire Files
impact: HIGH
impactDescription: Ensures commits contain only related changes, preventing mixed business logic
tags: git, staging, hunks
---

## Stage Hunks, Not Entire Files

A single file may contain multiple unrelated changes. Stage only related hunks using `git add -p` instead of entire files.

**Incorrect:**

```bash
# File contains both validation logic AND UI layout changes
git add src/UserService.cs
git commit -m "update user service"
```

**Correct:**

```bash
# Stage only validation-related hunks
git add -p src/UserService.cs
git commit -m "feat(auth): add user validation"

# Stage remaining UI-related hunks
git add -p src/UserService.cs
git commit -m "refactor(ui): update user creation layout"
```

Reference: [Git Interactive Staging](https://git-scm.com/docs/git-add)
