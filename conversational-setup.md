---
layout: default
title: Conversational Setup
nav_order: 6
has_children: true
description: "Configure LLM and embedding models for conversation"
last_modified_date: 2026-03-11
---

# Conversational Setup

Configure the conversational brain of your voice assistant. This section covers the language model (LLM) for understanding and generating responses, and the embedding model for providing context from previous conversations.

## What is the Conversational Component?

The Conversational component is the brain of your voice assistant. It uses two AI models working together:

- **LLM (Large Language Model)**: Understands your requests and generates intelligent responses
- **Embedding Model**: Creates vector representations of text for semantic search and conversation memory

Together, these models enable natural conversations where the assistant understands context and provides relevant responses.

## Components

| Component | Purpose | Model |
|-----------|---------|-------|
| LLM | Understands prompts, generates responses | Qwen3-4B or gpt-oss-20b |
| Embedding | Provides context from previous conversations | nomic-embed-text-v2-moe |

## Model Options

### LLM Models

Choose based on your hardware and needs:

- **Qwen3-4B-Instruct**: 4 billion parameters, faster responses, ideal for general conversation and quick interactions. Works well on systems with 8GB+ VRAM.
- **gpt-oss-20b**: 20 billion parameters, better reasoning capability, more detailed responses. Requires 16GB+ VRAM for optimal performance.

### Acceleration Options

Choose based on your hardware:

- **GPU (NVIDIA CUDA)**: Most compatible option with wider model support. Recommended if you have an NVIDIA GPU.
- **NPU (AMD Ryzen AI)**: Lower power consumption, optimized for AMD Ryzen AI compatible processors (Ryzen 7040 series or newer).

## Pages in This Section

- [LLM Configuration](/llm-configuration) - Set up GPU or NPU acceleration for your language model
- [Embedding Model](/embedding-model) - Configure the embedding model for conversation context
- [Home Assistant Configuration](/conversational-home-assistant) - Integrate with Home Assistant voice pipeline

## Prerequisites

Before configuring the conversational components, ensure you have:

- **Speech-to-Text configured** - See [Speech-to-Text](/speech-to-text) for Whisper setup
- **Text-to-Speech configured** - See [Text-to-Speech](/text-to-speech) for Kokoro setup
- **Lemonade Server running** - Required to host AI models locally
- **Sufficient RAM** - 16GB+ recommended for LLM, 8GB minimum for embedding model

## Next Steps

Start with [LLM Configuration](/llm-configuration) to set up your language model, then proceed to [Embedding Model](/embedding-model) for conversation context support.
