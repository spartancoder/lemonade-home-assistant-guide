# Pitfalls Research

**Domain:** GitHub Pages tutorial/documentation sites
**Researched:** 2025-03-04
**Confidence:** MEDIUM

## Critical Pitfalls

### Pitfall 1: Plugin Whitelist Violations

**What goes wrong:**
Using Jekyll plugins that are not in GitHub Pages' supported whitelist causes immediate build failures with cryptic error messages. The site won't deploy, and the GitHub Actions/build log shows "Plugin not whitelisted" errors.

**Why it happens:**
Developers assume all Jekyll plugins work on GitHub Pages, but GitHub maintains a security-restricted build environment with only ~20 whitelisted plugins. Adding unsupported plugins to `_config.yml` or Gemfile triggers failures.

**How to avoid:**
- Check the official GitHub Pages plugin whitelist before adding any plugin
- Only use whitelisted plugins: `jekyll-coffeescript`, `jekyll-default-layout`, `jekyll-gist`, `jekyll-github-metadata`, `jekyll-optional-front-matter`, `jekyll-paginate`, `jekyll-readme-index`, `jekyll-titles-from-headings`, `jekyll-relative-links`, `jekyll-feed`, `jekyll-seo-tag`, `jekyll-redirect-from`, `jekyll-sitemap`
- For non-whitelisted plugins, build locally and push static files instead of letting GitHub Pages build

**Warning signs:**
- Build log shows "Plugin not whitelisted" error
- Local `jekyll build` works but GitHub Pages build fails
- Site builds locally but shows 404 on GitHub Pages after push

**Phase to address:**
Phase 1 (Site Setup) - Configure Jekyll with only whitelisted plugins before writing any content

---

### Pitfall 2: Baseurl Configuration Mismatches

**What goes wrong:**
Links work locally but break in production (or vice versa) because `baseurl` is misconfigured. Images, CSS, and navigation links show 404 errors when deployed.

**Why it happens:**
`baseurl` in `_config.yml` affects how Jekyll generates URLs. When set incorrectly (e.g., to a repository name when using user/organization pages), all `{{ site.baseurl }}` references produce wrong paths. Developers test locally with `--baseurl=""` but forget production has different baseurl.

**How to avoid:**
- For user/organization pages (`username.github.io`), set `baseurl: ""` (empty string)
- For project pages (`username.github.io/project-name`), set `baseurl: "/project-name"`
- Always use `{{ site.baseurl }}` prefix in links and resource paths: `{{ site.baseurl }}/assets/css/style.css`
- Test locally with `bundle exec jekyll serve --baseurl=""` to simulate production URL structure
- Check browser DevTools Network tab for 404s after deployment

**Warning signs:**
- Page loads but has broken styling/layout (CSS not loading)
- Images show alt text but don't display
- Navigation links go to 404 pages
- Console shows 404 errors for assets with paths like `/lemonade-guide/assets/...` when baseurl should be empty

**Phase to address:**
Phase 1 (Site Setup) - Configure `baseurl` correctly before creating any pages or resources

---

### Pitfall 3: Absolute vs Relative Path Confusion

**What goes wrong:**
Static resources (images, CSS, JS) fail to load, causing broken layouts or missing content. This is especially common when moving pages between directories.

**Why it happens:**
Developers use absolute paths starting with `/` (e.g., `/assets/img/logo.png`) which work on the site root but break when pages are in subdirectories. Or they use relative paths incorrectly (e.g., `../assets/` from wrong nesting level). GitHub Pages' URL structure amplifies this issue.

**How to avoid:**
- Always use `{{ site.baseurl }}/path/to/file` for resources in Jekyll templates
- For images in Markdown: `![alt]({{ site.baseurl }}/assets/img/file.png)`
- For HTML files: `<img src="{{ site.baseurl }}/assets/img/file.png">`
- Never hardcode repository paths like `/lemonade-guide/...` in source code
- Verify all asset paths by checking Network tab in DevTools after deployment
- Use browser DevTools → Console to catch 404 errors on page load

