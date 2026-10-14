---
sidebar_position: 1
title: C++ Overview
---

# C++ Overview

## Module dependency

Add `ServerAdminCore` to your module's `Build.cs`:

```csharp title="MyGame.Build.cs"
PublicDependencyModuleNames.AddRange(new string[] { "Core", "CoreUObject", "Engine", "ServerAdminCore" });
```

## Headers

| Header | Contains |
|---|---|
| `ServerAdminCoreSubsystem.h` | `UServerAdminCoreSubsystem`, `FServerAdminCoreCommandContext`, `FServerAdminCoreNativeCommandHandler` |
| `ServerAdminCoreTypes.h` | Structs, enums, delegates, `ServerAdminCorePermissions` constants |
| `ServerAdminCorePlayerComponent.h` | `UServerAdminCorePlayerComponent` |
| `ServerAdminCoreBlueprintLibrary.h` | `UServerAdminCoreBlueprintLibrary` helpers |
| `ServerAdminCoreSettings.h` | `UServerAdminCoreSettings` |
| `ServerAdminCoreStorage.h` | `UServerAdminCoreStorage`, `UServerAdminCoreJsonStorage` |

## Getting the subsystem

```cpp
#include "ServerAdminCoreSubsystem.h"

UServerAdminCoreSubsystem* ServerAdminCore = UServerAdminCoreSubsystem::Get(this); // any UObject with a world
if (ServerAdminCore && ServerAdminCore->IsServerAdminCoreActive())
{
    // server side
}
```

## Examples

### Ban from game code

```cpp
#include "ServerAdminCoreBlueprintLibrary.h"

void AMyGameMode::OnCheatDetected(APlayerController* Cheater)
{
    UServerAdminCoreSubsystem* ServerAdminCore = UServerAdminCoreSubsystem::Get(this);
    const FString PlayerId = UServerAdminCoreBlueprintLibrary::GetPlayerId(Cheater);

    ServerAdminCore->BanPlayer(FServerAdminCoreCaller::System(TEXT("AntiCheat")), PlayerId,
        TEXT("Cheat detected"), /*DurationSeconds*/ 30 * 24 * 3600, /*bBanIPAddress*/ true);
}
```

### Vote kick

```cpp
void AMyGameMode::OnVoteKickPassed(const FString& PlayerId)
{
    UServerAdminCoreSubsystem::Get(this)->KickPlayer(FServerAdminCoreCaller::System(TEXT("VoteKick")), PlayerId, TEXT("Vote kick"));
}
```

### Admin action from a player, with permission checks

```cpp
void AMyPlayerController::ServerAdminKick_Implementation(const FString& TargetId, const FString& Reason)
{
    UServerAdminCoreSubsystem* ServerAdminCore = UServerAdminCoreSubsystem::Get(this);
    const EServerAdminCoreResult Result = ServerAdminCore->KickPlayer(ServerAdminCore->MakeCaller(this), TargetId, Reason);
    if (Result != EServerAdminCoreResult::Success)
    {
        ServerAdminCore->SendMessageToPlayer(UServerAdminCoreBlueprintLibrary::GetPlayerId(this),
            UServerAdminCoreBlueprintLibrary::ResultToString(Result));
    }
}
```

### Gate a game feature behind a permission

```cpp
if (ServerAdminCore->HasPermission(PlayerId, TEXT("mygame.fly")))
{
    EnableFlying(PlayerController);
}
```

### Use your own chat with mutes

```cpp
void AMyPlayerController::ServerSay_Implementation(const FString& Message)
{
    UServerAdminCoreSubsystem* ServerAdminCore = UServerAdminCoreSubsystem::Get(this);
    FServerAdminCoreSanction Mute;
    if (ServerAdminCore->IsPlayerMuted(UServerAdminCoreBlueprintLibrary::GetPlayerId(this), Mute))
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
    if (UServerAdminCoreSubsystem* ServerAdminCore = UServerAdminCoreSubsystem::Get(this))
    {
        ServerAdminCore->OnPlayerBanned.AddDynamic(this, &AMyGameMode::HandlePlayerBanned);
    }
}

void AMyGameMode::HandlePlayerBanned(const FServerAdminCoreSanction& Ban, const FServerAdminCoreCaller& Caller)
{
    UE_LOG(LogTemp, Log, TEXT("%s was banned by %s: %s"), *Ban.PlayerName, *Caller.PlayerName, *Ban.Reason);
}
```

### Read the data directly

```cpp
const FServerAdminCoreDatabase& Data = ServerAdminCore->GetDatabase();
for (const TPair<FString, FServerAdminCorePlayerRecord>& Player : Data.Players)
{
    // ...
}
```
