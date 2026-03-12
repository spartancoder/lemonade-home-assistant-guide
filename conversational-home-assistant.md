---
layout: default
title: Home Assistant Configuration
parent: Conversational Setup
nav_order: 3
description: "Configure Home Assistant voice assistant pipeline"
last_modified_date: 2026-03-11
---

# Home Assistant Configuration

Configure the complete voice assistant pipeline in Home Assistant.

## Prerequisites

- **Lemonade Server running** - Required to host AI models locally (see [STT Setup](/stt-lemonade-setup), [TTS Setup](/tts-lemonade-setup))
- **Home Assistant 2024.12+** - Version with Wyoming protocol support
- **HACS installed** - For installing Wyoming integration
- **Wyoming integration installed** - Connects Lemonade to Home Assistant

See [LLM Configuration](/llm-configuration) for model setup and [Embedding Model](/embedding-model) for semantic search configuration.

## Pipeline Components

Your voice assistant uses four key components working together:

| Component | Service | Purpose |
|-----------|---------|---------|
| **STT Endpoint** | Whisper Large v3 Turbo | Converts speech to text |
| **LLM Endpoint** | Qwen3-4B or gpt-oss-20b | Processes intent and generates responses |
| **TTS Endpoint** | Kokoro v1 | Converts response text to speech |
| **Embedding Endpoint** | nomic-embed-text-v2-moe | Provides context for smarter responses |

Each component runs on Lemonade Server and connects to Home Assistant via the Wyoming protocol.

## Configuration

### 1. Create Voice Assistant Pipeline

In Home Assistant, go to **Settings > Voice assistants > Add Assistant**:

Configure the pipeline with these settings:

| Setting | Value | Notes |
|---------|-------|-------|
| Name | Local Voice Assistant | Choose a descriptive name |
| Conversation Agent | Wyoming (LLM) | Select your Wyoming LLM integration |
| STT | Wyoming (STT) | Select your STT service |
| TTS | Wyoming (TTS) | Select your TTS service |
| Wake Word | openWake (optional) | For hands-free activation |
| Language | en | Set your preferred language |

Click **Create** to save your pipeline.

### 2. Configure Wake Word (Optional)

For hands-free activation, install openWake:

**Via Home Assistant Terminal:**

```bash
# Install openWake addon
ha addons install openwake
```

**Via HACS:**

1. Go to **HACS > Integrations**
2. Search for "OpenWake"
3. Click **Download**
4. Restart Home Assistant

After installation, configure openWake in **Settings > Voice assistants** and select it as the wake word provider.

### 3. Test the Pipeline

Test your voice assistant using Developer Tools:

**Via Services:**

```yaml
# Developer Tools > Services
service: conversation.process
data:
  text: "Turn on the living room lights"
```

**Via Voice:**

1. Open the Home Assistant sidebar
2. Click the microphone icon (if available)
3. Speak: "What lights are on?"

{: .note }
> **Verify your pipeline works** by testing these commands:
>
> 1. **"What lights are on?"** - Should list active lights
> 2. **"Turn on the living room lights"** - Should confirm the action
> 3. **"What time is it?"** - Should report current time
>
> If commands don't work, check your Wyoming integration logs in **Settings > System > Logs**.

## Troubleshooting Quick Checks

If your voice assistant doesn't respond:

1. **Check Lemonade Server** - Verify it's running: `lemonade-server status`
2. **Check Wyoming Integration** - Look for errors in **Settings > System > Logs**
3. **Check Model Status** - Ensure all models are loaded in Lemonade

For detailed troubleshooting, see the [References](/references) page for documentation links.

## Next Steps

After completing configuration, see [Usage Examples](/usage-examples) for practical commands to try with your voice assistant.
