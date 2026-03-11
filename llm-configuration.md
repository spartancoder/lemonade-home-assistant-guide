---
layout: default
title: LLM Configuration
parent: Conversational Setup
nav_order: 1
description: "Configure language model with GPU or NPU acceleration"
last_modified_date: 2026-03-11
---

# LLM Configuration

Configure the language model (LLM) for your voice assistant. The LLM understands your requests and generates intelligent responses. Choose your acceleration method based on your hardware.

## Model Options

Choose your language model based on your hardware and needs:

| Model | Parameters | VRAM Required | Best For |
|-------|------------|---------------|----------|
| Qwen3-4B-Instruct-2507-GGUF | 4B | 8GB+ | General conversation, faster response, everyday use |
| gpt-oss-20b-mxfp4-GGUF | 20B | 16GB+ | Complex reasoning, detailed responses, advanced tasks |

{: .note }
> **Recommendation:** Start with Qwen3-4B for most use cases. It provides excellent performance with lower hardware requirements. Upgrade to gpt-oss-20b if you need more sophisticated reasoning.

## GPU Setup

<details>
<summary>Click to expand GPU configuration</summary>

### Prerequisites

- **NVIDIA GPU** with CUDA support (GTX 10-series or newer recommended)
- **CUDA 12.0+** installed
- **cuDNN library** installed
- **VRAM**: 8GB+ for Qwen3-4B, 16GB+ for gpt-oss-20b

### Verify CUDA Installation

Before proceeding, verify CUDA is properly installed:

```bash
# Check CUDA version (should show 12.0 or higher)
nvcc --version

# Check GPU is detected
nvidia-smi

# Expected output: GPU name, memory, driver version
```

### Model Download

Download your chosen LLM model:

```bash
# Navigate to models directory
cd ~/.config/lemonade-server/models

# Download Qwen3-4B (recommended for most users)
lemonade-server download qwen3-4b-instruct-2507-gguf

# Or download gpt-oss-20b (for complex reasoning)
# lemonade-server download gpt-oss-20b-mxfp4-gguf

# Verify download
ls -la qwen3-4b-instruct-2507-gguf/
```

### Configuration

Edit the Lemonade Server configuration file:

```bash
# Open configuration file
nano ~/.config/lemonade-server/config.yaml
```

Add or update the LLM configuration:

```yaml
llm:
  enabled: true
  model: qwen3-4b-instruct-2507-gguf
  device: cuda
  context_length: 4096      # Maximum context window
  gpu_layers: 35            # Number of layers to offload to GPU (adjust based on VRAM)
  batch_size: 512           # Batch size for processing
```

Save and exit (Ctrl+O, Enter, Ctrl+X).

### Restart Lemonade Server

Apply the configuration changes:

```bash
# Restart the service
sudo systemctl restart lemonade-server

# Verify service is running
sudo systemctl status lemonade-server
```

### Verification

{: .note }
> ✅ **Test GPU LLM** with a simple prompt:
> ```bash
> curl -X POST http://localhost:8080/v1/chat/completions \
>   -H "Content-Type: application/json" \
>   -d '{
>     "model": "qwen3-4b-instruct-2507-gguf",
>     "messages": [{"role": "user", "content": "Hello, who are you?"}]
>   }'
> ```
>
> Expected response: JSON with assistant reply in `choices[0].message.content`

### Performance Tuning

Adjust these settings based on your hardware:

| Setting | Description | Recommendation |
|---------|-------------|----------------|
| `gpu_layers` | Layers offloaded to GPU | Increase for faster inference, decrease if VRAM limited |
| `context_length` | Maximum context window | 4096 for most cases, 8192 for long conversations |
| `batch_size` | Processing batch size | 512 default, increase for better throughput |

</details>

## NPU Setup (AMD Ryzen AI)

<details>
<summary>Click to expand NPU configuration</summary>

### Prerequisites

- **AMD Ryzen AI compatible processor** (Ryzen 7040 series or newer with NPU)
- **XDNA driver** installed
- **Ryzen AI software stack** installed
- **RAM**: 16GB+ system memory recommended

### Install AMD NPU Drivers

Set up the AMD NPU support:

```bash
# Add AMD repository
wget https://repo.radeon.com/amdgpu-install/latest/ubuntu/focal/amdgpu-install_5.5.50500-1_all.deb

# Install the repository package
sudo apt install ./amdgpu-install_5.5.50500-1_all.deb

# Install NPU support (includes ROCm and HIP)
sudo amdgpu-install --usecase=rocm,hip

# Install Ryzen AI runtime
sudo apt install ryzen-ai-runtime

# Add user to render group for NPU access
sudo usermod -aG render $USER

# Log out and back in for group changes to take effect
```

### Verify NPU Detection

Check that the NPU is properly detected:

```bash
# Check XDNA device exists
ls /dev/accel/accel*

# Expected output: /dev/accel/accel0

# Check XDNA driver status
dmesg | grep -i xdma

# Verify AMD GPU/NPU is visible
rocminfo
```

### Model Download

Download the LLM model optimized for NPU:

```bash
# Navigate to models directory
cd ~/.config/lemonade-server/models

# Download Qwen3-4B (optimized for NPU)
lemonade-server download qwen3-4b-instruct-2507-gguf

# Verify download
ls -la qwen3-4b-instruct-2507-gguf/
```

### Configuration

Edit the Lemonade Server configuration file:

```bash
# Open configuration file
nano ~/.config/lemonade-server/config.yaml
```

Add or update the LLM configuration for NPU:

```yaml
llm:
  enabled: true
  model: qwen3-4b-instruct-2507-gguf
  device: npu
  context_length: 4096      # Maximum context window
```

Save and exit (Ctrl+O, Enter, Ctrl+X).

### Restart Lemonade Server

Apply the configuration changes:

```bash
# Restart the service
sudo systemctl restart lemonade-server

# Verify service is running
sudo systemctl status lemonade-server
```

### Verification

{: .note }
> ✅ **Test NPU LLM** with a simple prompt:
> ```bash
> curl -X POST http://localhost:8080/v1/chat/completions \
>   -H "Content-Type: application/json" \
>   -d '{
>     "model": "qwen3-4b-instruct-2507-gguf",
>     "messages": [{"role": "user", "content": "Hello, who are you?"}]
>   }'
> ```
>
> Expected response: JSON with assistant reply in `choices[0].message.content`

### Troubleshooting NPU

Common issues and solutions:

| Issue | Solution |
|-------|----------|
| `/dev/accel/accel*` not found | Reinstall XDNA driver, ensure BIOS has NPU enabled |
| Permission denied on NPU device | Add user to `render` group: `sudo usermod -aG render $USER` |
| Slow inference | Ensure model is using NPU (`device: npu`), check memory allocation |

</details>

## Which Should I Choose?

{: .note }
> **GPU vs NPU Decision Guide:**
> - **Choose GPU** if you have an NVIDIA GPU - best compatibility and wider model support
> - **Choose NPU** if you have AMD Ryzen AI - more power-efficient for always-on voice assistant
> - **Both work** with the same models - the choice is purely about hardware optimization

## Performance Comparison

| Metric | GPU (NVIDIA) | NPU (AMD Ryzen AI) |
|--------|--------------|-------------------|
| Power consumption | Higher (150-300W) | Lower (15-45W) |
| Inference speed | Faster for larger models | Good for 4B models |
| Model compatibility | All GGUF models | Optimized for specific models |
| Setup complexity | Standard CUDA setup | Requires XDNA driver |

## Next Steps

After configuring the LLM, proceed to [Embedding Model](/embedding-model) setup to enable conversation context and memory.
