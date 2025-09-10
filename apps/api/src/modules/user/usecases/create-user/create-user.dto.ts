import { IsBoolean, IsDate, IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsString()
  tel: string;

  @IsString()
  role: string;

  @IsNumber()
  credit: number;

  @IsDate()
  dob: Date;
}
