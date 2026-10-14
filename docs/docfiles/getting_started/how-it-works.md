---
sidebar_position: 5
title: How it works
---

# How it works

```text
UServerAdminCoreSubsystem (GameInstanceSubsystem, server)   all logic, survives map changes
 ├─ UServerAdminCoreStorage                                 persistence (default: JSON files)
 ├─ Command registry                                   built-in and custom commands
 └─ UServerAdminCorePlayerComponent                         on every PlayerController, replicated
                                                       chat, commands, announcements, admin panel data
UServerAdminCoreBlueprintLibrary                            helpers (player id, durations, permissions)
UServerAdminCoreSettings                                    Project Settings → Plugins → Server Admin Core
```

## The subsystem

`UServerAdminCoreSubsystem` is a **Game Instance Subsystem**. There is one per server and it lives for the whole server
session, across map changes. It tracks players, enforces bans and the whitelist at login, runs commands, schedules
restarts and saves data.

Get it in Blueprint with **Get Server Admin Core**, or in C++ with `UServerAdminCoreSubsystem::Get(this)`.

## Callers

Every moderation function takes an **`FServerAdminCoreCaller`**: who is doing this?

| Caller | Created with | Checks |
|---|---|---|
| Player | `Make Caller (PlayerController)` | Permissions **and** group priority |
| System | `Make System Caller` / server console | None, always allowed |

Use a **system caller** for game logic, for example an anti-cheat ban, a vote kick or an automatic nightly restart.
Use a **player caller** when an action comes from a player, so their permissions are respected.

:::warning
Callers are always built on the server. Never build a caller from data a client sent you. Clients send requests through
the [Player Component](../blueprint/player-component), and the server builds the caller from the connection.
:::

## Player ids

Players are identified by their unique net id as a string (`FUniqueNetIdRepl`), for example a SteamID64 or an EOS
ProductUserId. Get it with **Get Player Id** from a player controller.

## Login enforcement

Bans, IP bans and the whitelist are checked twice:

1. **PreLogin** – the player is rejected before a player controller is spawned.
2. **PostLogin** – as a fallback for game modes that override PreLogin, and for IP bans.

## Saving

Changes are saved automatically a fraction of a second after they happen, and everything is saved when the server shuts
down. Files are written atomically, so a crash never leaves a half-written file.
