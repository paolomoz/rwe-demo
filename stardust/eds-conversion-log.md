# RWE home page — EDS conversion log

Source prototype: `stardust/prototypes/index-proposed.html` (single-file, inline `<style>`, semantic `<section>` DOM).
Target: vanilla `aem-boilerplate` at repo root. Runtime contract: `stardust/runtime-contract.json` (vanilla-eds, formatted-only buttonization, `.button`/`.primary`/`.secondary`/`.accent` in `p.button-wrapper`, fragments run `decorateMain`, empty-section collapse).

Deploy is handled separately (DA transport) — this pass authored code + content only.

## Foundation (styles/)
- `styles/styles.css`: preserved structural layer VERBATIM (body display gate, `header{height:var(--nav-height)}` + header/footer visibility reservation, `main > .section` scaffold). Rebranded DEMO layer: RWE `:root` palette + token mapping (`--text-color/--link-color` = #1D4477, bg #fff), container 1170px, `--nav-height:130px`. Type ramp (h1 68/74, h2 32/38 navy, h3 24/32, h4 18/27, body 18/27, links 15/27 medium). `img{display:block;max-width:100%;height:auto}`. Global button system (radius 5px, teal primary → mint hover, teal-outline secondary, navy accent). Added `main .section:empty{display:none}`, `main .section.tinted{background:#E8E8E4}`, `main .section.centered{…}`. FONT LICENSING banner at top.
- `styles/fonts.css`: removed roboto @font-face; no brand @font-face (RWE Sans licensed/not rehosted). Stack falls back to Trebuchet MS at first paint — no web-font fetch, no CLS-critical missing face.
- `head.html`: UNTOUCHED (no font link added).
- `scripts/aem.js`: UNTOUCHED. `scripts/scripts.js`: UNTOUCHED.

## Fonts / licensing
- ⚠️ "RWE Sans" is a licensed commercial kit — NOT rehosted. Alert placed in the styles.css banner and this log. Substitute in use: "Trebuchet MS", Tahoma, Verdana. Do not publish to *.aem.live until an RWE Sans web-embedding license is confirmed (then add its @font-face to styles/fonts.css, never head.html).

## Blocks created (blocks/<name>/<name>.{js,css})
- **hero** (replaces boilerplate hero): full-bleed CSS bg image + frosted white panel with the single `<h1>`, sub line, primary CTA; static 4 carousel dots (first active) + side arrows. Authoring: one cell = `<h1>` + sub `<p>` + `<strong><a>` primary CTA.
- **spotlight**: teal heading w/ icon + vertical bullet rail + question (h3) + body + teal readmore + gradient thumbnail. Authoring: one cell = `<h2>`, `<h3>`, `<p>`, plain `<a>` Read more.
- **quote-media**: centered navy quote (h2) spanning row; left copy (paragraphs + primary CTA), right poster image w/ play glyph (fixed brand poster via CSS). Authoring: one cell = `<h2>` + `<p>`… + `<strong><a>` CTA.
- **energy-field**: 3-col tile grid — row 1 wide FEATURE video card (autoplay muted loop, gradient, white readmore), the `<ul>` row = TEAL info card, all others = white content cards (h3 + body + teal readmore). Authoring: one row per tile — feature/card = `<h3>`+`<p>`+plain `<a>`; info = `<h3>`+`<ul>`.
- **media-band** (+ variant `cta-card`): full-bleed autoplay video + teal→navy gradient overlay + right text box (trading, secondary white-outline CTA); `cta-card` = floating teal gradient card + primary CTA (careers jobs). Authoring: one cell = plain `<a>` .webm URL (video src) + `<h3>` + `<p>` + CTA.
- **teaser-cards** (+ variant `icons`): reusable card row. default = image bg + navy h3 + body + teal-outline secondary button (energy & careers rows); `icons` = centered columns, contain icon + h3 + body + teal readmore text link (contact row). Authoring: one row per card, two cells — `[image/icon URL] | [h3 + p + CTA]`.
- **media-share**: centered navy h2 + intro; two-col — left press column (h3 + teal View all + 3 dated press items w/ generated "Continue"), right teal→navy gradient share-ticker placeholder. Authoring: one cell = `<h2>`, `<p>`, `<h3>`, plain `<a>` View all, `<ul>` of `<li><strong>date</strong><a>title</a>`.

## Reuse / David's Model triage
- Prose sections authored as DEFAULT CONTENT with `centered` section-metadata: "Our energy for a sustainable life", "Our expertise…", careers intro. Contact section head ("If you have any questions…") = default-content `<h2>` above the `teaser-cards icons` block, in the same section.
- Same-pattern collapse: ONE `teaser-cards` block (variants `teaser-cards`, `teaser-cards icons`) serves sections 8/9/11; ONE `media-band` block (variant `cta-card`) serves 7 and the careers jobs band.
- Energy `teaser-cards` row tinted via `style: tinted` section-metadata; other bespoke bands paint their own section background in block CSS.

## Chrome
- **content/nav.html** (body fragment): 3 sections → brand ("RWE" plain link, so header.js button-strip branch is safely skipped) / nav list (Menu / Contact / Apps & Tools) / tools (RWE Global / Search / English).
- **blocks/header**: header.js UNCHANGED (keeps stock hamburger/expand/a11y JS). header.css rewritten → transparent, position:absolute over the hero, height 130px; desktop flex order = sections(left) · brand(center) · tools(right); mobile = hamburger + brand, tools hidden, sections as dropdown panel.
- **content/footer.html** (body fragment): sections tagged via section-metadata `style` (foot-recommend / foot-findus / foot-cols / foot-bar). Full RWE footer content + all link hrefs lifted from the prototype. "Contact us" authored as `<strong><a>` primary button.
- **blocks/footer**: footer.js UNCHANGED. footer.css rewritten → full teal→navy vertical gradient, outlined-square social icons, light-cyan (#7fded2) links, white headings, 3-column grid (grid-auto-flow:column), dark bottom bar.

## Content page
- **content/index.html** (body fragment: `<body><header></header><main>…</main><footer></footer></body>`, no doctype/html/head). First section = `metadata` block (Title/Description from the prototype `<title>`/meta). Exactly one `<h1>` (hero). Section titles h2/card titles h3. CTAs paragraph + emphasis wrapped. Videos referenced via prototype rwe.com .webm URLs (visitor-fetched); background images via prototype rwe.com absolute URLs.

## Media
- Videos: rwe.com `.webm` — energy-field feature is a fixed constant in the block; media-band reads the authored .webm link (kept out of buttonization as a URL-display link). All `<video autoplay muted loop playsinline>` with a `prefers-reduced-motion` guard (no autoplay when reduced).
- Background images: prototype rwe.com absolute URLs (external host, not localhost/aem.page — passes the fixed-asset grep). No DA media upload attempted.

## Self-checks passed
- `node --check` on all block JS: OK.
- Fixed-asset URL grep (`localhost`/`aem.page/img`/`aem.live/img`) in blocks/: clean.
- `scripts/aem.js` untouched.
- content/*.html tag-balance: OK (index, nav, footer).
- Over-length JS lines are all string/URL literals (Airbnb max-len ignoreStrings/ignoreUrls); stylelint-standard has no line-length rule.
- Lint not executed mechanically (node_modules not installed; install not permitted) — reviewed against Airbnb/stylelint-standard by hand.

## For the next person
- New content paths won't render via `aem up` until previewed; use a local harness (skills/deploy build-harness) or deploy to preview.
- If RWE Sans is licensed: add its @font-face + metric-matched `rwe-sans-fallback` to fonts.css/styles.css and remove the banner.
- Hero LCP is a CSS background (not an eager `<img>`); if converting to an authored image later, set eager/fetchpriority in hero.js and reserve the media slot.
