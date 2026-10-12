---
sidebar_position: 2
title: Ban, Temp Ban and Unban
---

# Ban, Temp Ban and Unban

Bans block a player from joining. They can be permanent or timed, can include the player's IP address, and work for
players who are offline or have never joined.

## Commands

| Command | Description | Permission |
|---|---|---|
| `/ban <player> [duration] [reason]` | Permanent ban, or timed if a duration is given | `servercore.ban` |
| `/tempban <player> <duration> [reason]` | Timed ban | `servercore.tempban` |
| `/ipban <player> [duration] [reason]` | Ban the player and their last known IP | `servercore.ban.ip` |
| `/unban <player\|id>` | Remove a ban | `servercore.unban` |
| `/bans [count]` | List recent bans | `servercore.ban` |

```text
/ban Bob Cheating
/ban Bob 7d Cheating
/tempban Bob 12h Griefing
/ipban Bob Ban evasion
/ban id:76561198000000000 Known cheater
/unban Bob
```

:::tip
`servercore.tempban` lets moderators ban for a limited time without being able to hand out permanent bans. A
moderator with only `tempban` also can't replace an existing permanent ban.
:::

## Durations

| Input | Meaning |
|---|---|
| `30s` | 30 seconds |
| `10m` | 10 minutes |
| `12h` | 12 hours |
| `7d` | 7 days |
| `2w` | 2 weeks |
| `3mo` | 3 months (30 days each) |
| `1y` | 1 year |
| `1d12h` | Combined |
| `60` | A plain number is **minutes** |
| `perm` | Permanent |

## Offline players

Players who have joined before can be banned by name or id. Players who have **never** joined can be banned with
`id:<PlayerId>`, so you can pre-ban known cheaters from other servers.

## What the player sees

When banned while online, the player is kicked with the **Ban Message** or **Temp Ban Message**. When they try to rejoin,
login is rejected with the same message. Both support `{Reason}`, `{Duration}`, `{Expires}` and `{By}`.

## Expiry

Timed bans are removed automatically when they expire, and the removal is logged as an *Unban* by `Expired`.

## Blueprint

| Node | Description |
|---|---|
| **Ban Player** (Caller, Player Id, Reason, Duration Seconds, Ban IP Address) | `Duration Seconds` ≤ 0 is permanent |
| **Unban Player** (Caller, Player Id) | |
| **Is Player Banned** (Player Id) → Banned, Out Ban | |
| **Get Bans** | All bans, newest first |
| **Parse Duration** (Text) → Seconds | Turn `"7d"` into seconds for your own UI |

## C++

```cpp
// Anti-cheat: ban for 30 days, including IP.
ServerCore->BanPlayer(FServerCoreCaller::System(TEXT("AntiCheat")), PlayerId,
    TEXT("Speed hack detected"), 30 * 24 * 3600, /*bBanIPAddress*/ true);
```
