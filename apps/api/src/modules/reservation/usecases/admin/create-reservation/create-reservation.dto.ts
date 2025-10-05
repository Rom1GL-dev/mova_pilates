import { IsNumber, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  status: 'CONFIRMED' | 'CANCELLED';

  @IsString()
  sessionId: string;

  @IsString()
  userId: string;

  @IsNumber()
  nbCourse: number;
}
