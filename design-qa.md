# Evolura services desktop styling QA

## Comparison target

- Source visual truth: browser annotations supplied for `https://evolurats.com/#services`, with the live mobile reference captured at `/tmp/evolura-services-mobile-reference.png`.
- Desktop implementation: `/tmp/evolura-services-desktop-local.png` from `http://localhost:3000/#services`.
- Mobile implementation: `/tmp/evolura-services-mobile-local.png`.
- Mobile side-by-side comparison: `/tmp/evolura-services-mobile-comparison.png`.
- Desktop viewport: 1440 × 1000 CSS pixels at device scale factor 1.
- Mobile viewport: 736 × 964 CSS pixels at device scale factor 1.
- Captures use matching browser density; no density normalization was needed.
- State: homepage services section, standard non-hover state.

## Full-view comparison evidence

- At 1440px, the service directory renders as three equal columns. Cards measure approximately 445px wide and 583px high, with equal 249px 16:9 image frames and aligned 331px content areas.
- Six cards form two balanced rows and the seventh card is centered in the last row.
- At 736px, the live reference and local implementation retain the same one-column service directory, typography, image crop, padding, border radius, and CTA placement.

## Focused region comparison evidence

- The focused comparison covers the annotated commercial cleaning card, its image, body content, and the adjacent service card boundary.
- Mobile reference and local implementation remain visually equivalent; differences in the side-by-side image are limited to scroll position.
- Desktop images use the same centered crop and identical aspect ratio across every card.

## Findings

- No P0, P1, or P2 mismatch remains.
- Fonts and typography: existing family, weights, sizes, hierarchy, and copy are unchanged.
- Spacing and layout rhythm: desktop grid, card heights, image frames, content padding, and CTA baselines are consistent.
- Colors and visual tokens: existing Evolura colors, borders, shadows, and backgrounds are unchanged.
- Image quality and asset fidelity: original service images are preserved with centered cover cropping; no replacement assets were introduced.
- Copy and content: unchanged.
- Accessibility and interaction: existing link semantics, focus behavior, and hover behavior are unchanged.

## Comparison history

1. Initial issue: legacy desktop selectors gave the first cards and later cards different grid spans and image aspect ratios.
2. Fix: added a desktop-only three-column override, equal row sizing, a shared 16:9 image frame, equal body sizing, and centered placement for the final card.
3. Post-fix evidence: desktop measurements are equal across all seven cards; the 736px reference and implementation retain the original mobile layout.

## Implementation checklist

- [x] Scope layout changes to viewports at or above 1024px.
- [x] Render three equal service cards per desktop row.
- [x] Use one 16:9 centered image frame for all desktop service cards.
- [x] Align titles, descriptions, and CTAs with equal-height card bodies.
- [x] Keep the final seventh card centered.
- [x] Preserve mobile layout and component logic.
- [x] Check lint, tests, production build, console errors, and framework overlays.

## Follow-up polish

- None required for this scoped change.

final result: passed
