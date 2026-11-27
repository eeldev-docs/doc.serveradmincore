---
sidebar_position: 1
title: Overview
---

# Remote Control

Version 1.1.0 adds the **ServerAdminCoreRemote** module. It lets you run the same admin commands from outside the game, with the same permission groups.

| Interface | Use it for |
|---|---|
| **[RCON](rcon)** | Source RCON clients such as mcrcon, and scripts. |
| **[REST API](rest-api)** | Status, players, bans, logs and commands over HTTP. |
| **[WebSocket events](websocket-events)** | A live stream of joins, sanctions, chat and the admin log. |
| **[API tokens](tokens)** | Authentication for the REST API and the WebSocket stream. |

All interfaces are **off or local by default**, run on **dedicated servers**, and listen on `127.0.0.1` only. They have no TLS. Keep them on the same machine, or put a VPN or an HTTPS reverse proxy in front.

Every remote caller runs as a permission group and never with full system rights. Commands from RCON, tokens and the event stream go through the same permission checks as in-game commands and are written to the [Admin Logs](../features/admin-logs).

## Companion programs

The [Companion Tools](companion-tools) are free programs that use these interfaces: a watchdog, a Discord bot and a web panel. They are downloaded separately and are not part of the plugin.

## Enable it

In `Config/DefaultGame.ini` of your server project:

```ini
[/Script/ServerAdminCoreRemote.ServerAdminCoreRemoteSettings]
bRconEnabled=True
bApiEnabled=True
```

All settings are listed in the [Remote Settings](remote-settings).

## Ports

| Interface | Default port |
|---|---|
| RCON | 27020 |
| REST API | 27021 |
| WebSocket events | 27022 |

Keep these different from the game port.
