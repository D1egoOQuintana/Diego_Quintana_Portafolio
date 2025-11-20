# Analytics & Measurement Plan

**Role:** Analytics Lead

## 1. Event Dictionary

| Event Name | Trigger | Properties | Purpose |
| :--- | :--- | :--- | :--- |
| `command_executed` | User hits Enter on input | `command_name` (string), `has_args` (boolean), `is_error` (boolean) | Understand most used features and common errors. |
| `project_opened` | User runs `open <slug>` | `project_slug` (string), `method` (command vs click) | Measure interest in specific projects. |
| `theme_changed` | User runs `theme <val>` | `theme_value` (dark/light/system) | Analyze user preference for UI mode. |
| `contact_viewed` | User runs `contact` | — | Measure conversion intent. |
| `link_clicked` | User clicks external link | `url` (string), `type` (demo/repo/social) | Track CTR to external assets. |

## 2. KPIs (Key Performance Indicators)

1.  **Engagement Rate:** % of sessions with > 3 commands executed.
2.  **Project Interest:** Top 3 most opened projects.
3.  **Conversion:** CTR on LinkedIn/Email links vs. total sessions.
4.  **Error Rate:** % of `command_executed` resulting in `is_error: true` (Target: < 5%).

## 3. Privacy Policy (Brief)

> **Privacidad:** Este sitio utiliza analítica anónima para mejorar la experiencia. No recolectamos información personal identificable (PII) ni usamos cookies de rastreo publicitario. Respetamos la configuración "Do Not Track" (DNT) de su navegador.

## 4. Implementation Note
Use a privacy-focused provider like **Vercel Analytics** or a custom lightweight wrapper around `window.navigator.sendBeacon` to avoid ad-blockers and heavy scripts.
