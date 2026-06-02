# assets-to-generate/

This folder is the handshake between **you (generating art in ChatGPT)** and **the site**.

## How it works

1. **Read [`00-MASTER-PROMPT.md`](./00-MASTER-PROMPT.md)** — that's the document to give the image AI. (Per-asset prompts are also in [`prompts/`](./prompts) if you'd rather paste one file at a time.)
2. Generate each asset.
3. Save each result with the **exact filename** into [`incoming/`](./incoming).
4. Tell me "assets are in." I run `npm run assets:check`, which lists what's new/updated vs still missing, then I wire them into the scene and remove the matching placeholder.

## ⚑ The standing rule — BLACK BACKGROUNDS

**Every object, character, and decoration must be on a solid pure-black (`#000000`) background**, so the background can be cleanly removed before use. The only exceptions are the **two scene backgrounds**, the **intro splash**, and the **paper texture** — those are full images (marked "FULL SCENE"/"FULL TILE" in the master brief).

Also: avoid pure-black *inside* the artwork itself (use dark brown/charcoal) so the cutout doesn't eat the dark parts.

## Folders

- `00-MASTER-PROMPT.md` — the big brief (style bible + every prompt).
- `prompts/` — one `.txt` per asset, standalone and paste-ready.
- `incoming/` — **drop your generated PNGs here** with the exact filenames.
- `manifest.json` — tracks every asset slot and where it lands in the site.

## Status

Run `npm run assets:check` any time to see which slots are filled vs still on placeholders.
