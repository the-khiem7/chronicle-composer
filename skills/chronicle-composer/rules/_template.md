---
title: Rule Title Here
impact: MEDIUM
impactDescription: brief description of impact
tags: git, commits, workflow
---

## Rule Title Here

Brief explanation of the rule and why it matters for clean commit history.

**Incorrect:**

```bash
# Bad git workflow example
git add .
git commit -m "update"
```

**Correct:**

```bash
# Good git workflow example
git add -p
git commit -m "feat(parser): add email validation"
```

Reference: [Git Best Practices](https://sethrobertson.github.io/GitBestPractices/)