**Warning signs:**
- Console shows 404 errors for .css, .js, or image files
- Images appear as broken icons or show alt text only
- Styling is completely missing (unstyled HTML)
- Path in 404 error includes incorrect prefix (e.g., `/WangJwi/assets/...` when baseurl is empty)

**Phase to address:**
Phase 1 (Site Setup) - Establish path conventions before adding content
Phase 3 (Content Development) - Verify all links after each content addition

---

### Pitfall 4: Missing or Incorrect YAML Front Matter

**What goes wrong:**
Markdown files are not processed by Jekyll, appearing as raw Markdown or 404 errors. Files that should be pages or posts are ignored entirely.

**Why it happens:**
Jekyll requires YAML front matter (the `---` delimited section at file top) to process files. Without it, files are served as-is or skipped. Common errors: missing dashes, incorrect indentation, or forgetting front matter entirely on new files.

**How to avoid:**
- Every Markdown file that should be a page must start with:
  ```yaml
  ---
  title: Page Title
  layout: default
  ---
  ```
- Front matter must be exactly `---` on its own line (no extra spaces)
- Use YAML linter or validate with `jekyll build --verbose`
- Front matter must include at minimum: `title` and `layout`
- Check that YAML indentation uses spaces, not tabs

**Warning signs:**
- Markdown renders as raw text instead of HTML
- File shows 404 when accessed
- `jekyll build` output doesn't list the file in generated pages
- Page exists in repo but not in `_site/` after build

**Phase to address:**
Phase 2 (Content Structure) - Define front matter templates for all content types

---

### Pitfall 5: Missing .nojekyll File for Static Assets

**What goes wrong:**
Static assets in directories starting with `_` (e.g., `_assets/`, `_static/`) are ignored by GitHub Pages, causing 404 errors for those files even though they exist in the repository.

**Why it happens:**
GitHub Pages uses Jekyll by default, which ignores files/directories starting with `_` (except `_posts`, `_layouts`, etc.). Developers using static site generators or custom directory structures don't know about this Jekyll behavior.

**How to avoid:**
- Create an empty `.nojekyll` file in repository root directory
- `.nojekyll` tells GitHub Pages to skip Jekyll processing entirely
- This is critical if using assets in `_assets/`, `_static/`, or other `_` prefixed directories
- Even with Jekyll, `.nojekyll` ensures no accidental file exclusion
- Commit `.nojekyll` before first deployment

**Warning signs:**
- Assets in `_` directories work locally but 404 on GitHub Pages
- Files exist in repo but don't appear in deployed site
- Network tab shows 404 for paths like `/_assets/...`

**Phase to address:**
Phase 1 (Site Setup) - Create `.nojekyll` file immediately after initializing repository

---

### Pitfall 6: Incorrect GitHub Pages Deployment Configuration

**What goes wrong:**
Site shows 404 or "Page not found" despite successful commits. The repository exists but GitHub Pages isn't serving content.

**Why it happens:**
GitHub Pages deployment settings (branch, folder, source) are misconfigured. Common mistakes: deploying from wrong branch, deploying from subdirectory that doesn't exist, or using GitHub Actions when branch deployment is intended.

**How to avoid:**
- Go to repository Settings → Pages → Build and deployment
- For simple Jekyll sites: Source = "Deploy from a branch", Branch = "main" (or default branch), Folder = "/ (root)"
- For docs in subdirectory: Source = "Deploy from a branch", Folder = "/docs"
- Verify the selected branch actually exists and has commits
- Check "Your site is published at..." message in Pages settings
- Wait 1-2 minutes after push before checking deployment

**Warning signs:**
- Repository Settings → Pages shows "Page not found" or no deployment URL
- Push succeeds but site URL doesn't update
- GitHub Pages build log shows no recent builds
- "Build and deployment" section shows "None" as source

**Phase to address:**
Phase 1 (Site Setup) - Configure deployment before any content creation

---

### Pitfall 7: Tutorial Content Staleness (Outdated Code Examples)

**What goes wrong:**
Code examples, commands, and configuration become obsolete as upstream projects (Home Assistant, Lemonade, AI models) update. Users following the tutorial encounter errors because documented versions no longer exist or have changed syntax.

