import { api } from '@/lib/api.ts';
import { UpdateSessionForm } from '@/features/session/usecases/update-session/update-session.dto.ts';
import { DeleteSessionDto } from '@/features/session/usecases/delete-session/delete-session.dto.ts';
import { CreateSessionForm } from '@/features/session/usecases/create-session/create-session.dto.ts';

export class SessionService {
  readonly _uri: string = '/v1/sessions';

  constructor() {}

  async listPacks() {
    return await api.get(this._uri);
  }

  async getPack(id: string) {
    return await api.get(this._uri + '/' + id);
  }

  async update(data: UpdateSessionForm) {
    return api.put<UpdateSessionForm>(this._uri, data);
  }

  async deletePack(data: DeleteSessionDto) {
    return api.delete(this._uri, { data });
  }

  async create(data: CreateSessionForm) {
    return api.post<CreateSessionForm>(this._uri, data);
  }
}

export const sessionService = new SessionService();
