import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateReservationsDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  @IsOptional()
  userId: string;

  @IsString()
  @IsOptional()
  sessionId: string;

  @IsString()
  @IsOptional()
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'MISSING' | 'PRESENT';

  @IsDate()
  @IsOptional()
  createdAt: Date;
}
