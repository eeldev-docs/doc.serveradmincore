---
sidebar_position: 3
title: FAQ
---

# FAQ and Troubleshooting

## Does Server Admin Core work on listen servers?

Yes. Everything works on listen servers too. The host is an owner by default, and a restart reloads the map. See
[Listen Servers](./docfiles/getting_started/listen-servers).

## `sac` says "no active server world found"

You ran the command on a client or in standalone. Server commands only run on the server. In the editor, use
**Play As Listen Server** or **Play As Client** (which starts a dedicated server). See
[Testing in the Editor](./docfiles/getting_started/testing-in-editor).

## Bans don't survive a restart / player ids look like `Session_256`

There is no online subsystem, so players have no persistent id. Enable the Steam or EOS online subsystem in your project.
Server Admin Core then uses the SteamID64 or ProductUserId as the player id.

## Players can still chat while muted

Mutes are enforced for chat sent through the [Player Component](./docfiles/blueprint/player-component) (**Send Chat Message**) or
**Broadcast Chat Message**. If you have your own chat system, check **Is Player Muted** before delivering a message.

## Voice chat isn't muted

Voice muting uses Unreal's built-in voice system (`GameplayMutePlayer`). Make sure **Mute Voice Chat** is enabled. Third
party voice solutions (Vivox, EOS Voice, …) need to be muted through their own API. Bind **On Player Muted** and
**On Player Unmuted** to do that.

## A moderator can't ban someone

Check:

1. The moderator's group has the permission (`/group Moderator`). Moderators can `tempban` by default, not `ban`.
2. The target has a **lower** priority than the moderator (see [immunity](./docfiles/features/permission-groups#priority-and-immunity)).
3. Nobody can target themselves or an owner.

## I changed Default Groups in Project Settings but nothing happened

Default Groups are only used the first time, when `Groups.json` doesn't exist. Edit groups with commands
(`/groupperm`, `/creategroup`) or Blueprint, or delete `Groups.json` and restart.

## Restart shuts the server down but it doesn't come back

**Restart Mode** is set to **Exit Process**, which exits and expects a supervisor to start the server again (systemd,
Docker, a Windows service, your hosting panel). If you don't have one, use **Relaunch Process** (the default), which
starts a new server process by itself.
See [Restart modes](./docfiles/features/server-control#restart-modes).

## `/map` says the map was not found

- Check the name with `/maps`.
- Make sure the map is in one of the **Map Search Paths** (default `/Game`), or use the full path.
- For packaged servers, add the map to **List of maps to include in a packaged build**.

## Where is my data?

`<Project>/Saved/ServerAdminCore` by default. See [Data Files](./docfiles/reference/data-files).

## Can several servers share bans?

Yes, with a [custom storage backend](./docfiles/cpp/custom-storage) that reads and writes a shared database.

## Is it safe to expose commands to clients?

Yes. Clients only send text. The server builds the caller from the client's connection and checks permissions and
priority for every command and request. A modified client can't get permissions it doesn't have.

## Need more help?

Join the [eelDev Discord](https://discord.gg/3Yu7pEy).
