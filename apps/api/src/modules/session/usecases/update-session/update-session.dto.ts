import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateSessionDto {
  @IsString()
  id: string;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsString()
  typeCourseId: string;

  @IsDate()
  @IsOptional()
  createdAt: Date;
}
