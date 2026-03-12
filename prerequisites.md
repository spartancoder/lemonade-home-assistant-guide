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

All testing was completed with the following hardware:

1. [AMD Ryzen AI Max+ 395 (Strix Halo) - 128GB Memory - Minisform MS-S1 Max](https://www.minisforum.com/products/ms-s1-max)
2. [FutureProofHomes Sattellite1 Dev Kit](https://futureproofhomes.net/products/satellite1-pcb-dev-kit)
3. [AMD Ryzen AI 9 HX 370 (Strix Point) - 96GB Memory - Minisform N5-Pro](https://www.minisforum.com/products/n5-pro)

| Component                | Minimum       | Recommended                                                                                          | Notes                                              |
| ------------------------ | ------------- | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| CPU                      | 4 cores       | 8+ cores                                                                                             | More cores = faster parallel processing            |
| RAM                      | 16 GB         | 32 GB                                                                                                | AI models require significant memory               |
| GPU                      | Optional      | AMD or Nvidia Card with at least 12GB of VRAM                                                        | GPU Acceleration                                   |
| NPU                      | AMD Ryzen AI  | AMD Ryzen AI 300 series                                                                              | NPU acceleration (AMD only, no NVIDIA alternative) |
| Storage                  | 50 GB free    | 100 GB free                                                                                          | Models range from 2-120 GB each                    |
| Voice Assistant Hardware | Mic + Speaker | [FutureProofHomes Sattellite1 Dev Kit](https://futureproofhomes.net/products/satellite1-pcb-dev-kit) | Some device with a mic and speaker are required    |

### What and Why

- **CPU**: Handles model inference when GPU/NPU isn't available. More cores help with parallel processing.
- **RAM**: Models are loaded into memory during inference. Insufficient RAM causes swapping and slow performance.
- **GPU**: A GPU will significally increase performance when using it for running the llm that will be used for intent detection.
- **NPU**: AMD's Ryzen AI NPU provides efficient acceleration for supported models. Works with Lemonade's NPU backend.
- **Voice Assistant Hardware**: This is you interact with and control your smarthome.

## Software Dependencies

Ensure you have the following software installed before starting:

| Software         | Version       | Why Needed                     |
| ---------------- | ------------- | ------------------------------ |
| Operating System | Ubuntu 24.04+ | Tested and documented platform |

{: .note }

> This guide uses Ubuntu 24.04. Lemonade also runs on other Linux distros as well as windows. Configuraiton steps outside of installation should be similar.

## Network Requirements

Your network setup affects how Home Assistant communicates with Lemonade Server:

- **Local Network Access**: Both Home Assistant and Lemonade Server should be local to each other. Being on the same subnet is not required, but but home assistant must be able to reach the lemonade server.
- **Static IP Recommended**: Assign a static IP to your Lemonade Server machine to avoid connection issues after reboots
- **Internet for Initial Setup**: Required for downloading models (5-120 GB total); after setup, everything runs offline

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
vim filename.txt

# Run a command as superuser
sudo command

# View file contents
cat filename.txt
```


## Home Assistant Basics

This guide assumes you have Home Assistant installed and running. You should be familiar with:

- **Accessing the Home Assistant dashboard**: Logging in and navigating the UI
- **Editing configuration.yaml**: Making changes to your HA configuration
- **Installing HACS integrations**: Using the Home Assistant Community Store
- **Restarting Home Assistant**: Applying configuration changes

**New to Home Assistant?** Check the official [Home Assistant Getting Started](https://www.home-assistant.io/getting-started/) documentation before proceeding.

## Time Investment

Plan for approximately 2-4 hours to complete the full setup. Here's a breakdown by section:

| Section                    | Estimated Time | Notes                                               |
| -------------------------- | -------------- | --------------------------------------------------- |
| Installation               | 30-60 minutes  | Downloading and installing Lemonade Server          |
| STT Setup                  | 30 minutes     | Configuring Whisper for speech recognition          |
| TTS Setup                  | 30 minutes     | Configuring Kokoro for speech synthesis             |
| LLM Setup                  | 30-60 minutes  | Configuring the language model (varies by hardware) |
| Home Assistant Integration | 30 minutes     | Setting up Wyoming integration and voice pipeline   |

**Factors that affect time:**

- Internet speed (for model downloads)
- Hardware capabilities (CPU vs GPU vs NPU)
- Familiarity with Linux and Home Assistant

{: .note }

> ✅ **Before proceeding**, ensure your system meets the minimum requirements listed above. Having the right hardware and software will make the setup process much smoother.

---

**Next**: Proceed to [Installation](/installation) to set up Lemonade Server.
