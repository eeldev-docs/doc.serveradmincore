---
sidebar_position: 1
title: Installing the plugin
---

# Installing the plugin

## Install from Fab

1. Open the **Epic Games Launcher** and go to **Unreal Engine → Library → Fab Library**.
2. Search for **Server Core**.
3. Click **Install to Engine** and select **5.8**.

## Enable the plugin

Open your project, go to **Edit → Plugins**, search for **Server Core** and make sure it is enabled.
Restart the editor when asked.

:::note
Server Core is a code plugin. A Blueprint only project works fine, but you need a C++ project (or a source build of the
engine) to **package a dedicated server**, since Unreal Engine does not ship prebuilt server targets. Listen servers
work in any project.
:::

## Installing manually (project plugin)

You can also place the plugin in your project instead of the engine:

```text
YourProject/
└── Plugins/
    └── ServerCore/
        ├── ServerCore.uplugin
        ├── Config/
        ├── Resources/
        └── Source/
```

Right click your `.uproject` → **Generate Visual Studio project files**, then build your project.

## Verify the installation

Start your project in **Play as Listen Server** and type in the console:

```text
sc status
```

You should see the current map and the number of players online. If you see
`ServerCore: no active server world found.`, you are running as a client or standalone. See
[Testing in the Editor](testing-in-editor).
