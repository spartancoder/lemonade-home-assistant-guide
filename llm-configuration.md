---
layout: default
title: LLM Configuration
parent: Conversational Setup
nav_order: 1
description: "Configure language model with GPU or NPU acceleration"
last_modified_date: 2026-03-09
---

# LLM Configuration

Configure the language model for conversation. Choose your acceleration method below.

## Model Options

| Model | Size | Best For |
|-------|------|----------|
| Qwen3-4B-Instruct-2507-GGUF | 4B | General conversation, faster response |
| gpt-oss-20b-mxfp4-GGUF | 20B | Complex reasoning, detailed responses |

## GPU Setup

<details>
<summary>Click to expand GPU configuration</summary>

### Prerequisites

Content coming in Phase 3...

### Configuration

Example configuration (placeholder):

```bash
# filename: /etc/lemonade-server/config.yaml
llm:
  model: qwen3-4b-instruct-2507-gguf
  device: cuda
  context_length: 4096
```

### Verification

Content coming in Phase 3...

</details>

## NPU Setup (AMD Ryzen AI)

<details>
<summary>Click to expand NPU configuration</summary>

### Prerequisites

Content coming in Phase 3...

### Configuration

Example configuration (placeholder):

```bash
# filename: /etc/lemonade-server/config.yaml
llm:
  model: qwen3-4b-instruct-2507-gguf
  device: npu
  context_length: 4096
```

### Verification

Content coming in Phase 3...

</details>

## Next Steps

After configuring the LLM, proceed to [Embedding Model](/embedding-model) setup.
