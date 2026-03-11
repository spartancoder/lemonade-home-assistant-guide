---
layout: default
title: Embedding Model
parent: Conversational Setup
nav_order: 2
description: "Configure nomic-embed-text embedding model"
last_modified_date: 2026-03-11
---

# Embedding Model

Configure the embedding model for semantic search and conversation memory. The embedding model converts text into vector representations, enabling your voice assistant to understand context and find relevant information from previous conversations.

## What are Embeddings?

Embeddings are numerical representations (vectors) of text that capture semantic meaning. When two pieces of text have similar meanings, their embedding vectors will be close together in vector space. This enables:

- **Semantic search**: Find relevant information based on meaning, not just keywords
- **Conversation memory**: Remember context from previous interactions
- **Similarity matching**: Identify related topics and responses

The **nomic-embed-text-v2-moe** model used here produces 768-dimensional vectors optimized for conversational AI applications.

## Prerequisites

- **Lemonade Server installed and running** - See [Installation](/installation) for setup
- **LLM configured** - See [LLM Configuration](/llm-configuration) to set up your language model first
- **4GB+ RAM** - Memory for loading and running the embedding model

## Model Download

### 1. Download the Embedding Model

Download nomic-embed-text-v2-moe for semantic search:

```bash
# Navigate to models directory
cd ~/.config/lemonade-server/models

# Download nomic embedding model
lemonade-server download nomic-embed-text-v2-moe

# Verify download completed
ls -la nomic-embed-text-v2-moe/

# Expected: Model files (~275MB total)
```

## Configuration

### 2. Configure Lemonade Server

Edit the configuration file to enable the embedding model:

```bash
# Open configuration file
nano ~/.config/lemonade-server/config.yaml
```

Add the embedding configuration:

```yaml
embedding:
  enabled: true
  model: nomic-embed-text-v2-moe
  device: cuda              # Use 'cuda' for GPU, 'cpu' for CPU-only, 'npu' for AMD NPU
  dimension: 768            # Vector dimension (don't change)
```

**Device options:**
- `cuda`: NVIDIA GPU acceleration (recommended if available)
- `npu`: AMD Ryzen AI NPU acceleration
- `cpu`: CPU-only (slower but works everywhere)

Save and exit (Ctrl+O, Enter, Ctrl+X).

### 3. Restart Lemonade Server

Apply the configuration changes:

```bash
# Restart the service
sudo systemctl restart lemonade-server

# Verify service is running
sudo systemctl status lemonade-server
```

## Verification

{: .note }
> ✅ **Verify embedding works** by generating a vector:
> ```bash
> curl -X POST http://localhost:8080/v1/embeddings \
>   -H "Content-Type: application/json" \
>   -d '{
>     "model": "nomic-embed-text-v2-moe",
>     "input": "This is a test sentence."
>   }'
> ```
>
> Expected response: JSON with a 768-dimensional vector in `data[0].embedding`
> 
> Example response structure:
> ```json
> {
>   "object": "list",
>   "data": [
>     {
>       "object": "embedding",
>       "index": 0,
>       "embedding": [0.0123, -0.0456, 0.0789, ...]
>     }
>   ],
>   "model": "nomic-embed-text-v2-moe"
> }
> ```

## How Embeddings Work in Your Voice Assistant

The embedding model enables your assistant to:

1. **Store conversation context**: Each message is converted to a vector and stored
2. **Find relevant history**: When you ask a question, the assistant searches for similar vectors
3. **Provide contextual responses**: The LLM uses retrieved context to generate informed answers

This creates a memory system where the assistant remembers previous conversations and can reference them appropriately.

## Configuration Reference

| Setting | Value | Description |
|---------|-------|-------------|
| `enabled` | `true` / `false` | Enable or disable embedding model |
| `model` | `nomic-embed-text-v2-moe` | Model identifier |
| `device` | `cuda` / `npu` / `cpu` | Acceleration device |
| `dimension` | `768` | Output vector dimension (fixed for this model) |

## Next Steps

After configuring the embedding model, proceed to [Home Assistant Configuration](/conversational-home-assistant) to integrate the LLM and embedding model into your voice assistant pipeline.
