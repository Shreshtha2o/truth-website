# Research basis for the completion pass

The completion pass used current primary guidance rather than adding more visual features arbitrarily.

## Next.js
- App Router and production architecture: https://nextjs.org/docs
- Metadata API and file-based metadata: https://nextjs.org/learn/dashboard-app/adding-metadata
- Accessibility/ESLint guidance: https://nextjs.org/learn/dashboard-app/improving-accessibility
- Image optimization: https://nextjs.org/learn/pages-router/assets-metadata-css-assets

Applied in this project:
- Metadata is now defined through the App Router layout.
- robots/sitemap use a production origin from `NEXT_PUBLIC_SITE_URL`.
- Existing `next/image`-based cinematic media infrastructure is preserved.
- ESLint is configured with a narrowly scoped Three.js exception rather than disabling React rules globally.

## Accessibility
- WCAG 2.2: https://www.w3.org/TR/wcag/
- WCAG 2.2 Focus Visible: https://www.w3.org/WAI/WCAG22/Understanding/focus-visible
- WCAG 2.2 Focus Not Obscured: https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/
- WCAG 2.2 Pause, Stop, Hide: https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide

Applied in this project:
- A real skip target exists at `#main-content`.
- Strong `:focus-visible` styling remains enabled.
- Reduced-motion handling remains in the accessibility/performance layers.
- Ambient audio is opt-in and never autoplays.
- Decorative particle visuals remain `aria-hidden`.
