# Phase 2: Content Architecture - Context

**Gathered:** 2026-03-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Site has complete navigation, code readability, and content organization systems. This phase establishes navigation structure, syntax highlighting, copy functionality, cross-linking, and version/date display. Tutorial content itself comes in Phase 3.
</domain>

<decisions>
## Implementation Decisions

### Navigation Organization
- **Topic-based groups** in sidebar (not flat list or phase-based)
- **Structure** (in order):
  1. Introduction
  2. Installation
     - Prerequisites
     - Debian Linux
     - Windows (placeholder)
  3. Speech-to-Text
     - Lemonade Setup (Whisper)
     - Home Assistant Configuration
  4. Text-to-Speech
     - Lemonade Setup (kokoro)
     - Home Assistant Configuration
  5. Conversational Setup
     - LLM Configuration (GPU/NPU tabs for both options)
     - Embedding Model (nomic)
     - Home Assistant Configuration (Pipeline, Voice Assistant, Testing)
  6. Usage Examples
  7. References
- **Separate pages** for Debian Linux and Windows under Installation group
- **Separate pages** for LLM Config, Embedding, and HA Config under Conversational Setup group
- **Tabs within LLM Config page** for GPU Setup vs NPU Setup options (not separate pages)
- **Descriptive filenames only** (no numbers in filenames): `introduction.md`, `prerequisites.md`, `debian-installation.md`, `windows-installation.md`, etc.
- **Use `nav_order` in front matter** for just-the-docs ordering (just-the-docs handles this)
- **Both breadcrumb and sidebar highlight** for current section (just-the-docs provides both by default)

### Code Presentation
- **Filenames in code blocks** - Show what file is being edited (standard practice)
  ```bash
  # filename: /etc/lemonade-server/config.yaml
  ```
- **Copy button top-right** of code block (just-the-docs native with `copy_button: true` in _config.yml)
- **Languages to highlight**: bash, yaml, json only (covers terminal commands and config files)
- **Line continuation for long commands** - Use backslash `\` for multi-line commands (better readability)
  ```bash
  sudo apt-get update && \
      sudo apt-get install -y \
      build-essential \
      curl \
      git
  ```

### Cross-linking Strategy
- **Inline references** with full titles and anchors for related content
  - Example: "See the [Debian Linux Installation](#debian-linux-installation) section for detailed setup instructions."
  - Uses just-the-docs heading anchors for deep linking
- **Standard Next/Previous links** at bottom of pages (just-the-docs native with `nav_order`)
- **Link Prerequisites only when sections have specific dependencies** (not on every page)
  - Example: LLM Config page links to Prerequisites if specific requirements exist

### Version/Date Display
- **Per-section dates** in page footer (more accurate than site-wide version)
- **Format**: `Last updated: YYYY-MM-DD` (ISO format, clear and unambiguous)
- **Manually maintained** in front matter (`last_updated: 2026-03-04` field in each page)
- **Use just-the-docs `footer_content`** or custom include for displaying the date

### Claude's Discretion
- Exact wording of breadcrumb labels
- Specific CSS for active navigation state
- Whether to add optional "Related sections" boxes at page ends
- TOC depth (just-the-docs default should work fine)

</decisions>

<specifics>
## Specific Ideas

- Each major section (STT, TTS, Conversational Setup) should be self-contained with both Lemonade and HA configuration on the same page(s)
- LLM Configuration page should allow users to choose between GPU and NPU paths easily (tabs work well for this)
- Users should be able to find specific topics quickly via the sidebar navigation
- References should be easy to access from any page (footer link on each page)

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- **_config.yml**: Already has `nav_enabled: true`, `heading_anchors: true`, `search_enabled: true`
- **just-the-docs theme**: Built-in sidebar navigation, TOC generation, search, responsive design, dark mode
- **Rouge syntax highlighting**: Available by default in Jekyll (same as GitHub)
- **head_custom.html**: Pattern for adding custom includes to pages

### Established Patterns
- **Front matter**: All pages use YAML front matter with `layout`, `title`, `nav_order`
- **Navigation**: just-the-docs uses `nav_order` and `parent` for hierarchical sidebar structure
- **Code blocks**: Standard Markdown fenced blocks with language indicators (```bash, ```yaml, etc.)
- **Dark mode**: Auto-switching via assets/js/dark-mode.js

### Integration Points
- **Navigation structure**: Add `nav_order` and `parent` to tutorial pages for sidebar hierarchy
- **Copy button**: Enable in _config.yml with `copy_button: true`
- **TOC**: Already enabled via `heading_anchors: true` in _config.yml
- **Footer**: Configure `footer_content` in _config.yml or create custom include for per-page dates
- **Tutorial collection**: May need to create `_tutorials` collection for organizing tutorial pages (optional - can also use regular pages with nav_order)

### just-the-docs Capabilities
- **Sidebar navigation**: Hierarchical via `parent` and `nav_order` front matter
- **Search**: Client-side lunr.js search (already enabled)
- **TOC**: Auto-generated for each page (already enabled)
- **Copy button**: Set `copy_button: true` in _config.yml
- **Dark mode**: Built-in support, currently using custom JS for auto-switching
- **Responsive**: Mobile-first design, hamburger menu on mobile

</code_context>

<deferred>
## Deferred Ideas

None - discussion stayed within phase scope
</deferred>

---

*Phase: 02-content-architecture*
*Context gathered: 2026-03-09*
