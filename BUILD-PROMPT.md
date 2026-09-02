# Jack Olivia — Build Prompt (Home · About · Projects · Project: Lewes)

## Step 0 — before you write anything

Read `website-copy-only.md` in this folder first. It is the only source of truth
for words on the page. Do not invent copy, taglines, project descriptions,
service lists or credentials. If a section below needs copy that isn't in that
file, leave a small caps placeholder reading `COPY TO FOLLOW · [WHAT'S MISSING]`
in meta colour rather than writing your own — flag it back to me in your
summary instead of guessing.

The same discipline applies to images: only use image files that actually
exist in this folder. If a slot below calls for a photo that isn't present,
render it as a labelled cream placeholder circle/rectangle reading
`IMAGE TO FOLLOW · [WHAT]` — never substitute stock imagery.

## Scope — build exactly these four pages, nothing else

1. **Home** (`index.html`)
2. **About** (`about.html`)
3. **Projects** — the index/wheel (`projects.html`)
4. **Project: Additional Floor, Lewes** — one project detail page (`project-lewes.html`)

Do not build What We Do, Contact, or any other project detail pages yet. Nav
links to What We Do stay present but inert (`href="#"`). Contact links to
`mailto:peter@jackolivia.com`. Desktop only — do not attempt a mobile layout
in this pass.

## Reference and tone

Follow `architectureforlondon.com/build`'s tone: restrained, editorial,
real content given room to breathe, no marketing language. Never use the
words "solutions", "cutting-edge", "industry-leading" or "world-class".
Never use bold text as a hierarchy tool — hierarchy is scale and space only.
No rounded rectangles, drop shadows, gradients, cards or icons anywhere.
No centred body paragraphs. Whitespace generous but not oceanic — AFL packs
real content in with density, that's what makes it read as a serious
practice.

## Design tokens — match these exactly

```css
--ground: #f8f7f2;   /* page background, warm off-white, never digital white */
--ink: #1a1a18;       /* body text, headings */
--meta: #8c8880;      /* secondary text, labels, captions */
--rule: #ddd8cb;      /* hairlines only */
--slate: #4a5f7a;     /* Projects hover-overlay accent — nowhere else */
--warm-white: #fdfaf4;/* text sitting on top of the slate overlay */
```

Fonts (Google, self-hosted or linked):

```
https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400&family=Inter:wght@300;400;500&display=swap
```

- **Headings** — Fraunces, weight 300, negative tracking (-0.02em to -0.04em)
  at display sizes. Never weight 400+ except plate titles and feature-image
  captions (weight 400, per the sizes below).
- **Body** — Inter weight 300, 16px, line-height 1.6, measure ~64ch.
- **Caps labels** (section labels, column labels, meta lines) — Inter weight
  500, letter-spacing 0.14em, uppercase.
- Never bold.

## Global chrome (identical on all four pages)

**Header** — slim, not a hero banner:
- `.brand-wrap`: centred logo, 22px padding top and bottom.
- Logo (`logo-wordmark.png`): 26px tall, width auto. Wrapped in a link to
  `index.html` on every page except Home.
- One hairline (`--rule`) under the whole header.
- Nav directly under the logo, 11px Inter caps, 0.16em tracking, `--meta`
  colour, centred, gap `clamp(1.5rem, 3vw, 4rem)`: `About` · `Projects` ·
  `What We Do` · `Contact`. The current page's nav link (and its footer
  twin) is `--ink` instead of `--meta` (`aria-current="page"`, class `active`).

**Footer** — every page:
- Max width 1380px, 64px padding top and bottom, 52px sides, one hairline
  above.
- Grid: `JO.` mark left (Fraunces 28px, -0.05em tracking) · footer nav
  centre (same four links, 11px caps) · contact block right (email · phone
  · address, 12px, `--meta`, right-aligned).

**Main content column**: max-width 1380px, centred, 52px side padding.

## Page 1 — Home (`index.html`)

Two-column hero, not sticky:
- **Left (40%)**: section label `Jack Olivia` + hairline, then intro copy
  from the copy doc's Home section, a practice-facts block (hairline above,
  `--meta` 13px, 1.9 line-height, one fact per line), then two inline links
  side by side (28px gap): `View projects →` (to `projects.html`) and
  `Get in touch →` (mailto).
- **Right (60%)**: one large rectangular photo — use the Lewes photo
  (`project-01-lewes.JPG`) as the feature, since it's the one project with
  a live detail page. Wrap the whole image in a link to
  `project-lewes.html`. Caption below, hairline above the caption: project
  title in Fraunces 22px weight 400 with a trailing arrow, meta line
  (`--meta`) with location · year underneath, right-aligned in the same row
  via flex `justify-content: space-between`.

Below the hero, a two-up strip (52px gap, 64px top padding) of secondary
project teasers, 4:3 rectangular images, Fraunces 18px titles + meta lines
underneath. These are inert previews (no href) since their detail pages
don't exist yet — use whatever real photos you have for them, cream
placeholders for the rest.

Below that, a founder band (hairline above, 64px padding, 64px top margin):
180px circular portrait (`peter-portrait.png`) left, column label `Peter` +
hairline + a short bio paragraph from the copy doc + `More about Peter →`
link to `about.html`, right.

## Page 2 — About (`about.html`)

Three equal columns, 52px gap, 70px top / 64px bottom padding:

