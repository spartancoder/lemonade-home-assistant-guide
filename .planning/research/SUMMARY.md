# Project Research Summary

**Project:** Lemonade Home Assistant Guide
**Domain:** GitHub Pages Jekyll tutorial site
**Researched:** 2026-03-04
**Confidence:** HIGH

## Executive Summary

This project is a technical tutorial site documenting how to set up a local, privacy-focused voice assistant using Lemonade Server and Home Assistant. Research indicates the optimal approach is a Jekyll-based static site hosted on GitHub Pages, leveraging the official Minima theme for rapid deployment with minimal maintenance. This stack provides zero-config deployment, automatic HTTPS, and native GitHub integration while avoiding the complexity of modern JavaScript frameworks or the limitations of other static generators.

The recommended stack (Jekyll 3.10.0 with GitHub Pages, Minima 2.5.1 theme, Rouge syntax highlighting) prioritizes simplicity and reliability. The architecture uses a tutorial collection pattern with data-driven navigation, ensuring content organization scales naturally. Key risks involve GitHub Pages plugin restrictions (whitelist violations) and path configuration issues (baseurl mismatches), which can be mitigated by strict adherence to whitelist requirements and using `{{ site.baseurl }}` for all asset paths. Content staleness is a significant concern for this domain; pinning specific versions of all dependencies (Home Assistant, AI models, Linux packages) and implementing automated link checking are essential for long-term maintainability.

Based on research, the roadmap should follow a phased approach: Phase 1 establishes site infrastructure with GitHub Pages configuration and basic templates; Phase 2 creates the content structure with tutorial collection setup and navigation systems; Phase 3 develops core tutorial content with code examples and documentation; Phase 4 handles deployment validation, testing, and optimization. This ordering respects technical dependencies (deployment config before content), architectural patterns (navigation structure before content population), and risk mitigation (addressing pitfalls like plugin violations and baseurl issues early). The research shows that most features can be implemented with well-documented patterns, but AI-specific integration points (model downloads, voice assistant configuration) will need deeper investigation during content development phases.

## Key Findings

### Recommended Stack

**Core technologies:**
- **Jekyll 3.10.0** — Static site generator with native GitHub Pages integration; zero configuration, proven reliability, official support. Alternative generators (Hugo, Hexo) not officially supported.
- **GitHub Pages** — Free static site hosting with automatic deployment via git push; HTTPS included, custom domain support, automatic CDN.
- **Minima 2.5.1** — Official GitHub Pages supported theme; designed for documentation, minimal setup, 5 built-in skins (classic, dark, auto, solarized).
- **Rouge 3.30.0** — Syntax highlighting for code blocks; GitHub Pages default, matches GitHub's highlighting, supports 100+ languages.
- **kramdown 2.4.0** — Markdown to HTML converter; GitHub Pages default, supports GitHub Flavored Markdown (GFM), tables, task lists.

**Optional plugins (add when needed):**
- jekyll-seo-tag (SEO meta tags)
- jekyll-feed (RSS/Atom feed)
- jekyll-redirect-from (URL redirects)

### Expected Features

**Must have (table stakes — users expect these):**
- Clear navigation structure — Users expect to find content quickly without hunting
- Code syntax highlighting — Technical tutorials have code; highlighting is standard
- Code copy functionality — Essential for developers to try code snippets
- Table of contents (TOC) — Long tutorials need quick navigation
- Responsive design — Users access from desktop, mobile, tablets
- Clear headings hierarchy — Expected in all documentation
- Cross-linking between sections — Users want to explore related content
- Version/date information — Technical content changes; users need recency
- Downloadable resources — Users want to reference files offline
- Dark mode — Developer preference, reduces eye strain

**Should have (competitive differentiators):**
- Difficulty indicators — Users can gauge tutorial complexity
- Estimated reading time — Helps users plan learning sessions
- Quick reference cheat sheets — Summarized content for quick lookup
- Prerequisites checklist — Users verify readiness before starting
- Terminal/command previews — Visual reinforcement for CLI tutorials
- Architecture diagrams — Visualizing complex systems

