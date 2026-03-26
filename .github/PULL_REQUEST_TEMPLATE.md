# Pull Request Template for Chronicle Composer

## 📝 Description

Brief description of the changes in this PR.

## 🎯 Type of Change

- [ ] 🆕 **New Rule**: Adding a new Git workflow rule
- [ ] 🔧 **Rule Update**: Modifying existing rule content
- [ ] 🛠️ **Build System**: Changes to build/validation scripts
- [ ] 📚 **Documentation**: README, CHANGELOG updates
- [ ] 🔒 **Security**: Security-related changes
- [ ] 🐛 **Bug Fix**: Fixing build/validation issues
- [ ] 🎨 **Style**: Code formatting, linting changes

## 📋 Checklist

### For Rule Changes

- [ ] **Format Compliance**: Rule follows established markdown + frontmatter format
- [ ] **Naming Convention**: Filename matches `{category}-{kebab-case}.md` pattern
- [ ] **Frontmatter Complete**: `title`, `impact`, `tags` are properly set
- [ ] **Content Quality**: Rule provides clear, actionable guidance
- [ ] **Examples Present**: Both "Incorrect" and "Correct" examples included
- [ ] **Impact Level**: `HIGH`, `MEDIUM`, or `LOW` appropriately assigned
- [ ] **References**: Links to relevant documentation/best practices

### For Code Changes

- [ ] **Validation Passes**: `npm run validate` succeeds
- [ ] **Build Succeeds**: `npm run build` completes without errors
- [ ] **Linting Clean**: `npm run lint` passes
- [ ] **Regression Tests**: `npm run regression` passes
- [ ] **No Breaking Changes**: Existing functionality preserved

### General

- [ ] **Commit Convention**: All commits follow conventional format
- [ ] **Documentation Updated**: README/CHANGELOG updated if needed
- [ ] **Tested Locally**: Changes work in local development
- [ ] **Security Review**: No security vulnerabilities introduced

## 🧪 Testing

### Local Testing Performed

- [ ] `npm run validate`
- [ ] `npm run build`
- [ ] `npm run lint`
- [ ] `npm run regression`

### Manual Testing

- [ ] Rule content renders correctly in AGENTS.md
- [ ] Skill can be installed via Skills.sh
- [ ] No breaking changes to existing rules

## 📚 References

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Skills.sh Documentation](https://skills.sh/)
- [Project README](../README.md)

## 🔍 Review Notes

Any specific areas you'd like reviewers to focus on?

---

**By submitting this PR, I confirm that:**

- [ ] My changes follow the project's contribution guidelines
- [ ] I have tested my changes locally
- [ ] I have updated documentation as needed
- [ ] This PR is ready for review
