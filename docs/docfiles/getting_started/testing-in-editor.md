---
sidebar_position: 4
title: Testing in the Editor
---

# Testing in the Editor

You don't need to package a server to try Server Core.

1. In the **Play** dropdown set **Net Mode** to **Play As Listen Server**.
2. Set **Number of Players** to 2 or more.
3. Press Play.

The first window is the host. With **Listen Server Host Is Owner** enabled (default), the host has every permission.
The other windows are normal players you can kick, ban and mute.

:::note
- Kicking or banning the host itself is not possible, it is the server.
- **Restart** and **Shutdown** in *Exit Process* mode do not close the editor. They log a warning instead.
- Without an online subsystem, player ids look like `Session_256` and only last for the current session. Use the Steam or
  EOS online subsystem to test persistent bans.
:::

## Testing as a dedicated server

Select **Play As Client** in the Net Mode dropdown. The editor starts a dedicated server in the background and connects
the clients to it. Type server commands in the editor console with `sc`, they run on the server world.

### A separate server window

To get a real dedicated server window you can type commands into, uncheck **Run Under One Process** in
**Editor Preferences → Level Editor → Play → Multiplayer Options**, or start the server from the command line:

```bat
"C:\Program Files\Epic Games\UE_5.8\Engine\Binaries\Win64\UnrealEditor.exe" "C:\Path\To\YourGame.uproject" /Game/Maps/YourMap -server -log
```

Type commands straight into that window, without `sc`: `players`, `kick Bob`. Connect a client with `open 127.0.0.1`.
