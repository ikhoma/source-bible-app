# Source Bible Design System

This document is derived from [`public/design-system.html`](/Users/ivan.khoma/Projects/source-bible-app/public/design-system.html) and the generated token source [`design-system.tokens.json`](/Users/ivan.khoma/Projects/source-bible-app/design-system.tokens.json).

## Foundations

### Color tokens

#### Semantic

| Token | Value | Usage |
| --- | --- | --- |
| `text.primary` | `#272223` | Primary body and heading text |
| `text.muted` | `#6C757D` | Secondary labels, metadata, captions |
| `text.inverse` | `#FFFFFF` | Text on filled interactive surfaces |
| `surface.page` | `#F0EFED` | Application page background |
| `surface.base` | `#FFFFFF` | Primary cards, inputs, tab bars |
| `surface.subtle` | `#F8F9FA` | Soft section backgrounds |
| `surface.raised` | `#ECEAE6` | Expanded headers, raised neutral surfaces |
| `surface.muted` | `#DDDDDD` | Muted controls and neutral fills |
| `border.subtle` | `#DDDDDD` | Default structural borders |
| `border.strong` | `#949494` | Stronger separators and active borders |
| `border.focus` | `#93C5FD` | Focus outline and selected verse border |
| `interactive.primary` | `#2563EB` | Primary actions, active icons, badges |
| `interactive.hover` | `#3B82F6` | Hover and selected word highlight |
| `interactive.selected` | `#EFF6FF` | Selected verse/tab supporting surface |
| `status.highlight` | `#84CC16` | Highlight marker |
| `status.search` | `#FDE047` | Search emphasis |
| `status.recording` | `#EF4444` | Recording or destructive emphasis |

#### Primitive palettes

`stone`: `50 #F8F9FA`, `100 #ECEAE6`, `200 #DDDDDD`, `300 #C7C7C7`, `400 #949494`, `500 #6C757D`, `600 #495057`, `700 #212529`, `800 #272223`, `900 #000000`

`blue`: `50 #EFF6FF`, `100 #DBEAFE`, `500 #3B82F6`, `600 #2563EB`

#### Dark theme overrides

| Token | Value |
| --- | --- |
| `dark.text.primary` | `#E7E5E4` |
| `dark.text.muted` | `#A8A29E` |
| `dark.surface.base` | `#1C1917` |
| `dark.surface.subtle` | `#221F1E` |
| `dark.surface.muted` | `#312E2B` |
| `dark.surface.raised` | `#403B37` |
| `dark.interactive.primary` | `#3B82F6` |
| `dark.interactive.hover` | `#60A5FA` |
| `dark.interactive.selected` | `#1E3A8A` |

### Typography

#### Font families

| Token | Value |
| --- | --- |
| `font.sans` | `Inter` |
| `font.serif` | `Cormorant Garamond` |
| `font.mono` | `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace` |

#### Modern text styles

| Style | Font | Size | Line height | Weight |
| --- | --- | --- | --- | --- |
| `display-modern` | Inter | 36px | 40px | 700 |
| `h1-modern` | Inter | 30px | 36px | 700 |
| `h2-modern` | Inter | 24px | 32px | 700 |
| `h3-modern` | Inter | 20px | 28px | 700 |
| `verse-modern` | Inter | 18px | 1.35 | 400 |
| `body-modern` | Inter | 16px | 24px | 400 |
| `ui-modern` | Inter | 14px | 20px | 500 |
| `caption-modern` | Inter | 12px | 16px | 600 |
| `eyebrow` | Inter | 11px | 16px | 700 |
| `meta-mono` | Monospace | 10px | 16px | 400 |

#### Antique text styles

| Style | Font | Size | Line height | Weight |
| --- | --- | --- | --- | --- |
| `display-antique` | Cormorant Garamond | 40px | 48px | 700 |
| `h1-antique` | Cormorant Garamond | 32px | 40px | 700 |
| `h2-antique` | Cormorant Garamond | 26px | 34px | 700 |
| `verse-antique` | Cormorant Garamond | 20px | 1.35 | 400 |
| `body-antique` | Cormorant Garamond | 18px | 1.45 | 400 |
| `hebrew` | Cormorant Garamond | 28px | default | 400, RTL |