**Why it happens:**
Tutorial content is written once and rarely updated. When dependencies update (Home Assistant releases new version, model files change URLs, Linux packages change names), tutorial instructions break. This is especially problematic for AI/ML projects with rapid iteration.

**How to avoid:**
- Pin specific versions in instructions (e.g., `homeassistant==2024.12.0`, not "latest version")
- Include version numbers in all URLs and installation commands
- Add "Last tested with:" sections for each major component
- Use automated link checking in CI/CD (markdown-link-check GitHub Action)
- Create checksum/SHA256 hashes for model downloads
- Document known breaking changes and version compatibility
- Schedule quarterly review of external links and commands

**Warning signs:**
- Users report that commands fail or outputs don't match tutorial
- External links redirect or show 404
- Package managers report "package not found" errors
- Configuration files have deprecated options

**Phase to address:**
Phase 2 (Content Structure) - Design versioning strategy before writing content
Phase 4 (Testing) - Validate all commands work against pinned versions

---

### Pitfall 8: Broken External Links (Link Rot)

**What goes wrong:**
External references (documentation links, model download URLs, Home Assistant guides) break over time as external sites restructure or go offline. Tutorial becomes unusable even though the GitHub Pages site itself works.

**Why it happens:**
Tutorials rely on external URLs that authors don't control. External sites change URLs, remove content, or shut down. Without automated checking, these broken links accumulate.

**How to avoid:**
- Add GitHub Action `markdown-link-check` to validate links on every push
- Use `gaurav-nelson/github-action-markdown-link-check@v1` with config
- Exclude links known to change in `.github/workflows/checklink_config.json`
- Mirror critical resources locally when possible (e.g., model files, scripts)
- Use Wayback Machine or Archive.org links for potentially unstable content
- Add "link last verified" dates for critical external references
- Prefer official documentation over blog posts or forum threads

**Warning signs:**
- CI/CD link check fails with 404 errors
- Users report broken tutorial links
- External links redirect to unrelated content

**Phase to address:**
Phase 1 (Site Setup) - Add link-checking workflow to CI/CD
Phase 3 (Content Development) - Run link check before each content milestone

---

### Pitfall 9: GitHub Pages Cache Issues

**What goes wrong:**
Users don't see updates after deployment. Content is stale even though repository shows latest commits. Developers think deployment failed when it's actually a cache problem.

**Why it happens:**
GitHub Pages and CDNs cache aggressively for performance. After deployment, old content may be served for minutes to hours. Developers push changes, check immediately, see old content, and panic.

**How to avoid:**
- Inform users that updates may take 1-3 minutes to appear
- Add `?t=TIMESTAMP` to force cache refresh during testing (not in production)
- Use GitHub Actions to deploy and check deployment status
- Don't push frequent updates expecting instant visibility
- Advise users to hard refresh (Ctrl+Shift+R) if content seems stale
- Monitor GitHub Pages deployment logs, not just website URL

**Warning signs:**
- Deployment succeeds in logs but website shows old content
- Changes visible in GitHub but not on GitHub Pages URL
- Different browsers show different versions

**Phase to address:**
Phase 4 (Deployment) - Document expected deployment delay and cache behavior

---

### Pitfall 10: File Size Limit Exceeded

**What goes wrong:**
Deployment fails with "File too large" errors. Repository becomes unusable for GitHub Pages. Common with AI model files or large images.

**Why it happens:**
GitHub Pages has strict limits: single file max 100MB, repository max 1GB. Tutorials for AI/voice assistants often include model files that exceed these limits (models are often 1-4GB each).

**How to avoid:**
- Never commit large model files or binary assets to the repository
- Store large files in Git LFS (Large File Storage) or external hosting
- Link to model downloads instead of including them
- Use GitHub Releases for distributing large files
- Optimize images before committing (use tinypng, imageopt)
- Check repository size with: `du -sh .` and monitor approach to 1GB limit
- Add `.gitattributes` for Git LFS if needed: `*.gguf filter=lfs diff=lfs merge=lfs -text`

**Warning signs:**
- `git push` fails with "refusing to update" or file size error
- GitHub shows repository size approaching 1GB
- Deployment fails with file size error in logs

