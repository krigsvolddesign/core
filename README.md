# Krigsvold core

> **Unpublished migration candidate:** `@krigsvold/core` is a proposed new package identity, not an announced registry release. Install the local tarball to test it. Existing `@krigsvold/theme` installations remain the supported published path until a separately approved release and migration. This review branch is marked private to prevent publication.

`@krigsvold/core` is the framework-independent source of truth for Krigsvold. It contains Light/Dark semantic colors and the typography, spacing, shape, depth, and interaction definitions extracted from krigsvold.org.

## Design direction

For the design direction and criteria for expanding the system, read the [Krigsvold design charter](docs/charter.md).

## Choose what to adopt

| Import | Effect |
| --- | --- |
| `@krigsvold/core/css` | Original scoped Light/Dark color variables only; unchanged from v1 |
| `@krigsvold/core/foundation.css` | Namespaced design variables; no font loading or element styles |
| `@krigsvold/core/typography.css` | Text roles inside `.krigsvold`; requires foundation variables |
| `@krigsvold/core/fonts.css` | Optional, locally bundled Roboto, Roboto Slab, and Roboto Mono assets through Fontsource |
| `@krigsvold/core/components.css` | Optional namespaced interface primitives; requires colors and foundation |
| `@krigsvold/core/full.css` | Colors, foundation, typography, and components; fonts remain optional |
| `@krigsvold/core/legacy.css` | Optional variable aliases for incremental website migration |

```js
import '@krigsvold/core/full.css';
import '@krigsvold/core/fonts.css';
import { light, dark, foundation, design, capabilities } from '@krigsvold/core';
```

Set `data-krigsvold="light"` or `data-krigsvold="dark"` on the element to theme; add `class="krigsvold"` to opt into typography and interface styling. Modes may coexist on the same page. CSS remains available without JavaScript; font package imports require a CSS-capable bundler. ESM and CommonJS exports, TypeScript declarations, per-mode JSON, `tokens.json`, `foundation.json`, `design.json`, `capabilities.json`, and highlight.js styles are explicit package exports.

## Typography and overrides

- Serif: Roboto Slab, for editorial headings, introductory text, and quotations.
- Sans: Roboto, for body prose, controls, navigation, and metadata.
- Display: Roboto Slab, for hero text and titles. Its role is independent even though it shares the serif family.
- Monospace: Roboto Mono, the agreed public companion for code and terminal text.

The serif, display, and sans roles are extracted from the originating krigsvold.org website. Roboto Mono is a new companion chosen for the Roboto family. See [the provenance record](docs/provenance.md) for source selectors, exact commit, inherited Material Kit values, and accessibility normalizations. Each role can be overridden independently through its namespaced CSS variable. See NOTICE.md for font licenses.

The optional full stylesheet is not a site template: it includes no personal identity, content, analytics, or consent policy. See [`@krigsvold/astro`](https://github.com/krigsvolddesign/astro) for Astro composition and a neutral starter.

## Source and releases

Edit `source.json` here; run `npm ci --ignore-scripts`, `npm run build`, `npm test`, and `npm pack`. Generated `dist/` is committed for review and reproducibility. Fontsource dependencies are pinned; lockfiles retain their integrity. The source website's original colors are retained as separate identity tokens rather than silently replacing existing semantic app colors. Reduced-motion preferences zero the shared motion tokens.

The `capabilities` export records what each integration applies, requires separate configuration for, or cannot support. A browser color theme does not change fonts. Editors and terminals use the monospace role only where their host allows it.

The npm scope is `krigsvold`. To test this candidate, run `npm pack` and install the resulting local tarball. Published consumers continue to use `@krigsvold/theme`. Package versions are independent of application-port versions.

Application port generators in `krigsvolddesign/krigsvoldtheme` currently consume `@krigsvold/theme`. Their migration requires a separate reviewed change. Ordinary verification does not publish; publishing a GitHub release triggers the release workflow.

## Layouts

Version 2.1 adds optional [`layout.css`](docs/layout.md), the `layout` JavaScript export, and `layout.json`. Layout primitives cover containers, vertical stacks, wrapping clusters, bounded grids, sidebars, and paired regions. Import `@krigsvold/core/full.css` for the complete styling layer or add `@krigsvold/core/layout.css` after `foundation.css` for structural classes alone. See [source observations and responsive rules](docs/layout.md).

## Releases

The current GitHub release workflow can publish automatically through npm trusted publishing; this private candidate cannot be published. See [release setup](docs/releasing.md) for the one-time package authorization and release order.

## Foundations specification

Read the [working foundations specification](docs/foundations.md) for spacing relationships, responsive composition, typography, density, surfaces, motion, accessibility, and the distinction between shipped values and proposed application roles.

## Experimental UI language

[Grammar](docs/grammar.md), [source decisions](docs/source-decisions.md), [framework and migration guide](docs/consolidation.md), and [machine-readable support](language.json) describe the experimental core 2.2.3 / Astro 1.2.2 consolidation. Existing defaults remain compatible; the source profile is opt-in.

[Grammar coverage review](docs/coverage.md), [validated forms](docs/patterns/forms.md), and [query/results patterns](docs/patterns/query-results.md) extend the experimental grammar to 0.3.

## Adoption repair preview

The existing `@krigsvold/theme@next` is the experimental 2.2.3 line; `latest` remains the stable 2.1 line. Package, grammar and framework versions are separate: grammar 0.3 is the design contract, core 2.2.3 supplies CSS/tokens, Astro 1.2.2 supplies wrappers, and React 0.1.0 retains its tested core 2.1.0 dependency. Exact package versions belong in the lockfile.

[Direct HTML anatomy](docs/native-html.md) documents layout/pattern classes. [Native form styling](docs/form-styling.md) documents the optional `forms.css` layer included in `full.css`; behavior remains host-owned. Existing colors/fonts and marks retain their native identity.
