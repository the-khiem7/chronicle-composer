---
title: 'Commit Atomic Changes'
impact: HIGH
tags: ['commit', 'atomic', 'staging']
---

# Commit Atomic Changes

Each commit should represent a single, atomic change that can be understood and reverted independently.

**Incorrect:**

```bash
# Commit mixes multiple unrelated changes
git add .
git commit -m "update user management"

# This commit includes:
# - User registration logic
# - Password validation
# - UI layout changes
# - Database schema updates
```

**Correct:**

```bash
# Commit each change separately
git add src/auth/registration.js
git commit -m "feat(auth): add user registration logic"

git add src/auth/validation.js
git commit -m "feat(auth): add password validation"

git add src/ui/user-form.js
git commit -m "refactor(ui): update user form layout"

git add migrations/001_user_schema.sql
git commit -m "feat(db): add user table schema"
```

## Why This Matters

Atomic commits make it easier to:

- Understand what changed and why
- Revert specific changes without affecting others
- Review changes in focused pull requests
- Bisect bugs to specific commits

Reference: [Atomic Commits](https://www.aleksandrhovhannisyan.com/blog/atomic-git-commits/)
