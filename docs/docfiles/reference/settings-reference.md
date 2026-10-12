---
sidebar_position: 3
title: Settings Reference
---

# Settings Reference

**Project Settings → Plugins → Server Core**, stored in `Config/DefaultGame.ini` under
`[/Script/ServerCore.ServerCoreSettings]`. The *Config key* column is the name to use in the ini file.

## General

| Setting | Config key | Default | Description |
|---|---|---|---|
| **Enabled** | `bEnabled` | `true` | Turns ServerCore on or off. |
| **Active On Listen Server** | `bActiveOnListenServer` | `true` | Run ServerCore on listen servers, where the hosting player's game is the server. Dedicated servers are always active. |
| **Active In Standalone** | `bActiveInStandalone` | `false` | Also run ServerCore in standalone games. |
| **Listen Server Host Is Owner** | `bListenServerHostIsOwner` | `true` | On a listen server the hosting player is treated as an owner. |
| **Data Directory** | `DataDirectory` | – | Folder for data files. Empty = &lt;Project&gt;/Saved/ServerCore. Relative paths are relative to the project folder. Can be overridden with -ServerCoreDataDir=&lt;path&gt;. |
| **Storage Class** | `StorageClass` | `ServerCoreJsonStorage` | Storage backend. Subclass UServerCoreStorage to use a database or web API instead of JSON files. |
| **Auto Add Player Component** | `bAutoAddPlayerComponent` | `true` | Component added to every player controller on the server. Used for chat, commands, announcements and admin panels. |
| **Player Component Class** | `PlayerComponentClass` | `ServerCorePlayerComponent` | Class of the auto-added player component. Use your own subclass to extend it. |
| **Enable Console Input** | `bEnableConsoleInput` | `true` | Read commands typed into the dedicated server console (the Windows -log window, or the terminal on Linux). Lines run as ServerCore commands or Unreal console commands. Disable with -NoServerCoreConsole. |

## Permissions

| Setting | Config key | Default | Description |
|---|---|---|---|
| **Owner Ids** | `OwnerIds` | – | Player ids that always have every permission. Can be extended with -ServerCoreOwners=Id1,Id2 |
| **Owner Group Name** | `OwnerGroupName` | `"Owner"` | Group name reported for owners. |
| **Default Group Name** | `DefaultGroupName` | `"Default"` | Group used for players without an assigned group. |
| **Default Groups** | `DefaultGroups` | Owner, Admin, Moderator, Default | Groups created the first time the server runs (when no Groups.json exists). Edit groups at runtime with commands or Blueprint afterwards. |
| **Enforce Immunity** | `bEnforceImmunity` | `true` | Players can only act on players with a lower group priority. |

## Moderation

| Setting | Config key | Default | Description |
|---|---|---|---|
| **Whitelist Enabled By Default** | `bWhitelistEnabledByDefault` | `false` | Whitelist state the first time the server runs. |
| **Record IP Addresses** | `bRecordIPAddresses` | `true` | Store the last IP address of each player. |
| **Enforce IP Bans** | `bEnforceIPBans` | `true` | Reject players whose IP address matches an IP ban. |
| **Mute Voice Chat** | `bMuteVoiceChat` | `true` | Also mute voice chat (APlayerController::GameplayMutePlayer) for muted players. |
| **Ban Message** | `BanMessage` | `"You are banned from this server. Reason: {Reason}"` | Formats support `{Reason}`, `{Expires}`, `{Duration}`, `{By}`. |
| **Temp Ban Message** | `TempBanMessage` | `"You are banned from this server for {Duration}. Reason: {Reason}"` | Shown to temp banned players. Supports `{Reason}`, `{Duration}`, `{Expires}`, `{By}`. |
| **Kick Message** | `KickMessage` | `"You were kicked from the server. Reason: {Reason}"` | Shown to kicked players. Supports `{Reason}`, `{By}`. |
| **Mute Message** | `MuteMessage` | `"You are muted. Reason: {Reason}"` | Sent to permanently muted players. |
| **Temp Mute Message** | `TempMuteMessage` | `"You are muted for {Duration}. Reason: {Reason}"` | Sent to temp muted players. |
| **Whitelist Message** | `WhitelistMessage` | `"This server is whitelisted."` | Shown to players who are not whitelisted. |
| **Default Reason** | `DefaultReason` | `"No reason given"` | Used when no reason is given. |

