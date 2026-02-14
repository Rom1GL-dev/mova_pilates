import { IsDate } from 'class-validator';

export class DuplicateWeekDto {
  @IsDate()
  sourceWeekStart: Date;

  @IsDate()
  destinationWeekStart: Date;
}
