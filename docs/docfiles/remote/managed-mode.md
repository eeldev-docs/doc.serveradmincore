---
sidebar_position: 6
title: Managed Mode
---

# Managed Mode

When the server is started by the [watchdog](companion-tools#watchdog), a restart requested with `restart`, from the schedule or from RCON must not be mistaken for a crash.

The watchdog starts the server with:

- `-ServerAdminCoreManaged`
- `-ServerAdminCoreRestartFlag=<file>`

In managed mode the server exits with code `3` for restarts (unless **Restart Exit Code** is set to another value) and writes the flag file. The watchdog reads the flag, starts the server again and does not count it as a crash. The engine exits with code 0 on a normal exit request, which is why the flag file is needed.

You do not need to set anything up yourself when you use the watchdog. Without the watchdog the normal [Restart Mode](../features/server-control) applies.
