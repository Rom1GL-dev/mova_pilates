import { IsString } from 'class-validator';

export class AddReservationDto {
  @IsString()
  userId: string;

  @IsString()
  sessionId: string;
}
