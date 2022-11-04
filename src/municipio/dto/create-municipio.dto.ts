import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMunicipioDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
