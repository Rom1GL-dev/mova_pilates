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
      byId: `${backofficeRoot}${reservationsRoot}/:id`,
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
  },
};
