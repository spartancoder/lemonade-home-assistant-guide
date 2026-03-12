---
layout: default
title: Lemonade Setup
parent: Text-to-Speech
nav_order: 1
description: "Configure Kokoro speech synthesis in Lemonade Server"
last_modified_date: 2026-03-11
---

# Lemonade Setup (Kokoro)

Configure Kokoro-v1 for speech synthesis in Lemonade Server.

## Model Overview

**Kokoro v1** is a neural text-to-speech model that produces natural-sounding speech:

- **Size**: ~300MB
- **Voice options**: Multiple male and female voices with different accents
- **Performance**: Optimized for real-time generation
- **Quality**: Natural prosody and intonation

## Prerequisites

Before configuring TTS, ensure you have:

- **Lemonade Server installed and running** - See [Installation](/debian-installation) if not yet set up
- **Sufficient RAM** - 4GB+ recommended for TTS alongside other models
- **Internet connection** - Required for initial model download
- **Audio output device** - Speaker or headphones connected to test audio

## 1. Download Kokoro Model

Download the Kokoro v1 model to your Lemonade Server installation:

```bash
# Navigate to Lemonade models directory
cd ~/.config/lemonade-server/models

# Download Kokoro v1
lemonade-server download kokoro-v1

# Verify download completed
ls -la kokoro-v1/
```

The download includes the model weights and voice configuration files.

## 2. Choose Your Voice

Kokoro includes multiple voice options. List available voices:

```bash
# List all available voices
lemonade-server voices --list
```

Common voice options:

| Voice ID | Description | Best For |
|----------|-------------|----------|
| af_bella | Female, American | General use, warm tone |
| af_sarah | Female, American | Clear, professional responses |
| am_adam | Male, American | Conversational interactions |
| bf_emma | Female, British | British English pronunciation |

Test a voice before configuring:

```bash
# Test voice output directly
lemonade-server speak --voice af_bella "Hello, this is a test of the voice output."
```

## 3. Configure Lemonade Server

Edit the Lemonade Server configuration to enable TTS:

```bash
# Open configuration file
nano ~/.config/lemonade-server/config.yaml
```

Add or update the TTS section:

```yaml
tts:
  enabled: true
  model: kokoro-v1
  device: cuda          # Use 'cpu' if no GPU available
  default_voice: af_bella
  sample_rate: 22050    # Audio quality (Hz)
```

Configuration options:

| Option | Description | Default |
|--------|-------------|---------|
| `enabled` | Enable/disable TTS service | `false` |
| `model` | Model to use for synthesis | `kokoro-v1` |
| `device` | Processing device (`cuda` or `cpu`) | `cuda` |
| `default_voice` | Default voice for synthesis | `af_bella` |
| `sample_rate` | Audio sample rate in Hz | `22050` |

## 4. Restart Lemonade Server

Apply configuration changes by restarting the service:

```bash
# Restart the service
sudo systemctl restart lemonade-server

# Check logs for successful startup
journalctl -u lemonade-server -f
```

Look for log messages confirming Kokoro model loaded successfully.

{: .note }
> ✅ **Verify your setup works** by testing the TTS endpoint:
>
> ```bash
> # Generate speech from text
> curl -X POST http://localhost:8080/v1/audio/speech \
>   -H "Content-Type: application/json" \
>   -d '{"input": "Hello, this is a test.", "voice": "af_bella"}' \
>   --output test.wav
>
> # Play the result
> aplay test.wav  # Linux
> ```
>
> You should hear "Hello, this is a test." through your speakers.

## Next Steps

Once TTS is working in Lemonade Server, connect it to Home Assistant:

- [Home Assistant Configuration](/tts-home-assistant) - Integrate TTS with your voice assistant
