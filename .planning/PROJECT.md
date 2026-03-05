# Lemonade Home Assistant Guide

## What This Is

A comprehensive, beginner-friendly GitHub Pages tutorial that teaches users how to set up a local, privacy-focused voice assistant using Lemonade Server integrated with Home Assistant. The tutorial covers Debian Linux installation (with Windows placeholder), model setup for STT/LLM/TTS, AMD NPU acceleration, and full Home Assistant voice assistant configuration with usage examples.

## Core Value

Users can set up a complete local voice assistant system that works entirely offline with their own AI models, ensuring privacy while providing full control over the conversation pipeline.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] GitHub Pages site with Jekyll hosting
- [ ] Complete tutorial with all 9 documentation sections
- [ ] Working code examples and configurations
- [ ] AMD NPU (Ryzen AI) integration guide
- [ ] Model-specific setup instructions for 5 selected models
- [ ] Home Assistant integration with all components
- [ ] Usage examples demonstrating voice assistant capabilities
- [ ] Reference section with all sources and links

### Out of Scope

- Windows installation guide (reserved for future, not v1) — Focus on Debian Linux for initial release
- Troubleshooting sections (deferred to v2) — Tutorial will be streamlined without troubleshooting
- VM testing instructions — Users test on their own hardware
- Advanced NPU optimization — Basic setup only, performance tuning later
- Mobile app integration — Focus on web/HA interface
- Custom wake words — Use HA default wake words

## Context

This is a standalone GitHub Pages site for spartancoder.github.io/lemonade-home-assistant-guide/. The repository is already initialized with git. The tutorial is targeted at beginner to intermediate users who have basic Linux familiarity and want to set up a privacy-focused voice assistant. The selected models are:
- STT: Whisper-Large-v3-Turbo (whispercpp)
- LLM: Qwen3-4B-Instruct-2507-GGUF (llamacpp) - primary
- LLM: gpt-oss-20b-mxfp4-GGUF (llamacpp) - secondary
- TTS: kokoro-v1 (kokoro)
- Embedding: nomic-embed-text-v2-moe-GGUF (llamacpp)

AMD Ryzen AI NPU integration is a key feature. Home Assistant latest version will be targeted.

## Constraints

- **Hosting**: GitHub Pages with Jekyll — Free hosting, easy deployment
- **Format**: Markdown + Jekyll — Simple, maintainable, GitHub-native
- **Platform**: Debian Linux primary, Windows placeholder only — Focus effort on one platform
- **Audience**: Beginner-friendly — Explain concepts, not just commands
- **Models**: Pre-selected only — Don't research or recommend alternatives
- **NPU**: AMD Ryzen AI only — Don't cover Intel or Apple Silicon
- **Testing**: No VM testing instructions — Users test on their hardware
- **Troubleshooting**: None in v1 — Keep tutorial clean and focused
- **Timeline**: Complete tutorial (not MVP) — All 9 sections required

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Jekyll with minima theme | GitHub Pages standard, minimal setup needed | — Pending |
| Debian Linux only for v1 | Focus effort on one platform, Windows can be added later | — Pending |
| Beginner-friendly tone | Lower barrier to entry, broader audience | — Pending |
| No troubleshooting sections | Keep tutorial clean, defer to v2 or external docs | — Pending |
| AMD NPU only | User's hardware, avoid diluting focus | — Pending |
| Local development first | Test before deploying to GitHub Pages | — Pending |

---
*Last updated: 2025-03-04 after initialization*