### Spacing scale

| Token | Value |
| --- | --- |
| `0` | `0px` |
| `px` | `1px` |
| `0.5` | `2px` |
| `1` | `4px` |
| `1.5` | `6px` |
| `2` | `8px` |
| `3` | `12px` |
| `4` | `16px` |
| `5` | `20px` |
| `6` | `24px` |
| `7` | `28px` |
| `8` | `32px` |
| `10` | `40px` |
| `12` | `48px` |
| `16` | `64px` |
| `24` | `96px` |
| `30` | `120px` |
| `35` | `140px` |

### Radius and effects

| Token | Value |
| --- | --- |
| `radius.sm` | `3px` |
| `radius.md` | `4px` |
| `radius.lg` | `8px` |
| `radius.xl` | `10px` |
| `radius.2xl` | `12px` |
| `radius.pill` | `999px` |
| `shadow.focus-ring` | `0 0 0 3px rgba(59,130,246,0.12)` |
| `shadow.raised` | `0 1px 3px rgba(0,0,0,0.1)` |

## Components

### Verse Row

Parts: `container`, `verseNumber`, `verseText`, `selectedToken`

States:
- `default`: neutral surface, left padding for verse index, transparent left border
- `activeVerse`: `interactive.selected` background with `border.focus` left border
- `activeWord`: inline selected token uses `interactive.hover` fill and inverse text

### Section Tabs

Parts: `tabBar`, `pill`

States:
- `default`: muted background pill with muted text
- `active`: stronger neutral pill with primary text and slightly stronger border

### Strong Number Token

Parts: `card`, `header`, `hebrew`, `transliteration`, `morphology`, `badge`, `divider`, `gloss`, `definition`

States:
- `default`: transparent card with subtle border and blue badge
- `badgeMuted`: alternate muted badge treatment

### Commentary Card

Parts: `card`, `listItem`, `avatar`, `meta`, `author`, `subtitle`, `chevron`, `expandedHeader`, `backButton`, `body`

States:
- `listView`: stacked list items with avatar circles and row dividers
- `detailView`: raised header with commentary metadata and body preview

### Search Mode Toggle

Parts: `container`, `button`, `icon`, `label`

States:
- `default`: muted segmented background with inactive labels
- `active`: white active segment with raised shadow

### Search Input

Parts: `wrapper`, `input`, `placeholder`, `actions`, `iconButton`

States:
- `keywordEmpty`: standard empty text input
- `focused`: blue focus border with focus ring
- `aiEmpty`: AI mode layout with ghost mic button and disabled primary submit
- `aiActive`: focused AI layout with enabled primary submit

### Bottom Navigation

Parts: `bar`, `item`, `icon`, `label`

States:
- `default`: muted icons and labels
- `active`: primary blue icon and label

### Sheet Action Bar

Parts: `bar`, `item`, `iconWrap`, `icon`, `label`

States:
- `default`: neutral action icons and labels
- `highlightedActive`: blue active icon on blue-100 chip with active label

## Deliverables

Generated files:
- [`tailwind.design-system.config.cjs`](/Users/ivan.khoma/Projects/source-bible-app/tailwind.design-system.config.cjs)
- [`figma.styles.json`](/Users/ivan.khoma/Projects/source-bible-app/figma.styles.json)
- [`design-system.tokens.json`](/Users/ivan.khoma/Projects/source-bible-app/design-system.tokens.json)

## Usage

### Tailwind

Merge the exported `theme.extend` from [`tailwind.design-system.config.cjs`](/Users/ivan.khoma/Projects/source-bible-app/tailwind.design-system.config.cjs) into your app Tailwind config.

### Figma

Use [`figma.styles.json`](/Users/ivan.khoma/Projects/source-bible-app/figma.styles.json) as the normalized import/export reference for color, text, spacing, radius, and effect styles.

### Documentation

Use this file as the canonical human-readable summary of the system represented in the source design-system HTML.
