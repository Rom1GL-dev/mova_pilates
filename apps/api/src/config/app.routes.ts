const authRoot = '/auth';
const usersRoot = '/user';
const typeCourseRoot = '/type-course';
const packsRoot = '/packs';
const sessionsRoot = '/sessions';
const reservationsRoot = '/reservations';

const v1 = 'v1';

export const routesV1 = {
  version: v1,
  auth: {
    root: authRoot,
    register: `${authRoot}/register`,
    login: `${authRoot}/login`,
    adminLogin: `${authRoot}/admin/login`,
    logout: `${authRoot}/logout`,
    me: `${authRoot}/me`,
  },
  users: {
    root: usersRoot,
    byId: `${usersRoot}/:id`,
  },
  typeCourse: {
    root: typeCourseRoot,
    byId: `${typeCourseRoot}/:id`,
    packsByTypeCourseId: `${typeCourseRoot}/get-packs/:id`,
  },
  packs: {
    root: packsRoot,
    byId: `${packsRoot}/:id`,
  },
  sessions: {
    root: sessionsRoot,
    byId: `${sessionsRoot}/:id`,
  },
  reservations: {
    root: reservationsRoot,
    byId: `${reservationsRoot}/:id`,
  },
};
