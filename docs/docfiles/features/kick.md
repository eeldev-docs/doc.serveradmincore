---
sidebar_position: 1
title: Kick
---

# Kick

Removes a player from the server with a reason. The player sees the [Kick Message](../reference/settings-reference#moderation).

## Command

```text
/kick <player> [reason]
```

```text
/kick Bob Spamming
/kick #3 AFK
/kick "Some Name" Please read the rules
```

Permission: `serveradmincore.kick`

## Blueprint

**Kick Player** (Caller, Player Id, Reason) → Result

1. **Get Server Admin Core**
2. **Kick Player** with a caller from **Make Caller** (an admin's player controller) or **Make System Caller** (game logic)
3. Check the returned **Result**

## C++

```cpp
UServerAdminCoreSubsystem* ServerAdminCore = UServerAdminCoreSubsystem::Get(this);
const EServerAdminCoreResult Result = ServerAdminCore->KickPlayer(
    ServerAdminCore->MakeCaller(AdminController), TargetPlayerId, TEXT("Spamming"));
```

## Rules

- The target must be online.
- Players can only kick players with a **lower group priority** (see [Permission Groups](permission-groups#priority-and-immunity)).
- You can't kick yourself or the listen server host.
- The kick is written to the [Admin Log](admin-logs) and fires **On Player Kicked**.
