# Architecture Research

**Domain:** Jekyll-based tutorial sites
**Researched:** 2025-03-04
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    Content Layer (Source)                       │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  _tutorial/  │  │    pages/    │  │   _posts/    │         │
│  │  (Collection)│  │  (Markdown)  │  │  (Optional)  │         │
│  └──────┬───────┘  └──────┬───────┘  └──────────────┘         │
│         │                  │                                    │
├─────────┴──────────────────┴────────────────────────────────────┤
│                    Template Layer                               │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  _layouts/   │  │  _includes/  │  │   _data/     │         │
│  │  (Templates) │  │  (Partials)  │  │  (YAML/JSON) │         │
│  └──────┬───────┘  └──────┬───────┘  └──────────────┘         │
│         │                  │                  │                  │
├─────────┴──────────────────┴──────────────────┴───────────────┤
│                 Processing Layer (Jekyll Build)                  │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   Config     │  │   Data Files │  │   Front      │         │
│  │  (_config)   │  │   Loading    │  │   Matter     │         │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘         │
│         │                  │                  │                  │
│  ┌──────▼───────┐  ┌──────▼───────┐  ┌──────▼───────┐         │
│  │   Reader     │  │  Generators  │  │   Renderer   │         │
│  │  (Content)   │  │  (Optional)  │  │ (Templates)  │         │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘         │
│         │                  │                  │                  │
└─────────┴──────────────────┴──────────────────┴───────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Output Layer (_site)                          │
├─────────────────────────────────────────────────────────────────┤
│  Static HTML, CSS, JS ready for deployment to GitHub Pages      │
└─────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| **_config.yml** | Site configuration, defaults, plugin settings, collection definitions | YAML file at root |
| **_tutorial/** | Tutorial chapters as a collection (recommended for multi-section tutorials) | Collection with front matter (order, title, next/prev links) |
| **pages/** | Static pages (home, about, reference) | Markdown files in root or subfolders |
| **_layouts/** | Page templates that wrap content | HTML templates with Liquid variables (default, page, tutorial) |
| **_includes/** | Reusable partials (navigation, code blocks, alerts) | HTML fragments with parameters |
| **_data/** | Site-wide data (navigation structure, config values) | YAML, JSON, CSV files loaded into `site.data` |
| **Front Matter** | Per-page configuration (layout, order, metadata) | YAML block at top of each Markdown file |
| **Liquid** | Template language for rendering dynamic content | Template syntax in layouts, includes, pages |

## Recommended Project Structure

For a tutorial site with multiple sections (like the Lemonade Home Assistant Guide):

```
.
├── _config.yml                 # Site configuration
├── Gemfile                      # Ruby dependencies (Jekyll, Minima theme)
├── index.md                     # Homepage
├── about.md                     # About/tutorial overview page
│
├── _tutorial/                   # Tutorial collection (recommended)
│   ├── 01-introduction.md      # Section 1
│   ├── 02-debian-setup.md      # Section 2
│   ├── 03-lemonade-server.md    # Section 3
│   ├── 04-models-setup.md      # Section 4
│   ├── 05-stt-configuration.md # Section 5
│   ├── 06-llm-setup.md         # Section 6
│   ├── 07-tts-configuration.md # Section 7
│   ├── 08-home-assistant.md    # Section 8
│   ├── 09-usage-examples.md    # Section 9
│   └── 10-reference.md         # Reference section
│
├── _layouts/                   # Custom layouts (override theme)
│   ├── default.html            # Base layout
│   ├── page.html               # Standard page layout
│   └── tutorial.html           # Tutorial-specific layout
│
├── _includes/                  # Reusable partials
│   ├── nav.html                # Main navigation
│   ├── tutorial-nav.html       # Tutorial section navigation
│   ├── code-block.html         # Custom code block formatting
│   ├── alert-info.html         # Information alert box
│   ├── alert-warning.html      # Warning alert box
│   └── prev-next-links.html    # Previous/Next section links
│
├── _data/                      # Site-wide data
│   ├── navigation.yml          # Main navigation structure
│   └── tutorial_order.yml      # Tutorial section order/metadata
│
├── assets/                     # Static assets (images, styles)
│   └── css/
│       └── custom.scss         # Custom styles (optional)
│
└── images/                     # Tutorial images, diagrams
    └── screenshots/
```

### Structure Rationale

- **_tutorial/** as a collection:
  - Keeps all tutorial sections together and organized
  - Allows automatic URL generation (`/tutorial/01-introduction.html`)
  - Enables site-wide access via `site.tutorial` for navigation
  - Supports sorting/ordering via `order` front matter or configuration
  - Allows adding metadata (next/prev links, difficulty, prerequisites)

- **_layouts/** and **_includes/**:
  - Override Minima theme defaults while receiving updates
  - Create tutorial-specific layouts with chapter navigation
  - Reuse components like code blocks and alert boxes across sections
  - Maintain consistent styling throughout

- **_data/** for navigation:
  - Separates navigation structure from content
  - Easy to reorganize without editing every page
  - Supports multi-level navigation (sections, subsections)
  - Can include metadata like icons, external links, or conditional display

- **assets/** folder:
  - Keeps static files separate from content
  - Supports SCSS compilation to CSS
  - Easy to version control images and assets
  - Minima theme automatically serves assets

## Architectural Patterns

### Pattern 1: Tutorial Collection with Ordered Sections

**What:** Use a Jekyll collection for tutorial chapters with automatic ordering and navigation.

**When to use:** Multi-section tutorials where order matters and navigation between sections is needed.

**Trade-offs:**
- **Pros:** Automatic URL generation, site-wide access, easy navigation, metadata support
- **Cons:** Requires collection configuration, slightly more complex than plain pages

**Configuration (_config.yml):**
```yaml
collections:
  tutorial:
    output: true
    permalink: /tutorial/:title/
    sort_by: order  # or use manual 'order' list
```

**Document front matter:**
```yaml
---
title: Debian Linux Setup
order: 2
difficulty: beginner
prerequisites:
  - Basic Linux familiarity
  - Root access
next: 03-lemonade-server
prev: 01-introduction
---
```

**Navigation in layout:**
```liquid
{% assign prev = site.tutorial | where: 'prev', page.title | first %}
{% assign next = site.tutorial | where: 'next', page.title | first %}

<div class="tutorial-nav">
  {% if prev %}
    <a href="{{ prev.url }}" class="prev">← {{ prev.title }}</a>
  {% endif %}
  {% if next %}
    <a href="{{ next.url }}" class="next">{{ next.title }} →</a>
  {% endif %}
</div>
```

### Pattern 2: Data-Driven Navigation

**What:** Store navigation structure in `_data/` YAML files and iterate to build menus.

**When to use:** Complex navigation with multiple levels, dynamic menus, or navigation that changes frequently.

**Trade-offs:**
- **Pros:** Separation of concerns, easy to maintain, supports hierarchy, can add metadata
- **Cons:** Additional file to manage, requires Liquid iteration

**Data file (_data/navigation.yml):**
```yaml
main:
  - title: Home
    url: /
  - title: Tutorial
    url: /tutorial/
    children:
      - title: Getting Started
        url: /tutorial/01-introduction/
      - title: Debian Setup
        url: /tutorial/02-debian-setup/
  - title: Reference
    url: /reference/
```

**Include (_includes/nav.html):**
```liquid
<ul class="main-nav">
  {% for item in site.data.navigation.main %}
    <li>
      <a href="{{ item.url }}">{{ item.title }}</a>
      {% if item.children %}
        <ul class="sub-nav">
          {% for child in item.children %}
            <li>
              <a href="{{ child.url }}">{{ child.title }}</a>
            </li>
          {% endfor %}
        </ul>
      {% endif %}
    </li>
  {% endfor %}
</ul>
```

**Usage in layout:**
```liquid
{% include nav.html %}
```

### Pattern 3: Reusable Alert Boxes

**What:** Create include files for styled alert boxes with dynamic content.

**When to use:** Tutorial sections that need special callouts (warnings, tips, notes).

**Trade-offs:**
- **Pros:** Consistent styling, easy to use, parameterized
- **Cons:** Adds include overhead for each usage

**Include (_includes/alert-warning.html):**
```html
<div class="alert alert-warning" markdown="span">
  <i class="fa fa-exclamation-triangle"></i>
  <strong>Warning:</strong>
  {{ include.content }}
</div>
```

**Usage in Markdown:**
```markdown
{% include alert-warning.html content="This command will require a system reboot." %}
```

**Include with parameters (_includes/alert-info.html):**
```html
<div class="alert alert-info" markdown="span">
  <i class="fa fa-info-circle"></i>
  <strong>Note:</strong>
  {{ include.message }}
</div>
```

**Usage:**
```markdown
{% include alert-info.html message="Remember to backup your configuration files." %}
```

### Pattern 4: Front Matter Defaults

**What:** Set default values for layouts, categories, or custom variables in `_config.yml`.

**When to use:** When multiple pages share the same configuration values.

**Trade-offs:**
- **Pros:** Reduces repetition, easy to update defaults, DRY principle
- **Cons:** Adds complexity to config, requires understanding of precedence

**Configuration (_config.yml):**
```yaml
defaults:
  - scope:
      path: ""          # All files
      type: "pages"
    values:
      layout: "page"

  - scope:
      path: "_tutorial"
      type: "tutorial"  # Tutorial collection
    values:
      layout: "tutorial"
      difficulty: "beginner"

  - scope:
      path: "_tutorial/05-*"
      type: "tutorial"
    values:
      difficulty: "intermediate"
```

### Pattern 5: Custom Code Block Include

**What:** Create an include for styled code blocks with language highlighting and copy button.

**When to use:** Tutorial with many code examples that need consistent formatting.

**Trade-offs:**
- **Pros:** Consistent styling, can add features (copy button, line numbers), reusability
- **Cons:** Requires Liquid syntax for each code block, more verbose than standard Markdown

**Include (_includes/code-block.html):**
```html
<div class="code-block" data-language="{{ include.lang }}">
  <div class="code-header">
    <span>{{ include.lang }}</span>
    <button class="copy-btn" aria-label="Copy code">Copy</button>
  </div>
  {% highlight include.lang %}
{{ include.code }}
  {% endhighlight %}
</div>
```

**Usage:**
```liquid
{% include code-block.html lang="bash" code="sudo apt-get update && sudo apt-get upgrade" %}
```

## Data Flow

### Request Flow (Build Time)

```
[User edits Markdown]
    ↓
[Git push to GitHub]
    ↓
[GitHub Pages builds site]
    ↓
[Jekyll Reader] → [Config loads]
    ↓
[Data Files loaded] → [Collections read]
    ↓
[Generators run] → [Front matter processed]
    ↓
[Liquid Templates rendered]
    ↓
[Layouts applied to content]
    ↓
[Static files copied to _site]
    ↓
[Site deployed to GitHub Pages CDN]
    ↓
[User accesses URL]
```

### Rendering Process Flow

Jekyll's rendering happens in stages (per official docs):

1. **Interpret Liquid Expressions**
   - Evaluate Liquid templates in files
   - Shallow interpretation (nested Liquid not re-interpreted)
   - Front matter Liquid left untouched

2. **Apply Converters**
   - Invoke converter based on file extension
   - Markdown → HTML, Sass → CSS, etc.
   - Extension determines conversion type

3. **Populate Layouts**
   - If layout specified, place converted output into layout
   - Layouts can inherit from each other (e.g., `page` inherits from `default`)
   - Content injected via `{{ content }}` variable

### Tutorial Navigation Flow

```
[_tutorial collection loaded]
    ↓
[Front matter parsed for each doc]
    ↓
[Document ordered by 'order' or filename]
    ↓
[User visits tutorial page]
    ↓
[Layout accesses site.tutorial]
    ↓
[Find current doc in collection]
    ↓
[Identify prev/next via front matter or index]
    ↓
[Render navigation links]
```

### Key Data Flows

1. **Content to HTML:**
   Markdown file → Front matter extraction → Markdown converter → Liquid rendering → Layout application → HTML output

2. **Navigation generation:**
   `_data/navigation.yml` → Liquid iteration → HTML list generation → Navigation menu

3. **Tutorial ordering:**
   Collection configuration → Document reading → Sorting by `order` front matter → Ordered array `site.tutorial` → Navigation generation

4. **Theme override:**
   Site file checked → Theme file checked → Site file used (if exists) → Theme file used (as fallback)

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-1k pages | Single collection, basic navigation, default theme |
| 1k-10k pages | Multiple collections, data-driven navigation, custom layouts, pagination if needed |
| 10k-100k pages | Static file caching, incremental builds, plugins for search/indexing, CDN optimization |
| 100k+ pages | Consider dedicated static site generator with better performance (Hugo, Astro), or split into multiple sites |

### Scaling Priorities

1. **First bottleneck: Build time**
   - **Problem:** More pages = slower builds
   - **Fix:** Enable incremental regeneration (`--incremental` flag), use collections to limit scope, avoid excessive Liquid loops

2. **Second bottleneck: Navigation complexity**
   - **Problem:** Deep or complex navigation becomes unmanageable
   - **Fix:** Use data-driven navigation, implement search, consider splitting into multiple collections

3. **Third bottleneck: Theme customization**
   - **Problem:** Too many overrides prevent theme updates
   - **Fix:** Override only essential files, use custom CSS instead of overriding layouts, create includes for reusable patterns

### Performance Considerations for Tutorial Sites

- **Avoid excessive includes:** Each include adds overhead. Use for truly reusable components, not every code block.
- **Minimize Liquid complexity:** Deep nesting and complex filters slow rendering. Keep templates simple.
- **Use front matter defaults:** Reduces per-file configuration overhead.
- **Optimize images:** Use proper formats, compress before adding to repository.
- **Enable incremental builds:** Reduces rebuild time during development.

## Anti-Patterns

### Anti-Pattern 1: Using Posts for Tutorial Sections

**What people do:** Store tutorial chapters in `_posts/` folder with date-based naming (YYYY-MM-DD-title.md).

**Why it's wrong:**
- Posts require date prefixes that don't make sense for tutorials
- Posts are sorted by date, not logical order
- Posts have permalink structures designed for blogs
- Conflates blog content with tutorial content

**Do this instead:**
- Use a collection (`_tutorial/`) for tutorial sections
- Set `output: true` on the collection
- Use `order` front matter or filename-based ordering
- Define a custom permalink structure (`/tutorial/:title/`)

### Anti-Pattern 2: Hard-coded Navigation in Every Page

**What people do:** Copy-paste navigation HTML into every page's layout or include file.

**Why it's wrong:**
- Changes require editing every page
- No separation of structure and presentation
- Difficult to add/remove sections
- Violates DRY principle

**Do this instead:**
- Store navigation structure in `_data/navigation.yml`
- Iterate through data with Liquid to build menus
- Support hierarchy and metadata in data file
- Single source of truth for navigation

### Anti-Pattern 3: Overriding Too Many Theme Files

**What people do:** Copy all layout and include files from the Minima theme to customize.

**Why it's wrong:**
- Breaks theme update mechanism
- Misses out on theme improvements
- Increases maintenance burden
- Defeats purpose of gem-based themes

**Do this instead:**
- Override only the files you need to change
- Use custom CSS to style instead of overriding layouts
- Create includes for custom components
- Use front matter defaults instead of modifying layouts

### Anti-Pattern 4: Using Liquid for Everything

**What people do:** Use Liquid tags for every piece of dynamic content, including simple HTML structures.

**Why it's wrong:**
- Makes templates harder to read and maintain
- Adds unnecessary processing overhead
- Slows build times
- Makes content harder to edit for non-technical users

**Do this instead:**
- Use Liquid only for dynamic data and logic
- Keep static HTML in templates where possible
- Use includes for reusable components, not just HTML snippets
- Balance between static HTML and Liquid for readability

### Anti-Pattern 5: Ignoring Front Matter Defaults

**What people do:** Repeat the same front matter in every file (layout, categories, custom fields).

**Why it's wrong:**
- Violates DRY principle
- Difficult to update defaults globally
- Inconsistent configuration across files
- Maintenance burden increases with file count

**Do this instead:**
- Define `defaults` in `_config.yml` for repeated values
- Use scope/path/type to apply defaults selectively
- Override only what differs from defaults
- Single source of truth for default configuration

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| **GitHub Pages** | Automatic deployment | Requires `gh-pages` branch or `main` branch with `_config.yml`. Supports only whitelisted plugins. |
| **GitHub Actions** | Build/test pipeline | Can run Jekyll builds, tests, and deploy. Useful for CI/CD. |
| **Google Analytics** | Include or plugin | Add via `_includes/head.html` or use `jekyll-seo-tag` plugin (recommended). |
| **Disqus Comments** | Include or plugin | Add via `_includes/comments.html` or use `jekyll-disqus` plugin. |
| **Search (Algolia/Lunr)** | Plugin or custom | `jekyll-algolia` for index-based search, `lunr.js` for client-side search. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| **Tutorial collection ↔ Layouts** | Front matter variables | Tutorial pages provide metadata (title, order, next/prev) to layouts via `page` variable |
| **Data files ↔ Templates** | Liquid iteration (`site.data`) | Navigation structure in data files accessed in templates |
| **Includes ↔ Pages** | Include tags with parameters | Pages pass parameters to includes (e.g., `alert-warning.html content="message"`) |
| **Theme ↔ Site files** | File system precedence | Site files override theme files, site files take priority in `_layouts`, `_includes`, `_sass`, `assets` |
| **Config ↔ Collections** | Collection configuration | `_config.yml` defines collection behavior (`output`, `permalink`, `sort_by`) |

### GitHub Pages Specific Considerations

- **Plugin limitations:** GitHub Pages only supports whitelisted plugins (jekyll-sitemap, jekyll-seo-tag, jekyll-feed, etc.). Custom plugins won't work.
- **Ruby version:** GitHub Pages runs specific Ruby versions. Must match in `Gemfile` or use GitHub Actions to build.
- **Build process:** Automatic builds on push to default branch. Can be configured in repository Settings → Pages.
- **Deployment:** Builds to `gh-pages` branch or root of `main` branch (configurable).
- **CNAME:** Custom domains supported via `CNAME` file in root.
- **HTTPS:** Automatic for custom domains, enabled by default.

## Sources

- [Jekyll Documentation](https://jekyllrb.com/docs/) - HIGH confidence, official source
- [Directory Structure](https://jekyllrb.com/docs/structure/) - HIGH confidence, official source
- [Collections](https://jekyllrb.com/docs/collections/) - HIGH confidence, official source
- [Layouts](https://jekyllrb.com/docs/layouts/) - HIGH confidence, official source
- [Includes](https://jekyllrb.com/docs/includes/) - HIGH confidence, official source
- [Front Matter Defaults](https://jekyllrb.com/docs/configuration/front-matter-defaults/) - HIGH confidence, official source
- [Data Files](https://jekyllrb.com/docs/datafiles/) - HIGH confidence, official source
- [Rendering Process](https://jekyllrb.com/docs/rendering-process/) - HIGH confidence, official source
- [Navigation Tutorial](https://jekyllrb.com/tutorials/navigation/) - HIGH confidence, official source
- [Themes](https://jekyllrb.com/docs/themes/) - HIGH confidence, official source
- [GitHub Pages](https://pages.github.com/) - HIGH confidence, official source
- [Jekyll Deep Dive (zread.ai)](https://zread.ai/jekyll/jekyll/) - HIGH confidence, official repository documentation

---
*Architecture research for: Jekyll-based tutorial sites*
*Researched: 2025-03-04*
