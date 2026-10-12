---
sidebar_position: 10
title: Player Notes
---

# Player Notes

Notes are private messages from staff to staff about a player: *"Warned for spawn camping"*, *"Suspected aimbot,
watch"*. Players never see them.

## Commands

| Command | Description | Permission |
|---|---|---|
| `/note <player> <text>` | Add a note | `servercore.notes.add` |
| `/notes <player>` | Read notes, newest first | `servercore.notes.view` |
| `/delnote <note id>` | Delete a note | `servercore.notes.remove` |

```text
/note Bob Warned for team killing
/notes Bob
  [3f2a9c1d] 2026-10-12 19:04 by Alice: Warned for team killing
/delnote 3f2a9c1d
```

The first 8 characters of a note id are enough to delete it.

Notes work for offline players and for players who never joined (`id:<PlayerId>`).

## Blueprint

| Node | Description |
|---|---|
| **Add Player Note** (Caller, Player Id, Text) → Result, Out Note Id | |
| **Remove Player Note** (Caller, Note Id) | |
| **Get Player Notes** (Player Id) | Newest first |
