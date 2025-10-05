import { api } from '@/lib/api.ts';

export class LogsService {
  readonly _uri: string = '/v1/backoffice/logs';

  constructor() {}

  async listLogs() {
    return await api.get(this._uri);
  }

  async getLogs(id: string) {
    return await api.get(this._uri + '/' + id);
  }
}

export const logsService = new LogsService();
