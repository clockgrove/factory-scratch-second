# factory-scratch-second

The export-format registry for the notes CLI in clockgrove/factory-scratch. Plain Node 22 ES modules, no dependencies.

- Validation: `npm test` (`node:test`, files `test/*.test.mjs`). It must pass before a PR is opened.
- `formats.json` is the registry: one object per format with `name`, `mime` and `extension`, kept sorted by `name`. A format the notes CLI offers is registered here in the same change that adds it there.
- Source lives in `src/`. Keep functions small and documented with one sentence.

## Public repository

This repository is public, and so is everything in it. Never write a secret, personal data or anything private (other repositories' private content, internal URLs, local paths). If a task seems to need any of these, stop and ask in the issue.
