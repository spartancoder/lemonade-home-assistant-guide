# Requirements: Lemonade Home Assistant Guide

**Defined:** 2025-03-04
**Core Value:** Users can set up a complete local voice assistant system that works entirely offline with their own AI models, ensuring privacy while providing full control over the conversation pipeline.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Infrastructure & Setup

- [x] **INFRA-01**: GitHub Pages site with Jekyll 3.10.0 hosting configured
- [ ] **INFRA-02**: Clear navigation structure implemented with sidebar or top menu
- [ ] **INFRA-03**: Code syntax highlighting with Rouge for all code blocks
- [ ] **INFRA-04**: Code copy functionality with click-to-copy for all code examples
- [ ] **INFRA-05**: Table of contents (TOC) automatically generated for each tutorial section
- [x] **INFRA-06**: Responsive design working on desktop, mobile, and tablets
- [ ] **INFRA-07**: Clear headings hierarchy (H1, H2, H3) consistently applied
- [ ] **INFRA-08**: Cross-linking between tutorial sections implemented
- [ ] **INFRA-09**: Version/date information displayed on all pages
- [x] **INFRA-10**: Dark mode support implemented
- [ ] **INFRA-11**: Downloadable resources section with config files and scripts
- [ ] **INFRA-12**: Git LFS configured for large files (>100MB)

### Content Management

- [ ] **CONT-01**: All tutorial content written in Markdown with proper front matter
- [ ] **CONT-02**: Front matter includes title, layout, order, and metadata for all pages
- [ ] **CONT-03**: Version pinning in all code examples and configuration instructions

### Documentation Sections

- [ ] **DOC-01**: Introduction section covering what is Lemonade Server, why local voice assistant, architecture overview, hardware requirements, and tutorial roadmap
- [ ] **DOC-02**: Prerequisites section covering Linux basics, Home Assistant basics, hardware requirements, and software dependencies
- [ ] **DOC-03**: Debian Linux installation guide with system update, dependencies, lemonade-server setup, systemd service, and verification
- [ ] **DOC-04**: Windows installation placeholder with note about future support
- [ ] **DOC-05**: Whisper-Large-v3-Turbo (STT) model setup guide
- [ ] **DOC-06**: kokoro-v1 (TTS) model setup guide
- [ ] **DOC-07**: Qwen3-4B-Instruct-2507-GGUF (LLM primary) model setup guide
- [ ] **DOC-08**: gpt-oss-20b-mxfp4-GGUF (LLM secondary) model setup guide
- [ ] **DOC-09**: nomic-embed-text-v2-moe-GGUF (embedding) model setup guide
- [ ] **DOC-10**: AMD Ryzen AI NPU acceleration setup guide
- [ ] **DOC-11**: Home Assistant integration guide with plugin installation, STT/LLM/TTS/Embedding endpoint configuration, and testing
- [ ] **DOC-12**: Voice assistant configuration guide with pipeline setup, conversation agent, wake word, and full pipeline testing
- [ ] **DOC-13**: Usage examples section with basic commands, automations, custom intents, and component integrations
- [ ] **DOC-14**: References section with all sources and links for Lemonade Server, Home Assistant, models, AMD NPU, and community resources

### Model Setup

- [ ] **MODEL-01**: All model download URLs are stable and version-pinned
- [ ] **MODEL-02**: Working code examples for Whisper-Large-v3-Turbo configuration
- [ ] **MODEL-03**: Working code examples for kokoro-v1 configuration
- [ ] **MODEL-04**: Working code examples for Qwen3-4B-Instruct configuration
- [ ] **MODEL-05**: Working code examples for gpt-oss-20b configuration
- [ ] **MODEL-06**: Working code examples for nomic-embed-text-v2 configuration
- [ ] **MODEL-07**: NPU-specific configuration for AMD Ryzen AI models

### Home Assistant Integration

- [ ] **HA-01**: Home Assistant 2024.12+ (latest stable) integration instructions
- [ ] **HA-02**: HACS plugin installation instructions
- [ ] **HA-03**: STT endpoint configuration with whisper.cpp
- [ ] **HA-04**: LLM endpoint configuration with llama.cpp
- [ ] **HA-05**: TTS endpoint configuration with kokoro
- [ ] **HA-06**: Embedding endpoint configuration with nomic-embed-text
- [ ] **HA-07**: Voice assistant pipeline configuration
- [ ] **HA-08**: Testing procedures for each component

### Testing & Optimization

