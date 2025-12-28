import { api } from '@/lib/api.ts';

export class OrderService {
  readonly _uri: string = '/v1/backoffice/orders';

  constructor() {}

  async listOrders() {
    return await api.get(this._uri);
  }
}

export const orderService = new OrderService();
