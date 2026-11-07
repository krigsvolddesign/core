# Core package identity migration

`@krigsvold/core` is published on npm; version 2.2.4 was independently installed and verified before this 2.2.5 patch. The identity migration originated from `krigsvolddesign/core` commit `5deb567f7afcd8bedb50f9ea3f3fb501bc2ae7a8`. It preserves the 25 export mappings, ESM/CommonJS entry points, CSS, token data, pinned font dependencies and license/notice recorded in `scripts/theme-contract.json`.

Version 2.2.5 ships additive TypeScript declarations for existing design width, shadow, motion and breakpoint groups and foundation provenance fields. Runtime tokens, styles and imports remain compatible. The source manifest stays `private: true`; publication normalizes only that flag in an isolated archive. Never republish 2.2.4 or move historical theme tags.

## Install and migrate

```sh
npm install @krigsvold/core
```

Replace the package prefix in existing theme imports while preserving each selected layer, for example `@krigsvold/theme/full.css` → `@krigsvold/core/full.css`. All 25 mappings from theme 2.2.3 and all 21 mappings from theme 2.1.0 remain available. CSS fonts still require a CSS-capable bundler, and font loading remains optional.

- Astro: inspect its installed manifest and peer contract first. npm treats `@krigsvold/core` and `@krigsvold/theme` as different packages; installing Core does not satisfy a legacy theme peer. Update imports, starter, lockfiles and consumer tests together.
- React: update dependencies, CSS imports, documentation, lockfiles and package tests together. Preserve the existing component package identity and supported compatibility lane.
- Source websites and workbench: update direct imports, distribution references and lockfiles only after the selected registry artifact is verified. Preserve historical source/provenance URLs and previous pins for rollback.
- Jekyll: its released standalone assets must remain independently buildable without npm Core or a workbench checkout.

The source regression suite compiles independent ESM and CommonJS TypeScript consumers. Release verification compares packed exports/assets, exact registry bytes and integrity, and npm provenance. Neither a local tarball nor a source version establishes publication or framework adoption.

## Release order and compatibility

Use the [guarded release procedure](releasing.md): integrate through `develop` and `main`, stage the exact reproducible archive, obtain npm owner approval, verify the published package, then create its protected tag and GitHub source release. Keep existing theme versions, dist-tags and rollback pins intact. Deprecation, shims and removal require their own decision; never unpublish old versions.
