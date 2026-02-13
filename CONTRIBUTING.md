# Contributing to SPECTER docs

Thanks for contributing.

## Local workflow

1. Open this `docs` directory.
2. Run `mint dev`.
3. Edit MDX pages and `docs.json`.
4. Run `mint broken-links` before opening a PR.

## Documentation standards

- Document only behavior verified in `../SPECTER/specter`.
- Add source file references for technical claims.
- Mark unimplemented or roadmap features clearly.
- Keep language direct and concise.

## Required updates for feature changes

If you change protocol or API behavior, update:

- The affected guide/reference pages
- `reference/verification-matrix.mdx`
- `reference/discrepancies-readme.mdx` when roadmap/readme differences change
