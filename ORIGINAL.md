---
name: git-compose-commit
description: "Skill for composing clean Git commits by breaking large changes into logical commit groups, avoiding giant mixed commits, and using cdate/adate to maintain a clear project timeline."
risk: low
source: community
---------

# Git Compose Commit

## Purpose

This document defines operational skills and rules for agents working with this repository, especially around Git commit workflow and commit history hygiene.

---

# 1. Git Change Management (Very Important)

## Problem

Large changes are often staged together and committed in one big commit. This is bad because:

* Hard to review
* Hard to revert
* Breaks commit history
* Business flows get mixed in one commit
* Some agents only read filenames (not diffs), so grouping by file is critical

## Rule: Never commit a huge "meteor" commit

Do NOT commit all changes at once.
Always break changes into logical commits based on:

* Business flow
* Feature
* Module
* Folder
* Related files

## How to Break Git Changes

When there are many changed files, the agent MUST analyze diffs, not just filenames.

### Important Rule

Agent must NOT group commits only by filename or folder.
Agent must inspect the actual changes inside files using git diff.

Reason:

* A single file may contain multiple business flow changes
* Committing the whole file may mix unrelated changes
* Some agents stage whole files, but commits should be grouped by logical change, not file boundary

### Required Workflow

1. Check changed files:

```
git status
```

2. Inspect changes:

```
git diff
git diff <file>
```

3. Identify logical change groups:

Examples of logical groups:

* Add new feature
* Fix bug
* Refactor function
* Update UI layout
* Change database schema
* Update configuration
* Add logging
* Rename variables

4. Stage changes by **hunks**, not entire files:

```
git add -p
```

or

```
git add -p <file>
```

This allows staging only parts of a file.

5. Commit each logical change separately.

### Example

Bad (commit entire file with many unrelated changes):

```
git add service/UserService.cs
git commit -m "update user service"
```

Good (stage only related hunks):

```
git add -p service/UserService.cs
git commit -m "add user validation"

 git add -p service/UserService.cs
 git commit -m "refactor user creation flow"
```

### Golden Rule

Commits should represent **logical changes**, not **files**.

A commit should answer:
"What change was made and why?"

Not:
"Which files changed?"

## Commit Grouping Strategy

Group commits by one of the following:

* Feature
* Bug fix
* Refactor
* Database change
* UI change
* Config / Infrastructure
* Documentation

## Commit Message Convention (Mandatory)

All commits MUST follow commit convention format:

```
type(scope): short description

long description
```

### Structure

```
type(scope): short description

- What changed
- Why it changed
- Additional notes
```

### Types

Common commit types:

* feat: new feature
* fix: bug fix
* refactor: code refactor
* docs: documentation
* style: formatting / style
* test: tests
* chore: tooling / config
* perf: performance improvement
* build: build system
* ci: CI/CD

### Examples

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

```
refactor(repository): simplify user query logic

Remove duplicated LINQ queries
Extract shared query builder
```

### Rules

* Short description <= 50 characters
* Use imperative mood (add, fix, update, refactor)
* Do NOT capitalize first letter
* Do NOT end short description with a period
* Long description explains WHY, not just WHAT

### Bad Examples

```
update stuff
fix bug
many changes
update project
```

### Good Examples

```
feat(mail): add mail parser
fix(ui): correct dashboard layout
refactor(service): split user service logic
docs(readme): update setup instructions
```

---

# 2. Using Custom Commit Date (cdate)

This repository uses custom git tools:

* `git cdate` → commit with custom date
* `git adate` → amend last commit date

These tools are implemented via PowerShell scripts and git aliases.

## git cdate

Commit with a custom date (CLI only, no interactive mode).

### Usage:

```
git add <files>
git cdate "YYYY-MM-DD HH:MM:SS" "commit message"
```

### Example:

```
git add src/parser/*
git cdate "2026-03-18 09:00:00" "add mail parser"
```

## git adate

Amend the last commit date (CLI only).

### Usage:

```
git adate "YYYY-MM-DD HH:MM:SS"
```

### Example:

```
git adate "2026-03-18 18:00:00"
```

## View Commit Dates

```
git lga
```

---

# 3. Setup Environment (If cdate/adate Not Available)

If `git cdate` or `git adate` does not work, setup environment as follows.

## Step 1 – Create PowerShell Scripts

Create files:

```
C:\Users\<username>\git-cdate.ps1
C:\Users\<username>\git-adate.ps1
```

### git-cdate.ps1

```
param(
    [string]$date,
    [string]$message
)

if (-not $date) {
    Write-Host ""
    Write-Host "=== Git Commit With Custom Date ==="
    Write-Host ""

    $date = Read-Host "Enter date (YYYY-MM-DD HH:MM:SS)"
    $message = Read-Host "Enter commit message"
}

$env:GIT_AUTHOR_DATE = $date
$env:GIT_COMMITTER_DATE = $date

git commit -m $message
```

### git-adate.ps1

```
param(
    [string]$date
)

if (-not $date) {
    Write-Host ""
    Write-Host "=== Amend Commit Date ==="
    Write-Host ""

    $date = Read-Host "Enter new date (YYYY-MM-DD HH:MM:SS)"
}

$env:GIT_AUTHOR_DATE = $date
$env:GIT_COMMITTER_DATE = $date

git commit --amend --no-edit
```

## Step 2 – Configure Git Aliases

Open:

```
git config --global --edit
```

Add:

```
[alias]
    cdate = "!powershell -NoProfile -ExecutionPolicy Bypass -File C:/Users/<username>/git-cdate.ps1"
    adate = "!powershell -NoProfile -ExecutionPolicy Bypass -File C:/Users/<username>/git-adate.ps1"

    lg = log --oneline --graph --decorate --all
    lga = log --pretty=fuller
    last = log -1 HEAD
```

Restart terminal after setup.

---

# 4. Recommended Git Workflow

Typical workflow when working on a feature:

1. Make changes
2. Run `git status`
3. Group files by feature
4. Stage files by group
5. Commit each group
6. Use `git cdate` to set timeline
7. If needed, use `git adate` to adjust last commit
8. Verify history using `git lga`

### Example Workflow

```
git add parser/*
git cdate

 git add dashboard/*
 git cdate

 git add models/*
 git cdate

 git lga
```

---

# 5. Core Principles

Always remember:

* Small commits
* Logical commits
* One feature per commit
* Clean history
* No giant commits
* Group files by business flow
* Commit history should tell the story of the project

A good git history should read like a development timeline, not a file dump.
