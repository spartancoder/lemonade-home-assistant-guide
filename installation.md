---
layout: default
title: Installation
nav_order: 3
has_children: true
description: "Install Lemonade Server on your platform"
last_modified_date: 2026-03-11
---

# Installation

Get Lemonade Server running on your system. This section covers installation for supported platforms with step-by-step instructions.

## Choose Your Platform

| Platform | Status | Recommended For |
|----------|--------|-----------------|
| [Linux](/linux) | ✅ Supported | Production use, servers, development |
| [Windows](/windows-installation) | 🚧 Coming Soon | Desktop use (use WSL alternative) |

## Prerequisites Check

Before installing, ensure you have:

- **Hardware**: 16GB RAM minimum, 32GB+ recommended for larger models
- **Storage**: 20GB+ free disk space for models and dependencies
- **Python**: Python 3.10 or higher

{: .note }
> See [Prerequisites](/prerequisites) for complete hardware and software requirements.

## What You'll Install

Lemonade Server includes:

- **Core Server** - HTTP API for model inference
- **Model Support** - STT, LLM, TTS, and embedding models
- **Home Assistant Integration** - Wyoming protocol support for voice assistant
- **Systemd Service** - Auto-start on boot (Linux)

## Next Steps

1. **Linux Users**: Go to [Linux](/linux) and select your distribution
2. **Windows Users**: See [Windows Installation](/windows-installation) for WSL alternative

---

*Installation typically takes 10-15 minutes depending on your internet connection.*
