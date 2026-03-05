# Stack Research

**Domain:** GitHub Pages tutorial/documentation site
**Researched:** 2025-03-04
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Jekyll | 3.10.0 (GitHub Pages) | Static site generator with built-in GitHub Pages support | GitHub Pages native integration, zero config needed, official support, proven reliability. Alternatives (Hugo, Hexo) not officially supported on GitHub Pages. |
| GitHub Pages | (latest) | Free static site hosting | Native hosting for Jekyll sites, automatic deployment via git push, HTTPS included, custom domain support. |
| Ruby | 3.3.4 (GitHub Pages) | Runtime for Jekyll | Required by Jekyll and github-pages gem. GitHub Pages pins version for consistency. |
| Rouge | 3.30.0 | Syntax highlighting for code blocks | GitHub Pages default, matches GitHub's highlighting, supports 100+ languages including Python, Bash, YAML. |

### Theme

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Minima | 2.5.1 (gem-based) | Jekyll's default theme | Official GitHub Pages supported theme, designed for writers/documentation, minimal setup, zero configuration. 5 built-in skins (classic, dark, auto, solarized). |
| jekyll-remote-theme | 0.4.3 (optional) | Load remote Jekyll themes | For using community themes not officially supported. Enables GitHub Pages to use any theme from GitHub via `remote_theme` config. |

### Markdown Processor

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| kramdown | 2.4.0 | Markdown to HTML converter | GitHub Pages default, supports GitHub Flavored Markdown (GFM), table of contents, math via MathJax, footnotes. |
| kramdown-parser-gfm | 1.1.0 | GFM dialect parser | GitHub Flavored Markdown support, tables, task lists, strikethrough, autolinks. |

### Optional Plugins (Add When Needed)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| jekyll-feed | 0.17.0 | Generate Atom/RSS feed | When you want site syndication (blog format) |
| jekyll-seo-tag | 2.8.0 | SEO meta tags | When SEO optimization is important (search engines, social sharing) |
| jekyll-redirect-from | 0.16.0 | Redirect old URLs | When migrating existing content, need 301 redirects |
| jemoji | 0.13.0 | GitHub-flavored emoji | When using emoji in content beyond basic Unicode |

## Installation

```bash
# Core (GitHub Pages compatible)
gem install jekyll bundler

# Or use Gemfile for version consistency
echo 'source "https://rubygems.org"' > Gemfile
echo 'gem "github-pages", group: :jekyll_plugins' >> Gemfile
echo 'gem "jekyll", "~> 3.10"' >> Gemfile
echo 'gem "minima", "~> 2.5"' >> Gemfile

bundle install

# Optional: remote theme for community themes
echo 'gem "jekyll-remote-theme", "~> 0.4"' >> Gemfile
```

## Configuration

**_config.yml (minimal starter):**
```yaml
# GitHub Pages required
title: "Lemonade Home Assistant Guide"
description: "Complete guide to local, privacy-focused voice assistant with Lemonade Server and Home Assistant"
baseurl: "/lemonade-home-assistant-guide"

# Theme (Minima - default)
theme: minima

# Or use remote theme for community themes
# remote_theme: jekyll/minima

# Markdown
markdown: kramdown
highlighter: rouge

# Minima theme options (optional)
minima:
  # Skin: classic, dark, auto, solarized, solarized-light, solarized-dark
  skin: classic
  # Show excerpts on home page
  show_excerpts: false
  # Navigation pages order
  nav_pages:
    - index.md
    - installation.md
    - configuration.md

# Plugins (GitHub Pages whitelisted)
plugins:
  - jekyll-seo-tag
  - jekyll-feed
```

## Deployment Options

| Method | When to Use | How to Configure |
|---------|--------------|------------------|
| Branch deployment (default) | Simple projects, no custom build | Set GitHub Pages source to main branch or docs folder |
| GitHub Actions (recommended) | Custom build process, non-Jekyll sites, automated workflows | Create `.github/workflows/pages.yml` workflow file |

