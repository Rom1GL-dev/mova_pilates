import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateSessionDto {
  @IsString()
  id: string;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsString()
  typeCourseId: string;

  @IsNumber()
  @IsOptional()
  customCapacity?: number;

  @IsNumber()
  @IsOptional()
  guestCount?: number;

  @IsDate()
  @IsOptional()
  createdAt: Date;
}
