const backofficeRoot = '/backoffice';
const authRoot = '/auth';
const usersRoot = '/user';
const typeCourseRoot = '/type-course';
const packsRoot = '/packs';
const sessionsRoot = '/sessions';
const reservationsRoot = '/reservations';
const wallets = '/wallets';
const analyticsRoot = '/analytics';
const logsRoot = '/logs';
const profileRoot = '/profile';
const ordersRoot = '/orders';
const imagesRoot = '/images';
const legalsRoot = '/legals';

const v1 = 'v1';

export const routesV1 = {
  version: v1,
  mobile: {
    auth: {
      root: `${authRoot}`,
      register: `${authRoot}/register`,
      login: `${authRoot}/login`,
      logout: `${authRoot}/logout`,
      me: `${authRoot}/me`,
      verifyOtp: `/${authRoot}/verify-otp`,
      forgotPassword: `${authRoot}/forgot-password/request`,
      forgotPasswordVerify: `${authRoot}/forgot-password/verify`,
    },
    typeCourse: {
      root: `${typeCourseRoot}`,
      schedule: `${typeCourseRoot}/schedule/:id`,
      withPacks: `${typeCourseRoot}/with-packs`,
      byId: `${typeCourseRoot}/:id`,
    },
    profile: {
      update: `${profileRoot}/update`,
      updatePassword: `${profileRoot}/update-password`,
      updateEmail: `${profileRoot}/update-email`,
      delete: `${profileRoot}/delete`,
    },
    reservations: {
      root: reservationsRoot,
      nextReservationbyUser: `${reservationsRoot}/me/next`,
      statsByUser: `${reservationsRoot}/me/stats`,
      me: `${reservationsRoot}/me`,
      byUserId: `${reservationsRoot}/user/:userId`,
      byId: `${reservationsRoot}/:id`,
      cancel: `${reservationsRoot}/:reservationId/cancel`,
    },
    sessions: {
      byTypeCourse: `${sessionsRoot}/type-course/:typeCourseId`,
    },
    packs: {
      root: `${packsRoot}`,
      byId: `${packsRoot}/:id`,
    },
    payments: {
      intent: 'payments/intent',
      webhook: 'payments/webhook',
    },
    wallets: {
      byTypeCourseId: `${wallets}/type-course/:typeCourseId`,
      byUserId: `${wallets}/:id`,
    },
    legals: {
      type: `${legalsRoot}/:type`,
    },
  },
  backoffice: {
    auth: {
      root: `${backofficeRoot}${authRoot}`,
      register: `${backofficeRoot}${authRoot}/register`,
      login: `${backofficeRoot}${authRoot}/login`,
      adminLogin: `${backofficeRoot}${authRoot}/admin/login`,
      logout: `${backofficeRoot}${authRoot}/logout`,
      me: `${backofficeRoot}${authRoot}/me`,
      verifyOtp: `${backofficeRoot}${authRoot}/verify-otp`,
    },
    users: {
      root: `${backofficeRoot}${usersRoot}`,
      byId: `${backofficeRoot}${usersRoot}/:id`,
      reservationsByUser: `${backofficeRoot}${usersRoot}/reservation/:id`,
    },
    typeCourse: {
      root: `${backofficeRoot}${typeCourseRoot}`,
      byId: `${backofficeRoot}${typeCourseRoot}/:id`,
      packsByTypeCourseId: `${backofficeRoot}${typeCourseRoot}/get-packs/:id`,
    },
    packs: {
      root: `${backofficeRoot}${packsRoot}`,
      byId: `${backofficeRoot}${packsRoot}/:id`,
    },
    sessions: {
      root: `${backofficeRoot}${sessionsRoot}`,
      byId: `${backofficeRoot}${sessionsRoot}/:id`,
    },
    reservations: {
      root: `${backofficeRoot}${reservationsRoot}`,
      addReservation: `${backofficeRoot}${reservationsRoot}/session/reservation`,
      bySessionId: `${backofficeRoot}${reservationsRoot}/session/:sessionId`,
      byId: `${backofficeRoot}${reservationsRoot}/:id`,
      byUserId: `${backofficeRoot}${reservationsRoot}/user/:userId`,
    },
    wallets: {
      root: `${backofficeRoot}${wallets}`,
      adjustCredit: `${backofficeRoot}${wallets}/adjust-credit`,
      byUserId: `${backofficeRoot}${wallets}/:id`,
    },
    analytics: {
      root: `${backofficeRoot}${analyticsRoot}`,
    },
    logs: {
      root: `${backofficeRoot}${logsRoot}`,
      byId: `${backofficeRoot}${logsRoot}/:id`,
    },
    orders: {
      root: `${backofficeRoot}${ordersRoot}`,
      byId: `${backofficeRoot}${ordersRoot}/:id`,
    },
    legals: {
      root: `${backofficeRoot}${legalsRoot}`,
      type: `${backofficeRoot}${legalsRoot}/:type`,
    },
  },
  image: {
    root: imagesRoot,
    upload: `${imagesRoot}/upload/:category`,
    getImage: `${imagesRoot}/:category/:imageName`,
  },
};
