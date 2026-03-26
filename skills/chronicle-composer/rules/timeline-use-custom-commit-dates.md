---
title: Use Custom Commit Dates for Timeline Control
impact: MEDIUM
impactDescription: Maintains chronological development timeline by controlling commit dates
tags: git, timeline, dates
---

## Use Custom Commit Dates for Timeline Control

Use `git cdate` and `git adate` to maintain a clear project timeline where commits reflect development order.

**Setup Required:**

Create PowerShell scripts and git aliases:

**git-cdate.ps1:**
```powershell
param([string]$date, [string]$message)

$env:GIT_AUTHOR_DATE = $date
$env:GIT_COMMITTER_DATE = $date

git commit -m $message
```

**git-adate.ps1:**
```powershell
param([string]$date)

$env:GIT_AUTHOR_DATE = $date
$env:GIT_COMMITTER_DATE = $date

git commit --amend --no-edit
```

**Git config aliases:**
```
[alias]
    cdate = "!powershell -NoProfile -ExecutionPolicy Bypass -File C:/Users/<username>/git-cdate.ps1"
    adate = "!powershell -NoProfile -ExecutionPolicy Bypass -File C:/Users/<username>/git-adate.ps1"
    lga = log --pretty=fuller
```

**Usage:**

```bash
# Commit with specific date
git add src/parser/
git cdate "2026-03-18 09:00:00" "feat(parser): add mail parser"

# Amend last commit date
git adate "2026-03-18 18:00:00"

# View commit dates
git lga
```

Reference: [Git Commit Dates](https://git-scm.com/book/en/v2/Git-Internals-Environment-Variables)