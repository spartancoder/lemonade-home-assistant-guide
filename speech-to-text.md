---
layout: default
title: Speech-to-Text
nav_order: 4
has_children: true
description: "Speech recognition with Whisper"
last_modified_date: 2026-03-10
---

# Speech-to-Text

Set up Whisper for speech recognition with Lemonade Server and integrate with Home Assistant.

## What is Speech-to-Text?

Speech-to-Text (STT) converts spoken audio into written text. When you speak to your voice assistant, STT processes the audio and transcribes it into text that Home Assistant can understand and act upon.

### Why Use Whisper Locally?

- **Privacy** - Your voice data never leaves your network
- **No API costs** - Run unlimited transcriptions without per-use fees
- **Offline capability** - Works without internet connection
- **Low latency** - Local processing is faster than cloud services

## The Model: Whisper Large v3 Turbo

**Whisper Large v3 Turbo** is a fast, accurate speech recognition model from OpenAI, optimized for real-time transcription on consumer hardware. It provides excellent accuracy while being small enough (~1.5GB) to run efficiently on most systems.

For complete model specifications and download options, see the [References](/references#models) page.

## Speech-to-Text Components

Your voice assistant's STT pipeline works like this:

```
Voice Input → Lemonade Server (Whisper) → Text Output → Home Assistant
```

### Two Required Steps

1. **Configure Whisper in Lemonade Server** - Download and set up the Whisper model
2. **Connect Home Assistant via Wyoming protocol** - Enable Home Assistant to use the STT endpoint

## Pages in This Section

- [Lemonade Setup](/stt-lemonade-setup) - Download and configure the Whisper model
- [Home Assistant Configuration](/stt-home-assistant) - Connect Home Assistant to use STT

## Prerequisites

Before setting up STT, ensure you have:

- **Lemonade Server installed and running** - See [Installation](/debian-installation) if not yet installed
- **Microphone connected** - A working microphone on your Home Assistant device
- **Sufficient RAM** - 8GB+ recommended for Whisper model

Ready to set up speech recognition? Start with [Lemonade Setup](/stt-lemonade-setup).
