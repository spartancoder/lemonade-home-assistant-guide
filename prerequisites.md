---
layout: default
title: Prerequisites
parent: Installation
nav_order: 1
description: "Prerequisites for installing Lemonade Server"
last_modified_date: 2026-03-11
---

# Prerequisites

Before installing Lemonade Server, ensure your system meets the following requirements. This page covers hardware specifications, software dependencies, network requirements, and the knowledge you'll need to complete the setup.

## Hardware Requirements

Your hardware determines how well the AI models perform. While you can run everything on a modern CPU, having a GPU or NPU significantly improves response times.

| Component | Minimum | Recommended | Notes |
|-----------|---------|-------------|-------|
| CPU | 4 cores | 8+ cores | More cores = faster parallel processing |
| RAM | 16 GB | 32 GB | AI models require significant memory |
| GPU | Optional | NVIDIA RTX 3060+ (12GB VRAM) | CUDA acceleration for GPU inference |
| NPU | AMD Ryzen AI | AMD Ryzen AI 300 series | NPU acceleration (AMD only, no NVIDIA alternative) |
| Storage | 50 GB free | 100 GB free | Models range from 2-20 GB each |
| Microphone | Any USB mic | Quality USB mic | Better audio input improves STT accuracy |
| Speaker | Any speaker | Quality speakers/headphones | For TTS audio output |

### What and Why

- **CPU**: Handles model inference when GPU/NPU isn't available. More cores help with parallel processing.
- **RAM**: Models are loaded into memory during inference. Insufficient RAM causes swapping and slow performance.
- **GPU**: NVIDIA GPUs with CUDA support dramatically speed up inference. A mid-range RTX card (3060 or better) provides excellent performance.
- **NPU**: AMD's Ryzen AI NPU provides efficient acceleration for supported models. Works with Lemonade's NPU backend.
- **Storage**: You'll download multiple AI models (STT, TTS, LLM, embedding). SSD recommended for faster model loading.
- **Microphone**: Clear audio input is essential for accurate speech recognition. Avoid cheap built-in laptop microphones if possible.

## Software Dependencies

Ensure you have the following software installed before starting:

| Software | Version | Why Needed |
|----------|---------|------------|
| Operating System | Debian 12 (Bookworm) or Ubuntu 22.04+ | Tested and documented platform |
| Python | 3.10+ | Lemonade Server runtime |
| Home Assistant | 2024.12+ | Required for Wyoming protocol support |
| Git | Latest | Cloning repositories |
| curl | Latest | Downloading files and models |
| build-essential | Latest | Compiling some Python packages |

### Installation Commands

```bash
# Update package lists
sudo apt update

# Install Python, pip, and build tools
sudo apt install python3 python3-pip python3-venv build-essential -y

# Install Git and curl
sudo apt install git curl -y

# Verify Python version (should be 3.10+)
python3 --version
```

{: .note }
> This guide uses Debian Linux. If you're on Ubuntu 22.04+, the commands are the same. For other distributions, adapt the package manager commands accordingly.

## Network Requirements

Your network setup affects how Home Assistant communicates with Lemonade Server:

- **Local Network Access**: Both Home Assistant and Lemonade Server must be on the same LAN
- **Static IP Recommended**: Assign a static IP to your Lemonade Server machine to avoid connection issues after reboots
- **Home Assistant Accessible**: Ensure you can access Home Assistant from the machine running Lemonade Server
- **Internet for Initial Setup**: Required for downloading models (5-20 GB total); after setup, everything runs offline

### Network Configuration Tips

```bash
# Find your current IP address
ip addr show | grep inet

# Note this IP for Home Assistant configuration
# Example: 192.168.1.100
```

## Linux Basics

This guide assumes basic familiarity with Linux. You should be comfortable with:

- **Opening a terminal**: Using your preferred terminal emulator
- **Running commands with sudo**: Understanding when elevated privileges are needed
- **Editing text files**: Using nano, vim, or your preferred editor
- **Understanding file paths**: Navigating directories and referencing files
- **Basic command-line operations**: ls, cd, cp, mv, rm, cat

### Quick Reference

```bash
# Navigate to a directory
cd /path/to/directory

# List files in current directory
ls -la

# Edit a file with nano
nano filename.txt

# Run a command as superuser
sudo command

# View file contents
cat filename.txt
```

**New to Linux?** We recommend the [Linux Journey](https://linuxjourney.com/) tutorial for a gentle introduction to command-line basics.

## Home Assistant Basics

This guide assumes you have Home Assistant installed and running. You should be familiar with:

- **Accessing the Home Assistant dashboard**: Logging in and navigating the UI
- **Editing configuration.yaml**: Making changes to your HA configuration
- **Installing HACS integrations**: Using the Home Assistant Community Store
- **Restarting Home Assistant**: Applying configuration changes

**New to Home Assistant?** Check the official [Home Assistant Getting Started](https://www.home-assistant.io/getting-started/) documentation before proceeding.

## Time Investment

Plan for approximately 2-4 hours to complete the full setup. Here's a breakdown by section:

| Section | Estimated Time | Notes |
|---------|----------------|-------|
| Installation | 30-60 minutes | Downloading and installing Lemonade Server |
| STT Setup | 30 minutes | Configuring Whisper for speech recognition |
| TTS Setup | 30 minutes | Configuring Kokoro for speech synthesis |
| LLM Setup | 30-60 minutes | Configuring the language model (varies by hardware) |
| Home Assistant Integration | 30 minutes | Setting up Wyoming integration and voice pipeline |

**Factors that affect time:**
- Internet speed (for model downloads)
- Hardware capabilities (CPU vs GPU vs NPU)
- Familiarity with Linux and Home Assistant

{: .note }
> ✅ **Before proceeding**, ensure your system meets the minimum requirements listed above. Having the right hardware and software will make the setup process much smoother.

---

**Next**: Proceed to [Installation](/installation) to set up Lemonade Server.
