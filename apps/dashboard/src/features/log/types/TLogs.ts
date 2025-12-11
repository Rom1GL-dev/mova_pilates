export interface TLogs {
  id: string;
  fullName: string;
  appType: AppType;
  logsType: LogsType;
  message: string;
}

export enum AppType {
  MOBILE = 'MOBILE',
  ADMIN = 'ADMIN'
}

export enum LogsType {
  ADD = 'ADD',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  REGISTER = 'REGISTER',
  PAYMENT = 'PAYMENT',
  PASSWORD_RESET = 'PASSWORD_RESET',
  RESERVATION = 'RESERVATION',
  CANCELLATION = 'CANCELLATION',
  OTHER = 'OTHER'
}