**Phase to address:**
Phase 1 (Site Setup) - Configure Git LFS and establish file storage policy before adding content
Phase 3 (Content Development) - Review file sizes before committing each section

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Use "latest" versions in commands | Faster to write, fewer updates | Tutorial breaks unpredictably, impossible to reproduce user issues | NEVER - always pin specific versions |
| Hardcode repository paths | Links work immediately | Break if repository renamed or moved, prevents forking | NEVER - use `site.baseurl` or `site.github.url` |
| Skip link checking | Faster deployment, no CI failures | Accumulating broken links, poor user experience | ONLY in initial development, must add before first real deployment |
| Commit large files locally | Easier testing, no external deps | Repo size bloat, deployment failures, slow clones | NEVER - use Git LFS or external storage |
| Copy-paste commands from blog posts | Quick reference | Blogs disappear faster than docs, outdated info | ONLY if official docs unavailable and archived copy added |
| Skip version testing | Faster tutorial creation | Users hit errors, tutorial loses credibility | NEVER - must test all commands in fresh environment |

## Integration Gotchas

Common mistakes when connecting to external services.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Home Assistant | Use generic "latest version" | Pin to specific version: `homeassistant==2024.12.0` |
| AI model downloads | Direct links to model repos | Use versioned URLs with checksums, mirror critical files |
| GitHub Actions | Use old Node.js 16 environment | Use `actions/setup-node@v4` with Node.js 20 (EOL Node versions break builds) |
| Custom domains | Add CNAME without DNS setup | Verify DNS propagation and HTTPS certificate before adding CNAME |
| peaceiris/actions-gh-pages | Wrong `publish_dir` path | Set to actual build output: `./_site` for Jekyll, `./public` for Hugo |

## Performance Traps

Patterns that work at small scale but fail as usage grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Many large images in Markdown | Slow page loads, bandwidth waste | Optimize images, use lazy loading, CDN for assets | After ~50 images or 10MB total per page |
| Unoptimized code blocks | Slow syntax highlighting, poor mobile UX | Use Rouge (built-in), limit code block length, minimize examples | After ~20 code blocks per page |
| No asset caching | Every visit re-downloads assets | GitHub Pages caches automatically; use long cache headers for static assets | Not an issue for GitHub Pages (handled automatically) |
| No responsive images | Mobile users load full-size images | Use `srcset`, WebP format, multiple resolutions | At ~1000 concurrent visitors |

## Security Mistakes

Domain-specific security issues beyond general web security.

| Mistake | Risk | Prevention |
|---------|------|------------|
| Exposing API keys or secrets in tutorial code | Keys compromised, account abuse | Use placeholder values, document where to get keys, add secrets to .gitignore |
| Suggesting `chmod 777` for permission fixes | Security hole, any user can modify | Use specific permissions: `chmod 755`, proper user/group ownership |
| Telling users to run as root | Accidental system damage | Use `sudo` only when necessary, warn about risks |
| Hardcoding passwords in config files | Credentials in version control | Use environment variables, document `.env` setup |
| Using insecure HTTP for downloads | Man-in-the-middle attacks | Use HTTPS with certificate validation, verify checksums |

## UX Pitfalls

