# SPECTER Docs

Documentation site for [SPECTER](https://github.com/pranshurastogi/SPECTER) — post-quantum stealth addresses for private payments on Ethereum and Sui.

Built with [Docusaurus 3](https://docusaurus.io/) and served at [docs.specterpq.com](https://docs.specterpq.com).

---

## Requirements

- Node.js 20+
- npm 9+

---

## Getting started

```bash
git clone https://github.com/pranshurastogi/SPECTER.git
cd SPECTER/docusaurus/specter-pq-docs
npm install
npm start
```

The dev server starts at `http://localhost:3000` with hot reload.

---

## Scripts

| Command | Description |
|---|---|
| `npm start` | Start the local dev server with hot reload |
| `npm run build` | Build the production static site into `build/` |
| `npm run serve` | Serve the production build locally |
| `npm run clear` | Clear the Docusaurus cache (fixes most build oddities) |
| `npm run write-translations` | Extract translatable strings |
| `npm run write-heading-ids` | Generate stable heading IDs across all MDX files |

---

## Project structure

```
.
├── docs/                        # MDX source files (the actual content)
│   ├── index.mdx                # Home / landing page
│   ├── api/                     # REST API reference pages
│   ├── build/                   # Integration guide, contributing, dev setup
│   ├── deep-dive/               # Post-quantum explainer, ERC proposal, research notes
│   ├── explore/                 # Playground page
│   ├── getting-started/         # Quickstart and installation
│   ├── how-it-works/            # Protocol flow, architecture, cryptography, security
│   ├── reference/               # Verification matrix, changelog
│   ├── roadmap/                 # Work yet to implement
│   ├── use-cases/               # Private payments, name services, Yellow channels
│   └── why-specter/             # The problem, how it works, vs others
├── src/
│   ├── components/MdxCompat/    # Mintlify-compatibility component shims (Frame, Card, etc.)
│   ├── css/custom.css           # Global CSS overrides
│   ├── pages/playground-app/    # Standalone playground React page
│   ├── theme/MDXComponents.js   # MDX component registry
│   └── lib/playground/          # Playground logic and cryptography helpers
├── static/
│   ├── images/specter/          # Protocol diagrams, cover images, logos
│   ├── images/icons/            # Tabler icon set used in docs
│   └── playground-embed/        # Self-contained playground HTML/JS bundle
├── docusaurus.config.js         # Site configuration (nav, footer, plugins, theme)
└── sidebars.js                  # Sidebar navigation tree
```

---

## Writing and editing docs

All content lives under `docs/` as `.mdx` files. Docusaurus hot-reloads on save during `npm start`.

### Adding a new page

1. Create a `.mdx` file under the appropriate `docs/` subdirectory.
2. Add a frontmatter block:

   ```mdx
   ---
   title: "Your Page Title"
   description: "One-sentence description for SEO and hover text"
   ---
   ```

3. Register the file in `sidebars.js` under the correct sidebar and category.

### Editing the navigation

- **Sidebar order / categories** — edit `sidebars.js`.
- **Top navbar / footer links** — edit the `themeConfig.navbar` and `themeConfig.footer` sections in `docusaurus.config.js`.

### Mintlify compatibility components

The content was migrated from Mintlify. The `src/components/MdxCompat/` shims let the original `<Card>`, `<CardGroup>`, `<Frame>`, `<Tabs>`, `<Tab>`, `<Steps>`, `<Step>`, `<Warning>`, and `<Tip>` JSX work unchanged in Docusaurus. Import from there if you need to add new compatibility wrappers.

### Diagrams

Mermaid is enabled site-wide via `@docusaurus/theme-mermaid`. Use fenced code blocks:

````mdx
```mermaid
flowchart LR
    A --> B
```
````

---

## Environment variables

| Variable | Default | Description |
|---|---|---|
| `DOCS_SITE_URL` | `https://docs.specterpq.com` | Canonical URL used for sitemap and OG tags |
| `DOCS_BASE_URL` | `/` | Base path (change if deploying to a sub-path) |

Set these in your shell or a `.env` file before building if you need to target a different host.

---

## Deployment

The docs are a fully static Docusaurus build. Any static host works (Vercel, Netlify, GitHub Pages, Cloudflare Pages).

### Production build

```bash
npm run build
# Output is in build/
```

### Preview the build locally

```bash
npm run build
npm run serve
# Serves build/ at http://localhost:3000
```

### Vercel / Netlify

Set the framework to **Other**, build command to `npm run build`, and output directory to `build`.

---

## Contributing to the docs

1. **Open an issue first** if your change is non-trivial — describe the scope.
2. Branch off `main`, make your changes, and run `npm start` to verify locally.
3. Run a production build (`npm run build`) before opening a PR — broken links throw a build error.
4. If you changed any documented behavior, update the [Verification Matrix](/docs/reference/verification-matrix.mdx) in the same PR.
5. Keep PRs focused: one topic or one tightly related set of pages per PR.

For product (Rust/frontend) contributions, see the [Contributing guide](https://docs.specterpq.com/build/contributing) and [Development Setup](https://docs.specterpq.com/build/development-setup) in the docs itself.

---

## Related repos

| Repo | Contents |
|---|---|
| [pranshurastogi/SPECTER](https://github.com/pranshurastogi/SPECTER) | Rust backend, frontend app, GitHub issues, CI |
| This repo (`docs/`) | Docusaurus source for docs.specterpq.com |

---

## Links

- Live docs: [docs.specterpq.com](https://docs.specterpq.com)
- Live API: [backend.specterpq.com/health](https://backend.specterpq.com/health)
- Website: [specterpq.com](https://specterpq.com)
- X: [@specter_PQ](https://x.com/specter_PQ)
