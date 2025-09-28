import { IsNumber, IsString } from 'class-validator';

export class AdjustCreditDto {
  @IsString()
  userId: string;

  @IsString()
  typeCourseId: string;

  @IsNumber()
  balance: number;
}
