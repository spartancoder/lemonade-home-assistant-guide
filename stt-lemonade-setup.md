---
layout: default
title: Lemonade Setup
parent: Speech-to-Text
nav_order: 1
description: "Configure Whisper speech recognition in Lemonade Server"
last_modified_date: 2026-03-10
---

# Lemonade Setup (Whisper)

Configure Whisper-Large-v3-Turbo for speech recognition in Lemonade Server.

## Model Overview

**Whisper Large v3 Turbo** is a fast, accurate speech recognition model from OpenAI, optimized for real-time transcription on consumer hardware.

| Property | Value |
|----------|-------|
| Size | ~1.5GB |
| Language Support | Multiple languages |
| Optimization | Real-time transcription |
| Hardware | Works on CPU or GPU |

For full model details, see the [References](/references#models) page.

## Prerequisites

Before configuring Whisper, ensure you have:

- **Lemonade Server installed and running** - See [Installation](/debian-installation) if not yet installed
- **Sufficient RAM** - 8GB+ recommended for the Whisper model
- **Internet connection** - Required for initial model download
- **Storage space** - At least 2GB free for model files

## 1. Download Whisper Model

```bash
# Navigate to Lemonade models directory
cd ~/.config/lemonade-server/models

# Download Whisper Large v3 Turbo
# Note: This may take several minutes depending on connection speed
wget https://huggingface.co/openai/whisper-large-v3-turbo/resolve/main/model.bin

# Alternative: Use Lemonade's built-in download command
lemonade-server download whisper-large-v3-turbo
```

{: .note }
> The model file is approximately 1.5GB. Download time varies by connection speed. If using a GPU, ensure CUDA is installed for hardware acceleration.

## 2. Configure Lemonade Server

```bash
# Edit the configuration file
nano ~/.config/lemonade-server/config.yaml
```

Add or update the STT section:

```yaml
stt:
  enabled: true
  model: whisper-large-v3-turbo
  device: cuda          # Use 'cpu' if no GPU available
  language: en          # Set to your preferred language
  compute_type: float16 # Use 'int8' for lower memory usage
```

### Configuration Options

| Option | Values | Description |
|--------|--------|-------------|
| `enabled` | `true`, `false` | Enable or disable STT |
| `model` | Model name | Whisper model to use |
| `device` | `cuda`, `cpu` | Hardware acceleration device |
| `language` | Language code | Default transcription language |
| `compute_type` | `float16`, `int8` | Precision vs memory tradeoff |

## 3. Restart Lemonade Server

```bash
# Restart the service to apply changes
sudo systemctl restart lemonade-server

# Check logs for any errors
journalctl -u lemonade-server -f
```

{: .note }
> ✅ **Verify your setup works** by testing the STT endpoint:
>
> ```bash
> # Check STT is enabled
> curl http://localhost:8080/v1/audio/transcriptions
> 
> # Test with an audio file (if available)
> curl -X POST http://localhost:8080/v1/audio/transcriptions \
>   -H "Content-Type: multipart/form-data" \
>   -F "file=@test.wav"
> ```

## Troubleshooting Tips

- **Model not found**: Verify the model file exists in `~/.config/lemonade-server/models/`
- **Out of memory**: Try `compute_type: int8` for lower memory usage
- **Slow transcription**: Ensure `device: cuda` is set if you have a GPU
- **Service won't start**: Check logs with `journalctl -u lemonade-server -n 50`

## Next Steps

Now that Whisper is configured in Lemonade Server, connect it to Home Assistant:

→ [Home Assistant Configuration](/stt-home-assistant)
