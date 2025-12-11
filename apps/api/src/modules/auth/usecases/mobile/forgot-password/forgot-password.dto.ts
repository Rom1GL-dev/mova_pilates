import { IsEmail, IsString, MinLength } from 'class-validator';

export class ForgotPasswordEmailDto {
  @IsEmail()
  email: string;
}

export class ForgotPasswordVerifyDto {
  @IsEmail()
  email: string;

  @IsString()
  otp: string;

  @IsString()
  @MinLength(6)
  newPassword: string;
}
