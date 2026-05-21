import {themes as prismThemes} from 'prism-react-renderer';

const config = {
  title: 'SPECTER',
  tagline: 'Post-quantum stealth addresses for private payments on Ethereum and Sui',
  favicon: 'favicon.svg',
  url: process.env.DOCS_SITE_URL || 'https://docs.specterpq.com',
  baseUrl: process.env.DOCS_BASE_URL || '/',
  trailingSlash: true,
  onBrokenLinks: 'throw',
  headTags: [
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
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],
  themes: ['@docusaurus/theme-mermaid'],
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  themeConfig: {
    image: 'images/specter/cover-specter-full.png',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'SPECTER',
      logo: {
        alt: 'SPECTER logo',
        src: 'images/specter/logo.png',
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
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