**Defer (v2+):**
- Interactive code demos — Requires significant infrastructure
- Progress tracking — User-facing feature, can be added later
- Video walkthroughs — Production-intensive
- Community comments/discussion — Requires moderation system
- Troubleshooting section — Community-sourced content
- Multi-language support — Internationalization effort
- Offline PWA support — Service worker complexity

### Architecture Approach

**Summary:** The recommended architecture uses a layered approach with Content (_tutorial collection), Template (_layouts, _includes, _data), Processing (Jekyll build), and Output (_site) layers. A tutorial collection pattern with automatic ordering and data-driven navigation ensures content organization scales naturally. Reusable components (alert boxes, code blocks, navigation) maintain consistency across sections.

**Major components:**
1. **_config.yml** — Site configuration, defaults, plugin settings, collection definitions
2. **_tutorial/** (collection) — Tutorial chapters with front matter (order, title, next/prev links, difficulty)
3. **_layouts/** — Page templates that wrap content (default, page, tutorial layouts)
4. **_includes/** — Reusable partials (navigation, code blocks, alert boxes, prev-next links)
5. **_data/** — Site-wide data (navigation structure, configuration values)
6. **Front Matter** — Per-page configuration (layout, order, metadata)

### Critical Pitfalls

**Top 5 pitfalls with prevention strategies:**

1. **Plugin whitelist violations** — Using non-whitelisted Jekyll plugins causes immediate build failures. Prevention: Check GitHub Pages plugin whitelist before adding any plugin; only use whitelisted plugins (jekyll-feed, jekyll-seo-tag, jekyll-redirect-from, etc.).

2. **Baseurl configuration mismatches** — Links work locally but break in production (or vice versa) due to incorrect baseurl. Prevention: For user/organization pages, set `baseurl: ""`; for project pages, set `baseurl: "/project-name"`; always use `{{ site.baseurl }}` prefix in links; test locally with `--baseurl=""`.

3. **Absolute vs relative path confusion** — Static resources fail to load, causing broken layouts. Prevention: Always use `{{ site.baseurl }}/path/to/file` for resources in Jekyll templates; never hardcode repository paths; verify asset paths via browser DevTools Network tab.

4. **Missing YAML front matter** — Markdown files not processed by Jekyll, appearing as raw Markdown or 404 errors. Prevention: Every Markdown file must start with `---` delimited section including title and layout; validate with `jekyll build --verbose`.

5. **Tutorial content staleness** — Code examples, commands, and configuration become obsolete as upstream projects update. Prevention: Pin specific versions in all instructions (e.g., `homeassistant==2024.12.0`, not "latest"); include version numbers in all URLs; add automated link checking in CI/CD; document known breaking changes.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Site Infrastructure Setup
**Rationale:** Establish GitHub Pages deployment configuration and Jekyll scaffolding before any content creation. This addresses critical pitfalls (plugin violations, baseurl misconfiguration, missing .nojekyll) early when they're easier to fix and prevents creating content that won't deploy.
**Delivers:** Configured GitHub Pages site with Jekyll 3.10.0, Minima theme, basic page templates, Git LFS setup for large files, link-checking workflow, and Gemfile/Gemfile.lock committed.
**Addresses:** Features: Clear navigation structure, Responsive design, Dark mode, Clear headings hierarchy
**Avoids:** Pitfalls: Plugin whitelist violations, Baseurl misconfiguration, Missing .nojekyll file, File size limit exceeded, Incorrect deployment configuration

### Phase 2: Content Architecture & Navigation
**Rationale:** Build the data-driven navigation structure and reusable templates before writing content. This follows the architectural pattern of "structure first, content second" and ensures navigation works correctly across all sections.
**Delivers:** _tutorial collection configured with output and permalink settings, _data/navigation.yml with full structure, custom _layouts (default, page, tutorial), reusable _includes (nav, alert boxes, code blocks, prev-next links), front matter defaults.
**Addresses:** Features: Table of contents, Cross-linking between sections, Clear section progression, Version/date information
**Uses:** Stack elements: Jekyll collections, Liquid templating, front matter defaults
**Implements:** Architecture components: Tutorial collection pattern, Data-driven navigation, Reusable alert boxes, Front matter defaults

### Phase 3: Core Tutorial Content
**Rationale:** Populate the architecture with actual tutorial content once structure is established. This allows focus on content quality without worrying about navigation or layout issues.
**Delivers:** All 10 tutorial sections (Introduction through Reference) with proper front matter, code examples with syntax highlighting, downloadable resources (config files, scripts), cross-references between sections, and prerequisite checklists.
**Addresses:** Features: Code syntax highlighting, Code copy functionality, Difficulty indicators, Estimated reading time, Prerequisites checklist, Terminal/command previews, Architecture diagrams, Downloadable resources
**Avoids:** Pitfalls: Tutorial content staleness (by pinning versions), Broken external links (by adding to link check)

### Phase 4: Testing, Optimization & Deployment
**Rationale:** Validate all content works correctly and optimize for user experience after core content is complete. This ensures the site is production-ready and maintains technical quality over time.
**Delivers:** All code examples tested in fresh Debian environment, external links validated with automated checking, deployment delay and cache behavior documented, repository size monitored, user testing feedback incorporated, any bug fixes from testing.
**Addresses:** Features: Fast page load speed, Mobile-friendly viewing, Search functionality (deferred to v1.x based on research)
**Avoids:** Pitfalls: GitHub Pages cache issues, Broken external links, Tutorial content staleness (ongoing validation)

### Phase Ordering Rationale

**Why this order based on dependencies:**
- Phase 1 must come first because deployment configuration is foundational; creating content before GitHub Pages is properly configured risks wasted effort if deployment fails
- Phase 2 before Phase 3 follows the architectural pattern of "structure first, content second"; navigation and templates must exist before content can be organized effectively
- Phase 3 before Phase 4 ensures content validation happens against complete content set; testing incomplete content is inefficient
- This order respects feature dependencies: Navigation structure requires responsive design (Phase 1), Progress tracking requires clear section progression (Phase 2), Search enhances navigation (can be added in v1.x)

**Why this grouping based on architecture patterns:**
- Phase 1 groups infrastructure setup (Jekyll config, GitHub Pages, Git LFS) — all foundational technical setup
- Phase 2 groups architectural components (collections, layouts, includes, data files) — all template and navigation infrastructure
- Phase 3 groups content creation (tutorial sections, code examples, resources) — all user-facing content
- Phase 4 groups validation and optimization (testing, link checking, performance) — all quality assurance activities

**How this avoids pitfalls from research:**
- Addresses plugin violations immediately in Phase 1 by configuring only whitelisted plugins
- Avoids baseurl mismatches by testing deployment in Phase 1 before content creation
- Prevents path confusion by establishing `{{ site.baseurl }}` convention in Phase 1
- Stops content staleness by pinning versions during Phase 3 content creation
- Prevents broken links by adding link checking in Phase 1 and running continuously through Phase 4
- Avoids file size issues by configuring Git LFS in Phase 1 and monitoring during Phase 3

### Research Flags

**Phases likely needing deeper research during planning:**
- **Phase 3 (Core Tutorial Content):** AI-specific integration points — model download URLs vary by provider, voice assistant configuration specifics for Lemonade Server and Home Assistant are niche with sparse documentation. Research needed on current stable model versions, Home Assistant API changes, and Lemonade Server configuration best practices.
- **Phase 3 (Core Tutorial Content):** Debian Linux setup steps — research needed on current Debian stable version, package manager commands, and any recent changes to system configuration that affect the tutorial.

**Phases with standard patterns (skip research-phase):**
- **Phase 1 (Site Infrastructure Setup):** Well-documented Jekyll + GitHub Pages setup with official documentation. Standard patterns for Gemfile, _config.yml, deployment configuration.
- **Phase 2 (Content Architecture & Navigation):** Established patterns for Jekyll collections, data-driven navigation, and Liquid templating. Official documentation covers all components.
- **Phase 4 (Testing, Optimization & Deployment):** Standard link checking with markdown-link-check GitHub Action, standard deployment monitoring with GitHub Pages. Well-documented patterns.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All technologies verified with official GitHub Pages documentation (pages.github.com/versions.json, docs.github.com). Jekyll 3.10.0 and Minima 2.5.1 are current GitHub Pages defaults. |
| Features | MEDIUM | Table stakes verified through multiple competitor analyses (W3Schools, MDN, Tutorialspoint). Differentiators based on developer documentation best practices from Pluralsight and CSDN articles. Anti-features backed by common patterns. |
| Architecture | HIGH | All patterns verified with official Jekyll documentation (jekyllrb.com/docs). Tutorial collection, data-driven navigation, and reusable includes are established patterns. Anti-patterns based on common Jekyll mistakes. |
| Pitfalls | HIGH | All critical pitfalls verified with official GitHub Pages documentation and common issue reports. Plugin whitelist, baseurl issues, and path problems are well-documented. Content staleness and broken links addressed with established solutions. |

**Overall confidence:** HIGH

### Gaps to Address

- **AI model download URLs and versioning:** Research during Phase 3 planning to identify stable model sources (HuggingFace, official repositories) and current recommended model versions for Lemonade Server. Handle by checking model repository documentation and community forums for current stable releases.
- **Home Assistant specific integration details:** Research during Phase 3 planning to verify current Home Assistant API endpoints, configuration file formats, and any breaking changes in recent versions. Handle by checking Home Assistant official docs and changelog for version compatibility.
- **Lemonade Server configuration specifics:** Research during Phase 3 planning to verify current Lemonade Server setup steps, configuration file syntax, and integration patterns with Home Assistant. Handle by checking Lemonade Server GitHub repository documentation and issues.
- **Performance optimization thresholds:** Research indicates generic thresholds (50 images, 10MB per page), but actual breakpoints depend on content. Validate during Phase 4 testing and adjust optimization strategies based on real-world performance metrics.

## Sources

### Primary (HIGH confidence)
- GitHub Pages official documentation — Verified GitHub Pages dependency versions (Jekyll 3.10.0, Ruby 3.3.4, Minima 2.5.1), plugin whitelist, deployment configuration
- Jekyll Documentation (jekyllrb.com/docs/) — Verified collections, layouts, includes, front matter defaults, data files, rendering process, themes, directory structure
- GitHub Pages versions.json (pages.github.com/versions.json) — Verified current dependency versions for compatibility

### Secondary (MEDIUM confidence)
- MDN Web Docs — Technical documentation best practices, navigation patterns, code highlighting standards
- "Technical documentation best practices: Making devs love your docs" (Pluralsight, 2024) — Feature expectations for tutorial sites
- "优秀技术文档实践与案例：打造高效知识库的最佳指南" (CSDN, 2025) — Developer documentation patterns, Chinese language context
- W3Schools website analysis (https://www.w3school.com.cn/) — Tutorial site feature analysis, competitor patterns
- markdown-link-check GitHub Action — Link validation best practices, automation strategies

### Tertiary (LOW confidence)
- Tutorialspoint website analysis — Tutorial site patterns (needs validation against specific project needs)
- Runoob tutorial site analysis (https://www.runoob.com/) — Tutorial site features in Chinese context (needs validation)
- "创建优质技术文档的 8 个步骤" (Toutiao, 2022) — Documentation practices (single source, needs validation)

---
*Research completed: 2026-03-04*
*Ready for roadmap: yes*
