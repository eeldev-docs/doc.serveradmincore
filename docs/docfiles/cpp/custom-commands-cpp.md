---
sidebar_position: 2
title: Custom Commands
---

# Custom Commands (C++)

Register a command with `RegisterNativeCommand`. The handler gets a `FServerAdminCoreCommandContext` and returns an
`EServerAdminCoreResult`.

```cpp
#include "ServerAdminCoreSubsystem.h"

void AMyGameMode::BeginPlay()
{
    Super::BeginPlay();

    UServerAdminCoreSubsystem* ServerAdminCore = UServerAdminCoreSubsystem::Get(this);
    if (!ServerAdminCore)
    {
        return;
    }

    FServerAdminCoreCommandInfo Info;
    Info.Name = TEXT("heal");
    Info.Aliases = { TEXT("h") };
    Info.Permission = TEXT("mygame.heal");
    Info.Usage = TEXT("<player> [amount]");
    Info.Description = TEXT("Heals a player.");
    Info.MinArgs = 1;

    ServerAdminCore->RegisterNativeCommand(Info, [ServerAdminCore](FServerAdminCoreCommandContext& Context)
    {
        FString PlayerId, PlayerName, Error;
        if (!ServerAdminCore->FindPlayer(Context.Args[0], /*bIncludeOffline*/ false, PlayerId, PlayerName, Error))
        {
            Context.Reply(Error);
            return EServerAdminCoreResult::PlayerNotFound;
        }

        const float Amount = Context.Args.IsValidIndex(1) ? FCString::Atof(*Context.Args[1]) : 100.f;
        if (APlayerController* Target = ServerAdminCore->GetPlayerController(PlayerId))
        {
            // Heal Target->GetPawn() by Amount
        }

        Context.Reply(FString::Printf(TEXT("Healed %s by %.0f."), *PlayerName, Amount));
        return EServerAdminCoreResult::Success;
    });
}
```

## FServerAdminCoreCommandContext

| Member | Description |
|---|---|
| `Caller` | Who ran the command |
| `CommandName` | The command name (lower case, without prefix) |
| `Args` | Arguments. Quoted text is one argument. |
| `Output` | Lines sent back to the caller |
| `Reply(Line)` | Adds a line to `Output` |
| `JoinArgs(StartIndex, Fallback)` | Joins `Args` from `StartIndex`, e.g. for a reason |

## Tips

- The command's `Permission` is checked before your handler runs, and `MinArgs` too. Check extra permissions inside the
  handler with `ServerAdminCore->CallerHasPermission(Context.Caller, ...)`.
- Act on players through Server Admin Core functions (`KickPlayer`, `MutePlayer`, …) with `Context.Caller`, so priority rules
  and logging apply.
- Registering a command with an existing name replaces it. `UnregisterCommand(Name)` removes it.
- The subsystem lives on the game instance, so commands registered once stay registered across map changes. Registering
  again in every `BeginPlay` is harmless, it simply replaces the command.
