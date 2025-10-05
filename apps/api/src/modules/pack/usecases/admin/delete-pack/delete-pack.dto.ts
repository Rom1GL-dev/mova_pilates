import { IsString } from 'class-validator';

export class DeletePackDto {
  @IsString()
  id: string;
}
