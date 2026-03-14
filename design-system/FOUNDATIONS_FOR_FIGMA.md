# Bible App Foundations for Figma

This document normalizes the current design-system sources into a Figma-ready foundations spec. It is intended to be the implementation reference for color styles, text styles, spacing tokens, radius tokens, and dark mode behavior.

## Naming Rules

- Use Title Case with slash groups for Figma styles.
- Use semantic names for styles consumed by UI.
- Keep primitive palette values as support tokens, not default UI styles.
- Avoid duplicate styles with different names pointing to the same role.
- Prefer one canonical style per role per theme.

## 1. Semantic Color Styles

Create these as Color Styles in Figma.

### Light

| Figma Style Name | Value | Notes |
| --- | --- | --- |
| `Color/Text/Primary` | `#272223` | Main body and heading text |
| `Color/Text/Secondary` | `#6C757D` | Metadata, captions, helper text |
| `Color/Text/Inverse` | `#FFFFFF` | Text on filled interactive surfaces |
| `Color/Surface/Page` | `#F0EFED` | App page background |
| `Color/Surface/Base` | `#FFFFFF` | Cards, sheets, inputs, nav bars |
| `Color/Surface/Subtle` | `#F8F9FA` | Soft neutral sections |
| `Color/Surface/Raised` | `#ECEAE6` | Raised headers and emphasized neutral panels |
| `Color/Surface/Muted` | `#DDDDDD` | Disabled or muted neutral fills |
| `Color/Border/Subtle` | `#DDDDDD` | Default dividers and separators |
| `Color/Border/Strong` | `#949494` | Strong borders and emphasized separators |
| `Color/Border/Focus` | `#93C5FD` | Focus and selected verse outline |
| `Color/Action/Primary` | `#2563EB` | Primary action color |
| `Color/Action/Primary Hover` | `#3B82F6` | Hover and active emphasis |
| `Color/Action/Selected Surface` | `#EFF6FF` | Selected tabs, verse row background |
| `Color/Status/Highlight` | `#84CC16` | Highlight marker |
| `Color/Status/Search` | `#FDE047` | Search emphasis |
| `Color/Status/Recording` | `#EF4444` | Recording or destructive emphasis |

### Dark

Create dark-theme counterparts with the same role names and a `Dark` group prefix.

| Figma Style Name | Value | Notes |
| --- | --- | --- |
| `Dark/Color/Text/Primary` | `#E7E5E4` | Main text on dark surfaces |
| `Dark/Color/Text/Secondary` | `#A8A29E` | Secondary text on dark surfaces |
| `Dark/Color/Surface/Base` | `#1C1917` | Main app background surface |
| `Dark/Color/Surface/Subtle` | `#221F1E` | Subtle dark surface |
| `Dark/Color/Surface/Muted` | `#312E2B` | Muted dark neutral |
| `Dark/Color/Surface/Raised` | `#403B37` | Raised panels and headers |
| `Dark/Color/Border/Subtle` | `#3F3A36` | Default dividers on dark surfaces |
| `Dark/Color/Action/Primary` | `#3B82F6` | Primary dark-mode action color |
| `Dark/Color/Action/Primary Hover` | `#60A5FA` | Hover or emphasized action state |
| `Dark/Color/Action/Selected Surface` | `#1E3A8A` | Selected surface on dark theme |

## 2. Text Styles

Create these as Text Styles in Figma.

### Modern UI

| Figma Text Style | Font | Weight | Size | Line Height | Notes |
| --- | --- | --- | --- | --- | --- |
| `Display/Modern` | Inter | 700 | 36 | 40 | Hero display |
| `Heading/H1 Modern` | Inter | 700 | 30 | 36 | Main screen title |
| `Heading/H2 Modern` | Inter | 700 | 24 | 32 | Section title |
| `Heading/H3 Modern` | Inter | 700 | 20 | 28 | Subsection title |
| `Body/Verse Modern` | Inter | 400 | 18 | 24.3 | Verse text |
| `Body/Default Modern` | Inter | 400 | 16 | 24 | Standard body copy |
| `UI/Label Modern` | Inter | 500 | 14 | 20 | Buttons, tabs, controls |
| `Caption/Modern` | Inter | 600 | 12 | 16 | Captions and compact labels |
| `Label/Eyebrow` | Inter | 700 | 11 | 16 | Uppercase, letter spacing `12%` |
| `Meta/Mono` | Monospace | 400 | 10 | 16 | Token metadata, Strong references |

### Editorial / Scripture

