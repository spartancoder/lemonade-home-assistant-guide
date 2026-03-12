---
layout: default
title: Usage Examples
nav_order: 7
description: "Example voice commands and automations"
last_modified_date: 2026-03-11
---

# Usage Examples

Examples of using your voice assistant with Home Assistant.

## Basic Commands

Control devices with natural language:

| Command | What It Does |
|---------|-------------|
| "Turn on the living room lights" | Turns on lights in living room |
| "Turn off the bedroom lights" | Turns off lights in bedroom |
| "Set the thermostat to 72 degrees" | Changes thermostat setting |
| "Lock the front door" | Locks a door |
| "Unlock the back door" | Unlocks a door (if enabled) |
| "Open the garage door" | Opens garage door |
| "Turn on the fan" | Activates a fan |

{: .note }
> Your voice assistant uses natural language understanding, so variations like "Can you turn on the living room lights?" or "Please switch on the living room lights" will also work.

## Query Examples

Get information from Home Assistant:

| Query | Response Example |
|-------|-------------------|
| "What's the temperature?" | "The temperature is 72 degrees Fahrenheit." |
| "What time is it?" | "It's currently 3:45 PM." |
| "Is the garage door open?" | "Yes, the garage door is open." |
| "What's the battery level?" | "The battery is at 85 percent." |
| "Are any lights on?" | "Yes, the living room lights are on." |
| "What's the humidity?" | "The humidity is 45 percent." |

The assistant can access any sensor or entity in your Home Assistant setup.

## Automations

### Trigger Automations with Voice

Trigger your existing automations with voice commands:

| Trigger | Action |
|---------|--------|
| "Good morning" | Turn on lights, report weather |
| "Good night" | Turn off lights, lock doors |
| "I'm leaving" | Turn off all lights, lock doors |
| "Movie time" | Dim lights, close blinds |
| "Bedtime" | Turn off all lights, set thermostat |

### Create Voice-Triggered Automation

Add voice triggers to your automations in `automations.yaml`:

```yaml
automation:
  alias: "Good Morning Routine"
  description: "Triggered by voice command 'Good morning'"
  trigger:
    - platform: conversation
      text: "Good morning"
  action:
    - service: light.turn_on
      target:
        entity_id: light.living_room
    - service: tts.speak
      data:
        message: "Good morning! It's going to be a sunny day."
```

{: .note }
> Voice-triggered automations work with any phrase you define. The LLM will match similar phrases even if not exact.

## Conversation Examples

Multi-turn conversations with context awareness:

### Device Control

```conversation
User: "Turn on the living room lights"
Assistant: "Turning on the living room lights now."

User: "Thanks! Also turn on the bedroom lights."
Assistant: "I've turned on the bedroom lights as well."

User: "What lights are on now?"
Assistant: "The living room and bedroom lights are currently on."
```

### Information Query

```conversation
User: "What's the temperature inside?"
Assistant: "The current indoor temperature is 72 degrees Fahrenheit."

User: "Is that comfortable?"
Assistant: "72 degrees is generally considered comfortable for most people."

User: "What about outside?"
Assistant: "The outdoor temperature is 68 degrees Fahrenheit."
```

### Complex Commands

```conversation
User: "Set the thermostat to 70 degrees and turn off the kitchen lights."
Assistant: "I've set the thermostat to 70 degrees and turned off the kitchen lights."

User: "Good night."
Assistant: "Good night! I've turned off all the lights and locked the doors."
```

### Contextual Follow-ups

```conversation
User: "Turn on the lights"
Assistant: "Which lights would you like me to turn on?"

User: "The living room"
Assistant: "Turning on the living room lights."

User: "And dim them to 50%"
Assistant: "I've dimmed the living room lights to 50 percent."
```

## Tips for Best Results

1. **Speak naturally** - No need for robotic commands
2. **Be specific when needed** - "living room lights" vs "lights"
3. **Use follow-up questions** - The assistant remembers context
4. **Check entity names** - Use names as configured in Home Assistant

## Related Sections

- [Home Assistant Configuration](/conversational-home-assistant) - Pipeline setup
- [References](/references) - External resources and documentation
