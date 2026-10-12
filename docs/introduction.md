---
sidebar_position: 1
slug: /
title: Introduction
---

# Server Core

**Dedicated Server Admin for Unreal Engine.**

Server Core is an admin and moderation toolkit for Unreal Engine dedicated servers. Drop it into your project, start your
server and you get everything players and server owners expect: kick, ban, mute, whitelist, admins and moderators,
server commands, announcements, map changes, restarts and shutdowns, player info, player notes and admin logs.

Everything is available from **Blueprint and C++**.

:::tip
New to the plugin? Start with [Installing the plugin](docfiles/getting_started/installing-plugin) and the
[Quick Start](docfiles/getting_started/quick-start). You can be kicking and banning in PIE within five minutes.
:::

## Features

| Feature | Description |
|---|---|
| **[Kick](docfiles/features/kick)** | Kick players with a reason. |
| **[Ban / Temp Ban / Unban](docfiles/features/bans)** | Permanent, timed and IP bans. Works for offline players. Enforced at login. |
| **[Mute / Temp Mute / Unmute](docfiles/features/mutes)** | Blocks text chat and voice chat. Expires automatically. |
| **[Whitelist](docfiles/features/whitelist)** | Toggle at runtime, add players before they ever join. |
| **[Admins, Moderators and Permission Groups](docfiles/features/permission-groups)** | Groups with priority, inheritance, wildcards and denials. |
| **[Server Commands](docfiles/features/server-commands)** | 40+ commands from chat, the server console or Blueprint. Add your own. |
| **[Server Announcements](docfiles/features/announcements)** | Instant, scheduled and welcome messages. |
| **[Change Map, Restart, Shutdown](docfiles/features/server-control)** | Countdowns with warnings, cancel at any time. |
| **[Player List and Player Info](docfiles/features/players)** | Play time, known names, ping, IP, ban and mute state. |
| **[Player Notes](docfiles/features/player-notes)** | Private staff notes per player. |
| **[Admin Logs](docfiles/features/admin-logs)** | Every action logged to memory, the output log and daily files. |
| **[Blueprint](docfiles/blueprint/blueprint-overview) + [C++](docfiles/cpp/cpp-overview)** | Full API, events, an in-game admin panel bridge and pluggable storage. |

## Supported engine versions

| Engine | Status |
|---|---|
| Unreal Engine 5.8 | ✅ Supported |

## Supported platforms

Server Core is a runtime plugin without third party dependencies. It runs wherever your dedicated server runs:
Windows and Linux dedicated servers, as well as listen servers for testing.
