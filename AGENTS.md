# Agent Instructions & Repository Guidelines

This repository is a static preservation archive of the official FABtotum website (`fabtotum.com`), documentation wiki (`wiki.fabtotum.com`), and community forum (`forum.fabtotum.cc`).

When working in this repository, all AI agents must follow the operational guidelines below.

---

## 1. `README.md` Rules (Inventory Maintenance)

`README.md` serves as the public documentation and **definitive inventory of remaining archive gaps**. It must remain concise, accurate, and free of conversational or devlog clutter.

- **Do NOT add changelogs or narrative devlogs:** Do not append paragraphs describing step-by-step actions, tool runs, or task summaries to `README.md`.
- **Remove recovered/fixed items:** When an asset or link listed in the missing tables is recovered, verified on disk, and reconnected in HTML, **remove that item from the missing list**.
- **Add newly detected gaps:** When an audit discovers missing images, uncaptured endpoints, or broken external dependencies not yet tracked, **add them to the appropriate missing table/list**.
- **Preserve formatting:** Keep existing table columns, chronological ordering, and path conventions intact.

---

## 2. Path & Link Conventions (Offline-First & GitHub Pages)

The archive is designed to be browsed locally (via `file://` or local HTTP servers) and hosted under GitHub Pages subpaths (e.g., `https://opentotum.github.io/fabtotum.com-backup/`).

- **Strictly Relative Paths:**
  - Always use page-relative paths for all links (`href`), media (`src`), stylesheets, and scripts (e.g., `../wp-content/...` or `./assets/...`).
  - **Never** use root-relative paths (e.g., `/wp-content/...`, `/lib/...`, `/forum/...`) because they break under subpaths and local file browsing.
  - **Never** introduce hardcoded live domains (`fabtotum.com`, `wiki.fabtotum.com`, `forum.fabtotum.cc`) for resources intended to be local.
- **Language Symmetry (EN & IT):**
  - Most English pages have Italian equivalents under `it/` (e.g., `it/cleaning-clogged-nozzle/index.html`).
  - When repairing broken links or updating media references on an English page, verify and update the corresponding Italian counterpart.

---

## 3. Media & Asset Recovery Standards

When retrieving or restoring missing files:

- **Verify File Integrity:**
  - Never save or point `<img>` tags to crawler error pages (HTTrack often saved 404 HTML responses with image basenames or `.html` extensions).
  - Always ensure recovered assets contain valid binary data (JPEG, PNG, GIF, PDF, ZIP).
- **Directory Placement Conventions:**
  - **Wiki illustrations & diagrams:** `wp-content/uploads/wiki/`
  - **Hardware downloads, firmware, schematics, G-codes:** `downloads/`
  - **Forum UI & discussion assets:** `forum/images/...`
  - **WordPress uploads (blog, marketing, gallery):** `wp-content/uploads/YYYY/MM/`
- **Responsive `srcset` Hygiene:**
  - In `<img>` tags, only include image variants in `srcset` that actually exist on disk.
  - If a specific thumbnail size is missing, either link to an existing alternative dimension or omit the missing entry from `srcset`.

---

## 4. Search Index Maintenance

- The archive includes an offline, client-side search engine backed by `search-index.json`.
- If new documentation pages are restored or existing titles/routes are fundamentally altered, update `search-index.json` to keep search results consistent.

---

## 5. Verification & Git Hygiene

Before completing any task:
1. Run a link/asset check to ensure all modified `href` and `src` paths resolve to valid local files.
2. Check `git status` and `git diff` to confirm that changes are atomic, correct, and do not introduce unintended whitespace or encoding modifications.
