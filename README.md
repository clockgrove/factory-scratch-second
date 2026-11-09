# factory-scratch-second

Factory's second scratch repository: the target of live cross-repository drills. It holds the export-format registry for the notes CLI in [clockgrove/factory-scratch](https://github.com/clockgrove/factory-scratch).

- `formats.json` lists every export format that CLI offers: its name (the CLI's `--format` value), MIME type and file extension.
- `src/registry.mjs` reads it: `formats()` and `lookup(name)`.
- `npm test` checks the entries.

A new export format there is registered here in the same change.

## License

MIT. See [LICENSE](LICENSE).
