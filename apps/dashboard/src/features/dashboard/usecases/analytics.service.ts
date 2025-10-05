import { api } from '@/lib/api.ts';

export class AnalyticsService {
  readonly _uri: string = '/v1/backoffice/analytics';

  constructor() {}

  async getAnalytics() {
    return await api.get(this._uri);
  }
}

export const analyticsService = new AnalyticsService();
