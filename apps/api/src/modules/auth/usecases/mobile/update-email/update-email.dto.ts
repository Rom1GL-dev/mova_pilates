import { IsEmail, IsString, MinLength } from 'class-validator';

export class UpdateEmailDto {
  @IsString()
  id: string;

  @IsEmail()
  newEmail: string;

  @IsString()
  @MinLength(6)
  currentPassword: string;
}
