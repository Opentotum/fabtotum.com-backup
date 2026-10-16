## This is not the official Website of Fabtotum.com
This is a community preservation archive originally backed up by [Bjorn De Ben](https://opentotum.github.io/fabtotum.com-backup/index.html).  
The live archive is hosted at [opentotum.github.io/fabtotum.com-backup](https://opentotum.github.io/fabtotum.com-backup/index.html).

### Archived media

Media references use page-relative paths so they also work under the GitHub
Pages project URL. Responsive image lists (`srcset`) include only files saved
in this backup; uncaptured sizes are omitted. Where an original image is
missing, an available resized copy of the same image is used.

Key manual and troubleshooting wiki figures (nozzle cleaning, bed leveling, probe calibration, and filament handling) have been recovered and locally hosted in `wp-content/uploads/wiki/`. However, some media was never captured in the original mirror: certain third-party images (hosted on Gizmodo and Akamai) and embedded external videos still depend on remote services. Crawler 404 error HTML captures originally saved in the uploads directory have been removed, with references repointed to their proper image filenames (documented in the missing uploads table below).

### Preservation, Link Repair and Optimization Audit (October 2026)

The archive underwent a comprehensive audit, restoration, and repair process:
- **Link Audit & Repair:** Reduced total broken references across the mirror from **5,013 down to 61** (a 98.8% reduction). Broken internal page routes, missing category stubs (e.g. `category/knowledgebase/*`), pagination links, and forum index stubs were repaired and validated.
- **Media & Asset Recovery:**
  - Recovered and locally integrated essential wiki screenshots and diagrams under `wp-content/uploads/wiki/` (bed calibration, nozzle unclogging, extruder disassembly, probe setup).
  - Restored high-priority site assets including the homepage video placeholder (`wp-content/uploads/2017/07/fabtotum-back-video-2.png`), knowledgebase hero banner (`KNOWLEDGEBASE_BANNER_2-1500x345.jpg`), Museo Fabtotum header (`museo-fabtotum-1_greyscale_white2.png`), and community showcase media (`fabtotum-core-pro-shop-ita.png`, `3d-printing-food-fabtotum-multicolor.jpg`, `fabtotumwip-300x248.jpg`).
- **Crawler Artifact & Scraper Cleanup:** Removed HTTrack scraper artifacts and 404 HTML error captures across the archive (including orphan single-file crawler directories, Apache icon 404s, DokuWiki detail 404 stubs, email link scrapers, and error HTML captures in `wp-content/uploads/`). Referring media tags across all archive pages were repointed directly to their expected image filenames (`.jpg`/`.png`).
- **Hardware Downloads & Schematics:** Retrieved original calibration patterns, CNC vector files, and motherboard schematics from the Internet Archive, now hosted locally under [downloads/](downloads/): `material_test_pattern.gcode`, `MakeMore.nc`, `MakeMore.svg`, and `TOTUMduino_schematics.pdf`.
- **Knowledgebase & Discussion Forum Recovery:** Preserved key DokuWiki documentation articles under [wiki/](wiki/) (`index.html`, `open_source.html`, `versions.html` with offline stylesheet) and preserved development logs from `forum.fabtotum.cc` under [forum/](forum/) (`1250-arduino-derivate-vote-to-name.html`, `1305-igg-development-update-9.html`, `development-logs.html`), repointing all in-text links to local relative targets.
- **Domain Link Normalization & Social Audit:** Repointed hardcoded absolute references across 416+ files (including `blog.fabtotum.com` permalinks and Italian homepage links) to relative paths within the archive. Audited live social channels (Twitter/X, Facebook, Instagram, YouTube, and GitHub verified active), fixed obsolete LinkedIn beta URLs, and gracefully disabled links to defunct community accounts (e.g. `@CaSu0815`) with descriptive tooltips.
- **Theme & Interactive Asset Restoration:** Restored missing WordPress core and Enfold theme JavaScript dependencies (`avia.js`, `shortcodes.js`, `avia-compat.js`, jQuery 1.12.4, jQuery Migrate, jQuery UI, MediaElement player, and Magnific Popup lightbox CSS/JS) and child theme dynamic stylesheets, restoring functioning sliders, galleries, menus, and lightboxes.
- **Script & Privacy Cleanup:** Stripped defunct tracking and analytics beacons (Google Remarketing, Facebook Pixel `fbevents.js`, Inspectlet, MonsterInsights) and third-party cookie banners (Iubenda) that caused browser timeouts.
- **Metadata Endpoints:** Removed non-functional WordPress metadata tags from page headers (`xmlrpc.php`, RSD, `?p=XXXX` shortlinks, and unmirrored oEmbed REST API discovery tags).
- **Font Awesome Local Fallback:** Repointed dead external MaxButtons CDN stylesheet calls to the locally preserved Font Awesome assets.
- **Branded 404 Error Page:** Added [404.html](404.html) styled for the archive, helping visitors navigate to preserved sections if they follow uncaptured links.
- **Archive Notice Banner:** Added a lightweight, dismissible notification banner at the bottom of pages linking to active community software and firmware at [OpenTotum](https://github.com/opentotum).
- **Client-Side Static Search:** Built an offline, client-side search engine ([search-index.json](search-index.json)) indexing 418 high-value articles, troubleshooting guides, and product pages with instant query matching, keyword highlights, category filters, language badges (`[EN]`/`[IT]`), and hotkey support (<kbd>Ctrl+K</kbd> / <kbd>/</kbd>).


### Missing files and stale links

Inventory checked against this backup in **October 2026**. The tables below list
remaining media gaps, including backgrounds, slideshow images and full-size
image links. Affected pages are examples; date, tag and category archives can
repeat the same reference. This is not an exhaustive audit of every navigation
link or external website.


Paths below are relative to the repository root unless a different prefix is
specified. Code-formatted missing paths are intentionally not clickable links.

#### Missing upload images

Prefix each filename below with `wp-content/uploads/`.

| Missing image | Example affected page |
| --- | --- |
| `2012/04/IMG_6757.jpg` | [Tolerance article](tolerancetolerancetolerance/index.html) |
| `2012/04/fabtotum_workshop.jpg` | [Workshop article](a-weekend-of-hard-work/index.html) |
| `2012/05/fabtotumZaxis.jpg` | [First test assembly](first-test-assembly/index.html) |
| `2014/01/scanlaserred.jpg` | [Scanning rock, paper, scissors](scanning-rock-paper-scissors/index.html) |
| `2014/03/fabtotum_board1-1024x682.jpg` | [Electronics article](fabtotum-electronics-in-the-wild/index.html) |
| `2014/05/FAB-UI-1024x367.png` | [FAB UI article](fab-ui-the-fabtotum-user-interface/index.html) |
| `2015/01/fabtotum_assembly-1024x480.jpg` | [Hybrid Head preview](sneak-preview-hybrid-head-v2-laser-head-and/index.html) |
| `2015/07/FABtotum_HHV2-1024x633.jpg` | [Upgrade announcement](fabtotum-is-getting-upgraded/index.html) |
| `2015/08/IMG_headv2-1024x683.jpg` | [Hybrid Head preview](sneak-preview-hybrid-head-v2-laser-head-and/index.html) |
| `2015/10/IMG_20151008_121324-1024x758.jpg` | [Phase 2 article](phase-2-rome-wasnt-built-in-a-day/index.html) |
| `2015/10/IMG_20151009_145253-1024x758.jpg` | [Phase 2 article](phase-2-rome-wasnt-built-in-a-day/index.html) |
| `2016/04/wood_2-1024x683.jpg` | [Development update](dev-blog-update-fabui-0-95x-fabtotum-core-more/index.html) |
| `2016/05/core_edition-1210x423.png` | [Zucchetti announcement](fabtotum-becomes-part-of-zucchetti-group/index.html) |
| `2016/10/community_slide-1500x503.png` | [Core shipping update](fabtotum-core-now-upgraded-shipping/index.html) |
| `2016/10/fabtotum-open-source-head-kit-1500x944.jpg` | [Development kit](3d-printers/heads/3d-development-kit/index.html) |
| `2016/12/Untitled-1-1.jpg` | [Christmas gift article](idea-regalo-natale-stampante-3d/index.html) |
| `2017/01/accessori-stampa-3D.gif` | [Italian parts/accessories](it/stampanti-3d/parti-accessori/index.html) |
| `2017/01/laser_background-1030x537.jpg` | [Paper/cardboard cutter](3d-printers/heads/3d-laser-printer/paper-cardboard-cutter/index.html) |
| `2017/01/stampare-in-3D-astronauta-1030x804.jpg` | [Italian Printing Head Lite](it/stampanti-3d/testine/testina-stampante-3d-lite/index.html) |
| `2017/03/eifell_small-1030x848.jpg` | [Direct-drive extruder](3d-printers/heads/3d-printer-direct-drive-extruder/index.html) |
| `2017/06/35.jpg` | [Personal Fabricator](3d-printers/fabtotum-personal-fabricator/index.html) |
| `2017/08/FABtotum_TRIANGOLO-01-180x180.png` | [Complete manual](complete-manual/index.html) |
| `2017/09/Schermata-2017-09-28-alle-12.09.49.png` | [Multicolor printing article](fabtotums-community-highlights-multicolor-3d-printing-2/index.html) |
| `2017/10/Schermata-2017-10-10-alle-21.31.30.png` | [Industry jigs/fixtures](3d-printing-industry-jigs-fixtures/index.html) |
| `2017/10/teaser_pro_head.jpg` | [Laser Head Pro](3d-printers/heads/laser-engraving-head-pro/index.html) |
| `2017/11/3.-ProductDesigners_Mice-1500x1000.jpg` | [Palette+](3d-printers/heads/palette-plus-multicolor-multimaterial/index.html) |
| `2017/11/DLJkDgFWkAA71_F.jpg` | [Solder-paste dispensing head](community-highlight-solder-paste-dispensing-head-by-si-engineering/index.html) |
| `2017/11/Schermata-2017-11-02-alle-16.02.19.png` | [Solder-paste dispensing head](community-highlight-solder-paste-dispensing-head-by-si-engineering/index.html) |
| `2018/03/prism_top-1030x722.jpg` | [PRISM](3d-printers/heads/prism-3d-printing-sla-platform/index.html) |

#### Other uncaptured third-party images

These references expect sibling host directories outside the repository.
Paths shown are the HTTrack mirror paths, not verified live URLs; original
query strings are omitted.

| Host and missing mirror path | Example affected page |
| --- | --- |
| `fabtotum.cc/wp-content/uploads/2012/04/IMG_6751-1024x682.html` | [Tolerance article](tolerancetolerancetolerance/index.html) |
| `fabtotum.cc/wp-content/uploads/2012/04/IMG_6757-1024x682.html` | [Tolerance article](tolerancetolerancetolerance/index.html) |
| `fabtotum.cc/wp-content/uploads/2012/04/fabtotum_workshop-682x1024.html` | [Workshop article](a-weekend-of-hard-work/index.html) |
| `fabtotum.cc/wp-content/uploads/2012/05/fabtotumZaxis-300x192.html` | [First test assembly](first-test-assembly/index.html) |
| `cache.gizmodo.com/assets/images/4/2011/07/concrete712.jpg` | [Enter the FABtotum](enter-the-fabtotum/index.html) |
| `fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-xpf1/v/t1.0-9/1924589_806644939391729_5017276857008358472_n531c.html` | [A little recap](a-little-recap/index.html) |

#### Stale navigation and external dependencies

- **Recovered & Locally Hosted Services:** Official hardware downloads (`material_test_pattern.gcode`, `MakeMore.nc`, `MakeMore.svg`, `TOTUMduino_schematics.pdf`), key DokuWiki knowledgebase pages (`wiki/index.html`, `wiki/open_source.html`, `wiki/versions.html`), and community development logs (`forum/`) have been retrieved from archive.org and are hosted locally, with all site links updated to relative paths.
- **External Dependencies:** Shop and product checkout links to `store.fabtotum.com` remain directed externally as the store service was not mirrored.
- **Uncaptured forum UI assets and avatars:** vBulletin interface buttons, smilies, status icons (`forum/images/buttons/`, `forum/images/icons/`, `forum/images/statusicon/`, `forum/images/misc/`), and user avatar endpoints (`forum/image.php`) were not captured in the forum mirror.
- **Uncaptured DokuWiki template badges:** Template license and footer buttons (`/lib/images/license/`, `/lib/tpl/dokuwiki/images/button-*.png`) are referenced by the DokuWiki footers but were not mirrored.
- **Video embeds:** YouTube and RAI TV content depends on external providers;
  no local video files were captured. The RAI iframe uses HTTP and may be
  blocked as mixed content when viewing this backup over HTTPS.

To recover an item, locate the actual original media (not an HTML error
response), preserve attribution/licensing, save it inside the archive and
update the affected pages with page-relative links. An uncaptured external
service should not be assumed to work merely because its link remains here.

