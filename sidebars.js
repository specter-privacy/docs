const sidebars = {
  docsSidebar: [
    'index',
    {
      type: 'category',
      label: 'Why SPECTER?',
      items: [
        'why-specter/the-problem',
        'why-specter/how-specter-works',
        'why-specter/specter-vs-others',
        'getting-started/quickstart',
      ],
    },
    {
      type: 'category',
      label: 'Understanding SPECTER',
      items: [
        'how-it-works/protocol-flow',
        'how-it-works/view-tags-and-scanning',
        'how-it-works/security-boundaries',
        'how-it-works/architecture',
        'how-it-works/post-quantum-crypto',
      ],
    },
    {
      type: 'category',
      label: 'Build and try',
      items: [
        'explore/playground',
        'getting-started/installation',
        'build/integration-guide',
      ],
    },
    {
      type: 'category',
      label: 'Under the hood',
      items: [
        'under-the-hood/overview',
        'under-the-hood/key-generation',
        'under-the-hood/shared-secret',
        'under-the-hood/stealth-derivation',
        'under-the-hood/scanning-and-spending',
      ],
    },
    {
      type: 'category',
      label: 'TypeScript SDK',
      items: [
        'sdk/overview',
        'sdk/quickstart',
        'sdk/api-reference',
        'sdk/integration',
        'sdk/security',
      ],
    },
    {
      type: 'category',
      label: 'Use cases',
      items: [
        'use-cases/private-payments',
        'use-cases/name-services',
        'use-cases/whats-next',
      ],
    },
    {
      type: 'category',
      label: 'Contribute',
      items: [
        'build/contributing',
        'build/contribution-opportunities',
        'build/development-setup',
      ],
    },
    {
      type: 'category',
      label: 'Deep dive',
      items: [
        'deep-dive/post-quantum-explainer',
        'deep-dive/erc-proposal',
        'deep-dive/research-notes',
        'deep-dive/terminology',
      ],
    },
    {
      type: 'category',
      label: 'Resources',
      items: [
        'faq',
        'reference/verification-matrix',
        'reference/changelog',
        'roadmap/yet-to-implement',
      ],
    },
  ],
  apiSidebar: [
    {
      type: 'category',
      label: 'Overview',
      collapsed: false,
      items: ['api/introduction', 'api/auth-and-errors'],
    },
    {
      type: 'category',
      label: 'Core endpoints',
      items: [
        'api/keys',
        'api/stealth',
        'api/nameservice',
        'api/ipfs',
        'api/registry',
      ],
    },
  ],
};

export default sidebars;
