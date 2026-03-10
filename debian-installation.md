---
layout: default
title: Debian Based
parent: Linux
grand_parent: Installation
nav_order: 1
description: "Install Lemonade Server on Debian-based Linux"
last_modified_date: 2026-03-09
---

# Debian Based Installation

Install Lemonade Server on Debian, Ubuntu, or derivatives.

## System Requirements

Content coming in Phase 3...

## Installation Steps

Content coming in Phase 3...

## Systemd Service

Example configuration (placeholder):

    # filename: /etc/systemd/system/lemonade-server.service
    [Unit]
    Description=Lemonade Server
    After=network.target

    [Service]
    ExecStart=/usr/local/bin/lemonade-server
        Restart=on-failure

    [Install]
    WantedBy=multi-user.target

## Verification

Content coming in Phase 3...
