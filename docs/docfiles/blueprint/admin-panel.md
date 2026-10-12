---
sidebar_position: 3
title: Building an Admin Panel
---

# Building an Admin Panel

The [Player Component](player-component) has everything an in-game admin panel needs. Every request is answered with an
event, and every request is permission checked on the server.

| Request | Answer event | Permission |
|---|---|---|
| **Request Player List** | **On Player List Received** (Players) | `servercore.players` |
| **Request Player Info** (Player Id) | **On Player Info Received** (Player, Notes) | `servercore.info` (notes need `servercore.notes.view`) |
| **Request Admin Logs** (Max Entries, Filter Player Id) | **On Admin Logs Received** (Entries) | `servercore.logs` |
| **Request Sanctions** | **On Sanctions Received** (Bans, Mutes) | ban or mute permissions |
| **Request Commands** | **On Commands Received** (Commands) | – (returns what the player may use) |

Without permission, the player gets a **No Permission** message through **On Server Message**.

IP addresses are removed from the data unless the player has `servercore.info.ip`.

## Example layout

```text
WBP_AdminPanel
 ├─ Players tab     Request Player List → list of rows (name, group, ping)
 │    └─ Row click  Request Player Info → details + notes
 │         ├─ Kick button       Execute Command "kick id:<PlayerId> <reason>"
 │         ├─ Ban button        Execute Command "ban id:<PlayerId> <duration> <reason>"
 │         ├─ Mute button       Execute Command "mute id:<PlayerId> <duration> <reason>"
 │         └─ Add note          Execute Command "note id:<PlayerId> <text>"
 ├─ Bans tab        Request Sanctions → bans and mutes, Unban / Unmute buttons
 ├─ Logs tab        Request Admin Logs
 └─ Server tab      Execute Command "announce …", "map …", "restart …"
```

:::tip
Use `id:<PlayerId>` in commands from UI buttons. It always targets exactly the right player, even when two players have
similar names.
:::

## Only show the panel to staff

In your player controller, bind **On Permissions Changed** on the component and check
**Has Permission** (`servercore.players`) or any permission you choose before you create the panel or show its button.

## Refreshing

Requests are cheap. Re-request the player list when the panel opens and every few seconds while it is visible, and
request the logs after running a command (bind **On Command Output**).