## Chat and Commands

| Setting | Config key | Default | Description |
|---|---|---|---|
| **Command Prefix** | `CommandPrefix` | `"/"` | Chat messages starting with this prefix are run as commands. |
| **Broadcast Chat To Players** | `bBroadcastChatToPlayers` | `true` | Send chat from UServerCorePlayerComponent::SendChatMessage to every player. Disable if you only want OnChatMessage and handle delivery yourself. |
| **Max Chat Message Length** | `MaxChatMessageLength` | `256` | Longer chat messages are cut. |
| **Log Chat To Output** | `bLogChatToOutput` | `true` | Write chat to the output log. |
| **Log All Commands** | `bLogAllCommands` | `false` | Writes every executed command to the admin log, in addition to the action itself. |

## Announcements

| Setting | Config key | Default | Description |
|---|---|---|---|
| **Scheduled Announcements** | `ScheduledAnnouncements` | – | Messages repeated on an interval. See Server Announcements. |
| **Welcome Message** | `WelcomeMessage` | – | Shown to a player when they join. Empty = disabled. Supports `{Player}`. |

## Server Control

| Setting | Config key | Default | Description |
|---|---|---|---|
| **Restart Mode** | `RestartMode` | `EServerCoreRestartMode::RelaunchProcess` | Relaunch Process, Exit Process or Reload Map. See Change Map, Restart and Shutdown. |
| **Restart Exit Code** | `RestartExitCode` | `0` | Exit code used for restarts in Exit Process and Relaunch Process mode. |
| **Countdown Warnings** | `CountdownWarnings` | 600, 300, 120, 60, 30, 15, 10, 5, 4, 3, 2, 1 | Seconds left at which a countdown warning is announced. |
| **Map Aliases** | `MapAliases` | – | Short names for maps, e.g. "arena" -&gt; "/Game/Maps/Arena". |
| **Map Search Paths** | `MapSearchPaths` | `/Game` | Content paths searched when a map is given by short name and listed by the "maps" command. |
| **Restart Warning Message** | `RestartWarningMessage` | `"Server restarting in {Time}. {Reason}"` | Supports `{Time}`, `{Reason}`, `{Map}`. |
| **Shutdown Warning Message** | `ShutdownWarningMessage` | `"Server shutting down in {Time}. {Reason}"` | Countdown warning for shutdowns. |
| **Map Change Warning Message** | `MapChangeWarningMessage` | `"Changing map to {Map} in {Time}."` | Countdown warning for map changes. Supports `{Time}`, `{Map}`. |
| **Cancelled Message** | `CancelledMessage` | `"The scheduled server action was cancelled."` | Announced when a scheduled action is cancelled. |
| **Shutdown Kick Message** | `ShutdownKickMessage` | `"The server is shutting down. {Reason}"` | Kick message when the server shuts down. Supports `{Reason}`. |
| **Restart Kick Message** | `RestartKickMessage` | `"The server is restarting. {Reason}"` | Kick message when the server restarts. Supports `{Reason}`. |

## Logging

| Setting | Config key | Default | Description |
|---|---|---|---|
| **Write Log Files** | `bWriteLogFiles` | `true` | Writes admin logs to &lt;DataDirectory&gt;/Logs/AdminLog-YYYY-MM-DD.jsonl |
| **Max Log Entries In Memory** | `MaxLogEntriesInMemory` | `2000` | Admin log entries kept in memory. |
| **Log Joins And Leaves** | `bLogJoinsAndLeaves` | `true` | Log player joins and leaves. |
