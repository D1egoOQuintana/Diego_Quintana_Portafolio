# Design System & Tokens Catalog

**Role:** Design Systems Lead  
**Identity:** Luis Diego Quintana  
**Context:** Minimal Premium TUI Portfolio  

## 1. Tokens Catalog

### Colors (Theming)

| Token Name | CSS Variable | Light Value (`#F7F7F8`) | Dark Value (`#0B0B0C`) | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Background** | `--background` | `#F7F7F8` (Zinc-50) | `#0B0B0C` (Zinc-950) | Page background |
| **Foreground** | `--foreground` | `#18181B` (Zinc-900) | `#E4E4E7` (Zinc-200) | Primary text |
| **Muted** | `--muted` | `#E4E4E7` (Zinc-200) | `#27272A` (Zinc-800) | Secondary backgrounds |
| **Muted FG** | `--muted-foreground` | `#71717A` (Zinc-500) | `#A1A1AA` (Zinc-400) | Secondary text |
| **Border** | `--border` | `#E4E4E7` (Zinc-200) | `#27272A` (Zinc-800) | Borders, dividers |
| **Accent** | `--accent` | `#65A30D` (Lime-600) | `#A3E635` (Lime-400) | Primary actions, highlights |
| **Accent FG** | `--accent-foreground` | `#FFFFFF` | `#000000` | Text on accent color |
| **Success** | `--success` | `#16A34A` (Green-600) | `#4ADE80` (Green-400) | Success states |
| **Warning** | `--warning` | `#D97706` (Amber-600) | `#FBBF24` (Amber-400) | Warnings |
| **Danger** | `--danger` | `#DC2626` (Red-600) | `#F87171` (Red-400) | Errors, destructive actions |
| **Ring** | `--ring` | `#65A30D` (Lime-600) | `#A3E635` (Lime-400) | Focus rings |

### Typography

| Token | Value | Usage |
| :--- | :--- | :--- |
| **Font Sans** | `Inter`, system-ui | UI elements, cards, badges |
| **Font Mono** | `JetBrains Mono`, monospace | Terminal input, code blocks, logs |

**Scale:**
- `text-xs` (12px) - Metadata, badges
- `text-sm` (14px) - Body text, terminal output
- `text-base` (16px) - Primary inputs, headers
- `text-lg` (18px) - Section titles
- `text-xl` (20px) - Project titles

### Spacing & Layout
Based on 4px/8px grid.
- `gap-2` (8px) - Tight grouping
- `gap-4` (16px) - Standard component spacing
- `p-4` (16px) - Card padding
- `max-w-3xl` - Content container

### Interactive States
- **Hover:** Brightness +10% or slight opacity change.
- **Focus:** Visible ring (`2px` solid `var(--ring)`), offset `2px`.
- **Active:** Scale 0.98 or brightness -5%.
- **Disabled:** Opacity 50%, `cursor-not-allowed`.

## 2. Base Components Guide

### Button
- **Anatomy:** Padding `px-4 py-2`, rounded corners (`rounded-md`), font-sans.
- **Variants:**
    - *Primary:* Bg Accent, Text Accent-FG.
    - *Ghost:* Transparent bg, hover Muted.
- **Anti-pattern:** Don't use shadows on flat terminal buttons.

### Input (Terminal)
- **Anatomy:** No border, transparent background, caret visible.
- **Focus:** No outline (handled by custom caret or parent container).
- **Typography:** Font Mono, `text-base`.

### Card (Project Ficha)
- **Anatomy:** Border `1px solid var(--border)`, Bg `var(--background)` or `var(--muted)/10`.
- **Padding:** `p-4` or `p-6`.
- **Content:** Title (Sans), Description (Sans/Mono mix), Tags (Badge).

### Badge (Tech Stack)
- **Anatomy:** `px-2 py-0.5`, `rounded`, `text-xs`.
- **Style:** Bg `var(--accent)/20`, Text `var(--accent)`.

## 3. Accessibility (A11y)
- **Contrast:** All text must meet AA (4.5:1).
- **Focus:** Keyboard navigation must show visible focus ring.
- **Motion:** Respect `prefers-reduced-motion`.
