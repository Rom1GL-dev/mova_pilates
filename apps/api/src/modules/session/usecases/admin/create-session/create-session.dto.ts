import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSessionDto {
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
}
