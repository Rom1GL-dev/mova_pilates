import { IsNumber, IsString } from 'class-validator';

export class CreateTypeCourseDto {
  @IsString()
  label: string;

  @IsNumber()
  capacity: number;
}
