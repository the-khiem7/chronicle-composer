# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.1] - 2026-03-26

### Added
- **Initial Release**: Chronicle Composer skill for AI coding agents
- **Rule-Based Architecture**: Modular rule system with 5 core rules for Git workflow
  - Commit Analysis (HIGH): Avoid meteor commits
  - Staging Strategy (HIGH): Stage hunks, not entire files
  - Commit Convention (HIGH): Structured commit messages
  - Timeline Control (MEDIUM): Custom commit dates with cdate/adate
  - History Management (MEDIUM): Clean Git workflow maintenance
- **Progressive Disclosure**: Token-efficient loading for AI agents
- **Skills.sh Integration**: Ready for marketplace distribution
- **Automated Build System**: Node.js build pipeline with validation
- **CI/CD Pipeline**: GitHub Actions with quality gates
- **Version Management**: Semantic versioning with automated changelog

### Features
- Git workflow guidelines for clean commit history
- Atomic commit principles and staging strategies
- Conventional commit message format
- Timeline control with custom commit dates
- PowerShell scripts for Windows date management

### Technical Details
- Built with Node.js build system
- Markdown-based rule definitions with YAML frontmatter
- Automated AGENTS.md compilation from rules
- Skills.sh compatible packaging
- GitHub Actions for CI/CD and releases

### Installation
```bash
npx skills add the-khiem7/chronicle-composer
```

[0.1.1]: https://github.com/the-khiem7/chronicle-composer/releases/tag/v0.1.1