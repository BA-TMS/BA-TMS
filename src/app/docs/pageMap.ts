export const pageMap = [
  // content/_meta.js
  { data: {} },
  {
    // content/about
    name: 'about',
    route: '/login',
    title: 'Getting Started',
    children: [
      // content/about/_meta.js
      { data: {} },
      {
        // content/about/index.mdx
        name: 'index',
        route: '/about',
        title: 'Index',
        frontMatter: {},
      },
      {
        // content/about/legal.md
        name: 'legal',
        route: '/about/legal',
        title: 'Legal',
        frontMatter: {},
      },
    ],
  },
];
