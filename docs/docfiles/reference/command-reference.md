---
sidebar_position: 1
title: Command Reference
---

# Command Reference

`<required>` and `[optional]` arguments. Commands and aliases are case insensitive. In chat, prefix commands with the
**Command Prefix** (default `/`). In the dedicated server console window, type them
without a prefix. In the editor console, prefix them with `sc` or `ServerCore`.

See [Targeting players](../features/server-commands#targeting-players) for what `<player>` accepts, and
[Durations](../features/bans#durations) for `<duration>`.

## General

| Command | Aliases | Usage | Permission | Description |
|---|---|---|---|---|
| `help` | `?`, `commands` | `[command]` | `servercore.help` | Lists commands, or shows help for one |
| `whoami` | `perms` | | – | Your id, group and permissions |
| `status` | `server` | | `servercore.players` | Map, player count, whitelist, scheduled action |

## Players

| Command | Aliases | Usage | Permission | Description |
|---|---|---|---|---|
| `players` | `list`, `who` | | `servercore.players` | Online players |
| `info` | `playerinfo`, `whois` | `<player>` | `servercore.info` | Player details (online or offline) |
| `staff` | `admins` | | `servercore.players` | Players in a non-default group |

## Kick, ban and mute

| Command | Aliases | Usage | Permission | Description |
|---|---|---|---|---|
| `kick` | | `<player> [reason]` | `servercore.kick` | Kick a player |
| `ban` | | `<player> [duration] [reason]` | `servercore.ban` | Permanent ban, or timed with a duration |
| `ipban` | `banip` | `<player> [duration] [reason]` | `servercore.ban.ip` | Ban player and last known IP |
| `tempban` | `tban` | `<player> <duration> [reason]` | `servercore.tempban` | Timed ban |
| `unban` | `pardon` | `<player\|id>` | `servercore.unban` | Remove a ban |
| `bans` | `banlist` | `[count]` | `servercore.ban` | Recent bans (default 20) |
| `mute` | | `<player> [duration] [reason]` | `servercore.mute` | Permanent mute, or timed with a duration |
| `tempmute` | `tmute` | `<player> <duration> [reason]` | `servercore.tempmute` | Timed mute |
| `unmute` | | `<player>` | `servercore.unmute` | Remove a mute |
| `mutes` | `mutelist` | | `servercore.mute` | Muted players |

## Whitelist

| Command | Aliases | Usage | Permission | Description |
|---|---|---|---|---|
| `whitelist` | `wl` | `<on\|off\|status\|list\|add\|remove> [player]` | `servercore.whitelist` | Manage the whitelist |

## Groups

| Command | Aliases | Usage | Permission | Description |
|---|---|---|---|---|
| `groups` | | | `servercore.group.list` | List groups |
| `group` | `groupinfo` | `<group>` | `servercore.group.list` | Group details |
| `setgroup` | `promote`, `rank` | `<player> <group>` | `servercore.group.set` | Assign a group |
| `removegroup` | `demote` | `<player>` | `servercore.group.set` | Back to the default group |
| `creategroup` | | `<name> <priority> [inherits]` | `servercore.group.edit` | Create a group |
| `deletegroup` | | `<name>` | `servercore.group.edit` | Delete a group |
| `groupperm` | `gperm` | `<group> <add\|remove> <permission>` | `servercore.group.edit` | Edit group permissions |

## Notes

| Command | Aliases | Usage | Permission | Description |
|---|---|---|---|---|
| `note` | `addnote` | `<player> <text>` | `servercore.notes.add` | Add a note |
| `notes` | | `<player>` | `servercore.notes.view` | Read notes |
| `delnote` | `removenote` | `<note id>` | `servercore.notes.remove` | Delete a note |

## Communication

| Command | Aliases | Usage | Permission | Description |
|---|---|---|---|---|
| `announce` | `broadcast`, `say` | `<message>` | `servercore.announce` | Notification announcement |
| `warnall` | | `<message>` | `servercore.announce` | Warning announcement |
| `msg` | `pm`, `tell` | `<player> <message>` | `servercore.announce` | Private server message |

## Server control

| Command | Aliases | Usage | Permission | Description |
|---|---|---|---|---|
| `map` | `changemap` | `<map> [delay]` | `servercore.map` | Change map (default 10s) |
| `maps` | `maplist` | | `servercore.map` | List maps and aliases |
| `restart` | `reboot` | `[delay] [reason]` | `servercore.restart` | Restart (default 60s) |
| `shutdown` | `stop` | `[delay] [reason]` | `servercore.shutdown` | Shut down (default 60s) |
| `cancel` | `abort` | | `servercore.cancel` | Cancel map change / restart / shutdown |

## Logs and data

| Command | Aliases | Usage | Permission | Description |
|---|---|---|---|---|
| `logs` | `history` | `[count] [player]` | `servercore.logs` | Recent admin logs (default 20, max 200) |
| `reload` | | | `servercore.reload` | Reload data from storage |
| `save` | | | `servercore.reload` | Save data now |
