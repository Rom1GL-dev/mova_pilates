import { IsNumber, IsString } from 'class-validator';

export class CreateTypeCourseDto {
  @IsString()
  label: string;

  @IsNumber()
  capacity: number;

  @IsString()
  description: string;

  @IsString()
  image?: string | null;
}
