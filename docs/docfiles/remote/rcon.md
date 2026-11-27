---
sidebar_position: 2
title: RCON
---

# RCON

A Source RCON listener. Any Source RCON client works, for example [mcrcon](https://github.com/Tiiffi/mcrcon).

## Setup

1. Set `bRconEnabled=True` in the [Remote Settings](remote-settings).
2. Give the server a password of at least 16 characters. It is **never read from the ini file**. Use one of:
   - `-RconPassword=...` on the server command line
   - the environment variable `SERVERADMINCORE_RCON_PASSWORD`
3. Connect to `127.0.0.1:27020`.

Commands run as the permission group in **Rcon Group Name** (default `Owner`).

## Usage

Each unquoted word is sent as a separate command by mcrcon, so quote the whole command line:

```text
mcrcon -H 127.0.0.1 -P 27020 -p <password> "players"
mcrcon -H 127.0.0.1 -P 27020 -p <password> "kick Bob Spamming"
```

## Protection

- After **Rcon Max Failed Logins** failed logins an IP address is blocked for **Rcon Block Seconds**.
- **Rcon Allowed Ips** limits who may connect. Empty means every address that can reach the port.
- **Rcon Max Connections** limits simultaneous connections.
- RCON sends the password unencrypted. Keep the bind address on `127.0.0.1` unless a VPN or firewall protects the connection.
