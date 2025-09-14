export const APP_ROUTES = {
  404: '/404',
  app: { path: '/', getHref: () => '/' },
  login: { path: '/connexion', getHref: () => '/connexion' },
  users: {
    path: '/utilisateurs',
    getHref: () => '/utilisateurs',
    details: {
      path: '/utilisateurs/:id',
      getHref: () => `/utilisateurs/:id`
    }
  },
  typesCourse: {
    path: '/types-cours',
    getHref: () => '/types-cours',
    details: {
      path: '/types-cours/:id',
      getHref: () => `/types-cours/:id`
    }
  },
  packs: {
    path: '/packs',
    getHref: () => '/packs',
    details: {
      path: '/packs/:id',
      getHref: () => `/packs/:id`
    }
  },
  credits: {
    path: '/credits',
    getHref: () => '/credits',
    details: {
      path: '/credits/:id',
      getHref: () => `/credits/:id`
    }
  }
};
