import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Email invalide' })
  @IsNotEmpty({ message: 'Email requis' })
  email: string;

  @IsString()
  @MinLength(8, {
    message: 'Le mot de passe doit contenir au moins 8 caractères',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message:
      'Le mot de passe doit contenir une majuscule, une minuscule et un chiffre',
  })
  @IsNotEmpty({ message: 'Mot de passe requis' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Prénom requis' })
  firstname: string;

  @IsString()
  @IsNotEmpty({ message: 'Nom requis' })
  lastname: string;

  @IsString()
  @IsNotEmpty({ message: 'Téléphone requis' })
  tel: string;

  @IsDate()
  @IsNotEmpty({ message: 'Date de naissance requise' })
  dob: Date;
}
