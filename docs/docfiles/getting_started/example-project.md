---
sidebar_position: 7
title: Example Project
---

# Example Project

A ready-to-run example with a packaged dedicated server and a client, so you can try Server Admin Core without opening
the editor.

**Download:** [ServerAdminCoreExample.zip](https://eeldev.com/tmp/ServerAdminCoreExample.zip)

## Getting started

1. **Start the server.** Run `StartServer.bat`. A server log window opens.
2. **Start a client.** Run `StartClient.bat`. The client connects to the local server (`127.0.0.1`).
3. **Find your player name.** Type `players` in the server log window and press Enter.
4. **Make yourself owner.** Type `setgroup <playername> Owner` in the server window.

:::note
The example uses the Null online subsystem, so your player name and id change every time you connect. Repeat steps 3
and 4 after each reconnect. With Steam or EOS the id stays the same, see [How it works](how-it-works#player-ids).
:::

## Controls

| Key | Action |
|---|---|
| **F1** | Open the admin menu |
| **Enter** | Write in the chat. Commands start with `/`, for example `/help` |
