---
sidebar_position: 3
title: Settings Reference
---

# Settings Reference

**Project Settings → Plugins → Server Admin Core**, stored in `Config/DefaultGame.ini` under
`[/Script/ServerAdminCore.ServerAdminCoreSettings]`. The *Config key* column is the name to use in the ini file.

## General

| Setting | Config key | Default | Description |
|---|---|---|---|
| **Enabled** | `bEnabled` | `true` | Turns ServerAdminCore on or off. |
| **Active On Listen Server** | `bActiveOnListenServer` | `true` | Run ServerAdminCore on listen servers, where the hosting player's game is the server. Dedicated servers are always active. |
| **Active In Standalone** | `bActiveInStandalone` | `false` | Also run ServerAdminCore in standalone games. |
| **Listen Server Host Is Owner** | `bListenServerHostIsOwner` | `true` | On a listen server the hosting player is treated as an owner. |
| **Data Directory** | `DataDirectory` | – | Folder for data files. Empty = &lt;Project&gt;/Saved/ServerAdminCore. Relative paths are relative to the project folder. Can be overridden with -ServerAdminCoreDataDir=&lt;path&gt;. |
| **Storage Class** | `StorageClass` | `ServerAdminCoreJsonStorage` | Storage backend. Subclass UServerAdminCoreStorage to use a database or web API instead of JSON files. |
| **Auto Add Player Component** | `bAutoAddPlayerComponent` | `true` | Component added to every player controller on the server. Used for chat, commands, announcements and admin panels. |
| **Player Component Class** | `PlayerComponentClass` | `ServerAdminCorePlayerComponent` | Class of the auto-added player component. Use your own subclass to extend it. |
| **Enable Console Input** | `bEnableConsoleInput` | `true` | Read commands typed into the dedicated server console (the Windows -log window, or the terminal on Linux). Lines run as ServerAdminCore commands or Unreal console commands. Disable with -NoServerAdminCoreConsole. |

## Permissions

| Setting | Config key | Default | Description |
|---|---|---|---|
| **Owner Ids** | `OwnerIds` | – | Player ids that always have every permission. Can be extended with -ServerAdminCoreOwners=Id1,Id2 |
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
| **Broadcast Chat To Players** | `bBroadcastChatToPlayers` | `true` | Send chat from UServerAdminCorePlayerComponent::SendChatMessage to every player. Disable if you only want OnChatMessage and handle delivery yourself. |
| **Max Chat Message Length** | `MaxChatMessageLength` | `256` | Longer chat messages are cut. |
| **Log Chat To Output** | `bLogChatToOutput` | `true` | Write chat to the output log. |
| **Log All Commands** | `bLogAllCommands` | `false` | Writes every executed command to the admin log, in addition to the action itself. |

## Announcements

| Setting | Config key | Default | Description |
|---|---|---|---|
| **Scheduled Announcements** | `ScheduledAnnouncements` | – | Messages repeated on an interval. See Server Announcements. |
| **Welcome Message** | `WelcomeMessage` | – | Shown to a player when they join. Empty = disabled. Supports `{Player}`. |

## Auto Kick

See [AFK and High Ping Kick](../features/auto-kick).

| Setting | Config key | Default | Description |
|---|---|---|---|
| **Afk Kick Enabled** | `bAfkKickEnabled` | `false` | Kick players that have been idle for Afk Kick Seconds. Players with serveradmincore.afk.bypass are never kicked. |
| **Afk Kick Seconds** | `AfkKickSeconds` | `600` | Seconds without activity before a player is kicked. Moving or turning the pawn, chat and commands count as activity. Minimum 30. |
| **Afk Warning Seconds** | `AfkWarningSeconds` | `60` | Seconds before the kick at which the player is warned. 0 = no warning. |
| **Afk Min Players** | `AfkMinPlayers` | `0` | Only kick idle players when at least this many players are online. 0 = always. |
| **High Ping Kick Enabled** | `bHighPingKickEnabled` | `false` | Kick players whose ping stays above Max Ping Ms for High Ping Grace Seconds. Players with serveradmincore.ping.bypass are never kicked. |
| **Max Ping Ms** | `MaxPingMs` | `250` | Ping limit in milliseconds. |
| **High Ping Grace Seconds** | `HighPingGraceSeconds` | `30` | Seconds in a row the ping has to stay above the limit before the player is kicked. |
| **Ping Check Delay After Join** | `PingCheckDelayAfterJoin` | `30` | Ping is not checked during the first seconds after joining or a map change. |
| **Afk Warning Message** | `AfkWarningMessage` | `"You will be kicked for being AFK in {Time}."` | Supports `{Time}`. Empty = no message, On Auto Kick Warning still fires. |
| **Afk Kick Message** | `AfkKickMessage` | `"You were kicked for being AFK for {Time}."` | Supports `{Time}`. |
| **High Ping Warning Message** | `HighPingWarningMessage` | `"Your ping ({Ping} ms) is above the server limit of {MaxPing} ms. You will be kicked in {Time} if it stays this high."` | Supports `{Ping}`, `{MaxPing}`, `{Time}`. Empty = no message, On Auto Kick Warning still fires. |
| **High Ping Kick Message** | `HighPingKickMessage` | `"You were kicked because your ping ({Ping} ms) was above the server limit of {MaxPing} ms."` | Supports `{Ping}`, `{MaxPing}`. |

## Server Control

| Setting | Config key | Default | Description |
|---|---|---|---|
| **Restart Mode** | `RestartMode` | `EServerAdminCoreRestartMode::RelaunchProcess` | Relaunch Process, Exit Process or Reload Map. See Change Map, Restart and Shutdown. |
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