1. **About** — column label + hairline + body paragraphs from the copy
   doc + `Read Peter's CV →` (href="#" — no CV file yet).
2. **Approach** — column label + hairline + body paragraphs from the copy
   doc. No image.
3. **Peter** — column label + hairline + 280px circular portrait
   (`peter-portrait.png`, centred, 30px top / 40px bottom margin) + bio
   paragraphs from the copy doc + a contact block (name, title, email,
   phone — 13px, `--meta`, 1.8 line-height).

Body copy in all three columns: 16px Inter, no max-width cap (columns are
already narrow).

## Page 3 — Projects (`projects.html`)

Two-column layout, 40% / 60%, 52px gap, 56px top padding:

- **Left column** (sticky, `top: 20px`): section label `Projects` +
  hairline, `Selected projects` heading (Fraunces, clamp(2.1rem, 2vw,
  2.4rem), weight 300, -0.04em tracking), intro paragraphs from the copy
  doc, `Get in touch →` mailto link.
- **Right column**: the project wheel. Circular plates, `min(100%, 480px)`
  wide and tall, 120px vertical margin between them, alternating horizontal
  offset ±40px (odd plates left, even right), `isolation: isolate` on each
  plate so its blend-mode overlay is contained.

**Each plate**, in order (only build the images you actually have — the
rest render as placeholders):

| # | Title | Meta | Image if available | Links to |
|---|---|---|---|---|
| 01 | Additional Floor | Lewes · 2025 | `project-01-lewes.JPG` | `project-lewes.html` |
| 02 | New Build | Warninglid · 2025 | `project-03-warninglid.jpg` if present | — (no page yet) |
| 03 | Structural Detail | Warninglid · 2025 | `drawing-warninglid.png` if present | — |
| 04 | Loft Conversion | Haywards Heath · 2025 | placeholder | — |
| 05 | New Build | Lyme Regis · 2025 | placeholder | — |
| 06 | Writers Cabin | Dorset · 2025 | placeholder | — |

Only plate 01 (Lewes) is a real link — wrap it in an anchor to
`project-lewes.html`. The others keep `cursor: pointer` for visual
consistency but have no href.

**The hover mechanic — follow this exactly, it's the whole point of the
component:**

```css
.plate-image img {
  object-fit: cover;
  filter: contrast(1.05);
}

.plate-overlay {
  background: var(--slate);
  mix-blend-mode: color;   /* NOT flat rgba/opacity — this is what makes
                               it look right. A translucent alpha wash
                               reads as a muddy grey wash. Blend-mode
                               "color" tints the photo's actual luminance
                               blue, so light/shadow/contrast still read
                               through it as a proper duotone. */
  opacity: 0.88;
  transition: opacity 500ms cubic-bezier(0.4, 0, 0.2, 1);
}

.project-plate.is-hover .plate-overlay,
.project-plate.is-hover .plate-content {
  opacity: 0;
}
```

- Title (Fraunces 26px weight 400, `--warm-white`) and meta (11px caps,
  `--warm-white` at 80% opacity) sit centred on the plate, `pointer-events:
  none`, and fade to 0 opacity in lockstep with the overlay.
- JS: on `mouseenter` add class `is-hover`, on `mouseleave` remove it.
  That's the entire interaction — no other state, no forced/demo states,
  no extra motion (no image zoom, no scale beyond a subtle `translateY(-2px)
  scale(1.003)` lift on plate `:hover`, which is already accounted for).
- Beneath each plate: a centred caption line, 11px caps, `--meta`,
  0.14em tracking: `01 · ADDITIONAL FLOOR · LEWES · 2025`, etc. — always
  visible regardless of hover state.

Below the wheel: hairline, `ALL PROJECTS →` centred (12px caps, ink), then
a half-width paragraph in `--meta` 13px from the copy doc.

## Page 4 — Project: Additional Floor, Lewes (`project-lewes.html`)

New page — there's no existing precedent for this in the current build, so
design it fresh but stay inside the same system:

- One large rectangular hero photo (`project-01-lewes.JPG`), full width of
  the main column (same treatment as the Home feature image — no circle;
  the circular treatment is reserved for the Projects index wheel only).
- Below the hero, a two-column layout (roughly 30% / 70%, 52px gap,
  56px top padding):
  - **Left**: project label "Additional Floor, Lewes" (same style as a
    section label) + hairline, then a stacked meta list — each row a
    small caps 11px `--meta` field name (`LOCATION`, `TYPE`, `YEAR`,
    `SCOPE`) followed by its value in 15px Inter `--ink` underneath, ~18px
    gap between rows.
  - **Right**: the project's body copy from `website-copy-only.md`
    (Fraunces subheading if the copy doc has one, then Inter 16px body
    paragraphs, 64ch measure).
- Below that: hairline, then `← All projects` link back to
  `projects.html`.
- Same header and footer as every other page, with `Projects` as the
  active nav item.

## Assets expected in this folder

Required: `logo-wordmark.png`, `project-01-lewes.JPG`, `peter-portrait.png`.
Optional (render placeholders if absent): `project-03-warninglid.jpg`,
`drawing-warninglid.png`.

## When you're done

Give me a short summary of: any copy the doc was missing (and where you
placeholdered it), and any image slots you had to placeholder because the
file wasn't in the folder.