Common user experience mistakes in this domain.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| No table of contents | Users can't navigate long tutorials | Add auto-generated TOC with `jekyll-toc` plugin |
| Missing "What you'll learn" | Unclear scope, wrong expectations | List objectives and prerequisites upfront |
| No progress indicators | Users don't know how far along they are | Add section headers with estimated time |
| Giant code blocks | Overwhelming, hard to copy | Break into smaller chunks, add copy buttons |
| No error recovery instructions | Users get stuck at first error | Add "What to do if this fails" sections for each step |
| Assuming Linux expertise | Beginners can't complete tutorial | Explain commands, add "Why" notes for non-obvious steps |
| No troubleshooting section | Users abandon when errors occur | Despite "no troubleshooting in v1" constraint, add minimal error recovery |

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **External links:** Often broken after 6 months — verify with automated link checking in CI/CD
- [ ] **Code examples:** Often fail with new dependency versions — pin specific versions, test quarterly
- [ ] **Image paths:** Often use absolute paths that break on deployment — use `{{ site.baseurl }}`, verify with DevTools
- [ ] **Deployment settings:** Often misconfigured branch/folder — verify deployment actually serves content, not just "configured"
- [ ] **Plugin compatibility:** Often uses non-whitelisted plugins — check GitHub Pages plugin list before deployment
- [ ] **File sizes:** Often exceed 100MB per file or 1GB repo total — run `du -sh .` before major commits
- [ ] **Baseurl mismatch:** Often set incorrectly for user vs project pages — verify links work in both local (`--baseurl=""`) and production

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Plugin whitelist violation | LOW | Remove unsupported plugin from `_config.yml`, commit, wait for rebuild |
| Baseurl misconfiguration | LOW | Update `_config.yml`, test locally with `--baseurl=""`, commit and redeploy |
| Broken image paths | LOW | Update all paths to use `{{ site.baseurl }}`, run `grep -r 'src="/'` to find absolute paths |
| Missing front matter | LOW | Add YAML front matter to affected files, rebuild locally first |
| Missing .nojekyll file | LOW | `touch .nojekyll`, commit, push |
| Wrong deployment branch | LOW | Update Pages settings, verify branch exists, wait 2-3 minutes |
| Outdated code examples | HIGH | Audit all external links and commands, test each in fresh environment, update with pinned versions |
| Broken external links | MEDIUM | Update URLs or add link to Archive.org snapshot, run link checker to verify |
| Cache issues | LOW | Wait 5-10 minutes, hard refresh browser, verify deployment logs show success |
| File size exceeded | HIGH | Remove large files from git history with `git filter-repo`, add to Git LFS, or move to external storage |

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Plugin whitelist violations | Phase 1 (Site Setup) | Verify all plugins in whitelist at https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll |
| Baseurl misconfiguration | Phase 1 (Site Setup) | Test links locally with `--baseurl=""`, verify deployment works, check DevTools Network tab for 404s |
| Absolute vs relative path confusion | Phase 1 (Site Setup) + Phase 3 (Content Dev) | Run `grep -r 'src="/'` to find absolute paths, verify all assets use `{{ site.baseurl }}` |
| Missing YAML front matter | Phase 2 (Content Structure) | Run `jekyll build --verbose` to verify all Markdown files are processed |
| Missing .nojekyll file | Phase 1 (Site Setup) | Check repository root for `.nojekyll`, verify assets in `_` directories load |
| Incorrect deployment configuration | Phase 1 (Site Setup) | Verify Pages settings show deployment URL and recent build success |
| Tutorial content staleness | Phase 2 (Content Structure) + Phase 4 (Testing) | Add version numbers to all commands, test in fresh Debian environment quarterly |
| Broken external links | Phase 1 (Site Setup) + Phase 3 (Content Dev) | Run `markdown-link-check` GitHub Action on every PR, fix before merge |
| GitHub Pages cache issues | Phase 4 (Deployment) | Document 1-3 minute deployment delay, verify deployment logs before declaring success |
| File size limit exceeded | Phase 1 (Site Setup) + Phase 3 (Content Dev) | Run `du -sh .` after each section, add large files to Git LFS or external storage |

## Sources

- GitHub Pages official documentation: https://docs.github.com/en/pages
- GitHub Pages plugin whitelist: https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll
- Jekyll baseurl issues discussion: https://blog.csdn.net/gitblog_01021/article/details/154920801 (2025)
- GitHub Pages deployment guide: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- markdown-link-check GitHub Action: https://github.com/gaurav-nelson/github-action-markdown-link-check
- Node.js 16 EOL impact: https://ask.csdn.net/questions/9252561 (2025-02-02)
- GitHub Actions deployment: https://docs.github.com/en/pages/deploying-github-pages-with-github-actions
- Static site path issues: https://m.php.cn/faq/2158699.html (2025)
- GitHub Pages file size limits: Official docs (100MB per file, 1GB total)
- Git LFS documentation: https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-git-large-file-storage
- Peaceiris actions-gh-pages: https://github.com/peaceiris/actions-gh-pages

---
*Pitfalls research for: GitHub Pages tutorial sites*
*Researched: 2025-03-04*
