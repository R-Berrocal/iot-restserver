import { IsNotEmpty, IsEmail, MinLength, IsOptional } from 'class-validator';

export class CreatePequeñoProductorDto {
  idPequeñoProductor: number;

  @IsNotEmpty()
  nombre1: string;

  @IsOptional()
  nombre2?: string;

  @IsNotEmpty()
  apellido1: string;

  @IsOptional()
  apellido2?: string;

  @IsNotEmpty()
  @IsEmail()
  correo: string;

  @IsNotEmpty()
  @MinLength(5)
  contraseña: string;
}
