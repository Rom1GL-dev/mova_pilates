import { TypeCourse } from '@mova_pilates/shared';
import { IsNumber, IsString } from 'class-validator';

export class CreateTypeCourseDto {
  @IsString()
  label: string;

  @IsString()
  typeCourse: TypeCourse;

  @IsNumber()
  capacity: number;
}
