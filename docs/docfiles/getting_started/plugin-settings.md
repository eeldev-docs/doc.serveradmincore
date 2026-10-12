---
sidebar_position: 3
title: Plugin Settings
---

# Plugin Settings

All settings live in **Project Settings → Plugins → Server Core** and are saved to `Config/DefaultGame.ini` under
`[/Script/ServerCore.ServerCoreSettings]`.

This page covers the most important settings. Every setting is listed in the
[Settings Reference](../reference/settings-reference).

## General

### Enabled
Turns the whole plugin on or off.

### Active On Listen Server / Active In Standalone
Server Core is always active on **dedicated servers**. Enable these to also run it on listen servers (great for testing in
PIE) or in standalone games.

### Listen Server Host Is Owner
On a listen server, the hosting player gets every permission.

### Data Directory
Where data files are stored. Empty means `<Project>/Saved/ServerCore`. Can be overridden with
`-ServerCoreDataDir=<path>`. See [Data Files](../reference/data-files).

### Storage Class
The storage backend. The default writes JSON files. See [Custom Storage](../cpp/custom-storage).

### Auto Add Player Component
Adds the [ServerCore Player Component](../blueprint/player-component) to every player controller on the server.

## Permissions

### Owner Ids
Player ids with every permission. Extend with `-ServerCoreOwners=Id1,Id2`.

### Default Groups
The groups created the **first time** the server starts. After that, groups are stored in `Groups.json` and edited with
commands or Blueprint. See [Permission Groups](../features/permission-groups).

### Enforce Immunity
Players can only act on players with a lower group priority.

## Moderation

Whitelist default state, IP recording, IP ban enforcement, voice chat muting and every message shown to players
(ban message, kick message, mute message…).

Messages support placeholders: `{Reason}`, `{Duration}`, `{Expires}` and `{By}`.

## Chat and Commands

### Command Prefix
Chat messages starting with this prefix are run as commands. Default `/`.

### Broadcast Chat To Players
Delivers chat sent through Server Core to every player. Turn it off if you only want the
`On Chat Message` event and deliver chat yourself.

## Announcements

Scheduled announcements that repeat on an interval, and a welcome message shown when a player joins.
See [Server Announcements](../features/announcements).

## Server Control

Restart mode, exit code, countdown warnings, map aliases and map search paths.
See [Change Map, Restart and Shutdown](../features/server-control).

## Logging

Log files, in-memory log size and join/leave logging. See [Admin Logs](../features/admin-logs).

## Example configuration

```ini title="Config/DefaultGame.ini"
[/Script/ServerCore.ServerCoreSettings]
+OwnerIds=76561198000000000
CommandPrefix=/
bWhitelistEnabledByDefault=False
RestartMode=ExitProcess
RestartExitCode=0
+MapAliases=(("arena", "/Game/Maps/Arena"))
+ScheduledAnnouncements=(bEnabled=True,Message="Join our Discord!",IntervalSeconds=900,Type=Chat)
WelcomeMessage=Welcome {Player}! Type /help for commands.
```
