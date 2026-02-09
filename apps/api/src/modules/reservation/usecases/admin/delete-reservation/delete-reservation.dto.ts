import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class DeleteReservationDto {
  @IsString()
  id: string;

  @IsString()
  @IsOptional()
  sessionId?: string;

  @IsBoolean()
  @IsOptional()
  isGuest?: boolean;
}
