---
layout: default
title: Debian Based
parent: Linux
grand_parent: Installation
nav_order: 1
description: "Install Lemonade Server on Debian-based Linux"
last_modified_date: 2026-03-11
---

# Debian Based Installation

Install Lemonade Server on Debian, Ubuntu, or derivatives. This guide provides step-by-step instructions for a complete installation with systemd service configuration.

## System Requirements

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| Distribution | Debian 12 (Bookworm), Ubuntu 22.04 | Debian 12, Ubuntu 24.04 |
| RAM | 16 GB | 32 GB+ |
| Storage | 20 GB free | 50 GB+ (for multiple models) |
| CPU | 4 cores | 8+ cores |
| Python | 3.10+ | 3.11+ |

{: .note }
> See [Prerequisites](/prerequisites) for detailed hardware and software requirements, including GPU/NPU recommendations.

## Installation Steps

Follow these steps to install Lemonade Server on your Debian-based system.

### 1. Update System

Start by updating your system packages:

```bash
# Update package lists
sudo apt update

# Upgrade existing packages to latest versions
sudo apt upgrade -y
```

### 2. Install Dependencies

Install the required system dependencies:

```bash
# Install Python 3, pip, and virtual environment support
sudo apt install python3 python3-pip python3-venv -y

# Install development tools and Git
sudo apt install build-essential git curl -y
```

{: .note }
> The `build-essential` package includes GCC and other tools needed for compiling Python packages with native extensions.

### 3. Create Virtual Environment

Create an isolated Python environment for Lemonade Server:

```bash
# Create a virtual environment in your home directory
python3 -m venv ~/lemonade-env

# Activate the virtual environment
source ~/lemonade-env/bin/activate
```

{: .warning }
> Always activate the virtual environment before running Lemonade Server commands. You'll need to run `source ~/lemonade-env/bin/activate` in each new terminal session.

### 4. Install Lemonade Server

Install Lemonade Server using pip:

```bash
# Upgrade pip to latest version
pip install --upgrade pip

# Install Lemonade Server
pip install lemonade-server

# Verify the installation
lemonade-server --version
```

### 5. Create Configuration Directory

Set up the configuration directory and create a default configuration file:

```bash
# Create configuration directory
mkdir -p ~/.config/lemonade-server

# Create default configuration file
cat > ~/.config/lemonade-server/config.yaml << 'EOF'
# Lemonade Server Configuration
# See documentation for all available options

server:
  host: 0.0.0.0
  port: 8000
  log_level: info

# Speech-to-Text (configure after model download)
stt:
  enabled: false
  model: null

# Text-to-Speech (configure after model download)
tts:
  enabled: false
  model: null

# Large Language Model (configure after model download)
llm:
  enabled: false
  model: null

# Embedding model (configure after model download)
embedding:
  enabled: false
  model: null
EOF
```

### 6. Create Model Directory

Create a directory to store your AI models:

```bash
# Create models directory
mkdir -p ~/lemonade-models

# Set environment variable (add to your shell profile for persistence)
export LEMONADE_MODELS_DIR=~/lemonade-models
```

{: .note }
> Add `export LEMONADE_MODELS_DIR=~/lemonade-models` to your `~/.bashrc` file to make this setting permanent.

## Systemd Service (Optional)

Configure Lemonade Server to start automatically on boot using systemd.

### Create Service File

Create a systemd service file:

```bash
# Create the service file
sudo tee /etc/systemd/system/lemonade-server.service > /dev/null << 'EOF'
[Unit]
Description=Lemonade Server - Local AI Model Server
After=network.target

[Service]
Type=simple
User=%YOUR_USERNAME%
WorkingDirectory=/home/%YOUR_USERNAME%
Environment="PATH=/home/%YOUR_USERNAME%/lemonade-env/bin:/usr/local/bin:/usr/bin:/bin"
Environment="LEMONADE_MODELS_DIR=/home/%YOUR_USERNAME%/lemonade-models"
ExecStart=/home/%YOUR_USERNAME%/lemonade-env/bin/lemonade-server serve
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF
```

{: .warning }
> Replace `%YOUR_USERNAME%` with your actual username in the service file. Run `whoami` to see your username.

### Enable and Start Service

Enable the service to start on boot and start it now:

```bash
# Reload systemd to recognize the new service
sudo systemctl daemon-reload

# Enable the service to start on boot
sudo systemctl enable lemonade-server

# Start the service
sudo systemctl start lemonade-server
```

## Verification

{: .note }
> ✅ **Verify your setup works** by checking the service status and API:

Check the service is running:

```bash
# Check service status
sudo systemctl status lemonade-server
```

You should see `active (running)` in the output.

Test the API endpoint:

```bash
# Test the health endpoint
curl http://localhost:8000/health
```

You should receive a JSON response indicating the server is healthy.

### Manual Verification (Without Systemd)

If you're not using systemd, verify by running the server manually:

```bash
# Activate virtual environment
source ~/lemonade-env/bin/activate

# Start the server
lemonade-server serve
```

In another terminal, test the API:

```bash
curl http://localhost:8000/health
```

## Troubleshooting

### Common Issues

**Permission denied errors:**

```bash
# Ensure you own the virtual environment directory
chown -R $USER:$USER ~/lemonade-env
```

**Port already in use:**

```bash
# Find what's using port 8000
sudo lsof -i :8000

# Kill the process if needed
sudo kill -9 <PID>
```

**Python version too old:**

```bash
# Check Python version
python3 --version

# Install Python 3.11 on Ubuntu 22.04 if needed
sudo apt install python3.11 python3.11-venv -y
```

## Next Steps

Now that Lemonade Server is installed, you can:

1. **Configure Speech-to-Text**: Follow the [Whisper Setup](/stt-lemonade-setup) guide
2. **Configure Text-to-Speech**: Follow the [Kokoro Setup](/tts-lemonade-setup) guide
3. **Configure LLM**: Follow the [LLM Configuration](/llm-configuration) guide

---

*Installation complete! Proceed to [Speech-to-Text Setup](/stt-lemonade-setup) to configure your first model.*
