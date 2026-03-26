---
title: Follow Commit Message Convention
impact: HIGH
impactDescription: Ensures consistent, meaningful commit messages that explain intent and scope
tags: git, convention, messages
---

## Follow Commit Message Convention

All commits must follow the structured format that clearly communicates what changed and why.

**Incorrect:**

```bash
git commit -m "update stuff"
git commit -m "fix bug"
git commit -m "many changes"
```

**Correct:**

```bash
git commit -m "feat(auth): add JWT authentication

Implement JWT authentication flow
Add token generation and validation
Update login endpoint"

git commit -m "fix(parser): handle null email subject

Fix null reference when parsing emails without subject
Add validation before mapping"

git commit -m "refactor(repository): simplify user query logic

Remove duplicated LINQ queries
Extract shared query builder"
```

**Format Structure:**

```
type(scope): short description

- What changed
- Why it changed
- Additional notes
```

Reference: [Conventional Commits](https://www.conventionalcommits.org/)
