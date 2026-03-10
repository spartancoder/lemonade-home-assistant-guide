# Roadmap: Lemonade Home Assistant Guide

**Created:** 2026-03-04
**Granularity:** Standard
**Phases:** 5

## Phases

- [x] **Phase 1: Site Infrastructure** - GitHub Pages hosting with Jekyll, responsive design, dark mode
- [ ] **Phase 2: Content Architecture** - Navigation structure, code highlighting, TOC, cross-links
- [ ] **Phase 3: Tutorial Documentation** - All 14 tutorial sections with code examples and model guides
- [ ] **Phase 4: Home Assistant Integration** - Complete HA configuration with voice assistant pipeline
- [ ] **Phase 5: Testing & Deployment** - Validation, link checking, deployment to GitHub Pages

## Phase Details

### Phase 1: Site Infrastructure

**Goal**: GitHub Pages site is deployed and accessible on all devices with modern features

**Depends on**: Nothing

**Requirements**: INFRA-01, INFRA-06, INFRA-10, INFRA-12

**Success Criteria** (what must be TRUE):
1. User can access the GitHub Pages site at the published URL
2. User can view site on desktop, mobile, and tablet with responsive layout
3. Site follows system preference for light/dark mode (auto mode)
4. Site uses Jekyll 3.10.0 with just-the-docs theme and builds successfully
5. Large files are distributed via GitHub Releases (Git LFS not supported on GitHub Pages)

**Plans**: 4 plans (2 original + 2 gap closure)

**Plan list:**
- [x] 01-01-PLAN.md — Set up Jekyll infrastructure with just-the-docs theme
- [x] 01-02-PLAN.md — Deploy to GitHub Pages and configure large file distribution
- [x] 01-03-PLAN.md — Verify GitHub Pages deployment and site accessibility (gap closure)
- [x] 01-04-PLAN.md — Verify GitHub release v1.0.0 and large file distribution (gap closure)

---

### Phase 2: Content Architecture

**Goal**: Site has complete navigation, code readability, and content organization systems

**Depends on**: Phase 1

**Requirements**: INFRA-02, INFRA-03, INFRA-04, INFRA-05, INFRA-07, INFRA-08, INFRA-09, CONT-01, CONT-02

**Success Criteria** (what must be TRUE):
1. User can navigate to any tutorial section via sidebar or top menu
2. User sees code blocks with proper syntax highlighting for all languages
3. User can copy any code example with a single click (click-to-copy)
4. User sees table of contents for each tutorial section with clickable anchors
5. User can see version and date information on all pages
6. User can follow cross-links between related tutorial sections
7. Content is properly structured with H1, H2, H3 heading hierarchy

**Plans**: TBD

---

### Phase 3: Tutorial Documentation

**Goal**: All tutorial content is written with working code examples for all models

**Depends on**: Phase 2

**Requirements**: CONT-03, DOC-01, DOC-02, DOC-03, DOC-04, DOC-05, DOC-06, DOC-07, DOC-08, DOC-09, DOC-10, DOC-14, MODEL-01, MODEL-02, MODEL-03, MODEL-04, MODEL-05, MODEL-06, MODEL-07, INFRA-11

**Success Criteria** (what must be TRUE):
1. User can read complete introduction covering Lemonade Server, architecture, hardware requirements, and tutorial roadmap
2. User can follow prerequisites section with Linux basics, Home Assistant basics, hardware requirements, and software dependencies
3. User can install Lemonade Server on Debian Linux with system update, dependencies, systemd service, and verification steps
4. User sees Windows placeholder note about future support
5. User can set up Whisper-Large-v3-Turbo (STT) model with working configuration
6. User can set up kokoro-v1 (TTS) model with working configuration
7. User can set up Qwen3-4B-Instruct-2507-GGUF (LLM primary) model with working configuration
8. User can set up gpt-oss-20b-mxfp4-GGUF (LLM secondary) model with working configuration
9. User can set up nomic-embed-text-v2-moe-GGUF (embedding) model with working configuration
10. User can configure AMD Ryzen AI NPU acceleration for supported models
11. User can access all sources and links in references section (Lemonade Server, Home Assistant, models, AMD NPU, community resources)
12. User can download configuration files and scripts from downloadable resources section
13. All code examples use version-pinned commands and configuration (e.g., homeassistant==2024.12.0 not "latest")

**Plans**: TBD

---

### Phase 4: Home Assistant Integration

**Goal**: Complete Home Assistant voice assistant pipeline configuration with all components

**Depends on**: Phase 3

**Requirements**: DOC-11, DOC-12, DOC-13, HA-01, HA-02, HA-03, HA-04, HA-05, HA-06, HA-07, HA-08

**Success Criteria** (what must be TRUE):
1. User can install Home Assistant 2024.12+ and configure it for voice assistant
2. User can install HACS plugin via the documented procedure
3. User can configure STT endpoint with whisper.cpp integration
4. User can configure LLM endpoint with llama.cpp integration
5. User can configure TTS endpoint with kokoro integration
6. User can configure embedding endpoint with nomic-embed-text integration
7. User can set up complete voice assistant pipeline (STT → LLM → TTS → conversation agent)
8. User can configure wake word for voice assistant activation
9. User can test the complete voice assistant pipeline end-to-end
10. User can execute basic voice commands through the assistant
11. User can set up automations using the voice assistant
12. User can configure custom intents for specific interactions
13. User can integrate voice assistant with other Home Assistant components

**Plans**: TBD

---

### Phase 5: Testing & Deployment

**Goal**: Site is validated, tested, and successfully deployed to GitHub Pages

**Depends on**: Phase 4

**Requirements**: TEST-01, TEST-02, TEST-03, TEST-04, TEST-05

**Success Criteria** (what must be TRUE):
1. User can follow the complete tutorial in a fresh Debian environment and achieve working voice assistant
2. User can access all external links (no broken links in the tutorial)
3. Site builds successfully with Jekyll locally with no errors
4. Site deploys successfully to GitHub Pages and is accessible via published URL
5. User can navigate to all tutorial sections and verify all navigation links work
6. Site loads quickly and performs well across devices

**Plans**: TBD

---

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Site Infrastructure | 4/4 | Complete | 2026-03-10 |
| 2. Content Architecture | 0/0 | Not started | - |
| 3. Tutorial Documentation | 0/0 | Not started | - |
| 4. Home Assistant Integration | 0/0 | Not started | - |
| 5. Testing & Deployment | 0/0 | Not started | - |

---

*Roadmap created: 2026-03-04*
