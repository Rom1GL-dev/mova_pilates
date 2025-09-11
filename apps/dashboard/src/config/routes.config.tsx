export const APP_ROUTES = {
  404: '/404',
  app: { path: '/', getHref: () => '/' },
  login: { path: '/connexion', getHref: () => '/connexion' },
  users: {
    path: '/utilisateurs',
    getHref: () => '/utilisateurs',
    details: {
      path: '/utilisateur/:id',
      getHref: () => `/utilisateur/:id`
    }
  },
  typesCourse: {
    path: '/types-cours',
    getHref: () => '/types-cours',
    details: {
      path: '/type-cours/:id',
      getHref: () => `/type-cours/:id`
    }
  },
  packs: {
    path: '/packs',
    getHref: () => '/packs',
    details: {
      path: '/packs/:id',
      getHref: () => `/pack/:id`
    }
  }
};
