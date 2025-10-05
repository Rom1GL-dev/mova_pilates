import { api } from '@/lib/api.ts';
import { DeletePackDto } from '@/features/pack/usecases/delete-pack/delete-pack.dto.ts';
import { CreatePackForm } from '@/features/pack/usecases/create-pack/create-pack.dto.ts';
import { UpdatePackForm } from '@/features/pack/usecases/update-pack/update-pack.dto.ts';

export class PackService {
  readonly _uri: string = '/v1/backoffice/packs';

  constructor() {}

  async listPacks() {
    return await api.get(this._uri);
  }

  async getPack(id: string) {
    return await api.get(this._uri + '/' + id);
  }

  async update(data: UpdatePackForm) {
    return api.put<UpdatePackForm>(this._uri, data);
  }

  async deletePack(data: DeletePackDto) {
    return api.delete(this._uri, { data });
  }

  async create(data: CreatePackForm) {
    return api.post<CreatePackForm>(this._uri, data);
  }
}

export const packService = new PackService();
