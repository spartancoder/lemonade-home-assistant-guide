# Roadmap: Lemonade Home Assistant Guide

## Overview

A comprehensive GitHub Pages tutorial that teaches users how to set up a local, privacy-focused voice assistant using Lemonade Server integrated with Home Assistant. The project progresses from infrastructure setup through content architecture to complete tutorial documentation.

## Phases

- [x] **Phase 1: Site Infrastructure** - Jekyll + GitHub Pages + just-the-docs theme
- [x] **Phase 2: Content Architecture** - Navigation, code presentation, cross-linking systems
- [ ] **Phase 3: Tutorial Documentation** - All tutorial content pages with code examples
- [ ] **Phase 4: Final Polish** - Testing, refinement, and deployment validation

## Phase Details

### Phase 1: Site Infrastructure
**Goal**: Configured GitHub Pages site with Jekyll 3.10.0, just-the-docs theme, responsive design, dark mode support, and Git LFS pattern documentation.
**Depends on**: Nothing (first phase)
**Requirements**: [INFRA-01, INFRA-02, INFRA-03, INFRA-04, INFRA-05, INFRA-06, INFRA-10, INFRA-12]
**Success Criteria** (what must be TRUE):
  1. User can access the site via GitHub Pages URL
  2. Site renders responsively on desktop, mobile, and tablet
  3. Dark mode follows user's system preference
  4. Large files can be distributed via GitHub Releases
**Plans**: 4 plans (complete)

Plans:
- [x] 01-01: Jekyll infrastructure setup with just-the-docs theme
- [x] 01-02: GitHub Pages deployment configuration
- [x] 01-03: GitHub Pages deployment verification
- [x] 01-04: GitHub release verification

### Phase 2: Content Architecture
**Goal**: Site has complete navigation structure, code readability features, copy functionality, and content organization systems ready for tutorial content.
**Depends on**: Phase 1
**Requirements**: [ARCH-01, ARCH-02, ARCH-03, ARCH-04, ARCH-05, ARCH-06, ARCH-07]
**Success Criteria** (what must be TRUE):
  1. User can navigate via hierarchical sidebar (Introduction, Installation, STT, TTS, Conversational, Usage, References)
  2. Code blocks have copy button functionality
  3. Cross-links work between related sections
  4. Per-page last updated dates display correctly
**Plans**: 4 plans (complete)

Plans:
- [x] 02-01: Copy code button and footer
- [x] 02-02: Introduction and Installation navigation
- [x] 02-03: STT and TTS sections
- [x] 02-04: Conversational, Usage, and References sections

### Phase 3: Tutorial Documentation
**Goal**: Complete tutorial content for all 7 major sections with beginner-friendly explanations, working code examples, and configuration snippets.
**Depends on**: Phase 2
**Requirements**: [TUT-01, TUT-02, TUT-03, TUT-04, TUT-05, TUT-06, TUT-07, TUT-08, TUT-09, TUT-10, TUT-11, TUT-12, TUT-13, TUT-14]
**Success Criteria** (what must be TRUE):
  1. User can read Introduction explaining the project and its value
  2. User can install Lemonade Server on Debian Linux following step-by-step instructions
  3. User can configure Whisper STT with Home Assistant
  4. User can configure Kokoro TTS with Home Assistant
  5. User can configure LLM (GPU or NPU path) with Home Assistant
  6. User can configure embedding model for conversation context
  7. User can set up complete voice assistant pipeline in Home Assistant
  8. User can test voice assistant with usage examples
  9. User can access references for all tools and resources
**Plans**: 6 plans in 2 waves

Plans:
- [ ] 03-01: Introduction and Prerequisites pages (TUT-01, TUT-02)
- [ ] 03-02: Installation section - overview and Debian/RHEL guides (TUT-03, TUT-04)
- [ ] 03-03: Speech-to-Text section - Whisper setup and HA integration (TUT-05, TUT-06)
- [ ] 03-04: Text-to-Speech section - Kokoro setup and HA integration (TUT-07, TUT-08)
- [ ] 03-05: Conversational section - LLM (GPU/NPU) and Embedding setup (TUT-09, TUT-10, TUT-11)
- [ ] 03-06: Conversational HA and Usage Examples (TUT-12, TUT-13, TUT-14)

### Phase 4: Final Polish
**Goal**: Site is fully tested, refined, and ready for public release with all content verified working.
**Depends on**: Phase 3
**Requirements**: [POLISH-01, POLISH-02, POLISH-03]
**Success Criteria** (what must be TRUE):
  1. All code examples tested and verified working
  2. All internal and external links verified
  3. Site accessible and functional on GitHub Pages
**Plans**: 2 plans in 2 waves

Plans:
- [ ] 04-01: Code & Link Quality Verification (POLISH-01, POLISH-02)
- [ ] 04-02: Build & Deployment Verification (POLISH-03)

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Site Infrastructure | 4/4 | Complete | 2026-03-04 |
| 2. Content Architecture | 4/4 | Complete | 2026-03-09 |
| 3. Tutorial Documentation | 0/6 | Planned | - |
| 4. Final Polish | 0/2 | Planned | - |
