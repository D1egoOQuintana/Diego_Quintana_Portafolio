# Motion System & Performance Guidelines

**Role:** Motion Designer Senior + Perf Engineer
**Context:** Professional TUI Portfolio

## 1. Motion Tokens

### Durations
| Token | Value | Usage |
| :--- | :--- | :--- |
| `--duration-fast` | `150ms` | Micro-interactions (hover, active, toggle) |
| `--duration-normal` | `300ms` | Content entry, small layout shifts |
| `--duration-slow` | `500ms` | Major layout transitions, modal entry |
| `--duration-slower` | `700ms` | Initial page load, complex sequences |

### Easings (Bezier Curves)
| Token | Value | Usage |
| :--- | :--- | :--- |
| `--ease-out-quad` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Standard entry (natural deceleration) |
| `--ease-out-back` | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | Bouncy entry (playful elements) |
| `--ease-in-out-smooth` | `cubic-bezier(0.4, 0, 0.2, 1)` | Smooth transitions (theme switch) |

### Delays
- **Stagger:** `50ms` between list items.
- **Initial Delay:** `100ms` to allow paint before animation.

## 2. Animation Rules & Context

### Main Entry (Layout)
- **Animation:** `Fade + Blur + SlideUp`
- **Specs:** Opacity 0->1, Blur 10px->0, Y 20px->0.
- **Duration:** `--duration-slow` (500ms).
- **Easing:** `--ease-out-quad`.

### Terminal Output ("Typed")
- **Effect:** Character-by-character appearance.
- **Enhancement:** "Phosphor Glow" text-shadow on active typing line.
- **Batching:** Render 4-8 chars per frame to maintain 60fps.
- **Reduced Motion:** Disable typing effect; show full content immediately.

### Interactive States (Hover/Focus)
- **Hover:** Scale 1.02 or Background opacity change. Duration: `--duration-fast`.
- **Focus:** Ring expansion (scale 0.95 -> 1.0).

### Theme Transition
- **Rule:** `transition-colors duration-300 ease-in-out`.
- **Constraint:** Avoid layout shifts (CLS) during theme change.

## 3. Performance Budget

| Metric | Target | Strategy |
| :--- | :--- | :--- |
| **LCP (Largest Contentful Paint)** | `< 1.2s` | Static shell, defer heavy JS, optimize fonts. |
| **CLS (Cumulative Layout Shift)** | `0` | Fixed dimensions for terminal container, font-display swap. |
| **INP (Interaction to Next Paint)** | `< 200ms` | Batch React state updates, avoid heavy main-thread tasks. |
| **JS Bundle (Home)** | `< 100kb` (gzipped) | Code splitting, lazy load project components. |
| **FPS (Animation)** | `60fps` | Animate only `opacity`, `transform`, `filter`. |

## 4. QA Checklist

- [ ] **Reduced Motion:** Verify `prefers-reduced-motion: reduce` disables typing and slides.
- [ ] **Focus Visibility:** Tab navigation shows clear focus ring in both themes.
- [ ] **Theme Switch:** No white flash when switching to dark mode.
- [ ] **Jank Free:** Typing effect does not block input.
