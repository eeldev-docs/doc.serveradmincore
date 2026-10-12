---
sidebar_position: 2
title: Permission Nodes
---

# Permission Nodes

All built-in nodes. In C++ they are available as constants in the `ServerCorePermissions` namespace
(`ServerCorePermissions::Kick`, …).

| Node | Constant | Grants |
|---|---|---|
| `*` | `All` | Everything |
| `servercore.help` | `Help` | `help` |
| `servercore.players` | `Players` | `players`, `status`, `staff`, admin panel player list |
| `servercore.info` | `Info` | `info`, player ids in `players`, admin panel player info |
| `servercore.info.ip` | `InfoIP` | Seeing IP addresses |
| `servercore.kick` | `Kick` | Kicking |
| `servercore.ban` | `Ban` | Permanent and timed bans, `bans` |
| `servercore.ban.ip` | `BanIP` | IP bans |
| `servercore.tempban` | `TempBan` | Timed bans only |
| `servercore.unban` | `Unban` | Removing bans |
| `servercore.mute` | `Mute` | Permanent and timed mutes, `mutes` |
| `servercore.tempmute` | `TempMute` | Timed mutes only |
| `servercore.unmute` | `Unmute` | Removing mutes |
| `servercore.whitelist` | `Whitelist` | Managing the whitelist |
| `servercore.whitelist.bypass` | `WhitelistBypass` | Joining while the whitelist is on |
| `servercore.group.list` | `GroupList` | `groups`, `group` |
| `servercore.group.set` | `GroupSet` | `setgroup`, `removegroup` |
| `servercore.group.edit` | `GroupEdit` | Creating, editing and deleting groups |
| `servercore.notes.view` | `NotesView` | Reading notes |
| `servercore.notes.add` | `NotesAdd` | Adding notes |
| `servercore.notes.remove` | `NotesRemove` | Deleting notes |
| `servercore.announce` | `Announce` | `announce`, `warnall`, `msg` |
| `servercore.map` | `Map` | `map`, `maps` |
| `servercore.restart` | `Restart` | `restart` |
| `servercore.shutdown` | `Shutdown` | `shutdown` |
| `servercore.cancel` | `Cancel` | `cancel` |
| `servercore.logs` | `Logs` | `logs`, admin panel logs |
| `servercore.reload` | `Reload` | `reload`, `save` |

## Matching rules

- `*` matches everything.
- `prefix.*` matches `prefix` and everything below it: `servercore.ban.*` matches `servercore.ban.ip`.
- Matching is case insensitive.
- A node starting with `-` denies. If any denial in the player's effective permissions matches, the permission is denied,
  even if another node grants it.
- Effective permissions = the group's permissions plus all inherited groups' permissions.
