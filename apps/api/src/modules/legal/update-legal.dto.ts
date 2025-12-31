import { IsEnum, IsString } from 'class-validator';

export enum LegalType {
  POLITIQUE_DE_CONFIDENTIALITE = 'POLITIQUE_DE_CONFIDENTIALITE',
  CONDITIONS_D_UTILISATION = 'CONDITIONS_D_UTILISATION',
  CONDITIONS_DE_VENTE = 'CONDITIONS_DE_VENTE',
  MENTIONS_LEGALES = 'MENTIONS_LEGALES',
}

export class UpdateLegalDto {
  @IsEnum(LegalType)
  type: LegalType;

  @IsString()
  content: string;
}