| Figma Text Style | Font | Weight | Size | Line Height | Notes |
| --- | --- | --- | --- | --- | --- |
| `Display/Antique` | Cormorant Garamond | 700 | 40 | 48 | Editorial display |
| `Heading/H1 Antique` | Cormorant Garamond | 700 | 32 | 40 | Scripture-focused title |
| `Heading/H2 Antique` | Cormorant Garamond | 700 | 26 | 34 | Secondary editorial heading |
| `Body/Verse Antique` | Cormorant Garamond | 400 | 20 | 27 | Antique scripture body |
| `Body/Default Antique` | Cormorant Garamond | 400 | 18 | 26.1 | Editorial body copy |
| `Content/Hebrew` | Cormorant Garamond | 400 | 28 | Auto | RTL content style |

### Normalization Notes

- Keep `Inter` as the default UI family.
- Keep `Cormorant Garamond` only for scripture or editorial variants.
- Use `Secondary` instead of `Muted` in text style documentation where the role is semantic, but retain the underlying color token name if needed.
- Do not create duplicate styles for identical size and weight combinations with different labels.

## 3. Spacing Scale

Create these as Variables or documented spacing tokens in Figma.

| Token | Value |
| --- | --- |
| `Spacing/0` | `0` |
| `Spacing/1` | `1` |
| `Spacing/2` | `2` |
| `Spacing/4` | `4` |
| `Spacing/6` | `6` |
| `Spacing/8` | `8` |
| `Spacing/12` | `12` |
| `Spacing/16` | `16` |
| `Spacing/20` | `20` |
| `Spacing/24` | `24` |
| `Spacing/28` | `28` |
| `Spacing/32` | `32` |
| `Spacing/40` | `40` |
| `Spacing/48` | `48` |
| `Spacing/64` | `64` |
| `Spacing/96` | `96` |
| `Spacing/120` | `120` |
| `Spacing/140` | `140` |

### Normalization Notes

- Use raw numeric names in Figma for easier developer alignment.
- Drop duplicate alias naming such as `xxs`, `sm`, `lg`, `7xl`; keep the numeric scale as canonical.
- Use `1` only for hairline or stroke-aligned spacing, not general layout.

## 4. Radius Scale

Create these as Variables or documented tokens in Figma.

| Token | Value | Notes |
| --- | --- | --- |
| `Radius/0` | `0` | Sharp corners |
| `Radius/3` | `3` | Inline token highlight |
| `Radius/4` | `4` | Small controls |
| `Radius/8` | `8` | Standard cards and verse rows |
| `Radius/10` | `10` | Medium surfaces if needed |
| `Radius/12` | `12` | Large cards and sheets |
| `Radius/Pill` | `999` | Pills, segmented controls, badges |
| `Radius/Round` | `50%` | Circular avatars and icon buttons |

### Normalization Notes

- Use numeric radius names for implementation parity.
- Reserve `Pill` and `Round` as the only non-numeric exceptions.
- Default component radius should be `Radius/8` unless a component explicitly needs stronger rounding.

## 5. Dark Mode Notes

- Keep semantic role names identical between light and dark themes. Only values change.
- Use separate dark variables or a parallel `Dark/` Figma style group rather than renaming component styles.
- `Color/Surface/Page` has no explicit dark token in the current source. For now, use `Dark/Color/Surface/Base` as the page-level background unless a separate app canvas color is introduced.
- `Color/Text/Inverse` remains white and does not need a dark duplicate unless component contrast testing proves otherwise.
- Accent status colors currently remain shared across themes. Validate accessibility against dark surfaces before broad use.
- Focus treatment should continue to use the light blue focus border family unless a stronger dark-mode focus token is added later.
- If implementing Figma Variables, bind semantic roles first and keep primitive palettes in a separate collection for internal reference only.

## 6. Optional Primitive Support Palette

These are useful as support variables, not as default semantic styles.

### Stone

`50 #F8F9FA`, `100 #ECEAE6`, `200 #DDDDDD`, `300 #C7C7C7`, `400 #949494`, `500 #6C757D`, `600 #495057`, `700 #212529`, `800 #272223`, `900 #000000`

### Blue

`50 #EFF6FF`, `100 #DBEAFE`, `500 #3B82F6`, `600 #2563EB`

## 7. Recommended Figma Collections

- `Semantic / Light`
- `Semantic / Dark`
- `Primitives`
- `Typography`
- `Spacing + Radius`

This structure keeps implementation tokens clean while preserving the underlying palette and editorial typography system.
