---
sidebar_position: 3
title: Mute, Temp Mute and Unmute
---

# Mute, Temp Mute and Unmute

Muted players can't send chat messages through Server Admin Core. With **Mute Voice Chat** enabled (default), they are also
muted in voice chat for every other player.

## Commands

| Command | Description | Permission |
|---|---|---|
| `/mute <player> [duration] [reason]` | Permanent mute, or timed if a duration is given | `serveradmincore.mute` |
| `/tempmute <player> <duration> [reason]` | Timed mute | `serveradmincore.tempmute` |
| `/unmute <player>` | Remove a mute | `serveradmincore.unmute` |
| `/mutes` | List muted players | `serveradmincore.mute` |

```text
/mute Bob Toxic
/tempmute Bob 30m Spam
/unmute Bob
```

Durations work like [ban durations](bans#durations).

## What the player sees

- When muted, the player gets a private server message (**Mute Message** / **Temp Mute Message**).
- When they try to chat, the message is blocked and they see the mute message again.
- **Is Muted** on their player component becomes `true`, so your UI can show a muted icon.
- When the mute expires or is removed, they get *"You are no longer muted."*

## Using mutes with your own chat

If your game has its own chat system, check the mute before you deliver a message:

**Get Server Admin Core** → **Is Player Muted** (Player Id) → Branch

Or send your chat through **Broadcast Chat Message**, which returns **Muted** if the sender is muted.

## Blueprint

| Node | Description |
|---|---|
| **Mute Player** (Caller, Player Id, Reason, Duration Seconds) | `Duration Seconds` ≤ 0 is permanent |
| **Unmute Player** (Caller, Player Id) | |
| **Is Player Muted** (Player Id) → Muted, Out Mute | |
| **Get Mutes** | All mutes, newest first |
