import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { TypeCourse } from '@mova_pilates/shared';

export class UpdateTypeCourseDto {
  @IsString()
  id: string;

  @IsString()
  @IsOptional()
  label: string;

  @IsString()
  @IsOptional()
  typeCourse: TypeCourse;

  @IsNumber()
  @IsOptional()
  capacity: number;

  @IsDate()
  @IsOptional()
  createdAt: Date;
}
