# Core integration

The accepted Core identity is `@krigsvold/core`; version 2.2.4 is already published and must never be republished. Version 2.2.5 carries additive TypeScript declarations for existing runtime design groups and foundation provenance. It preserves CSS, fonts, all 25 exports and historical theme packages/tags.

The source remains `private: true`. The manual staging workflow verifies exact current production source, complete package/source/lockfile identity, registry absence and two identical normalized archives before stage-only npm publication. Separate npm owner approval remains required. The protected-tag workflow completes the GitHub source release only after verifying the registry artifact and its staging provenance; it cannot publish npm.

Integration follows feature → develop → release branch → main, then a main back-merge. The [canonical GitFlow acceptance policy](https://github.com/k3jph/design-workbench/blob/develop/docs/GITFLOW-ACCEPTANCE.md) specifies one required fast `verify` check and zero human reviewers; extended suites are advisory. See [migration guidance](docs/core-migration.md) and [release procedure](docs/releasing.md).
