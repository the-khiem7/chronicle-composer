#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

/**
 * Version management for Chronicle Composer skill
 */
class VersionManager {
  constructor() {
    this.skillDir = path.join(__dirname, '../../../skills/chronicle-composer')
    this.rootDir = path.join(__dirname, '../../../')
  }

  /**
   * Get current version from metadata.json
   */
  getCurrentVersion() {
    const metadataPath = path.join(this.skillDir, 'metadata.json')
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'))
    return metadata.version
  }

  /**
   * Validate version consistency across all files
   */
  validateVersions() {
    const currentVersion = this.getCurrentVersion()
    console.log(`🔍 Validating version consistency: ${currentVersion}`)

    const files = [
      {
        path: path.join(this.skillDir, 'metadata.json'),
        getVersion: (content) => JSON.parse(content).version,
      },
      {
        path: path.join(this.skillDir, 'SKILL.md'),
        getVersion: (content) => {
          const lines = content.split('\n')
          const startIndex = lines.findIndex((line) => line.trim() === '---')
          if (startIndex !== -1) {
            const endIndex = lines.findIndex((line, i) => i > startIndex && line.trim() === '---')
            if (endIndex !== -1) {
              const frontmatter = lines.slice(startIndex + 1, endIndex).join('\n')
              const versionMatch = frontmatter.match(/version:\s*['"]?([^'"\s]+)['"]?/)
              return versionMatch ? versionMatch[1] : null
            }
          }
          return null
        },
      },
      {
        path: path.join(this.rootDir, 'package.json'),
        getVersion: (content) => JSON.parse(content).version,
      },
    ]

    let allValid = true
    files.forEach((file) => {
      try {
        const content = fs.readFileSync(file.path, 'utf8')
        const fileVersion = file.getVersion(content)

        if (fileVersion !== currentVersion) {
          console.error(
            `❌ Version mismatch in ${path.relative(this.rootDir, file.path)}: ${fileVersion} (expected: ${currentVersion})`
          )
          allValid = false
        } else {
          console.log(`✅ ${path.relative(this.rootDir, file.path)}: ${fileVersion}`)
        }
      } catch (error) {
        console.error(`❌ Error reading ${file.path}: ${error.message}`)
        console.error('Full error:', error)
        allValid = false
      }
    })

    return allValid
  }

  /**
   * Bump version according to semantic versioning
   * @param {string} type - 'patch', 'minor', or 'major'
   */
  bumpVersion(type) {
    const currentVersion = this.getCurrentVersion()
    console.log(`🔄 Bumping ${type} version from ${currentVersion}`)

    const [major, minor, patch] = currentVersion.split('.').map(Number)
    let newVersion

    switch (type) {
      case 'patch':
        newVersion = `${major}.${minor}.${patch + 1}`
        break
      case 'minor':
        newVersion = `${major}.${minor + 1}.0`
        break
      case 'major':
        newVersion = `${major + 1}.0.0`
        break
      default:
        throw new Error('Invalid bump type. Use: patch, minor, or major')
    }

    console.log(`📈 New version: ${newVersion}`)
    this.setVersion(newVersion)
    return newVersion
  }

  /**
   * Set version across all files
   * @param {string} version - New version to set
   */
  setVersion(version) {
    console.log(`📝 Setting version to ${version} in all files`)

    // Update metadata.json
    const metadataPath = path.join(this.skillDir, 'metadata.json')
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'))
    metadata.version = version
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2))

    // Update SKILL.md frontmatter
    const skillPath = path.join(this.skillDir, 'SKILL.md')
    let skillContent = fs.readFileSync(skillPath, 'utf8')
    skillContent = skillContent.replace(/(version:\s*['"]?)[^'"\s]+(['"]?)/, `$1${version}$2`)
    fs.writeFileSync(skillPath, skillContent)

    // Update package.json
    const packagePath = path.join(this.rootDir, 'package.json')
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'))
    packageJson.version = version
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2))

    console.log('✅ Version updated in all files')
  }

  /**
   * Create git tag for release
   * @param {string} version - Version to tag
   */
  createGitTag(version) {
    const tag = `v${version}`
    console.log(`🏷️ Creating git tag: ${tag}`)

    try {
      execSync(`git add .`, { cwd: this.rootDir })
      execSync(`git commit -m "chore: release v${version}"`, { cwd: this.rootDir })
      execSync(`git tag ${tag}`, { cwd: this.rootDir })
      console.log(`✅ Created tag ${tag}`)
      return tag
    } catch (error) {
      console.error(`❌ Failed to create git tag: ${error.message}`)
      throw error
    }
  }

  /**
   * Generate changelog for version
   * @param {string} version - Version to generate changelog for
   */
  generateChangelog(version) {
    console.log(`📝 Generating changelog for v${version}`)

    try {
      // Get commits since last tag
      const lastTag = execSync('git describe --tags --abbrev=0 2>/dev/null || echo ""', {
        cwd: this.rootDir,
        encoding: 'utf8',
      }).trim()

      let commits
      if (lastTag) {
        commits = execSync(`git log ${lastTag}..HEAD --oneline`, {
          cwd: this.rootDir,
          encoding: 'utf8',
        })
      } else {
        commits = execSync('git log --oneline -10', {
          cwd: this.rootDir,
          encoding: 'utf8',
        })
      }

      const changelog = `## ${version} (${new Date().toISOString().split('T')[0]})

${commits
  .split('\n')
  .map((line) => line.trim())
  .filter((line) => line)
  .map((line) => `- ${line}`)
  .join('\n')}

---
*Generated automatically by version manager*`

      const changelogPath = path.join(this.rootDir, 'CHANGELOG.md')
      let existingContent = ''
      if (fs.existsSync(changelogPath)) {
        existingContent = fs.readFileSync(changelogPath, 'utf8') + '\n\n'
      }
      fs.writeFileSync(changelogPath, changelog + '\n\n' + existingContent)

      console.log(`✅ Changelog generated: CHANGELOG.md`)
      return changelog
    } catch (error) {
      console.error(`❌ Failed to generate changelog: ${error.message}`)
      throw error
    }
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2)
  const command = args[0]
  const vm = new VersionManager()

  try {
    switch (command) {
      case 'validate':
        const valid = vm.validateVersions()
        process.exit(valid ? 0 : 1)
        break

      case 'bump':
        const type = args[1]
        if (!['patch', 'minor', 'major'].includes(type)) {
          console.error('Usage: node version-manager.js bump <patch|minor|major>')
          process.exit(1)
        }
        vm.bumpVersion(type)
        vm.validateVersions()
        break

      case 'set':
        const version = args[1]
        if (!version) {
          console.error('Usage: node version-manager.js set <version>')
          process.exit(1)
        }
        vm.setVersion(version)
        vm.validateVersions()
        break

      case 'release':
        const releaseVersion = args[1] || vm.getCurrentVersion()
        console.log(`🚀 Preparing release v${releaseVersion}`)
        vm.validateVersions()
        vm.generateChangelog(releaseVersion)
        vm.createGitTag(releaseVersion)
        console.log(`✅ Release v${releaseVersion} ready!`)
        break

      default:
        console.log('Usage:')
        console.log('  validate    - Check version consistency')
        console.log('  bump <type> - Bump version (patch/minor/major)')
        console.log('  set <ver>   - Set specific version')
        console.log('  release     - Prepare release with changelog and tag')
        process.exit(1)
    }
  } catch (error) {
    console.error(`❌ Error: ${error.message}`)
    process.exit(1)
  }
}

module.exports = VersionManager
