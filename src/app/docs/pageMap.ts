export const pageMap = [
  // content/_meta.js
  { data: {} },
  {
    // content/about
    name: 'docs',
    route: '/docs',
    title: 'Getting Started',

    children: [
      // content/about/_meta.js
      { data: {} },
      {
        name: 'signup',
        route: '/docs/signup',
        title: 'Sign Up',
        frontMatter: {},
      },
      {
        name: 'login',
        route: '/docs/login',
        title: 'Log In',
        frontMatter: {},
      },
    ],
  },
];
