# SPECTER Docs

This Docusaurus app is the canonical documentation site for SPECTER.

## Local development

Use Node 20+.

```bash
npm install
npm start
```

## Production build

```bash
npm run build
npm run serve
```

## Structure

- `docs/` contains the Docusaurus-authored MDX source for the SPECTER docs.
- `static/images/` contains shared docs images mirrored from the legacy Mintlify docs.
- `static/playground-embed/` contains the standalone browser playground that is embedded into docs pages and exposed through `/playground-app/`.
- `src/components/MdxCompat/` contains the Mintlify-compatibility component layer used by the migrated docs content.
