---
layout: default
title: Home Assistant Configuration
parent: Speech-to-Text
nav_order: 2
description: "Configure Home Assistant to use Lemonade Server STT"
last_modified_date: 2026-03-10
---

# Home Assistant Configuration

Configure Home Assistant to use Lemonade Server for speech-to-text via the Wyoming protocol.

## Prerequisites

Before connecting Home Assistant, ensure you have:

- **Lemonade Server running with Whisper configured** - See [Lemonade Setup](/stt-lemonade-setup) for configuration
- **Home Assistant 2024.12+** - Required for Wyoming protocol support
- **HACS installed** - For installing the Wyoming integration
- **Network connectivity** - Home Assistant must be able to reach Lemonade Server

## Wyoming Protocol

**Wyoming** is an open protocol for connecting voice assistant components. It enables Home Assistant to communicate with external speech-to-text and text-to-speech services.

```text
Home Assistant ←→ Wyoming Protocol (Port 10200) ←→ Lemonade Server (Whisper)
```

The Wyoming integration acts as a bridge, allowing Home Assistant to send audio to Lemonade Server and receive transcribed text back.

## 1. Install Wyoming Integration

### Via HACS (Recommended)

1. In Home Assistant, go to **Settings → Devices & Services**
2. Click **Add Integration** (bottom right)
3. Search for **"Wyoming"**
4. Click to install the integration

### Manual HACS Installation

If the integration doesn't appear in the default repository:

```yaml
# In HACS:
# 1. Go to Integrations → Custom Repositories
# 2. Add repository: https://github.com/rhasspy/wyoming-homeassistant
# 3. Category: Integration
# 4. Click Add, then install the integration
```

## 2. Configure Wyoming Connection

After installation, add the Wyoming integration:

1. Go to **Settings → Devices & Services → Add Integration**
2. Search for **Wyoming**
3. Enter the connection details:

| Field | Value |
|-------|-------|
| Host | IP address of Lemonade Server (e.g., `192.168.1.100`) |
| Port | `10200` (default Wyoming port) |

{: .note }
> If Lemonade Server is running on the same machine as Home Assistant, use `localhost` or `127.0.0.1` as the host.

## 3. Set as Default STT

Edit your Home Assistant `configuration.yaml`:

```yaml
# Home Assistant configuration.yaml
stt:
  - platform: wyoming
    host: 192.168.1.100  # Your Lemonade Server IP
    port: 10200
```

### Restart Home Assistant

```bash
# Via SSH (if available)
ha core restart

# Or via UI: Settings → System → Restart
```

## 4. Test Voice Input

{: .note }
> ✅ **Test voice input** in Home Assistant:
>
> 1. Go to **Settings → Voice assistants**
> 2. Create a new voice assistant or edit an existing one
> 3. Set **Speech-to-Text** to your Wyoming integration
> 4. Click **Test** and speak a command
> 5. Verify that the transcribed text appears in the response

## Troubleshooting Tips

- **Wyoming service not found**: Verify Lemonade Server is running with `sudo systemctl status lemonade-server`
- **Connection refused**: Check firewall rules allow traffic on port 10200
- **No transcription returned**: Verify the Whisper model is loaded in Lemonade Server logs
- **Slow responses**: Ensure network latency is low between Home Assistant and Lemonade Server
- **Check Home Assistant logs**: Go to **Settings → System → Logs** for detailed error messages

## Next Steps

Now that STT is configured, set up Text-to-Speech for complete voice assistant capabilities:

→ [Text-to-Speech](/text-to-speech)
