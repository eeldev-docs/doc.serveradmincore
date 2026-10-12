---
sidebar_position: 4
title: API Reference
---

# API Reference

All functions listed here are available in Blueprint and C++. Admin functions are **server only** and return an
[`EServerCoreResult`](../blueprint/blueprint-overview#results).

## UServerCoreSubsystem

Get it with **Get Server Core** / `UServerCoreSubsystem::Get(WorldContext)`.

### General

| Function | Description |
|---|---|
| `bool IsServerCoreActive()` | True on the server when ServerCore is enabled for the current net mode. |
| `FServerCoreCaller MakeCaller(APlayerController* PlayerController)` | Builds a caller for a player controller. Only build callers on the server. |

### Players

| Function | Description |
|---|---|
| `TArray<FServerCorePlayerInfo> GetOnlinePlayers()` | Online players sorted by join time. Server only. |
| `bool GetPlayerInfo(const FString& PlayerId, FServerCorePlayerInfo& OutInfo)` | Info about an online or offline player that has joined before. |
| `bool GetPlayerRecord(const FString& PlayerId, FServerCorePlayerRecord& OutRecord)` | The stored record of a player that has joined before. |
| `bool FindPlayer(const FString& Query, bool bIncludeOffline, FString& OutPlayerId, FString& OutPlayerName, FString& OutError)` | Resolves a player from user input: player id, "#index" from the player list, exact name or a unique partial name. With bIncludeOffline, offline players that joined before are matched by id or exact name. |
| `APlayerController* GetPlayerController(const FString& PlayerId)` | Player controller of an online player, or null. |
| `bool IsPlayerOnline(const FString& PlayerId)` | True if the player is online. |
| `int32 GetOnlinePlayerCount()` | Number of online players. |

### Moderation

| Function | Description |
|---|---|
| `EServerCoreResult KickPlayer(const FServerCoreCaller& Caller, const FString& PlayerId, const FString& Reason)` | Kicks an online player. Requires `servercore.kick`. |
| `EServerCoreResult BanPlayer(const FServerCoreCaller& Caller, const FString& PlayerId, const FString& Reason, int64 DurationSeconds = 0, bool bBanIPAddress = false)` | Bans a player (online or offline). DurationSeconds &lt;= 0 is permanent. bBanIPAddress also bans the player's last known IP. |
| `EServerCoreResult UnbanPlayer(const FServerCoreCaller& Caller, const FString& PlayerId)` | Removes a ban. Requires `servercore.unban`. |
| `bool IsPlayerBanned(const FString& PlayerId, FServerCoreSanction& OutBan)` | True if the player has an active ban. Outputs the ban. |
| `TArray<FServerCoreSanction> GetBans()` | All bans, newest first. |
| `EServerCoreResult MutePlayer(const FServerCoreCaller& Caller, const FString& PlayerId, const FString& Reason, int64 DurationSeconds = 0)` | Mutes a player's chat (and voice if enabled in settings). DurationSeconds &lt;= 0 is permanent. |
| `EServerCoreResult UnmutePlayer(const FServerCoreCaller& Caller, const FString& PlayerId)` | Removes a mute. Requires `servercore.unmute`. |
| `bool IsPlayerMuted(const FString& PlayerId, FServerCoreSanction& OutMute)` | Use this in your own chat system to block muted players. |
| `TArray<FServerCoreSanction> GetMutes()` | All mutes, newest first. |

### Whitelist

| Function | Description |
|---|---|
| `EServerCoreResult SetWhitelistEnabled(const FServerCoreCaller& Caller, bool bEnabled)` | Turns the whitelist on or off. Requires `servercore.whitelist`. |
| `bool IsWhitelistEnabled()` | True if the whitelist is on. |
| `EServerCoreResult AddToWhitelist(const FServerCoreCaller& Caller, const FString& PlayerId, const FString& PlayerName)` | Adds a player to the whitelist. Player name is optional. Requires `servercore.whitelist`. |
| `EServerCoreResult RemoveFromWhitelist(const FServerCoreCaller& Caller, const FString& PlayerId)` | Removes a player from the whitelist. Requires `servercore.whitelist`. |
| `bool IsPlayerWhitelisted(const FString& PlayerId)` | True if the player is on the whitelist. |
| `TArray<FServerCoreWhitelistEntry> GetWhitelist()` | All whitelist entries, sorted by name. |

### Permissions

| Function | Description |
|---|---|
| `TArray<FServerCoreGroup> GetGroups()` | All groups, highest priority first. |
| `bool GetGroup(const FString& GroupName, FServerCoreGroup& OutGroup)` | Finds a group by name (case insensitive). |
| `EServerCoreResult SaveGroup(const FServerCoreCaller& Caller, const FServerCoreGroup& Group)` | Creates or replaces a group (requires servercore.group.edit). |
| `EServerCoreResult DeleteGroup(const FServerCoreCaller& Caller, const FString& GroupName)` | Deletes a group. Members fall back to the default group. The default group can not be deleted. |
| `EServerCoreResult SetPlayerGroup(const FServerCoreCaller& Caller, const FString& PlayerId, const FString& GroupName)` | Assigns a player to a group. Empty GroupName resets to the default group. |
| `FString GetPlayerGroup(const FString& PlayerId)` | The player's effective group name (Owner for owners, Default when unassigned). |
| `int32 GetPlayerPriority(const FString& PlayerId)` | The player's group priority (max int for owners). |
| `bool IsOwner(const FString& PlayerId)` | True if the player is an owner. |
| `bool HasPermission(const FString& PlayerId, const FString& Permission)` | True if the player has the permission node. |
| `bool CallerHasPermission(const FServerCoreCaller& Caller, const FString& Permission)` | Same as HasPermission, but system callers always pass. |
| `bool CanTarget(const FServerCoreCaller& Caller, const FString& TargetPlayerId)` | True if Caller is allowed to act on TargetPlayerId according to group priority. |
| `TArray<FString> GetEffectivePermissions(const FString& PlayerId)` | All permission nodes of the player including inherited ones. |
| `TArray<FServerCorePlayerRecord> GetStaffMembers()` | Players assigned to a group other than the default group. |

### Notes

| Function | Description |
|---|---|
| `EServerCoreResult AddPlayerNote(const FServerCoreCaller& Caller, const FString& PlayerId, const FString& Text, FGuid& OutNoteId)` | Adds a staff note. Requires `servercore.notes.add`. |
| `EServerCoreResult RemovePlayerNote(const FServerCoreCaller& Caller, const FGuid& NoteId)` | Deletes a note. Requires `servercore.notes.remove`. |
| `TArray<FServerCorePlayerNote> GetPlayerNotes(const FString& PlayerId)` | Notes for a player, newest first. |

### Communication

| Function | Description |
|---|---|
| `EServerCoreResult Announce(const FServerCoreCaller& Caller, const FString& Message, EServerCoreAnnouncementType Type = EServerCoreAnnouncementType::Notification)` | Sends an announcement to every player. |
| `bool SendMessageToPlayer(const FString& PlayerId, const FString& Message)` | Sends a private server message to one player. |
| `EServerCoreResult BroadcastChatMessage(const FServerCoreCaller& Sender, const FString& Message)` | Broadcasts a chat message from Sender. Returns Muted if the sender is muted. |

### Commands

| Function | Description |
|---|---|
| `EServerCoreResult ExecuteCommand(const FServerCoreCaller& Caller, const FString& CommandLine, TArray<FString>& OutLines)` | Runs a command line ("ban Name 1d Cheating") as Caller. The prefix is optional. |
| `void RegisterCommand(const FServerCoreCommandInfo& Info, FServerCoreCommandDelegate Handler)` | Registers a Blueprint command. The returned string is sent back to the caller. Replaces an existing command with the same name. |
| `bool UnregisterCommand(const FString& Name)` | Removes a command. Returns false if it did not exist. |
| `TArray<FServerCoreCommandInfo> GetCommands(const FServerCoreCaller& Caller)` | Commands the caller is allowed to run. |

### Logs

| Function | Description |
|---|---|
| `void WriteAdminLog(const FServerCoreCaller& Caller, EServerCoreAction Action, const FString& TargetId, const FString& TargetName, const FString& Details)` | Writes an entry to the admin log. Use action Custom for your own events. |
| `TArray<FServerCoreLogEntry> GetAdminLogs(int32 MaxEntries = 100, const FString& FilterPlayerId = TEXT(""))` | Newest first. Empty filter returns all entries, otherwise entries where the player is the actor or the target. |

### Data

| Function | Description |
|---|---|
| `void SaveAll()` | Writes all data to storage immediately. Data is otherwise saved automatically shortly after every change. |
| `EServerCoreResult ReloadData(const FServerCoreCaller& Caller)` | Reloads all data from storage. Unsaved changes are lost. |

## UServerCorePlayerComponent

On every player controller. Call these on the owning client.

### Chat

| Function | Description |
|---|---|
| `void SendChatMessage(const FString& Message)` | Sends a chat message. Messages starting with the command prefix (default "/") are executed as commands. Muted players are blocked. |
| `bool IsMuted()` | Replicated: true if this player is muted. |

### Commands

| Function | Description |
|---|---|
| `void ExecuteCommand(const FString& CommandLine)` | Runs a server command, e.g. "kick PlayerName Spamming". The prefix is optional. Output arrives in OnCommandOutput. |

### Admin Panel

| Function | Description |
|---|---|
| `void RequestPlayerList()` | Requests the online player list (requires servercore.players). Result arrives in OnPlayerListReceived. |
| `void RequestPlayerInfo(const FString& PlayerId)` | Requests info about a player, online or offline (requires servercore.info). Result arrives in OnPlayerInfoReceived. |
| `void RequestAdminLogs(int32 MaxEntries = 100, const FString& FilterPlayerId = TEXT(""))` | Requests admin logs (requires servercore.logs). Empty filter returns all. Result arrives in OnAdminLogsReceived. |
| `void RequestSanctions()` | Requests bans and mutes (requires servercore.ban / servercore.mute). Result arrives in OnSanctionsReceived. |
| `void RequestCommands()` | Requests the commands this player can run. Result arrives in OnCommandsReceived. |

### Permissions

| Function | Description |
|---|---|
| `bool HasPermission(const FString& Permission)` | Client side permission check based on replicated data. Use it for UI only, the server always checks again. |
| `FString GetGroupName()` | Replicated: this player's group name. |
| `int32 GetGroupPriority()` | Replicated: this player's group priority. |
| `TArray<FString> GetPermissions()` | Replicated: this player's effective permission nodes. |

### General

| Function | Description |
|---|---|
| `APlayerController* GetOwningPlayerController()` | The player controller this component belongs to. |

## UServerCoreBlueprintLibrary

Static helpers.

### Players

| Function | Description |
|---|---|
| `static FString GetPlayerId(const APlayerController* PlayerController)` | The unique net id of the player as a string (falls back to a session id when there is no online subsystem id). |
| `static FString GetPlayerIdFromPlayerState(const APlayerState* PlayerState)` | Unique player id from a player state. |
| `static FString GetPlayerIPAddress(const APlayerController* PlayerController)` | Remote IP address of a player (server only). |
| `static UServerCorePlayerComponent* GetServerCorePlayerComponent(const APlayerController* PlayerController)` | Finds the ServerCore player component on a player controller. |

### General

| Function | Description |
|---|---|
| `static FServerCoreCaller MakeSystemCaller(const FString& Name = TEXT("Server"))` | A caller that bypasses permissions. Use for game logic such as anti-cheat bans or vote kicks. |

### Utilities

| Function | Description |
|---|---|
| `static bool ParseDuration(const FString& Text, int64& OutSeconds)` | Parses "30m", "2h", "1d12h", "1w", "perm". A plain number is treated as minutes. Permanent returns true with 0 seconds. |
| `static FString FormatDuration(int64 Seconds)` | 93784 -&gt; "1d 2h 3m". |
| `static FString ResultToString(EServerCoreResult Result)` | Readable message for a result. |
| `static FString ActionToString(EServerCoreAction Action)` | Name of an admin log action. |

### Permissions

| Function | Description |
|---|---|
| `static bool DoesPermissionListGrant(const TArray<FString>& PermissionList, const FString& Permission)` | True if the permission list grants Permission. Supports "*", "prefix.*" and "-denied.node". |

### Moderation

| Function | Description |
|---|---|
| `static int64 GetSanctionRemainingSeconds(const FServerCoreSanction& Sanction)` | Seconds left on a ban or mute (0 if permanent). |

### Commands

| Function | Description |
|---|---|
| `static TArray<FString> TokenizeCommandLine(const FString& CommandLine)` | Splits a command line into arguments. Quotes group words: kick "Some Name" spam. |

## C++ only

| Function | Description |
|---|---|
| `static UServerCoreSubsystem* UServerCoreSubsystem::Get(const UObject* WorldContextObject)` | Gets the subsystem from any world context |
| `void RegisterNativeCommand(const FServerCoreCommandInfo& Info, FServerCoreNativeCommandHandler Handler)` | Registers a C++ command, see [Custom Commands](../cpp/custom-commands-cpp) |
| `const FServerCoreDatabase& GetDatabase() const` | Read-only access to all stored data |
