---
sidebar_position: 7
title: Remote Settings
---

# Remote Settings

**Project Settings → Plugins → Server Admin Core Remote**, stored in `Config/DefaultGame.ini` under `[/Script/ServerAdminCoreRemote.ServerAdminCoreRemoteSettings]`.

## RCON

| Setting | Config key | Default | Description |
|---|---|---|---|
| **Rcon Enabled** | `bRconEnabled` | `false` | Starts the RCON listener on dedicated servers. The password is never read from config. |
| **Rcon Port** | `RconPort` | `27020` | TCP port. |
| **Rcon Bind Address** | `RconBindAddress` | `127.0.0.1` | RCON sends the password unencrypted, so only change this behind a VPN or firewall. |
| **Rcon Group Name** | `RconGroupName` | `Owner` | Permission group that RCON commands run as. |
| **Rcon Max Connections** | `RconMaxConnections` | `4` | Simultaneous connections. |
| **Rcon Max Failed Logins** | `RconMaxFailedLogins` | `5` | Failed logins from one IP before it is blocked. |
| **Rcon Block Seconds** | `RconBlockSeconds` | `900` | How long an IP stays blocked. |
| **Rcon Allowed Ips** | `RconAllowedIps` | – | If not empty, only these IP addresses may connect. |

## REST API

| Setting | Config key | Default | Description |
|---|---|---|---|
| **Api Enabled** | `bApiEnabled` | `false` | Starts the REST API on dedicated servers. |
| **Api Port** | `ApiPort` | `27021` | TCP port. |
| **Api Bind Address** | `ApiBindAddress` | `127.0.0.1` | The engine HTTP server has no TLS. Use a reverse proxy for remote access. |

## WebSocket

| Setting | Config key | Default | Description |
|---|---|---|---|
| **Web Socket Enabled** | `bWebSocketEnabled` | `true` | Starts the event stream. Needs the REST API to be enabled. |
| **Web Socket Port** | `WebSocketPort` | `27022` | TCP port. |
| **Web Socket Bind Address** | `WebSocketBindAddress` | `127.0.0.1` | No TLS. Use a reverse proxy for remote access. |
| **Web Socket Max Connections** | `WebSocketMaxConnections` | `8` | Simultaneous connections. |

## Command line

| Argument | Description |
|---|---|
| `-RconPassword=...` | RCON password. The environment variable `SERVERADMINCORE_RCON_PASSWORD` works too. |
| `-ServerAdminCoreManaged` | Managed mode, set by the watchdog. |
| `-ServerAdminCoreRestartFlag=<file>` | Restart flag file, set by the watchdog. |
