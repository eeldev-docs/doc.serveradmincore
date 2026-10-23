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

## Showing the kick reason to the player

When a player is kicked, the client is disconnected right away and returns to the default map, so the in-game HUD is
gone. Just before the disconnect, Server Admin Core sends the kick message to the client and stores it on the client's
**Server Admin Core** subsystem. The subsystem lives on the game instance, so the message is still there after the
client is back on the menu map.

This works for every kick: manual kicks, bans, [AFK and high ping kicks](auto-kick), whitelist and ban checks on join,
and restart or shutdown.

### Blueprint

In **Event Construct** of your main menu widget, or the HUD of your default map:

1. **Get Server Admin Core → Was Kicked**
2. **Branch**: if true, **Get Last Kick Reason** and show it in a popup or text block
3. **Clear Last Kick Reason** when the player closes the popup, so it isn't shown again

| Function / Event | Where | Description |
|---|---|---|
| **Was Kicked** | Server Admin Core | True if this client was kicked and the reason hasn't been cleared |
| **Get Last Kick Reason** | Server Admin Core | The kick message the player received, for example the [Kick Message](../reference/settings-reference#moderation) with the reason filled in |
| **Clear Last Kick Reason** | Server Admin Core | Clears the stored reason |
| **On Local Player Kicked** (Reason) | Server Admin Core | Fires on the client when the kick message arrives, just before the disconnect |
| **On Kicked** (Reason) | Player Component | Same, on the local player's component |

:::tip
**On Local Player Kicked** and **On Kicked** fire just before the disconnect, so anything you show then disappears
almost at once. To show the reason to the player, read **Get Last Kick Reason** after the client is back on the menu
map.
:::

### C++

```cpp
UServerAdminCoreSubsystem* ServerAdminCore = UServerAdminCoreSubsystem::Get(this);
if (ServerAdminCore && ServerAdminCore->WasKicked())
{
    ShowKickPopup(ServerAdminCore->GetLastKickReason());
    ServerAdminCore->ClearLastKickReason();
}
```
