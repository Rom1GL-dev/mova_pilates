import { IsString } from 'class-validator';

export class AddReservationBySessionDto {
  @IsString()
  userId: string;

  @IsString()
  sessionId: string;
}
