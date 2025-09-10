import { IsNumber, IsString } from 'class-validator';
import { TypeCourse } from '@mova_pilates/shared';

export class CreateTypeCourseDto {
  @IsString()
  label: string;

  @IsString()
  typeCourse: TypeCourse;

  @IsNumber()
  capacity: number;
}
