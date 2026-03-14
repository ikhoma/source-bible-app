# Figma Foundations Setup

Use this as the build order for Bible App foundations in Figma.

## 1. Create Color Styles First

Create these color styles exactly as named.

### Light

- `Color/Text/Primary`
- `Color/Text/Secondary`
- `Color/Text/Inverse`
- `Color/Surface/Page`
- `Color/Surface/Base`
- `Color/Surface/Subtle`
- `Color/Surface/Raised`
- `Color/Surface/Muted`
- `Color/Border/Subtle`
- `Color/Border/Strong`
- `Color/Border/Focus`
- `Color/Action/Primary`
- `Color/Action/Primary Hover`
- `Color/Action/Selected Surface`
- `Color/Status/Highlight`
- `Color/Status/Search`
- `Color/Status/Recording`

### Dark

- `Dark/Color/Text/Primary`
- `Dark/Color/Text/Secondary`
- `Dark/Color/Surface/Base`
- `Dark/Color/Surface/Subtle`
- `Dark/Color/Surface/Muted`
- `Dark/Color/Surface/Raised`
- `Dark/Color/Border/Subtle`
- `Dark/Color/Action/Primary`
- `Dark/Color/Action/Primary Hover`
- `Dark/Color/Action/Selected Surface`

## 2. Create Text Styles

Create these text styles exactly as named.

### Modern UI

- `Display/Modern`
- `Heading/H1 Modern`
- `Heading/H2 Modern`
- `Heading/H3 Modern`
- `Body/Verse Modern`
- `Body/Default Modern`
- `UI/Label Modern`
- `Caption/Modern`
- `Label/Eyebrow`
- `Meta/Mono`

### Editorial / Scripture

- `Display/Antique`
- `Heading/H1 Antique`
- `Heading/H2 Antique`
- `Body/Verse Antique`
- `Body/Default Antique`
- `Content/Hebrew`

## 3. Suggested Variable Groups

Create variables in these groups:

- `Semantic / Light / Color`
- `Semantic / Dark / Color`
- `Primitives / Stone`
- `Primitives / Blue`
- `Spacing`
- `Radius`

Suggested spacing variables:

- `Spacing/0`
- `Spacing/1`
- `Spacing/2`
- `Spacing/4`
- `Spacing/6`
- `Spacing/8`
- `Spacing/12`
- `Spacing/16`
- `Spacing/20`
- `Spacing/24`
- `Spacing/28`
- `Spacing/32`
- `Spacing/40`
- `Spacing/48`
- `Spacing/64`
- `Spacing/96`
- `Spacing/120`
- `Spacing/140`

Suggested radius variables:

- `Radius/0`
- `Radius/3`
- `Radius/4`
- `Radius/8`
- `Radius/10`
- `Radius/12`
- `Radius/Pill`
- `Radius/Round`

## 4. Recommended Creation Order

1. Create light semantic color styles.
2. Create dark semantic color styles.
3. Create spacing and radius variables.
4. Create modern text styles.
5. Create antique/scripture text styles.
6. Add primitive palette variables only after semantic styles are working.

## 5. Practical Notes

- Use semantic colors in components; do not build components directly from primitive palette values.
- Keep dark theme roles aligned to light theme roles with the same naming structure.
- Use numeric spacing and radius names for easier handoff to code.
