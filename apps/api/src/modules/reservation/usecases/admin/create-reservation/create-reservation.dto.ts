import { IsString } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  status: 'CONFIRMED' | 'CANCELLED' | 'MISSING' | 'PRESENT';

  @IsString()
  sessionId: string;

  @IsString()
  userId: string;
}
