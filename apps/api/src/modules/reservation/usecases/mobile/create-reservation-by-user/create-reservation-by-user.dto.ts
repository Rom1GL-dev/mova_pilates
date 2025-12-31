import { IsString } from 'class-validator';

export class CreateReservationByUserDto {
  @IsString()
  sessionId: string;
}
