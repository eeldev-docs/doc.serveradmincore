---
sidebar_position: 6
title: Listen Servers
---

# Listen Servers

Server Admin Core works on **listen servers** as well as dedicated servers. On a listen server one player hosts the game,
and their game is the server. Everything else in this documentation applies to both, with the differences below.

Listen server support is on by default (**Active On Listen Server**). Turn it off in
**Project Settings → Plugins → Server Admin Core** if you only want Server Admin Core on dedicated servers.

## Differences from a dedicated server

| | Dedicated server | Listen server |
|---|---|---|
| Kick, ban, mute, whitelist, groups, notes, logs | ✅ | ✅ |
| Commands from chat and Blueprint | ✅ | ✅, also for the host |
| In-game admin panel ([Player Component](../blueprint/player-component)) | ✅ | ✅, also for the host |
| Announcements, map change | ✅ | ✅ |
| Owner | Players in **Owner Ids** | The host is an owner automatically (**Listen Server Host Is Owner**), plus **Owner Ids** |
| Kicking the host | – | Never possible, the host is the server |
| Banning or muting the host | – | Not by players while the host is an owner (default) |
| Console commands | Typed into the server window | The host's in-game console with the `sac` prefix: `sac players` |
| Restart | **Restart Mode** (relaunch, exit or reload map) | Always reloads the current map |
| Shutdown | Kicks everyone and exits the server | Kicks every client and closes the host's game |
| Data files | On the server machine | On the host's machine, in the host's `Saved/ServerAdminCore` |

## The host

- With **Listen Server Host Is Owner** (default) the host has every permission and can't be targeted by anyone.
  Turn it off if hosts should use normal groups, for example when any player can host a public match.
- The host chats and runs commands through their own player component, exactly like clients. Commands typed with the
  command prefix (`/kick Bob`) work for the host too.
- Player ids come from the online subsystem (Steam, EOS). The host's id works like any other player's id.

## Data is per host

Bans, mutes, groups and notes are stored on the machine that hosts. On listen servers that means every host has their
own data, unless you use a [custom storage backend](../cpp/custom-storage) that stores it centrally, for example in a
web service.

## Standalone

In a standalone (single player) game there is no server. Server Admin Core stays off unless you enable
**Active In Standalone**.