- [ ] **TEST-01**: All code examples tested in fresh Debian environment
- [ ] **TEST-02**: External links validated with automated link checking
- [ ] **TEST-03**: Site builds successfully with Jekyll locally
- [ ] **TEST-04**: Site deploys successfully to GitHub Pages
- [ ] **TEST-05**: All navigation links verified working

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Infrastructure & Setup

- **INFRA-13**: Difficulty indicators for each section
- **INFRA-14**: Estimated reading time for each section
- **INFRA-15**: Quick reference cheat sheets
- **INFRA-16**: Prerequisites checklist with interactive checkboxes
- **INFRA-17**: Terminal/command previews with visual reinforcement
- **INFRA-18**: Architecture diagrams for system visualization
- **INFRA-19**: Search functionality (GitHub Pages native or Lunr.js)

### Content Management

- **CONT-04**: Automated link checking in CI/CD pipeline
- **CONT-05**: Content validation scripts for code examples
- **CONT-06**: Version update notifications for outdated content

### Documentation

- **DOC-15**: Windows installation guide (complete, not placeholder)
- **DOC-16**: Troubleshooting section with common issues and solutions

### Model Optimization

- **MODEL-08**: Advanced NPU optimization for AMD Ryzen AI
- **MODEL-09**: Performance tuning for all models

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Interactive code demos | Requires significant infrastructure, GitHub Pages static site only |
| Progress tracking | User-facing feature, can be added later |
| Video walkthroughs | Production-intensive, not in v1 scope |
| Community comments/discussion | Requires moderation system, out of scope |
| Multi-language support | Internationalization effort, defer to future |
| Offline PWA support | Service worker complexity, not in v1 |
| Custom wake words | Use HA default wake words, defer advanced features |
| Troubleshooting sections | Keep tutorial clean, defer to v2 |
| VM testing instructions | Users test on their own hardware |
| Advanced NPU optimization | Basic setup only, performance tuning later |
| Intel/Apple Silicon NPU | AMD Ryzen AI only, per project requirements |
| Mobile app integration | Focus on web/HA interface |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| INFRA-01 | Phase 1 | Complete |
| INFRA-02 | Phase 2 | Pending |
| INFRA-03 | Phase 2 | Pending |
| INFRA-04 | Phase 2 | Pending |
| INFRA-05 | Phase 2 | Pending |
| INFRA-06 | Phase 1 | Complete |
| INFRA-07 | Phase 2 | Pending |
| INFRA-08 | Phase 2 | Pending |
| INFRA-09 | Phase 2 | Pending |
| INFRA-10 | Phase 1 | Complete |
| INFRA-11 | Phase 3 | Pending |
| INFRA-12 | Phase 1 | Pending |
| CONT-01 | Phase 2 | Pending |
| CONT-02 | Phase 2 | Pending |
| CONT-03 | Phase 3 | Pending |
| DOC-01 | Phase 3 | Pending |
| DOC-02 | Phase 3 | Pending |
| DOC-03 | Phase 3 | Pending |
| DOC-04 | Phase 3 | Pending |
| DOC-05 | Phase 3 | Pending |
| DOC-06 | Phase 3 | Pending |
| DOC-07 | Phase 3 | Pending |
| DOC-08 | Phase 3 | Pending |
| DOC-09 | Phase 3 | Pending |
| DOC-10 | Phase 3 | Pending |
| DOC-11 | Phase 4 | Pending |
| DOC-12 | Phase 4 | Pending |
| DOC-13 | Phase 4 | Pending |
| DOC-14 | Phase 3 | Pending |
| MODEL-01 | Phase 3 | Pending |
| MODEL-02 | Phase 3 | Pending |
| MODEL-03 | Phase 3 | Pending |
| MODEL-04 | Phase 3 | Pending |
| MODEL-05 | Phase 3 | Pending |
| MODEL-06 | Phase 3 | Pending |
| MODEL-07 | Phase 3 | Pending |
| HA-01 | Phase 4 | Pending |
| HA-02 | Phase 4 | Pending |
| HA-03 | Phase 4 | Pending |
| HA-04 | Phase 4 | Pending |
| HA-05 | Phase 4 | Pending |
| HA-06 | Phase 4 | Pending |
| HA-07 | Phase 4 | Pending |
| HA-08 | Phase 4 | Pending |
| TEST-01 | Phase 5 | Pending |
| TEST-02 | Phase 5 | Pending |
| TEST-03 | Phase 5 | Pending |
| TEST-04 | Phase 5 | Pending |
| TEST-05 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 49 total
- Mapped to phases: 49
- Unmapped: 0 ✓

---
*Requirements defined: 2025-03-04*
*Last updated: 2026-03-04 after roadmap creation*
