---
sidebar_position: 5
title: Events
---

# Events

## Server events (Server Core subsystem)

Bind these on **Get Server Core**, on the server.

| Event | Parameters | When |
|---|---|---|
| **On Player Joined** | Player Info | A player joined (after ban and whitelist checks) |
| **On Player Left** | Player Info | A player left |
| **On Player Kicked** | Player Id, Player Name, Reason, Caller | |
| **On Player Banned** | Sanction, Caller | Ban or temp ban |
| **On Player Unbanned** | Player Id, Caller | Manual or expired |
| **On Player Muted** | Sanction, Caller | |
| **On Player Unmuted** | Player Id, Caller | Manual or expired |
| **On Player Group Changed** | Player Id, New Group | |
| **On Whitelist Changed** | Enabled | |
| **On Announcement** | Message, Type | Every announcement, including countdown warnings |
| **On Chat Message** | Sender, Message | Chat sent through Server Core, after the mute check |
| **On Command Executed** | Caller, Command Line, Result | |
| **On Pending Action Changed** | Action | Map change, restart or shutdown scheduled, cancelled or executed |
| **On Admin Log** | Entry | Every admin log entry |

:::tip
Bind the events in your **Game Mode** or **Game Instance**. Since the subsystem lives on the game instance, bindings made
on the game instance survive map changes.
:::

## Client events (Player Component)

Bind these on the **ServerCore Player Component** of the local player controller.

| Event | Parameters |
|---|---|
| **On Chat Received** | Sender Name, Sender Id, Sender Group, Message |
| **On Announcement Received** | Message, Type |
| **On Server Message** | Message |
| **On Command Output** | Lines, Result |
| **On Permissions Changed** | |
| **On Player List Received** | Players |
| **On Player Info Received** | Player, Notes |
| **On Admin Logs Received** | Entries |
| **On Sanctions Received** | Bans, Mutes |
| **On Commands Received** | Commands |
