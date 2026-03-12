---
layout: default
title: Home Assistant Configuration
parent: Text-to-Speech
nav_order: 2
description: "Configure Home Assistant to use Lemonade Server TTS"
last_modified_date: 2026-03-11
---

# Home Assistant Configuration

Configure Home Assistant to use Lemonade Server for text-to-speech synthesis.

## Prerequisites

Before connecting Home Assistant to TTS, ensure you have:

- **Lemonade Server running with Kokoro configured** - See [Lemonade Setup](/tts-lemonade-setup) for setup instructions
- **Home Assistant 2024.12+** - Version with Wyoming protocol support
- **HACS installed** - For installing the Wyoming integration

## Wyoming Protocol

The Wyoming protocol handles both speech-to-text (STT) and text-to-speech (TTS) communication between Home Assistant and local AI services. If you already set up Wyoming for STT, the same integration can be used for TTS.

Wyoming uses a simple TCP connection to stream audio and text between services, enabling low-latency voice interactions.

## 1. Add Wyoming TTS Integration

The Wyoming integration handles both STT and TTS. If you already added it for speech-to-text, you may just need to enable TTS functionality.

**If not yet added:**

1. In Home Assistant, go to **Settings > Devices & Services**
2. Click **Add Integration** (bottom right)
3. Search for **Wyoming** and select it
4. Enter the connection details:

| Field | Value |
|-------|-------|
| Host | IP address of Lemonade Server (e.g., `192.168.1.100`) |
| Port | `10200` |

1. Click **Submit** to add the integration

## 2. Configure TTS in Home Assistant

Edit your Home Assistant configuration to use Wyoming for TTS:

```bash
# Edit configuration.yaml
nano /config/configuration.yaml
```

Add the TTS platform configuration:

```yaml
# Home Assistant configuration.yaml
tts:
  - platform: wyoming
    host: 192.168.1.100  # Your Lemonade Server IP
    port: 10200
    voice: af_bella      # Default voice
```

Replace `192.168.1.100` with your Lemonade Server's IP address.

Restart Home Assistant to apply changes:

```bash
# Restart Home Assistant
ha core restart
```

## 3. Set Voice per Assistant

You can configure different voices for different voice assistants:

**Via UI:**

1. Go to **Settings > Voice assistants**
2. Edit your voice assistant
3. Under **Text-to-Speech**, select:
   - Service: **Wyoming**
   - Voice: Choose from available voices (af_bella, af_sarah, am_adam, etc.)
4. Save changes

**Via YAML:**

```yaml
# In voice assistant configuration
tts:
  service: wyoming
  voice: am_adam  # Male voice for this assistant
```

### Available Voices

The voices available depend on your Kokoro installation. Common options:

| Voice ID | Description |
|----------|-------------|
| af_bella | Female, American - warm tone |
| af_sarah | Female, American - professional |
| am_adam | Male, American - conversational |
| bf_emma | Female, British - British English |

{: .note }
> ✅ **Test voice output** in Home Assistant:
>
> 1. Go to **Settings > Voice assistants**
> 2. Select your voice assistant
> 3. Click **Test**
> 4. Type a message like "Hello, this is a test of the TTS system."
> 5. Click **Send**
> 6. You should hear the response through your speaker

### Test via Service Call

You can also test TTS directly using Developer Tools:

1. Go to **Developer Tools > Services**
2. Search for `tts.wyoming_say`
3. Call the service with:

```yaml
service: tts.wyoming_say
target:
  entity_id: media_player.your_speaker
data:
  message: "Hello! The voice assistant is working correctly."
```

Replace `media_player.your_speaker` with your actual media player entity.

## Troubleshooting

**No audio output:**

- Verify your media player is connected and working
- Check that the Wyoming integration shows as connected in Settings
- Ensure the TTS platform is configured in configuration.yaml

**Wrong voice:**

- Verify the voice ID in your configuration matches an available voice
- Check that the voice name is spelled correctly (case-sensitive)

**Connection errors:**

- Confirm Lemonade Server is running and accessible
- Verify the IP address and port are correct
- Check firewall rules allow traffic on port 10200

## Next Steps

With TTS configured, your voice assistant can now respond with spoken audio:

- [Conversational Setup](/conversational-setup) - Configure the LLM for conversation
- [Usage Examples](/usage-examples) - Try practical voice commands
