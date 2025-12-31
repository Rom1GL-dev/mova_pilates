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
  logs: {
    path: '/logs',
    getHref: () => '/logs'
  },
  credits: {
    path: '/wallet',
    getHref: () => '/wallet',
    details: {
      path: '/wallet/:id',
      getHref: () => `/credits/:id`
    }
  },
  sessions: {
    path: '/sessions',
    getHref: () => '/sessions',
    details: {
      path: '/sessions/:id',
      getHref: () => `/sessions/:id`
    }
  },
  order: {
    path: '/paiements',
    getHref: () => '/paiements',
    details: {
      path: '/paiements/:id',
      getHref: () => `/paiements/:id`
    }
  },
  legal: {
    path: '/legal',
    getHref: () => '/legal'
  }
};
