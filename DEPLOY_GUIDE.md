# Deployment Guide (Vercel)

**Role:** DevOps Engineer

## 1. Vercel Configuration

### Project Setup
- **Framework Preset:** Next.js
- **Root Directory:** `./`
- **Build Command:** `next build`
- **Output Directory:** `.next`

### Environment Variables
- `NEXT_PUBLIC_ANALYTICS_ID`: (Optional) For tracking.
- `NEXT_PUBLIC_SITE_URL`: `https://luis-quintana-tui.vercel.app` (Canonical URL).

## 2. Pre-Deploy Checklist

- [ ] **Metadata:** Update `layout.tsx` with real title and description.
- [ ] **OG Image:** Ensure `opengraph-image.png` exists in `/app`.
- [ ] **Robots.txt:** Allow indexing (`User-agent: * Allow: /`).
- [ ] **404 Page:** Verify `not-found.tsx` is styled like the terminal (e.g., "Error 404: Command not found").

## 3. Post-Deploy Verification

1.  **SSL Check:** Verify HTTPS is active and valid.
2.  **Canonical Domain:** Ensure non-www redirects to www (or vice versa).
3.  **Performance:** Run PageSpeed Insights on the live URL.
4.  **Theme Sync:** Verify system theme preference is detected correctly on first load.

## 4. Vercel Features to Enable
- **Analytics:** Enable Vercel Web Analytics for privacy-friendly tracking.
- **Speed Insights:** Monitor Real User Metrics (RUM).
- **Deploy Previews:** Automatic deployments for every PR (shareable URLs for QA).
