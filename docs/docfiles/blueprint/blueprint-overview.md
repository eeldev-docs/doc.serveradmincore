---
sidebar_position: 1
title: Blueprint Overview
---

# Blueprint Overview

Everything in Server Core is available from Blueprint. There are three things to know about:

| | Where | Used for |
|---|---|---|
| **Server Core** subsystem | Server | All admin functions and server events |
| **ServerCore Player Component** | On every player controller | Client side: chat, commands, announcements, admin panel |
| **Server Core Blueprint Library** | Anywhere | Helpers: player ids, durations, permissions |

## Getting the subsystem

Use **Get Server Core** from any Blueprint that has a world context (actors, components, widgets, game mode…).

:::warning
Admin functions only work on the **server**. On a client, **Is Server Core Active** returns false and admin functions
return **Not Server**. Clients talk to the server through the [Player Component](player-component).
:::

## Callers

Every admin function takes a **Caller** (`FServerCoreCaller`):

- **Make Caller** (Player Controller): the action is done by that player. Permissions and group priority are checked.
- **Make System Caller** (Name): the action is done by the game. No checks. The name shows up in the admin log.

```text
Event OnCheatDetected (PlayerController)
 └─ Get Server Core
     └─ Ban Player
          Caller:              Make System Caller ("AntiCheat")
          Player Id:           Get Player Id (PlayerController)
          Reason:              "Cheat detected"
          Duration Seconds:    2592000   (30 days)
          Ban IP Address:      true
```

## Results

Admin functions return **EServerCoreResult**:

| Result | Meaning |
|---|---|
| Success | Done |
| No Permission | The caller lacks the permission |
| Player Not Found | The target is not online / not known |
| Target Immune | The target has an equal or higher priority, or is the caller |
| Already Exists | E.g. already whitelisted |
| Not Found | E.g. no ban to remove |
| Invalid Arguments | E.g. empty name |
| Muted | The sender of a chat message is muted |
| Not Server | Called on a client, or Server Core is disabled |
| Failed | Something else went wrong |

Use **Result To String** to get a readable message.

## Function overview

| Category | Functions |
|---|---|
| Players | Get Online Players, Get Player Info, Get Player Record, Find Player, Get Player Controller, Is Player Online, Get Online Player Count, Make Caller |
| Moderation | Kick Player, Ban Player, Unban Player, Is Player Banned, Get Bans, Mute Player, Unmute Player, Is Player Muted, Get Mutes |
| Whitelist | Set Whitelist Enabled, Is Whitelist Enabled, Add To Whitelist, Remove From Whitelist, Is Player Whitelisted, Get Whitelist |
| Permissions | Get Groups, Get Group, Save Group, Delete Group, Set Player Group, Get Player Group, Get Player Priority, Is Owner, Has Permission, Caller Has Permission, Can Target, Get Effective Permissions, Get Staff Members |
| Notes | Add Player Note, Remove Player Note, Get Player Notes |
| Communication | Announce, Send Message To Player, Broadcast Chat Message |
| Server Control | Change Map, Restart Server, Shutdown Server, Cancel Pending Action, Get Pending Action, Get Available Maps, Resolve Map |
| Commands | Execute Command, Register Command, Unregister Command, Get Commands |
| Logs | Write Admin Log, Get Admin Logs |
| Data | Save All, Reload Data |

Details for every function are in the [API Reference](../reference/api-reference).

## Library functions

| Function | Description |
|---|---|
| **Get Server Core** | The subsystem |
| **Get Player Id** (Player Controller) | Unique id as a string |
| **Get Player Id From Player State** | |
| **Get Player IP Address** (Player Controller) | Server only |
| **Get Server Core Player Component** (Player Controller) | |
| **Make System Caller** (Name) | |
| **Parse Duration** (Text) → Seconds | `"1d12h"` → 129600 |
| **Format Duration** (Seconds) | 93784 → `"1d 2h 3m"` |
| **Result To String**, **Action To String** | |
| **Does Permission List Grant** (List, Permission) | Wildcard and denial matching |
| **Get Sanction Remaining Seconds** (Sanction) | |
| **Tokenize Command Line** (Command Line) | Splits arguments, respecting quotes |
