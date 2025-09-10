import { IsNumber, IsString } from 'class-validator';

export class CreatePackDto {
  @IsString()
  label: string;

  @IsString()
  typeCourseId: string;

  @IsNumber()
  price: number;

  @IsNumber()
  nbCourse: number;
}
