import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePackDto {
  @IsString()
  id: string;

  @IsString()
  label: string;

  @IsString()
  typeCourseId: string;

  @IsNumber()
  price: number;

  @IsNumber()
  nbCourse: number;

  @IsDate()
  @IsOptional()
  createdAt: Date;
}
