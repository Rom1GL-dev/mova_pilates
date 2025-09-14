import { api } from '@/lib/api.ts';
import { DeleteTypeCourseDto } from '@/features/type-course/usecases/delete-type-course/delete-type-course.dto.ts';
import { UpdateTypeCourseForm } from '@/features/type-course/usecases/update-type-course/update-type-course.dto.ts';
import { CreateTypeCourseForm } from '@/features/type-course/usecases/create-type-course/create-type-course.dto.ts';

export class TypeCourseService {
  readonly _uri: string = '/v1/type-course';

  constructor() {}

  async listTypesCourse() {
    return await api.get(this._uri);
  }

  async getTypeCourse(id: string) {
    return await api.get(this._uri + '/' + id);
  }

  async update(data: UpdateTypeCourseForm) {
    return api.put<UpdateTypeCourseForm>(this._uri, data);
  }

  async deleteTypeCourse(data: DeleteTypeCourseDto) {
    return api.delete(this._uri, { data });
  }

  async create(data: CreateTypeCourseForm) {
    return api.post<CreateTypeCourseForm>(this._uri, data);
  }
}

export const typeCourseService = new TypeCourseService();