**GitHub Actions example (for custom builds):**
```yaml
name: Build and Deploy
on:
  push:
    branches: [ main ]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.3'
          bundler-cache: true
      - run: bundle install
      - run: bundle exec jekyll build
      - uses: actions/upload-pages-artifact@v3
      - uses: actions/deploy-pages@v4
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Jekyll (official) | Hugo | For larger sites with thousands of pages; Hugo is faster (Go-based) but requires local build, GitHub Actions deployment only |
| Jekyll (official) | Hexo | For JavaScript-heavy sites with npm ecosystem; Hexo uses Node.js but not officially supported on GitHub Pages (requires Actions deployment) |
| Jekyll (official) | Astro | For modern React/Vue component sites; Astro supports multiple frameworks but overkill for simple tutorial site |
| Minima theme | Jekyll Just-the-docs | For API documentation sites; Just-the-docs has search but requires manual theme setup |
| Minima theme | Beautiful Jekyll | For blog-style content; Beautiful Jekyll is excellent but has more features than needed for tutorial |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| jekyll-sitemap plugin | GitHub Pages automatically generates sitemap.xml at /sitemap.xml | Remove from plugins if listed; rely on GitHub Pages auto-generation |
| Pygments highlighter | Deprecated, not supported by GitHub Pages | Use Rouge (default) or remove highlighter config entirely |
| Custom syntax highlighters (highlight.js, prism.js) | Requires disabling Jekyll's highlighting, manual CSS management | Use Rouge (built-in) with `rougify style github > style.css` for GitHub-style highlighting |
| Node.js-based static generators (Hexo, Gatsby) | Not officially supported on GitHub Pages, requires Actions deployment, complex setup | Use Jekyll (native) or Hugo (with Actions) if performance is critical |
| Windows Ruby installer for Ruby | Jekyll not officially supported on Windows, troubleshooting difficult | Use WSL2 on Windows, or dev on macOS/Linux; RubyInstaller+DevKit can work but unsupported |
| Direct HTML/CSS without Jekyll | Lose Markdown processing, Liquid templates, easy maintenance | Use Jekyll for content in Markdown with Liquid for layouts/templates |
| Bundler without Gemfile.lock | Dependency versions can change between local and GitHub Pages | Always commit Gemfile.lock; GitHub Pages uses bundler for consistent builds |

## Stack Patterns by Variant

**If building simple tutorial with minimal configuration:**
- Use Minima theme (gem-based)
- Because: Zero setup, official support, built-in skins, code highlighting included

**If using community theme or advanced customization:**
- Use jekyll-remote-theme plugin
- Because: Loads any GitHub-hosted theme, supports updates via git ref, easier than copying theme files

**If performance critical (500+ pages):**
- Consider Hugo with GitHub Actions
- Because: Go-based, faster build times; requires Actions deployment and local preview

**If project has JavaScript ecosystem needs:**
- Use Jekyll with npm-based tools
- Because: Jekyll handles site generation, npm can manage CSS/JS assets; keeps GitHub Pages simplicity

**If building locally on Windows:**
- Use WSL2 + Ruby
- Because: Jekyll not officially supported on Windows; WSL2 provides Linux environment without dual-boot

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| jekyll 3.10.0 (GitHub Pages) | Ruby 2.7+ | GitHub Pages pins Jekyll version for consistency |
| github-pages gem 232 | Jekyll 3.10.0 | Use bundler with `gem "github-pages", group: :jekyll_plugins` |
| minima 2.5.1 | Jekyll 3.9+ | Minima 3.0 in development (non-backwards-compatible); pin to v2.5.1 for stability |
| jekyll-remote-theme 0.4.3 | Jekyll 3.0+ | Requires plugin configuration in _config.yml |
| Rouge 3.30.0 | Jekyll 2.0+ | GitHub Pages default; supports 100+ languages |
| kramdown 2.4.0 | Ruby 2.5+ | GitHub Pages default Markdown processor |

## Recommended Directory Structure

```
lemonade-home-assistant-guide/
├── _config.yml          # Jekyll configuration
├── Gemfile              # Ruby dependencies
├── Gemfile.lock         # Lock file (commit this!)
├── _posts/              # Blog posts (if needed)
├── _pages/              # Tutorial pages (custom collection)
│   ├── 01-introduction.md
│   ├── 02-installation.md
│   └── ...
├── _includes/           # Override theme includes
├── _layouts/            # Override theme layouts
├── _sass/               # Custom styles
├── assets/              # Images, CSS, JS
│   ├── css/
│   ├── images/
│   └── js/
├── index.md             # Landing page
└── README.md            # GitHub repo description
```

## Sources

- pages.github.com/versions.json — Verified GitHub Pages dependency versions (Jekyll 3.10.0, Ruby 3.3.4, Minima 2.5.1, Rouge 3.30.0)
- docs.github.com/en/pages/about-github-pages-and-jekyll — Official GitHub Pages documentation on Jekyll support, configuration, and plugins
- jekyllrb.com/docs/themes — Jekyll theme documentation on gem-based themes, overrides, and customization
- github.com/jekyll/minima — Minima theme repository documentation on features, skins, and customization options
- docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/adding-a-theme — Theme configuration for GitHub Pages

---
*Stack research for: GitHub Pages tutorial site*
*Researched: 2025-03-04*
```
