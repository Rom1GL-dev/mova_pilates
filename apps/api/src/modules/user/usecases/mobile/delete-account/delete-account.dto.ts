import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteAccountDto {
  @IsString()
  @IsNotEmpty({
    message: 'Le mot de passe est requis pour confirmer la suppression',
  })
  password: string;
}
