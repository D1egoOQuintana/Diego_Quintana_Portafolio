# Testing & CI Strategy

**Role:** QA/DevOps Lead

## 1. Test Matrix

| Level | Scope | Tool | Scenarios | Frequency |
| :--- | :--- | :--- | :--- | :--- |
| **Smoke** | Critical Paths | `Playwright` | App renders, Terminal input focuses, `help` command works. | On Push |
| **Unit** | Logic/Utils | `Vitest` | Command processor logic, argument parsing, store state updates. | On Push |
| **A11y** | Accessibility | `axe-core` | Contrast ratio, ARIA labels, keyboard navigation trap. | On PR |
| **E2E** | User Flows | `Playwright` | Full flow: Enter site -> Type `projects` -> Type `open cubicutec` -> Verify content. | On PR |

## 2. CI Workflow (GitHub Actions)

### Trigger: Pull Request to `main`

1.  **Lint & Typecheck:**
    *   `npm run lint` (ESLint)
    *   `npm run type-check` (TypeScript `tsc --noEmit`)
    *   *Blocker:* Fails if any error found.

2.  **Unit Tests:**
    *   `npm run test:unit`
    *   *Blocker:* Fails if logic breaks.

3.  **Build Check:**
    *   `npm run build`
    *   Ensures Next.js build passes (no server component errors).

## 3. Success Criteria
- **Coverage:** > 80% on command logic.
- **Performance:** Lighthouse Score > 90 (Performance, A11y, SEO).
- **Reliability:** 0 Flaky tests in E2E suite.

## 4. Manual QA Checklist (Pre-release)
- [ ] Verify "Phosphor Glow" effect on Dark Mode.
- [ ] Check mobile keyboard behavior (virtual keyboard shouldn't hide input).
- [ ] Verify `Tab` autocomplete works for all projects.
- [ ] Check external links open in `_blank`.
