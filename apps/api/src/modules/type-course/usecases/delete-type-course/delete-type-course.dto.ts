import { IsString } from 'class-validator';

export class DeleteTypeCourseDto {
  @IsString()
  id: string;
}
