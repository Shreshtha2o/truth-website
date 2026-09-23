# Responsive + SEO + Hero CTA V1

Implemented against the uploaded project baseline.

## Added
- `src/components/HeroTrustLayer.tsx`
  - Moving red disclaimer: "This is not the official website."
  - Disclaimer fades away while leaving the hero.
  - Permanent "Click here" CTA linking to https://acharyaprashant.org/
  - Animated purple/red gradient.
  - Revolving thin gradient border.
  - Hover/focus/touch-friendly behavior.
  - Reduced-motion support.

## Responsive
- Mobile/tablet-only visual positioning overrides.
- Major visual targets are moved toward the left/center and resized for narrow screens.
- Universe and eye receive mobile-specific cropping/positioning.
- Hero/story typography and spacing are tightened for phones.
- Permanent CTA respects safe-area insets.
- Desktop composition remains unchanged by the new mobile rules.

## SEO
- Removed `next/font/google` from the root layout to avoid build-time Google font dependency.
- Added canonical metadata.
- Expanded robots directives.
- Improved Open Graph metadata.
- Added WebSite JSON-LD structured data.
- Existing sitemap/robots environment-based URLs retained.

## Preserved
- `ParticleJourney.tsx` was not modified.
- Existing chapter text and narrative were not rewritten.
- Existing particle-source assets were not replaced.
