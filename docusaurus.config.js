import {themes as prismThemes} from 'prism-react-renderer';

const config = {
  title: 'SPECTER',
  tagline: 'Post-quantum stealth addresses for private payments on Ethereum and Sui',
  favicon: 'img/favicon-64.png',
  url: process.env.DOCS_SITE_URL || 'https://docs.specterpq.com',
  baseUrl: process.env.DOCS_BASE_URL || '/',
  trailingSlash: true,
  onBrokenLinks: 'throw',
  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/img/apple-touch-icon.png',
      },
    },
    {
      tagName: 'script',
      attributes: {
        type: 'importmap',
      },
      innerHTML: JSON.stringify({
        imports: {
          zod: 'https://esm.sh/zod@3.24.1',
        },
      }),
    },
    // JSON-LD structured data: helps search engines and AI answer engines
    // understand the site, expose a sitelinks search box, and attribute the
    // software/organization correctly.
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': 'https://docs.specterpq.com/#website',
            name: 'SPECTER Documentation',
            url: 'https://docs.specterpq.com/',
            description:
              'Post-quantum stealth addresses for private payments on Ethereum and Sui.',
            inLanguage: 'en',
            publisher: {'@id': 'https://docs.specterpq.com/#org'},
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate:
                  'https://docs.specterpq.com/search?q={search_term_string}',
              },
              'query-input': 'required name=search_term_string',
            },
          },
          {
            '@type': 'Organization',
            '@id': 'https://docs.specterpq.com/#org',
            name: 'SPECTER',
            url: 'https://specterpq.com/',
            logo: 'https://docs.specterpq.com/img/specter-logo.png',
            sameAs: [
              'https://github.com/pranshurastogi/SPECTER',
              'https://x.com/specter_PQ',
            ],
          },
          {
            '@type': 'SoftwareApplication',
            name: 'SPECTER',
            applicationCategory: 'SecurityApplication',
            operatingSystem: 'Web, Node.js',
            description:
              'Post-quantum stealth address protocol and SDK for private payments on Ethereum and Sui, using ML-KEM-768 announcement encryption and view-tag scanning.',
            url: 'https://docs.specterpq.com/',
            offers: {'@type': 'Offer', price: '0', priceCurrency: 'USD'},
          },
        ],
      }),
    },
  ],
  future: {
    v4: true,
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          editUrl:
            'https://github.com/pranshurastogi/SPECTER/tree/main/docusaurus/specter-pq-docs/',
          // Richer metadata for SEO + AI crawlers on every doc page.
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.7,
          filename: 'sitemap.xml',
          ignorePatterns: ['/playground-app/**'],
        },
      },
    ],
  ],
  plugins: [
    'docusaurus-plugin-image-zoom',
    // Generates /llms.txt (index) and /llms-full.txt (full corpus) plus a
    // clean markdown twin for every page, so LLMs and AI crawlers can ingest
    // the docs without parsing rendered HTML. https://llmstxt.org
    [
      '@signalwire/docusaurus-plugin-llms-txt',
      {
        siteTitle: 'SPECTER',
        siteDescription:
          'Post-quantum stealth addresses for private payments on Ethereum and Sui. ML-KEM-768 announcement encryption, view-tag scanning, stealth address derivation, SDK and hosted API.',
        depth: 2,
        enableDescriptions: true,
        content: {
          enableMarkdownFiles: true,
          enableLlmsFullTxt: true,
          includeDocs: true,
          includePages: true,
          includeBlog: false,
          excludeRoutes: ['/playground-app/**', '/search/**'],
        },
        optionalLinks: [
          {
            title: 'Research Paper (arXiv)',
            url: 'https://arxiv.org/pdf/2501.13733v1',
            description: 'Underlying post-quantum stealth address research.',
          },
          {
            title: 'Live API health',
            url: 'https://backend.specterpq.com/health',
            description: 'Hosted SPECTER backend status endpoint.',
          },
        ],
      },
    ],
  ],
  themes: [
    '@docusaurus/theme-mermaid',
    // Offline, lunr-based full-text search. Fast typeahead with fuzzy matching,
    // result highlighting and a Cmd/Ctrl+K shortcut — no external service.
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        indexBlog: false,
        indexPages: true,
        docsRouteBasePath: '/',
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        searchBarShortcut: true,
        searchBarShortcutHint: true,
        searchBarPosition: 'right',
        searchResultLimits: 8,
        searchResultContextMaxLength: 60,
      },
    ],
  ],
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  themeConfig: {
    image: 'images/specter/specter-cover-full.png',
    metadata: [
      {
        name: 'keywords',
        content:
          'post-quantum, stealth addresses, ML-KEM, ML-KEM-768, private payments, Ethereum, Sui, view tags, privacy, zero-knowledge, ERC-5564, stealth meta-address, kyber, lattice cryptography, SPECTER',
      },
      {
        name: 'description',
        content:
          'Post-quantum stealth addresses for private payments on Ethereum and Sui, built on ML-KEM-768 with view-tag scanning, an SDK, and a hosted API.',
      },
      {name: 'author', content: 'SPECTER'},
      {name: 'robots', content: 'index, follow, max-image-preview:large'},
      {property: 'og:type', content: 'website'},
      {property: 'og:site_name', content: 'SPECTER Documentation'},
      {property: 'og:locale', content: 'en_US'},
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:site', content: '@specter_PQ'},
      {name: 'twitter:creator', content: '@specter_PQ'},
    ],
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    mermaid: {
      theme: {light: 'dark', dark: 'dark'},
      options: {
        themeVariables: {
          darkMode: true,
          background: '#0b0a12',
          primaryColor: '#1c1730',
          primaryBorderColor: '#7c3aed',
          primaryTextColor: '#f4f1ff',
          secondaryColor: '#2a2140',
          secondaryBorderColor: '#a855f7',
          tertiaryColor: '#1a1612',
          tertiaryBorderColor: '#f5c518',
          lineColor: '#8b7bb8',
          textColor: '#e7e2f5',
          fontFamily: '"IBM Plex Sans", "Segoe UI", sans-serif',
          clusterBkg: 'rgba(124, 58, 237, 0.06)',
          clusterBorder: 'rgba(168, 85, 247, 0.35)',
          nodeBorder: '#a855f7',
          edgeLabelBackground: '#15121d',
        },
      },
    },
    navbar: {
      title: 'SPECTER',
      logo: {
        alt: 'SPECTER logo',
        src: 'img/specter-logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'docSidebar',
          sidebarId: 'apiSidebar',
          position: 'left',
          label: 'API Reference',
        },
        {
          href: '/playground-app/',
          label: 'Playground',
          position: 'left',
        },
        {
          href: 'https://specterpq.com/',
          label: 'Website',
          position: 'right',
        },
        {
          href: 'https://backend.specterpq.com/health',
          label: 'Live API',
          position: 'right',
        },
        {
          href: 'https://github.com/pranshurastogi/SPECTER',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Quickstart',
              to: '/getting-started/quickstart',
            },
            {
              label: 'Protocol Flow',
              to: '/how-it-works/protocol-flow',
            },
            {
              label: 'Playground',
              to: '/explore/playground',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Live API',
              href: 'https://backend.specterpq.com/health',
            },
            {
              label: 'Research Paper',
              href: 'https://arxiv.org/pdf/2501.13733v1',
            },
            {
              label: 'Verification Matrix',
              to: '/reference/verification-matrix',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Website',
              href: 'https://specterpq.com/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/pranshurastogi/SPECTER',
            },
            {
              label: 'X',
              href: 'https://x.com/specter_PQ',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} SPECTER.`,
    },
    zoom: {
      selector: '.markdown img, img[data-zoomable]',
      background: {
        light: 'rgba(10, 9, 18, 0.92)',
        dark: 'rgba(10, 9, 18, 0.92)',
      },
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
