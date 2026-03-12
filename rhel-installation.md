---
layout: default
title: RHEL Based
parent: Linux
grand_parent: Installation
nav_order: 2
description: "Install Lemonade Server on RHEL-based Linux"
last_modified_date: 2026-03-11
---

# RHEL Based Installation

Install Lemonade Server on Fedora, RHEL, CentOS Stream, or derivatives. This guide provides step-by-step instructions adapted for RPM-based distributions.

## System Requirements

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| Distribution | Fedora 38, RHEL 9, CentOS Stream 9 | Fedora 40+, RHEL 9 latest |
| RAM | 16 GB | 32 GB+ |
| Storage | 20 GB free | 50 GB+ (for multiple models) |
| CPU | 4 cores | 8+ cores |
| Python | 3.10+ | 3.11+ |

{: .note }
> See [Prerequisites](/prerequisites) for detailed hardware and software requirements, including GPU/NPU recommendations.

## Installation Steps

Follow these steps to install Lemonade Server on your RHEL-based system.

### 1. Update System

Start by updating your system packages:

```bash
# Update all packages (Fedora)
sudo dnf update -y

# For RHEL/CentOS Stream, use:
# sudo dnf update -y
```

{: .warning }
> **RHEL Users**: Enable required repositories before installing dependencies. See the RHEL-Specific Setup section below.

### 2. Install Dependencies

Install the required system dependencies:

```bash
# Install Python 3, pip, and virtual environment support
sudo dnf install python3 python3-pip python3-virtualenv -y

# Install development tools and Git
sudo dnf install git curl -y

# Install development tools group (includes GCC, make, etc.)
sudo dnf groupinstall "Development Tools" -y
```

{: .note }
> The "Development Tools" group includes GCC, make, and other tools needed for compiling Python packages with native extensions.

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

## RHEL-Specific Setup

If you're using Red Hat Enterprise Linux, you need to enable additional repositories.

### Enable EPEL and CodeReady Builder

```bash
# Enable CodeReady Builder repository (required for development tools)
sudo subscription-manager repos --enable codeready-builder-for-rhel-9-x86_64-rpms

# Install EPEL repository
sudo dnf install https://dl.fedoraproject.org/pub/epel/epel-release-latest-9.noarch.rpm -y

# Update package lists
sudo dnf update -y
```

{: .warning }
> **RHEL Users**: These repositories are required for some dependencies. Without them, package installation may fail.

### SELinux Considerations

If SELinux is enabled in enforcing mode, you may need to adjust contexts:

```bash
# Check SELinux status
sestatus

# If needed, set proper context for the virtual environment
semanage fcontext -a -t bin_t "/home/%YOUR_USERNAME%/lemonade-env/bin(/.*)?"
restorecon -Rv ~/lemonade-env
```

{: .note }
> For most users, SELinux should work without modification. Only adjust if you encounter permission issues.

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

# Fedora typically has the latest Python
# For RHEL, you may need to use Python 3.11 from AppStream
sudo dnf module enable python3.11 -y
sudo dnf install python3.11 python3.11-pip -y
```

**SELinux blocking service:**

```bash
# Check SELinux audit logs
sudo ausearch -m avc -ts recent

# If needed, create a custom policy (advanced)
sudo ausearch -c 'lemonade-server' --raw | audit2allow -M my-lemonade
sudo semodule -i my-lemonade.pp
```

## Next Steps

Now that Lemonade Server is installed, you can:

1. **Configure Speech-to-Text**: Follow the [Whisper Setup](/stt-lemonade-setup) guide
2. **Configure Text-to-Speech**: Follow the [Kokoro Setup](/tts-lemonade-setup) guide
3. **Configure LLM**: Follow the [LLM Configuration](/llm-configuration) guide

---

*Installation complete! Proceed to [Speech-to-Text Setup](/stt-lemonade-setup) to configure your first model.*
