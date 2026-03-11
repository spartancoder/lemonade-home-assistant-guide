---
layout: default
title: Linux
parent: Installation
nav_order: 2
has_children: true
description: "Linux installation guides for Lemonade Server"
last_modified_date: 2026-03-11
---

# Linux Installation

Linux is the recommended platform for Lemonade Server. This page helps you choose the right installation guide for your distribution.

## Distribution Support

| Distribution | Package Manager | Guide |
|--------------|-----------------|-------|
| Debian 12+ | apt | [Debian Based](/debian-installation) |
| Ubuntu 22.04+ | apt | [Debian Based](/debian-installation) |
| Fedora 38+ | dnf | [RHEL Based](/rhel-installation) |
| RHEL 9+ | dnf/yum | [RHEL Based](/rhel-installation) |
| CentOS Stream 9+ | dnf/yum | [RHEL Based](/rhel-installation) |

## Which Should I Choose?

### Debian/Ubuntu (Recommended)

- Most widely tested distribution
- Largest community support
- Best documentation coverage
- Recommended for first-time users

**Choose this if:** You're new to Linux, using a VPS, or want the most straightforward experience.

### RHEL/Fedora

- Enterprise-grade stability (RHEL)
- Latest packages (Fedora)
- Strong enterprise support

**Choose this if:** You're in an enterprise environment, already using RHEL/Fedora, or need SELinux integration.

## Prerequisites

Before continuing, ensure you have:

- Root or sudo access
- Active internet connection
- 16GB RAM minimum (32GB+ recommended)
- 20GB+ free disk space

{: .note }
> See [Prerequisites](/prerequisites) for complete system requirements.

## Next Steps

Select your distribution to begin installation:

- **Debian/Ubuntu**: Follow the [Debian Based](/debian-installation) guide
- **Fedora/RHEL/CentOS**: Follow the [RHEL Based](/rhel-installation) guide

---

*Installation takes approximately 10-15 minutes on a standard system.*
