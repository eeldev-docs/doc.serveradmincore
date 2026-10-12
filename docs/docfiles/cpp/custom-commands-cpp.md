---
sidebar_position: 2
title: Custom Commands
---

# Custom Commands (C++)

Register a command with `RegisterNativeCommand`. The handler gets a `FServerCoreCommandContext` and returns an
`EServerCoreResult`.

```cpp
#include "ServerCoreSubsystem.h"

void AMyGameMode::BeginPlay()
{
    Super::BeginPlay();

    UServerCoreSubsystem* ServerCore = UServerCoreSubsystem::Get(this);
    if (!ServerCore)
    {
        return;
    }

    FServerCoreCommandInfo Info;
    Info.Name = TEXT("heal");
    Info.Aliases = { TEXT("h") };
    Info.Permission = TEXT("mygame.heal");
    Info.Usage = TEXT("<player> [amount]");
    Info.Description = TEXT("Heals a player.");
    Info.MinArgs = 1;

    ServerCore->RegisterNativeCommand(Info, [ServerCore](FServerCoreCommandContext& Context)
    {
        FString PlayerId, PlayerName, Error;
        if (!ServerCore->FindPlayer(Context.Args[0], /*bIncludeOffline*/ false, PlayerId, PlayerName, Error))
        {
            Context.Reply(Error);
            return EServerCoreResult::PlayerNotFound;
        }

        const float Amount = Context.Args.IsValidIndex(1) ? FCString::Atof(*Context.Args[1]) : 100.f;
        if (APlayerController* Target = ServerCore->GetPlayerController(PlayerId))
        {
            // Heal Target->GetPawn() by Amount
        }

        Context.Reply(FString::Printf(TEXT("Healed %s by %.0f."), *PlayerName, Amount));
        return EServerCoreResult::Success;
    });
}
```

## FServerCoreCommandContext

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
  handler with `ServerCore->CallerHasPermission(Context.Caller, ...)`.
- Act on players through Server Core functions (`KickPlayer`, `MutePlayer`, …) with `Context.Caller`, so priority rules
  and logging apply.
- Registering a command with an existing name replaces it. `UnregisterCommand(Name)` removes it.
- The subsystem lives on the game instance, so commands registered once stay registered across map changes. Registering
  again in every `BeginPlay` is harmless, it simply replaces the command.
