# Chronicle Composer

[![CI](https://github.com/the-khiem7/chronicle-composer/workflows/CI/badge.svg)](https://github.com/the-khiem7/chronicle-composer/actions)
[![Release](https://img.shields.io/github/v/release/the-khiem7/chronicle-composer)](https://github.com/the-khiem7/chronicle-composer/releases)

**Compose history, not commits.** Transform messy Git history into meaningful engineering chronicles.

> **"Commits should tell the story of your project development"**

An AI skill that teaches clean Git workflows through structured rules for atomic commits, conventional messages, and timeline control.

## 🚀 Quick Install

**Via Skills.sh Marketplace:**

```bash
npx skills add the-khiem7/chronicle-composer
```

**Supported Agents:**

- GitHub Copilot
- Claude Code
- Cursor
- Roo Code
- Kilo Code
- And 20+ more AI coding clients

**Manual Install:**

```bash
# For Claude Code
cp -r skills/chronicle-composer ~/.claude/skills/

# For other agents (adjust path accordingly)
cp -r skills/chronicle-composer ~/.{agent-name}/skills/
```

## 📖 What It Does

**Problem:** In many projects, developers create large commits that mix multiple business flows, features, bug fixes, refactors, and configuration changes together. This makes Git history difficult to read, review, revert, and understand.

**Solution:** Chronicle Composer defines a workflow where commits are structured, logical, atomic, and meaningful. Instead of treating Git commits as file snapshots, this system treats commits as **documentation of engineering decisions** that tells the story of your project development.

### Before (Messy History)

```
update project
fix bugs
many changes
add feature
```

### After (Clean Chronicle)

```
feat(parser): add email parsing module
fix(auth): handle expired token validation
refactor(repository): simplify user query logic
docs(readme): update setup instructions
```

**Result:** Git history becomes readable engineering documentation that shows how your project evolved.

## 🛠️ Quick Start Guide

### 1. Analyze Your Changes

```bash
git status
git diff
```

### 2. Identify Logical Changes

Group changes by business logic, not files:

- Feature implementation
- Bug fixes
- Refactoring
- Configuration changes
- Documentation updates

### 3. Stage Selectively

Use hunk staging instead of committing entire files:

```bash
git add -p src/feature.js  # Interactive hunk selection
```

### 4. Write Conventional Commits

```bash
git commit -m "feat(auth): add JWT token validation

Implement JWT authentication with token refresh
Add validation for expired tokens"
```

### 5. Control Timeline (Optional)

For chronological accuracy:

```bash
git cdate "2026-03-26 14:30:00" "feat: implement user authentication"
```

## 📋 Core Rules

| Category               | Priority | Key Rules                                 |
| ---------------------- | -------- | ----------------------------------------- |
| **Commit Analysis**    | HIGH     | Avoid meteor commits, analyze diffs first |
| **Staging Strategy**   | HIGH     | Stage hunks not files, atomic changes     |
| **Commit Convention**  | HIGH     | Use `type(scope): description` format     |
| **Timeline Control**   | MEDIUM   | Use `git cdate` for chronological order   |
| **History Management** | MEDIUM   | Maintain clean, readable project story    |

## 📚 Detailed Documentation

### Commit Message Convention

**Format:** `type(scope): short description`

**Examples:**

- `feat(auth): add user login` - New authentication feature
- `fix(parser): handle null input` - Bug fix in parser
- `refactor(db): simplify queries` - Database refactoring
- `docs(readme): update installation` - Documentation update

### Git Workflow

1. **Make changes** - Implement features/fixes
2. **Check status** - `git status`
3. **Analyze diffs** - `git diff` to understand changes
4. **Identify logical groups** - Group by business flow/feature
5. **Stage selectively** - Use `git add -p` for hunks
6. **Commit with convention** - Use proper message format
7. **Set timeline** - Use `git cdate` for chronological order
8. **Review history** - `git lga` to verify timeline

### PowerShell Setup (Windows)

Create `git-cdate.ps1` and `git-adate.ps1` scripts for timeline control:

```powershell
# git-cdate.ps1
param([string]$date, [string]$message)
$env:GIT_AUTHOR_DATE = $date
$env:GIT_COMMITTER_DATE = $date
git commit -m $message
```

Add to Git config:

```bash
git config --global alias.cdate '!powershell -NoProfile -ExecutionPolicy Bypass -File C:/path/to/git-cdate.ps1'
```

## 🏗️ Development

### Prerequisites

- Node.js 18+
- Git repository
- PowerShell (Windows timeline control)

### Build Commands

```bash
npm install          # Install dependencies
npm run validate     # Validate skill structure
npm run build        # Build skill artifacts
npm run lint         # Check formatting
npm run regression   # Run regression tests
```

### Version Management

```bash
npm run version:bump patch  # Bump patch version
npm run release             # Prepare release
```

### Project Structure

```
chronicle-composer/
├── skills/chronicle-composer/     # Skill definition
│   ├── SKILL.md                   # AI instructions
│   ├── metadata.json              # Skill metadata
│   └── rules/                     # 43 Git workflow rules
├── packages/chronicle-composer-build/  # Build system
└── dist/                          # Release artifacts
```

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on:

- Adding new Git workflow rules
- Code formatting and quality standards
- Pull request process

## 📄 License

MIT License - see repository for details.

---

**Chronicle Composer** - Transform messy commits into meaningful engineering chronicles. 🚀
