# Core release procedure

The package is `@krigsvold/core`; historical `@krigsvold/theme` versions and tags remain available. Source manifests retain `private: true` to prevent accidental publication. Only the isolated release archive changes this flag to `false`; source identity, dependencies and every other manifest field must match the accepted commit.

Integration follows feature → `develop` → release branch → `main`, followed by a main back-merge. The canonical [GitFlow acceptance policy](https://github.com/k3jph/design-workbench/blob/develop/docs/GITFLOW-ACCEPTANCE.md) requires one fast `verify` check, zero human reviewers and treats integration as acceptance. Extended compatibility and browser suites provide advisory evidence. Immutable version-tag protections and publication boundaries remain mandatory.

## Stage an accepted npm artifact

1. Confirm the intended version is unused and the exact accepted `main` commit contains matching package, source and lockfile identities. Never overwrite an existing registry version or tag.
2. Reproduce the publishable archive independently and record its SHA-256. Dispatch the existing `core-stage.yml` on `main` with that full commit, digest and intended `next` or `latest` distribution tag. The workflow requires the existing `core-stage-review` environment and stage-only npm trusted publisher for this repository/workflow/environment identity.
3. The bounded workflow verifies live `main`, complete manifest/lockfile identity and registry absence; runs the build and tests; exports clean source twice; changes only the private flag; compares both archive bytes against the supplied digest; and rechecks `main` and registry absence immediately before `npm stage publish --provenance`.
4. An npm owner approves the genuine stage through npm's separate 2FA flow. Staging is a publicly visible registry operation, not a private test. Never approve a bootstrap sentinel, and do not create redundant stages.
5. Independently install the published package, verify exact tarball bytes and SHA-512 integrity, and run npm signature/attestation verification. Retain the previous pin for rollback.

## Complete the GitHub source release

After registry publication is verified, create the protected `v<version>` tag at the eligible accepted `main` commit. The existing `tag-release.yml` completes a GitHub source release only: it has no npm write or OIDC publishing permission and never publishes or restages npm.

The workflow verifies protected tag/source identity and first-parent production history, rebuilds the normalized archive, compares it with the actual registry artifact, and requires successful npm signature verification plus SLSA provenance naming the exact package, archive, commit, repository, `core-stage.yml`, `refs/heads/main` and `workflow_dispatch` event. It rechecks the remote tag and refuses an existing or unverifiable GitHub Release before attaching the verified `.tgz` and `SHA256SUMS` assets. Existing releases and tags are never overwritten.

The npm trusted publisher remains stage-only. No new publisher identity, broad token, production deployment, or additional governance review is part of GitHub Release completion. See [npm trusted publishers](https://docs.npmjs.com/trusted-publishers/) and [staged publishing](https://docs.npmjs.com/staged-publishing/).
