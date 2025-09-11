import { api } from '@/lib/api.ts';
import { DeleteUserDto } from '@/features/users/usecases/delete-user/delete-user.dto.ts';
import { CreateUserForm } from '@/features/users/usecases/create-user/create-user.dto.ts';
import { UpdateUserForm } from '@/features/users/usecases/update-user/update-user.dto.ts';

export class UserService {
  readonly _uri: string = '/v1/users';

  constructor() {}

  async listUsers() {
    return await api.get(this._uri);
  }

  async update(data: UpdateUserForm) {
    return api.put<UpdateUserForm>(this._uri, data);
  }

  async deleteUser(data: DeleteUserDto) {
    return api.delete(this._uri, { data });
  }

  async create(data: CreateUserForm) {
    return api.post<CreateUserForm>(this._uri, data);
  }
}

export const userService = new UserService();
