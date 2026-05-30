# Quake Web Client

A browser-based port of **Quake** (1996) by id Software, built on [WebQuake](https://github.com/Triang3l/WebQuake) with a modernized single-player experience. Runs entirely in the browser using WebGL and stores saves in `localStorage`.

## Requirements

- A **local HTTP server** (the game will not run from `file://`)
- A browser with **WebGL** and **pointer lock** (Chrome, Firefox, or Edge recommended)
- Quake **game data** in an `id1/` folder (see below)

## Quick start

1. Place your Quake `id1` folder next to `index.html` (pak files, maps, sounds, etc.).
2. Start a web server from this directory:

```bash
# Python 3
python3 -m http.server 8080

# or Node.js
npx serve .
```

3. Open `http://localhost:8080` in your browser.
4. Click the game canvas to capture the mouse, then play.

### Command-line arguments

Append Quake-style launch args after `?` in the URL:

```
http://localhost:8080/?-game mymod
http://localhost:8080/?-hipnotic
http://localhost:8080/?-rogue
```

## Game data

This repo includes `id1/config.cfg` but **not** the full Quake asset pack. You need a legal copy of Quake and must copy its `id1` folder here, including at minimum:

- `pak0.pak` (shareware or registered)
- `pak1.pak` (registered version)

On case-sensitive filesystems (Linux), keep game filenames lowercase.

## Controls

| Input | Action |
|-------|--------|
| **WASD** | Move |
| **Mouse** | Look (always-on mouse look enabled by default) |
| **Click canvas** | Lock pointer / start mouse input |
| **Left mouse** | Fire |
| **Space / Enter** | Jump |
| **Esc** | Menu |
| **F1** | Help |
| **F2** | Save to slot |
| **F3** | Load from slot |
| **F12** | Screenshot |
| **`** (backtick) | Console |

Toggle classic Quake mouse behavior (vertical mouse = walk forward/back):

```
always_mlook 0
```

## Save system

Single-player uses a **12-slot save system** with auto-save:

- **Main menu → Single Player** shows all slots.
- **Empty slot** → start a new game in that slot.
- **Filled slot** → load that save (shows level name and kill count).
- **Auto-save** writes to your active slot when you spawn, every ~15 seconds while playing, and when you leave the page.
- **Del** on a slot deletes that save (WebQuake saves in the browser only).

Saves are stored in **browser `localStorage`** under keys like `Quake.id1/s0.sav`. They are tied to this browser and domain — clearing site data removes them.

Manual save/load still works via **F2** / **F3** or the console:

```
save s0
load s0
```

## Project structure

```
Client/
├── index.html      # Entry point, load screen, WebGL shaders
├── src/            # Game engine (JavaScript)
│   ├── Host.js     # Main loop, save/load, map changes
│   ├── Client.js   # Client state, input cvars
│   ├── Menu.js     # Menus and slot picker
│   ├── Input.js    # Mouse look and movement
│   ├── Renderer.js # Software-style renderer logic
│   ├── WebGLRenderer.js
│   └── ...
└── id1/            # Quake game data (you provide pak files)
    └── config.cfg  # Default key bindings and cvars
```

## Custom features (this fork)

- **Boot load screen** — Quake-themed loading UI with progress during engine init
- **Unified slot menu** — one screen for new game / continue instead of separate menu items
- **Auto-save** — active slot is remembered and updated automatically
- **Always-on mouse look** — `always_mlook` defaults to `1`
- **Scaled HUD / UI improvements** — see recent commits

## Multiplayer

Multiplayer uses WebSockets. You need the separate WebQuake dedicated server (`WebQDS.js`) and a native or WebSocket-capable client. See the [parent WebQuake README](../README.md) for server setup, `connect ws://…`, and rcon details.

## Troubleshooting

**Black screen / “Protocol is file:, not http:”**  
Serve the folder over HTTP/HTTPS; do not open `index.html` directly from disk.

**Mouse does not look around**  
Click the canvas to enable pointer lock. Check `always_mlook 1` in the console.

**Saves not appearing after reload**  
Saves require `localStorage`. Confirm you are on the same URL as before and have not cleared site data. Check the console for `COM.WriteTextFile: failed`.

**No sound**  
Try `stopsound` in the console, or launch with `?-nosound` to debug.

## Credits

- **Quake** — id Software (1996)
- **WebQuake** — Triang3l / Spirit of Quaddicted
- **This fork** — [Hammad-hab/Quake](https://github.com/Hammad-hab/Quake)

Quake is a trademark of id Software. You must own a legal copy of Quake to play with the full asset pack.
