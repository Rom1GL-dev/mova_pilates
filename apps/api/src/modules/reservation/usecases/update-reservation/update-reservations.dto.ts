import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateReservationsDto {
  @IsString()
  id: string;

  @IsString()
  userId: string;

  @IsString()
  sessionId: string;

  @IsString()
  status: 'CANCELLED' | 'CONFIRMED';

  @IsDate()
  @IsOptional()
  createdAt: Date;
}
