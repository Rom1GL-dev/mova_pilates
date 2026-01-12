import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class ForgotPasswordEmailDto {
  @IsEmail({}, { message: 'Email invalide' })
  email: string;
}

export class ForgotPasswordVerifyDto {
  @IsEmail({}, { message: 'Email invalide' })
  email: string;

  @IsString()
  otp: string;

  @IsString()
  @MinLength(8, {
    message: 'Le mot de passe doit contenir au moins 8 caractères',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message:
      'Le mot de passe doit contenir une majuscule, une minuscule et un chiffre',
  })
  newPassword: string;
}
