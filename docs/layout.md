# Krigsvold layout extraction

> Candidate imports below refer to an unpublished local `@krigsvold/core` tarball; published `@krigsvold/theme` remains available.

Release candidate: core 2.1.0 and Astro 1.1.0. Existing color, font, and component contracts remain available.

## Source observations

- Originating site: [krigsvold.org](https://github.com/basuhoward/krigsvold.org/tree/a3cf072c516c59ed35814e0fa153028cc91ceecd). Inspected files: `src/layouts/Page.astro`, `src/components/HomeContent.astro`, `src/components/HomeHero.astro`, `src/styles/site.css`.
- Demonstration site: [krigsvoldtheme.dev](https://github.com/krigsvoldtheme/krigsvoldtheme/tree/880bdd2bd8430bbdfd8d728faaae0c21199540b1). Inspected files: `site/src/pages/index.astro`, `site/src/styles/global.css`, `site/src/components/FoundationSpecimen.astro`.

The originating site uses broad section bands, paired geography and feature regions, three-column work/metric groups, a main article plus fellowship facts, and image/copy listings. The demonstration site adds a full-width landscape opening, a single workbench, a paired contrast/token laboratory, and a three-card foundation specimen.

## Reusable contract

The core retains its original reading/content/archive widths. New layout variables normalize recurring gaps, a 20rem sidebar, a 30rem minimum main region, a 20rem card minimum, and a 22rem split-panel basis. These are documented defaults, not a claim that every source element used exactly the same values. Krigsvold's default split is `equal`.

Use `@krigsvold/core/layout.css` with foundation variables for structural classes; it loads no fonts or palette. `full.css` includes it. `layout.json` and the ESM/CommonJS `layout` export describe defaults and provenance. No existing source value is silently replaced.

Intrinsic wrapping responds to the containing region. Grid `columns` is a maximum, not a promise to fit that many columns at every width. Sidebars use a separate main-content minimum; splits retain DOM order. There is no overflow-hiding workaround. Wide tables belong in a labelled `.krigsvold-scroll` region with `tabindex="0"` when keyboard scrolling is needed.

The Astro package supplies wrappers, site chrome, and complete article, landing, and documentation compositions. Identity, route generation, content rendering, analytics, and consent remain host-owned. Header links wrap naturally; this release does not implement dropdown or disclosure-menu behavior.
