# factory-scratch

A throwaway repository Factory is tested against: a tiny greeting library (`src/greet.mjs` and friends) and a Postgres-backed notes CLI (`src/cli.mjs`). Plain Node 22 ES modules; the only dependency is `pg`.

- Validation: `npm run check`, `npm test`, then `npm run test:db`. All three must pass before a PR is opened. `test:db` needs `DATABASE_URL`, which `scripts/ci/setup.sh` exports (PostgreSQL with pgvector, role and database `factory`).
- Tests live in `test/*.test.mjs` (no database) and `test/db/*.db.test.mjs` (a fresh schema per file through `test/db/helpers.mjs`; files run in parallel, and pgvector lives in `public`), use `node:test`, one test per behaviour, exact values. Assert that a discovered list contains what a test needs, never the exact list, so features added in parallel never edit each other's tests.
- Source lives in `src/`. Keep functions small and documented with one sentence.

## Extension points of the notes CLI

Add capability by adding a file; never edit the discovery modules or another feature's files.

- A command is `src/commands/<name>.mjs` exporting `run(client, args)`; it is reached as `notes <name>` and parses `args` with `node:util` `parseArgs`. Errors carry a `code`.
- An export format is `src/export/<name>.mjs` exporting `format(rows)`; `notes list --format <name>` picks it by file name.
- A rule is `src/rules/<name>.mjs` exporting `code` and `check(note)`, which returns a problem string or null; every rule runs on `notes add`.
- A schema change is a new file `migrations/<YYYYMMDDHHMM>_<name>.sql`, applied in lexical order once; never edit an existing migration.
- The store functions live in `src/notes.mjs`; add a function there only when no command can do the work with the existing ones.

Do not edit `README.md`, `package.json` or the discovery modules (`src/commands.mjs`, `src/export.mjs`, `src/rules.mjs`, `src/db.mjs`) in an Objective: parallel Objectives would conflict.

## Public repository

This repository is public, and so is everything in it: code, tests, fixtures, commit messages, issues, pull requests, comments and Actions logs and artifacts.

- Never write a secret anywhere: no tokens, keys, passwords or connection strings with credentials. Read them from the environment, and use obvious fakes in tests (`test-token`, `postgres://u:p@localhost/x`).
- Never write personal data: no real names, email addresses, phone numbers, addresses, account IDs or local paths such as `/home/<user>/...`. Use `example.com`, `example.test`, `Alice` and relative paths.
- Never write anything private: no content from other repositories, private documents, internal URLs or hostnames, or session and chat links.
- If a task seems to need any of these, stop and ask in the issue instead of working around it.
