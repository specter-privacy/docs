# SPECTER Documentation

This directory contains the Mintlify documentation site for SPECTER.

## Local development

```bash
# From this docs directory
mint dev
```

## Link checks

```bash
mint broken-links
```

## Scope

The docs are source-verified against backend code under `../SPECTER/specter`.

- Implemented behavior is documented as active functionality.
- Roadmap or unverified claims are explicitly flagged in `reference/discrepancies-readme.mdx`.

## Main config

- Site config: `docs.json`
- Entry page: `index.mdx`

## Verification

See `reference/verification-matrix.mdx` for mapping from documented claims to source files.
