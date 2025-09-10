import { IsDate, IsString } from 'class-validator';

export class CreateSessionDto {
  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsString()
  typeCourseId: string;
}
