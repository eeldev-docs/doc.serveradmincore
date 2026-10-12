---
sidebar_position: 1
title: C++ Overview
---

# C++ Overview

## Module dependency

Add `ServerCore` to your module's `Build.cs`:

```csharp title="MyGame.Build.cs"
PublicDependencyModuleNames.AddRange(new string[] { "Core", "CoreUObject", "Engine", "ServerCore" });
```

## Headers

| Header | Contains |
|---|---|
| `ServerCoreSubsystem.h` | `UServerCoreSubsystem`, `FServerCoreCommandContext`, `FServerCoreNativeCommandHandler` |
| `ServerCoreTypes.h` | Structs, enums, delegates, `ServerCorePermissions` constants |
| `ServerCorePlayerComponent.h` | `UServerCorePlayerComponent` |
| `ServerCoreBlueprintLibrary.h` | `UServerCoreBlueprintLibrary` helpers |
| `ServerCoreSettings.h` | `UServerCoreSettings` |
| `ServerCoreStorage.h` | `UServerCoreStorage`, `UServerCoreJsonStorage` |

## Getting the subsystem

```cpp
#include "ServerCoreSubsystem.h"

UServerCoreSubsystem* ServerCore = UServerCoreSubsystem::Get(this); // any UObject with a world
if (ServerCore && ServerCore->IsServerCoreActive())
{
    // server side
}
```

## Examples

### Ban from game code

```cpp
#include "ServerCoreBlueprintLibrary.h"

void AMyGameMode::OnCheatDetected(APlayerController* Cheater)
{
    UServerCoreSubsystem* ServerCore = UServerCoreSubsystem::Get(this);
    const FString PlayerId = UServerCoreBlueprintLibrary::GetPlayerId(Cheater);

    ServerCore->BanPlayer(FServerCoreCaller::System(TEXT("AntiCheat")), PlayerId,
        TEXT("Cheat detected"), /*DurationSeconds*/ 30 * 24 * 3600, /*bBanIPAddress*/ true);
}
```

### Vote kick

```cpp
void AMyGameMode::OnVoteKickPassed(const FString& PlayerId)
{
    UServerCoreSubsystem::Get(this)->KickPlayer(FServerCoreCaller::System(TEXT("VoteKick")), PlayerId, TEXT("Vote kick"));
}
```

### Admin action from a player, with permission checks

```cpp
void AMyPlayerController::ServerAdminKick_Implementation(const FString& TargetId, const FString& Reason)
{
    UServerCoreSubsystem* ServerCore = UServerCoreSubsystem::Get(this);
    const EServerCoreResult Result = ServerCore->KickPlayer(ServerCore->MakeCaller(this), TargetId, Reason);
    if (Result != EServerCoreResult::Success)
    {
        ServerCore->SendMessageToPlayer(UServerCoreBlueprintLibrary::GetPlayerId(this),
            UServerCoreBlueprintLibrary::ResultToString(Result));
    }
}
```

### Gate a game feature behind a permission

```cpp
if (ServerCore->HasPermission(PlayerId, TEXT("mygame.fly")))
{
    EnableFlying(PlayerController);
}
```

### Use your own chat with mutes

```cpp
void AMyPlayerController::ServerSay_Implementation(const FString& Message)
{
    UServerCoreSubsystem* ServerCore = UServerCoreSubsystem::Get(this);
    FServerCoreSanction Mute;
    if (ServerCore->IsPlayerMuted(UServerCoreBlueprintLibrary::GetPlayerId(this), Mute))
    {
        return;
    }
    // deliver the message
}
```

### React to events

The subsystem's events are dynamic multicast delegates, bind them with `AddDynamic` from a `UFUNCTION`:

```cpp
void AMyGameMode::BeginPlay()
{
    Super::BeginPlay();
    if (UServerCoreSubsystem* ServerCore = UServerCoreSubsystem::Get(this))
    {
        ServerCore->OnPlayerBanned.AddDynamic(this, &AMyGameMode::HandlePlayerBanned);
    }
}

void AMyGameMode::HandlePlayerBanned(const FServerCoreSanction& Ban, const FServerCoreCaller& Caller)
{
    UE_LOG(LogTemp, Log, TEXT("%s was banned by %s: %s"), *Ban.PlayerName, *Caller.PlayerName, *Ban.Reason);
}
```

### Read the data directly

```cpp
const FServerCoreDatabase& Data = ServerCore->GetDatabase();
for (const TPair<FString, FServerCorePlayerRecord>& Player : Data.Players)
{
    // ...
}
```
