# Canonical Krigsvold website grammar (experimental)

Source of visual truth: `krigsvolddesign/site` on `develop`, itself derived
from the working `krigsvold.org` Astro application.

This optional `@krigsvold/core/site.css` entry point owns the source
website's reusable visual rules. It imports the existing Core foundation,
legacy compatibility aliases, `site-layout.css`, and the original upstream
Material Kit 3.0.4/Bootstrap 5.2.3 stylesheet (MIT-licensed; copyright notice
retained verbatim in `site-vendor.css`). Material Kit is a **legacy source
dependency**, not a new Krigsvold-specific design system or a global Core
requirement. Its replacement with internal reusable patterns is a separate,
visual-parity-gated architectural improvement.

The consumer supplies images via:
- `--krigsvold-site-hero-image`
- `--krigsvold-site-hero-image-narrow`
- `--krigsvold-site-feature-image`

The crystal badge and the approved ice panorama belong to the site and are
not embedded in Core. Bootstrap's native interaction scripts are still supplied
by the Astro application, pending reusable framework-native interactions.

Pinned source Git blobs:
- `src/styles/site.css`: `43246638636910aaed8188173f237a6ed6d85b5f`
- `public/assets/css/material-kit.min.css`: `656f156348cedef6d93c5e2d4991300473c9dc12`

No existing `full.css`, `theme.css`, publishing configuration, or `main`
content changes. Incomplete or visually different consumer builds must not be
deployed as approved reference sites.
