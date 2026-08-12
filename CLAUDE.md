# Funding Kit — Website Editing Guide

This repo is the **yourfundingkit.com** website. Read this first when asked to change the site.

## Editing the site from ANY computer / a NEW chat (quick start)
Do this once per computer, then it "just works" every time:
1. **Clone the repo** (if it's not already on this Mac): GitHub Desktop → **File → Clone repository → Funding-Kit** → clone to `~/Documents/GitHub/Funding-Kit`. (Sign into GitHub Desktop first if prompted.)
2. **Start a Claude chat and connect this folder** — point Claude at `~/Documents/GitHub/Funding-Kit`. Claude auto-reads this `CLAUDE.md` and knows the whole setup.
3. **Ask for the edit** ("change the headline to X", "update the calculator", etc.). Claude edits the `.html` files directly on disk.
4. **Publish:** open **GitHub Desktop** → you'll see the changed files → type a summary → **Commit to main** → **Push origin**. Vercel auto-deploys in ~1–2 min.
> Claude can edit the files but **cannot push** (no GitHub credentials in its sandbox) — you always do the Commit + Push step in GitHub Desktop. If two computers are involved, click **Fetch/Pull origin** in GitHub Desktop before editing so you have the latest.

## Stack & hosting
- **Static HTML site** — no build step, no framework. Just edit the `.html` files directly.
- **Hosted on Vercel.** Vercel auto-deploys on every push to `main` (usually live in 1–2 min).
- **Source control:** GitHub repo, managed by the owner (Kengo) via **GitHub Desktop** on a Mac.
- Owner's workflow after edits: open GitHub Desktop → commit → **Push origin** → Vercel redeploys.

## Files that matter
- `index.html` — home page.
- `calculator.html` — funding calculator page. Served at `/calculator` (no `.html`).
- `vercel.json` — `{"cleanUrls": true}`. This is what lets `/calculator` work without the `.html`
  extension. **Do not delete it** or extension-free links will 404.
- `og.png` — social/link-preview image for the home page (1200×630).
- `og-calculator.png` — link-preview image for the calculator page (1200×630).
- `logo.png`, `logo-mark.png`, `logo-text.png` — brand assets. `logo-mark-white.png` is the
  FK mark with a white "F" for use on dark backgrounds (used in the OG images).

## Brand
- Navy `#152238` (deep) / `#1e2f4d` (lighter), Gold `#c19a44`, ink `#141b26`.
- Fonts: **Sora** (headings), **Inter** (body), loaded from Google Fonts in each page `<head>`.
- Contact email shown in the footer: **kengo@yourfundingkit.com** (both pages).

## Common edits — how to
- **Change text / links / email:** edit the relevant `.html` file, then have the owner commit &
  push in GitHub Desktop. Live after Vercel redeploys.
- **Clean URLs (no `.html`):** link to `/calculator` (not `calculator.html`). Works because of
  `vercel.json` `cleanUrls`. If you add new pages, link to them the same extension-free way.
- **Link previews (Open Graph):** each page's `<head>` has `og:*` and `twitter:*` tags pointing at
  the preview PNG. To change the preview, regenerate the PNG (see below) at the same filename, or
  add a new one and update the `og:image` + `twitter:image` URLs. Previews are cached hard by
  LinkedIn/Facebook/iMessage — after going live, re-scrape via LinkedIn Post Inspector or
  Facebook Sharing Debugger to refresh.

## Regenerating the OG preview images
1200×630, navy gradient + gold, white-F FK mark, "FUNDING KIT" wordmark, headline with gold
emphasis, gold accent bar, subline, `yourfundingkit.com` in gold. Build with Python + Pillow
using the DejaVu Sans fonts on the system. The mark's dark "F" is recolored to white for dark
backgrounds (cool/dark pixels → white, gold pixels kept). Keep the two images visually matching.

## Gotcha: "A lock file already exists" in GitHub Desktop
If committing fails with a lock-file error, stale git lock files need deleting. In Terminal:
```
find ~/Documents/GitHub/Funding-Kit/.git -name "*.lock" -delete
```
Then commit & push again. (If it persists, quit GitHub Desktop with Cmd+Q and reopen.)
This happens when a git process was interrupted; deleting the `.lock` files is safe.

## Notes
- `.DS_Store` is a macOS junk file that keeps appearing as a change. Safe to ignore or add to a
  `.gitignore`.
- The sandbox used by the assistant **cannot push to GitHub** (no credentials) and often cannot
  delete git lock files. Edits are written to disk here; the **owner commits & pushes** via
  GitHub Desktop.
