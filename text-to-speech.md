---
layout: default
title: Text-to-Speech
nav_order: 5
has_children: true
description: "Speech synthesis with Kokoro"
last_modified_date: 2026-03-11
---

# Text-to-Speech

Set up Kokoro for speech synthesis with Lemonade Server and integrate with Home Assistant for voice responses.

## What is Text-to-Speech?

Text-to-Speech (TTS) converts written text into spoken audio. When your voice assistant processes a request, it uses TTS to speak the response back to you through your speakers.

## Why Use Kokoro Locally?

Running Kokoro TTS locally provides:

- **Privacy** - All voice generation happens on your hardware, no data sent to cloud services
- **No API costs** - Generate unlimited speech without usage fees
- **Low latency** - Local processing means faster response times
- **Offline capability** - Works without internet connection

## The Model: Kokoro v1

Kokoro v1 is a high-quality neural TTS model that produces natural-sounding speech:

- Multiple voice options (male and female voices with different accents)
- Optimized for real-time generation
- Natural prosody and intonation
- Compact model size (~300MB)

See [References](/references#models) for full model details and download links.

## Text-to-Speech Components

Your TTS system has three main components:

```
Text Input → Lemonade Server (Kokoro) → Audio Output → Home Assistant → Speaker
```

**Setup requires two steps:**

1. **Configure Kokoro in Lemonade Server** - Download the model and configure voice settings
2. **Connect Home Assistant via Wyoming protocol** - Enable TTS for your voice assistant

## Pages in This Section

- [Lemonade Setup](/tts-lemonade-setup) - Download and configure the Kokoro model
- [Home Assistant Configuration](/tts-home-assistant) - Connect TTS to your voice assistant

## Prerequisites

Before setting up TTS, ensure you have:

- **Lemonade Server installed and running** - See [Installation](/debian-installation) if not yet installed
- **Speaker connected to Home Assistant device** - For audio output during voice assistant responses
